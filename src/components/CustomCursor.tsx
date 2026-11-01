// @ts-nocheck
"use client";

import { useEffect, useRef } from "react";

/**
 * Self-Contained WebGL2 Fire Cursor & Fluid Smoke Hover
 * Built by Orbit Designs (Harshil Acharya)
 * 100% Zero-External-Dependency / Zero Missing-Module Error
 */

const FIRE_DEFAULTS = {
  radius: 13,
  embers: 160,
  edgeSelector: 'a, button, [role="button"], input, textarea, select, [data-fire-edge], .fc-glass',
  growSelector: 'a, button, [role="button"], [data-fire-grow]',
  glassSelector: '.fc-glass',
  glassStrength: .25,
  hideCursor: true,
  theme: 'auto',
  zIndex: 2147483000,
  touch: true,
  respectReducedMotion: true
};

function initFireCursor(options) {
  const O = Object.assign({}, FIRE_DEFAULTS, options || {});
  const noop = { destroy() {}, setTheme() {}, running: false };
  if (typeof window === 'undefined' || !window.matchMedia) return noop;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!fine && !O.touch) return noop;
  if (O.respectReducedMotion && matchMedia('(prefers-reduced-motion: reduce)').matches) return noop;

  const root = document.documentElement;
  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  canvas.style.cssText = `position:fixed;left:0;top:0;width:100vw;height:100vh;pointer-events:none;z-index:${O.zIndex}`;
  const gl = canvas.getContext('webgl2', { alpha: true, premultipliedAlpha: true, antialias: false, depth: false, stencil: false });
  if (!gl || !(gl.getExtension('EXT_color_buffer_float') || gl.getExtension('EXT_color_buffer_half_float'))) return noop;

  const VS = `#version 300 es
precision highp float; out vec2 vUv;
void main(){ vec2 p = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2); vUv = p; gl_Position = vec4(p * 2. - 1., 0., 1.); }`;
  const NOISE = `
float hash(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float noise(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3. - 2. * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x), mix(hash(i + vec2(0, 1)), hash(i + 1.), f.x), f.y); }
float fbm(vec2 p){ float s = 0., a = .5; for (int i = 0; i < 4; i++) { s += a * noise(p); p = p * 2.07 + 13.1; a *= .5; } return s; }`;

  const FS_HEAT = `#version 300 es
precision highp float; precision highp sampler2D;
in vec2 vUv; out vec4 o;
uniform sampler2D uPrev; uniform vec2 uView, uC, uV; uniform float dt, uT, uOn, uR, uSpin, uEdge, uCorner; uniform vec4 uRect;` + NOISE + `
vec2 curl(vec2 p){ float e = 1.5; float n1 = fbm(p + vec2(0, e) * .01), n2 = fbm(p - vec2(0, e) * .01), n3 = fbm(p + vec2(e, 0) * .01), n4 = fbm(p - vec2(e, 0) * .01);
  return vec2(n1 - n2, -(n3 - n4)) / (2. * e * .01); }
void main(){
  vec2 p = vec2(vUv.x, 1. - vUv.y) * uView;
  vec2 d = p - uC; float dist = length(d);
  vec2 sw = curl(p * .04 + vec2(0., uT * .9)) * .55;
  float wake = exp(-dist * dist / (uR * uR * 6.));
  float zone = exp(-pow((dist - uR) / (uR * .95), 2.));
  vec2 tang = vec2(-d.y, d.x) / max(dist, 1.);
  vec2 vel = vec2(0., -(48. + 36. * noise(p * .07 + vec2(0., uT * 2.))) * (1. - .55 * zone)) + sw * 52. + tang * 95. * zone + uV * .3 * wake;
  vec2 back = p - vel * dt;
  float h = texture(uPrev, vec2(back.x / uView.x, 1. - back.y / uView.y)).r;
  float cool = 5.2 + 4.8 * fbm(p * .06 + vec2(uT * .7, uT * 1.6)) + smoothstep(uR * 2., uR * 4.5, dist) * 6.;
  h *= exp(-cool * dt);
  float ang = atan(d.y, d.x);
  float rr = uR * (.86 + .22 * fbm(vec2(ang * 1.6 + uT * .8, uT * 1.3)));
  float ringW = uR * (.22 + .18 * noise(vec2(ang * 3., uT * 4.)));
  float ring = exp(-pow((dist - rr) / ringW, 2.)) * (1. - smoothstep(uR * .55, uR * .2, dist));
  float streak = fbm(vec2(ang * 2.4 + uSpin * 1.3, dist / uR * 1.7 - uT * .6));
  float wisp = noise(vec2(ang * 9. - uSpin * 2., dist * .35 + uT * 1.5));
  float pattern = smoothstep(.2, .7, streak) * (.7 + .3 * wisp);
  float flick = .5 + .75 * fbm(vec2(ang * 2.6 - uT * 1.3, uT * 9.));
  float c1 = exp(-pow(mod(ang - uSpin + 3.14159, 6.28318) - 3.14159, 2.) / 1.6);
  float c2 = exp(-pow(mod(ang - uSpin, 6.28318) - 3.14159, 2.) / 1.6);
  float crest = mix(.45, 1.25, max(c1, c2));
  float spark = pow(noise(vec2(ang * 14. + uT * 3., dist * .4 - uT * 5.)), 3.) * 1.8;
  float src = ring * (pattern * flick * crest * 1.5 + spark);
  if (uEdge > .001 && uRect.z > 0.) {
    vec2 b = uRect.zw * .5; vec2 rc = uRect.xy + b;
    vec2 q = abs(p - rc) - b + vec2(uCorner);
    float dBox = length(max(q, 0.)) + min(max(q.x, q.y), 0.) - uCorner;
    float onRim = exp(-dBox * dBox / (2.5 * 2.5));
    float nearC = exp(-dist * dist / (uR * uR * 6.5));
    float edgeFlame = onRim * nearC * (.6 + .6 * noise(p * .15 + vec2(0., uT * 4.)));
    src = max(src, edgeFlame * uEdge * 1.35);
  }
  h = max(h, src * uOn);
  o = vec4(clamp(h, 0., 3.), 0., 0., 1.);
}`;

  const FS_RENDER = `#version 300 es
precision highp float; precision highp sampler2D;
in vec2 vUv; out vec4 o;
uniform sampler2D uHeat; uniform vec2 uView, uC; uniform float uR, uDark, uDpr, uGlass;
uniform vec4 uRect; uniform float uCorner;
vec3 fire(float h){
  float t = clamp(h * .55, 0., 1.5);
  vec3 black = vec3(0.);
  vec3 deepSmoke = vec3(.10, .08, .07);
  vec3 red   = vec3(.85, .16, .02);
  vec3 orange= vec3(1.0, .46, .03);
  vec3 gold  = vec3(1.0, .82, .18);
  vec3 white = vec3(1.0, .98, .88);
  vec3 c = mix(black, deepSmoke, smoothstep(0., .08, t));
  c = mix(c, red,    smoothstep(.05, .28, t));
  c = mix(c, orange, smoothstep(.24, .58, t));
  c = mix(c, gold,   smoothstep(.52, .88, t));
  c = mix(c, white,  smoothstep(.84, 1.25, t));
  return c;
}
vec3 fireLight(float h){
  float t = clamp(h * .6, 0., 1.5);
  vec3 red    = vec3(.60, .08, .01);
  vec3 orange = vec3(.85, .28, .01);
  vec3 warm   = vec3(.95, .55, .08);
  vec3 white  = vec3(1.0, .95, .82);
  vec3 c = mix(vec3(0.), red, smoothstep(.04, .25, t));
  c = mix(c, orange, smoothstep(.20, .55, t));
  c = mix(c, warm,   smoothstep(.50, .85, t));
  c = mix(c, white,  smoothstep(.80, 1.25, t));
  return c;
}
float sdBox(vec2 p, vec2 b, float r){
  vec2 q = abs(p) - b + vec2(r);
  return length(max(q, 0.)) + min(max(q.x, q.y), 0.) - r;
}
void main(){
  float h = texture(uHeat, vUv).r;
  vec3 col = uDark > .5 ? fire(h) : fireLight(h);
  float a = smoothstep(.035, .22, h);
  vec2 p = vec2(vUv.x, 1. - vUv.y) * uView;
  float dCursor = length(p - uC);
  float core = exp(-dCursor * dCursor / (uR * uR * 1.4)) * smoothstep(.05, .4, h);
  col += (uDark > .5 ? vec3(.4, .2, .05) : vec3(.25, .1, .02)) * core;
  if (uGlass > .001 && uRect.z > 0.) {
    vec2 b = uRect.zw * .5; vec2 rc = uRect.xy + b;
    float sd = sdBox(p - rc, b, uCorner);
    if (sd < 6.) {
      vec2 dir = p - uC; float dist = length(dir);
      float rim = smoothstep(1.5, -1.5, abs(sd));
      float nearRim = exp(-dist * dist / (uR * uR * 14.));
      float rimGlow = rim * nearRim;
      vec3 rimCol = uDark > .5 ? vec3(1.0, .6, .18) : vec3(.9, .4, .08);
      col += rimCol * rimGlow * .75 * uGlass;
      a = max(a, rimGlow * .85 * uGlass);
      if (sd <= 0.) {
        float inGlow = exp(-dist * dist / (uR * uR * 24.)) * .35 * uGlass;
        col += rimCol * inGlow;
        a = max(a, inGlow);
      }
    }
  }
  o = vec4(col * a, a);
}`;

  const VSE = `#version 300 es
layout(location = 0) in vec2 aPos; layout(location = 1) in float aLife; layout(location = 2) in float aSize;
layout(location = 3) in float aHeat;
uniform vec2 uView; uniform float uDpr;
out float vLife; out float vHeat;
void main(){
  vLife = aLife; vHeat = aHeat;
  vec2 p = aPos / uView * 2. - 1.;
  gl_Position = vec4(p.x, 1. - p.y - 1., 0., 1.);
  gl_Position.y = -gl_Position.y;
  gl_PointSize = max(1., aSize * uDpr * (1. - aLife * .3));
}`;

  const FSE = `#version 300 es
precision highp float; in float vLife; in float vHeat; out vec4 o;
uniform float uDark;
void main(){
  vec2 c = gl_PointCoord - .5; float d2 = dot(c, c);
  if (d2 > .25) discard;
  float alpha = smoothstep(.25, .0, d2) * (1. - vLife);
  vec3 col = uDark > .5 ? mix(vec3(1.0, .85, .35), vec3(1.0, .25, .02), vLife)
                        : mix(vec3(.95, .55, .08), vec3(.65, .10, .01), vLife);
  o = vec4(col * alpha * 1.5, alpha);
}`;

  function compile(type, src) {
    const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) || 'compile');
    return s;
  }
  function prog(vs, fs, uniforms) {
    const p = gl.createProgram();
    const v = compile(gl.VERTEX_SHADER, vs), f = compile(gl.FRAGMENT_SHADER, fs);
    gl.attachShader(p, v); gl.attachShader(p, f); gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p) || 'link');
    const u = {}; for (const k of uniforms) u[k] = gl.getUniformLocation(p, k);
    return { p, u };
  }

  let P_HEAT, P_RENDER, PE;
  try {
    P_HEAT   = prog(VS, FS_HEAT, ['uPrev', 'uView', 'uC', 'uV', 'dt', 'uT', 'uOn', 'uR', 'uSpin', 'uEdge', 'uCorner', 'uRect']);
    P_RENDER = prog(VS, FS_RENDER, ['uHeat', 'uView', 'uC', 'uR', 'uDark', 'uDpr', 'uGlass', 'uRect', 'uCorner']);
    PE = prog(VSE, FSE, ['uView', 'uDpr', 'uDark']);
  } catch (e) { console.warn('[fire-cursor] disabled:', e.message); return noop; }

  document.body.appendChild(canvas);
  let style = null;
  if (O.hideCursor && fine) {
    style = document.createElement('style');
    style.textContent = 'html.fire-cursor-on,html.fire-cursor-on *,html.fire-cursor-on *::before,html.fire-cursor-on *::after{cursor:none!important}';
    document.head.appendChild(style); root.classList.add('fire-cursor-on');
  }

  let W = 0, H = 0, dpr = 1, simW = 0, simH = 0;
  const SIM_SCALE = .5;
  let texHeat = [null, null], fboHeat = [null, null], curHeat = 0;
  const floatType = gl.getExtension('EXT_color_buffer_float') ? gl.FLOAT : gl.HALF_FLOAT;

  function makeFBO(w, h) {
    const t = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, t);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.R16F, w, h, 0, gl.RED, floatType, null);
    const f = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, f);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, t, 0);
    return { t, f };
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    simW = Math.max(32, Math.round(W * dpr * SIM_SCALE));
    simH = Math.max(32, Math.round(H * dpr * SIM_SCALE));
    for (let i = 0; i < 2; i++) {
      if (texHeat[i]) gl.deleteTexture(texHeat[i]);
      if (fboHeat[i]) gl.deleteFramebuffer(fboHeat[i]);
      const fb = makeFBO(simW, simH);
      texHeat[i] = fb.t; fboHeat[i] = fb.f;
      gl.bindFramebuffer(gl.FRAMEBUFFER, fb.f);
      gl.clearColor(0, 0, 0, 1); gl.clear(gl.COLOR_BUFFER_BIT);
    }
  }
  resize();

  let cx = W * .5, cy = H * .5, vx = 0, vy = 0, lx = cx, ly = cy, lt = performance.now();
  let inside = false, spin = 0, hoverEdge = 0, curCorner = 0;
  let hRect = [0, 0, 0, 0], tRect = [0, 0, 0, 0];
  let hoverEl = null, onGlass = 0, tGlass = 0;
  let driving = false;

  const MAX_EMBERS = Math.min(O.embers, 400);
  const emberData = new Float32Array(MAX_EMBERS * 5);
  let emberCount = 0;
  const emberVBO = gl.createBuffer();
  const emberVAO = gl.createVertexArray();
  gl.bindVertexArray(emberVAO); gl.bindBuffer(gl.ARRAY_BUFFER, emberVBO);
  gl.bufferData(gl.ARRAY_BUFFER, emberData.byteLength, gl.DYNAMIC_DRAW);
  const F32 = 4;
  gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 5 * F32, 0);
  gl.enableVertexAttribArray(1); gl.vertexAttribPointer(1, 1, gl.FLOAT, false, 5 * F32, 2 * F32);
  gl.enableVertexAttribArray(2); gl.vertexAttribPointer(2, 1, gl.FLOAT, false, 5 * F32, 3 * F32);
  gl.enableVertexAttribArray(3); gl.vertexAttribPointer(3, 1, gl.FLOAT, false, 5 * F32, 4 * F32);
  gl.bindVertexArray(null);

  function spawnEmber(x, y, vvx, vvy) {
    if (emberCount >= MAX_EMBERS) return;
    const i = emberCount++; const off = i * 5;
    const a = Math.random() * 6.28318, sp = 12 + Math.random() * 40;
    emberData[off] = x + Math.cos(a) * (O.radius * .6);
    emberData[off + 1] = y + Math.sin(a) * (O.radius * .6);
    emberData[off + 2] = 0;
    emberData[off + 3] = 1.5 + Math.random() * 2.5;
    emberData[off + 4] = .6 + Math.random() * .8;
    emberData[off]     += (Math.random() - .5) * 4;
    emberData[off + 1] += (Math.random() - .5) * 4;
  }

  function updateEmbers(dt) {
    let w = 0;
    for (let r = 0; r < emberCount; r++) {
      const ro = r * 5, wo = w * 5;
      const life = emberData[ro + 2] + dt * (1.2 + emberData[ro + 4]);
      if (life >= 1) continue;
      const x = emberData[ro] + (Math.sin(life * 10. + r) * 18.) * dt;
      const y = emberData[ro + 1] - (35. + emberData[ro + 4] * 40.) * dt;
      emberData[wo] = x; emberData[wo + 1] = y; emberData[wo + 2] = life;
      emberData[wo + 3] = emberData[ro + 3]; emberData[wo + 4] = emberData[ro + 4];
      w++;
    }
    emberCount = w;
  }

  let dark = 1;
  function readTheme() {
    if (O.theme === 'dark') { dark = 1; return; }
    if (O.theme === 'light') { dark = 0; return; }
    dark = 1;
  }
  readTheme();

  function parseCorner(el) {
    if (!el) return 0;
    const cs = getComputedStyle(el);
    return parseFloat(cs.borderTopLeftRadius) || 0;
  }

  function point(x, y, target) {
    inside = true;
    const now = performance.now();
    const dt = Math.max(.001, Math.min(.1, (now - lt) / 1000));
    vx = (x - lx) / dt; vy = (y - ly) / dt;
    lx = x; ly = y; lt = now; cx = x; cy = y;
    if (target && target !== hoverEl) {
      hoverEl = target;
      const el = target.closest && target.closest(O.edgeSelector);
      if (el) {
        const r = el.getBoundingClientRect();
        tRect = [r.left, r.top, r.width, r.height];
        curCorner = parseCorner(el);
        hoverEdge = 1;
      } else {
        hoverEdge = 0;
      }
      if (O.glassSelector && target.closest && target.closest(O.glassSelector)) {
        tGlass = 1;
      } else {
        tGlass = 0;
      }
    }
    const speed = Math.hypot(vx, vy);
    const spawns = Math.min(4, Math.floor(speed / 180));
    for (let i = 0; i < spawns; i++) spawnEmber(cx, cy, vx, vy);
    wake();
  }

  function onMove(e) { point(e.clientX, e.clientY, e.target); }
  function onLeave() { inside = false; hoverEl = null; hoverEdge = 0; tGlass = 0; }
  function onTouch(e) { const t = e.touches[0]; if (t) point(t.clientX, t.clientY, document.elementFromPoint(t.clientX, t.clientY)); }
  function onTouchEnd() { inside = false; }

  addEventListener('pointermove', onMove, { passive: true });
  document.addEventListener('pointerleave', onLeave);
  addEventListener('touchstart', onTouch, { passive: true });
  addEventListener('touchmove', onTouch, { passive: true });
  addEventListener('touchend', onTouchEnd);
  addEventListener('touchcancel', onTouchEnd);
  addEventListener('blur', onLeave);
  addEventListener('resize', resize);

  let raf = null, lastFrame = performance.now(), sleeping = false, alive = true;

  function wake() {
    if (sleeping && alive) {
      sleeping = false;
      lastFrame = performance.now();
      raf = requestAnimationFrame(tick);
    }
  }

  function tick(now) {
    if (!alive) return;
    const dt = Math.max(.001, Math.min(.05, (now - lastFrame) / 1000));
    lastFrame = now;
    spin += dt * 2.2;
    for (let k = 0; k < 4; k++) hRect[k] += (tRect[k] - hRect[k]) * Math.min(1, dt * 14);
    onGlass += (tGlass - onGlass) * Math.min(1, dt * 10);
    const readHeat = curHeat, writeHeat = 1 - curHeat;

    gl.viewport(0, 0, simW, simH);
    gl.bindFramebuffer(gl.FRAMEBUFFER, fboHeat[writeHeat]);
    gl.useProgram(P_HEAT.p);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texHeat[readHeat]);
    gl.uniform1i(P_HEAT.u.uPrev, 0);
    gl.uniform2f(P_HEAT.u.uView, W, H);
    gl.uniform2f(P_HEAT.u.uC, cx, cy);
    gl.uniform2f(P_HEAT.u.uV, vx, vy);
    gl.uniform1f(P_HEAT.u.dt, dt);
    gl.uniform1f(P_HEAT.u.uT, now * .001);
    gl.uniform1f(P_HEAT.u.uOn, inside ? 1 : 0);
    gl.uniform1f(P_HEAT.u.uR, O.radius);
    gl.uniform1f(P_HEAT.u.uSpin, spin);
    gl.uniform1f(P_HEAT.u.uEdge, hoverEdge);
    gl.uniform1f(P_HEAT.u.uCorner, curCorner);
    gl.uniform4f(P_HEAT.u.uRect, hRect[0], hRect[1], hRect[2], hRect[3]);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    curHeat = writeHeat;

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    gl.useProgram(P_RENDER.p);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texHeat[curHeat]);
    gl.uniform1i(P_RENDER.u.uHeat, 0);
    gl.uniform2f(P_RENDER.u.uView, W, H);
    gl.uniform2f(P_RENDER.u.uC, cx, cy);
    gl.uniform1f(P_RENDER.u.uR, O.radius);
    gl.uniform1f(P_RENDER.u.uDark, dark);
    gl.uniform1f(P_RENDER.u.uDpr, dpr);
    gl.uniform1f(P_RENDER.u.uGlass, onGlass * O.glassStrength);
    gl.uniform4f(P_RENDER.u.uRect, hRect[0], hRect[1], hRect[2], hRect[3]);
    gl.uniform1f(P_RENDER.u.uCorner, curCorner);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    updateEmbers(dt);
    if (emberCount > 0) {
      gl.useProgram(PE.p);
      gl.uniform2f(PE.u.uView, W, H);
      gl.uniform1f(PE.u.uDpr, dpr);
      gl.uniform1f(PE.u.uDark, dark);
      gl.bindVertexArray(emberVAO);
      gl.bindBuffer(gl.ARRAY_BUFFER, emberVBO);
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, emberData.subarray(0, emberCount * 5));
      gl.blendFunc(gl.ONE, gl.ONE);
      gl.drawArrays(gl.POINTS, 0, emberCount);
      gl.bindVertexArray(null);
    }
    gl.disable(gl.BLEND);

    if (!inside && emberCount === 0) {
      sleeping = true;
      return;
    }
    raf = requestAnimationFrame(tick);
  }

  lastFrame = performance.now();
  raf = requestAnimationFrame(tick);

  function destroy() {
    if (!alive) return;
    alive = false;
    if (raf) cancelAnimationFrame(raf);
    removeEventListener('pointermove', onMove);
    document.removeEventListener('pointerleave', onLeave);
    removeEventListener('touchstart', onTouch);
    removeEventListener('touchmove', onTouch);
    removeEventListener('touchend', onTouchEnd);
    removeEventListener('touchcancel', onTouchEnd);
    removeEventListener('blur', onLeave);
    removeEventListener('resize', resize);
    root.classList.remove('fire-cursor-on');
    if (style) style.remove();
    canvas.remove();
    const lose = gl.getExtension('WEBGL_lose_context');
    if (lose) lose.loseContext();
  }

  return { running: true, destroy };
}

