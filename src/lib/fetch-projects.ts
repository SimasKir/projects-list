import { ApiMeta, PaginationLevelType, ProjectCardResponse } from "@/types/types";
import { getLimit } from "./get-limit";

export async function fetchProjects(level: PaginationLevelType, maxItems: number) {

  const API = process.env.NEXT_PUBLIC_API_URL!;
  const perPage = 50;
  const all: ProjectCardResponse[] = [];
  let meta: ApiMeta | null = null;

  const limit = getLimit(level, maxItems);

  const pagesNeeded = Math.ceil(limit / perPage);

  for (let page = 1; page <= pagesNeeded; page++) {
    const res = await fetch(`${API}?page=${page}&limit=${perPage}`, { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed page ${page}: ${res.status}`);

    const json = await res.json();
    if (!meta) meta = json.meta ?? null;
    all.push(...(json.data ?? []));

    if (all.length >= limit) break;
  }

  return { data: all.slice(0, limit), meta };
}