"use client";
import { useEffect } from "react";
import { fetchProjects } from "@/lib/api/projects";

export const ProjectCard = () => {
  useEffect(() => {
    fetchProjects()
      .then((data) => console.log("Projects:", data))
      .catch((e) => console.error(e));
  }, []);

  return <div className="bg-red text-zinc-600">ProjectCArd</div>;
};
