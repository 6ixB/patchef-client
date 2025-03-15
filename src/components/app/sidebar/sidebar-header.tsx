import { DraggableViewSearch } from "@/components/app/sidebar/draggable-view-search";
import { ManageButton } from "@/components/app/sidebar/manage-button";
import { DraggableView } from "@/components/app/sidebar/sidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { defaults } from "@/lib/defaults";
import { CookingPotIcon, TerminalIcon } from "lucide-react";

interface SidebarHeaderProps {
  draggableView: DraggableView;
  setDraggableView: (draggable: DraggableView) => void;
}

const SidebarHeader = ({ setDraggableView }: SidebarHeaderProps) => {
  return (
    <div className="flex w-full flex-col gap-y-4 px-8 py-3">
      <div className="flex items-center justify-between gap-x-4">
        <Select
          defaultValue={DraggableView.Commands}
          onValueChange={(value) => {
            setDraggableView(value as DraggableView);
          }}
        >
          <SelectTrigger>
            <SelectValue
              placeholder={defaults.placeholders.draggableView.select}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={DraggableView.Commands}>
              <div className="flex items-center gap-x-2">
                <TerminalIcon className="size-4" />
                <h1 className="font-medium">Commands</h1>
              </div>
            </SelectItem>
            <SelectItem value={DraggableView.Recipes}>
              <div className="flex items-center gap-x-2">
                <CookingPotIcon className="size-4" />
                <h1 className="font-medium">Recipes</h1>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
        <ManageButton />
      </div>
      <DraggableViewSearch />
    </div>
  );
};

export { type SidebarHeaderProps, SidebarHeader };
