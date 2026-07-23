import { useEffect, useState } from "react";
import type { CatalogView } from "@/features/catalog/types";

function getView(): CatalogView {
  return window.location.hash.startsWith("#/tienda") ? "shop" : "home";
}

export function useHashRoute(): CatalogView {
  const [view, setView] = useState<CatalogView>(getView);

  useEffect(() => {
    const handleHashChange = () => {
      setView(getView());
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return view;
}
