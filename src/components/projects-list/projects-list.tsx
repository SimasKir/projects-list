"use client";

import { useContext } from "react";
import { ProjectsContext } from "@/context/projects-context";
import { Filter, NextButton, ProjectCard, ProjectsHeader } from "@/components";

export const ProjectsList = () => {
  const { projects } = useContext(ProjectsContext);

  return (
    <div className="flex flex-col gap-3 container py-20 pb-30">
      <div className="grid mb-5 w-full [grid-template-columns:repeat(2,minmax(0,1fr))]">
        <h1 className="text-[38px] leading-[42px] font-bold col-span-1">
          Investavimo galimybės užtikrintos nekilnojamuoju turtu
        </h1>
        <div className="col-span-1 flex justify-end items-end">
          <Filter />
        </div>
      </div>
      <ProjectsHeader />
      {!projects?.length ? (
        <p>No projects found</p>
      ) : (
        <>
          {projects.map((project) => (
            <ProjectCard project={project} key={project.pid} />
          ))}
          <NextButton />
        </>
      )}
    </div>
  );
};
