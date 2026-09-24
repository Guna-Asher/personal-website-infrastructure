import type { ReactNode } from "react";
import { SiteNav } from "@/components/shell/site-nav";
import { Footer } from "@/components/footer/footer";

export default function WorkLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteNav />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}
