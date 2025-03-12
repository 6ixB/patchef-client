import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@radix-ui/react-dialog";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { useCommandStore } from "@/hooks/use-command-store";
import { cn } from "@/lib/utils";
import { generateCodeMarkdown, generateScriptPayload } from "@/services/commands.service";
import { Folder, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { uploadRecipe as uploadRecipeApi } from "@/api/recipe.api";
import { useMutation } from "@tanstack/react-query";

const UploadZouButton = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [showAlertDialog, setShowAlertDialog] = useState(false);
    const [folderName, setFolderName] = useState("");
      const uploadMutation = useMutation({
            mutationKey: ["upload-recipe"],
            mutationFn: uploadRecipeApi,
        });
    const { destinationCommands, commandPreviews, setCommandPreviews } = useCommandStore();

    

    const isEmpty = destinationCommands.length === 0;

    const handleSubmit = async () => {
        if (!folderName.trim()) {
            toast.error("Folder name is required!");
            return;
        }
        const sanitizedCommands = commandPreviews.map((command) => command.preview);
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
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        disabled={isEmpty}
                        onClick={() => {
                            setCommandPreviews();
                            setShowAlertDialog(true); 
                        }}
                        className={cn(
                            "transition-opacity duration-200",
                            isEmpty ? "!opacity-0" : "opacity-100"
                        )}
                    >
                        <p
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            Upload
                        </p>
                        <ArrowRight
                            className={cn(
                                "w-4 h-4 transition-transform duration-200 ml-2 size-4",
                                isHovered ? "translate-x-0.5" : ""
                            )}
                        />
                    </Button>
                </DialogTrigger>
                <DialogContent className="w-full max-w-5xl p-0 [&>button]:hidden">
                </DialogContent>
            </Dialog>

            {showAlertDialog && (
                <AlertDialog open={showAlertDialog} onOpenChange={setShowAlertDialog}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Upload to ZOU</AlertDialogTitle>
                            <AlertDialogDescription>
                                Your recipe will be uploaded to ZOU as <strong>main.bat</strong>.
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
            )}
        </>
    );
};

export default UploadZouButton;
