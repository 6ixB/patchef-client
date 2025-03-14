import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { HeartIcon } from "lucide-react";

const contributors = [
  {
    id: 0,
    name: "VU24-1",
    designation: "Contributor",
    image: "https://avatars.githubusercontent.com/u/151295519?v=4",
    githubProfileUrl: "https://github.com/JojmoZ",
  },
  {
    id: 1,
    name: "XD23-1",
    designation: "Contributor",
    image: "https://avatars.githubusercontent.com/u/132283385?v=4",
    githubProfileUrl: "https://github.com/FlxdeCat",
  },
  {
    id: 2,
    name: "PB23-1",
    designation: "Contributor",
    image: "https://avatars.githubusercontent.com/u/65463983?v=4",
    githubProfileUrl: "https://github.com/d4ve-p",
  },
  {
    id: 3,
    name: "MY23-1",
    designation: "Psyker",
    image: "https://avatars.githubusercontent.com/u/124480418?v=4",
    githubProfileUrl: "https://github.com/6ixB",
  },
];

const ContributorList = () => {
  return (
    <div className="flex items-center gap-x-2">
      <p className="flex items-center font-medium text-muted-foreground text-xs">
        Made with&nbsp;
        <HeartIcon className="size-4 fill-red-400 stroke-none" />
        &nbsp;by
      </p>
      <AnimatedTooltip items={contributors} />
    </div>
  );
};

export { contributors, ContributorList };
