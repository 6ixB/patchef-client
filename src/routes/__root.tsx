import { createRootRoute, Outlet } from "@tanstack/react-router";
import { CatchBoundary } from "@tanstack/react-router";
import React from "react";

const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        })),
      );

const RootComponent = () => (
  <CatchBoundary
    getResetKey={() => "reset"}
    onCatch={(error) => console.error(error)}
  >
    <Outlet />
    <TanStackRouterDevtools />
  </CatchBoundary>
);

const Route = createRootRoute({
  component: RootComponent,
});

export { RootComponent, Route };
