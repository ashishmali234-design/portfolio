"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface StylizedAvatarProps {
  isOpen: boolean;
}

export default function StylizedAvatar3D({ isOpen }: StylizedAvatarProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const isOpenRef = useRef(isOpen);
  isOpenRef.current = isOpen;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // --- Scene & Camera ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0.35, 3.2);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(110, 110);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
    scene.add(ambientLight);

    const frontLight = new THREE.DirectionalLight(0xfff7ed, 2.4);
    frontLight.position.set(2, 3, 3);
    scene.add(frontLight);

    const amberRimLight = new THREE.DirectionalLight(0xf59e0b, 3.8); // Portfolio signature amber glow
    amberRimLight.position.set(-2.5, 1.5, -2);
    scene.add(amberRimLight);

    // --- Materials ---
    const skinMat = new THREE.MeshStandardMaterial({
      color: 0xdeb887,
      roughness: 0.55,
      metalness: 0.05,
    });
    const hairMat = new THREE.MeshStandardMaterial({
      color: 0x181513,
      roughness: 0.85,
    });
    const glassesMat = new THREE.MeshStandardMaterial({
      color: 0x111111,
      metalness: 0.9,
      roughness: 0.2,
    });
    const hoodieMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      roughness: 0.7,
    });
    const amberAccentMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xf59e0b,
      emissiveIntensity: 0.4,
    });
    const denimMat = new THREE.MeshStandardMaterial({
      color: 0x253248,
      roughness: 0.8,
    });
    const sneakerMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      roughness: 0.4,
    });
    const eyeWhiteMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const pupilMat = new THREE.MeshBasicMaterial({ color: 0x090b0e });

    // --- Character Rigging Root ---
    const root = new THREE.Group();
    scene.add(root);

    // Torso / Hoodie
    const torsoGeo = new THREE.CylinderGeometry(0.3, 0.36, 0.6, 24);
    const torso = new THREE.Mesh(torsoGeo, hoodieMat);
    torso.position.y = 0;
    root.add(torso);

    // Amber Badge
    const badgeGeo = new THREE.BoxGeometry(0.07, 0.07, 0.02);
    const badge = new THREE.Mesh(badgeGeo, amberAccentMat);
    badge.position.set(0.11, 0.1, 0.34);
    root.add(badge);

    // Head Pivot (Rotates toward cursor)
    const headPivot = new THREE.Group();
    headPivot.position.set(0, 0.4, 0);
    root.add(headPivot);

    // Head
    const headGeo = new THREE.SphereGeometry(0.36, 32, 32);
    headGeo.scale(1, 1.08, 0.96);
    const head = new THREE.Mesh(headGeo, skinMat);
    headPivot.add(head);

    // Hair
    const hairGroup = new THREE.Group();
    const hairBaseGeo = new THREE.SphereGeometry(0.375, 24, 24);
    const hairBase = new THREE.Mesh(hairBaseGeo, hairMat);
    hairBase.position.set(0, 0.08, -0.03);
    hairBase.scale.set(1.02, 1.02, 0.96);
    hairGroup.add(hairBase);

    // Front Quiff
    const tuftGeo = new THREE.ConeGeometry(0.16, 0.28, 16);
    tuftGeo.rotateZ(-0.35);
    const tuft = new THREE.Mesh(tuftGeo, hairMat);
    tuft.position.set(0.08, 0.38, 0.2);
    hairGroup.add(tuft);
    headPivot.add(hairGroup);

    // Designer Glasses
    const glassesGroup = new THREE.Group();
    const frameGeo = new THREE.TorusGeometry(0.09, 0.015, 12, 24);

    const leftRim = new THREE.Mesh(frameGeo, glassesMat);
    leftRim.position.set(-0.14, 0.04, 0.34);
    glassesGroup.add(leftRim);

    const rightRim = new THREE.Mesh(frameGeo, glassesMat);
    rightRim.position.set(0.14, 0.04, 0.34);
    glassesGroup.add(rightRim);

    const bridgeGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.1);
    bridgeGeo.rotateZ(Math.PI / 2);
    const bridge = new THREE.Mesh(bridgeGeo, glassesMat);
    bridge.position.set(0, 0.04, 0.345);
    glassesGroup.add(bridge);
    headPivot.add(glassesGroup);

    // Eyes & Pupils
    const eyeGroup = new THREE.Group();
    const eyeGeo = new THREE.SphereGeometry(0.045, 16, 16);
    const pupilGeo = new THREE.SphereGeometry(0.024, 16, 16);

    const leftEye = new THREE.Mesh(eyeGeo, eyeWhiteMat);
    leftEye.position.set(-0.14, 0.04, 0.32);
    const leftPupil = new THREE.Mesh(pupilGeo, pupilMat);
    leftPupil.position.set(-0.14, 0.04, 0.355);
    eyeGroup.add(leftEye, leftPupil);

    const rightEye = new THREE.Mesh(eyeGeo, eyeWhiteMat);
    rightEye.position.set(0.14, 0.04, 0.32);
    const rightPupil = new THREE.Mesh(pupilGeo, pupilMat);
    rightPupil.position.set(0.14, 0.04, 0.355);
    eyeGroup.add(rightEye, rightPupil);
    headPivot.add(eyeGroup);

    // Dangling Legs
    const legGeo = new THREE.CylinderGeometry(0.075, 0.065, 0.35, 16);
    const shoeGeo = new THREE.BoxGeometry(0.11, 0.08, 0.18);

    const leftLegGroup = new THREE.Group();
    leftLegGroup.position.set(-0.16, -0.3, 0.1);
    const leftLeg = new THREE.Mesh(legGeo, denimMat);
    leftLeg.position.y = -0.15;
    const leftShoe = new THREE.Mesh(shoeGeo, sneakerMat);
    leftShoe.position.set(0, -0.32, 0.04);
    leftLegGroup.add(leftLeg, leftShoe);
    root.add(leftLegGroup);

    const rightLegGroup = new THREE.Group();
    rightLegGroup.position.set(0.16, -0.3, 0.1);
    const rightLeg = new THREE.Mesh(legGeo, denimMat);
    rightLeg.position.y = -0.15;
    const rightShoe = new THREE.Mesh(shoeGeo, sneakerMat);
    rightShoe.position.set(0, -0.32, 0.04);
    rightLegGroup.add(rightLeg, rightShoe);
    root.add(rightLegGroup);

    // --- Cursor Tracking Variables ---
    const targetHeadRot = { x: 0, y: 0 };
    const currentHeadRot = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      targetHeadRot.y = THREE.MathUtils.clamp(normX * 0.7, -0.65, 0.65);
      targetHeadRot.x = THREE.MathUtils.clamp(-normY * 0.45, -0.35, 0.35);
    };
    window.addEventListener("mousemove", handleMouseMove);

    // --- Animation Loop ---
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Breathing bob
      const breath = Math.sin(time * 2.2) * 0.015;
      torso.position.y = breath;
      headPivot.position.y = 0.4 + breath * 1.2;

      // Playful leg swinging
      leftLegGroup.rotation.x = Math.sin(time * 2.4) * 0.15 + 0.1;
      rightLegGroup.rotation.x = Math.cos(time * 2.4) * 0.15 + 0.1;

      // Eye blinking
      const blinkCycle = time % 4.0;
      const isBlinking = blinkCycle > 3.82 && blinkCycle < 3.98;
      leftEye.scale.y = isBlinking ? 0.1 : 1;
      rightEye.scale.y = isBlinking ? 0.1 : 1;

      // Smooth Head Tracking
      currentHeadRot.x += (targetHeadRot.x - currentHeadRot.x) * 0.08;
      currentHeadRot.y += (targetHeadRot.y - currentHeadRot.y) * 0.08;
      headPivot.rotation.x = currentHeadRot.x;
      headPivot.rotation.y = currentHeadRot.y;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-[110px] h-[110px] pointer-events-none flex items-center justify-center select-none"
    />
  );
}
