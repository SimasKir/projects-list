export const dropdownClose = (el: HTMLElement | null, onClose: () => void) => {
  const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
    if (!el) return;
    if (!el.contains(event.target as Node)) onClose();
  };

  document.addEventListener("mousedown", handleOutsideClick, true);
  document.addEventListener("touchstart", handleOutsideClick, true);

  return () => {
    document.removeEventListener("mousedown", handleOutsideClick, true);
    document.removeEventListener("touchstart", handleOutsideClick, true);
  };
};
