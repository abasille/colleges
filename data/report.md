# Rapport de la mise à jour des données

Généré le 2026-10-07T22:45:03.272Z par `npm run data` (mode hors ligne : cache uniquement) en 1 s. Fichier régénéré à chaque exécution : ne pas éditer à la main.

## 1. Périmètre

**60 collèges** : 37 public, 17 privé sous contrat, 6 hors contrat.
Dont sous contrat simple : Collège privé Regain Tournesol (0754861B).

| Zone | Public | Privé sous contrat | Hors contrat | Total |
|---|---|---|---|---|
| Paris 5e | 5 | 2 | 1 | 8 |
| Paris 6e | 2 | 6 | 1 | 9 |
| Paris 13e | 11 | 5 | 1 | 17 |
| Paris 14e | 6 | 3 | 2 | 11 |
| Ivry-sur-Seine | 5 | 0 | 1 | 6 |
| Vitry-sur-Seine | 8 | 1 | 0 | 9 |

UAI exclus par `data/config.json` déjà hors des natures 340, 352 (EREA, lycées) — exclusion de précaution : 0752799K, 0755367B, 0753845X, 0753146M, 0755084U.
Géolocalisation approximative (annuaire) : Collège privé Georges Gusdorf (0755496S) — Rue ; Collège Josette et Maurice Audin (0942434K) — Rue.
Demi-pension (jeu « hébergement » retenu) en désaccord avec le champ `restauration` de l'annuaire : Collège privé Regain Tournesol (0754861B) — 0 demi-pensionnaires en 2025, restauration 1 ; Collège privé Catherine Labouré (0755840R) — 101 demi-pensionnaires en 2025, restauration 0.
Demi-pension inconnue : Collège privé Diago (0755925H), Collège privé Paris FC (0756057B), Collège privé École Diagonale (0756203K), Collège privé Cours Montaigne (0756278S), Collège privé Dix sur Dix (0942626U).
Sans site web dans l'annuaire : Collège privé Georges Gusdorf (0755496S) (corrigé), Collège privé Diago (0755925H) (corrigé), Collège privé Paris FC (0756057B) (corrigé), Collège privé École Diagonale (0756203K) (corrigé), Collège privé Cours Montaigne (0756278S) (corrigé), Collège privé Dix sur Dix (0942626U) (corrigé).

## 2. Millésimes

