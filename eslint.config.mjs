import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import boundaries from "eslint-plugin-boundaries";

const FSD_ELEMENTS = [
  { type: "app",      pattern: "src/app/**"      },
  { type: "views",    pattern: "src/views/**"    },
  { type: "widgets",  pattern: "src/widgets/**"  },
  { type: "features", pattern: "src/features/**" },
  { type: "entities", pattern: "src/entities/**" },
  { type: "shared",   pattern: "src/shared/**"   },
  { type: "assets",   pattern: "src/assets/**"   },
];

// What each layer is allowed to import from (layers below it only)
const FSD_RULES = [
  { from: "app",      allow: ["views", "widgets", "features", "entities", "shared", "assets"] },
  { from: "views",    allow: ["widgets", "features", "entities", "shared", "assets"] },
  { from: "widgets",  allow: ["features", "entities", "shared", "assets"] },
  { from: "features", allow: ["entities", "shared", "assets"] },
  { from: "entities", allow: ["shared", "assets"] },
  { from: "shared",   allow: ["assets"] },
  { from: "assets",   allow: [] },
];

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "src/shared/lib/linwis-engine/linwis_engine.js",
  ]),

  // FSD layer boundary enforcement
  {
    plugins: { boundaries },
    settings: {
      "boundaries/elements": FSD_ELEMENTS,
      "boundaries/ignore": ["**/*.test.*", "**/*.spec.*", "**/*.stories.*"],
    },
    rules: {
      "boundaries/dependencies": ["error", {
        default: "disallow",
        rules: FSD_RULES,
      }],
      // Warn when importing from an unrecognised layer
      "boundaries/no-unknown": "warn",
    },
  },

  // TypeScript quality rules
  {
    rules: {
      // Enforce `import type` for type-only imports — keeps runtime bundles clean
      "@typescript-eslint/consistent-type-imports": ["error", {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      }],

      // Discourage `any` — use `unknown` + narrowing instead
      "@typescript-eslint/no-explicit-any": "warn",

      // Arrow functions for callbacks and expressions
      "prefer-arrow-callback": "error",

      // Leave console.warn/error for error boundaries; strip console.log in prod
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
]);

export default eslintConfig;
