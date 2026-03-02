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
        <p className="text-accent-600 mb-2 text-sm font-semibold tracking-wider uppercase">{tag}</p>
      )}
      <h2 className="font-display text-brand-950 text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {description && <p className="text-muted mt-3 text-base">{description}</p>}
    </Reveal>
  );
}
