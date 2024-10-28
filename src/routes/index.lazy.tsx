import { App } from "@/components/App";
import { createLazyFileRoute } from "@tanstack/react-router";

const Index = () => {
  return <App />;
};

const Route = createLazyFileRoute("/")({
  component: Index,
});

export { Index, Route };
