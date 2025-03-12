import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useRecipeStore } from "@/hooks/use-recipe-store";
import type { RecipeEntity } from "@/types/recipes/recipe.entity";
import { useMutation } from "@tanstack/react-query";
import { Album, Folder } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { removeRecipe as removeRecipeApi } from "@/api/recipe.api";
import { uploadRecipe as uploadRecipeApi } from "@/api/recipe.api";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { Input } from "@/components/ui/input";
import { generateCommandString } from "@/services/commands.service";

interface RecipeTemplateListItemUploadButtonProps {
    recipe: RecipeEntity;
}

const RecipeTemplateListItemUploadButton = ({
    recipe,
}: RecipeTemplateListItemUploadButtonProps) => {
    const [folderName, setFolderName] = useState(""); // State for input field
    const { removeRecipe } = useRecipeStore();

    const removeCommandMutation = useMutation({
        mutationKey: ["remove-recipe", recipe.id],
        mutationFn: removeRecipeApi,
    });
    const uploadMutation = useMutation({
        mutationKey: ["upload-recipe"],
        mutationFn: uploadRecipeApi,
    });
    const handleSubmit = async () => {
        if (!recipe.commands) {
            const applyRecipe = () =>
                new Promise<void>((resolve) =>
                    setTimeout(async () => {
                        await removeCommandMutation.mutateAsync(recipe);
                        removeRecipe(recipe.id);
                        resolve();
                    }, 3000),
                );
            toast.promise(applyRecipe, {
                loading: "Recipe has no commands, removing recipe...",
                success: () => {
                    return `Recipe removed successfully - ${recipe.name}`;
                },
                error: "Error",
            });
            return;
        }
        if (!folderName.trim()) {
            toast.error("Please enter a folder name.");
            return;
        }

        const sanitizedCommands = recipe.commands.map((command) => generateCommandString(command));
        try {
            await uploadMutation.mutateAsync({
                folderName,
                commands: sanitizedCommands,
            });

            toast.success(`Recipe uploaded successfully to ${folderName}`);
        } catch (error) {
            toast.error(`Failed to upload recipe, error:  ${error}`);
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild={true}>
                <Button variant="ghost" size="icon">
                    <Album className="size-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Upload to ZOU</AlertDialogTitle>
                    <AlertDialogDescription>
                        Your recipe will be uploaded to ZOU. as a main.bat
                    </AlertDialogDescription>
                    <form className="flex w-full items-center justify-center gap-x-4">
                        <div className="relative w-full">
                            <Folder className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                name="folder-name"
                                placeholder="Folder Name..."
                                className="w-full px-8"
                                value={folderName}
                                onChange={(e) => setFolderName(e.target.value)}
                            />
                        </div>
                    </form>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleSubmit}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    );
};

export {
    type RecipeTemplateListItemUploadButtonProps,
    RecipeTemplateListItemUploadButton,
};
