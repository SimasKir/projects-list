export async function fetchProjects(pages = 1) {
  const res = await fetch(`/api/projects?pages=${pages}`, { cache: "no-store" });

  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);

  const { data } = await res.json();
  return data;
}