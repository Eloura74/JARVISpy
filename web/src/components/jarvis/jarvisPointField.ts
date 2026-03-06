import * as THREE from "three";
import { pointFragmentShader, pointVertexShader } from "./jarvisCoreShaders";
import type { JarvisMode } from "./jarvisCoreConfig";
import { JARVIS_COLORS } from "./jarvisCoreConfig";

type PointFieldOptions = {
  count: number;
  radius: number;
  depth: number;
  pointSize: number;
  opacity: number;
};

export type PointField = {
  points: THREE.Points;
  geometry: THREE.BufferGeometry;
  material: THREE.ShaderMaterial;
  base: Float32Array;
  pos: Float32Array;
  color: Float32Array;
  size: Float32Array;
  alpha: Float32Array;
  metaR: Float32Array;
  metaA: Float32Array;
  metaP: Float32Array;
  metaL: Float32Array;
};

export function createPointField({
  count,
  radius,
  depth,
  pointSize,
  opacity,
}: PointFieldOptions): PointField {
  const base = new Float32Array(count * 3);
  const pos = new Float32Array(count * 3);
  const color = new Float32Array(count * 3);
  const size = new Float32Array(count);
  const alpha = new Float32Array(count);

  const metaR = new Float32Array(count);
  const metaA = new Float32Array(count);
  const metaP = new Float32Array(count);
  const metaL = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const a = Math.random() * Math.PI * 2;
    const r = Math.pow(Math.random(), 0.75) * radius;
    const z = (Math.random() - 0.5) * depth;
    const lift = (Math.random() - 0.5) * 0.8;

    base[i3] = Math.cos(a) * r;
    base[i3 + 1] = Math.sin(a) * r + lift * 0.15;
    base[i3 + 2] = z;

    pos[i3] = base[i3];
    pos[i3 + 1] = base[i3 + 1];
    pos[i3 + 2] = base[i3 + 2];

    size[i] = pointSize + Math.random() * pointSize * 0.8;
    alpha[i] = opacity * (0.35 + Math.random() * 0.65);

    metaR[i] = r;
    metaA[i] = a;
    metaP[i] = Math.random() * Math.PI * 2;
    metaL[i] = 0.6 + Math.random() * 1.8;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  geometry.setAttribute("aColor", new THREE.BufferAttribute(color, 3));
  geometry.setAttribute("aSize", new THREE.BufferAttribute(size, 1));
  geometry.setAttribute("aAlpha", new THREE.BufferAttribute(alpha, 1));

  const material = new THREE.ShaderMaterial({
    vertexShader: pointVertexShader,
    fragmentShader: pointFragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
    },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const points = new THREE.Points(geometry, material);

  return {
    points,
    geometry,
    material,
    base,
    pos,
    color,
    size,
    alpha,
    metaR,
    metaA,
    metaP,
    metaL,
  };
}

export function updatePointField(
  field: PointField,
  time: number,
  audioLevel: number,
  mode: JarvisMode,
  scale = 1,
) {
  const target = JARVIS_COLORS[mode];

  const isSpeaking = mode === "speaking";
  const isListening = mode === "listening";
  const isThinking = mode === "thinking";

  const waveFreq = isSpeaking
    ? 1.4
    : isListening
      ? 7.2
      : isThinking
        ? 2.1
        : 0.8;
  const waveAmp = isSpeaking
    ? 0.95
    : isListening
      ? 0.52
      : isThinking
        ? 0.18
        : 0.05;
  const pulse = isSpeaking
    ? 2.6
    : isListening
      ? 1.55
      : isThinking
        ? 0.75
        : 0.35;

  for (let i = 0; i < field.metaR.length; i++) {
    const i3 = i * 3;

    const r = field.metaR[i];
    const a = field.metaA[i];
    const p = field.metaP[i];
    const layer = field.metaL[i];

    const wave =
      Math.sin(
        time * (waveFreq + layer * 0.42) -
          r * (isSpeaking ? 1.8 : isListening ? 5.8 : 3.2) +
          p,
      ) *
      (waveAmp + audioLevel * 0.75 * pulse);

    const swirl =
      Math.sin(time * (isSpeaking ? 0.18 : 1.9) + p * 2.0) * 0.22 +
      Math.cos(time * 0.34 + r * 2.2) * 0.1;

    const angle = a + time * 0.05 * (0.35 + layer * 0.45) + swirl;

    const radialBase = isSpeaking ? 1.3 : isListening ? 1.02 : 1.0;
    const radialFactor = isSpeaking ? 0.72 : isListening ? 0.34 : 0.12;
    const radial = r * (radialBase + wave * radialFactor);

    const stretchY = isSpeaking
      ? 0.95 + audioLevel * 0.72
      : isListening
        ? 0.86 + audioLevel * 0.28
        : 0.92;

    const stretchX = isSpeaking
      ? 1.08 - audioLevel * 0.16
      : isListening
        ? 1.02
        : 1.0;

    const lift =
      Math.sin(time * (isListening ? 8.5 : 2.0) + r * 5.0 + p) *
      (0.05 + audioLevel * (isSpeaking ? 0.32 : 0.22));

    field.pos[i3] = Math.cos(angle) * radial * scale * stretchX;
    field.pos[i3 + 1] = Math.sin(angle) * radial * stretchY + lift;
    field.pos[i3 + 2] =
      field.base[i3 + 2] +
      Math.cos(time * (1.4 + layer) + r * 3.0 + p) *
        (0.22 + audioLevel * (isSpeaking ? 1.0 : 0.65));

    const glowBoost = isSpeaking ? 1.0 + audioLevel * 1.8 : audioLevel * 0.65;
    const brightness = 0.82 + glowBoost + Math.max(0, wave) * 0.65;

    field.color[i3] = target.r * brightness;
    field.color[i3 + 1] = target.g * brightness;
    field.color[i3 + 2] = target.b * brightness;

    field.alpha[i] = Math.min(
      1,
      0.3 + audioLevel * (isSpeaking ? 0.95 : 0.65) + Math.abs(wave) * 0.72,
    );

    const targetSize =
      (isSpeaking ? 9.5 : isListening ? 8.5 : 5.4) +
      layer * 3.8 +
      audioLevel * (isSpeaking ? 28 : 18) +
      Math.abs(wave) * 13;

    field.size[i] = field.size[i] * 0.9 + targetSize * 0.1;
  }

  field.geometry.attributes.position.needsUpdate = true;
  field.geometry.attributes.aColor.needsUpdate = true;
  field.geometry.attributes.aAlpha.needsUpdate = true;
  field.geometry.attributes.aSize.needsUpdate = true;
  field.material.uniforms.uTime.value = time;
}
