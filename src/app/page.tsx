import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/link";
import { Section } from "@/components/ui/section";
import { DefinitionRow } from "@/components/ui/definition-row";
import { DecisionBlock } from "@/components/work/decision-block";
import { IndexRow } from "@/components/work/index-row";
import { projects } from "@/lib/data/projects";
import { skillCategories } from "@/lib/data/skills";
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

export default function Home() {
  return (
    <>
      {/* 01 — Statement. The argument, in five seconds. No hero image,
          nothing centered, and no button: the first screen does not move. */}
      <section className="border-b border-rule-strong">
        <Container className="pt-16 pb-20 md:pt-24 md:pb-28 lg:pt-28 lg:pb-32">
          <div className="grid-page">
            <div className="col-content">
              <p className="t-meta text-ink-muted">
                {site.name} <span className="text-clay-graphic">·</span> {site.role}{" "}
                <span className="text-clay-graphic">·</span> {site.location}{" "}
                <span className="text-clay-graphic">·</span> Open to work
              </p>

              <h1 className="t-display mt-7 text-ink">{site.tagline}</h1>

              <p className="t-ui measure-lead mt-8 text-ink-secondary">
                Here are three projects I&apos;ve built and deployed. Each one includes its
                architecture, the decisions I made and why, and the problems I hit along the way.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                <Link href="/work">See the projects</Link>
                <Link href="/approach">Approach</Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 02 — The index, on the homepage. The substance is here, not behind
          a click. This is the structural change the redesign turns on. */}
      <Section index="01" label="Systems" wide>
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

      {/* 03 — One decision, in full. Proves depth without asking for a
          click, and it is the thing no other portfolio puts on page one. */}
      <Section
        index="02"
        label="A decision in detail"
        surface="raised"
        lead={<>Every project here is written up like this.</>}
      >
        <div data-reveal>
          <p className="t-ui measure-prose text-ink-secondary">
            This one is from {strangerClub.title}. It&apos;s the part of that system where the
            order of database writes actually matters, because getting it wrong means two players
            end up in the same slot.
          </p>

          <div className="mt-10">
            <DecisionBlock decision={specimen} index={specimenIndex + 1} />
          </div>

          <div className="mt-10">
            <Link href={`/work/${strangerClub.slug}`}>
              Read the {strangerClub.title} write-up
            </Link>
          </div>
        </div>
      </Section>

      {/* 04 — Failure and recovery. Honesty as credibility; content the site
          already had and used to bury on one sub-page. */}
      <Section
        index="03"
        label="What broke"
        lead={<>Problems I ran into building the deployment portal.</>}
      >
        <div className="flex flex-col divide-y divide-rule" data-reveal>
          {(portal.failureRecovery ?? []).map((entry) => (
            <div key={entry.symptom} className="py-7 first:pt-0 last:pb-0">
              <p className="t-code text-clay">{entry.symptom}</p>
              <div className="mt-4">
                <DefinitionRow
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

        <div className="mt-10">
          <Link href={`/work/${portal.slug}`}>Read the full write-up</Link>
        </div>
      </Section>

      {/* 05 — Practice. The scannable surface, without a skills bar chart. */}
      <Section index="04" label="Skills" surface="raised" wide>
        <div className="grid gap-10 border-t border-rule pt-10 md:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((category, i) => (
            <div
              key={category.label}
              data-reveal
              style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}
            >
              <h3 className="t-meta text-ink-muted">
                <span aria-hidden>
                  {String(i + 1).padStart(2, "0")}{" "}
                  <span className="text-clay-graphic">/</span>{" "}
                </span>
                {category.label}
              </h3>
              <ul className="mt-5 space-y-2.5">
                {category.skills.map((skill) => (
                  <li key={skill} className="t-ui text-ink-secondary">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Link href="/approach">How I work</Link>
        </div>
      </Section>

      {/* 06 — Record. Closes without a sales pitch. */}
      <Section
        index="05"
        label="Contact"
        lead={<>I&apos;m open to work in cloud, DevOps, or backend roles.</>}
      >
        <div data-reveal>
          <p className="t-ui measure-prose text-ink-secondary">
            I&apos;m based in {site.location}. The project write-ups above go into more detail
            than a CV would.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
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
        </div>
      </Section>
    </>
  );
}
