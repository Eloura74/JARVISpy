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
    const r = config.radius * (0.3 + Math.random() * 0.7);
    const theta = Math.random() * Math.PI * 2;
    const p = Math.random() * Math.PI * 2;
    const layer = Math.floor(Math.random() * 5);

    const x = Math.cos(theta) * r;
    const y = Math.sin(theta) * r;
    const z = Math.cos(r * 2.5 + p) * 0.12 + (Math.random() - 0.5) * 0.05;

    pos[i3] = x;
    pos[i3 + 1] = y;
    pos[i3 + 2] = z;

    base[i3] = x;
    base[i3 + 1] = y;
    base[i3 + 2] = z;

    metaR[i] = r;
    metaA[i] = theta;
    metaP[i] = p;
    metaL[i] = layer;

    size[i] = config.pointSize + layer * 1.0;
    color[i3] = JARVIS_COLORS.idle.r;
    color[i3 + 1] = JARVIS_COLORS.idle.g;
    color[i3 + 2] = JARVIS_COLORS.idle.b;
    alpha[i] = 0.45; // Safe Visibility
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
  for (let i = 0; i < field.metaR.length; i++) {
    const i3 = i * 3;
    const r = field.metaR[i];
    const a = field.metaA[i];
    const p = field.metaP[i];
    const layer = field.metaL[i];

    const wave =
      Math.sin(time * (0.8 + layer * 0.3) - r * 2.5 + p) *
      (0.06 + audioLevel * 0.05);
    const angle = a + time * 0.03 * (0.3 + layer * 0.4);

    const radial = r * (1.0 + audioLevel * 0.05 + wave * 0.02);

    field.pos[i3] = Math.cos(angle) * radial * scale;
    field.pos[i3 + 1] = Math.sin(angle) * radial;
    field.pos[i3 + 2] =
      field.base[i3 + 2] + Math.cos(time + r + p) * (0.1 + audioLevel * 0.1);

    const speed = 0.05;
    field.color[i3] += (target.r - field.color[i3]) * speed;
    field.color[i3 + 1] += (target.g - field.color[i3 + 1]) * speed;
    field.color[i3 + 2] += (target.b - field.color[i3 + 2]) * speed;

    const targetAlpha =
      0.45 +
      Math.abs(wave) * 0.2 +
      (mode === "speaking" ? audioLevel * 0.15 : 0);
    field.alpha[i] = field.alpha[i] * 0.9 + targetAlpha * 0.1;

    const targetSize =
      5.0 + layer * 1.0 + (mode === "speaking" ? audioLevel * 1.5 : 0);
    field.size[i] = field.size[i] * 0.9 + targetSize * 0.1;
  }

  field.geometry.attributes.position.needsUpdate = true;
  field.geometry.attributes.aColor.needsUpdate = true;
  field.geometry.attributes.aAlpha.needsUpdate = true;
  field.geometry.attributes.aSize.needsUpdate = true;
  field.material.uniforms.uTime.value = time;
}
