"use client";

import { useContext } from "react";
import { ProjectsContext } from "@/context/projects-context";
import { NextButton, ProjectCard, ProjectsHeader } from "@/components";

export const ProjectsList = () => {
  const { projects } = useContext(ProjectsContext);

  if (!projects?.length) {
    return <div>No projects found</div>;
  }

  return (
    <div className="flex flex-col gap-3 container py-20 pb-30">
      <ProjectsHeader />
      {projects.map((project) => (
        <ProjectCard project={project} key={project.pid} />
      ))}
      <NextButton />
    </div>
  );
};
