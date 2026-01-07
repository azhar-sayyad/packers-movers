import { Reveal } from "@/components/motion/reveal";

interface SectionHeadingProps {
  tag?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}

export function SectionHeading({ tag, title, description, align = "center" }: SectionHeadingProps) {
  return (
    <Reveal className={`mb-10 max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {tag && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent-600">{tag}</p>
      )}
      <h2 className="font-display text-3xl font-bold tracking-tight text-brand-950 sm:text-4xl">{title}</h2>
      {description && <p className="mt-3 text-base text-muted">{description}</p>}
    </Reveal>
  );
}