'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, structureLabels, type StructureType } from '@/lib/projects';
import { ProjectCard } from '@/components/project-card';
import { cn } from '@/lib/utils';

const filters: (StructureType | 'all')[] = ['all', 'S', 'RC', 'W', 'SRC'];

export function PortfolioGrid() {
  const t = useTranslations('portfolio');
  const [active, setActive] = useState<StructureType | 'all'>('all');

  const visible =
    active === 'all' ? projects : projects.filter((p) => p.structure === active);

  return (
    <div>
      {/* Filter tabs */}
      <div
        className="mb-10 flex flex-wrap gap-3"
        role="tablist"
        aria-label={t('title')}
      >
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            role="tab"
            aria-selected={active === filter}
            onClick={() => setActive(filter)}
            className={cn(
              'rounded-full border px-5 py-2 text-sm font-semibold transition-all',
              active === filter
                ? 'border-navy bg-navy text-white shadow-sm'
                : 'border-gray-300 bg-white text-ink-muted hover:border-navy hover:text-navy'
            )}
          >
            {filter === 'all' ? t('filterAll') : structureLabels[filter]}
          </button>
        ))}
      </div>

      {/* Card grid */}
      <motion.div layout className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <p className="mt-12 text-center text-sm italic text-ink-muted">
        {t('note')}
      </p>
    </div>
  );
}
