import { useEffect } from "react";

export function useClickOutside(ref: any, value: any, setValue: any) {
  useEffect(() => {
    const checkIfClickedOutside = (e: { target: any }) => {
      if (value && ref.current && !ref.current.contains(e.target)) {
        setValue(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [value, ref, setValue]);
}
