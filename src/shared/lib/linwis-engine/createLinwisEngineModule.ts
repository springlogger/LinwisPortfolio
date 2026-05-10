import "client-only";

import createLinwisEngine from "./linwis_engine";
import {
  LINWIS_ENGINE_DATA_PATH,
  LINWIS_ENGINE_WASM_PATH,
} from "./constants";
import type {
  LinwisEngineModule,
  LinwisEngineOptions,
} from "./linwis_engine";

export type { LinwisEngineModule, LinwisEngineOptions } from "./linwis_engine";

export function createLinwisEngineModule(
  options: LinwisEngineOptions = {},
): Promise<LinwisEngineModule> {
  return createLinwisEngine({
    ...options,
    locateFile: (path, scriptDirectory) => {
      if (path.endsWith(".wasm")) {
        return LINWIS_ENGINE_WASM_PATH;
      }

      if (path.endsWith(".data")) {
        return LINWIS_ENGINE_DATA_PATH;
      }

      return options.locateFile?.(path, scriptDirectory) ?? `${scriptDirectory ?? ""}${path}`;
    },
  });
}
