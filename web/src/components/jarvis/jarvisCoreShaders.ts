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
  
  // Echelle augmentée pour la visibilité (5.5 -> 10.0)
  gl_PointSize = aSize * (10.0 / -mvPosition.z);
  
  gl_Position = projectionMatrix * mvPosition;
}
`;

export const pointFragmentShader = `
varying float vAlpha;
varying vec3 vColor;

void main() {
  vec2 uv = gl_PointCoord - vec2(0.5);
  float dist = length(uv);

  // Smoothstep plus doux pour eviter la disparition (0.3 -> 0.45)
  float dot = 1.0 - smoothstep(0.0, 0.45, dist);
  
  // Spark central un peu plus large
  float spark = 1.0 - smoothstep(0.0, 0.12, dist);

  vec3 color = vColor * (0.8 + spark * 0.4);
  float alpha = dot * vAlpha;

  if (alpha < 0.005) discard;

  gl_FragColor = vec4(color, alpha);
}
`;
