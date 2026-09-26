"use client";

import { useEffect, useRef, useCallback } from "react";

const VERTEX_SHADER_SOURCE = `
attribute vec2 a_position;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER_SOURCE = `
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;

const int MAX_RIPPLES = 12;
// vec4: x, y (canvas pixels), startTime (seconds), strength
uniform vec4 u_ripples[MAX_RIPPLES];

void main() {
  vec2 coord = gl_FragCoord.xy;
  coord.y = u_resolution.y - coord.y;

  float totalHeight = 0.0;
  vec2 totalSlope = vec2(0.0);

  for (int i = 0; i < MAX_RIPPLES; i++) {
    vec4 rip = u_ripples[i];
    float startTime = rip.z;
    float strength = rip.w;
    if (startTime <= 0.0 || strength <= 0.0) continue;

    float age = u_time - startTime;
    if (age < 0.0 || age > 0.85) continue;

    vec2 diff = coord - rip.xy;
    float dist = length(diff);

    // Natural ripple propagation speed (px/sec)
    float speed = 150.0;
    float currentRadius = age * speed;
    float waveDist = dist - currentRadius;
    float waveWidth = 14.0;

    // Fast exponential decay so ripples stay compact and dissolve in ~0.5s
    float lifeDecay = exp(-age * 4.8);
    float spatialEnv = exp(-(waveDist * waveDist) / (waveWidth * waveWidth));

    // Continuous circular sine wave
    float wave = sin(waveDist * 0.35) * spatialEnv * lifeDecay * strength;
    totalHeight += wave;

    if (dist > 0.5) {
      vec2 dir = diff / dist;
      float dWave = (
        cos(waveDist * 0.35) * 0.35 * spatialEnv -
        sin(waveDist * 0.35) * (2.0 * waveDist / (waveWidth * waveWidth)) * spatialEnv
      ) * lifeDecay * strength;

      totalSlope += dir * dWave;
    }
  }

  float disturbance = length(totalSlope);
  if (disturbance < 0.003) {
    discard;
  }

  // Calculate 3D water surface normal vector
  vec3 normal = normalize(vec3(-totalSlope * 26.0, 1.0));

  // Overhead directional light
  vec3 lightDir = normalize(vec3(-0.35, 0.55, 0.75));
  vec3 viewDir = vec3(0.0, 0.0, 1.0);
  vec3 halfVec = normalize(lightDir + viewDir);

  // Razor-sharp specular highlight on water crest
  float NdotH = max(dot(normal, halfVec), 0.0);
  float specular = pow(NdotH, 80.0) * 2.2;
  float sheen = pow(NdotH, 18.0) * 0.3;
  float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.0) * 0.35;

  // Refractive meniscus depth: subtle shadow on trailing slope, bright glint on leading slope
  float refrShadow = clamp(-normal.y * 0.3 - normal.x * 0.18, 0.0, 0.5) * disturbance * 12.0;
  float refrGlint = clamp(normal.y * 0.35 + normal.x * 0.22, 0.0, 0.6) * disturbance * 15.0;

  float slopeMod = smoothstep(0.003, 0.024, disturbance);
  float alpha = clamp((specular * 0.65 + sheen * 0.25 + fresnel * 0.45 + refrGlint * 0.3 + refrShadow * 0.2) * slopeMod, 0.0, 0.5);

  if (alpha < 0.01) {
    discard;
  }

  // Pure crystal-clear water optics: transparent with physical specular glints and refractive depth
  vec3 glintColor = vec3(1.0, 1.0, 1.0) * (specular + sheen * 0.6 + refrGlint);
  vec3 shadowColor = vec3(0.05, 0.08, 0.14) * refrShadow;

  vec3 finalColor = clamp(glintColor - shadowColor, 0.0, 1.0);
  gl_FragColor = vec4(finalColor, alpha);
}
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compile error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(
  gl: WebGLRenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader
): WebGLProgram | null {
  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Program link error:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

const MAX_RIPPLES = 12;

export function LiquidWaterSurface() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const initSimulation = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: true,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
    });

    if (!gl) return;

    const vs = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SOURCE);
    if (!vs || !fs) return;

    const program = createProgram(gl, vs, fs);
    if (!program) return;

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const aPositionLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(aPositionLoc);
    gl.vertexAttribPointer(aPositionLoc, 2, gl.FLOAT, false, 0, 0);

    const uResolutionLoc = gl.getUniformLocation(program, "u_resolution");
    const uTimeLoc = gl.getUniformLocation(program, "u_time");
    const uRipplesLoc = gl.getUniformLocation(program, "u_ripples");

    // Ripple array: 12 ripples * 4 floats [x, y, startTime, strength]
    const rippleFloats = new Float32Array(MAX_RIPPLES * 4);
    let rippleIdx = 0;
    let isSleeping = true;
    let animId = 0;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);

      gl.useProgram(program);
      gl.uniform2f(uResolutionLoc, canvas.width, canvas.height);
      wakeUp();
    };

    const addRipple = (screenX: number, screenY: number, strength: number) => {
      const now = performance.now() * 0.001;
      const offset = rippleIdx * 4;

      rippleFloats[offset] = screenX * dpr;
      rippleFloats[offset + 1] = screenY * dpr;
      rippleFloats[offset + 2] = now;
      rippleFloats[offset + 3] = strength;

      rippleIdx = (rippleIdx + 1) % MAX_RIPPLES;
      wakeUp();
    };

    const wakeUp = () => {
      if (isSleeping) {
        isSleeping = false;
        animId = requestAnimationFrame(render);
      }
    };

    const render = (nowMs: number) => {
      const now = nowMs * 0.001;

      // Check if any ripple is still active within lifespan (0.85s)
      let activeCount = 0;
      for (let i = 0; i < MAX_RIPPLES; i++) {
        const startTime = rippleFloats[i * 4 + 2];
        if (startTime > 0.0 && now - startTime <= 0.85) {
          activeCount++;
        }
      }

      if (activeCount === 0) {
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        isSleeping = true;
        return;
      }

      gl.useProgram(program);
      gl.uniform1f(uTimeLoc, now);
      gl.uniform4fv(uRipplesLoc, rippleFloats);

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animId = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Interaction Listeners
    let lastX = -1;
    let lastY = -1;
    let lastEmitTime = 0;

    const handlePointerMove = (e: PointerEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      const now = performance.now();

      if (lastX >= 0 && lastY >= 0) {
        const dist = Math.hypot(x - lastX, y - lastY);
        // Only trigger sleek micro-ripples when moving fast and spaced out
        if (dist > 18 && now - lastEmitTime > 35) {
          addRipple(x, y, 0.3);
          lastEmitTime = now;
          lastX = x;
          lastY = y;
        }
      } else {
        lastX = x;
        lastY = y;
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      // Natural circular water droplet splash right under pointer
      addRipple(e.clientX, e.clientY, 0.5);
      lastX = e.clientX;
      lastY = e.clientY;
    };

    const handleMouseLeave = () => {
      lastX = -1;
      lastY = -1;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("mouseleave", handleMouseLeave);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(positionBuffer);
    };
  }, []);

  useEffect(() => {
    const cleanup = initSimulation();
    return () => {
      if (cleanup) cleanup();
    };
  }, [initSimulation]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-30 dark:opacity-35 transition-opacity duration-500"
    />
  );
}
