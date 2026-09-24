import { Container } from "@/components/ui/container";
import { RevealText } from "@/components/ui/reveal-text";
import { AmbientLayer } from "@/components/ui/ambient-layer";
import { skillCategories } from "@/lib/data/skills";

export function SkillsSection() {
  return (
    <section id="skills" className="relative isolate bg-surface py-20 md:py-28 lg:py-32 xl:py-40">
      <AmbientLayer seed="skills" variant="sparse" scale={0.55} allowLarge={false} />
      <Container>
        <RevealText as="div">
          <div className="flex items-baseline gap-3 border-b border-border-strong pb-6">
            <span className="font-mono text-xs text-muted">04</span>
            <h2 className="font-display text-heading font-semibold tracking-tight">
              <span className="text-accent/70" aria-hidden>
                /
              </span>{" "}
              Technical Areas
            </h2>
          </div>
        </RevealText>

        <div className="mt-12 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((category, i) => (
            <RevealText key={category.label} delay={i * 0.06}>
              <p className="font-mono text-xs text-muted/60">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-1 font-mono text-xs tracking-widest text-muted uppercase">
                {category.label}
              </h3>
              <ul className="mt-5 space-y-3">
                {category.skills.map((skill) => (
                  <li key={skill}>
                    <span className="font-display cursor-default text-lg font-semibold tracking-tight decoration-accent decoration-2 underline-offset-4 transition-all hover:underline">
                      {skill}
                    </span>
                  </li>
                ))}
              </ul>
            </RevealText>
          ))}
        </div>
      </Container>
    </section>
  );
}
