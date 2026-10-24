import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/link";
import { Section } from "@/components/ui/section";
import { DefinitionRow } from "@/components/ui/definition-row";
import { ArchitectureDiagram } from "@/components/work/architecture-diagram";
import { DecisionBlock } from "@/components/work/decision-block";
import { IndexRow } from "@/components/work/index-row";
import { projects } from "@/lib/data/projects";
import { site } from "@/lib/data/site";

// The homepage cites real material rather than restating it, so it looks the
// material up by name. If a project or decision is ever renamed in
// projects.ts, the build fails here instead of silently rendering nothing.
function findProject(slug: string) {
  const project = projects.find((p) => p.slug === slug);
  if (!project) throw new Error(`Homepage references a missing project: ${slug}`);
  return project;
}

const strangerClub = findProject("stranger-club");
const portal = findProject("deployment-portal");

const specimenIndex = strangerClub.decisions.findIndex((d) =>
  d.title.includes("BEGIN IMMEDIATE"),
);
if (specimenIndex === -1) {
  throw new Error("Homepage specimen decision (BEGIN IMMEDIATE) is missing from projects.ts");
}
const specimen = strangerClub.decisions[specimenIndex];

function HeroFact({ term, value }: { term: string; value: string }) {
  return (
    <div>
      <dt className="t-meta text-ink-muted">{term}</dt>
      <dd className="t-ui mt-1.5 text-ink-secondary">{value}</dd>
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* 01 — Statement. The argument, in five seconds. No hero image,
          nothing centered, and no button: the first screen does not move.
          The eyebrow moved into the margin column and the status facts into
          the outboard column, so the h1 starts on the same edge as the index
          rows below it and nothing is indented for no reason. */}
      <section>
        <Container className="pt-12 pb-16 md:pt-16 md:pb-20 lg:pt-20 lg:pb-24">
          <div className="grid-page">
            <p className="t-meta col-label hidden text-ink-muted lg:block">{site.name}</p>

            <div className="col-content mt-6 lg:mt-0">
              <h1 className="t-display text-ink">{site.tagline}</h1>

              <p className="t-lead measure-lead mt-8 text-ink-secondary">
                Here are three projects I&apos;ve built and deployed. Each one includes its
                architecture, the decisions I made and why, and the problems I hit along the way.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                <Link href="/work">See the projects</Link>
                <Link href="/approach">Approach</Link>
              </div>
            </div>

            <dl className="col-outboard mt-12 flex flex-col gap-5 lg:mt-2">
              <HeroFact term="Role" value={site.role} />
              <HeroFact term="Location" value={site.location} />
              <HeroFact term="Status" value="Open to work" />
            </dl>
          </div>
        </Container>
      </section>

      {/* 02 — The index, tightly coupled to the statement above it: they are
          one idea, so the gap between them is small. */}
      <Section index="01" label="Systems" space="tight" wide>
        <ol className="list-none border-t border-rule">
          {projects.map((project, i) => (
            <IndexRow
              key={project.slug}
              project={project}
              index={String(i + 1).padStart(2, "0")}
              delay={i * 60}
            />
          ))}
        </ol>
      </Section>

      {/* 03 — One decision, in full, with the diagram that shows where in the
          system it applies and the failures that came out of the same work.
          This is the section that has to earn the visit, so it gets the most
          air and the only figure on the page. */}
      <Section
        index="02"
        label="A decision"
        surface="raised"
        space="loose"
        wide
        lead={<>Every project here is written up like this.</>}
      >
        <div className="grid-page">
          <div className="col-content" data-reveal>
            <p className="t-ui measure-prose text-ink-secondary">
              This one is from {strangerClub.title}. It&apos;s the part of that system where the
              order of database writes actually matters, because getting it wrong means two
              players end up in the same slot.
            </p>

            <div className="mt-10">
              <DecisionBlock decision={specimen} index={specimenIndex + 1} />
            </div>
          </div>

          {/* The figure breaks the reading measure and runs through the
              outboard track — a wide system flow needs the width. */}
          <figure className="col-content-wide mt-12 min-w-0" data-reveal>
            <figcaption className="t-meta text-ink-muted">
              Fig. 01: Where the write lock is taken
            </figcaption>
            <ArchitectureDiagram diagram={strangerClub.architecture.diagram} />
          </figure>

          <div className="col-content mt-12" data-reveal>
            <p className="t-meta text-ink-muted">
              And when it went wrong <span className="text-clay-graphic">/</span>{" "}
              {portal.title}
            </p>
            <div className="mt-6 flex flex-col divide-y divide-rule">
              {(portal.failureRecovery ?? []).map((entry) => (
                <div key={entry.symptom} className="py-7 first:pt-0 last:pb-0">
                  <p className="t-code text-clay">{entry.symptom}</p>
                  <div className="mt-4">
                    <DefinitionRow
                      columns={3}
                      definitions={[
                        { term: "Cause", value: entry.cause },
                        { term: "Fix", value: entry.fix },
                        { term: "Lesson", value: entry.lesson },
                      ]}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link href={`/work/${strangerClub.slug}`}>
                Read the {strangerClub.title} write-up
              </Link>
              <Link href={`/work/${portal.slug}`}>Read the {portal.title} write-up</Link>
            </div>
          </div>
        </div>
      </Section>

      {/* 04 — Contact. Closes without a sales pitch. */}
      <Section
        index="03"
        label="Contact"
        space="tight"
        lead={<>I&apos;m open to work in cloud, DevOps, or backend roles.</>}
        outboard={
          <div className="flex flex-col gap-4">
            <Link href={`mailto:${site.email}`}>Email</Link>
            <Link href={site.github} external>
              GitHub
            </Link>
            {site.linkedin && (
              <Link href={site.linkedin} external>
                LinkedIn
              </Link>
            )}
            {site.resume && (
              <Link href={site.resume} external>
                Resume
              </Link>
            )}
          </div>
        }
      >
        <div data-reveal>
          <p className="t-ui measure-prose text-ink-secondary">
            I&apos;m based in {site.location}. The project write-ups above go into more detail
            than a CV would.
          </p>
          <div className="mt-8">
            <Link href="/approach">How I work</Link>
          </div>
        </div>
      </Section>
    </>
  );
}
