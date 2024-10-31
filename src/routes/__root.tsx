import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

const RootComponent = () => (
  <>
    <Outlet />
    <TanStackRouterDevtools />
  </>
);

const Route = createRootRoute({
  component: RootComponent,
});

export { RootComponent, Route };