- Brevet : moyenne des sessions 2023, 2024, 2025 (IVAC, `Dataset.sessions.brevet`), dernière session 2025 ; historique DNB 2015–2021 (tous candidats) puis IVAC (série générale).
- IPS : rentrée 2025-2026. Effectifs : rentrée 2025. Évaluations 6e : 2025. Encadrement : rentrée 2025.
- Distributions nationales de la note maison (collèges ayant l'indicateur sur 2023–2024–2025) : brevet 6872, note à l'écrit 6872, VA du taux 6592, VA de la note 6592.

## 3. Valeurs manquantes par indicateur

| Indicateur | Renseignés | Manquants | Raisons |
|---|---|---|---|
| note | 53 | 7 | Non publié (collège sous contrat simple) : 1 ; Hors contrat : non publié : 6 |
| brevet | 53 | 7 | Non publié (collège sous contrat simple) : 1 ; Hors contrat : non publié : 6 |
| brevetDernier | 53 | 7 | Non publié (collège sous contrat simple) : 1 ; Hors contrat : non publié : 6 |
| noteEcrit | 53 | 7 | Non publié (collège sous contrat simple) : 1 ; Hors contrat : non publié : 6 |
| vaTaux | 51 | 9 | Valeur ajoutée non calculée (moins de 40 présents ou appariement insuffisant) : 2 ; Non publié (collège sous contrat simple) : 1 ; Hors contrat : non publié : 6 |
| vaNote | 51 | 9 | Valeur ajoutée non calculée (moins de 40 présents ou appariement insuffisant) : 2 ; Non publié (collège sous contrat simple) : 1 ; Hors contrat : non publié : 6 |
| mentionsTB | 53 | 7 | Non publié (collège sous contrat simple) : 1 ; Hors contrat : non publié : 6 |
| mentions | 53 | 7 | Non publié (collège sous contrat simple) : 1 ; Hors contrat : non publié : 6 |
| accesSixiemeTroisieme | 53 | 7 | Non publié (collège sous contrat simple) : 1 ; Hors contrat : non publié : 6 |
| ips | 54 | 6 | Hors contrat : non publié : 6 |
| effectif | 54 | 6 | Hors contrat : non publié : 6 |
| elevesParClasse | 53 | 7 | Non publié (collège sous contrat simple) : 1 ; Hors contrat : non publié : 6 |
| heuresParEleve | 53 | 7 | Non publié (collège sous contrat simple) : 1 ; Hors contrat : non publié : 6 |
| eval6Francais | 52 | 8 | Non publié : 1 ; Non publié (collège sous contrat simple) : 1 ; Hors contrat : non publié : 6 |
| eval6Maths | 52 | 8 | Non publié : 1 ; Non publié (collège sous contrat simple) : 1 ; Hors contrat : non publié : 6 |

Détail des collèges sous contrat (hors contrat simple) sans résultat ou sans valeur ajoutée :

- Collège privé Morvan (0752916M) — vaTaux : Valeur ajoutée non calculée (moins de 40 présents ou appariement insuffisant) ; vaNote : Valeur ajoutée non calculée (moins de 40 présents ou appariement insuffisant)
- Collège privé Saint-Louis (0754008Z) — vaTaux : Valeur ajoutée non calculée (moins de 40 présents ou appariement insuffisant) ; vaNote : Valeur ajoutée non calculée (moins de 40 présents ou appariement insuffisant)

## 4. Note maison

53 collèges notés sur 60 (2 notes partielles). Lettres : A 10, B 13, C 10, D 15, E 5.

| Rang | Collège | Note | Lettre | Brevet | Écrit | VA | Partielle | Brevet 3 ans (%) | Écrit 3 ans | VA taux | VA note |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Collège privé Yabné (0752906B) | 18.7 | A | 19.6 | 19.8 | 16.6 |  | 100 | 14.9 | 1.5 | 1.4 |
| 2 | Collège privé Notre-Dame de France (0752896R) | 18.6 | A | 19.6 | 20 | 16.2 |  | 100 | 15.8 | 1 | 1.5 |
| 3 | Collège privé Epin (0940874P) | 18.3 | A | 19.6 | 20 | 15.3 |  | 100 | 16 | 0.7 | 0.9 |
| 4 | Collège privé Stanislas (0752900V) | 17.8 | A | 19.6 | 20 | 13.7 |  | 100 | 16.8 | 0 | 0.6 |
| 4 | Collège privé Sévigné (0752913J) | 17.8 | A | 19.6 | 20 | 13.7 |  | 100 | 15.9 | 0.5 | 0.5 |
| 4 | Collège privé La Bruyère Sainte-Isabelle (0753908R) | 17.8 | A | 19 | 19.7 | 14.8 |  | 99.7 | 14.5 | 1.3 | 0.5 |
| 7 | Collège privé Notre-Dame de Sion (0754757N) | 16.9 | A | 19.1 | 19.9 | 11.8 |  | 99.7 | 15.3 | 0 | 0.2 |
| 8 | Collège privé L'École alsacienne (0752874S) | 16.6 | A | 18.8 | 19.8 | 11.2 |  | 99.3 | 15 | 0.3 | 0 |
| 8 | Collège privé Sœur Rosalie (0753967E) | 16.6 | A | 18.5 | 19.8 | 11.6 |  | 99 | 15 | 0 | 0.2 |
| 10 | Collège Pierre Alviset (0751790N) | 16.1 | A | 17.5 | 19.6 | 11.2 |  | 98 | 14.4 | 0 | 0.1 |
| 11 | Collège privé La Salle – Notre-Dame de la Gare (0753982W) | 15.7 | B | 17.8 | 18.5 | 10.8 |  | 98.3 | 13.2 | 1 | -0.1 |
| 12 | Collège Saint-Exupéry (0754253R) | 15.2 | B | 16.9 | 17.9 | 10.9 |  | 97.2 | 12.9 | 1.3 | -0.1 |
| 13 | Collège Lavoisier (0752531U) | 15.1 | B | 18.5 | 19.1 | 7.8 |  | 99 | 13.7 | 0.7 | -0.5 |
| 14 | Collège privé Saint-Vincent-de-Paul (0753985Z) | 14.9 | B | 17.8 | 18.9 | 8.1 |  | 98.3 | 13.5 | 0.3 | -0.4 |
| 15 | Collège Henri IV (0752526N) | 14.7 | B | 18.4 | 19.8 | 5.9 |  | 99 | 14.7 | 0 | -0.9 |
| 16 | Collège Montaigne (0752527P) | 14.3 | B | 17.8 | 18.4 | 6.8 |  | 98.3 | 13.1 | 0.7 | -0.8 |
| 17 | Collège Rognoni – École des enfants du spectacle (0750407K) | 14.2 | B | 18 | 19.7 | 5 |  | 98.6 | 14.4 | -0.7 | -1.3 |
| 17 | Collège Jacques Prévert (0752187V) | 14.2 | B | 16.5 | 15.4 | 10.6 |  | 96.6 | 12.1 | 2.7 | -0.3 |
| 19 | Collège Gabriel Fauré (0752540D) | 14.1 | B | 14.1 | 14.8 | 13.3 |  | 93.7 | 12 | 2 | 0.1 |
| 20 | Collège Claude Monet (0752539C) | 13.5 | B | 14.4 | 18.3 | 7.7 |  | 94 | 13.1 | -1.7 | -0.2 |
| 21 | Collège privé Sainte-Geneviève (0752925X) | 13.4 | B | 16.8 | 18.3 | 5.1 |  | 97.1 | 13.1 | -1.3 | -0.8 |
| 22 | Collège privé Catherine Labouré (0755840R) | 12.4 | B | 13.5 | 8.7 | 15 |  | 93 | 10.8 | 1 | 0.7 |
| 23 | Collège Raymond Queneau (0752186U) | 12 | B | 14.4 | 17.2 | 4.4 |  | 94 | 12.6 | -2.3 | -0.8 |
| 24 | Collège Jean Moulin (0750611G) | 11.3 | C | 13.5 | 15.3 | 5.2 |  | 93 | 12.1 | -1.7 | -0.7 |
| 25 | Collège Rodin (0752538B) | 11.2 | C | 13 | 15 | 5.7 |  | 92.4 | 12 | -1.7 | -0.6 |
| 26 | Collège Évariste Galois (0753937X) | 10.5 | C | 11.9 | 5.7 | 14 |  | 91.2 | 10.2 | 5.3 | 0 |
| 27 | Collège privé Saint-Sulpice (0752924W) | 10 | C | 14.8 | 8.6 | 6.6 |  | 94.6 | 10.8 | 0 | -0.7 |
| 28 | Collège Paul Bert (0752543G) | 9.9 | C | 11.4 | 15.6 | 2.6 |  | 90.7 | 12.2 | -5.3 | -0.8 |
| 29 | Collège Thomas Mann (0755000C) | 9.8 | C | 11.8 | 5.7 | 11.9 |  | 91 | 10.2 | 4.3 | -0.3 |
| 30 | Collège Moulin des Prés (0750525N) | 9.7 | C | 9.9 | 14.8 | 4.5 |  | 89 | 12 | -3.7 | -0.5 |
| 31 | Collège George Sand (0752316K) | 9.6 | C | 9.4 | 10 | 9.5 |  | 88.4 | 11 | -0.7 | -0.1 |
| 32 | Collège Danielle Casanova (0941032L) | 8.5 | C | 8 | 3 | 14.6 |  | 86.9 | 9.5 | 6 | 0 |
| 32 | Collège Henri Wallon (0941781A) | 8.5 | C | 7.2 | 3.2 | 15.1 |  | 86 | 9.5 | 4.7 | 0.2 |
| 34 | Collège Alphonse Daudet (0751705W) | 7.7 | D | 7.8 | 9.9 | 5.4 |  | 86.6 | 11 | -4.3 | -0.3 |
| 34 | Collège Jules Vallès (0941029H) | 7.7 | D | 8.3 | 1.7 | 13.1 |  | 87.1 | 8.9 | 9.7 | -0.3 |
| 36 | Collège Gustave Flaubert (0753518S) | 7.5 | D | 9.9 | 7.9 | 4.6 |  | 89 | 10.7 | -2 | -0.8 |
| 37 | Collège Josette et Maurice Audin (0942434K) | 7.3 | D | 7.6 | 6.2 | 8.1 |  | 86.4 | 10.3 | -0.3 | -0.3 |
| 38 | Collège Romain Rolland (0941601E) | 7.2 | D | 4.1 | 1.5 | 16.1 |  | 81.9 | 8.8 | 6 | 0.3 |
| 39 | Collège privé Morvan (0752916M) | 6.9 | D | 11.7 | 2.1 |  | oui | 91 | 9.1 |  |  |
| 40 | Collège Gustave Monod (0940794C) | 6.6 | D | 1.1 | 3.5 | 15.3 |  | 74 | 9.6 | 0.7 | 0.9 |
| 40 | Collège François Rabelais (0941224V) | 6.6 | D | 4.3 | 0.8 | 14.6 |  | 82 | 8.3 | 10.7 | -0.1 |
| 42 | Collège Gisèle Halimi (0942532S) | 6.3 | D | 4.3 | 3.3 | 11.3 |  | 82 | 9.6 | 0 | 0.1 |
| 43 | Collège Elsa Triolet (0752385K) | 5.9 | D | 4.2 | 8.4 | 5.1 |  | 82 | 10.7 | -6.7 | -0.2 |
| 43 | Collège Molière (0941026E) | 5.9 | D | 2.6 | 4.2 | 10.9 |  | 79 | 9.9 | -2 | 0.3 |
| 45 | Collège Alberto Giacometti (0750445B) | 5.1 | D | 5 | 5.4 | 4.9 |  | 83.2 | 10.1 | -3.3 | -0.5 |
| 46 | Collège Joseph Lakanal (0941034N) | 4.9 | D | 1.9 | 1.9 | 10.9 |  | 77.1 | 9 | -0.7 | 0.1 |
| 47 | Collège François Villon (0752544H) | 4.5 | D | 1.2 | 4.3 | 7.9 |  | 74.5 | 9.9 | -8 | 0.3 |
| 48 | Collège Georges Braque (0752957G) | 4.4 | D | 2.9 | 8.8 | 1.6 |  | 79.7 | 10.8 | -9.7 | -0.7 |
| 49 | Collège Camille Claudel (0752694W) | 3.8 | E | 0.4 | 5.9 | 5.1 |  | 70.4 | 10.2 | -13.3 | 0 |
| 50 | Collège Jean Perrin (0941033M) | 2.8 | E | 1 | 1.2 | 6.3 |  | 73.8 | 8.6 | -4 | -0.2 |
| 51 | Collège Adolphe Chérioux (0940042K) | 2.3 | E | 2.1 | 1.5 | 3.4 |  | 77.6 | 8.8 | -4 | -0.8 |
| 52 | Collège Assia Djebar (0941025D) | 2.1 | E | 1.1 | 1.8 | 3.5 |  | 74.4 | 9 | -5.3 | -0.5 |
| 53 | Collège privé Saint-Louis (0754008Z) | 0.5 | E | 0.5 | 0.5 |  | oui | 71 | 8 |  |  |

Non notés (7) : Collège privé Regain Tournesol (Non publié (collège sous contrat simple)) ; Collège privé Georges Gusdorf (Hors contrat : non publié) ; Collège privé Diago (Hors contrat : non publié) ; Collège privé Paris FC (Hors contrat : non publié) ; Collège privé École Diagonale (Hors contrat : non publié) ; Collège privé Cours Montaigne (Hors contrat : non publié) ; Collège privé Dix sur Dix (Hors contrat : non publié).

## 5. Moyennes de référence

| Indicateur | France | Académie de Paris | Académie de Créteil |
|---|---|---|---|
| accesSixiemeTroisieme | 91.2 | 90.1 | 92.2 |
| brevet | 88.3 | 92.3 | 84.5 |
| brevetDernier | 87.1 | 91.9 | 82.6 |
| elevesParClasse | 23.5 | 23.9 | 23.2 |
| eval6Francais | 255.6 | 281.9 | 251.7 |
| eval6Maths | 253.7 | 277 | 244.5 |
| heuresParEleve | 1.17 | 1.14 | 1.18 |
| ips | 106.2 | 129.6 | 103.3 |
| mentions | 72.8 | 83.4 | 66.5 |
| mentionsTB | 29.4 | 50 | 25.2 |
| noteEcrit | 11.1 | 12.7 | 10.5 |

## 6. Collèges absents de chaque jeu de données

Les hors contrat ne sont présents dans aucun jeu statistique ; ils sont listés à part.

| Jeu | Absents (public / sous contrat) | Hors contrat présents |
|---|---|---|
| IVAC session 2025 | Collège privé Regain Tournesol (0754861B) | 0/6 |
| DNB session 2021 | Collège privé Regain Tournesol (0754861B), Collège Gisèle Halimi (0942532S) | 0/6 |
| IPS 2025 | — | 0/6 |
| Effectifs 2025 | — | 0/6 |
| Évaluations 6e 2025 | Collège Évariste Galois (0753937X), Collège privé Regain Tournesol (0754861B) | 0/6 |
| Encadrement 2025 | Collège privé Regain Tournesol (0754861B) | 0/6 |
| Personnel | — | 0/6 |
| Hébergement (demi-pension) | — | 0/6 |
| ONISEP Idéo-Structures | — | 0/6 |
| ONISEP Idéo-Langues | — | 0/6 |
| ONISEP dispositifs (aucune entrée) | Collège privé Yabné (0752906B), Collège privé Sévigné (0752913J), Collège privé Saint-Sulpice (0752924W), Collège privé Sainte-Geneviève (0752925X), Collège privé Sœur Rosalie (0753967E), Collège privé La Salle – Notre-Dame de la Gare (0753982W), Collège privé Notre-Dame de Sion (0754757N) | 0/6 |

## 7. Noms divergents entre sources

Collèges dont le nom dans une source n'a aucun mot significatif commun avec celui de l'annuaire (jointure faite sur l'UAI, à vérifier : renommage, erreur d'UAI…).

| UAI | Annuaire | Source | Nom dans la source |
|---|---|---|---|
| 0753985Z | Collège privé Saint-Vincent-de-Paul | dnb | SAINTE-MARIE |
| 0941025D | Collège Assia Djebar | ivac | COLLEGE GEORGES POLITZER |
| 0941025D | Collège Assia Djebar | dnb | GEORGES POLITZER |
| 0941025D | Collège Assia Djebar | ips | COLLEGE GEORGES POLITZER |
| 0941025D | Collège Assia Djebar | effectifs | GEORGES POLITZER |

Noms corrigés par `data/overrides/colleges.json` :

- 0750407K : « Collège Rognoni École des enfants du Spectacle » → « Collège Rognoni – École des enfants du spectacle »
- 0753967E : « Collège privé Soeur Rosalie » → « Collège privé Sœur Rosalie »
- 0753982W : « Collège La Salle - Notre-Dame de la Gare » → « Collège privé La Salle – Notre-Dame de la Gare »
- 0756057B : « Paris FC Collège » → « Collège privé Paris FC »
- 0756203K : « Collège privé Ecole Diagonale » → « Collège privé École Diagonale »
- 0940874P : « Collège Epin » → « Collège privé Epin »
- 0942626U : « Ecole Dix sur Dix (Collège) » → « Collège privé Dix sur Dix »

## 8. Langues, options, dispositifs

Langues vivantes : onisep 54, aucune 6.
Sans LV1/LV2 connues : Collège privé Georges Gusdorf (0755496S), Collège privé Diago (0755925H), Collège privé Paris FC (0756057B), Collège privé École Diagonale (0756203K), Collège privé Cours Montaigne (0756278S), Collège privé Dix sur Dix (0942626U).
Fiches Idéo-Structures écartées (même UAI qu'un collège mais autre type) : 0941224V « UFA François Rabelais » (centre de formation d'apprentis).

| Collège | LV1 | LV2 | Anciennes | LCE | Bilangue | SI | CHA | Sport | Dispositifs |
|---|---|---|---|---|---|---|---|---|---|
| Collège Rognoni – École des enfants du spectacle (0750407K) | anglais | allemand, espagnol | latin, grec |  |  |  | arts du spectacle |  | ULIS |
| Collège Alberto Giacometti (0750445B) | anglais | allemand, espagnol, italien | latin |  | anglais, espagnol |  |  |  | SEGPA |
| Collège Moulin des Prés (0750525N) | anglais | allemand, espagnol | latin |  | allemand, anglais, arabe |  |  | volley ball | ULIS |
| Collège Jean Moulin (0750611G) | anglais | allemand, chinois, espagnol | latin, grec |  | allemand, anglais |  |  | judo | ULIS |
| Collège Alphonse Daudet (0751705W) | anglais | allemand, espagnol | latin, grec |  | allemand, anglais |  |  | athletisme | ULIS |
| Collège Pierre Alviset (0751790N) | anglais | allemand, espagnol, italien | latin, grec |  | allemand, anglais, italien |  |  |  | ULIS |
| Collège Raymond Queneau (0752186U) | anglais | allemand, espagnol, russe | latin, grec |  | allemand, anglais, russe | britannique |  |  | ULIS |
| Collège Jacques Prévert (0752187V) | anglais | allemand, espagnol, italien | latin, grec |  | allemand, anglais | russe |  |  | ULIS, SEGPA |
| Collège George Sand (0752316K) | anglais | allemand, espagnol |  |  | allemand, anglais, arabe |  |  | handball | ULIS |
| Collège Elsa Triolet (0752385K) | anglais | allemand, espagnol | latin, grec |  | allemand, anglais |  |  |  | ULIS, SEGPA, UPE2A (élèves allophones) |
| Collège Henri IV (0752526N) | allemand, anglais, russe | allemand, anglais, chinois, espagnol, italien | latin, grec |  | anglais, italien |  |  |  |  |
| Collège Montaigne (0752527P) | anglais, polonais, portugais | allemand, anglais, espagnol, italien, russe | latin, grec |  | allemand, anglais | britannique, polonaise, portugaise |  |  | ULIS |
| Collège Lavoisier (0752531U) | anglais | allemand, espagnol | latin, grec |  | allemand, anglais |  |  |  | ULIS |
| Collège Rodin (0752538B) | anglais | allemand, espagnol, italien | latin, grec |  | anglais, italien |  | théâtre |  | UPE2A (élèves allophones) |
| Collège Claude Monet (0752539C) | anglais | allemand, arabe, espagnol, italien | latin |  | allemand, anglais | arabe | musique |  | ULIS |
| Collège Gabriel Fauré (0752540D) | allemand, anglais | espagnol, italien | latin, grec |  | allemand, anglais | chinoise |  |  |  |
| Collège Paul Bert (0752543G) | anglais | allemand, espagnol, italien | latin, grec |  | allemand, anglais |  |  |  |  |
| Collège François Villon (0752544H) | anglais | espagnol, italien | latin |  | anglais, italien |  | musique | football, sport-études multi-activités | UPE2A (élèves allophones) |
| Collège Camille Claudel (0752694W) | anglais, chinois | chinois, espagnol | latin, grec |  |  |  |  | football | UPE2A (élèves allophones), Dispositif relais |
| Collège privé L'École alsacienne (0752874S) | anglais | allemand, chinois, espagnol, italien | latin |  |  |  | musique |  |  |
| Collège privé Notre-Dame de France (0752896R) | allemand, anglais | espagnol | latin |  | allemand, anglais |  |  |  |  |
| Collège privé Stanislas (0752900V) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  |  |  |  |  | ULIS, SEGPA |
| Collège privé Yabné (0752906B) | anglais | espagnol, hébreu moderne | latin |  |  |  |  |  |  |
| Collège privé Sévigné (0752913J) | anglais | allemand, espagnol, italien | latin, grec |  |  |  |  |  |  |
| Collège privé Morvan (0752916M) | anglais | espagnol |  |  |  |  |  |  | ULIS |
| Collège privé Saint-Sulpice (0752924W) | anglais | allemand, espagnol, italien | latin |  |  |  |  |  |  |
| Collège privé Sainte-Geneviève (0752925X) | anglais | allemand, espagnol | latin |  |  |  |  |  |  |
| Collège Georges Braque (0752957G) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  | allemand, anglais, espagnol |  |  | rugby | ULIS |
| Collège Gustave Flaubert (0753518S) | allemand, anglais | anglais, coréen, espagnol | latin, grec |  | allemand, anglais |  |  |  | ULIS, Dispositif relais |
| Collège privé La Bruyère Sainte-Isabelle (0753908R) | allemand, anglais, espagnol | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  |  |  |
| Collège Évariste Galois (0753937X) | anglais | allemand, espagnol | latin |  | allemand, anglais, espagnol |  |  | basket-ball | ULIS |
| Collège privé Sœur Rosalie (0753967E) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  |  |  |  |  |  |
| Collège privé La Salle – Notre-Dame de la Gare (0753982W) | anglais | allemand, chinois, espagnol | latin |  |  |  |  |  |  |
| Collège privé Saint-Vincent-de-Paul (0753985Z) | allemand, anglais | allemand, anglais, espagnol, italien | latin |  | allemand, anglais |  |  |  | ULIS |
| Collège privé Saint-Louis (0754008Z) | anglais | espagnol |  |  |  |  |  |  | ULIS |
| Collège Saint-Exupéry (0754253R) | anglais | allemand, espagnol | latin, grec |  | allemand, anglais |  |  |  |  |
| Collège privé Notre-Dame de Sion (0754757N) | anglais | allemand, espagnol | latin |  |  |  |  |  |  |
| Collège privé Regain Tournesol (0754861B) | anglais |  |  |  |  |  |  |  | ULIS |
| Collège Thomas Mann (0755000C) | anglais | allemand, espagnol, italien | latin, grec |  | allemand, anglais |  |  |  | UPE2A (élèves allophones) |
| Collège privé Georges Gusdorf (0755496S) |  |  |  |  |  |  |  |  |  |
| Collège privé Catherine Labouré (0755840R) | anglais | allemand, espagnol | latin |  |  |  | danse |  |  |
| Collège privé Diago (0755925H) |  |  |  |  |  |  |  |  |  |
| Collège privé Paris FC (0756057B) |  |  |  |  |  |  |  |  |  |
| Collège privé École Diagonale (0756203K) |  |  |  |  |  |  |  |  |  |
| Collège privé Cours Montaigne (0756278S) |  |  |  |  |  |  |  |  |  |
| Collège Adolphe Chérioux (0940042K) | anglais | allemand, espagnol | latin | langue non précisée |  |  | musique |  | ULIS, UPE2A (élèves allophones), Dispositif relais |
| Collège Gustave Monod (0940794C) | allemand, anglais | allemand, espagnol | latin, grec |  | allemand, anglais |  |  |  | UPE2A (élèves allophones) |
| Collège privé Epin (0940874P) | allemand, anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  |  |
| Collège Assia Djebar (0941025D) | anglais | allemand, anglais, espagnol |  |  | allemand, anglais |  | musique |  | SEGPA |
| Collège Molière (0941026E) | anglais | espagnol | latin |  | allemand, anglais |  |  |  | UPE2A (élèves allophones), Dispositif relais |
| Collège Jules Vallès (0941029H) | allemand, anglais | espagnol | latin |  | allemand, anglais |  |  | rugby | ULIS, UPE2A (élèves allophones) |
| Collège Danielle Casanova (0941032L) | allemand, anglais | allemand, espagnol | latin, grec |  |  |  |  |  | UPE2A (élèves allophones) |
| Collège Jean Perrin (0941033M) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  | SEGPA |
| Collège Joseph Lakanal (0941034N) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  | UPE2A (élèves allophones) |
| Collège François Rabelais (0941224V) | allemand, anglais | espagnol | latin | langue non précisée | allemand, anglais |  |  |  | SEGPA, UPE2A (élèves allophones) |
| Collège Romain Rolland (0941601E) | anglais | allemand, espagnol, italien | latin, grec |  | allemand, anglais |  |  |  | ULIS |
| Collège Henri Wallon (0941781A) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  | handball | ULIS, UPE2A (élèves allophones) |
| Collège Josette et Maurice Audin (0942434K) | anglais | allemand, espagnol | latin |  |  |  |  | escalade, planche de sillage (wakeboard), surf | ULIS |
| Collège Gisèle Halimi (0942532S) | anglais | allemand |  |  | allemand, anglais |  |  | escalade | ULIS |
| Collège privé Dix sur Dix (0942626U) |  |  |  |  |  |  |  |  |  |

## 9. Continuité jusqu'au bac

Liens : aucun 34, cite_scolaire 8, meme_etablissement_prive 17, groupe_scolaire_autre_site 1. Passage : non_garanti 51, garanti 3, sous_reserve 2, inconnu 4. 2nde GT sur place : 24.

| Collège | Lien | Lycée | 2nde GT | Passage | Détection |
|---|---|---|---|---|---|
| Collège Henri IV (0752526N) | cite_scolaire | Lycée Henri-IV (0750654D) | oui | non_garanti | cite_scolaire [R1_cite_scolaire:07504, R3_adresse] |
| Collège Montaigne (0752527P) | cite_scolaire | Lycée Montaigne (0750657G) | oui | non_garanti | cite_scolaire [R1_cite_scolaire:07506, R3_adresse] |
| Collège Lavoisier (0752531U) | cite_scolaire | Lycée Lavoisier (0750656F) | oui | non_garanti | cite_scolaire [R1_cite_scolaire:07505, R3_adresse] |
| Collège Rodin (0752538B) | cite_scolaire | Lycée Rodin (0750682J) | oui | non_garanti | cite_scolaire [R1_cite_scolaire:07514, R3_adresse] |
| Collège Claude Monet (0752539C) | cite_scolaire | Lycée Claude Monet (0750683K) | oui | non_garanti | cite_scolaire [R1_cite_scolaire:07515, R3_adresse] |
| Collège Gabriel Fauré (0752540D) | cite_scolaire | Lycée Gabriel Fauré (0750684L) | oui | non_garanti | cite_scolaire [R1_cite_scolaire:07516, R3_adresse] |
| Collège Paul Bert (0752543G) | cite_scolaire | Lycée Paul Bert (0750689S) | oui | non_garanti | cite_scolaire [R1_cite_scolaire:07517] |
| Collège François Villon (0752544H) | cite_scolaire | Lycée polyvalent François Villon (0750690T) | non | non_garanti | cite_scolaire [R1_cite_scolaire:07518, R3_adresse] |
| Collège privé L'École alsacienne (0752874S) | meme_etablissement_prive | Lycée privé L'École alsacienne (0753647G) | oui | garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé Notre-Dame de France (0752896R) | meme_etablissement_prive | Lycée privé Notre-Dame de France (0753902J) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé Stanislas (0752900V) | meme_etablissement_prive | Lycée privé Stanislas (0753840S) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé Yabné (0752906B) | meme_etablissement_prive | Lycée privé Yabné (0753834K) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé Sévigné (0752913J) | meme_etablissement_prive | Lycée privé Sévigné (0753598D) | oui | garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé Morvan (0752916M) | meme_etablissement_prive | Lycée privé Morvan (0753825A) | oui | garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé Saint-Sulpice (0752924W) | meme_etablissement_prive | Lycée privé Saint-Sulpice (0753838P) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé Sainte-Geneviève (0752925X) | meme_etablissement_prive | Lycée privé Sainte-Geneviève (0753844W) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé Sœur Rosalie (0753967E) | meme_etablissement_prive | Lycée privé Louise de Marillac (0753827C) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé Saint-Vincent-de-Paul (0753985Z) | meme_etablissement_prive | Lycée privé Saint-Vincent-de-Paul (0754924V) | oui | sous_reserve | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé Saint-Louis (0754008Z) | meme_etablissement_prive | Lycée polyvalent privé Saint-Nicolas (0754025T) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé Notre-Dame de Sion (0754757N) | meme_etablissement_prive | Lycée privé Notre-Dame de Sion (0753842U) | oui | inconnu | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé Georges Gusdorf (0755496S) | meme_etablissement_prive | Lycée général privé Georges Gusdorf (0755589T) | oui | inconnu | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé Catherine Labouré (0755840R) | meme_etablissement_prive | Lycée privé polyvalent Catherine Labouré (0754045P) | oui | sous_reserve | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé Paris FC (0756057B) | groupe_scolaire_autre_site | Lycée privé Paris FC Academy (hors contrat) (0942439R) | non | non_garanti | aucun → corrigé (groupe_scolaire_autre_site) |
| Collège privé École Diagonale (0756203K) | meme_etablissement_prive | Cours Diagonale (0755367B) | oui | inconnu | meme_etablissement_prive [R3_adresse] |
| Collège privé Cours Montaigne (0756278S) | meme_etablissement_prive | Cours Montaigne (Ecole secondaire privée) (0753845X) | oui | inconnu | meme_etablissement_prive [R3_adresse] |
| Collège privé Epin (0940874P) | meme_etablissement_prive | Lycée Epin (0941719H) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |

## 10. Lycées de secteur 1 (Affelnet Paris)

4520 lignes ArcGIS. 23/24 collèges publics parisiens avec une liste (23 non vides). Absents de la carte : Collège Rognoni – École des enfants du spectacle (0750407K).

- Collège Alberto Giacometti : Lycée Buffon, Lycée Camille Sée, Lycée Émile Dubois, Lycée Montaigne, Lycée Victor Duruy
- Collège Moulin des Prés : Lycée Buffon, Lycée Claude Monet, Lycée Gabriel Fauré, Lycée Paul Bert, Lycée Rodin
- Collège Jean Moulin : Lycée Émile Dubois, Lycée Lavoisier, Lycée Montaigne, Lycée Paul Bert, Lycée Victor Duruy
- Collège Alphonse Daudet : Lycée Émile Dubois, Lycée Lavoisier, Lycée Montaigne, Lycée Paul Bert, Lycée Victor Duruy
- Collège Pierre Alviset : Lycée Charlemagne, Lycée Émile Dubois, Lycée Montaigne, Lycée Rodin, Lycée Sophie Germain
- Collège Raymond Queneau : Lycée Émile Dubois, Lycée Lavoisier, Lycée Montaigne, Lycée Paul Bert, Lycée Rodin
- Collège Jacques Prévert : Lycée Camille Sée, Lycée Fénelon, Lycée Montaigne, Lycée Paul Bert, Lycée Victor Duruy
- Collège George Sand : Lycée Buffon, Lycée Claude Monet, Lycée Gabriel Fauré, Lycée Paul Bert, Lycée Rodin
- Collège Elsa Triolet : Lycée Buffon, Lycée Claude Monet, Lycée Gabriel Fauré, Lycée Lavoisier, Lycée Montaigne
- Collège Henri IV : Lycée Charlemagne, Lycée Fénelon, Lycée Lavoisier, Lycée Paul Bert, Lycée Rodin
- Collège Montaigne : Lycée Camille Sée, Lycée Fénelon, Lycée Lavoisier, Lycée Montaigne, Lycée Paul Bert
- Collège Lavoisier : Lycée Fénelon, Lycée Lavoisier, Lycée Montaigne, Lycée Paul Bert, Lycée Rodin
- Collège Rodin : Lycée Claude Monet, Lycée Gabriel Fauré, Lycée Lavoisier, Lycée Paul Bert, Lycée Rodin
- Collège Claude Monet : Lycée Claude Monet, Lycée Gabriel Fauré, Lycée Paul Bert, Lycée Rodin, Lycée Sophie Germain
- Collège Gabriel Fauré : Lycée Charlemagne, Lycée Claude Monet, Lycée Gabriel Fauré, Lycée Paul Valéry, Lycée Rodin
- Collège Paul Bert : Lycée Émile Dubois, Lycée Lavoisier, Lycée Montaigne, Lycée Paul Bert, Lycée Rodin
- Collège François Villon : Lycée Buffon, Lycée Camille Sée, Lycée Émile Dubois, Lycée Paul Bert, Lycée Victor Duruy
- Collège Camille Claudel : Lycée Claude Monet, Lycée Gabriel Fauré, Lycée Lavoisier, Lycée Paul Valéry, Lycée Rodin
- Collège Georges Braque : Lycée Claude Monet, Lycée Émile Dubois, Lycée Gabriel Fauré, Lycée Lavoisier, Lycée Rodin
- Collège Gustave Flaubert : Lycée Claude Monet, Lycée Gabriel Fauré, Lycée Paul Valéry, Lycée Rodin, Lycée Sophie Germain
- Collège Évariste Galois : Lycée Charlemagne, Lycée Claude Monet, Lycée Émile Dubois, Lycée Gabriel Fauré, Lycée Rodin
- Collège Saint-Exupéry : Lycée Émile Dubois, Lycée Lavoisier, Lycée Montaigne, Lycée Paul Bert, Lycée Rodin
- Collège Thomas Mann : Lycée Arago, Lycée Claude Monet, Lycée Fénelon, Lycée Gabriel Fauré, Lycée Paul Valéry

## 11. Secteurs parisiens (jointure par nom)

110 secteurs publiés, 113 noms de collèges. 23/24 collèges publics parisiens du périmètre associés à un secteur.
Collèges publics parisiens du périmètre sans secteur : Collège Rognoni – École des enfants du spectacle (0750407K) (Rognoni n'a pas de secteur : recrutement sur dossier).
Secteurs sans collège du périmètre (autres arrondissements, conservés pour les adresses hors zone) : 87. Noms ambigus : 0.

| Secteur | Nom publié | Collège | Méthode | Adresse concordante |
|---|---|---|---|---|
| JACQUES PREVERT | JACQUES PREVERT | Collège Jacques Prévert | exact | — |
| LAVOISIER | LAVOISIER | Collège Lavoisier | exact | — |
| ALPHONSE DAUDET | ALPHONSE DAUDET | Collège Alphonse Daudet | exact | oui |
| GABRIEL FAURE | GABRIEL FAURE | Collège Gabriel Fauré | exact | oui |
| GEORGE SAND | GEORGE SAND | Collège George Sand | exact | oui |
| GUSTAVE FLAUBERT | GUSTAVE FLAUBERT | Collège Gustave Flaubert | exact | ⚠️ non |
| ST EXUPERY | ST EXUPERY | Collège Saint-Exupéry | exact | oui |
| GEORGES BRAQUE | GEORGES BRAQUE | Collège Georges Braque | exact | oui |
| ALBERTO GIACOMETTI | ALBERTO GIACOMETTI | Collège Alberto Giacometti | exact | oui |
| PIERRE ALVISET | PIERRE ALVISET | Collège Pierre Alviset | exact | — |
| RAYMOND QUENEAU | RAYMOND QUENEAU | Collège Raymond Queneau | exact | — |
| EVARISTE GALOIS | EVARISTE GALOIS | Collège Évariste Galois | exact | oui |
| ELSA TRIOLET | ELSA TRIOLET | Collège Elsa Triolet | exact | oui |
| MOULIN DES PRES | MOULIN DES PRES | Collège Moulin des Prés | exact | oui |
| PAUL BERT | PAUL BERT | Collège Paul Bert | exact | oui |
| CAMILLE CLAUDEL | CAMILLE CLAUDEL | Collège Camille Claudel | exact | oui |
| HENRI IV | HENRI IV | Collège Henri IV | exact | — |
| MONTAIGNE | MONTAIGNE | Collège Montaigne | exact | — |
| JEAN MOULIN | JEAN MOULIN | Collège Jean Moulin | exact | oui |
| FRANCOIS VILLON | FRANCOIS VILLON | Collège François Villon | exact | oui |
| AUGUSTE RODIN | AUGUSTE RODIN | Collège Rodin | inclusion | oui |
| CLAUDE MONET | CLAUDE MONET | Collège Claude Monet | exact | oui |
| THOMAS MANN | THOMAS MANN | Collège Thomas Mann | exact | oui |

Géométrie : chaque secteur publié est une union d'îlots (6123 polygones au total) : **les rues entre les îlots ne sont couvertes par aucun secteur**. Une adresse géocodée sur la chaussée ou en façade tombe donc souvent hors de tout polygone : l'application doit retenir le secteur le plus proche. Simplification : 306844 → 50221 points, 6078 polygones (Douglas–Peucker ≈ 5 m, arrondi à 5 décimales, îlots < 10 m² et trous < 100 m² retirés).

Contrôle sur 12 adresses géocodées (Géoplateforme) : 8 dans un polygone, 4 hors polygone (secteur le plus proche indiqué).

| Adresse | Géocodée | Secteur (polygone) | Secteur le plus proche | Distance (m) |
|---|---|---|---|---|
| 12 rue Clovis 75005 Paris | 12 Rue Clovis 75005 Paris |  | HENRI IV | 3 |
| 5 rue Mouffetard 75005 Paris | 5 Rue Mouffetard 75005 Paris | HENRI IV | HENRI IV | 0 |
| 120 boulevard de l’Hôpital 75013 Paris | 120 Boulevard de l'Hôpital 75013 Paris |  | AUGUSTE RODIN | 3 |
| 80 boulevard Arago 75013 Paris | 80 Boulevard Arago 75013 Paris | AUGUSTE RODIN | AUGUSTE RODIN | 0 |
| 30 rue de Tolbiac 75013 Paris | 30 Rue de Tolbiac 75013 Paris | THOMAS MANN | THOMAS MANN | 0 |
| 100 avenue d’Italie 75013 Paris | 100 Avenue d'Italie 75013 Paris | GEORGE SAND | GEORGE SAND | 0 |
| 3 place d’Italie 75013 Paris | 3 Place d'Italie 75013 Paris | AUGUSTE RODIN | AUGUSTE RODIN | 0 |
| 60 rue de la Glacière 75013 Paris | 60 Rue de la Glacière 75013 Paris | AUGUSTE RODIN | AUGUSTE RODIN | 0 |
| 15 rue Daguerre 75014 Paris | 15 Rue Daguerre 75014 Paris | PAUL BERT | PAUL BERT | 0 |
| 20 rue Didot 75014 Paris | 20 Rue Didot 75014 Paris |  | ALBERTO GIACOMETTI | 0 |
| 50 rue Notre-Dame des Champs 75006 Paris | 50 Rue Notre-Dame des Champs 75006 Paris |  | MONTAIGNE | 1 |
| 10 rue de Vaugirard 75006 Paris | 10 Rue de Vaugirard 75006 Paris | JACQUES PREVERT | JACQUES PREVERT | 0 |

## 12. Carte scolaire Ivry / Vitry (plages d’adresses)

887 lignes (94041 : 338, 94081 : 549), 0 doublons exacts retirés.
Collèges publics d'Ivry / Vitry sans adresse : aucun.
Adresses d'une commune rattachées à un collège de l'autre : 51 (94081 → Collège Romain Rolland : 51).
Tronçons rattachés à plusieurs collèges : 8 (94041 ALLEE DE LA SEINE : 0941025D/0941026E ; 94041 PROMENEE MARAT : 0941025D/0941026E ; 94041 RUE BAUDIN : 0941025D/0941781A ; 94041 RUE RAYMOND LEFEVRE : 0941025D/0942532S ; 94081 ALLEE DES CHAMPS FLEURIS : 0940042K/0941033M ; 94081 ALLEE DU COTEAU : 0940042K/0941034N ; 94081 RUE HENRI DE VILMORIN : 0941034N/0941601E ; 94081 RUE SAINT GERMAIN : 0941033M/0941034N).
Plages « toute la voie » (1–9999) : 744/887 ; `debut`/`fin` sont publiés tels quels (9999 = jusqu'au bout de la voie).

## 13. Normalisation des voies (contrôle Géoplateforme)

Échantillon de 25 libellés de la carte scolaire géocodés « <libellé> <commune> » : **24/25** identiques après `normalizeVoie` (et même code commune).
Écarts imputables à la normalisation : 0/25.

| INSEE | Carte scolaire | Géocodeur (rue) | normalizeVoie(géocodeur) | Code commune | Diagnostic |
|---|---|---|---|---|---|
| 94041 | RUE DES PENICHES | Rue Hoche | RUE HOCHE | 94041 | autre voie renvoyée (voie inconnue du géocodeur ?) |

## 14. Événements

56 événements lus, 56 publiés, 0 rejetés, 0 hors périmètre. Statuts d'inscription : 20.

## 15. À vérifier à la main

- Collège privé L'École alsacienne (0752874S) : Le domaine ecole-alsacienne.org ne répondait plus le 2026-10-07 (site conservé dans la fiche).
- Collège privé Saint-Louis (0754008Z) : Le domaine college-st-louis.org indiqué par l'annuaire est parqué ; la page du collège est hébergée par lyceesaintnicolas.com/college-saint-louis/.
- Collège privé Notre-Dame de Sion (0754757N) : robots.txt de sion-paris.fr bloque ClaudeBot : passage au lycée et inscriptions à vérifier à la main.
- Passage au lycée « inconnu » : Collège privé Notre-Dame de Sion (0754757N), Collège privé Georges Gusdorf (0755496S), Collège privé École Diagonale (0756203K), Collège privé Cours Montaigne (0756278S).
- Privés sous contrat avec lycée sans formulation sur le passage (« poursuite habituelle, non garantie par écrit ») : 8 — Collège privé Notre-Dame de France, Collège privé Stanislas, Collège privé Yabné, Collège privé Saint-Sulpice, Collège privé Sainte-Geneviève, Collège privé Sœur Rosalie, Collège privé Saint-Louis, Collège privé Epin.

## 16. Fichiers produits

| Fichier | Taille |
|---|---|
| public/data/colleges.json | 451 ko |
| public/data/contours.geojson | 8 ko |
| public/data/secteurs-paris.geojson | 961 ko |
| public/data/carte-scolaire-94.json | 85 ko |
| public/data/events.json | 33 ko |
