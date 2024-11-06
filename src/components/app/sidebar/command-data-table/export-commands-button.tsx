import { fetchCommands as fetchCommandsApi } from "@/api/command.api";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { DownloadIcon } from "lucide-react";

const ExportCommandsButton = () => {
  const { refetch } = useQuery({
    queryKey: ["get-commands-on-export"],
    queryFn: fetchCommandsApi,

    // A bunch of options to disable the auto-refetching shit
    enabled: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const handleExportClick = async () => {
    const { data } = await refetch();

    if (data) {
      const json = JSON.stringify(data, null, 2);
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "commands.json";

      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <Button variant="secondary" onClick={handleExportClick}>
      <DownloadIcon className="mr-2 size-4" />
      Export
    </Button>
  );
};

export { ExportCommandsButton };
