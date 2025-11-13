"use client";

import { useState } from "react";

export const Accordion = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const sectionId = `section-${title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <div className="border-b-2">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={sectionId}
        className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-[#736c93]"
      >
        <span className="flex items-center gap-2">{title}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
          stroke="#736c93"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="transition-transform duration-200"
        >
          {open ? (
            <line x1="5" y1="12" x2="19" y2="12" />
          ) : (
            <>
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </>
          )}
        </svg>
      </button>

      {open && (
        <div id={sectionId} role="region" className="px-3 pb-3 pt-1">
          {children}
        </div>
      )}
    </div>
  );
};
