import { useEffect, useRef, useState } from 'react';
import type { College, Niveau } from '../types';
import { useData } from '../data';
import { useStore } from '../store';
import { formatDistance, formatHeures, formatNombre, formatPeriode, todayISO } from '../lib/format';
import { EVENT_LABELS, INSCRIPTIONS_LABELS, LIEN_LABELS, PASSAGE_LABELS } from '../lib/indicateurs';
import { EVENT_COLORS } from '../lib/colors';
import { eventsForCollege, isPast, statutInscriptions } from '../lib/events';
import { LineChart } from './LineChart';
import { ScoreBadge } from './ScoreBadge';
import { ScoreHelp } from './ScoreHelp';
import { Badge, CollegeTags, ExternalLink, InfoTip, Modal, StarButton, StatutBadge, cx } from './ui';
import { IndicRow, KV, Section, TagList } from './detail/common';

export function CollegeDetail({ onClose }: { onClose: () => void }) {
  const { byUai, distances, secteur } = useData();
  const selected = useStore((s) => s.selected);
  const scroller = useRef<HTMLDivElement>(null);
  const c = selected ? byUai.get(selected) : undefined;
  useEffect(() => scroller.current?.scrollTo({ top: 0 }), [selected]);
  if (!c) return null;
  const distance = distances?.get(c.uai) ?? null;
  return (
    <div className="flex h-full min-h-0 flex-col bg-white">
      <div ref={scroller} className="scroll-thin min-h-0 flex-1 overflow-y-auto">
        <Header c={c} distance={distance} secteur={!!secteur?.uais.includes(c.uai)} onClose={onClose} />
        <Score c={c} />
        <Resultats c={c} />
        <Profil c={c} />
        <Options c={c} />
        <Continuite c={c} />
        <Evenements c={c} />
        <Notes uai={c.uai} />
        <Autres c={c} />
        <Sources c={c} />
      </div>
    </div>
  );
}

function Header({ c, distance, secteur, onClose }: { c: College; distance: number | null; secteur: boolean; onClose: () => void }) {
  const niveauxComplets = c.niveaux.length === 4;
  return (
    <header className="px-4 pb-3 pt-3">
      <div className="flex items-start gap-2">
        <h2 className="flex-1 text-lg font-semibold leading-snug">{c.nom}</h2>
        <StarButton uai={c.uai} className="text-2xl" />
        <button type="button" onClick={onClose} className="rounded p-1 text-zinc-500 hover:bg-zinc-100" aria-label="Fermer la fiche">
          ✕
        </button>
      </div>
      <div className="mt-1 flex flex-wrap items-center gap-1">
        <StatutBadge statut={c.statut} long />
        {c.contrat === 'simple' && <Badge color="#52525b">Contrat simple</Badge>}
        <CollegeTags c={c} secteur={secteur} />
        {c.continuite.secondeGtSurPlace && <Badge color="#0369a1">Lycée général sur place</Badge>}
      </div>
      {c.recrutementParticulier && <p className="mt-2 rounded bg-pink-50 px-2 py-1 text-xs text-pink-900">{c.recrutementParticulier}</p>}
      {!niveauxComplets && <p className="mt-2 text-xs text-zinc-600">Classes : {c.niveaux.join(', ') || 'non précisé'}</p>}
      {c.remarques.map((r) => (
        <p key={r} className="mt-2 rounded bg-amber-50 px-2 py-1 text-xs text-amber-900">
          {r}
        </p>
      ))}
      <div className="mt-2 space-y-0.5 text-sm text-zinc-700">
        <div>
          {c.adresse}, {c.codePostal} {c.zoneLibelle.startsWith('Paris') ? 'Paris' : c.zoneLibelle}
          {distance !== null && <span className="text-zinc-500"> · à {formatDistance(distance)} de votre adresse</span>}
        </div>
        <div className="flex flex-wrap gap-x-3">
          {c.web && <ExternalLink href={c.web}>Site web</ExternalLink>}
          {c.telephone && <a href={`tel:${c.telephone.replace(/\s/g, '')}`}>{c.telephone}</a>}
          {c.mail && <a href={`mailto:${c.mail}`} className="text-blue-700 hover:underline">E-mail</a>}
          {c.ficheOnisep && <ExternalLink href={c.ficheOnisep}>Fiche ONISEP</ExternalLink>}
        </div>
        {secteur && <div className="font-medium text-green-700">✓ Collège de secteur de votre adresse</div>}
      </div>
    </header>
  );
}

