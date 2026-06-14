export type StructureType = 'S' | 'RC' | 'W' | 'SRC';

export type Project = {
  id: number;
  structure: StructureType;
  durationMonths: number;
};

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

// Only S造/RC造/SRC造 projects — all drawing support work under licensed engineers
export const projects: Project[] = [
  { id: 1,  structure: 'S',   durationMonths: 6  },  // 物流倉庫
  { id: 3,  structure: 'RC',  durationMonths: 8  },  // 商業施設
  { id: 4,  structure: 'S',   durationMonths: 5  },  // 工場・製造棟
  { id: 5,  structure: 'RC',  durationMonths: 10 },  // 賃貸マンション
  { id: 6,  structure: 'S',   durationMonths: 12 },  // オフィスビル
  { id: 7,  structure: 'SRC', durationMonths: 8  },  // 複合商業施設
  { id: 8,  structure: 'RC',  durationMonths: 6  },  // 小学校改修
  { id: 9,  structure: 'S',   durationMonths: 5  },  // 医療クリニック
];
