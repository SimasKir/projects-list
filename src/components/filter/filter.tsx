"use client";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import type {
  CountryType,
  RatingType,
  PurposeType,
  FiltersType,
} from "@/types/types";
import { DEFAULT_FILTERS, ProjectsContext } from "@/context/projects-context";
import { Accordion } from "@/components";

const COUNTRIES: CountryType[] = ["lt", "ee", "es", "lv"];
const RATINGS: RatingType[] = [
  "AAA",
  "AA+",
  "AA",
  "AA-",
  "A+",
  "A",
  "A-",
  "BBB+",
  "BBB",
  "BBB-",
];
const PURPOSES: PurposeType[] = [
  "real_estate_development",
  "refinancing",
  "working_capital",
  "real_estate_acquisition",
  "other",
];

export const Filter = () => {
  const { filters, setFilters, setAppliedFilters, setLevel, appliedFilters } =
    useContext(ProjectsContext);

  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<FiltersType>(
    appliedFilters ?? DEFAULT_FILTERS
  );

  useEffect(() => {
    setDraft(appliedFilters ?? DEFAULT_FILTERS);
  }, [appliedFilters]);

  const toggleMulti = <T extends string>(
    key: "country" | "initial_rating",
    val: T
  ) => {
    const list = new Set([...((draft[key] as T[] | undefined) ?? [])]);
    list.has(val) ? list.delete(val) : list.add(val);
    setDraft({ ...draft, [key]: Array.from(list) });
  };

  const filtersChanged = useMemo(() => {
    return JSON.stringify(draft) !== JSON.stringify(appliedFilters);
  }, [draft, appliedFilters]);

  const applyFilters = useCallback(() => {
    if (!filtersChanged) return;
    setAppliedFilters(draft);
    setFilters(draft);

    const isCleared = JSON.stringify(draft) === JSON.stringify(DEFAULT_FILTERS);

    setLevel(isCleared ? 1 : 5);
  }, [filtersChanged, draft, setAppliedFilters, setFilters, setLevel]);

  const clearFilters = useCallback(() => {
    setDraft(DEFAULT_FILTERS);
    setAppliedFilters(DEFAULT_FILTERS);
    setFilters(DEFAULT_FILTERS);
    setLevel(1);
  }, [setAppliedFilters, setFilters, setLevel]);

  return (
    <div className="w-1/2 relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="filters-panel"
        className="w-full flex items-center justify-between rounded-lg px-3 py-2 text-sm bg-[var(--profitus-color-1)] hover:bg-gray-50 focus:outline-none text-[#736c93]"
      >
        <span className="text-gray-700 flex flex-row">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20px"
            viewBox="0 -960 960 960"
            width="20px"
            fill="#736c93"
          >
            <path d="M440-160q-17 0-28.5-11.5T400-200v-240L168-736q-15-20-4.5-42t36.5-22h560q26 0 36.5 22t-4.5 42L560-440v240q0 17-11.5 28.5T520-160h-80Zm40-308 198-252H282l198 252Zm0 0Z" />
          </svg>
          Filtruoti
        </span>
        <svg
          className={`h-6 w-6 transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="#c4007a"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div
          id="filters-panel"
          role="region"
          aria-label="Filter options"
          className="mt-3 rounded border p-3 absolute z-10 bg-[var(--profitus-color-1)] w-full"
        >
          <div className="flex flex-col gap-3">
            <Accordion title="Šalis">
              <fieldset className="flex flex-col gap-2">
                {COUNTRIES.map((c) => (
                  <label
                    key={c}
                    className="flex items-center gap-1 text-sm text-[#736c93]"
                  >
                    <input
                      type="checkbox"
                      checked={draft.country?.includes(c) ?? false}
                      onChange={() => toggleMulti("country", c)}
                      className="appearance-none w-4 h-4 border rounded border-[#736c93] checked:bg-white cursor-pointer transition-colors duration-200 relative"
                      style={{
                        backgroundImage:
                          draft.country?.includes(c) ?? false
                            ? 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="%23c4007a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="3.5,9 6.5,12 12.5,4" /></svg>\')'
                            : "none",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundSize: "12px",
                      }}
                    />
                    {c.toUpperCase()}
                  </label>
                ))}
              </fieldset>
            </Accordion>

            <Accordion title="Klasė">
              <fieldset className="flex flex-col gap-2 pr-1">
                {RATINGS.map((r) => (
                  <label
                    key={r}
                    className="flex items-center gap-2 text-sm text-[#736c93]"
                  >
                    <input
                      type="checkbox"
                      checked={draft.initial_rating?.includes(r) ?? false}
                      onChange={() => toggleMulti("initial_rating", r)}
                      className="appearance-none w-4 h-4 border rounded border-[#736c93] checked:bg-white cursor-pointer transition-colors duration-200 relative"
                      style={{
                        backgroundImage:
                          draft.initial_rating?.includes(r) ?? false
                            ? 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="%23c4007a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="3.5,9 6.5,12 12.5,4" /></svg>\')'
                            : "none",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundSize: "12px",
                      }}
                    />
                    {r}
                  </label>
                ))}
              </fieldset>
            </Accordion>

            <Accordion title="Paskirtis">
              <fieldset className="flex flex-col gap-2">
                {PURPOSES.map((p) => (
                  <label
                    key={p}
                    className="flex items-center gap-2 text-sm text-[#736c93]"
                  >
                    <input
                      type="checkbox"
                      checked={draft.purpose === p}
                      onChange={() =>
                        setDraft({
                          ...draft,
                          purpose:
                            draft.purpose === p
                              ? ("" as PurposeType)
                              : (p as PurposeType),
                        })
                      }
                      className="appearance-none w-4 h-4 border rounded border-[#736c93] checked:bg-white cursor-pointer transition-colors duration-200 relative"
                      style={{
                        backgroundImage:
                          draft.purpose === p
                            ? 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="%23c4007a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="3.5,9 6.5,12 12.5,4" /></svg>\')'
                            : "none",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundSize: "12px",
                      }}
                    />
                    {p
                      .replaceAll("_", " ")
                      .replace(/\b\w/, (ch) => ch.toUpperCase())}
                  </label>
                ))}
              </fieldset>
            </Accordion>

            <Accordion title="Kredito trukmė (mėn.)">
              <div className="flex items-center gap-3 text-[#736c93]">
                <input
                  type="number"
                  placeholder="Nuo (mėn.)"
                  value={draft.credit_duration_min ?? ""}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      credit_duration_min: e.target.value
                        ? Number(e.target.value)
                        : null,
                    })
                  }
                  className="border border-[#736c93] rounded px-2 py-1 w-28 text-sm text-[#736c93] bg-white focus:outline-none focus:ring-2 focus:ring-[#c4007a]/40 transition-all duration-200"
                />
                <span className="text-sm">–</span>
                <input
                  type="number"
                  placeholder="Iki (mėn.)"
                  value={draft.credit_duration_max ?? ""}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      credit_duration_max: e.target.value
                        ? Number(e.target.value)
                        : null,
                    })
                  }
                  className="border border-[#736c93] rounded px-2 py-1 w-28 text-sm text-[#736c93] bg-white focus:outline-none focus:ring-2 focus:ring-[#c4007a]/40 transition-all duration-200"
                />
              </div>
            </Accordion>

            <Accordion title="Identifikacinis numeris">
              <input
                type="text"
                placeholder="Įveskite ID"
                value={draft.pid ?? ""}
                onChange={(e) => setDraft({ ...draft, pid: e.target.value })}
                className="border border-[#736c93] rounded px-2 py-1 w-40 text-sm text-[#736c93] bg-white focus:outline-none focus:ring-2 focus:ring-[#c4007a]/40 transition-all duration-200"
              />
            </Accordion>

            <div className="flex flex-row justify-between gap-2 text-[#736c93] font-bold leading-[16px]">
              <button
                onClick={applyFilters}
                className="rounded-lg px-4 py-1 text-md text-[#c4007a]"
              >
                Saugoti filtrus
              </button>

              <button
                onClick={clearFilters}
                className="rounded-lg px-4 py-1 text-md flex items-center gap-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="#c4007a"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="6" y1="18" x2="18" y2="6" />
                </svg>
                <p>Išvalyti</p>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
