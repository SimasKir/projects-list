export async function fetchProjects(limit = 10) {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}?limit=${limit}`, { cache: "no-store" });

  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);

  const json = await res.json();
  return {
    data: json.data ?? [],
    meta: json.meta ?? null,
  };
}