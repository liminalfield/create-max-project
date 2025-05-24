# create-max-project

A CLI tool to scaffold Max and Max for Live development environments using JavaScript or TypeScript. Supports standalone JS/TS libraries and full Max projects including AMXD device structures.

---

## Features

- Interactive CLI: select language and project type
- Four ready-to-use templates:
  - TypeScript Library (`typescript-lib-only`)
  - JavaScript Library (`javascript-lib-only`)
  - Full TypeScript Max Project (`typescript-full-project`)
  - Full JavaScript Max Project (`javascript-full-project`)
- Auto-generates `dev/` and `max-project/` structure
- Runs `npm install` automatically if a `dev/package.json` is found
- Optional Git initialization with `.gitignore` and `.gitattributes`
- Supports automatic file copying to Max `code/` folders after build
- Includes starter type definitions for Max scripting (`types/max.d.ts`)

---

## Installation (once published)

```bash
npm install -g create-max-project
```

For local testing:

```bash
npm link
```

---

## Usage

```bash
create-max-project
```

You will be prompted to:

- Enter the project name
- Choose project type (library-only or full Max project)
- Choose language (JavaScript or TypeScript)
- Optionally enter version, author info
- Choose whether to initialize a Git repo

---

## Template Output Overview

Each project is scaffolded under a new top-level folder using your chosen project name (e.g., `my-max-thing/`).

If you choose to initialize Git during setup, the project will also include:

- `.gitignore` – pre-filled with standard entries for JS/TS, Max projects, and IDEs (e.g., `node_modules`, `dist`, `.idea`, `.vscode`, `.env`, etc.)
- `.gitattributes` – enforces consistent line endings and text treatment across platforms, especially useful for Max patchers and scripting files.

---

### 1. `typescript-lib-only`

```
my-project/
├── dev/
│   ├── src/
│   │   └── example.ts
│   ├── dist/
│   ├── tsconfig.json
│   ├── package.json
│   └── types/
│       └── max.d.ts
└── copy.config.json
```

**Use case**: Utility libraries or modules that will be imported into other Max projects.

**Commands**:

```bash
cd my-project/dev
npm install
npm run build
```

---

### 2. `javascript-lib-only`

```
my-project/
├── dev/
│   ├── src/
│   │   └── example.js
│   ├── dist/
│   ├── package.json
└── copy.config.json
```

**Use case**: Simple reusable Max-compatible JS modules.

**Commands**:

```bash
cd my-project/dev
npm install
npm run build
```

---

### 3. `typescript-full-project`

```
my-project/
├── dev/
│   ├── src/
│   │   └── index.ts
│   ├── dist/
│   ├── tsconfig.json
│   ├── package.json
│   ├── scripts/
│   │   └── copy-to-max.js
│   ├── types/
│   │   └── max.d.ts
│   └── copy.config.json
├── max-project/
│   └── code/
```

**Use case**: Full Max for Live or Max device with TypeScript-based JS scripting.

**Build + copy**:

```bash
cd my-project/dev
npm install
npm run build
```

You can configure which files get copied by editing `copy.config.json`:

```json
{
  "filesToCopy": ["index.js"],
  "dest": "../max-project/code"
}
```

Leave `filesToCopy` empty to copy the entire `dist/` folder recursively.

---

### 4. `javascript-full-project`

```
my-project/
├── dev/
│   ├── src/
│   │   └── index.js
│   ├── dist/
│   ├── package.json
│   ├── scripts/
│   │   └── copy-to-max.js
│   └── copy.config.json
├── max-project/
│   └── code/
```

**Use case**: Full Max for Live or Max device using plain JavaScript.

**Commands**:

```bash
cd my-project/dev
npm install
npm run build
```

---

## Customizing `copy.config.json`

```json
{
  "filesToCopy": [],
  "dest": "../max-project/code"
}
```

- If `filesToCopy` is empty → all files from `dist/` are copied recursively
- If `filesToCopy` includes file names → only those files (with folders preserved) will be copied
- `dest` is the path (relative to `dev/`) where the files will be placed

---

## TypeScript and Max Integration

TypeScript templates include a `types/max.d.ts` file that provides basic type declarations for Max’s JS scripting environment and a partial interface for LiveAPI. This helps with:

- Autocomplete and hinting in editors like VS Code or WebStorm
- Type safety for Max's global JS functions
- Basic support for LOM scripting in TypeScript

You can expand `max.d.ts` over time as your Max scripting grows.

---

## Roadmap Ideas

- Support for esbuild or Vite as alternative bundlers
- Optional `.copyignore` support
- Auto-import scaffolds for JS libraries
- Glob or pattern-based copying (e.g. `**/*.js`)
- Full LOM type coverage

---

## License

Apache-2.0

---

## Contact

Built by [Oluf Andrews](mailto:oluf@oandrews.com). Contributions and issues welcome once public!
