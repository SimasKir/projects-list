"use client";

import { useContext, useState } from "react";
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
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const hasProjects = !loading && (projects?.length ?? 0) > 0;

  return (
    <div className="h-screen flex flex-col container pt-5 xl:pt-20 pb-20">
      <div className="grid mb-7 w-full grid-cols-1 xl:grid-cols-2">
        <h1 className="text-[24px] leading-[30px] xl:text-[38px] xl:leading-[42px] font-bold col-span-1 text-center xl:text-left mb-7 xl:mb-0">
          Investavimo galimybės užtikrintos nekilnojamuoju turtu
        </h1>
        <div className="col-span-1 flex justify-between xl:justify-center items-end gap-3 ml-0 xl:ml-5">
          <Sort />
          <Filter />
        </div>
      </div>

      <div className="flex-1 min-h-0">
        <div className="w-full h-full overflow-x-auto overflow-y-auto no-scrollbar">
          <div className="min-w-[1296px]">
            <div className="sticky top-[-1px] z-[1] bg-linear-to-r from-[#6c71cf] to-[#b79ad9] shadow-[0_8px_8px_rgba(0,0,0,0.2)]">
              <ProjectsHeader />
            </div>

            {error && (
              <div className="bg-[#ebe8ff] text-[#736c93] border border-red-200 rounded-xl p-3 font-bold flex justify-center">
                {error}
              </div>
            )}

            {loading && <Spinner />}

            {!loading && !projects?.length && (
              <div className="bg-[#ebe8ff] text-[#736c93] border border-[#736c93] rounded-xl p-3 font-bold flex justify-center">
                No projects found.
              </div>
            )}

            {hasProjects &&
              projects!.map((project, i) => (
                <div
                  key={project.pid}
                  onClick={() => setSelectedId(project.pid)}
                  className={`opacity-0 translate-y-4 animate-fadeIn mb-2 [animation-fill-mode:forwards] cursor-pointer transition-colors duration-200`}
                  style={{ animationDelay: `${i * 150}ms` }}
                >
                  <ProjectCard
                    project={project}
                    selected={selectedId === project.pid}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>

      {hasProjects && (
        <div className="mt-4 shrink-0">
          <NextButton />
        </div>
      )}
    </div>
  );
};