function Score({ c }: { c: College }) {
  const [help, setHelp] = useState(false);
  const s = c.score;
  return (
    <Section title="Note maison">
      <div className="flex items-center gap-3">
        <ScoreBadge score={s} />
        <div className="flex-1">
          {s ? (
            <>
              <div className="text-xl font-semibold tabular-nums">
                {formatNombre(s.note, 1)}
                <span className="text-sm font-normal text-zinc-500">/20</span>
                {s.partielle && <span className="ml-2 text-xs font-normal text-zinc-500">(partielle)</span>}
              </div>
              <div className="text-sm text-zinc-600">
                {s.rang === 1 ? '1er' : `${s.rang}e`} sur {s.sur} dans la zone
              </div>
            </>
          ) : (
            <div className="text-sm text-zinc-600">Non calculée : {c.statut === 'hors_contrat' ? 'les hors contrat ne publient pas ces indicateurs.' : 'données insuffisantes.'}</div>
          )}
        </div>
        <button type="button" onClick={() => setHelp(true)} className="rounded-full border border-zinc-300 px-2 text-sm text-zinc-600 hover:bg-zinc-50" aria-label="Comment est calculée la note ?">
          ?
        </button>
      </div>
      {s && (
        <div className="mt-3 space-y-1.5">
          {(
            [
              ['Réussite au brevet', s.composantes.brevet],
              ['Note à l’écrit', s.composantes.noteEcrit],
              ['Valeur ajoutée', s.composantes.va],
            ] as const
          ).map(([label, v]) => (
            <div key={label} className="flex items-center gap-2 text-xs">
              <span className="w-32 text-zinc-600">{label}</span>
              <div className="h-2 flex-1 rounded bg-zinc-100">{v !== null && <div className="h-2 rounded bg-blue-600" style={{ width: `${(v / 20) * 100}%` }} />}</div>
              <span className="w-10 text-right tabular-nums">{v === null ? '—' : formatNombre(v, 1)}</span>
            </div>
          ))}
        </div>
      )}
      <Modal open={help} onClose={() => setHelp(false)} title="Comment est calculée la note maison ?">
        <ScoreHelp />
      </Modal>
    </Section>
  );
}

function Resultats({ c }: { c: College }) {
  const dernier = [...c.brevet].reverse().find((b) => b.source === 'ivac');
  return (
    <Section title={`Résultats${dernier ? ` (brevet ${dernier.session})` : ''}`}>
      <IndicRow c={c} k="brevet" />
      <IndicRow c={c} k="brevetDernier" />
      <IndicRow c={c} k="mentionsTB" />
      <IndicRow c={c} k="mentions" />
      <IndicRow c={c} k="noteEcrit" />
      <IndicRow c={c} k="vaTaux" />
      <IndicRow c={c} k="vaNote" />
      <IndicRow c={c} k="accesSixiemeTroisieme" />
      {dernier?.candidats != null && <p className="mt-1 text-xs text-zinc-500">{dernier.candidats} candidats en {dernier.session}.</p>}
      <LineChart
        points={c.brevet.map((b) => ({ annee: b.session, valeur: b.taux }))}
        label="Taux de réussite au brevet (%)"
        decimales={0}
        reference={null}
        rupture={c.brevet.some((b) => b.source === 'dnb') ? { annee: 2022, label: 'à partir de 2022, série générale seulement (IVAC)' } : null}
      />
    </Section>
  );
}

const NIVEAUX: Niveau[] = ['6e', '5e', '4e', '3e'];

function Profil({ c }: { c: College }) {
  const ips = c.ips;
  return (
    <Section title="Profil">
      <IndicRow c={c} k="ips">
        {ips?.ecartType != null && <div className="text-right text-[11px] text-zinc-500">écart-type {formatNombre(ips.ecartType, 1)} (diversité sociale)</div>}
      </IndicRow>
      {ips && (
        <LineChart
          points={ips.historique}
          label="IPS par rentrée"
          reference={ips.references.national !== null ? { valeur: ips.references.national, label: 'France' } : null}
          color="#7c3aed"
        />
      )}
      <IndicRow c={c} k="effectif" />
      {c.effectifs && (
        <div className="mb-1 flex justify-end gap-3 text-[11px] tabular-nums text-zinc-500">
          {NIVEAUX.map((n) => (
            <span key={n}>
              {n} : {c.effectifs?.parNiveau[n] ?? '—'}
            </span>
          ))}
          {c.effectifs.segpa ? <span>SEGPA : {c.effectifs.segpa}</span> : null}
          {c.effectifs.ulis ? <span>ULIS : {c.effectifs.ulis}</span> : null}
        </div>
      )}
      {c.effectifs && c.effectifs.historique.length > 2 && <LineChart points={c.effectifs.historique} label="Élèves par rentrée" color="#0891b2" />}
      <IndicRow c={c} k="elevesParClasse" />
      <IndicRow c={c} k="heuresParEleve" />
      <IndicRow c={c} k="eval6Francais" />
      <IndicRow c={c} k="eval6Maths" />
      {c.evaluations6e && <p className="text-[11px] text-zinc-500">Évaluations passées à l’entrée en 6e, rentrée {c.evaluations6e.annee}.</p>}
    </Section>
  );
}

