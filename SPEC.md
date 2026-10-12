# Collèges d'Île-de-France — spécification

Application web statique pour choisir un collège en Île-de-France, à partir des données publiques et de quelques informations relevées à la main. Première version (six communes) validée le 2026-10-08 ; extension à toute l'Île-de-France décidée le 2026-10-12 (ticket #2). Le vocabulaire est celui de [GLOSSARY.md](GLOSSARY.md) ; les décisions structurantes sont dans [docs/adr/](docs/adr/).

## 1. Cadre

- **Usage** : outil personnel / familial, partagé par lien. Pas de comptes. Interface en français uniquement.
- **Hébergement** : dépôt public `abasille/colleges`, site sur GitHub Pages (`https://abasille.github.io/colleges/`), déployé par GitHub Actions à chaque push sur `main`. Page en `noindex`.
- **Licences** : code sous MIT (`LICENSE`), base de données produite sous ODbL (`data/LICENSE-ODbL.md`) car elle intègre des données ONISEP, Paris Open Data et les contours des communes d'Etalab (ODbL, partage à l'identique). Données du ministère sous Licence Ouverte 2.0. Le README cite chaque source. Le dépôt étant public, on n'y publie aucune donnée sans licence (voir [ADR 0003](docs/adr/0003-lycee-de-secteur-limite-a-paris.md)).
- **Vie privée** : l'adresse saisie, les favoris et les notes restent dans le navigateur (`localStorage`). Ils ne sont jamais écrits dans le dépôt.

## 2. Périmètre

- **Départements** : les huit départements d'Île-de-France (75, 77, 78, 91, 92, 93, 94, 95), listés dans `data/config.json`. La configuration ne contient plus de liste de communes.
- **Sélection dans l'annuaire de l'éducation** : département parmi les huit, `code_nature` 340 (collège) ou 352 (collège spécialisé), établissement ouvert. Les trois statuts sont retenus : public, privé sous contrat, hors contrat.
- **Taille** (2026-10-12) : **1 292 collèges** dans 422 communes et trois académies — Paris 217, Créteil 476, Versailles 600.

  | Département | Public | Privé sous contrat | Hors contrat | Total |
  |---|---|---|---|---|
  | 75 | 114 | 65 | 38 | 217 |
  | 77 | 135 | 18 | 9 | 162 |
  | 78 | 116 | 25 | 22 | 163 |
  | 91 | 102 | 20 | 8 | 130 |
  | 92 | 99 | 35 | 20 | 154 |
  | 93 | 131 | 28 | 12 | 171 |
  | 94 | 108 | 24 | 11 | 143 |
  | 95 | 115 | 26 | 12 | 153 |

  Le tableau compte 1 293 lignes pour 1 292 UAI : l'UAI 0951509Z figure deux fois (Sarcelles et son annexe de Garges).
- **Doublons d'UAI** : fusionnés en gardant le site principal.
- **Exclusions** : une liste d'UAI dans les corrections manuelles permet d'écarter au cas par cas un établissement qui n'est pas vraiment un collège. Elle est vide en pratique.
- **Commune** : code INSEE et libellé ; à Paris, l'arrondissement tient lieu de commune (« Paris 13e »).
- **Académie** : lue dans l'annuaire (`Paris`, `Créteil` ou `Versailles`), et non dans la configuration.

## 3. Collèges suivis

Le relevé manuel est réservé aux **collèges suivis** ; les autres collèges du périmètre n'ont que les données publiques (voir [ADR 0001](docs/adr/0001-releve-manuel-reserve-aux-colleges-suivis.md)).

