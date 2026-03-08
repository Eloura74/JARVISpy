export const CORE_CONFIG = {
  mainCount: 1100,
  haloCount: 400,
  radius: 1.6,
  depth: 0.8,
  basePointSize: 5.0, // Compromis ideal (3.0 -> 5.0)
  haloPointSize: 3.5,
  smoothing: 0.15,
  cameraZ: 6.2,
};

export const JARVIS_COLORS = {
  idle: { r: 0.0, g: 0.7, b: 0.95 }, // Cyan pro equilibré
  listening: { r: 0.0, g: 0.7, b: 0.95 },
  thinking: { r: 0.0, g: 0.7, b: 0.95 },
  speaking: { r: 0.6, g: 0.4, b: 1.0 },
};

export type JarvisMode = "idle" | "listening" | "thinking" | "speaking";
