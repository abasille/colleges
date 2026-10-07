// Indicateurs de valeur ajoutée des collèges (IVAC), téléchargés pour toute la France :
// centiles de la note maison et moyennes de référence (France, académies).
import { odsExport } from '../lib/fetch';
import { annee, num } from '../lib/util';

export const IVAC_ID = 'fr-en-indicateurs-valeur-ajoutee-colleges';

export interface IvacRow {
  session: number;
  uai: string;
  nom: string | null;
  academie: string | null;
  secteur: string | null;
  candidats: number | null;
  taux: number | null;
  vaTaux: number | null;
  noteEcrit: number | null;
  vaNote: number | null;
  accesSixiemeTroisieme: number | null;
  mentionsAB: number | null;
  mentionsB: number | null;
  mentionsTB: number | null;
  mentionsGlobal: number | null;
}

const FIELDS = [
  'session',
  'uai',
  'nom_de_l_etablissement',
  'academie',
  'secteur',
  'nb_candidats_g',
  'taux_de_reussite_g',
  'va_du_taux_de_reussite_g',
  'note_a_l_ecrit_g',
  'va_de_la_note_g',
  'taux_d_acces_6eme_3eme',
  'nb_mentions_ab_g',
  'nb_mentions_b_g',
  'nb_mentions_tb_g',
  'nb_mentions_global_g',
].join(',');

export async function loadIvacNational(): Promise<IvacRow[]> {
  const raw = await odsExport<Record<string, unknown>>(IVAC_ID, { select: FIELDS });
  return raw
    .map((r) => ({
      session: annee(r.session) ?? 0,
      uai: String(r.uai ?? ''),
      nom: (r.nom_de_l_etablissement as string | null) ?? null,
      academie: (r.academie as string | null) ?? null,
      secteur: (r.secteur as string | null) ?? null,
      candidats: num(r.nb_candidats_g),
      taux: num(r.taux_de_reussite_g),
      vaTaux: num(r.va_du_taux_de_reussite_g),
      noteEcrit: num(r.note_a_l_ecrit_g),
      vaNote: num(r.va_de_la_note_g),
      accesSixiemeTroisieme: num(r.taux_d_acces_6eme_3eme),
      mentionsAB: num(r.nb_mentions_ab_g),
      mentionsB: num(r.nb_mentions_b_g),
      mentionsTB: num(r.nb_mentions_tb_g),
      mentionsGlobal: num(r.nb_mentions_global_g),
    }))
    .filter((r) => r.uai && r.session > 0);
}
