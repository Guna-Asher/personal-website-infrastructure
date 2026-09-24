import { Container } from "@/components/ui/container";
import { InteractiveLink } from "@/components/ui/interactive-link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col justify-center">
      <Container>
        <p className="font-mono text-sm tracking-widest text-muted uppercase">404</p>
        <h1 className="font-display text-heading mt-3 max-w-2xl font-medium tracking-tight">
          This page doesn&apos;t exist.
        </h1>
        <p className="mt-4 max-w-xl text-muted">
          Whatever you were looking for isn&apos;t here — the link may be out of date, or the page
          never existed.
        </p>
        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
          <InteractiveLink href="/">Return home</InteractiveLink>
          <InteractiveLink href="/work">Return to work</InteractiveLink>
        </div>
      </Container>
    </main>
  );
}
