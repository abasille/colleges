// Normalisation des libellés de voies et des noms d'établissements.
// Partagé entre le pipeline de données (scripts/data) et le navigateur :
// le libellé renvoyé par le géocodeur et celui de la carte scolaire passent
// par la même fonction avant d'être comparés.

/** Majuscules, sans accents ni ligatures. */
export function stripAccents(s: string): string {
  return s
    .replace(/[œŒ]/g, 'OE')
    .replace(/[æÆ]/g, 'AE')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toUpperCase();
}

/** Remplace la ponctuation par des espaces et réduit les espaces multiples. */
function tokens(s: string): string[] {
  return stripAccents(s)
    .replace(/[^A-Z0-9]+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean);
}

/** Types de voie abrégés (en tête de libellé) -> forme développée. */
const TYPES_VOIE: Record<string, string> = {
  AL: 'ALLEE',
  ALL: 'ALLEE',
  AV: 'AVENUE',
  AVE: 'AVENUE',
  AVN: 'AVENUE',
  BD: 'BOULEVARD',
  BLD: 'BOULEVARD',
  BOUL: 'BOULEVARD',
  BVD: 'BOULEVARD',
  CHE: 'CHEMIN',
  CHEM: 'CHEMIN',
  CHM: 'CHEMIN',
  CRS: 'COURS',
  ESP: 'ESPLANADE',
  FG: 'FAUBOURG',
  FBG: 'FAUBOURG',
  IMP: 'IMPASSE',
  PAS: 'PASSAGE',
  PASS: 'PASSAGE',
  PL: 'PLACE',
  PLA: 'PLACE',
  PROM: 'PROMENADE',
  PRV: 'PARVIS',
  PTE: 'PORTE',
  QU: 'QUAI',
  QUA: 'QUAI',
  R: 'RUE',
  RES: 'RESIDENCE',
  RPT: 'ROND POINT',
  RTE: 'ROUTE',
  SEN: 'SENTIER',
  SENT: 'SENTIER',
  SQ: 'SQUARE',
  TER: 'TERRASSE',
  TSSE: 'TERRASSE',
  VLA: 'VILLA',
};

/** Abréviations courantes à l'intérieur d'un libellé (titres, saints). */
const MOTS: Record<string, string> = {
  ST: 'SAINT',
  STE: 'SAINTE',
  STS: 'SAINTS',
  GAL: 'GENERAL',
  MAL: 'MARECHAL',
  PDT: 'PRESIDENT',
  DR: 'DOCTEUR',
  PROF: 'PROFESSEUR',
  CDT: 'COMMANDANT',
  LT: 'LIEUTENANT',
};

/**
 * Libellé de voie normalisé : majuscules, sans accents ni ponctuation,
 * type de voie et abréviations développés, espaces réduits.
 * Les articles (DE, DU, DE LA, DES, L, D) sont conservés.
 * ex. « Av. de l'Observatoire » -> « AVENUE DE L OBSERVATOIRE »
 */
export function normalizeVoie(s: string): string {
  const t = tokens(s);
  if (t.length === 0) return '';
  const out: string[] = [];
  t.forEach((w, i) => {
    if (i === 0 && TYPES_VOIE[w]) out.push(TYPES_VOIE[w]);
    else if (MOTS[w]) out.push(MOTS[w]);
    else out.push(w);
  });
  return out.join(' ');
}

/** Mots ignorés pour comparer des noms d'établissements. */
const MOTS_VIDES_NOM = new Set(['COLLEGE', 'CLG', 'PRIVE', 'PUBLIC', 'ETABLISSEMENT', 'SCOLAIRE']);

/**
 * Nom d'établissement normalisé pour les jointures par nom
 * (ex. secteurs parisiens sans UAI) : majuscules, sans accents ni ponctuation,
 * ST/STE développés, mots « collège », « privé »… retirés.
 * ex. « Collège Saint-Exupéry » et « ST EXUPERY » -> « SAINT EXUPERY »
 */
export function normalizeNom(s: string): string {
  return tokens(s)
    .map((w) => MOTS[w] ?? w)
    .filter((w) => !MOTS_VIDES_NOM.has(w))
    .join(' ');
}