- **Liste** : une liste explicite d'UAI dans les corrections manuelles, initialisée avec les 60 collèges de la première version (Paris 5e, 6e, 13e, 14e, Ivry-sur-Seine, Vitry-sur-Seine). Elle ne dépend pas des pages surveillées : 4 des 60 n'en ont pas.
- **Ce qui est relevé** : portes ouvertes et autres événements, inscriptions du privé, passage garanti au lycée, étiquettes.
- **Affichage** : badge « suivi » dans la liste, la bulle de la carte et la fiche ; case « collèges suivis » dans les filtres. Pour un collège non suivi, la fiche indique « Portes ouvertes non relevées : voir le site du collège » et « Passage au lycée : non renseigné ». Le calendrier annonce qu'il ne couvre que les collèges suivis.
- **Ajout** : commande Claude Code `/college-suivre <nom ou UAI>`. Elle ajoute l'UAI à la liste, cherche 1 à 3 pages à surveiller (en respectant robots.txt), la formulation de l'établissement sur le passage au lycée avec sa source, les étiquettes et, pour le privé, le statut des inscriptions. Elle signale s'il manque des dates officielles pour le territoire du collège, présente un diff à relire et n'écrit rien sans validation.

## 4. Étiquettes

- **Accueil en 6e** : détecté automatiquement. Il est faux si l'effectif de 6e vaut 0 à la dernière rentrée connue (public et privé sous contrat). Il est supposé vrai quand la donnée manque, en particulier pour le hors contrat. Filtre « accueille en 6e » coché par défaut.
- **Recrutement particulier** : détecté automatiquement pour un collège public dont l'UAI est absent de la carte scolaire nationale alors que sa commune y figure. Une commune absente de la carte ne déclenche jamais la règle. Libellé générique : « sans secteur : recrutement sur dossier ». Exemples : Rognoni, Légion d'honneur, collège international et collège franco-allemand des Yvelines, École de danse de l'Opéra, Decroly.
- **Corrections manuelles** : elles l'emportent toujours sur les détections automatiques et peuvent donner un libellé précis. Saisies pour les collèges suivis :
  - « recrutement particulier » : Rognoni (0750407K), Regain Tournesol (0754861B), Morvan (0752916M), Saint-Louis (0754008Z, collège de réadaptation), Paris FC Collège (0756057B) ;
  - « pas d'entrée en 6e » : École Diagonale (4e–3e), Cours Montaigne (3e), Paris FC Collège (4e–3e) ;
  - note : Saint-Sulpice (0752924W) et Sainte-Geneviève (0752925X) fusionnent en septembre 2027 (« Ensemble Adélaïde de Cicé », 64 rue d'Assas).

## 5. Architecture

- **Front** : Vite + React + TypeScript, Leaflet (react-leaflet), fond Plan IGN (Géoplateforme, sans clé). Site 100 % statique.
- **Données** : `npm run data` (scripts TypeScript dans `scripts/data/`) charge les sources (réseau, ou cache local ignoré par git avec `--offline`), appelle `assemblerDataset`, puis écrit `public/data/*` (versionnés) et un rapport `data/report.md`. Mise à jour lancée à la main, une fois par an pour les indicateurs.
- **`assemblerDataset`** : reçoit les lignes déjà chargées de chaque source, les corrections manuelles (collèges, continuité, collèges suivis, exclusions) et la configuration. Il produit le fichier léger, les détails par département, la carte scolaire compacte par département, les secteurs parisiens reliés, les références par académie et pour la France, et les données du rapport. Il ne fait aucun accès réseau.
- **Requêtes vers les sources** : toute requête filtrée par liste d'UAI est découpée en lots ou remplacée par un filtre sur le département, pour rester sous la limite de longueur d'URL.
- **Contrat de données** : `src/types.ts` décrit le format des fichiers publiés. Le pipeline et le front s'y conforment.
- **Tests** (Vitest) : par les interfaces publiques (`assemblerDataset`, `findSecteur`, filtres et tris, état de l'URL), avec de petites lignes écrites à la main et sans réseau.

## 6. Chargement à la demande

Le périmètre est trop gros pour un seul fichier chargé au démarrage (environ 10 Mo). Les données publiées sont découpées :

- **Fichier léger**, chargé au démarrage, en JSON minifié (objectif : environ 1 Mo non compressé). Pour chaque collège, seulement ce dont la liste, la carte, les filtres, les tris et les couleurs ont besoin : UAI, nom, statut et contrat ; commune, département, académie et coordonnées ; indicateurs des filtres et tris ; note, lettre, rang et total ; étiquettes et REP ; collège suivi ; catégories de lycée sur place et de passage ; codes d'options.
- **Détails par département** : un fichier par département, chargé à l'ouverture de la première fiche de ce département (historiques, continuité détaillée, Affelnet, personnel, Pix, labels, sources). Les fiches suivantes du même département s'ouvrent sans attente.
- **Carte scolaire** : un fichier compact par département, chargé seulement après la saisie d'une adresse, pour le département de cette adresse. Chaque ligne : commune, voie normalisée, début, fin, parité, UAI. Les lignes « secteur unique » sont conservées.
- **Polygones parisiens** : chargés seulement pour une adresse parisienne.
- **Contours** : chargés et affichés seulement pour les communes sélectionnées dans le filtre.
- **Rendu** : carte dessinée en canvas (sans marqueur DOM par collège, sans regroupement, objets non recréés à chaque rendu) ; liste virtualisée ; distances et collège de secteur recalculés seulement quand l'adresse change.

## 7. Sources

API Opendatasoft `https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/<id>/exports/json` (sans clé, Licence Ouverte) sauf mention contraire. Jointure toujours sur l'UAI (les noms varient d'un jeu à l'autre). Attention : `count(distinct …)` y est approximatif, il faut compter avec `group_by`.

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
| Cités scolaires (continuité) | `fr-en-cites_scolaires` (+ SIREN commun dans l'annuaire pour le privé), sur les huit départements | courant |
| 2nde GT sur place | `fr-en-lycee_gt-effectifs-niveau-sexe-lv` | 2025 |
| Options, langues anciennes, LCE, bilangue, CHA, dispositifs | ONISEP (ODbL) : Idéo-Structures `api.opendata.onisep.fr/downloads/5fa5816ac6a6e/5fa5816ac6a6e.csv`, Idéo-Actions de dispositif IDF `…/5fa532b036477/5fa532b036477.zip` | courant |
| Secteurs de Paris (polygones, sans UAI → jointure par nom) | opendata.paris.fr `secteurs-scolaires-colleges` (ODbL) | 2026-2027 |
| Carte scolaire nationale (plages d'adresses, hors Paris ; contrôle croisé à Paris) | `fr-en-carte-scolaire-colleges-publics` (Licence Ouverte 2.0) | rentrée 2026 |
| Lycées de secteur 1 (Paris) | ArcGIS `services9.arcgis.com/ekT8MJFiVh8nvlV5/arcgis/rest/services/Affectation_Lycées/FeatureServer/0` | 2026 |
| Contours des communes (arrondissements à Paris) | Etalab `contours-administratifs` simplifiés (`etalab-datasets.geo.data.gouv.fr/contours-administratifs/`, millésime 2026, environ 100 m de précision, d'après Admin Express IGN ; ODbL 1.0, jeu [`contours-administratifs`](https://www.data.gouv.fr/datasets/contours-administratifs) sur data.gouv.fr) | 2026 |
| Géocodage (navigateur) | Géoplateforme `data.geopf.fr/geocodage/search` (CORS ouvert), résultats centrés sur l'Île-de-France | — |

- **Carte scolaire nationale** : valable pour la rentrée 2026 d'après la description du jeu (les métadonnées « 2021-2023 » sont périmées). 78 407 lignes en Île-de-France, dont 1 037 lignes « secteur unique » sans nom de voie. Couverture des collèges publics : complète dans le 77, le 91 et le 95 ; dans le 75, le 78, le 92 et le 94, il ne manque que les collèges à recrutement particulier ; dans le 93, 10 communes sont absentes.
- **Couverture des données ouvertes** : l'IVAC (session 2025) couvre 1 128 des 1 161 collèges publics et privés sous contrat ; l'IPS, les effectifs et les évaluations de 6e en couvrent la quasi-totalité. Aucun jeu ne couvre le hors contrat.

Abandonné : orientation après la 3e (données arrêtées en 2019). Classements presse : non repris (CGU, robots.txt) — remplacés par la note maison.

## 8. Indicateurs

- **Données ouvertes** : calculées pour tous les collèges du périmètre.
- **Valeurs de référence** : brevet et valeur ajoutée = moyenne des 3 dernières sessions (2023–2025), dernière session affichée à côté. IPS, effectifs, encadrement = dernière année.
- **Historique** dans la fiche : brevet 2015–2025 (rupture 2022 signalée : DNB tous candidats → IVAC série générale), IPS 2016–2025, effectifs 2019–2025.
- **Comparaisons** : chaque résultat est comparé à la moyenne de l'académie (Paris, Créteil ou Versailles) et de la France, calculées depuis l'IVAC national et pondérées par le nombre de candidats ; IPS : moyennes fournies par le jeu.
- **Note maison /20** :
  - 3 composantes à poids égal : taux de réussite au brevet (moyenne 3 ans), note à l'écrit (moyenne 3 ans), valeur ajoutée (moyenne 3 ans de la VA du taux et de la VA de la note) ;
  - chaque composante = centile du collège parmi tous les collèges de France × 20 ;
  - note = moyenne des composantes disponibles (« partielle » si une manque, absente si moins de 2) ;
  - lettre : A ≥ 16, B ≥ 12, C ≥ 8, D ≥ 4, E < 4 ;
  - rang parmi tous les collèges notés du périmètre, affiché « Ne sur N en Île-de-France » ;
  - l'IPS n'entre pas dans la note ; un bouton « ? » explique la formule.
- **Données manquantes** : affichées « — » avec la raison (« hors contrat : non publié », « effectif trop faible », « non publié »). Pour un collège hors contrat, la fiche dit clairement qu'aucune donnée n'est publiée. Toujours en dernier dans les tris. Masquées quand un filtre numérique est actif, sauf case « inclure les collèges sans donnée ».
- **Continuité jusqu'au bac** — deux attributs distincts :
  1. *Lycée dans le même établissement* (détecté automatiquement pour tout le périmètre, avec un index par commune ou par adresse normalisée) : `cite_scolaire` / `meme_etablissement_prive` / `groupe_scolaire_autre_site` / `aucun`, avec le lycée, ses voies, et « 2nde GT sur place » seulement si le lycée en a ;
  2. *Passage garanti* (manuel, collèges suivis) : formulation et source de l'établissement s'il s'engage ; sinon « admission via Affelnet, sans priorité » (cité scolaire publique), « poursuite habituelle, non garantie par écrit » (privé), « lycée hors contrat (bac sans contrôle continu) ». Collège non suivi : « non renseigné ».

## 9. Collège de secteur

Deux mécanismes, selon le département de l'adresse (voir [ADR 0002](docs/adr/0002-deux-mecanismes-de-college-de-secteur.md)) : les polygones de la Ville à Paris, la carte scolaire nationale ailleurs.

`findSecteur` (front) reçoit l'adresse géocodée et les sources de secteur chargées : polygones parisiens, carte scolaire du département, fichier léger (pour trouver le seul collège public d'une commune). Le résultat indique sa `methode` : `polygone`, `adresse`, `commune_entiere` ou `deduit`. Les règles s'appliquent dans cet ordre :

1. Adresse hors des huit départements : aucun collège de secteur, message « hors Île-de-France ». Les distances restent affichées.
2. Adresse à Paris : polygone qui contient le point, sinon polygone le plus proche à moins de 60 m. Le polygone du secteur est affiché sur la carte.
3. Ailleurs, lignes de la carte nationale pour la commune :
   - commune formant un seul secteur : son ou ses collèges, même si la rue n'est pas reconnue (`commune_entiere`) ;
   - sinon, comparaison de la voie normalisée et du numéro (bornes et parité). Si plusieurs collèges correspondent, ils sont tous renvoyés (secteur partagé). Sans numéro, ce sont tous les collèges de la voie, avec « précisez le numéro » s'il y en a plusieurs. Sans rue, message « précisez la rue » ;
   - commune qui a à la fois des voies listées et une ligne « secteur unique » : une adresse dont la voie et le numéro ne correspondent à aucune ligne reçoit le collège du reste de la commune (`commune_entiere`, mention « adresse absente des voies listées »).
4. Commune absente de la carte : si elle compte exactement un collège public dans le périmètre, il est renvoyé avec la mention « déduit : seul collège public de la commune » (`deduit`) — cas de neuf communes du 93. Sinon (Coubron), message « secteur inconnu pour cette commune ».
5. Rue introuvable : message explicite.

**Pipeline** : les 110 secteurs parisiens sont reliés aux collèges publics de Paris par correspondance de noms ; un secteur sans collège est signalé dans le rapport. La carte nationale sert de contrôle croisé à Paris : les UAI présents d'un côté et absents de l'autre sont signalés. Les tronçons identiques qui renvoient à plusieurs collèges (399 à Paris, 128 dans le 94, 115 dans le 91, 50 dans le 93) sont traités comme des secteurs partagés.

## 10. Lycée de secteur

Limité à Paris (voir [ADR 0003](docs/adr/0003-lycee-de-secteur-limite-a-paris.md)).

- **Paris** : lycées de secteur 1 Affelnet 2026 pour tous les collèges publics parisiens, affichés dans la fiche « si c'est votre collège de secteur ».
- **Hors Paris** : la fiche indique « non disponible », avec un texte propre à l'académie et un lien vers l'outil officiel qui donne le lycée de secteur selon l'adresse :
  - Versailles : recherche du rectorat, <https://bv.ac-versailles.fr/rechetab/lycees-de-secteur-proximite.html> ;
  - Créteil : page de sectorisation de la direction départementale — Val-de-Marne : <https://www.dsden94.ac-creteil.fr/spip.php?article5005> ; Seine-et-Marne et Seine-Saint-Denis : page à trouver, sinon site de l'académie de Créteil.

## 11. Interface

- **Ordinateur** : 3 colonnes — liste (≈ 360 px, filtres au-dessus) | centre avec bascule **Carte / Calendrier** | fiche à droite (fermable). Bandeau « À venir pour vos favoris » en haut (3 prochains événements, échéances < 14 jours en rouge).
- **Téléphone** : onglets Liste / Carte / Calendrier ; fiche en panneau montant depuis le bas.
- **Liste** : une carte par collège — nom, statut, commune, brevet, IPS, VA, critère de tri en cours, badge « suivi », étoile favori. Sélection synchronisée liste ↔ carte.
- **Sélection** : filtre « commune ou département » par autocomplétion, à choix multiples affichés en pastilles ; un arrondissement se cherche comme une commune (« Paris 13e »). Sans sélection, toute l'Île-de-France est affichée.
- **Filtres et tris** : curseur de plage + tri pour les nombres (brevet, VA, note à l'écrit, note maison, IPS, effectif, élèves par classe, évaluations 6e, distance) ; cases pour les catégories (statut, REP, recrutement particulier, accueille en 6e, lycée sur place, passage garanti, collèges suivis, favoris) ; « propose… » pour les options (ET logique) ; recherche par nom, qui trouve aussi le nom de la commune. Filtres actifs en pastilles, compteur « n / total ». Les filtres s'appliquent à la liste, la carte et le calendrier.
- **URL** : l'état (sélection, filtres, tri) est dans l'URL. Les codes de commune des anciens liens restent acceptés ; un paramètre porte les départements ; un code inconnu est ignoré sans erreur.
- **Carte** : cadrée au départ sur l'Île-de-France, puis sur les collèges retenus par les filtres. Chaque collège est un point coloré, sans regroupement ; couleur par statut par défaut, menu « Colorer par » (statut, brevet, IPS, VA, note) ; collège sélectionné mis en avant ; repère favori ; marqueurs domicile et collège de secteur ; contours des communes sélectionnées ; à Paris, polygone du secteur de l'adresse saisie.
- **Adresse** : recherche Géoplateforme, distance à vol d'oiseau, filtre et tri par distance, collège de secteur (§ 9).
- **Fiche** (ordre) : en-tête (nom, étiquettes, badge « suivi », favori, adresse, site, téléphone, distance, ✓ collège de secteur) → note et rang → résultats (avec historique et comparaisons) → profil (IPS, effectifs, élèves par classe, évaluations 6e) → options → lycée et continuité → événements → mes notes → autres (personnel, labels, Pix) → sources et année des données.
- **Favoris et notes** : `localStorage` ; étoile depuis la liste, la carte et la fiche ; lien « Partager mes favoris » pour importer favoris + notes sur un autre appareil.

## 12. Calendrier des événements

- **Couverture** : seulement les collèges suivis ; le calendrier l'annonce.
- **Types** : `portes_ouvertes`, `reunion_information`, `immersion`, `inscription` (privé : ouverture, clôture, tests, entretiens), `date_limite` (sections internationales, CHA…), `officiel` (dates officielles). Couleur par type, filtrables, échéances mises en évidence.
- **Vues** : Liste chronologique groupée par mois (défaut, passés grisés) et Mois (grille). Clic → sélection du collège. Export `.ics` des événements affichés.
- **Saison** : le calendrier n'affiche que les dates confirmées de la saison en cours (2026-27, entrée en 6e en septembre 2027). La fiche montre les dates de l'an dernier à titre indicatif et le statut des inscriptions du privé (ouvertes / closes / pas encore annoncées).
- **Dates officielles par territoire** : chaque date officielle (DAFNE, dérogations, inscriptions, résultats d'affectation) porte un territoire — une académie ou un département, selon qui la publie (rectorat ou direction départementale). Les dates du Val-de-Marne sont rattachées au département 94. Le calendrier affiche une case par territoire présent dans les données, cochée par défaut. On ne saisit des dates que pour les territoires des collèges suivis.
- **Fichier** : `data/overrides/events.json` (source, date de vérification, confiance pour chaque événement).
- **Mise à jour** :
  - `data/overrides/watch.json` : 1 à 3 pages surveillées par collège suivi ;
  - commande Claude Code `/college-maj-portes-ouvertes` (`.claude/commands/`) : consulte les pages, extrait les dates, propose un diff à relire ;
  - GitHub Action hebdomadaire `watch-pages`, limitée aux collèges suivis : détecte les pages modifiées (empreinte du texte) et ouvre un ticket. Les sites des collèges publics refusent les connexions venant de GitHub : `npm run watch-pages` lancé en local couvre tout ;
  - toujours respecter robots.txt ; une page interdite est marquée « à vérifier à la main ».

## 13. Rapport de données

`data/report.md`, relu à chaque mise à jour annuelle :

- totaux par département et par statut ;
- anomalies : jointures ratées par source, secteurs parisiens non reliés, écarts entre les polygones parisiens et la carte nationale, collèges publics sans secteur, doublons, données manquantes inattendues ;
- détail complet limité aux collèges suivis.

## 14. Hors périmètre

- Le relevé manuel des quelque 1 230 collèges non suivis (portes ouvertes, passage garanti, étiquettes du privé).
- Les lycées de secteur hors Paris : pas d'extraction des PDF du rectorat de Versailles ni du XLS de la DSDEN 94.
- Les sources de sectorisation propres aux départements (polygones des Hauts-de-Seine, service ArcGIS des Yvelines sans licence) : la carte nationale suffit.
- Le secteur de Coubron, et toute autre donnée de secteur absente de la carte nationale.
- Les collèges hors d'Île-de-France.
- Le regroupement de marqueurs sur la carte.
- L'indexation par les moteurs de recherche (`noindex` conservé), les comptes et la synchronisation des favoris sur un serveur.
- L'accès de la GitHub Action aux sites des collèges publics : inchangé, la surveillance se lance en local.
- Déjà hors périmètre en v1 : comparaison côte à côte, temps de trajet, notifications par e-mail, orientation après la 3e.

## 15. À vérifier à la main

- Notre-Dame de Sion : robots.txt bloque ClaudeBot (passage au lycée, inscriptions).
- École alsacienne : domaine `ecole-alsacienne.org` hors service le 2026-10-07.
- Saint-Louis : `college-st-louis.org` est un domaine parqué.
- 9 privés sous contrat sans formulation sur le passage au lycée.
- Pages de sectorisation des lycées des DSDEN 77 et 93.