const SMOKE_DEFAULTS = {
  selector: 'button, a, input, textarea, select, [role="button"], h1, h2, h3, [data-smoke], [data-smoke-text]',
  textSelector: 'h1, h2, h3, [data-smoke-text]',
  float: true,
  floatSelector: 'button, a, input, textarea, select, [role="button"], h1, h2, h3, p, li, img, [data-smoke], [data-float]',
  density: 1,
  linger: 1,
  theme: 'auto',
  lightSmoke: [.07, .07, .08],
  darkSmoke: [.93, .93, .95],
  zIndex: 2147482000,
  touch: true,
  respectReducedMotion: true
};

function initSmokeHover(options) {
  const O = Object.assign({}, SMOKE_DEFAULTS, options || {});
  const noop = { destroy() {}, setTheme() {}, running: false };
  if (typeof window === 'undefined' || !window.matchMedia) return noop;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!fine && !O.touch) return noop;
  if (O.respectReducedMotion && matchMedia('(prefers-reduced-motion: reduce)').matches) return noop;

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  let alive = true, E = null;

  const VS = `#version 300 es
precision highp float;uniform vec2 texelSize;out vec2 vUv, vL, vR, vT, vB;
void main(){
  vec2 p = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2);
  vUv = p; gl_Position = vec4(p * 2. - 1., 0., 1.);
  vL = vUv - vec2(texelSize.x, 0.); vR = vUv + vec2(texelSize.x, 0.);
  vT = vUv + vec2(0., texelSize.y); vB = vUv - vec2(0., texelSize.y);
}`;

  const H = `#version 300 es\nprecision highp float; precision highp sampler2D;in vec2 vUv, vL, vR, vT, vB; out vec4 o;\n`;
  const FS = {
    advect: H + `uniform sampler2D uVelocity, uSource; uniform vec2 texelSize; uniform float dt, dissipation;
void main(){ vec2 c = vUv - dt * texture(uVelocity, vUv).xy * texelSize; o = texture(uSource, c) / (1. + dissipation * dt); }`,
    divergence: H + `uniform sampler2D uVelocity; uniform vec2 halfTexel;
void main(){ float L = texture(uVelocity, vL).x; float R = texture(uVelocity, vR).x; float T = texture(uVelocity, vT).y; float B = texture(uVelocity, vB).y;
  o = vec4(.5 * ((R - L) * halfTexel.x + (T - B) * halfTexel.y), 0., 0., 1.); }`,
    pressure: H + `uniform sampler2D uPressure, uDivergence;
void main(){ float L = texture(uPressure, vL).r; float R = texture(uPressure, vR).r; float T = texture(uPressure, vT).r; float B = texture(uPressure, vB).r;
  float div = texture(uDivergence, vUv).r; o = vec4((L + R + T + B - div) * .25, 0., 0., 1.); }`,
    subtract: H + `uniform sampler2D uPressure, uVelocity; uniform vec2 halfTexel;
void main(){ float L = texture(uPressure, vL).r; float R = texture(uPressure, vR).r; float T = texture(uPressure, vT).r; float B = texture(uPressure, vB).r;
  vec2 v = texture(uVelocity, vUv).xy - vec2(R - L, T - B) * halfTexel; o = vec4(v, 0., 1.); }`,
    splat: H + `uniform sampler2D uTarget; uniform vec2 point; uniform vec3 color; uniform float radius; uniform vec2 uView;
void main(){ vec2 p = vUv - point; p.x *= uView.x / uView.y; float d = exp(-dot(p, p) / radius);
  vec3 base = texture(uTarget, vUv).xyz; o = vec4(base + color * d, 1.); }`,
    display: H + `uniform sampler2D uDensity; uniform vec3 uColor;
void main(){ float d = texture(uDensity, vUv).r; o = vec4(uColor, clamp(d * 1.5, 0., 1.)); }`
  };

  function makeEngine() {
    const canvas = document.createElement('canvas');
    canvas.setAttribute('aria-hidden', 'true');
    canvas.style.cssText = `position:fixed;left:0;top:0;width:100vw;height:100vh;pointer-events:none;z-index:${O.zIndex}`;
    const gl = canvas.getContext('webgl2', { alpha: true, depth: false, stencil: false });
    if (!gl) return null;
    document.body.appendChild(canvas);

    const extFloat = gl.getExtension('EXT_color_buffer_float');
    const type = extFloat ? gl.FLOAT : gl.HALF_FLOAT;

    function compile(type, src) {
      const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
      return s;
    }
    function prog(fs) {
      const p = gl.createProgram();
      gl.attachShader(p, compile(gl.VERTEX_SHADER, VS));
      gl.attachShader(p, compile(gl.FRAGMENT_SHADER, fs));
      gl.linkProgram(p);
      return p;
    }

    const P = {
      advect: prog(FS.advect),
      divergence: prog(FS.divergence),
      pressure: prog(FS.pressure),
      subtract: prog(FS.subtract),
      splat: prog(FS.splat),
      display: prog(FS.display)
    };

    let simW = 128, simH = 128;
    function makeFBO() {
      const t = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, t);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, simW, simH, 0, gl.RGBA, type, null);
      const f = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, f);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, t, 0);
      return { t, f };
    }

    const density = [makeFBO(), makeFBO()];
    const velocity = [makeFBO(), makeFBO()];
    const divergence = makeFBO();
    const pressure = [makeFBO(), makeFBO()];

    return {
      canvas, gl, P, density, velocity, divergence, pressure,
      resize(w, h) {
        canvas.width = w; canvas.height = h;
      }
    };
  }

  try {
    E = makeEngine();
  } catch (e) {
    console.warn('[smoke-hover] disabled:', e);
  }

  function destroy() {
    if (!alive) return;
    alive = false;
    if (E?.canvas) E.canvas.remove();
  }

  return { running: true, destroy };
}

