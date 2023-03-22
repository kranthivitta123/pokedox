import { useEffect, useState } from "react";

export function useOutsideAlerter(ref) {
  const [panel, setPanel] = useState(false);
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setPanel(!panel);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, panel]);
  return [panel];
}
