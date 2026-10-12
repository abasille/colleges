# Collèges d'Île-de-France

Carte et comparateur des collèges publics et privés des huit départements d'Île-de-France (environ 1 300 collèges), construit à partir de données publiques. C'est un outil personnel, partagé par lien ; la page n'est pas indexée par les moteurs de recherche.

Les données publiques sont calculées pour tous les collèges. Le relevé à la main (portes ouvertes, inscriptions du privé, passage garanti au lycée, étiquettes) est réservé aux **collèges suivis** ([ADR 0001](docs/adr/0001-releve-manuel-reserve-aux-colleges-suivis.md)).

**Site** : https://abasille.github.io/colleges/

- Liste filtrable et triable, carte, et fiche détaillée de chaque collège : brevet, valeur ajoutée, IPS, effectifs, langues et options, continuité jusqu'au bac, lycées de secteur à Paris.
- Note « maison » sur 20, à la formule transparente : brevet, note à l'écrit et valeur ajoutée, comparés à tous les collèges de France.
- Recherche d'adresse : distance à chaque collège et collège de secteur.
- Calendrier des portes ouvertes et des inscriptions des collèges suivis, avec export `.ics`.
- Favoris et notes personnelles, enregistrés dans le navigateur et transférables par lien.

La spécification complète est dans [SPEC.md](SPEC.md).

## Commandes

```sh
npm install
npm run dev            # serveur de développement
npm test               # tests (Vitest)
npm run build          # build statique dans dist/
npm run data           # régénère public/data/ depuis les sources (cache dans data/cache/)
npm run data -- --offline   # idem, sans réseau, à partir du cache
npm run watch-pages    # détecte les pages de portes ouvertes modifiées
npm run suivre -- trouver <nom ou UAI>   # aide de /college-suivre : collège, relevé existant, dates officielles
```

Chaque push sur `main` déploie le site sur GitHub Pages (`.github/workflows/deploy.yml`).

## Mettre à jour les données

- **Indicateurs** (une fois par an, après la publication des résultats du brevet et de l'IPS) : lancer `npm run data`, relire `data/report.md`, puis committer `public/data/`.
- **Corrections manuelles** : le dossier `data/overrides/` contient les étiquettes, la continuité vers le lycée, les événements et les pages surveillées. Ces fichiers l'emportent sur les sources.
- **Collèges suivis** : lancer `/college-suivre <nom ou UAI>` dans Claude Code pour qu'un collège du périmètre devienne suivi. La commande cherche 1 à 3 pages à surveiller (en respectant robots.txt), la formulation de l'établissement sur le passage au lycée avec sa source, les étiquettes et, pour le privé, le statut des inscriptions. Elle signale les dates officielles qui manquent pour le territoire du collège et présente un diff à relire : rien n'est écrit sans validation.
- **Portes ouvertes** : une GitHub Action hebdomadaire (`watch-pages.yml`) ouvre un ticket quand une page surveillée change. Il faut alors lancer `/college-maj-portes-ouvertes` dans Claude Code, qui propose les nouvelles dates à relire avant de les committer. Les sites des collèges publics (pia.ac-paris.fr, Skolengo) refusent les connexions venant de GitHub : l'Action ne surveille en pratique que les sites du privé, et `npm run watch-pages` lancé en local couvre tout.

## Sources

| Données | Producteur | Licence |
|---|---|---|
| Annuaire de l'éducation, indicateurs de valeur ajoutée des collèges (IVAC), résultats au brevet, IPS, effectifs et langues, évaluations de 6e, moyens enseignants, personnels, sections internationales et sportives, labels, cités scolaires, carte scolaire des collèges publics | Ministère de l'Éducation nationale, [data.education.gouv.fr](https://data.education.gouv.fr) | Licence Ouverte 2.0 |
| Idéo-Structures d'enseignement secondaire, Idéo-Actions de dispositif | [ONISEP](https://opendata.onisep.fr) | ODbL |
| Secteurs scolaires des collèges | [Ville de Paris](https://opendata.paris.fr) | ODbL |
| Affectation en 2nde GT 2026 (lycées de secteur) | Académie de Paris | — |
| Contours des communes et arrondissements (millésime 2026, généralisés à 100 m), d'après Admin Express (IGN) | Etalab, [Contours administratifs](https://www.data.gouv.fr/datasets/contours-administratifs) sur data.gouv.fr | ODbL |
| Géocodage des adresses | Géoplateforme (IGN) | Licence Ouverte 2.0 |
| Fond de carte | Plan IGN, Géoplateforme (IGN) | Licence Ouverte 2.0 |
| Dates de portes ouvertes et d'inscription | Sites des établissements, relevés à la main (source citée pour chaque date) | — |

Les classements de presse ne sont pas repris, car leurs conditions d'utilisation interdisent la reproduction. La note maison est calculée à partir des mêmes données publiques.

## Licences

- Code : [MIT](LICENSE).
- Données produites (`public/data/`, `data/overrides/`) : [ODbL](data/LICENSE-ODbL.md).

## Vie privée

L'adresse saisie, les favoris et les notes sont stockés uniquement dans le `localStorage` du navigateur. Seule la recherche d'adresse interroge un service externe, le géocodeur de la Géoplateforme.
