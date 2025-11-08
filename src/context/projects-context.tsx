"use client";

import { createContext, useState } from "react";
import { useEffect } from "react";
import { fetchProjects } from "@/lib/api/projects";

export const ProjectsContext = createContext({});

export const ProjectsProvider = ({ children }: any) => {
  const [data, setData] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects()
      .then((data) => {
        setData(data);
        setProjects(data.data);
      })
      .catch((e) => console.error(e));
  }, []);

  //   console.log("data: ", data);
  //   console.log("projects: ", projects);

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