function Options({ c }: { c: College }) {
  const o = c.options;
  return (
    <Section title="Langues et options">
      <KV label="LV1">
        <TagList items={c.langues.lv1} />
      </KV>
      <KV label="LV2">
        <TagList items={c.langues.lv2} />
      </KV>
      <KV label="Langues anciennes">
        <TagList items={c.langues.anciennes} />
      </KV>
      {c.langues.lce.length > 0 && (
        <KV label="Langues et cultures européennes">
          <TagList items={c.langues.lce} />
        </KV>
      )}
      <KV label="Bilangue dès la 6e">
        <TagList items={o.bilangue} />
      </KV>
      <KV label="Section internationale">
        <TagList items={o.sectionsInternationales} />
      </KV>
      <KV label="Horaires aménagés">
        <TagList items={o.cha} />
      </KV>
      <KV label="Section sportive">
        <TagList items={o.sectionsSportives} />
      </KV>
      {o.sportEtudes.length > 0 && (
        <KV label="Sport-études">
          <TagList items={o.sportEtudes} />
        </KV>
      )}
      <KV label="Dispositifs">
        <TagList items={o.dispositifs} />
      </KV>
      <KV label="Demi-pension">{c.demiPension === null ? '—' : c.demiPension ? 'Oui' : 'Non'}</KV>
    </Section>
  );
}

