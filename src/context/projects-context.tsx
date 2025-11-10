"use client";

import { createContext, useState, useRef } from "react";
import { useEffect } from "react";
import { fetchProjects } from "@/lib/fetch-projects";
import {
  ProjectCardResponse,
  ProjectsContextType,
  ProjectsProviderProps,
  PaginationLevelType,
  FiltersType,
} from "@/types/types";

export const DEFAULT_FILTERS: FiltersType = {
  country: [],
  initial_rating: [],
  purpose: "",
  credit_duration_min: null,
  credit_duration_max: null,
  pid: "",
};

export const ProjectsContext = createContext<ProjectsContextType>({
  projects: [],
  setProjects: () => {},
  maxItems: 0,
  level: 1,
  setLevel: () => {},
  filters: DEFAULT_FILTERS,
  setFilters: () => {},
  appliedFilters: DEFAULT_FILTERS,
  setAppliedFilters: () => {},
});

export const ProjectsProvider = ({ children }: ProjectsProviderProps) => {
  const [projects, setProjects] = useState<ProjectCardResponse[]>([]);
  const [maxItems, setMaxItems] = useState<number>(0);
  const [level, setLevel] = useState<PaginationLevelType>(1);
  const [filters, setFilters] = useState<FiltersType>(DEFAULT_FILTERS);
  const [appliedFilters, setAppliedFilters] =
    useState<FiltersType>(DEFAULT_FILTERS);

  const didAddMaxItems = useRef(false);

  useEffect(() => {
    fetchProjects(level, maxItems, appliedFilters)
      .then(({ data, meta }) => {
        setProjects(data);
        if (!didAddMaxItems.current && meta?.total != null) {
          setMaxItems(meta.total);
          didAddMaxItems.current = true;
        }
      })
      .catch((e) => console.error(e));
  }, [level, appliedFilters]);

  console.log(projects);

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        setProjects,
        maxItems,
        level,
        setLevel,
        filters,
        setFilters,
        appliedFilters,
        setAppliedFilters,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
