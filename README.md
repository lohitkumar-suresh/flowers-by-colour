
# Flowers by Colour

A lightweight Angular app to browse and filter flowers by color.  
Built with **Angular 19**, **NgRx** for state management, **RxJS** for reactive streams, **Tailwind CSS** for styling, and **Jest** for unit testing.

> This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version **19.1.4**.

## Tech Stack

- **Angular 19** (Standalone APIs)
- **NgRx** (`store`, `effects`, `entity`, `router-store`, `devtools`)
- **RxJS** (reactive filtering and data streams)
- **Tailwind CSS**
- **Jest** (+ `jest-preset-angular`) for unit tests

## Features

- Filter flowers by **color** using a global store (NgRx).
- Reactive UI updates driven by **selectors** and **RxJS** streams.
- Dev-friendly testing setup with **Jest** and **Testing Library** matchers.

---

## Getting Started

### Prerequisites
- **Node.js (LTS)** and **npm** installed (**Node 18+** recommended).

### Install dependencies
```bash
npm install
```

### Run the app (development)
```bash
npm start
# or
ng serve
```
Serves via Angular CLI at **http://localhost:4200**.  
The app will automatically reload when you change source files.

### Build for production
```bash
npm run build
# or
ng build
```
Outputs to `dist/flowers-by-colour/`.

### Rebuild on file changes (watch mode)
```bash
npm run watch
```

---

## Testing

Run the full test suite (Jest):
```bash
npm test
```

Watch mode (re-runs on file changes):
```bash
npm run test:watch
```

Generate a coverage report:
```bash
npm run test:coverage
```
Coverage output is in `coverage/` (open `coverage/lcov-report/index.html` in your browser).

> Tips for debugging tests:
```bash
npx jest --runInBand --detectOpenHandles
```

---

## Angular CLI Tips

### Development server
To start a local development server:
```bash
ng serve
```
Open `http://localhost:4200/` in your browser.

### Code scaffolding
Angular CLI provides code generators. For example, to generate a new component:
```bash
ng generate component component-name
```
List all available schematics (e.g., `component`, `directive`, `pipe`):
```bash
ng generate --help
```

### Building
To build the project:
```bash
ng build
```
Build artifacts are stored in the `dist/` directory. The production build is optimized for performance.

### Running unit tests (Angular CLI)
> This project uses **Jest** (not Karma). Prefer the npm scripts:
```bash
npm test
```
If you’ve configured an Angular CLI builder for Jest, you may also run:
```bash
ng test
```
*(Optional—only if you added a Jest builder to `angular.json`.)*

### Running end-to-end tests
For e2e testing, first add a framework (e.g., **Cypress** or **Playwright**). Angular CLI does not include e2e by default.
- After setup, you can typically run:
```bash
ng e2e
```
Choose the tool that best fits your workflow.

---

## NPM Scripts (from `package.json`)
- `start` → `ng serve`  
- `build` → `ng build`  
- `watch` → `ng build --watch --configuration development`  
- `test` → `jest`  
- `test:watch` → `jest --watch`  
- `test:coverage` → `jest --coverage`

---

## Notes
- **NgRx DevTools** support is included—if enabled in your environment, you can use the Redux DevTools browser extension during development.
- **Tailwind CSS** utilities are available directly in templates; no additional commands are required beyond the standard Angular build.
