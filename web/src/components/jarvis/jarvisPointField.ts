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
  const pulse = mode === "speaking" ? 1.2 : mode === "listening" ? 1.0 : 0.55;

  for (let i = 0; i < field.metaR.length; i++) {
    const i3 = i * 3;

    const r = field.metaR[i];
    const a = field.metaA[i];
    const p = field.metaP[i];
    const layer = field.metaL[i];

    const wave =
      Math.sin(time * (1.2 + layer) - r * 3.4 + p) *
      (0.08 + audioLevel * 0.32 * pulse);

    const swirl =
      Math.sin(time * 0.45 + p) * 0.08 + Math.cos(time * 0.26 + r * 1.3) * 0.04;

    const angle = a + time * 0.08 * (0.4 + layer * 0.2) + swirl;

    const radial = r * (1 + wave * 0.16);
    const lift =
      Math.sin(time * 1.8 + r * 2.6 + p) * (0.04 + audioLevel * 0.18);

    field.pos[i3] = Math.cos(angle) * radial * scale;
    field.pos[i3 + 1] =
      Math.sin(angle) * radial * (0.76 + audioLevel * 0.22) + lift;
    field.pos[i3 + 2] =
      field.base[i3 + 2] +
      Math.cos(time * (1.1 + layer) + r * 2.4 + p) * (0.16 + audioLevel * 0.52);

    const brightness = 0.72 + audioLevel * 0.55 + Math.max(0, wave) * 0.45;
    field.color[i3] = target.r * brightness;
    field.color[i3 + 1] = target.g * brightness;
    field.color[i3 + 2] = target.b * brightness;

    field.alpha[i] = Math.min(
      1,
      0.22 + audioLevel * 0.55 + Math.abs(wave) * 0.45,
    );
    field.size[i] =
      field.size[i] * 0.985 +
      (4.5 + layer * 2.0 + audioLevel * 11 + Math.abs(wave) * 6) * 0.015;
  }

  field.geometry.attributes.position.needsUpdate = true;
  field.geometry.attributes.aColor.needsUpdate = true;
  field.geometry.attributes.aAlpha.needsUpdate = true;
  field.geometry.attributes.aSize.needsUpdate = true;
  field.material.uniforms.uTime.value = time;
}
