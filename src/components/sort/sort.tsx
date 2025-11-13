"use client";
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ProjectsContext } from "@/context/projects-context";
import { SortDirectionType, SortKeyType, SortType } from "@/types/types";
import { dropdownClose } from "@/lib/dropdown-close";
import { DEFAULT_SORT, OPTIONS } from "@/content/constants";

export const Sort = () => {
  const { setLevel, setSort, setHaveSort } = useContext(ProjectsContext);

  const [sortValues, setSortValues] = useState<SortType[]>(DEFAULT_SORT);
  const [open, setOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    return dropdownClose(ref.current, () => setOpen(false));
  }, [open]);

  const getDirection = (arr: SortType[], key: SortKeyType): SortDirectionType =>
    arr.find((i) => i.key === key)?.dir ?? "none";

  const onCheckboxToggle = (key: SortKeyType) =>
    setSortValues((prev) => {
      const current = getDirection(prev, key);
      const next = current === "none" ? "asc" : "none";
      return prev.map((item) =>
        item.key === key ? { ...item, dir: next } : item
      );
    });

  const onDirectionToggle = (key: SortKeyType) =>
    setSortValues((prev) => {
      const current = getDirection(prev, key);
      if (current === "none") return prev;
      const next = current === "asc" ? "desc" : "asc";
      return prev.map((item) =>
        item.key === key ? { ...item, dir: next } : item
      );
    });

  const changed = useMemo(
    () => JSON.stringify(sortValues) !== JSON.stringify(DEFAULT_SORT),
    [sortValues]
  );

  const applySort = useCallback(() => {
    setSort(sortValues);

    const isCleared =
      JSON.stringify(sortValues) === JSON.stringify(DEFAULT_SORT);

    setHaveSort(isCleared ? false : true);
    setLevel(isCleared ? 1 : 5);
  }, [sortValues]);

  const clearSort = useCallback(() => {
    setSort(DEFAULT_SORT);
    setSortValues(DEFAULT_SORT);
    setHaveSort(false);
    // setLevel(1);
  }, [sortValues]);

  return (
    <div ref={ref} className="w-1/2 relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="sort-panel"
        className="w-full flex items-center justify-between rounded-lg px-3 py-2 text-sm bg-[var(--profitus-color-1)] hover:bg-gray-50 focus:outline-none text-[#736c93]"
      >
        <span className="text-gray-700 flex flex-row items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            width="20"
            viewBox="0 0 24 24"
            fill="#736c93"
          >
            <path d="M3 18h6v-2H3v2zm0-5h12v-2H3v2zm0-7v2h18V6H3z" />
          </svg>
          Rūšiuoti
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
          id="sort-panel"
          role="region"
          aria-label="Sort options"
          className="mt-3 rounded border p-3 absolute z-10 bg-[var(--profitus-color-1)] w-full"
        >
          <div className="flex flex-col gap-3">
            <fieldset className="flex flex-col gap-2">
              {OPTIONS.map(({ key, label }) => {
                const dir = getDirection(sortValues, key);
                const isOn = dir !== "none";
                const stateLabel = isOn
                  ? dir === "asc"
                    ? "ASC"
                    : "DESC"
                  : "Off";

                return (
                  <div
                    key={key}
                    className="flex items-center justify-between gap-2 text-sm text-[#736c93]"
                  >
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={isOn}
                        onChange={() => onCheckboxToggle(key)}
                        className="appearance-none w-4 h-4 border rounded border-[#736c93] checked:bg-white cursor-pointer transition-colors duration-200 relative"
                        aria-label={`${label} – ${stateLabel}`}
                        style={{
                          backgroundImage: isOn
                            ? 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="%23c4007a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="3.5,9 6.5,12 12.5,4" /></svg>\')'
                            : "none",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                          backgroundSize: "12px",
                        }}
                      />
                      {label}
                    </label>

                    <button
                      type="button"
                      onClick={() => onDirectionToggle(key)}
                      className={`flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs ${
                        isOn
                          ? "border-[#c4007a] text-[#c4007a]"
                          : "border-[#736c93] text-[#736c93]"
                      }`}
                      aria-live="polite"
                      aria-label={`${label} – ${stateLabel}`}
                      title={stateLabel}
                      disabled={!isOn}
                    >
                      {dir === "asc" && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 19V5M5 12l7-7 7 7" />
                        </svg>
                      )}
                      {dir === "desc" && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 5v14M19 12l-7 7-7-7" />
                        </svg>
                      )}
                      <span>
                        {isOn ? (dir === "asc" ? "ASC" : "DESC") : "Off"}
                      </span>
                    </button>
                  </div>
                );
              })}
            </fieldset>

            <div className="flex flex-row justify-between gap-2 text-[#736c93] font-bold leading-[16px]">
              <button
                onClick={applySort}
                className={`rounded-lg px-4 py-1 text-md ${
                  changed ? "text-[#c4007a]" : "text-[#736c93]"
                }`}
                aria-disabled={!changed}
              >
                Saugoti rūšiavimą
              </button>
              <button
                onClick={clearSort}
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
