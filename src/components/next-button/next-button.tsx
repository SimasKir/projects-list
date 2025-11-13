import { ProjectsContext } from "@/context/projects-context";
import { PaginationLevelType } from "@/types/types";
import { useContext } from "react";
export const NextButton = () => {
  const { setLevel, level, maxItems, haveFilters, haveSort } =
    useContext(ProjectsContext);
  let projectsNumber = 10;
  let nextNumber = 10;

  if (maxItems && level === 5) {
    projectsNumber = maxItems;
    nextNumber = 10;
  } else if (maxItems && level === 4) {
    projectsNumber = 100;
    nextNumber = maxItems - 100;
  } else if (level === 3) {
    projectsNumber = 50;
    nextNumber = 50;
  } else if (level === 2) {
    projectsNumber = 20;
    nextNumber = 30;
  } else if (level === 1) {
    projectsNumber = 10;
    nextNumber = 10;
  }

  if (haveFilters || haveSort) return null;

  return (
    <div className="flex justify-center fixed bottom-0 w-full left-[50%] translate-x-[-50%] bg-linear-to-r from-[#676ece] to-[#c7a2da]">
      <div className="flex items-center justify-center gap-3 p-4 rounded-lg">
        <p className="font-bold">Showing {projectsNumber} projects</p>
        <button
          className="bg-[var(--profitus-color-2)] text-white font-bold py-2 px-4 rounded-full hover:bg-[var(--profitus-color-3)] cursor-pointer transition-colors duration-200"
          onClick={() =>
            setLevel((level > 5 ? 1 : level + 1) as PaginationLevelType)
          }
        >
          {maxItems && level === 5
            ? `Show only ${nextNumber} projects`
            : `Load ${nextNumber} more projects`}
        </button>
      </div>
    </div>
  );
};
