// Historique du brevet par établissement (DNB, sessions jusqu'en 2021, tous candidats).
import { odsExport, odsList } from '../lib/fetch';
import { annee, num } from '../lib/util';
import { PREMIERE_SESSION_DNB } from '../lib/config';

export const DNB_ID = 'fr-en-dnb-par-etablissement';

export interface DnbRow {
  session: number;
  uai: string;
  nom: string | null;
  presents: number | null;
  admis: number | null;
  taux: number | null;
  mentionsAB: number | null;
  mentionsB: number | null;
  mentionsTB: number | null;
}

export async function loadDnb(uais: string[]): Promise<DnbRow[]> {
  const raw = await odsExport<Record<string, unknown>>(DNB_ID, {
    // `session` est un champ texte dans ce jeu : filtre sur l'année fait ci-dessous.
    where: `numero_d_etablissement in ${odsList(uais)}`,
  });
  return raw
    .map((r) => {
      const presents = num(r.presents);
      const admis = num(r.admis);
      let taux = num(r.taux_de_reussite);
      if (taux === null && presents && admis !== null) taux = (admis / presents) * 100;
      return {
        session: annee(r.session) ?? 0,
        uai: String(r.numero_d_etablissement),
        nom: (r.patronyme as string | null) ?? null,
        presents,
        admis,
        taux,
        mentionsAB: num(r.nombre_d_admis_mention_ab),
        mentionsB: num(r.admis_mention_bien),
        mentionsTB: num(r.admis_mention_tres_bien),
      };
    })
    .filter((r) => r.session >= PREMIERE_SESSION_DNB);
}
