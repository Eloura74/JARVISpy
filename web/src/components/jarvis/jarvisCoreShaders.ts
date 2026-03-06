export const pointVertexShader = `
attribute float aSize;
attribute float aAlpha;
attribute vec3 aColor;

uniform float uTime;
uniform float uPixelRatio;

varying float vAlpha;
varying vec3 vColor;

void main() {
  vAlpha = aAlpha;
  vColor = aColor;

  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

  float depthScale = 1.0 / max(0.35, -mvPosition.z * 0.22);
  gl_PointSize = aSize * uPixelRatio * depthScale;

  gl_Position = projectionMatrix * mvPosition;
}
`;

export const pointFragmentShader = `
varying float vAlpha;
varying vec3 vColor;

void main() {
  vec2 uv = gl_PointCoord - vec2(0.5);
  float dist = length(uv);

  float soft = 1.0 - smoothstep(0.18, 0.5, dist);
  float glow = 1.0 - smoothstep(0.0, 0.5, dist);

  vec3 color = vColor * (0.7 + glow * 0.6);
  float alpha = soft * vAlpha;

  gl_FragColor = vec4(color, alpha);
}
`;
