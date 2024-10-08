import { ScrollArea } from "@/components/ui/scroll-area";
import { RecipeTemplateListItem } from "@/components/recipe/template/recipe-template-list-item";

const RecipeTemplateList = () => {
  return (
    <ScrollArea className="h-full w-full">
      <div className="flex h-full w-full flex-col gap-y-2 px-8 pb-4">
        {[1, 2, 3, 4, 5].map((item) => (
          <RecipeTemplateListItem key={item} />
        ))}
      </div>
    </ScrollArea>
  );
};

export { RecipeTemplateList };
