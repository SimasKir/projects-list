"use client";

import { createContext, useState, ReactNode } from "react";
import { useEffect } from "react";
import { fetchProjects } from "@/lib/projects";
import {
  ProjectCardResponse,
  ProjectsContextType,
  ProjectsProviderProps,
} from "@/types/types";

export const ProjectsContext = createContext<ProjectsContextType>({
  projects: [],
  setProjects: () => {},
});

export const ProjectsProvider = ({ children }: ProjectsProviderProps) => {
  const [projects, setProjects] = useState<ProjectCardResponse[]>([]);
  const [maxItems, setMaxItems] = useState<number>();

  useEffect(() => {
    fetchProjects()
      .then(({ data, meta }) => {
        setProjects(data);
        setMaxItems((prev) => prev ?? meta.total);
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        setProjects,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
