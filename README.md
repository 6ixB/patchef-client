# PatChef Client
**PatChef** is a user-friendly batch script builder designed to simplify the creation and management of batch files. With an intuitive drag-and-drop interface, you can effortlessly organize commands and logic into a visual workflow, eliminating the need for manual scripting. This is the client counterpart of the [PatChef Server module](https://github.com/slc-na/patchef-server), that will be used as a user interface of the PatChef services.

### Key Features:
- **Drag-and-Drop Commands**: Easily assemble commands from a pre-built library, organizing them in your preferred sequence.
- **Interactive Command Management**: Modify, rearrange, and configure commands using a simple, interactive interface.
- **Real-time Script Preview**: Instantly see the batch script generated from your command flow, allowing for easy tweaks.
- **Custom Command Creation**: Define custom commands and reusable blocks tailored to your specific tasks.
- **Export & Execute**: Export your script directly as a batch file, ready for execution on any system.

# Tech Stack

PatChef is built using a modern and versatile tech stack. Each tool in this stack plays a key role in enhancing performance, development speed, and maintainability:

- **TypeScript**: A statically-typed superset of JavaScript that enhances code quality and development experience by providing type safety, reducing runtime errors, and improving maintainability.
- **Rsbuild**: A fast and efficient bundler that compiles and bundles code to ensure optimized performance and swift build times.
- **React**: The core library for building dynamic, component-driven user interfaces. React’s declarative approach simplifies the development of complex UIs.
- **Zustand**: A lightweight, intuitive state management library for React. It allows for easy management of global state with minimal boilerplate.
- **DndKit**: A flexible and accessible drag-and-drop library for React, providing customizable and performant drag-and-drop interactions within the app.
- **Immer**: A utility that makes working with immutable data easier by allowing "mutations" on a draft state, which simplifies state management in React components.
- **UUID**: A library used to generate unique identifiers, crucial for assigning unique keys to elements and ensuring proper rendering in dynamic React lists.
- **TanStack React Table**: A headless library for building advanced, customizable data tables in React. It supports features like sorting, filtering, and pagination.
- **TanStack React Query**: A powerful tool for managing and caching server-side data in React applications, simplifying API interactions, data synchronization, and cache management.
- **Tailwind CSS**: A utility-first CSS framework that accelerates the development of responsive and custom-designed interfaces without the need for writing custom CSS.
- **ShadCN**: A collection of pre-built and customizable components that integrate seamlessly with Tailwind, allowing rapid development of consistent and polished UIs.
- **Zod**: A TypeScript-first schema validation library used to enforce strict data structures. Zod is particularly helpful for form validation and ensuring API responses conform to expected formats.

# Contribution Guidelines

Please follow these instructions to maintain consistency, quality, and strict adherence to TypeScript typing standards in the project. **All parameters, objects, and variables used must be properly typed**.

## Prerequisites

Before contributing, ensure you have the following installed:

- **pnpm** (for managing dependencies)
- **Biome** (linter and formatter) extension in VS Code

## Visual Studio Code Setup

For a consistent development experience, set the following preferences:

- **Enable format on save**
- Set tab size to **2 spaces**

## Naming Conventions

To maintain readability and consistency in the codebase, adhere to the following naming conventions:

### File Names
- Use **kebab-case** for file names.
  - Example: `ini-contoh-file.tsx`

### Component Names
- Use **PascalCase** for React components.
  - Example: `CommandDataTable`

### React Component Guidelines

- Declare each component as a **const arrow function**.
- Use **export** for the main component at the end of the component file.
- Always import components with **absolute paths** relative to the project root.
  - Example: `import Button from "@/components/ui/button"`
- For icons, always use components with the suffix `"Icon"` and import them from the **LucidIcon** library.

  - Example:
    ```tsx
    import { HomeIcon } from 'lucide-react';
    ```

## Folder Structure

Organize files within the `src` directory as follows:

- **types**: Holds declared types, interfaces, and enums.
- **lib**: Contains dummy data, utility functions, or library-specific code.
- **hooks**: Stores custom hooks and Zustand stores.
- **components**: Contains all React components.
  - **ui**: This folder holds **shadcn** base components. **Do not modify** files in this folder.
  - Main components that need children should be placed in a folder using **kebab-case**, except layout files.
  - If there are multiple layout files, group them inside a `layouts` folder.

## Branching

Always create a new branch when contributing. Follow the branch naming conventions as outlined [here](https://medium.com/@abhay.pixolo/naming-conventions-for-git-branches-a-cheatsheet-8549feca2534).

## Git Commit Messages

We follow **semantic commit messages**. Learn more about the conventions from this [guide](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716).

### Semantic Commit Messages Tool

To streamline your commit process, install the following tool to commit with semantic messages:  
[git-cz](https://github.com/streamich/git-cz)

Note: Please use git-cz --disable-emoji, I have come to realize that using emojis in commits is a God-level cringe, and should be avoided at all costs - MY23-1.

---

By following this guide, you help ensure the codebase remains clean, maintainable, and consistent across all contributions. Thank you for your contributions to PatChef!

# Setup

Install the dependencies:

```bash
pnpm install
```

# Get Started

Start the dev server:

```bash
pnpm dev
```

Build the app for production:

```bash
pnpm build
```

Preview the production build locally:

```bash
pnpm preview
```
