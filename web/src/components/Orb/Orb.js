import * as THREE from "three";
import { store } from "../../services/state.js";

/**
 * Orb V5 — JARVIS Core WebGL (Three.js)
 * Rendu 3D haute performance avec Shaders d'énergie et particules massives.
 */
export class Orb {
  constructor(elementId) {
    this.container = document.getElementById(elementId);
    this.currentStatus = "idle";
    this.particlesParams = {
      count: 1500,
      radius: 120,
      speed: 0.005,
      noiseFactor: 0.2,
    };

    this.render();
    this.initThree();
    this.initHUD();
    this.initStore();
    this.animate();
  }

  render() {
    this.container.innerHTML = `
      <div class="orb-scene" id="orb-scene" data-status="idle">
        <canvas id="orb-canvas" class="orb-canvas"></canvas>
        <div class="orb-hud-overlay" id="orb-hud-overlay"></div>
        <div class="orb-label" id="orb-label">VEILLE</div>
      </div>
    `;
    this.canvas = document.getElementById("orb-canvas");
    this.hudOverlay = document.getElementById("orb-hud-overlay");
  }

  initThree() {
    // Scene setup
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    this.camera.position.z = 400;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.handleResize();
    window.addEventListener("resize", () => this.handleResize());

    // Core Nucleus (Inner Glow)
    const nucleusGeom = new THREE.SphereGeometry(45, 64, 64);
    this.nucleusMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(0x00d9ff) },
        pulse: { value: 1.0 },
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        uniform float time;
        uniform vec3 color;
        uniform float pulse;
        void main() {
          float intensity = pow(0.7 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
          gl_FragColor = vec4(color, intensity * pulse * (0.8 + 0.2 * sin(time * 5.0)));
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });
    this.nucleus = new THREE.Mesh(nucleusGeom, this.nucleusMaterial);
    this.scene.add(this.nucleus);

    // Particle System
    const positions = new Float32Array(this.particlesParams.count * 3);
    const sizes = new Float32Array(this.particlesParams.count);
    const colors = new Float32Array(this.particlesParams.count * 3);

    for (let i = 0; i < this.particlesParams.count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = this.particlesParams.radius * (0.8 + Math.random() * 0.4);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      sizes[i] = Math.random() * 2 + 1;

      const c = new THREE.Color(0x00d9ff);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const particleGeom = new THREE.BufferGeometry();
    particleGeom.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3),
    );
    particleGeom.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    particleGeom.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    this.particleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        pixelRatio: { value: window.devicePixelRatio },
      },
      vertexShader: `
        uniform float time;
        uniform float pixelRatio;
        attribute float size;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec3 pos = position;
          pos.x += sin(time * 2.0 + position.y * 0.05) * 5.0;
          pos.y += cos(time * 2.0 + position.x * 0.05) * 5.0;
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * pixelRatio * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          float dist = distance(gl_PointCoord, vec2(0.5));
          if (dist > 0.5) discard;
          float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
          gl_FragColor = vec4(vColor, alpha * 0.8);
        }
      `,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
    });

    this.particles = new THREE.Points(particleGeom, this.particleMaterial);
    this.scene.add(this.particles);

    // Energy Rings
    this.rings = new THREE.Group();
    const ringConfig = [
      { r: 110, seg: 64, rot: 0.002, opacity: 0.3 },
      { r: 130, seg: 48, rot: -0.0015, opacity: 0.15 },
      { r: 90, seg: 32, rot: 0.004, opacity: 0.2 },
    ];

    ringConfig.forEach((cfg) => {
      const geom = new THREE.TorusGeometry(cfg.r, 0.5, 8, cfg.seg);
      const mat = new THREE.MeshBasicMaterial({
        color: 0x00d9ff,
        transparent: true,
        opacity: cfg.opacity,
        blending: THREE.AdditiveBlending,
      });
      const ring = new THREE.Mesh(geom, mat);
      ring.rotation.x = Math.random() * Math.PI;
      ring.rotation.y = Math.random() * Math.PI;
      ring.userData.rotSpeed = cfg.rot;
      this.rings.add(ring);
    });
    this.scene.add(this.rings);
  }

  handleResize() {
    const size = Math.min(
      this.container.clientWidth,
      this.container.clientHeight,
      600,
    );
    this.renderer.setSize(size, size);
    this.camera.aspect = 1;
    this.camera.updateProjectionMatrix();
  }

  initHUD() {
    this.hudOverlay.innerHTML = `
      <div class="hud-top">NEURAL CORE ▸ NOMINAL</div>
      <div class="hud-bottom">J.A.R.V.I.S · V5 ONLINE</div>
    `;
  }

  initStore() {
    store.subscribe((state) => {
      if (state.orbStatus !== this.currentStatus) {
        this.currentStatus = state.orbStatus;
        this.updateState(state.orbStatus);
      }
    });
  }

  updateState(status) {
    const labels = {
      idle: "VEILLE",
      listening: "ANALYSE VOIX",
      thinking: "TRAITEMENT",
      speaking: "ALLOCUTION",
    };
    document.getElementById("orb-label").textContent =
      labels[status] || status.toUpperCase();
    document.getElementById("orb-scene").setAttribute("data-status", status);

    // Adjust parameters based on status
    switch (status) {
      case "listening":
        this.particlesParams.speed = 0.015;
        this.nucleusMaterial.uniforms.pulse.value = 1.5;
        break;
      case "thinking":
        this.particlesParams.speed = 0.008;
        this.nucleusMaterial.uniforms.pulse.value = 1.2;
        break;
      case "speaking":
        this.particlesParams.speed = 0.025;
        this.nucleusMaterial.uniforms.pulse.value = 2.0;
        break;
      default:
        this.particlesParams.speed = 0.005;
        this.nucleusMaterial.uniforms.pulse.value = 1.0;
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const time = performance.now() * 0.001;

    // Update core
    this.nucleusMaterial.uniforms.time.value = time;
    this.nucleus.rotation.y += 0.005;

    // Update particles
    this.particleMaterial.uniforms.time.value = time;
    this.particles.rotation.y += this.particlesParams.speed;
    this.particles.rotation.x += this.particlesParams.speed * 0.5;

    // Update rings
    this.rings.children.forEach((ring) => {
      ring.rotation.z += ring.userData.rotSpeed;
      ring.rotation.y += ring.userData.rotSpeed * 0.5;
    });

    // Suble drift
    this.scene.position.y = Math.sin(time * 0.5) * 5;

    this.renderer.render(this.scene, this.camera);
  }
}