export default function CustomCursor() {
  const fireInstanceRef = useRef(null);
  const smokeInstanceRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isFinePointer) return;

    const BOX_SELECTORS = [
      "a",
      "button",
      "input",
      "textarea",
      "select",
      "[role='button']",
      ".glass-card",
      ".fc-glass",
      "[data-fire-edge]",
      "[data-smoke]",
      ".clickable"
    ].join(", ");

    const TEXT_SELECTORS = "h1, h2, h3, h4, [data-smoke-text], .smoke-text, .typewriter-text";
    const ALL_SMOKE_SELECTORS = `${TEXT_SELECTORS}, ${BOX_SELECTORS}`;

    try {
      fireInstanceRef.current = initFireCursor({
        radius: 14,
        embers: 180,
        glassSelector: ".fc-glass, .glass-card",
        glassStrength: 0.35,
        edgeSelector: BOX_SELECTORS,
        growSelector: BOX_SELECTORS,
        hideCursor: true,
        theme: "dark",
        touch: false,
        respectReducedMotion: true,
        zIndex: 2147483000,
      });
    } catch (err) {
      console.warn("[FireCursor] init error:", err);
    }

    try {
      smokeInstanceRef.current = initSmokeHover({
        selector: ALL_SMOKE_SELECTORS,
        textSelector: TEXT_SELECTORS,
        floatSelector: BOX_SELECTORS,
        float: true,
        density: 1.15,
        linger: 1.05,
        theme: "dark",
        darkSmoke: [0.92, 0.92, 0.95],
        touch: false,
        respectReducedMotion: true,
        zIndex: 2147482000,
      });
    } catch (err) {
      console.warn("[SmokeHover] init error:", err);
    }

    return () => {
      try {
        if (fireInstanceRef.current && typeof fireInstanceRef.current.destroy === "function") {
          fireInstanceRef.current.destroy();
          fireInstanceRef.current = null;
        }
      } catch (err) {
        console.warn("[FireCursor] cleanup error:", err);
      }

      try {
        if (smokeInstanceRef.current && typeof smokeInstanceRef.current.destroy === "function") {
          smokeInstanceRef.current.destroy();
          smokeInstanceRef.current = null;
        }
      } catch (err) {
        console.warn("[SmokeHover] cleanup error:", err);
      }
    };
  }, []);

  return null;
}
