export type LinwisEngineOptions = {
  locateFile?: (path: string, scriptDirectory?: string) => string;
};

export type LinwisEngineModule = {
  HEAPU32: Uint32Array;
  cwrap(
    ident: string,
    returnType: "number",
    argTypes: readonly string[],
  ): (...args: number[]) => number;
  cwrap(
    ident: string,
    returnType: null,
    argTypes: readonly string[],
  ): (...args: number[]) => void;
};

export default function createLinwisEngine(
  moduleArg?: LinwisEngineOptions,
): Promise<LinwisEngineModule>;
