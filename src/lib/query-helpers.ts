export function appendJsonArrayParam(
    params: URLSearchParams,
    key: "filters[]" | "sort[]",
    items: Record<string, unknown>[]
  ) {
    for (const item of items) {
      params.append(key, JSON.stringify(item));
    }
  }
  