# Macro-level plan for the new scaffold

| Step | Goal / Deliverable                                                                                         |
|:----:|:------------------------------------------------------------------------------------------------------------|
| 1    | **Bootstrapped Vite + TypeScript project**<br>Initialize a Vite app with the TS template and minimal defaults. |
| 2    | **Prettier**<br>Install and configure Prettier for consistent formatting.                                    |
| 3    | **ESLint + Prettier integration**<br>Install ESLint, wire it up with Prettier (via eslint-plugin-prettier or recommended config), and add an “import-sorting” plugin. |
| 4    | **npm scripts**<br>Add scripts for `dev`, `lint` (ESLint + Prettier check), and `lint:fix` (ESLint --fix + Prettier --write). |
| 5    | **Unit testing with Vitest**<br>Install Vitest, configure it alongside Vite’s TS support, and create a `tests/` folder for the specs. |
| 6    | **ESLint adjustments for tests**<br>Update the ESLint config to recognize our `tests/` directory (e.g. jest/vitest globals, proper parser options). |
| 7    | **tsconfig tweaks**<br>Ensure `tsconfig.json` includes the tests (e.g. `"include": ["src", "tests"]`) and any path aliases. |