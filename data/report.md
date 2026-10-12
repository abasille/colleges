# Rapport de la mise à jour des données

Généré le 2026-10-12T18:04:15.404Z par `npm run data` (mode hors ligne : cache uniquement) en 1 s. Fichier régénéré à chaque exécution : ne pas éditer à la main.

Trois parties : les totaux, les anomalies (décompte et collèges concernés), le détail des seuls collèges suivis.

## 1. Totaux

**1292 collèges** : 920 publics, 240 privés sous contrat (dont sous contrat simple : Collège privé Regain Tournesol (0754861B)), 132 hors contrat. 441 communes.

| Département | Académie | Communes | Public | Privé sous contrat | Hors contrat | Total |
|---|---|---|---|---|---|---|
| 75 | Paris | 20 | 114 | 65 | 38 | 217 |
| 77 | Créteil | 98 | 135 | 18 | 9 | 162 |
| 78 | Versailles | 75 | 116 | 25 | 22 | 163 |
| 91 | Versailles | 67 | 102 | 20 | 8 | 130 |
| 92 | Versailles | 35 | 99 | 35 | 20 | 154 |
| 93 | Créteil | 38 | 131 | 28 | 12 | 171 |
| 94 | Créteil | 44 | 108 | 24 | 11 | 143 |
| 95 | Versailles | 64 | 115 | 25 | 12 | 152 |
| **Total** |  | 441 | 920 | 240 | 132 | 1292 |

Par académie : Créteil 476, Paris 217, Versailles 599. Collèges suivis : 60.
Exclusions de précaution (UAI déjà hors des natures 340, 352 : EREA, lycées) : 0752799K, 0755367B, 0753845X, 0753146M, 0755084U.

### Millésimes

