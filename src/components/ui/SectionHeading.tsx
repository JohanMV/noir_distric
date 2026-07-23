import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description: string;
  action?: ReactNode;
  centered?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  centered = false,
}: SectionHeadingProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      className={`mb-7 flex gap-5 ${centered ? "flex-col items-center text-center" : "items-end justify-between"}`}
    >
      <div className="max-w-2xl">
        {eyebrow && (
          <p className="mb-2 text-xs font-extrabold tracking-[0.18em] text-muted uppercase">
            {eyebrow}
          </p>
        )}
        <h2 className="text-3xl leading-none font-extrabold tracking-[-0.045em] text-ink uppercase md:text-5xl">
          {title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
          {description}
        </p>
      </div>
      {action}
    </motion.div>
  );
}
