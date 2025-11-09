"use client";

import { useContext } from "react";
import { ProjectsContext } from "@/context/projects-context";
import { ProjectCardResponse } from "@/types/types";
import { ProjectCard, ProjectsHeader } from "@/components";

export const ProjectsList = () => {
  const { projects } = useContext(ProjectsContext) as {
    projects: ProjectCardResponse[];
  };

  if (!projects?.length) {
    return <div>No projects found</div>;
  }

  //   console.log("projects: ", projects);

  return (
    <div className="flex flex-col gap-3 container py-20 pb-30">
      <ProjectsHeader />
      {projects.map((project) => (
        <ProjectCard project={project} key={project.pid} />
      ))}
    </div>
  );
};
