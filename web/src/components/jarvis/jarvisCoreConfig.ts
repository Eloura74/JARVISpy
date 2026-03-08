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

export let JARVIS_COLORS = {
  idle: { r: 0.0, g: 0.7, b: 0.95 }, 
  listening: { r: 0.0, g: 0.7, b: 0.95 },
  thinking: { r: 0.0, g: 0.7, b: 0.95 },
  speaking: { r: 0.6, g: 0.4, b: 1.0 },
};

export const updateJarvisThemeColors = (theme: string) => {
  if (theme === "bronze") {
    JARVIS_COLORS.idle = { r: 0.8, g: 0.5, b: 0.2 }; // Bronze
    JARVIS_COLORS.listening = { r: 0.9, g: 0.6, b: 0.3 };
    JARVIS_COLORS.thinking = { r: 1.0, g: 0.7, b: 0.4 };
    JARVIS_COLORS.speaking = { r: 1.0, g: 0.4, b: 0.0 }; // Orange/Copper
  } else {
    JARVIS_COLORS.idle = { r: 0.0, g: 0.7, b: 0.95 };
    JARVIS_COLORS.listening = { r: 0.0, g: 0.7, b: 0.95 };
    JARVIS_COLORS.thinking = { r: 0.0, g: 0.7, b: 0.95 };
    JARVIS_COLORS.speaking = { r: 0.6, g: 0.4, b: 1.0 };
  }
};

export type JarvisMode = "idle" | "listening" | "thinking" | "speaking";
