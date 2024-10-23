import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const RecipeTemplateListItemSkeleton = () => {
  return (
    <Card className="flex h-[70px] select-none items-center justify-between rounded-sm ps-4 pe-2 pt-4 pb-4">
      <div className="flex items-center gap-x-2">
        <Skeleton className="size-4 rounded-full bg-gray-300 dark:bg-gray-700" />
        <Skeleton className="h-3 w-32 rounded-md bg-gray-300 dark:bg-gray-700" />
      </div>
    </Card>
  );
};

export { RecipeTemplateListItemSkeleton };
