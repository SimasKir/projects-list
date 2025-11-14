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
  SortType,
} from "@/types/types";
import { DEFAULT_FILTERS, DEFAULT_SORT } from "@/content/constants";
import { removeDuplicates } from "@/lib/remove-duplicates";

export const ProjectsContext = createContext<ProjectsContextType>({
  projects: [],
  setProjects: () => {},
  maxItems: 0,
  level: 1,
  setLevel: () => {},
  filters: DEFAULT_FILTERS,
  setFilters: () => {},
  haveFilters: false,
  setHaveFilters: () => {},
  sort: DEFAULT_SORT,
  setSort: () => {},
  haveSort: false,
  setHaveSort: () => {},
  loading: true,
  setLoading: () => {},
  error: null,
  setError: () => {},
});

export const ProjectsProvider = ({ children }: ProjectsProviderProps) => {
  const [projects, setProjects] = useState<ProjectCardResponse[]>([]);
  const [maxItems, setMaxItems] = useState<number>(0);
  const [level, setLevel] = useState<PaginationLevelType>(0);
  const [filters, setFilters] = useState<FiltersType>(DEFAULT_FILTERS);
  const [haveFilters, setHaveFilters] = useState<boolean>(false);
  const [sort, setSort] = useState<SortType[]>(DEFAULT_SORT);
  const [haveSort, setHaveSort] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLevel(1);
  }, []);

  const didAddMaxItems = useRef(false);

  useEffect(() => {
    setLoading(true);
    fetchProjects(level, maxItems, filters, sort)
      .then(({ data, meta }) => {
        const uniqueData = removeDuplicates(data);
        setProjects(uniqueData);
        if (!didAddMaxItems.current && meta?.total != null) {
          setMaxItems(meta.total);
          didAddMaxItems.current = true;
        }
      })
      .catch((e) => {
        console.error(e);
        setError(
          `Error: ${e.message}` ||
            "Something went wrong while fetching projects."
        );
      })
      .finally(() => setLoading(false));
  }, [level, filters, sort]);

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
        haveFilters,
        setHaveFilters,
        sort,
        setSort,
        haveSort,
        setHaveSort,
        loading,
        setLoading,
        error,
        setError,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