- Brevet : moyenne des sessions 2023, 2024, 2025 (IVAC, `Dataset.sessions.brevet`), dernière session 2025 ; historique DNB 2015–2021 (tous candidats) puis IVAC (série générale).
- IPS : rentrée 2025-2026. Effectifs : rentrée 2025. Évaluations 6e : 2025. Encadrement : rentrée 2025.
- Distributions nationales de la note maison (collèges ayant l'indicateur sur 2023–2024–2025) : brevet 6872, note à l'écrit 6872, VA du taux 6592, VA de la note 6592.

### Indicateurs

| Indicateur | Renseignés | Manquants | Raisons |
|---|---|---|---|
| note | 1129 | 163 | Non publié : 30 ; Hors contrat : non publié : 132 ; Non publié (collège sous contrat simple) : 1 |
| brevet | 1129 | 163 | Non publié : 30 ; Hors contrat : non publié : 132 ; Non publié (collège sous contrat simple) : 1 |
| brevetDernier | 1127 | 165 | Non publié : 32 ; Hors contrat : non publié : 132 ; Non publié (collège sous contrat simple) : 1 |
| noteEcrit | 1129 | 163 | Non publié : 30 ; Hors contrat : non publié : 132 ; Non publié (collège sous contrat simple) : 1 |
| vaTaux | 1105 | 187 | Valeur ajoutée non calculée (moins de 40 présents ou appariement insuffisant) : 24 ; Non publié : 30 ; Hors contrat : non publié : 132 ; Non publié (collège sous contrat simple) : 1 |
| vaNote | 1105 | 187 | Valeur ajoutée non calculée (moins de 40 présents ou appariement insuffisant) : 24 ; Non publié : 30 ; Hors contrat : non publié : 132 ; Non publié (collège sous contrat simple) : 1 |
| mentionsTB | 1129 | 163 | Non publié : 30 ; Hors contrat : non publié : 132 ; Non publié (collège sous contrat simple) : 1 |
| mentions | 1129 | 163 | Non publié : 30 ; Hors contrat : non publié : 132 ; Non publié (collège sous contrat simple) : 1 |
| accesSixiemeTroisieme | 1124 | 168 | Non publié : 35 ; Hors contrat : non publié : 132 ; Non publié (collège sous contrat simple) : 1 |
| ips | 1155 | 137 | Hors contrat : non publié : 132 ; Non publié : 5 |
| effectif | 1154 | 138 | Hors contrat : non publié : 132 ; Non publié : 6 |
| elevesParClasse | 1152 | 140 | Non publié : 7 ; Hors contrat : non publié : 132 ; Non publié (collège sous contrat simple) : 1 |
| heuresParEleve | 1152 | 140 | Non publié : 7 ; Hors contrat : non publié : 132 ; Non publié (collège sous contrat simple) : 1 |
| eval6Francais | 1141 | 151 | Non publié : 18 ; Hors contrat : non publié : 132 ; Non publié (collège sous contrat simple) : 1 |
| eval6Maths | 1141 | 151 | Non publié : 18 ; Hors contrat : non publié : 132 ; Non publié (collège sous contrat simple) : 1 |

Note maison : 1129 collèges notés sur 1292 (24 notes partielles). Lettres : A 144, B 155, C 237, D 372, E 221. Non notés : Hors contrat : non publié 132, Non publié 30, Non publié (collège sous contrat simple) 1.

Moyennes de référence :

| Indicateur | France | Académie de Paris | Académie de Créteil | Académie de Versailles |
|---|---|---|---|---|
| accesSixiemeTroisieme | 91.2 | 90.1 | 92.2 | 92.2 |
| brevet | 88.3 | 92.3 | 84.5 | 86.1 |
| brevetDernier | 87.1 | 91.9 | 82.6 | 84 |
| elevesParClasse | 23.5 | 23.9 | 23.2 | 24.6 |
| eval6Francais | 255.6 | 281.9 | 251.7 | 262.2 |
| eval6Maths | 253.7 | 277 | 244.5 | 258.3 |
| heuresParEleve | 1.17 | 1.14 | 1.18 | 1.11 |
| ips | 106.2 | 129.6 | 103.3 | 115.4 |
| mentions | 72.8 | 83.4 | 66.5 | 70.5 |
| mentionsTB | 29.4 | 50 | 25.2 | 30.4 |
| noteEcrit | 11.1 | 12.7 | 10.5 | 11 |

### Langues, continuité, lycée de secteur

- Langues vivantes, source : aucune 147, onisep 1145.
- Continuité : liens aucun 1031, cite_scolaire 46, groupe_scolaire_autre_site 1, meme_etablissement_prive 214 ; passage garanti 3, inconnu 49, non_garanti 1238, sous_reserve 2 ; 2nde GT sur place 204. Liens corrigés à la main : 1.
- Affelnet Paris : 4520 lignes ArcGIS ; 113/114 collèges publics parisiens avec une liste de lycées de secteur 1 (113 non vides).

### Secteurs

- Paris (polygones de la Ville) : 110 secteurs, 113 noms de collèges publiés ; 113/114 collèges publics reliés (méthodes : approchant 1, exact 106, inclusion 6). Simplification : 306844 → 50221 points, 6123 → 6078 polygones. Les rues entre les îlots ne sont couvertes par aucun secteur : l'application retient le secteur le plus proche.
- Contrôle de 12 adresses parisiennes géocodées : 8 dans un polygone, 4 hors polygone (secteur le plus proche).
- Carte scolaire nationale : 78124 lignes après normalisation des voies (281 doublons retirés, 0 écartées), 1281 communes, 908 collèges. Une ligne sans voie (« secteur unique ») couvre toute la commune, ou le reste de la commune quand d'autres lignes listent des voies. Publiée par département hors Paris.
- Communes absentes de la carte, rattachées par déduction à leur seul collège public (9) : Le Bourget (93013, Collège Didier Daurat), Dugny (93030, Collège Jean-Baptiste Clément), Gournay-sur-Marne (93033, Collège Eugène Carrière), L'Ile-Saint-Denis (93039, Collège Alfred Sisley), Les Lilas (93045, Collège Marie Curie), Neuilly-Plaisance (93049, Collège Jean Moulin), Le Pré-Saint-Gervais (93061, Collège Jean-Jacques Rousseau), Le Raincy (93062, Collège Jean-Baptiste Corot), Vaujours (93074, Collège Henri IV). Une commune sans collège et absente de la carte (Coubron) n'a pas de secteur connu.
- UAI de la carte hors périmètre (collèges hors d'Île-de-France desservant une commune francilienne) : 0280001Z, 0510026B. Lignes rattachées à un collège d'une autre commune : 5370. Plages « toute la voie » (1–9999) : 64269.

| Département | Communes | Lignes | Lignes sans voie | Communes à secteur unique | Tronçons partagés |
|---|---|---|---|---|---|
| 75 | 20 | 12729 | 0 | 0 | 399 |
| 77 | 507 | 9565 | 473 | 472 | 1 |
| 78 | 261 | 9586 | 226 | 225 | 2 |
| 91 | 196 | 8754 | 166 | 160 | 115 |
| 92 | 36 | 8775 | 1 | 1 | 4 |
| 93 | 29 | 10409 | 0 | 0 | 50 |
| 94 | 47 | 8741 | 15 | 15 | 128 |
| 95 | 185 | 9565 | 154 | 153 | 2 |

### Événements

56 événements lus, 56 publiés, 0 rejetés, 0 hors périmètre. Statuts d'inscription : 20.

### Fichiers produits

| Fichier | Taille |
|---|---|
| public/data/colleges.json | 1197 ko |
| public/data/colleges-75.json | 862 ko |
| public/data/colleges-77.json | 680 ko |
| public/data/colleges-78.json | 654 ko |
| public/data/colleges-91.json | 555 ko |
| public/data/colleges-92.json | 621 ko |
| public/data/colleges-93.json | 718 ko |
| public/data/colleges-94.json | 601 ko |
| public/data/colleges-95.json | 633 ko |
| public/data/secteurs-paris.geojson | 962 ko |
| public/data/carte-scolaire-77.json | 432 ko |
| public/data/carte-scolaire-78.json | 432 ko |
| public/data/carte-scolaire-91.json | 397 ko |
| public/data/carte-scolaire-92.json | 393 ko |
| public/data/carte-scolaire-93.json | 465 ko |
| public/data/carte-scolaire-94.json | 390 ko |
| public/data/carte-scolaire-95.json | 431 ko |
| public/data/contours-75.geojson | 8 ko |
| public/data/contours-77.geojson | 76 ko |
| public/data/contours-78.geojson | 51 ko |
| public/data/contours-91.geojson | 46 ko |
| public/data/contours-92.geojson | 17 ko |
| public/data/contours-93.geojson | 22 ko |
| public/data/contours-94.geojson | 25 ko |
| public/data/contours-95.geojson | 38 ko |
| public/data/events.json | 33 ko |

## 2. Anomalies

Chaque anomalie avec son décompte et les éléments concernés ; « aucun » : contrôle fait, rien à signaler.

| Famille | Anomalie | Nombre |
|---|---|---|
| Jointures ratées, par source | Absents du jeu « IVAC session 2025 » | 33 |
| Jointures ratées, par source | Absents du jeu « DNB session 2021 » | 29 |
| Jointures ratées, par source | Absents du jeu « IPS 2025 » | 5 |
| Jointures ratées, par source | Absents du jeu « Effectifs 2025 » | 6 |
| Jointures ratées, par source | Absents du jeu « Évaluations 6e 2025 » | 19 |
| Jointures ratées, par source | Absents du jeu « Encadrement 2025 » | 8 |
| Jointures ratées, par source | Absents du jeu « Personnel » | 8 |
| Jointures ratées, par source | Absents du jeu « Hébergement (demi-pension) » | 6 |
| Jointures ratées, par source | Absents du jeu « ONISEP Idéo-Structures » | 5 |
| Jointures ratées, par source | Absents du jeu « ONISEP Idéo-Langues » | 13 |
| Jointures ratées, par source | Collèges publics parisiens absents de la carte Affelnet | 1 |
| Jointures ratées, par source | Nom dans une source sans mot commun avec celui de l'annuaire | 37 |
| Jointures ratées, par source | Fiches Idéo-Structures écartées (même UAI qu'un collège, autre type) | 2 |
| Jointures ratées, par source | Dispositifs ONISEP écartés (lieu non collège) | 0 |
| Secteurs parisiens non reliés | Secteurs reliés à aucun collège | 0 |
| Secteurs parisiens non reliés | Noms publiés sans collège | 0 |
| Secteurs parisiens non reliés | Collèges reliés à plusieurs secteurs | 0 |
| Secteurs parisiens non reliés | Collèges reliés par leur nom, adresse publiée différente de l'annuaire | 10 |
| Écarts entre les polygones parisiens et la carte nationale | Collèges des polygones de la Ville absents de la carte nationale | 0 |
| Écarts entre les polygones parisiens et la carte nationale | Collèges de la carte nationale à Paris sans polygone de la Ville | 0 |
| Collèges publics sans secteur | Collèges publics parisiens sans secteur de la Ville | 1 |
| Collèges publics sans secteur | Collèges publics absents de la carte nationale alors que leur commune y figure | 6 |
| Collèges publics sans secteur | Collèges publics d’une commune absente de la carte nationale qui en compte plusieurs | 0 |
| Doublons | UAI présents sur plusieurs lignes de l'annuaire | 1 |
| Données manquantes inattendues | Valeurs manquantes sans raison | 0 |
| Données manquantes inattendues | Collèges publics ou sous contrat (hors contrat simple) sans résultat au brevet ou sans valeur ajoutée | 55 |
| Données manquantes inattendues | Sans coordonnées dans l'annuaire, placés par le géocodage de leur adresse | 2 |
| Données manquantes inattendues | Géocodage incertain (score < 0,7) | 1 |
| Données manquantes inattendues | Géolocalisation approximative dans l'annuaire | 180 |
| Données manquantes inattendues | Demi-pension (jeu « hébergement », retenu) en désaccord avec le champ `restauration` de l'annuaire | 31 |
| Données manquantes inattendues | Collèges publics ou sous contrat à la demi-pension inconnue | 2 |
| Données manquantes inattendues | Collèges publics ou sous contrat sans site web (ni dans l'annuaire, ni corrigé) | 135 |
| Données manquantes inattendues | Collèges publics ou sous contrat sans LV1 ni LV2 connues | 15 |
| Données manquantes inattendues | Dispositifs ONISEP non classés | 0 |
| Données manquantes inattendues | Passage au lycée « inconnu » | 49 |
| Données manquantes inattendues | Communes sans contour (contours-<dép>.geojson) | 0 |
| Corrections manuelles et vérifications | Collèges suivis hors du périmètre (data/overrides/suivis.json) | 0 |
| Corrections manuelles et vérifications | À vérifier à la main (data/overrides/colleges.json, `aVerifier`) | 3 |
| Corrections manuelles et vérifications | Collèges sans 6e détectés (effectif de 6e nul à la dernière rentrée connue) | 3 |
| Corrections manuelles et vérifications | Collèges suivis privés sous contrat avec lycée, sans formulation écrite sur le passage | 8 |
| Corrections manuelles et vérifications | Événements rejetés (data/overrides/events.json) | 0 |
| Corrections manuelles et vérifications | Événements et inscriptions de collèges hors périmètre (data/overrides/events.json) | 0 |
| Contrôles par géocodage (Géoplateforme) | Libellés de la carte scolaire différents du géocodeur après normalisation (échantillon de 40) | 8 |

### Jointures ratées, par source

Jointure sur l'UAI. Les hors contrat ne figurent dans aucun jeu statistique : seuls les collèges publics et sous contrat sont comptés.

**Absents du jeu « IVAC session 2025 » : 33.**

Collège Hector Berlioz (0752252R), Collège privé École active bilingue Jeannine Manuel (0752935H), Collège privé France Quéré - Association Votre école chez vous (0752954D), Collège privé Beth Yacov (0753387Z), Collège privé Regain Tournesol (0754861B), Collège privé Gaston Tenoudji (0755192L), Collège privé Saint-Jean de Dieu (0756020L), Collège privé Beth Aaron (0756124Z), Collège privé Père Jacques (0772650M), Collège Simone Veil (0772923J), Collège Marthe Gautier (0772945H), Collège Jeanne Bonnardel Beguin (0772946J), Collège privé Saint-Colomban (0772953S), Collège Joséphine Baker (0772968H), Collège Jean-Jacques Barbaux (0773007A), Collège Madeleine Brès (0773030A), Collège privé Saint-Thomas de Villeneuve (0783816Z), Collège Les Châtaigniers (0783838Y), Collège Claudine Hermann (0912487J), Collège Julie-Victoire Daubié (0912539R), Collège Saint-Spire Sénart (0912547Z), Collège Saint-Philippe (0922340U), Ecole de danse de l'Opéra de Paris (0922579D), Collège privé Beth Hilel (0922751R), Collège privé Tebrotzassère (0930970Z), Collège privé réussite éducative valeurs et épanouissement (0932860D), Collège Niki de Saint Phalle (0932966U), Collège Poullart des Places (0941891V), Collège privé Saint-Mesrop Arabian (0942392P), Collège Saint-Pie X (Fondation d'Auteuil) (0951220K), Collège Saint-Jean (0952136F), Collège Marie-José Perec (0952326M), Nouveau collège de Saint-Ouen-L'Aumône (0952381X).

**Absents du jeu « DNB session 2021 » : 29.**

Collège privé Regain Tournesol (0754861B), Collège privé Saint-Jean de Dieu (0756020L), Collège privé Beth Aaron (0756124Z), Collège Marthe Simard (0772868Z), Collège Simone Veil (0772923J), Collège Marie-Amélie Le Fur (0772944G), Collège Marthe Gautier (0772945H), Collège Jeanne Bonnardel Beguin (0772946J), Collège privé Saint-Colomban (0772953S), Collège Joséphine Baker (0772968H), Collège Jean-Jacques Barbaux (0773007A), Collège Madeleine Brès (0773030A), Collège André Chénier-Nouveau (0783774D), Collège privé Saint-Thomas de Villeneuve (0783816Z), Collège Les Châtaigniers (0783838Y), Collège Claudine Hermann (0912487J), Collège Julie-Victoire Daubié (0912539R), Collège Saint-Spire Sénart (0912547Z), Collège Sainte-Louise de Marillac (0932772H), Collège privé La Salle - Le Landy (0932773J), Collège privé réussite éducative valeurs et épanouissement (0932860D), Collège Niki de Saint Phalle (0932966U), Collège Samuel Paty (0942482M), Collège Nelson Mandela (0942499F), Collège Gisèle Halimi (0942532S), Collège Caroline Aigle (0952282P), Collège Suzanne Lenglen (0952325L), Collège Marie-José Perec (0952326M), Nouveau collège de Saint-Ouen-L'Aumône (0952381X).

**Absents du jeu « IPS 2025 » : 5.**

Collège privé Beth Aaron (0756124Z), Collège Madeleine Brès (0773030A), Collège Julie-Victoire Daubié (0912539R), Collège Saint-Spire Sénart (0912547Z), Nouveau collège de Saint-Ouen-L'Aumône (0952381X).

**Absents du jeu « Effectifs 2025 » : 6.**

Collège privé Beth Aaron (0756124Z), Collège Madeleine Brès (0773030A), Maison de la Légion d'Honneur (0783122V), Collège Julie-Victoire Daubié (0912539R), Collège Saint-Spire Sénart (0912547Z), Nouveau collège de Saint-Ouen-L'Aumône (0952381X).

**Absents du jeu « Évaluations 6e 2025 » : 19.**

Collège Jacques Decour (0752532V), Collège privé Sainte-Jeanne-Élisabeth (0752894N), Collège privé France Quéré - Association Votre école chez vous (0752954D), Collège privé Beth Yacov (0753387Z), Collège Évariste Galois (0753937X), Collège privé Regain Tournesol (0754861B), Collège privé Beth Aaron (0756124Z), Collège privé Père Jacques (0772650M), Collège Madeleine Brès (0773030A), Maison de la Légion d'Honneur (0783122V), Collège Sainte-Jeanne d'Arc (0910820X), Collège Julie-Victoire Daubié (0912539R), Collège Saint-Spire Sénart (0912547Z), Collège Hautefeuille (0922482Y), Collège Pablo Neruda (0931224A), Collège Louis Pasteur (0941037S), Collège Ozar Hatorah Garçons (0941942A), Collège Saint-Jean (0952136F), Nouveau collège de Saint-Ouen-L'Aumône (0952381X).

**Absents du jeu « Encadrement 2025 » : 8.**

Collège privé France Quéré - Association Votre école chez vous (0752954D), Collège privé Regain Tournesol (0754861B), Collège privé Beth Aaron (0756124Z), Collège Madeleine Brès (0773030A), Maison de la Légion d'Honneur (0783122V), Collège Julie-Victoire Daubié (0912539R), Collège Saint-Spire Sénart (0912547Z), Nouveau collège de Saint-Ouen-L'Aumône (0952381X).

**Absents du jeu « Personnel » : 8.**

Collège privé Beth Aaron (0756124Z), Collège Joséphine Baker (0772968H), Collège Jean-Jacques Barbaux (0773007A), Collège Madeleine Brès (0773030A), Collège Julie-Victoire Daubié (0912539R), Collège Saint-Spire Sénart (0912547Z), Collège Niki de Saint Phalle (0932966U), Nouveau collège de Saint-Ouen-L'Aumône (0952381X).

**Absents du jeu « Hébergement (demi-pension) » : 6.**

Collège privé Beth Aaron (0756124Z), Collège Madeleine Brès (0773030A), Maison de la Légion d'Honneur (0783122V), Collège Julie-Victoire Daubié (0912539R), Collège Saint-Spire Sénart (0912547Z), Nouveau collège de Saint-Ouen-L'Aumône (0952381X).

**Absents du jeu « ONISEP Idéo-Structures » : 5.**

Collège Jean-Jacques Barbaux (0773007A), Collège Madeleine Brès (0773030A), Ecole de danse de l'Opéra de Paris (0922579D), Collège privé Beth Hilel (0922751R), Collège privé La Salle - Le Landy (0932773J).

**Absents du jeu « ONISEP Idéo-Langues » : 13.**

Collège privé Saint-Colomban (0772953S), Collège Joséphine Baker (0772968H), Collège Jean-Jacques Barbaux (0773007A), Collège Madeleine Brès (0773030A), Collège privé Samarcande (0783592F), Collège privé Saint-Thomas de Villeneuve (0783816Z), Collège Les Châtaigniers (0783838Y), Collège privé Beth Hilel (0922751R), Collège privé La Salle - Le Landy (0932773J), Collège Nelson Mandela (0942499F), Collège Louise Weiss (0952236P), Collège Caroline Aigle (0952282P), Nouveau collège de Saint-Ouen-L'Aumône (0952381X).

**Collèges publics parisiens absents de la carte Affelnet : 1.**

Collège Rognoni – École des enfants du spectacle (0750407K).

**Nom dans une source sans mot commun avec celui de l'annuaire : 37.** Renommage ou erreur d’UAI.

- Collège privé Thérèse Chappuis (0753854G) — effectifs : « SAINT FRANCOIS DE SALES -THERE »
- Collège privé Saint-Vincent-de-Paul (0753985Z) — dnb : « SAINTE-MARIE »
- Collège privé Gaston Tenoudji (0755192L) — dnb : « RACHI »
- Collège privé Gaston Tenoudji (0755192L) — ips : « COLLEGE PRIVE RACHI »
- Collège privé Gaston Tenoudji (0755192L) — effectifs : « RACHI »
- Collège Nellie Bly (0771656G) — dnb : « L'ARCHE GUEDON »
- Collège Samuel Paty (0780050F) — dnb : « DU BOIS D'AULNE »
- Collège Sébastienne Guyot (0780577D) — dnb : « ROMAIN ROLLAND »
- Collège Sébastienne Guyot (0780577D) — ips : « COLLEGE ROMAIN ROLLAND »
- Collège Sébastienne Guyot (0780577D) — effectifs : « ROMAIN ROLLAND »
- Maison de la Légion d'Honneur (0783122V) — dnb : « LES LOGES »
- Collège Sainte-Jeanne d'Arc (0910820X) — ivac : « COLLEGE PRIVE SAINT MARTIN »
- Collège Sainte-Jeanne d'Arc (0910820X) — dnb : « SAINT MARTIN »
- Collège Sainte-Jeanne d'Arc (0910820X) — ips : « COLLEGE PRIVE SAINT MARTIN »
- Collège Sainte-Jeanne d'Arc (0910820X) — effectifs : « SAINT MARTIN »
- Collège Hubert Germain (0911256W) — dnb : « DU PONT DE BOIS »
- Collège Hubert Germain (0911256W) — onisep : « Collège du Pont de Bois »
- Collège Institution Saint Vincent de Paul (0911750H) — dnb : « ILE DE FRANCE »
- Collège Saint-Nicolas (0911824N) — ivac : « COLLEGE PRIVE LA SALLE IGNY »
- Collège Saint-Nicolas (0911824N) — dnb : « LA SALLE IGNY »
- Collège Saint-Nicolas (0911824N) — ips : « COLLEGE PRIVE LA SALLE IGNY »
- Collège Saint-Nicolas (0911824N) — effectifs : « LA SALLE IGNY »
- Collège Jean Macé (0920884L) — ivac : « COLLEGE HUBERT GERMAIN »
- Collège Jean Macé (0920884L) — ips : « COLLEGE HUBERT GERMAIN »
- Collège Jean Macé (0920884L) — effectifs : « HUBERT GERMAIN »
- Collège Saint-Pierre Saint-Jean (0921015D) — ivac : « COLLEGE PRIVE LA TRINITE »
- Collège Saint-Pierre Saint-Jean (0921015D) — dnb : « LA TRINITE »
- Collège Saint-Pierre Saint-Jean (0921015D) — ips : « COLLEGE PRIVE LA TRINITE »
- Collège Saint-Pierre Saint-Jean (0921015D) — effectifs : « LA TRINITE »
- Collège Angela Davis (0931196V) — dnb : « PIERRE SEMARD »
- Collège Oum Kalthoum (0931212M) — dnb : « LENAIN DE TILLEMONT »
- Collège Assia Djebar (0941025D) — ivac : « COLLEGE GEORGES POLITZER »
- Collège Assia Djebar (0941025D) — dnb : « GEORGES POLITZER »
- Collège Assia Djebar (0941025D) — ips : « COLLEGE GEORGES POLITZER »
- Collège Assia Djebar (0941025D) — effectifs : « GEORGES POLITZER »
- Collège Christiane Desroches Noblecourt (0941602F) — dnb : « GEORGES BRASSENS »
- Collège Marie Sklodowska-Curie (0951232Y) — dnb : « MARCEL PAGNOL »

**Fiches Idéo-Structures écartées (même UAI qu'un collège, autre type) : 2.**

- École de danse de l'Opéra national de Paris (0922579D) — école d'art
- UFA François Rabelais (0941224V) — centre de formation d'apprentis

**Dispositifs ONISEP écartés (lieu non collège) : aucun.**

### Secteurs parisiens non reliés

Les secteurs de la Ville désignent les collèges par leur nom (jointure par nom).

**Secteurs reliés à aucun collège : aucun.**

**Noms publiés sans collège : aucun.**

**Collèges reliés à plusieurs secteurs : aucun.**

**Collèges reliés par leur nom, adresse publiée différente de l'annuaire : 10.**

- Collège Édouard Pailleron (0751707Y) — secteur SMC BERGSON / PAILLERON
- Collège Georges Courteline (0750444A) — secteur GEORGES COURTELINE
- Collège Gustave Flaubert (0753518S) — secteur GUSTAVE FLAUBERT
- Collège Maurice Utrillo (0751793S) — secteur MAURICE UTRILLO
- Collège Marie Curie (0754706H) — secteur SMC CURIE / PHILIPPE
- Collège Aimé Césaire (0755433Y) — secteur AIME CESAIRE
- Collège La Rose blanche (0755779Z) — secteur ROSE BLANCHE
- Collège Jean-François Oeben (0752542F) — secteur JEAN FRANCOIS OEBEN
- Collège Georges Méliès (0752606A) — secteur GEORGES MELIES
- Collège Françoise Seligmann (0755778Y) — secteur FRANCOISE SELIGMAN

### Écarts entre les polygones parisiens et la carte nationale

**Collèges des polygones de la Ville absents de la carte nationale : aucun.**

**Collèges de la carte nationale à Paris sans polygone de la Ville : aucun.**

### Collèges publics sans secteur

**Collèges publics parisiens sans secteur de la Ville : 1.**

Collège Rognoni – École des enfants du spectacle (0750407K).

**Collèges publics absents de la carte nationale alors que leur commune y figure : 6.** Étiquetés automatiquement « recrutement particulier » ; une correction (data/overrides/colleges.json) peut préciser le libellé.

- Collège Rognoni – École des enfants du spectacle (0750407K) — Paris 5e ; publié : « École des enfants du spectacle (recrutement sur dossier) »
- Maison de la Légion d'Honneur (0783122V) — Saint-Germain-en-Laye ; publié : « Réservé aux filles, petites-filles et arrière-petites-filles de décorés (Légion d'honneur, ordre national du Mérite, médaille militaire), en internat »
- Collège franco-allemand (0783546F) — Buc ; publié : « Lycée franco-allemand (admission sur examen d'entrée) »
- Collège international (0783547G) — Saint-Germain-en-Laye ; publié : « Sections internationales (admission sur dossier et tests de langue) »
- Ecole de danse de l'Opéra de Paris (0922579D) — Nanterre ; publié : « Élèves de l'École de danse de l'Opéra (admission sur concours) »
- Collège Ovide Decroly (0940024R) — Saint-Mandé ; publié : « sans secteur : recrutement sur dossier »

**Collèges publics d’une commune absente de la carte nationale qui en compte plusieurs : aucun.** Une commune absente de la carte avec un seul collège public y est rattachée par déduction : elle n’est pas comptée ici.

### Doublons

**UAI présents sur plusieurs lignes de l'annuaire : 1.** Fusionnés sur le site principal. La carte scolaire nationale avait aussi 281 lignes en double après normalisation des voies, retirées.

- Collège La Salle - Saint-Rosaire (0951509Z) — gardé « Collège La Salle - Saint-Rosaire » (53 rue Pierre Brossolette), écarté « Annexe Oscar Romero du collège La Salle - Saint-Rosaire de Sarcelles » (5 rue Gambetta)

### Données manquantes inattendues

**Valeurs manquantes sans raison : aucun.**

**Collèges publics ou sous contrat (hors contrat simple) sans résultat au brevet ou sans valeur ajoutée : 55.**

- brevetDernier : Non publié (1) : Collège Hector Berlioz (0752252R)
- vaTaux : Valeur ajoutée non calculée (moins de 40 présents ou appariement insuffisant) ; vaNote : Valeur ajoutée non calculée (moins de 40 présents ou appariement insuffisant) (23) : Collège privé Morvan (0752916M), Collège privé Sinaï (0753206C), Collège privé Beth Hanna (0753369E), Collège privé Thérèse Chappuis (0753854G), Collège privé Saint-Joseph (0753992G), Collège privé Saint-Louis (0754008Z), Collège privé Heikhal Menahem Sinaï (0755029J), Collège Perceval (0781601S), Collège privé Samarcande (0783592F), Collège Rudolf Steiner (0911601W), Collège Suger (0921919L), Collège Hautefeuille (0922482Y), Collège Sainte-Marie (0930963S), Collège Merkaz Hatorah Garçons (0931855L), Collège privé Chne Ohr (0932043R), Collège Merkaz Hatorah Filles (0932302X), Collège privé La Salle - Le Landy (0932773J), Collège Ovide Decroly (0940024R), Collège privé Bernard Palissy (0940892J), Collège Cours du Hameau (0942119T), Collège Jeanne d'Arc (0950751A), Collège Torat Emet (0951682M), Collège Ozar Hatorah (0951939S)
- brevet : Non publié ; brevetDernier : Non publié ; vaTaux : Non publié ; vaNote : Non publié (30) : Collège privé École active bilingue Jeannine Manuel (0752935H), Collège privé France Quéré - Association Votre école chez vous (0752954D), Collège privé Beth Yacov (0753387Z), Collège privé Gaston Tenoudji (0755192L), Collège privé Saint-Jean de Dieu (0756020L), Collège privé Beth Aaron (0756124Z), Collège privé Père Jacques (0772650M), Collège Simone Veil (0772923J), Collège Marthe Gautier (0772945H), Collège Jeanne Bonnardel Beguin (0772946J), Collège privé Saint-Colomban (0772953S), Collège Joséphine Baker (0772968H), Collège Jean-Jacques Barbaux (0773007A), Collège Madeleine Brès (0773030A), Collège privé Saint-Thomas de Villeneuve (0783816Z), Collège Les Châtaigniers (0783838Y), Collège Claudine Hermann (0912487J), Collège Julie-Victoire Daubié (0912539R), Collège Saint-Spire Sénart (0912547Z), Collège Saint-Philippe (0922340U), Collège privé Beth Hilel (0922751R), Collège privé Tebrotzassère (0930970Z), Collège privé réussite éducative valeurs et épanouissement (0932860D), Collège Niki de Saint Phalle (0932966U), Collège Poullart des Places (0941891V), Collège privé Saint-Mesrop Arabian (0942392P), Collège Saint-Pie X (Fondation d'Auteuil) (0951220K), Collège Saint-Jean (0952136F), Collège Marie-José Perec (0952326M), Nouveau collège de Saint-Ouen-L'Aumône (0952381X)
- brevetDernier : Non publié ; vaTaux : Valeur ajoutée non calculée (moins de 40 présents ou appariement insuffisant) ; vaNote : Valeur ajoutée non calculée (moins de 40 présents ou appariement insuffisant) (1) : Ecole de danse de l'Opéra de Paris (0922579D)

**Sans coordonnées dans l'annuaire, placés par le géocodage de leur adresse : 2.**

- Collège privé ABI SCHOOL 12 rue Charles Pouillet (0756898R) — « 12 rue Charles Pouillet 75017 » → « 12 Rue Claude Pouillet 75017 Paris » (score 0.50)
- Collège Nél (0942674W) — « 12 rue du Cadran 94220 » → « 12 Rue du Cadran 94220 Charenton-le-Pont » (score 0.96)

**Géocodage incertain (score < 0,7) : 1.** Adresse à vérifier à la main ; la corriger dans l'annuaire ou dans data/overrides/colleges.json.

- Collège privé ABI SCHOOL 12 rue Charles Pouillet (0756898R) — « 12 rue Charles Pouillet 75017 » → « 12 Rue Claude Pouillet 75017 Paris » (score 0.50)

**Géolocalisation approximative dans l'annuaire : 180.**

- Rue (159) : Collège privé Georges Gusdorf (0755496S), Collège privé Saint-Jean de Dieu (0756020L), Collège les Capucins (0770033T), Collège Alfred Sisley (0770038Y), Collège les Tournelles (0770059W), Collège Albert Camus (0771172F), Collège Sainte-Thérèse (0771217E), Collège Paul Langevin (0771331D), Collège Pierre Brossolette (0771339M), Collège Jean Vilar (0771365R), Collège Jean Moulin (0771419Z), Collège les Hyverneaux (0771421B), Collège Georges Politzer (0771476L), Collège François Villon (0771517F), Collège Jean-Jacques Rousseau (0771562E), Collège les Maillettes (0771618R), Collège Nicolas Fouquet (0771620T), Collège Anceau de Garlande (0771657H), Collège de l'Europe (0771759U), Collège André Malraux (0771761W), Collège Jean des Barres (0771912K), Collège Henri Wallon (0771960M), Collège Louis Aragon (0771991W), Collège le Bois de l'Enclume (0772091E), Collège le Segrais (0772125S), Collège Léonard de Vinci (0772154Y), Collège Hutinel (0772189L), Collège de l'Europe (0772190M), Collège Stephane Mallarmé (0772227C), Collège le Champivert (0772246Y), Collège George Sand (0772247Z), Collège Christine de Pisan (0772427V), Collège Nicolas Tronchon (0772483F), Collège de la Dhuis (0772499Y), Collège Les Blés d'or (0772548B), Collège Erik Satie (0772573D), Collège privé Sacré Coeur Enfant Jésus (0772937Z), Collège Marthe Gautier (0772945H), Collège Jeanne Bonnardel Beguin (0772946J), Collège Joséphine Baker (0772968H), Collège Jean-Jacques Barbaux (0773007A), Collège Madeleine Brès (0773030A), Collège Les Plaisances (0780116C), Collège Jules Verne (0780180X), Collège Maurice Ravel (0780262L), Collège Blaise Pascal (0780420H), Collège Arthur Rimbaud (0780506B), Collège Henri IV (0780571X), Collège Paul Verlaine (0780572Y), Collège Les Châtelaines (0780573Z), Collège Marcel Pagnol (0780707V), Collège des Hauts Grillets (0780714C), Collège Alexandre Dumas (0780720J), Collège Albert Camus (0780758A), Collège La Fosse aux Dames (0780760C), Collège George Sand (0781098V), Collège Saint-Louis Notre-Dame du Bel Air (0781600R), Collège André Derain (0781683F), Collège Les Saules (0781695U), Collège Jean François Champollion (0781789W), Collège Jean Monnet (0781863B), Collège Georges Pompidou (0781864C), Collège Jacques Cartier (0781885A), Collège Catherine de Vivonne (0781886B), Collège de Gassicourt (0781955B), Collège Les Hautes Rayes (0781985J), Collège La Clé Saint-Pierre (0782114Z), Maison de la Légion d'Honneur (0783122V), Collège de la Montcient (0783464S), Collège international (0783547G), Collège Juliette Adam (0910024G), Collège Michel Vignaud (0910028L), Collège Émile Zola (0910969J), Collège Albert Camus (0910977T), Collège André Dunoyer de Segonzac (0911022S), Collège Jean Lurçat (0911025V), Collège Le Parc de Villeroy (0911185U), Collège Paul Fort (0911250P), Collège La Tuilerie (0911341N), Collège La Vallée (0911397Z), Collège de Guinette (0911402E), Collège Hubert Robert (0911403F), Collège Jean Rostand (0911404G), Collège Montesquieu (0911444A), Collège Le Roussay (0911447D), Collège Condorcet (0911491B), Collège Saint-Exupéry (0911572P), Collège Léonard de Vinci (0911574S), Collège Institution Saint Vincent de Paul (0911750H), Collège Paul Éluard (0911865H), Collège Camille Claudel (0911948Y), Collège de l'Ermitage (0912086Y), Collège Robert Doisneau (0912109Y), Collège Claudine Hermann (0912487J), Collège Julie-Victoire Daubié (0912539R), Collège Romain Rolland (0920624D), Collège Paul Éluard (0920880G), Collège Sainte-Jeanne d'Arc (0920936T), Collège Les Bons Raisins (0921234S), Collège André Doucet (0921394R), Collège François Truffaut (0922565N), Ecole secondaire privée du Centre de référence pour l'évaluation neuropsychologique de l'enfant (CERENE) (0922977L), Collège privé Beth Sepher Yad Mordekai (0923042G), Collège Jean de Beaumont (0930043S), Collège Romain Rolland (0930616P), Collège Paul Painlevé (0930897V), Collège Pierre de Ronsard (0931149U), Collège Le Parc (0931189M), Collège Federico Garcia Lorca (0931489N), Collège Antoine Laurent de Lavoisier (0931713G), Collège Robert Doisneau (0932366S), Collège privé Tachbar (0932647X), Collège Groupe Scolaire Privé Bougainville (0932797K), Collège Niki de Saint Phalle (0932966U), Collège Jean Charcot (0940038F), Collège Roland Garros (0940749D), Collège Antoine de Saint-Exupéry (0940793B), Collège Antoine de Saint-Exupéry (0941017V), Collège Karl Marx (0941036R), Collège Paul Éluard (0941095E), Collège Albert Camus (0941233E), Collège Blaise Cendrars (0941478W), Collège Janusz Korczak (0941603G), Collège Josette et Maurice Audin (0942434K), Collège Samuel Paty (0942482M), Collège Aristide Briand (0950014Z), Collège Jules Ferry (0950019E), Collège Bel Air (0950022H), Collège Jules Ferry (0950892D), Collège André Chénier (0950893E), Collège Pierre et Marie Curie (0950898K), Collège Stendhal (0950926R), Collège L'Ardillière de Nézant (0950931W), Collège Chantereine (0950943J), Collège Le Carré Sainte-Honorine (0950945L), Collège Marcel Pagnol (0951051B), Collège Blaise Pascal (0951052C), Collège Jean Moulin (0951143B), Collège Camille Claudel (0951154N), Collège Pablo Picasso (0951194G), Collège Maubuisson (0951400F), Collège La Justice (0951401G), Collège Henri Guillaumet (0951527U), Collège Sainte-Apolline (0951724H), Collège Jacques-Yves Cousteau (0951725J), Collège Le Petit Bois (0951726K), Collège des Merisiers (0951801S), Collège Le Luat (0951817J), Collège Françoise Dolto (0951919V), Collège François Truffaut (0951920W), Collège Les Explorateurs (0951964U), Collège Cécile Sorel (0951991Y), Collège Louis Augustin Bosc (0951992Z), Collège Henri Matisse (0952036X), Collège Georges Charpak (0952128X), Collège Saint-Jean (0952136F), Collège Suzanne Lenglen (0952325L), Collège Marie-José Perec (0952326M), Nouveau collège de Saint-Ouen-L'Aumône (0952381X)
- BATIMENT (18) : Collège parc des Tourelles (0770014X), Collège les Aulnes (0771475K), Collège Louis Armand (0771518G), Collège Paul Éluard (0771567K), Collège Georges Brassens (0771615M), Collège privé Beth Myriam (0771668V), Collège Stéphane Hessel (0772714G), Collège Auguste Delaune (0931195U), Collège Clos Saint-Vincent (0931214P), Collège Simone Veil (0932578X), Collège Césaria Evora (0932579Y), Collège Jacqueline de Romilly (0932580Z), Collège international de l'Est parisien (0932581A), Collège Dora Maar (0932582B), Collège Saint-Vincent-de-Paul (0932586F), Collège Amédée Laplace (0940003T), Collège Pierre Brossolette (0940791Z), Collège privé Sports études de Paris (SEDP) (0942366L)
- Ville (2) : Collège Nazareth (0771930E), Ecole secondaire privée La Jonchère EIB Campus (0783810T)
- NE SAIT PAS (1) : Collège Caroline Aigle (0952282P)

**Demi-pension (jeu « hébergement », retenu) en désaccord avec le champ `restauration` de l'annuaire : 31.**

- 0 demi-pensionnaires en 2025, restauration 1 (19) : Collège privé Lucien de Hirsch (0754003U), Collège privé Regain Tournesol (0754861B), Collège Les Plaisances (0780116C), Collège Albert Thierry (0780255D), Collège Le Racinay (0780256E), Collège Colette (0780258G), Collège Jean Zay (0780267S), Collège Pasteur (0780504Z), Collège Philippe de Champaigne (0780512H), Collège Le Village (0780514K), Collège La Vaucouleurs (0780569V), Collège Alexandre Dumas (0780720J), Collège George Sand (0781098V), Collège Marcel Roby (0781204K), Collège Louis Pasteur (0781896M), Collège Camille du Gast (0783636D), Collège Gay-Lussac (0921494Z), Collège Évariste Galois (0921589C), Collège Les Bruyères (0922523T)
- 101 demi-pensionnaires en 2025, restauration 0 (1) : Collège privé Catherine Labouré (0755840R)
- 31 demi-pensionnaires en 2025, restauration 0 (1) : Collège privé Saint-Jean de Dieu (0756020L)
- 78 demi-pensionnaires en 2025, restauration 0 (1) : Collège André Malraux (0771761W)
- 354 demi-pensionnaires en 2025, restauration 0 (1) : Collège Marthe Simard (0772868Z)
- 257 demi-pensionnaires en 2025, restauration 0 (1) : Collège privé Saint-Colomban (0772953S)
- 294 demi-pensionnaires en 2025, restauration 0 (1) : Collège Jean Jaurès (0931143M)
- 114 demi-pensionnaires en 2025, restauration 0 (1) : Collège privé Protectorat Saint-Joseph (0932652C)
- 389 demi-pensionnaires en 2025, restauration 0 (1) : Collège Germaine Tillion (0932695Z)
- 139 demi-pensionnaires en 2025, restauration 0 (1) : Collège Sainte-Louise de Marillac (0932772H)
- 65 demi-pensionnaires en 2025, restauration 0 (1) : Collège privé La Salle - Le Landy (0932773J)
- 109 demi-pensionnaires en 2025, restauration 0 (1) : Collège Jules Ferry (0941024C)
- 303 demi-pensionnaires en 2025, restauration 0 (1) : Collège Isabelle Autissier (0952205F)

**Collèges publics ou sous contrat à la demi-pension inconnue : 2.**

Collège privé Beth Aaron (0756124Z), Maison de la Légion d'Honneur (0783122V).

**Collèges publics ou sous contrat sans site web (ni dans l'annuaire, ni corrigé) : 135.** Hors contrat sans site web : 126.

Collège privé Beth Hanna (0753369E), Collège privé Ozar Hatorah (0754290F), Collège privé Heikhal Menahem Sinaï (0755029J), Collège privé N'R Hatorah (0755052J), Collège privé Gaston Tenoudji (0755192L), Collège Denecourt (0770002J), Collège Jean Rostand (0770003K), Collège Camille Corot (0770013W), Collège du Montois (0770020D), Collège La Rochefoucauld (0770024H), Collège Jacques Prévert (0770030P), Collège Émile Chevallier (0770048J), Collège Jean Baptiste Vermay (0770051M), Collège Elsa Triolet (0770053P), Collège les Creusottes (0770057U), Collège les Tournelles (0770059W), Collège Rosa Bonheur (0771068T), Collège Pierre de Montereau (0771174H), Collège René Goscinny (0771177L), Collège la Mare aux Champs (0771178M), Collège privé Sainte-Céline (0771222K), Collège institution Sainte-Foy (0771233X), Collège Gérard Philipe (0771333F), Collège Gérard Philipe (0771334G), Collège Elsa Triolet (0771337K), Collège Louis Braille (0771361L), Collège Camille Saint-Saens (0771362M), Collège le Moulin à Vent (0771472G), Collège Georges Politzer (0771476L), Collège Arthur Rimbaud (0771478N), Collège des Remparts (0771514C), Collège Louise Michel (0771519H), Collège Jean-Jacques Rousseau (0771562E), Collège Eugène Delacroix (0771563F), Collège Paul Éluard (0771567K), Collège Georges Brassens (0771615M), Collège les Maillettes (0771618R), Collège Charles Péguy (0771619S), Collège Nicolas Fouquet (0771620T), Collège Nellie Bly (0771656G), Collège la Plaine des Glacis (0771659K), Collège le grand parc (0771662N), Collège Mon Plaisir (0771667U), Collège Madame de La Fayette (0771760V), Collège André Malraux (0771761W), Collège Jacques Amyot (0771762X), Collège Beau Soleil (0771766B), Collège le Luzard (0771841H), Collège Bautain (0771917R), Collège Louis Aragon (0771991W), Collège la Maillière (0771992X), Collège Georges Brassens (0771993Y), Collège Jean Wiener (0772090D), Collège Van Gogh (0772119K), Collège le Segrais (0772125S), Collège Robert Buron (0772126T), Collège Saint-Louis (0772128V), Collège Léonard de Vinci (0772154Y), Collège Stephane Mallarmé (0772227C), Collège George Sand (0772247Z), Collège George Sand (0772248A), Collège La Grange du Bois (0772274D), Collège Marie Laurencin (0772293Z), Collège Monthéty (0772331R), Collège Christine de Pisan (0772427V), Collège de la Pyramide (0772429X), Collège de la Dhuis (0772499Y), Collège Erik Satie (0772573D), Collège Vasco de Gama (0772574E), Collège Colonel Arnaud Beltrame (0772867Y), Collège Marthe Simard (0772868Z), Collège Simone Veil (0772923J), Collège Joséphine Baker (0772968H), Collège Jean-Jacques Barbaux (0773007A), Collège Madeleine Brès (0773030A), Collège Auguste Renoir (0780507C), Collège André Maurois (0910017Z), Collège Sainte-Jeanne d'Arc (0910820X), Collège Pierre de Ronsard (0911441X), Collège Saint-Exupéry (0911572P), Collège Camille Claudel (0911948Y), Collège La Fontaine aux Bergers (0912175V), Collège Julie-Victoire Daubié (0912539R), Collège Romain Rolland (0920624D), Collège Lakanal (0920626F), Collège Saint-Pierre Saint-Jean (0921015D), Collège de la Paix (0922247T), Ecole de danse de l'Opéra de Paris (0922579D), Collège Bienheureux Charles de Foucauld (0922731U), Collège privé Beth Hilel (0922751R), Collège Albert Camus (0930586G), Collège Saint-Exupéry (0930593P), Collège Nelson Mandela (0930611J), Collège Jean-Baptiste Corot (0930629D), Collège Jean Lurçat (0930865K), Collège Anatole France (0930892P), Collège Roger Martin du Gard (0930893R), Collège privé Assomption (0930906E), Collège Georges Politzer (0931148T), Collège Jean Moulin (0931151W), Collège Didier Daurat (0931187K), Collège Raymond Poincaré (0931188L), Collège Romain Rolland (0931191P), Collège Les Mousseaux (0931192R), Collège Angela Davis (0931196V), Collège Georges Politzer (0931209J), Collège Colonel Fabien (0931213N), Collège Irène et Frédéric Joliot Curie (0931217T), Collège Jean-Jacques Rousseau (0931219V), Collège Joliot Curie (0931225B), Collège Albert Camus (0931228E), Collège Elsa Triolet (0931230G), Collège Gustave Courbet (0931381W), Collège Eugène Carrière (0931382X), Collège Jean Vigo (0931428X), Collège La Courtille (0931490P), Collège Jean Jaurès (0931546A), Collège Alfred Sisley (0931765N), Collège Henri Matisse (0931845A), Collège Françoise Dolto (0932038K), Collège privé Chne Ohr (0932043R), Collège Iqbal Masih (0932273R), Collège Lucie Aubrac (0932454M), Collège privé La Salle - Le Landy (0932773J), Collège privé réussite éducative valeurs et épanouissement (0932860D), Collège Niki de Saint Phalle (0932966U), Collège Sainte-Thérèse (0940807S), Collège de Maille (0940884A), Collège Ozar Hatorah Filles (0941614U), Collège Poullart des Places (0941891V), Collège Notre-Dame (0950758H), Collège Simone Veil (0950895G), Collège Jacques Monod (0950933Y), Collège ORT (0951916S), Nouveau collège de Saint-Ouen-L'Aumône (0952381X).

**Collèges publics ou sous contrat sans LV1 ni LV2 connues : 15.**

Collège Simone Veil (0772923J), Collège privé Saint-Colomban (0772953S), Collège Joséphine Baker (0772968H), Collège Jean-Jacques Barbaux (0773007A), Collège Madeleine Brès (0773030A), Collège privé Samarcande (0783592F), Collège privé Saint-Thomas de Villeneuve (0783816Z), Collège Les Châtaigniers (0783838Y), Collège Julie-Victoire Daubié (0912539R), Collège privé Beth Hilel (0922751R), Collège privé La Salle - Le Landy (0932773J), Collège Nelson Mandela (0942499F), Collège Louise Weiss (0952236P), Collège Caroline Aigle (0952282P), Nouveau collège de Saint-Ouen-L'Aumône (0952381X).

**Dispositifs ONISEP non classés : aucun.**

**Passage au lycée « inconnu » : 49.**

Collège privé Notre-Dame de Sion (0754757N), Collège privé Georges Gusdorf (0755496S), Ecole générale et technologique privée Cours Progress (0755757A), Collège Kingsworth International School (0755773T), Collège privé Cours du Pont de Pierre (0755799W), Collège privé ICS Paris (0755848Z), Collège privé Ecole Démocratique de Paris (0755879H), Ecole Canadienne Internationale de Paris (0755897C), Collège privé La classe du phare (0756051V), Collège privé Montessori (0756191X), Collège privé Ellipse Montessori (0756197D), Collège privé École Diagonale (0756203K), Collège privé Cours Molière (0756204L), Ecole Secondaire Privée Maigret (0756273L), Ecole Secondaire Privée International School of Paris (0756274M), Collège privé Cours Montaigne (0756278S), Collège privé BETH SEFER YAD MORDEKHAI (0756282W), Collège privé Ecole A (0756489W), Collège Privé Ipecom (0756786U), Collège privé ABI SCHOOL 12 rue Charles Pouillet (0756898R), Collège privé Beth Myriam (0771668V), Collège privé Oneschool Global Paris Campus (0772740K), Ecole secondaire privée International Montessori Athéna (0783682D), Ecole secondaire privée La Jonchère (0783727C), Ecole secondaire privée sports Académy le Mesnil (0783764T), Ecole secondaire privée Pilcalli (0783772B), Ecole secondaire privée La Jonchère EIB Campus (0783810T), Ecole secondaire privée Station phoenix (0783846G), Ecole secondaire privée Cité Educative du Paris-Saint-Germain (0783870H), Ecole secondaire privée Groupe Scolaire Excellence (0912353N), Ecole secondaire privée La Lumière du Savoir (0912378R), Ecole secondaire privée  international scolaire - Open Sky International (0922798S), Ecole secondaire privée internationale Deutsche Schule Paris (0922943Z), Ecole secondaire privée Cours Singulier (0922964X), Ecole secondaire privée Ecole Diagonale (0922967A), Collège privé Beth Sepher Yad Mordekai (0923042G), Collège du Groupe scolaire privé Bellevue Muhammed Hamidullah (0932642S), Collège privé La Fraternité (0932646W), Collège privé La plume de l'éducation (0932717Y), Collège - Groupe Scolaire Privé APCS (0932728K), Collège Groupe Scolaire Privé Bougainville (0932797K), Collège privé Lab School Montreuil (0932890L), Collège privé ISE Emeth Leyaacov - Filles (0942143U), Collège privé ISE Emeth Leyaacov - Garçons (0942185P), Collège du groupe scolaire privé Education et Savoir (0942223F), Collège privé l'Ecole Heureuse - LEH (0942336D), Collège privé Sports études de Paris (SEDP) (0942366L), Ecole secondaire privée Beth Yaacov (0952133C), Ecole secondaire privée Torah Or (0952222Z).

**Communes sans contour (contours-<dép>.geojson) : aucun.**

### Corrections manuelles et vérifications

Fichiers de data/overrides/.

**Collèges suivis hors du périmètre (data/overrides/suivis.json) : aucun.** Ignorés : aucun collège publié n'est marqué suivi pour eux.

**À vérifier à la main (data/overrides/colleges.json, `aVerifier`) : 3.**

- Collège privé L'École alsacienne (0752874S) — Le domaine ecole-alsacienne.org ne répondait plus le 2026-10-07 (site conservé dans la fiche).
- Collège privé Saint-Louis (0754008Z) — Le domaine college-st-louis.org indiqué par l'annuaire est parqué ; la page du collège est hébergée par lyceesaintnicolas.com/college-saint-louis/.
- Collège privé Notre-Dame de Sion (0754757N) — robots.txt de sion-paris.fr bloque ClaudeBot : passage au lycée et inscriptions à vérifier à la main.

**Collèges sans 6e détectés (effectif de 6e nul à la dernière rentrée connue) : 3.** Collège qui ouvre ou ferme, 6e transférée : à confirmer, et corriger `niveaux` si besoin.

- Collège Jacques Decour (0752532V) — niveaux publiés : 4e, 3e
- Collège privé France Quéré - Association Votre école chez vous (0752954D) — niveaux publiés : 4e, 3e
- Collège Saint-Jean (0952136F) — niveaux publiés : 5e, 4e, 3e

**Collèges suivis privés sous contrat avec lycée, sans formulation écrite sur le passage : 8.** « Poursuite habituelle, non garantie par écrit » : à relever sur le site du collège (data/overrides/continuite.json).

Collège privé Notre-Dame de France (0752896R), Collège privé Stanislas (0752900V), Collège privé Yabné (0752906B), Collège privé Saint-Sulpice (0752924W), Collège privé Sainte-Geneviève (0752925X), Collège privé Sœur Rosalie (0753967E), Collège privé Saint-Louis (0754008Z), Collège privé Epin (0940874P).

**Événements rejetés (data/overrides/events.json) : aucun.**

**Événements et inscriptions de collèges hors périmètre (data/overrides/events.json) : aucun.**

### Contrôles par géocodage (Géoplateforme)

**Libellés de la carte scolaire différents du géocodeur après normalisation (échantillon de 40) : 8.** Imputables à la normalisation : 2.

- RUE DE LA BUTTE DU LUET (77067) — géocodeur : Rue de la Butte du Luet → RUE DE LA BUTTE DU LUET ; autre commune renvoyée
- SQUARE PAUL LEVEQUE (77243) — géocodeur : — → — ; aucun résultat du géocodeur
- PONT AUX POULAINS (77294) — géocodeur : Rue Paul Vaillant Couturier → RUE PAUL VAILLANT COUTURIER ; autre voie renvoyée (voie inconnue du géocodeur ?)
- RUE DU TITANE (77445) — géocodeur : Rue du Rhône → RUE DU RHONE ; écart de normalisation
- PASSAGE DES PETITS PAS (78138) — géocodeur : Passage des Violettes → PASSAGE DES VIOLETTES ; autre commune renvoyée
- IMPASSE SAINT JEAN (91223) — géocodeur : Rue Saint-jean → RUE SAINT JEAN ; écart de normalisation
- BOULEVARD CIRCULAIRE (92026) — géocodeur : Boulevard Circulaire → BOULEVARD CIRCULAIRE ; autre commune renvoyée
- PLACE DES QUATRE TOURS (93007) — géocodeur : Cité Quatre Tours → CITE QUATRE TOURS ; autre voie renvoyée (voie inconnue du géocodeur ?)

## 3. Détail des collèges suivis

60 collèges suivis (data/overrides/suivis.json), par UAI. Les autres collèges n'apparaissent que dans les totaux et les anomalies.

### Résultats et note maison

| Collège | Commune | Statut | Rang | Note | Lettre | Brevet | Écrit | VA | Partielle | Brevet 3 ans (%) | Écrit 3 ans | VA taux | VA note | IPS | Effectif |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Collège Rognoni – École des enfants du spectacle (0750407K) | Paris 5e | public | 208 | 14.2 | B | 18 | 19.7 | 5 |  | 98.6 | 14.4 | -0.7 | -1.3 | 155.9 | 218 |
| Collège Alberto Giacometti (0750445B) | Paris 14e | public | 804 | 5.1 | D | 5 | 5.4 | 4.9 |  | 83.2 | 10.1 | -3.3 | -0.5 | 99.8 | 485 |
| Collège Moulin des Prés (0750525N) | Paris 13e | public | 403 | 9.7 | C | 9.9 | 14.8 | 4.5 |  | 89 | 12 | -3.7 | -0.5 | 120 | 449 |
| Collège Jean Moulin (0750611G) | Paris 14e | public | 330 | 11.3 | C | 13.5 | 15.3 | 5.2 |  | 93 | 12.1 | -1.7 | -0.7 | 112.6 | 501 |
| Collège Alphonse Daudet (0751705W) | Paris 14e | public | 560 | 7.7 | D | 7.8 | 9.9 | 5.4 |  | 86.6 | 11 | -4.3 | -0.3 | 100.7 | 457 |
| Collège Pierre Alviset (0751790N) | Paris 5e | public | 135 | 16.1 | A | 17.5 | 19.6 | 11.2 |  | 98 | 14.4 | 0 | 0.1 | 144.3 | 515 |
| Collège Raymond Queneau (0752186U) | Paris 5e | public | 298 | 12 | B | 14.4 | 17.2 | 4.4 |  | 94 | 12.6 | -2.3 | -0.8 | 134.5 | 377 |
| Collège Jacques Prévert (0752187V) | Paris 6e | public | 208 | 14.2 | B | 16.5 | 15.4 | 10.6 |  | 96.6 | 12.1 | 2.7 | -0.3 | 129.4 | 320 |
| Collège George Sand (0752316K) | Paris 13e | public | 413 | 9.6 | C | 9.4 | 10 | 9.5 |  | 88.4 | 11 | -0.7 | -0.1 | 112.9 | 451 |
| Collège Elsa Triolet (0752385K) | Paris 13e | public | 727 | 5.9 | D | 4.2 | 8.4 | 5.1 |  | 82 | 10.7 | -6.7 | -0.2 | 96.3 | 398 |
| Collège Henri IV (0752526N) | Paris 5e | public | 194 | 14.7 | B | 18.4 | 19.8 | 5.9 |  | 99 | 14.7 | 0 | -0.9 | 143.6 | 532 |
| Collège Montaigne (0752527P) | Paris 6e | public | 205 | 14.3 | B | 17.8 | 18.4 | 6.8 |  | 98.3 | 13.1 | 0.7 | -0.8 | 141.8 | 575 |
| Collège Lavoisier (0752531U) | Paris 5e | public | 177 | 15.1 | B | 18.5 | 19.1 | 7.8 |  | 99 | 13.7 | 0.7 | -0.5 | 147 | 354 |
| Collège Rodin (0752538B) | Paris 13e | public | 335 | 11.2 | C | 13 | 15 | 5.7 |  | 92.4 | 12 | -1.7 | -0.6 | 127.5 | 450 |
| Collège Claude Monet (0752539C) | Paris 13e | public | 232 | 13.5 | B | 14.4 | 18.3 | 7.7 |  | 94 | 13.1 | -1.7 | -0.2 | 119.5 | 439 |
| Collège Gabriel Fauré (0752540D) | Paris 13e | public | 212 | 14.1 | B | 14.1 | 14.8 | 13.3 |  | 93.7 | 12 | 2 | 0.1 | 108.5 | 431 |
| Collège Paul Bert (0752543G) | Paris 14e | public | 386 | 9.9 | C | 11.4 | 15.6 | 2.6 |  | 90.7 | 12.2 | -5.3 | -0.8 | 126.2 | 341 |
| Collège François Villon (0752544H) | Paris 14e | public | 861 | 4.5 | D | 1.2 | 4.3 | 7.9 |  | 74.5 | 9.9 | -8 | 0.3 | 98.2 | 390 |
| Collège Camille Claudel (0752694W) | Paris 13e | public | 921 | 3.8 | E | 0.4 | 5.9 | 5.1 |  | 70.4 | 10.2 | -13.3 | 0 | 90 | 380 |
| Collège privé L'École alsacienne (0752874S) | Paris 6e | privé sous contrat | 105 | 16.6 | A | 18.8 | 19.8 | 11.2 |  | 99.3 | 15 | 0.3 | 0 | 159 | 683 |
| Collège privé Notre-Dame de France (0752896R) | Paris 13e | privé sous contrat | 10 | 18.6 | A | 19.6 | 20 | 16.2 |  | 100 | 15.8 | 1 | 1.5 | 150.2 | 356 |
| Collège privé Stanislas (0752900V) | Paris 6e | privé sous contrat | 29 | 17.8 | A | 19.6 | 20 | 13.7 |  | 100 | 16.8 | 0 | 0.6 | 157.9 | 1308 |
| Collège privé Yabné (0752906B) | Paris 13e | privé sous contrat | 8 | 18.7 | A | 19.6 | 19.8 | 16.6 |  | 100 | 14.9 | 1.5 | 1.4 | 149 | 608 |
| Collège privé Sévigné (0752913J) | Paris 5e | privé sous contrat | 29 | 17.8 | A | 19.6 | 20 | 13.7 |  | 100 | 15.9 | 0.5 | 0.5 | 162 | 381 |
| Collège privé Morvan (0752916M) | Paris 14e | privé sous contrat | 635 | 6.9 | D | 11.7 | 2.1 |  | oui | 91 | 9.1 |  |  | 120.2 | 83 |
| Collège privé Saint-Sulpice (0752924W) | Paris 6e | privé sous contrat | 379 | 10 | C | 14.8 | 8.6 | 6.6 |  | 94.6 | 10.8 | 0 | -0.7 | 151 | 252 |
| Collège privé Sainte-Geneviève (0752925X) | Paris 6e | privé sous contrat | 235 | 13.4 | B | 16.8 | 18.3 | 5.1 |  | 97.1 | 13.1 | -1.3 | -0.8 | 150.2 | 337 |
| Collège Georges Braque (0752957G) | Paris 13e | public | 868 | 4.4 | D | 2.9 | 8.8 | 1.6 |  | 79.7 | 10.8 | -9.7 | -0.7 | 120.3 | 446 |
| Collège Gustave Flaubert (0753518S) | Paris 13e | public | 583 | 7.5 | D | 9.9 | 7.9 | 4.6 |  | 89 | 10.7 | -2 | -0.8 | 109.6 | 563 |
| Collège privé La Bruyère Sainte-Isabelle (0753908R) | Paris 14e | privé sous contrat | 29 | 17.8 | A | 19 | 19.7 | 14.8 |  | 99.7 | 14.5 | 1.3 | 0.5 | 151.1 | 598 |
| Collège Évariste Galois (0753937X) | Paris 13e | public | 359 | 10.5 | C | 11.9 | 5.7 | 14 |  | 91.2 | 10.2 | 5.3 | 0 | 91.8 | 387 |
| Collège privé Sœur Rosalie (0753967E) | Paris 5e | privé sous contrat | 105 | 16.6 | A | 18.5 | 19.8 | 11.6 |  | 99 | 15 | 0 | 0.2 | 147 | 450 |
| Collège privé La Salle – Notre-Dame de la Gare (0753982W) | Paris 13e | privé sous contrat | 156 | 15.7 | B | 17.8 | 18.5 | 10.8 |  | 98.3 | 13.2 | 1 | -0.1 | 141.3 | 506 |
| Collège privé Saint-Vincent-de-Paul (0753985Z) | Paris 13e | privé sous contrat | 184 | 14.9 | B | 17.8 | 18.9 | 8.1 |  | 98.3 | 13.5 | 0.3 | -0.4 | 136.5 | 582 |
| Collège privé Saint-Louis (0754008Z) | Paris 6e | privé sous contrat | 1127 | 0.5 | E | 0.5 | 0.5 |  | oui | 71 | 8 |  |  | 140.8 | 76 |
| Collège Saint-Exupéry (0754253R) | Paris 14e | public | 173 | 15.2 | B | 16.9 | 17.9 | 10.9 |  | 97.2 | 12.9 | 1.3 | -0.1 | 122.7 | 322 |
| Collège privé Notre-Dame de Sion (0754757N) | Paris 6e | privé sous contrat | 87 | 16.9 | A | 19.1 | 19.9 | 11.8 |  | 99.7 | 15.3 | 0 | 0.2 | 155.3 | 379 |
| Collège privé Regain Tournesol (0754861B) | Paris 13e | privé sous contrat (simple) |  |  |  |  |  |  |  |  |  |  |  | 143.2 | 34 |
| Collège Thomas Mann (0755000C) | Paris 13e | public | 392 | 9.8 | C | 11.8 | 5.7 | 11.9 |  | 91 | 10.2 | 4.3 | -0.3 | 103.2 | 461 |
| Collège privé Georges Gusdorf (0755496S) | Paris 14e | hors contrat |  |  |  |  |  |  |  |  |  |  |  |  |  |
| Collège privé Catherine Labouré (0755840R) | Paris 14e | privé sous contrat | 275 | 12.4 | B | 13.5 | 8.7 | 15 |  | 93 | 10.8 | 1 | 0.7 | 129.3 | 193 |
| Collège privé Diago (0755925H) | Paris 13e | hors contrat |  |  |  |  |  |  |  |  |  |  |  |  |  |
| Collège privé Paris FC (0756057B) | Paris 14e | hors contrat |  |  |  |  |  |  |  |  |  |  |  |  |  |
| Collège privé École Diagonale (0756203K) | Paris 5e | hors contrat |  |  |  |  |  |  |  |  |  |  |  |  |  |
| Collège privé Cours Montaigne (0756278S) | Paris 6e | hors contrat |  |  |  |  |  |  |  |  |  |  |  |  |  |
| Collège Adolphe Chérioux (0940042K) | Vitry-sur-Seine | public | 1055 | 2.3 | E | 2.1 | 1.5 | 3.4 |  | 77.6 | 8.8 | -4 | -0.8 | 95.8 | 460 |
| Collège Gustave Monod (0940794C) | Vitry-sur-Seine | public | 664 | 6.6 | D | 1.1 | 3.5 | 15.3 |  | 74 | 9.6 | 0.7 | 0.9 | 75.8 | 452 |
| Collège privé Epin (0940874P) | Vitry-sur-Seine | privé sous contrat | 15 | 18.3 | A | 19.6 | 20 | 15.3 |  | 100 | 16 | 0.7 | 0.9 | 141.6 | 386 |
| Collège Assia Djebar (0941025D) | Ivry-sur-Seine | public | 1070 | 2.1 | E | 1.1 | 1.8 | 3.5 |  | 74.4 | 9 | -5.3 | -0.5 | 88.5 | 359 |
| Collège Molière (0941026E) | Ivry-sur-Seine | public | 727 | 5.9 | D | 2.6 | 4.2 | 10.9 |  | 79 | 9.9 | -2 | 0.3 | 91.7 | 507 |
| Collège Jules Vallès (0941029H) | Vitry-sur-Seine | public | 560 | 7.7 | D | 8.3 | 1.7 | 13.1 |  | 87.1 | 8.9 | 9.7 | -0.3 | 90.3 | 635 |
| Collège Danielle Casanova (0941032L) | Vitry-sur-Seine | public | 493 | 8.5 | C | 8 | 3 | 14.6 |  | 86.9 | 9.5 | 6 | 0 | 85.5 | 439 |
| Collège Jean Perrin (0941033M) | Vitry-sur-Seine | public | 1016 | 2.8 | E | 1 | 1.2 | 6.3 |  | 73.8 | 8.6 | -4 | -0.2 | 85.3 | 557 |
| Collège Joseph Lakanal (0941034N) | Vitry-sur-Seine | public | 822 | 4.9 | D | 1.9 | 1.9 | 10.9 |  | 77.1 | 9 | -0.7 | 0.1 | 83.7 | 423 |
| Collège François Rabelais (0941224V) | Vitry-sur-Seine | public | 664 | 6.6 | D | 4.3 | 0.8 | 14.6 |  | 82 | 8.3 | 10.7 | -0.1 | 77.5 | 471 |
| Collège Romain Rolland (0941601E) | Ivry-sur-Seine | public | 612 | 7.2 | D | 4.1 | 1.5 | 16.1 |  | 81.9 | 8.8 | 6 | 0.3 | 95.4 | 567 |
| Collège Henri Wallon (0941781A) | Ivry-sur-Seine | public | 493 | 8.5 | C | 7.2 | 3.2 | 15.1 |  | 86 | 9.5 | 4.7 | 0.2 | 97.6 | 517 |
| Collège Josette et Maurice Audin (0942434K) | Vitry-sur-Seine | public | 605 | 7.3 | D | 7.6 | 6.2 | 8.1 |  | 86.4 | 10.3 | -0.3 | -0.3 | 110.6 | 423 |
| Collège Gisèle Halimi (0942532S) | Ivry-sur-Seine | public | 695 | 6.3 | D | 4.3 | 3.3 | 11.3 |  | 82 | 9.6 | 0 | 0.1 | 91.3 | 544 |
| Collège privé Dix sur Dix (0942626U) | Ivry-sur-Seine | hors contrat |  |  |  |  |  |  |  |  |  |  |  |  |  |

### Langues, options, dispositifs

| Collège | Source des langues | LV1 | LV2 | Anciennes | LCE | Bilangue | SI | CHA | Sport | Dispositifs |
|---|---|---|---|---|---|---|---|---|---|---|
| Collège Rognoni – École des enfants du spectacle (0750407K) | onisep | anglais | allemand, espagnol | latin, grec |  |  |  | arts du spectacle |  | ULIS |
| Collège Alberto Giacometti (0750445B) | onisep | anglais | allemand, espagnol, italien | latin |  | anglais, espagnol |  |  |  | SEGPA |
| Collège Moulin des Prés (0750525N) | onisep | anglais | allemand, espagnol | latin |  | allemand, anglais, arabe |  |  | volley ball | ULIS |
| Collège Jean Moulin (0750611G) | onisep | anglais | allemand, chinois, espagnol | latin, grec |  | allemand, anglais |  |  | judo | ULIS |
| Collège Alphonse Daudet (0751705W) | onisep | anglais | allemand, espagnol | latin, grec |  | allemand, anglais |  |  | athletisme | ULIS |
| Collège Pierre Alviset (0751790N) | onisep | anglais | allemand, espagnol, italien | latin, grec |  | allemand, anglais, italien |  |  |  | ULIS |
| Collège Raymond Queneau (0752186U) | onisep | anglais | allemand, espagnol, russe | latin, grec |  | allemand, anglais, russe | britannique |  |  | ULIS |
| Collège Jacques Prévert (0752187V) | onisep | anglais | allemand, espagnol, italien | latin, grec |  | allemand, anglais | russe |  |  | ULIS, SEGPA |
| Collège George Sand (0752316K) | onisep | anglais | allemand, espagnol |  |  | allemand, anglais, arabe |  |  | handball | ULIS |
| Collège Elsa Triolet (0752385K) | onisep | anglais | allemand, espagnol | latin, grec |  | allemand, anglais |  |  |  | ULIS, SEGPA, UPE2A (élèves allophones) |
| Collège Henri IV (0752526N) | onisep | allemand, anglais, russe | allemand, anglais, chinois, espagnol, italien | latin, grec |  | anglais, italien |  |  |  |  |
| Collège Montaigne (0752527P) | onisep | anglais, polonais, portugais | allemand, anglais, espagnol, italien, russe | latin, grec |  | allemand, anglais | britannique, polonaise, portugaise |  |  | ULIS |
| Collège Lavoisier (0752531U) | onisep | anglais | allemand, espagnol | latin, grec |  | allemand, anglais |  |  |  | ULIS |
| Collège Rodin (0752538B) | onisep | anglais | allemand, espagnol, italien | latin, grec |  | anglais, italien |  | théâtre |  | UPE2A (élèves allophones) |
| Collège Claude Monet (0752539C) | onisep | anglais | allemand, arabe, espagnol, italien | latin |  | allemand, anglais | arabe | musique |  | ULIS |
| Collège Gabriel Fauré (0752540D) | onisep | allemand, anglais | espagnol, italien | latin, grec |  | allemand, anglais | chinoise |  |  |  |
| Collège Paul Bert (0752543G) | onisep | anglais | allemand, espagnol, italien | latin, grec |  | allemand, anglais |  |  |  |  |
| Collège François Villon (0752544H) | onisep | anglais | espagnol, italien | latin |  | anglais, italien |  | musique | football, sport-études multi-activités | UPE2A (élèves allophones) |
| Collège Camille Claudel (0752694W) | onisep | anglais, chinois | chinois, espagnol | latin, grec |  |  |  |  | football | UPE2A (élèves allophones), Dispositif relais |
| Collège privé L'École alsacienne (0752874S) | onisep | anglais | allemand, chinois, espagnol, italien | latin |  |  |  | musique |  |  |
| Collège privé Notre-Dame de France (0752896R) | onisep | allemand, anglais | espagnol | latin |  | allemand, anglais |  |  |  |  |
| Collège privé Stanislas (0752900V) | onisep | allemand, anglais | allemand, anglais, espagnol | latin, grec |  |  |  |  |  | ULIS, SEGPA |
| Collège privé Yabné (0752906B) | onisep | anglais | espagnol, hébreu moderne | latin |  |  |  |  |  |  |
| Collège privé Sévigné (0752913J) | onisep | anglais | allemand, espagnol, italien | latin, grec |  |  |  |  |  |  |
| Collège privé Morvan (0752916M) | onisep | anglais | espagnol |  |  |  |  |  |  | ULIS |
| Collège privé Saint-Sulpice (0752924W) | onisep | anglais | allemand, espagnol, italien | latin |  |  |  |  |  |  |
| Collège privé Sainte-Geneviève (0752925X) | onisep | anglais | allemand, espagnol | latin |  |  |  |  |  |  |
| Collège Georges Braque (0752957G) | onisep | allemand, anglais | allemand, anglais, espagnol | latin, grec |  | allemand, anglais, espagnol |  |  | rugby | ULIS |
| Collège Gustave Flaubert (0753518S) | onisep | allemand, anglais | anglais, coréen, espagnol | latin, grec |  | allemand, anglais |  |  |  | ULIS, Dispositif relais |
| Collège privé La Bruyère Sainte-Isabelle (0753908R) | onisep | allemand, anglais, espagnol | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  |  |  |
| Collège Évariste Galois (0753937X) | onisep | anglais | allemand, espagnol | latin |  | allemand, anglais, espagnol |  |  | basket-ball | ULIS |
| Collège privé Sœur Rosalie (0753967E) | onisep | allemand, anglais | allemand, anglais, espagnol | latin, grec |  |  |  |  |  |  |
| Collège privé La Salle – Notre-Dame de la Gare (0753982W) | onisep | anglais | allemand, chinois, espagnol | latin |  |  |  |  |  |  |
| Collège privé Saint-Vincent-de-Paul (0753985Z) | onisep | allemand, anglais | allemand, anglais, espagnol, italien | latin |  | allemand, anglais |  |  |  | ULIS |
| Collège privé Saint-Louis (0754008Z) | onisep | anglais | espagnol |  |  |  |  |  |  | ULIS |
| Collège Saint-Exupéry (0754253R) | onisep | anglais | allemand, espagnol | latin, grec |  | allemand, anglais |  |  |  |  |
| Collège privé Notre-Dame de Sion (0754757N) | onisep | anglais | allemand, espagnol | latin |  |  |  |  |  |  |
| Collège privé Regain Tournesol (0754861B) | onisep | anglais |  |  |  |  |  |  |  | ULIS |
| Collège Thomas Mann (0755000C) | onisep | anglais | allemand, espagnol, italien | latin, grec |  | allemand, anglais |  |  |  | UPE2A (élèves allophones) |
| Collège privé Georges Gusdorf (0755496S) | aucune |  |  |  |  |  |  |  |  |  |
| Collège privé Catherine Labouré (0755840R) | onisep | anglais | allemand, espagnol | latin |  |  |  | danse |  |  |
| Collège privé Diago (0755925H) | aucune |  |  |  |  |  |  |  |  |  |
| Collège privé Paris FC (0756057B) | aucune |  |  |  |  |  |  |  |  |  |
| Collège privé École Diagonale (0756203K) | aucune |  |  |  |  |  |  |  |  |  |
| Collège privé Cours Montaigne (0756278S) | aucune |  |  |  |  |  |  |  |  |  |
| Collège Adolphe Chérioux (0940042K) | onisep | anglais | allemand, espagnol | latin | langue non précisée |  |  | musique |  | ULIS, UPE2A (élèves allophones), Dispositif relais |
| Collège Gustave Monod (0940794C) | onisep | allemand, anglais | allemand, espagnol | latin, grec |  | allemand, anglais |  |  |  | UPE2A (élèves allophones) |
| Collège privé Epin (0940874P) | onisep | allemand, anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  |  |
| Collège Assia Djebar (0941025D) | onisep | anglais | allemand, anglais, espagnol |  |  | allemand, anglais |  | musique |  | SEGPA |
| Collège Molière (0941026E) | onisep | anglais | espagnol | latin |  | allemand, anglais |  |  |  | UPE2A (élèves allophones), Dispositif relais |
| Collège Jules Vallès (0941029H) | onisep | allemand, anglais | espagnol | latin |  | allemand, anglais |  |  | rugby | ULIS, UPE2A (élèves allophones) |
| Collège Danielle Casanova (0941032L) | onisep | allemand, anglais | allemand, espagnol | latin, grec |  |  |  |  |  | UPE2A (élèves allophones) |
| Collège Jean Perrin (0941033M) | onisep | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  | SEGPA |
| Collège Joseph Lakanal (0941034N) | onisep | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  | UPE2A (élèves allophones) |
| Collège François Rabelais (0941224V) | onisep | allemand, anglais | espagnol | latin | langue non précisée | allemand, anglais |  |  |  | SEGPA, UPE2A (élèves allophones) |
| Collège Romain Rolland (0941601E) | onisep | anglais | allemand, espagnol, italien | latin, grec |  | allemand, anglais |  |  |  | ULIS |
| Collège Henri Wallon (0941781A) | onisep | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  | handball | ULIS, UPE2A (élèves allophones) |
| Collège Josette et Maurice Audin (0942434K) | onisep | anglais | allemand, espagnol | latin |  |  |  |  | escalade, planche de sillage (wakeboard), surf | ULIS |
| Collège Gisèle Halimi (0942532S) | onisep | anglais | allemand |  |  | allemand, anglais |  |  | escalade | ULIS |
| Collège privé Dix sur Dix (0942626U) | aucune |  |  |  |  |  |  |  |  |  |

### Continuité, secteur, demi-pension

| Collège | Lien | Lycée | 2nde GT | Passage | Détection | Lycées de secteur 1 (Affelnet) | Secteur | Demi-pension | Site web |
|---|---|---|---|---|---|---|---|---|---|
| Collège Rognoni – École des enfants du spectacle (0750407K) | aucun |  | non | non_garanti | aucun |  | aucun | oui | http://clg-rognoni.ac-paris.fr |
| Collège Alberto Giacometti (0750445B) | aucun |  | non | non_garanti | aucun | Lycée Buffon, Lycée Camille Sée, Lycée Émile Dubois, Lycée Montaigne, Lycée Victor Duruy | ALBERTO GIACOMETTI | oui | https://clg-giacometti.ac-paris.fr |
| Collège Moulin des Prés (0750525N) | aucun |  | non | non_garanti | aucun | Lycée Buffon, Lycée Claude Monet, Lycée Gabriel Fauré, Lycée Paul Bert, Lycée Rodin | MOULIN DES PRES | oui | https://clg-moulin-des-pres.ac-paris.fr |
| Collège Jean Moulin (0750611G) | aucun |  | non | non_garanti | aucun | Lycée Émile Dubois, Lycée Lavoisier, Lycée Montaigne, Lycée Paul Bert, Lycée Victor Duruy | JEAN MOULIN | oui | https://pia.ac-paris.fr/serail/jcms/s2_110600/fr/accueil |
| Collège Alphonse Daudet (0751705W) | aucun |  | non | non_garanti | aucun | Lycée Émile Dubois, Lycée Lavoisier, Lycée Montaigne, Lycée Paul Bert, Lycée Victor Duruy | ALPHONSE DAUDET | oui | http://clg-alphonse-daudet.ac-paris.fr |
| Collège Pierre Alviset (0751790N) | aucun |  | non | non_garanti | aucun | Lycée Charlemagne, Lycée Émile Dubois, Lycée Montaigne, Lycée Rodin, Lycée Sophie Germain | PIERRE ALVISET | oui | https://clg-pierre-alviset.ac-paris.fr |
| Collège Raymond Queneau (0752186U) | aucun |  | non | non_garanti | aucun | Lycée Émile Dubois, Lycée Lavoisier, Lycée Montaigne, Lycée Paul Bert, Lycée Rodin | RAYMOND QUENEAU | oui | https://clg-raymond-queneau.ac-paris.fr |
| Collège Jacques Prévert (0752187V) | aucun |  | non | non_garanti | aucun | Lycée Camille Sée, Lycée Fénelon, Lycée Montaigne, Lycée Paul Bert, Lycée Victor Duruy | JACQUES PREVERT | oui | https://clg-jacques-prevert.ac-paris.fr |
| Collège George Sand (0752316K) | aucun |  | non | non_garanti | aucun | Lycée Buffon, Lycée Claude Monet, Lycée Gabriel Fauré, Lycée Paul Bert, Lycée Rodin | GEORGE SAND | oui | https://clg-georgesand.ac-paris.fr |
| Collège Elsa Triolet (0752385K) | aucun |  | non | non_garanti | aucun | Lycée Buffon, Lycée Claude Monet, Lycée Gabriel Fauré, Lycée Lavoisier, Lycée Montaigne | ELSA TRIOLET | oui | https://clg-elsa-triolet.ac-paris.fr |
| Collège Henri IV (0752526N) | cite_scolaire | Lycée Henri-IV (0750654D) | oui | non_garanti | cite_scolaire [R1_cite_scolaire:07504, R3_adresse] | Lycée Charlemagne, Lycée Fénelon, Lycée Lavoisier, Lycée Paul Bert, Lycée Rodin | HENRI IV | oui | https://lycee-henri4.com/college/ |
| Collège Montaigne (0752527P) | cite_scolaire | Lycée Montaigne (0750657G) | oui | non_garanti | cite_scolaire [R1_cite_scolaire:07506, R3_adresse] | Lycée Camille Sée, Lycée Fénelon, Lycée Lavoisier, Lycée Montaigne, Lycée Paul Bert | MONTAIGNE | oui | http://www.montaigne-paris.fr |
| Collège Lavoisier (0752531U) | cite_scolaire | Lycée Lavoisier (0750656F) | oui | non_garanti | cite_scolaire [R1_cite_scolaire:07505, R3_adresse] | Lycée Fénelon, Lycée Lavoisier, Lycée Montaigne, Lycée Paul Bert, Lycée Rodin | LAVOISIER | oui | https://clg-lavoisier.ac-paris.fr |
| Collège Rodin (0752538B) | cite_scolaire | Lycée Rodin (0750682J) | oui | non_garanti | cite_scolaire [R1_cite_scolaire:07514, R3_adresse] | Lycée Claude Monet, Lycée Gabriel Fauré, Lycée Lavoisier, Lycée Paul Bert, Lycée Rodin | AUGUSTE RODIN | oui | https://pia.ac-paris.fr/serail/jcms/s2_111988/fr/accueil |
| Collège Claude Monet (0752539C) | cite_scolaire | Lycée Claude Monet (0750683K) | oui | non_garanti | cite_scolaire [R1_cite_scolaire:07515, R3_adresse] | Lycée Claude Monet, Lycée Gabriel Fauré, Lycée Paul Bert, Lycée Rodin, Lycée Sophie Germain | CLAUDE MONET | oui | http://clg-claude-monet.ac-paris.fr |
| Collège Gabriel Fauré (0752540D) | cite_scolaire | Lycée Gabriel Fauré (0750684L) | oui | non_garanti | cite_scolaire [R1_cite_scolaire:07516, R3_adresse] | Lycée Charlemagne, Lycée Claude Monet, Lycée Gabriel Fauré, Lycée Paul Valéry, Lycée Rodin | GABRIEL FAURE | oui | https://pia.ac-paris.fr/serail/jcms/s1_717812/fr/accueil |
| Collège Paul Bert (0752543G) | cite_scolaire | Lycée Paul Bert (0750689S) | oui | non_garanti | cite_scolaire [R1_cite_scolaire:07517] | Lycée Émile Dubois, Lycée Lavoisier, Lycée Montaigne, Lycée Paul Bert, Lycée Rodin | PAUL BERT | oui | https://pia.ac-paris.fr/serail/jcms/s2_1773774/fr/accueil |
| Collège François Villon (0752544H) | cite_scolaire | Lycée polyvalent François Villon (0750690T) | non | non_garanti | cite_scolaire [R1_cite_scolaire:07518, R3_adresse] | Lycée Buffon, Lycée Camille Sée, Lycée Émile Dubois, Lycée Paul Bert, Lycée Victor Duruy | FRANCOIS VILLON | oui | https://pia.ac-paris.fr/serail/jcms/s1_3523197/fr/cite-scolaire-francois-villon |
| Collège Camille Claudel (0752694W) | aucun |  | non | non_garanti | aucun | Lycée Claude Monet, Lycée Gabriel Fauré, Lycée Lavoisier, Lycée Paul Valéry, Lycée Rodin | CAMILLE CLAUDEL | oui | https://clg-camille-claudel.ac-paris.fr |
| Collège privé L'École alsacienne (0752874S) | meme_etablissement_prive | Lycée privé L'École alsacienne (0753647G) | oui | garanti | meme_etablissement_prive [R2_siren, R3_adresse] |  | — | oui | https://www.ecole-alsacienne.org/ |
| Collège privé Notre-Dame de France (0752896R) | meme_etablissement_prive | Lycée privé Notre-Dame de France (0753902J) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |  | — | oui | https://www.notredamedefrance.fr/ |
| Collège privé Stanislas (0752900V) | meme_etablissement_prive | Lycée privé Stanislas (0753840S) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |  | — | oui | https://www.stanislas.fr/ |
| Collège privé Yabné (0752906B) | meme_etablissement_prive | Lycée privé Yabné (0753834K) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |  | — | oui | http://www.yabne.org |
| Collège privé Sévigné (0752913J) | meme_etablissement_prive | Lycée privé Sévigné (0753598D) | oui | garanti | meme_etablissement_prive [R2_siren, R3_adresse] |  | — | oui | http://www.collegesevigne.org/ |
| Collège privé Morvan (0752916M) | meme_etablissement_prive | Lycée privé Morvan (0753825A) | oui | garanti | meme_etablissement_prive [R2_siren, R3_adresse] |  | — | non | http://www.clgmorvan.org |
| Collège privé Saint-Sulpice (0752924W) | meme_etablissement_prive | Lycée privé Saint-Sulpice (0753838P) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |  | — | oui | http://www.st-sulpice.fr/ |
| Collège privé Sainte-Geneviève (0752925X) | meme_etablissement_prive | Lycée privé Sainte-Geneviève (0753844W) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |  | — | oui | http://www.saintegenevieve6.org |
| Collège Georges Braque (0752957G) | aucun |  | non | non_garanti | aucun | Lycée Claude Monet, Lycée Émile Dubois, Lycée Gabriel Fauré, Lycée Lavoisier, Lycée Rodin | GEORGES BRAQUE | oui | https://clg-georges-braque.ac-paris.fr |
| Collège Gustave Flaubert (0753518S) | aucun |  | non | non_garanti | aucun | Lycée Claude Monet, Lycée Gabriel Fauré, Lycée Paul Valéry, Lycée Rodin, Lycée Sophie Germain | GUSTAVE FLAUBERT | oui | https://pia.ac-paris.fr/serail/jcms/s1_1712765/fr/college-gustave-flaubert |
| Collège privé La Bruyère Sainte-Isabelle (0753908R) | aucun |  | non | non_garanti | aucun |  | — | oui | http://labruyeresainteisabelle.fr/-Le-college- |
| Collège Évariste Galois (0753937X) | aucun |  | non | non_garanti | aucun | Lycée Charlemagne, Lycée Claude Monet, Lycée Émile Dubois, Lycée Gabriel Fauré, Lycée Rodin | EVARISTE GALOIS | oui | https://clg-evariste-galois.ac-paris.fr |
| Collège privé Sœur Rosalie (0753967E) | meme_etablissement_prive | Lycée privé Louise de Marillac (0753827C) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |  | — | oui | http://www.rosalie-marillac.com |
| Collège privé La Salle – Notre-Dame de la Gare (0753982W) | aucun |  | non | non_garanti | aucun |  | — | oui | https://www.lasallendgsja.com/ |
| Collège privé Saint-Vincent-de-Paul (0753985Z) | meme_etablissement_prive | Lycée privé Saint-Vincent-de-Paul (0754924V) | oui | sous_reserve | meme_etablissement_prive [R2_siren, R3_adresse] |  | — | oui | http://www.gs-svp.com |
| Collège privé Saint-Louis (0754008Z) | meme_etablissement_prive | Lycée polyvalent privé Saint-Nicolas (0754025T) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |  | — | oui | http://www.college-st-louis.org |
| Collège Saint-Exupéry (0754253R) | aucun |  | non | non_garanti | aucun | Lycée Émile Dubois, Lycée Lavoisier, Lycée Montaigne, Lycée Paul Bert, Lycée Rodin | ST EXUPERY | oui | http://clg-saint-exupery.ac-paris.fr |
| Collège privé Notre-Dame de Sion (0754757N) | meme_etablissement_prive | Lycée privé Notre-Dame de Sion (0753842U) | oui | inconnu | meme_etablissement_prive [R2_siren, R3_adresse] |  | — | oui | http://www.sion-paris.fr |
| Collège privé Regain Tournesol (0754861B) | aucun |  | non | non_garanti | aucun |  | — | non | http://www.tournesol75.fr |
| Collège Thomas Mann (0755000C) | aucun |  | non | non_garanti | aucun | Lycée Arago, Lycée Claude Monet, Lycée Fénelon, Lycée Gabriel Fauré, Lycée Paul Valéry | THOMAS MANN | oui | https://clg-thomas-mann.ac-paris.fr |
| Collège privé Georges Gusdorf (0755496S) | meme_etablissement_prive | Lycée général privé Georges Gusdorf (0755589T) | oui | inconnu | meme_etablissement_prive [R2_siren, R3_adresse] |  | — | oui | https://e-g-g.fr/ |
| Collège privé Catherine Labouré (0755840R) | meme_etablissement_prive | Lycée privé polyvalent Catherine Labouré (0754045P) | oui | sous_reserve | meme_etablissement_prive [R2_siren, R3_adresse] |  | — | oui | https://www.saintecatherinelaboure.com/college |
| Collège privé Diago (0755925H) | aucun |  | non | non_garanti | aucun |  | — | inconnue | https://www.collegediago.fr/ |
| Collège privé Paris FC (0756057B) | groupe_scolaire_autre_site | Lycée privé Paris FC Academy (hors contrat) (0942439R) | non | non_garanti | aucun → corrigé (groupe_scolaire_autre_site) |  | — | inconnue | https://parisfc.fr/formation-homme/ |
| Collège privé École Diagonale (0756203K) | meme_etablissement_prive | Cours Diagonale (0755367B) | oui | inconnu | meme_etablissement_prive [R3_adresse] |  | — | inconnue | https://www.ecolediagonale.com/ |
| Collège privé Cours Montaigne (0756278S) | meme_etablissement_prive | Cours Montaigne (Ecole secondaire privée) (0753845X) | oui | inconnu | meme_etablissement_prive [R3_adresse] |  | — | inconnue | https://www.coursmontaignedeparis.com/ |
| Collège Adolphe Chérioux (0940042K) | aucun |  | non | non_garanti | aucun |  | carte nationale | oui | https://adolphe-cherioux.moncollege.valdemarne.fr/ |
| Collège Gustave Monod (0940794C) | aucun |  | non | non_garanti | aucun |  | carte nationale | oui | https://gustave-monod.moncollege.valdemarne.fr/ |
| Collège privé Epin (0940874P) | meme_etablissement_prive | Lycée Epin (0941719H) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |  | — | oui | https://epin.fr |
| Collège Assia Djebar (0941025D) | aucun |  | non | non_garanti | aucun |  | carte nationale | oui | https://georges-politzer.moncollege.valdemarne.fr/ |
| Collège Molière (0941026E) | aucun |  | non | non_garanti | aucun |  | carte nationale | oui | https://moliere-ivry-sur-seine.moncollege.valdemarne.fr/ |
| Collège Jules Vallès (0941029H) | aucun |  | non | non_garanti | aucun |  | carte nationale | oui | https://jules-valles-vitry-sur-seine.moncollege.valdemarne.fr/ |
| Collège Danielle Casanova (0941032L) | aucun |  | non | non_garanti | aucun |  | carte nationale | oui | https://danielle-casanova.moncollege.valdemarne.fr/ |
| Collège Jean Perrin (0941033M) | aucun |  | non | non_garanti | aucun |  | carte nationale | oui | https://jean-perrin-vitry-sur-seine.moncollege.valdemarne.fr/ |
| Collège Joseph Lakanal (0941034N) | aucun |  | non | non_garanti | aucun |  | carte nationale | oui | https://joseph-lakanal.moncollege.valdemarne.fr/ |
| Collège François Rabelais (0941224V) | aucun |  | non | non_garanti | aucun |  | carte nationale | oui | https://francois-rabelais-vitry-sur-seine.moncollege.valdemarne.fr/ |
| Collège Romain Rolland (0941601E) | aucun |  | non | non_garanti | aucun |  | carte nationale | oui | https://romain-rolland.moncollege.valdemarne.fr/ |
| Collège Henri Wallon (0941781A) | aucun |  | non | non_garanti | aucun |  | carte nationale | oui | https://henri-wallon.moncollege.valdemarne.fr/ |
| Collège Josette et Maurice Audin (0942434K) | aucun |  | non | non_garanti | aucun |  | carte nationale | oui | https://josette-et-maurice-audin.moncollege.valdemarne.fr/ |
| Collège Gisèle Halimi (0942532S) | aucun |  | non | non_garanti | aucun |  | carte nationale | oui | https://gisele-halimi.moncollege.valdemarne.fr/ |
| Collège privé Dix sur Dix (0942626U) | aucun |  | non | non_garanti | aucun |  | — | inconnue | https://10sur10.org/ |

### Anomalies des collèges suivis

| Collège | Anomalies |
|---|---|
| Collège Rognoni – École des enfants du spectacle (0750407K) | Collèges publics parisiens absents de la carte Affelnet ; Collèges publics parisiens sans secteur de la Ville ; Collèges publics absents de la carte nationale alors que leur commune y figure |
| Collège privé L'École alsacienne (0752874S) | À vérifier à la main (data/overrides/colleges.json, `aVerifier`) |
| Collège privé Notre-Dame de France (0752896R) | Collèges suivis privés sous contrat avec lycée, sans formulation écrite sur le passage |
| Collège privé Stanislas (0752900V) | Collèges suivis privés sous contrat avec lycée, sans formulation écrite sur le passage |
| Collège privé Yabné (0752906B) | Collèges suivis privés sous contrat avec lycée, sans formulation écrite sur le passage |
| Collège privé Morvan (0752916M) | Collèges publics ou sous contrat (hors contrat simple) sans résultat au brevet ou sans valeur ajoutée |
| Collège privé Saint-Sulpice (0752924W) | Collèges suivis privés sous contrat avec lycée, sans formulation écrite sur le passage |
| Collège privé Sainte-Geneviève (0752925X) | Collèges suivis privés sous contrat avec lycée, sans formulation écrite sur le passage |
| Collège Gustave Flaubert (0753518S) | Collèges reliés par leur nom, adresse publiée différente de l'annuaire |
| Collège Évariste Galois (0753937X) | Absents du jeu « Évaluations 6e 2025 » |
| Collège privé Sœur Rosalie (0753967E) | Collèges suivis privés sous contrat avec lycée, sans formulation écrite sur le passage |
| Collège privé Saint-Vincent-de-Paul (0753985Z) | Nom dans une source sans mot commun avec celui de l'annuaire |
| Collège privé Saint-Louis (0754008Z) | Collèges publics ou sous contrat (hors contrat simple) sans résultat au brevet ou sans valeur ajoutée ; À vérifier à la main (data/overrides/colleges.json, `aVerifier`) ; Collèges suivis privés sous contrat avec lycée, sans formulation écrite sur le passage |
| Collège privé Notre-Dame de Sion (0754757N) | Passage au lycée « inconnu » ; À vérifier à la main (data/overrides/colleges.json, `aVerifier`) |
| Collège privé Regain Tournesol (0754861B) | Absents du jeu « IVAC session 2025 » ; Absents du jeu « DNB session 2021 » ; Absents du jeu « Évaluations 6e 2025 » ; Absents du jeu « Encadrement 2025 » ; Demi-pension (jeu « hébergement », retenu) en désaccord avec le champ `restauration` de l'annuaire |
| Collège privé Georges Gusdorf (0755496S) | Géolocalisation approximative dans l'annuaire ; Passage au lycée « inconnu » |
| Collège privé Catherine Labouré (0755840R) | Demi-pension (jeu « hébergement », retenu) en désaccord avec le champ `restauration` de l'annuaire |
| Collège privé École Diagonale (0756203K) | Passage au lycée « inconnu » |
| Collège privé Cours Montaigne (0756278S) | Passage au lycée « inconnu » |
| Collège privé Epin (0940874P) | Collèges suivis privés sous contrat avec lycée, sans formulation écrite sur le passage |
| Collège Assia Djebar (0941025D) | Nom dans une source sans mot commun avec celui de l'annuaire |
| Collège François Rabelais (0941224V) | Fiches Idéo-Structures écartées (même UAI qu'un collège, autre type) |
| Collège Josette et Maurice Audin (0942434K) | Géolocalisation approximative dans l'annuaire |
| Collège Gisèle Halimi (0942532S) | Absents du jeu « DNB session 2021 » |
