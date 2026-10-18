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

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0.4, 3.2);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(120, 120);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    mount.appendChild(renderer.domElement);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff5e6, 2.2);
    keyLight.position.set(2, 3, 3);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xf59e0b, 3.5); // Amber signature rim
    rimLight.position.set(-2.5, 1.5, -2);
    scene.add(rimLight);

    // --- Materials ---
    const skinMat = new THREE.MeshStandardMaterial({
      color: 0xdeb887,
      roughness: 0.55,
      metalness: 0.05,
    });
    const hairMat = new THREE.MeshStandardMaterial({
      color: 0x1f1b18,
      roughness: 0.8,
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
      emissiveIntensity: 0.35,
    });
    const denimMat = new THREE.MeshStandardMaterial({
      color: 0x253248,
      roughness: 0.8,
    });
    const sneakerMat = new THREE.MeshStandardMaterial({
      color: 0xeeeeee,
      roughness: 0.4,
    });
    const eyeWhiteMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const pupilMat = new THREE.MeshBasicMaterial({ color: 0x0f172a });

    // --- Character Root & Hierarchy ---
    const root = new THREE.Group();
    scene.add(root);

    // --- Torso / Hoodie ---
    const torsoGeo = new THREE.CylinderGeometry(0.32, 0.38, 0.65, 24);
    const torso = new THREE.Mesh(torsoGeo, hoodieMat);
    torso.position.y = 0;
    root.add(torso);

    // Amber Hoodie Drawstrings & Badge
    const badgeGeo = new THREE.BoxGeometry(0.08, 0.08, 0.02);
    const badge = new THREE.Mesh(badgeGeo, amberAccentMat);
    badge.position.set(0.12, 0.12, 0.36);
    root.add(badge);

    // --- Head Pivot (Rotates to track cursor) ---
    const headPivot = new THREE.Group();
    headPivot.position.set(0, 0.42, 0);
    root.add(headPivot);

    // Head Mesh
    const headGeo = new THREE.SphereGeometry(0.38, 32, 32);
    headGeo.scale(1, 1.08, 0.95);
    const head = new THREE.Mesh(headGeo, skinMat);
    headPivot.add(head);

    // Modern Stylized Hair
    const hairGroup = new THREE.Group();
    const hairBaseGeo = new THREE.SphereGeometry(0.39, 24, 24);
    const hairBase = new THREE.Mesh(hairBaseGeo, hairMat);
    hairBase.position.set(0, 0.08, -0.04);
    hairBase.scale.set(1.02, 1.02, 0.95);
    hairGroup.add(hairBase);

    // Hair Tuft / Front Quiff
    const tuftGeo = new THREE.ConeGeometry(0.18, 0.3, 16);
    tuftGeo.rotateZ(-0.35);
    const tuft = new THREE.Mesh(tuftGeo, hairMat);
    tuft.position.set(0.08, 0.4, 0.2);
    hairGroup.add(tuft);
    headPivot.add(hairGroup);

    // Designer Glasses Frame
    const glassesGroup = new THREE.Group();
    const frameGeo = new THREE.TorusGeometry(0.1, 0.016, 12, 24);

    const leftRim = new THREE.Mesh(frameGeo, glassesMat);
    leftRim.position.set(-0.15, 0.04, 0.36);
    glassesGroup.add(leftRim);

    const rightRim = new THREE.Mesh(frameGeo, glassesMat);
    rightRim.position.set(0.15, 0.04, 0.36);
    glassesGroup.add(rightRim);

    const bridgeGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.12);
    bridgeGeo.rotateZ(Math.PI / 2);
    const bridge = new THREE.Mesh(bridgeGeo, glassesMat);
    bridge.position.set(0, 0.04, 0.365);
    glassesGroup.add(bridge);
    headPivot.add(glassesGroup);

    // Eyes & Pupils
    const eyeGroup = new THREE.Group();
    const eyeGeo = new THREE.SphereGeometry(0.05, 16, 16);
    const pupilGeo = new THREE.SphereGeometry(0.026, 16, 16);

    const leftEye = new THREE.Mesh(eyeGeo, eyeWhiteMat);
    leftEye.position.set(-0.15, 0.04, 0.33);
    const leftPupil = new THREE.Mesh(pupilGeo, pupilMat);
    leftPupil.position.set(-0.15, 0.04, 0.37);
    eyeGroup.add(leftEye, leftPupil);

    const rightEye = new THREE.Mesh(eyeGeo, eyeWhiteMat);
    rightEye.position.set(0.15, 0.04, 0.33);
    const rightPupil = new THREE.Mesh(pupilGeo, pupilMat);
    rightPupil.position.set(0.15, 0.04, 0.37);
    eyeGroup.add(rightEye, rightPupil);

    headPivot.add(eyeGroup);

    // --- Dangling Legs (Animated sitting) ---
    const legGeo = new THREE.CylinderGeometry(0.08, 0.07, 0.38, 16);
    const shoeGeo = new THREE.BoxGeometry(0.12, 0.09, 0.2);

    const leftLegGroup = new THREE.Group();
    leftLegGroup.position.set(-0.18, -0.32, 0.12);
    const leftLeg = new THREE.Mesh(legGeo, denimMat);
    leftLeg.position.y = -0.16;
    const leftShoe = new THREE.Mesh(shoeGeo, sneakerMat);
    leftShoe.position.set(0, -0.34, 0.05);
    leftLegGroup.add(leftLeg, leftShoe);
    root.add(leftLegGroup);

    const rightLegGroup = new THREE.Group();
    rightLegGroup.position.set(0.18, -0.32, 0.12);
    const rightLeg = new THREE.Mesh(legGeo, denimMat);
    rightLeg.position.y = -0.16;
    const rightShoe = new THREE.Mesh(shoeGeo, sneakerMat);
    rightShoe.position.set(0, -0.34, 0.05);
    rightLegGroup.add(rightLeg, rightShoe);
    root.add(rightLegGroup);

    // --- Cursor Tracking Variables ---
    const targetHeadRot = { x: 0, y: 0 };
    const currentHeadRot = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      // Head follows cursor horizontally and vertically within natural limits
      targetHeadRot.y = THREE.MathUtils.clamp(normX * 0.75, -0.65, 0.65);
      targetHeadRot.x = THREE.MathUtils.clamp(-normY * 0.45, -0.35, 0.35);
    };
    window.addEventListener("mousemove", handleMouseMove);

    // --- Animation Loop ---
    let animId: number;
    let clock = new THREE.Clock();
    let jumpProgress = 1;
    let previousIsOpen = isOpenRef.current;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Trigger jump when open state changes
      if (previousIsOpen !== isOpenRef.current) {
        previousIsOpen = isOpenRef.current;
        jumpProgress = 0;
      }

      // Smooth Jump Physics
      if (jumpProgress < 1) {
        jumpProgress += 0.045;
        const jumpCurve = Math.sin(jumpProgress * Math.PI);
        root.position.y = jumpCurve * 0.45;
        root.rotation.x = Math.sin(jumpProgress * Math.PI * 2) * 0.2;
      } else {
        root.position.y = 0;
        root.rotation.x = 0;
      }

      // Breathing & subtle bobbing
      const breath = Math.sin(time * 2.2) * 0.015;
      torso.position.y = breath;
      headPivot.position.y = 0.42 + breath * 1.2;

      // Cute playful leg swinging
      leftLegGroup.rotation.x = Math.sin(time * 2.5) * 0.12 + 0.1;
      rightLegGroup.rotation.x = Math.cos(time * 2.5) * 0.12 + 0.1;

      // Natural eye blinking
      const blinkCycle = time % 4.2;
      const isBlinking = blinkCycle > 4.0 && blinkCycle < 4.15;
      leftEye.scale.y = isBlinking ? 0.1 : 1;
      rightEye.scale.y = isBlinking ? 0.1 : 1;

      // Smooth Lerp Head Rotation towards mouse
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
      className="w-[120px] h-[120px] pointer-events-none flex items-center justify-center select-none"
    />
  );
}
