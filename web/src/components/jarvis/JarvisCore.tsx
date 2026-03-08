import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import "./jarvis-core.css";
import { store } from "../../services/state.js";
import { CORE_CONFIG, type JarvisMode } from "./jarvisCoreConfig";

import { createPointField, updatePointField } from "./jarvisPointField";

interface JarvisCoreProps {
  mode: JarvisMode;
  audioLevel?: number;
  size?: number;
}

export const JarvisCore: React.FC<JarvisCoreProps> = ({ mode, size = 540 }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  const modeRef = useRef<JarvisMode>(mode);
  const audioLevelRef = useRef(0);
  const smoothedAudioRef = useRef(0);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    const sub = store.subscribe((state: any) => {
      audioLevelRef.current = state.audioLevel || 0;
    });
    return () => {
      if (typeof sub === "function") sub();
    };
  }, []);

  useEffect(() => {
    if (!mountRef.current) return;

    mountRef.current.innerHTML = "";
    console.log("[JarvisCore] V5.17-STABLE Initialisation");

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = CORE_CONFIG.cameraZ;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(size, size);

    const canvas = renderer.domElement;
    mountRef.current.appendChild(canvas);
    rendererRef.current = renderer;

    const mainField = createPointField({
      count: CORE_CONFIG.mainCount,
      radius: CORE_CONFIG.radius,
      depth: CORE_CONFIG.depth,
      pointSize: CORE_CONFIG.basePointSize,
      opacity: 0.5,
    });

    const haloField = createPointField({
      count: CORE_CONFIG.haloCount,
      radius: CORE_CONFIG.radius * 1.35,
      depth: CORE_CONFIG.depth * 1.35,
      pointSize: CORE_CONFIG.haloPointSize,
      opacity: 0.2,
    });

    scene.add(haloField.points);
    scene.add(mainField.points);

    const animate = (t: number) => {
      const time = t * 0.001;
      const currentMode = modeRef.current;

      const smoothing = CORE_CONFIG.smoothing || 0.15;
      smoothedAudioRef.current +=
        (audioLevelRef.current - smoothedAudioRef.current) * smoothing;

      updatePointField(
        haloField,
        time * 0.5,
        smoothedAudioRef.current * 0.4,
        currentMode,
        1.05,
      );
      updatePointField(
        mainField,
        time,
        smoothedAudioRef.current,
        currentMode,
        1.0,
      );

      mainField.points.rotation.y = time * 0.05;
      renderer.render(scene, camera);
      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameRef.current);
      renderer.dispose();
      mainField.geometry.dispose();
      mainField.material.dispose();
      haloField.geometry.dispose();
      haloField.material.dispose();
    };
  }, [size]);

  return (
    <div className={`jarvis-core jarvis-core--${mode}`}>
      <div className="jarvis-core__glow" />
      <div ref={mountRef} className="jarvis-core__canvas" />
      <div className="jarvis-core__label">
        <span className="label-status">
          {mode === "idle"
            ? "VEILLE"
            : mode === "thinking"
              ? "ANALYSE"
              : "RÉPONSE"}
        </span>
        <span className="label-id">JARVIS-CORE // V5.17-FINAL</span>
      </div>
    </div>
  );
};
