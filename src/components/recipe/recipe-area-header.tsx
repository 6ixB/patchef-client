import RecipeAreaControls from '@/components/recipe/recipe-area-controls';
import { CookingPot } from 'lucide-react';

const RecipeAreaHeader = () => {
  return (
    <div className="w-full px-8 py-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center gap-x-2 min-w-32">
        <CookingPot className="size-4" />
        <h1 className="font-medium">Recipe</h1>
      </div>
      <RecipeAreaControls />
    </div>
  );
};

export default RecipeAreaHeader;
