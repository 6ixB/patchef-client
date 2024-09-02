import { CookingPot } from "lucide-react";

const RecipeDropZone = () => {
  return (
    <div className="w-full h-full rounded-sm flex flex-col items-center justify-center text-muted-foreground text-sm">
      <div className="flex flex-col items-center justify-center">
        <CookingPot className="size-4" />
        <p>Let us cook!</p>
      </div>
      <p>Drag and drop your commands here</p>
    </div>
  );
};

export default RecipeDropZone;
