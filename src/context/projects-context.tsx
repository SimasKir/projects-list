"use client";

import { createContext, useState, useRef } from "react";
import { useEffect } from "react";
import { fetchProjects } from "@/lib/fetch-projects";
import {
  ProjectCardResponse,
  ProjectsContextType,
  ProjectsProviderProps,
  PaginationLevelType,
} from "@/types/types";

export const ProjectsContext = createContext<ProjectsContextType>({
  projects: [],
  setProjects: () => {},
  maxItems: 0,
  level: 1,
  setLevel: () => {},
});

export const ProjectsProvider = ({ children }: ProjectsProviderProps) => {
  const [projects, setProjects] = useState<ProjectCardResponse[]>([]);
  const [maxItems, setMaxItems] = useState<number>(0);
  const [level, setLevel] = useState<PaginationLevelType>(1);

  const didAddMaxItems = useRef(false);

  useEffect(() => {
    fetchProjects(level, maxItems)
      .then(({ data, meta }) => {
        setProjects(data);
        if (!didAddMaxItems.current && meta?.total != null) {
          setMaxItems(meta.total);
          didAddMaxItems.current = true;
        }
      })
      .catch((e) => console.error(e));
  }, [level]);

  console.log(projects);

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        setProjects,
        maxItems,
        level,
        setLevel,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
