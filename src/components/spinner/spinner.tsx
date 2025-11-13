export const Spinner = () => {
  return (
    <div className="flex items-center justify-center p-4 mt-3">
      <div
        className="h-8 w-8 border-4 border-[var(--profitus-color-2)] border-t-transparent rounded-full animate-spin"
        role="status"
        aria-label="Loading"
      ></div>
    </div>
  );
};
