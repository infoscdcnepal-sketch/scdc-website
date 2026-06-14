'use client';

import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export function WorkflowStep({
  index,
  isLast,
}: {
  index: number;
  isLast: boolean;
}) {
  const t = useTranslations('workflow.steps');
  const reduceMotion = useReducedMotion();

  return (
    <li className="flex flex-col items-center">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="flex w-full max-w-xl items-start gap-5 rounded-2xl bg-white p-6 shadow-card transition-all duration-300 hover:scale-105 hover:shadow-card-hover"
      >
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy font-heading text-lg font-bold text-white">
          {String(index).padStart(2, '0')}
        </span>
        <div>
          <h3 className="text-lg font-bold text-navy">{t(`${index}.title`)}</h3>
          <p className="mt-1 text-sm leading-relaxed text-ink-muted">
            {t(`${index}.desc`)}
          </p>
        </div>
      </motion.div>
      {!isLast && (
        <ArrowDown className="my-3 h-6 w-6 text-teal" aria-hidden="true" />
      )}
    </li>
  );
}
