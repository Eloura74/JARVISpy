import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import "./jarvis-core.css";
import { store } from "../../services/state.js";
import { CORE_CONFIG, type JarvisMode } from "./jarvisCoreConfig";

import {
  createPointField,
  updatePointField,
  type PointField,
} from "./jarvisPointField";
import { useSmoothedAudioLevel } from "./useSmoothedAudioLevel";

interface JarvisCoreProps {
  mode: JarvisMode;
  audioLevel?: number; // 0 → 1
  size?: number;
}

export const JarvisCore: React.FC<JarvisCoreProps> = ({ mode, size = 540 }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const mainFieldRef = useRef<PointField | null>(null);
  const haloFieldRef = useRef<PointField | null>(null);

  // Audio state via refs pour éviter les re-renders React
  const audioLevelRef = useRef(0);
  const smoothedAudioRef = useRef(0);

  useEffect(() => {
    // Souscription directe au store pour l'audio (60fps sans re-render)
    const unsubscribe = store.subscribe((state: any) => {
      audioLevelRef.current = state.audioLevel || 0;
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = size;
    const height = size;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = CORE_CONFIG.cameraZ;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";

    mountRef.current.innerHTML = "";
    mountRef.current.appendChild(renderer.domElement);

    const mainField = createPointField({
      count: CORE_CONFIG.mainCount,
      radius: CORE_CONFIG.radius,
      depth: CORE_CONFIG.depth,
      pointSize: CORE_CONFIG.basePointSize,
      opacity: 0.55,
    });

    const haloField = createPointField({
      count: CORE_CONFIG.haloCount,
      radius: CORE_CONFIG.radius * 1.35,
      depth: CORE_CONFIG.depth * 1.6,
      pointSize: CORE_CONFIG.haloPointSize,
      opacity: 0.22,
    });

    scene.add(haloField.points);
    scene.add(mainField.points);

    const animate = (t: number) => {
      const time = t * 0.001;

      // Lissage manuel à chaque frame (plus efficace que via state React)
      const smoothing = CORE_CONFIG.smoothing || 0.15;
      smoothedAudioRef.current +=
        (audioLevelRef.current - smoothedAudioRef.current) * smoothing;

      let effectiveAudio = smoothedAudioRef.current;

      // Simulation vocale Jarvis (Speaking) riche en harmoniques
      if (mode === "speaking") {
        const h1 = Math.sin(time * 6) * 0.12;
        const h2 = Math.sin(time * 15) * 0.08;
        const h3 = Math.sin(time * 26) * 0.04;
        const fakeVoice = 0.2 + h1 + h2 + h3 + Math.random() * 0.05;
        effectiveAudio = Math.max(effectiveAudio, fakeVoice);
      }

      updatePointField(
        haloField,
        time * 0.65,
        effectiveAudio * 0.82,
        mode,
        1.12 + Math.sin(time * 2) * 0.05,
      );
      updatePointField(mainField, time, effectiveAudio, mode, 1);

      mainField.points.rotation.y = time * 0.18;
      mainField.points.rotation.x = Math.sin(time * 0.35) * 0.12;
      haloField.points.rotation.y = -time * 0.08;
      haloField.points.rotation.x = Math.cos(time * 0.22) * 0.08;

      renderer.render(scene, camera);
      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    rendererRef.current = renderer;
    sceneRef.current = scene;
    cameraRef.current = camera;
    mainFieldRef.current = mainField;
    haloFieldRef.current = haloField;

    return () => {
      cancelAnimationFrame(frameRef.current);
      scene.remove(mainField.points);
      scene.remove(haloField.points);
      mainField.geometry.dispose();
      mainField.material.dispose();
      haloField.geometry.dispose();
      haloField.material.dispose();
      renderer.dispose();
    };
  }, [mode, size]); // On re-rend si le mode change

  return (
    <div className={`jarvis-core jarvis-core--${mode}`}>
      <div className="jarvis-core__glow" />
      <div ref={mountRef} className="jarvis-core__canvas" />
      <div className="jarvis-core__label">
        {mode === "idle" && "VEILLE"}
        {mode === "listening" && "ÉCOUTE"}
        {mode === "thinking" && "ANALYSE"}
        {mode === "speaking" && "RÉPONSE"}
      </div>
    </div>
  );
};
