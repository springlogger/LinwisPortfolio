import "client-only";

import { createLinwisEngineModule } from "./createLinwisEngineModule";
import {
  LINWIS_ENGINE_MAX_DEVICE_PIXEL_RATIO,
  LINWIS_ENGINE_VIEWPORT,
} from "./constants";

export type LinwisEngineViewport = {
  width: number;
  height: number;
};

export type LinwisEngineRendererOptions = {
  canvas: HTMLCanvasElement;
  viewport?: LinwisEngineViewport;
};

export type LinwisEngineRenderer = {
  readonly viewport: LinwisEngineViewport;
  render(deltaSeconds: number): void;
  lwPointerDown(x: number, y: number): void;
  lwPointerMove(x: number, y: number): void;
  lwPointerUp(): void;
  dispose(): void;
};

export function getLinwisCanvasViewport(
  canvas: HTMLCanvasElement,
): LinwisEngineViewport {
  const bounds = canvas.getBoundingClientRect();
  const cssWidth = bounds.width || LINWIS_ENGINE_VIEWPORT.width;
  const cssHeight = bounds.height || LINWIS_ENGINE_VIEWPORT.height;
  const pixelRatio = Math.min(
    window.devicePixelRatio || 1,
    LINWIS_ENGINE_MAX_DEVICE_PIXEL_RATIO,
  );

  return {
    width: Math.max(1, Math.round(cssWidth * pixelRatio)),
    height: Math.max(1, Math.round(cssHeight * pixelRatio)),
  };
}

export async function createLinwisEngineRenderer({
  canvas,
  viewport = LINWIS_ENGINE_VIEWPORT,
}: LinwisEngineRendererOptions): Promise<LinwisEngineRenderer> {
  const { width, height } = viewport;

  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Linwis engine requires a 2D canvas context.");
  }
  context.imageSmoothingEnabled = true;

  const engineModule = await createLinwisEngineModule();
  const init = engineModule.cwrap("lw_init", "number", ["number", "number"]);
  const update = engineModule.cwrap("lw_update", null, ["number"]);
  const renderFrame = engineModule.cwrap("lw_render", null, []);
  const getPixels = engineModule.cwrap("lw_get_pixels", "number", []);
  const lwPointerDown = engineModule.cwrap("lw_pointer_down", null, [
    "number",
    "number",
  ]);
  const lwPointerMove = engineModule.cwrap("lw_pointer_move", null, [
    "number",
    "number",
  ]);
  const lwPointerUp = engineModule.cwrap("lw_pointer_up", null, []);
  const shutdown = engineModule.cwrap("lw_shutdown", null, []);

  init(width, height);

  const imageData = context.createImageData(width, height);
  const targetPixels = new Uint32Array(imageData.data.buffer);
  let disposed = false;

  return {
    viewport,
    render(deltaSeconds) {
      if (disposed) {
        return;
      }

      update(deltaSeconds);
      renderFrame();

      const pixelPointer = getPixels();
      const source = new Uint32Array(
        engineModule.HEAPU32.buffer,
        pixelPointer,
        width * height,
      );

      for (let index = 0; index < source.length; index += 1) {
        // source[index] = 0x0000
        const color = source[index];

        targetPixels[index] =
          0xff000000 |
          ((color & 0x00ff0000) >> 16) |
          (color & 0x0000ff00) |
          ((color & 0x000000ff) << 16);
      }

      context.putImageData(imageData, 0, 0);
    },
    lwPointerDown(x, y) {
      if (!disposed) {
        lwPointerDown(x, y);
      }
    },
    lwPointerMove(x, y) {
      if (!disposed) {
        lwPointerMove(x, y);
      }
    },
    lwPointerUp() {
      if (!disposed) {
        lwPointerUp();
      }
    },
    dispose() {
      if (disposed) {
        return;
      }

      disposed = true;
      shutdown();
    },
  };
}
