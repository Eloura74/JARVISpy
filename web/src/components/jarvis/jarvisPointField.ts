import * as THREE from "three";
import { JARVIS_COLORS, type JarvisMode } from "./jarvisCoreConfig";
import { pointVertexShader, pointFragmentShader } from "./jarvisCoreShaders";

export interface PointField {
  geometry: THREE.BufferGeometry;
  material: THREE.ShaderMaterial;
  points: THREE.Points;
  pos: Float32Array;
  base: Float32Array;
  color: Float32Array;
  alpha: Float32Array;
  size: Float32Array;
  metaR: Float32Array;
  metaA: Float32Array;
  metaP: Float32Array;
  metaL: Float32Array;
}

/**
 * INITIALISATION V5.7.1 - SYNCHRONISATION ABSOLUE
 */
export function createPointField(config: {
  count: number;
  radius: number;
  depth: number;
  pointSize: number;
  opacity: number;
}): PointField {
  const geometry = new THREE.BufferGeometry();
  const count = config.count;

  const pos = new Float32Array(count * 3);
  const base = new Float32Array(count * 3);
  const color = new Float32Array(count * 3);
  const alpha = new Float32Array(count);
  const size = new Float32Array(count);

  const metaR = new Float32Array(count);
  const metaA = new Float32Array(count);
  const metaP = new Float32Array(count);
  const metaL = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;

    // Distribution polaire pro (Cohérente avec updatePointField)
    const r = config.radius * (0.35 + Math.random() * 0.65);
    const theta = Math.random() * Math.PI * 2;
    const p = Math.random() * Math.PI * 2;
    const layer = Math.floor(Math.random() * 5);

    // Position initiale rattachée à la structure d'animation
    // On calcule la position à t=0 pour une synchro parfaite
    const x = Math.cos(theta) * r;
    const y = Math.sin(theta) * r;
    const lift = Math.sin(r * 4.0 + p) * 0.03;
    const z = Math.cos(r * 2.5 + p) * 0.15 + (Math.random() - 0.5) * 0.1;

    pos[i3] = x;
    pos[i3 + 1] = y + lift;
    pos[i3 + 2] = z;

    base[i3] = x;
    base[i3 + 1] = y; // On garde y de base sans lift
    base[i3 + 2] = z; // On garde z de base

    metaR[i] = r;
    metaA[i] = theta;
    metaP[i] = p;
    metaL[i] = layer;

    // Finesse V5.8
    size[i] = 4.2 + layer * 1.2;
    color[i3] = JARVIS_COLORS.idle.r;
    color[i3 + 1] = JARVIS_COLORS.idle.g;
    color[i3 + 2] = JARVIS_COLORS.idle.b;
    alpha[i] = 0.28;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  geometry.setAttribute("aColor", new THREE.BufferAttribute(color, 3));
  geometry.setAttribute("aAlpha", new THREE.BufferAttribute(alpha, 1));
  geometry.setAttribute("aSize", new THREE.BufferAttribute(size, 1));

  const material = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 } },
    vertexShader: pointVertexShader,
    fragmentShader: pointFragmentShader,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthTest: false,
  });

  return {
    geometry,
    material,
    points: new THREE.Points(geometry, material),
    pos,
    base,
    color,
    alpha,
    size,
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
  const cleanAudio = audioLevel < 0.05 ? 0 : audioLevel;

  const waveFreq = 0.8;
  const waveAmp = 0.08;
  const audioBoost = cleanAudio * (isSpeaking ? 1.0 : 0.6);

  for (let i = 0; i < field.metaR.length; i++) {
    const i3 = i * 3;
    const r = field.metaR[i];
    const a = field.metaA[i];
    const p = field.metaP[i];
    const layer = field.metaL[i];

    const wave =
      Math.sin(time * (waveFreq + layer * 0.4) - r * 3.5 + p) *
      (waveAmp + audioBoost * 0.04);
    const angle =
      a + time * 0.04 * (0.3 + layer * 0.4) + Math.sin(time * 0.6 + p) * 0.05;

    // Grossissement EXTREMEMENT fin (1.015 max)
    const baseExpansion = isSpeaking ? 1.015 : 1.0;
    const radial = r * (baseExpansion + cleanAudio * 0.04 + wave * 0.03);

    const lift = Math.sin(time * 2.5 + r * 4.0 + p) * 0.03;

    field.pos[i3] = Math.cos(angle) * radial * scale;
    field.pos[i3 + 1] = Math.sin(angle) * radial + lift;
    field.pos[i3 + 2] =
      field.base[i3 + 2] +
      Math.cos(time * (1.2 + layer) + r * 2.5 + p) * (0.15 + audioBoost * 0.1);

    const colorSpeed = 0.06;
    field.color[i3] += (target.r - field.color[i3]) * colorSpeed;
    field.color[i3 + 1] += (target.g - field.color[i3 + 1]) * colorSpeed;
    field.color[i3 + 2] += (target.b - field.color[i3 + 2]) * colorSpeed;

    const targetAlpha =
      0.28 + Math.abs(wave) * 0.35 + (isSpeaking ? cleanAudio * 0.1 : 0);
    field.alpha[i] = field.alpha[i] * 0.94 + targetAlpha * 0.06;

    const targetSize = 4.2 + layer * 1.2 + (isSpeaking ? cleanAudio * 1.5 : 0);
    field.size[i] = field.size[i] * 0.92 + targetSize * 0.08;
  }

  field.geometry.attributes.position.needsUpdate = true;
  field.geometry.attributes.aColor.needsUpdate = true;
  field.geometry.attributes.aAlpha.needsUpdate = true;
  field.geometry.attributes.aSize.needsUpdate = true;
  field.material.uniforms.uTime.value = time;
}
