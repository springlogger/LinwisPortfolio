"use client";

import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";

const vertex = `
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragment = `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float uScroll;

  // Background color #0a0b0a
  const vec3 bgColor = vec3(0.039, 0.043, 0.039);
  // Grid line color
  const vec3 lineColor = vec3(0.12, 0.13, 0.12);
  
  float hash12(vec2 p) {
    vec3 p3  = fract(vec3(p.xyx) * .1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }

  void main() {
    vec2 uv = (vUv - 0.5) * 2.0;
    uv.x *= uResolution.x / uResolution.y;

    // Camera setup
    // Mouse X moves camera left/right, Mouse Y moves camera up/down slightly
    vec3 ro = vec3(uMouse.x * 2.0, 1.2 + uMouse.y * 0.5, -uTime * 0.9 - uScroll * 0.006);
    
    // Look direction (slightly down)
    vec3 rd = normalize(vec3(uv.x, uv.y - 0.4, -1.0));

    vec3 color = bgColor;

    // Intersect with y = 0 plane
    float t = -ro.y / rd.y;

    if (t > 0.0) {
      vec3 pos = ro + rd * t;
      
      // Distance-based line thickness to reduce aliasing
      float dist = length(pos - ro);
      float lineThickness = mix(0.02, 0.08, min(dist * 0.05, 1.0));
      
      vec2 grid = abs(fract(pos.xz - 0.5) - 0.5);
      
      float lineX = smoothstep(lineThickness, lineThickness * 0.8, grid.x);
      float lineZ = smoothstep(lineThickness, lineThickness * 0.8, grid.y);
      float gridIntensity = max(lineX, lineZ);

      // Add a subtle scanline/noise effect to the grid lines
      float noise = hash12(floor(pos.xz * 2.0));
      gridIntensity *= 0.6 + 0.4 * noise;

      // Fog fading into background
      float fog = exp(-t * 0.08);

      color = mix(color, lineColor, gridIntensity * fog);
    }

    // Vignette
    float vignette = length(vUv - 0.5);
    color *= 1.0 - vignette * 0.5;

    // Screen noise
    color += (hash12(vUv * uTime) - 0.5) * 0.015;

    gl_FragColor = vec4(color, 1.0);
  }
`;

export function HeroGridCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const renderer = new Renderer({ alpha: true, antialias: true, dpr: Math.min(window.devicePixelRatio, 2) });
    const gl = renderer.gl;
    containerRef.current.appendChild(gl.canvas);
    
    const geometry = new Triangle(gl);

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: [window.innerWidth, window.innerHeight] },
        uMouse: { value: [0, 0] },
        uScroll: { value: window.scrollY },
      },
      transparent: true,
    });

    const mesh = new Mesh(gl, { geometry, program });

    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let scrollY = window.scrollY;

    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const onScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('scroll', onScroll);

    function resize() {
      renderer.setSize(window.innerWidth, window.innerHeight);
      program.uniforms.uResolution.value = [window.innerWidth, window.innerHeight];
    }
    window.addEventListener('resize', resize, false);
    resize();

    let reqId: number;
    function update(t: number) {
      reqId = requestAnimationFrame(update);
      
      // Smooth interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      program.uniforms.uTime.value = t * 0.001;
      program.uniforms.uMouse.value = [mouseX, mouseY];
      program.uniforms.uScroll.value += (scrollY - program.uniforms.uScroll.value) * 0.1;

      renderer.render({ scene: mesh });
    }
    reqId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', resize);
      
      if (containerRef.current && gl.canvas.parentNode === containerRef.current) {
        containerRef.current.removeChild(gl.canvas);
      }
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 pointer-events-none z-0" />;
}
