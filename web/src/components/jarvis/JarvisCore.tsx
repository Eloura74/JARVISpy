import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import "./jarvis-core.css";
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

export const JarvisCore: React.FC<JarvisCoreProps> = ({
  mode,
  audioLevel = 0,
  size = 540,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const mainFieldRef = useRef<PointField | null>(null);
  const haloFieldRef = useRef<PointField | null>(null);
  const smoothedAudio = useSmoothedAudioLevel(
    audioLevel,
    CORE_CONFIG.smoothing,
  );

  useEffect(() => {
    if (!mountRef.current) return;

    const width = size;
    const height = size;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = CORE_CONFIG.cameraZ;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.domElement.style.width = `${width}px`;
    renderer.domElement.style.height = `${height}px`;

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

      // Si Jarvis parle, on simule une activité audio harmonique pour maintenir l'animation vivante
      // même si le backend n'envoie pas de flux RMS réel.
      let effectiveAudio = smoothedAudio;
      if (mode === "speaking") {
        const fakeVoice =
          0.15 + Math.sin(time * 8) * 0.1 + Math.sin(time * 14) * 0.05;
        effectiveAudio = Math.max(smoothedAudio, fakeVoice);
      }

      updatePointField(
        haloField,
        time * 0.72,
        effectiveAudio * 0.65,
        mode,
        1.05,
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
      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [size]);

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
