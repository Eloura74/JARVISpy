import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import "./jarvis-core.css";
import { store } from "../../services/state.js";
import {
  CORE_CONFIG,
  JARVIS_COLORS,
  type JarvisMode,
} from "./jarvisCoreConfig";

import { createPointField, updatePointField } from "./jarvisPointField";

interface JarvisCoreProps {
  mode: JarvisMode;
  audioLevel?: number;
  size?: number;
}

/**
 * JARVIS-CORE V5.6 - PURE PARTICLES
 * On supprime Nucleus et Rings pour garder la finesse du mode "veille" partout.
 * Seuls la couleur et le grossissement varient.
 */
export const JarvisCore: React.FC<JarvisCoreProps> = ({ mode, size = 540 }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  const modeRef = useRef<JarvisMode>(mode);
  const audioLevelRef = useRef(0);
  const smoothedAudioRef = useRef(0);

  // Sync mode sans re-render 3D
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

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, size / size, 0.1, 100);
    camera.position.z = CORE_CONFIG.cameraZ;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(size, size);

    mountRef.current.innerHTML = "";
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 1. Point Fields (Uniquement les particules pour la finesse)
    const mainField = createPointField({
      count: CORE_CONFIG.mainCount,
      radius: CORE_CONFIG.radius,
      depth: CORE_CONFIG.depth,
      pointSize: CORE_CONFIG.basePointSize,
      opacity: 0.45,
    });

    const haloField = createPointField({
      count: CORE_CONFIG.haloCount,
      radius: CORE_CONFIG.radius * 1.3,
      depth: CORE_CONFIG.depth * 1.5,
      pointSize: CORE_CONFIG.haloPointSize,
      opacity: 0.15,
    });

    scene.add(haloField.points);
    scene.add(mainField.points);

    const animate = (t: number) => {
      const time = t * 0.001;
      const currentMode = modeRef.current;

      const smoothing = CORE_CONFIG.smoothing || 0.12;
      smoothedAudioRef.current +=
        (audioLevelRef.current - smoothedAudioRef.current) * smoothing;

      let effectiveAudio = smoothedAudioRef.current;
      if (currentMode === "speaking") {
        effectiveAudio = Math.max(
          effectiveAudio,
          0.1 + Math.sin(time * 8) * 0.05,
        );
      }

      // Update Particles (Finesse absolue)
      updatePointField(
        haloField,
        time * 0.6,
        effectiveAudio * 0.5,
        currentMode,
        1.1,
      );
      updatePointField(mainField, time, effectiveAudio, currentMode, 1);

      mainField.points.rotation.y = time * 0.1;
      haloField.points.rotation.y = -time * 0.04;

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
          {mode === "idle" || mode === "listening"
            ? "VEILLE"
            : mode === "thinking"
              ? "ANALYSE"
              : "RÉPONSE"}
        </span>
        <span className="label-id">JARVIS-CORE // V5.6</span>
      </div>
    </div>
  );
};
