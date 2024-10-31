import { App } from "@/components/app/App";
import { createFileRoute } from "@tanstack/react-router";

const IndexComponent = () => {
  return <App />;
};

const Route = createFileRoute("/")({
  component: IndexComponent,
});

export { IndexComponent, Route };
