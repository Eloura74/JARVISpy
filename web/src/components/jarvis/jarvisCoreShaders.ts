export const pointVertexShader = `
attribute float aSize;
attribute vec3 aColor;
attribute float aAlpha;

uniform float uTime;

varying vec3 vColor;
varying float vAlpha;

void main() {
  vColor = aColor;
  vAlpha = aAlpha;

  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  
  // NETTETÉ PRO : Constante 15.0 pour des points micros et hyper classes
  gl_PointSize = aSize * (15.0 / -mvPosition.z);
  
  gl_Position = projectionMatrix * mvPosition;
}
`;

export const pointFragmentShader = `
varying float vAlpha;
varying vec3 vColor;

void main() {
  vec2 uv = gl_PointCoord - vec2(0.5);
  float dist = length(uv);

  // Core tres net, halo minuscule
  float core = 1.0 - smoothstep(0.1, 0.2, dist);
  float soft = 1.0 - smoothstep(0.2, 0.5, dist);

  vec3 color = vColor * (1.0 + core * 0.5);
  float alpha = soft * vAlpha;

  gl_FragColor = vec4(color, alpha);
}
`;
