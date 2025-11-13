"use client";

import { useContext } from "react";
import { ProjectsContext } from "@/context/projects-context";
import {
  Filter,
  NextButton,
  ProjectCard,
  ProjectsHeader,
  Sort,
  Spinner,
} from "@/components";

export const ProjectsList = () => {
  const { projects, loading, error } = useContext(ProjectsContext);

  return (
    <div className="flex flex-col gap-3 container py-20 pb-30">
      <div className="grid mb-5 w-full [grid-template-columns:repeat(2,minmax(0,1fr))]">
        <h1 className="text-[38px] leading-[42px] font-bold col-span-1">
          Investavimo galimybės užtikrintos nekilnojamuoju turtu
        </h1>
        <div className="col-span-1 flex justify-end items-end gap-3 ml-5">
          <Sort />
          <Filter />
        </div>
      </div>
      <ProjectsHeader />
      {error && (
        <div className="bg-[#ebe8ff] text-[#736c93] border border-red-200 rounded-xl p-3 font-bold flex justify-center">
          {error}
        </div>
      )}
      {loading && <Spinner />}
      {!loading && (
        <>
          {!projects?.length ? (
            <div className="bg-[#ebe8ff] text-[#736c93] border border-[#736c93] rounded-xl p-3 font-bold flex justify-center">
              No projects found.
            </div>
          ) : (
            <>
              {projects.map((project, i) => (
                <div
                  key={project.pid}
                  className="opacity-0 translate-y-4 animate-fadeIn"
                  style={{
                    animationDelay: `${i * 150}ms`,
                    animationFillMode: "forwards",
                  }}
                >
                  <ProjectCard project={project} />
                </div>
              ))}
              <NextButton />
            </>
          )}
        </>
      )}
    </div>
  );
};
