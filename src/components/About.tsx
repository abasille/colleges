import { useData } from '../data';
import { ScoreHelp } from './ScoreHelp';
import { ExternalLink } from './ui';

export function About() {
  const { dataset, events } = useData();
  return (
    <div className="space-y-4">
      <p>
        Collèges d’Île-de-France est un outil personnel pour comparer les {dataset.colleges.length} collèges publics et privés des huit départements
        d’Île-de-France (académies de Paris, Créteil et Versailles), à partir des données publiques. Il se partage par lien. Votre adresse, vos
        favoris et vos notes restent dans ce navigateur.
      </p>
      <section>
        <h3 className="mb-1 font-semibold">Collèges suivis et non suivis</h3>
        <p>
          Les données publiques (résultats, IPS, effectifs, options, collège de secteur…) sont calculées pour tous les collèges. Le relevé à la main
          (portes ouvertes, inscriptions du privé, passage garanti au lycée, étiquettes) n’est fait que pour une courte liste de collèges suivis,
          signalés par le badge « suivi ». Pour un collège non suivi, l’absence de date ne signifie pas qu’il n’organise pas de portes ouvertes :
          consultez son site.
        </p>
      </section>
      <section>
        <h3 className="mb-1 font-semibold">Note maison</h3>
        <ScoreHelp />
      </section>
      <section>
        <h3 className="mb-1 font-semibold">Portes ouvertes et inscriptions</h3>
        <p>
          Pour les collèges suivis, les dates sont relevées sur les sites des établissements et vérifiées à la main ; chaque date indique sa source. Le
          calendrier ne couvre que ces collèges. Beaucoup de collèges publics n’annoncent rien en ligne. Saison affichée : {events.saisonCourante}. En
          cas de doute, contactez l’établissement.
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
            Fond de carte Plan IGN et géocodage : <ExternalLink href="https://geoservices.ign.fr/">Géoplateforme (IGN)</ExternalLink>, Licence Ouverte 2.0
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
