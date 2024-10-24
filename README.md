# PatChef Client
**PatChef** is a user-friendly batch script builder designed to simplify the creation and management of batch files. With an intuitive drag-and-drop interface, you can effortlessly organize commands and logic into a visual workflow, eliminating the need for manual scripting. This is the client counterpart of the [PatChef Server module](https://github.com/slc-na/patchef-server), that will be used as a user interface of the PatChef services.

### Key Features:
- **Drag-and-Drop Commands**: Easily assemble commands from a pre-built library, organizing them in your preferred sequence.
- **Interactive Command Management**: Modify, rearrange, and configure commands using a simple, interactive interface.
- **Real-time Script Preview**: Instantly see the batch script generated from your command flow, allowing for easy tweaks.
- **Custom Command Creation**: Define custom commands and reusable blocks tailored to your specific tasks.
- **Export & Execute**: Export your script directly as a batch file, ready for execution on any system.

# Contribution Guidelines

Please follow these instructions to maintain consistency, quality, and strict adherence to TypeScript typing standards in the project. **All parameters, objects, and variables used must be properly typed**.

## Prerequisites

Before contributing, ensure you have the following installed:

- **pnpm** (for managing dependencies)
- **Biome** (linter and formatter) extension in VS Code

## Code Editor Setup

For a consistent development experience, set the following preferences:

- **Enable format on save**
- Set tab size to **2 spaces**

## Naming Conventions

To maintain readability and consistency in the codebase, adhere to the following naming conventions:

### File Names
- Use **kebab-case** for file names.
  - Example: `example-file-name.tsx`

### Component Names
- Use **PascalCase** for React components.
  - Example: `CommandDataTable`

### React Component Guidelines

- Declare each component as a **const arrow function**.
- Use **export** for the main component at the end of the component file (**but do not use export default**).
- Always import components with **absolute paths** relative to the project root.
  - Example: `import Button from "@/components/ui/button"`
- For icons, always use components with the suffix `"Icon"` and import them from the **LucidIcon** library.

  - Example:
    ```tsx
    import { HomeIcon } from 'lucide-react';
    ```

## Folder Structure

Organize files within the `src` directory as follows:
```
├── public
└── src
    ├── api
    ├── components
    │   ├── ui
    │   └── (modules)
    ├── hooks
    ├── lib
    ├── services
    ├── styles
    └── types
```

## Branching

Always create a new branch when contributing. Follow the branch naming conventions as outlined [here](https://medium.com/@abhay.pixolo/naming-conventions-for-git-branches-a-cheatsheet-8549feca2534).

## Git Commit Messages

We follow **semantic commit messages**. Learn more about the conventions from this [guide](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716).

To commit please run ```pnpm commit```

### Semantic Commit Messages Tool

To streamline your commit process, install the following tool to commit with semantic messages:  
[git-cz](https://github.com/streamich/git-cz)

Note: Please use ```git-cz --disable-emoji```, 
I have come to realize that using emojis in commits is a God-level cringe, and should be avoided at all costs.

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

Commit changes:

```bash
pnpm commit
```

Build the app for production:

```bash
pnpm build
```

Preview the production build locally:

```bash
pnpm preview
```
