"use client";
import { useContext, useEffect } from "react";
import { ProjectsContext } from "@/context/projects-context";

export const ProjectCard = () => {
  const { projects } = useContext(ProjectsContext) as { projects: any[] };

  // console.log(projects);

  return <div className="bg-red text-zinc-600">ProjectCard</div>;
};
