"use client";

import { useEffect, useRef, useState } from "react";
import type { PointerEvent } from "react";
import {
  createLinwisEngineRenderer,
  getLinwisCanvasViewport,
} from "@/src/shared/lib/linwis-engine/createLinwisEngineRenderer";
import { LINWIS_ENGINE_MAX_DELTA_SECONDS } from "@/src/shared/lib/linwis-engine/constants";
import type { LinwisEngineRenderer } from "@/src/shared/lib/linwis-engine/createLinwisEngineRenderer";

function getCanvasPoint(event: PointerEvent<HTMLCanvasElement>) {
  const rect = event.currentTarget.getBoundingClientRect();

  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
}

export function LinwisHeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rendererRef = useRef<LinwisEngineRenderer | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let disposed = false;
    let raf = 0;
    let isIntersecting = true;
    let lastTime = performance.now();

    const canvas = canvasRef.current;
    if (!canvas) return;

    function frame(now: number) {
      const renderer = rendererRef.current;
      if (disposed || !renderer) {
        return;
      }

      // Stop the render loop if canvas is out of view
      if (!isIntersecting) {
        raf = 0;
        return;
      }

      const deltaSeconds = Math.min(
        (now - lastTime) / 1000,
        LINWIS_ENGINE_MAX_DELTA_SECONDS,
      );
      lastTime = now;

      renderer.render(deltaSeconds);
      raf = requestAnimationFrame(frame);
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting && rendererRef.current) {
          // Reset time when returning to view to prevent huge delta jump
          lastTime = performance.now();
          if (!raf) {
            raf = requestAnimationFrame(frame);
          }
        }
      });
    }, { threshold: 0 });

    observer.observe(canvas);

    async function start() {
      if (!canvas) return;
      try {
        // Уменьшаем разрешение рендера в 2 раза для сильного буста производительности (Software Rasterizer очень зависит от количества пикселей)
        const baseViewport = getLinwisCanvasViewport(canvas);
        const nextRenderer = await createLinwisEngineRenderer({
          canvas,
          viewport: {
            width: Math.max(1, Math.round(baseViewport.width * 0.5)),
            height: Math.max(1, Math.round(baseViewport.height * 0.5))
          },
        });

        if (disposed) {
          nextRenderer.dispose();
          return;
        }

        rendererRef.current = nextRenderer;
        setReady(true);

        lastTime = performance.now();
        if (isIntersecting) {
          raf = requestAnimationFrame(frame);
        }
      } catch (error) {
        if (!disposed) {
          console.error("Failed to start Linwis engine.", error);
        }
      }
    }

    start();

    return () => {
      disposed = true;
      observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
      rendererRef.current?.dispose();
      rendererRef.current = null;
    };
  }, []);

  function handlePointerDown(event: PointerEvent<HTMLCanvasElement>) {
    const renderer = rendererRef.current;
    if (!renderer) {
      return;
    }

    const point = getCanvasPoint(event);

    event.currentTarget.setPointerCapture(event.pointerId);
    renderer.lwPointerDown(point.x, point.y);
  }

  function handlePointerMove(event: PointerEvent<HTMLCanvasElement>) {
    const renderer = rendererRef.current;
    if (!renderer) {
      return;
    }

    const point = getCanvasPoint(event);
    renderer.lwPointerMove(point.x, point.y);
  }

  function handlePointerUp(event: PointerEvent<HTMLCanvasElement>) {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    rendererRef.current?.lwPointerUp();
  }

  function handlePointerCancel(event: PointerEvent<HTMLCanvasElement>) {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    rendererRef.current?.lwPointerUp();
  }

  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg bg-background">
      <canvas
        ref={canvasRef}
        className="relative z-0 block h-full w-full cursor-grab touch-none active:cursor-grabbing"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
      />

      <div className="pointer-events-none absolute inset-0 z-10 bg-background/30" />

      <div className="pointer-events-none absolute bottom-0 right-4 z-20 text-text/40 geistMono">
        <p className="ml-2">Rendered without Three.js, WebGL or OpenGL</p>
      </div>

      {!ready && <div className="absolute inset-0 z-30 bg-background" />}
    </div>
  );
}