function Continuite({ c }: { c: College }) {
  const k = c.continuite;
  return (
    <Section title="Lycée et continuité jusqu’au bac">
      <p className="text-sm font-medium">{LIEN_LABELS[k.lien]}</p>
      {k.lycee && (
        <div className="mt-1 rounded border border-zinc-200 p-2 text-sm">
          <div className="font-medium">{k.lycee.nom}</div>
          {k.lycee.adresse && <div className="text-xs text-zinc-500">{k.lycee.adresse}</div>}
          <div className="mt-1 flex flex-wrap gap-1">
            {k.lycee.voies.map((v) => (
              <span key={v} className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs">
                {v}
              </span>
            ))}
          </div>
          {!k.secondeGtSurPlace && <div className="mt-1 text-xs text-amber-800">Pas de 2nde générale et technologique dans ce lycée.</div>}
        </div>
      )}
      <p
        className={cx(
          'mt-2 text-sm font-medium',
          k.passage === 'garanti' ? 'text-green-700' : k.passage === 'sous_reserve' ? 'text-lime-700' : 'text-zinc-700',
        )}
      >
        {PASSAGE_LABELS[k.passage]}
      </p>
      {k.passageTexte && <blockquote className="mt-1 border-l-2 border-zinc-300 pl-2 text-sm text-zinc-700">{k.passageTexte}</blockquote>}
      {k.sources.length > 0 && (
        <div className="mt-1 flex flex-wrap gap-x-2 text-xs">
          {k.sources.map((s, i) => (
            <ExternalLink key={s} href={s}>
              source {i + 1}
            </ExternalLink>
          ))}
        </div>
      )}
      {c.statut === 'public' && (
        <div className="mt-3">
          <div className="text-sm font-medium">
            Lycées de secteur 1 (Affelnet 2026)
            <InfoTip text="Lycées où l’élève est prioritaire si ce collège est son collège de secteur (le secteur dépend de l’adresse, pas du collège fréquenté)." />
          </div>
          {c.affelnetSecteur1 ? (
            <ul className="mt-1 list-disc pl-5 text-sm">
              {c.affelnetSecteur1.map((l) => (
                <li key={l.uai}>{l.nom}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-zinc-500">Non disponible{c.academie === 'Créteil' ? ' pour le Val-de-Marne' : ''}.</p>
          )}
        </div>
      )}
    </Section>
  );
}

function Evenements({ c }: { c: College }) {
  const { events } = useData();
  const today = todayISO();
  const { courant, precedent } = eventsForCollege(events.events, c.uai, events.saisonCourante);
  const ins = c.statut !== 'public' ? statutInscriptions(events, c.uai, today) : null;
  return (
    <Section title={`Portes ouvertes et inscriptions (${events.saisonCourante})`}>
      {ins && (
        <p
          className={cx(
            'mb-2 rounded px-2 py-1 text-sm',
            ins.statut === 'ouvertes' ? 'bg-green-50 text-green-900' : ins.statut === 'closes' ? 'bg-red-50 text-red-900' : 'bg-zinc-100 text-zinc-800',
          )}
        >
          <strong>{INSCRIPTIONS_LABELS[ins.statut]}</strong> – {ins.detail}
          {ins.source && (
            <>
              {' '}
              <ExternalLink href={ins.source}>source</ExternalLink>
            </>
          )}
        </p>
      )}
      {courant.length > 0 ? (
        <ul className="space-y-1.5">
          {courant.map((e) => (
            <li key={e.id} className={cx('text-sm', isPast(e, today) && 'text-zinc-400')}>
              <span className="mr-1.5 inline-block h-2 w-2 rounded-full" style={{ background: EVENT_COLORS[e.type] }} />
              <strong>{formatPeriode(e.date, e.dateFin)}</strong>
              {e.heureDebut && <span> · {formatHeures(e.heureDebut, e.heureFin)}</span>} – {e.titre}
              {e.confiance !== 'haute' && <span className="text-xs text-zinc-500"> (à confirmer)</span>}{' '}
              <ExternalLink href={e.source} className="text-xs">
                source
              </ExternalLink>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-zinc-500">Pas encore de date annoncée pour cette saison.</p>
      )}
      {courant.length === 0 && precedent.length > 0 && (
        <div className="mt-2 text-sm text-zinc-600">
          <div className="text-xs font-medium uppercase tracking-wide text-zinc-500">L’an dernier (indicatif)</div>
          <ul className="mt-1 space-y-0.5">
            {precedent.map((e) => (
              <li key={e.id}>
                {EVENT_LABELS[e.type]} : {formatPeriode(e.date, e.dateFin)}
                {e.heureDebut && ` · ${formatHeures(e.heureDebut, e.heureFin)}`}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Section>
  );
}

function Notes({ uai }: { uai: string }) {
  const note = useStore((s) => s.notes[uai] ?? '');
  const setNote = useStore((s) => s.setNote);
  const [draft, setDraft] = useState(note);
  useEffect(() => setDraft(note), [uai, note]);
  useEffect(() => {
    if (draft === note) return;
    const t = setTimeout(() => setNote(uai, draft), 400);
    return () => clearTimeout(t);
  }, [draft, note, uai, setNote]);
  return (
    <Section title="Mes notes">
      <textarea
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={() => draft !== note && setNote(uai, draft)}
        rows={3}
        placeholder="Impressions, questions à poser, dates…"
        aria-label="Mes notes sur ce collège"
        className="w-full rounded-md border border-zinc-300 p-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
      <p className="text-[11px] text-zinc-500">Enregistrées dans ce navigateur uniquement.</p>
    </Section>
  );
}

function Autres({ c }: { c: College }) {
  if (!c.personnel.length && !c.labels.length && !c.pix.length) return null;
  return (
    <Section title="Autres informations">
      {c.personnel.map((p) => (
        <KV key={p.label} label={p.label}>
          {p.valeur}
        </KV>
      ))}
      {c.labels.length > 0 && (
        <KV label="Labels">
          <TagList items={c.labels} />
        </KV>
      )}
      {c.pix.map((p) => (
        <KV key={p.label} label={p.label}>
          {p.valeur}
        </KV>
      ))}
    </Section>
  );
}

function Sources({ c }: { c: College }) {
  const { dataset } = useData();
  return (
    <Section title="Sources">
      <p className="text-xs text-zinc-600">
        UAI {c.uai} · données générées le {new Date(dataset.generatedAt).toLocaleDateString('fr-FR')}. Indicateurs : brevet{' '}
        {dataset.sessions.brevet.join(', ')}, IPS rentrée {dataset.sessions.ips}, effectifs rentrée {dataset.sessions.effectifs}.
      </p>
      <ul className="mt-1 space-y-0.5 text-xs">
        {dataset.sources.map((s) => (
          <li key={s.id}>
            <ExternalLink href={s.url}>{s.label}</ExternalLink> <span className="text-zinc-500">({s.millesime}, {s.licence})</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
