import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { ArrowRightToLineIcon, CookingPotIcon } from "lucide-react";

const RecipeTemplateListItem = () => {
  return (
    <Card className="flex select-none items-center justify-between rounded-sm ps-4 pe-2 pt-4 pb-4">
      <div className="flex items-center gap-x-2">
        <CookingPotIcon className="size-4" />
        <CardTitle className="text-sm">Recipe Name</CardTitle>
      </div>
      <Button variant="ghost" size="icon">
        <ArrowRightToLineIcon className="size-4" />
      </Button>
    </Card>
  );
};

export { RecipeTemplateListItem };
