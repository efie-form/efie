---
applyTo: '**'
---

## Project Overview

This project, Efie Form, is a framework-agnostic form builder. It allows for the creation of dynamic forms in various JavaScript environments (React, Vue, Angular, Vanilla JS) and supports headless rendering for maximum customization.

The project is structured as a monorepo using pnpm workspaces and Nx.

Key packages include:
- `@efie-form/core`: Core logic.
- `@efie-form/builder`: The main form builder implementation.
- `@efie-form/react`: React-specific components.
- `@efie-form/vue`: Vue-specific components.

## Coding Standards & Conventions

### Language: TypeScript
- Utilize TypeScript for all new code.
- Enable and adhere to strict type checking.
- Use `tsconfig.json` configurations provided in the project and individual packages.
- Prefer `interface` over `type` for defining object shapes, but use `type` for unions, intersections, or primitives.
- Use `unknown` instead of `any` where possible, and provide type guards.
- Leverage TypeScript utility types (e.g., `Partial`, `Readonly`, `ReturnType`) to write more concise and maintainable code.

### Linting & Formatting: ESLint & Prettier (via @stylistic/eslint-plugin)
- ESLint is configured in `eslint.config.js`.
- Adhere to the ESLint rules defined. Run `pnpm lint` to check and `pnpm lint:fix` to automatically fix issues.
- Key style points from `.eslintrc.js`:
    - Indentation: 2 spaces.
    - Quotes: Single quotes (`'`).
    - Semicolons: Required.
    - JSX: Enabled.
- Enable "Format on Save" in your editor to automatically apply formatting.
- Ensure `unused-imports/no-unused-imports` rule is followed to keep imports clean.
- Use consistent type imports: `import type { MyType } from './my-module';`

### Naming Conventions
- **File Names**: Use kebab-case (e.g., `my-component.tsx`, `utility-functions.ts`). Exception: `README.md`, `LICENSE`. (Note: `unicorn/filename-case` is currently off, but consistency is good).
- **Variables & Functions**: Use camelCase (e.g., `myVariable`, `calculateValue`).
- **Classes & Interfaces & Types**: Use PascalCase (e.g., `MyClass`, `FormField`).
- **Constants**: Use SCREAMING_SNAKE_CASE (e.g., `MAX_USERS`).

### Component Design (React/Vue)
- **Props**: Clearly define prop types. For React, use TypeScript interfaces.
- **State Management**:
    - For global/shared state within the builder, Zustand is used. Follow the reactive patterns outlined in `packages/builder/docs/zustand-reactive-patterns.md`.
    - Prefer direct subscription with selectors for performance.
    - Use `useCallback` for memoizing selectors.
    - For local component state, use `useState` (React) or `ref`/`reactive` (Vue).
- **Modularity**: Break down complex components into smaller, reusable ones.
- **Accessibility**: Ensure components are accessible (ARIA attributes, keyboard navigation, etc.).

### Testing (Jest)
- Write unit tests for all new features and bug fixes.
- Test files should be located in `__tests__` directories alongside the code they test.
- Test files should follow the naming convention `*.test.ts` or `*.spec.ts`.
- Aim for high test coverage. Use `pnpm test:coverage` to check.
- Refer to `packages/builder/jest.config.js` for Jest configuration.
- Focus on testing business logic, state manipulations, and critical utility functions.

### Git & Version Control
- Follow conventional commit messages (e.g., `feat: add new feature`, `fix: resolve bug`, `docs: update documentation`).
- Create feature branches from `main`.
- Ensure all tests and lint checks pass before creating a Pull Request.
- Pull Requests should be reviewed before merging.

### Documentation
- **READMEs**: Each package should have a `README.md` explaining its purpose, setup, and usage. The root `README.md` provides an overview.
- **Code Comments**: Use TSDoc for public APIs. Add comments to explain complex logic.
- **Architectural Decisions**: Document significant architectural decisions or patterns (e.g., the Zustand usage in `packages/builder/docs/zustand-reactive-patterns.md`).
- **CI/CD**: Refer to `docs/ci-cd.md` for information on the CI/CD setup.

### Dependencies
- Use `pnpm` for package management.
- Before adding new dependencies, discuss with the team to avoid unnecessary bloat.
- Keep dependencies up-to-date and address security vulnerabilities.

### Error Handling
- Implement robust error handling.
- Provide meaningful error messages to users/developers.
- For asynchronous operations, handle promise rejections appropriately.

### Performance
- Be mindful of performance, especially in the core library and rendering paths.
- Use memoization (e.g., `useMemo`, `useCallback` in React) where appropriate.
- Avoid unnecessary re-renders in UI components.
- Profile and optimize critical code paths if performance issues are identified.

## Specific Project Knowledge

### Form Schema
- Understand the structure of the form schema used by the builder. This is central to how forms are defined and rendered.
- Default schema can be found in `packages/core/lib/default-schema.ts`.

### State Management (Zustand in `@efie-form/builder`)
- The form builder heavily relies on Zustand for managing its internal state (schema, history, selected fields).
- Key concepts:
    - `useSchemaStore`: Hook to access and manipulate the form schema and its properties.
    - `useSettingsStore`: Hook for editor/builder specific settings.
- **Reactive Patterns**:
    - **Direct Subscription with Selectors**: This is the recommended way to consume store state in components. It ensures components only re-render when the specific data they care about changes.
        ```tsx
        const fieldProperty = useSchemaStore(
            useCallback(
            (state) => state.getFieldProperty(fieldId, type),
            [fieldId, type]
            )
        );
        ```
    - **Avoid Manual Effect-Based Subscriptions**: Do not manually subscribe to store changes using `useEffect` and `store.subscribe()`.
    - **Custom Hooks for Complex Logic**: Encapsulate complex reactive logic related to store interactions in custom hooks (e.g., `useFieldProperty.ts`).
    - Refer to `packages/builder/docs/zustand-reactive-patterns.md` for detailed explanations and examples.

