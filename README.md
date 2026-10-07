# Collèges · Paris 5e, 6e, 13e, 14e, Ivry-sur-Seine, Vitry-sur-Seine

Carte et comparateur des 60 collèges publics et privés de ces six zones, construit à partir de données publiques.

**Site** : https://abasille.github.io/colleges/

- Liste filtrable et triable, carte, et fiche détaillée de chaque collège : brevet, valeur ajoutée, IPS, effectifs, langues et options, continuité jusqu'au bac, lycées de secteur.
- Note « maison » sur 20, à la formule transparente : brevet, note à l'écrit et valeur ajoutée, comparés à tous les collèges de France.
- Recherche d'adresse : distance à chaque collège et collège de secteur.
- Calendrier des portes ouvertes et des inscriptions, avec export `.ics`.
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
```

Chaque push sur `main` déploie le site sur GitHub Pages (`.github/workflows/deploy.yml`).

## Mettre à jour les données

- **Indicateurs** (une fois par an, après la publication des résultats du brevet et de l'IPS) : lancer `npm run data`, relire `data/report.md`, puis committer `public/data/`.
- **Corrections manuelles** : le dossier `data/overrides/` contient les étiquettes, la continuité vers le lycée, les événements et les pages surveillées. Ces fichiers l'emportent sur les sources.
- **Portes ouvertes** : une GitHub Action hebdomadaire (`watch-pages.yml`) ouvre un ticket quand une page surveillée change. Il faut alors lancer `/maj-portes-ouvertes` dans Claude Code, qui propose les nouvelles dates à relire avant de les committer.

## Sources

| Données | Producteur | Licence |
|---|---|---|
| Annuaire de l'éducation, indicateurs de valeur ajoutée des collèges (IVAC), résultats au brevet, IPS, effectifs et langues, évaluations de 6e, moyens enseignants, personnels, sections internationales et sportives, labels, cités scolaires, carte scolaire des collèges publics | Ministère de l'Éducation nationale, [data.education.gouv.fr](https://data.education.gouv.fr) | Licence Ouverte 2.0 |
| Idéo-Structures d'enseignement secondaire, Idéo-Actions de dispositif | [ONISEP](https://opendata.onisep.fr) | ODbL |
| Secteurs scolaires des collèges | [Ville de Paris](https://opendata.paris.fr) | ODbL |
| Affectation en 2nde GT 2026 (lycées de secteur) | Académie de Paris | — |
| Contours des communes et arrondissements | [geo.api.gouv.fr](https://geo.api.gouv.fr) | Licence Ouverte 2.0 |
| Géocodage des adresses | Géoplateforme (IGN) | Licence Ouverte 2.0 |
| Fond de carte | © OpenStreetMap, © CARTO | ODbL / CARTO |
| Dates de portes ouvertes et d'inscription | Sites des établissements, relevés à la main (source citée pour chaque date) | — |

Les classements de presse ne sont pas repris, car leurs conditions d'utilisation interdisent la reproduction. La note maison est calculée à partir des mêmes données publiques.

## Licences

- Code : [MIT](LICENSE).
- Données produites (`public/data/`, `data/overrides/`) : [ODbL](data/LICENSE-ODbL.md).

## Vie privée

L'adresse saisie, les favoris et les notes sont stockés uniquement dans le `localStorage` du navigateur. Seule la recherche d'adresse interroge un service externe, le géocodeur de la Géoplateforme.
