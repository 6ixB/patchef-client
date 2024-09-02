import AppLayout from "@/components/app-layout";
import RecipeArea from "@/components/recipe/recipe-area";

const App = () => {
  return (
    <AppLayout>
      <div className="w-full h-full flex">
        <RecipeArea />
      </div>
    </AppLayout>
  );
};

export default App;
