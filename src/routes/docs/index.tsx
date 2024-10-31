import { Docs } from "@/components/docs/Docs";
import { createFileRoute } from "@tanstack/react-router";

const DocsIndexComponent = () => {
  return <Docs />;
};

const Route = createFileRoute("/docs/")({
  component: DocsIndexComponent,
});

export { DocsIndexComponent, Route };
