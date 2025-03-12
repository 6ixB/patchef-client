import { ClearCommandsButton } from "@/components/app/recipe/clear-commands-button";
import { PreviewCommandsButton } from "@/components/app/recipe/preview-commands-button";
import UploadZouButton from "./upload-zou-button";

const RecipeAreaControls = () => {
  return (
    <div className="flex items-center gap-x-2">
      <ClearCommandsButton />
      <PreviewCommandsButton />
      <UploadZouButton/>
    </div>
  );
};

export { RecipeAreaControls };
