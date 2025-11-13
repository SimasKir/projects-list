import { PaginationLevelType } from "@/types/types";

export const getLimit = (level: PaginationLevelType, maxItems: number) => {
  if (level === 1) return 10;
  if (level === 2) return 20;
  if (level === 3) return 50;
  if (level === 4) return 100;
  if (level === 5) return maxItems;
  return 10;
};
