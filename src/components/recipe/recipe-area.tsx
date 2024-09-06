import RecipeDropZone from '@/components/recipe/recipe-drop-zone';
import RecipeAreaHeader from '@/components/recipe/recipe-area-header';

const RecipeArea = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <RecipeAreaHeader />
      <RecipeDropZone />
    </div>
  );
};

export default RecipeArea;
