import { ApiMeta, PaginationLevelType, ProjectCardResponse, FiltersType } from "@/types/types";
import { getLimit } from "./get-limit";
import { appendJsonArrayParam } from "./query-helpers";

const toQuery = (filters?: FiltersType) => {
  const p = new URLSearchParams();

  if (filters?.country?.length) {
    appendJsonArrayParam(p, "filters[]", [
      { id: "country", value: filters.country },
    ]);
  }

  if (filters?.initial_rating?.length) {
    appendJsonArrayParam(p, "filters[]", [{ id: "initial_rating", value: filters.initial_rating }]);
  }

  if (filters?.purpose?.length) {
    appendJsonArrayParam(p, "filters[]", [{ id: "purpose", value: filters.purpose }]);
  }

  const range: { min?: number; max?: number } = {};
  if (filters?.credit_duration_min != null) range.min = filters.credit_duration_min;
  if (filters?.credit_duration_max != null) range.max = filters.credit_duration_max;

  if (Object.keys(range).length > 0) {
    appendJsonArrayParam(p, "filters[]", [{ id: "credit_duration", value: range }]);
  }

  if (filters?.pid) {
    appendJsonArrayParam(p, "filters[]", [{ id: "private_id", value: filters.pid }]);
  }

  return p;
};

export async function fetchProjects(
  level: PaginationLevelType,
  maxItems: number,
  filters?: FiltersType,
) {
  const API = process.env.NEXT_PUBLIC_API_URL!;
  const perPage = 50;
  const all: ProjectCardResponse[] = [];
  let meta: ApiMeta | null = null;

  const limit = getLimit(level, maxItems);
  const pagesNeeded = Math.ceil(limit / perPage);

  const baseParams = toQuery(filters);

  for (let page = 1; page <= pagesNeeded; page++) {
    const params = new URLSearchParams(baseParams);
    params.set("page", String(page));
    params.set("limit", String(perPage));

    const url = `${API}?${params.toString()}`;
    console.log("Fetching:", url);

    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed page ${page}: ${res.status}`);

    const json = await res.json();
    if (!meta) meta = json.meta ?? null;
    all.push(...(json.data ?? []));

    if (all.length >= limit) break;
  }

  return { data: all.slice(0, limit), meta };
}
