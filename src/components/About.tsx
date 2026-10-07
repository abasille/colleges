import { useData } from '../data';
import { ScoreHelp } from './ScoreHelp';
import { ExternalLink } from './ui';

export function About() {
  const { dataset, events } = useData();
  return (
    <div className="space-y-4">
      <p>
        Outil personnel pour comparer les {dataset.colleges.length} collèges publics et privés de Paris 5e, 6e, 13e, 14e, d’Ivry-sur-Seine et de
        Vitry-sur-Seine, à partir des données publiques. Votre adresse, vos favoris et vos notes restent dans ce navigateur.
      </p>
      <section>
        <h3 className="mb-1 font-semibold">Note maison</h3>
        <ScoreHelp />
      </section>
      <section>
        <h3 className="mb-1 font-semibold">Portes ouvertes et inscriptions</h3>
        <p>
          Les dates sont relevées sur les sites des établissements et vérifiées à la main ; chaque date indique sa source. Beaucoup de collèges publics
          n’annoncent rien en ligne. Saison affichée : {events.saisonCourante}. En cas de doute, contactez l’établissement.
        </p>
      </section>
      <section>
        <h3 className="mb-1 font-semibold">Sources</h3>
        <ul className="space-y-0.5 text-xs">
          {dataset.sources.map((s) => (
            <li key={s.id}>
              <ExternalLink href={s.url}>{s.label}</ExternalLink> <span className="text-zinc-500">({s.millesime}, {s.licence})</span>
            </li>
          ))}
          <li>
            Fond de carte © <ExternalLink href="https://www.openstreetmap.org/copyright">OpenStreetMap</ExternalLink>, ©{' '}
            <ExternalLink href="https://carto.com/attributions">CARTO</ExternalLink> · Géocodage : Géoplateforme (IGN)
          </li>
        </ul>
        <p className="mt-2 text-xs text-zinc-600">
          Données générées le {new Date(dataset.generatedAt).toLocaleDateString('fr-FR')} et publiées sous licence ODbL ; code sous licence MIT —{' '}
          <ExternalLink href="https://github.com/abasille/colleges">github.com/abasille/colleges</ExternalLink>.
        </p>
      </section>
    </div>
  );
}
