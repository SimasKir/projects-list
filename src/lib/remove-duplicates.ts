import { ProjectCardResponse } from "@/types/types";

export const removeDuplicates = (data: ProjectCardResponse[]): ProjectCardResponse[] => {
  const seen = new Set<string>();
  return data.filter((item) => {
    if (seen.has(item.pid)) return false;
    seen.add(item.pid);
    return true;
  });
};