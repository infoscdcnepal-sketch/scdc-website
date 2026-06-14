export type StructureType = 'S' | 'RC' | 'W' | 'SRC';

export type Project = {
  id: number;
  structure: StructureType;
  durationMonths: number;
};

/**
 * Project titles, building types and scopes live in messages/{en,ja}.json
 * under "portfolio.projects.{id}" so every string stays translatable.
 * Structure labels (S造 / RC造 / 木造 / SRC造) are shared across locales.
 */
export const structureLabels: Record<StructureType, string> = {
  S: 'S造',
  RC: 'RC造',
  W: '木造',
  SRC: 'SRC造',
};

export const structureBadgeClasses: Record<StructureType, string> = {
  S: 'bg-navy text-white',
  RC: 'bg-slate-600 text-white',
  W: 'bg-amber-700 text-white',
  SRC: 'bg-teal text-white',
};

export const projects: Project[] = [
  { id: 1, structure: 'S', durationMonths: 6 },
  { id: 2, structure: 'W', durationMonths: 4 },
  { id: 3, structure: 'RC', durationMonths: 8 },
  { id: 4, structure: 'S', durationMonths: 5 },
  { id: 5, structure: 'RC', durationMonths: 10 },
  { id: 6, structure: 'S', durationMonths: 12 },
  { id: 7, structure: 'SRC', durationMonths: 14 },
  { id: 8, structure: 'RC', durationMonths: 6 },
  { id: 9, structure: 'S', durationMonths: 5 },
  { id: 10, structure: 'W', durationMonths: 7 },
  { id: 11, structure: 'S', durationMonths: 9 },
  { id: 12, structure: 'SRC', durationMonths: 18 },
];
