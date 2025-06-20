# Macro-level plan for the new scaffold

| Step | Goal / Deliverable                                                                                                                                                    | Status |
| :--: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----- |
|  1   | **Bootstrapped Vite + TypeScript project**<br>Initialize a Vite app with the TS template and minimal defaults.                                                        | ✅     |
|  2   | **Prettier**<br>Install and configure Prettier for consistent formatting.                                                                                             | ✅     |
|  3   | **ESLint + Prettier integration**<br>Install ESLint, wire it up with Prettier (via eslint-plugin-prettier or recommended config), and add an “import-sorting” plugin. | ✅     |
|  4   | **npm scripts**<br>Add scripts for `dev`, `lint` (ESLint + Prettier check), and `lint:fix` (ESLint --fix + Prettier --write).                                         | ✅     |
|  5   | **Unit testing with Vitest**<br>Install Vitest, configure it alongside Vite’s TS support, and create a `tests/` folder for the specs.                                 |        |
|  6   | **ESLint adjustments for tests**<br>Update the ESLint config to recognize our `tests/` directory (e.g. jest/vitest globals, proper parser options).                   |        |
|  7   | **tsconfig tweaks**<br>Ensure `tsconfig.json` includes the tests (e.g. "include": ["src", "tests"]) and any path aliases.                                             |        |

## Micro-level actionable plan

- **1.1** bootstrap Vite with TypeScript template (Commit: chore: scaffold Vite + TS project) <!-- ✅ -->
- **1.2** Install initial dependencies and lock file (Commit: chore: install dependencies) <!-- ✅ -->
- **1.3** Verify development server starts successfully (Commit: test: verify dev server) <!-- ✅ -->

- **2.1** Add Prettier package and lock file entry (Commit: chore: add Prettier) <!-- ✅ -->
- **2.2** Create `.prettierrc` and `.prettierignore` with minimal defaults (Commit: config: Prettier setup) <!-- ✅ -->
- **2.3** Run Prettier across `src` and commit formatted code (Commit: style: format code with Prettier) <!-- ✅ -->

- **3.1** Install ESLint core, TypeScript parser, and necessary plugins (Commit: chore: add ESLint core + TS parser) <!-- ✅ -->
- **3.2** Integrate `eslint-plugin-prettier` and `eslint-config-prettier` (Commit: config: ESLint + Prettier integration) <!-- ✅ (used flat config best practice) -->
- **3.3** Add and configure import-sorting plugin (Commit: config: import sorting in ESLint) <!-- ✅ -->
- **3.4** Run lint check and autofix issues (Commit: style: apply ESLint fixes) <!-- ✅ -->

- **4.1** Define npm scripts: `dev`, `lint`, `lint:fix` in `package.json` (Commit: chore: add npm scripts) <!-- ✅ -->
- **4.2** Validate each script executes expected commands (Commit: test: verify npm scripts) <!-- ✅ -->

- **5.1** Install Vitest and related dependencies for TS support (Commit: chore: add Vitest)
- **5.2** Create `vitest.config.ts` with basic setup (Commit: config: Vitest setup)
- **5.3** Add initial sample test in `tests/` directory (Commit: test: add sample spec)
- **5.4** Run test suite and ensure no failures (Commit: test: verify Vitest)

- **6.1** Update ESLint config to include Vitest globals and `tests/` env (Commit: config: ESLint Vitest env)
- **6.2** Adjust parser options or overrides for test files (Commit: config: ESLint parser options for tests)
- **6.3** Lint test files and auto-fix issues (Commit: style: lint tests)

- **7.1** Update `tsconfig.json` to include `tests/` directory (Commit: config: include tests in TS)
