"use client";

import { useEffect } from "react";

export default function TreeNationWidget() {
  useEffect(() => {
    // Evita cargar el script más de una vez
    const src = "https://widgets.tree-nation.com/js/widgets/v2/widgets.min.js";
    if (document.querySelector(`script[src="${src}"]`)) return;

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div
      className="mt-3"
      data-widget-type="offset-website"
      data-tree-nation-code="9b2cb1f0e69d92ea"
      data-lang="en"
      data-theme="light"
    />
  );
}
