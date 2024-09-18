import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useCommandStore } from '@/hooks/use-command-store';

const PreviewRecipeDialogContent = () => {
  const { commandPreviews } = useCommandStore();

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Preview Recipe</AlertDialogTitle>
        <AlertDialogDescription>
          {commandPreviews.map((preview, index) => (
            <span key={index}>
              {preview}
              <br />
            </span>
          ))}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction>
          Continue
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default PreviewRecipeDialogContent;
