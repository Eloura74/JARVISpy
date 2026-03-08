import * as THREE from "three";

export type JarvisMode = "idle" | "listening" | "thinking" | "speaking";

export const JARVIS_COLORS: Record<JarvisMode, THREE.Color> = {
  idle: new THREE.Color("#00d2ff"),
  listening: new THREE.Color("#00d2ff"),
  thinking: new THREE.Color("#69a8ff"),
  speaking: new THREE.Color("#b06eff"), // Violet Jarvis V3
};

export const CORE_CONFIG = {
  mainCount: 1400,
  haloCount: 500,
  radius: 1.6,
  depth: 1.1,
  basePointSize: 4.0, // Finesse Pro
  haloPointSize: 3.0, // Finesse Pro
  smoothing: 0.12,
  cameraZ: 5.6,
};
