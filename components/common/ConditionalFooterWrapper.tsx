"use client";

import { usePathname } from "next/navigation";

export default function ConditionalFooterWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname?.startsWith("/intranet-empresas")) {
    return null;
  }

  return <>{children}</>;
}
