import RecipeAreaHeader from '@/components/recipe/recipe-area-header';
import RecipeDropZone from '@/components/recipe/recipe-drop-zone';

const RecipeArea = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <RecipeAreaHeader />
      <RecipeDropZone />
    </div>
  );
};

export default RecipeArea;
