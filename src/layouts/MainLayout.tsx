import type { ReactNode } from "react";
import { Footer } from "@/components/layout";

export interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
