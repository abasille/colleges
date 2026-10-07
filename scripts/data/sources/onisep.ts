// ONISEP (licence ODbL) :
//  - Idéo-Structures d'enseignement secondaire : langues enseignées (dont latin, grec, LCE) ;
//  - Idéo-Langues au collège : combinaisons LV1 / LV2 ;
//  - Idéo-Actions de dispositif Île-de-France (Lhéo XML) : bilangue, CHA, sections, ULIS, SEGPA, UPE2A…
import AdmZip from 'adm-zip';
import { fetchCached, fetchText } from '../lib/fetch';
import { parseCsv } from '../lib/util';

export const ONISEP_STRUCTURES_URL = 'https://api.opendata.onisep.fr/downloads/5fa5816ac6a6e/5fa5816ac6a6e.csv';
export const ONISEP_LANGUES_URL = 'https://api.opendata.onisep.fr/downloads/66263935522cd/66263935522cd.csv';
export const ONISEP_DISPOSITIFS_URL = 'https://api.opendata.onisep.fr/downloads/5fa532b036477/5fa532b036477.zip';

export interface OnisepStructure {
  uai: string;
  nom: string;
  type: string;
  /** Libellés bruts du champ « langues enseignées ». */
  langues: string[];
  lat: number | null;
  lon: number | null;
}

export interface OnisepDispositif {
  /** `intitule-formation`, ex. « section bilangue de collège ». */
  intitule: string;
  /** Langues (bilangue), sports (section sportive)… */
  enseignements: string[];
  denomination: string | null;
}

export interface Onisep {
  structures: Map<string, OnisepStructure>;
  /** Structures écartées (même UAI mais type non collège, ex. UFA). */
  structuresIgnorees: OnisepStructure[];
  langues: Map<string, { lv1: string[]; lv2: string[] }>;
  dispositifs: Map<string, OnisepDispositif[]>;
  dispositifsIgnores: { uai: string; intitule: string; typeEtablissement: string | null }[];
}

const TYPES_COLLEGE = new Set(['collège', "établissement régional d'enseignement adapté"]);

function decodeXml(s: string): string {
  return s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, d: string) => String.fromCodePoint(Number(d)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h: string) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&amp;/g, '&')
    .trim();
}

function splitList(s: string): string[] {
  return s
    .split(',')
    .map((x) => x.trim())
    .filter(Boolean);
}

/** « LV1 : anglais, allemand / LV2 : espagnol » -> { lv1: [...], lv2: [...] } */
export function parseLanguesOnisep(s: string): { lv1: string[]; lv2: string[] } {
  const out = { lv1: [] as string[], lv2: [] as string[] };
  for (const part of s.split('/')) {
    const m = /^\s*(LV[12])\s*:\s*(.*)$/i.exec(part);
    if (!m) continue;
    const lv = m[1].toLowerCase() as 'lv1' | 'lv2';
    out[lv].push(...splitList(m[2]).map((x) => x.toLowerCase()));
  }
  return out;
}

export async function loadOnisep(uais: string[]): Promise<Onisep> {
  const set = new Set(uais);

  // Structures
  const structures = new Map<string, OnisepStructure>();
  const structuresIgnorees: OnisepStructure[] = [];
  for (const r of parseCsv(await fetchText(ONISEP_STRUCTURES_URL, '.csv'))) {
    const uai = (r['code UAI'] ?? '').trim();
    if (!set.has(uai)) continue;
    const s: OnisepStructure = {
      uai,
      nom: r['nom'] ?? '',
      type: r["type d'établissement"] ?? '',
      langues: splitList(r['langues enseignées'] ?? ''),
      lat: r['latitude (Y)'] ? Number(r['latitude (Y)']) : null,
      lon: r['longitude (X)'] ? Number(r['longitude (X)']) : null,
    };
    if (TYPES_COLLEGE.has(s.type)) structures.set(uai, s);
    else structuresIgnorees.push(s);
  }

  // Langues au collège
  const langues = new Map<string, { lv1: string[]; lv2: string[] }>();
  for (const r of parseCsv(await fetchText(ONISEP_LANGUES_URL, '.csv'))) {
    const uai = (r['UAI lieu de cours'] ?? '').trim();
    if (!set.has(uai)) continue;
    const p = parseLanguesOnisep(r['Langues vivantes 1 et 2'] ?? '');
    const prev = langues.get(uai) ?? { lv1: [], lv2: [] };
    langues.set(uai, { lv1: [...new Set([...prev.lv1, ...p.lv1])], lv2: [...new Set([...prev.lv2, ...p.lv2])] });
  }

  // Dispositifs (Lhéo XML dans un zip)
  const zip = new AdmZip(await fetchCached(ONISEP_DISPOSITIFS_URL, '.zip'));
  const entry = zip.getEntries().find((e) => e.entryName.endsWith('.xml'));
  if (!entry) throw new Error('ONISEP dispositifs : aucun fichier XML dans le zip');
  const xml = entry.getData().toString('utf-8');
  const dispositifs = new Map<string, OnisepDispositif[]>();
  const dispositifsIgnores: Onisep['dispositifsIgnores'] = [];
  const reFormation = /<formation\b[^>]*>([\s\S]*?)<\/formation>/g;
  let m: RegExpExecArray | null;
  while ((m = reFormation.exec(xml))) {
    const block = m[1];
    if (!uais.some((u) => block.includes(u))) continue;
    const intitule = decodeXml(/<intitule-formation>([\s\S]*?)<\/intitule-formation>/.exec(block)?.[1] ?? '');
    const enseignements = [...block.matchAll(/<libelle-enseignement>([\s\S]*?)<\/libelle-enseignement>/g)].map((x) => decodeXml(x[1]));
    for (const lieu of block.matchAll(/<lieu-de-formation\b[\s\S]*?<\/lieu-de-formation>/g)) {
      const uai = /<code-UAI>([^<]+)<\/code-UAI>/.exec(lieu[0])?.[1]?.trim();
      if (!uai || !set.has(uai)) continue;
      const typeEtab = /<extra info="TYPE_ETABLISSEMENT">([^<]*)<\/extra>/.exec(lieu[0])?.[1] ?? null;
      const denomination = /<denomination>([^<]*)<\/denomination>/.exec(lieu[0])?.[1] ?? null;
      // Garde-fou : un UAI de collège peut être rattaché par erreur à un CFA / lycée.
      if (typeEtab !== null && !TYPES_COLLEGE.has(decodeXml(typeEtab))) {
        dispositifsIgnores.push({ uai, intitule, typeEtablissement: typeEtab });
        continue;
      }
      const list = dispositifs.get(uai) ?? [];
      list.push({ intitule, enseignements, denomination: denomination ? decodeXml(denomination) : null });
      dispositifs.set(uai, list);
    }
  }
  return { structures, structuresIgnorees, langues, dispositifs, dispositifsIgnores };
}
