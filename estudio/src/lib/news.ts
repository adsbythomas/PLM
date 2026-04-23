// Carga tipada del radar normativo.
// Los JSONs son generados por scripts/scrape_bora.py y actualizados
// dos veces por día por el workflow .github/workflows/update-radar.yml.

import radarLegal from '../data/radar.json';
import radarContable from '../data/radar-contable.json';

export interface NewsItem {
  date: string;        // "Reciente" | "Esta semana" | "Este mes" | "Hoy" | etc.
  title: string;
  desc: string;
  source: string;      // e.g. "ANAC · Boletín Oficial"
  url: string;         // link al Boletín Oficial u organismo
  categories: string[];
  slug?: string;       // generado, no viene del JSON
}

export interface Radar {
  updated: string;
  items: NewsItem[];
}

// Convierte un título en un slug URL-safe.
function slugify(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')  // saca tildes
    .replace(/[^a-z0-9\s-]/g, '')                      // saca puntuación
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 80);
}

function addSlugs(radar: { updated: string; items: NewsItem[] }): Radar {
  return {
    updated: radar.updated,
    items: radar.items.map((item) => ({ ...item, slug: slugify(item.title) })),
  };
}

export const legalRadar:     Radar = addSlugs(radarLegal    as any);
export const accountingRadar: Radar = addSlugs(radarContable as any);

export function getRadar(practice: 'legal' | 'accounting'): Radar {
  return practice === 'legal' ? legalRadar : accountingRadar;
}

// Formatea la fecha del "updated" como algo corto y legible.
export function formatUpdated(isoDate: string): string {
  try {
    const d = new Date(isoDate);
    const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  } catch {
    return isoDate;
  }
}
