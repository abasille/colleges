# Collèges — spécification

Application web statique pour choisir un collège à Paris 5e, 6e, 13e, 14e, Ivry-sur-Seine et Vitry-sur-Seine. Spécification validée le 2026-10-08.

## 1. Cadre

- **Usage** : outil personnel / familial. Pas de comptes. Interface en français uniquement.
- **Hébergement** : dépôt public `abasille/colleges`, site sur GitHub Pages (`https://abasille.github.io/colleges/`), déployé par GitHub Actions à chaque push sur `main`. Page en `noindex`.
- **Licences** : code sous MIT (`LICENSE`), base de données produite sous ODbL (`data/LICENSE-ODbL.md`) car elle intègre des données ONISEP et Paris Open Data (ODbL, partage à l'identique). Données du ministère sous Licence Ouverte 2.0. Le README cite chaque source.
- **Vie privée** : l'adresse saisie, les favoris et les notes restent dans le navigateur (`localStorage`). Ils ne sont jamais écrits dans le dépôt.

## 2. Périmètre

- Communes configurées dans `data/config.json` : 75105, 75106, 75113, 75114, 94041, 94081.
- Collèges = annuaire de l'éducation, `code_nature` 340 (collège) ou 352 (collège spécialisé) : **60 établissements** (37 publics, 17 privés sous contrat, 6 hors contrat).
- Exclus : EREA Croce Spinelli (0752799K) ; UAI hors contrat sans classes de collège ou doublons (0755367B, 0753845X, 0753146M, 0755084U).
- Étiquettes saisies dans les corrections manuelles :
  - « recrutement particulier » : Rognoni (0750407K), Regain Tournesol (0754861B), Morvan (0752916M), Saint-Louis (0754008Z, collège de réadaptation), Paris FC Collège (0756057B) ;
  - « pas d'entrée en 6e » : École Diagonale (4e–3e), Cours Montaigne (3e), Paris FC Collège (4e–3e). Filtre « accueille en 6e » coché par défaut ;
  - note : Saint-Sulpice (0752924W) et Sainte-Geneviève (0752925X) fusionnent en septembre 2027 (« Ensemble Adélaïde de Cicé », 64 rue d'Assas).

## 3. Architecture

- **Front** : Vite + React + TypeScript, Leaflet (react-leaflet), fond Plan IGN (Géoplateforme, sans clé). Site 100 % statique.
- **Données** : `npm run data` (scripts TypeScript dans `scripts/data/`) télécharge les sources (cache local ignoré par git), fusionne sur l'UAI, applique les corrections manuelles (`data/overrides/`), calcule les indicateurs et la note, puis écrit `public/data/*.json` (versionnés) et un rapport d'anomalies `data/report.md`. Mise à jour lancée à la main, une fois par an pour les indicateurs.
- **Contrat de données** : `src/types.ts` décrit le format de `public/data/colleges.json`. Le script et le front s'y conforment.
- **Tests** (Vitest) : jointures, valeurs manquantes, calcul de la note, logique des filtres et tris.

## 4. Sources

API Opendatasoft `https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/<id>/exports/json` (sans clé, Licence Ouverte) sauf mention contraire. Jointure toujours sur l'UAI (les noms varient d'un jeu à l'autre).

| Thème | Jeu de données | Années |
|---|---|---|
| Identité, géoloc, contacts, REP, ULIS/SEGPA, restauration | `fr-en-annuaire-education` | courant |
| Brevet, valeur ajoutée, note à l'écrit, mentions, accès 6e→3e | `fr-en-indicateurs-valeur-ajoutee-colleges` (IVAC, national pour les centiles et moyennes) | 2022–2025 |
| Historique brevet | `fr-en-dnb-par-etablissement` | 2015–2021 |
| IPS | `fr-en-ips-colleges-ap2023`, `fr-en-ips-colleges-ap2022`, `fr-en-ips_colleges` | 2016–2025 |
| Effectifs, LV1/LV2 | `fr-en-college-effectifs-niveau-sexe-lv` (clé `numero_college`) | 2019–2025 |
| Évaluations 6e | `fr-en-evaluations_nationales_6eme_par_etablissement` | 2025 (+ historique) |
| Taux d'encadrement | `fr-en-moyens_enseignants_2d_public`, `fr-en-moyens_enseignants_2d_prive` | 2023–2025 |
| Personnel | `fr-en-indicateurs_personnels_etablissements2d` | 2024 |
| Demi-pension | `fr-en-mode-hebergement-eleves-etablissements-2d` | 2025 |
| Sections internationales, sportives, sport-études | `fr-en-sections-internationales`, `fr-en-sections-sportives-scolaires`, `fr-en-sport-etudes` | courant |
| Labels | `fr-en-etablissements-labellises-generation-2030`, `…-euroscol`, `fr-en-label-egalite-fille-garcon`, `fr-en-cites_educatives` | courant |
| Pix | `fr-en-pix_resultats_des_campagnes_de_rentree_par_eple` | dernier |
| Cités scolaires (continuité) | `fr-en-cites_scolaires` (+ SIREN commun dans l'annuaire pour le privé) | courant |
| 2nde GT sur place | `fr-en-lycee_gt-effectifs-niveau-sexe-lv` | 2025 |
| Options, langues anciennes, LCE, bilangue, CHA, dispositifs | ONISEP (ODbL) : Idéo-Structures `api.opendata.onisep.fr/downloads/5fa5816ac6a6e/5fa5816ac6a6e.csv`, Idéo-Actions de dispositif IDF `…/5fa532b036477/5fa532b036477.zip` | courant |
| Secteurs Paris (polygones, sans UAI → jointure par nom) | opendata.paris.fr `secteurs-scolaires-colleges` (ODbL) | 2026-2027 |
| Secteurs Ivry/Vitry (plages d'adresses) | `fr-en-carte-scolaire-colleges-publics` | 2025 |
| Lycées de secteur 1 (Paris) | ArcGIS `services9.arcgis.com/ekT8MJFiVh8nvlV5/arcgis/rest/services/Affectation_Lycées/FeatureServer/0` | 2026 |
| Contours arrondissements / communes | `geo.api.gouv.fr` | courant |
| Géocodage (navigateur) | Géoplateforme `data.geopf.fr/geocodage/search` (CORS ouvert) | — |

Abandonné : orientation après la 3e (données arrêtées en 2019). Classements presse : non repris (CGU, robots.txt) — remplacés par la note maison.

## 5. Indicateurs

- **Valeurs de référence** : brevet et valeur ajoutée = moyenne des 3 dernières sessions (2023–2025), dernière session affichée à côté. IPS, effectifs, encadrement = dernière année.
- **Historique** dans la fiche : brevet 2015–2025 (rupture 2022 signalée : DNB tous candidats → IVAC série générale), IPS 2016–2025, effectifs 2019–2025.
- **Comparaisons** : chaque résultat est comparé à la moyenne de l'académie et de la France (calculées depuis l'IVAC national, pondérées par le nombre de candidats ; IPS : moyennes fournies par le jeu).
- **Note maison /20** :
  - 3 composantes à poids égal : taux de réussite au brevet (moyenne 3 ans), note à l'écrit (moyenne 3 ans), valeur ajoutée (moyenne 3 ans de la VA du taux et de la VA de la note) ;
  - chaque composante = centile du collège parmi tous les collèges de France × 20 ;
  - note = moyenne des composantes disponibles (« partielle » si une manque, absente si moins de 2) ;
  - lettre : A ≥ 16, B ≥ 12, C ≥ 8, D ≥ 4, E < 4 ; rang dans la zone ;
  - l'IPS n'entre pas dans la note ; un bouton « ? » explique la formule.
- **Données manquantes** : affichées « — » avec la raison (« hors contrat : non publié », « effectif trop faible », « non publié »). Toujours en dernier dans les tris. Masquées quand un filtre numérique est actif, sauf case « inclure les collèges sans donnée ».
- **Continuité jusqu'au bac** — deux attributs distincts :
  1. *Lycée dans le même établissement* (détecté automatiquement) : `cite_scolaire` / `meme_etablissement_prive` / `groupe_scolaire_autre_site` / `aucun`, avec le lycée, ses voies, et « 2nde GT sur place » seulement si le lycée en a (exclut Villon) ;
  2. *Passage garanti* (manuel) : formulation et source de l'établissement s'il s'engage ; sinon « admission via Affelnet, sans priorité » (cité scolaire publique), « poursuite habituelle, non garantie par écrit » (privé), « lycée hors contrat (bac sans contrôle continu) ».
- **Lycées de secteur 1 Affelnet 2026** (collèges publics parisiens) : affichés dans la fiche « si c'est votre collège de secteur ». Ivry/Vitry : « non disponible ».

## 6. Interface

- **Ordinateur** : 3 colonnes — liste (≈ 360 px, filtres au-dessus) | centre avec bascule **Carte / Calendrier** | fiche à droite (fermable). Bandeau « À venir pour vos favoris » en haut (3 prochains événements, échéances < 14 jours en rouge).
- **Téléphone** : onglets Liste / Carte / Calendrier ; fiche en panneau montant depuis le bas.
- **Liste** : une carte par collège — nom, statut, commune, brevet, IPS, VA, critère de tri en cours, étoile favori. Sélection synchronisée liste ↔ carte.
- **Filtres et tris** : curseur de plage + tri pour les nombres (brevet, VA, note à l'écrit, note maison, IPS, effectif, élèves par classe, évaluations 6e, distance) ; cases pour les catégories (statut, commune, REP, recrutement particulier, accueille en 6e, lycée sur place, passage garanti, favoris) ; « propose… » pour les options (ET logique) ; recherche par nom. Filtres actifs en pastilles, compteur « n / 60 ». Les filtres s'appliquent à la liste, la carte et le calendrier. État dans l'URL.
- **Carte** : couleur par statut par défaut, menu « Colorer par » (statut, brevet, IPS, VA, note) ; collège sélectionné mis en avant ; repère favori ; marqueurs domicile et collège de secteur ; contours des 6 zones ; à Paris, polygone du secteur de l'adresse saisie.
- **Adresse** : recherche Géoplateforme, distance à vol d'oiseau, tri par distance, collège de secteur (polygones Paris ; plages d'adresses Ivry/Vitry).
- **Fiche** (ordre) : en-tête (nom, étiquettes, favori, adresse, site, téléphone, distance, ✓ collège de secteur) → note et rang → résultats (avec historique et comparaisons) → profil (IPS, effectifs, élèves par classe, évaluations 6e) → options → lycée et continuité → événements → mes notes → autres (personnel, labels, Pix) → sources et année des données.
- **Favoris et notes** : `localStorage` ; étoile depuis la liste, la carte et la fiche ; lien « Partager mes favoris » pour importer favoris + notes sur un autre appareil.

## 7. Calendrier des événements

- **Types** : `portes_ouvertes`, `reunion_information`, `immersion`, `inscription` (privé : ouverture, clôture, tests, entretiens), `date_limite` (sections internationales, CHA…), `officiel` (académies). Couleur par type, filtrables, échéances mises en évidence.
- **Vues** : Liste chronologique groupée par mois (défaut, passés grisés) et Mois (grille). Clic → sélection du collège. Export `.ics` des événements affichés.
- **Saison** : le calendrier n'affiche que les dates confirmées de la saison en cours (2026-27, entrée en 6e en septembre 2027). La fiche montre les dates de l'an dernier à titre indicatif et le statut des inscriptions du privé (ouvertes / closes / pas encore annoncées).
- **Dates officielles** des académies de Paris et de Créteil (DAFNE, dérogations, résultats d'affectation, inscriptions), chacune avec sa case cochée par défaut.
- **Fichier** : `data/overrides/events.json` (source, date de vérification, confiance pour chaque événement).
- **Mise à jour** :
  - `data/overrides/watch.json` : 1 à 3 pages surveillées par collège ;
  - commande Claude Code `/maj-portes-ouvertes` (`.claude/commands/`) : consulte les pages, extrait les dates, propose un diff à relire ;
  - GitHub Action hebdomadaire `watch-pages` : détecte les pages modifiées (empreinte du texte) et ouvre un ticket ;
  - toujours respecter robots.txt ; une page interdite est marquée « à vérifier à la main ».

## 8. Hors périmètre (v1)

Comparaison côte à côte, synchronisation serveur des favoris, temps de trajet, notifications e-mail, orientation après la 3e.

## 9. À vérifier à la main

- Notre-Dame de Sion : robots.txt bloque ClaudeBot (passage au lycée, inscriptions).
- École alsacienne : domaine `ecole-alsacienne.org` hors service le 2026-10-07.
- Saint-Louis : `college-st-louis.org` est un domaine parqué.
- 9 privés sous contrat sans formulation sur le passage au lycée.
