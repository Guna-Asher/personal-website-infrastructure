import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/link";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col justify-center py-20">
      <div className="grid-page">
        <div className="col-content">
          <p className="t-meta text-ink-muted">Error / 404</p>
          <h1 className="t-statement mt-5 text-ink">This page doesn&apos;t exist.</h1>
          <p className="t-ui measure-lead mt-6 text-ink-secondary">
            Whatever you were looking for isn&apos;t here — the link may be out of date, or the
            page never existed.
          </p>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
            <Link href="/">Return home</Link>
            <Link href="/work">Return to the systems</Link>
          </div>
        </div>
      </div>
    </Container>
  );
}