### Headless Rendering
- The core package provides capabilities for headless rendering, meaning the logic is decoupled from the UI. This allows consumers to use their own rendering components.

### Extensibility
- The system is designed to be extensible, allowing custom field types and components.

### CI/CD
- GitHub Actions are used for linting, testing (Node 18 & 20), and building.
- Coverage reports are uploaded to Codecov (if `CODECOV_TOKEN` is set).
- Workflows are defined in `.github/workflows/`.

## Library and Utility Usage

This section details the usage of common libraries, utilities, and conventions within the Efie Form project.

### 1. `cn` Utility Function

- **Purpose:** The `cn` utility function, found in `packages/builder/src/lib/utils.ts`, is a helper for conditionally joining class names. It leverages `clsx` for flexible class name definition and `tailwind-merge` to intelligently merge Tailwind CSS classes, preventing style conflicts and ensuring a clean final class string.
- **Usage:** Import `cn` from `@/lib/utils` (or the appropriate relative path) and use it to combine static and dynamic classes.
  ```typescript
  import { cn } from "{relative-path}/lib/utils";

  const MyComponent = ({ isActive, className }) => {
    return (
      <div className={cn("base-class", { "active-class": isActive }, className)}>
        ...
      </div>
    );
  };
  ```
- **Testing:** Unit tests for components using `cn` should verify that the correct class names are applied based on the provided props and conditions. For the `cn` utility itself (if ever modified or extended), tests should cover:
    - Basic class joining.
    - Conditional class application.
    - Correct merging of Tailwind CSS classes (e.g., `p-2` and `p-4` should result in `p-4`).
    - Handling of falsy values.

### 2. Tailwind CSS

The project utilizes Tailwind CSS for styling. Key aspects of its configuration and usage are:

- **Configuration File:** The primary Tailwind configuration is located at `packages/builder/tailwind.config.js`.
- **Available Colors:**
    - **White:** `#FFFFFF` (class: `bg-white`, `text-white`, etc.)
    - **Primary:** Shades from 50 to 900 (e.g., `bg-primary-50`, `text-primary-DEFAULT`, `border-primary-600`). These are mapped to CSS variables like `--color-primary-500`.
    - **Success:** Shades from 50 to 900 (e.g., `bg-success-500`). Mapped to CSS variables like `--color-green-500`.
    - **Neutral:** Shades from 50 to 900 (e.g., `bg-neutral-300`). Mapped to CSS variables like `--color-neutral-300`.
    - **Danger:** Shades from 50 to 900 (e.g., `bg-danger-DEFAULT`). Mapped to CSS variables like `--color-red-500`.
    - Always refer to the `tailwind.config.js` for the most up-to-date list and their exact definitions (often via CSS variables).
- **Available Sizes:** The project uses Tailwind's default spacing, width, height, font size, etc., scales. Refer to the official Tailwind CSS documentation for the available utility classes (e.g., `p-2`, `m-4`, `w-1/2`, `h-screen`, `text-lg`).
- **Font:** The default sans-serif font is 'Inter'.

### 3. Typography

- **Convention:** The project uses a set of custom typography classes prefixed with `typography-` (e.g., `typography-h1`, `typography-body1`, `typography-body2`, `typography-subtitle`). These classes encapsulate specific combinations of font size, weight, line height, and letter spacing for consistent text styling.
- **Usage:** Apply these classes directly to HTML elements or components that render text.
  ```tsx
  <h1 className="typography-h1">Page Title</h1>
  <p className="typography-body1">This is a paragraph of body text.</p>
  <span className="typography-link">A small caption.</span>
  ```
- **Discovery:** While not explicitly defined as a plugin in the visible `tailwind.config.js`, these classes are present and used throughout the `packages/builder` components. Their exact definitions are likely part of the broader CSS setup or a Tailwind preset used by the project.
- **Testing:** When testing components that use these typography classes, visual regression testing is the most effective way to ensure styles are applied correctly. Unit tests can assert that the correct typography class is applied based on component props or state, but they won't verify the visual output.

- **Available type:** 
    - typography-body1
    - typography-body2
    - typography-body3
    - typography-body4
    - typography-button1
    - typography-button2
    - typography-button3
    - typography-link


### 4. Unit Testing for Utilities and UI

- **Utility Functions (like `cn`):**
    - Test pure functions with various inputs, including edge cases.
    - Ensure they produce the expected output consistently.
    - Mock any external dependencies if necessary.
- **UI Components using Tailwind/Typography:**
    - **Jest & React Testing Library:** Focus on testing component behavior and output. Assert that correct classes (including Tailwind and typography classes) are applied based on props and state.
    - **Snapshot Testing:** Use sparingly for components with stable UI. Be mindful that snapshots can become brittle with frequent style changes.
    - **Visual Regression Testing:** For ensuring visual consistency of styled components and typography, consider integrating visual regression testing tools into the CI/CD pipeline. This is particularly important for typography classes where the exact visual rendering is key.
    - **Accessibility Testing:** Ensure components are accessible, which includes checking if text has sufficient contrast and is scalable, often indirectly related to typography choices.

This new section should be placed after the "Specific Project Knowledge" section and before any "Contribution Process" or similar sections if they exist. If a "Styling" or "Frontend Development" section exists, these details could also be integrated there.

