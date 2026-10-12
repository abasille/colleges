# Rapport de la mise à jour des données

Généré le 2026-10-12T17:52:56.059Z par `npm run data` (mode hors ligne : cache uniquement) en 1 s. Fichier régénéré à chaque exécution : ne pas éditer à la main.

## 1. Périmètre

**1292 collèges** : 240 privé sous contrat, 920 public, 132 hors contrat.
Dont sous contrat simple : Collège privé Regain Tournesol (0754861B).

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

Par académie : Créteil 476, Paris 217, Versailles 599. Communes : 441.
UAI 0951509Z présent sur plusieurs lignes de l'annuaire : gardé « Collège La Salle - Saint-Rosaire » (53 rue Pierre Brossolette), écarté « Annexe Oscar Romero du collège La Salle - Saint-Rosaire de Sarcelles » (5 rue Gambetta).

UAI exclus par `data/config.json` déjà hors des natures 340, 352 (EREA, lycées) — exclusion de précaution : 0752799K, 0755367B, 0753845X, 0753146M, 0755084U.
Sans coordonnées dans l'annuaire, placé par le géocodage de son adresse : Collège privé ABI SCHOOL 12 rue Charles Pouillet (0756898R) — « 12 rue Charles Pouillet 75017 » → « 12 Rue Claude Pouillet 75017 Paris » (score 0.50).
Sans coordonnées dans l'annuaire, placé par le géocodage de son adresse : Collège Nél (0942674W) — « 12 rue du Cadran 94220 » → « 12 Rue du Cadran 94220 Charenton-le-Pont » (score 0.96).
Géolocalisation approximative (annuaire) : Collège privé Georges Gusdorf (0755496S) — Rue ; Collège privé Saint-Jean de Dieu (0756020L) — Rue ; Collège parc des Tourelles (0770014X) — BATIMENT ; Collège les Capucins (0770033T) — Rue ; Collège Alfred Sisley (0770038Y) — Rue ; Collège les Tournelles (0770059W) — Rue ; Collège Albert Camus (0771172F) — Rue ; Collège Sainte-Thérèse (0771217E) — Rue ; Collège Paul Langevin (0771331D) — Rue ; Collège Pierre Brossolette (0771339M) — Rue ; Collège Jean Vilar (0771365R) — Rue ; Collège Jean Moulin (0771419Z) — Rue ; Collège les Hyverneaux (0771421B) — Rue ; Collège les Aulnes (0771475K) — BATIMENT ; Collège Georges Politzer (0771476L) — Rue ; Collège François Villon (0771517F) — Rue ; Collège Louis Armand (0771518G) — BATIMENT ; Collège Jean-Jacques Rousseau (0771562E) — Rue ; Collège Paul Éluard (0771567K) — BATIMENT ; Collège Georges Brassens (0771615M) — BATIMENT ; Collège les Maillettes (0771618R) — Rue ; Collège Nicolas Fouquet (0771620T) — Rue ; Collège Anceau de Garlande (0771657H) — Rue ; Collège privé Beth Myriam (0771668V) — BATIMENT ; Collège de l'Europe (0771759U) — Rue ; Collège André Malraux (0771761W) — Rue ; Collège Jean des Barres (0771912K) — Rue ; Collège Nazareth (0771930E) — Ville ; Collège Henri Wallon (0771960M) — Rue ; Collège Louis Aragon (0771991W) — Rue ; Collège le Bois de l'Enclume (0772091E) — Rue ; Collège le Segrais (0772125S) — Rue ; Collège Léonard de Vinci (0772154Y) — Rue ; Collège Hutinel (0772189L) — Rue ; Collège de l'Europe (0772190M) — Rue ; Collège Stephane Mallarmé (0772227C) — Rue ; Collège le Champivert (0772246Y) — Rue ; Collège George Sand (0772247Z) — Rue ; Collège Christine de Pisan (0772427V) — Rue ; Collège Nicolas Tronchon (0772483F) — Rue ; Collège de la Dhuis (0772499Y) — Rue ; Collège Les Blés d'or (0772548B) — Rue ; Collège Erik Satie (0772573D) — Rue ; Collège Stéphane Hessel (0772714G) — BATIMENT ; Collège privé Sacré Coeur Enfant Jésus (0772937Z) — Rue ; Collège Marthe Gautier (0772945H) — Rue ; Collège Jeanne Bonnardel Beguin (0772946J) — Rue ; Collège Joséphine Baker (0772968H) — Rue ; Collège Jean-Jacques Barbaux (0773007A) — Rue ; Collège Madeleine Brès (0773030A) — Rue ; Collège Les Plaisances (0780116C) — Rue ; Collège Jules Verne (0780180X) — Rue ; Collège Maurice Ravel (0780262L) — Rue ; Collège Blaise Pascal (0780420H) — Rue ; Collège Arthur Rimbaud (0780506B) — Rue ; Collège Henri IV (0780571X) — Rue ; Collège Paul Verlaine (0780572Y) — Rue ; Collège Les Châtelaines (0780573Z) — Rue ; Collège Marcel Pagnol (0780707V) — Rue ; Collège des Hauts Grillets (0780714C) — Rue ; Collège Alexandre Dumas (0780720J) — Rue ; Collège Albert Camus (0780758A) — Rue ; Collège La Fosse aux Dames (0780760C) — Rue ; Collège George Sand (0781098V) — Rue ; Collège Saint-Louis Notre-Dame du Bel Air (0781600R) — Rue ; Collège André Derain (0781683F) — Rue ; Collège Les Saules (0781695U) — Rue ; Collège Jean François Champollion (0781789W) — Rue ; Collège Jean Monnet (0781863B) — Rue ; Collège Georges Pompidou (0781864C) — Rue ; Collège Jacques Cartier (0781885A) — Rue ; Collège Catherine de Vivonne (0781886B) — Rue ; Collège de Gassicourt (0781955B) — Rue ; Collège Les Hautes Rayes (0781985J) — Rue ; Collège La Clé Saint-Pierre (0782114Z) — Rue ; Maison de la Légion d'Honneur (0783122V) — Rue ; Collège de la Montcient (0783464S) — Rue ; Collège international (0783547G) — Rue ; Ecole secondaire privée La Jonchère EIB Campus (0783810T) — Ville ; Collège Juliette Adam (0910024G) — Rue ; Collège Michel Vignaud (0910028L) — Rue ; Collège Émile Zola (0910969J) — Rue ; Collège Albert Camus (0910977T) — Rue ; Collège André Dunoyer de Segonzac (0911022S) — Rue ; Collège Jean Lurçat (0911025V) — Rue ; Collège Le Parc de Villeroy (0911185U) — Rue ; Collège Paul Fort (0911250P) — Rue ; Collège La Tuilerie (0911341N) — Rue ; Collège La Vallée (0911397Z) — Rue ; Collège de Guinette (0911402E) — Rue ; Collège Hubert Robert (0911403F) — Rue ; Collège Jean Rostand (0911404G) — Rue ; Collège Montesquieu (0911444A) — Rue ; Collège Le Roussay (0911447D) — Rue ; Collège Condorcet (0911491B) — Rue ; Collège Saint-Exupéry (0911572P) — Rue ; Collège Léonard de Vinci (0911574S) — Rue ; Collège Institution Saint Vincent de Paul (0911750H) — Rue ; Collège Paul Éluard (0911865H) — Rue ; Collège Camille Claudel (0911948Y) — Rue ; Collège de l'Ermitage (0912086Y) — Rue ; Collège Robert Doisneau (0912109Y) — Rue ; Collège Claudine Hermann (0912487J) — Rue ; Collège Julie-Victoire Daubié (0912539R) — Rue ; Collège Romain Rolland (0920624D) — Rue ; Collège Paul Éluard (0920880G) — Rue ; Collège Sainte-Jeanne d'Arc (0920936T) — Rue ; Collège Les Bons Raisins (0921234S) — Rue ; Collège André Doucet (0921394R) — Rue ; Collège François Truffaut (0922565N) — Rue ; Ecole secondaire privée du Centre de référence pour l'évaluation neuropsychologique de l'enfant (CERENE) (0922977L) — Rue ; Collège privé Beth Sepher Yad Mordekai (0923042G) — Rue ; Collège Jean de Beaumont (0930043S) — Rue ; Collège Romain Rolland (0930616P) — Rue ; Collège Paul Painlevé (0930897V) — Rue ; Collège Pierre de Ronsard (0931149U) — Rue ; Collège Le Parc (0931189M) — Rue ; Collège Auguste Delaune (0931195U) — BATIMENT ; Collège Clos Saint-Vincent (0931214P) — BATIMENT ; Collège Federico Garcia Lorca (0931489N) — Rue ; Collège Antoine Laurent de Lavoisier (0931713G) — Rue ; Collège Robert Doisneau (0932366S) — Rue ; Collège Simone Veil (0932578X) — BATIMENT ; Collège Césaria Evora (0932579Y) — BATIMENT ; Collège Jacqueline de Romilly (0932580Z) — BATIMENT ; Collège international de l'Est parisien (0932581A) — BATIMENT ; Collège Dora Maar (0932582B) — BATIMENT ; Collège Saint-Vincent-de-Paul (0932586F) — BATIMENT ; Collège privé Tachbar (0932647X) — Rue ; Collège Groupe Scolaire Privé Bougainville (0932797K) — Rue ; Collège Niki de Saint Phalle (0932966U) — Rue ; Collège Amédée Laplace (0940003T) — BATIMENT ; Collège Jean Charcot (0940038F) — Rue ; Collège Roland Garros (0940749D) — Rue ; Collège Pierre Brossolette (0940791Z) — BATIMENT ; Collège Antoine de Saint-Exupéry (0940793B) — Rue ; Collège Antoine de Saint-Exupéry (0941017V) — Rue ; Collège Karl Marx (0941036R) — Rue ; Collège Paul Éluard (0941095E) — Rue ; Collège Albert Camus (0941233E) — Rue ; Collège Blaise Cendrars (0941478W) — Rue ; Collège Janusz Korczak (0941603G) — Rue ; Collège privé Sports études de Paris (SEDP) (0942366L) — BATIMENT ; Collège Josette et Maurice Audin (0942434K) — Rue ; Collège Samuel Paty (0942482M) — Rue ; Collège Aristide Briand (0950014Z) — Rue ; Collège Jules Ferry (0950019E) — Rue ; Collège Bel Air (0950022H) — Rue ; Collège Jules Ferry (0950892D) — Rue ; Collège André Chénier (0950893E) — Rue ; Collège Pierre et Marie Curie (0950898K) — Rue ; Collège Stendhal (0950926R) — Rue ; Collège L'Ardillière de Nézant (0950931W) — Rue ; Collège Chantereine (0950943J) — Rue ; Collège Le Carré Sainte-Honorine (0950945L) — Rue ; Collège Marcel Pagnol (0951051B) — Rue ; Collège Blaise Pascal (0951052C) — Rue ; Collège Jean Moulin (0951143B) — Rue ; Collège Camille Claudel (0951154N) — Rue ; Collège Pablo Picasso (0951194G) — Rue ; Collège Maubuisson (0951400F) — Rue ; Collège La Justice (0951401G) — Rue ; Collège Henri Guillaumet (0951527U) — Rue ; Collège Sainte-Apolline (0951724H) — Rue ; Collège Jacques-Yves Cousteau (0951725J) — Rue ; Collège Le Petit Bois (0951726K) — Rue ; Collège des Merisiers (0951801S) — Rue ; Collège Le Luat (0951817J) — Rue ; Collège Françoise Dolto (0951919V) — Rue ; Collège François Truffaut (0951920W) — Rue ; Collège Les Explorateurs (0951964U) — Rue ; Collège Cécile Sorel (0951991Y) — Rue ; Collège Louis Augustin Bosc (0951992Z) — Rue ; Collège Henri Matisse (0952036X) — Rue ; Collège Georges Charpak (0952128X) — Rue ; Collège Saint-Jean (0952136F) — Rue ; Collège Caroline Aigle (0952282P) — NE SAIT PAS ; Collège Suzanne Lenglen (0952325L) — Rue ; Collège Marie-José Perec (0952326M) — Rue ; Nouveau collège de Saint-Ouen-L'Aumône (0952381X) — Rue.
Demi-pension (jeu « hébergement » retenu) en désaccord avec le champ `restauration` de l'annuaire : Collège privé Lucien de Hirsch (0754003U) — 0 demi-pensionnaires en 2025, restauration 1 ; Collège privé Regain Tournesol (0754861B) — 0 demi-pensionnaires en 2025, restauration 1 ; Collège privé Catherine Labouré (0755840R) — 101 demi-pensionnaires en 2025, restauration 0 ; Collège privé Saint-Jean de Dieu (0756020L) — 31 demi-pensionnaires en 2025, restauration 0 ; Collège André Malraux (0771761W) — 78 demi-pensionnaires en 2025, restauration 0 ; Collège Marthe Simard (0772868Z) — 354 demi-pensionnaires en 2025, restauration 0 ; Collège privé Saint-Colomban (0772953S) — 257 demi-pensionnaires en 2025, restauration 0 ; Collège Les Plaisances (0780116C) — 0 demi-pensionnaires en 2025, restauration 1 ; Collège Albert Thierry (0780255D) — 0 demi-pensionnaires en 2025, restauration 1 ; Collège Le Racinay (0780256E) — 0 demi-pensionnaires en 2025, restauration 1 ; Collège Colette (0780258G) — 0 demi-pensionnaires en 2025, restauration 1 ; Collège Jean Zay (0780267S) — 0 demi-pensionnaires en 2025, restauration 1 ; Collège Pasteur (0780504Z) — 0 demi-pensionnaires en 2025, restauration 1 ; Collège Philippe de Champaigne (0780512H) — 0 demi-pensionnaires en 2025, restauration 1 ; Collège Le Village (0780514K) — 0 demi-pensionnaires en 2025, restauration 1 ; Collège La Vaucouleurs (0780569V) — 0 demi-pensionnaires en 2025, restauration 1 ; Collège Alexandre Dumas (0780720J) — 0 demi-pensionnaires en 2025, restauration 1 ; Collège George Sand (0781098V) — 0 demi-pensionnaires en 2025, restauration 1 ; Collège Marcel Roby (0781204K) — 0 demi-pensionnaires en 2025, restauration 1 ; Collège Louis Pasteur (0781896M) — 0 demi-pensionnaires en 2025, restauration 1 ; Collège Camille du Gast (0783636D) — 0 demi-pensionnaires en 2025, restauration 1 ; Collège Gay-Lussac (0921494Z) — 0 demi-pensionnaires en 2025, restauration 1 ; Collège Évariste Galois (0921589C) — 0 demi-pensionnaires en 2025, restauration 1 ; Collège Les Bruyères (0922523T) — 0 demi-pensionnaires en 2025, restauration 1 ; Collège Jean Jaurès (0931143M) — 294 demi-pensionnaires en 2025, restauration 0 ; Collège privé Protectorat Saint-Joseph (0932652C) — 114 demi-pensionnaires en 2025, restauration 0 ; Collège Germaine Tillion (0932695Z) — 389 demi-pensionnaires en 2025, restauration 0 ; Collège Sainte-Louise de Marillac (0932772H) — 139 demi-pensionnaires en 2025, restauration 0 ; Collège privé La Salle - Le Landy (0932773J) — 65 demi-pensionnaires en 2025, restauration 0 ; Collège Jules Ferry (0941024C) — 109 demi-pensionnaires en 2025, restauration 0 ; Collège Isabelle Autissier (0952205F) — 303 demi-pensionnaires en 2025, restauration 0.
Demi-pension inconnue : Ecole générale et technologique privée Cours Progress (0755757A), Collège Kingsworth International School (0755773T), Collège privé Cours du Pont de Pierre (0755799W), Collège privé ICS Paris (0755848Z), Collège privé Ecole Démocratique de Paris (0755879H), Ecole Canadienne Internationale de Paris (0755897C), Collège privé Diago (0755925H), Collège privé Galilée la faculté des enfants (0755949J), Collège privé Autism Friendly Académie (0756021M), Collège privé La classe du phare (0756051V), Collège privé Paris FC (0756057B), Collège privé L'Autre Collège (0756105D), Collège privé Living School (0756120V), Collège privé Ecole Walt (0756123Y), Collège privé Beth Aaron (0756124Z), Collège privé Montessori (0756191X), Collège privé Ellipse Montessori (0756197D), Collège privé École Diagonale (0756203K), Collège privé Cours Molière (0756204L), Collège privé Ecole Juive Moderne (0756234U), Ecole Secondaire Privée Lab School (0756272K), Ecole Secondaire Privée Maigret (0756273L), Ecole Secondaire Privée International School of Paris (0756274M), Collège privé Cours Montaigne (0756278S), Collège privé CONCORDIA BILINGUAL SCHOOL (0756486T), Collège privé Ecole A (0756489W), Collège privé MONTESSORI PARIS 17 31 boulevard Berthier (0756519D), Collège Privé Ma petite école Montessori Villafranca (0756727E), Collège Privé Ma petite école Montessori Dantzig (0756728F), Collège Privé Montessori Esclaibes (0756747B), Collège Privé Ipecom (0756786U), ECS Cerene (0756801K), Collège privé ABI SCHOOL 12 rue Charles Pouillet (0756898R), Collège privé Beth Myriam (0771668V), Ecole secondaire privée Ecole de la Neuville (0772150U), Collège privé Oneschool Global Paris Campus (0772740K), Collège privé La Petite Plume (0772898G), Collège privé Sacré Coeur Enfant Jésus (0772937Z), Collège Montessori Here and Now (0773021R), Collège Avenir Val de Bussy (0773040L), Collège Anima collège (0773048V), Ecole secondaire privée Jeanne d'Arc (0781902U), Maison de la Légion d'Honneur (0783122V), Ecole secondaire privée Saint Jean Bosco (0783585Y), Ecole secondaire privée Mathurin Cordier (0783621M), Ecole secondaire privée Bienheureux Charles de Foucauld (0783647R), Ecole secondaire privée Cours Sainte Clotilde (0783666L), Ecole secondaire privée International Montessori Athéna (0783682D), Ecole secondaire privée IDEE (0783702A), Ecole secondaire privée La Jonchère EIB Campus (0783810T), Ecole secondaire privée NLC International School (0783831R), Ecole secondaire privée Station phoenix (0783846G), Ecole secondaire privée Alef Beth Chaoul (0783848J), Ecole secondaire privée Citizen for Society School (0912337W), Ecole secondaire privée La Lumière du Savoir (0912378R), Ecole secondaire privée de la Trinité (0912379S), Ecole secondaire privée ELAH (0912486H), Ecole secondaire privée Marymount School (0920925F), Ecole secondaire privée  Cours Antoine de Saint-Exupéry (0922765F), Ecole secondaire privée Pardess Hannah (0922924D), Ecole secondaire privée Cours Singulier (0922964X), Ecole secondaire privée Ecole Diagonale (0922967A), Ecole secondaire privée Walt (0923006T), Collège privé Beth Sepher Yad Mordekai (0923042G), Collège privé Institution Yad Mordekai (0923043H), Collège privé Malik Ibn Anas (0932686P), Collège privé La plume de l'éducation (0932717Y), Collège - Groupe Scolaire Privé APCS (0932728K), Collège Groupe Scolaire Privé Bougainville (0932797K), Collège privé Lab School Montreuil (0932890L), Collège Privé ALEKOLE93 (0933024G), Collège privé ISE Emeth Leyaacov - Filles (0942143U), Collège privé Padre-Pio (0942192X), Collège du groupe scolaire privé Education et Savoir (0942223F), Collège privé l'Ecole Heureuse - LEH (0942336D), Collège privé Sports études de Paris (SEDP) (0942366L), Collège privé Ecole Enfance et Vie - Ohr Menahem (0942428D), Collège privé Pilote Arborescences (0942433J), Collège privé Dix sur Dix (0942626U), Collège Nél (0942674W), Ecole secondaire privée IInstitut de Gestion Sociale des Armées (0951707P), Ecole secondaire privée Léonard de Vinci (0952125U), Ecole secondaire privée Beth Yaacov (0952133C), Ecole secondaire privée les Petis Pas (0952213P), Ecole secondaire privée Académie Fihri (0952218V), Ecole secondaire privée Torah Or (0952222Z), Ecole secondaire privée New School (0952223A), Collège privé  Cours Charlemagne (0952267Y), Ecole secondaire privée International Trilingue de Cergy - CITC (0952303M).
Sans site web dans l'annuaire : Collège privé Beth Hanna (0753369E), Collège privé Ozar Hatorah (0754290F), Ecole secondaire privée Eurécole (0754407H), Collège privé Heikhal Menahem Sinaï (0755029J), Collège privé N'R Hatorah (0755052J), Ecole Secondaire Privée Yechiva Torah Werahamim (0755089Z), Collège privé Gaston Tenoudji (0755192L), Collège privé Georges Gusdorf (0755496S) (corrigé), Ecole Secondaire Privée du Cerene (0755726S), Ecole générale et technologique privée Cours Progress (0755757A), Collège Kingsworth International School (0755773T), Collège privé Cours du Pont de Pierre (0755799W), Collège privé ICS Paris (0755848Z), Collège privé Ecole Démocratique de Paris (0755879H), Ecole Canadienne Internationale de Paris (0755897C), Collège privé Diago (0755925H) (corrigé), Collège privé Galilée la faculté des enfants (0755949J), Collège privé Autism Friendly Académie (0756021M), Collège privé La classe du phare (0756051V), Collège privé Paris FC (0756057B) (corrigé), Collège privé L'Autre Collège (0756105D), Collège privé Living School (0756120V), Collège privé Ecole Walt (0756123Y), Collège privé Montessori (0756191X), Collège privé Ellipse Montessori (0756197D), Collège privé École Diagonale (0756203K) (corrigé), Collège privé Cours Molière (0756204L), Collège privé Ecole Juive Moderne (0756234U), Ecole Secondaire Privée Lab School (0756272K), Ecole Secondaire Privée Maigret (0756273L), Ecole Secondaire Privée International School of Paris (0756274M), Collège privé Cours Montaigne (0756278S) (corrigé), Collège privé BETH SEFER YAD MORDEKHAI (0756282W), Collège privé CONCORDIA BILINGUAL SCHOOL (0756486T), Collège privé Ecole A (0756489W), Collège privé MONTESSORI PARIS 17 31 boulevard Berthier (0756519D), Collège privé CERENE (0756527M), Collège Privé Ma petite école Montessori Villafranca (0756727E), Collège Privé Ma petite école Montessori Dantzig (0756728F), Collège Privé Montessori Esclaibes (0756747B), Collège Privé Ipecom (0756786U), ECS Cerene (0756801K), Collège privé ABI SCHOOL 12 rue Charles Pouillet (0756898R), Collège Denecourt (0770002J), Collège Jean Rostand (0770003K), Collège Camille Corot (0770013W), Collège du Montois (0770020D), Collège La Rochefoucauld (0770024H), Collège Jacques Prévert (0770030P), Collège Émile Chevallier (0770048J), Collège Jean Baptiste Vermay (0770051M), Collège Elsa Triolet (0770053P), Collège les Creusottes (0770057U), Collège les Tournelles (0770059W), Collège Rosa Bonheur (0771068T), Collège Pierre de Montereau (0771174H), Collège René Goscinny (0771177L), Collège la Mare aux Champs (0771178M), Collège privé Sainte-Céline (0771222K), Collège institution Sainte-Foy (0771233X), Collège Gérard Philipe (0771333F), Collège Gérard Philipe (0771334G), Collège Elsa Triolet (0771337K), Collège Louis Braille (0771361L), Collège Camille Saint-Saens (0771362M), Collège le Moulin à Vent (0771472G), Collège Georges Politzer (0771476L), Collège Arthur Rimbaud (0771478N), Collège des Remparts (0771514C), Collège Louise Michel (0771519H), Collège Jean-Jacques Rousseau (0771562E), Collège Eugène Delacroix (0771563F), Collège Paul Éluard (0771567K), Collège Georges Brassens (0771615M), Collège les Maillettes (0771618R), Collège Charles Péguy (0771619S), Collège Nicolas Fouquet (0771620T), Collège Nellie Bly (0771656G), Collège la Plaine des Glacis (0771659K), Collège le grand parc (0771662N), Collège Mon Plaisir (0771667U), Collège privé Beth Myriam (0771668V), Collège Madame de La Fayette (0771760V), Collège André Malraux (0771761W), Collège Jacques Amyot (0771762X), Collège Beau Soleil (0771766B), Collège le Luzard (0771841H), Collège Bautain (0771917R), Collège Louis Aragon (0771991W), Collège la Maillière (0771992X), Collège Georges Brassens (0771993Y), Collège Jean Wiener (0772090D), Collège Van Gogh (0772119K), Collège le Segrais (0772125S), Collège Robert Buron (0772126T), Collège Saint-Louis (0772128V), Ecole secondaire privée Ecole de la Neuville (0772150U), Collège Léonard de Vinci (0772154Y), Collège Stephane Mallarmé (0772227C), Collège George Sand (0772247Z), Collège George Sand (0772248A), Collège La Grange du Bois (0772274D), Collège Marie Laurencin (0772293Z), Collège Monthéty (0772331R), Collège Christine de Pisan (0772427V), Collège de la Pyramide (0772429X), Collège de la Dhuis (0772499Y), Collège Erik Satie (0772573D), Collège Vasco de Gama (0772574E), Collège privé Oneschool Global Paris Campus (0772740K), Collège Colonel Arnaud Beltrame (0772867Y), Collège Marthe Simard (0772868Z), College Trait d'Union (0772879L), Collège privé La Petite Plume (0772898G), Collège Simone Veil (0772923J), Collège privé Sacré Coeur Enfant Jésus (0772937Z), Collège Joséphine Baker (0772968H), Collège Jean-Jacques Barbaux (0773007A), Collège Montessori Here and Now (0773021R), Collège Madeleine Brès (0773030A), Collège Avenir Val de Bussy (0773040L), Collège Anima collège (0773048V), Collège Auguste Renoir (0780507C), Ecole secondaire privée Jeanne d'Arc (0781902U), Ecole secondaire privée Bilingue Diderot (0782128P), Ecole secondaire privée Cours Château (0783284W), Ecole secondaire privée Saint Jean Bosco (0783585Y), Ecole secondaire privée Mathurin Cordier (0783621M), Ecole secondaire privée Bienheureux Charles de Foucauld (0783647R), Ecole secondaire privée Cours Sainte Clotilde (0783666L), Ecole secondaire privée Bilingue musulman Eva de Vitray (0783674V), Ecole secondaire privée International Montessori Athéna (0783682D), Ecole secondaire privée IDEE (0783702A), Ecole secondaire privée La Jonchère (0783727C), Ecole secondaire privée Institut FFGOLF de Haut niveau (0783738P), Ecole secondaire privée sports Académy le Mesnil (0783764T), Ecole secondaire privée Pilcalli (0783772B), Ecole secondaire privée La Jonchère EIB Campus (0783810T), Ecole secondaire privée Montessori de Gargenville (0783825J), Ecole secondaire privée NLC International School (0783831R), Ecole secondaire privée Dans tes Pas (0783844E), Ecole secondaire privée Station phoenix (0783846G), Ecole secondaire privée Alef Beth Chaoul (0783848J), Ecole secondaire privée EMI des enfants (0783869G), Ecole secondaire privée Cité Educative du Paris-Saint-Germain (0783870H), Collège André Maurois (0910017Z), Collège Sainte-Jeanne d'Arc (0910820X), Collège Pierre de Ronsard (0911441X), Collège Saint-Exupéry (0911572P), Collège Camille Claudel (0911948Y), Collège La Fontaine aux Bergers (0912175V), Ecole secondaire privée Time 4 School (0912303J), Ecole secondaire privée Citizen for Society School (0912337W), Ecole secondaire privée Groupe Scolaire Excellence (0912353N), Ecole secondaire privée Rhazès (0912363Z), Ecole secondaire privée La Lumière du Savoir (0912378R), Ecole secondaire privée de la Trinité (0912379S), Ecole secondaire privée Crayons Miel (0912432Z), Ecole secondaire privée ELAH (0912486H), Collège Julie-Victoire Daubié (0912539R), Collège Romain Rolland (0920624D), Collège Lakanal (0920626F), Ecole secondaire privée Marymount School (0920925F), Collège Saint-Pierre Saint-Jean (0921015D), Collège de la Paix (0922247T), Ecole de danse de l'Opéra de Paris (0922579D), Ecole secondaire privée  les vignes (0922657N), Collège Bienheureux Charles de Foucauld (0922731U), Collège privé Beth Hilel (0922751R), Ecole secondaire privée de l'Institut d'enseignement IBN Badis (0922764E), Ecole secondaire privée  Cours Antoine de Saint-Exupéry (0922765F), Ecole secondaire privée  international scolaire - Open Sky International (0922798S), Ecole secondaire privée ALEF (0922832D), Ecole secondaire privée Iféa Emilie du Châtelet (0922878D), Ecole secondaire privée Pardess Hannah (0922924D), Ecole secondaire privée internationale Deutsche Schule Paris (0922943Z), Ecole secondaire privée Iféa Katherine Johnson (0922955M), Ecole secondaire privée Cours Singulier (0922964X), Ecole secondaire privée Ecole Diagonale (0922967A), Ecole secondaire privée du Centre de référence pour l'évaluation neuropsychologique de l'enfant (CERENE) (0922977L), Ecole secondaire privée Walt (0923006T), Collège privé Beth Sepher Yad Mordekai (0923042G), Collège privé Institution Yad Mordekai (0923043H), Ecole secondaire privée HamaskaIne Tarkamantchatz (0923143S), Ecole secondaire privée Groupe Scolaire Yaguel Yaacov (0923154D), Ecole secondaire privée Marianne Picard (0923155E), Ecole secondaire privé Les Génies de Demain (0923494Y), Collège Albert Camus (0930586G), Collège Saint-Exupéry (0930593P), Collège Nelson Mandela (0930611J), Collège Jean-Baptiste Corot (0930629D), Collège Jean Lurçat (0930865K), Collège Anatole France (0930892P), Collège Roger Martin du Gard (0930893R), Collège privé Assomption (0930906E), Collège Georges Politzer (0931148T), Collège Jean Moulin (0931151W), Collège Didier Daurat (0931187K), Collège Raymond Poincaré (0931188L), Collège Romain Rolland (0931191P), Collège Les Mousseaux (0931192R), Collège Angela Davis (0931196V), Collège Georges Politzer (0931209J), Collège Colonel Fabien (0931213N), Collège Irène et Frédéric Joliot Curie (0931217T), Collège Jean-Jacques Rousseau (0931219V), Collège Joliot Curie (0931225B), Collège Albert Camus (0931228E), Collège Elsa Triolet (0931230G), Collège Gustave Courbet (0931381W), Collège Eugène Carrière (0931382X), Collège Jean Vigo (0931428X), Collège La Courtille (0931490P), Collège Jean Jaurès (0931546A), Collège Alfred Sisley (0931765N), Collège Henri Matisse (0931845A), Collège Françoise Dolto (0932038K), Collège privé Chne Ohr (0932043R), Collège Iqbal Masih (0932273R), Collège Lucie Aubrac (0932454M), Collège du Groupe scolaire privé Bellevue Muhammed Hamidullah (0932642S), Collège privé La Fraternité (0932646W), Collège privé Tachbar (0932647X), Collège privé Excelle (0932669W), Collège privé Malik Ibn Anas (0932686P), Collège privé Iqra (0932690U), Collège privé La plume de l'éducation (0932717Y), Collège - Groupe Scolaire Privé APCS (0932728K), Collège Al'Andalus (0932742A), Collège privé La Salle - Le Landy (0932773J), Collège Groupe Scolaire Privé Bougainville (0932797K), Collège privé réussite éducative valeurs et épanouissement (0932860D), Collège privé Lab School Montreuil (0932890L), Collège Niki de Saint Phalle (0932966U), Collège Privé ALEKOLE93 (0933024G), Collège Sainte-Thérèse (0940807S), Cours Nogentais Mixte (0940875R), Collège de Maille (0940884A), Collège Ozar Hatorah Filles (0941614U), Collège Poullart des Places (0941891V), Collège privé ISE Emeth Leyaacov - Filles (0942143U), Collège privé ISE Emeth Leyaacov - Garçons (0942185P), Collège privé Padre-Pio (0942192X), Collège du groupe scolaire privé Education et Savoir (0942223F), Collège privé l'Ecole Heureuse - LEH (0942336D), Collège privé Sports études de Paris (SEDP) (0942366L), Collège privé Ecole Enfance et Vie - Ohr Menahem (0942428D), Collège privé Pilote Arborescences (0942433J), Collège privé Dix sur Dix (0942626U) (corrigé), Collège Nél (0942674W), Collège Notre-Dame (0950758H), Collège Simone Veil (0950895G), Collège Jacques Monod (0950933Y), Ecole secondaire privée IInstitut de Gestion Sociale des Armées (0951707P), Collège ORT (0951916S), Ecole secondaire privée Léonard de Vinci (0952125U), Ecole secondaire privée Beth Yaacov (0952133C), Ecole secondaire privée Pierre Gilles de Gennes (0952167P), Ecole secondaire privée Hanned (0952171U), Ecole secondaire privée les Petis Pas (0952213P), Ecole secondaire privée Académie Fihri (0952218V), Ecole secondaire privée Torah Or (0952222Z), Ecole secondaire privée New School (0952223A), Ecole secondaire privée du Petit Prince (0952240U), Collège privé  Cours Charlemagne (0952267Y), Ecole secondaire privée International Trilingue de Cergy - CITC (0952303M), Nouveau collège de Saint-Ouen-L'Aumône (0952381X).

## 2. Millésimes

- Brevet : moyenne des sessions 2023, 2024, 2025 (IVAC, `Dataset.sessions.brevet`), dernière session 2025 ; historique DNB 2015–2021 (tous candidats) puis IVAC (série générale).
- IPS : rentrée 2025-2026. Effectifs : rentrée 2025. Évaluations 6e : 2025. Encadrement : rentrée 2025.
- Distributions nationales de la note maison (collèges ayant l'indicateur sur 2023–2024–2025) : brevet 6872, note à l'écrit 6872, VA du taux 6592, VA de la note 6592.

## 3. Valeurs manquantes par indicateur

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

Détail des collèges sous contrat (hors contrat simple) sans résultat ou sans valeur ajoutée :

- Collège Hector Berlioz (0752252R) — brevetDernier : Non publié
- Collège privé Morvan (0752916M) — vaTaux : Valeur ajoutée non calculée (moins de 40 présents ou appariement insuffisant) ; vaNote : Valeur ajoutée non calculée (moins de 40 présents ou appariement insuffisant)
- Collège privé École active bilingue Jeannine Manuel (0752935H) — brevet : Non publié ; brevetDernier : Non publié ; vaTaux : Non publié ; vaNote : Non publié
- Collège privé France Quéré - Association Votre école chez vous (0752954D) — brevet : Non publié ; brevetDernier : Non publié ; vaTaux : Non publié ; vaNote : Non publié
- Collège privé Sinaï (0753206C) — vaTaux : Valeur ajoutée non calculée (moins de 40 présents ou appariement insuffisant) ; vaNote : Valeur ajoutée non calculée (moins de 40 présents ou appariement insuffisant)
- Collège privé Beth Hanna (0753369E) — vaTaux : Valeur ajoutée non calculée (moins de 40 présents ou appariement insuffisant) ; vaNote : Valeur ajoutée non calculée (moins de 40 présents ou appariement insuffisant)
- Collège privé Beth Yacov (0753387Z) — brevet : Non publié ; brevetDernier : Non publié ; vaTaux : Non publié ; vaNote : Non publié
- Collège privé Thérèse Chappuis (0753854G) — vaTaux : Valeur ajoutée non calculée (moins de 40 présents ou appariement insuffisant) ; vaNote : Valeur ajoutée non calculée (moins de 40 présents ou appariement insuffisant)
- Collège privé Saint-Joseph (0753992G) — vaTaux : Valeur ajoutée non calculée (moins de 40 présents ou appariement insuffisant) ; vaNote : Valeur ajoutée non calculée (moins de 40 présents ou appariement insuffisant)
- Collège privé Saint-Louis (0754008Z) — vaTaux : Valeur ajoutée non calculée (moins de 40 présents ou appariement insuffisant) ; vaNote : Valeur ajoutée non calculée (moins de 40 présents ou appariement insuffisant)
- Collège privé Heikhal Menahem Sinaï (0755029J) — vaTaux : Valeur ajoutée non calculée (moins de 40 présents ou appariement insuffisant) ; vaNote : Valeur ajoutée non calculée (moins de 40 présents ou appariement insuffisant)
- Collège privé Gaston Tenoudji (0755192L) — brevet : Non publié ; brevetDernier : Non publié ; vaTaux : Non publié ; vaNote : Non publié
- Collège privé Saint-Jean de Dieu (0756020L) — brevet : Non publié ; brevetDernier : Non publié ; vaTaux : Non publié ; vaNote : Non publié
- Collège privé Beth Aaron (0756124Z) — brevet : Non publié ; brevetDernier : Non publié ; vaTaux : Non publié ; vaNote : Non publié
- Collège privé Père Jacques (0772650M) — brevet : Non publié ; brevetDernier : Non publié ; vaTaux : Non publié ; vaNote : Non publié
- Collège Simone Veil (0772923J) — brevet : Non publié ; brevetDernier : Non publié ; vaTaux : Non publié ; vaNote : Non publié
- Collège Marthe Gautier (0772945H) — brevet : Non publié ; brevetDernier : Non publié ; vaTaux : Non publié ; vaNote : Non publié
- Collège Jeanne Bonnardel Beguin (0772946J) — brevet : Non publié ; brevetDernier : Non publié ; vaTaux : Non publié ; vaNote : Non publié
- Collège privé Saint-Colomban (0772953S) — brevet : Non publié ; brevetDernier : Non publié ; vaTaux : Non publié ; vaNote : Non publié
- Collège Joséphine Baker (0772968H) — brevet : Non publié ; brevetDernier : Non publié ; vaTaux : Non publié ; vaNote : Non publié
- Collège Jean-Jacques Barbaux (0773007A) — brevet : Non publié ; brevetDernier : Non publié ; vaTaux : Non publié ; vaNote : Non publié
- Collège Madeleine Brès (0773030A) — brevet : Non publié ; brevetDernier : Non publié ; vaTaux : Non publié ; vaNote : Non publié
- Collège Perceval (0781601S) — vaTaux : Valeur ajoutée non calculée (moins de 40 présents ou appariement insuffisant) ; vaNote : Valeur ajoutée non calculée (moins de 40 présents ou appariement insuffisant)
- Collège privé Samarcande (0783592F) — vaTaux : Valeur ajoutée non calculée (moins de 40 présents ou appariement insuffisant) ; vaNote : Valeur ajoutée non calculée (moins de 40 présents ou appariement insuffisant)
- Collège privé Saint-Thomas de Villeneuve (0783816Z) — brevet : Non publié ; brevetDernier : Non publié ; vaTaux : Non publié ; vaNote : Non publié
- Collège Les Châtaigniers (0783838Y) — brevet : Non publié ; brevetDernier : Non publié ; vaTaux : Non publié ; vaNote : Non publié
- Collège Rudolf Steiner (0911601W) — vaTaux : Valeur ajoutée non calculée (moins de 40 présents ou appariement insuffisant) ; vaNote : Valeur ajoutée non calculée (moins de 40 présents ou appariement insuffisant)
- Collège Claudine Hermann (0912487J) — brevet : Non publié ; brevetDernier : Non publié ; vaTaux : Non publié ; vaNote : Non publié
- Collège Julie-Victoire Daubié (0912539R) — brevet : Non publié ; brevetDernier : Non publié ; vaTaux : Non publié ; vaNote : Non publié
- Collège Saint-Spire Sénart (0912547Z) — brevet : Non publié ; brevetDernier : Non publié ; vaTaux : Non publié ; vaNote : Non publié
- Collège Suger (0921919L) — vaTaux : Valeur ajoutée non calculée (moins de 40 présents ou appariement insuffisant) ; vaNote : Valeur ajoutée non calculée (moins de 40 présents ou appariement insuffisant)
- Collège Saint-Philippe (0922340U) — brevet : Non publié ; brevetDernier : Non publié ; vaTaux : Non publié ; vaNote : Non publié
- Collège Hautefeuille (0922482Y) — vaTaux : Valeur ajoutée non calculée (moins de 40 présents ou appariement insuffisant) ; vaNote : Valeur ajoutée non calculée (moins de 40 présents ou appariement insuffisant)
- Ecole de danse de l'Opéra de Paris (0922579D) — brevetDernier : Non publié ; vaTaux : Valeur ajoutée non calculée (moins de 40 présents ou appariement insuffisant) ; vaNote : Valeur ajoutée non calculée (moins de 40 présents ou appariement insuffisant)
- Collège privé Beth Hilel (0922751R) — brevet : Non publié ; brevetDernier : Non publié ; vaTaux : Non publié ; vaNote : Non publié
- Collège Sainte-Marie (0930963S) — vaTaux : Valeur ajoutée non calculée (moins de 40 présents ou appariement insuffisant) ; vaNote : Valeur ajoutée non calculée (moins de 40 présents ou appariement insuffisant)
- Collège privé Tebrotzassère (0930970Z) — brevet : Non publié ; brevetDernier : Non publié ; vaTaux : Non publié ; vaNote : Non publié
- Collège Merkaz Hatorah Garçons (0931855L) — vaTaux : Valeur ajoutée non calculée (moins de 40 présents ou appariement insuffisant) ; vaNote : Valeur ajoutée non calculée (moins de 40 présents ou appariement insuffisant)
- Collège privé Chne Ohr (0932043R) — vaTaux : Valeur ajoutée non calculée (moins de 40 présents ou appariement insuffisant) ; vaNote : Valeur ajoutée non calculée (moins de 40 présents ou appariement insuffisant)
- Collège Merkaz Hatorah Filles (0932302X) — vaTaux : Valeur ajoutée non calculée (moins de 40 présents ou appariement insuffisant) ; vaNote : Valeur ajoutée non calculée (moins de 40 présents ou appariement insuffisant)
- Collège privé La Salle - Le Landy (0932773J) — vaTaux : Valeur ajoutée non calculée (moins de 40 présents ou appariement insuffisant) ; vaNote : Valeur ajoutée non calculée (moins de 40 présents ou appariement insuffisant)
- Collège privé réussite éducative valeurs et épanouissement (0932860D) — brevet : Non publié ; brevetDernier : Non publié ; vaTaux : Non publié ; vaNote : Non publié
- Collège Niki de Saint Phalle (0932966U) — brevet : Non publié ; brevetDernier : Non publié ; vaTaux : Non publié ; vaNote : Non publié
- Collège Ovide Decroly (0940024R) — vaTaux : Valeur ajoutée non calculée (moins de 40 présents ou appariement insuffisant) ; vaNote : Valeur ajoutée non calculée (moins de 40 présents ou appariement insuffisant)
- Collège privé Bernard Palissy (0940892J) — vaTaux : Valeur ajoutée non calculée (moins de 40 présents ou appariement insuffisant) ; vaNote : Valeur ajoutée non calculée (moins de 40 présents ou appariement insuffisant)
- Collège Poullart des Places (0941891V) — brevet : Non publié ; brevetDernier : Non publié ; vaTaux : Non publié ; vaNote : Non publié
- Collège Cours du Hameau (0942119T) — vaTaux : Valeur ajoutée non calculée (moins de 40 présents ou appariement insuffisant) ; vaNote : Valeur ajoutée non calculée (moins de 40 présents ou appariement insuffisant)
- Collège privé Saint-Mesrop Arabian (0942392P) — brevet : Non publié ; brevetDernier : Non publié ; vaTaux : Non publié ; vaNote : Non publié
- Collège Jeanne d'Arc (0950751A) — vaTaux : Valeur ajoutée non calculée (moins de 40 présents ou appariement insuffisant) ; vaNote : Valeur ajoutée non calculée (moins de 40 présents ou appariement insuffisant)
- Collège Saint-Pie X (Fondation d'Auteuil) (0951220K) — brevet : Non publié ; brevetDernier : Non publié ; vaTaux : Non publié ; vaNote : Non publié
- Collège Torat Emet (0951682M) — vaTaux : Valeur ajoutée non calculée (moins de 40 présents ou appariement insuffisant) ; vaNote : Valeur ajoutée non calculée (moins de 40 présents ou appariement insuffisant)
- Collège Ozar Hatorah (0951939S) — vaTaux : Valeur ajoutée non calculée (moins de 40 présents ou appariement insuffisant) ; vaNote : Valeur ajoutée non calculée (moins de 40 présents ou appariement insuffisant)
- Collège Saint-Jean (0952136F) — brevet : Non publié ; brevetDernier : Non publié ; vaTaux : Non publié ; vaNote : Non publié
- Collège Marie-José Perec (0952326M) — brevet : Non publié ; brevetDernier : Non publié ; vaTaux : Non publié ; vaNote : Non publié
- Nouveau collège de Saint-Ouen-L'Aumône (0952381X) — brevet : Non publié ; brevetDernier : Non publié ; vaTaux : Non publié ; vaNote : Non publié

## 4. Note maison

1129 collèges notés sur 1292 (24 notes partielles). Lettres : A 144, B 155, C 237, D 372, E 221.

| Rang | Collège | Note | Lettre | Brevet | Écrit | VA | Partielle | Brevet 3 ans (%) | Écrit 3 ans | VA taux | VA note |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Collège privé Saint-Joseph (0753992G) | 19.5 | A | 19.6 | 19.4 |  | oui | 100 | 14.1 |  |  |
| 1 | Collège Hautefeuille (0922482Y) | 19.5 | A | 19.6 | 19.4 |  | oui | 100 | 14.1 |  |  |
| 3 | Ecole de danse de l'Opéra de Paris (0922579D) | 19.4 | A | 19.6 | 19.1 |  | oui | 100 | 13.7 |  |  |
| 4 | Collège privé Samarcande (0783592F) | 19.1 | A | 19.6 | 18.6 |  | oui | 100 | 13.3 |  |  |
| 5 | Collège privé Sinaï (0753206C) | 18.9 | A | 19.6 | 18.2 |  | oui | 100 | 13 |  |  |
| 6 | Collège privé Pascal (0752919R) | 18.8 | A | 19.6 | 19.9 | 16.9 |  | 100 | 15.7 | 1.7 | 2 |
| 6 | Collège Saint-André (0940810V) | 18.8 | A | 19.6 | 19 | 17.7 |  | 100 | 13.6 | 4 | 0.9 |
| 8 | Collège privé Yabné (0752906B) | 18.7 | A | 19.6 | 19.8 | 16.6 |  | 100 | 14.9 | 1.5 | 1.4 |
| 8 | Collège Notre-Dame (0951508Y) | 18.7 | A | 19.6 | 19.6 | 16.9 |  | 100 | 14.4 | 2 | 1.2 |
| 10 | Collège privé Notre-Dame de France (0752896R) | 18.6 | A | 19.6 | 20 | 16.2 |  | 100 | 15.8 | 1 | 1.5 |
| 11 | Collège privé Gerson (0752926Y) | 18.5 | A | 19.6 | 19.9 | 16 |  | 100 | 15.2 | 1.7 | 0.8 |
| 11 | Collège privé de l'Assomption (0752936J) | 18.5 | A | 19.6 | 19.2 | 16.7 |  | 100 | 13.9 | 2 | 1 |
| 11 | Collège Merkaz Hatorah Filles (0932302X) | 18.5 | A | 17.4 | 19.5 |  | oui | 97.8 | 14.2 |  |  |
| 14 | Collège privé Notre-Dame de Lourdes (0754006X) | 18.4 | A | 19.6 | 19.4 | 16.3 |  | 100 | 14.1 | 2 | 0.8 |
| 15 | Collège privé Lucien de Hirsch (0754003U) | 18.3 | A | 19.6 | 18 | 17.2 |  | 100 | 12.9 | 4.3 | 0.6 |
| 15 | Collège privé Epin (0940874P) | 18.3 | A | 19.6 | 20 | 15.3 |  | 100 | 16 | 0.7 | 0.9 |
| 15 | Collège Ozar Hatorah Filles (0941614U) | 18.3 | A | 19.6 | 18.6 | 16.7 |  | 100 | 13.3 | 2 | 1.1 |
| 18 | Collège privé La Rochefoucauld (0752899U) | 18.2 | A | 19.6 | 19.9 | 15.1 |  | 100 | 15.4 | 1 | 0.7 |
| 18 | Collège privé Saint-Vincent (0753381T) | 18.2 | A | 18.8 | 18.6 | 17.2 |  | 99.3 | 13.3 | 4 | 0.7 |
| 20 | Collège Sainte-Thérèse (0771217E) | 18.1 | A | 18.7 | 19.5 | 16.1 |  | 99.3 | 14.2 | 1.7 | 0.9 |
| 21 | Collège Saint-Joseph (0920905J) | 18 | A | 19.6 | 19.9 | 14.6 |  | 100 | 15.1 | 1 | 0.6 |
| 21 | Collège privé Charles Péguy (0931844Z) | 18 | A | 18.6 | 19.5 | 16 |  | 99.1 | 14.2 | 1 | 1.2 |
| 21 | Collège Merkaz Hatorah Garçons (0931855L) | 18 | A | 16.8 | 19.1 |  | oui | 97.1 | 13.7 |  |  |
| 24 | Collège privé de la Tour (0752897S) | 17.9 | A | 19.6 | 20 | 14 |  | 100 | 16.6 | 0 | 0.7 |
| 24 | Collège Sacré-Coeur (0911751J) | 17.9 | A | 19.1 | 19.2 | 15.5 |  | 99.7 | 13.8 | 2.3 | 0.5 |
| 24 | Collège Alliance (0930966V) | 17.9 | A | 17.9 | 18.1 | 17.6 |  | 98.4 | 13 | 3 | 1.2 |
| 24 | Collège Sainte-Thérèse (0940807S) | 17.9 | A | 18.9 | 19.5 | 15.2 |  | 99.4 | 14.2 | 1 | 0.8 |
| 24 | Collège Vauban (0951943W) | 17.9 | A | 19.6 | 19.3 | 14.8 |  | 100 | 14 | 1.3 | 0.5 |
| 29 | Collège privé Charles Péguy (0752895P) | 17.8 | A | 19.2 | 19.8 | 14.4 |  | 99.7 | 15 | 0.7 | 0.6 |
| 29 | Collège privé Stanislas (0752900V) | 17.8 | A | 19.6 | 20 | 13.7 |  | 100 | 16.8 | 0 | 0.6 |
| 29 | Collège privé Sévigné (0752913J) | 17.8 | A | 19.6 | 20 | 13.7 |  | 100 | 15.9 | 0.5 | 0.5 |
| 29 | Collège privé La Bruyère Sainte-Isabelle (0753908R) | 17.8 | A | 19 | 19.7 | 14.8 |  | 99.7 | 14.5 | 1.3 | 0.5 |
| 29 | Collège Bienheureux Charles de Foucauld (0922731U) | 17.8 | A | 19.6 | 18.8 | 14.9 |  | 100 | 13.4 | 2.3 | 0.4 |
| 29 | Collège Notre-Dame des Missions (0940808T) | 17.8 | A | 19.6 | 19.9 | 14 |  | 100 | 15.1 | 1 | 0.4 |
| 35 | Collège privé Sainte-Clotilde (0753896C) | 17.7 | A | 19 | 19.8 | 14.3 |  | 99.7 | 14.9 | 1 | 0.5 |
| 35 | Collège Maïmonide Rambam (0921904V) | 17.7 | A | 18.2 | 19.4 | 15.5 |  | 98.7 | 14.1 | 1 | 0.9 |
| 37 | Collège privé Fénelon Sainte-Marie (0752842G) | 17.6 | A | 19.1 | 19.9 | 13.7 |  | 99.7 | 15.7 | 0.7 | 0.4 |
| 37 | Collège privé Paul Claudel d'Hulst (0752882A) | 17.6 | A | 18.8 | 19.7 | 14.3 |  | 99.3 | 14.6 | 0.3 | 0.6 |
| 37 | Collège privé Sainte-Jeanne-Élisabeth (0752894N) | 17.6 | A | 19.6 | 19.9 | 13.4 |  | 100 | 15.3 | 1 | 0.3 |
| 37 | Collège privé Saint-Michel des Batignolles (0752927Z) | 17.6 | A | 19.2 | 19.7 | 13.8 |  | 99.7 | 14.6 | 1 | 0.4 |
| 37 | Collège privé Saint-Honoré d'Eylau (0753996L) | 17.6 | A | 19.3 | 19.4 | 14.1 |  | 99.7 | 14.1 | 1.5 | 0.4 |
| 37 | Collège Saint-Jean - Hulst (0781597M) | 17.6 | A | 19.6 | 19.9 | 13.2 |  | 100 | 15.4 | 1 | 0.3 |
| 37 | Collège Sainte-Anne (0783339F) | 17.6 | A | 18.4 | 19.5 | 15 |  | 99 | 14.1 | 1.5 | 0.6 |
| 37 | Collège Jeanne d'Arc (0910827E) | 17.6 | A | 19.2 | 18.7 | 14.8 |  | 99.7 | 13.4 | 2 | 0.4 |
| 37 | Collège Saint-Thomas de Villeneuve (0921907Y) | 17.6 | A | 19.2 | 19.9 | 13.6 |  | 99.7 | 15.2 | 0.7 | 0.4 |
| 37 | Collège Notre-Dame de Sainte-Croix (0921913E) | 17.6 | A | 19.6 | 19.9 | 13.2 |  | 100 | 15.5 | 1 | 0.3 |
| 37 | Collège Passy Saint-Nicolas Buzenval (0921915G) | 17.6 | A | 19.6 | 19.6 | 13.7 |  | 100 | 14.4 | 1.7 | 0.2 |
| 37 | Collège Françoise Cabrini (0931705Y) | 17.6 | A | 19.1 | 19.3 | 14.4 |  | 99.7 | 14 | 1.3 | 0.4 |
| 37 | Collège Montalembert (0941713B) | 17.6 | A | 19.2 | 19.8 | 13.8 |  | 99.7 | 15 | 0.7 | 0.4 |
| 50 | Collège privé des Francs Bourgeois (0752902X) | 17.5 | A | 19.6 | 19.8 | 13.2 |  | 100 | 15 | 1 | 0.3 |
| 50 | Collège Sainte-Marie (0771220H) | 17.5 | A | 19.2 | 19.2 | 14.1 |  | 99.7 | 13.8 | 1.3 | 0.4 |
| 50 | Collège Jeanne d'Arc (0911747E) | 17.5 | A | 18.8 | 18.1 | 15.5 |  | 99.3 | 13 | 3 | 0.4 |
| 50 | Collège Saint-Charles (0950790T) | 17.5 | A | 19.6 | 19.3 | 13.6 |  | 100 | 14 | 1.7 | 0.2 |
| 54 | Collège privé Eugène Napoléon Saint-Pierre Fourier (0752911G) | 17.4 | A | 18.5 | 19.3 | 14.3 |  | 99 | 14 | 1 | 0.5 |
| 54 | Collège privé Saint-Ambroise (0753978S) | 17.4 | A | 19.6 | 19.9 | 12.6 |  | 100 | 15.6 | 1 | 0.2 |
| 54 | Maison de la Légion d'Honneur (0783122V) | 17.4 | A | 19.6 | 20 | 12.7 |  | 100 | 15.8 | 0 | 0.3 |
| 54 | Collège Notre-Dame (0910830H) | 17.4 | A | 18.9 | 19.1 | 14.3 |  | 99.3 | 13.7 | 1.7 | 0.4 |
| 54 | Collège Sophie Barat (0921906X) | 17.4 | A | 19.6 | 19.6 | 13 |  | 100 | 14.4 | 1.3 | 0.2 |
| 54 | Collège Saint-Louis Blanche de Castille (0931846B) | 17.4 | A | 19.6 | 19.5 | 13 |  | 100 | 14.3 | 1.7 | 0.1 |
| 54 | Collège Petit Val (0941716E) | 17.4 | A | 17.8 | 19.4 | 14.9 |  | 98.3 | 14.1 | 0.7 | 0.8 |
| 61 | Collège privé Blomet (0752843H) | 17.3 | A | 19.6 | 20 | 12.3 |  | 100 | 16.4 | 0 | 0.3 |
| 61 | Collège privé Sainte-Colombe (0771225N) | 17.3 | A | 17.4 | 18.4 | 16.2 |  | 97.9 | 13.1 | 1.7 | 0.9 |
| 61 | Collège privé Notre-Dame (0781591F) | 17.3 | A | 19.6 | 19.7 | 12.6 |  | 100 | 14.7 | 1 | 0.2 |
| 61 | Collège privé du cours secondaire d'Orsay (0911749G) | 17.3 | A | 19.6 | 19.7 | 12.7 |  | 100 | 14.5 | 1.3 | 0.1 |
| 61 | Collège Sainte-Marie (0920998K) | 17.3 | A | 18.1 | 18.7 | 15 |  | 98.7 | 13.3 | 1.3 | 0.6 |
| 61 | Collège Notre-Dame (0921905W) | 17.3 | A | 19.6 | 19.8 | 12.4 |  | 100 | 14.8 | 1 | 0.1 |
| 61 | Collège Jeanne d'Arc (0921911C) | 17.3 | A | 18.7 | 19.4 | 13.8 |  | 99.3 | 14.1 | 0.7 | 0.4 |
| 68 | Collège privé Saint-Michel de Picpus (0752934G) | 17.2 | A | 19.6 | 19.8 | 12.2 |  | 100 | 14.9 | 1 | 0.1 |
| 68 | Collège Sainte-Thérèse (0783338E) | 17.2 | A | 19 | 19.6 | 13 |  | 99.7 | 14.4 | 1 | 0.2 |
| 68 | Collège Sainte-Geneviève (0921902T) | 17.2 | A | 19.6 | 20 | 12.1 |  | 100 | 15.7 | 0.3 | 0.2 |
| 68 | Collège Saint-Germain (0930907F) | 17.2 | A | 17.6 | 16.3 | 17.8 |  | 98 | 12.4 | 4.7 | 0.8 |
| 68 | Collège privé Saint-Thomas de Villeneuve (0940887D) | 17.2 | A | 17.4 | 19.8 | 14.5 |  | 97.8 | 14.7 | -0.7 | 1.2 |
| 73 | Collège Sainte-Marie (0771921V) | 17.1 | A | 18.1 | 18.6 | 14.6 |  | 98.7 | 13.3 | 1.7 | 0.4 |
| 73 | Collège Notre-Dame (0781620M) | 17.1 | A | 19.6 | 19.9 | 11.9 |  | 100 | 15.2 | 0.7 | 0.1 |
| 73 | Collège Sainte-Thérèse (0910817U) | 17.1 | A | 19 | 17 | 15.3 |  | 99.7 | 12.6 | 3.7 | 0.3 |
| 73 | Collège Sainte-Marie la Croix (0921901S) | 17.1 | A | 19.1 | 19.9 | 12.3 |  | 99.7 | 15.1 | 0.7 | 0.2 |
| 73 | Collège Notre-Dame (0922450N) | 17.1 | A | 19.6 | 19.9 | 11.9 |  | 100 | 15.3 | 0.7 | 0.1 |
| 73 | Collège Henri Matisse (0931845A) | 17.1 | A | 18.9 | 19.2 | 13.2 |  | 99.4 | 13.9 | 1.3 | 0.2 |
| 73 | Collège Saint-Joseph (0950789S) | 17.1 | A | 18.8 | 17.4 | 15.1 |  | 99.3 | 12.7 | 3.3 | 0.3 |
| 80 | Collège privé Rocroy Saint-Vincent de Paul (0752923V) | 17 | A | 19.6 | 19.8 | 11.5 |  | 100 | 14.9 | 1 | 0 |
| 80 | Collège privé Bossuet Notre-Dame (0754506R) | 17 | A | 19.6 | 19.9 | 11.5 |  | 100 | 15.5 | 0.7 | 0 |
| 80 | Collège Jeanne d'Arc-Saint-Aspais (0771925Z) | 17 | A | 19.6 | 19.3 | 12.1 |  | 100 | 13.9 | 1.7 | 0 |
| 80 | Collège l'Ermitage, École internationale de France (0781587B) | 17 | A | 19.6 | 19.5 | 11.8 |  | 100 | 14.2 | 1 | 0 |
| 80 | Collège Notre-Dame de la Providence (0941718G) | 17 | A | 19.6 | 19.9 | 11.5 |  | 100 | 15.3 | 0.3 | 0.1 |
| 80 | Collège Notre-Dame (0950758H) | 17 | A | 18.5 | 18.6 | 13.9 |  | 99 | 13.3 | 1.3 | 0.3 |
| 80 | Collège Sainte-Geneviève (0950788R) | 17 | A | 19.6 | 18.6 | 12.7 |  | 100 | 13.3 | 2.3 | 0 |
| 87 | Collège privé École active bilingue Monceau (0752821J) | 16.9 | A | 19.6 | 19.8 | 11.2 |  | 100 | 15 | 1 | 0 |
| 87 | Collège privé Notre-Dame de Sion (0754757N) | 16.9 | A | 19.1 | 19.9 | 11.8 |  | 99.7 | 15.3 | 0 | 0.2 |
| 87 | Collège Saint-François d'Assise (0781662H) | 16.9 | A | 19.1 | 19.8 | 11.7 |  | 99.7 | 14.8 | 0.7 | 0.1 |
| 87 | Collège Saint-Justin (0921007V) | 16.9 | A | 17.4 | 19.8 | 13.4 |  | 97.9 | 14.8 | 0 | 0.5 |
| 87 | Collège Fidélis (0930912L) | 16.9 | A | 17.2 | 17.4 | 16.2 |  | 97.6 | 12.7 | 2.7 | 0.6 |
| 87 | Collège Saint-Joseph (0930917S) | 16.9 | A | 17.7 | 19.5 | 13.5 |  | 98.3 | 14.3 | -0.3 | 0.6 |
| 87 | Collège international de l'Est parisien (0932581A) | 16.9 | A | 19.6 | 19.9 | 11.1 |  | 100 | 15.1 | 1 | -0.1 |
| 87 | Collège Sainte-Jeanne d'Arc (0950793W) | 16.9 | A | 19 | 18.9 | 12.7 |  | 99.7 | 13.5 | 1.7 | 0.1 |
| 87 | Collège Notre Dame de la Providence (0951504U) | 16.9 | A | 19.6 | 18.4 | 12.8 |  | 100 | 13.1 | 2.7 | 0 |
| 96 | Collège Bautain (0771917R) | 16.8 | A | 17.5 | 18.2 | 14.6 |  | 98 | 13 | 1 | 0.6 |
| 96 | Collège Jeanne d'Arc (0771923X) | 16.8 | A | 18.8 | 18.4 | 13.3 |  | 99.3 | 13.2 | 2 | 0.1 |
| 98 | Collège privé Saint-Germain de Charonne (0754005W) | 16.7 | A | 19.1 | 17.9 | 13.2 |  | 99.7 | 12.9 | 3 | 0 |
| 98 | Collège Saint-Louis - Saint-Clément (0911752K) | 16.7 | A | 17.8 | 18.8 | 13.5 |  | 98.3 | 13.4 | 1.3 | 0.3 |
| 98 | Collège Saint-Joseph (0931528F) | 16.7 | A | 16.1 | 15.4 | 18.7 |  | 96.2 | 12.1 | 5 | 1.2 |
| 98 | Collège privé l'Espérance (0931843Y) | 16.7 | A | 17.3 | 19 | 13.9 |  | 97.7 | 13.6 | 0.3 | 0.5 |
| 98 | Collège Sainte-Thérèse (0941712A) | 16.7 | A | 18.4 | 19.3 | 12.4 |  | 99 | 14 | 0.7 | 0.2 |
| 98 | Collège Albert de Mun (0941714C) | 16.7 | A | 19.6 | 19.9 | 10.5 |  | 100 | 15.1 | 0.7 | -0.1 |
| 98 | Collège Le Rosaire (0950763N) | 16.7 | A | 18.2 | 19.2 | 12.8 |  | 98.7 | 13.8 | 0.3 | 0.3 |
| 105 | Collège privé L'École alsacienne (0752874S) | 16.6 | A | 18.8 | 19.8 | 11.2 |  | 99.3 | 15 | 0.3 | 0 |
| 105 | Collège privé Massillon (0752920S) | 16.6 | A | 19.6 | 19.8 | 10.4 |  | 100 | 14.9 | 1 | -0.2 |
| 105 | Collège privé Sœur Rosalie (0753967E) | 16.6 | A | 18.5 | 19.8 | 11.6 |  | 99 | 15 | 0 | 0.2 |
| 105 | Collège Blanche de Castille (0781586A) | 16.6 | A | 19.2 | 19.4 | 11.1 |  | 99.7 | 14 | 1.3 | -0.1 |
| 105 | Collège Saint-Joseph (0920890T) | 16.6 | A | 19.6 | 19.7 | 10.4 |  | 100 | 14.4 | 1 | -0.2 |
| 105 | Collège Chambertin (0922256C) | 16.6 | A | 19.6 | 19.6 | 10.6 |  | 100 | 14.4 | 1 | -0.1 |
| 111 | Collège privé Saint-Jean-Gabriel (0753965C) | 16.5 | A | 18.8 | 15.3 | 15.4 |  | 99.3 | 12.1 | 2.5 | 0.5 |
| 111 | Collège Saint-Laurent-La Paix Notre-Dame (0771918S) | 16.5 | A | 18.8 | 19.1 | 11.7 |  | 99.3 | 13.7 | 1 | 0 |
| 111 | Collège Nazareth (0771930E) | 16.5 | A | 17.2 | 18.1 | 14.1 |  | 97.6 | 13 | 0.7 | 0.5 |
| 111 | Collège privé Maurice Rondeau (0772601J) | 16.5 | A | 19.6 | 19.7 | 10.2 |  | 100 | 14.5 | 1 | -0.2 |
| 111 | Collège Saint-Dominique (0921914F) | 16.5 | A | 19.6 | 19.9 | 10 |  | 100 | 15.5 | 0.3 | -0.1 |
| 116 | Collège privé Sainte-Ursule Louise de Bettignies (0752898T) | 16.4 | A | 19.6 | 19.8 | 9.9 |  | 100 | 14.9 | 1 | -0.2 |
| 116 | Collège privé Notre-Dame des Oiseaux (0752918P) | 16.4 | A | 19.6 | 19.8 | 9.8 |  | 100 | 14.8 | 0.3 | -0.2 |
| 116 | Collège privé Beth Hanna (0753369E) | 16.4 | A | 17.2 | 15.6 |  | oui | 97.7 | 12.2 |  |  |
| 116 | Collège Sainte-Marie (0921912D) | 16.4 | A | 19.6 | 20 | 9.5 |  | 100 | 16.2 | 0 | -0.2 |
| 116 | Collège Saint-André (0940811W) | 16.4 | A | 19.2 | 18.8 | 11.2 |  | 99.7 | 13.5 | 1.7 | -0.1 |
| 116 | Collège Édouard Herriot (0941046B) | 16.4 | A | 15.7 | 18.6 | 14.9 |  | 95.7 | 13.3 | 0.3 | 0.9 |
| 122 | Collège privé Sainte-Élisabeth (0752901W) | 16.3 | A | 19.6 | 19.5 | 9.9 |  | 100 | 14.2 | 1 | -0.2 |
| 122 | Collège privé Saint-Georges (0754004V) | 16.3 | A | 18.2 | 19 | 11.8 |  | 98.7 | 13.6 | 0.7 | 0.1 |
| 122 | Collège Perceval (0781601S) | 16.3 | A | 15.6 | 17 |  | oui | 95.6 | 12.6 |  |  |
| 122 | Collège Notre-Dame (0921018G) | 16.3 | A | 19.1 | 19.9 | 9.9 |  | 99.7 | 15.1 | 0 | -0.1 |
| 122 | Collège Saint-Joseph (0921020J) | 16.3 | A | 19.6 | 16.1 | 13.1 |  | 100 | 12.3 | 2 | 0.1 |
| 122 | Collège Jeanne d'Arc (0940809U) | 16.3 | A | 17.4 | 19.3 | 12.3 |  | 97.8 | 14 | 0 | 0.3 |
| 122 | Collège Saint-Michel (0941715D) | 16.3 | A | 17.2 | 19 | 12.6 |  | 97.6 | 13.6 | 0 | 0.3 |
| 122 | Collège Ozar Hatorah (0951939S) | 16.3 | A | 19.6 | 13 |  | oui | 100 | 11.6 |  |  |
| 130 | Collège Claude Debussy (0752317L) | 16.2 | A | 17.9 | 18.4 | 12.2 |  | 98.4 | 13.1 | 3.7 | -0.2 |
| 130 | Collège privé de l'Alma (0752912H) | 16.2 | A | 18.5 | 19.7 | 10.5 |  | 99 | 14.6 | 0 | 0 |
| 130 | Collège Sainte-Thérèse (0783301P) | 16.2 | A | 18.1 | 19.2 | 11.4 |  | 98.7 | 13.7 | 0.7 | 0 |
| 130 | Collège Jeanne d'Arc (0940879V) | 16.2 | A | 18.9 | 19.1 | 10.7 |  | 99.3 | 13.6 | 1.3 | -0.2 |
| 130 | Collège Torat Emet (0951682M) | 16.2 | A | 17.3 | 15.1 |  | oui | 97.7 | 12.1 |  |  |
| 135 | Collège Pierre Alviset (0751790N) | 16.1 | A | 17.5 | 19.6 | 11.2 |  | 98 | 14.4 | 0 | 0.1 |
| 135 | Collège privé Saint-Louis de Gonzague (0752917N) | 16.1 | A | 19.6 | 20 | 8.6 |  | 100 | 16.6 | 0 | -0.3 |
| 135 | Collège Sainte-Jeanne d'Arc (0910820X) | 16.1 | A | 17.5 | 19.3 | 11.5 |  | 97.9 | 14 | -0.3 | 0.2 |
| 135 | Collège Louis Pasteur (0921780K) | 16.1 | A | 15.7 | 19.5 | 13 |  | 95.6 | 14.2 | -1.3 | 0.7 |
| 135 | Collège Madeleine Daniélou (0921916H) | 16.1 | A | 19.6 | 20 | 8.6 |  | 100 | 16.1 | 0 | -0.3 |
| 140 | Collège Saint-Louis Notre-Dame du Bel Air (0781600R) | 16 | A | 17.6 | 19.3 | 11.1 |  | 98 | 13.9 | -1 | 0.2 |
| 140 | Collège Sacré-Coeur (0783295H) | 16 | A | 19.1 | 19.6 | 9.4 |  | 99.7 | 14.4 | 0.7 | -0.3 |
| 140 | Collège Saint-Pierre (0911746D) | 16 | A | 19.2 | 19 | 9.7 |  | 99.7 | 13.6 | 1 | -0.3 |
| 140 | Collège Jeanne d'Arc (0921908Z) | 16 | A | 19.6 | 19.4 | 9.1 |  | 100 | 14.1 | 1 | -0.4 |
| 140 | Collège de Maille (0940884A) | 16 | A | 17.8 | 18.9 | 11.3 |  | 98.3 | 13.5 | 0.3 | 0.1 |
| 145 | Collège Sainte-Jeanne d'Arc (0920936T) | 15.9 | B | 19.6 | 17.1 | 11.1 |  | 100 | 12.6 | 3 | -0.3 |
| 145 | Collège Hector Berlioz (0941598B) | 15.9 | B | 17 | 19.4 | 11.2 |  | 97.3 | 14.1 | -0.3 | 0.1 |
| 145 | Collège Saint-André (0941710Y) | 15.9 | B | 18.5 | 14.7 | 14.4 |  | 99 | 12 | 5 | 0 |
| 145 | Collège Sainte-Thérèse (0950752B) | 15.9 | B | 16.5 | 15.2 | 16 |  | 96.7 | 12.1 | 2.3 | 0.6 |
| 145 | Collège Notre-Dame de la Compassion (0951506W) | 15.9 | B | 19.2 | 19.2 | 9.4 |  | 99.7 | 13.8 | 1.3 | -0.4 |
| 150 | Collège privé Saint-Louis (0750182R) | 15.8 | B | 15.6 | 17.9 | 14 |  | 95.6 | 12.9 | 0.3 | 0.6 |
| 150 | Collège privé Saint-Jean de Passy (0752870M) | 15.8 | B | 19.6 | 19.9 | 7.8 |  | 100 | 15.1 | 1 | -0.6 |
| 150 | Collège Sainte-Thérèse (0783287Z) | 15.8 | B | 17.5 | 19.4 | 10.5 |  | 98 | 14.1 | -0.7 | 0.1 |
| 150 | Collège Saint-Augustin (0783307W) | 15.8 | B | 19.6 | 18.9 | 8.9 |  | 100 | 13.5 | 1.3 | -0.5 |
| 150 | Collège Saint-Charles (0911745C) | 15.8 | B | 18.1 | 16.9 | 12.4 |  | 98.7 | 12.5 | 2.3 | 0 |
| 150 | Collège Marie-Thérèse (0950823D) | 15.8 | B | 18 | 17.1 | 12.4 |  | 98.6 | 12.6 | 2 | 0 |
| 156 | Collège privé La Salle – Notre-Dame de la Gare (0753982W) | 15.7 | B | 17.8 | 18.5 | 10.8 |  | 98.3 | 13.2 | 1 | -0.1 |
| 156 | Collège Notre-Dame - Les Oiseaux (0781537X) | 15.7 | B | 19.1 | 19.5 | 8.5 |  | 99.7 | 14.2 | 0.7 | -0.4 |
| 158 | Collège international (0783547G) | 15.6 | B | 19.6 | 19.7 | 7.5 |  | 100 | 14.7 | 0.7 | -0.6 |
| 158 | Collège La Salle Saint-Denis (0930959M) | 15.6 | B | 17 | 14.4 | 15.3 |  | 97.3 | 11.9 | 4.7 | 0.2 |
| 160 | Collège Saint-Érembert (0781589D) | 15.5 | B | 19.6 | 19.7 | 7.1 |  | 100 | 14.6 | 0.3 | -0.6 |
| 160 | Collège Notre-Dame de Sion (0911748F) | 15.5 | B | 18.3 | 17.1 | 11 |  | 99 | 12.6 | 2 | -0.2 |
| 160 | Collège Saint-Pierre Saint-Jean (0921015D) | 15.5 | B | 18 | 17.1 | 11.4 |  | 98.6 | 12.6 | 1.3 | -0.1 |
| 160 | Collège Antoine de Saint-Exupéry (0940793B) | 15.5 | B | 17.2 | 18.8 | 10.5 |  | 97.7 | 13.4 | 0.7 | -0.1 |
| 164 | Collège André Malraux (0752387M) | 15.4 | B | 16.8 | 18.4 | 10.9 |  | 97.1 | 13.1 | 1 | -0.1 |
| 164 | Collège privé N'R Hatorah (0755052J) | 15.4 | B | 18.6 | 19.7 | 8 |  | 99.2 | 14.5 | 0 | -0.4 |
| 164 | Collège Dupanloup (0920902F) | 15.4 | B | 19.6 | 19.8 | 6.9 |  | 100 | 15 | 0 | -0.6 |
| 164 | Collège Sainte-Geneviève (0920999L) | 15.4 | B | 19.6 | 19.2 | 7.4 |  | 100 | 13.8 | 1.3 | -0.8 |
| 164 | Collège Sainte-Jeanne d'Arc (0921918K) | 15.4 | B | 18.8 | 18.8 | 8.5 |  | 99.3 | 13.5 | 0.7 | -0.4 |
| 164 | Collège Saint-Stanislas (0950760K) | 15.4 | B | 17 | 18.4 | 10.9 |  | 97.4 | 13.1 | 0 | 0 |
| 170 | Collège Saint-Exupéry (0782087V) | 15.3 | B | 18.9 | 19.1 | 7.8 |  | 99.3 | 13.7 | 0.7 | -0.5 |
| 170 | Collège franco-allemand (0783546F) | 15.3 | B | 19 | 20 | 6.8 |  | 99.7 | 16.1 | 0 | -0.6 |
| 170 | Collège Saint-Joseph (0940806R) | 15.3 | B | 17.5 | 12.9 | 15.6 |  | 98 | 11.6 | 4.3 | 0.3 |
| 173 | Collège privé Sainte-Louise (0754007Y) | 15.2 | B | 18.8 | 18.3 | 8.5 |  | 99.3 | 13.1 | 1 | -0.5 |
| 173 | Collège Saint-Exupéry (0754253R) | 15.2 | B | 16.9 | 17.9 | 10.9 |  | 97.2 | 12.9 | 1.3 | -0.1 |
| 173 | Collège Saint-Martin de France (0951507X) | 15.2 | B | 17.4 | 15.3 | 12.8 |  | 97.9 | 12.1 | 2.3 | 0 |
| 173 | Collège La Salle - Saint-Rosaire (0951509Z) | 15.2 | B | 17.9 | 13.5 | 14.1 |  | 98.4 | 11.7 | 4.3 | 0 |
| 177 | Collège Lavoisier (0752531U) | 15.1 | B | 18.5 | 19.1 | 7.8 |  | 99 | 13.7 | 0.7 | -0.5 |
| 177 | Collège Janson de Sailly (0752548M) | 15.1 | B | 16.7 | 17.1 | 11.6 |  | 97 | 12.6 | 1.7 | -0.1 |
| 177 | Collège Les Blés d'or (0772548B) | 15.1 | B | 14.9 | 17.1 | 13.3 |  | 94.6 | 12.6 | 0 | 0.5 |
| 177 | Collège Sainte-Thérèse (0783342J) | 15.1 | B | 17.4 | 18.7 | 9.3 |  | 97.9 | 13.3 | 0.3 | -0.2 |
| 181 | Collège Alphonse de Lamartine (0752534X) | 15 | B | 17.8 | 18.3 | 8.8 |  | 98.3 | 13.1 | 1.3 | -0.5 |
| 181 | Collège du Sacré-Coeur (0910836P) | 15 | B | 16.6 | 17.2 | 11.3 |  | 96.9 | 12.6 | 0.7 | 0 |
| 181 | Collège Notre-Dame de Bury - Annexe du collège Le Rosaire de Saint-Leu-la-Forêt (0951505V) | 15 | B | 18.5 | 18.8 | 7.7 |  | 99 | 13.4 | 0.7 | -0.6 |
| 184 | Collège Paul Gauguin (0752250N) | 14.9 | B | 17.6 | 17.4 | 9.7 |  | 98 | 12.7 | 1.7 | -0.4 |
| 184 | Collège privé Saint-Vincent-de-Paul (0753985Z) | 14.9 | B | 17.8 | 18.9 | 8.1 |  | 98.3 | 13.5 | 0.3 | -0.4 |
| 184 | Collège Le Bon Sauveur (0781594J) | 14.9 | B | 18.1 | 19.5 | 7.2 |  | 98.7 | 14.3 | 0 | -0.5 |
| 184 | Collège privé Assomption (0930906E) | 14.9 | B | 17.6 | 13.6 | 13.5 |  | 98.1 | 11.7 | 3.7 | 0 |
| 188 | Collège Pierre de Nolhac (0780580G) | 14.8 | B | 17 | 18.9 | 8.4 |  | 97.4 | 13.5 | 0.7 | -0.4 |
| 188 | Collège Marcel Roby (0781204K) | 14.8 | B | 16.5 | 19.2 | 8.7 |  | 96.6 | 13.7 | -1 | -0.2 |
| 188 | Collège Alain Fournier (0910968H) | 14.8 | B | 16.4 | 18.7 | 9.3 |  | 96.5 | 13.4 | 0 | -0.2 |
| 188 | Collège Notre-Dame de France (0921012A) | 14.8 | B | 16.8 | 16.7 | 10.8 |  | 97.1 | 12.5 | 1 | -0.1 |
| 188 | Collège Eugène Carrière (0931382X) | 14.8 | B | 13.5 | 16.8 | 14 |  | 92.9 | 12.5 | -1 | 1 |
| 188 | Collège François Rabelais (0941220R) | 14.8 | B | 14.4 | 18.1 | 11.8 |  | 94 | 13 | -1.3 | 0.4 |
| 194 | Collège Henri IV (0752526N) | 14.7 | B | 18.4 | 19.8 | 5.9 |  | 99 | 14.7 | 0 | -0.9 |
| 194 | Collège Carnot (0752552S) | 14.7 | B | 17.3 | 18.8 | 8.1 |  | 97.7 | 13.5 | 0.3 | -0.4 |
| 194 | Collège Louis Blanc (0941600D) | 14.7 | B | 14.6 | 17.6 | 12 |  | 94.3 | 12.8 | 0 | 0.2 |
| 197 | Collège Alfred Sisley (0770038Y) | 14.6 | B | 13.5 | 17 | 13.4 |  | 93 | 12.6 | -1 | 0.7 |
| 197 | Collège privé Sainte-Céline (0771222K) | 14.6 | B | 17.7 | 15.8 | 10.4 |  | 98.2 | 12.2 | 1.3 | -0.2 |
| 197 | Collège Martin Luther King (0780715D) | 14.6 | B | 17.5 | 19 | 7.2 |  | 98 | 13.6 | 0 | -0.5 |
| 200 | Collège Saint-Spire (0910829G) | 14.5 | B | 17.5 | 16.5 | 9.4 |  | 98 | 12.4 | 1.3 | -0.4 |
| 201 | Collège Pierre Jean de Béranger (0750387N) | 14.4 | B | 17.3 | 18.5 | 7.5 |  | 97.7 | 13.2 | 0.3 | -0.5 |
| 201 | Collège Condorcet (0751791P) | 14.4 | B | 16.6 | 18.6 | 8 |  | 96.9 | 13.3 | 1 | -0.6 |
| 201 | Collège Chaptal (0752529S) | 14.4 | B | 16.3 | 19.1 | 7.9 |  | 96.4 | 13.7 | -1.3 | -0.2 |
| 201 | Collège Guy Gasnier - Sainte-Bathilde (0771926A) | 14.4 | B | 16.2 | 17.5 | 9.5 |  | 96.3 | 12.7 | -0.7 | -0.1 |
| 205 | Collège Montaigne (0752527P) | 14.3 | B | 17.8 | 18.4 | 6.8 |  | 98.3 | 13.1 | 0.7 | -0.8 |
| 205 | Collège Jean-Baptiste Say (0752549N) | 14.3 | B | 14.7 | 19.1 | 9.1 |  | 94.4 | 13.7 | -3 | 0.1 |
| 205 | Collège François Mitterrand (0932333F) | 14.3 | B | 16.2 | 10.9 | 15.8 |  | 96.3 | 11.2 | 8 | 0.2 |
| 208 | Collège Rognoni – École des enfants du spectacle (0750407K) | 14.2 | B | 18 | 19.7 | 5 |  | 98.6 | 14.4 | -0.7 | -1.3 |
| 208 | Collège Jacques Prévert (0752187V) | 14.2 | B | 16.5 | 15.4 | 10.6 |  | 96.6 | 12.1 | 2.7 | -0.3 |
| 208 | Collège privé Thérèse Chappuis (0753854G) | 14.2 | B | 19.6 | 8.7 |  | oui | 100 | 10.8 |  |  |
| 208 | Collège Françoise Seligmann (0755778Y) | 14.2 | B | 10.9 | 13.4 | 18.4 |  | 90 | 11.7 | 4.3 | 1.3 |
| 212 | Collège Gabriel Fauré (0752540D) | 14.1 | B | 14.1 | 14.8 | 13.3 |  | 93.7 | 12 | 2 | 0.1 |
| 212 | Collège Albert Camus (0921779J) | 14.1 | B | 14.4 | 18.2 | 9.8 |  | 94 | 13 | -1.7 | 0.1 |
| 214 | Collège François Couperin (0752693V) | 14 | B | 15 | 18 | 8.9 |  | 94.8 | 12.9 | -1.3 | -0.1 |
| 214 | Collège international (0770928R) | 14 | B | 15.9 | 18 | 8.2 |  | 96 | 12.9 | 0 | -0.4 |
| 216 | Collège Charlemagne (0752525M) | 13.9 | B | 16.2 | 17.9 | 7.7 |  | 96.4 | 12.9 | -0.7 | -0.4 |
| 216 | Collège Rudolf Steiner (0911601W) | 13.9 | B | 11.6 | 16.1 |  | oui | 90.9 | 12.3 |  |  |
| 216 | Collège Saint-Louis Sainte-Clotilde (0930969Y) | 13.9 | B | 14.6 | 15.8 | 11.3 |  | 94.3 | 12.2 | -1 | 0.2 |
| 216 | Collège privé Chne Ohr (0932043R) | 13.9 | B | 16.7 | 11.1 |  | oui | 97 | 11.2 |  |  |
| 216 | Collège Camille Pissarro (0941093C) | 13.9 | B | 15.6 | 17.9 | 8.2 |  | 95.5 | 12.9 | -1 | -0.2 |
| 221 | Collège Jacqueline de Romilly (0772713F) | 13.8 | B | 14 | 17.4 | 9.9 |  | 93.5 | 12.7 | -2 | 0.1 |
| 221 | Collège François Furet (0921507N) | 13.8 | B | 15.9 | 18.8 | 6.7 |  | 95.9 | 13.5 | -1.3 | -0.4 |
| 221 | Collège Émile Verhaeren (0921591E) | 13.8 | B | 15.8 | 19.1 | 6.4 |  | 95.8 | 13.7 | -2.3 | -0.4 |
| 221 | Collège le Parc (0940552P) | 13.8 | B | 15.7 | 19 | 6.8 |  | 95.7 | 13.6 | -2.3 | -0.3 |
| 225 | Collège Ovide Decroly (0940024R) | 13.7 | B | 12.4 | 14.9 |  | oui | 91.7 | 12 |  |  |
| 226 | Collège Montgolfier (0752523K) | 13.6 | B | 11.6 | 15.5 | 13.6 |  | 90.9 | 12.2 | 0.3 | 0.5 |
| 226 | Collège privé Heikhal Menahem Sinaï (0755029J) | 13.6 | B | 19.6 | 7.5 |  | oui | 100 | 10.6 |  |  |
| 226 | Collège Denecourt (0770002J) | 13.6 | B | 14 | 18.5 | 8.4 |  | 93.6 | 13.2 | -2.7 | 0 |
| 226 | Collège Hoche (0781106D) | 13.6 | B | 15.9 | 19.3 | 5.5 |  | 96 | 13.9 | -1.7 | -0.6 |
| 226 | Collège Jeanne d'Arc (0911015J) | 13.6 | B | 17.7 | 15.9 | 7.3 |  | 98.2 | 12.2 | 1.3 | -0.9 |
| 226 | Collège Jacques Offenbach (0940790Y) | 13.6 | B | 12.3 | 18.7 | 9.9 |  | 91.6 | 13.3 | -4 | 0.4 |
| 232 | Collège Claude Monet (0752539C) | 13.5 | B | 14.4 | 18.3 | 7.7 |  | 94 | 13.1 | -1.7 | -0.2 |
| 232 | Collège Michel Vignaud (0910028L) | 13.5 | B | 15.9 | 16.3 | 8.2 |  | 96 | 12.4 | 0.3 | -0.4 |
| 232 | Collège La Source (0921909A) | 13.5 | B | 17.3 | 18.7 | 4.6 |  | 97.7 | 13.4 | -1.3 | -1.2 |
| 235 | Collège privé Sainte-Geneviève (0752925X) | 13.4 | B | 16.8 | 18.3 | 5.1 |  | 97.1 | 13.1 | -1.3 | -0.8 |
| 235 | Collège Jules Verne (0771176K) | 13.4 | B | 14.5 | 7.6 | 18.2 |  | 94.2 | 10.6 | 9 | 0.6 |
| 235 | Collège Maison Blanche (0920068Z) | 13.4 | B | 14.7 | 18 | 7.4 |  | 94.4 | 12.9 | -2 | -0.2 |
| 235 | Collège Jean-Baptiste Corot (0930629D) | 13.4 | B | 13.2 | 17.4 | 9.5 |  | 92.6 | 12.7 | -3.3 | 0.2 |
| 235 | Collège Sainte-Marie (0930963S) | 13.4 | B | 8.8 | 18 |  | oui | 87.7 | 12.9 |  |  |
| 235 | Collège Jules Ferry (0940012C) | 13.4 | B | 14.9 | 17.7 | 7.7 |  | 94.7 | 12.8 | -1.3 | -0.3 |
| 235 | Collège Paul Valéry (0940090M) | 13.4 | B | 12.4 | 15.1 | 12.6 |  | 91.7 | 12 | -0.3 | 0.4 |
| 242 | Collège Yvonne le Tac (0752108J) | 13.3 | B | 13.6 | 17.9 | 8.3 |  | 93 | 12.9 | -2 | -0.1 |
| 242 | Collège du Cèdre (0781105C) | 13.3 | B | 15.5 | 18.6 | 5.8 |  | 95.3 | 13.3 | -2 | -0.5 |
| 242 | Collège privé Saint-Benoist de l'Europe (0931022F) | 13.3 | B | 13.4 | 10.6 | 15.8 |  | 92.9 | 11.1 | 3 | 0.5 |
| 245 | Collège Alain Fournier (0750607C) | 13.2 | B | 14.5 | 13.3 | 11.8 |  | 94.2 | 11.7 | 3.3 | -0.2 |
| 245 | Collège Les Trois Moulins (0781846H) | 13.2 | B | 16.3 | 17.7 | 5.5 |  | 96.5 | 12.8 | -0.7 | -0.9 |
| 245 | Collège privé Bernard Palissy (0940892J) | 13.2 | B | 15.7 | 10.6 |  | oui | 95.6 | 11.1 |  |  |
| 245 | Collège Paul Bert (0941100K) | 13.2 | B | 11.5 | 18.2 | 9.8 |  | 90.7 | 13 | -5.5 | 0.6 |
| 249 | Collège Victor Duruy (0752528R) | 13.1 | B | 15.9 | 18.1 | 5.4 |  | 96 | 13 | -1.3 | -0.7 |
| 249 | Collège Camille Sée (0752546K) | 13.1 | B | 12.8 | 18.5 | 8 |  | 92.3 | 13.2 | -3.7 | 0 |
| 249 | Collège Hélène Boucher (0781570H) | 13.1 | B | 14.6 | 19.1 | 5.6 |  | 94.2 | 13.6 | -4 | -0.3 |
| 249 | Collège La Fontaine du Roy (0920886N) | 13.1 | B | 15.4 | 17.4 | 6.5 |  | 95.3 | 12.7 | -2 | -0.4 |
| 249 | Collège Nicolas de Staël (0941596Z) | 13.1 | B | 13 | 16.2 | 10 |  | 92.4 | 12.3 | -1.7 | 0.1 |
| 254 | Collège Les Bruyères (0922523T) | 13 | B | 13.9 | 18.5 | 6.7 |  | 93.5 | 13.3 | -3 | -0.2 |
| 254 | Institut Paul Ricoeur (0952145R) | 13 | B | 16.8 | 11.6 | 10.6 |  | 97 | 11.3 | 3.3 | -0.4 |
| 256 | Collège Jacques Decour (0752532V) | 12.9 | B | 14.4 | 17 | 7.3 |  | 94.1 | 12.6 | -1.3 | -0.3 |
| 256 | Collège Fénelon (0930921W) | 12.9 | B | 16 | 10.7 | 12.1 |  | 96 | 11.2 | 2.3 | -0.1 |
| 256 | Collège Georges Brassens (0941782B) | 12.9 | B | 13.9 | 12.2 | 12.5 |  | 93.4 | 11.5 | 1.3 | 0.1 |
| 259 | Collège Victor Hugo (0752524L) | 12.8 | B | 15.3 | 16.7 | 6.3 |  | 95.1 | 12.5 | -1 | -0.6 |
| 259 | Collège Le Prieuré (0780112Y) | 12.8 | B | 13.3 | 18.3 | 6.7 |  | 92.7 | 13.1 | -3.7 | -0.2 |
| 259 | Collège Jean-Baptiste de la Quintinye (0780179W) | 12.8 | B | 12.3 | 17.8 | 8.2 |  | 91.7 | 12.9 | -4.7 | 0.2 |
| 259 | Collège Louis Pasteur (0910009R) | 12.8 | B | 12.7 | 16.2 | 9.6 |  | 92.1 | 12.3 | -2.7 | 0.2 |
| 259 | Collège Jules Verne (0921590D) | 12.8 | B | 14.6 | 18.7 | 5.1 |  | 94.3 | 13.3 | -3.3 | -0.5 |
| 259 | Collège Saint-Vincent-de-Paul (0932586F) | 12.8 | B | 14.9 | 5.9 | 17.6 |  | 94.7 | 10.2 | 9.7 | 0.5 |
| 265 | Collège Octave Gréard (0752530T) | 12.7 | B | 15.2 | 18.6 | 4.4 |  | 95 | 13.3 | -2.3 | -0.8 |
| 265 | Collège Pierre de Coubertin (0780418F) | 12.7 | B | 16.4 | 16 | 5.6 |  | 96.5 | 12.3 | -0.3 | -1 |
| 265 | Collège Notre-Dame (0781590E) | 12.7 | B | 14.6 | 17.7 | 5.9 |  | 94.3 | 12.8 | -3 | -0.4 |
| 268 | Collège Pablo Picasso (0780578E) | 12.6 | B | 13 | 16.1 | 8.6 |  | 92.4 | 12.3 | -2 | -0.1 |
| 268 | Collège Jean Monnet (0781863B) | 12.6 | B | 15.8 | 18 | 3.9 |  | 95.7 | 13 | -2.7 | -0.9 |
| 268 | Collège Les Vallées (0921162N) | 12.6 | B | 10.3 | 16.2 | 11.2 |  | 89.4 | 12.3 | -3 | 0.5 |
| 271 | Collège Beaumarchais (0750362L) | 12.5 | B | 12.3 | 17.6 | 7.6 |  | 91.6 | 12.8 | -3.3 | -0.1 |
| 271 | Collège Louise Michel (0752251P) | 12.5 | B | 13.6 | 14.7 | 9.2 |  | 93 | 11.9 | 0 | -0.2 |
| 271 | Collège Saint-Louis (0783300N) | 12.5 | B | 16.5 | 12.2 | 8.7 |  | 96.7 | 11.5 | 1 | -0.4 |
| 271 | Collège Lakanal (0921784P) | 12.5 | B | 13.8 | 19 | 4.6 |  | 93.4 | 13.6 | -4.3 | -0.4 |
| 275 | Collège Pierre de Ronsard (0752107H) | 12.4 | B | 10.4 | 17.4 | 9.3 |  | 89.6 | 12.7 | -5 | 0.4 |
| 275 | Collège privé Catherine Labouré (0755840R) | 12.4 | B | 13.5 | 8.7 | 15 |  | 93 | 10.8 | 1 | 0.7 |
| 275 | Collège de la Dhuis (0772499Y) | 12.4 | B | 13.7 | 12.2 | 11.3 |  | 93.2 | 11.5 | 0.3 | 0.1 |
| 275 | Collège Jean Macé (0920884L) | 12.4 | B | 12 | 17 | 8.3 |  | 91.3 | 12.6 | -3.7 | 0.1 |
| 279 | Collège Jean de La Fontaine (0752550P) | 12.3 | B | 13.3 | 18.3 | 5.4 |  | 92.7 | 13.1 | -3.3 | -0.4 |
| 279 | Collège Charles Péguy (0783252L) | 12.3 | B | 12.8 | 15.6 | 8.5 |  | 92.2 | 12.2 | -3 | 0 |
| 279 | Collège Marie Curie (0921785R) | 12.3 | B | 13.5 | 19.2 | 4.2 |  | 92.9 | 13.8 | -4.7 | -0.5 |
| 279 | Collège Suger (0921919L) | 12.3 | B | 15.5 | 9 |  | oui | 95.4 | 10.9 |  |  |
| 279 | Collège Plaisance (0940100Y) | 12.3 | B | 11.3 | 12.3 | 13.3 |  | 90.6 | 11.5 | -0.3 | 0.5 |
| 284 | Collège la Maillière (0771992X) | 12.2 | B | 9.3 | 12 | 15.3 |  | 88.3 | 11.4 | 1 | 0.8 |
| 284 | Collège Stéphane Hessel (0772714G) | 12.2 | B | 12.4 | 15.1 | 9.2 |  | 91.8 | 12 | -3 | 0.1 |
| 284 | Collège Alexandre Fleming (0911143Y) | 12.2 | B | 13.5 | 18.9 | 4.2 |  | 92.9 | 13.5 | -4 | -0.5 |
| 284 | Collège privé Notre-Dame des Vertus (0930903B) | 12.2 | B | 12.3 | 8.2 | 16.2 |  | 91.6 | 10.7 | 4 | 0.4 |
| 284 | Collège du Parc (0940748C) | 12.2 | B | 11.8 | 16.7 | 8.1 |  | 91.1 | 12.5 | -4.7 | 0.1 |
| 289 | Collège Georges Courteline (0750444A) | 12.1 | B | 12.6 | 15.7 | 8 |  | 92 | 12.2 | -1.7 | -0.2 |
| 289 | Collège Sainte-Marie - La Roche aux Coqs (0771218F) | 12.1 | B | 14.5 | 14.2 | 7.5 |  | 94.1 | 11.9 | -1 | -0.4 |
| 289 | Collège institution Sainte-Foy (0771233X) | 12.1 | B | 14.1 | 10.6 | 11.5 |  | 93.7 | 11.1 | 1.3 | 0 |
| 289 | Collège Léon Blum (0780260J) | 12.1 | B | 13.8 | 14.2 | 8.4 |  | 93.4 | 11.8 | -1 | -0.2 |
| 289 | Collège Saint-Simon (0781632A) | 12.1 | B | 15.7 | 15.4 | 5.1 |  | 95.6 | 12.1 | -1.3 | -0.8 |
| 289 | Collège Institution Saint Vincent de Paul (0911750H) | 12.1 | B | 15.7 | 14.9 | 5.8 |  | 95.7 | 12 | -1.3 | -0.6 |
| 289 | Collège de la Paix (0922247T) | 12.1 | B | 14.8 | 17.2 | 4.4 |  | 94.6 | 12.6 | -2 | -0.9 |
| 289 | Collège Édouard Branly (0941599C) | 12.1 | B | 12.7 | 16.4 | 7.2 |  | 92.1 | 12.4 | -3.3 | -0.1 |
| 289 | Collège Saint-Didier (0950796Z) | 12.1 | B | 14.3 | 9.4 | 12.6 |  | 93.9 | 10.9 | 1.7 | 0.1 |
| 298 | Collège Raymond Queneau (0752186U) | 12 | B | 14.4 | 17.2 | 4.4 |  | 94 | 12.6 | -2.3 | -0.8 |
| 298 | Collège Pierre Sémard (0931200Z) | 12 | B | 7.7 | 8.6 | 19.6 |  | 86.5 | 10.8 | 8.3 | 1.8 |
| 300 | Collège Jules Ferry (0752533W) | 11.9 | C | 11.7 | 15.7 | 8.3 |  | 91 | 12.2 | -2 | -0.1 |
| 300 | Collège Les Amandiers (0780033M) | 11.9 | C | 14 | 17.9 | 3.8 |  | 93.5 | 12.9 | -3 | -0.9 |
| 300 | Collège Paul Bert (0780575B) | 11.9 | C | 14.9 | 16 | 4.7 |  | 94.6 | 12.3 | -1.3 | -1 |
| 300 | Collège Les Goussons (0911354C) | 11.9 | C | 13.5 | 17.6 | 4.7 |  | 92.9 | 12.8 | -3.3 | -0.5 |
| 300 | Collège Jean Mermoz (0922629H) | 11.9 | C | 10.5 | 16.8 | 8.5 |  | 89.7 | 12.5 | -5 | 0.2 |
| 300 | Collège Henri Cahn (0941014S) | 11.9 | C | 11.9 | 15.4 | 8.3 |  | 91.2 | 12.1 | -2 | -0.1 |
| 300 | Collège Edmond Nocard (0941597A) | 11.9 | C | 10.1 | 15.1 | 10.5 |  | 89.2 | 12.1 | -3.7 | 0.5 |
| 307 | Collège Pierre et Marie Curie (0780263M) | 11.8 | C | 14.8 | 14.9 | 5.6 |  | 94.5 | 12 | -0.7 | -0.8 |
| 307 | Collège Jean François Champollion (0781789W) | 11.8 | C | 9.9 | 17.6 | 7.9 |  | 89 | 12.8 | -6.3 | 0.2 |
| 307 | Collège Juliette Adam (0910024G) | 11.8 | C | 13.5 | 17.8 | 4 |  | 92.9 | 12.8 | -3.3 | -0.7 |
| 307 | Collège Henri Dunant (0920852B) | 11.8 | C | 14.7 | 6.1 | 14.5 |  | 94.4 | 10.3 | 9 | -0.1 |
| 307 | Collège Bel Air (0921554P) | 11.8 | C | 13.9 | 16.5 | 4.9 |  | 93.4 | 12.4 | -2.7 | -0.6 |
| 312 | Collège Sainte-Croix (0771216D) | 11.7 | C | 12.5 | 15.4 | 7.2 |  | 91.9 | 12.1 | -3 | -0.2 |
| 312 | Collège Jules Verne (0911335G) | 11.7 | C | 10.9 | 16.8 | 7.3 |  | 90 | 12.5 | -4.3 | 0 |
| 312 | Collège Saint-Exupéry (0921240Y) | 11.7 | C | 11.2 | 16.5 | 7.3 |  | 90.5 | 12.4 | -4.3 | 0 |
| 312 | Collège Michelet (0921783N) | 11.7 | C | 14.7 | 16 | 4.3 |  | 94.3 | 12.3 | -1.7 | -1.2 |
| 312 | Collège François Truffaut (0922565N) | 11.7 | C | 13 | 17.3 | 4.8 |  | 92.3 | 12.7 | -3.7 | -0.5 |
| 312 | Collège Marcelin Berthelot (0931210K) | 11.7 | C | 7.7 | 16.2 | 11.2 |  | 86.5 | 12.3 | -4 | 0.7 |
| 312 | Collège ORT (0951916S) | 11.7 | C | 10.4 | 12.8 | 11.9 |  | 89.5 | 11.6 | -3 | 0.7 |
| 319 | Collège Jules Romains (0752249M) | 11.6 | C | 14.5 | 14.8 | 5.6 |  | 94.2 | 12 | -1 | -0.8 |
| 319 | Collège Anceau de Garlande (0771657H) | 11.6 | C | 10.4 | 8.1 | 16.2 |  | 89.5 | 10.7 | 2.7 | 0.6 |
| 319 | Collège George Sand (0772248A) | 11.6 | C | 13 | 10.6 | 11.3 |  | 92.3 | 11.1 | 0.3 | 0.1 |
| 322 | Collège Anne Frank (0750608D) | 11.5 | C | 11.1 | 15.2 | 8.3 |  | 90.4 | 12.1 | -2.3 | -0.1 |
| 322 | Collège Édouard Pailleron (0751707Y) | 11.5 | C | 6.8 | 16.1 | 11.7 |  | 85.4 | 12.3 | -4.3 | 1.1 |
| 322 | Collège Honoré de Balzac (0752553T) | 11.5 | C | 12.6 | 14.6 | 7.3 |  | 92 | 11.9 | -1.3 | -0.3 |
| 322 | Collège Pilâtre de Rozier (0754528P) | 11.5 | C | 10.9 | 14.6 | 9 |  | 90.1 | 11.9 | -1.7 | 0 |
| 322 | Collège La Fontaine (0921170X) | 11.5 | C | 11.1 | 17.9 | 5.4 |  | 90.4 | 12.9 | -5.3 | -0.2 |
| 327 | Collège Buffon (0752545J) | 11.4 | C | 12 | 18.1 | 4 |  | 91.3 | 13 | -5 | -0.5 |
| 327 | Collège Vasco de Gama (0772574E) | 11.4 | C | 10.7 | 13.9 | 9.7 |  | 89.8 | 11.8 | -3.7 | 0.3 |
| 327 | Collège Landowski (0921236U) | 11.4 | C | 12.4 | 16.5 | 5.3 |  | 91.7 | 12.4 | -5 | -0.2 |
| 330 | Collège Jean Moulin (0750611G) | 11.3 | C | 13.5 | 15.3 | 5.2 |  | 93 | 12.1 | -1.7 | -0.7 |
| 330 | Collège Erik Satie (0772573D) | 11.3 | C | 12.8 | 7.2 | 13.9 |  | 92.2 | 10.5 | 4.3 | 0 |
| 330 | Collège Colonel Arnaud Beltrame (0772867Y) | 11.3 | C | 12.2 | 14.9 | 6.8 |  | 91.5 | 12 | -3 | -0.2 |
| 330 | Collège Antoine de Saint-Exupéry (0941017V) | 11.3 | C | 13.2 | 12.4 | 8.3 |  | 92.6 | 11.5 | -0.3 | -0.3 |
| 330 | Collège Cécile Sorel (0951991Y) | 11.3 | C | 14.6 | 12.3 | 7 |  | 94.2 | 11.5 | -1 | -0.4 |
| 335 | Collège Rodin (0752538B) | 11.2 | C | 13 | 15 | 5.7 |  | 92.4 | 12 | -1.7 | -0.6 |
| 335 | Collège Claude Monet (0772588V) | 11.2 | C | 11.6 | 14.7 | 7.2 |  | 90.9 | 11.9 | -3 | -0.2 |
| 335 | Collège Simone Veil (0942187S) | 11.2 | C | 12.9 | 12.5 | 8.2 |  | 92.3 | 11.5 | -1.7 | -0.2 |
| 338 | Collège Lucie Aubrac (0772819W) | 11.1 | C | 11.2 | 11.2 | 11 |  | 90.4 | 11.3 | -0.3 | 0.1 |
| 338 | Collège Marcel Pagnol (0921501G) | 11.1 | C | 7.8 | 17.2 | 8.3 |  | 86.7 | 12.6 | -8 | 0.4 |
| 338 | Collège Théophile Gautier (0921781L) | 11.1 | C | 11.4 | 15.6 | 6.2 |  | 90.7 | 12.2 | -5 | -0.1 |
| 338 | Collège Françoise Giroud (0942188T) | 11.1 | C | 10.5 | 17 | 5.9 |  | 89.7 | 12.6 | -5.7 | -0.1 |
| 342 | Collège Guillaume Budé (0752695X) | 11 | C | 9.6 | 5.6 | 17.7 |  | 88.6 | 10.2 | 6.3 | 0.6 |
| 342 | Collège Alain Fournier (0920653K) | 11 | C | 11.4 | 17.5 | 4.1 |  | 90.7 | 12.7 | -5.7 | -0.4 |
| 342 | Collège Jules Ferry (0941234F) | 11 | C | 6.7 | 12.9 | 13.5 |  | 85.3 | 11.6 | -2 | 1.2 |
| 342 | Collège Molière (0941348E) | 11 | C | 11 | 12.3 | 9.8 |  | 90.2 | 11.5 | -2.3 | 0.2 |
| 342 | Collège privé du Sacré-Coeur (0941709X) | 11 | C | 10 | 13.8 | 9.3 |  | 89.2 | 11.8 | -4 | 0.3 |
| 347 | Collège Jean Moulin (0771419Z) | 10.9 | C | 11.7 | 7.3 | 13.8 |  | 90.9 | 10.5 | 2.7 | 0.1 |
| 348 | Collège César Franck (0752248L) | 10.8 | C | 11.4 | 15.5 | 5.4 |  | 90.6 | 12.1 | -4 | -0.3 |
| 349 | Collège Charles Péguy (0751706X) | 10.7 | C | 11.4 | 10.5 | 10.1 |  | 90.7 | 11.1 | 1.7 | -0.3 |
| 349 | Collège Robert Doisneau (0920855E) | 10.7 | C | 12.9 | 13.3 | 6 |  | 92.3 | 11.7 | -2 | -0.5 |
| 349 | Collège Les Coutures (0951279Z) | 10.7 | C | 13.8 | 12.2 | 6.1 |  | 93.4 | 11.5 | -1.3 | -0.6 |
| 349 | Collège Georges Duhamel (0951696C) | 10.7 | C | 9.1 | 15.1 | 7.9 |  | 88 | 12 | -5.3 | 0.2 |
| 353 | Collège La Grange du Bois (0772274D) | 10.6 | C | 10.3 | 9 | 12.4 |  | 89.4 | 10.9 | 0.3 | 0.2 |
| 353 | Collège de la Pyramide (0772429X) | 10.6 | C | 11.1 | 9.3 | 11.5 |  | 90.3 | 10.9 | 0 | 0.1 |
| 353 | Collège Mercier Saint-Paul (0783340G) | 10.6 | C | 14 | 9.4 | 8.3 |  | 93.6 | 10.9 | 0.3 | -0.4 |
| 353 | Collège Alfred de Vigny (0921550K) | 10.6 | C | 9 | 12.9 | 9.8 |  | 88 | 11.6 | -3 | 0.2 |
| 353 | Collège Yves du Manoir (0922143E) | 10.6 | C | 13.9 | 15.5 | 2.3 |  | 93.4 | 12.2 | -4.5 | -1.2 |
| 353 | Collège Le Luat (0951817J) | 10.6 | C | 15.4 | 8.1 | 8.3 |  | 95.2 | 10.7 | 1.7 | -0.6 |
| 359 | Collège Évariste Galois (0753937X) | 10.5 | C | 11.9 | 5.7 | 14 |  | 91.2 | 10.2 | 5.3 | 0 |
| 359 | Collège du Montois (0770020D) | 10.5 | C | 10.8 | 10.8 | 9.8 |  | 90 | 11.2 | -1.7 | 0.1 |
| 359 | Collège les 4 Arpents (0771768D) | 10.5 | C | 9.4 | 8.2 | 13.8 |  | 88.4 | 10.7 | 1.3 | 0.3 |
| 359 | Collège La Boétie (0772191N) | 10.5 | C | 5.9 | 13.8 | 11.8 |  | 84.4 | 11.8 | -4.3 | 1.1 |
| 359 | Collège Jean Racine (0780184B) | 10.5 | C | 10.1 | 19 | 2.5 |  | 89.3 | 13.6 | -8 | -0.5 |
| 359 | Collège André Derain (0781683F) | 10.5 | C | 11.5 | 14.7 | 5.4 |  | 90.7 | 11.9 | -4 | -0.3 |
| 359 | Collège Georges Pompidou (0781864C) | 10.5 | C | 12.4 | 15.1 | 4 |  | 91.8 | 12 | -4.7 | -0.5 |
| 359 | Collège Sainte-Marie (0930920V) | 10.5 | C | 8.5 | 9.1 | 14 |  | 87.4 | 10.9 | -0.3 | 0.7 |
| 359 | Collège Jacqueline de Romilly (0932580Z) | 10.5 | C | 9.9 | 3.2 | 18.4 |  | 89.1 | 9.6 | 11.3 | 0.7 |
| 359 | Collège Pierre de Ronsard (0940569H) | 10.5 | C | 11.1 | 15 | 5.4 |  | 90.4 | 12 | -4 | -0.3 |
| 369 | Collège le Moulin à Vent (0771472G) | 10.4 | C | 9.6 | 10.1 | 11.5 |  | 88.6 | 11.1 | -0.3 | 0.2 |
| 369 | Collège Jean-Philippe Rameau (0781107E) | 10.4 | C | 11.6 | 16.4 | 3.3 |  | 90.9 | 12.4 | -4.7 | -0.7 |
| 369 | Collège Georges Mandel (0922610M) | 10.4 | C | 12.4 | 15.7 | 3.1 |  | 91.7 | 12.2 | -4.3 | -0.8 |
| 369 | Collège Jules Ferry (0940792A) | 10.4 | C | 5.2 | 6.1 | 19.8 |  | 83.4 | 10.3 | 10.7 | 1.8 |
| 373 | Collège Jean Baptiste Poquelin (0751703U) | 10.3 | C | 12.6 | 12.8 | 5.4 |  | 92 | 11.6 | -2 | -0.6 |
| 373 | Collège Jean-François Oeben (0752542F) | 10.3 | C | 11.5 | 12.1 | 7.4 |  | 90.7 | 11.4 | -0.3 | -0.5 |
| 373 | Collège Lelorgne de Savigny (0771515D) | 10.3 | C | 6.4 | 11.1 | 13.4 |  | 84.9 | 11.2 | -1.7 | 1 |
| 376 | Collège Jean Jaurès (0931143M) | 10.2 | C | 5.8 | 7.1 | 17.7 |  | 84.2 | 10.5 | 3.3 | 1 |
| 376 | Collège les Closeaux (0940072T) | 10.2 | C | 8.8 | 14.5 | 7.2 |  | 87.7 | 11.9 | -5 | 0 |
| 378 | Collège la Mare aux Champs (0771178M) | 10.1 | C | 7 | 13 | 10.3 |  | 85.7 | 11.6 | -4.3 | 0.5 |
| 379 | Collège privé Saint-Sulpice (0752924W) | 10 | C | 14.8 | 8.6 | 6.6 |  | 94.6 | 10.8 | 0 | -0.7 |
| 379 | Collège Pasteur (0780504Z) | 10 | C | 10.9 | 16.7 | 2.5 |  | 90 | 12.5 | -6.3 | -0.7 |
| 379 | Collège Jean Cocteau (0783156G) | 10 | C | 12.3 | 14.6 | 3.1 |  | 91.7 | 11.9 | -3.7 | -1 |
| 379 | Collège Émile Zola (0910969J) | 10 | C | 8.5 | 15.8 | 5.7 |  | 87.5 | 12.2 | -6.7 | -0.1 |
| 379 | Collège Lakanal (0920626F) | 10 | C | 10.9 | 12.3 | 6.8 |  | 90.1 | 11.5 | -2.3 | -0.3 |
| 379 | Collège privé Saint-Joseph (0930902A) | 10 | C | 6.2 | 12.5 | 11.2 |  | 84.7 | 11.5 | -4.7 | 0.9 |
| 379 | Collège Jules Ferry (0950019E) | 10 | C | 9.6 | 12.8 | 7.6 |  | 88.6 | 11.6 | -3.3 | -0.1 |
| 386 | Collège Paul Bert (0752543G) | 9.9 | C | 11.4 | 15.6 | 2.6 |  | 90.7 | 12.2 | -5.3 | -0.8 |
| 386 | Collège parc des Tourelles (0770014X) | 9.9 | C | 9 | 11.6 | 9 |  | 88 | 11.3 | -3.7 | 0.2 |
| 386 | Collège Pierre Brossolette (0921181J) | 9.9 | C | 7.8 | 15.8 | 6.2 |  | 86.7 | 12.2 | -6.7 | 0 |
| 386 | Collège George Sand (0921354X) | 9.9 | C | 10.3 | 15.1 | 4.2 |  | 89.4 | 12 | -5 | -0.4 |
| 386 | Collège Malmaison (0921502H) | 9.9 | C | 12.4 | 14.7 | 2.6 |  | 91.7 | 11.9 | -4.3 | -1 |
| 386 | Collège Montesquieu (0952086B) | 9.9 | C | 9.1 | 10.9 | 9.6 |  | 88 | 11.2 | -2.3 | 0.1 |
| 392 | Collège Roland Dorgelès (0750429J) | 9.8 | C | 10.1 | 13.4 | 5.9 |  | 89.2 | 11.7 | -3 | -0.4 |
| 392 | Collège Henri Bergson (0752555V) | 9.8 | C | 9.8 | 7.2 | 12.3 |  | 88.9 | 10.5 | 2 | 0 |
| 392 | Collège Thomas Mann (0755000C) | 9.8 | C | 11.8 | 5.7 | 11.9 |  | 91 | 10.2 | 4.3 | -0.3 |
| 392 | Collège Marcel Rivière (0770027L) | 9.8 | C | 12.5 | 9.4 | 7.6 |  | 91.9 | 10.9 | 0 | -0.5 |
| 392 | Collège Sainte-Thérèse (0771236A) | 9.8 | C | 11.7 | 14.5 | 3.2 |  | 91 | 11.9 | -5.7 | -0.6 |
| 392 | Collège Christine de Pisan (0772427V) | 9.8 | C | 12.3 | 10.9 | 6.2 |  | 91.6 | 11.2 | -2.3 | -0.4 |
| 392 | Collège Claude Debussy (0781205L) | 9.8 | C | 11.3 | 14.8 | 3.4 |  | 90.5 | 12 | -4.3 | -0.7 |
| 392 | Collège Beth Rivkah (0912000E) | 9.8 | C | 9.7 | 12.1 | 7.5 |  | 88.8 | 11.4 | -7 | 0.2 |
| 392 | Collège Descartes (0921786S) | 9.8 | C | 10.2 | 14.8 | 4.3 |  | 89.3 | 12 | -5 | -0.4 |
| 392 | Collège Saint-Exupéry (0930883E) | 9.8 | C | 8.7 | 9.6 | 11 |  | 87.7 | 11 | -1 | 0.2 |
| 392 | Collège Albert Camus (0941233E) | 9.8 | C | 7.4 | 9.5 | 12.5 |  | 86.2 | 10.9 | -1.3 | 0.5 |
| 403 | Collège Moulin des Prés (0750525N) | 9.7 | C | 9.9 | 14.8 | 4.5 |  | 89 | 12 | -3.7 | -0.5 |
| 403 | Collège les Aulnes (0771475K) | 9.7 | C | 8.7 | 9.1 | 11.4 |  | 87.6 | 10.9 | -1.3 | 0.3 |
| 403 | Collège Van Gogh (0772119K) | 9.7 | C | 6.7 | 10.8 | 11.6 |  | 85.3 | 11.2 | -3.7 | 0.8 |
| 403 | Collège Pablo Picasso (0772330P) | 9.7 | C | 7 | 12.6 | 9.4 |  | 85.7 | 11.5 | -5 | 0.4 |
| 403 | Collège Paul Bert (0921241Z) | 9.7 | C | 13.1 | 10.4 | 5.6 |  | 92.5 | 11.1 | -0.3 | -1 |
| 403 | Collège Marie Curie (0931439J) | 9.7 | C | 6 | 9.5 | 13.7 |  | 84.5 | 11 | -0.5 | 0.7 |
| 403 | Collège Christine de Pisan (0932310F) | 9.7 | C | 8.9 | 2.5 | 17.8 |  | 87.9 | 9.3 | 10 | 0.5 |
| 403 | Collège privé Protectorat Saint-Joseph (0932652C) | 9.7 | C | 11.5 | 10.3 | 7.2 |  | 90.7 | 11.1 | -2.3 | -0.2 |
| 403 | Collège du Centre - Aimé Césaire (0941038T) | 9.7 | C | 8.2 | 9.6 | 11.3 |  | 87.1 | 11 | -1 | 0.2 |
| 403 | Collège Jean Moulin (0941410X) | 9.7 | C | 9 | 9 | 11.2 |  | 87.9 | 10.9 | -1 | 0.2 |
| 413 | Collège George Sand (0752316K) | 9.6 | C | 9.4 | 10 | 9.5 |  | 88.4 | 11 | -0.7 | -0.1 |
| 413 | Collège Charles Péguy (0910045E) | 9.6 | C | 9 | 18.2 | 1.6 |  | 87.9 | 13.1 | -8.3 | -0.8 |
| 413 | Collège Maréchal Leclerc (0921233R) | 9.6 | C | 9.1 | 14.3 | 5.4 |  | 88.1 | 11.9 | -5.3 | -0.2 |
| 413 | Collège Évariste Galois (0921242A) | 9.6 | C | 9.7 | 15.5 | 3.5 |  | 88.8 | 12.1 | -5 | -0.6 |
| 413 | Collège Irène et Frédéric Joliot Curie (0931217T) | 9.6 | C | 6.3 | 6.3 | 16.2 |  | 84.9 | 10.3 | 3.7 | 0.4 |
| 413 | Collège Gustave Courbet (0931381W) | 9.6 | C | 10.6 | 4.7 | 13.5 |  | 89.8 | 10 | 6.7 | -0.2 |
| 413 | Collège Antoine Laurent de Lavoisier (0931713G) | 9.6 | C | 8.5 | 4.4 | 15.9 |  | 87.4 | 9.9 | 6.5 | 0.2 |
| 413 | Collège Louis Augustin Bosc (0951992Z) | 9.6 | C | 11.3 | 10.7 | 6.7 |  | 90.5 | 11.2 | -1.7 | -0.4 |
| 421 | Collège de la Vallée (0771422C) | 9.5 | C | 10.8 | 5.5 | 12.2 |  | 90 | 10.2 | 4.7 | -0.3 |
| 421 | Collège les Tilleuls (0771911J) | 9.5 | C | 10.6 | 11.6 | 6.2 |  | 89.8 | 11.3 | -3.3 | -0.3 |
| 421 | Collège Alberto Giacometti (0781954A) | 9.5 | C | 12.4 | 10.7 | 5.3 |  | 91.7 | 11.2 | -0.7 | -1 |
| 421 | Collège Albert Camus (0910714G) | 9.5 | C | 12.4 | 1.9 | 14.3 |  | 91.7 | 9 | 12.7 | -0.1 |
| 421 | Collège Albert Camus (0930586G) | 9.5 | C | 8.1 | 5 | 15.4 |  | 87 | 10.1 | 3 | 0.4 |
| 421 | Collège Denis Diderot (0950682A) | 9.5 | C | 10.6 | 10.8 | 7.1 |  | 89.8 | 11.2 | -1.3 | -0.4 |
| 421 | Collège Marcel Pagnol (0951051B) | 9.5 | C | 13.5 | 10 | 5 |  | 93 | 11 | -1.3 | -0.9 |
| 428 | Collège Camille Claudel (0932263E) | 9.4 | C | 5.3 | 4.9 | 18.1 |  | 83.6 | 10 | 4.7 | 0.9 |
| 428 | Collège Henri Matisse (0941231C) | 9.4 | C | 5.1 | 7.3 | 15.9 |  | 83.3 | 10.5 | 1.3 | 0.9 |
| 428 | Collège Jacques Monod (0950933Y) | 9.4 | C | 8.2 | 11.4 | 8.5 |  | 87.1 | 11.3 | -4 | 0.1 |
| 431 | Collège Guy Flavien (0752189X) | 9.3 | C | 8.1 | 15 | 4.8 |  | 87 | 12 | -6.7 | -0.2 |
| 431 | Collège Condorcet (0771175J) | 9.3 | C | 9.4 | 8.3 | 10.2 |  | 88.4 | 10.7 | -0.7 | 0 |
| 431 | Collège François Rabelais (0780713B) | 9.3 | C | 13.2 | 11.5 | 3.3 |  | 92.6 | 11.3 | -3 | -1.2 |
| 431 | Collège de Sèvres (0921244C) | 9.3 | C | 9.1 | 15.1 | 3.7 |  | 88.1 | 12.1 | -6.7 | -0.4 |
| 431 | Collège Victor Duruy (0941090Z) | 9.3 | C | 10.2 | 12.1 | 5.7 |  | 89.4 | 11.4 | -3 | -0.4 |
| 436 | Collège Claude Chappe (0750360J) | 9.2 | C | 5.3 | 16.4 | 5.8 |  | 83.6 | 12.4 | -9 | 0 |
| 436 | Collège Guillaume Apollinaire (0752190Y) | 9.2 | C | 8 | 9.9 | 9.8 |  | 86.9 | 11 | -1.3 | 0 |
| 436 | Collège Lucien Cézard (0771424E) | 9.2 | C | 7.8 | 13.9 | 6 |  | 86.6 | 11.8 | -7 | 0 |
| 436 | Collège Blaise Pascal (0911145A) | 9.2 | C | 10.5 | 12 | 5.2 |  | 89.7 | 11.4 | -3.3 | -0.4 |
| 436 | Collège Clos Saint-Vincent (0931214P) | 9.2 | C | 7.3 | 10.3 | 10.1 |  | 86 | 11.1 | -2.3 | 0.2 |
| 436 | Collège Pierre Curie (0951050A) | 9.2 | C | 12 | 2.9 | 12.8 |  | 91.3 | 9.4 | 7 | -0.3 |
| 442 | Collège Jules Verne (0750610F) | 9.1 | C | 5.6 | 10.7 | 11 |  | 84 | 11.2 | -2.3 | 0.4 |
| 442 | Collège des Remparts (0771514C) | 9.1 | C | 10.4 | 8.5 | 8.4 |  | 89.6 | 10.8 | -1.7 | -0.1 |
| 442 | Collège de l'Europe (0771759U) | 9.1 | C | 8.1 | 7.1 | 12 |  | 87 | 10.5 | 0.3 | 0.2 |
| 442 | Collège Jacques Monod (0771878Y) | 9.1 | C | 9.1 | 6.8 | 11.3 |  | 88.1 | 10.4 | 0.7 | 0 |
| 442 | Collège Marthe Simard (0772868Z) | 9.1 | C | 7.6 | 7.4 | 12.3 |  | 86.5 | 10.6 | 0 | 0.3 |
| 442 | Collège Nelson Mandela (0930611J) | 9.1 | C | 10.6 | 1.8 | 15 |  | 89.8 | 9 | 10.7 | 0 |
| 442 | Collège Pierre Brossolette (0940791Z) | 9.1 | C | 5.2 | 5.4 | 16.6 |  | 83.5 | 10.1 | 2.3 | 0.9 |
| 449 | Collège Albert Camus (0771172F) | 9 | C | 6.3 | 2.3 | 18.3 |  | 84.8 | 9.2 | 12.3 | 0.6 |
| 449 | Collège Catherine de Vivonne (0781886B) | 9 | C | 12.1 | 11.2 | 3.8 |  | 91.4 | 11.3 | -2.7 | -1 |
| 449 | Collège Olympe de Gouges (0931710D) | 9 | C | 7.1 | 2.6 | 17.2 |  | 85.8 | 9.3 | 8 | 0.4 |
| 449 | Collège Jean Charcot (0940038F) | 9 | C | 9.3 | 9.6 | 8 |  | 88.2 | 11 | -1 | -0.3 |
| 449 | Collège Roland Vasseur (0952080V) | 9 | C | 11.1 | 13.7 | 2.1 |  | 90.4 | 11.7 | -5.7 | -0.9 |
| 454 | Collège Voltaire (0752536Z) | 8.9 | C | 9.1 | 12.1 | 5.4 |  | 88.1 | 11.4 | -3.7 | -0.4 |
| 454 | Collège Jean des Barres (0771912K) | 8.9 | C | 9.8 | 7.9 | 8.9 |  | 88.9 | 10.7 | -0.7 | -0.2 |
| 454 | Collège Jean de La Fontaine (0772056S) | 8.9 | C | 5.7 | 3 | 18.1 |  | 84.1 | 9.5 | 6.3 | 0.7 |
| 454 | Collège Anatole France (0783251K) | 8.9 | C | 6.2 | 12.2 | 8.2 |  | 84.7 | 11.5 | -5.7 | 0.2 |
| 454 | Collège Henri Bergson (0920881H) | 8.9 | C | 10.3 | 13.5 | 2.8 |  | 89.4 | 11.7 | -4.7 | -0.8 |
| 454 | Collège Robert Paparemborde (0922662U) | 8.9 | C | 5.9 | 11 | 9.8 |  | 84.4 | 11.2 | -4 | 0.4 |
| 454 | Collège Le Parc (0931189M) | 8.9 | C | 6.6 | 8 | 12.2 |  | 85.2 | 10.7 | -0.3 | 0.3 |
| 454 | Collège Colonel Fabien (0931213N) | 8.9 | C | 10.2 | 2 | 14.4 |  | 89.4 | 9 | 10.5 | -0.1 |
| 454 | Collège Janusz Korczak (0941603G) | 8.9 | C | 4.7 | 5 | 17.1 |  | 82.6 | 10 | 3 | 0.9 |
| 454 | Collège Louis Hayet (0952045G) | 8.9 | C | 10 | 8.2 | 8.5 |  | 89.2 | 10.7 | 0.3 | -0.4 |
| 454 | Collège Louise Weiss (0952236P) | 8.9 | C | 7.5 | 12.1 | 7.2 |  | 86.3 | 11.4 | -6 | 0.1 |
| 465 | Collège les Capucins (0770033T) | 8.8 | C | 7.8 | 2.8 | 15.9 |  | 86.7 | 9.4 | 7.3 | 0.2 |
| 465 | Collège Elsa Triolet (0770053P) | 8.8 | C | 8 | 6.8 | 11.5 |  | 86.9 | 10.4 | -0.3 | 0.2 |
| 465 | Collège Maurice Ravel (0780262L) | 8.8 | C | 9.2 | 14.8 | 2.3 |  | 88.1 | 12 | -8 | -0.6 |
| 465 | Collège Jean Moulin (0910057T) | 8.8 | C | 10.4 | 13.8 | 2.3 |  | 89.6 | 11.8 | -5.7 | -0.8 |
| 465 | Collège Jean Mermoz (0910716J) | 8.8 | C | 6.2 | 1.9 | 18.4 |  | 84.7 | 9 | 10.7 | 0.7 |
| 465 | Collège Camille Claudel (0911948Y) | 8.8 | C | 13.2 | 4.8 | 8.5 |  | 92.6 | 10 | 2 | -0.7 |
| 465 | Collège Henri Wallon (0921165S) | 8.8 | C | 9.3 | 8.5 | 8.6 |  | 88.3 | 10.8 | 0 | -0.3 |
| 465 | Collège André Maurois (0921498D) | 8.8 | C | 10.2 | 14.1 | 2.1 |  | 89.3 | 11.8 | -6.7 | -0.7 |
| 465 | Collège Léon Jouhaux (0930620U) | 8.8 | C | 5.5 | 8.3 | 12.6 |  | 83.9 | 10.7 | -2 | 0.7 |
| 465 | Collège Condorcet (0941023B) | 8.8 | C | 6.9 | 14.1 | 5.4 |  | 85.5 | 11.8 | -7.7 | -0.1 |
| 465 | Collège Jules Vallès (0941229A) | 8.8 | C | 6.2 | 9.2 | 11.1 |  | 84.7 | 10.9 | -2.7 | 0.4 |
| 465 | Collège Jules Ferry (0950892D) | 8.8 | C | 10.6 | 11.8 | 4 |  | 89.7 | 11.4 | -3 | -0.8 |
| 477 | Collège Henri Matisse (0750591K) | 8.7 | C | 9.1 | 12.8 | 4.2 |  | 88.1 | 11.6 | -4 | -0.5 |
| 477 | Collège privé Georges Leven (0754853T) | 8.7 | C | 14.3 | 7.2 | 4.6 |  | 94 | 10.5 | -2 | -0.8 |
| 477 | Collège Blanche de Castille (0770009S) | 8.7 | C | 11 | 10.8 | 4.2 |  | 90.2 | 11.2 | -3.7 | -0.6 |
| 477 | Collège Rosa Bonheur (0771068T) | 8.7 | C | 10 | 8.5 | 7.5 |  | 89.1 | 10.8 | -2 | -0.2 |
| 477 | Collège les Hyverneaux (0771421B) | 8.7 | C | 10.9 | 10.9 | 4.2 |  | 90 | 11.2 | -4.3 | -0.5 |
| 477 | Collège les Gâtines - René Cassin (0911252S) | 8.7 | C | 9.5 | 10 | 6.5 |  | 88.6 | 11 | -3 | -0.3 |
| 477 | Collège Anatole France (0930892P) | 8.7 | C | 5.8 | 4.3 | 16.1 |  | 84.3 | 9.9 | 3.3 | 0.5 |
| 477 | Collège Roger Martin du Gard (0930893R) | 8.7 | C | 4.5 | 2.7 | 18.8 |  | 82.3 | 9.4 | 9.3 | 0.9 |
| 477 | Collège Jean Vigo (0931428X) | 8.7 | C | 3.4 | 3.8 | 18.8 |  | 80.6 | 9.8 | 5.7 | 1.1 |
| 486 | Collège Molière (0752551R) | 8.6 | C | 8.1 | 11.6 | 6.1 |  | 87 | 11.3 | -5.3 | -0.1 |
| 486 | Collège Pierre de Montereau (0771174H) | 8.6 | C | 9.3 | 5.2 | 11.2 |  | 88.3 | 10.1 | 1.7 | -0.1 |
| 486 | Collège la Plaine des Glacis (0771659K) | 8.6 | C | 6.9 | 8.4 | 10.4 |  | 85.6 | 10.8 | -3 | 0.3 |
| 486 | Collège le Bois de l'Enclume (0772091E) | 8.6 | C | 8.5 | 8.7 | 8.5 |  | 87.4 | 10.8 | -3 | 0 |
| 486 | Collège Le Corbusier (0781101Y) | 8.6 | C | 11.6 | 10.2 | 3.9 |  | 90.8 | 11.1 | -3 | -0.8 |
| 486 | Collège Aretha Franklin (ex Paul Langevin) (0931199Y) | 8.6 | C | 3.7 | 3.3 | 18.7 |  | 81.1 | 9.6 | 7 | 0.9 |
| 486 | Collège Jean Bullant (0950941G) | 8.6 | C | 8.9 | 5.5 | 11.3 |  | 87.9 | 10.2 | 1 | 0 |
| 493 | Collège Henri Dunant (0771029A) | 8.5 | C | 4 | 2.6 | 18.9 |  | 81.6 | 9.3 | 9 | 0.9 |
| 493 | Collège Pierre Weczerka (0771471F) | 8.5 | C | 6.9 | 4 | 14.6 |  | 85.5 | 9.8 | 3.3 | 0.2 |
| 493 | Collège Louise Michel (0771519H) | 8.5 | C | 10.5 | 9.4 | 5.6 |  | 89.7 | 10.9 | -2.3 | -0.5 |
| 493 | Collège les Cités Unies (0771959L) | 8.5 | C | 9 | 7.9 | 8.7 |  | 88 | 10.7 | -1.7 | -0.1 |
| 493 | Collège Madeleine Renaud (0772589W) | 8.5 | C | 10.2 | 10.2 | 5.2 |  | 89.3 | 11.1 | -3.3 | -0.4 |
| 493 | Collège Le Racinay (0780256E) | 8.5 | C | 11.2 | 12.1 | 2.1 |  | 90.5 | 11.4 | -5 | -1.1 |
| 493 | Collège Les Saules (0781695U) | 8.5 | C | 9.3 | 5.4 | 10.9 |  | 88.3 | 10.1 | 1.3 | -0.1 |
| 493 | Collège Gounod (0920700L) | 8.5 | C | 5.9 | 17.1 | 2.6 |  | 84.4 | 12.6 | -11.3 | -0.4 |
| 493 | Collège Paul Bert (0931201A) | 8.5 | C | 6.4 | 1.6 | 17.5 |  | 85 | 8.9 | 12.3 | 0.4 |
| 493 | Collège René Cassin (0931883S) | 8.5 | C | 4.4 | 3.3 | 17.7 |  | 82.2 | 9.6 | 6 | 0.6 |
| 493 | Collège Danielle Casanova (0941032L) | 8.5 | C | 8 | 3 | 14.6 |  | 86.9 | 9.5 | 6 | 0 |
| 493 | Collège Henri Wallon (0941781A) | 8.5 | C | 7.2 | 3.2 | 15.1 |  | 86 | 9.5 | 4.7 | 0.2 |
| 493 | Collège Jean-Claude Chabanne (0950894F) | 8.5 | C | 10 | 10.1 | 5.3 |  | 89.2 | 11.1 | -2.3 | -0.6 |
| 506 | Collège Jean Macé (0910678T) | 8.4 | C | 6.5 | 4.7 | 14.1 |  | 85 | 10 | 1.7 | 0.3 |
| 506 | Collège Jean Monnet (0911920T) | 8.4 | C | 10 | 14.1 | 1.2 |  | 89.1 | 11.8 | -7 | -1.2 |
| 506 | Collège Louise Weiss (0912174U) | 8.4 | C | 11.1 | 8.4 | 5.7 |  | 90.3 | 10.8 | -2 | -0.5 |
| 506 | Collège Jean Vilar (0931206F) | 8.4 | C | 2.9 | 2.8 | 19.5 |  | 79.5 | 9.4 | 9.7 | 1.4 |
| 506 | Collège Victor Hugo (0941101L) | 8.4 | C | 7.9 | 8.4 | 8.8 |  | 86.7 | 10.7 | -2.3 | 0 |
| 506 | Collège Louis Issaurat (0941351H) | 8.4 | C | 4.4 | 6.9 | 13.8 |  | 82.3 | 10.5 | -1 | 0.9 |
| 512 | Collège Georges Méliès (0752606A) | 8.3 | C | 7.8 | 3.3 | 13.7 |  | 86.6 | 9.6 | 5 | -0.1 |
| 512 | Collège des Hauts Grillets (0780714C) | 8.3 | C | 7.2 | 16.3 | 1.5 |  | 86 | 12.4 | -10 | -0.7 |
| 512 | Collège Saint-Exupéry (0911572P) | 8.3 | C | 11.8 | 9.1 | 3.9 |  | 91.1 | 10.9 | -2.3 | -1.1 |
| 512 | Collège Émile Zola (0921178F) | 8.3 | C | 12.1 | 8 | 4.9 |  | 91.3 | 10.7 | -1 | -1.1 |
| 512 | Collège Les Martinets (0921235T) | 8.3 | C | 8 | 12.2 | 4.6 |  | 86.9 | 11.5 | -5 | -0.4 |
| 512 | Collège Françoise Dolto (0932038K) | 8.3 | C | 5.4 | 5.4 | 14.2 |  | 83.7 | 10.1 | 0.7 | 0.5 |
| 512 | Collège Fréderic et Irène Joliot-Curie (0940516A) | 8.3 | C | 9.8 | 9.3 | 5.9 |  | 88.9 | 10.9 | -1.7 | -0.5 |
| 512 | Collège Clément Guyard (0941102M) | 8.3 | C | 5.9 | 7.1 | 11.8 |  | 84.4 | 10.5 | -0.7 | 0.3 |
| 520 | Collège Georges Brassens (0750507U) | 8.2 | C | 8 | 7.5 | 9 |  | 86.9 | 10.6 | 0 | -0.2 |
| 520 | Collège Henri IV (0771173G) | 8.2 | C | 6.3 | 7 | 11.4 |  | 84.9 | 10.5 | -1.3 | 0.3 |
| 520 | Collège Maria Callas (0772396L) | 8.2 | C | 8.9 | 8.4 | 7.2 |  | 87.8 | 10.8 | -3 | -0.2 |
| 520 | Collège Raymond Poincaré (0780718G) | 8.2 | C | 8.7 | 14.3 | 1.5 |  | 87.7 | 11.9 | -7.3 | -0.9 |
| 520 | Collège Rabelais (0921782M) | 8.2 | C | 7.2 | 16.1 | 1.3 |  | 85.9 | 12.3 | -9.7 | -0.8 |
| 520 | Collège Jean Moulin (0930623X) | 8.2 | C | 6.4 | 8.2 | 10.1 |  | 84.9 | 10.7 | -2 | 0.2 |
| 520 | Collège Pierre Brossolette (0940788W) | 8.2 | C | 6.2 | 14 | 4.4 |  | 84.8 | 11.8 | -8 | -0.2 |
| 520 | Collège Le Petit Bois (0951726K) | 8.2 | C | 9.8 | 2.6 | 12.3 |  | 88.9 | 9.3 | 5.3 | -0.3 |
| 528 | Collège Paul Langevin (0771331D) | 8.1 | C | 5.6 | 3.5 | 15.2 |  | 84 | 9.7 | 4 | 0.2 |
| 528 | Collège Marie Curie (0772481D) | 8.1 | C | 4.2 | 6.2 | 14 |  | 81.9 | 10.3 | 0 | 0.7 |
| 528 | Collège Louis Lumière (0780119F) | 8.1 | C | 8.4 | 15.1 | 0.9 |  | 87.4 | 12 | -9 | -1 |
| 528 | Collège de l'Ermitage (0912086Y) | 8.1 | C | 9.8 | 10.5 | 4.1 |  | 89 | 11.1 | -3 | -0.8 |
| 528 | Collège Sòlveig Anspach (0932696A) | 8.1 | C | 4.9 | 3.6 | 15.9 |  | 82.9 | 9.7 | 6.7 | 0.2 |
| 528 | Collège Eugène Chevreul (0940551N) | 8.1 | C | 6.3 | 4.7 | 13.3 |  | 84.8 | 10 | 2.3 | 0.1 |
| 534 | Collège Eugène Delacroix (0771563F) | 8 | C | 7.6 | 8.9 | 7.6 |  | 86.4 | 10.8 | -3.3 | -0.1 |
| 534 | Collège Olympe de Gouges (0912233H) | 8 | C | 10.6 | 8.6 | 4.9 |  | 89.8 | 10.8 | -2.7 | -0.6 |
| 534 | Collège Dora Maar (0932582B) | 8 | C | 7.1 | 0.7 | 16.3 |  | 85.7 | 8.2 | 16.7 | 0.2 |
| 537 | Collège Françoise Dolto (0750552T) | 7.9 | D | 8.1 | 9.3 | 6.2 |  | 87 | 10.9 | -2 | -0.4 |
| 537 | Collège Maurice Ravel (0752557X) | 7.9 | D | 8.7 | 10.1 | 4.9 |  | 87.7 | 11.1 | -3 | -0.5 |
| 537 | Collège René Goscinny (0771177L) | 7.9 | D | 6 | 10.6 | 7 |  | 84.6 | 11.2 | -6 | 0.1 |
| 537 | Collège Hippolyte Rémy (0771513B) | 7.9 | D | 7.1 | 9.3 | 7.2 |  | 85.7 | 10.9 | -4.7 | 0 |
| 537 | Collège Nicolas Tronchon (0772483F) | 7.9 | D | 9.7 | 6 | 7.9 |  | 88.7 | 10.3 | -0.3 | -0.4 |
| 537 | Collège Descartes (0780185C) | 7.9 | D | 10.4 | 8.2 | 5.1 |  | 89.6 | 10.7 | -2 | -0.7 |
| 537 | Collège Mozart (0780261K) | 7.9 | D | 8.3 | 11.8 | 3.7 |  | 87.2 | 11.4 | -6.7 | -0.4 |
| 537 | Collège Darius Milhaud (0780579F) | 7.9 | D | 9.8 | 8 | 5.8 |  | 88.9 | 10.7 | -1.3 | -0.6 |
| 537 | Collège Jean Moulin (0780847X) | 7.9 | D | 7.6 | 13.6 | 2.5 |  | 86.4 | 11.7 | -7.3 | -0.6 |
| 537 | Collège Pablo Neruda (0911253T) | 7.9 | D | 2.2 | 2 | 19.5 |  | 77.8 | 9.1 | 12 | 1.1 |
| 537 | Collège Danton (0921393P) | 7.9 | D | 5.3 | 14.7 | 3.8 |  | 83.6 | 12 | -11 | -0.2 |
| 537 | Collège Georges Pompidou (0921496B) | 7.9 | D | 7.8 | 12.1 | 3.7 |  | 86.6 | 11.4 | -5.3 | -0.5 |
| 537 | Collège Pierre de Ronsard (0940583Y) | 7.9 | D | 10.1 | 10.6 | 3 |  | 89.2 | 11.2 | -4 | -0.9 |
| 537 | Collège de Lattre de Tassigny (0940789X) | 7.9 | D | 5.3 | 12.1 | 6.3 |  | 83.5 | 11.4 | -7 | 0 |
| 537 | Collège Pablo Picasso (0951098C) | 7.9 | D | 4.6 | 2.2 | 17 |  | 82.5 | 9.1 | 7.3 | 0.4 |
| 552 | Collège Jean Baptiste Vermay (0770051M) | 7.8 | D | 9.3 | 8.7 | 5.5 |  | 88.2 | 10.8 | -3.3 | -0.4 |
| 552 | Collège Jean Vilar (0771365R) | 7.8 | D | 7.5 | 9.2 | 6.7 |  | 86.3 | 10.9 | -4.3 | -0.1 |
| 552 | Collège le grand parc (0771662N) | 7.8 | D | 5.5 | 10.8 | 7.1 |  | 83.8 | 11.2 | -6.7 | 0.1 |
| 552 | Collège le vieux chêne (0772651N) | 7.8 | D | 5.4 | 12.4 | 5.7 |  | 83.8 | 11.5 | -9.7 | 0 |
| 552 | Collège Saint-Nicolas (0911824N) | 7.8 | D | 11.2 | 4.9 | 7.2 |  | 90.5 | 10 | 0 | -0.5 |
| 552 | Collège La Salle - Saint-Nicolas (0921003R) | 7.8 | D | 9.7 | 6.9 | 6.9 |  | 88.8 | 10.4 | -1.5 | -0.4 |
| 552 | Collège Les Bouvets (0921219A) | 7.8 | D | 7 | 7.8 | 8.6 |  | 85.6 | 10.6 | 0 | -0.3 |
| 552 | Collège Antoine de Saint-Exupéry (0940101Z) | 7.8 | D | 6.2 | 12.7 | 4.5 |  | 84.8 | 11.6 | -6.7 | -0.3 |
| 560 | Collège Georges Clemenceau (0750546L) | 7.7 | D | 2.9 | 2.3 | 17.9 |  | 79.5 | 9.2 | 7.3 | 0.6 |
| 560 | Collège Alphonse Daudet (0751705W) | 7.7 | D | 7.8 | 9.9 | 5.4 |  | 86.6 | 11 | -4.3 | -0.3 |
| 560 | Collège Paul Valéry (0752537A) | 7.7 | D | 6.4 | 10.5 | 6.1 |  | 85 | 11.1 | -4.7 | -0.2 |
| 560 | Collège Victor Schoelcher (0772482E) | 7.7 | D | 8.6 | 7.8 | 6.7 |  | 87.5 | 10.6 | -2.7 | -0.3 |
| 560 | Collège La Guyonnerie (0910967G) | 7.7 | D | 6.4 | 15.6 | 1.2 |  | 85 | 12.2 | -9.3 | -0.8 |
| 560 | Collège César Franck (0911034E) | 7.7 | D | 6.5 | 11.8 | 4.8 |  | 85 | 11.4 | -5.3 | -0.3 |
| 560 | Collège Romain Rolland (0920624D) | 7.7 | D | 8.3 | 13.7 | 1 |  | 87.2 | 11.7 | -8.7 | -0.9 |
| 560 | Collège Liberté (0931202B) | 7.7 | D | 3.5 | 4.9 | 14.7 |  | 80.8 | 10 | 1 | 0.6 |
| 560 | Collège La Courtille (0931490P) | 7.7 | D | 1.2 | 2.3 | 19.7 |  | 74.7 | 9.2 | 10 | 1.6 |
| 560 | Collège Henri Barbusse (0941020Y) | 7.7 | D | 5 | 8.4 | 9.7 |  | 83.2 | 10.8 | -3.7 | 0.3 |
| 560 | Collège Jules Vallès (0941029H) | 7.7 | D | 8.3 | 1.7 | 13.1 |  | 87.1 | 8.9 | 9.7 | -0.3 |
| 560 | Collège Descartes (0950046J) | 7.7 | D | 9.1 | 6 | 8 |  | 88 | 10.3 | -0.7 | -0.3 |
| 560 | Collège Voltaire (0951754R) | 7.7 | D | 6 | 9.7 | 7.5 |  | 84.5 | 11 | -5 | 0.1 |
| 573 | Collège Stéphane Mallarmé (0752554U) | 7.6 | D | 8.8 | 11.3 | 2.7 |  | 87.8 | 11.3 | -5.3 | -0.7 |
| 573 | Collège Jean-Jacques Rousseau (0771562E) | 7.6 | D | 11.3 | 6.9 | 4.6 |  | 90.6 | 10.5 | -2 | -0.8 |
| 573 | Collège André Malraux (0771761W) | 7.6 | D | 2.2 | 2 | 18.7 |  | 78 | 9.1 | 8 | 0.8 |
| 573 | Collège Guy de Maupassant (0780269U) | 7.6 | D | 8.1 | 12.2 | 2.4 |  | 87 | 11.5 | -6.7 | -0.7 |
| 573 | Collège La Couldre (0781263Z) | 7.6 | D | 10.2 | 10.7 | 1.8 |  | 89.3 | 11.2 | -5.3 | -1.3 |
| 573 | Collège André Maurois (0910017Z) | 7.6 | D | 9.4 | 11.5 | 2 |  | 88.4 | 11.3 | -5.7 | -0.9 |
| 573 | Collège Le Roussay (0911447D) | 7.6 | D | 9.2 | 9.5 | 4 |  | 88.2 | 11 | -4 | -0.6 |
| 573 | Collège René Descartes (0931433C) | 7.6 | D | 4.8 | 0.7 | 17.4 |  | 82.8 | 8.2 | 15.7 | 0.4 |
| 573 | Collège Claude Debussy (0931434D) | 7.6 | D | 3.4 | 2 | 17.5 |  | 80.5 | 9 | 6 | 0.5 |
| 573 | Collège privé La Salle - Le Landy (0932773J) | 7.6 | D | 8.1 | 7.1 |  | oui | 87 | 10.5 |  |  |
| 583 | Collège Gustave Flaubert (0753518S) | 7.5 | D | 9.9 | 7.9 | 4.6 |  | 89 | 10.7 | -2 | -0.8 |
| 583 | Collège Louis Braille (0771361L) | 7.5 | D | 10.3 | 9.7 | 2.6 |  | 89.4 | 11 | -4.7 | -0.9 |
| 583 | Collège Monthéty (0772331R) | 7.5 | D | 6.6 | 8.9 | 7 |  | 85.2 | 10.9 | -5 | 0 |
| 583 | Collège Les Molières (0780574A) | 7.5 | D | 9.8 | 11.1 | 1.7 |  | 88.9 | 11.2 | -6 | -1.1 |
| 583 | Collège Alexandre Dumas (0780720J) | 7.5 | D | 7.5 | 11 | 4.1 |  | 86.4 | 11.2 | -6 | -0.4 |
| 583 | Collège Guillaume Apollinaire (0780761D) | 7.5 | D | 6.2 | 12.4 | 3.9 |  | 84.7 | 11.5 | -8.7 | -0.3 |
| 583 | Collège Robespierre (0931145P) | 7.5 | D | 3.9 | 3.4 | 15.2 |  | 81.4 | 9.6 | 2.3 | 0.4 |
| 583 | Collège Lucie Aubrac (0932454M) | 7.5 | D | 6 | 6 | 10.4 |  | 84.5 | 10.3 | -1 | 0.1 |
| 583 | Collège Aristide Briand (0950014Z) | 7.5 | D | 7 | 5.6 | 9.9 |  | 85.7 | 10.2 | -0.3 | -0.1 |
| 583 | Collège Anatole France (0950900M) | 7.5 | D | 3.2 | 1.5 | 17.7 |  | 80.1 | 8.8 | 9 | 0.5 |
| 593 | Collège Lamartine (0783253M) | 7.4 | D | 7 | 11.6 | 3.6 |  | 85.6 | 11.3 | -7 | -0.4 |
| 593 | Collège Le Parc de Villeroy (0911185U) | 7.4 | D | 9.9 | 6.8 | 5.5 |  | 89 | 10.4 | -1.7 | -0.6 |
| 593 | Collège Guy Môquet (0921621M) | 7.4 | D | 4.1 | 4.6 | 13.5 |  | 81.9 | 9.9 | 0.3 | 0.4 |
| 593 | Collège Marguerite Duras (0921675W) | 7.4 | D | 5.2 | 3.4 | 13.7 |  | 83.4 | 9.6 | 2.3 | 0.2 |
| 593 | Collège Édouard Herriot (0930619T) | 7.4 | D | 3.5 | 7.8 | 11 |  | 80.8 | 10.6 | -3.7 | 0.6 |
| 593 | Collège Denis Diderot (0931186J) | 7.4 | D | 4.2 | 1.5 | 16.5 |  | 81.9 | 8.8 | 8 | 0.3 |
| 593 | Collège Jean Lolive (0931218U) | 7.4 | D | 1.7 | 1.8 | 18.8 |  | 76.5 | 8.9 | 8.3 | 0.9 |
| 593 | Collège Pablo Neruda (0931224A) | 7.4 | D | 1.7 | 1.6 | 18.8 |  | 76.1 | 8.8 | 8 | 0.9 |
| 593 | Collège Albert Camus (0931228E) | 7.4 | D | 3.6 | 7.6 | 11 |  | 80.8 | 10.6 | -3.7 | 0.6 |
| 593 | Collège Jacques Jorissen (0931377S) | 7.4 | D | 1.8 | 2.2 | 18.2 |  | 76.7 | 9.1 | 5.7 | 0.8 |
| 593 | Collège Miriam Makeba (0932726H) | 7.4 | D | 2.6 | 2.2 | 17.4 |  | 78.9 | 9.1 | 5.3 | 0.6 |
| 593 | Collège Jeanne d'Arc (0950751A) | 7.4 | D | 8.5 | 6.2 |  | oui | 87.5 | 10.3 |  |  |
| 605 | Collège Germaine Tillion (0753936W) | 7.3 | D | 6.7 | 8.5 | 6.7 |  | 85.3 | 10.8 | -3.3 | -0.2 |
| 605 | Collège Hutinel (0772189L) | 7.3 | D | 8 | 7.1 | 6.7 |  | 86.9 | 10.5 | -2.7 | -0.3 |
| 605 | Collège Jean Lurçat (0783248G) | 7.3 | D | 8.2 | 8.4 | 5.2 |  | 87.1 | 10.7 | -3.3 | -0.4 |
| 605 | Collège Victor Hugo (0921396T) | 7.3 | D | 9.5 | 9.8 | 2.6 |  | 88.5 | 11 | -4 | -1.2 |
| 605 | Collège Les Renardières (0922020W) | 7.3 | D | 8.1 | 10.7 | 3 |  | 87 | 11.2 | -6 | -0.6 |
| 605 | Collège Josette et Maurice Audin (0942434K) | 7.3 | D | 7.6 | 6.2 | 8.1 |  | 86.4 | 10.3 | -0.3 | -0.3 |
| 605 | Collège Jean Vilar (0950932X) | 7.3 | D | 10.3 | 8.8 | 2.8 |  | 89.4 | 10.8 | -4 | -1 |
| 612 | Collège Valmy (0750584C) | 7.2 | D | 3 | 11.4 | 7.1 |  | 79.7 | 11.3 | -9 | 0.2 |
| 612 | Collège Georges Politzer (0931181D) | 7.2 | D | 3.7 | 2.6 | 15.2 |  | 81 | 9.3 | 4 | 0.2 |
| 612 | Collège Paul Éluard (0931448U) | 7.2 | D | 5.2 | 7.6 | 8.9 |  | 83.4 | 10.6 | -2.3 | 0 |
| 612 | Collège Jean Macé (0941103N) | 7.2 | D | 4 | 3.5 | 14.1 |  | 81.6 | 9.7 | 1.3 | 0.4 |
| 612 | Collège Romain Rolland (0941601E) | 7.2 | D | 4.1 | 1.5 | 16.1 |  | 81.9 | 8.8 | 6 | 0.3 |
| 617 | Collège Mozart (0750484U) | 7.1 | D | 2.7 | 3.2 | 15.3 |  | 79 | 9.6 | 2 | 0.5 |
| 617 | Collège La Rose blanche (0755779Z) | 7.1 | D | 2.8 | 12.7 | 5.8 |  | 79.4 | 11.5 | -11 | 0.1 |
| 617 | Collège Claude Monet (0781817B) | 7.1 | D | 7.2 | 8.2 | 5.8 |  | 85.9 | 10.7 | -3.3 | -0.3 |
| 617 | Collège Antoine Watteau (0941091A) | 7.1 | D | 6.3 | 10.1 | 4.8 |  | 84.8 | 11.1 | -5 | -0.3 |
| 617 | Collège Simone Veil (0950895G) | 7.1 | D | 6.3 | 4.4 | 10.6 |  | 84.9 | 9.9 | 1 | -0.1 |
| 622 | Collège Claude Bernard (0752547L) | 7 | D | 6.8 | 9.2 | 4.9 |  | 85.4 | 10.9 | -6 | -0.2 |
| 622 | Collège André Citroën (0754305X) | 7 | D | 6.6 | 8.6 | 5.9 |  | 85.3 | 10.8 | -3 | -0.4 |
| 622 | Collège Fernand Gregh (0771342R) | 7 | D | 9.5 | 6.5 | 5.1 |  | 88.5 | 10.4 | -2 | -0.7 |
| 622 | Collège Mon Plaisir (0771667U) | 7 | D | 7.8 | 10.5 | 2.6 |  | 86.6 | 11.1 | -6.7 | -0.6 |
| 622 | Collège Auguste Renoir (0780507C) | 7 | D | 8.6 | 10 | 2.4 |  | 87.6 | 11 | -5.3 | -0.8 |
| 622 | Collège Olivier de Serres (0910056S) | 7 | D | 6.3 | 0.9 | 13.8 |  | 84.9 | 8.4 | 10 | -0.2 |
| 622 | Collège Auguste Delaune (0931195U) | 7 | D | 1.5 | 1.2 | 18.4 |  | 75.5 | 8.6 | 8.7 | 0.7 |
| 622 | Collège Évariste Galois (0931207G) | 7 | D | 2.2 | 1.8 | 17 |  | 77.8 | 9 | 4.7 | 0.5 |
| 622 | Collège Jacques Prévert (0931614Z) | 7 | D | 6.7 | 2.5 | 11.7 |  | 85.3 | 9.3 | 3 | -0.2 |
| 622 | Collège Joséphine Baker (0932261C) | 7 | D | 4.5 | 2.1 | 14.4 |  | 82.3 | 9.1 | 5 | 0 |
| 622 | Collège Paul Éluard (0941095E) | 7 | D | 3.5 | 1.8 | 15.6 |  | 80.6 | 9 | 4 | 0.3 |
| 622 | Collège Marie Sklodowska-Curie (0951232Y) | 7 | D | 8 | 8.3 | 4.6 |  | 86.9 | 10.7 | -4.3 | -0.4 |
| 622 | Collège Charles Le Brun (0951799P) | 7 | D | 5.5 | 12.8 | 2.7 |  | 83.8 | 11.6 | -11 | -0.4 |
| 635 | Collège privé Morvan (0752916M) | 6.9 | D | 11.7 | 2.1 |  | oui | 91 | 9.1 |  |  |
| 635 | Collège les Maillettes (0771618R) | 6.9 | D | 4.1 | 4.4 | 12.1 |  | 81.7 | 9.9 | -0.7 | 0.3 |
| 635 | Collège Samuel Paty (0780050F) | 6.9 | D | 8.9 | 9 | 2.7 |  | 87.9 | 10.9 | -6 | -0.6 |
| 635 | Collège La Clé Saint-Pierre (0782114Z) | 6.9 | D | 5.5 | 13.5 | 1.6 |  | 83.9 | 11.7 | -9.7 | -0.7 |
| 635 | Collège Henri Sellier (0920885M) | 6.9 | D | 8.7 | 8 | 3.9 |  | 87.7 | 10.7 | -3.7 | -0.7 |
| 635 | Collège Bartholdi (0921237V) | 6.9 | D | 7.6 | 11.2 | 2 |  | 86.4 | 11.3 | -7.3 | -0.7 |
| 635 | Collège Jean Jaurès (0931216S) | 6.9 | D | 2.2 | 0.8 | 17.7 |  | 77.9 | 8.3 | 11.7 | 0.5 |
| 635 | Collège Georges Brassens (0931979W) | 6.9 | D | 2 | 1.9 | 16.9 |  | 77.2 | 9 | 4.7 | 0.5 |
| 635 | Collège de la Pléiade (0932262D) | 6.9 | D | 2 | 3.3 | 15.5 |  | 77.2 | 9.6 | 1.3 | 0.8 |
| 635 | Collège Germaine Tillion (0932695Z) | 6.9 | D | 3.6 | 5.9 | 11.3 |  | 81 | 10.3 | -3 | 0.5 |
| 635 | Collège Jean Lurçat (0950723V) | 6.9 | D | 1.8 | 0.8 | 18.2 |  | 76.8 | 8.3 | 11.7 | 0.6 |
| 635 | Collège Georges Pompidou (0950930V) | 6.9 | D | 10 | 6.7 | 3.9 |  | 89.1 | 10.4 | -3 | -0.8 |
| 635 | Collège Georges Brassens (0950934Z) | 6.9 | D | 6.4 | 2.3 | 12.1 |  | 85 | 9.2 | 3.3 | -0.2 |
| 635 | Collège Georges Charpak (0952128X) | 6.9 | D | 2.2 | 1.1 | 17.3 |  | 77.9 | 8.5 | 8.7 | 0.4 |
| 649 | Collège privé Ozar Hatorah (0754290F) | 6.8 | D | 12.8 | 3.3 | 4.3 |  | 92.2 | 9.6 | -3 | -0.7 |
| 649 | Collège de la Mauldre (0780709X) | 6.8 | D | 8 | 11.9 | 0.6 |  | 86.9 | 11.4 | -9 | -1.3 |
| 649 | Collège Jean Vilar (0911036G) | 6.8 | D | 4.1 | 0.4 | 16 |  | 81.7 | 7.8 | 16.3 | 0.1 |
| 649 | Collège Maurice Genevoix (0921504K) | 6.8 | D | 4.9 | 12.8 | 2.7 |  | 82.9 | 11.6 | -10.7 | -0.4 |
| 649 | Collège Francine Fromond (0940094S) | 6.8 | D | 4.6 | 6.7 | 9 |  | 82.6 | 10.4 | -3.3 | 0.2 |
| 654 | Collège Hélène Boucher (0752556W) | 6.7 | D | 4.8 | 9.8 | 5.5 |  | 82.9 | 11 | -6.3 | -0.1 |
| 654 | Collège le Segrais (0772125S) | 6.7 | D | 5.2 | 4.4 | 10.6 |  | 83.4 | 9.9 | 0 | 0 |
| 654 | Collège Robert Buron (0772126T) | 6.7 | D | 6.5 | 5.4 | 8.2 |  | 85.1 | 10.1 | -2 | -0.1 |
| 654 | Collège Jacques-Yves Cousteau (0772226B) | 6.7 | D | 5.6 | 12.2 | 2.4 |  | 84 | 11.5 | -9.3 | -0.5 |
| 654 | Collège Les Châtelaines (0780573Z) | 6.7 | D | 8.1 | 10.5 | 1.6 |  | 87 | 11.1 | -6.7 | -1 |
| 654 | Collège André Dunoyer de Segonzac (0911022S) | 6.7 | D | 7 | 6.1 | 7 |  | 85.7 | 10.3 | -2.7 | -0.2 |
| 654 | Collège La Fontaine aux Bergers (0912175V) | 6.7 | D | 7.4 | 10.1 | 2.6 |  | 86.1 | 11.1 | -6.3 | -0.6 |
| 654 | Collège Rosa Luxembourg (0932272P) | 6.7 | D | 2 | 2.1 | 16.1 |  | 77.4 | 9.1 | 3.3 | 0.5 |
| 654 | Collège Iqbal Masih (0932273R) | 6.7 | D | 1.9 | 1.4 | 16.8 |  | 76.9 | 8.7 | 5.3 | 0.4 |
| 654 | Collège Charles François Daubigny (0951823R) | 6.7 | D | 7.5 | 10.7 | 1.9 |  | 86.3 | 11.2 | -7 | -0.8 |
| 664 | Collège Anne Frank (0772413E) | 6.6 | D | 3.7 | 9.6 | 6.6 |  | 81.1 | 11 | -8 | 0.1 |
| 664 | Collège Henri Matisse (0920877D) | 6.6 | D | 7.2 | 11.4 | 1.1 |  | 85.9 | 11.3 | -8 | -1 |
| 664 | Collège Georges Seurat (0922578C) | 6.6 | D | 3.9 | 11.2 | 4.6 |  | 81.5 | 11.3 | -8.7 | -0.2 |
| 664 | Collège Romain Rolland (0930616P) | 6.6 | D | 1.3 | 0.8 | 17.6 |  | 75.1 | 8.3 | 9.3 | 0.5 |
| 664 | Collège Federico Garcia Lorca (0931489N) | 6.6 | D | 0.5 | 0.7 | 18.6 |  | 71.3 | 8.2 | 7 | 0.9 |
| 664 | Collège Gustave Monod (0940794C) | 6.6 | D | 1.1 | 3.5 | 15.3 |  | 74 | 9.6 | 0.7 | 0.9 |
| 664 | Collège François Rabelais (0941224V) | 6.6 | D | 4.3 | 0.8 | 14.6 |  | 82 | 8.3 | 10.7 | -0.1 |
| 664 | Collège Paul Éluard (0950711G) | 6.6 | D | 1.9 | 1.2 | 16.8 |  | 77.1 | 8.6 | 6.7 | 0.4 |
| 664 | Collège Françoise Dolto (0951919V) | 6.6 | D | 10 | 5.1 | 4.6 |  | 89.1 | 10.1 | -1.3 | -1.1 |
| 673 | Collège Madame de Staël (0751563S) | 6.5 | D | 3.9 | 10.8 | 4.9 |  | 81.4 | 11.2 | -8.3 | -0.1 |
| 673 | Collège Beaumarchais (0771420A) | 6.5 | D | 3.1 | 1.2 | 15.2 |  | 79.9 | 8.6 | 5.3 | 0.1 |
| 673 | Collège Le Village (0910021D) | 6.5 | D | 6.4 | 1.8 | 11.4 |  | 85 | 8.9 | 4 | -0.4 |
| 673 | Collège Jean Moulin (0911257X) | 6.5 | D | 9.3 | 5.5 | 4.7 |  | 88.3 | 10.2 | -2 | -0.8 |
| 673 | Collège Jean-Pierre Timbaud (0930900Y) | 6.5 | D | 1.3 | 0.5 | 17.6 |  | 75 | 8 | 11 | 0.4 |
| 673 | Collège Joliot Curie (0931225B) | 6.5 | D | 0.6 | 1.1 | 17.8 |  | 71.6 | 8.6 | 5.7 | 0.7 |
| 673 | Collège Henri Barbusse (0931232J) | 6.5 | D | 1.6 | 0.5 | 17.5 |  | 76.1 | 8.1 | 11 | 0.4 |
| 673 | Collège Alfred Sisley (0931765N) | 6.5 | D | 2.5 | 0.5 | 16.4 |  | 78.7 | 8 | 12.3 | 0.2 |
| 673 | Collège la Cerisaie (0941353K) | 6.5 | D | 5.9 | 10.4 | 3.2 |  | 84.3 | 11.1 | -8.3 | -0.4 |
| 673 | Collège Dulcie September (0941971G) | 6.5 | D | 3.9 | 6.5 | 9.1 |  | 81.4 | 10.4 | -3.3 | 0.2 |
| 673 | Collège Langevin-Wallon (0951190C) | 6.5 | D | 8.9 | 5.7 | 5 |  | 87.8 | 10.2 | -1.7 | -0.8 |
| 684 | Collège Georges Duhamel (0752192A) | 6.4 | D | 4.1 | 14.4 | 0.7 |  | 81.7 | 11.9 | -12.3 | -0.9 |
| 684 | Collège Jacques Prévert (0770030P) | 6.4 | D | 9.2 | 7.4 | 2.7 |  | 88.1 | 10.6 | -4.7 | -0.9 |
| 684 | Collège Pierre Brossolette (0771339M) | 6.4 | D | 3.3 | 2.2 | 13.8 |  | 80.3 | 9.1 | 2.3 | 0.2 |
| 684 | Collège Léonard de Vinci (0772154Y) | 6.4 | D | 7.6 | 9.6 | 2.1 |  | 86.4 | 11 | -6 | -0.8 |
| 684 | Collège Joseph Bara (0910046F) | 6.4 | D | 2.2 | 11.5 | 5.5 |  | 78 | 11.3 | -10.7 | 0 |
| 684 | Collège Jean-Étienne Guettard (0910717K) | 6.4 | D | 6.5 | 7 | 5.6 |  | 85.1 | 10.5 | -4.3 | -0.3 |
| 684 | Collège Robert Doisneau (0912109Y) | 6.4 | D | 9.6 | 7.8 | 1.7 |  | 88.6 | 10.6 | -5.7 | -1.2 |
| 684 | Collège Jean Moulin (0920689Z) | 6.4 | D | 2.9 | 14.4 | 1.8 |  | 79.4 | 11.9 | -15 | -0.5 |
| 684 | Collège Didier Daurat (0931187K) | 6.4 | D | 3.3 | 2 | 13.8 |  | 80.2 | 9 | 3.3 | 0.1 |
| 684 | Collège Le Carré Sainte-Honorine (0950945L) | 6.4 | D | 7.3 | 6.7 | 5.1 |  | 86.1 | 10.4 | -3 | -0.5 |
| 684 | Collège Suzanne Lenglen (0952325L) | 6.4 | D | 2.2 | 0.9 | 16.1 |  | 78 | 8.4 | 5 | 0.3 |
| 695 | Collège Camille Saint-Saens (0771362M) | 6.3 | D | 4.7 | 6.5 | 7.6 |  | 82.7 | 10.4 | -4.7 | 0.1 |
| 695 | Collège Stephane Mallarmé (0772227C) | 6.3 | D | 5.6 | 8.6 | 4.8 |  | 84 | 10.8 | -6.3 | -0.2 |
| 695 | Collège Saint-Exupéry (0780210E) | 6.3 | D | 5.5 | 12.6 | 0.8 |  | 83.9 | 11.5 | -11 | -0.9 |
| 695 | Collège Saint-Exupéry (0930593P) | 6.3 | D | 3 | 2.3 | 13.5 |  | 79.7 | 9.2 | 3 | 0 |
| 695 | Collège Jean Renoir (0931711E) | 6.3 | D | 1.1 | 2.4 | 15.3 |  | 74 | 9.2 | 1.7 | 0.6 |
| 695 | Collège Gisèle Halimi (0942532S) | 6.3 | D | 4.3 | 3.3 | 11.3 |  | 82 | 9.6 | 0 | 0.1 |
| 701 | Collège Edgar Varèse (0755095F) | 6.2 | D | 3.9 | 8.8 | 5.8 |  | 81.4 | 10.8 | -6.3 | -0.1 |
| 701 | Collège Weiler (0910677S) | 6.2 | D | 5.9 | 3.2 | 9.5 |  | 84.4 | 9.6 | 1 | -0.3 |
| 701 | Collège Louis Pasteur (0910718L) | 6.2 | D | 5.3 | 3.5 | 9.9 |  | 83.5 | 9.7 | 0 | -0.1 |
| 701 | Collège de Guinette (0911402E) | 6.2 | D | 5.4 | 2 | 11.1 |  | 83.8 | 9 | 3 | -0.3 |
| 701 | Collège Pierre de Ronsard (0911441X) | 6.2 | D | 5.5 | 7.2 | 5.8 |  | 83.8 | 10.5 | -5.7 | -0.1 |
| 701 | Collège Liberté (0940071S) | 6.2 | D | 8.3 | 4 | 6.3 |  | 87.2 | 9.8 | -0.7 | -0.6 |
| 707 | Collège Bernard Palissy (0752829T) | 6.1 | D | 7.3 | 8.7 | 2.4 |  | 86 | 10.8 | -5 | -0.9 |
| 707 | Collège Georges Rouault (0753938Y) | 6.1 | D | 4 | 2.7 | 11.6 |  | 81.7 | 9.4 | 1.3 | 0 |
| 707 | Collège Parc Frot (0770032S) | 6.1 | D | 5.8 | 3.9 | 8.5 |  | 84.3 | 9.8 | 0 | -0.3 |
| 707 | Collège Gérard Philipe (0771333F) | 6.1 | D | 6.3 | 3.4 | 8.6 |  | 84.9 | 9.6 | 0 | -0.3 |
| 707 | Collège Paul Éluard (0771567K) | 6.1 | D | 5.1 | 6.3 | 6.8 |  | 83.4 | 10.3 | -4.7 | -0.1 |
| 707 | Collège Guillaume Budé (0910062Y) | 6.1 | D | 2.3 | 9.6 | 6.4 |  | 78.1 | 11 | -11.7 | 0.2 |
| 707 | Collège Jean Renoir (0921239X) | 6.1 | D | 2.8 | 11.2 | 4.4 |  | 79.3 | 11.2 | -13 | -0.1 |
| 707 | Collège Georges Politzer (0931148T) | 6.1 | D | 3.4 | 0.9 | 14 |  | 80.5 | 8.3 | 6.7 | -0.1 |
| 707 | Collège Victor Hugo (0940031Y) | 6.1 | D | 5.7 | 6.4 | 6.3 |  | 84.2 | 10.3 | -3 | -0.3 |
| 707 | Collège Willy Ronis (0941015T) | 6.1 | D | 2.4 | 6.1 | 9.7 |  | 78.5 | 10.3 | -5.3 | 0.5 |
| 707 | Collège la Guinette (0941412Z) | 6.1 | D | 8.9 | 6.1 | 3.4 |  | 87.8 | 10.3 | -4.3 | -0.7 |
| 707 | Collège Jean-Jacques Rousseau (0951138W) | 6.1 | D | 2.1 | 2.6 | 13.7 |  | 77.6 | 9.3 | 0.7 | 0.4 |
| 719 | Collège Maurice Utrillo (0751793S) | 6 | D | 3.1 | 3.4 | 11.5 |  | 79.9 | 9.6 | -1 | 0.3 |
| 719 | Collège Charles Péguy (0771619S) | 6 | D | 5.6 | 7.6 | 4.7 |  | 84 | 10.6 | -7 | -0.2 |
| 719 | Collège Jules Ferry (0910860R) | 6 | D | 7.3 | 8.5 | 2.1 |  | 86.1 | 10.8 | -6 | -0.8 |
| 719 | Collège Germaine Tillion (0912276E) | 6 | D | 9.4 | 6.8 | 1.9 |  | 88.4 | 10.4 | -5 | -1.6 |
| 719 | Collège Louis Pasteur (0940521F) | 6 | D | 2.1 | 4.4 | 11.5 |  | 77.8 | 9.9 | -3 | 0.6 |
| 719 | Collège Blaise Cendrars (0941478W) | 6 | D | 2.1 | 1.6 | 14.4 |  | 77.7 | 8.8 | 2.3 | 0.3 |
| 719 | Collège Gabriel Péri (0950887Y) | 6 | D | 5.4 | 2.2 | 10.4 |  | 83.7 | 9.1 | 2 | -0.3 |
| 719 | Collège Pierre de Ronsard (0950891C) | 6 | D | 7.7 | 3.8 | 6.6 |  | 86.5 | 9.8 | -0.3 | -0.6 |
| 727 | Collège Elsa Triolet (0752385K) | 5.9 | D | 4.2 | 8.4 | 5.1 |  | 82 | 10.7 | -6.7 | -0.2 |
| 727 | Collège Albert Camus (0780758A) | 5.9 | D | 8 | 6.8 | 2.8 |  | 86.9 | 10.4 | -4.7 | -0.8 |
| 727 | Collège Marcel Cachin (0931204D) | 5.9 | D | 0.6 | 1.7 | 15.4 |  | 71.5 | 8.9 | 1.7 | 0.6 |
| 727 | Collège Louise Michel (0931221X) | 5.9 | D | 1.1 | 0.5 | 16 |  | 74.3 | 8 | 8.3 | 0.2 |
| 727 | Collège Molière (0941026E) | 5.9 | D | 2.6 | 4.2 | 10.9 |  | 79 | 9.9 | -2 | 0.3 |
| 727 | Collège Bel Air (0950022H) | 5.9 | D | 5.6 | 1.7 | 10.4 |  | 84 | 8.9 | 3 | -0.4 |
| 733 | Collège Paul Verlaine (0750609E) | 5.8 | D | 6.7 | 9.6 | 1.1 |  | 85.3 | 11 | -7.3 | -1.1 |
| 733 | Collège Robert Doisneau (0754355B) | 5.8 | D | 4.6 | 6.5 | 6.2 |  | 82.4 | 10.4 | -3.3 | -0.3 |
| 733 | Collège Émile Chevallier (0770048J) | 5.8 | D | 3.7 | 2.4 | 11.3 |  | 81 | 9.2 | 1.3 | -0.1 |
| 733 | Collège Georges Brassens (0780712A) | 5.8 | D | 7.7 | 8.8 | 0.8 |  | 86.5 | 10.8 | -8 | -1.3 |
| 733 | Collège Pierre Mendès France (0911032C) | 5.8 | D | 4.3 | 9.3 | 3.9 |  | 82 | 10.9 | -8 | -0.3 |
| 733 | Collège Louis Blériot (0922630J) | 5.8 | D | 4.1 | 9.8 | 3.4 |  | 81.8 | 11 | -11 | -0.3 |
| 733 | Collège Barbara (0931147S) | 5.8 | D | 1.9 | 0.6 | 14.9 |  | 76.9 | 8.1 | 6.7 | 0 |
| 733 | Collège Raymond Poincaré (0931188L) | 5.8 | D | 1.5 | 0.8 | 15.2 |  | 75.6 | 8.3 | 5.3 | 0.1 |
| 733 | Collège Jean Vilar (0931429Y) | 5.8 | D | 0.4 | 1.3 | 15.8 |  | 70 | 8.7 | 2 | 0.7 |
| 733 | Collège Jean Charcot (0940582X) | 5.8 | D | 4.7 | 6.5 | 6.3 |  | 82.6 | 10.4 | -5.7 | -0.1 |
| 733 | Collège Rosa Parks (0941099J) | 5.8 | D | 3.3 | 3.2 | 10.8 |  | 80.4 | 9.6 | 0.3 | 0 |
| 733 | Collège Frania Eisenbach-Haverland (0951233Z) | 5.8 | D | 6.6 | 9.9 | 0.8 |  | 85.3 | 11 | -8.7 | -1.1 |
| 745 | Collège Jean Rostand (0770003K) | 5.7 | D | 6 | 5.4 | 5.8 |  | 84.5 | 10.1 | -3.7 | -0.3 |
| 745 | Collège Georges Brassens (0771615M) | 5.7 | D | 4.4 | 5.4 | 7.3 |  | 82.1 | 10.1 | -4.3 | 0 |
| 745 | Collège Jacques Amyot (0771762X) | 5.7 | D | 5.5 | 2.3 | 9.2 |  | 83.9 | 9.2 | 2 | -0.5 |
| 745 | Collège Saint-Exupéry (0780002D) | 5.7 | D | 5.8 | 10.3 | 0.9 |  | 84.3 | 11.1 | -9 | -1 |
| 745 | Collège La Mare aux Saules (0781511U) | 5.7 | D | 5 | 6.1 | 5.9 |  | 83.1 | 10.3 | -4.7 | -0.2 |
| 745 | Collège Alphonse Daudet (0910016Y) | 5.7 | D | 6.9 | 6.6 | 3.7 |  | 85.6 | 10.4 | -4.3 | -0.6 |
| 745 | Collège Albert Camus (0910049J) | 5.7 | D | 1.2 | 1 | 15 |  | 74.4 | 8.5 | 3.7 | 0.2 |
| 745 | Collège Ferdinand Buisson (0911028Y) | 5.7 | D | 2.9 | 5.3 | 8.8 |  | 79.5 | 10.1 | -4.3 | 0.2 |
| 745 | Collège Paul Bert (0911038J) | 5.7 | D | 6.2 | 6.1 | 4.9 |  | 84.7 | 10.3 | -2.7 | -0.6 |
| 745 | Collège Rosa Parks (0912257J) | 5.7 | D | 4.2 | 5.8 | 7 |  | 81.9 | 10.2 | -5 | 0 |
| 745 | Collège Édouard Vaillant (0921157H) | 5.7 | D | 4.3 | 3.1 | 9.6 |  | 82 | 9.5 | -0.7 | -0.1 |
| 745 | Collège Joliot-Curie (0921778H) | 5.7 | D | 5.6 | 0.5 | 11 |  | 84 | 8 | 8 | -0.6 |
| 745 | Collège Jean Moulin (0931151W) | 5.7 | D | 3.9 | 3.6 | 9.7 |  | 81.4 | 9.7 | -0.3 | -0.1 |
| 745 | Collège du Fort (0940617K) | 5.7 | D | 1.8 | 8 | 7.4 |  | 76.8 | 10.7 | -8.7 | 0.3 |
| 745 | Collège Jean Lurçat (0941035P) | 5.7 | D | 3.3 | 3.7 | 10.2 |  | 80.3 | 9.7 | -1 | 0.1 |
| 745 | Collège Wanda Landowska (0950748X) | 5.7 | D | 6.9 | 6.9 | 3.4 |  | 85.5 | 10.5 | -4.7 | -0.6 |
| 761 | Collège Nellie Bly (0771656G) | 5.6 | D | 3.4 | 5.4 | 7.9 |  | 80.4 | 10.1 | -4.3 | 0.1 |
| 761 | Collège Paul Painlevé (0930897V) | 5.6 | D | 4.3 | 0.8 | 11.8 |  | 82 | 8.3 | 6.7 | -0.4 |
| 761 | Collège Pablo Neruda (0931226C) | 5.6 | D | 1.4 | 0.5 | 14.8 |  | 75.3 | 8 | 7.7 | 0 |
| 761 | Collège Pablo Neruda (0931379U) | 5.6 | D | 4.3 | 0.5 | 12.1 |  | 82 | 8.1 | 9 | -0.4 |
| 761 | Collège Théodore Monod (0932311G) | 5.6 | D | 3.5 | 2.7 | 10.6 |  | 80.6 | 9.4 | 0 | 0 |
| 761 | Collège Paul Klee (0940575P) | 5.6 | D | 6.6 | 3.4 | 6.9 |  | 85.2 | 9.6 | -0.7 | -0.5 |
| 761 | Collège Pierre et Marie Curie (0950898K) | 5.6 | D | 7.9 | 7.3 | 1.5 |  | 86.7 | 10.5 | -6.7 | -1 |
| 768 | Collège Armand Lanoux (0771511Z) | 5.5 | D | 6.7 | 5.4 | 4.5 |  | 85.3 | 10.1 | -3.7 | -0.5 |
| 768 | Collège François Villon (0771517F) | 5.5 | D | 8.4 | 4.8 | 3.2 |  | 87.4 | 10 | -3.3 | -1 |
| 768 | Collège Sébastienne Guyot (0780577D) | 5.5 | D | 2.5 | 0.8 | 13.3 |  | 78.7 | 8.3 | 5 | -0.1 |
| 768 | Collège Albert Einstein (0781171Z) | 5.5 | D | 5.7 | 8.9 | 2 |  | 84.1 | 10.8 | -8 | -0.7 |
| 768 | Collège Jean Moulin (0931184G) | 5.5 | D | 1 | 1.1 | 14.4 |  | 73.7 | 8.6 | 3 | 0.2 |
| 768 | Collège Robert Doisneau (0932366S) | 5.5 | D | 0.3 | 0.7 | 15.4 |  | 69.7 | 8.2 | 2.5 | 0.5 |
| 768 | Collège Karl Marx (0941036R) | 5.5 | D | 3 | 1.7 | 11.9 |  | 79.8 | 8.9 | 1.7 | 0 |
| 768 | Collège Guy Môquet (0941039U) | 5.5 | D | 2.5 | 1.1 | 12.9 |  | 78.6 | 8.5 | 3 | 0 |
| 776 | Collège Modigliani (0752318M) | 5.4 | D | 6.1 | 7.3 | 2.8 |  | 84.6 | 10.5 | -5 | -0.8 |
| 776 | Collège Beau Soleil (0771766B) | 5.4 | D | 4.9 | 6.8 | 4.4 |  | 83 | 10.4 | -6.3 | -0.3 |
| 776 | Collège de la Montcient (0783464S) | 5.4 | D | 5.9 | 7.4 | 2.9 |  | 84.4 | 10.6 | -6.3 | -0.6 |
| 776 | Collège Mondétour (0911127F) | 5.4 | D | 3.2 | 2.5 | 10.4 |  | 80.1 | 9.3 | 2 | -0.3 |
| 776 | Collège Henri Wallon (0911146B) | 5.4 | D | 6.6 | 1.9 | 7.7 |  | 85.2 | 9 | 1.7 | -0.8 |
| 776 | Collège Victor Hugo (0920882J) | 5.4 | D | 4.7 | 2.5 | 8.9 |  | 82.6 | 9.3 | 0.3 | -0.3 |
| 776 | Collège Anne Frank (0921243B) | 5.4 | D | 4.2 | 6.5 | 5.4 |  | 81.9 | 10.4 | -5 | -0.2 |
| 776 | Collège Langevin Wallon (0931723T) | 5.4 | D | 2.4 | 2 | 11.8 |  | 78.5 | 9.1 | 0 | 0.2 |
| 776 | Collège Césaria Evora (0932579Y) | 5.4 | D | 4.8 | 0.6 | 10.7 |  | 82.8 | 8.1 | 7.3 | -0.7 |
| 776 | Collège Samuel Paty (0942482M) | 5.4 | D | 4.1 | 0.5 | 11.6 |  | 81.8 | 7.9 | 7.5 | -0.5 |
| 776 | Collège Claude Monet (0950886X) | 5.4 | D | 0.5 | 0.8 | 14.8 |  | 70.7 | 8.3 | 2.7 | 0.3 |
| 787 | Collège Marx Dormoy (0752196E) | 5.3 | D | 2.6 | 1.6 | 11.6 |  | 78.8 | 8.9 | 3.3 | -0.3 |
| 787 | Collège Antoine Coysevox (0752319N) | 5.3 | D | 4.2 | 8.6 | 3 |  | 81.9 | 10.8 | -8 | -0.4 |
| 787 | Collège Honoré de Balzac (0771621U) | 5.3 | D | 3.2 | 4.5 | 8.1 |  | 80.1 | 9.9 | -3.7 | 0 |
| 787 | Collège Les Hautes Rayes (0781985J) | 5.3 | D | 3.4 | 9.1 | 3.5 |  | 80.5 | 10.9 | -9.7 | -0.3 |
| 787 | Collège Michel Vignaud (0910041A) | 5.3 | D | 5.7 | 6.5 | 3.8 |  | 84.2 | 10.4 | -5 | -0.5 |
| 787 | Collège Les Bons Raisins (0921234S) | 5.3 | D | 6 | 8.2 | 1.6 |  | 84.5 | 10.7 | -8 | -0.8 |
| 787 | Collège Vincent Van Gogh (0922595W) | 5.3 | D | 1.1 | 4.3 | 10.6 |  | 74 | 9.9 | -5 | 0.7 |
| 787 | Collège Nelson Mandela (0942499F) | 5.3 | D | 4.9 | 2.3 | 8.7 |  | 83 | 9.2 | 0.5 | -0.3 |
| 787 | Collège André Chénier (0950893E) | 5.3 | D | 4.7 | 2.3 | 8.8 |  | 82.7 | 9.2 | 0 | -0.3 |
| 787 | Collège Ariane (0952114G) | 5.3 | D | 3.7 | 3.3 | 9 |  | 81 | 9.6 | -2 | 0 |
| 797 | Collège Lucie Faure (0750550R) | 5.2 | D | 2 | 8.1 | 5.5 |  | 77.3 | 10.7 | -9.3 | 0 |
| 797 | Collège la Grange aux Belles (0753047E) | 5.2 | D | 5.1 | 9.8 | 0.7 |  | 83.3 | 11 | -9.3 | -1.1 |
| 797 | Collège Colette Besson (0755241P) | 5.2 | D | 3 | 5.5 | 7 |  | 79.7 | 10.2 | -4.3 | -0.1 |
| 797 | Collège Paul Éluard (0910776Z) | 5.2 | D | 3.8 | 0.8 | 10.9 |  | 81.3 | 8.3 | 4 | -0.4 |
| 797 | Collège Georges Pompidou (0911396Y) | 5.2 | D | 4 | 6.5 | 5.1 |  | 81.6 | 10.4 | -6.3 | -0.2 |
| 797 | Collège Jean Jaurès (0921391M) | 5.2 | D | 5.7 | 5.8 | 4 |  | 84.1 | 10.2 | -5 | -0.5 |
| 797 | Collège La Bussie (0951705M) | 5.2 | D | 4.6 | 9.9 | 1.1 |  | 82.6 | 11 | -10.7 | -0.8 |
| 804 | Collège Alberto Giacometti (0750445B) | 5.1 | D | 5 | 5.4 | 4.9 |  | 83.2 | 10.1 | -3.3 | -0.5 |
| 804 | Collège Georges Politzer (0771476L) | 5.1 | D | 1.4 | 3.3 | 10.6 |  | 75.3 | 9.6 | -3.7 | 0.5 |
| 804 | Collège Jules Verne (0780180X) | 5.1 | D | 2 | 0.6 | 12.8 |  | 77.3 | 8.1 | 4.3 | -0.2 |
| 804 | Collège Hubert Robert (0911403F) | 5.1 | D | 6 | 4 | 5.3 |  | 84.5 | 9.8 | -3 | -0.5 |
| 804 | Collège Aimé et Eugénie Cotton (0930884F) | 5.1 | D | 2.3 | 3 | 10.1 |  | 78.3 | 9.5 | -2 | 0.2 |
| 804 | Collège Pierre-André Houël (0931222Y) | 5.1 | D | 2.1 | 2.2 | 10.9 |  | 77.6 | 9.1 | -0.7 | 0.1 |
| 804 | Collège Victor Hugo (0931978V) | 5.1 | D | 4.9 | 2.4 | 7.9 |  | 83 | 9.2 | 0.3 | -0.5 |
| 804 | Collège Christiane Desroches Noblecourt (0941602F) | 5.1 | D | 0.7 | 4.5 | 10 |  | 72.3 | 9.9 | -6.7 | 0.8 |
| 804 | Collège Simone de Beauvoir (0942127B) | 5.1 | D | 3.2 | 2.5 | 9.5 |  | 80.1 | 9.3 | -1 | 0 |
| 804 | Collège Maximilien de Robespierre (0950026M) | 5.1 | D | 1.9 | 1.2 | 12.1 |  | 77 | 8.6 | 1.7 | 0 |
| 814 | Collège René Barthélémy (0770040A) | 5 | D | 1.7 | 2.7 | 10.7 |  | 76.3 | 9.4 | -2.3 | 0.3 |
| 814 | Collège Maryse Bastié (0780265P) | 5 | D | 3.6 | 10.5 | 0.8 |  | 81 | 11.1 | -12.3 | -0.9 |
| 814 | Collège Félix Esclangon (0910060W) | 5 | D | 4.1 | 4.3 | 6.6 |  | 81.8 | 9.9 | -3.3 | -0.2 |
| 814 | Collège Jean de Beaumont (0930043S) | 5 | D | 3 | 3.1 | 8.9 |  | 79.7 | 9.5 | -1.7 | -0.1 |
| 814 | Collège Jean-Jacques Rousseau (0931219V) | 5 | D | 2.4 | 4.1 | 8.4 |  | 78.4 | 9.8 | -2.7 | 0 |
| 814 | Collège Louis Pasteur (0931227D) | 5 | D | 4.7 | 6 | 4.3 |  | 82.6 | 10.3 | -5.3 | -0.4 |
| 814 | Collège Blaise Pascal (0951052C) | 5 | D | 6.2 | 7.3 | 1.6 |  | 84.7 | 10.5 | -8.3 | -0.7 |
| 814 | Collège Jacques Daguerre (0951099D) | 5 | D | 6.5 | 7.4 | 1.1 |  | 85.1 | 10.6 | -7.3 | -1.1 |
| 822 | Collège les Creusottes (0770057U) | 4.9 | D | 4.3 | 5.1 | 5.3 |  | 82.1 | 10.1 | -5 | -0.2 |
| 822 | Collège Nicolas Fouquet (0771620T) | 4.9 | D | 5.8 | 4.3 | 4.7 |  | 84.2 | 9.9 | -3.3 | -0.5 |
| 822 | Collège George Sand (0772247Z) | 4.9 | D | 4.9 | 6.8 | 2.9 |  | 83 | 10.4 | -7.3 | -0.5 |
| 822 | Collège Blaise Pascal (0910624J) | 4.9 | D | 3.3 | 0.6 | 10.8 |  | 80.3 | 8.1 | 5.3 | -0.6 |
| 822 | Collège Pablo Neruda (0911490A) | 4.9 | D | 7.1 | 2.7 | 4.8 |  | 85.9 | 9.4 | -1 | -1.3 |
| 822 | Collège Paul Éluard (0920880G) | 4.9 | D | 3.2 | 10 | 1.5 |  | 80.2 | 11.1 | -11.3 | -0.6 |
| 822 | Collège Elsa Triolet (0931230G) | 4.9 | D | 0.2 | 0.6 | 13.8 |  | 67.3 | 8.1 | 1 | 0.4 |
| 822 | Collège Henri IV (0932301W) | 4.9 | D | 4.1 | 5.4 | 5.3 |  | 81.7 | 10.1 | -5 | -0.2 |
| 822 | Collège Amédée Dunois (0940612E) | 4.9 | D | 5.3 | 4.6 | 4.8 |  | 83.6 | 9.9 | -5 | -0.3 |
| 822 | Collège Joseph Lakanal (0941034N) | 4.9 | D | 1.9 | 1.9 | 10.9 |  | 77.1 | 9 | -0.7 | 0.1 |
| 822 | Collège Rol-Tanguy (0941431V) | 4.9 | D | 3.5 | 5.5 | 5.7 |  | 80.7 | 10.2 | -6 | -0.1 |
| 822 | Collège Carnot (0950884V) | 4.9 | D | 4.2 | 2.4 | 8.1 |  | 81.9 | 9.2 | -0.3 | -0.3 |
| 834 | Collège Gérard Philipe (0771334G) | 4.8 | D | 3.8 | 7.1 | 3.4 |  | 81.3 | 10.5 | -8.3 | -0.4 |
| 834 | Collège Jean Campin (0771661M) | 4.8 | D | 4.1 | 3.5 | 6.7 |  | 81.8 | 9.7 | -3 | -0.2 |
| 834 | Collège Albert Camus (0911255V) | 4.8 | D | 5.2 | 7.9 | 1.4 |  | 83.5 | 10.7 | -8.7 | -0.8 |
| 834 | Collège Romain Rolland (0921168V) | 4.8 | D | 1.2 | 2.9 | 10.3 |  | 74.6 | 9.4 | -3.7 | 0.4 |
| 834 | Collège Anatole France (0930089S) | 4.8 | D | 1.8 | 2.1 | 10.6 |  | 76.8 | 9.1 | -0.7 | 0.1 |
| 834 | Collège Amédée Laplace (0940003T) | 4.8 | D | 2.2 | 2 | 10.1 |  | 78 | 9 | -0.3 | 0 |
| 834 | Collège Jean-François Clervoy (0952088D) | 4.8 | D | 1.7 | 4.4 | 8.2 |  | 76.3 | 9.9 | -5.7 | 0.2 |
| 841 | Collège Lucie Aubrac (0750465Y) | 4.7 | D | 3.7 | 10 | 0.3 |  | 81.1 | 11 | -12 | -1.2 |
| 841 | Collège Moreau (0910980W) | 4.7 | D | 6.9 | 2.1 | 5.2 |  | 85.5 | 9.1 | -1.3 | -0.8 |
| 841 | Collège Jean-Baptiste Clément (0921160L) | 4.7 | D | 2 | 2.9 | 9.2 |  | 77.2 | 9.5 | -3 | 0.1 |
| 841 | Collège Georges Pompidou (0921543C) | 4.7 | D | 2.1 | 1.3 | 10.6 |  | 77.5 | 8.6 | 1 | -0.1 |
| 841 | Collège Pablo Neruda (0930858C) | 4.7 | D | 4.6 | 4.7 | 4.8 |  | 82.5 | 10 | -4.7 | -0.4 |
| 841 | Collège Gabriel Péri (0931185H) | 4.7 | D | 1.6 | 0.4 | 12.1 |  | 75.8 | 7.9 | 5.3 | -0.3 |
| 841 | Collège Angela Davis (0931196V) | 4.7 | D | 1.2 | 0.7 | 12.2 |  | 74.8 | 8.3 | 2 | 0 |
| 841 | Collège Albert Schweitzer (0940006W) | 4.7 | D | 0.9 | 2.1 | 11.1 |  | 73.5 | 9.1 | -2.7 | 0.4 |
| 841 | Collège les Prunais (0941411Y) | 4.7 | D | 3.6 | 6.6 | 4 |  | 80.9 | 10.4 | -6.7 | -0.3 |
| 850 | Collège Aimé Césaire (0755433Y) | 4.6 | D | 0.5 | 5 | 8.2 |  | 71.2 | 10.1 | -10.3 | 0.5 |
| 850 | Collège Jacques Prévert (0771770F) | 4.6 | D | 6 | 3.9 | 4 |  | 84.5 | 9.8 | -3.7 | -0.6 |
| 850 | Collège Henri Wallon (0771960M) | 4.6 | D | 3.8 | 5 | 4.9 |  | 81.3 | 10.1 | -5.7 | -0.3 |
| 850 | Collège Jean Lurçat (0911025V) | 4.6 | D | 4 | 2.2 | 7.5 |  | 81.6 | 9.1 | -0.3 | -0.4 |
| 850 | Collège Romain Rolland (0931191P) | 4.6 | D | 4.2 | 4.2 | 5.4 |  | 82 | 9.9 | -4 | -0.3 |
| 850 | Collège Fabien (0931229F) | 4.6 | D | 0.8 | 1.5 | 11.6 |  | 72.5 | 8.8 | -1.7 | 0.4 |
| 850 | Collège Jean Jaurès (0931607S) | 4.6 | D | 0.6 | 3.8 | 9.5 |  | 71.7 | 9.8 | -8 | 0.7 |
| 850 | Collège Simone Veil (0932578X) | 4.6 | D | 4.4 | 4.6 | 4.8 |  | 82.2 | 9.9 | -4 | -0.4 |
| 850 | Collège Paul Vaillant-Couturier (0941299B) | 4.6 | D | 3.1 | 4.7 | 5.9 |  | 79.9 | 10 | -5 | -0.2 |
| 850 | Collège Robert Doisneau (0951142A) | 4.6 | D | 1.6 | 3.2 | 8.9 |  | 76 | 9.5 | -4.7 | 0.3 |
| 850 | Collège Maubuisson (0951400F) | 4.6 | D | 7.3 | 3.5 | 3.1 |  | 86 | 9.7 | -3.7 | -1 |
| 861 | Collège Pierre Mendès-France (0752198G) | 4.5 | D | 4.3 | 1 | 8.1 |  | 82.1 | 8.5 | 2.7 | -1 |
| 861 | Collège François Villon (0752544H) | 4.5 | D | 1.2 | 4.3 | 7.9 |  | 74.5 | 9.9 | -8 | 0.3 |
| 861 | Collège François Mauriac (0780254C) | 4.5 | D | 5.5 | 7.6 | 0.3 |  | 83.8 | 10.6 | -10.7 | -1.4 |
| 861 | Collège Magellan (0781986K) | 4.5 | D | 2.8 | 1.7 | 9 |  | 79.2 | 8.9 | 0 | -0.2 |
| 861 | Collège République (0931194T) | 4.5 | D | 0.6 | 1.5 | 11.4 |  | 71.5 | 8.8 | -1.7 | 0.3 |
| 861 | Collège Chantereine (0950943J) | 4.5 | D | 0.1 | 0.1 | 13.2 |  | 65.9 | 7 | 6.3 | -0.2 |
| 861 | Collège Henri Matisse (0952036X) | 4.5 | D | 0.2 | 1.8 | 11.4 |  | 66 | 8.9 | -4.3 | 0.9 |
| 868 | Collège Georges Braque (0752957G) | 4.4 | D | 2.9 | 8.8 | 1.6 |  | 79.7 | 10.8 | -9.7 | -0.7 |
| 868 | Collège Colette (0780258G) | 4.4 | D | 3.1 | 9.1 | 0.9 |  | 80 | 10.9 | -11.7 | -0.8 |
| 868 | Collège La Vaucouleurs (0780569V) | 4.4 | D | 2.7 | 5.7 | 4.9 |  | 79.2 | 10.2 | -8.3 | -0.1 |
| 868 | Collège Édouard Manet (0921159K) | 4.4 | D | 2.5 | 1 | 9.6 |  | 78.6 | 8.5 | 1.3 | -0.3 |
| 868 | Collège Les Champs Philippe (0922645A) | 4.4 | D | 4.1 | 8.7 | 0.3 |  | 81.9 | 10.8 | -11.7 | -1.4 |
| 868 | Collège Jean Lurçat (0930865K) | 4.4 | D | 0.2 | 0.4 | 12.7 |  | 66.4 | 7.8 | 1.3 | 0.1 |
| 868 | Collège Lucie Aubrac (0932334G) | 4.4 | D | 0.4 | 0.9 | 12 |  | 69.8 | 8.4 | -0.3 | 0.3 |
| 868 | Collège Françoise Héritier (0932725G) | 4.4 | D | 1.7 | 2.3 | 9.2 |  | 76.5 | 9.2 | -2 | 0 |
| 868 | Collège Roland Garros (0940749D) | 4.4 | D | 0.4 | 0.9 | 12 |  | 69.8 | 8.4 | -0.3 | 0.3 |
| 868 | Collège André Malraux (0951354F) | 4.4 | D | 1.4 | 4.2 | 7.6 |  | 75.3 | 9.8 | -7.3 | 0.2 |
| 868 | Collège Louis Aragon (0951800R) | 4.4 | D | 2.1 | 2.9 | 8.1 |  | 77.5 | 9.5 | -4 | 0.1 |
| 868 | Collège Léonard de Vinci (0951822P) | 4.4 | D | 4 | 6.6 | 2.6 |  | 81.6 | 10.4 | -6.7 | -0.6 |
| 880 | Collège Jean Moulin (0911152H) | 4.3 | D | 2.8 | 4.7 | 5.4 |  | 79.3 | 10 | -6.7 | -0.1 |
| 880 | Collège Sonia Delaunay (0912196T) | 4.3 | D | 1.7 | 0.5 | 10.8 |  | 76.3 | 8 | 3.3 | -0.4 |
| 880 | Collège Pierre et Marie Curie (0940625U) | 4.3 | D | 2.7 | 3.7 | 6.5 |  | 79.1 | 9.7 | -4.7 | -0.1 |
| 880 | Collège Les Touleuses (0950937C) | 4.3 | D | 4.6 | 4.5 | 3.9 |  | 82.5 | 9.9 | -4.3 | -0.6 |
| 880 | Collège Sainte-Apolline (0951724H) | 4.3 | D | 5.5 | 7 | 0.5 |  | 83.8 | 10.5 | -9.7 | -1.3 |
| 885 | Collège Elsa Triolet (0771337K) | 4.2 | D | 1.8 | 2.6 | 8.2 |  | 76.6 | 9.3 | -3.3 | 0 |
| 885 | Collège Georges Brassens (0771993Y) | 4.2 | D | 4.4 | 4.5 | 3.8 |  | 82.2 | 9.9 | -6 | -0.4 |
| 885 | Collège Jean Wiener (0772090D) | 4.2 | D | 2.4 | 4.5 | 5.6 |  | 78.4 | 9.9 | -6.3 | -0.1 |
| 885 | Collège La Fosse aux Dames (0780760C) | 4.2 | D | 2.5 | 7.8 | 2.2 |  | 78.6 | 10.6 | -11.3 | -0.5 |
| 885 | Collège Les Nénuphars (0781862A) | 4.2 | D | 3.6 | 7.8 | 1.3 |  | 80.9 | 10.6 | -11.7 | -0.7 |
| 885 | Collège Jean Jaurès (0783358B) | 4.2 | D | 6 | 4.1 | 2.4 |  | 84.5 | 9.8 | -4.3 | -1.1 |
| 885 | Collège Léonard de Vinci (0921179G) | 4.2 | D | 2.5 | 3 | 7.2 |  | 78.6 | 9.5 | -3.3 | -0.1 |
| 885 | Collège Saint-Gabriel (0921903U) | 4.2 | D | 6 | 1.9 | 4.7 |  | 84.5 | 9 | -1.7 | -0.9 |
| 885 | Collège René Descartes (0931497X) | 4.2 | D | 1.8 | 2 | 8.9 |  | 76.6 | 9 | -1.7 | -0.1 |
| 885 | Collège Louis Pasteur (0941037S) | 4.2 | D | 1.7 | 2.5 | 8.5 |  | 76.3 | 9.3 | -3 | 0 |
| 885 | Collège Émilie du Châtelet (0952140K) | 4.2 | D | 2.6 | 4.4 | 5.7 |  | 78.9 | 9.9 | -5.7 | -0.1 |
| 896 | Collège les Tournelles (0770059W) | 4.1 | D | 5 | 3.7 | 3.5 |  | 83.1 | 9.7 | -4.7 | -0.6 |
| 896 | Collège de l'Europe (0772190M) | 4.1 | D | 1.1 | 6.7 | 4.6 |  | 74 | 10.4 | -15 | -0.1 |
| 896 | Collège Voltaire (0921547G) | 4.1 | D | 3.6 | 3.3 | 5.4 |  | 80.9 | 9.6 | -3.7 | -0.4 |
| 896 | Collège Georges Braque (0931485J) | 4.1 | D | 1.5 | 0.4 | 10.4 |  | 75.6 | 7.9 | 5.5 | -0.7 |
| 896 | Collège Léon Blum (0950939E) | 4.1 | D | 1 | 0.3 | 11.1 |  | 73.6 | 7.5 | 5.3 | -0.5 |
| 896 | Collège Rosa Bonheur (0952079U) | 4.1 | D | 3.7 | 6 | 2.7 |  | 81 | 10.3 | -9 | -0.5 |
| 902 | Collège Louis Pergaud (0780419G) | 4 | D | 5.4 | 4.9 | 1.8 |  | 83.7 | 10 | -6 | -0.9 |
| 902 | Collège Bellevue (0910979V) | 4 | D | 5.3 | 5.1 | 1.6 |  | 83.6 | 10.1 | -6.7 | -0.9 |
| 902 | Collège André Malraux (0921545E) | 4 | D | 2.5 | 1.7 | 7.7 |  | 78.6 | 8.9 | -1.3 | -0.3 |
| 902 | Collège Henri-Georges Adam (0921868F) | 4 | D | 4 | 5.1 | 3 |  | 81.6 | 10.1 | -5.7 | -0.6 |
| 902 | Collège Pierre de Ronsard (0931149U) | 4 | D | 3.8 | 2.2 | 6.1 |  | 81.3 | 9.1 | -2 | -0.5 |
| 902 | Collège Paul Langevin (0941021Z) | 4 | D | 1.1 | 2.9 | 8 |  | 74.2 | 9.4 | -6 | 0.2 |
| 902 | Collège Albert Camus (0941221S) | 4 | D | 4.5 | 5.9 | 1.6 |  | 82.3 | 10.2 | -8 | -0.8 |
| 909 | Collège Les Prés (0781818C) | 3.9 | E | 3.5 | 7.9 | 0.4 |  | 80.7 | 10.7 | -12.7 | -1.1 |
| 909 | Collège de Gassicourt (0781955B) | 3.9 | E | 2.4 | 0.4 | 9 |  | 78.4 | 7.9 | 4 | -1 |
| 909 | Collège Louise Michel (0911024U) | 3.9 | E | 1.5 | 0.3 | 10 |  | 75.6 | 7.6 | 3.3 | -0.5 |
| 909 | Collège Éric Tabarly (0930100D) | 3.9 | E | 3.7 | 5.2 | 2.8 |  | 81.1 | 10.1 | -7 | -0.5 |
| 909 | Collège Victor Hugo (0930891N) | 3.9 | E | 0.4 | 0.5 | 10.8 |  | 70.2 | 8 | 1 | -0.1 |
| 909 | Collège Gustave Courbet (0931223Z) | 3.9 | E | 0.8 | 0.6 | 10.2 |  | 73 | 8.1 | 1 | -0.2 |
| 909 | Collège Pierre de Geyter (0931231H) | 3.9 | E | 0.6 | 1.3 | 9.9 |  | 71.3 | 8.7 | -2.3 | 0.2 |
| 909 | Collège Robert Desnos (0941044Z) | 3.9 | E | 1.2 | 2.3 | 8.3 |  | 74.5 | 9.2 | -4.3 | 0.1 |
| 909 | Collège des Hautiers (0950936B) | 3.9 | E | 4.3 | 7 | 0.3 |  | 82.1 | 10.5 | -12.3 | -1.2 |
| 909 | Collège Voltaire (0951196J) | 3.9 | E | 0.5 | 0.7 | 10.6 |  | 71 | 8.2 | 0.3 | 0 |
| 909 | Collège La Justice (0951401G) | 3.9 | E | 1.5 | 1.1 | 9.1 |  | 75.5 | 8.5 | 0.3 | -0.3 |
| 909 | Collège Montaigne (0951921X) | 3.9 | E | 3.6 | 0.7 | 7.5 |  | 80.8 | 8.2 | 1.7 | -0.9 |
| 921 | Collège Hector Berlioz (0752252R) | 3.8 | E | 2.7 | 3.6 | 5.1 |  | 79 | 9.7 | -3 | -0.5 |
| 921 | Collège Camille Claudel (0752694W) | 3.8 | E | 0.4 | 5.9 | 5.1 |  | 70.4 | 10.2 | -13.3 | 0 |
| 921 | Collège Camille Corot (0770013W) | 3.8 | E | 1.3 | 3.8 | 6.3 |  | 75 | 9.7 | -8 | 0.1 |
| 921 | Collège Jules Ferry (0780708W) | 3.8 | E | 4.4 | 5.1 | 1.8 |  | 82.2 | 10.1 | -7.3 | -0.8 |
| 921 | Collège Charles Péguy (0911340M) | 3.8 | E | 4.5 | 5.4 | 1.5 |  | 82.3 | 10.1 | -8 | -0.8 |
| 921 | Collège Marais de Villiers (0931211L) | 3.8 | E | 2.7 | 1 | 7.8 |  | 79.1 | 8.5 | 1 | -0.6 |
| 921 | Collège Jean Zay (0931612X) | 3.8 | E | 0.7 | 0.2 | 10.4 |  | 71.8 | 7.5 | 3.7 | -0.5 |
| 921 | Collège Henri Sellier (0931788N) | 3.8 | E | 0.6 | 0.9 | 9.9 |  | 71.4 | 8.4 | -2 | 0.1 |
| 921 | Collège François Mauriac (0950908W) | 3.8 | E | 4.3 | 1.6 | 5.5 |  | 82 | 8.8 | -0.7 | -0.9 |
| 921 | Collège Nicolas Copernic (0951141Z) | 3.8 | E | 4.4 | 2 | 5.1 |  | 82.1 | 9.1 | -1.3 | -0.8 |
| 921 | Collège Anna de Noailles (0951357J) | 3.8 | E | 4.6 | 6.1 | 0.6 |  | 82.5 | 10.3 | -9.7 | -1.1 |
| 921 | Collège Maurice Utrillo (0951909J) | 3.8 | E | 2.5 | 4.3 | 4.5 |  | 78.7 | 9.9 | -6 | -0.3 |
| 933 | Collège Edmond Michelet (0753345D) | 3.7 | E | 1.4 | 3.8 | 5.9 |  | 75.2 | 9.7 | -9.3 | 0 |
| 933 | Collège Louis Armand (0771518G) | 3.7 | E | 1.5 | 2.7 | 7 |  | 75.5 | 9.4 | -4.7 | 0 |
| 933 | Collège Montaigne (0780183A) | 3.7 | E | 3.9 | 6.3 | 0.9 |  | 81.4 | 10.3 | -9.3 | -1 |
| 933 | Collège Rosa Luxemburg (0911754M) | 3.7 | E | 3.7 | 4.8 | 2.5 |  | 81.1 | 10 | -7 | -0.6 |
| 933 | Collège Paul Éluard (0911865H) | 3.7 | E | 3.6 | 1.2 | 6.3 |  | 80.9 | 8.6 | 0 | -0.8 |
| 933 | Collège Jean Jaurès (0931712F) | 3.7 | E | 3.5 | 5.8 | 1.8 |  | 80.7 | 10.2 | -7 | -0.8 |
| 933 | Collège Pierre Brossolette (0931860S) | 3.7 | E | 0.5 | 0.9 | 9.8 |  | 71.1 | 8.4 | -1.7 | 0.1 |
| 933 | Collège Lucie Aubrac (0940786U) | 3.7 | E | 0.7 | 3 | 7.5 |  | 71.8 | 9.5 | -8.3 | 0.3 |
| 941 | Collège Arthur Chaussy (0771363N) | 3.6 | E | 3.5 | 5.3 | 1.9 |  | 80.7 | 10.1 | -8.3 | -0.6 |
| 941 | Collège Le Rondeau (0780846W) | 3.6 | E | 3.1 | 7.3 | 0.5 |  | 80 | 10.5 | -12.7 | -1 |
| 941 | Collège Pablo Picasso (0911029Z) | 3.6 | E | 5.2 | 4.5 | 1.2 |  | 83.4 | 9.9 | -7 | -1.1 |
| 941 | Collège André Doucet (0921394R) | 3.6 | E | 2.7 | 1.4 | 6.6 |  | 79 | 8.7 | -0.7 | -0.6 |
| 941 | Collège Georges Politzer (0931209J) | 3.6 | E | 1 | 0.2 | 9.5 |  | 73.6 | 7.1 | 4.7 | -0.9 |
| 941 | Collège Jules Ferry (0941024C) | 3.6 | E | 0.3 | 3.1 | 7.4 |  | 68.3 | 9.5 | -10 | 0.3 |
| 941 | Collège Albert Cron (0941679P) | 3.6 | E | 2.4 | 2.7 | 5.6 |  | 78.4 | 9.4 | -4.7 | -0.2 |
| 941 | Collège Henri Wallon (0950023J) | 3.6 | E | 0.8 | 0.3 | 9.7 |  | 72.5 | 7.6 | 2.7 | -0.5 |
| 941 | Collège L'Ardillière de Nézant (0950931W) | 3.6 | E | 3.6 | 3.8 | 3.3 |  | 80.9 | 9.8 | -5 | -0.6 |
| 950 | Collège Robert Doisneau (0770019C) | 3.5 | E | 0.8 | 3.2 | 6.4 |  | 72.7 | 9.6 | -8.7 | 0.1 |
| 950 | Collège La Rochefoucauld (0770024H) | 3.5 | E | 2.4 | 4.4 | 3.8 |  | 78.5 | 9.9 | -9.3 | -0.3 |
| 950 | Collège Émile Zola (0780845V) | 3.5 | E | 4.2 | 4.8 | 1.4 |  | 82 | 10 | -8 | -0.9 |
| 950 | Collège Ariane (0783378Y) | 3.5 | E | 4.2 | 4.5 | 1.9 |  | 81.9 | 9.9 | -7 | -0.8 |
| 950 | Collège Wolfgang Amadeus Mozart (0910025H) | 3.5 | E | 1.7 | 3 | 5.8 |  | 76.4 | 9.5 | -7.3 | 0 |
| 950 | Collège Jean Perrin (0920077J) | 3.5 | E | 5.4 | 3.3 | 1.9 |  | 83.7 | 9.6 | -5.7 | -1 |
| 950 | Collège Henri Barbusse (0921631Y) | 3.5 | E | 2.8 | 1.8 | 5.8 |  | 79.4 | 8.9 | -2.7 | -0.4 |
| 950 | Collège Travail Langevin (0931220W) | 3.5 | E | 0.6 | 0.8 | 9.1 |  | 71.5 | 8.3 | -1 | -0.1 |
| 950 | Collège Claude Monet (0951102G) | 3.5 | E | 5 | 4.7 | 0.9 |  | 83 | 10 | -8.3 | -1.1 |
| 950 | Collège Henri Guillaumet (0951527U) | 3.5 | E | 3.2 | 5.9 | 1.3 |  | 80.1 | 10.3 | -9.7 | -0.8 |
| 950 | Collège Gérard Philipe (0951617S) | 3.5 | E | 4 | 1.3 | 5.1 |  | 81.6 | 8.7 | -1.3 | -0.9 |
| 950 | Collège Jacques-Yves Cousteau (0951725J) | 3.5 | E | 3.9 | 4.7 | 2 |  | 81.3 | 10 | -7.7 | -0.7 |
| 950 | Collège François Truffaut (0951920W) | 3.5 | E | 2 | 1.1 | 7.4 |  | 77.4 | 8.6 | -0.7 | -0.4 |
| 963 | Collège Jean Baptiste Clément (0750478M) | 3.4 | E | 2.4 | 4.2 | 3.5 |  | 78.5 | 9.9 | -5.7 | -0.5 |
| 963 | Collège Léon Gambetta (0752696Y) | 3.4 | E | 3.9 | 3.6 | 2.6 |  | 81.5 | 9.7 | -5 | -0.8 |
| 963 | Collège le Luzard (0771841H) | 3.4 | E | 0.9 | 2.6 | 6.6 |  | 73.4 | 9.3 | -5.3 | 0 |
| 963 | Collège Paul Verlaine (0780572Y) | 3.4 | E | 0.1 | 1.2 | 8.9 |  | 64 | 8.6 | -7.5 | 0.5 |
| 963 | Collège Léonard de Vinci (0781915H) | 3.4 | E | 5.4 | 3.9 | 1 |  | 83.7 | 9.8 | -7.3 | -1.3 |
| 963 | Collège Paul Fort (0911250P) | 3.4 | E | 0.9 | 3.8 | 5.5 |  | 73.2 | 9.8 | -9.3 | 0 |
| 963 | Collège Pablo Picasso (0931707A) | 3.4 | E | 0.8 | 2.2 | 7.2 |  | 72.6 | 9.1 | -7 | 0.2 |
| 963 | Collège Nicolas Boileau (0940787V) | 3.4 | E | 0.7 | 1.6 | 8 |  | 72.1 | 8.9 | -4.3 | 0.1 |
| 963 | Collège Émile Zola (0941040V) | 3.4 | E | 0.7 | 2.5 | 7.1 |  | 72.3 | 9.2 | -6.3 | 0.1 |
| 963 | Collège Jean Macé (0941296Y) | 3.4 | E | 1 | 2.3 | 6.9 |  | 73.9 | 9.2 | -5.3 | 0 |
| 973 | Collège Marie Curie (0754706H) | 3.3 | E | 1.8 | 5.5 | 2.5 |  | 76.7 | 10.2 | -9 | -0.5 |
| 973 | Collège Daniel Mayer (0755030K) | 3.3 | E | 1.1 | 0.3 | 8.5 |  | 74.3 | 7.5 | 2.7 | -0.8 |
| 973 | Collège Philippe de Champaigne (0780512H) | 3.3 | E | 2.5 | 5.9 | 1.6 |  | 78.7 | 10.2 | -10 | -0.7 |
| 973 | Collège Michel-Richard Delalande (0911027X) | 3.3 | E | 1.7 | 0.4 | 7.7 |  | 76.3 | 7.9 | 1.7 | -0.8 |
| 973 | Collège Charles Péguy (0911488Y) | 3.3 | E | 4 | 2.5 | 3.5 |  | 81.6 | 9.2 | -3.3 | -0.9 |
| 973 | Collège Léonard de Vinci (0911574S) | 3.3 | E | 5.1 | 4.2 | 0.7 |  | 83.3 | 9.9 | -8.3 | -1.5 |
| 973 | Collège Évariste Galois (0931190N) | 3.3 | E | 0.2 | 0.5 | 9.3 |  | 67.8 | 8 | -1.3 | 0 |
| 973 | Collège La Bruyère (0951403J) | 3.3 | E | 2.2 | 4.1 | 3.7 |  | 78 | 9.8 | -7 | -0.4 |
| 973 | Collège des Toupets (0951636M) | 3.3 | E | 2.9 | 4.7 | 2.2 |  | 79.5 | 10 | -7 | -0.7 |
| 973 | Collège Victor Hugo (0951945Y) | 3.3 | E | 0.8 | 0.7 | 8.5 |  | 72.9 | 8.2 | -1 | -0.2 |
| 973 | Collège Caroline Aigle (0952282P) | 3.3 | E | 2.8 | 0.5 | 6.5 |  | 79.4 | 8.1 | 1 | -1.2 |
| 984 | Collège Louis Aragon (0771991W) | 3.2 | E | 1.5 | 1.6 | 6.5 |  | 75.6 | 8.9 | -4 | -0.2 |
| 984 | Collège Victor Hugo (0780036R) | 3.2 | E | 3.3 | 3.8 | 2.5 |  | 80.3 | 9.8 | -7 | -0.6 |
| 984 | Collège de Clagny (0781298M) | 3.2 | E | 2.3 | 6.9 | 0.3 |  | 78 | 10.5 | -13.3 | -1.1 |
| 984 | Collège Chantemerle (0910752Y) | 3.2 | E | 2.4 | 1.4 | 5.9 |  | 78.4 | 8.7 | -0.7 | -0.7 |
| 984 | Collège La Nacelle (0911443Z) | 3.2 | E | 0.8 | 0.8 | 8 |  | 72.9 | 8.3 | -1.3 | -0.2 |
| 984 | Collège Claude-Nicolas Ledoux (0920883K) | 3.2 | E | 1.8 | 6.6 | 1.1 |  | 76.8 | 10.4 | -15 | -0.7 |
| 984 | Collège Gisèle Halimi (0932694Y) | 3.2 | E | 0.4 | 0.5 | 8.8 |  | 70.1 | 8 | 0 | -0.3 |
| 991 | Collège George Sand (0781098V) | 3.1 | E | 1.8 | 5.2 | 2.2 |  | 76.8 | 10.1 | -11 | -0.5 |
| 991 | Collège Le Saussay (0910773W) | 3.1 | E | 3.9 | 4.3 | 1.2 |  | 81.5 | 9.9 | -8 | -0.9 |
| 991 | Collège Denis Diderot (0911031B) | 3.1 | E | 4.7 | 2.6 | 1.9 |  | 82.6 | 9.3 | -5 | -1.5 |
| 991 | Collège Émile Auvray (0911940P) | 3.1 | E | 4.3 | 4.2 | 0.8 |  | 82 | 9.9 | -8.3 | -1.1 |
| 991 | Collège Les Chènevreux (0921353W) | 3.1 | E | 3.9 | 3.3 | 2 |  | 81.4 | 9.6 | -6 | -0.9 |
| 991 | Collège Jacques Prévert (0931610V) | 3.1 | E | 2.8 | 1.5 | 5.1 |  | 79.3 | 8.8 | -2.3 | -0.6 |
| 991 | Collège Jean Moulin (0950722U) | 3.1 | E | 3.1 | 1.5 | 4.8 |  | 80 | 8.8 | -2.7 | -0.6 |
| 991 | Collège Irène Joliot-Curie (0950885W) | 3.1 | E | 2 | 1.1 | 6.1 |  | 77.2 | 8.5 | -1.3 | -0.6 |
| 991 | Collège Épine Guyon (0951100E) | 3.1 | E | 2.1 | 4.6 | 2.7 |  | 77.5 | 9.9 | -10 | -0.4 |
| 1000 | Collège Sonia Delaunay (0750575T) | 3 | E | 1.5 | 2.1 | 5.4 |  | 75.7 | 9.1 | -3.7 | -0.4 |
| 1000 | Collège Madame de La Fayette (0771760V) | 3 | E | 1.3 | 2.4 | 5.4 |  | 74.9 | 9.2 | -5.7 | -0.2 |
| 1000 | Collège Saint-Louis (0772128V) | 3 | E | 2.7 | 4.1 | 2.3 |  | 79.1 | 9.8 | -8 | -0.6 |
| 1000 | Collège La Tuilerie (0911341N) | 3 | E | 5.4 | 2.7 | 0.9 |  | 83.8 | 9.4 | -7.3 | -1.7 |
| 1000 | Collège Paul Fort (0911345T) | 3 | E | 3 | 4.1 | 2 |  | 79.9 | 9.8 | -8 | -0.7 |
| 1000 | Collège Jean Rostand (0911404G) | 3 | E | 3.1 | 5.4 | 0.5 |  | 79.9 | 10.1 | -11 | -1.1 |
| 1000 | Collège Madame de Sévigné (0930898W) | 3 | E | 3.5 | 3.1 | 2.5 |  | 80.7 | 9.5 | -5.7 | -0.7 |
| 1000 | Collège Jean-Baptiste Clément (0931376R) | 3 | E | 0.2 | 1.6 | 7.2 |  | 66.2 | 8.9 | -7.7 | 0.2 |
| 1000 | Collège Jean Moulin (0940581W) | 3 | E | 2.5 | 1.9 | 4.6 |  | 78.6 | 9 | -4.3 | -0.4 |
| 1000 | Collège Ozar Hatorah Garçons (0941942A) | 3 | E | 1.7 | 2.3 | 4.9 |  | 76.1 | 9.2 | -7.3 | -0.2 |
| 1000 | Collège des Merisiers (0951801S) | 3 | E | 3.1 | 3.4 | 2.4 |  | 79.9 | 9.6 | -6.3 | -0.7 |
| 1011 | Collège Louis Paulhan (0783463R) | 2.9 | E | 1.2 | 3.4 | 4 |  | 74.6 | 9.6 | -9 | -0.2 |
| 1011 | Collège Gérard Philipe (0910859P) | 2.9 | E | 2.7 | 3.5 | 2.6 |  | 79.1 | 9.6 | -6.3 | -0.6 |
| 1011 | Collège Évariste Galois (0921589C) | 2.9 | E | 2.5 | 0.3 | 5.8 |  | 78.6 | 7.6 | 0.3 | -1.4 |
| 1011 | Collège Daniel Fery (0941783C) | 2.9 | E | 1.2 | 4.3 | 3.3 |  | 74.5 | 9.9 | -12.3 | -0.3 |
| 1011 | Collège Antoine de Saint-Exupéry (0950739M) | 2.9 | E | 0.7 | 2.1 | 5.8 |  | 72 | 9.1 | -7.3 | 0 |
| 1016 | Collège Benjamin Franklin (0780656P) | 2.8 | E | 2 | 6.1 | 0.3 |  | 77.2 | 10.3 | -14.3 | -1.1 |
| 1016 | Collège Sédar Senghor (0911570M) | 2.8 | E | 0.8 | 0.5 | 7.2 |  | 72.8 | 8 | -1 | -0.4 |
| 1016 | Collège Jules Michelet (0931144N) | 2.8 | E | 1.3 | 0.8 | 6.4 |  | 74.8 | 8.3 | -1 | -0.5 |
| 1016 | Collège Jean Perrin (0941033M) | 2.8 | E | 1 | 1.2 | 6.3 |  | 73.8 | 8.6 | -4 | -0.2 |
| 1016 | Collège Georges Brassens (0951197K) | 2.8 | E | 3.2 | 3.6 | 1.7 |  | 80.1 | 9.7 | -7.7 | -0.8 |
| 1021 | Collège Flora Tristan (0753046D) | 2.7 | E | 3.3 | 3.7 | 1.1 |  | 80.3 | 9.7 | -7.3 | -1.2 |
| 1021 | Collège Fréderic Chopin (0771070V) | 2.7 | E | 0.9 | 0.8 | 6.4 |  | 73.2 | 8.3 | -2.3 | -0.4 |
| 1021 | Collège Marie-Amélie Le Fur (0772944G) | 2.7 | E | 3.7 | 3.6 | 0.7 |  | 81 | 9.7 | -9 | -1.1 |
| 1021 | Collège Jean Racine (0780186D) | 2.7 | E | 1.3 | 5.7 | 1.2 |  | 75 | 10.2 | -14 | -0.7 |
| 1021 | Collège Condorcet (0911491B) | 2.7 | E | 3.2 | 4.5 | 0.3 |  | 80.1 | 9.9 | -11 | -1.6 |
| 1021 | Collège Pierre Curie (0931005M) | 2.7 | E | 0.9 | 1.2 | 6.1 |  | 73.2 | 8.6 | -3.7 | -0.3 |
| 1021 | Collège Henri Wallon (0931709C) | 2.7 | E | 0.3 | 0.3 | 7.6 |  | 69.4 | 7.7 | -0.7 | -0.4 |
| 1021 | Collège Henri Wallon (0950888Z) | 2.7 | E | 0.9 | 1.3 | 5.8 |  | 73.1 | 8.7 | -4 | -0.3 |
| 1021 | Collège Lucie Aubrac (0951356H) | 2.7 | E | 0.9 | 1.2 | 6.1 |  | 73.2 | 8.6 | -3 | -0.3 |
| 1030 | Collège Paul Éluard (0911039K) | 2.6 | E | 2.8 | 2.2 | 2.7 |  | 79.3 | 9.1 | -5 | -0.8 |
| 1030 | Collège Marie Curie (0911150F) | 2.6 | E | 3.8 | 2.5 | 1.6 |  | 81.2 | 9.2 | -6 | -1.1 |
| 1030 | Collège Gay-Lussac (0921494Z) | 2.6 | E | 1.9 | 1.5 | 4.4 |  | 76.9 | 8.8 | -2.7 | -0.7 |
| 1030 | Collège Oum Kalthoum (0931212M) | 2.6 | E | 0.3 | 0.6 | 7 |  | 68.7 | 8.1 | -2.7 | -0.2 |
| 1030 | Collège Jean Perrin (0940022N) | 2.6 | E | 1.8 | 1.9 | 4 |  | 76.7 | 9 | -4.7 | -0.5 |
| 1030 | Collège Léon Blum (0941022A) | 2.6 | E | 1.3 | 4.3 | 2.2 |  | 74.8 | 9.9 | -11.3 | -0.5 |
| 1030 | Collège Évariste Galois (0950045H) | 2.6 | E | 0.1 | 0.4 | 7.4 |  | 65.6 | 7.9 | -4 | 0 |
| 1030 | Collège Nicolas Flamel (0950896H) | 2.6 | E | 2.5 | 1.1 | 4.3 |  | 78.7 | 8.5 | -2.3 | -0.9 |
| 1038 | Collège Jean Perrin (0753939Z) | 2.5 | E | 0.5 | 1.6 | 5.3 |  | 71.2 | 8.8 | -6.3 | -0.2 |
| 1038 | Collège Jean Jaurès (0770005M) | 2.5 | E | 2.2 | 3.3 | 1.9 |  | 77.9 | 9.6 | -7.7 | -0.7 |
| 1038 | Collège Pierre Roux (0770010T) | 2.5 | E | 2.1 | 3.5 | 1.9 |  | 77.6 | 9.6 | -9 | -0.6 |
| 1038 | Collège Hubert Germain (0911256W) | 2.5 | E | 1.2 | 5.6 | 0.6 |  | 74.5 | 10.2 | -16.7 | -0.9 |
| 1038 | Collège La Vallée (0911397Z) | 2.5 | E | 1.5 | 0.3 | 5.8 |  | 75.7 | 7.6 | 0 | -1 |
| 1038 | Collège Montesquieu (0911444A) | 2.5 | E | 0 | 1.1 | 6.5 |  | 60.7 | 8.5 | -10 | 0.2 |
| 1038 | Collège Moulin Joly (0920592U) | 2.5 | E | 0.4 | 2.5 | 4.7 |  | 69.8 | 9.3 | -9 | -0.2 |
| 1038 | Collège Jean Jaurès (0921623P) | 2.5 | E | 0.6 | 1.3 | 5.7 |  | 71.6 | 8.7 | -5.3 | -0.2 |
| 1038 | Collège Les Mousseaux (0931192R) | 2.5 | E | 1.5 | 1 | 5.1 |  | 75.7 | 8.5 | -3 | -0.5 |
| 1038 | Collège Camille Claudel (0951154N) | 2.5 | E | 0.9 | 3.7 | 3 |  | 73.3 | 9.7 | -12.7 | -0.3 |
| 1038 | Collège Isabelle Autissier (0952205F) | 2.5 | E | 2.6 | 4.6 | 0.2 |  | 78.8 | 10 | -13 | -1.4 |
| 1049 | Collège Gérard Philipe (0752195D) | 2.4 | E | 2.7 | 2.8 | 1.8 |  | 79.1 | 9.4 | -7.3 | -0.8 |
| 1049 | Collège Marie Laurencin (0772293Z) | 2.4 | E | 3 | 3.2 | 0.9 |  | 79.8 | 9.6 | -8.7 | -1 |
| 1049 | Collège Albert Thierry (0780255D) | 2.4 | E | 1.5 | 0.4 | 5.3 |  | 75.8 | 7.9 | -1 | -0.9 |
| 1049 | Collège Clemenceau (0781977A) | 2.4 | E | 0.4 | 0.9 | 5.8 |  | 70.5 | 8.4 | -4 | -0.3 |
| 1049 | Collège Jean Zay (0910042B) | 2.4 | E | 1.7 | 4 | 1.4 |  | 76.2 | 9.8 | -10.3 | -0.7 |
| 1049 | Collège Paul Vaillant-Couturier (0951094Y) | 2.4 | E | 1.4 | 1 | 4.8 |  | 75.3 | 8.5 | -3.3 | -0.5 |
| 1055 | Collège Suzanne Lacore Paris Nord Est (0755747P) | 2.3 | E | 2.6 | 2.5 | 1.7 |  | 79 | 9.3 | -7.3 | -0.8 |
| 1055 | Collège Jean Zay (0780267S) | 2.3 | E | 1.1 | 4.4 | 1.4 |  | 74.4 | 9.9 | -12 | -0.7 |
| 1055 | Collège Camille du Gast (0783636D) | 2.3 | E | 1.8 | 2.1 | 3.1 |  | 76.6 | 9.1 | -6.7 | -0.5 |
| 1055 | Collège Adolphe Chérioux (0940042K) | 2.3 | E | 2.1 | 1.5 | 3.4 |  | 77.6 | 8.8 | -4 | -0.8 |
| 1055 | Collège Elsa Triolet (0941092B) | 2.3 | E | 0.2 | 0.7 | 6.1 |  | 67.7 | 8.2 | -5 | -0.1 |
| 1055 | Collège Saint-Exupéry (0950749Y) | 2.3 | E | 0.3 | 0.2 | 6.3 |  | 69.2 | 7.1 | 0.3 | -0.9 |
| 1055 | Collège Albert Schweitzer (0951352D) | 2.3 | E | 1.2 | 4 | 1.7 |  | 74.6 | 9.8 | -12.7 | -0.6 |
| 1055 | Collège Martin Luther King (0951993A) | 2.3 | E | 0.3 | 0.6 | 6 |  | 69 | 8.1 | -3.3 | -0.3 |
| 1063 | Collège le Champivert (0772246Y) | 2.2 | E | 3.6 | 1.8 | 1.3 |  | 80.9 | 8.9 | -6.7 | -1.2 |
| 1063 | Collège Arthur Rimbaud (0780506B) | 2.2 | E | 1.8 | 3.1 | 1.6 |  | 76.6 | 9.5 | -8.7 | -0.7 |
| 1063 | Collège Les Sablons (0910971L) | 2.2 | E | 1 | 1 | 4.6 |  | 73.7 | 8.5 | -4 | -0.5 |
| 1063 | Collège Jean Macé (0921228K) | 2.2 | E | 1.2 | 2.9 | 2.5 |  | 74.4 | 9.4 | -10 | -0.5 |
| 1063 | Collège Le Parc (0950039B) | 2.2 | E | 0.8 | 1.3 | 4.4 |  | 72.9 | 8.7 | -5.3 | -0.4 |
| 1063 | Collège Albert Camus (0951139X) | 2.2 | E | 1.5 | 1.5 | 3.7 |  | 75.7 | 8.8 | -5.3 | -0.5 |
| 1063 | Collège Les Explorateurs (0951964U) | 2.2 | E | 0.9 | 3 | 2.7 |  | 73 | 9.5 | -11.7 | -0.4 |
| 1070 | Collège L'Agiot (0780856G) | 2.1 | E | 2.2 | 3.9 | 0.3 |  | 77.9 | 9.8 | -12 | -1.3 |
| 1070 | Collège André Chénier-Nouveau (0783774D) | 2.1 | E | 0.5 | 0.2 | 5.7 |  | 71.3 | 7.2 | 0 | -1.1 |
| 1070 | Collège Albert Camus (0910977T) | 2.1 | E | 3.6 | 2.4 | 0.4 |  | 80.9 | 9.2 | -10 | -1.7 |
| 1070 | Collège Assia Djebar (0941025D) | 2.1 | E | 1.1 | 1.8 | 3.5 |  | 74.4 | 9 | -5.3 | -0.5 |
| 1070 | Collège Léonard de Vinci (0951672B) | 2.1 | E | 0.5 | 3 | 2.8 |  | 71.2 | 9.5 | -12 | -0.4 |
| 1070 | Collège Pierre Perret (0952087C) | 2.1 | E | 2.6 | 3 | 0.7 |  | 78.9 | 9.5 | -10 | -1 |
| 1076 | Collège Les Grands Champs (0780264N) | 2 | E | 1.5 | 1.5 | 2.9 |  | 75.8 | 8.8 | -5.7 | -0.6 |
| 1076 | Collège Jacques Cartier (0781885A) | 2 | E | 2.6 | 2.9 | 0.5 |  | 79 | 9.4 | -10 | -1.2 |
| 1076 | Collège Jean Vilar (0781914G) | 2 | E | 0.1 | 1.2 | 4.7 |  | 64.5 | 8.6 | -10.7 | -0.1 |
| 1076 | Collège Jean Moulin (0783215W) | 2 | E | 1.8 | 3.8 | 0.5 |  | 76.7 | 9.8 | -13 | -1 |
| 1076 | Collège les Dînes Chiens (0910777A) | 2 | E | 0.3 | 2.8 | 2.8 |  | 69 | 9.4 | -14 | -0.4 |
| 1076 | Collège Les Ormeaux (0920081N) | 2 | E | 1.6 | 4.3 | 0.1 |  | 76 | 9.9 | -15 | -1.6 |
| 1076 | Collège Honoré de Balzac (0930894S) | 2 | E | 1.4 | 1.3 | 3.3 |  | 75.3 | 8.7 | -5 | -0.6 |
| 1076 | Collège Eugénie Cotton (0951230W) | 2 | E | 0.9 | 1 | 4.2 |  | 73.4 | 8.5 | -4 | -0.5 |
| 1084 | Collège Boris Vian (0752958H) | 1.9 | E | 0.6 | 3.2 | 1.9 |  | 71.8 | 9.6 | -13.7 | -0.5 |
| 1084 | Collège René Cassin (0781108F) | 1.9 | E | 1 | 0.9 | 3.8 |  | 73.5 | 8.3 | -4 | -0.6 |
| 1084 | Collège Haut Mesnil (0921190U) | 1.9 | E | 0.8 | 3.8 | 1.1 |  | 72.9 | 9.7 | -13 | -0.7 |
| 1084 | Collège Pasteur (0921541A) | 1.9 | E | 1.9 | 1.3 | 2.6 |  | 77 | 8.7 | -5 | -0.8 |
| 1084 | Collège Fernande Flagon (0941052H) | 1.9 | E | 1.2 | 0.8 | 3.8 |  | 74.7 | 8.3 | -4 | -0.6 |
| 1089 | Collège Nicolas Boileau (0910775Y) | 1.8 | E | 1.2 | 1.1 | 3.1 |  | 74.4 | 8.5 | -5 | -0.7 |
| 1089 | Collège Roland Garros (0911899V) | 1.8 | E | 1.6 | 1.6 | 2.1 |  | 75.8 | 8.8 | -6 | -0.8 |
| 1089 | Collège Jean Moulin (0951143B) | 1.8 | E | 1.6 | 0.3 | 3.4 |  | 75.9 | 7.5 | -2.7 | -1.5 |
| 1089 | Collège Marcel Pagnol (0951195H) | 1.8 | E | 1.6 | 1.6 | 2.3 |  | 76.1 | 8.8 | -6.3 | -0.7 |
| 1089 | Collège Aimé Césaire (0952127W) | 1.8 | E | 2.5 | 2.6 | 0.4 |  | 78.6 | 9.3 | -10.3 | -1.4 |
| 1094 | Collège Galilée (0782115A) | 1.7 | E | 2.4 | 1.2 | 1.6 |  | 78.3 | 8.6 | -6.3 | -1 |
| 1094 | Collège Aimé Césaire (0911334F) | 1.7 | E | 1.1 | 0.9 | 3.2 |  | 74 | 8.4 | -4.7 | -0.7 |
| 1094 | Collège Thomas Masaryk (0921180H) | 1.7 | E | 0.9 | 1.3 | 2.9 |  | 73.3 | 8.7 | -6.3 | -0.6 |
| 1097 | Collège Henri IV (0780571X) | 1.6 | E | 1.8 | 2.6 | 0.3 |  | 76.8 | 9.3 | -11.7 | -1.2 |
| 1097 | Collège des Pyramides (0911729K) | 1.6 | E | 0.3 | 0.8 | 3.7 |  | 68.8 | 8.3 | -5.7 | -0.5 |
| 1097 | Collège Auguste Renoir (0921622N) | 1.6 | E | 0.9 | 2.8 | 1.1 |  | 73.4 | 9.4 | -11.3 | -0.8 |
| 1097 | Collège Gérard Philipe (0930859D) | 1.6 | E | 0.2 | 0.8 | 3.7 |  | 67.2 | 8.3 | -7 | -0.4 |
| 1097 | Collège Stendhal (0950926R) | 1.6 | E | 1.7 | 2.4 | 0.8 |  | 76.3 | 9.2 | -10 | -1 |
| 1102 | Collège Arthur Rimbaud (0771478N) | 1.5 | E | 0.7 | 2.2 | 1.7 |  | 72 | 9.1 | -10 | -0.6 |
| 1102 | Collège Les Plaisances (0780116C) | 1.5 | E | 0.1 | 1 | 3.3 |  | 64.5 | 8.5 | -11.3 | -0.3 |
| 1102 | Collège Sainte-Louise de Marillac (0932772H) | 1.5 | E | 0.8 | 1.1 | 2.5 |  | 72.9 | 8.6 | -17 | -0.4 |
| 1105 | Collège Paul Éluard (0911042N) | 1.4 | E | 1.6 | 0.6 | 1.9 |  | 75.9 | 8.1 | -5 | -1.3 |
| 1105 | Collège Galilée (0912173T) | 1.4 | E | 0.4 | 1.1 | 2.8 |  | 69.7 | 8.5 | -7.7 | -0.5 |
| 1105 | Collège Le Moulin à Vent (0951697D) | 1.4 | E | 1.6 | 0.9 | 1.8 |  | 75.9 | 8.3 | -5.7 | -1.1 |
| 1108 | Collège Sully (0781916J) | 1.3 | E | 0.9 | 2.4 | 0.6 |  | 73.2 | 9.2 | -12.7 | -0.9 |
| 1108 | Collège Dorval (0941042X) | 1.3 | E | 1 | 1.4 | 1.6 |  | 73.8 | 8.7 | -7.3 | -0.8 |
| 1108 | Collège Pablo Picasso (0951194G) | 1.3 | E | 1.3 | 1.8 | 0.7 |  | 74.8 | 8.9 | -9.7 | -1 |
| 1111 | Collège Blaise Pascal (0780420H) | 1.2 | E | 0.4 | 2.2 | 0.9 |  | 69.8 | 9.2 | -14.7 | -0.8 |
| 1111 | Collège Jacqueline Auriol (0921238W) | 1.2 | E | 0.4 | 2.7 | 0.4 |  | 70.5 | 9.4 | -16 | -1 |
| 1111 | Collège Jean Jaurès (0931546A) | 1.2 | E | 1.1 | 0.9 | 1.6 |  | 74.1 | 8.4 | -6.7 | -0.9 |
| 1111 | Collège Jean Zay (0950037Z) | 1.2 | E | 0.8 | 1.1 | 1.6 |  | 72.7 | 8.6 | -8 | -0.8 |
| 1115 | Collège Marcel Pagnol (0780707V) | 1.1 | E | 0.7 | 2.5 | 0.2 |  | 72.3 | 9.3 | -15.3 | -1.2 |
| 1115 | Collège Louis Pasteur (0781896M) | 1.1 | E | 0.1 | 0.3 | 3 |  | 65.8 | 7.5 | -5 | -0.7 |
| 1115 | Collège Philippe Auguste (0950025L) | 1.1 | E | 1 | 0.3 | 2.1 |  | 73.7 | 7.6 | -4.7 | -1.4 |
| 1118 | Collège Paul Éluard (0780581H) | 1 | E | 0.6 | 2.2 | 0.1 |  | 71.3 | 9.1 | -15.3 | -1.4 |
| 1118 | Collège Paul Éluard (0921940J) | 1 | E | 0.8 | 0.6 | 1.6 |  | 72.9 | 8.1 | -6.7 | -0.9 |
| 1120 | Collège Youri Gagarine (0780187E) | 0.9 | E | 0.1 | 0.4 | 2.2 |  | 64.6 | 7.9 | -9.3 | -0.5 |
| 1120 | Collège République (0920594W) | 0.9 | E | 1 | 1 | 0.7 |  | 73.7 | 8.5 | -9.3 | -1.1 |
| 1120 | Collège Armande Béjart (0922701L) | 0.9 | E | 1.1 | 1.3 | 0.3 |  | 74.2 | 8.7 | -11 | -1.3 |
| 1123 | Collège Flora Tristan (0780032L) | 0.8 | E | 0 | 1 | 1.3 |  | 61.1 | 8.5 | -18 | -0.7 |
| 1124 | Collège Le Village (0780514K) | 0.7 | E | 0.7 | 0.8 | 0.6 |  | 72.1 | 8.3 | -9.7 | -1.1 |
| 1124 | Collège Les Petits Ponts (0920854D) | 0.7 | E | 0.8 | 0.9 | 0.4 |  | 72.5 | 8.4 | -11.3 | -1.2 |
| 1126 | Collège Eugène Delacroix (0910973N) | 0.6 | E | 0.5 | 1.2 | 0.1 |  | 70.8 | 8.6 | -14.7 | -1.3 |
| 1127 | Collège privé Saint-Louis (0754008Z) | 0.5 | E | 0.5 | 0.5 |  | oui | 71 | 8 |  |  |
| 1127 | Collège Gustave Courbet (0781618K) | 0.5 | E | 0.2 | 1.1 | 0.2 |  | 68 | 8.5 | -14.7 | -1.3 |
| 1129 | Collège Cours du Hameau (0942119T) | 0.4 | E | 0.1 | 0.7 |  | oui | 65 | 8.2 |  |  |

Non notés (163) : Collège privé École active bilingue Jeannine Manuel (Non publié) ; Collège privé France Quéré - Association Votre école chez vous (Non publié) ; Collège privé Beth Yacov (Non publié) ; Ecole secondaire privée Eurécole (Hors contrat : non publié) ; Collège privé Regain Tournesol (Non publié (collège sous contrat simple)) ; Ecole Secondaire Privée Yechiva Torah Werahamim (Hors contrat : non publié) ; Collège privé Gaston Tenoudji (Non publié) ; Collège privé Georges Gusdorf (Hors contrat : non publié) ; Ecole Secondaire Privée du Cerene (Hors contrat : non publié) ; Ecole générale et technologique privée Cours Progress (Hors contrat : non publié) ; Collège Kingsworth International School (Hors contrat : non publié) ; Collège privé Cours du Pont de Pierre (Hors contrat : non publié) ; Collège privé ICS Paris (Hors contrat : non publié) ; Collège privé Ecole Démocratique de Paris (Hors contrat : non publié) ; Ecole Canadienne Internationale de Paris (Hors contrat : non publié) ; Collège privé Diago (Hors contrat : non publié) ; Collège privé Galilée la faculté des enfants (Hors contrat : non publié) ; Collège privé Saint-Jean de Dieu (Non publié) ; Collège privé Autism Friendly Académie (Hors contrat : non publié) ; Collège privé La classe du phare (Hors contrat : non publié) ; Collège privé Paris FC (Hors contrat : non publié) ; Collège privé L'Autre Collège (Hors contrat : non publié) ; Collège privé Living School (Hors contrat : non publié) ; Collège privé Ecole Walt (Hors contrat : non publié) ; Collège privé Beth Aaron (Non publié) ; Collège privé Montessori (Hors contrat : non publié) ; Collège privé Ellipse Montessori (Hors contrat : non publié) ; Collège privé École Diagonale (Hors contrat : non publié) ; Collège privé Cours Molière (Hors contrat : non publié) ; Collège privé Ecole Juive Moderne (Hors contrat : non publié) ; Ecole Secondaire Privée Lab School (Hors contrat : non publié) ; Ecole Secondaire Privée Maigret (Hors contrat : non publié) ; Ecole Secondaire Privée International School of Paris (Hors contrat : non publié) ; Collège privé Cours Montaigne (Hors contrat : non publié) ; Collège privé BETH SEFER YAD MORDEKHAI (Hors contrat : non publié) ; Collège privé CONCORDIA BILINGUAL SCHOOL (Hors contrat : non publié) ; Collège privé Ecole A (Hors contrat : non publié) ; Collège privé MONTESSORI PARIS 17 31 boulevard Berthier (Hors contrat : non publié) ; Collège privé CERENE (Hors contrat : non publié) ; Collège Privé Ma petite école Montessori Villafranca (Hors contrat : non publié) ; Collège Privé Ma petite école Montessori Dantzig (Hors contrat : non publié) ; Collège Privé Montessori Esclaibes (Hors contrat : non publié) ; Collège Privé Ipecom (Hors contrat : non publié) ; ECS Cerene (Hors contrat : non publié) ; Collège privé ABI SCHOOL 12 rue Charles Pouillet (Hors contrat : non publié) ; Collège privé Beth Myriam (Hors contrat : non publié) ; Ecole secondaire privée Ecole de la Neuville (Hors contrat : non publié) ; Collège privé Père Jacques (Non publié) ; Collège privé Oneschool Global Paris Campus (Hors contrat : non publié) ; College Trait d'Union (Hors contrat : non publié) ; Collège privé La Petite Plume (Hors contrat : non publié) ; Collège Simone Veil (Non publié) ; Collège privé Sacré Coeur Enfant Jésus (Hors contrat : non publié) ; Collège Marthe Gautier (Non publié) ; Collège Jeanne Bonnardel Beguin (Non publié) ; Collège privé Saint-Colomban (Non publié) ; Collège Joséphine Baker (Non publié) ; Collège Jean-Jacques Barbaux (Non publié) ; Collège Montessori Here and Now (Hors contrat : non publié) ; Collège Madeleine Brès (Non publié) ; Collège Avenir Val de Bussy (Hors contrat : non publié) ; Collège Anima collège (Hors contrat : non publié) ; Ecole secondaire privée Jeanne d'Arc (Hors contrat : non publié) ; Ecole secondaire privée Bilingue Diderot (Hors contrat : non publié) ; Ecole secondaire privée Cours Château (Hors contrat : non publié) ; Ecole secondaire privée Saint Jean Bosco (Hors contrat : non publié) ; Ecole secondaire privée Mathurin Cordier (Hors contrat : non publié) ; Ecole secondaire privée Bienheureux Charles de Foucauld (Hors contrat : non publié) ; Ecole secondaire privée Cours Sainte Clotilde (Hors contrat : non publié) ; Ecole secondaire privée Bilingue musulman Eva de Vitray (Hors contrat : non publié) ; Ecole secondaire privée International Montessori Athéna (Hors contrat : non publié) ; Ecole secondaire privée IDEE (Hors contrat : non publié) ; Ecole secondaire privée La Jonchère (Hors contrat : non publié) ; Ecole secondaire privée Institut FFGOLF de Haut niveau (Hors contrat : non publié) ; Ecole secondaire privée sports Académy le Mesnil (Hors contrat : non publié) ; Ecole secondaire privée Pilcalli (Hors contrat : non publié) ; Ecole secondaire privée La Jonchère EIB Campus (Hors contrat : non publié) ; Collège privé Saint-Thomas de Villeneuve (Non publié) ; Ecole secondaire privée Montessori de Gargenville (Hors contrat : non publié) ; Ecole secondaire privée NLC International School (Hors contrat : non publié) ; Collège Les Châtaigniers (Non publié) ; Ecole secondaire privée Dans tes Pas (Hors contrat : non publié) ; Ecole secondaire privée Station phoenix (Hors contrat : non publié) ; Ecole secondaire privée Alef Beth Chaoul (Hors contrat : non publié) ; Ecole secondaire privée EMI des enfants (Hors contrat : non publié) ; Ecole secondaire privée Cité Educative du Paris-Saint-Germain (Hors contrat : non publié) ; Ecole secondaire privée Time 4 School (Hors contrat : non publié) ; Ecole secondaire privée Citizen for Society School (Hors contrat : non publié) ; Ecole secondaire privée Groupe Scolaire Excellence (Hors contrat : non publié) ; Ecole secondaire privée Rhazès (Hors contrat : non publié) ; Ecole secondaire privée La Lumière du Savoir (Hors contrat : non publié) ; Ecole secondaire privée de la Trinité (Hors contrat : non publié) ; Ecole secondaire privée Crayons Miel (Hors contrat : non publié) ; Ecole secondaire privée ELAH (Hors contrat : non publié) ; Collège Claudine Hermann (Non publié) ; Collège Julie-Victoire Daubié (Non publié) ; Collège Saint-Spire Sénart (Non publié) ; Ecole secondaire privée Marymount School (Hors contrat : non publié) ; Collège Saint-Philippe (Non publié) ; Ecole secondaire privée  les vignes (Hors contrat : non publié) ; Collège privé Beth Hilel (Non publié) ; Ecole secondaire privée de l'Institut d'enseignement IBN Badis (Hors contrat : non publié) ; Ecole secondaire privée  Cours Antoine de Saint-Exupéry (Hors contrat : non publié) ; Ecole secondaire privée  international scolaire - Open Sky International (Hors contrat : non publié) ; Ecole secondaire privée ALEF (Hors contrat : non publié) ; Ecole secondaire privée Iféa Emilie du Châtelet (Hors contrat : non publié) ; Ecole secondaire privée Pardess Hannah (Hors contrat : non publié) ; Ecole secondaire privée internationale Deutsche Schule Paris (Hors contrat : non publié) ; Ecole secondaire privée Iféa Katherine Johnson (Hors contrat : non publié) ; Ecole secondaire privée Cours Singulier (Hors contrat : non publié) ; Ecole secondaire privée Ecole Diagonale (Hors contrat : non publié) ; Ecole secondaire privée du Centre de référence pour l'évaluation neuropsychologique de l'enfant (CERENE) (Hors contrat : non publié) ; Ecole secondaire privée Walt (Hors contrat : non publié) ; Collège privé Beth Sepher Yad Mordekai (Hors contrat : non publié) ; Collège privé Institution Yad Mordekai (Hors contrat : non publié) ; Ecole secondaire privée HamaskaIne Tarkamantchatz (Hors contrat : non publié) ; Ecole secondaire privée Groupe Scolaire Yaguel Yaacov (Hors contrat : non publié) ; Ecole secondaire privée Marianne Picard (Hors contrat : non publié) ; Ecole secondaire privé Les Génies de Demain (Hors contrat : non publié) ; Collège privé Tebrotzassère (Non publié) ; Collège du Groupe scolaire privé Bellevue Muhammed Hamidullah (Hors contrat : non publié) ; Collège privé La Fraternité (Hors contrat : non publié) ; Collège privé Tachbar (Hors contrat : non publié) ; Collège privé Excelle (Hors contrat : non publié) ; Collège privé Malik Ibn Anas (Hors contrat : non publié) ; Collège privé Iqra (Hors contrat : non publié) ; Collège privé La plume de l'éducation (Hors contrat : non publié) ; Collège - Groupe Scolaire Privé APCS (Hors contrat : non publié) ; Collège Al'Andalus (Hors contrat : non publié) ; Collège Groupe Scolaire Privé Bougainville (Hors contrat : non publié) ; Collège privé réussite éducative valeurs et épanouissement (Non publié) ; Collège privé Lab School Montreuil (Hors contrat : non publié) ; Collège Niki de Saint Phalle (Non publié) ; Collège Privé ALEKOLE93 (Hors contrat : non publié) ; Cours Nogentais Mixte (Hors contrat : non publié) ; Collège Poullart des Places (Non publié) ; Collège privé ISE Emeth Leyaacov - Filles (Hors contrat : non publié) ; Collège privé ISE Emeth Leyaacov - Garçons (Hors contrat : non publié) ; Collège privé Padre-Pio (Hors contrat : non publié) ; Collège du groupe scolaire privé Education et Savoir (Hors contrat : non publié) ; Collège privé l'Ecole Heureuse - LEH (Hors contrat : non publié) ; Collège privé Sports études de Paris (SEDP) (Hors contrat : non publié) ; Collège privé Saint-Mesrop Arabian (Non publié) ; Collège privé Ecole Enfance et Vie - Ohr Menahem (Hors contrat : non publié) ; Collège privé Pilote Arborescences (Hors contrat : non publié) ; Collège privé Dix sur Dix (Hors contrat : non publié) ; Collège Nél (Hors contrat : non publié) ; Collège Saint-Pie X (Fondation d'Auteuil) (Non publié) ; Ecole secondaire privée IInstitut de Gestion Sociale des Armées (Hors contrat : non publié) ; Ecole secondaire privée Léonard de Vinci (Hors contrat : non publié) ; Ecole secondaire privée Beth Yaacov (Hors contrat : non publié) ; Collège Saint-Jean (Non publié) ; Ecole secondaire privée Pierre Gilles de Gennes (Hors contrat : non publié) ; Ecole secondaire privée Hanned (Hors contrat : non publié) ; Ecole secondaire privée les Petis Pas (Hors contrat : non publié) ; Ecole secondaire privée Académie Fihri (Hors contrat : non publié) ; Ecole secondaire privée Torah Or (Hors contrat : non publié) ; Ecole secondaire privée New School (Hors contrat : non publié) ; Ecole secondaire privée du Petit Prince (Hors contrat : non publié) ; Collège privé  Cours Charlemagne (Hors contrat : non publié) ; Ecole secondaire privée International Trilingue de Cergy - CITC (Hors contrat : non publié) ; Collège Marie-José Perec (Non publié) ; Nouveau collège de Saint-Ouen-L'Aumône (Non publié).

## 5. Moyennes de référence

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

## 6. Collèges absents de chaque jeu de données

Les hors contrat ne sont présents dans aucun jeu statistique ; ils sont listés à part.

| Jeu | Absents (public / sous contrat) | Hors contrat présents |
|---|---|---|
| IVAC session 2025 | Collège Hector Berlioz (0752252R), Collège privé École active bilingue Jeannine Manuel (0752935H), Collège privé France Quéré - Association Votre école chez vous (0752954D), Collège privé Beth Yacov (0753387Z), Collège privé Regain Tournesol (0754861B), Collège privé Gaston Tenoudji (0755192L), Collège privé Saint-Jean de Dieu (0756020L), Collège privé Beth Aaron (0756124Z), Collège privé Père Jacques (0772650M), Collège Simone Veil (0772923J), Collège Marthe Gautier (0772945H), Collège Jeanne Bonnardel Beguin (0772946J), Collège privé Saint-Colomban (0772953S), Collège Joséphine Baker (0772968H), Collège Jean-Jacques Barbaux (0773007A), Collège Madeleine Brès (0773030A), Collège privé Saint-Thomas de Villeneuve (0783816Z), Collège Les Châtaigniers (0783838Y), Collège Claudine Hermann (0912487J), Collège Julie-Victoire Daubié (0912539R), Collège Saint-Spire Sénart (0912547Z), Collège Saint-Philippe (0922340U), Ecole de danse de l'Opéra de Paris (0922579D), Collège privé Beth Hilel (0922751R), Collège privé Tebrotzassère (0930970Z), Collège privé réussite éducative valeurs et épanouissement (0932860D), Collège Niki de Saint Phalle (0932966U), Collège Poullart des Places (0941891V), Collège privé Saint-Mesrop Arabian (0942392P), Collège Saint-Pie X (Fondation d'Auteuil) (0951220K), Collège Saint-Jean (0952136F), Collège Marie-José Perec (0952326M), Nouveau collège de Saint-Ouen-L'Aumône (0952381X) | 0/132 |
| DNB session 2021 | Collège privé Regain Tournesol (0754861B), Collège privé Saint-Jean de Dieu (0756020L), Collège privé Beth Aaron (0756124Z), Collège Marthe Simard (0772868Z), Collège Simone Veil (0772923J), Collège Marie-Amélie Le Fur (0772944G), Collège Marthe Gautier (0772945H), Collège Jeanne Bonnardel Beguin (0772946J), Collège privé Saint-Colomban (0772953S), Collège Joséphine Baker (0772968H), Collège Jean-Jacques Barbaux (0773007A), Collège Madeleine Brès (0773030A), Collège André Chénier-Nouveau (0783774D), Collège privé Saint-Thomas de Villeneuve (0783816Z), Collège Les Châtaigniers (0783838Y), Collège Claudine Hermann (0912487J), Collège Julie-Victoire Daubié (0912539R), Collège Saint-Spire Sénart (0912547Z), Collège Sainte-Louise de Marillac (0932772H), Collège privé La Salle - Le Landy (0932773J), Collège privé réussite éducative valeurs et épanouissement (0932860D), Collège Niki de Saint Phalle (0932966U), Collège Samuel Paty (0942482M), Collège Nelson Mandela (0942499F), Collège Gisèle Halimi (0942532S), Collège Caroline Aigle (0952282P), Collège Suzanne Lenglen (0952325L), Collège Marie-José Perec (0952326M), Nouveau collège de Saint-Ouen-L'Aumône (0952381X) | 0/132 |
| IPS 2025 | Collège privé Beth Aaron (0756124Z), Collège Madeleine Brès (0773030A), Collège Julie-Victoire Daubié (0912539R), Collège Saint-Spire Sénart (0912547Z), Nouveau collège de Saint-Ouen-L'Aumône (0952381X) | 0/132 |
| Effectifs 2025 | Collège privé Beth Aaron (0756124Z), Collège Madeleine Brès (0773030A), Maison de la Légion d'Honneur (0783122V), Collège Julie-Victoire Daubié (0912539R), Collège Saint-Spire Sénart (0912547Z), Nouveau collège de Saint-Ouen-L'Aumône (0952381X) | 0/132 |
| Évaluations 6e 2025 | Collège Jacques Decour (0752532V), Collège privé Sainte-Jeanne-Élisabeth (0752894N), Collège privé France Quéré - Association Votre école chez vous (0752954D), Collège privé Beth Yacov (0753387Z), Collège Évariste Galois (0753937X), Collège privé Regain Tournesol (0754861B), Collège privé Beth Aaron (0756124Z), Collège privé Père Jacques (0772650M), Collège Madeleine Brès (0773030A), Maison de la Légion d'Honneur (0783122V), Collège Sainte-Jeanne d'Arc (0910820X), Collège Julie-Victoire Daubié (0912539R), Collège Saint-Spire Sénart (0912547Z), Collège Hautefeuille (0922482Y), Collège Pablo Neruda (0931224A), Collège Louis Pasteur (0941037S), Collège Ozar Hatorah Garçons (0941942A), Collège Saint-Jean (0952136F), Nouveau collège de Saint-Ouen-L'Aumône (0952381X) | 0/132 |
| Encadrement 2025 | Collège privé France Quéré - Association Votre école chez vous (0752954D), Collège privé Regain Tournesol (0754861B), Collège privé Beth Aaron (0756124Z), Collège Madeleine Brès (0773030A), Maison de la Légion d'Honneur (0783122V), Collège Julie-Victoire Daubié (0912539R), Collège Saint-Spire Sénart (0912547Z), Nouveau collège de Saint-Ouen-L'Aumône (0952381X) | 0/132 |
| Personnel | Collège privé Beth Aaron (0756124Z), Collège Joséphine Baker (0772968H), Collège Jean-Jacques Barbaux (0773007A), Collège Madeleine Brès (0773030A), Collège Julie-Victoire Daubié (0912539R), Collège Saint-Spire Sénart (0912547Z), Collège Niki de Saint Phalle (0932966U), Nouveau collège de Saint-Ouen-L'Aumône (0952381X) | 0/132 |
| Hébergement (demi-pension) | Collège privé Beth Aaron (0756124Z), Collège Madeleine Brès (0773030A), Maison de la Légion d'Honneur (0783122V), Collège Julie-Victoire Daubié (0912539R), Collège Saint-Spire Sénart (0912547Z), Nouveau collège de Saint-Ouen-L'Aumône (0952381X) | 0/132 |
| ONISEP Idéo-Structures | Collège Jean-Jacques Barbaux (0773007A), Collège Madeleine Brès (0773030A), Ecole de danse de l'Opéra de Paris (0922579D), Collège privé Beth Hilel (0922751R), Collège privé La Salle - Le Landy (0932773J) | 1/132 |
| ONISEP Idéo-Langues | Collège privé Saint-Colomban (0772953S), Collège Joséphine Baker (0772968H), Collège Jean-Jacques Barbaux (0773007A), Collège Madeleine Brès (0773030A), Collège privé Samarcande (0783592F), Collège privé Saint-Thomas de Villeneuve (0783816Z), Collège Les Châtaigniers (0783838Y), Collège privé Beth Hilel (0922751R), Collège privé La Salle - Le Landy (0932773J), Collège Nelson Mandela (0942499F), Collège Louise Weiss (0952236P), Collège Caroline Aigle (0952282P), Nouveau collège de Saint-Ouen-L'Aumône (0952381X) | 0/132 |
| ONISEP dispositifs (aucune entrée) | Collège privé Saint-Louis (0750182R), Collège privé École active bilingue Monceau (0752821J), Collège privé Fénelon Sainte-Marie (0752842G), Collège privé Saint-Jean de Passy (0752870M), Collège privé Sainte-Jeanne-Élisabeth (0752894N), Collège privé Charles Péguy (0752895P), Collège privé de la Tour (0752897S), Collège privé La Rochefoucauld (0752899U), Collège privé Yabné (0752906B), Collège privé de l'Alma (0752912H), Collège privé Sévigné (0752913J), Collège privé Saint-Louis de Gonzague (0752917N), Collège privé Massillon (0752920S), Collège privé Saint-Sulpice (0752924W), Collège privé Sainte-Geneviève (0752925X), Collège privé Gerson (0752926Y), Collège privé France Quéré - Association Votre école chez vous (0752954D), Collège privé Sinaï (0753206C), Collège privé Beth Hanna (0753369E), Collège privé Beth Yacov (0753387Z), Collège privé Thérèse Chappuis (0753854G), Collège privé Saint-Jean-Gabriel (0753965C), Collège privé Sœur Rosalie (0753967E), Collège privé Saint-Ambroise (0753978S), Collège privé La Salle – Notre-Dame de la Gare (0753982W), Collège privé Saint-Joseph (0753992G), Collège privé Saint-Honoré d'Eylau (0753996L), Collège privé Lucien de Hirsch (0754003U), Collège privé Sainte-Louise (0754007Y), Collège privé Bossuet Notre-Dame (0754506R), Collège privé Notre-Dame de Sion (0754757N), Collège privé Georges Leven (0754853T), Collège privé Heikhal Menahem Sinaï (0755029J), Collège privé Gaston Tenoudji (0755192L), Collège privé Beth Aaron (0756124Z), Collège Sainte-Thérèse (0771217E), Collège Sainte-Marie (0771220H), Collège Sainte-Thérèse (0771236A), Collège Honoré de Balzac (0771621U), Collège Bautain (0771917R), Collège Stephane Mallarmé (0772227C), Collège privé Père Jacques (0772650M), Collège Lucie Aubrac (0772819W), Collège Marthe Gautier (0772945H), Collège Jeanne Bonnardel Beguin (0772946J), Collège privé Saint-Colomban (0772953S), Collège Joséphine Baker (0772968H), Collège Jean-Jacques Barbaux (0773007A), Collège Madeleine Brès (0773030A), Collège Le Prieuré (0780112Y), Collège Louis Lumière (0780119F), Collège François Rabelais (0780713B), Collège Albert Einstein (0781171Z), Collège Saint-Érembert (0781589D), Collège Saint-Louis Notre-Dame du Bel Air (0781600R), Collège Perceval (0781601S), Collège André Derain (0781683F), Collège Jean Monnet (0781863B), Collège Jacques Cartier (0781885A), Collège Saint-Louis (0783300N), Collège Sainte-Thérèse (0783338E), Collège Sainte-Anne (0783339F), Collège franco-allemand (0783546F), Collège privé Samarcande (0783592F), Collège privé Saint-Thomas de Villeneuve (0783816Z), Collège Les Châtaigniers (0783838Y), Collège André Maurois (0910017Z), Collège Michel Vignaud (0910028L), Collège Sainte-Thérèse (0910817U), Collège Sainte-Jeanne d'Arc (0910820X), Collège du Sacré-Coeur (0910836P), Collège Moreau (0910980W), Collège Jeanne d'Arc (0911015J), Collège Charles Péguy (0911488Y), Collège Jeanne d'Arc (0911747E), Collège Notre-Dame de Sion (0911748F), Collège Saint-Louis - Saint-Clément (0911752K), Collège Jean Monnet (0911920T), Collège Robert Doisneau (0912109Y), Collège Claudine Hermann (0912487J), Collège Saint-Spire Sénart (0912547Z), Collège Lakanal (0920626F), Collège Jean Moulin (0920689Z), Collège Henri Dunant (0920852B), Collège Saint-Joseph (0920890T), Collège Dupanloup (0920902F), Collège Saint-Joseph (0920905J), Collège Sainte-Jeanne d'Arc (0920936T), Collège Sainte-Marie (0920998K), Collège La Salle - Saint-Nicolas (0921003R), Collège Saint-Pierre Saint-Jean (0921015D), Collège Saint-Joseph (0921020J), Collège Léonard de Vinci (0921179G), Collège Joliot-Curie (0921778H), Collège Marie Curie (0921785R), Collège Sainte-Geneviève (0921902T), Collège Saint-Gabriel (0921903U), Collège Notre-Dame (0921905W), Collège La Source (0921909A), Collège Jeanne d'Arc (0921911C), Collège Sainte-Marie (0921912D), Collège Madeleine Daniélou (0921916H), Collège Notre-Dame (0922450N), Collège Hautefeuille (0922482Y), Ecole de danse de l'Opéra de Paris (0922579D), Collège Robert Paparemborde (0922662U), Collège privé Beth Hilel (0922751R), Collège Jean-Baptiste Corot (0930629D), Collège privé Saint-Joseph (0930902A), Collège privé Notre-Dame des Vertus (0930903B), Collège Saint-Germain (0930907F), Collège Fidélis (0930912L), Collège Sainte-Marie (0930920V), Collège Sainte-Marie (0930963S), Collège Alliance (0930966V), Collège privé Saint-Benoist de l'Europe (0931022F), Collège privé Charles Péguy (0931844Z), Collège Henri Matisse (0931845A), Collège Henri IV (0932301W), Collège Lucie Aubrac (0932334G), Collège Saint-Vincent-de-Paul (0932586F), Collège privé Protectorat Saint-Joseph (0932652C), Collège privé La Salle - Le Landy (0932773J), Collège privé réussite éducative valeurs et épanouissement (0932860D), Collège Ovide Decroly (0940024R), Collège les Closeaux (0940072T), Collège Saint-André (0940811W), Collège de Maille (0940884A), Collège privé Saint-Thomas de Villeneuve (0940887D), Collège Édouard Herriot (0941046B), Collège Paul Bert (0941100K), Collège Jules Ferry (0941234F), Collège la Guinette (0941412Z), Collège Hector Berlioz (0941598B), Collège Saint-André (0941710Y), Collège Simone Veil (0942187S), Collège privé Saint-Mesrop Arabian (0942392P), Collège Samuel Paty (0942482M), Collège Nelson Mandela (0942499F), Collège Sainte-Thérèse (0950752B), Collège Saint-Stanislas (0950760K), Collège Le Rosaire (0950763N), Collège Saint-Joseph (0950789S), Collège Saint-Charles (0950790T), Collège Sainte-Jeanne d'Arc (0950793W), Collège Marie-Thérèse (0950823D), Collège Les Coutures (0951279Z), Collège Notre Dame de la Providence (0951504U), Collège Notre-Dame de Bury - Annexe du collège Le Rosaire de Saint-Leu-la-Forêt (0951505V), Collège Saint-Martin de France (0951507X), Collège Notre-Dame (0951508Y), Collège Torat Emet (0951682M), Collège Le Luat (0951817J), Collège ORT (0951916S), Collège Ozar Hatorah (0951939S), Collège Vauban (0951943W), Collège Louis Augustin Bosc (0951992Z), Collège Rosa Bonheur (0952079U), Collège Pierre Perret (0952087C), Nouveau collège de Saint-Ouen-L'Aumône (0952381X) | 0/132 |

## 7. Noms divergents entre sources

Collèges dont le nom dans une source n'a aucun mot significatif commun avec celui de l'annuaire (jointure faite sur l'UAI, à vérifier : renommage, erreur d'UAI…).

| UAI | Annuaire | Source | Nom dans la source |
|---|---|---|---|
| 0753854G | Collège privé Thérèse Chappuis | effectifs | SAINT FRANCOIS DE SALES -THERE |
| 0753985Z | Collège privé Saint-Vincent-de-Paul | dnb | SAINTE-MARIE |
| 0755192L | Collège privé Gaston Tenoudji | dnb | RACHI |
| 0755192L | Collège privé Gaston Tenoudji | ips | COLLEGE PRIVE RACHI |
| 0755192L | Collège privé Gaston Tenoudji | effectifs | RACHI |
| 0771656G | Collège Nellie Bly | dnb | L'ARCHE GUEDON |
| 0780050F | Collège Samuel Paty | dnb | DU BOIS D'AULNE |
| 0780577D | Collège Sébastienne Guyot | dnb | ROMAIN ROLLAND |
| 0780577D | Collège Sébastienne Guyot | ips | COLLEGE ROMAIN ROLLAND |
| 0780577D | Collège Sébastienne Guyot | effectifs | ROMAIN ROLLAND |
| 0783122V | Maison de la Légion d'Honneur | dnb | LES LOGES |
| 0910820X | Collège Sainte-Jeanne d'Arc | ivac | COLLEGE PRIVE SAINT MARTIN |
| 0910820X | Collège Sainte-Jeanne d'Arc | dnb | SAINT MARTIN |
| 0910820X | Collège Sainte-Jeanne d'Arc | ips | COLLEGE PRIVE SAINT MARTIN |
| 0910820X | Collège Sainte-Jeanne d'Arc | effectifs | SAINT MARTIN |
| 0911256W | Collège Hubert Germain | dnb | DU PONT DE BOIS |
| 0911256W | Collège Hubert Germain | onisep | Collège du Pont de Bois |
| 0911750H | Collège Institution Saint Vincent de Paul | dnb | ILE DE FRANCE |
| 0911824N | Collège Saint-Nicolas | ivac | COLLEGE PRIVE LA SALLE IGNY |
| 0911824N | Collège Saint-Nicolas | dnb | LA SALLE IGNY |
| 0911824N | Collège Saint-Nicolas | ips | COLLEGE PRIVE LA SALLE IGNY |
| 0911824N | Collège Saint-Nicolas | effectifs | LA SALLE IGNY |
| 0920884L | Collège Jean Macé | ivac | COLLEGE HUBERT GERMAIN |
| 0920884L | Collège Jean Macé | ips | COLLEGE HUBERT GERMAIN |
| 0920884L | Collège Jean Macé | effectifs | HUBERT GERMAIN |
| 0921015D | Collège Saint-Pierre Saint-Jean | ivac | COLLEGE PRIVE LA TRINITE |
| 0921015D | Collège Saint-Pierre Saint-Jean | dnb | LA TRINITE |
| 0921015D | Collège Saint-Pierre Saint-Jean | ips | COLLEGE PRIVE LA TRINITE |
| 0921015D | Collège Saint-Pierre Saint-Jean | effectifs | LA TRINITE |
| 0931196V | Collège Angela Davis | dnb | PIERRE SEMARD |
| 0931212M | Collège Oum Kalthoum | dnb | LENAIN DE TILLEMONT |
| 0941025D | Collège Assia Djebar | ivac | COLLEGE GEORGES POLITZER |
| 0941025D | Collège Assia Djebar | dnb | GEORGES POLITZER |
| 0941025D | Collège Assia Djebar | ips | COLLEGE GEORGES POLITZER |
| 0941025D | Collège Assia Djebar | effectifs | GEORGES POLITZER |
| 0941602F | Collège Christiane Desroches Noblecourt | dnb | GEORGES BRASSENS |
| 0951232Y | Collège Marie Sklodowska-Curie | dnb | MARCEL PAGNOL |

Noms corrigés par `data/overrides/colleges.json` :

- 0750407K : « Collège Rognoni École des enfants du Spectacle » → « Collège Rognoni – École des enfants du spectacle »
- 0753967E : « Collège privé Soeur Rosalie » → « Collège privé Sœur Rosalie »
- 0753982W : « Collège La Salle - Notre-Dame de la Gare » → « Collège privé La Salle – Notre-Dame de la Gare »
- 0756057B : « Paris FC Collège » → « Collège privé Paris FC »
- 0756203K : « Collège privé Ecole Diagonale » → « Collège privé École Diagonale »
- 0940874P : « Collège Epin » → « Collège privé Epin »
- 0942626U : « Ecole Dix sur Dix (Collège) » → « Collège privé Dix sur Dix »

## 8. Langues, options, dispositifs

Langues vivantes : onisep 1145, aucune 147.
Sans LV1/LV2 connues : Ecole secondaire privée Eurécole (0754407H), Ecole Secondaire Privée Yechiva Torah Werahamim (0755089Z), Collège privé Georges Gusdorf (0755496S), Ecole Secondaire Privée du Cerene (0755726S), Ecole générale et technologique privée Cours Progress (0755757A), Collège Kingsworth International School (0755773T), Collège privé Cours du Pont de Pierre (0755799W), Collège privé ICS Paris (0755848Z), Collège privé Ecole Démocratique de Paris (0755879H), Ecole Canadienne Internationale de Paris (0755897C), Collège privé Diago (0755925H), Collège privé Galilée la faculté des enfants (0755949J), Collège privé Autism Friendly Académie (0756021M), Collège privé La classe du phare (0756051V), Collège privé Paris FC (0756057B), Collège privé L'Autre Collège (0756105D), Collège privé Living School (0756120V), Collège privé Ecole Walt (0756123Y), Collège privé Montessori (0756191X), Collège privé Ellipse Montessori (0756197D), Collège privé École Diagonale (0756203K), Collège privé Cours Molière (0756204L), Collège privé Ecole Juive Moderne (0756234U), Ecole Secondaire Privée Lab School (0756272K), Ecole Secondaire Privée Maigret (0756273L), Ecole Secondaire Privée International School of Paris (0756274M), Collège privé Cours Montaigne (0756278S), Collège privé BETH SEFER YAD MORDEKHAI (0756282W), Collège privé CONCORDIA BILINGUAL SCHOOL (0756486T), Collège privé Ecole A (0756489W), Collège privé MONTESSORI PARIS 17 31 boulevard Berthier (0756519D), Collège privé CERENE (0756527M), Collège Privé Ma petite école Montessori Villafranca (0756727E), Collège Privé Ma petite école Montessori Dantzig (0756728F), Collège Privé Montessori Esclaibes (0756747B), Collège Privé Ipecom (0756786U), ECS Cerene (0756801K), Collège privé ABI SCHOOL 12 rue Charles Pouillet (0756898R), Collège privé Beth Myriam (0771668V), Ecole secondaire privée Ecole de la Neuville (0772150U), Collège privé Oneschool Global Paris Campus (0772740K), College Trait d'Union (0772879L), Collège privé La Petite Plume (0772898G), Collège Simone Veil (0772923J), Collège privé Sacré Coeur Enfant Jésus (0772937Z), Collège privé Saint-Colomban (0772953S), Collège Joséphine Baker (0772968H), Collège Jean-Jacques Barbaux (0773007A), Collège Montessori Here and Now (0773021R), Collège Madeleine Brès (0773030A), Collège Avenir Val de Bussy (0773040L), Collège Anima collège (0773048V), Ecole secondaire privée Jeanne d'Arc (0781902U), Ecole secondaire privée Bilingue Diderot (0782128P), Ecole secondaire privée Cours Château (0783284W), Ecole secondaire privée Saint Jean Bosco (0783585Y), Collège privé Samarcande (0783592F), Ecole secondaire privée Mathurin Cordier (0783621M), Ecole secondaire privée Bienheureux Charles de Foucauld (0783647R), Ecole secondaire privée Cours Sainte Clotilde (0783666L), Ecole secondaire privée Bilingue musulman Eva de Vitray (0783674V), Ecole secondaire privée International Montessori Athéna (0783682D), Ecole secondaire privée IDEE (0783702A), Ecole secondaire privée La Jonchère (0783727C), Ecole secondaire privée Institut FFGOLF de Haut niveau (0783738P), Ecole secondaire privée sports Académy le Mesnil (0783764T), Ecole secondaire privée Pilcalli (0783772B), Ecole secondaire privée La Jonchère EIB Campus (0783810T), Collège privé Saint-Thomas de Villeneuve (0783816Z), Ecole secondaire privée Montessori de Gargenville (0783825J), Ecole secondaire privée NLC International School (0783831R), Collège Les Châtaigniers (0783838Y), Ecole secondaire privée Dans tes Pas (0783844E), Ecole secondaire privée Station phoenix (0783846G), Ecole secondaire privée Alef Beth Chaoul (0783848J), Ecole secondaire privée EMI des enfants (0783869G), Ecole secondaire privée Cité Educative du Paris-Saint-Germain (0783870H), Ecole secondaire privée Time 4 School (0912303J), Ecole secondaire privée Citizen for Society School (0912337W), Ecole secondaire privée Groupe Scolaire Excellence (0912353N), Ecole secondaire privée Rhazès (0912363Z), Ecole secondaire privée La Lumière du Savoir (0912378R), Ecole secondaire privée de la Trinité (0912379S), Ecole secondaire privée Crayons Miel (0912432Z), Ecole secondaire privée ELAH (0912486H), Collège Julie-Victoire Daubié (0912539R), Ecole secondaire privée Marymount School (0920925F), Ecole secondaire privée  les vignes (0922657N), Collège privé Beth Hilel (0922751R), Ecole secondaire privée de l'Institut d'enseignement IBN Badis (0922764E), Ecole secondaire privée  Cours Antoine de Saint-Exupéry (0922765F), Ecole secondaire privée  international scolaire - Open Sky International (0922798S), Ecole secondaire privée ALEF (0922832D), Ecole secondaire privée Iféa Emilie du Châtelet (0922878D), Ecole secondaire privée Pardess Hannah (0922924D), Ecole secondaire privée internationale Deutsche Schule Paris (0922943Z), Ecole secondaire privée Iféa Katherine Johnson (0922955M), Ecole secondaire privée Cours Singulier (0922964X), Ecole secondaire privée Ecole Diagonale (0922967A), Ecole secondaire privée du Centre de référence pour l'évaluation neuropsychologique de l'enfant (CERENE) (0922977L), Ecole secondaire privée Walt (0923006T), Collège privé Beth Sepher Yad Mordekai (0923042G), Collège privé Institution Yad Mordekai (0923043H), Ecole secondaire privée HamaskaIne Tarkamantchatz (0923143S), Ecole secondaire privée Groupe Scolaire Yaguel Yaacov (0923154D), Ecole secondaire privée Marianne Picard (0923155E), Ecole secondaire privé Les Génies de Demain (0923494Y), Collège du Groupe scolaire privé Bellevue Muhammed Hamidullah (0932642S), Collège privé La Fraternité (0932646W), Collège privé Tachbar (0932647X), Collège privé Excelle (0932669W), Collège privé Malik Ibn Anas (0932686P), Collège privé Iqra (0932690U), Collège privé La plume de l'éducation (0932717Y), Collège - Groupe Scolaire Privé APCS (0932728K), Collège Al'Andalus (0932742A), Collège privé La Salle - Le Landy (0932773J), Collège Groupe Scolaire Privé Bougainville (0932797K), Collège privé Lab School Montreuil (0932890L), Collège Privé ALEKOLE93 (0933024G), Cours Nogentais Mixte (0940875R), Collège privé ISE Emeth Leyaacov - Filles (0942143U), Collège privé ISE Emeth Leyaacov - Garçons (0942185P), Collège privé Padre-Pio (0942192X), Collège du groupe scolaire privé Education et Savoir (0942223F), Collège privé l'Ecole Heureuse - LEH (0942336D), Collège privé Sports études de Paris (SEDP) (0942366L), Collège privé Ecole Enfance et Vie - Ohr Menahem (0942428D), Collège privé Pilote Arborescences (0942433J), Collège Nelson Mandela (0942499F), Collège privé Dix sur Dix (0942626U), Collège Nél (0942674W), Ecole secondaire privée IInstitut de Gestion Sociale des Armées (0951707P), Ecole secondaire privée Léonard de Vinci (0952125U), Ecole secondaire privée Beth Yaacov (0952133C), Ecole secondaire privée Pierre Gilles de Gennes (0952167P), Ecole secondaire privée Hanned (0952171U), Ecole secondaire privée les Petis Pas (0952213P), Ecole secondaire privée Académie Fihri (0952218V), Ecole secondaire privée Torah Or (0952222Z), Ecole secondaire privée New School (0952223A), Collège Louise Weiss (0952236P), Ecole secondaire privée du Petit Prince (0952240U), Collège privé  Cours Charlemagne (0952267Y), Collège Caroline Aigle (0952282P), Ecole secondaire privée International Trilingue de Cergy - CITC (0952303M), Nouveau collège de Saint-Ouen-L'Aumône (0952381X).
Fiches Idéo-Structures écartées (même UAI qu'un collège mais autre type) : 0922579D « École de danse de l'Opéra national de Paris » (école d'art) ; 0941224V « UFA François Rabelais » (centre de formation d'apprentis).

| Collège | LV1 | LV2 | Anciennes | LCE | Bilangue | SI | CHA | Sport | Dispositifs |
|---|---|---|---|---|---|---|---|---|---|
| Collège privé Saint-Louis (0750182R) | anglais | allemand, espagnol | latin |  |  |  |  |  | ULIS |
| Collège Claude Chappe (0750360J) | anglais | allemand, espagnol | latin, grec |  | allemand, anglais |  |  |  | ULIS, UPE2A (élèves allophones) |
| Collège Beaumarchais (0750362L) | anglais | espagnol | latin, grec |  | allemand, anglais, espagnol |  |  |  | ULIS |
| Collège Pierre Jean de Béranger (0750387N) | anglais | allemand, espagnol, portugais | latin, grec |  | allemand, anglais, portugais |  |  |  |  |
| Collège Rognoni – École des enfants du spectacle (0750407K) | anglais | allemand, espagnol | latin, grec |  |  |  | arts du spectacle |  | ULIS |
| Collège Roland Dorgelès (0750429J) | anglais | allemand, chinois, espagnol | latin, grec |  | allemand, anglais |  |  |  | ULIS |
| Collège Georges Courteline (0750444A) | anglais | allemand, espagnol | latin, grec |  | allemand, anglais |  |  |  | ULIS |
| Collège Alberto Giacometti (0750445B) | anglais | allemand, espagnol, italien | latin |  | anglais, espagnol |  |  |  | SEGPA |
| Collège Lucie Aubrac (0750465Y) | anglais | allemand, chinois, espagnol | latin |  | allemand, anglais, chinois |  |  |  | ULIS, UPE2A (élèves allophones) |
| Collège Jean Baptiste Clément (0750478M) | anglais | allemand, chinois, espagnol | latin |  | allemand, anglais |  |  | handball | SEGPA |
| Collège Mozart (0750484U) | anglais | espagnol | latin |  | anglais, chinois, espagnol |  |  |  | ULIS |
| Collège Georges Brassens (0750507U) | anglais | allemand, espagnol | latin, grec |  | allemand, anglais, espagnol |  |  |  | SEGPA |
| Collège Moulin des Prés (0750525N) | anglais | allemand, espagnol | latin |  | allemand, anglais, arabe |  |  | volley ball | ULIS |
| Collège Georges Clemenceau (0750546L) | anglais | chinois, espagnol | latin |  | anglais, chinois, espagnol |  |  | escalade | UPE2A (élèves allophones) |
| Collège Lucie Faure (0750550R) | anglais | allemand, espagnol | latin, grec |  | allemand, anglais |  | théâtre |  | ULIS |
| Collège Françoise Dolto (0750552T) | anglais | allemand, arabe, espagnol | latin |  | allemand, anglais |  |  |  | ULIS |
| Collège Sonia Delaunay (0750575T) | anglais, espagnol | allemand, espagnol | latin |  | allemand, anglais, espagnol |  |  |  | ULIS, UPE2A (élèves allophones), Dispositif relais |
| Collège Valmy (0750584C) | anglais | allemand, espagnol | latin |  | allemand, anglais, espagnol |  |  |  | UPE2A (élèves allophones) |
| Collège Henri Matisse (0750591K) | anglais | allemand, espagnol, portugais | latin, grec |  | allemand, anglais |  |  |  | ULIS |
| Collège Alain Fournier (0750607C) | anglais | allemand, espagnol, italien | latin, grec |  | allemand, anglais |  |  |  | ULIS |
| Collège Anne Frank (0750608D) | anglais | allemand, espagnol | latin, grec |  | allemand, anglais |  |  |  | ULIS, UPE2A (élèves allophones) |
| Collège Paul Verlaine (0750609E) | anglais | allemand, chinois, espagnol | latin |  | allemand, anglais |  | théâtre |  |  |
| Collège Jules Verne (0750610F) | anglais | allemand, espagnol, italien | latin |  | allemand, anglais |  |  |  | ULIS |
| Collège Jean Moulin (0750611G) | anglais | allemand, chinois, espagnol | latin, grec |  | allemand, anglais |  |  | judo | ULIS |
| Collège Madame de Staël (0751563S) | anglais | allemand, espagnol, russe | latin, grec |  | allemand, anglais, russe |  |  |  | ULIS |
| Collège Jean Baptiste Poquelin (0751703U) | anglais | allemand, espagnol, italien | latin, grec |  | allemand, anglais, espagnol |  |  |  | ULIS, UPE2A (élèves allophones) |
| Collège Alphonse Daudet (0751705W) | anglais | allemand, espagnol | latin, grec |  | allemand, anglais |  |  | athletisme | ULIS |
| Collège Charles Péguy (0751706X) | anglais | allemand, chinois, espagnol | latin, grec |  | allemand, anglais, chinois | chinois |  |  | ULIS, UPE2A (élèves allophones) |
| Collège Édouard Pailleron (0751707Y) | anglais | allemand, espagnol | latin, grec |  | allemand, anglais |  |  |  | ULIS, SEGPA, UPE2A (élèves allophones) |
| Collège Pierre Alviset (0751790N) | anglais | allemand, espagnol, italien | latin, grec |  | allemand, anglais, italien |  |  |  | ULIS |
| Collège Condorcet (0751791P) | allemand, anglais | allemand, anglais, espagnol, italien, russe | latin, grec |  |  |  |  |  | ULIS |
| Collège Maurice Utrillo (0751793S) | anglais | allemand, espagnol | latin, grec |  | allemand, anglais |  |  |  | ULIS |
| Collège Pierre de Ronsard (0752107H) | anglais | allemand, espagnol, russe | latin, grec |  | allemand, anglais |  |  |  | ULIS |
| Collège Yvonne le Tac (0752108J) | anglais | allemand, espagnol, italien | latin, grec |  | anglais, espagnol |  |  | danse | ULIS |
| Collège Raymond Queneau (0752186U) | anglais | allemand, espagnol, russe | latin, grec |  | allemand, anglais, russe | britannique |  |  | ULIS |
| Collège Jacques Prévert (0752187V) | anglais | allemand, espagnol, italien | latin, grec |  | allemand, anglais | russe |  |  | ULIS, SEGPA |
| Collège Guy Flavien (0752189X) | allemand, anglais | allemand, anglais, espagnol, italien | latin, grec |  |  |  |  |  | ULIS, UPE2A (élèves allophones) |
| Collège Guillaume Apollinaire (0752190Y) | anglais | allemand, espagnol | latin, grec |  | allemand, anglais |  |  |  | ULIS, SEGPA, UPE2A (élèves allophones) |
| Collège Georges Duhamel (0752192A) | anglais | allemand, espagnol, italien | latin, grec |  | allemand, anglais, italien |  |  | escalade | ULIS |
| Collège Gérard Philipe (0752195D) | anglais | chinois, espagnol | latin, grec |  | anglais, espagnol |  | théâtre | baseball, basket-ball, rugby | ULIS |
| Collège Marx Dormoy (0752196E) | anglais | allemand, arabe, espagnol | latin, grec |  | allemand, anglais, arabe, espagnol |  |  |  | SEGPA |
| Collège Pierre Mendès-France (0752198G) | anglais | allemand, espagnol | latin, grec |  | allemand, anglais, espagnol |  |  | volley ball | ULIS, SEGPA |
| Collège César Franck (0752248L) | anglais, italien | anglais, espagnol, italien | latin, grec |  | anglais, italien |  |  |  |  |
| Collège Jules Romains (0752249M) | allemand, anglais | allemand, anglais, espagnol, italien | latin, grec |  | allemand, anglais |  |  |  | ULIS, UPE2A (élèves allophones) |
| Collège Paul Gauguin (0752250N) | anglais | allemand, chinois, espagnol | latin, grec |  | allemand, anglais, espagnol |  |  | volley ball | ULIS, UPE2A (élèves allophones) |
| Collège Louise Michel (0752251P) | anglais | allemand, espagnol | latin |  | anglais, espagnol |  |  |  | ULIS |
| Collège Hector Berlioz (0752252R) | anglais | allemand, anglais, espagnol | latin, grec |  |  |  |  |  | ULIS, SEGPA |
| Collège George Sand (0752316K) | anglais | allemand, espagnol |  |  | allemand, anglais, arabe |  |  | handball | ULIS |
| Collège Claude Debussy (0752317L) | anglais | allemand, chinois, espagnol | latin, grec |  | allemand, anglais, chinois |  |  |  |  |
| Collège Modigliani (0752318M) | anglais | allemand, espagnol, italien | latin, grec |  | allemand, anglais |  |  |  | ULIS |
| Collège Antoine Coysevox (0752319N) | anglais | allemand, chinois, espagnol | latin, grec |  | anglais, chinois, italien |  |  |  | ULIS |
| Collège Elsa Triolet (0752385K) | anglais | allemand, espagnol | latin, grec |  | allemand, anglais |  |  |  | ULIS, SEGPA, UPE2A (élèves allophones) |
| Collège André Malraux (0752387M) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  | UPE2A (élèves allophones) |
| Collège Montgolfier (0752523K) | anglais | allemand, chinois, espagnol | latin, grec |  | allemand, anglais, chinois |  |  | course d'orientation, football | ULIS |
| Collège Victor Hugo (0752524L) | anglais | allemand, espagnol, italien | latin, grec |  | allemand, anglais, italien |  | danse |  |  |
| Collège Charlemagne (0752525M) | anglais | allemand, espagnol, russe | latin, grec |  | allemand, anglais |  |  |  | ULIS |
| Collège Henri IV (0752526N) | allemand, anglais, russe | allemand, anglais, chinois, espagnol, italien | latin, grec |  | anglais, italien |  |  |  |  |
| Collège Montaigne (0752527P) | anglais, polonais, portugais | allemand, anglais, espagnol, italien, russe | latin, grec |  | allemand, anglais | britannique, polonaise, portugaise |  |  | ULIS |
| Collège Victor Duruy (0752528R) | allemand, anglais | anglais, chinois, espagnol, italien | latin, grec |  | allemand, anglais |  |  |  | ULIS, UPE2A (élèves allophones) |
| Collège Chaptal (0752529S) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  | allemand, anglais |  |  |  | ULIS |
| Collège Octave Gréard (0752530T) | allemand, anglais | allemand, anglais, espagnol, italien | latin, grec |  |  |  | danse, musique |  | ULIS |
| Collège Lavoisier (0752531U) | anglais | allemand, espagnol | latin, grec |  | allemand, anglais |  |  |  | ULIS |
| Collège Jacques Decour (0752532V) | anglais | allemand, chinois, espagnol, italien | latin, grec |  | allemand, anglais, chinois | chinoise |  |  | ULIS, UPE2A (élèves allophones) |
| Collège Jules Ferry (0752533W) | allemand, anglais, russe | anglais, espagnol, italien, russe | latin, grec |  | anglais, russe |  |  |  | ULIS |
| Collège Alphonse de Lamartine (0752534X) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  |  |  | danse, musique |  | ULIS |
| Collège Voltaire (0752536Z) | anglais | allemand, arabe, espagnol, italien, japonais | latin, grec |  | allemand, anglais, espagnol | britannique | danse, musique |  | ULIS |
| Collège Paul Valéry (0752537A) | anglais | allemand, espagnol, italien | latin, grec | anglais | allemand, anglais |  |  | natation, natation et activ.sportiv. aquatiques, sport-études multi-activités | ULIS |
| Collège Rodin (0752538B) | anglais | allemand, espagnol, italien | latin, grec |  | anglais, italien |  | théâtre |  | UPE2A (élèves allophones) |
| Collège Claude Monet (0752539C) | anglais | allemand, arabe, espagnol, italien | latin |  | allemand, anglais | arabe | musique |  | ULIS |
| Collège Gabriel Fauré (0752540D) | allemand, anglais | espagnol, italien | latin, grec |  | allemand, anglais | chinoise |  |  |  |
| Collège Jean-François Oeben (0752542F) | anglais | allemand, italien | latin, grec |  | allemand, anglais |  | danse | danse | ULIS |
| Collège Paul Bert (0752543G) | anglais | allemand, espagnol, italien | latin, grec |  | allemand, anglais |  |  |  |  |
| Collège François Villon (0752544H) | anglais | espagnol, italien | latin |  | anglais, italien |  | musique | football, sport-études multi-activités | UPE2A (élèves allophones) |
| Collège Buffon (0752545J) | allemand, anglais | allemand, anglais, espagnol, italien | latin, grec |  |  |  |  |  | ULIS |
| Collège Camille Sée (0752546K) | allemand, anglais | allemand, anglais, espagnol, italien | latin, grec |  | allemand, anglais | britannique, italienne |  | sport-études multi-activités | ULIS, UPE2A (élèves allophones) |
| Collège Claude Bernard (0752547L) | anglais | allemand, chinois, espagnol, italien | latin |  | allemand, anglais |  |  | sport-études multi-activités | ULIS |
| Collège Janson de Sailly (0752548M) | anglais, chinois | allemand, chinois, espagnol, italien | latin, grec |  | allemand, anglais, chinois, italien | chinoise |  |  | ULIS, UPE2A (élèves allophones), Dispositif relais |
| Collège Jean-Baptiste Say (0752549N) | anglais | allemand, espagnol, italien, russe | latin, grec |  | allemand, anglais |  |  |  | ULIS |
| Collège Jean de La Fontaine (0752550P) | anglais, chinois, japonais, vietnamien | allemand, anglais, chinois, espagnol, italien, japonais, vietnamien | latin, grec |  | anglais, chinois, japonais | chinoise, japonaise | danse, musique |  |  |
| Collège Molière (0752551R) | anglais | allemand, espagnol, italien, portugais | latin, grec |  | allemand, anglais, portugais |  |  |  | ULIS, UPE2A (élèves allophones) |
| Collège Carnot (0752552S) | anglais | allemand, chinois, espagnol | latin, grec |  | allemand, anglais, chinois |  |  |  | ULIS |
| Collège Honoré de Balzac (0752553T) | allemand, anglais, arabe, espagnol, italien, portugais | allemand, anglais, arabe, espagnol | latin |  | allemand, anglais, arabe, espagnol | allemande, arabe, britannique, espagnole, italienne, portugaise |  |  |  |
| Collège Stéphane Mallarmé (0752554U) | anglais | allemand, espagnol, italien, portugais | latin, grec |  | allemand, anglais, portugais |  |  | handball | ULIS, UPE2A (élèves allophones) |
| Collège Henri Bergson (0752555V) | anglais | allemand, espagnol, italien | latin |  | allemand, anglais | chinois |  | sport-études multi-activités | ULIS, UPE2A (élèves allophones) |
| Collège Hélène Boucher (0752556W) | anglais | allemand, espagnol | latin, grec |  | allemand, anglais |  |  |  | ULIS |
| Collège Maurice Ravel (0752557X) | anglais | allemand, chinois, espagnol | latin, grec |  | allemand, anglais, espagnol, portugais | britannique |  |  |  |
| Collège Georges Méliès (0752606A) | anglais | allemand, espagnol | latin |  | allemand, anglais, espagnol |  |  |  | ULIS |
| Collège François Couperin (0752693V) | anglais | allemand, espagnol, italien | latin, grec |  | allemand, anglais |  | musique |  | ULIS, UPE2A (élèves allophones) |
| Collège Camille Claudel (0752694W) | anglais, chinois | chinois, espagnol | latin, grec |  |  |  |  | football | UPE2A (élèves allophones), Dispositif relais |
| Collège Guillaume Budé (0752695X) | anglais | arabe, espagnol | latin, grec |  | anglais, portugais |  |  |  | Dispositif relais |
| Collège Léon Gambetta (0752696Y) | anglais | allemand, chinois, espagnol | latin, grec |  | allemand, anglais, chinois |  |  |  | ULIS |
| Collège privé École active bilingue Monceau (0752821J) | anglais | allemand, espagnol, italien | latin |  |  | britannique |  |  |  |
| Collège Bernard Palissy (0752829T) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  |  |  |  |  | ULIS |
| Collège privé Fénelon Sainte-Marie (0752842G) | anglais | allemand, espagnol | latin, grec |  |  |  |  |  | ULIS |
| Collège privé Blomet (0752843H) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  | allemand, anglais |  |  |  |  |
| Collège privé Saint-Jean de Passy (0752870M) | anglais | allemand, espagnol | latin |  |  |  |  |  |  |
| Collège privé L'École alsacienne (0752874S) | anglais | allemand, chinois, espagnol, italien | latin |  |  |  | musique |  |  |
| Collège privé Paul Claudel d'Hulst (0752882A) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  |  |
| Collège privé Sainte-Jeanne-Élisabeth (0752894N) | anglais | allemand, espagnol | latin |  |  |  |  |  |  |
| Collège privé Charles Péguy (0752895P) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  |  |  |  |  |  |
| Collège privé Notre-Dame de France (0752896R) | allemand, anglais | espagnol | latin |  | allemand, anglais |  |  |  |  |
| Collège privé de la Tour (0752897S) | allemand, anglais | allemand, espagnol, italien, russe | latin, grec |  |  |  |  |  |  |
| Collège privé Sainte-Ursule Louise de Bettignies (0752898T) | anglais | allemand, espagnol | latin, grec |  |  |  |  |  | ULIS |
| Collège privé La Rochefoucauld (0752899U) | anglais | allemand, espagnol | latin |  |  |  |  |  |  |
| Collège privé Stanislas (0752900V) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  |  |  |  |  | ULIS, SEGPA |
| Collège privé Sainte-Élisabeth (0752901W) | anglais | allemand, espagnol | latin |  |  |  |  |  | ULIS |
| Collège privé des Francs Bourgeois (0752902X) | anglais | allemand, chinois, espagnol | latin, grec |  | allemand, anglais, espagnol |  |  |  | ULIS |
| Collège privé Yabné (0752906B) | anglais | espagnol, hébreu moderne | latin |  |  |  |  |  |  |
| Collège privé Eugène Napoléon Saint-Pierre Fourier (0752911G) | anglais | allemand, chinois, espagnol | latin |  |  |  |  |  | ULIS |
| Collège privé de l'Alma (0752912H) | anglais | allemand, espagnol | latin |  |  |  |  |  |  |
| Collège privé Sévigné (0752913J) | anglais | allemand, espagnol, italien | latin, grec |  |  |  |  |  |  |
| Collège privé Morvan (0752916M) | anglais | espagnol |  |  |  |  |  |  | ULIS |
| Collège privé Saint-Louis de Gonzague (0752917N) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  |  |  |  |  |  |
| Collège privé Notre-Dame des Oiseaux (0752918P) | anglais | espagnol | latin, grec |  | allemand, anglais |  |  |  |  |
| Collège privé Pascal (0752919R) | anglais | allemand, espagnol | latin |  | anglais |  |  |  |  |
| Collège privé Massillon (0752920S) | anglais | allemand, espagnol | latin |  |  |  |  |  |  |
| Collège privé Rocroy Saint-Vincent de Paul (0752923V) | anglais | allemand, espagnol | latin |  | allemand, anglais, espagnol |  |  |  |  |
| Collège privé Saint-Sulpice (0752924W) | anglais | allemand, espagnol, italien | latin |  |  |  |  |  |  |
| Collège privé Sainte-Geneviève (0752925X) | anglais | allemand, espagnol | latin |  |  |  |  |  |  |
| Collège privé Gerson (0752926Y) | allemand, anglais | allemand, anglais, espagnol | latin |  |  |  |  |  |  |
| Collège privé Saint-Michel des Batignolles (0752927Z) | allemand, anglais | espagnol | latin |  | allemand, anglais |  |  |  |  |
| Collège privé Saint-Michel de Picpus (0752934G) | anglais | allemand, espagnol, russe | latin, grec |  | allemand, anglais |  |  |  | ULIS |
| Collège privé École active bilingue Jeannine Manuel (0752935H) | anglais | allemand, chinois, espagnol, italien | latin |  |  | américaine |  |  |  |
| Collège privé de l'Assomption (0752936J) | anglais | allemand, espagnol, italien | latin |  | allemand, anglais |  |  |  |  |
| Collège privé France Quéré - Association Votre école chez vous (0752954D) | allemand, anglais, espagnol | anglais, espagnol |  |  |  |  |  |  |  |
| Collège Georges Braque (0752957G) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  | allemand, anglais, espagnol |  |  | rugby | ULIS |
| Collège Boris Vian (0752958H) | anglais | allemand, espagnol, italien | latin, grec |  | allemand, anglais, italien |  |  | sport-études multi-activités | ULIS |
| Collège Flora Tristan (0753046D) | anglais | allemand, espagnol | latin, grec |  | allemand, anglais |  |  | athletisme | ULIS, UPE2A (élèves allophones), Dispositif relais |
| Collège la Grange aux Belles (0753047E) | anglais | allemand, espagnol, italien | latin |  | allemand, anglais, italien |  |  |  | ULIS, UPE2A (élèves allophones) |
| Collège privé Sinaï (0753206C) | anglais | espagnol, hébreu moderne |  |  |  |  |  |  | ULIS |
| Collège Edmond Michelet (0753345D) | anglais | allemand, espagnol | latin, grec |  | allemand, anglais, espagnol |  |  | football en salle (futsal), futsal | ULIS |
| Collège privé Beth Hanna (0753369E) | anglais | hébreu moderne |  |  |  |  |  |  |  |
| Collège privé Saint-Vincent (0753381T) | anglais | allemand, chinois | latin |  |  |  |  |  | UPE2A (élèves allophones) |
| Collège privé Beth Yacov (0753387Z) | anglais | espagnol, hébreu moderne |  |  |  |  |  |  |  |
| Collège Gustave Flaubert (0753518S) | allemand, anglais | anglais, coréen, espagnol | latin, grec |  | allemand, anglais |  |  |  | ULIS, Dispositif relais |
| Collège privé Thérèse Chappuis (0753854G) | anglais | espagnol | latin |  |  |  |  |  |  |
| Collège privé Sainte-Clotilde (0753896C) | allemand, anglais | allemand, anglais, espagnol | latin |  |  |  |  |  | ULIS |
| Collège privé La Bruyère Sainte-Isabelle (0753908R) | allemand, anglais, espagnol | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  |  |  |
| Collège Germaine Tillion (0753936W) | anglais | allemand, espagnol | latin, grec |  | allemand, anglais |  | musique | handball | SEGPA, Dispositif relais |
| Collège Évariste Galois (0753937X) | anglais | allemand, espagnol | latin |  | allemand, anglais, espagnol |  |  | basket-ball | ULIS |
| Collège Georges Rouault (0753938Y) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  | basket-ball | ULIS, UPE2A (élèves allophones) |
| Collège Jean Perrin (0753939Z) | anglais | allemand, espagnol | latin, grec |  | allemand, anglais |  | théâtre | football, volley-ball | UPE2A (élèves allophones) |
| Collège privé Saint-Jean-Gabriel (0753965C) | anglais | allemand, espagnol |  |  |  |  |  |  |  |
| Collège privé Sœur Rosalie (0753967E) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  |  |  |  |  |  |
| Collège privé Saint-Ambroise (0753978S) | anglais | allemand, espagnol | latin |  |  |  |  |  |  |
| Collège privé La Salle – Notre-Dame de la Gare (0753982W) | anglais | allemand, chinois, espagnol | latin |  |  |  |  |  |  |
| Collège privé Saint-Vincent-de-Paul (0753985Z) | allemand, anglais | allemand, anglais, espagnol, italien | latin |  | allemand, anglais |  |  |  | ULIS |
| Collège privé Saint-Joseph (0753992G) | anglais | allemand, espagnol | latin |  |  |  |  |  |  |
| Collège privé Saint-Honoré d'Eylau (0753996L) | anglais | allemand, espagnol | latin |  |  |  |  |  |  |
| Collège privé Lucien de Hirsch (0754003U) | anglais | espagnol, hébreu moderne |  |  |  |  |  |  |  |
| Collège privé Saint-Georges (0754004V) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  |  |
| Collège privé Saint-Germain de Charonne (0754005W) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  | UPE2A (élèves allophones) |
| Collège privé Notre-Dame de Lourdes (0754006X) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  | ULIS |
| Collège privé Sainte-Louise (0754007Y) | anglais | allemand, espagnol | latin |  |  |  |  |  |  |
| Collège privé Saint-Louis (0754008Z) | anglais | espagnol |  |  |  |  |  |  | ULIS |
| Collège Saint-Exupéry (0754253R) | anglais | allemand, espagnol | latin, grec |  | allemand, anglais |  |  |  |  |
| Collège privé Ozar Hatorah (0754290F) | anglais | espagnol, hébreu moderne |  |  |  |  |  |  | ULIS |
| Collège André Citroën (0754305X) | anglais | allemand, espagnol, italien | latin, grec |  | allemand, anglais |  |  |  | ULIS, UPE2A (élèves allophones) |
| Collège Robert Doisneau (0754355B) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  | allemand, anglais |  |  |  | ULIS, SEGPA, UPE2A (élèves allophones) |
| Ecole secondaire privée Eurécole (0754407H) |  |  |  |  |  |  |  |  |  |
| Collège privé Bossuet Notre-Dame (0754506R) | anglais | allemand, chinois, espagnol | latin |  |  |  |  |  |  |
| Collège Pilâtre de Rozier (0754528P) | anglais | allemand, espagnol | latin, grec |  | allemand, anglais |  |  |  | ULIS, SEGPA |
| Collège Marie Curie (0754706H) | anglais | allemand, espagnol, portugais | latin, grec |  | allemand, anglais, portugais |  | musique |  | ULIS, UPE2A (élèves allophones) |
| Collège privé Notre-Dame de Sion (0754757N) | anglais | allemand, espagnol | latin |  |  |  |  |  |  |
| Collège privé Georges Leven (0754853T) | anglais | espagnol, hébreu moderne |  |  |  |  |  |  |  |
| Collège privé Regain Tournesol (0754861B) | anglais |  |  |  |  |  |  |  | ULIS |
| Collège Thomas Mann (0755000C) | anglais | allemand, espagnol, italien | latin, grec |  | allemand, anglais |  |  |  | UPE2A (élèves allophones) |
| Collège privé Heikhal Menahem Sinaï (0755029J) | anglais | hébreu moderne |  |  |  |  |  |  |  |
| Collège Daniel Mayer (0755030K) | anglais | allemand, espagnol | latin |  | allemand, anglais, espagnol |  |  |  | ULIS |
| Collège privé N'R Hatorah (0755052J) | anglais | hébreu moderne |  |  | anglais, hébreu moderne |  |  |  |  |
| Ecole Secondaire Privée Yechiva Torah Werahamim (0755089Z) |  |  |  |  |  |  |  |  |  |
| Collège Edgar Varèse (0755095F) | anglais | allemand, espagnol | latin, grec |  |  |  | musique |  | ULIS, Dispositif relais |
| Collège privé Gaston Tenoudji (0755192L) | anglais, hébreu moderne | espagnol |  |  |  |  |  |  |  |
| Collège Colette Besson (0755241P) | anglais | allemand, espagnol | latin, grec |  | allemand, anglais |  |  | danse, hip-hop | ULIS |
| Collège Aimé Césaire (0755433Y) | allemand, anglais | anglais, espagnol | latin |  | allemand, anglais |  |  |  | ULIS, SEGPA |
| Collège privé Georges Gusdorf (0755496S) |  |  |  |  |  |  |  |  |  |
| Ecole Secondaire Privée du Cerene (0755726S) |  |  |  |  |  |  |  |  |  |
| Collège Suzanne Lacore Paris Nord Est (0755747P) | anglais | espagnol |  |  | anglais, italien |  |  |  | ULIS, Dispositif relais |
| Ecole générale et technologique privée Cours Progress (0755757A) |  |  |  |  |  |  |  |  |  |
| Collège Kingsworth International School (0755773T) |  |  |  |  |  |  |  |  |  |
| Collège Françoise Seligmann (0755778Y) | anglais | espagnol, italien |  |  | anglais, italien |  |  |  | ULIS |
| Collège La Rose blanche (0755779Z) | anglais | allemand, espagnol |  |  |  |  |  |  | SEGPA |
| Collège privé Cours du Pont de Pierre (0755799W) |  |  |  |  |  |  |  |  |  |
| Collège privé Catherine Labouré (0755840R) | anglais | allemand, espagnol | latin |  |  |  | danse |  |  |
| Collège privé ICS Paris (0755848Z) |  |  |  |  |  |  |  |  |  |
| Collège privé Ecole Démocratique de Paris (0755879H) |  |  |  |  |  |  |  |  |  |
| Ecole Canadienne Internationale de Paris (0755897C) |  |  |  |  |  |  |  |  |  |
| Collège privé Diago (0755925H) |  |  |  |  |  |  |  |  |  |
| Collège privé Galilée la faculté des enfants (0755949J) |  |  |  |  |  |  |  |  |  |
| Collège privé Saint-Jean de Dieu (0756020L) | anglais | espagnol |  |  |  |  |  |  | ULIS |
| Collège privé Autism Friendly Académie (0756021M) |  |  |  |  |  |  |  |  |  |
| Collège privé La classe du phare (0756051V) |  |  |  |  |  |  |  |  |  |
| Collège privé Paris FC (0756057B) |  |  |  |  |  |  |  |  |  |
| Collège privé L'Autre Collège (0756105D) |  |  |  |  |  |  |  |  |  |
| Collège privé Living School (0756120V) |  |  |  |  |  |  |  |  |  |
| Collège privé Ecole Walt (0756123Y) |  |  |  |  |  |  |  |  |  |
| Collège privé Beth Aaron (0756124Z) | anglais | hébreu moderne |  |  |  |  |  |  |  |
| Collège privé Montessori (0756191X) |  |  |  |  |  |  |  |  |  |
| Collège privé Ellipse Montessori (0756197D) |  |  |  |  |  |  |  |  |  |
| Collège privé École Diagonale (0756203K) |  |  |  |  |  |  |  |  |  |
| Collège privé Cours Molière (0756204L) |  |  |  |  |  |  |  |  |  |
| Collège privé Ecole Juive Moderne (0756234U) |  |  |  |  |  |  |  |  |  |
| Ecole Secondaire Privée Lab School (0756272K) |  |  |  |  |  |  |  |  |  |
| Ecole Secondaire Privée Maigret (0756273L) |  |  |  |  |  |  |  |  |  |
| Ecole Secondaire Privée International School of Paris (0756274M) |  |  |  |  |  |  |  |  |  |
| Collège privé Cours Montaigne (0756278S) |  |  |  |  |  |  |  |  |  |
| Collège privé BETH SEFER YAD MORDEKHAI (0756282W) |  |  |  |  |  |  |  |  |  |
| Collège privé CONCORDIA BILINGUAL SCHOOL (0756486T) |  |  |  |  |  |  |  |  |  |
| Collège privé Ecole A (0756489W) |  |  |  |  |  |  |  |  |  |
| Collège privé MONTESSORI PARIS 17 31 boulevard Berthier (0756519D) |  |  |  |  |  |  |  |  |  |
| Collège privé CERENE (0756527M) |  |  |  |  |  |  |  |  |  |
| Collège Privé Ma petite école Montessori Villafranca (0756727E) |  |  |  |  |  |  |  |  |  |
| Collège Privé Ma petite école Montessori Dantzig (0756728F) |  |  |  |  |  |  |  |  |  |
| Collège Privé Montessori Esclaibes (0756747B) |  |  |  |  |  |  |  |  |  |
| Collège Privé Ipecom (0756786U) |  |  |  |  |  |  |  |  |  |
| ECS Cerene (0756801K) |  |  |  |  |  |  |  |  |  |
| Collège privé ABI SCHOOL 12 rue Charles Pouillet (0756898R) |  |  |  |  |  |  |  |  |  |
| Collège Denecourt (0770002J) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  | allemand, anglais |  |  |  | ULIS |
| Collège Jean Rostand (0770003K) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  | allemand, anglais |  |  |  | ULIS |
| Collège Jean Jaurès (0770005M) | anglais | espagnol | latin |  |  |  |  |  | ULIS |
| Collège Blanche de Castille (0770009S) | anglais | espagnol, italien | latin |  |  |  |  |  | ULIS |
| Collège Pierre Roux (0770010T) | allemand, anglais | espagnol | latin, grec |  |  |  |  | gymnastique, gymnastique artistique |  |
| Collège Camille Corot (0770013W) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  | allemand, anglais, arabe |  |  |  | ULIS, Dispositif relais |
| Collège parc des Tourelles (0770014X) | anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  | danse |  |
| Collège Robert Doisneau (0770019C) | allemand, anglais | allemand, anglais, espagnol, italien | latin |  | allemand, anglais |  |  | football en salle (futsal), futsal | ULIS, SEGPA |
| Collège du Montois (0770020D) | anglais | espagnol | latin |  |  |  | mathématiques et sciences |  | ULIS |
| Collège La Rochefoucauld (0770024H) | allemand, anglais | allemand, anglais, espagnol | latin, grec | anglais | allemand, anglais |  |  | danse, hip-hop | ULIS, Dispositif relais, 3e prépa-métiers |
| Collège Marcel Rivière (0770027L) | anglais | allemand, espagnol | latin, grec |  |  |  |  |  | ULIS |
| Collège Jacques Prévert (0770030P) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  |  | ULIS |
| Collège Parc Frot (0770032S) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  |  | ULIS, UPE2A (élèves allophones), Dispositif relais |
| Collège les Capucins (0770033T) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  | volley ball | ULIS, UPE2A (élèves allophones), Dispositif relais |
| Collège Alfred Sisley (0770038Y) | allemand, anglais | anglais, chinois, espagnol, italien | latin, grec |  |  |  |  |  | ULIS |
| Collège René Barthélémy (0770040A) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  | allemand, anglais |  |  |  | ULIS, UPE2A (élèves allophones), 3e prépa-métiers |
| Collège Émile Chevallier (0770048J) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  |  |
| Collège Jean Baptiste Vermay (0770051M) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  |  | ULIS, SEGPA |
| Collège Elsa Triolet (0770053P) | allemand, anglais | allemand, espagnol | latin |  |  |  |  |  | ULIS |
| Collège les Creusottes (0770057U) | anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  | arts plastiques |  | ULIS |
| Collège les Tournelles (0770059W) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  |  | ULIS |
| Collège international (0770928R) | allemand, anglais, portugais, russe | allemand, anglais, espagnol | latin, grec |  |  | allemande, britannique |  | course d'orientation |  |
| Collège Henri Dunant (0771029A) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  | musique | football | UPE2A (élèves allophones), Dispositif relais, 3e prépa-métiers |
| Collège Rosa Bonheur (0771068T) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  | allemand, anglais |  |  |  | ULIS |
| Collège Fréderic Chopin (0771070V) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  | musique |  | ULIS, UPE2A (élèves allophones) |
| Collège Albert Camus (0771172F) | allemand, anglais | anglais, espagnol | latin |  | allemand, anglais, espagnol | allemande |  | athletisme, rugby | ULIS, SEGPA, UPE2A (élèves allophones) |
| Collège Henri IV (0771173G) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  | anglais, espagnol |  |  |  | UPE2A (élèves allophones) |
| Collège Pierre de Montereau (0771174H) | allemand, anglais | allemand, anglais, espagnol | latin |  |  |  |  | basket-ball | ULIS |
| Collège Condorcet (0771175J) | allemand, anglais | allemand, anglais, espagnol, portugais | latin |  | allemand, anglais |  |  | badminton | ULIS |
| Collège Jules Verne (0771176K) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  |  | ULIS, SEGPA, Dispositif relais, 3e prépa-métiers |
| Collège René Goscinny (0771177L) | anglais | anglais, espagnol | latin, grec |  | anglais, espagnol |  |  | sport-études canoe kayak | ULIS, UPE2A (élèves allophones) |
| Collège la Mare aux Champs (0771178M) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  | gymnastique rythmique, gymnastique rythmique et sportive, sport-études patinage artistique | ULIS |
| Collège Sainte-Croix (0771216D) | allemand, anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  |  |
| Collège Sainte-Thérèse (0771217E) | allemand, anglais, chinois | allemand, anglais, chinois, espagnol | latin |  |  |  |  |  |  |
| Collège Sainte-Marie - La Roche aux Coqs (0771218F) | allemand, anglais | anglais, espagnol | latin, grec |  | allemand, anglais |  |  |  |  |
| Collège Sainte-Marie (0771220H) | anglais | allemand, espagnol | latin |  |  |  |  |  |  |
| Collège privé Sainte-Céline (0771222K) | allemand, anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  |  |
| Collège privé Sainte-Colombe (0771225N) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  |  |
| Collège institution Sainte-Foy (0771233X) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  |  |
| Collège Sainte-Thérèse (0771236A) | anglais | allemand, espagnol | latin |  |  |  |  |  |  |
| Collège Paul Langevin (0771331D) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  |  | SEGPA, UPE2A (élèves allophones) |
| Collège Gérard Philipe (0771333F) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  | allemand, anglais |  |  | badminton, football | ULIS, UPE2A (élèves allophones) |
| Collège Gérard Philipe (0771334G) | allemand, anglais | anglais, espagnol | latin |  | allemand, anglais |  |  |  |  |
| Collège Elsa Triolet (0771337K) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  |  | UPE2A (élèves allophones), Dispositif relais, 3e prépa-métiers |
| Collège Pierre Brossolette (0771339M) | anglais | allemand, espagnol | latin |  |  |  |  | football | ULIS, SEGPA, UPE2A (élèves allophones), Dispositif relais |
| Collège Fernand Gregh (0771342R) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  | allemand, anglais |  |  |  | ULIS, SEGPA |
| Collège Louis Braille (0771361L) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  | allemand, anglais |  |  |  | ULIS, SEGPA |
| Collège Camille Saint-Saens (0771362M) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  | allemand, anglais |  |  |  | ULIS |
| Collège Arthur Chaussy (0771363N) | allemand, anglais | allemand, anglais, espagnol, italien | latin, grec | anglais | allemand, anglais |  |  |  | ULIS, SEGPA |
| Collège Jean Vilar (0771365R) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  |  | ULIS |
| Collège Jean Moulin (0771419Z) | anglais | allemand, anglais, espagnol, portugais | latin |  | anglais, portugais |  |  | football | UPE2A (élèves allophones), 3e prépa-métiers |
| Collège Beaumarchais (0771420A) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  | gymnastique artistique, sport-études gymnastique | ULIS, SEGPA |
| Collège les Hyverneaux (0771421B) | anglais | allemand, espagnol | latin |  |  |  |  | gymnastique rythmique et sportive | ULIS |
| Collège de la Vallée (0771422C) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  | allemand, anglais |  |  | handball, sport-études handball | ULIS, SEGPA |
| Collège Lucien Cézard (0771424E) | allemand, anglais, portugais | allemand, anglais, espagnol, italien | latin, grec |  | allemand, anglais, chinois, portugais | portugaise |  |  | ULIS |
| Collège Pierre Weczerka (0771471F) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  | musique |  | ULIS |
| Collège le Moulin à Vent (0771472G) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  | allemand, anglais |  |  |  |  |
| Collège les Aulnes (0771475K) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  |  | ULIS, SEGPA |
| Collège Georges Politzer (0771476L) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  |  | ULIS, UPE2A (élèves allophones) |
| Collège Arthur Rimbaud (0771478N) | allemand, anglais | anglais, espagnol | latin |  |  |  |  |  | ULIS, SEGPA, 3e prépa-métiers |
| Collège Armand Lanoux (0771511Z) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  |  |  |
| Collège Hippolyte Rémy (0771513B) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  | allemand, anglais |  |  |  | SEGPA |
| Collège des Remparts (0771514C) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  | allemand, anglais |  |  |  | ULIS |
| Collège Lelorgne de Savigny (0771515D) | allemand, anglais | allemand, anglais, espagnol | latin, grec | anglais | allemand, anglais |  |  |  | ULIS |
| Collège François Villon (0771517F) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  | allemand, anglais |  |  | escalade |  |
| Collège Louis Armand (0771518G) | allemand, anglais | anglais, espagnol | latin |  | allemand, anglais |  | musique |  | ULIS |
| Collège Louise Michel (0771519H) | allemand, anglais | anglais, espagnol | latin, grec |  | allemand, anglais |  |  | duathlon, triathlon |  |
| Collège Jean-Jacques Rousseau (0771562E) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  | allemand, anglais |  |  |  | 3e prépa-métiers |
| Collège Eugène Delacroix (0771563F) | allemand, anglais | allemand, anglais, espagnol, italien | latin |  | allemand, anglais |  | mathématiques et sciences |  | UPE2A (élèves allophones) |
| Collège Paul Éluard (0771567K) | allemand, anglais | anglais, espagnol | latin |  | allemand, anglais |  |  |  | ULIS, SEGPA, Dispositif relais |
| Collège Georges Brassens (0771615M) | allemand, anglais | allemand, espagnol | latin |  | allemand, anglais |  |  | volley-ball |  |
| Collège les Maillettes (0771618R) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  |  | ULIS |
| Collège Charles Péguy (0771619S) | allemand, anglais | allemand, anglais, espagnol, portugais | latin |  | allemand, anglais |  |  | escrime | ULIS |
| Collège Nicolas Fouquet (0771620T) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  |  | ULIS |
| Collège Honoré de Balzac (0771621U) | anglais | allemand, espagnol | latin |  |  |  |  |  |  |
| Collège Nellie Bly (0771656G) | anglais | allemand, espagnol | latin |  |  |  |  |  | ULIS, SEGPA |
| Collège Anceau de Garlande (0771657H) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  | allemand, anglais |  |  |  | ULIS, SEGPA |
| Collège la Plaine des Glacis (0771659K) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  | triathlon, vélo tout-terrain, vtt | SEGPA |
| Collège Jean Campin (0771661M) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  |  | ULIS, SEGPA |
| Collège le grand parc (0771662N) | allemand, anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  | ULIS |
| Collège Mon Plaisir (0771667U) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  |  | ULIS |
| Collège privé Beth Myriam (0771668V) |  |  |  |  |  |  |  |  |  |
| Collège de l'Europe (0771759U) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  |  | SEGPA, Dispositif relais |
| Collège Madame de La Fayette (0771760V) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  |  | ULIS, 3e prépa-métiers |
| Collège André Malraux (0771761W) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  | allemand, anglais | britannique |  |  | UPE2A (élèves allophones), Dispositif relais |
| Collège Jacques Amyot (0771762X) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  | allemand, anglais, russe |  |  |  | ULIS |
| Collège Beau Soleil (0771766B) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  | allemand, anglais |  |  |  | ULIS, SEGPA |
| Collège les 4 Arpents (0771768D) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  | ULIS, SEGPA |
| Collège Jacques Prévert (0771770F) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  | allemand, anglais |  | théâtre |  | ULIS |
| Collège le Luzard (0771841H) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  |  | ULIS, UPE2A (élèves allophones) |
| Collège Jacques Monod (0771878Y) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  | allemand, anglais |  |  |  | ULIS, SEGPA |
| Collège les Tilleuls (0771911J) | anglais | allemand, espagnol | latin |  |  |  |  | tennis | ULIS |
| Collège Jean des Barres (0771912K) | allemand, anglais | allemand, anglais, espagnol | latin |  |  |  |  |  | ULIS, SEGPA |
| Collège Bautain (0771917R) | anglais | allemand, espagnol | latin |  |  |  |  |  |  |
| Collège Saint-Laurent-La Paix Notre-Dame (0771918S) | allemand, anglais, espagnol | allemand, espagnol | latin |  | allemand, anglais, espagnol |  |  | escalade |  |
| Collège Sainte-Marie (0771921V) | allemand, anglais, espagnol | allemand, espagnol | latin, grec |  | allemand, anglais, espagnol |  |  |  | ULIS |
| Collège Jeanne d'Arc (0771923X) | anglais | allemand, espagnol, italien | latin, grec | anglais | allemand, anglais, espagnol |  |  |  | ULIS |
| Collège Jeanne d'Arc-Saint-Aspais (0771925Z) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  |  |  |
| Collège Guy Gasnier - Sainte-Bathilde (0771926A) | anglais, espagnol | allemand, espagnol | latin |  | anglais, espagnol |  |  |  |  |
| Collège Nazareth (0771930E) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  |  |  |
| Collège les Cités Unies (0771959L) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  | gymnastique, gymnastique artistique, sport-études gymnastique |  |
| Collège Henri Wallon (0771960M) | allemand, anglais | allemand, espagnol | latin |  | allemand, anglais |  |  | football | ULIS, SEGPA |
| Collège Louis Aragon (0771991W) | anglais | allemand, espagnol | latin |  |  |  |  | handball | ULIS, UPE2A (élèves allophones) |
| Collège la Maillière (0771992X) | anglais | allemand, espagnol | latin, grec |  |  |  |  | canoe et canoe kayak, canoë-kayak | ULIS |
| Collège Georges Brassens (0771993Y) | anglais | allemand, espagnol, portugais | latin, grec |  | anglais, portugais |  |  | handball, tir sportif |  |
| Collège Jean de La Fontaine (0772056S) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  |  | ULIS |
| Collège Jean Wiener (0772090D) | allemand, anglais | allemand, anglais, espagnol | latin |  |  |  |  |  | ULIS, SEGPA |
| Collège le Bois de l'Enclume (0772091E) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  | allemand, anglais |  |  | athletisme, canoë-kayak | ULIS |
| Collège Van Gogh (0772119K) | allemand, anglais | anglais, espagnol | latin |  | allemand, anglais |  |  |  | UPE2A (élèves allophones), 3e prépa-métiers |
| Collège le Segrais (0772125S) | anglais | allemand, espagnol | latin |  |  |  |  |  | ULIS, UPE2A (élèves allophones) |
| Collège Robert Buron (0772126T) | allemand, anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  | ULIS |
| Collège Saint-Louis (0772128V) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  |  | ULIS, UPE2A (élèves allophones) |
| Ecole secondaire privée Ecole de la Neuville (0772150U) |  |  |  |  |  |  |  |  |  |
| Collège Léonard de Vinci (0772154Y) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  | allemand, anglais |  |  |  | ULIS |
| Collège Hutinel (0772189L) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  | allemand, anglais |  |  | football | ULIS, Dispositif relais |
| Collège de l'Europe (0772190M) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  | judo | ULIS |
| Collège La Boétie (0772191N) | anglais | allemand, espagnol | latin |  |  |  |  | badminton | Dispositif relais, 3e prépa-métiers |
| Collège Jacques-Yves Cousteau (0772226B) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  | mathématiques et sciences, musique |  |  |
| Collège Stephane Mallarmé (0772227C) | anglais | allemand, espagnol | latin |  |  |  |  |  |  |
| Collège le Champivert (0772246Y) | anglais | allemand, anglais, espagnol | latin, grec |  |  |  |  |  | ULIS, SEGPA |
| Collège George Sand (0772247Z) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  | allemand, anglais, portugais |  |  |  | ULIS |
| Collège George Sand (0772248A) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  |  | ULIS |
| Collège La Grange du Bois (0772274D) | anglais | allemand, espagnol | latin, grec |  |  |  |  | athletisme | ULIS, 3e prépa-métiers |
| Collège Marie Laurencin (0772293Z) | anglais | allemand, espagnol, italien | latin |  |  |  |  |  | ULIS |
| Collège Pablo Picasso (0772330P) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  | allemand, anglais |  | musique |  |  |
| Collège Monthéty (0772331R) | anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  | handball, natation, natation et activ.sportiv. aquatiques | ULIS |
| Collège Maria Callas (0772396L) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  | ultimate | ULIS |
| Collège Anne Frank (0772413E) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  | allemand, anglais |  |  | escalade | UPE2A (élèves allophones) |
| Collège Christine de Pisan (0772427V) | allemand, anglais | anglais, espagnol, italien | latin, grec |  | allemand, anglais |  |  | handball |  |
| Collège de la Pyramide (0772429X) | anglais | allemand, espagnol | latin |  |  |  |  |  | ULIS, UPE2A (élèves allophones) |
| Collège Marie Curie (0772481D) | anglais | espagnol | latin |  |  |  |  | football, sport-études multi-activités | ULIS |
| Collège Victor Schoelcher (0772482E) | anglais | espagnol | latin |  |  |  |  | football |  |
| Collège Nicolas Tronchon (0772483F) | anglais | allemand, espagnol | latin, grec |  |  |  |  |  | ULIS |
| Collège de la Dhuis (0772499Y) | anglais | espagnol | latin |  |  |  | mathématiques et sciences |  | ULIS |
| Collège Les Blés d'or (0772548B) | anglais | allemand, espagnol, italien | latin |  | anglais, italien |  |  | sport-études gymnastique |  |
| Collège Erik Satie (0772573D) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  | allemand, anglais |  |  |  | ULIS |
| Collège Vasco de Gama (0772574E) | anglais | espagnol | latin |  | anglais, espagnol |  |  |  | ULIS, UPE2A (élèves allophones), Dispositif relais |
| Collège Claude Monet (0772588V) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  | athletisme | ULIS |
| Collège Madeleine Renaud (0772589W) | anglais | allemand, espagnol | latin, grec |  | allemand, anglais |  |  | handball | ULIS |
| Collège privé Maurice Rondeau (0772601J) | anglais | allemand, espagnol | latin |  | anglais, espagnol |  |  |  |  |
| Collège privé Père Jacques (0772650M) | anglais | espagnol |  |  |  |  |  |  |  |
| Collège le vieux chêne (0772651N) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  | volley ball | ULIS |
| Collège Jacqueline de Romilly (0772713F) | anglais | allemand, espagnol | latin |  |  | américaine |  |  |  |
| Collège Stéphane Hessel (0772714G) | anglais | allemand, espagnol | latin |  |  |  |  |  | ULIS |
| Collège privé Oneschool Global Paris Campus (0772740K) |  |  |  |  |  |  |  |  |  |
| Collège Lucie Aubrac (0772819W) | anglais | espagnol | latin |  |  |  |  |  | ULIS |
| Collège Colonel Arnaud Beltrame (0772867Y) | anglais | allemand, espagnol, italien |  |  | allemand, anglais, italien |  |  |  | ULIS |
| Collège Marthe Simard (0772868Z) | anglais | allemand, espagnol | latin |  | anglais, espagnol |  |  |  |  |
| College Trait d'Union (0772879L) |  |  |  |  |  |  |  |  |  |
| Collège privé La Petite Plume (0772898G) |  |  |  |  |  |  |  |  |  |
| Collège Simone Veil (0772923J) |  |  |  |  | allemand, anglais |  |  | football | ULIS |
| Collège privé Sacré Coeur Enfant Jésus (0772937Z) |  |  |  |  |  |  |  |  | ULIS |
| Collège Marie-Amélie Le Fur (0772944G) | anglais | allemand, espagnol |  |  |  |  |  |  | SEGPA |
| Collège Marthe Gautier (0772945H) | anglais | allemand, espagnol |  |  |  |  |  |  | ULIS |
| Collège Jeanne Bonnardel Beguin (0772946J) | anglais | allemand, espagnol |  |  |  |  |  |  |  |
| Collège privé Saint-Colomban (0772953S) |  |  |  |  |  |  |  |  |  |
| Collège Joséphine Baker (0772968H) |  |  |  |  |  |  |  |  |  |
| Collège Jean-Jacques Barbaux (0773007A) |  |  |  |  |  |  |  |  |  |
| Collège Montessori Here and Now (0773021R) |  |  |  |  |  |  |  |  |  |
| Collège Madeleine Brès (0773030A) |  |  |  |  |  |  |  |  |  |
| Collège Avenir Val de Bussy (0773040L) |  |  |  |  |  |  |  |  |  |
| Collège Anima collège (0773048V) |  |  |  |  |  |  |  |  |  |
| Collège Saint-Exupéry (0780002D) | anglais | allemand, espagnol | latin |  |  |  |  | gymnastique aerobique, step | ULIS |
| Collège Flora Tristan (0780032L) | allemand, anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  |  |
| Collège Les Amandiers (0780033M) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  |  | 3e prépa-métiers |
| Collège Victor Hugo (0780036R) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  |  | ULIS |
| Collège Samuel Paty (0780050F) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  | gymnastique aérobic, gymnastique aerobique | ULIS |
| Collège Le Prieuré (0780112Y) | allemand, anglais | allemand, anglais, espagnol | latin |  |  |  |  |  |  |
| Collège Les Plaisances (0780116C) | anglais | allemand, espagnol | latin, grec |  |  |  |  | handball | ULIS, 3e prépa-métiers |
| Collège Louis Lumière (0780119F) | allemand, anglais | allemand, anglais, espagnol | latin |  |  |  |  |  |  |
| Collège Jean-Baptiste de la Quintinye (0780179W) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  | allemand, anglais | britannique |  | football, tennis | ULIS, SEGPA |
| Collège Jules Verne (0780180X) | anglais | espagnol | latin |  | allemand, anglais |  |  | arbitrage sportif | ULIS, UPE2A (élèves allophones), Dispositif relais |
| Collège Montaigne (0780183A) | anglais | allemand, anglais, espagnol | latin, grec |  |  |  |  |  | ULIS, SEGPA, UPE2A (élèves allophones), Classe pour enfants de familles itinérantes |
| Collège Jean Racine (0780184B) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  | allemand, anglais |  |  | danse |  |
| Collège Descartes (0780185C) | allemand, anglais | allemand, espagnol | latin | italien | allemand, anglais |  |  |  | ULIS, SEGPA |
| Collège Jean Racine (0780186D) | anglais | allemand, espagnol, italien | latin, grec |  |  |  |  | triathlon | ULIS |
| Collège Youri Gagarine (0780187E) | allemand, anglais | allemand, espagnol | latin |  |  |  | arts plastiques | escalade | ULIS, SEGPA |
| Collège Saint-Exupéry (0780210E) | anglais | allemand, espagnol, italien | latin, grec |  | allemand, anglais |  |  | volley ball | ULIS |
| Collège François Mauriac (0780254C) | anglais | allemand, anglais, espagnol | latin |  |  |  |  |  | ULIS |
| Collège Albert Thierry (0780255D) | anglais | allemand, espagnol | latin |  |  |  |  |  | UPE2A (élèves allophones) |
| Collège Le Racinay (0780256E) | allemand, anglais | allemand, anglais, espagnol, italien | latin |  | allemand, anglais |  |  | sport-études football | SEGPA |
| Collège Colette (0780258G) | anglais | allemand, anglais, espagnol, russe | latin, grec |  |  |  |  |  | SEGPA |
| Collège Léon Blum (0780260J) | anglais | allemand, anglais, espagnol | latin |  |  |  |  | handball |  |
| Collège Mozart (0780261K) | anglais | allemand, espagnol | latin |  |  |  |  |  | ULIS |
| Collège Maurice Ravel (0780262L) | anglais | allemand, anglais, espagnol | latin, grec |  |  |  |  | football | ULIS, SEGPA |
| Collège Pierre et Marie Curie (0780263M) | allemand, anglais | allemand, anglais, espagnol, portugais | latin |  |  | britannique, portugaise |  |  | SEGPA, UPE2A (élèves allophones) |
| Collège Les Grands Champs (0780264N) | anglais | allemand, espagnol | latin |  |  |  |  | football | ULIS, SEGPA |
| Collège Maryse Bastié (0780265P) | anglais | allemand, anglais, espagnol, italien | latin |  | allemand, anglais |  |  |  | SEGPA |
| Collège Jean Zay (0780267S) | anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  | football | ULIS, SEGPA |
| Collège Guy de Maupassant (0780269U) | allemand, anglais | allemand, anglais, espagnol, portugais | latin |  | allemand, anglais, portugais |  |  |  | ULIS, UPE2A (élèves allophones) |
| Collège Pierre de Coubertin (0780418F) | anglais | allemand, anglais, espagnol, italien, russe | latin, grec |  | allemand, anglais |  |  | gymnastique artistique, rugby | ULIS |
| Collège Louis Pergaud (0780419G) | anglais | allemand, anglais, espagnol | latin |  |  |  |  | handball | ULIS, SEGPA |
| Collège Blaise Pascal (0780420H) | anglais | allemand, anglais, espagnol | latin |  |  |  |  |  | ULIS, SEGPA, UPE2A (élèves allophones) |
| Collège Pasteur (0780504Z) | anglais | allemand, anglais, espagnol | latin, grec |  | allemand, anglais | britannique |  |  | UPE2A (élèves allophones) |
| Collège Arthur Rimbaud (0780506B) | anglais | allemand, espagnol | latin |  |  |  |  |  | ULIS, SEGPA, Dispositif relais |
| Collège Auguste Renoir (0780507C) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  |  | ULIS, SEGPA |
| Collège Philippe de Champaigne (0780512H) | anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  |  | ULIS, UPE2A (élèves allophones), Dispositif relais |
| Collège Le Village (0780514K) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  | athletisme, football |  |
| Collège La Vaucouleurs (0780569V) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  | allemand, anglais |  |  | football | ULIS, SEGPA, UPE2A (élèves allophones) |
| Collège Henri IV (0780571X) | allemand, anglais | espagnol | latin |  | allemand, anglais |  |  | aviron | ULIS, SEGPA, 3e prépa-métiers |
| Collège Paul Verlaine (0780572Y) | allemand, anglais | espagnol, portugais | latin |  | anglais, portugais |  |  |  | SEGPA, UPE2A (élèves allophones) |
| Collège Les Châtelaines (0780573Z) | allemand, anglais | allemand, anglais, espagnol, italien | latin |  |  |  |  |  | ULIS |
| Collège Les Molières (0780574A) | anglais | allemand, anglais, espagnol, italien | latin |  |  |  |  |  | ULIS |
| Collège Paul Bert (0780575B) | allemand, anglais | allemand, espagnol | latin, grec |  | allemand, anglais |  |  |  |  |
| Collège Sébastienne Guyot (0780577D) | anglais | allemand, anglais, arabe, espagnol, portugais | latin |  |  |  |  |  | UPE2A (élèves allophones) |
| Collège Pablo Picasso (0780578E) | anglais | allemand, anglais, espagnol, portugais | latin |  | anglais, portugais |  |  |  | ULIS |
| Collège Darius Milhaud (0780579F) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  | allemand, anglais |  |  | volley ball | ULIS |
| Collège Pierre de Nolhac (0780580G) | allemand, anglais | allemand, anglais, espagnol, russe | latin, grec |  | allemand, anglais, russe |  |  |  |  |
| Collège Paul Éluard (0780581H) | anglais | allemand, anglais, espagnol | grec |  |  |  |  | natation | ULIS |
| Collège Benjamin Franklin (0780656P) | anglais | allemand, espagnol | latin |  |  |  |  | lutte | ULIS, 3e prépa-métiers |
| Collège Marcel Pagnol (0780707V) | anglais | allemand, espagnol | latin |  |  |  |  | vélo tout-terrain, vtt, vtt | ULIS |
| Collège Jules Ferry (0780708W) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  | allemand, anglais, russe |  | danse, musique | aviron, pentathlon, sport-études badminton, sport-études canoe kayak |  |
| Collège de la Mauldre (0780709X) | anglais | allemand, chinois, espagnol | latin, grec |  | anglais, chinois |  |  |  | Dispositif relais |
| Collège Georges Brassens (0780712A) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  | football |  |
| Collège François Rabelais (0780713B) | anglais | allemand, anglais, espagnol | latin |  |  |  |  | sport-études multi-activités |  |
| Collège des Hauts Grillets (0780714C) | allemand, anglais | allemand, anglais, chinois, espagnol | latin |  |  | allemande, britannique, chinoise, italienne, polonaise |  |  |  |
| Collège Martin Luther King (0780715D) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais | britannique |  |  |  |
| Collège Raymond Poincaré (0780718G) | anglais | allemand, espagnol, italien | latin, grec |  | allemand, anglais |  |  | football | ULIS |
| Collège Alexandre Dumas (0780720J) | anglais | allemand, anglais, espagnol |  |  |  |  |  |  | ULIS |
| Collège Albert Camus (0780758A) | anglais | allemand | latin | espagnol | allemand, anglais |  |  |  | ULIS |
| Collège La Fosse aux Dames (0780760C) | anglais | allemand, anglais, espagnol, italien | latin |  | allemand, anglais |  |  |  | ULIS |
| Collège Guillaume Apollinaire (0780761D) | anglais | allemand, espagnol, italien | latin |  | allemand, anglais |  |  | rugby | ULIS |
| Collège Émile Zola (0780845V) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  |  |  |
| Collège Le Rondeau (0780846W) | allemand, anglais | allemand, anglais, espagnol, italien | latin |  | allemand, anglais |  |  |  | UPE2A (élèves allophones), Dispositif relais |
| Collège Jean Moulin (0780847X) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  | allemand, anglais |  |  | basket-ball | ULIS |
| Collège L'Agiot (0780856G) | anglais | allemand, anglais, arabe, espagnol | latin |  | anglais, arabe |  |  | tennis | ULIS |
| Collège George Sand (0781098V) | anglais | allemand, anglais, espagnol | latin, grec |  | allemand, anglais |  |  | canoë-kayak, natation | ULIS, SEGPA, Dispositif relais |
| Collège Le Corbusier (0781101Y) | anglais | allemand, espagnol, italien | latin, grec |  |  |  |  |  | ULIS |
| Collège du Cèdre (0781105C) | allemand, anglais | allemand, anglais, chinois, espagnol | latin, grec |  | allemand, anglais |  |  |  |  |
| Collège Hoche (0781106D) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  | allemand, anglais |  |  | aviron, rugby |  |
| Collège Jean-Philippe Rameau (0781107E) | allemand, anglais | allemand, anglais, espagnol, italien, russe | latin, grec |  | allemand, anglais |  | musique | athletisme, gymnastique, gymnastique de forme, natation, natation et activ.sportiv. aquatiques, sports de raquette (tennis, tennis de table, badminton ou badten), tennis | ULIS |
| Collège René Cassin (0781108F) | anglais, arabe | espagnol | latin |  | anglais, arabe |  |  |  | SEGPA, UPE2A (élèves allophones) |
| Collège Albert Einstein (0781171Z) | anglais | allemand, anglais, espagnol | latin, grec |  |  |  |  |  |  |
| Collège Marcel Roby (0781204K) | allemand, anglais | allemand, anglais, espagnol, russe | latin, grec |  |  | américaine, espagnole, russe |  | natation, natation et activ.sportiv. aquatiques, trampoline, sport-études gymnastique, sport-études natation | 3e prépa-métiers |
| Collège Claude Debussy (0781205L) | allemand, anglais, chinois | allemand, anglais, espagnol | latin, grec |  | allemand, anglais, chinois |  | danse, musique |  | UPE2A (élèves allophones) |
| Collège La Couldre (0781263Z) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  | cyclisme, sport-études multi-activités | Dispositif relais |
| Collège de Clagny (0781298M) | allemand, anglais | allemand, anglais, chinois, espagnol | latin |  | allemand, anglais |  |  | basket-ball | ULIS, UPE2A (élèves allophones) |
| Collège La Mare aux Saules (0781511U) | anglais | allemand, espagnol |  |  |  |  |  |  | ULIS, UPE2A (élèves allophones) |
| Collège Notre-Dame - Les Oiseaux (0781537X) | allemand, anglais | allemand, anglais, chinois, espagnol | latin, grec |  | allemand, anglais |  |  |  | ULIS |
| Collège Hélène Boucher (0781570H) | anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  | tennis de table |  |
| Collège Blanche de Castille (0781586A) | anglais | espagnol | latin |  | anglais, espagnol |  |  |  |  |
| Collège l'Ermitage, École internationale de France (0781587B) | anglais | allemand, chinois, espagnol | latin |  |  | américaine |  |  |  |
| Collège Saint-Érembert (0781589D) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  |  |  |  |  |  |
| Collège Notre-Dame (0781590E) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  |  |  |
| Collège privé Notre-Dame (0781591F) | anglais | allemand, espagnol | latin, grec |  |  |  |  |  | 3e prépa-métiers |
| Collège Le Bon Sauveur (0781594J) | allemand, anglais | anglais, chinois, espagnol | latin |  |  |  |  |  | ULIS |
| Collège Saint-Jean - Hulst (0781597M) | anglais | allemand, espagnol | latin, grec |  |  |  |  |  | ULIS |
| Collège Saint-Louis Notre-Dame du Bel Air (0781600R) | anglais | allemand, espagnol | latin |  |  |  |  |  |  |
| Collège Perceval (0781601S) | allemand, anglais | allemand, espagnol |  |  |  |  |  |  |  |
| Collège Gustave Courbet (0781618K) | anglais | allemand, anglais, espagnol | latin |  |  |  |  | handball | ULIS, UPE2A (élèves allophones) |
| Collège Notre-Dame (0781620M) | allemand, anglais | allemand, espagnol | latin |  |  |  |  |  | ULIS |
| Collège Saint-Simon (0781632A) | anglais | allemand, anglais, espagnol | latin, grec |  | allemand, anglais |  |  |  | ULIS |
| Collège Saint-François d'Assise (0781662H) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  | allemand, anglais |  |  |  | SEGPA |
| Collège André Derain (0781683F) | anglais | allemand, espagnol | latin |  |  |  |  |  |  |
| Collège Les Saules (0781695U) | anglais | allemand, anglais, espagnol | latin |  |  |  |  | golf | SEGPA, UPE2A (élèves allophones), 3e prépa-métiers |
| Collège Jean François Champollion (0781789W) | anglais | allemand, anglais, espagnol | latin |  |  |  |  | activites sportives de cirque, cirque, football | ULIS |
| Collège Claude Monet (0781817B) | anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  | gymnastique artistique | UPE2A (élèves allophones) |
| Collège Les Prés (0781818C) | anglais | allemand, anglais, espagnol | latin, grec |  | allemand, anglais |  |  | golf | UPE2A (élèves allophones) |
| Collège Les Trois Moulins (0781846H) | anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  |  |  |
| Collège Les Nénuphars (0781862A) | anglais | anglais, espagnol |  |  |  |  |  | activites sportives de cirque, cirque |  |
| Collège Jean Monnet (0781863B) | allemand, anglais | allemand, anglais, espagnol |  |  |  |  |  | sport-études tennis |  |
| Collège Georges Pompidou (0781864C) | anglais | allemand, anglais, espagnol | latin |  |  |  |  |  | ULIS |
| Collège Jacques Cartier (0781885A) | allemand, anglais | allemand, espagnol |  |  |  |  |  |  |  |
| Collège Catherine de Vivonne (0781886B) | allemand, anglais | allemand, anglais, espagnol, italien | latin |  | allemand, anglais |  |  | basket-ball | ULIS |
| Collège Louis Pasteur (0781896M) | anglais | allemand, anglais, espagnol |  |  |  |  |  | golf | ULIS, UPE2A (élèves allophones) |
| Ecole secondaire privée Jeanne d'Arc (0781902U) |  |  |  |  |  |  |  |  |  |
| Collège Jean Vilar (0781914G) | anglais | allemand, espagnol | latin |  |  |  |  |  | ULIS, UPE2A (élèves allophones) |
| Collège Léonard de Vinci (0781915H) | allemand, anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  | ULIS |
| Collège Sully (0781916J) | anglais | allemand, espagnol | latin, grec |  |  |  |  |  | ULIS |
| Collège Alberto Giacometti (0781954A) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  |  | ULIS |
| Collège de Gassicourt (0781955B) | anglais | anglais, espagnol |  |  | allemand, anglais |  |  |  | ULIS, UPE2A (élèves allophones) |
| Collège Clemenceau (0781977A) | anglais | allemand, espagnol | latin |  |  |  |  | football | ULIS |
| Collège Les Hautes Rayes (0781985J) | anglais | anglais, espagnol, italien | latin |  |  |  |  | volley ball |  |
| Collège Magellan (0781986K) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  | ULIS, Dispositif relais |
| Collège Saint-Exupéry (0782087V) | anglais | allemand, espagnol | latin |  |  |  |  |  | ULIS |
| Collège La Clé Saint-Pierre (0782114Z) | anglais | allemand, espagnol | latin, grec |  | anglais, espagnol |  |  | gymnastique, gymnastique de forme, tennis de table | ULIS |
| Collège Galilée (0782115A) | anglais | allemand, anglais, espagnol | latin |  |  |  |  | football, gymnastique, gymnastique de forme | ULIS, SEGPA |
| Ecole secondaire privée Bilingue Diderot (0782128P) |  |  |  |  |  |  |  |  |  |
| Maison de la Légion d'Honneur (0783122V) | anglais | allemand, chinois, espagnol | latin, grec |  | allemand, anglais |  | musique |  |  |
| Collège Jean Cocteau (0783156G) | anglais | allemand, anglais, chinois, espagnol | latin, grec |  | anglais, chinois |  |  |  | ULIS |
| Collège Jean Moulin (0783215W) | allemand, anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  | ULIS |
| Collège Jean Lurçat (0783248G) | allemand, anglais | anglais, espagnol | latin |  | allemand, anglais |  |  |  | ULIS, SEGPA |
| Collège Anatole France (0783251K) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  |  |  |
| Collège Charles Péguy (0783252L) | allemand, anglais | allemand, anglais, espagnol, italien | latin |  | allemand, anglais |  |  |  | Dispositif relais |
| Collège Lamartine (0783253M) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  | allemand, anglais |  |  |  | Dispositif relais |
| Ecole secondaire privée Cours Château (0783284W) |  |  |  |  |  |  |  |  |  |
| Collège Sainte-Thérèse (0783287Z) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  | ULIS |
| Collège Sacré-Coeur (0783295H) | allemand, anglais | allemand, anglais, chinois, espagnol | latin, grec |  |  | britannique |  |  | ULIS |
| Collège Saint-Louis (0783300N) | anglais | allemand, espagnol | latin |  |  |  |  |  |  |
| Collège Sainte-Thérèse (0783301P) | anglais | allemand, espagnol |  |  | allemand, anglais |  |  |  |  |
| Collège Saint-Augustin (0783307W) | anglais | allemand, espagnol | latin |  |  |  |  | hockey sur gazon | 3e prépa-métiers |
| Collège Sainte-Thérèse (0783338E) | anglais | allemand, espagnol | latin |  |  |  |  |  |  |
| Collège Sainte-Anne (0783339F) | anglais | allemand, chinois, espagnol | latin |  |  |  |  |  |  |
| Collège Mercier Saint-Paul (0783340G) | anglais | allemand, chinois, espagnol | latin |  | allemand, anglais |  |  | aviron, lutte |  |
| Collège Sainte-Thérèse (0783342J) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  |  |
| Collège Jean Jaurès (0783358B) | anglais | allemand, anglais, espagnol | latin, grec |  | allemand, anglais |  | musique |  | ULIS, UPE2A (élèves allophones) |
| Collège Ariane (0783378Y) | allemand, anglais | allemand, espagnol | latin |  |  |  |  |  | ULIS |
| Collège Louis Paulhan (0783463R) | anglais | allemand, espagnol | latin |  |  |  |  |  | ULIS, UPE2A (élèves allophones) |
| Collège de la Montcient (0783464S) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  |  |
| Collège franco-allemand (0783546F) | allemand, anglais | anglais | latin |  |  |  |  |  |  |
| Collège international (0783547G) | allemand, anglais, espagnol | allemand, anglais, chinois, espagnol, italien, russe | latin |  |  | allemande, américaine, britannique, danoise, espagnole, italienne, japonaise, néerlandaise, norvégienne, portugaise, suédoise |  |  |  |
| Ecole secondaire privée Saint Jean Bosco (0783585Y) |  |  | latin |  |  |  |  |  |  |
| Collège privé Samarcande (0783592F) |  |  |  |  |  |  |  |  |  |
| Ecole secondaire privée Mathurin Cordier (0783621M) |  |  |  |  |  |  |  |  |  |
| Collège Camille du Gast (0783636D) | anglais | allemand, anglais, espagnol | latin |  |  |  |  | handball |  |
| Ecole secondaire privée Bienheureux Charles de Foucauld (0783647R) |  |  |  |  |  |  |  |  |  |
| Ecole secondaire privée Cours Sainte Clotilde (0783666L) |  |  |  |  |  |  |  |  |  |
| Ecole secondaire privée Bilingue musulman Eva de Vitray (0783674V) |  |  |  |  |  |  |  |  |  |
| Ecole secondaire privée International Montessori Athéna (0783682D) |  |  |  |  |  |  |  |  |  |
| Ecole secondaire privée IDEE (0783702A) |  |  |  |  |  |  |  |  |  |
| Ecole secondaire privée La Jonchère (0783727C) |  |  |  |  |  |  |  |  |  |
| Ecole secondaire privée Institut FFGOLF de Haut niveau (0783738P) |  |  |  |  |  |  |  |  |  |
| Ecole secondaire privée sports Académy le Mesnil (0783764T) |  |  |  |  |  |  |  |  |  |
| Ecole secondaire privée Pilcalli (0783772B) |  |  |  |  |  |  |  |  |  |
| Collège André Chénier-Nouveau (0783774D) | anglais | espagnol |  |  |  |  |  | athlétisme, basket-ball, canoe et canoe kayak, canoë-kayak, handball, patinage artistique | SEGPA, Dispositif relais |
| Ecole secondaire privée La Jonchère EIB Campus (0783810T) |  |  |  |  |  |  |  |  |  |
| Collège privé Saint-Thomas de Villeneuve (0783816Z) |  |  |  |  |  |  |  |  |  |
| Ecole secondaire privée Montessori de Gargenville (0783825J) |  |  |  |  |  |  |  |  |  |
| Ecole secondaire privée NLC International School (0783831R) |  |  |  |  |  |  |  |  |  |
| Collège Les Châtaigniers (0783838Y) |  |  |  |  |  |  |  |  |  |
| Ecole secondaire privée Dans tes Pas (0783844E) |  |  |  |  |  |  |  |  |  |
| Ecole secondaire privée Station phoenix (0783846G) |  |  |  |  |  |  |  |  |  |
| Ecole secondaire privée Alef Beth Chaoul (0783848J) |  |  |  |  |  |  |  |  |  |
| Ecole secondaire privée EMI des enfants (0783869G) |  |  |  |  |  |  |  |  |  |
| Ecole secondaire privée Cité Educative du Paris-Saint-Germain (0783870H) |  |  |  |  |  |  |  |  |  |
| Collège Louis Pasteur (0910009R) | allemand, anglais | allemand, anglais, espagnol, russe | latin |  | anglais, portugais |  | musique |  | ULIS, SEGPA |
| Collège Alphonse Daudet (0910016Y) | allemand, anglais | allemand, espagnol | latin, grec |  |  |  |  | activites sportives de cirque, athletisme, cirque, sport-études judo | ULIS |
| Collège André Maurois (0910017Z) | allemand, anglais | allemand, anglais, espagnol | latin |  |  |  |  |  |  |
| Collège Le Village (0910021D) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  | athletisme, tennis | SEGPA |
| Collège Juliette Adam (0910024G) | allemand, anglais | allemand, anglais, chinois, espagnol | latin |  |  |  |  |  | ULIS |
| Collège Wolfgang Amadeus Mozart (0910025H) | anglais | espagnol | latin |  |  |  |  | gymnastique acrobatique, gymnastique de forme | ULIS |
| Collège Michel Vignaud (0910028L) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  |  |  |  |  |  |
| Collège Michel Vignaud (0910041A) | allemand, anglais | allemand, espagnol | latin |  |  |  |  | gymnastique acrobatique, gymnastique artistique | ULIS |
| Collège Jean Zay (0910042B) | anglais | espagnol | latin |  |  |  |  |  | ULIS, SEGPA |
| Collège Charles Péguy (0910045E) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  |  | UPE2A (élèves allophones) |
| Collège Joseph Bara (0910046F) | allemand, anglais | allemand, anglais, espagnol | latin |  |  |  |  | football | ULIS |
| Collège Albert Camus (0910049J) | anglais | allemand, espagnol | latin |  |  |  |  | rugby | ULIS, UPE2A (élèves allophones) |
| Collège Olivier de Serres (0910056S) | allemand, anglais | allemand, anglais |  |  | allemand, anglais |  |  |  | UPE2A (élèves allophones) |
| Collège Jean Moulin (0910057T) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  |  |  |
| Collège Félix Esclangon (0910060W) | anglais | allemand, espagnol | latin | italien |  |  |  | basket, football |  |
| Collège Guillaume Budé (0910062Y) | allemand, anglais | allemand, anglais, espagnol | latin |  |  |  |  | basket, gymnastique artistique, natation et activ.sportiv. aquatiques | ULIS |
| Collège Blaise Pascal (0910624J) | anglais | allemand, arabe, espagnol, portugais | latin |  | allemand, anglais |  |  | basket-ball, natation, natation et activ.sportiv. aquatiques, sport-études natation | ULIS, UPE2A (élèves allophones) |
| Collège Weiler (0910677S) | allemand, anglais | allemand, anglais, chinois, espagnol | latin |  | allemand, anglais |  |  | handball | ULIS, UPE2A (élèves allophones) |
| Collège Jean Macé (0910678T) | allemand, anglais | allemand, anglais, espagnol | latin |  |  |  |  | tennis | UPE2A (élèves allophones) |
| Collège Albert Camus (0910714G) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  | handball |  |
| Collège Jean Mermoz (0910716J) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  | handball | UPE2A (élèves allophones) |
| Collège Jean-Étienne Guettard (0910717K) | allemand, anglais | allemand, anglais, espagnol | latin |  |  |  |  | escalade, raid multisport, raid multisports | ULIS, UPE2A (élèves allophones) |
| Collège Louis Pasteur (0910718L) | allemand, anglais | allemand, anglais, espagnol | latin |  |  |  |  | judo | UPE2A (élèves allophones), 3e prépa-métiers |
| Collège Chantemerle (0910752Y) | allemand, anglais | allemand, anglais, espagnol | latin |  |  |  |  | football en salle (futsal), futsal |  |
| Collège Le Saussay (0910773W) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  |  | ULIS |
| Collège Nicolas Boileau (0910775Y) | allemand, anglais | allemand, anglais | latin |  |  |  |  |  | UPE2A (élèves allophones) |
| Collège Paul Éluard (0910776Z) | allemand, anglais | allemand, anglais, espagnol | latin |  |  |  |  | basket-ball, handball | ULIS, UPE2A (élèves allophones), 3e prépa-métiers |
| Collège les Dînes Chiens (0910777A) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  | danse | ULIS |
| Collège Sainte-Thérèse (0910817U) | anglais | allemand, anglais, espagnol | latin |  |  |  |  |  |  |
| Collège Sainte-Jeanne d'Arc (0910820X) | anglais | allemand, espagnol | latin |  |  |  |  |  |  |
| Collège Jeanne d'Arc (0910827E) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  |  |  |
| Collège Saint-Spire (0910829G) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  | sport-études baseball, sport-études golf, sport-études hockey sur glace, sport-études natation, sport-études rugby, sport-études triathlon | ULIS |
| Collège Notre-Dame (0910830H) | anglais | allemand, chinois, espagnol | latin |  | anglais, chinois |  |  |  |  |
| Collège du Sacré-Coeur (0910836P) | anglais | espagnol | latin |  |  |  |  |  |  |
| Collège Gérard Philipe (0910859P) | allemand, anglais | allemand, anglais, arabe, chinois, espagnol | latin |  | allemand, anglais |  |  | escalade, handball | ULIS, SEGPA, UPE2A (élèves allophones) |
| Collège Jules Ferry (0910860R) | anglais | allemand, espagnol, italien | latin, grec |  | allemand, anglais |  |  |  | ULIS |
| Collège La Guyonnerie (0910967G) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  |  |  |  | vélo tout-terrain, vtt, vtt | ULIS, Dispositif relais |
| Collège Alain Fournier (0910968H) | allemand, anglais | allemand, anglais, espagnol | latin |  |  |  |  | danse | ULIS |
| Collège Émile Zola (0910969J) | allemand, anglais | allemand, anglais, espagnol, italien | latin, grec |  | anglais, italien |  |  |  |  |
| Collège Les Sablons (0910971L) | anglais | allemand, espagnol | latin |  |  |  |  | basket-ball, rugby | ULIS, SEGPA, Dispositif relais, 3e prépa-métiers |
| Collège Eugène Delacroix (0910973N) | anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  | football | ULIS, SEGPA |
| Collège Albert Camus (0910977T) | anglais | allemand, espagnol | latin |  |  |  |  |  | ULIS |
| Collège Bellevue (0910979V) | allemand, anglais | allemand, anglais, espagnol, portugais | latin |  | allemand, anglais, portugais |  | danse, musique |  | ULIS |
| Collège Moreau (0910980W) | anglais | allemand, espagnol |  |  |  |  |  |  |  |
| Collège Jeanne d'Arc (0911015J) | anglais | allemand, espagnol | latin |  |  |  |  |  |  |
| Collège André Dunoyer de Segonzac (0911022S) | allemand, anglais | allemand, anglais, espagnol | latin |  |  |  |  | badminton | UPE2A (élèves allophones) |
| Collège Louise Michel (0911024U) | allemand, anglais | allemand, anglais, espagnol |  |  |  |  |  | football, handball | ULIS, UPE2A (élèves allophones) |
| Collège Jean Lurçat (0911025V) | allemand, anglais | allemand, anglais, espagnol | latin |  |  |  |  |  | ULIS, SEGPA, UPE2A (élèves allophones) |
| Collège Michel-Richard Delalande (0911027X) | allemand, anglais | allemand, anglais, espagnol | latin |  |  |  |  | football | ULIS, SEGPA, UPE2A (élèves allophones) |
| Collège Ferdinand Buisson (0911028Y) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  | handball | UPE2A (élèves allophones) |
| Collège Pablo Picasso (0911029Z) | allemand, anglais | allemand, anglais, espagnol | latin |  |  |  |  |  | ULIS, SEGPA |
| Collège Denis Diderot (0911031B) | allemand, anglais | anglais, espagnol, italien | latin |  | allemand, anglais, italien |  |  | rugby | ULIS, UPE2A (élèves allophones) |
| Collège Pierre Mendès France (0911032C) | anglais | allemand, espagnol | latin |  |  |  | musique |  | ULIS |
| Collège César Franck (0911034E) | allemand, anglais | anglais, espagnol | latin |  |  |  |  |  | ULIS |
| Collège Jean Vilar (0911036G) | allemand, anglais | allemand, anglais, arabe, espagnol |  |  | allemand, anglais |  |  | football en salle (futsal), futsal, gymnastique, gymnastique acrobatique | ULIS, SEGPA, UPE2A (élèves allophones), 3e prépa-métiers |
| Collège Paul Bert (0911038J) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  |  | UPE2A (élèves allophones) |
| Collège Paul Éluard (0911039K) | allemand, anglais | anglais, espagnol, italien | latin, grec |  | allemand, anglais |  |  | basket-ball | ULIS |
| Collège Paul Éluard (0911042N) | anglais | allemand, anglais, espagnol | latin |  |  |  |  |  | ULIS, UPE2A (élèves allophones) |
| Collège Mondétour (0911127F) | allemand, anglais | allemand, anglais, espagnol | latin |  |  |  |  |  | SEGPA, Dispositif relais |
| Collège Alexandre Fleming (0911143Y) | anglais, russe | allemand, anglais, espagnol, russe | latin |  | anglais, russe |  | danse, musique |  |  |
| Collège Blaise Pascal (0911145A) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  |  | ULIS, UPE2A (élèves allophones) |
| Collège Henri Wallon (0911146B) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  | gymnastique rythmique et sportive | SEGPA |
| Collège Marie Curie (0911150F) | allemand, anglais | allemand, anglais, espagnol | latin |  |  |  |  | danse | ULIS, Dispositif relais |
| Collège Jean Moulin (0911152H) | anglais | allemand, espagnol | latin |  |  |  |  |  | UPE2A (élèves allophones), Dispositif relais |
| Collège Le Parc de Villeroy (0911185U) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  |  | ULIS, SEGPA |
| Collège Paul Fort (0911250P) | anglais | allemand, espagnol | latin |  |  |  |  | badminton, basket-ball | ULIS |
| Collège les Gâtines - René Cassin (0911252S) | allemand, anglais | allemand, anglais, espagnol, russe | latin |  | allemand, anglais |  |  |  | ULIS, SEGPA |
| Collège Pablo Neruda (0911253T) | anglais | allemand, anglais, espagnol | latin |  |  |  |  | judo | ULIS, UPE2A (élèves allophones) |
| Collège Albert Camus (0911255V) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  |  | ULIS, SEGPA |
| Collège Hubert Germain (0911256W) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  | ULIS |
| Collège Jean Moulin (0911257X) | allemand, anglais | allemand, anglais, espagnol | latin |  |  |  |  |  | ULIS, SEGPA |
| Collège Aimé Césaire (0911334F) | anglais | allemand, arabe, espagnol, portugais | latin |  | anglais, arabe |  |  |  | ULIS, SEGPA, UPE2A (élèves allophones), 3e prépa-métiers |
| Collège Jules Verne (0911335G) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  |  |  |  | escalade | ULIS, SEGPA |
| Collège Charles Péguy (0911340M) | anglais | allemand, espagnol |  |  |  |  |  |  | ULIS |
| Collège La Tuilerie (0911341N) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  | badminton | ULIS, UPE2A (élèves allophones) |
| Collège Paul Fort (0911345T) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  | allemand, anglais |  |  |  | ULIS |
| Collège Les Goussons (0911354C) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  |  |  |  |  | ULIS |
| Collège Georges Pompidou (0911396Y) | allemand, anglais | allemand, anglais, espagnol | latin |  | anglais, portugais |  |  |  | ULIS, SEGPA, Dispositif relais |
| Collège La Vallée (0911397Z) | anglais | espagnol, italien |  |  | anglais, italien |  |  | rugby, volley ball, sport-études gymnastique | ULIS, UPE2A (élèves allophones), 3e prépa-métiers |
| Collège de Guinette (0911402E) | anglais | allemand, espagnol | latin |  |  |  |  | football | ULIS, SEGPA |
| Collège Hubert Robert (0911403F) | anglais | allemand, espagnol | latin |  |  |  |  | escalade | ULIS |
| Collège Jean Rostand (0911404G) | anglais | allemand, espagnol | latin |  |  |  |  | volley ball | ULIS |
| Collège Pierre de Ronsard (0911441X) | anglais | allemand, espagnol | latin |  |  |  |  | basket-ball |  |
| Collège La Nacelle (0911443Z) | allemand, anglais | allemand, anglais, espagnol, portugais, turc | latin |  | anglais, portugais | portugaise |  | canoe et canoe kayak, canoë-kayak | ULIS, SEGPA, UPE2A (élèves allophones), Dispositif relais |
| Collège Montesquieu (0911444A) | anglais | allemand, espagnol |  |  |  |  | musique |  | ULIS, Dispositif relais |
| Collège Le Roussay (0911447D) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  | course d'orientation, raid multisports | ULIS |
| Collège Charles Péguy (0911488Y) | anglais | anglais, espagnol, portugais | latin |  |  |  |  |  |  |
| Collège Pablo Neruda (0911490A) | anglais | allemand, espagnol | latin |  |  |  |  | football, sport-études football | ULIS, SEGPA, UPE2A (élèves allophones) |
| Collège Condorcet (0911491B) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  | musique |  | ULIS, SEGPA, 3e prépa-métiers |
| Collège Sédar Senghor (0911570M) | anglais | allemand, espagnol | latin |  |  |  |  | football, handball | ULIS, SEGPA, UPE2A (élèves allophones) |
| Collège Saint-Exupéry (0911572P) | anglais | allemand, chinois, espagnol | latin |  | allemand, anglais |  |  |  | ULIS |
| Collège Léonard de Vinci (0911574S) | anglais | allemand, espagnol | latin |  |  |  |  | rugby | ULIS, SEGPA |
| Collège Rudolf Steiner (0911601W) | anglais | allemand, espagnol |  |  | allemand, anglais |  |  |  |  |
| Collège des Pyramides (0911729K) | allemand, anglais | anglais, espagnol | latin |  | allemand, anglais |  |  |  | ULIS, UPE2A (élèves allophones) |
| Collège Saint-Charles (0911745C) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  | allemand, anglais |  |  | aviron, judo | ULIS, SEGPA |
| Collège Saint-Pierre (0911746D) | anglais | allemand, anglais, chinois, espagnol | latin |  |  |  |  | tennis de table | ULIS |
| Collège Jeanne d'Arc (0911747E) | anglais | allemand, espagnol | latin |  |  |  |  |  |  |
| Collège Notre-Dame de Sion (0911748F) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  |  |  |  |  |  |
| Collège privé du cours secondaire d'Orsay (0911749G) | anglais | allemand, espagnol | latin, grec |  |  |  |  |  | ULIS |
| Collège Institution Saint Vincent de Paul (0911750H) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  |  |
| Collège Sacré-Coeur (0911751J) | anglais | allemand, espagnol | latin |  |  |  |  | basket-ball | ULIS |
| Collège Saint-Louis - Saint-Clément (0911752K) | anglais | allemand, espagnol | latin, grec |  |  |  |  |  |  |
| Collège Rosa Luxemburg (0911754M) | allemand, anglais | allemand, anglais, espagnol | latin |  |  |  |  |  | ULIS |
| Collège Saint-Nicolas (0911824N) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  |  |
| Collège Paul Éluard (0911865H) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  | handball | ULIS, UPE2A (élèves allophones), Dispositif relais, 3e prépa-métiers |
| Collège Roland Garros (0911899V) | anglais | allemand, espagnol | latin |  |  |  |  |  | ULIS, 3e prépa-métiers |
| Collège Jean Monnet (0911920T) | allemand, anglais | allemand, anglais, espagnol | latin |  |  |  |  |  | ULIS |
| Collège Émile Auvray (0911940P) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  |  | ULIS |
| Collège Camille Claudel (0911948Y) | anglais | espagnol | latin |  | anglais, espagnol |  |  | handball | ULIS |
| Collège Beth Rivkah (0912000E) | anglais | hébreu moderne |  |  | anglais, hébreu moderne |  |  |  | ULIS |
| Collège de l'Ermitage (0912086Y) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  | allemand, anglais |  |  |  | ULIS |
| Collège Robert Doisneau (0912109Y) | anglais | allemand, espagnol |  |  |  |  |  |  |  |
| Collège Galilée (0912173T) | allemand, anglais | anglais, espagnol | latin |  | allemand, anglais |  |  |  | ULIS, UPE2A (élèves allophones) |
| Collège Louise Weiss (0912174U) | anglais | allemand, espagnol | latin, grec |  |  |  |  |  | ULIS |
| Collège La Fontaine aux Bergers (0912175V) | anglais | allemand, chinois, espagnol | latin |  |  |  |  |  | ULIS |
| Collège Sonia Delaunay (0912196T) | allemand, anglais | allemand, anglais, espagnol | latin |  |  |  | musique | football, rugby | ULIS |
| Collège Olympe de Gouges (0912233H) | anglais | allemand, espagnol | latin |  |  |  |  | escalade, handball | ULIS |
| Collège Rosa Parks (0912257J) | anglais | allemand, espagnol | latin |  |  |  |  |  | ULIS |
| Collège Germaine Tillion (0912276E) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  | ULIS, UPE2A (élèves allophones) |
| Ecole secondaire privée Time 4 School (0912303J) |  |  |  |  |  |  |  |  |  |
| Ecole secondaire privée Citizen for Society School (0912337W) |  |  |  |  |  |  |  |  |  |
| Ecole secondaire privée Groupe Scolaire Excellence (0912353N) |  |  |  |  |  |  |  |  |  |
| Ecole secondaire privée Rhazès (0912363Z) |  |  |  |  |  |  |  |  |  |
| Ecole secondaire privée La Lumière du Savoir (0912378R) |  |  |  |  |  |  |  |  |  |
| Ecole secondaire privée de la Trinité (0912379S) |  |  |  |  |  |  |  |  |  |
| Ecole secondaire privée Crayons Miel (0912432Z) |  |  |  |  |  |  |  |  |  |
| Ecole secondaire privée ELAH (0912486H) |  |  |  |  |  |  |  |  |  |
| Collège Claudine Hermann (0912487J) | anglais | allemand, espagnol, italien |  |  |  |  |  |  | ULIS |
| Collège Julie-Victoire Daubié (0912539R) |  |  |  |  |  |  |  |  | ULIS, UPE2A (élèves allophones) |
| Collège Saint-Spire Sénart (0912547Z) | allemand, anglais | allemand, anglais, espagnol | latin |  |  |  |  |  |  |
| Collège Maison Blanche (0920068Z) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  |  |
| Collège Jean Perrin (0920077J) | anglais | espagnol | latin |  | allemand, anglais |  |  | basket-ball | SEGPA, Dispositif relais |
| Collège Les Ormeaux (0920081N) | allemand, anglais | allemand, anglais, espagnol, italien | latin, grec |  |  |  | musique |  | ULIS |
| Collège Moulin Joly (0920592U) | anglais | espagnol, italien | latin, grec |  | anglais, arabe |  |  | triathlon | ULIS |
| Collège République (0920594W) | anglais | arabe, espagnol, italien | latin |  |  |  |  | handball | ULIS |
| Collège Romain Rolland (0920624D) | anglais | allemand, espagnol | latin, grec |  |  |  |  | rugby | ULIS, SEGPA |
| Collège Lakanal (0920626F) | anglais | allemand, espagnol | latin |  |  |  |  |  |  |
| Collège Alain Fournier (0920653K) | anglais | allemand, espagnol | latin, grec |  | allemand, anglais |  | musique, théâtre | natation, natation et activ.sportiv. aquatiques | ULIS |
| Collège Jean Moulin (0920689Z) | anglais | allemand, espagnol | latin, grec |  |  |  |  |  | ULIS |
| Collège Gounod (0920700L) | anglais | espagnol, italien | latin, grec |  | allemand, anglais | britannique |  |  | ULIS |
| Collège Henri Dunant (0920852B) | anglais | espagnol | latin |  |  |  |  |  | ULIS |
| Collège Les Petits Ponts (0920854D) | anglais | allemand, espagnol | latin, grec |  | anglais, espagnol |  | musique, théâtre | football | UPE2A (élèves allophones) |
| Collège Robert Doisneau (0920855E) | anglais | allemand, espagnol | latin, grec |  |  |  |  |  | SEGPA |
| Collège Henri Matisse (0920877D) | anglais | allemand, chinois, espagnol | latin |  | allemand, anglais |  | musique |  | ULIS, UPE2A (élèves allophones) |
| Collège Paul Éluard (0920880G) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  | football | ULIS, SEGPA |
| Collège Henri Bergson (0920881H) | anglais | espagnol | latin |  | allemand, anglais |  |  | golf, handball | ULIS |
| Collège Victor Hugo (0920882J) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  | ULIS, 3e prépa-métiers |
| Collège Claude-Nicolas Ledoux (0920883K) | anglais | allemand, espagnol | latin |  |  |  | musique | volley ball |  |
| Collège Jean Macé (0920884L) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  | ULIS |
| Collège Henri Sellier (0920885M) | anglais | espagnol | latin |  | allemand, anglais |  |  |  | SEGPA, UPE2A (élèves allophones) |
| Collège La Fontaine du Roy (0920886N) | anglais | allemand, espagnol | latin, grec |  |  |  | musique |  | ULIS |
| Collège Saint-Joseph (0920890T) | anglais | allemand, espagnol | latin, grec |  |  |  |  |  |  |
| Collège Dupanloup (0920902F) | anglais | allemand, espagnol | latin |  |  |  |  |  |  |
| Collège Saint-Joseph (0920905J) | allemand, anglais | allemand, anglais, espagnol | latin |  |  |  |  |  |  |
| Ecole secondaire privée Marymount School (0920925F) |  |  |  |  |  |  |  |  |  |
| Collège Sainte-Jeanne d'Arc (0920936T) | anglais | espagnol | latin |  |  |  |  |  |  |
| Collège Sainte-Marie (0920998K) | anglais | allemand, espagnol | latin |  |  |  |  |  |  |
| Collège Sainte-Geneviève (0920999L) | anglais | allemand, espagnol, russe | latin |  | allemand, anglais |  |  |  |  |
| Collège La Salle - Saint-Nicolas (0921003R) | anglais | allemand, chinois, espagnol | latin |  |  |  |  |  |  |
| Collège Saint-Justin (0921007V) | anglais | allemand, espagnol | latin |  | allemand, anglais, espagnol |  |  |  | ULIS |
| Collège Notre-Dame de France (0921012A) | allemand, anglais | allemand, anglais, espagnol | latin |  |  |  |  |  | ULIS |
| Collège Saint-Pierre Saint-Jean (0921015D) | anglais | allemand, anglais, espagnol | latin |  |  |  |  |  |  |
| Collège Notre-Dame (0921018G) | allemand, anglais | anglais, espagnol | latin, grec |  | anglais, espagnol |  |  |  |  |
| Collège Saint-Joseph (0921020J) | anglais | allemand, espagnol | latin |  |  |  |  |  |  |
| Collège Édouard Vaillant (0921157H) | anglais | chinois, espagnol | latin |  | allemand, anglais |  | danse | rugby | ULIS, UPE2A (élèves allophones), 3e prépa-métiers |
| Collège Édouard Manet (0921159K) | anglais | allemand, espagnol | latin, grec |  | allemand, anglais |  |  |  | ULIS, UPE2A (élèves allophones) |
| Collège Jean-Baptiste Clément (0921160L) | anglais | arabe, espagnol | latin |  | allemand, anglais, espagnol |  |  | football | UPE2A (élèves allophones) |
| Collège Les Vallées (0921162N) | anglais | allemand, espagnol, italien | latin |  |  |  |  |  | ULIS, UPE2A (élèves allophones) |
| Collège Henri Wallon (0921165S) | anglais | allemand, espagnol | latin, grec |  | allemand, anglais |  | musique |  | ULIS |
| Collège Romain Rolland (0921168V) | anglais | allemand, espagnol, italien | latin |  | allemand, anglais |  |  |  | ULIS, SEGPA, Dispositif relais |
| Collège La Fontaine (0921170X) | anglais | allemand, espagnol, italien | latin |  | allemand, anglais |  |  |  | ULIS, UPE2A (élèves allophones) |
| Collège Émile Zola (0921178F) | anglais | allemand, espagnol | latin |  | allemand, anglais |  | musique | gymnastique aerobique |  |
| Collège Léonard de Vinci (0921179G) | allemand, anglais | allemand, espagnol | latin |  |  |  |  | sport-études badminton, sport-études basket-ball, sport-études grs, sport-études gymnastique, sport-études natation, sport-études tennis de table, sport-études tir a l'arc, sport-études volley ball | ULIS |
| Collège Thomas Masaryk (0921180H) | allemand, anglais | allemand, chinois, espagnol | latin |  |  |  |  | sport-études basket-ball, sport-études handball, sport-études karate, sport-études volley ball | Dispositif relais |
| Collège Pierre Brossolette (0921181J) | allemand, anglais | chinois, espagnol | latin |  |  |  | musique |  | ULIS |
| Collège Haut Mesnil (0921190U) | anglais | allemand, espagnol | latin, grec |  |  |  |  |  | ULIS, UPE2A (élèves allophones) |
| Collège Les Bouvets (0921219A) | anglais | allemand, espagnol | latin, grec |  | allemand, anglais |  |  | aviron | ULIS, UPE2A (élèves allophones) |
| Collège Jean Macé (0921228K) | anglais | allemand, chinois, espagnol | latin |  |  |  |  | rugby à 7 | ULIS, SEGPA, UPE2A (élèves allophones) |
| Collège Maréchal Leclerc (0921233R) | anglais | allemand, espagnol | latin |  | allemand, anglais |  | danse, musique | natation, natation et activ.sportiv. aquatiques | UPE2A (élèves allophones) |
| Collège Les Bons Raisins (0921234S) | anglais | allemand, espagnol | latin, grec |  |  |  |  | sport-études judo, sport-études rugby feminin, sport-études rugby masculin | UPE2A (élèves allophones) |
| Collège Les Martinets (0921235T) | anglais | espagnol | latin |  | allemand, anglais |  |  |  |  |
| Collège Landowski (0921236U) | anglais | allemand, espagnol | latin |  | allemand, anglais |  | musique | basket-ball | ULIS |
| Collège Bartholdi (0921237V) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  | ULIS, UPE2A (élèves allophones) |
| Collège Jacqueline Auriol (0921238W) | anglais | allemand, espagnol, portugais | latin |  | allemand, anglais, portugais |  |  |  | ULIS, UPE2A (élèves allophones) |
| Collège Jean Renoir (0921239X) | anglais | allemand, espagnol | latin |  | allemand, anglais |  | danse | badminton | SEGPA, UPE2A (élèves allophones) |
| Collège Saint-Exupéry (0921240Y) | anglais | allemand, espagnol | latin, grec |  | allemand, anglais |  |  |  | ULIS |
| Collège Paul Bert (0921241Z) | anglais | allemand, espagnol, italien | latin, grec |  | allemand, anglais |  |  | basket | ULIS, UPE2A (élèves allophones) |
| Collège Évariste Galois (0921242A) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  | allemand, anglais |  | musique | sport-études multi-activités | ULIS, SEGPA |
| Collège Anne Frank (0921243B) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  | UPE2A (élèves allophones), Dispositif relais |
| Collège de Sèvres (0921244C) | anglais | anglais, espagnol | latin, grec |  | allemand, anglais | allemande, britannique |  |  |  |
| Collège Les Chènevreux (0921353W) | anglais | allemand, espagnol | latin |  | allemand, anglais, portugais |  |  |  | ULIS, UPE2A (élèves allophones) |
| Collège George Sand (0921354X) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  |  |
| Collège Jean Jaurès (0921391M) | anglais | allemand, espagnol | latin, grec |  |  |  | danse, théâtre | tennis | ULIS, UPE2A (élèves allophones) |
| Collège Danton (0921393P) | anglais | allemand, espagnol | latin |  |  |  | musique | escrime, trampoline | ULIS |
| Collège André Doucet (0921394R) | anglais | allemand, espagnol | latin |  | anglais, arabe |  |  | basket-ball | ULIS, SEGPA |
| Collège Victor Hugo (0921396T) | anglais | allemand, chinois, espagnol | latin |  | allemand, anglais |  |  | triathlon | ULIS, UPE2A (élèves allophones) |
| Collège Gay-Lussac (0921494Z) | anglais | allemand, espagnol | grec |  |  |  |  | rugby | ULIS, UPE2A (élèves allophones) |
| Collège Georges Pompidou (0921496B) | anglais | allemand, espagnol | latin, grec |  |  | allemande, japonaise |  |  | ULIS, SEGPA |
| Collège André Maurois (0921498D) | anglais | espagnol, italien | latin, grec |  | allemand, anglais |  |  |  | ULIS |
| Collège Marcel Pagnol (0921501G) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  | ULIS |
| Collège Malmaison (0921502H) | anglais | allemand, espagnol | latin |  | allemand, anglais |  | danse | football | ULIS |
| Collège Maurice Genevoix (0921504K) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  | allemand, anglais |  |  |  | ULIS |
| Collège François Furet (0921507N) | allemand, anglais | espagnol | latin, grec |  | allemand, anglais |  |  |  | ULIS |
| Collège Pasteur (0921541A) | anglais | espagnol | latin, grec |  | allemand, anglais |  | musique |  | ULIS, SEGPA, UPE2A (élèves allophones), Dispositif relais |
| Collège Georges Pompidou (0921543C) | anglais | espagnol | latin |  | allemand, anglais, arabe |  |  |  | ULIS, SEGPA, Dispositif relais |
| Collège André Malraux (0921545E) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  | volley ball | ULIS, SEGPA, UPE2A (élèves allophones), Dispositif relais |
| Collège Voltaire (0921547G) | allemand, anglais | allemand, anglais, chinois, espagnol | latin |  | allemand, anglais |  |  | football | ULIS, UPE2A (élèves allophones) |
| Collège Alfred de Vigny (0921550K) | anglais | allemand, espagnol | latin, grec |  |  | chinoise |  |  | ULIS, UPE2A (élèves allophones) |
| Collège Bel Air (0921554P) | anglais | allemand, espagnol | latin, grec |  |  |  |  |  | ULIS |
| Collège Évariste Galois (0921589C) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  | rugby | UPE2A (élèves allophones), Dispositif relais |
| Collège Jules Verne (0921590D) | anglais, russe | allemand, anglais, espagnol, russe | latin |  | allemand, anglais |  | musique |  | SEGPA |
| Collège Émile Verhaeren (0921591E) | anglais | espagnol, italien | latin, grec |  | allemand, anglais | britannique, portugaise |  |  |  |
| Collège Guy Môquet (0921621M) | anglais | allemand, espagnol | latin |  | allemand, anglais |  | arts plastiques |  | ULIS |
| Collège Auguste Renoir (0921622N) | anglais | allemand, chinois, espagnol | latin, grec |  | allemand, anglais |  |  |  | UPE2A (élèves allophones), Dispositif relais |
| Collège Jean Jaurès (0921623P) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  | handball | ULIS, UPE2A (élèves allophones), Dispositif relais |
| Collège Henri Barbusse (0921631Y) | anglais | espagnol, italien | latin |  |  |  | musique | athletisme | UPE2A (élèves allophones) |
| Collège Marguerite Duras (0921675W) | anglais | espagnol | latin, grec |  | anglais, espagnol |  |  | handball | ULIS, SEGPA, Dispositif relais |
| Collège Joliot-Curie (0921778H) | anglais | allemand, espagnol |  |  |  |  |  |  |  |
| Collège Albert Camus (0921779J) | anglais | espagnol, italien | latin |  | allemand, anglais |  |  | trampoline | ULIS |
| Collège Louis Pasteur (0921780K) | anglais | allemand, espagnol, russe | latin, grec |  |  |  |  |  | ULIS |
| Collège Théophile Gautier (0921781L) | anglais | allemand, espagnol, italien | latin, grec |  | allemand, anglais |  |  |  | ULIS |
| Collège Rabelais (0921782M) | anglais | allemand, espagnol, russe | latin, grec |  | allemand, anglais |  |  |  | ULIS |
| Collège Michelet (0921783N) | anglais | allemand, espagnol, italien | latin |  | allemand, anglais |  |  |  |  |
| Collège Lakanal (0921784P) | allemand, anglais | allemand, anglais, espagnol, italien | latin, grec |  | anglais, russe |  |  |  | ULIS |
| Collège Marie Curie (0921785R) | allemand, anglais, russe | allemand, anglais, espagnol, italien | latin, grec |  |  |  |  |  |  |
| Collège Descartes (0921786S) | anglais | allemand, espagnol, italien | latin, grec |  | allemand, anglais |  |  |  | ULIS |
| Collège Henri-Georges Adam (0921868F) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  |  |
| Collège Sainte-Marie la Croix (0921901S) | anglais | allemand, espagnol | latin, grec |  | allemand, anglais |  | musique |  | ULIS |
| Collège Sainte-Geneviève (0921902T) | allemand, anglais | allemand, anglais, espagnol | latin |  |  |  |  |  |  |
| Collège Saint-Gabriel (0921903U) | anglais | allemand, espagnol | latin |  |  |  |  |  |  |
| Collège Maïmonide Rambam (0921904V) | anglais | espagnol, hébreu moderne | latin |  | anglais, hébreu moderne |  |  |  |  |
| Collège Notre-Dame (0921905W) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  |  |  |  |  |  |
| Collège Sophie Barat (0921906X) | anglais | allemand, espagnol | latin |  | allemand, anglais, espagnol |  |  |  |  |
| Collège Saint-Thomas de Villeneuve (0921907Y) | anglais | allemand, espagnol | latin |  |  |  |  |  | ULIS |
| Collège Jeanne d'Arc (0921908Z) | allemand, anglais | allemand, anglais, chinois, espagnol | latin |  | allemand, anglais, espagnol |  |  | rugby | SEGPA |
| Collège La Source (0921909A) | anglais | allemand, espagnol | latin |  |  |  |  |  |  |
| Collège Jeanne d'Arc (0921911C) | anglais | allemand, espagnol | latin |  |  |  |  |  |  |
| Collège Sainte-Marie (0921912D) | anglais | allemand, espagnol, russe | latin, grec |  |  |  |  |  |  |
| Collège Notre-Dame de Sainte-Croix (0921913E) | anglais | allemand, espagnol | latin, grec |  | allemand, anglais, espagnol |  |  |  |  |
| Collège Saint-Dominique (0921914F) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  |  | ULIS |
| Collège Passy Saint-Nicolas Buzenval (0921915G) | anglais | allemand, espagnol | latin, grec |  |  |  |  | handball, rugby | Classe pour enfants de familles itinérantes |
| Collège Madeleine Daniélou (0921916H) | allemand, anglais, chinois | anglais, espagnol, russe | latin, grec |  |  |  |  |  |  |
| Collège Sainte-Jeanne d'Arc (0921918K) | allemand, anglais | allemand, anglais, espagnol, italien | latin, grec |  | allemand, anglais, espagnol, italien |  |  |  |  |
| Collège Suger (0921919L) | anglais | espagnol |  |  |  |  |  | équitation |  |
| Collège Paul Éluard (0921940J) | anglais | espagnol | latin |  |  | britannique |  | volley ball | ULIS |
| Collège Les Renardières (0922020W) | anglais | allemand, espagnol | latin, grec |  | allemand, anglais | américaine, arabe | musique |  | ULIS |
| Collège Yves du Manoir (0922143E) | anglais | espagnol | latin, grec |  | allemand, anglais |  |  |  |  |
| Collège de la Paix (0922247T) | anglais | chinois, espagnol, italien | latin |  | allemand, anglais |  |  |  |  |
| Collège Chambertin (0922256C) | anglais | allemand, espagnol | latin |  | anglais, espagnol |  |  |  |  |
| Collège Saint-Philippe (0922340U) | anglais | espagnol |  |  |  |  |  |  | Dispositif relais, 3e prépa-métiers |
| Collège Notre-Dame (0922450N) | allemand, anglais | anglais, espagnol | latin, grec |  |  |  |  |  |  |
| Collège Hautefeuille (0922482Y) | anglais | allemand, espagnol | latin |  |  |  |  |  |  |
| Collège Les Bruyères (0922523T) | anglais | allemand, espagnol | latin, grec |  |  | coréenne |  |  | ULIS |
| Collège François Truffaut (0922565N) | allemand, anglais, italien | allemand, anglais, espagnol | latin |  |  |  |  |  | ULIS, UPE2A (élèves allophones) |
| Collège Georges Seurat (0922578C) | anglais | allemand, espagnol | latin, grec |  |  | britannique |  |  |  |
| Ecole de danse de l'Opéra de Paris (0922579D) | anglais | allemand |  |  |  |  |  |  |  |
| Collège Vincent Van Gogh (0922595W) | anglais | espagnol | latin |  | allemand, anglais |  |  |  | ULIS |
| Collège Georges Mandel (0922610M) | anglais | allemand, chinois, espagnol | latin |  | allemand, anglais, chinois |  | musique |  | ULIS |
| Collège Jean Mermoz (0922629H) | anglais | espagnol, italien | latin, grec |  | allemand, anglais |  |  |  | ULIS |
| Collège Louis Blériot (0922630J) | anglais | allemand, espagnol | latin, grec |  |  |  | musique | judo, tennis de table | ULIS |
| Collège Les Champs Philippe (0922645A) | anglais | allemand, espagnol | latin |  |  |  |  |  | ULIS |
| Ecole secondaire privée  les vignes (0922657N) |  |  |  |  |  |  |  |  |  |
| Collège Robert Paparemborde (0922662U) | anglais | allemand, espagnol | latin, grec |  |  |  |  |  |  |
| Collège Armande Béjart (0922701L) | anglais | allemand, espagnol | latin |  |  |  |  |  | SEGPA, UPE2A (élèves allophones) |
| Collège Bienheureux Charles de Foucauld (0922731U) | anglais | allemand, espagnol |  |  | allemand, anglais |  |  |  |  |
| Collège privé Beth Hilel (0922751R) |  |  |  |  |  |  |  |  |  |
| Ecole secondaire privée de l'Institut d'enseignement IBN Badis (0922764E) |  |  |  |  |  |  |  |  |  |
| Ecole secondaire privée  Cours Antoine de Saint-Exupéry (0922765F) |  |  |  |  |  |  |  |  |  |
| Ecole secondaire privée  international scolaire - Open Sky International (0922798S) |  |  |  |  |  |  |  |  |  |
| Ecole secondaire privée ALEF (0922832D) |  |  |  |  |  |  |  |  |  |
| Ecole secondaire privée Iféa Emilie du Châtelet (0922878D) |  |  |  |  |  |  |  |  |  |
| Ecole secondaire privée Pardess Hannah (0922924D) |  |  |  |  |  |  |  |  |  |
| Ecole secondaire privée internationale Deutsche Schule Paris (0922943Z) |  |  |  |  |  |  |  |  |  |
| Ecole secondaire privée Iféa Katherine Johnson (0922955M) |  |  |  |  |  |  |  |  |  |
| Ecole secondaire privée Cours Singulier (0922964X) |  |  |  |  |  |  |  |  |  |
| Ecole secondaire privée Ecole Diagonale (0922967A) |  |  |  |  |  |  |  |  |  |
| Ecole secondaire privée du Centre de référence pour l'évaluation neuropsychologique de l'enfant (CERENE) (0922977L) |  |  |  |  |  |  |  |  |  |
| Ecole secondaire privée Walt (0923006T) |  |  |  |  |  |  |  |  |  |
| Collège privé Beth Sepher Yad Mordekai (0923042G) |  |  |  |  |  |  |  |  |  |
| Collège privé Institution Yad Mordekai (0923043H) |  |  |  |  |  |  |  |  |  |
| Ecole secondaire privée HamaskaIne Tarkamantchatz (0923143S) |  |  |  |  |  |  |  |  |  |
| Ecole secondaire privée Groupe Scolaire Yaguel Yaacov (0923154D) |  |  |  |  |  |  |  |  |  |
| Ecole secondaire privée Marianne Picard (0923155E) |  |  |  |  |  |  |  |  |  |
| Ecole secondaire privé Les Génies de Demain (0923494Y) |  |  |  |  |  |  |  |  |  |
| Collège Jean de Beaumont (0930043S) | allemand, anglais, espagnol | allemand, espagnol | latin |  | allemand, anglais |  |  | judo | ULIS, UPE2A (élèves allophones), Dispositif relais |
| Collège Anatole France (0930089S) | anglais | allemand, espagnol | latin, grec |  |  |  |  |  | ULIS, UPE2A (élèves allophones) |
| Collège Éric Tabarly (0930100D) | allemand, anglais, espagnol | espagnol | latin, grec |  | allemand, anglais |  |  |  | ULIS |
| Collège Albert Camus (0930586G) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  | allemand, anglais |  |  |  | ULIS |
| Collège Saint-Exupéry (0930593P) | allemand, anglais | allemand, anglais, chinois, espagnol |  |  | allemand, anglais |  |  |  | SEGPA |
| Collège Nelson Mandela (0930611J) | anglais | allemand, espagnol | latin |  |  | espagnole |  | football | Dispositif relais |
| Collège Romain Rolland (0930616P) | anglais | allemand, arabe, espagnol | latin |  |  |  |  |  | ULIS, UPE2A (élèves allophones), Dispositif relais |
| Collège Édouard Herriot (0930619T) | anglais | allemand, espagnol | latin, grec | anglais | allemand, anglais |  | musique |  | ULIS, Classe pour enfants de familles itinérantes |
| Collège Léon Jouhaux (0930620U) | allemand, anglais | espagnol, italien | latin, grec | allemand | allemand, anglais |  |  | basket-ball | SEGPA |
| Collège Jean Moulin (0930623X) | allemand, anglais | espagnol | latin, grec |  | allemand, anglais |  |  | tennis | ULIS |
| Collège Jean-Baptiste Corot (0930629D) | allemand, anglais | allemand, anglais, espagnol, italien | latin, grec | anglais |  |  |  |  |  |
| Collège Pablo Neruda (0930858C) | allemand, anglais | allemand, espagnol, italien | latin, grec |  | allemand, anglais |  |  |  | UPE2A (élèves allophones), Dispositif relais |
| Collège Gérard Philipe (0930859D) | allemand, anglais | espagnol | latin, grec |  |  |  | musique | rugby | UPE2A (élèves allophones) |
| Collège Jean Lurçat (0930865K) | anglais, italien | allemand, anglais, italien | latin | italien | anglais, italien |  |  | athletisme | ULIS |
| Collège Saint-Exupéry (0930883E) | anglais | allemand, espagnol | latin | anglais | allemand, anglais |  |  |  | ULIS, UPE2A (élèves allophones) |
| Collège Aimé et Eugénie Cotton (0930884F) | allemand, anglais | allemand, anglais, espagnol | latin |  |  |  | danse, musique | basket | ULIS |
| Collège Victor Hugo (0930891N) | allemand, anglais | espagnol, italien | latin |  |  |  |  | football, handball | ULIS, SEGPA, Dispositif relais |
| Collège Anatole France (0930892P) | allemand, anglais, portugais | allemand, anglais, espagnol, portugais | latin |  | anglais, portugais |  |  | football |  |
| Collège Roger Martin du Gard (0930893R) | allemand, anglais | allemand, anglais, espagnol | latin, grec | anglais, espagnol | allemand, anglais |  |  | football | ULIS, SEGPA, UPE2A (élèves allophones), Dispositif relais |
| Collège Honoré de Balzac (0930894S) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  | hockey sur glace, sports de glace, sport-études hockey sur glace | ULIS, SEGPA, Dispositif relais |
| Collège Paul Painlevé (0930897V) | anglais | espagnol | latin |  |  |  |  |  | ULIS, UPE2A (élèves allophones), Dispositif relais |
| Collège Madame de Sévigné (0930898W) | allemand, anglais | allemand, espagnol, italien | latin |  | allemand, anglais |  |  |  | ULIS |
| Collège Jean-Pierre Timbaud (0930900Y) | allemand, anglais | allemand, italien | latin |  | allemand, anglais |  |  |  | ULIS, UPE2A (élèves allophones), Dispositif relais |
| Collège privé Saint-Joseph (0930902A) | anglais | allemand, espagnol | latin |  |  |  |  |  |  |
| Collège privé Notre-Dame des Vertus (0930903B) | anglais | allemand, espagnol | latin |  |  |  |  |  |  |
| Collège privé Assomption (0930906E) | anglais | espagnol, italien | latin |  |  |  |  | badminton |  |
| Collège Saint-Germain (0930907F) | anglais | espagnol | latin |  |  |  |  |  |  |
| Collège Fidélis (0930912L) | anglais | allemand, espagnol | latin |  |  |  |  |  |  |
| Collège Saint-Joseph (0930917S) | anglais, chinois | allemand, chinois, espagnol | latin |  | anglais, espagnol |  |  |  |  |
| Collège Sainte-Marie (0930920V) | anglais | allemand, espagnol | latin, grec |  |  |  |  |  |  |
| Collège Fénelon (0930921W) | allemand, anglais | allemand, anglais, espagnol, italien | latin |  | allemand, anglais |  |  |  | Dispositif relais |
| Collège La Salle Saint-Denis (0930959M) | anglais | allemand, espagnol | latin |  |  |  | musique | judo | ULIS, 3e prépa-métiers |
| Collège Sainte-Marie (0930963S) | anglais | allemand, espagnol | latin |  |  |  |  |  |  |
| Collège Alliance (0930966V) | anglais, hébreu moderne | espagnol, hébreu moderne |  |  |  |  |  |  |  |
| Collège Saint-Louis Sainte-Clotilde (0930969Y) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  | allemand, anglais |  |  |  |  |
| Collège privé Tebrotzassère (0930970Z) | anglais, arménien | allemand, arménien, espagnol |  |  | anglais, arménien |  |  |  |  |
| Collège Pierre Curie (0931005M) | anglais | allemand, espagnol | latin |  |  |  |  |  | ULIS |
| Collège privé Saint-Benoist de l'Europe (0931022F) | anglais | espagnol | latin |  |  |  |  |  |  |
| Collège Jean Jaurès (0931143M) | allemand, anglais, italien | allemand, espagnol, italien | latin, grec |  | allemand, anglais, espagnol, italien |  |  |  | SEGPA, UPE2A (élèves allophones), Dispositif relais |
| Collège Jules Michelet (0931144N) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  | football | ULIS, Dispositif relais, 3e prépa-métiers |
| Collège Robespierre (0931145P) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  | allemand, anglais, espagnol |  |  |  | SEGPA, UPE2A (élèves allophones) |
| Collège Barbara (0931147S) | anglais | espagnol | latin, grec |  |  |  |  | basket-ball | ULIS, UPE2A (élèves allophones), Dispositif relais |
| Collège Georges Politzer (0931148T) | allemand, anglais | allemand, arabe, espagnol | latin, grec |  | allemand, anglais, arabe |  | musique |  | ULIS, SEGPA, UPE2A (élèves allophones), 3e prépa-métiers |
| Collège Pierre de Ronsard (0931149U) | anglais, italien | espagnol, italien |  |  | anglais, italien |  |  | handball | ULIS, Dispositif relais |
| Collège Jean Moulin (0931151W) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  | danse | SEGPA, UPE2A (élèves allophones) |
| Collège Georges Politzer (0931181D) | allemand, anglais | allemand, espagnol | latin |  | allemand, anglais |  | musique |  | ULIS, SEGPA |
| Collège Jean Moulin (0931184G) | allemand, anglais, chinois | allemand, anglais, chinois, espagnol | latin |  | allemand, anglais, chinois |  |  | handball | SEGPA, UPE2A (élèves allophones), Dispositif relais |
| Collège Gabriel Péri (0931185H) | anglais | allemand, espagnol | latin |  |  |  | musique |  | ULIS, UPE2A (élèves allophones), Dispositif relais |
| Collège Denis Diderot (0931186J) | allemand, anglais | allemand, espagnol | latin |  | allemand, anglais |  | danse, musique |  | UPE2A (élèves allophones) |
| Collège Didier Daurat (0931187K) | anglais | allemand, espagnol | latin, grec |  |  |  |  | football | ULIS, UPE2A (élèves allophones) |
| Collège Raymond Poincaré (0931188L) | allemand, anglais, arabe | allemand, arabe, espagnol | latin | anglais | allemand, anglais, arabe |  |  |  | ULIS, UPE2A (élèves allophones) |
| Collège Le Parc (0931189M) | allemand, anglais | anglais, espagnol | latin |  | allemand, anglais |  | danse, musique | gymnastique, gymnastique artistique, sport-études gymnastique | ULIS |
| Collège Évariste Galois (0931190N) | anglais, italien | allemand, espagnol, italien | latin |  | allemand, anglais, italien |  | musique | karate | SEGPA, UPE2A (élèves allophones), Dispositif relais |
| Collège Romain Rolland (0931191P) | allemand, anglais | allemand, espagnol | latin, grec |  | allemand, anglais |  |  |  | ULIS |
| Collège Les Mousseaux (0931192R) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  |  | ULIS |
| Collège République (0931194T) | allemand, anglais | allemand, espagnol | latin |  | allemand, anglais |  |  | football | ULIS, SEGPA, UPE2A (élèves allophones), Dispositif relais |
| Collège Auguste Delaune (0931195U) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  | handball | ULIS, UPE2A (élèves allophones) |
| Collège Angela Davis (0931196V) | allemand, anglais | allemand | latin |  |  |  | musique | rugby | ULIS, UPE2A (élèves allophones), Dispositif relais |
| Collège Aretha Franklin (ex Paul Langevin) (0931199Y) | anglais | allemand, espagnol | latin |  |  |  |  |  | ULIS, UPE2A (élèves allophones) |
| Collège Pierre Sémard (0931200Z) | allemand, anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  | ULIS, SEGPA |
| Collège Paul Bert (0931201A) | allemand, anglais | allemand, espagnol, portugais | latin, grec |  | allemand, anglais |  |  |  | ULIS, UPE2A (élèves allophones) |
| Collège Liberté (0931202B) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  | musique |  | ULIS |
| Collège Marcel Cachin (0931204D) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  | football | ULIS, UPE2A (élèves allophones) |
| Collège Jean Vilar (0931206F) | anglais | arabe, espagnol | latin | espagnol |  |  |  |  | ULIS, UPE2A (élèves allophones), Dispositif relais |
| Collège Évariste Galois (0931207G) | anglais | allemand, espagnol, japonais | latin, grec |  |  |  |  |  | ULIS, UPE2A (élèves allophones), Dispositif relais |
| Collège Georges Politzer (0931209J) | anglais, arabe | espagnol, italien | latin |  | anglais, arabe |  |  |  | UPE2A (élèves allophones), Dispositif relais |
| Collège Marcelin Berthelot (0931210K) | allemand, anglais | allemand, chinois, espagnol | latin, grec |  | allemand, anglais |  |  | gymnastique, gymnastique artistique | ULIS |
| Collège Marais de Villiers (0931211L) | allemand, anglais | espagnol | latin, grec |  | allemand, anglais |  |  | athletisme, football | Dispositif relais |
| Collège Oum Kalthoum (0931212M) | anglais | allemand, chinois, espagnol, italien | latin | anglais | anglais, chinois | britannique |  | basket-ball | ULIS, SEGPA, Dispositif relais |
| Collège Colonel Fabien (0931213N) | anglais, arabe, italien | arabe, espagnol, italien | latin, grec |  |  |  | danse, musique |  | ULIS, UPE2A (élèves allophones) |
| Collège Clos Saint-Vincent (0931214P) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  | allemand, anglais |  |  | gymnastique, gymnastique artistique, triathlon, sport-études gymnastique | ULIS, SEGPA, UPE2A (élèves allophones) |
| Collège Jean Jaurès (0931216S) | allemand, anglais | allemand, espagnol | latin, grec |  | allemand, anglais |  |  | rugby | Dispositif relais |
| Collège Irène et Frédéric Joliot Curie (0931217T) | allemand, anglais, espagnol, italien | allemand, chinois, espagnol, italien | latin, grec |  | allemand, anglais, italien |  | musique | volley-ball | ULIS, Dispositif relais |
| Collège Jean Lolive (0931218U) | allemand | allemand, anglais, chinois, espagnol |  |  | allemand, anglais |  | mathématiques et sciences |  | ULIS, UPE2A (élèves allophones) |
| Collège Jean-Jacques Rousseau (0931219V) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  |  | UPE2A (élèves allophones), Dispositif relais |
| Collège Travail Langevin (0931220W) | allemand, anglais | anglais, espagnol, italien | latin, grec |  | allemand, anglais |  |  | lutte | UPE2A (élèves allophones), Dispositif relais |
| Collège Louise Michel (0931221X) | allemand, anglais | allemand, arabe, espagnol | latin |  | anglais, arabe |  | musique |  | SEGPA, UPE2A (élèves allophones) |
| Collège Pierre-André Houël (0931222Y) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  | handball | ULIS |
| Collège Gustave Courbet (0931223Z) | allemand, anglais | allemand, anglais, espagnol | latin, grec | allemand | anglais |  | musique | football, handball | ULIS, SEGPA, UPE2A (élèves allophones), Dispositif relais |
| Collège Pablo Neruda (0931224A) | allemand, anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  | UPE2A (élèves allophones) |
| Collège Joliot Curie (0931225B) | allemand, anglais | allemand, espagnol | latin, grec |  | allemand, anglais |  |  | natation, natation et activ.sportiv. aquatiques | ULIS, UPE2A (élèves allophones) |
| Collège Pablo Neruda (0931226C) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  | athletisme | SEGPA, UPE2A (élèves allophones), Dispositif relais |
| Collège Louis Pasteur (0931227D) | anglais, espagnol | allemand, espagnol, italien | latin, grec |  | anglais, italien |  |  |  | ULIS |
| Collège Albert Camus (0931228E) | anglais | espagnol | latin |  |  |  |  |  | ULIS |
| Collège Fabien (0931229F) | anglais | allemand, espagnol, portugais | latin, grec |  |  |  | musique | tennis de table | SEGPA, UPE2A (élèves allophones) |
| Collège Elsa Triolet (0931230G) | allemand, anglais | allemand, anglais, espagnol, portugais | latin |  | allemand, anglais |  |  |  | UPE2A (élèves allophones) |
| Collège Pierre de Geyter (0931231H) | anglais, espagnol | anglais, arabe, espagnol | latin |  | anglais, arabe, espagnol |  |  |  | UPE2A (élèves allophones), Dispositif relais |
| Collège Henri Barbusse (0931232J) | allemand, anglais | allemand, espagnol | latin, grec |  | allemand, anglais |  |  |  | ULIS, SEGPA, UPE2A (élèves allophones), Dispositif relais |
| Collège Jean-Baptiste Clément (0931376R) | anglais | espagnol |  |  |  |  | danse, musique | hip-hop | ULIS, Dispositif relais |
| Collège Jacques Jorissen (0931377S) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  |  | SEGPA, UPE2A (élèves allophones) |
| Collège Pablo Neruda (0931379U) | allemand, anglais, espagnol | allemand, anglais, espagnol | latin, grec |  | allemand, anglais |  | mathématiques et sciences | rugby | ULIS, SEGPA, UPE2A (élèves allophones) |
| Collège Gustave Courbet (0931381W) | anglais | espagnol | latin |  |  |  | musique | tennis de table | SEGPA, Dispositif relais |
| Collège Eugène Carrière (0931382X) | anglais | anglais, espagnol | latin, grec |  | allemand, anglais |  |  |  |  |
| Collège Jean Vigo (0931428X) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  | allemand, anglais |  |  |  | UPE2A (élèves allophones), Dispositif relais |
| Collège Jean Vilar (0931429Y) | anglais | arabe, espagnol | latin |  | anglais, espagnol |  | théâtre |  | ULIS, UPE2A (élèves allophones), Dispositif relais |
| Collège René Descartes (0931433C) | allemand, anglais | allemand, espagnol | latin |  | allemand, espagnol |  |  | judo, karate | SEGPA |
| Collège Claude Debussy (0931434D) | allemand, anglais | allemand, espagnol | latin |  | allemand, anglais |  |  | football | ULIS, UPE2A (élèves allophones), Dispositif relais |
| Collège Marie Curie (0931439J) | allemand, anglais | anglais, espagnol | latin, grec | anglais | allemand, anglais |  |  |  | ULIS |
| Collège Paul Éluard (0931448U) | allemand, anglais | allemand, espagnol | latin, grec | langue non précisée | allemand, anglais |  | musique |  | ULIS, UPE2A (élèves allophones) |
| Collège Georges Braque (0931485J) | allemand, anglais | allemand, espagnol | latin |  | allemand, anglais, espagnol |  |  | football | ULIS, UPE2A (élèves allophones) |
| Collège Federico Garcia Lorca (0931489N) | allemand, anglais, arabe | allemand, arabe, espagnol | latin |  | allemand, anglais, arabe |  |  | danse, hip-hop | ULIS, SEGPA, UPE2A (élèves allophones), Dispositif relais |
| Collège La Courtille (0931490P) | anglais | allemand, espagnol | latin, grec |  | allemand, anglais |  |  |  | ULIS, UPE2A (élèves allophones), Dispositif relais |
| Collège René Descartes (0931497X) | anglais, italien | anglais, espagnol, italien | latin |  | anglais, italien |  |  |  | ULIS, SEGPA, Dispositif relais |
| Collège Saint-Joseph (0931528F) | allemand, anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  | ULIS, SEGPA |
| Collège Jean Jaurès (0931546A) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  | football | ULIS, UPE2A (élèves allophones), 3e prépa-métiers |
| Collège Jean Jaurès (0931607S) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  | anglais, espagnol |  |  |  | ULIS, SEGPA |
| Collège Jacques Prévert (0931610V) | allemand, anglais | allemand, espagnol | latin | anglais, espagnol | allemand, anglais |  |  |  | ULIS, SEGPA, Dispositif relais |
| Collège Jean Zay (0931612X) | anglais | allemand, espagnol | latin |  | allemand, anglais | allemande |  | basket-ball | SEGPA, UPE2A (élèves allophones), Dispositif relais |
| Collège Jacques Prévert (0931614Z) | allemand, anglais, chinois | allemand, anglais, chinois, espagnol | latin, grec |  | allemand, anglais, chinois |  |  | badminton | SEGPA, 3e prépa-métiers |
| Collège Françoise Cabrini (0931705Y) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  |  | ULIS |
| Collège Pablo Picasso (0931707A) | allemand, anglais | allemand, espagnol | latin |  | allemand, anglais |  |  | handball | SEGPA |
| Collège Henri Wallon (0931709C) | allemand, anglais | anglais, espagnol, italien | latin |  | allemand, anglais |  |  | football |  |
| Collège Olympe de Gouges (0931710D) | anglais | allemand, chinois, espagnol, italien | latin, grec |  | anglais, chinois |  |  |  | UPE2A (élèves allophones), Dispositif relais |
| Collège Jean Renoir (0931711E) | anglais | allemand, espagnol | latin, grec |  |  |  | musique | football | UPE2A (élèves allophones) |
| Collège Jean Jaurès (0931712F) | allemand, anglais, italien | allemand, anglais, arabe, espagnol, italien | latin, grec |  | allemand, anglais, italien |  |  |  | Dispositif relais |
| Collège Antoine Laurent de Lavoisier (0931713G) | allemand, anglais | allemand, anglais, chinois, espagnol | latin, grec |  | allemand, anglais |  |  |  | SEGPA, UPE2A (élèves allophones) |
| Collège Langevin Wallon (0931723T) | allemand, anglais | allemand, chinois, espagnol | latin, grec |  | allemand, anglais |  |  | arts du cirque | ULIS |
| Collège Alfred Sisley (0931765N) | anglais | chinois, espagnol | latin |  |  |  |  |  | ULIS, UPE2A (élèves allophones) |
| Collège Henri Sellier (0931788N) | allemand, anglais | espagnol | latin, grec |  | allemand, anglais |  |  |  | ULIS |
| Collège privé l'Espérance (0931843Y) | allemand, anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  |  |
| Collège privé Charles Péguy (0931844Z) | anglais | allemand, espagnol | latin, grec |  |  |  |  |  |  |
| Collège Henri Matisse (0931845A) | allemand, anglais | anglais, espagnol | latin |  |  |  |  |  |  |
| Collège Saint-Louis Blanche de Castille (0931846B) | anglais | allemand, espagnol, italien | latin |  | allemand, anglais, espagnol |  |  |  |  |
| Collège Merkaz Hatorah Garçons (0931855L) | anglais, hébreu moderne | hébreu moderne |  |  | anglais, hébreu moderne |  |  |  |  |
| Collège Pierre Brossolette (0931860S) | allemand, anglais | allemand, espagnol | latin |  |  |  |  | escrime, judo, sport-études escrime | ULIS |
| Collège René Cassin (0931883S) | allemand, anglais | allemand, espagnol | latin, grec |  | allemand, anglais |  |  | water-polo, sport-études water polo | ULIS |
| Collège Victor Hugo (0931978V) | allemand, anglais, chinois | allemand, anglais, chinois, espagnol | latin |  | allemand, anglais, chinois | chinois | mathématiques et sciences | handball | ULIS, Dispositif relais |
| Collège Georges Brassens (0931979W) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  | football | ULIS, UPE2A (élèves allophones), Dispositif relais |
| Collège Françoise Dolto (0932038K) | anglais | espagnol | latin, grec |  |  |  |  |  | UPE2A (élèves allophones) |
| Collège privé Chne Ohr (0932043R) | anglais | hébreu moderne |  |  | anglais, hébreu moderne |  |  |  |  |
| Collège Joséphine Baker (0932261C) | allemand, anglais | allemand, arabe, espagnol | latin |  |  | américaine |  | natation, natation et activ.sportiv. aquatiques | ULIS, UPE2A (élèves allophones) |
| Collège de la Pléiade (0932262D) | allemand, anglais | allemand, espagnol |  |  | allemand, anglais |  |  |  | Dispositif relais |
| Collège Camille Claudel (0932263E) | anglais | allemand, espagnol | latin |  |  |  |  |  | Dispositif relais |
| Collège Rosa Luxembourg (0932272P) | anglais | allemand, chinois, espagnol |  |  | allemand, anglais, arabe, chinois |  |  |  | ULIS, SEGPA |
| Collège Iqbal Masih (0932273R) | anglais | allemand, espagnol | latin |  | anglais, espagnol |  |  | rugby | ULIS |
| Collège Henri IV (0932301W) | anglais | allemand, espagnol, italien | latin |  |  |  |  |  |  |
| Collège Merkaz Hatorah Filles (0932302X) | anglais | hébreu moderne |  |  | anglais, hébreu moderne |  |  |  |  |
| Collège Christine de Pisan (0932310F) | anglais | espagnol | latin |  |  |  |  |  | ULIS |
| Collège Théodore Monod (0932311G) | anglais | espagnol, italien | latin |  |  |  |  |  | ULIS, SEGPA |
| Collège François Mitterrand (0932333F) | anglais | allemand, espagnol | latin |  | allemand, espagnol |  |  |  | ULIS, UPE2A (élèves allophones) |
| Collège Lucie Aubrac (0932334G) | anglais | allemand, espagnol | latin, grec |  |  |  |  |  |  |
| Collège Robert Doisneau (0932366S) | allemand, anglais | allemand, arabe, espagnol | latin |  | allemand, anglais |  |  |  | ULIS, UPE2A (élèves allophones), Dispositif relais |
| Collège Lucie Aubrac (0932454M) | anglais | allemand, espagnol | latin |  |  |  |  |  | ULIS |
| Collège Simone Veil (0932578X) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  | ULIS |
| Collège Césaria Evora (0932579Y) | anglais, italien | espagnol, italien |  |  | anglais, italien |  |  | athletisme | ULIS |
| Collège Jacqueline de Romilly (0932580Z) | allemand, anglais | allemand, italien | latin |  | allemand, anglais |  |  | football en salle (futsal), futsal, natation, natation et activ.sportiv. aquatiques | ULIS, UPE2A (élèves allophones), Dispositif relais |
| Collège international de l'Est parisien (0932581A) | anglais, arabe, chinois, portugais | anglais, arabe, chinois, portugais | latin |  |  | américaine, arabe, brésilienne, chinoise |  |  | ULIS |
| Collège Dora Maar (0932582B) | anglais | allemand, espagnol, italien | latin |  | anglais, italien |  |  |  | ULIS |
| Collège Saint-Vincent-de-Paul (0932586F) | anglais | espagnol |  |  |  |  |  |  |  |
| Collège du Groupe scolaire privé Bellevue Muhammed Hamidullah (0932642S) |  |  |  |  |  |  |  |  |  |
| Collège privé La Fraternité (0932646W) |  |  |  |  |  |  |  |  |  |
| Collège privé Tachbar (0932647X) |  |  |  |  |  |  |  |  |  |
| Collège privé Protectorat Saint-Joseph (0932652C) | anglais | espagnol |  |  |  |  |  |  |  |
| Collège privé Excelle (0932669W) |  |  |  |  |  |  |  |  |  |
| Collège privé Malik Ibn Anas (0932686P) |  |  |  |  |  |  |  |  |  |
| Collège privé Iqra (0932690U) |  |  |  |  |  |  |  |  |  |
| Collège Gisèle Halimi (0932694Y) | anglais | allemand, arabe, espagnol | latin |  | anglais, arabe |  |  |  | ULIS, UPE2A (élèves allophones) |
| Collège Germaine Tillion (0932695Z) | anglais | allemand, espagnol | latin |  |  |  |  |  | ULIS |
| Collège Sòlveig Anspach (0932696A) | anglais | chinois, espagnol, italien | latin | anglais |  |  |  |  | ULIS, UPE2A (élèves allophones) |
| Collège privé La plume de l'éducation (0932717Y) |  |  |  |  |  |  |  |  |  |
| Collège Françoise Héritier (0932725G) | anglais | espagnol |  |  | allemand, anglais |  | musique |  | ULIS |
| Collège Miriam Makeba (0932726H) | anglais | arabe, espagnol |  |  |  | britannique |  |  | ULIS |
| Collège - Groupe Scolaire Privé APCS (0932728K) |  |  |  |  |  |  |  |  |  |
| Collège Al'Andalus (0932742A) |  |  |  |  |  |  |  |  |  |
| Collège Sainte-Louise de Marillac (0932772H) | anglais | espagnol |  |  | anglais, espagnol |  | danse, musique, théâtre |  |  |
| Collège privé La Salle - Le Landy (0932773J) |  |  |  |  |  |  |  |  |  |
| Collège Groupe Scolaire Privé Bougainville (0932797K) |  |  |  |  |  |  |  |  |  |
| Collège privé réussite éducative valeurs et épanouissement (0932860D) | anglais | allemand, espagnol |  |  |  |  |  |  |  |
| Collège privé Lab School Montreuil (0932890L) |  |  |  |  |  |  |  |  |  |
| Collège Niki de Saint Phalle (0932966U) | anglais | espagnol |  |  |  |  |  |  | ULIS |
| Collège Privé ALEKOLE93 (0933024G) |  |  |  |  |  |  |  |  |  |
| Collège Amédée Laplace (0940003T) | anglais | allemand, espagnol | latin, grec |  |  |  |  |  | ULIS |
| Collège Albert Schweitzer (0940006W) | anglais | espagnol, italien | latin |  | allemand, anglais |  |  | athletisme | ULIS, SEGPA, Dispositif relais |
| Collège Jules Ferry (0940012C) | anglais | allemand, chinois, espagnol, italien | latin |  | allemand, anglais |  |  |  |  |
| Collège Jean Perrin (0940022N) | anglais | allemand, espagnol | latin, grec |  | allemand, anglais, arabe |  |  |  |  |
| Collège Ovide Decroly (0940024R) | anglais | allemand, anglais, espagnol |  |  |  |  |  |  |  |
| Collège Victor Hugo (0940031Y) | anglais | allemand, espagnol | latin | langue non précisée | allemand, anglais |  |  |  | UPE2A (élèves allophones) |
| Collège Jean Charcot (0940038F) | allemand, anglais | allemand, anglais, espagnol | latin, grec |  |  |  |  | aviron |  |
| Collège Adolphe Chérioux (0940042K) | anglais | allemand, espagnol | latin | langue non précisée |  |  | musique |  | ULIS, UPE2A (élèves allophones), Dispositif relais |
| Collège Liberté (0940071S) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  | ULIS, UPE2A (élèves allophones) |
| Collège les Closeaux (0940072T) | anglais | allemand, espagnol | latin |  |  |  |  |  |  |
| Collège Paul Valéry (0940090M) | anglais | allemand, espagnol | latin |  | allemand, anglais |  | arts plastiques, danse, musique | gymnastique aérobic, gymnastique aerobique, tennis |  |
| Collège Francine Fromond (0940094S) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  |  |
| Collège Plaisance (0940100Y) | anglais | allemand, espagnol | latin |  |  |  |  |  | ULIS, UPE2A (élèves allophones) |
| Collège Antoine de Saint-Exupéry (0940101Z) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  |  |
| Collège Fréderic et Irène Joliot-Curie (0940516A) | anglais | espagnol | latin | allemand, anglais | allemand, anglais |  | musique |  | ULIS |
| Collège Louis Pasteur (0940521F) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  | badminton | ULIS, UPE2A (élèves allophones) |
| Collège Eugène Chevreul (0940551N) | anglais | espagnol | latin, grec |  | allemand, anglais |  |  |  | SEGPA, Dispositif relais, 3e prépa-métiers |
| Collège le Parc (0940552P) | anglais | allemand, espagnol, italien | latin, grec |  |  |  | danse, musique |  |  |
| Collège Pierre de Ronsard (0940569H) | anglais | espagnol, italien | latin, grec |  | allemand, anglais |  | théâtre | badminton, escalade, sport-études badminton, sport-études gymnastique, sport-études pentathlon |  |
| Collège Paul Klee (0940575P) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  | ULIS, SEGPA, UPE2A (élèves allophones) |
| Collège Jean Moulin (0940581W) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  |  |
| Collège Jean Charcot (0940582X) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  |  |
| Collège Pierre de Ronsard (0940583Y) | anglais | allemand, espagnol | latin, grec |  | allemand, anglais |  |  |  | ULIS, SEGPA |
| Collège Amédée Dunois (0940612E) | anglais | allemand, espagnol | latin |  |  |  |  |  | ULIS |
| Collège du Fort (0940617K) | anglais | espagnol, italien | latin |  | allemand, anglais |  |  | athletisme | ULIS, SEGPA |
| Collège Pierre et Marie Curie (0940625U) | anglais | allemand, espagnol, portugais | latin |  | anglais, portugais |  |  |  | ULIS, UPE2A (élèves allophones) |
| Collège du Parc (0940748C) | allemand, anglais | espagnol | latin, grec |  |  |  |  | rugby | ULIS |
| Collège Roland Garros (0940749D) | anglais | allemand, espagnol | latin |  |  |  |  |  | ULIS, Dispositif relais |
| Collège Lucie Aubrac (0940786U) | anglais | espagnol | latin |  | allemand, anglais |  |  |  | ULIS, UPE2A (élèves allophones) |
| Collège Nicolas Boileau (0940787V) | anglais | espagnol | latin | allemand, anglais | allemand, anglais |  |  |  | ULIS, 3e prépa-métiers |
| Collège Pierre Brossolette (0940788W) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  | aviron, gymnastique rythmique, gymnastique rythmique et sportive | ULIS |
| Collège de Lattre de Tassigny (0940789X) | anglais | espagnol | latin, grec | allemand | allemand, anglais |  |  | escalade | UPE2A (élèves allophones) |
| Collège Jacques Offenbach (0940790Y) | allemand, anglais | anglais, espagnol | latin |  | allemand, anglais |  |  |  | ULIS |
| Collège Pierre Brossolette (0940791Z) | anglais | espagnol | latin |  |  |  |  |  | SEGPA, UPE2A (élèves allophones) |
| Collège Jules Ferry (0940792A) | anglais | allemand, anglais, espagnol | latin, grec |  | allemand, anglais |  |  | boxe francaise | ULIS, UPE2A (élèves allophones) |
| Collège Antoine de Saint-Exupéry (0940793B) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  |  |  |
| Collège Gustave Monod (0940794C) | allemand, anglais | allemand, espagnol | latin, grec |  | allemand, anglais |  |  |  | UPE2A (élèves allophones) |
| Collège Saint-Joseph (0940806R) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  |  |
| Collège Sainte-Thérèse (0940807S) | allemand, anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  |  |
| Collège Notre-Dame des Missions (0940808T) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  |  |
| Collège Jeanne d'Arc (0940809U) | anglais | allemand, espagnol | latin |  |  |  |  | tennis de table | ULIS |
| Collège Saint-André (0940810V) | anglais | allemand, espagnol | latin |  |  |  |  |  | 3e prépa-métiers |
| Collège Saint-André (0940811W) | anglais | allemand, espagnol | latin |  |  |  |  |  |  |
| Collège privé Epin (0940874P) | allemand, anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  |  |
| Cours Nogentais Mixte (0940875R) |  |  |  |  |  |  |  |  |  |
| Collège Jeanne d'Arc (0940879V) | anglais | allemand, espagnol | latin | anglais | allemand, anglais, espagnol |  |  |  |  |
| Collège de Maille (0940884A) | allemand, anglais | allemand, anglais, espagnol | latin |  |  |  |  |  |  |
| Collège privé Saint-Thomas de Villeneuve (0940887D) | allemand, anglais | allemand, anglais, espagnol | latin |  |  |  |  |  |  |
| Collège privé Bernard Palissy (0940892J) | anglais | allemand, espagnol |  |  | allemand, anglais |  |  |  |  |
| Collège Henri Cahn (0941014S) | anglais | espagnol, portugais | latin |  | allemand, anglais, espagnol | portugaise |  | futsal |  |
| Collège Willy Ronis (0941015T) | anglais | allemand, espagnol | latin, grec |  |  |  | mathématiques et sciences | handball, volley ball | ULIS, SEGPA, Dispositif relais |
| Collège Antoine de Saint-Exupéry (0941017V) | anglais | espagnol | latin | allemand | allemand, anglais |  |  |  | ULIS |
| Collège Henri Barbusse (0941020Y) | allemand, anglais | allemand, anglais, espagnol | latin |  |  |  |  |  | ULIS |
| Collège Paul Langevin (0941021Z) | anglais | espagnol | latin |  |  |  | musique | basket-ball | ULIS, UPE2A (élèves allophones) |
| Collège Léon Blum (0941022A) | anglais | espagnol | latin, grec |  | allemand, anglais |  |  |  | SEGPA, UPE2A (élèves allophones), Dispositif relais |
| Collège Condorcet (0941023B) | anglais | espagnol, italien | latin, grec |  | allemand, anglais |  |  |  |  |
| Collège Jules Ferry (0941024C) | anglais | espagnol | latin |  | allemand, anglais |  | musique |  |  |
| Collège Assia Djebar (0941025D) | anglais | allemand, anglais, espagnol |  |  | allemand, anglais |  | musique |  | SEGPA |
| Collège Molière (0941026E) | anglais | espagnol | latin |  | allemand, anglais |  |  |  | UPE2A (élèves allophones), Dispositif relais |
| Collège Jules Vallès (0941029H) | allemand, anglais | espagnol | latin |  | allemand, anglais |  |  | rugby | ULIS, UPE2A (élèves allophones) |
| Collège Danielle Casanova (0941032L) | allemand, anglais | allemand, espagnol | latin, grec |  |  |  |  |  | UPE2A (élèves allophones) |
| Collège Jean Perrin (0941033M) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  | SEGPA |
| Collège Joseph Lakanal (0941034N) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  | UPE2A (élèves allophones) |
| Collège Jean Lurçat (0941035P) | allemand, anglais | anglais, espagnol | latin, grec |  | allemand, anglais |  |  |  | ULIS, SEGPA, UPE2A (élèves allophones) |
| Collège Karl Marx (0941036R) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  | ULIS |
| Collège Louis Pasteur (0941037S) | anglais | anglais, espagnol | latin, grec |  | allemand, anglais, arabe |  |  |  |  |
| Collège du Centre - Aimé Césaire (0941038T) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  |  |  |
| Collège Guy Môquet (0941039U) | allemand, anglais | anglais, espagnol | latin |  | allemand, anglais |  |  |  | ULIS, UPE2A (élèves allophones) |
| Collège Émile Zola (0941040V) | anglais | anglais, espagnol, italien | latin |  | anglais, italien |  | danse, musique |  | Dispositif relais |
| Collège Dorval (0941042X) | anglais | allemand, espagnol | latin, grec | anglais, espagnol | anglais, espagnol |  |  | football | ULIS, UPE2A (élèves allophones) |
| Collège Robert Desnos (0941044Z) | anglais | espagnol, italien | latin |  |  |  |  |  | UPE2A (élèves allophones) |
| Collège Édouard Herriot (0941046B) | allemand, anglais | anglais, espagnol | latin | anglais |  |  |  |  |  |
| Collège Fernande Flagon (0941052H) | anglais | allemand, espagnol | latin, grec |  | allemand, anglais |  |  |  | ULIS |
| Collège Victor Duruy (0941090Z) | allemand, anglais | anglais, espagnol, italien | latin |  | allemand, anglais |  |  | tennis de table |  |
| Collège Antoine Watteau (0941091A) | anglais | allemand, espagnol | latin |  | allemand, anglais | britannique |  |  | ULIS |
| Collège Elsa Triolet (0941092B) | anglais | allemand, espagnol | latin, grec |  |  |  |  |  | ULIS, UPE2A (élèves allophones) |
| Collège Camille Pissarro (0941093C) | allemand, anglais | allemand, espagnol, italien | latin, grec |  | allemand, anglais |  |  | handball, rugby |  |
| Collège Paul Éluard (0941095E) | allemand, anglais | allemand, anglais, espagnol | latin |  |  |  |  |  | ULIS, SEGPA, Dispositif relais |
| Collège Rosa Parks (0941099J) | anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  |  |  |
| Collège Paul Bert (0941100K) | allemand, anglais | anglais, espagnol | latin |  |  |  |  |  |  |
| Collège Victor Hugo (0941101L) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  | ULIS |
| Collège Clément Guyard (0941102M) | anglais | allemand, espagnol | latin |  |  |  | danse, musique, théâtre |  | ULIS |
| Collège Jean Macé (0941103N) | anglais | espagnol, italien | latin |  |  |  |  |  | Dispositif relais |
| Collège François Rabelais (0941220R) | anglais | espagnol, italien | latin | langue non précisée | allemand, anglais |  |  |  | ULIS, SEGPA, UPE2A (élèves allophones) |
| Collège Albert Camus (0941221S) | anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  |  |  |
| Collège François Rabelais (0941224V) | allemand, anglais | espagnol | latin | langue non précisée | allemand, anglais |  |  |  | SEGPA, UPE2A (élèves allophones) |
| Collège Jules Vallès (0941229A) | anglais | allemand, espagnol | latin |  |  |  |  | planche de sillage (wakeboard), surf | SEGPA, UPE2A (élèves allophones) |
| Collège Henri Matisse (0941231C) | anglais | allemand, espagnol | latin, grec |  |  |  |  |  | ULIS |
| Collège Albert Camus (0941233E) | anglais | allemand, espagnol | latin, grec |  | allemand, anglais |  |  |  | ULIS |
| Collège Jules Ferry (0941234F) | anglais | espagnol | latin, grec |  |  |  |  |  |  |
| Collège Jean Macé (0941296Y) | anglais | anglais, espagnol | latin |  | allemand, anglais | britannique | théâtre |  | SEGPA, UPE2A (élèves allophones), Dispositif relais |
| Collège Paul Vaillant-Couturier (0941299B) | anglais | allemand, espagnol | latin |  | anglais, italien |  |  |  | SEGPA, UPE2A (élèves allophones), Dispositif relais |
| Collège Molière (0941348E) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  |  | ULIS, SEGPA, UPE2A (élèves allophones) |
| Collège Louis Issaurat (0941351H) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  | ULIS |
| Collège la Cerisaie (0941353K) | anglais | espagnol, italien | latin |  | allemand, anglais |  |  | basket-ball | ULIS |
| Collège Jean Moulin (0941410X) | anglais | allemand, espagnol | latin, grec |  | allemand, anglais |  |  | volley ball |  |
| Collège les Prunais (0941411Y) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  | SEGPA |
| Collège la Guinette (0941412Z) | anglais | allemand, espagnol | latin |  |  |  |  |  | ULIS |
| Collège Rol-Tanguy (0941431V) | allemand, anglais | allemand, espagnol |  |  | allemand, anglais |  |  |  |  |
| Collège Blaise Cendrars (0941478W) | allemand, anglais | allemand, espagnol |  |  | allemand, anglais |  |  |  | UPE2A (élèves allophones) |
| Collège Nicolas de Staël (0941596Z) | anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  | arts plastiques | escalade | ULIS, SEGPA |
| Collège Edmond Nocard (0941597A) | anglais | espagnol, italien | latin |  |  |  |  | badminton |  |
| Collège Hector Berlioz (0941598B) | anglais | allemand, anglais, espagnol | latin |  |  |  |  |  |  |
| Collège Édouard Branly (0941599C) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais | britannique |  |  |  |
| Collège Louis Blanc (0941600D) | anglais | allemand, espagnol | latin, grec | anglais | allemand, anglais |  |  |  |  |
| Collège Romain Rolland (0941601E) | anglais | allemand, espagnol, italien | latin, grec |  | allemand, anglais |  |  |  | ULIS |
| Collège Christiane Desroches Noblecourt (0941602F) | anglais | allemand, espagnol, italien | latin |  |  |  |  | double corde (double dutch), gymnastique rythmique et sportive | ULIS |
| Collège Janusz Korczak (0941603G) | anglais | espagnol, italien | latin |  |  |  |  |  | ULIS, SEGPA |
| Collège Ozar Hatorah Filles (0941614U) | anglais | espagnol, hébreu moderne |  |  | anglais, hébreu moderne |  |  |  |  |
| Collège Albert Cron (0941679P) | anglais | allemand, espagnol | latin |  | allemand, anglais |  | musique |  |  |
| Collège privé du Sacré-Coeur (0941709X) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  |  |
| Collège Saint-André (0941710Y) | allemand, anglais | allemand, anglais, espagnol | latin |  |  |  |  |  |  |
| Collège Sainte-Thérèse (0941712A) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  |  |  |
| Collège Montalembert (0941713B) | allemand, anglais | allemand, anglais, espagnol, russe | latin, grec |  | allemand, anglais |  |  |  | ULIS |
| Collège Albert de Mun (0941714C) | allemand, anglais | allemand, anglais, espagnol, italien | grec |  | allemand, anglais |  |  |  |  |
| Collège Saint-Michel (0941715D) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  |  | ULIS |
| Collège Petit Val (0941716E) | allemand, anglais | allemand, espagnol, italien | latin, grec |  | allemand, anglais |  |  |  |  |
| Collège Notre-Dame de la Providence (0941718G) | allemand, anglais, espagnol | allemand, anglais, espagnol | latin, grec |  | allemand, anglais, espagnol |  |  |  |  |
| Collège Henri Wallon (0941781A) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  | handball | ULIS, UPE2A (élèves allophones) |
| Collège Georges Brassens (0941782B) | anglais | espagnol | latin | anglais |  |  |  | judo | ULIS |
| Collège Daniel Fery (0941783C) | anglais | espagnol | latin, grec |  | allemand, anglais |  |  |  | ULIS, UPE2A (élèves allophones) |
| Collège Poullart des Places (0941891V) | allemand, anglais, espagnol | anglais, espagnol |  |  |  |  |  |  | ULIS, 3e prépa-métiers |
| Collège Ozar Hatorah Garçons (0941942A) | anglais | espagnol, hébreu moderne |  |  | anglais, hébreu moderne |  |  |  |  |
| Collège Dulcie September (0941971G) | anglais | allemand, espagnol | latin, grec |  |  |  |  | handball | ULIS, SEGPA, Dispositif relais |
| Collège Cours du Hameau (0942119T) | anglais | allemand, espagnol, italien |  |  |  |  |  |  | 3e prépa-métiers |
| Collège Simone de Beauvoir (0942127B) | anglais | espagnol | latin |  |  |  |  |  | ULIS, Dispositif relais |
| Collège privé ISE Emeth Leyaacov - Filles (0942143U) |  |  |  |  |  |  |  |  |  |
| Collège privé ISE Emeth Leyaacov - Garçons (0942185P) |  |  |  |  |  |  |  |  |  |
| Collège Simone Veil (0942187S) | anglais | allemand, espagnol | latin | anglais |  |  |  |  |  |
| Collège Françoise Giroud (0942188T) | anglais | allemand, espagnol | latin |  |  |  |  |  | ULIS |
| Collège privé Padre-Pio (0942192X) |  |  |  |  |  |  |  |  |  |
| Collège du groupe scolaire privé Education et Savoir (0942223F) |  |  |  |  |  |  |  |  |  |
| Collège privé l'Ecole Heureuse - LEH (0942336D) |  |  |  |  |  |  |  |  |  |
| Collège privé Sports études de Paris (SEDP) (0942366L) |  |  |  |  |  |  |  |  |  |
| Collège privé Saint-Mesrop Arabian (0942392P) | anglais | allemand, espagnol |  |  |  |  |  |  |  |
| Collège privé Ecole Enfance et Vie - Ohr Menahem (0942428D) |  |  |  |  |  |  |  |  |  |
| Collège privé Pilote Arborescences (0942433J) |  |  |  |  |  |  |  |  |  |
| Collège Josette et Maurice Audin (0942434K) | anglais | allemand, espagnol | latin |  |  |  |  | escalade, planche de sillage (wakeboard), surf | ULIS |
| Collège Samuel Paty (0942482M) | anglais | allemand, espagnol | latin |  |  |  |  |  |  |
| Collège Nelson Mandela (0942499F) |  |  |  |  |  |  |  |  |  |
| Collège Gisèle Halimi (0942532S) | anglais | allemand |  |  | allemand, anglais |  |  | escalade | ULIS |
| Collège privé Dix sur Dix (0942626U) |  |  |  |  |  |  |  |  |  |
| Collège Nél (0942674W) |  |  |  |  |  |  |  |  |  |
| Collège Aristide Briand (0950014Z) | anglais | allemand, espagnol, portugais | latin, grec |  | anglais, portugais |  |  |  | ULIS |
| Collège Jules Ferry (0950019E) | anglais | allemand, espagnol | latin, grec |  |  |  |  |  | ULIS |
| Collège Bel Air (0950022H) | anglais | allemand, espagnol, italien | latin |  |  |  |  | vtt | ULIS, UPE2A (élèves allophones) |
| Collège Henri Wallon (0950023J) | anglais | allemand, arabe, espagnol | latin |  |  |  |  |  | ULIS, SEGPA, UPE2A (élèves allophones) |
| Collège Philippe Auguste (0950025L) | anglais | allemand, espagnol |  |  | allemand, anglais |  |  | basket-ball | ULIS, UPE2A (élèves allophones) |
| Collège Maximilien de Robespierre (0950026M) | anglais | allemand, arabe, espagnol | latin |  | allemand, anglais |  |  | football | ULIS, SEGPA, UPE2A (élèves allophones), 3e prépa-métiers |
| Collège Jean Zay (0950037Z) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  | basket-ball | ULIS, UPE2A (élèves allophones) |
| Collège Le Parc (0950039B) | anglais | allemand, espagnol | latin |  |  |  |  | basket-ball | ULIS |
| Collège Évariste Galois (0950045H) | anglais | arabe, espagnol | latin, grec |  |  |  |  |  | ULIS, SEGPA |
| Collège Descartes (0950046J) | anglais | allemand | latin |  | allemand, anglais |  |  |  | UPE2A (élèves allophones) |
| Collège Denis Diderot (0950682A) | anglais | espagnol | latin |  | allemand |  | musique |  | ULIS |
| Collège Paul Éluard (0950711G) | anglais | allemand, arabe, espagnol | latin |  | allemand, anglais |  |  |  | ULIS, UPE2A (élèves allophones), Dispositif relais |
| Collège Jean Moulin (0950722U) | anglais | allemand, espagnol | latin |  |  |  |  | sport-études basket-ball | ULIS |
| Collège Jean Lurçat (0950723V) | anglais | allemand, anglais, espagnol, italien | latin |  | allemand, anglais, italien |  |  | rugby | ULIS, UPE2A (élèves allophones) |
| Collège Antoine de Saint-Exupéry (0950739M) | anglais | allemand, espagnol | latin |  |  |  |  | volley ball | SEGPA |
| Collège Wanda Landowska (0950748X) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  |  |
| Collège Saint-Exupéry (0950749Y) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  | athletisme, football | ULIS, UPE2A (élèves allophones) |
| Collège Jeanne d'Arc (0950751A) | anglais | allemand, espagnol |  |  |  |  |  |  | ULIS |
| Collège Sainte-Thérèse (0950752B) | anglais | allemand, espagnol | latin |  |  |  |  |  |  |
| Collège Notre-Dame (0950758H) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  |  |
| Collège Saint-Stanislas (0950760K) | anglais | allemand, espagnol | latin |  |  |  |  |  |  |
| Collège Le Rosaire (0950763N) | allemand, anglais | allemand, anglais, espagnol | latin |  |  |  |  |  |  |
| Collège Sainte-Geneviève (0950788R) | anglais | allemand, espagnol | latin |  |  |  |  |  | ULIS |
| Collège Saint-Joseph (0950789S) | anglais | allemand, espagnol | latin |  |  |  |  |  |  |
| Collège Saint-Charles (0950790T) | anglais | allemand, espagnol | latin |  |  |  |  |  |  |
| Collège Sainte-Jeanne d'Arc (0950793W) | anglais | allemand, espagnol | latin |  |  |  |  |  |  |
| Collège Saint-Didier (0950796Z) | anglais | allemand, espagnol | latin |  |  |  |  |  | ULIS |
| Collège Marie-Thérèse (0950823D) | anglais | allemand, espagnol | latin |  |  |  |  |  |  |
| Collège Carnot (0950884V) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  | ULIS |
| Collège Irène Joliot-Curie (0950885W) | anglais | allemand, espagnol, italien | latin |  | allemand, anglais |  |  |  | ULIS, UPE2A (élèves allophones), Dispositif relais |
| Collège Claude Monet (0950886X) | anglais | allemand, espagnol | latin |  |  |  |  | football | ULIS, SEGPA, UPE2A (élèves allophones), Dispositif relais |
| Collège Gabriel Péri (0950887Y) | anglais | allemand, arabe, espagnol, portugais | latin, grec |  | allemand, anglais, portugais |  |  | basket-ball | ULIS |
| Collège Henri Wallon (0950888Z) | anglais | allemand, anglais, espagnol | latin |  | allemand, anglais, portugais |  |  |  | ULIS, SEGPA, UPE2A (élèves allophones) |
| Collège Pierre de Ronsard (0950891C) | anglais | allemand, espagnol, italien | latin |  | allemand, anglais |  |  |  | ULIS, SEGPA |
| Collège Jules Ferry (0950892D) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  | sport-études handball |  |
| Collège André Chénier (0950893E) | anglais | allemand, espagnol, italien | latin, grec |  |  |  |  |  | ULIS, UPE2A (élèves allophones) |
| Collège Jean-Claude Chabanne (0950894F) | anglais | allemand, espagnol, russe | latin, grec |  |  | arabe, britannique |  |  | ULIS |
| Collège Simone Veil (0950895G) | anglais | allemand, espagnol | latin |  | allemand, anglais, arabe |  |  | football, football en salle (futsal) | ULIS, UPE2A (élèves allophones) |
| Collège Nicolas Flamel (0950896H) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  | football | ULIS, SEGPA |
| Collège Pierre et Marie Curie (0950898K) | anglais | allemand, anglais, espagnol |  |  | allemand, anglais |  |  |  | ULIS, SEGPA |
| Collège Anatole France (0950900M) | anglais | arabe, espagnol | latin |  |  |  |  | football | ULIS |
| Collège François Mauriac (0950908W) | anglais | allemand, espagnol | latin |  |  |  |  | football | ULIS |
| Collège Stendhal (0950926R) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  | ULIS, SEGPA, Dispositif relais |
| Collège Georges Pompidou (0950930V) | anglais | allemand, anglais, espagnol, italien | latin |  | allemand, anglais |  |  | voile | ULIS |
| Collège L'Ardillière de Nézant (0950931W) | anglais | espagnol | latin |  |  |  |  | football en salle (futsal), futsal | ULIS |
| Collège Jean Vilar (0950932X) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  | ULIS, SEGPA |
| Collège Jacques Monod (0950933Y) | anglais | allemand, espagnol, italien |  |  |  |  |  |  | ULIS |
| Collège Georges Brassens (0950934Z) | anglais | allemand, espagnol | latin |  |  |  |  | athletisme | ULIS, SEGPA, UPE2A (élèves allophones) |
| Collège des Hautiers (0950936B) | anglais | espagnol | latin, grec |  | allemand, anglais |  |  |  | SEGPA |
| Collège Les Touleuses (0950937C) | anglais | allemand, anglais, espagnol, italien | latin, grec |  | allemand, anglais |  | musique | basket-ball, canoe et canoe kayak, canoë-kayak | ULIS, SEGPA |
| Collège Léon Blum (0950939E) | anglais | allemand, espagnol |  |  |  |  |  |  | ULIS, SEGPA, UPE2A (élèves allophones) |
| Collège Jean Bullant (0950941G) | anglais | allemand, espagnol, italien | latin |  |  |  |  | badminton | ULIS, SEGPA |
| Collège Chantereine (0950943J) | anglais | allemand, espagnol |  |  | allemand, anglais |  |  | rugby | ULIS, SEGPA, UPE2A (élèves allophones) |
| Collège Le Carré Sainte-Honorine (0950945L) | anglais | allemand | latin |  |  |  |  | sport-études multi-activités | ULIS, SEGPA |
| Collège Pierre Curie (0951050A) | anglais | allemand, arabe, espagnol | latin |  | anglais, arabe |  |  | athletisme | ULIS, UPE2A (élèves allophones) |
| Collège Marcel Pagnol (0951051B) | anglais | espagnol | latin |  |  |  |  | ultimate, ultime-passe (ultimate) | 3e prépa-métiers |
| Collège Blaise Pascal (0951052C) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  |  |
| Collège Paul Vaillant-Couturier (0951094Y) | anglais | allemand, arabe, espagnol | latin |  | allemand, arabe |  |  |  | ULIS, UPE2A (élèves allophones), Dispositif relais |
| Collège Pablo Picasso (0951098C) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  | football | ULIS, SEGPA, UPE2A (élèves allophones) |
| Collège Jacques Daguerre (0951099D) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  | ULIS |
| Collège Épine Guyon (0951100E) | anglais | allemand, espagnol | latin |  |  |  |  | gymnastique, gymnastique artistique | ULIS, SEGPA |
| Collège Claude Monet (0951102G) | anglais | allemand, espagnol, italien, portugais | latin |  |  |  |  |  | ULIS |
| Collège Jean-Jacques Rousseau (0951138W) | anglais | allemand, espagnol, portugais | latin |  | allemand, anglais |  |  | football | ULIS, UPE2A (élèves allophones) |
| Collège Albert Camus (0951139X) | anglais | espagnol, portugais | latin |  | anglais, portugais |  | musique |  | ULIS |
| Collège Nicolas Copernic (0951141Z) | anglais | allemand, espagnol, italien | latin |  |  |  |  |  | ULIS, Classe pour enfants de familles itinérantes |
| Collège Robert Doisneau (0951142A) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  | ULIS, SEGPA, UPE2A (élèves allophones) |
| Collège Jean Moulin (0951143B) | anglais | allemand, espagnol | latin |  |  |  |  |  | ULIS |
| Collège Camille Claudel (0951154N) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  | ULIS, UPE2A (élèves allophones), 3e prépa-métiers |
| Collège Langevin-Wallon (0951190C) | anglais | espagnol, italien | latin |  |  |  |  | escrime | ULIS, SEGPA, 3e prépa-métiers |
| Collège Pablo Picasso (0951194G) | anglais | allemand, espagnol | latin |  |  |  |  |  | ULIS |
| Collège Marcel Pagnol (0951195H) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  | handball, volley-ball | ULIS, SEGPA, UPE2A (élèves allophones) |
| Collège Voltaire (0951196J) | anglais | anglais, espagnol | latin, grec |  | allemand, anglais |  |  |  | ULIS, UPE2A (élèves allophones), Dispositif relais |
| Collège Georges Brassens (0951197K) | anglais | allemand, espagnol | latin |  |  |  | musique |  | ULIS, UPE2A (élèves allophones) |
| Collège Saint-Pie X (Fondation d'Auteuil) (0951220K) | anglais | espagnol |  |  |  |  |  |  | UPE2A (élèves allophones), Dispositif relais |
| Collège Eugénie Cotton (0951230W) | anglais | allemand, anglais, arabe, espagnol | latin |  | allemand, anglais, arabe |  |  | escalade | ULIS, SEGPA, UPE2A (élèves allophones) |
| Collège Marie Sklodowska-Curie (0951232Y) | anglais | allemand, espagnol | latin |  |  |  |  |  | ULIS |
| Collège Frania Eisenbach-Haverland (0951233Z) | anglais | allemand, espagnol | latin |  |  |  |  | handball |  |
| Collège Les Coutures (0951279Z) | anglais | allemand, espagnol | latin |  |  |  |  |  |  |
| Collège Albert Schweitzer (0951352D) | anglais | allemand, espagnol, italien | latin |  | allemand, anglais |  |  |  | ULIS, SEGPA |
| Collège André Malraux (0951354F) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  | ULIS |
| Collège Lucie Aubrac (0951356H) | anglais | allemand, espagnol | latin |  |  |  |  | football | ULIS, UPE2A (élèves allophones) |
| Collège Anna de Noailles (0951357J) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  | ultimate, ultime-passe (ultimate) | ULIS |
| Collège Maubuisson (0951400F) | anglais | allemand, espagnol, italien | latin |  |  |  |  |  | ULIS |
| Collège La Justice (0951401G) | anglais | espagnol | latin, grec |  | allemand, anglais |  |  | athletisme, sport-études multi-activités | ULIS, SEGPA, UPE2A (élèves allophones) |
| Collège La Bruyère (0951403J) | anglais | allemand, espagnol | latin |  |  |  |  | football | ULIS |
| Collège Notre Dame de la Providence (0951504U) | allemand, anglais | allemand, espagnol | latin |  |  |  |  |  |  |
| Collège Notre-Dame de Bury - Annexe du collège Le Rosaire de Saint-Leu-la-Forêt (0951505V) | allemand, anglais | allemand, anglais, espagnol | latin |  |  |  |  |  |  |
| Collège Notre-Dame de la Compassion (0951506W) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  |  | ULIS |
| Collège Saint-Martin de France (0951507X) | allemand, anglais | allemand, anglais, chinois, espagnol, italien | latin |  |  |  |  |  |  |
| Collège Notre-Dame (0951508Y) | anglais | allemand, chinois, espagnol, italien | latin |  |  |  |  |  |  |
| Collège La Salle - Saint-Rosaire (0951509Z) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  |  | ULIS, 3e prépa-métiers, Classe pour enfants de familles itinérantes |
| Collège Henri Guillaumet (0951527U) | anglais | allemand, espagnol | latin |  |  |  |  | voile | ULIS, SEGPA |
| Collège Gérard Philipe (0951617S) | anglais | allemand, chinois, espagnol | latin, grec |  | allemand, anglais |  |  |  | ULIS, UPE2A (élèves allophones) |
| Collège des Toupets (0951636M) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  | basket-ball, escrime, natation |  |
| Collège Léonard de Vinci (0951672B) | anglais | allemand, espagnol | latin |  |  |  |  | basket-ball | ULIS |
| Collège Torat Emet (0951682M) | anglais | espagnol, hébreu moderne |  | anglais |  |  |  |  |  |
| Collège Georges Duhamel (0951696C) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  | gymnastique rythmique et sportive | ULIS, Classe pour enfants de familles itinérantes |
| Collège Le Moulin à Vent (0951697D) | anglais | allemand, espagnol |  |  | allemand, anglais |  |  | football, handball | ULIS, SEGPA, UPE2A (élèves allophones), 3e prépa-métiers |
| Collège La Bussie (0951705M) | anglais | allemand, espagnol | latin |  |  |  |  | triathlon | ULIS |
| Ecole secondaire privée IInstitut de Gestion Sociale des Armées (0951707P) |  |  |  |  |  |  |  |  |  |
| Collège Sainte-Apolline (0951724H) | anglais | allemand, anglais, chinois | latin, grec |  | allemand, anglais, espagnol |  |  |  |  |
| Collège Jacques-Yves Cousteau (0951725J) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  | ULIS, UPE2A (élèves allophones) |
| Collège Le Petit Bois (0951726K) | anglais | allemand, espagnol | latin |  |  |  |  |  | ULIS |
| Collège Voltaire (0951754R) | allemand, anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  |  | ULIS |
| Collège Charles Le Brun (0951799P) | anglais | allemand, espagnol | latin, grec |  | allemand, anglais |  |  |  | ULIS |
| Collège Louis Aragon (0951800R) | anglais | allemand, espagnol, italien | latin |  |  |  |  |  | ULIS |
| Collège des Merisiers (0951801S) | anglais | allemand, espagnol | latin |  | allemand, anglais |  | musique |  | ULIS, Dispositif relais |
| Collège Le Luat (0951817J) | anglais | allemand, espagnol |  |  |  |  |  |  |  |
| Collège Léonard de Vinci (0951822P) | anglais | allemand, espagnol, portugais | latin |  | allemand, anglais |  |  |  |  |
| Collège Charles François Daubigny (0951823R) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  | vélo tout-terrain, vtt, vtt | ULIS |
| Collège Maurice Utrillo (0951909J) | anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  | boxe francaise | ULIS, UPE2A (élèves allophones) |
| Collège ORT (0951916S) | anglais | espagnol, hébreu moderne |  |  |  |  |  |  |  |
| Collège Françoise Dolto (0951919V) | anglais | allemand, espagnol | latin, grec |  | allemand, anglais |  |  |  |  |
| Collège François Truffaut (0951920W) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  | athletisme | ULIS, UPE2A (élèves allophones), Dispositif relais, 3e prépa-métiers |
| Collège Montaigne (0951921X) | anglais | allemand, espagnol | latin |  |  |  |  | danse | ULIS |
| Collège Ozar Hatorah (0951939S) | anglais | hébreu moderne |  | anglais |  |  |  |  |  |
| Collège Vauban (0951943W) | anglais | espagnol |  |  |  |  |  |  |  |
| Collège Victor Hugo (0951945Y) | anglais | allemand, espagnol, italien | latin |  | allemand, anglais |  |  | raid multisport, raid multisports | ULIS |
| Collège Les Explorateurs (0951964U) | anglais | espagnol |  |  |  |  |  |  | ULIS, UPE2A (élèves allophones) |
| Collège Cécile Sorel (0951991Y) | anglais | espagnol | latin |  | allemand, anglais |  |  |  | ULIS |
| Collège Louis Augustin Bosc (0951992Z) | anglais | allemand, espagnol | latin, grec |  |  |  |  |  |  |
| Collège Martin Luther King (0951993A) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  | ULIS, UPE2A (élèves allophones), Dispositif relais |
| Collège Henri Matisse (0952036X) | anglais | espagnol |  |  | anglais, italien |  | musique |  | ULIS, UPE2A (élèves allophones) |
| Collège Louis Hayet (0952045G) | anglais | allemand, anglais, espagnol |  |  |  |  |  |  | ULIS |
| Collège Rosa Bonheur (0952079U) | anglais | allemand, espagnol | latin |  |  |  |  |  |  |
| Collège Roland Vasseur (0952080V) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  |  |
| Collège Montesquieu (0952086B) | anglais | allemand, espagnol | latin |  | allemand, anglais |  |  |  | Dispositif relais |
| Collège Pierre Perret (0952087C) | anglais | espagnol, italien |  |  |  |  |  |  |  |
| Collège Jean-François Clervoy (0952088D) | allemand, anglais | allemand, espagnol, italien | latin, grec |  | allemand, anglais |  |  |  | ULIS |
| Collège Ariane (0952114G) | anglais | allemand, espagnol | latin |  |  |  |  | judo | ULIS, UPE2A (élèves allophones) |
| Ecole secondaire privée Léonard de Vinci (0952125U) |  |  |  |  |  |  |  |  |  |
| Collège Aimé Césaire (0952127W) | anglais | allemand, espagnol | latin |  |  |  |  |  | ULIS |
| Collège Georges Charpak (0952128X) | anglais | allemand, espagnol | latin |  |  |  |  |  | ULIS, Classe pour enfants de familles itinérantes |
| Ecole secondaire privée Beth Yaacov (0952133C) |  |  |  |  |  |  |  |  |  |
| Collège Saint-Jean (0952136F) | anglais | espagnol |  |  |  |  |  | football | ULIS, UPE2A (élèves allophones), Dispositif relais, 3e prépa-métiers |
| Collège Émilie du Châtelet (0952140K) | anglais | allemand, anglais, espagnol | latin |  | allemand, anglais |  |  |  | ULIS |
| Institut Paul Ricoeur (0952145R) | anglais | allemand, chinois, espagnol | latin |  | anglais, chinois, espagnol |  |  |  |  |
| Ecole secondaire privée Pierre Gilles de Gennes (0952167P) |  |  |  |  |  |  |  |  |  |
| Ecole secondaire privée Hanned (0952171U) |  |  |  |  |  |  |  |  |  |
| Collège Isabelle Autissier (0952205F) | anglais | espagnol | latin |  |  |  |  | triathlon | ULIS |
| Ecole secondaire privée les Petis Pas (0952213P) |  |  |  |  |  |  |  |  |  |
| Ecole secondaire privée Académie Fihri (0952218V) |  |  |  |  |  |  |  |  |  |
| Ecole secondaire privée Torah Or (0952222Z) |  |  |  |  |  |  |  |  |  |
| Ecole secondaire privée New School (0952223A) |  |  |  |  |  |  |  |  |  |
| Collège Louise Weiss (0952236P) |  |  |  |  |  |  |  | handball | ULIS |
| Ecole secondaire privée du Petit Prince (0952240U) |  |  |  |  |  |  |  |  |  |
| Collège privé  Cours Charlemagne (0952267Y) |  |  |  |  |  |  |  |  |  |
| Collège Caroline Aigle (0952282P) |  |  |  |  |  |  |  | sport-études hockey sur glace | ULIS |
| Ecole secondaire privée International Trilingue de Cergy - CITC (0952303M) |  |  |  |  |  |  |  |  |  |
| Collège Suzanne Lenglen (0952325L) | anglais | espagnol |  |  |  |  |  | badminton | ULIS |
| Collège Marie-José Perec (0952326M) | anglais | espagnol | latin |  | allemand, anglais |  |  |  | ULIS |
| Nouveau collège de Saint-Ouen-L'Aumône (0952381X) |  |  |  |  |  |  |  |  |  |

## 9. Continuité jusqu'au bac

Liens : aucun 1031, cite_scolaire 46, meme_etablissement_prive 214, groupe_scolaire_autre_site 1. Passage : non_garanti 1238, garanti 3, sous_reserve 2, inconnu 49. 2nde GT sur place : 204.

| Collège | Lien | Lycée | 2nde GT | Passage | Détection |
|---|---|---|---|---|---|
| Collège Victor Hugo (0752524L) | cite_scolaire | Lycée Victor Hugo (0750648X) | oui | non_garanti | cite_scolaire [R1_cite_scolaire:07501, R3_adresse] |
| Collège Charlemagne (0752525M) | cite_scolaire | Lycée Charlemagne (0750652B) | oui | non_garanti | cite_scolaire [R1_cite_scolaire:07503] |
| Collège Henri IV (0752526N) | cite_scolaire | Lycée Henri-IV (0750654D) | oui | non_garanti | cite_scolaire [R1_cite_scolaire:07504, R3_adresse] |
| Collège Montaigne (0752527P) | cite_scolaire | Lycée Montaigne (0750657G) | oui | non_garanti | cite_scolaire [R1_cite_scolaire:07506, R3_adresse] |
| Collège Victor Duruy (0752528R) | cite_scolaire | Lycée Victor Duruy (0750662M) | oui | non_garanti | cite_scolaire [R1_cite_scolaire:07507, R3_adresse] |
| Collège Chaptal (0752529S) | cite_scolaire | Lycée Chaptal (0750663N) | oui | non_garanti | cite_scolaire [R1_cite_scolaire:07508, R3_adresse] |
| Collège Lavoisier (0752531U) | cite_scolaire | Lycée Lavoisier (0750656F) | oui | non_garanti | cite_scolaire [R1_cite_scolaire:07505, R3_adresse] |
| Collège Jacques Decour (0752532V) | cite_scolaire | Lycée Jacques Decour (0750668U) | oui | non_garanti | cite_scolaire [R1_cite_scolaire:07509, R3_adresse] |
| Collège Jules Ferry (0752533W) | cite_scolaire | Lycée Jules Ferry (0750669V) | oui | non_garanti | cite_scolaire [R1_cite_scolaire:07510, R3_adresse] |
| Collège Alphonse de Lamartine (0752534X) | cite_scolaire | Lycée Alphonse de Lamartine (0750670W) | oui | non_garanti | cite_scolaire [R1_cite_scolaire:07511, R3_adresse] |
| Collège Voltaire (0752536Z) | cite_scolaire | Lycée Voltaire (0750675B) | oui | non_garanti | cite_scolaire [R1_cite_scolaire:07512, R3_adresse] |
| Collège Paul Valéry (0752537A) | cite_scolaire | Lycée Paul Valéry (0750679F) | oui | non_garanti | cite_scolaire [R1_cite_scolaire:07513, R3_adresse] |
| Collège Rodin (0752538B) | cite_scolaire | Lycée Rodin (0750682J) | oui | non_garanti | cite_scolaire [R1_cite_scolaire:07514, R3_adresse] |
| Collège Claude Monet (0752539C) | cite_scolaire | Lycée Claude Monet (0750683K) | oui | non_garanti | cite_scolaire [R1_cite_scolaire:07515, R3_adresse] |
| Collège Gabriel Fauré (0752540D) | cite_scolaire | Lycée Gabriel Fauré (0750684L) | oui | non_garanti | cite_scolaire [R1_cite_scolaire:07516, R3_adresse] |
| Collège Paul Bert (0752543G) | cite_scolaire | Lycée Paul Bert (0750689S) | oui | non_garanti | cite_scolaire [R1_cite_scolaire:07517] |
| Collège François Villon (0752544H) | cite_scolaire | Lycée polyvalent François Villon (0750690T) | non | non_garanti | cite_scolaire [R1_cite_scolaire:07518, R3_adresse] |
| Collège Buffon (0752545J) | cite_scolaire | Lycée Buffon (0750693W) | oui | non_garanti | cite_scolaire [R1_cite_scolaire:07519, R3_adresse] |
| Collège Camille Sée (0752546K) | cite_scolaire | Lycée Camille Sée (0750694X) | oui | non_garanti | cite_scolaire [R1_cite_scolaire:07520, R3_adresse] |
| Collège Claude Bernard (0752547L) | cite_scolaire | Lycée Claude Bernard (0750698B) | oui | non_garanti | cite_scolaire [R1_cite_scolaire:07524, R3_adresse] |
| Collège Janson de Sailly (0752548M) | cite_scolaire | Lycée Janson de Sailly (0750699C) | oui | non_garanti | cite_scolaire [R1_cite_scolaire:07521, R3_adresse] |
| Collège Jean-Baptiste Say (0752549N) | cite_scolaire | Lycée Jean-Baptiste Say (0750700D) | oui | non_garanti | cite_scolaire [R1_cite_scolaire:07525, R3_adresse] |
| Collège Jean de La Fontaine (0752550P) | cite_scolaire | Lycée Jean de La Fontaine (0750702F) | oui | non_garanti | cite_scolaire [R1_cite_scolaire:07522, R3_adresse] |
| Collège Molière (0752551R) | cite_scolaire | Lycée Molière (0750703G) | oui | non_garanti | cite_scolaire [R1_cite_scolaire:07523, R3_adresse] |
| Collège Carnot (0752552S) | cite_scolaire | Lycée Carnot (0750704H) | oui | non_garanti | cite_scolaire [R1_cite_scolaire:07526, R3_adresse] |
| Collège Honoré de Balzac (0752553T) | cite_scolaire | Lycée international de Paris Honoré de Balzac (0750705J) | oui | non_garanti | cite_scolaire [R1_cite_scolaire:07528, R3_adresse] |
| Collège Henri Bergson (0752555V) | cite_scolaire | Lycée Henri Bergson (enseignement supérieur) (0750711R) | oui | non_garanti | cite_scolaire [R1_cite_scolaire:07529, R3_adresse] |
| Collège Hélène Boucher (0752556W) | cite_scolaire | Lycée Hélène Boucher (0750714U) | oui | non_garanti | cite_scolaire [R1_cite_scolaire:07531, R3_adresse] |
| Collège Maurice Ravel (0752557X) | cite_scolaire | Lycée Maurice Ravel (0750715V) | oui | non_garanti | cite_scolaire [R1_cite_scolaire:07532, R3_adresse] |
| Collège privé Fénelon Sainte-Marie (0752842G) | meme_etablissement_prive | Lycée privé Fénelon Sainte-Marie La Plaine Monceau (0753873C) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé Blomet (0752843H) | meme_etablissement_prive | Lycée privé Blomet (0753915Y) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé Saint-Jean de Passy (0752870M) | meme_etablissement_prive | Lycée privé Saint-Jean de Passy (0753947H) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé L'École alsacienne (0752874S) | meme_etablissement_prive | Lycée privé L'École alsacienne (0753647G) | oui | garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé Paul Claudel d'Hulst (0752882A) | meme_etablissement_prive | Lycée privé Paul Claudel-d'Hulst (0753809H) | oui | non_garanti | meme_etablissement_prive [R2_siren] |
| Collège privé Sainte-Jeanne-Élisabeth (0752894N) | meme_etablissement_prive | Lycée privé Sainte-Jeanne-Élisabeth (0753852E) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé Charles Péguy (0752895P) | meme_etablissement_prive | Lycée privé Charles Péguy (0753890W) | oui | non_garanti | meme_etablissement_prive [R2_siren] |
| Collège privé Notre-Dame de France (0752896R) | meme_etablissement_prive | Lycée privé Notre-Dame de France (0753902J) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé de la Tour (0752897S) | meme_etablissement_prive | Lycée privé de la Tour (0753943D) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé Sainte-Ursule Louise de Bettignies (0752898T) | meme_etablissement_prive | Lycée privé Sainte-Ursule Louise de Bettignies (0754081D) | oui | non_garanti | meme_etablissement_prive [R2_siren] |
| Collège privé La Rochefoucauld (0752899U) | meme_etablissement_prive | Lycée privé La Rochefoucauld (0753851D) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé Stanislas (0752900V) | meme_etablissement_prive | Lycée privé Stanislas (0753840S) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé Sainte-Élisabeth (0752901W) | meme_etablissement_prive | Lycée privé Sainte-Élisabeth (0753916Z) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé des Francs Bourgeois (0752902X) | meme_etablissement_prive | Lycée privé des Francs Bourgeois - La Salle (0753820V) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé Yabné (0752906B) | meme_etablissement_prive | Lycée privé Yabné (0753834K) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé Eugène Napoléon Saint-Pierre Fourier (0752911G) | meme_etablissement_prive | Lycée privé Eugène Napoléon - Saint-Pierre Fourier (0753898E) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé de l'Alma (0752912H) | meme_etablissement_prive | Lycée privé de l'Alma (0753849B) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé Sévigné (0752913J) | meme_etablissement_prive | Lycée privé Sévigné (0753598D) | oui | garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé Morvan (0752916M) | meme_etablissement_prive | Lycée privé Morvan (0753825A) | oui | garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé Saint-Louis de Gonzague (0752917N) | meme_etablissement_prive | Lycée privé Saint-Louis de Gonzague (0753933T) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé Notre-Dame des Oiseaux (0752918P) | meme_etablissement_prive | Lycée privé Notre-Dame des Oiseaux (0753946G) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé Pascal (0752919R) | meme_etablissement_prive | Lycée privé Pascal (0753919C) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé Massillon (0752920S) | meme_etablissement_prive | Lycée privé Massillon (0753824Z) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé Rocroy Saint-Vincent de Paul (0752923V) | meme_etablissement_prive | Lycée privé Rocroy Saint-Vincent-de-Paul (0753885R) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé Saint-Sulpice (0752924W) | meme_etablissement_prive | Lycée privé Saint-Sulpice (0753838P) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé Sainte-Geneviève (0752925X) | meme_etablissement_prive | Lycée privé Sainte-Geneviève (0753844W) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé Gerson (0752926Y) | meme_etablissement_prive | Lycée privé Gerson (0753941B) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé Saint-Michel des Batignolles (0752927Z) | meme_etablissement_prive | Lycée privé Saint-Michel des Batignolles (0753959W) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé Saint-Michel de Picpus (0752934G) | meme_etablissement_prive | Lycée privé Saint-Michel de Picpus (0753897D) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé École active bilingue Jeannine Manuel (0752935H) | meme_etablissement_prive | École active bilingue Jeannine Manuel (0753874D) | oui | non_garanti | meme_etablissement_prive [R3_adresse] |
| Collège privé de l'Assomption (0752936J) | meme_etablissement_prive | Lycée privé de l'Assomption (0753948J) | oui | non_garanti | meme_etablissement_prive [R3_adresse] |
| Collège privé France Quéré - Association Votre école chez vous (0752954D) | meme_etablissement_prive | Lycée France Quéré - Association Votre école chez vous (0754089M) | non | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé Sinaï (0753206C) | meme_etablissement_prive | Lycée privé Sinaï (0753231E) | oui | non_garanti | meme_etablissement_prive [R3_adresse] |
| Collège privé Beth Hanna (0753369E) | meme_etablissement_prive | Lycée privé Beth Hanna (0754325U) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé Saint-Vincent (0753381T) | meme_etablissement_prive | Lycée privé Charles de Foucauld (0754086J) | oui | non_garanti | meme_etablissement_prive [R2_siren] |
| Collège privé Thérèse Chappuis (0753854G) | meme_etablissement_prive | Lycée privé Saint-François de Sales - Thérèse Chappuis (0754860A) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé Sœur Rosalie (0753967E) | meme_etablissement_prive | Lycée privé Louise de Marillac (0753827C) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé Saint-Vincent-de-Paul (0753985Z) | meme_etablissement_prive | Lycée privé Saint-Vincent-de-Paul (0754924V) | oui | sous_reserve | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé Lucien de Hirsch (0754003U) | meme_etablissement_prive | Lycée privé Lucien de Hirsch (0754965P) | oui | non_garanti | meme_etablissement_prive [R2_siren] |
| Collège privé Sainte-Louise (0754007Y) | meme_etablissement_prive | Lycée privé Sainte-Louise (0755709Y) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé Saint-Louis (0754008Z) | meme_etablissement_prive | Lycée polyvalent privé Saint-Nicolas (0754025T) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé Ozar Hatorah (0754290F) | meme_etablissement_prive | Lycée privé Ozar Hatorah (0754479L) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé Notre-Dame de Sion (0754757N) | meme_etablissement_prive | Lycée privé Notre-Dame de Sion (0753842U) | oui | inconnu | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé Georges Leven (0754853T) | meme_etablissement_prive | Lycée privé Georges Leven (0753935V) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé Heikhal Menahem Sinaï (0755029J) | meme_etablissement_prive | Lycée privé Heikhal Menahem Sinaï (0755025E) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé N'R Hatorah (0755052J) | meme_etablissement_prive | Lycée privé N'R Hatorah (0755352K) | oui | non_garanti | meme_etablissement_prive [R2_siren] |
| Collège privé Gaston Tenoudji (0755192L) | meme_etablissement_prive | Groupe scolaire Alliance Rachi (0755537L) | oui | non_garanti | meme_etablissement_prive [R2_siren] |
| Collège privé Georges Gusdorf (0755496S) | meme_etablissement_prive | Lycée général privé Georges Gusdorf (0755589T) | oui | inconnu | meme_etablissement_prive [R2_siren, R3_adresse] |
| Ecole générale et technologique privée Cours Progress (0755757A) | meme_etablissement_prive | Ecole générale et technologique privée Cours Progress (0754971W) | non | inconnu | meme_etablissement_prive [R2_siren] |
| Collège Kingsworth International School (0755773T) | meme_etablissement_prive | Lycée Kingsworth International School (0755772S) | non | inconnu | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé Cours du Pont de Pierre (0755799W) | meme_etablissement_prive | Lycée privé Cours du Pont de Pierre (0755801Y) | non | inconnu | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé Catherine Labouré (0755840R) | meme_etablissement_prive | Lycée privé polyvalent Catherine Labouré (0754045P) | oui | sous_reserve | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé ICS Paris (0755848Z) | meme_etablissement_prive | Lycée privé ICS (0755849A) | non | inconnu | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé Ecole Démocratique de Paris (0755879H) | meme_etablissement_prive | Lycée privé Ecole Démocratique de Paris (0755880J) | non | inconnu | meme_etablissement_prive [R2_siren, R3_adresse] |
| Ecole Canadienne Internationale de Paris (0755897C) | meme_etablissement_prive | Ecole Canadienne Internationale de Paris (0755898D) | non | inconnu | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé La classe du phare (0756051V) | meme_etablissement_prive | Lycée général privé La classe du Phare (0756052W) | non | inconnu | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé Paris FC (0756057B) | groupe_scolaire_autre_site | Lycée privé Paris FC Academy (hors contrat) (0942439R) | non | non_garanti | aucun → corrigé (groupe_scolaire_autre_site) |
| Collège privé Beth Aaron (0756124Z) | meme_etablissement_prive | Lycée général privé Beth Aaron (0756125A) | non | non_garanti | meme_etablissement_prive [R3_adresse] |
| Collège privé Montessori (0756191X) | meme_etablissement_prive | Lycée général privé Montessori (0756192Y) | non | inconnu | meme_etablissement_prive [R3_adresse] |
| Collège privé Ellipse Montessori (0756197D) | meme_etablissement_prive | Lycée général privé Ellipse Montessori Academy (0756544F) | non | inconnu | meme_etablissement_prive [R3_adresse] |
| Collège privé École Diagonale (0756203K) | meme_etablissement_prive | Cours Diagonale (0755367B) | oui | inconnu | meme_etablissement_prive [R3_adresse] |
| Collège privé Cours Molière (0756204L) | meme_etablissement_prive | Cours Molière (Ecole secondaire privée) (0753895B) | non | inconnu | meme_etablissement_prive [R3_adresse] |
| Ecole Secondaire Privée Maigret (0756273L) | meme_etablissement_prive | L'Ecole (Ecole secondaire privée) (0753911U) | non | inconnu | meme_etablissement_prive [R3_adresse] |
| Ecole Secondaire Privée International School of Paris (0756274M) | meme_etablissement_prive | International School of Paris (Ecole secondaire privée) (0752803P) | non | inconnu | meme_etablissement_prive [R3_adresse] |
| Collège privé Cours Montaigne (0756278S) | meme_etablissement_prive | Cours Montaigne (Ecole secondaire privée) (0753845X) | oui | inconnu | meme_etablissement_prive [R3_adresse] |
| Collège privé BETH SEFER YAD MORDEKHAI (0756282W) | meme_etablissement_prive | Ecole générale et technologique privée Beth Sepher Yad Mordekai (0923044J) | non | inconnu | meme_etablissement_prive [R2_siren] |
| Collège privé Ecole A (0756489W) | meme_etablissement_prive | Lycée général et technologique privé Ecole A (0756403C) | non | inconnu | meme_etablissement_prive [R3_adresse] |
| Collège Privé Ipecom (0756786U) | meme_etablissement_prive | IPECOM Prépa Sciences (Ecole secondaire privée) (0753377N) | non | inconnu | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé ABI SCHOOL 12 rue Charles Pouillet (0756898R) | meme_etablissement_prive | Lycée général privé ABI School 12 rue Charles Pouillet (0756899S) | non | inconnu | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège Sainte-Croix (0771216D) | meme_etablissement_prive | Lycée Sainte-Croix (0772290W) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège Sainte-Thérèse (0771217E) | meme_etablissement_prive | Lycée privé Campus Sainte-Thérèse (0772324H) | oui | non_garanti | meme_etablissement_prive [R2_siren] |
| Collège Sainte-Marie - La Roche aux Coqs (0771218F) | meme_etablissement_prive | Lycée La Salle - Sainte-Marie (0772840U) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé Sainte-Céline (0771222K) | meme_etablissement_prive | Lycée privé Sainte-Céline (0772602K) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé Beth Myriam (0771668V) | meme_etablissement_prive | Lycée général privé Beth Myriam (0772908T) | non | inconnu | meme_etablissement_prive [R3_adresse] |
| Collège Jacques Amyot (0771762X) | cite_scolaire | Lycée Jacques Amyot (0770933W) | oui | non_garanti | cite_scolaire [R1_cite_scolaire:07706] |
| Collège Saint-Laurent-La Paix Notre-Dame (0771918S) | meme_etablissement_prive | Lycée privé Saint-Laurent La Paix Notre-Dame (0771237B) | oui | non_garanti | meme_etablissement_prive [R2_siren] |
| Collège Sainte-Marie (0771921V) | meme_etablissement_prive | Lycée technologique Jean Rose - secteur tertiaire, sanitaire et social (0772153X) | non | non_garanti | meme_etablissement_prive [R2_siren] |
| Collège Jeanne d'Arc-Saint-Aspais (0771925Z) | meme_etablissement_prive | Lycée polyvalent privé Blanche de Castille (0771200L) | non | non_garanti | meme_etablissement_prive [R2_siren] |
| Collège Guy Gasnier - Sainte-Bathilde (0771926A) | meme_etablissement_prive | Lycée Guy Gasnier Sainte-Bathilde (0771720B) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège de la Pyramide (0772429X) | aucun |  | non | non_garanti | aucun |
| Collège privé Maurice Rondeau (0772601J) | meme_etablissement_prive | Lycée polyvalent Maurice Rondeau (0772275E) | oui | non_garanti | meme_etablissement_prive [R2_siren] |
| Collège privé Père Jacques (0772650M) | meme_etablissement_prive | Lycée polyvalent privé Sainte-Thérèse (0753217P) | oui | non_garanti | meme_etablissement_prive [R2_siren] |
| Collège privé Oneschool Global Paris Campus (0772740K) | meme_etablissement_prive | Lycée Professionnel privé Oneschool Global Paris Campus (0772747T) | non | inconnu | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé Saint-Colomban (0772953S) | meme_etablissement_prive | Lycée général et technologique privé Saint-Colomban (0772954T) | oui | non_garanti | meme_etablissement_prive [R3_adresse] |
| Collège Le Rondeau (0780846W) | aucun |  | non | non_garanti | aucun |
| Collège Le Corbusier (0781101Y) | cite_scolaire | Lycée Le Corbusier (0782546U) | oui | non_garanti | cite_scolaire [R1_cite_scolaire:07850, R3_adresse] |
| Collège Hoche (0781106D) | cite_scolaire | Lycée Hoche (0782562L) | oui | non_garanti | cite_scolaire [R1_cite_scolaire:07851, R3_adresse] |
| Collège Notre-Dame - Les Oiseaux (0781537X) | meme_etablissement_prive | Lycée Notre-Dame Les Oiseaux (0783344L) | oui | non_garanti | meme_etablissement_prive [R1_cite_scolaire:07817, R2_siren, R3_adresse] |
| Collège Blanche de Castille (0781586A) | meme_etablissement_prive | Lycée Blanche de Castille (0783282U) | oui | non_garanti | meme_etablissement_prive [R1_cite_scolaire:07804, R2_siren, R3_adresse] |
| Collège l'Ermitage, École internationale de France (0781587B) | meme_etablissement_prive | Lycée l'Ermitage (0783283V) | oui | non_garanti | meme_etablissement_prive [R1_cite_scolaire:07807, R2_siren, R3_adresse] |
| Collège Saint-Érembert (0781589D) | meme_etablissement_prive | Lycée Saint-Érembert (0783286Y) | oui | non_garanti | meme_etablissement_prive [R1_cite_scolaire:07815, R2_siren, R3_adresse] |
| Collège Notre-Dame (0781590E) | meme_etablissement_prive | Lycée Notre-Dame (0783289B) | oui | non_garanti | meme_etablissement_prive [R1_cite_scolaire:07808, R2_siren, R3_adresse] |
| Collège Le Bon Sauveur (0781594J) | meme_etablissement_prive | Lycée Le Bon Sauveur (0783297K) | oui | non_garanti | meme_etablissement_prive [R1_cite_scolaire:07825, R2_siren, R3_adresse] |
| Collège Saint-Jean - Hulst (0781597M) | meme_etablissement_prive | Lycée Saint-Jean et Hulst (0783350T) | oui | non_garanti | meme_etablissement_prive [R1_cite_scolaire:07823, R2_siren] |
| Collège Perceval (0781601S) | meme_etablissement_prive | Ecole 2D degré général privée de Perceval (0783355Y) | non | non_garanti | meme_etablissement_prive [R1_cite_scolaire:07803, R2_siren] |
| Collège Notre-Dame (0781620M) | meme_etablissement_prive | Lycée Notre-Dame (0783288A) | oui | non_garanti | meme_etablissement_prive [R1_cite_scolaire:07814, R2_siren, R3_adresse] |
| Collège Saint-François d'Assise (0781662H) | meme_etablissement_prive | Lycée Saint-François d'Assise (0781899R) | oui | non_garanti | meme_etablissement_prive [R2_siren] |
| Collège Saint-Exupéry (0782087V) | meme_etablissement_prive | Lycée Saint-Exupéry (0781974X) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège Saint-Augustin (0783307W) | meme_etablissement_prive | Lycée Saint-Augustin (0783657B) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège Sainte-Thérèse (0783338E) | meme_etablissement_prive | Lycée Sainte-Thérèse (0781664K) | oui | non_garanti | meme_etablissement_prive [R1_cite_scolaire:07812, R2_siren] |
| Collège Mercier Saint-Paul (0783340G) | meme_etablissement_prive | Lycée général et technologique privé Mercier Saint-Paul (0783857U) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège franco-allemand (0783546F) | cite_scolaire | Lycée Franco-Allemand (0783548H) | oui | non_garanti | cite_scolaire [R1_cite_scolaire:07855] |
| Collège international (0783547G) | cite_scolaire | Lycée international (0783549J) | oui | non_garanti | cite_scolaire [R1_cite_scolaire:07854] |
| Collège privé Samarcande (0783592F) | meme_etablissement_prive | Ecole générale et technologique privée du groupe scolaire privé Samarcande (0783656A) | non | non_garanti | meme_etablissement_prive [R3_adresse] |
| Ecole secondaire privée International Montessori Athéna (0783682D) | meme_etablissement_prive | Ecole 2D degré général privée International Montessori Athéna (0783681C) | non | inconnu | meme_etablissement_prive [R2_siren, R3_adresse] |
| Ecole secondaire privée La Jonchère (0783727C) | meme_etablissement_prive | Lycée général et technologique privé La Jonchère (0783856T) | non | inconnu | meme_etablissement_prive [R2_siren, R3_adresse] |
| Ecole secondaire privée sports Académy le Mesnil (0783764T) | meme_etablissement_prive | Ecole 2D degré polyvalent privée Sports Etudes Académy le Mesnil (0783765U) | non | inconnu | meme_etablissement_prive [R2_siren, R3_adresse] |
| Ecole secondaire privée Pilcalli (0783772B) | meme_etablissement_prive | Ecole 2D degré général privée Pilcalli - Lycée Montessori International (0783864B) | non | inconnu | meme_etablissement_prive [R2_siren, R3_adresse] |
| Ecole secondaire privée La Jonchère EIB Campus (0783810T) | meme_etablissement_prive | Lycée général et technologique privé La Jonchère (0783856T) | non | inconnu | meme_etablissement_prive [R2_siren] |
| Collège privé Saint-Thomas de Villeneuve (0783816Z) | meme_etablissement_prive | Lycée Saint-Thomas de Villeneuve (0783323N) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège Les Châtaigniers (0783838Y) | meme_etablissement_prive | Lycée Les Châtaigniers (0783293F) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Ecole secondaire privée Station phoenix (0783846G) | meme_etablissement_prive | Ecole générale et technologique Station phoenix (0783847H) | non | inconnu | meme_etablissement_prive [R2_siren, R3_adresse] |
| Ecole secondaire privée Cité Educative du Paris-Saint-Germain (0783870H) | meme_etablissement_prive | Ecole d'enseignement technologique privée Sportifs de Haut Niveau (0783504K) | non | inconnu | meme_etablissement_prive [R2_siren] |
| Collège Sainte-Jeanne d'Arc (0910820X) | meme_etablissement_prive | Lycée polyvalent Saint-Martin (0912321D) | oui | non_garanti | meme_etablissement_prive [R2_siren] |
| Collège Jeanne d'Arc (0910827E) | meme_etablissement_prive | Lycée Jeanne d'Arc (0912384X) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège Saint-Spire (0910829G) | meme_etablissement_prive | Lycée polyvalent Saint-Léon (0912161E) | oui | non_garanti | meme_etablissement_prive [R2_siren] |
| Collège du Sacré-Coeur (0910836P) | meme_etablissement_prive | Lycée Saint-Louis Saint-Clément (0910826D) | oui | non_garanti | meme_etablissement_prive [R2_siren] |
| Collège Jean Lurçat (0911025V) | aucun |  | non | non_garanti | aucun |
| Collège Montesquieu (0911444A) | aucun |  | non | non_garanti | aucun |
| Collège Rudolf Steiner (0911601W) | meme_etablissement_prive | Lycée Steiner (0911844K) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège Saint-Charles (0911745C) | meme_etablissement_prive | Lycée Saint-Charles (0910808J) | oui | non_garanti | meme_etablissement_prive [R2_siren] |
| Collège Saint-Pierre (0911746D) | meme_etablissement_prive | Lycée polyvalent Saint-Pierre (0910843X) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège Jeanne d'Arc (0911747E) | meme_etablissement_prive | Lycée Jeanne d'Arc (0910815S) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé du cours secondaire d'Orsay (0911749G) | meme_etablissement_prive | Lycée privé du cours secondaire d'Orsay (0910819W) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège Institution Saint Vincent de Paul (0911750H) | meme_etablissement_prive | Lycée Institution Saint Vincent de Paul (0910823A) | oui | non_garanti | meme_etablissement_prive [R2_siren] |
| Collège Sacré-Coeur (0911751J) | meme_etablissement_prive | Lycée du Sacré-Coeur (0910824B) | oui | non_garanti | meme_etablissement_prive [R1_cite_scolaire:09102, R2_siren, R3_adresse] |
| Collège Saint-Louis - Saint-Clément (0911752K) | meme_etablissement_prive | Lycée Saint-Louis Saint-Clément (0910826D) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège Saint-Nicolas (0911824N) | meme_etablissement_prive | Lycée polyvalent La Salle Igny (0912342B) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège Beth Rivkah (0912000E) | meme_etablissement_prive | Lycée Beth Rivkah (0910838S) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Ecole secondaire privée Groupe Scolaire Excellence (0912353N) | meme_etablissement_prive | Ecole générale et technologique privée Groupe Scolaire Excellence (0912443L) | non | inconnu | meme_etablissement_prive [R2_siren, R3_adresse] |
| Ecole secondaire privée La Lumière du Savoir (0912378R) | meme_etablissement_prive | Lycée Général et Technologique La Lumière du Savoir (0912451V) | non | inconnu | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège Saint-Spire Sénart (0912547Z) | meme_etablissement_prive | Lycée Saint-Léon Sénart (0912546Y) | non | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège La Salle - Saint-Nicolas (0921003R) | meme_etablissement_prive | Lycée polyvalent La Salle - Saint-Nicolas (Lycée des métiers) (0922653J) | oui | non_garanti | meme_etablissement_prive [R1_cite_scolaire:09263, R2_siren, R3_adresse] |
| Collège Saint-Pierre Saint-Jean (0921015D) | meme_etablissement_prive | Lycée polyvalent La Trinité (0920985W) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège Albert Camus (0921779J) | aucun |  | non | non_garanti | aucun |
| Collège Louis Pasteur (0921780K) | cite_scolaire | Lycée Louis Pasteur (0920142E) | oui | non_garanti | cite_scolaire [R1_cite_scolaire:09255] |
| Collège Rabelais (0921782M) | cite_scolaire | Lycée Rabelais (0920798T) | oui | non_garanti | cite_scolaire [R1_cite_scolaire:09251, R3_adresse] |
| Collège Michelet (0921783N) | cite_scolaire | Lycée Michelet (0920149M) | oui | non_garanti | cite_scolaire [R1_cite_scolaire:09259, R3_adresse] |
| Collège Lakanal (0921784P) | cite_scolaire | Lycée Lakanal (0920145H) | oui | non_garanti | cite_scolaire [R1_cite_scolaire:09258, R3_adresse] |
| Collège Marie Curie (0921785R) | cite_scolaire | Lycée Marie Curie (0920146J) | oui | non_garanti | cite_scolaire [R1_cite_scolaire:09257, R3_adresse] |
| Collège Sainte-Marie la Croix (0921901S) | meme_etablissement_prive | Lycée Sainte-Marie (0920904H) | oui | non_garanti | meme_etablissement_prive [R1_cite_scolaire:09201, R2_siren, R3_adresse] |
| Collège Sainte-Geneviève (0921902T) | meme_etablissement_prive | Lycée Sainte-Geneviève (0920889S) | oui | non_garanti | meme_etablissement_prive [R1_cite_scolaire:09203, R2_siren, R3_adresse] |
| Collège Saint-Gabriel (0921903U) | meme_etablissement_prive | Lycée Saint-Gabriel (0920894X) | oui | non_garanti | meme_etablissement_prive [R1_cite_scolaire:09205, R2_siren, R3_adresse] |
| Collège Maïmonide Rambam (0921904V) | meme_etablissement_prive | Lycée Rambam (0920898B) | oui | non_garanti | meme_etablissement_prive [R1_cite_scolaire:09208, R2_siren, R3_adresse] |
| Collège Notre-Dame (0921905W) | meme_etablissement_prive | Lycée Notre-Dame (0920906K) | oui | non_garanti | meme_etablissement_prive [R1_cite_scolaire:09209, R2_siren, R3_adresse] |
| Collège Sophie Barat (0921906X) | meme_etablissement_prive | Lycée Sophie Barat (0920907L) | oui | non_garanti | meme_etablissement_prive [R1_cite_scolaire:09210, R2_siren, R3_adresse] |
| Collège Saint-Thomas de Villeneuve (0921907Y) | meme_etablissement_prive | Lycée Saint-Thomas de Villeneuve (0920908M) | oui | non_garanti | meme_etablissement_prive [R1_cite_scolaire:09212, R2_siren, R3_adresse] |
| Collège Jeanne d'Arc (0921908Z) | meme_etablissement_prive | Lycée Jeanne d'Arc (0921663H) | oui | non_garanti | meme_etablissement_prive [R1_cite_scolaire:09213, R2_siren, R3_adresse] |
| Collège La Source (0921909A) | meme_etablissement_prive | Lycée La Source (0920916W) | oui | non_garanti | meme_etablissement_prive [R1_cite_scolaire:09219, R2_siren] |
| Collège Jeanne d'Arc (0921911C) | meme_etablissement_prive | Lycée Jeanne d'Arc (0920918Y) | oui | non_garanti | meme_etablissement_prive [R1_cite_scolaire:09222, R2_siren, R3_adresse] |
| Collège Sainte-Marie (0921912D) | meme_etablissement_prive | Lycée Sainte-Marie de Neuilly (0920875B) | oui | non_garanti | meme_etablissement_prive [R1_cite_scolaire:09225, R2_siren, R3_adresse] |
| Collège Notre-Dame de Sainte-Croix (0921913E) | meme_etablissement_prive | Lycée Notre-Dame de Sainte-Croix (0920919Z) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège Saint-Dominique (0921914F) | meme_etablissement_prive | Lycée Saint-Dominique (0920921B) | oui | non_garanti | meme_etablissement_prive [R1_cite_scolaire:09224, R2_siren, R3_adresse] |
| Collège Passy Saint-Nicolas Buzenval (0921915G) | meme_etablissement_prive | Lycée La Salle Passy Buzenval (0920928J) | oui | non_garanti | meme_etablissement_prive [R1_cite_scolaire:09229, R2_siren, R3_adresse] |
| Collège Madeleine Daniélou (0921916H) | meme_etablissement_prive | Lycée Madeleine Daniélou (0921365J) | oui | non_garanti | meme_etablissement_prive [R1_cite_scolaire:09227, R2_siren, R3_adresse] |
| Collège Suger (0921919L) | meme_etablissement_prive | Lycée P. Suger (0920937U) | oui | non_garanti | meme_etablissement_prive [R1_cite_scolaire:09234, R2_siren, R3_adresse] |
| Collège Saint-Philippe (0922340U) | meme_etablissement_prive | Lycée professionnel Saint-Philippe (0920981S) | non | non_garanti | meme_etablissement_prive [R1_cite_scolaire:09221, R2_siren, R3_adresse] |
| Collège Notre-Dame (0922450N) | meme_etablissement_prive | Lycée Notre-Dame (0920917X) | oui | non_garanti | meme_etablissement_prive [R2_siren] |
| Collège Hautefeuille (0922482Y) | meme_etablissement_prive | Lycée d'enseignement général privé Hautefeuille (0922691A) | oui | non_garanti | meme_etablissement_prive [R2_siren] |
| Collège Bienheureux Charles de Foucauld (0922731U) | meme_etablissement_prive | Lycée polyvalent La Trinité (0920985W) | oui | non_garanti | meme_etablissement_prive [R2_siren] |
| Collège privé Beth Hilel (0922751R) | meme_etablissement_prive | Lycée général privé Beth Hilel (0923051S) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Ecole secondaire privée  international scolaire - Open Sky International (0922798S) | meme_etablissement_prive | Ecole 2D degré général privée Open Sky International (0923077V) | non | inconnu | meme_etablissement_prive [R3_adresse] |
| Ecole secondaire privée internationale Deutsche Schule Paris (0922943Z) | meme_etablissement_prive | Ecole générale et technologique privée Internationale Deutsche Paris (0922817M) | non | inconnu | meme_etablissement_prive [R3_adresse] |
| Ecole secondaire privée Cours Singulier (0922964X) | meme_etablissement_prive | Ecole 2D degré général privé Cours Singulier (0922965Y) | non | inconnu | meme_etablissement_prive [R2_siren, R3_adresse] |
| Ecole secondaire privée Ecole Diagonale (0922967A) | meme_etablissement_prive | Cours Diagonale (0755367B) | non | inconnu | meme_etablissement_prive [R2_siren] |
| Collège privé Beth Sepher Yad Mordekai (0923042G) | meme_etablissement_prive | Ecole générale et technologique privée Beth Sepher Yad Mordekai (0923044J) | non | inconnu | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé Assomption (0930906E) | meme_etablissement_prive | Lycée polyvalent privé Assomption (0930933J) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège Saint-Germain (0930907F) | meme_etablissement_prive | Lycée général privé Saint-Germain (0932619S) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège Sainte-Marie (0930920V) | meme_etablissement_prive | Lycée général privé Sainte-Marie (0932654E) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège Fénelon (0930921W) | meme_etablissement_prive | Lycée général privé Fénelon (0931799A) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège La Salle Saint-Denis (0930959M) | meme_etablissement_prive | Lycée polyvalent privé La Salle Saint-Denis (0931797Y) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège Alliance (0930966V) | meme_etablissement_prive | Lycée général privé Alliance (0931813R) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège Saint-Louis Sainte-Clotilde (0930969Y) | meme_etablissement_prive | Lycée général privé Saint-Louis Sainte-Clotilde (0931812P) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé Saint-Benoist de l'Europe (0931022F) | meme_etablissement_prive | Lycée polyvalent privé Saint-Benoist de l'Europe (0930936M) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège Saint-Joseph (0931528F) | meme_etablissement_prive | Lycée général privé Saint-Joseph La Salle (0932653D) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège Françoise Cabrini (0931705Y) | meme_etablissement_prive | Lycée général privé Françoise Cabrini (0932036H) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège Henri Wallon (0931709C) | cite_scolaire | Lycée Henri Wallon (0930116W) | oui | non_garanti | cite_scolaire [R1_cite_scolaire:09301, R3_adresse] |
| Collège Olympe de Gouges (0931710D) | cite_scolaire | Lycée Olympe de Gouges (0930123D) | oui | non_garanti | cite_scolaire [R1_cite_scolaire:09306] |
| Collège Jean Renoir (0931711E) | cite_scolaire | Lycée Jean Renoir (0930118Y) | oui | non_garanti | cite_scolaire [R1_cite_scolaire:09303, R3_adresse] |
| Collège Jean Jaurès (0931712F) | cite_scolaire | Lycée Jean Jaurès (0930121B) | oui | non_garanti | cite_scolaire [R1_cite_scolaire:09304, R3_adresse] |
| Collège privé l'Espérance (0931843Y) | meme_etablissement_prive | Lycée général privé l'Espérance (0930961P) | oui | non_garanti | meme_etablissement_prive [R2_siren] |
| Collège privé Charles Péguy (0931844Z) | meme_etablissement_prive | Lycée général privé Charles Péguy (0930962R) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège Henri Matisse (0931845A) | meme_etablissement_prive | Lycée général privé Henri Matisse (0930965U) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège Merkaz Hatorah Garçons (0931855L) | meme_etablissement_prive | Lycée général privé de garçons Merkaz Hatorah (0931464L) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé Chne Ohr (0932043R) | meme_etablissement_prive | Lycée général privé Chné Ohr (0932110N) | oui | non_garanti | meme_etablissement_prive [R2_siren] |
| Collège Merkaz Hatorah Filles (0932302X) | meme_etablissement_prive | Lycée général privé de fille Merkaz Hatorah (0932303Y) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège Saint-Vincent-de-Paul (0932586F) | meme_etablissement_prive | Lycée général privé Sainte-Marie (0932654E) | oui | non_garanti | meme_etablissement_prive [R2_siren] |
| Collège du Groupe scolaire privé Bellevue Muhammed Hamidullah (0932642S) | meme_etablissement_prive | Lycée général du Groupe scolaire privé Bellevue Muhammed Hamidullah (0932798L) | non | inconnu | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé La Fraternité (0932646W) | meme_etablissement_prive | Lycée Privé La Fraternité (0932672Z) | non | inconnu | meme_etablissement_prive [R3_adresse] |
| Collège privé Protectorat Saint-Joseph (0932652C) | meme_etablissement_prive | Lycée polyvalent privé Protectorat Saint-Joseph (0931026K) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé La plume de l'éducation (0932717Y) | meme_etablissement_prive | Lycée général privé La Plume de l'Education (0932799M) | non | inconnu | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège - Groupe Scolaire Privé APCS (0932728K) | meme_etablissement_prive | Lycée - Groupe Scolaire Privé APCS (0932729L) | non | inconnu | meme_etablissement_prive [R3_adresse] |
| Collège Sainte-Louise de Marillac (0932772H) | meme_etablissement_prive | Lycée professionnel privé Jeanne la Lorraine (0930929E) | non | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé La Salle - Le Landy (0932773J) | meme_etablissement_prive | Lycée polyvalent privé La Salle Saint-Denis (0931797Y) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège Groupe Scolaire Privé Bougainville (0932797K) | meme_etablissement_prive | Lycée Groupe scolaire privé Bougainville (0933036V) | non | inconnu | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé réussite éducative valeurs et épanouissement (0932860D) | meme_etablissement_prive | Lycée privé réussite éducative valeurs et épanouissement (0932861E) | oui | non_garanti | meme_etablissement_prive [R3_adresse] |
| Collège privé Lab School Montreuil (0932890L) | meme_etablissement_prive | Lycée général privé Lab School Montreuil (0932843K) | non | inconnu | meme_etablissement_prive [R3_adresse] |
| Collège Saint-Joseph (0940806R) | meme_etablissement_prive | Lycée GT Saint-Joseph (0942443V) | oui | non_garanti | meme_etablissement_prive [R2_siren] |
| Collège Notre-Dame des Missions (0940808T) | meme_etablissement_prive | Lycée Notre-Dame des Missions St Pierre (0941877E) | oui | non_garanti | meme_etablissement_prive [R2_siren] |
| Collège privé Epin (0940874P) | meme_etablissement_prive | Lycée Epin (0941719H) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège Hector Berlioz (0941598B) | cite_scolaire | Lycée Hector Berlioz (0940124Z) | oui | non_garanti | cite_scolaire [R1_cite_scolaire:09407, R3_adresse] |
| Collège Édouard Branly (0941599C) | cite_scolaire | Lycée Édouard Branly (0940117S) | oui | non_garanti | cite_scolaire [R1_cite_scolaire:09405, R3_adresse] |
| Collège Christiane Desroches Noblecourt (0941602F) | cite_scolaire | Lycée polyvalent Marianne (0940743X) | oui | non_garanti | cite_scolaire [R1_cite_scolaire:09406] |
| Collège Ozar Hatorah Filles (0941614U) | meme_etablissement_prive | Lycée Ozar Hatorah Filles (0941711Z) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège Saint-André (0941710Y) | meme_etablissement_prive | Lycée Saint-André (0940885B) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège Montalembert (0941713B) | meme_etablissement_prive | Lycée Montalembert (0940881X) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège Albert de Mun (0941714C) | meme_etablissement_prive | Lycée Albert de Mun (0940880W) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège Saint-Michel (0941715D) | meme_etablissement_prive | Lycée Saint-Michel (0940882Y) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège Petit Val (0941716E) | meme_etablissement_prive | Lycée Petit Val (0940891H) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège Notre-Dame de la Providence (0941718G) | meme_etablissement_prive | Lycée Notre-Dame de la Providence (0940877T) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège Poullart des Places (0941891V) | meme_etablissement_prive | Lycée polyvalent privé Sainte-Thérèse (0753217P) | oui | non_garanti | meme_etablissement_prive [R2_siren] |
| Collège Ozar Hatorah Garçons (0941942A) | meme_etablissement_prive | Lycée Ozar Hatorah Garçons (0941943B) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège Cours du Hameau (0942119T) | meme_etablissement_prive | Lycée Cours du Hameau (0942376X) | oui | non_garanti | meme_etablissement_prive [R2_siren] |
| Collège privé ISE Emeth Leyaacov - Filles (0942143U) | meme_etablissement_prive | Lycée privé ISE Emeth Leyaacov - Filles (0942382D) | non | inconnu | meme_etablissement_prive [R2_siren] |
| Collège privé ISE Emeth Leyaacov - Garçons (0942185P) | meme_etablissement_prive | Lycée privé ISE Emeth Leyaacov - Filles (0942382D) | non | inconnu | meme_etablissement_prive [R2_siren] |
| Collège du groupe scolaire privé Education et Savoir (0942223F) | meme_etablissement_prive | Lycée privé Education et Savoir (0942393R) | non | inconnu | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé l'Ecole Heureuse - LEH (0942336D) | meme_etablissement_prive | Lycée privé l'Ecole Heureuse - LEH (0942025R) | non | inconnu | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège privé Sports études de Paris (SEDP) (0942366L) | meme_etablissement_prive | Lycée général et technologique privé Sports études de Paris (SEDP) (0942365K) | non | inconnu | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège Saint-Stanislas (0950760K) | meme_etablissement_prive | Lycée professionnel de la communication et industries graphiques Notre famille (0950804H) | non | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège Le Rosaire (0950763N) | meme_etablissement_prive | Lycée Notre-Dame de Bury (0950759J) | oui | non_garanti | meme_etablissement_prive [R2_siren] |
| Collège Saint-Joseph (0950789S) | meme_etablissement_prive | Lycée Saint-Joseph (0952208J) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège Sainte-Jeanne d'Arc (0950793W) | meme_etablissement_prive | Lycée polyvalent Jeanne d'Arc (0950812S) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège Saint-Pie X (Fondation d'Auteuil) (0951220K) | meme_etablissement_prive | Lycée polyvalent privé Sainte-Thérèse (0753217P) | oui | non_garanti | meme_etablissement_prive [R2_siren] |
| Collège Anna de Noailles (0951357J) | aucun |  | non | non_garanti | aucun |
| Collège Notre Dame de la Providence (0951504U) | meme_etablissement_prive | Lycée Notre-Dame Providence (0950753C) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège Notre-Dame de Bury - Annexe du collège Le Rosaire de Saint-Leu-la-Forêt (0951505V) | meme_etablissement_prive | Lycée Notre-Dame de Bury (0950759J) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège Notre-Dame de la Compassion (0951506W) | meme_etablissement_prive | Lycée polyvalent privé Notre-Dame-de-la-Compassion (0950761L) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège Saint-Martin de France (0951507X) | meme_etablissement_prive | Lycée Saint-Martin de France (0950762M) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège Notre-Dame (0951508Y) | meme_etablissement_prive | Lycée Notre-Dame (0950785M) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège La Salle - Saint-Rosaire (0951509Z) | meme_etablissement_prive | Lycée La Salle - Saint-Rosaire (0950786N) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège Torat Emet (0951682M) | meme_etablissement_prive | Lycée Torat Emet (0951048Y) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège ORT (0951916S) | meme_etablissement_prive | Lycée polyvalent privé ORT (0951994B) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège Ozar Hatorah (0951939S) | meme_etablissement_prive | Lycée Ozar Hatorah (0951940T) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège Vauban (0951943W) | meme_etablissement_prive | Lycée privé Vauban (0951221L) | oui | non_garanti | meme_etablissement_prive [R3_adresse] |
| Ecole secondaire privée Beth Yaacov (0952133C) | meme_etablissement_prive | Ecole 2D degré général privée Beth Yaacov (0952134D) | non | inconnu | meme_etablissement_prive [R2_siren, R3_adresse] |
| Collège Saint-Jean (0952136F) | meme_etablissement_prive | Lycée professionnel Saint-Jean (0950805J) | non | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Institut Paul Ricoeur (0952145R) | meme_etablissement_prive | Lycée Paul Ricoeur (0952158E) | oui | non_garanti | meme_etablissement_prive [R2_siren, R3_adresse] |
| Ecole secondaire privée Torah Or (0952222Z) | meme_etablissement_prive | Lycée Ozar Hatorah (0951940T) | oui | inconnu | meme_etablissement_prive [R2_siren] |

Autres lycées candidats non retenus :

- Collège privé Saint-Michel de Picpus (0752934G) : 0940882Y [R2_siren]
- Collège privé Ozar Hatorah (0754290F) : 0941711Z [R2_siren] ; 0941943B [R2_siren] ; 0951048Y [R2_siren]
- Collège privé Heikhal Menahem Sinaï (0755029J) : 0753231E [R2_siren] ; 0923051S [R2_siren]
- Collège Jeanne d'Arc-Saint-Aspais (0771925Z) : 0771232W [R2_siren]
- Collège de la Pyramide (0772429X) : 0772586T [R3_adresse]
- Collège privé Père Jacques (0772650M) : 0911551S [R2_siren] ; 0920981S [R2_siren] ; 0922688X [R2_siren] ; 0940853S [R2_siren] ; 0950805J [R2_siren]
- Collège privé Oneschool Global Paris Campus (0772740K) : 0772886U [R3_adresse]
- Collège Le Rondeau (0780846W) : 0782549X [R3_adresse]
- Collège Saint-Érembert (0781589D) : 0781856U [R1_cite_scolaire:07815, R2_siren, R3_adresse] ; 0950762M [R2_siren]
- Collège Notre-Dame (0781590E) : 0783537W [R1_cite_scolaire:07808, R2_siren]
- Collège Notre-Dame (0781620M) : 0783835V [R2_siren]
- Ecole secondaire privée sports Académy le Mesnil (0783764T) : 0942365K [R2_siren]
- Collège privé Saint-Thomas de Villeneuve (0783816Z) : 0781581V [R2_siren, R3_adresse]
- Collège Les Châtaigniers (0783838Y) : 0782100J [R2_siren, R3_adresse]
- Collège Saint-Spire (0910829G) : 0912546Y [R2_siren]
- Collège Jean Lurçat (0911025V) : 0911578W [R3_adresse]
- Collège Montesquieu (0911444A) : 0911254U [R3_adresse]
- Collège Saint-Nicolas (0911824N) : 0910831J [R3_adresse]
- Collège Saint-Spire Sénart (0912547Z) : 0912161E [R2_siren]
- Collège Albert Camus (0921779J) : 0920132U [R3_adresse]
- Collège Passy Saint-Nicolas Buzenval (0921915G) : 0921932A [R1_cite_scolaire:09229, R2_siren, R3_adresse]
- Collège Saint-Philippe (0922340U) : 0922688X [R2_siren, R3_adresse] ; 0753217P [R2_siren] ; 0911551S [R2_siren] ; 0940853S [R2_siren] ; 0950805J [R2_siren]
- Collège privé Beth Hilel (0922751R) : 0753231E [R2_siren] ; 0755025E [R2_siren]
- Collège Françoise Cabrini (0931705Y) : 0931369H [R2_siren, R3_adresse]
- Collège Merkaz Hatorah Garçons (0931855L) : 0932303Y [R2_siren]
- Collège Merkaz Hatorah Filles (0932302X) : 0931464L [R2_siren]
- Collège Saint-Vincent-de-Paul (0932586F) : 0930946Y [R3_adresse]
- Collège Ozar Hatorah Filles (0941614U) : 0754479L [R2_siren] ; 0941943B [R2_siren] ; 0951048Y [R2_siren]
- Collège Saint-Michel (0941715D) : 0753897D [R2_siren]
- Collège Poullart des Places (0941891V) : 0911551S [R2_siren] ; 0920981S [R2_siren] ; 0922688X [R2_siren] ; 0940853S [R2_siren] ; 0950805J [R2_siren]
- Collège Ozar Hatorah Garçons (0941942A) : 0754479L [R2_siren] ; 0941711Z [R2_siren] ; 0951048Y [R2_siren]
- Collège privé Sports études de Paris (SEDP) (0942366L) : 0783765U [R2_siren]
- Collège Saint-Pie X (Fondation d'Auteuil) (0951220K) : 0911551S [R2_siren] ; 0920981S [R2_siren] ; 0922688X [R2_siren] ; 0940853S [R2_siren] ; 0950805J [R2_siren]
- Collège Anna de Noailles (0951357J) : 0950647M [R3_adresse]
- Collège Saint-Martin de France (0951507X) : 0783286Y [R2_siren] ; 0781856U [R2_siren]
- Collège Torat Emet (0951682M) : 0754479L [R2_siren] ; 0941711Z [R2_siren] ; 0941943B [R2_siren] ; 0952134D [R3_adresse]
- Collège ORT (0951916S) : 0931796X [R2_siren] ; 0930960N [R2_siren]
- Ecole secondaire privée Beth Yaacov (0952133C) : 0951048Y [R3_adresse]
- Collège Saint-Jean (0952136F) : 0753217P [R2_siren] ; 0911551S [R2_siren] ; 0920981S [R2_siren] ; 0922688X [R2_siren] ; 0940853S [R2_siren] ; 0952157D [R3_adresse]
- Ecole secondaire privée Torah Or (0952222Z) : 0952273E [R3_adresse]

## 10. Lycées de secteur 1 (Affelnet Paris)

4520 lignes ArcGIS. 113/114 collèges publics parisiens avec une liste (113 non vides). Absents de la carte : Collège Rognoni – École des enfants du spectacle (0750407K).

- Collège Claude Chappe : Lycée Colbert, Lycée Henri Bergson (enseignement supérieur), Lycée polyvalent Diderot, Lycée Sophie Germain, Lycée Turgot
- Collège Beaumarchais : Lycée Arago, Lycée Charlemagne, Lycée Colbert, Lycée Sophie Germain, Lycée Voltaire
- Collège Pierre Jean de Béranger : Lycée Arago, Lycée Charlemagne, Lycée polyvalent Diderot, Lycée polyvalent S Weil site François Truffaut, Lycée Voltaire
- Collège Roland Dorgelès : Lycée Alphonse de Lamartine, Lycée Chaptal, Lycée Jacques Decour, Lycée Jules Ferry, Lycée polyvalent Edgar Quinet
- Collège Georges Courteline : Lycée Charlemagne, Lycée Hélène Boucher, Lycée Maurice Ravel, Lycée Paul Valéry, Lycée polyvalent Dorian
- Collège Alberto Giacometti : Lycée Buffon, Lycée Camille Sée, Lycée Émile Dubois, Lycée Montaigne, Lycée Victor Duruy
- Collège Lucie Aubrac : Lycée Charlemagne, Lycée Colbert, Lycée Henri Bergson (enseignement supérieur), Lycée Victor Hugo, Lycée Voltaire
- Collège Jean Baptiste Clément : Lycée Colbert, Lycée Hélène Boucher, Lycée Maurice Ravel, Lycée Turgot, Lycée Voltaire
- Collège Mozart : Lycée Alphonse de Lamartine, Lycée Colbert, Lycée Henri Bergson (enseignement supérieur), Lycée Jules Ferry, Lycée polyvalent Diderot
- Collège Georges Brassens : Lycée Alphonse de Lamartine, Lycée Fénelon, Lycée Henri Bergson (enseignement supérieur), Lycée polyvalent Diderot, Lycée Turgot
- Collège Moulin des Prés : Lycée Buffon, Lycée Claude Monet, Lycée Gabriel Fauré, Lycée Paul Bert, Lycée Rodin
- Collège Georges Clemenceau : Lycée Alphonse de Lamartine, Lycée Chaptal, Lycée Colbert, Lycée Jacques Decour, Lycée Jules Ferry
- Collège Lucie Faure : Lycée Arago, Lycée Hélène Boucher, Lycée Maurice Ravel, Lycée Paul Valéry, Lycée polyvalent Dorian
- Collège Françoise Dolto : Lycée Hélène Boucher, Lycée Henri Bergson (enseignement supérieur), Lycée polyvalent S Weil site François Truffaut, Lycée Sophie Germain, Lycée Voltaire
- Collège Sonia Delaunay : Lycée Alphonse de Lamartine, Lycée Chaptal, Lycée Colbert, Lycée Fénelon, Lycée Henri Bergson (enseignement supérieur)
- Collège Valmy : Lycée Colbert, Lycée Fénelon, Lycée Henri Bergson (enseignement supérieur), Lycée Turgot, Lycée Voltaire
- Collège Henri Matisse : Lycée Arago, Lycée Hélène Boucher, Lycée Maurice Ravel, Lycée Paul Valéry, Lycée polyvalent Dorian
- Collège Alain Fournier : Lycée polyvalent Dorian, Lycée polyvalent S Weil site François Truffaut, Lycée Sophie Germain, Lycée Turgot, Lycée Voltaire
- Collège Anne Frank : Lycée Arago, Lycée Hélène Boucher, Lycée polyvalent Dorian, Lycée polyvalent S Weil site François Truffaut, Lycée Victor Hugo
- Collège Paul Verlaine : Lycée Arago, Lycée Maurice Ravel, Lycée polyvalent Dorian, Lycée Sophie Germain, Lycée Victor Hugo
- Collège Jules Verne : Lycée Arago, Lycée Maurice Ravel, Lycée Paul Valéry, Lycée polyvalent Dorian, Lycée Victor Hugo
- Collège Jean Moulin : Lycée Émile Dubois, Lycée Lavoisier, Lycée Montaigne, Lycée Paul Bert, Lycée Victor Duruy
- Collège Madame de Staël : Lycée Buffon, Lycée Camille Sée, Lycée Janson de Sailly, Lycée Rodin, Lycée Victor Duruy
- Collège Jean Baptiste Poquelin : Lycée Alphonse de Lamartine, Lycée Charlemagne, Lycée Colbert, Lycée Jacques Decour, Lycée Sophie Germain
- Collège Alphonse Daudet : Lycée Émile Dubois, Lycée Lavoisier, Lycée Montaigne, Lycée Paul Bert, Lycée Victor Duruy
- Collège Charles Péguy : Lycée Alphonse de Lamartine, Lycée Hélène Boucher, Lycée Henri Bergson (enseignement supérieur), Lycée polyvalent Diderot, Lycée Sophie Germain
- Collège Édouard Pailleron : Lycée Chaptal, Lycée Colbert, Lycée Henri Bergson (enseignement supérieur), Lycée polyvalent Diderot, Lycée Turgot
- Collège Pierre Alviset : Lycée Charlemagne, Lycée Émile Dubois, Lycée Montaigne, Lycée Rodin, Lycée Sophie Germain
- Collège Condorcet : Lycée Chaptal, Lycée Colbert, Lycée Condorcet, Lycée polyvalent Edgar Quinet, Lycée Racine
- Collège Maurice Utrillo : Lycée Alphonse de Lamartine, Lycée Carnot, Lycée Colbert, Lycée international de Paris Honoré de Balzac, Lycée Jacques Decour
- Collège Pierre de Ronsard : Lycée Carnot, Lycée Chaptal, Lycée international de Paris Honoré de Balzac, Lycée Jacques Decour, Lycée polyvalent Edgar Quinet
- Collège Yvonne le Tac : Lycée Carnot, Lycée Jacques Decour, Lycée Jules Ferry, Lycée polyvalent Edgar Quinet, Lycée Racine
- Collège Raymond Queneau : Lycée Émile Dubois, Lycée Lavoisier, Lycée Montaigne, Lycée Paul Bert, Lycée Rodin
- Collège Jacques Prévert : Lycée Camille Sée, Lycée Fénelon, Lycée Montaigne, Lycée Paul Bert, Lycée Victor Duruy
- Collège Guy Flavien : Lycée Arago, Lycée Hélène Boucher, Lycée Maurice Ravel, Lycée Paul Valéry, Lycée polyvalent Dorian
- Collège Guillaume Apollinaire : Lycée Buffon, Lycée Janson de Sailly, Lycée Jean de La Fontaine, Lycée Jean-Baptiste Say, Lycée Victor Duruy
- Collège Georges Duhamel : Lycée Buffon, Lycée Camille Sée, Lycée Paul Bert, Lycée Rodin, Lycée Victor Duruy
- Collège Gérard Philipe : Lycée Alphonse de Lamartine, Lycée Condorcet, Lycée international de Paris Honoré de Balzac, Lycée Jacques Decour, Lycée Racine
- Collège Marx Dormoy : Lycée Chaptal, Lycée Colbert, Lycée Jacques Decour, Lycée polyvalent Edgar Quinet, Lycée Racine
- Collège Pierre Mendès-France : Lycée Arago, Lycée Hélène Boucher, Lycée Maurice Ravel, Lycée polyvalent Diderot, Lycée Voltaire
- Collège César Franck : Lycée Charlemagne, Lycée polyvalent S Weil site François Truffaut, Lycée Turgot, Lycée Victor Hugo, Lycée Voltaire
- Collège Jules Romains : Lycée Buffon, Lycée Camille Sée, Lycée Molière, Lycée Paul Bert, Lycée Victor Duruy
- Collège Paul Gauguin : Lycée Alphonse de Lamartine, Lycée Carnot, Lycée Jacques Decour, Lycée polyvalent Edgar Quinet, Lycée Racine
- Collège Louise Michel : Lycée Alphonse de Lamartine, Lycée Colbert, Lycée Jacques Decour, Lycée polyvalent Diderot, Lycée Victor Hugo
- Collège Hector Berlioz : Lycée Condorcet, Lycée international de Paris Honoré de Balzac, Lycée Jacques Decour, Lycée Jules Ferry, Lycée Racine
- Collège George Sand : Lycée Buffon, Lycée Claude Monet, Lycée Gabriel Fauré, Lycée Paul Bert, Lycée Rodin
- Collège Claude Debussy : Lycée Buffon, Lycée Camille Sée, Lycée Claude Bernard, Lycée Molière, Lycée Victor Duruy
- Collège Modigliani : Lycée Buffon, Lycée Camille Sée, Lycée Émile Dubois, Lycée Jean-Baptiste Say, Lycée Victor Duruy
- Collège Antoine Coysevox : Lycée Condorcet, Lycée international de Paris Honoré de Balzac, Lycée Jacques Decour, Lycée Jules Ferry, Lycée Racine
- Collège Elsa Triolet : Lycée Buffon, Lycée Claude Monet, Lycée Gabriel Fauré, Lycée Lavoisier, Lycée Montaigne
- Collège André Malraux : Lycée Alphonse de Lamartine, Lycée Carnot, Lycée Condorcet, Lycée Janson de Sailly, Lycée polyvalent Edgar Quinet
- Collège Montgolfier : Lycée Lavoisier, Lycée polyvalent S Weil site François Truffaut, Lycée Sophie Germain, Lycée Turgot, Lycée Voltaire
- Collège Victor Hugo : Lycée Fénelon, Lycée polyvalent S Weil site François Truffaut, Lycée Sophie Germain, Lycée Victor Hugo, Lycée Voltaire
- Collège Charlemagne : Lycée Charlemagne, Lycée polyvalent S Weil site François Truffaut, Lycée Sophie Germain, Lycée Victor Hugo, Lycée Voltaire
- Collège Henri IV : Lycée Charlemagne, Lycée Fénelon, Lycée Lavoisier, Lycée Paul Bert, Lycée Rodin
- Collège Montaigne : Lycée Camille Sée, Lycée Fénelon, Lycée Lavoisier, Lycée Montaigne, Lycée Paul Bert
- Collège Victor Duruy : Lycée Buffon, Lycée Camille Sée, Lycée Montaigne, Lycée Paul Bert, Lycée Victor Duruy
- Collège Chaptal : Lycée Carnot, Lycée Chaptal, Lycée Jacques Decour, Lycée Janson de Sailly, Lycée polyvalent Edgar Quinet
- Collège Octave Gréard : Lycée Carnot, Lycée Chaptal, Lycée Jacques Decour, Lycée polyvalent Edgar Quinet, Lycée Racine
- Collège Lavoisier : Lycée Fénelon, Lycée Lavoisier, Lycée Montaigne, Lycée Paul Bert, Lycée Rodin
- Collège Jacques Decour : Lycée Carnot, Lycée Chaptal, Lycée Jacques Decour, Lycée Jules Ferry, Lycée polyvalent Edgar Quinet
- Collège Jules Ferry : Lycée Chaptal, Lycée Colbert, Lycée Condorcet, Lycée Jacques Decour, Lycée Jules Ferry
- Collège Alphonse de Lamartine : Lycée Alphonse de Lamartine, Lycée Colbert, Lycée Condorcet, Lycée Jacques Decour, Lycée Racine
- Collège Voltaire : Lycée Charlemagne, Lycée Colbert, Lycée polyvalent Dorian, Lycée Turgot, Lycée Voltaire
- Collège Paul Valéry : Lycée Hélène Boucher, Lycée Maurice Ravel, Lycée Paul Valéry, Lycée polyvalent Dorian, Lycée Victor Hugo
- Collège Rodin : Lycée Claude Monet, Lycée Gabriel Fauré, Lycée Lavoisier, Lycée Paul Bert, Lycée Rodin
- Collège Claude Monet : Lycée Claude Monet, Lycée Gabriel Fauré, Lycée Paul Bert, Lycée Rodin, Lycée Sophie Germain
- Collège Gabriel Fauré : Lycée Charlemagne, Lycée Claude Monet, Lycée Gabriel Fauré, Lycée Paul Valéry, Lycée Rodin
- Collège Jean-François Oeben : Lycée Arago, Lycée Maurice Ravel, Lycée Paul Valéry, Lycée polyvalent S Weil site François Truffaut, Lycée Victor Hugo
- Collège Paul Bert : Lycée Émile Dubois, Lycée Lavoisier, Lycée Montaigne, Lycée Paul Bert, Lycée Rodin
- Collège François Villon : Lycée Buffon, Lycée Camille Sée, Lycée Émile Dubois, Lycée Paul Bert, Lycée Victor Duruy
- Collège Buffon : Lycée Buffon, Lycée Camille Sée, Lycée Paul Bert, Lycée Rodin, Lycée Victor Duruy
- Collège Camille Sée : Lycée Buffon, Lycée Camille Sée, Lycée Claude Bernard, Lycée Jean-Baptiste Say, Lycée Molière
- Collège Claude Bernard : Lycée Claude Bernard, Lycée Janson de Sailly, Lycée Jean de La Fontaine, Lycée Jean-Baptiste Say, Lycée Molière
- Collège Janson de Sailly : Lycée Claude Bernard, Lycée Janson de Sailly, Lycée Jean de La Fontaine, Lycée Jean-Baptiste Say, Lycée Molière
- Collège Jean-Baptiste Say : Lycée Claude Bernard, Lycée Janson de Sailly, Lycée Jean de La Fontaine, Lycée Jean-Baptiste Say, Lycée Molière
- Collège Jean de La Fontaine : Lycée Claude Bernard, Lycée Janson de Sailly, Lycée Jean de La Fontaine, Lycée Jean-Baptiste Say, Lycée Molière
- Collège Molière : Lycée Claude Bernard, Lycée Janson de Sailly, Lycée Jean de La Fontaine, Lycée Jean-Baptiste Say, Lycée Molière
- Collège Carnot : Lycée Carnot, Lycée Chaptal, Lycée international de Paris Honoré de Balzac, Lycée Janson de Sailly, Lycée polyvalent Edgar Quinet
- Collège Honoré de Balzac : Lycée international de Paris Honoré de Balzac, Lycée Janson de Sailly, Lycée Jules Ferry, Lycée polyvalent Edgar Quinet, Lycée Racine
- Collège Stéphane Mallarmé : Lycée Carnot, Lycée international de Paris Honoré de Balzac, Lycée Jules Ferry, Lycée polyvalent Edgar Quinet, Lycée Racine
- Collège Henri Bergson : Lycée Chaptal, Lycée Colbert, Lycée Henri Bergson (enseignement supérieur), Lycée polyvalent Diderot, Lycée Turgot
- Collège Hélène Boucher : Lycée Arago, Lycée Hélène Boucher, Lycée Paul Valéry, Lycée polyvalent Dorian, Lycée Victor Hugo
- Collège Maurice Ravel : Lycée Arago, Lycée Maurice Ravel, Lycée Paul Valéry, Lycée polyvalent Dorian, Lycée Sophie Germain
- Collège Georges Méliès : Lycée Alphonse de Lamartine, Lycée Colbert, Lycée Henri Bergson (enseignement supérieur), Lycée Jacques Decour, Lycée Jules Ferry
- Collège François Couperin : Lycée Charlemagne, Lycée Lavoisier, Lycée polyvalent S Weil site François Truffaut, Lycée Sophie Germain, Lycée Voltaire
- Collège Camille Claudel : Lycée Claude Monet, Lycée Gabriel Fauré, Lycée Lavoisier, Lycée Paul Valéry, Lycée Rodin
- Collège Guillaume Budé : Lycée Colbert, Lycée Henri Bergson (enseignement supérieur), Lycée polyvalent Diderot, Lycée Sophie Germain, Lycée Turgot
- Collège Léon Gambetta : Lycée Hélène Boucher, Lycée Henri Bergson (enseignement supérieur), Lycée Maurice Ravel, Lycée Turgot, Lycée Voltaire
- Collège Bernard Palissy : Lycée Alphonse de Lamartine, Lycée Fénelon, Lycée Lavoisier, Lycée polyvalent Edgar Quinet, Lycée Turgot
- Collège Georges Braque : Lycée Claude Monet, Lycée Émile Dubois, Lycée Gabriel Fauré, Lycée Lavoisier, Lycée Rodin
- Collège Boris Vian : Lycée Carnot, Lycée Chaptal, Lycée international de Paris Honoré de Balzac, Lycée Janson de Sailly, Lycée Jules Ferry
- Collège Flora Tristan : Lycée Arago, Lycée Hélène Boucher, Lycée Maurice Ravel, Lycée polyvalent Diderot, Lycée Voltaire
- Collège la Grange aux Belles : Lycée Alphonse de Lamartine, Lycée Chaptal, Lycée Colbert, Lycée Fénelon, Lycée Voltaire
- Collège Edmond Michelet : Lycée Alphonse de Lamartine, Lycée Colbert, Lycée Condorcet, Lycée Henri Bergson (enseignement supérieur), Lycée Racine
- Collège Gustave Flaubert : Lycée Claude Monet, Lycée Gabriel Fauré, Lycée Paul Valéry, Lycée Rodin, Lycée Sophie Germain
- Collège Germaine Tillion : Lycée Hélène Boucher, Lycée Maurice Ravel, Lycée Paul Valéry, Lycée polyvalent Dorian, Lycée Sophie Germain
- Collège Évariste Galois : Lycée Charlemagne, Lycée Claude Monet, Lycée Émile Dubois, Lycée Gabriel Fauré, Lycée Rodin
- Collège Georges Rouault : Lycée Colbert, Lycée Hélène Boucher, Lycée Henri Bergson (enseignement supérieur), Lycée Maurice Ravel, Lycée polyvalent Diderot
- Collège Jean Perrin : Lycée Arago, Lycée Hélène Boucher, Lycée Maurice Ravel, Lycée Paul Valéry, Lycée polyvalent Dorian
- Collège Saint-Exupéry : Lycée Émile Dubois, Lycée Lavoisier, Lycée Montaigne, Lycée Paul Bert, Lycée Rodin
- Collège André Citroën : Lycée Buffon, Lycée Camille Sée, Lycée Jean de La Fontaine, Lycée Jean-Baptiste Say, Lycée Molière
- Collège Robert Doisneau : Lycée Arago, Lycée Charlemagne, Lycée polyvalent Dorian, Lycée Turgot, Lycée Voltaire
- Collège Pilâtre de Rozier : Lycée Arago, Lycée Hélène Boucher, Lycée Maurice Ravel, Lycée Paul Valéry, Lycée Voltaire
- Collège Marie Curie : Lycée Alphonse de Lamartine, Lycée Condorcet, Lycée international de Paris Honoré de Balzac, Lycée Jacques Decour, Lycée Racine
- Collège Thomas Mann : Lycée Arago, Lycée Claude Monet, Lycée Fénelon, Lycée Gabriel Fauré, Lycée Paul Valéry
- Collège Daniel Mayer : Lycée Alphonse de Lamartine, Lycée Colbert, Lycée Condorcet, Lycée Jacques Decour, Lycée Jules Ferry
- Collège Edgar Varèse : Lycée Alphonse de Lamartine, Lycée Colbert, Lycée Fénelon, Lycée polyvalent Diderot, Lycée Turgot
- Collège Colette Besson : Lycée Charlemagne, Lycée Colbert, Lycée Hélène Boucher, Lycée Victor Hugo, Lycée Voltaire
- Collège Aimé Césaire : Lycée Chaptal, Lycée Colbert, Lycée Condorcet, Lycée Jacques Decour, Lycée Jules Ferry
- Collège Suzanne Lacore Paris Nord Est : Lycée Alphonse de Lamartine, Lycée Colbert, Lycée Condorcet, Lycée international de Paris Honoré de Balzac, Lycée polyvalent Diderot
- Collège Françoise Seligmann : Lycée Colbert, Lycée Henri Bergson (enseignement supérieur), Lycée Jules Ferry, Lycée Turgot, Lycée Voltaire
- Collège La Rose blanche : Lycée Carnot, Lycée Condorcet, Lycée international de Paris Honoré de Balzac, Lycée polyvalent Edgar Quinet, Lycée Racine

## 11. Secteurs parisiens (jointure par nom)

110 secteurs publiés, 113 noms de collèges. 113/114 collèges publics parisiens associés à un secteur.
Collèges publics parisiens sans secteur : Collège Rognoni – École des enfants du spectacle (0750407K) (Rognoni n'a pas de secteur : recrutement sur dossier).
Secteurs non reliés à un collège : aucun. Noms publiés sans collège : aucun. Noms ambigus : 0.

| Secteur | Nom publié | Collège | Méthode | Adresse concordante |
|---|---|---|---|---|
| SONIA DELAUNAY | SONIA DELAUNAY | Collège Sonia Delaunay | exact | oui |
| CARNOT | CARNOT | Collège Carnot | exact | oui |
| JEAN-BAPTISTE CLEMENT | JEAN-BAPTISTE CLEMENT | Collège Jean Baptiste Clément | exact | oui |
| JEAN-BAPTISTE POQUELIN | JEAN-BAPTISTE POQUELIN | Collège Jean Baptiste Poquelin | exact | — |
| CLAUDE DEBUSSY | CLAUDE DEBUSSY | Collège Claude Debussy | exact | oui |
| JACQUES PREVERT | JACQUES PREVERT | Collège Jacques Prévert | exact | — |
| SUZANNE LACORE | SUZANNE LACORE | Collège Suzanne Lacore Paris Nord Est | inclusion | oui |
| EDMOND MICHELET | EDMOND MICHELET | Collège Edmond Michelet | exact | oui |
| LAVOISIER | LAVOISIER | Collège Lavoisier | exact | — |
| ALPHONSE DAUDET | ALPHONSE DAUDET | Collège Alphonse Daudet | exact | oui |
| CLAUDE CHAPPE | CLAUDE CHAPPE | Collège Claude Chappe | exact | oui |
| GABRIEL FAURE | GABRIEL FAURE | Collège Gabriel Fauré | exact | oui |
| GUILLAUME BUDE | GUILLAUME BUDE | Collège Guillaume Budé | exact | oui |
| GUILLAUME APOLLINAIRE | GUILLAUME APOLLINAIRE | Collège Guillaume Apollinaire | exact | oui |
| LA GRANGE AUX BELLES | LA GRANGE AUX BELLES | Collège la Grange aux Belles | exact | oui |
| ANNE FRANK | ANNE FRANK | Collège Anne Frank | exact | oui |
| JEAN-BAPTISTE SAY | JEAN-BAPTISTE SAY | Collège Jean-Baptiste Say | exact | oui |
| MARX DORMOY | MARX DORMOY | Collège Marx Dormoy | exact | oui |
| SMC BERGSON / PAILLERON | HENRI BERGSON | Collège Henri Bergson | exact | oui |
| SMC BERGSON / PAILLERON | EDOUARD PAILLERON | Collège Édouard Pailleron | exact | ⚠️ non |
| GEORGES COURTELINE | GEORGES COURTELINE | Collège Georges Courteline | exact | ⚠️ non |
| GEORGE SAND | GEORGE SAND | Collège George Sand | exact | oui |
| GUSTAVE FLAUBERT | GUSTAVE FLAUBERT | Collège Gustave Flaubert | exact | ⚠️ non |
| MADAME DE STAEL | MADAME DE STAEL | Collège Madame de Staël | exact | oui |
| PAUL GAUGUIN | PAUL GAUGUIN | Collège Paul Gauguin | exact | — |
| GEORGES CLEMENCEAU | GEORGES CLEMENCEAU | Collège Georges Clemenceau | exact | oui |
| ROBERT DOISNEAU | ROBERT DOISNEAU | Collège Robert Doisneau | exact | oui |
| ST EXUPERY | ST EXUPERY | Collège Saint-Exupéry | exact | oui |
| GEORGES BRAQUE | GEORGES BRAQUE | Collège Georges Braque | exact | oui |
| GEORGES DUHAMEL | GEORGES DUHAMEL | Collège Georges Duhamel | exact | oui |
| LUCIE ET RAYMOND AUBRAC | LUCIE ET RAYMOND AUBRAC | Collège Lucie Aubrac | inclusion | oui |
| DANIEL MAYER | DANIEL MAYER | Collège Daniel Mayer | exact | oui |
| COLETTE BESSON | COLETTE BESSON | Collège Colette Besson | exact | oui |
| GUY FLAVIEN | GUY FLAVIEN | Collège Guy Flavien | exact | oui |
| AMEDEO MODIGLIANI | AMEDEO MODIGLIANI | Collège Modigliani | inclusion | oui |
| MONTGOLFIER | MONTGOLFIER | Collège Montgolfier | exact | — |
| PIERRE JEAN DE BERANGER | PIERRE JEAN DE BERANGER | Collège Pierre Jean de Béranger | exact | — |
| BEAUMARCHAIS | BEAUMARCHAIS | Collège Beaumarchais | exact | oui |
| MAURICE RAVEL | MAURICE RAVEL | Collège Maurice Ravel | exact | oui |
| ALBERTO GIACOMETTI | ALBERTO GIACOMETTI | Collège Alberto Giacometti | exact | oui |
| STEPHANE MALLARME | STEPHANE MALLARME | Collège Stéphane Mallarmé | exact | oui |
| CHAPTAL | CHAPTAL | Collège Chaptal | exact | — |
| PIERRE ALVISET | PIERRE ALVISET | Collège Pierre Alviset | exact | — |
| LEON GAMBETTA | LEON GAMBETTA | Collège Léon Gambetta | exact | oui |
| RAYMOND QUENEAU | RAYMOND QUENEAU | Collège Raymond Queneau | exact | — |
| BUFFON | BUFFON | Collège Buffon | exact | oui |
| JANSON DE SAILLY | JANSON DE SAILLY | Collège Janson de Sailly | exact | oui |
| JEAN DE LA FONTAINE | JEAN DE LA FONTAINE | Collège Jean de La Fontaine | exact | oui |
| MAURICE UTRILLO | MAURICE UTRILLO | Collège Maurice Utrillo | exact | ⚠️ non |
| FRANCOIS COUPERIN | FRANCOIS COUPERIN | Collège François Couperin | exact | — |
| SMC CURIE / PHILIPPE | MARIE CURIE | Collège Marie Curie | exact | ⚠️ non |
| SMC CURIE / PHILIPPE | GERARD PHILIPE | Collège Gérard Philipe | exact | oui |
| FLORA TRISTAN | FLORA TRISTAN | Collège Flora Tristan | exact | oui |
| HENRI MATISSE | HENRI MATISSE | Collège Henri Matisse | exact | oui |
| EVARISTE GALOIS | EVARISTE GALOIS | Collège Évariste Galois | exact | oui |
| ELSA TRIOLET | ELSA TRIOLET | Collège Elsa Triolet | exact | oui |
| JULES VERNE | JULES VERNE | Collège Jules Verne | exact | oui |
| MOULIN DES PRES | MOULIN DES PRES | Collège Moulin des Prés | exact | oui |
| LAMARTINE | LAMARTINE | Collège Alphonse de Lamartine | inclusion | — |
| BERNARD PALISSY | BERNARD PALISSY | Collège Bernard Palissy | exact | oui |
| VOLTAIRE | VOLTAIRE | Collège Voltaire | exact | oui |
| AIME CESAIRE | AIME CESAIRE | Collège Aimé Césaire | exact | ⚠️ non |
| EDGAR VARESE | EDGAR VARESE | Collège Edgar Varèse | exact | oui |
| GEORGES BRASSENS | GEORGES BRASSENS | Collège Georges Brassens | exact | oui |
| ANDRE MALRAUX | ANDRE MALRAUX | Collège André Malraux | exact | oui |
| ANDRE CITROEN | ANDRE CITROEN | Collège André Citroën | exact | oui |
| HELENE BOUCHER | HELENE BOUCHER | Collège Hélène Boucher | exact | oui |
| ROLAND DORGELES | ROLAND DORGELES | Collège Roland Dorgelès | exact | oui |
| FRANCOISE DOLTO | FRANCOISE DOLTO | Collège Françoise Dolto | exact | oui |
| PAUL BERT | PAUL BERT | Collège Paul Bert | exact | oui |
| CAMILLE CLAUDEL | CAMILLE CLAUDEL | Collège Camille Claudel | exact | oui |
| HENRI IV | HENRI IV | Collège Henri IV | exact | — |
| JULES ROMAINS | JULES ROMAINS | Collège Jules Romains | exact | — |
| GEORGES ROUAULT | GEORGES ROUAULT | Collège Georges Rouault | exact | oui |
| MONTAIGNE | MONTAIGNE | Collège Montaigne | exact | — |
| PAUL VALERY | PAUL VALERY | Collège Paul Valéry | exact | oui |
| PAUL VERLAINE | PAUL VERLAINE | Collège Paul Verlaine | exact | oui |
| VICTOR HUGO | VICTOR HUGO | Collège Victor Hugo | exact | — |
| CLAUDE BERNARD | CLAUDE BERNARD | Collège Claude Bernard | exact | oui |
| SMC BERLIOZ / COYSEVOX | HECTOR BERLIOZ | Collège Hector Berlioz | exact | oui |
| SMC BERLIOZ / COYSEVOX | ANTOINE COYSEVOX | Collège Antoine Coysevox | exact | oui |
| JEAN PERRIN | JEAN PERRIN | Collège Jean Perrin | exact | oui |
| JEAN MOULIN | JEAN MOULIN | Collège Jean Moulin | exact | oui |
| PIERRE DE RONSARD | PIERRE DE RONSARD | Collège Pierre de Ronsard | exact | oui |
| ROSE BLANCHE | ROSE BLANCHE | Collège La Rose blanche | inclusion | ⚠️ non |
| JEAN FRANCOIS OEBEN | JEAN FRANCOIS OEBEN | Collège Jean-François Oeben | exact | ⚠️ non |
| CAMILLE SEE | CAMILLE SEE | Collège Camille Sée | exact | oui |
| JACQUES DECOUR | JACQUES DECOUR | Collège Jacques Decour | exact | — |
| PIERRE MENDES FRANCE | PIERRE MENDES FRANCE | Collège Pierre Mendès-France | exact | oui |
| GEORGES MELIES | GEORGES MELIES | Collège Georges Méliès | exact | ⚠️ non |
| GERMAINE TILLION | GERMAINE TILLION | Collège Germaine Tillion | exact | oui |
| MOLIERE | MOLIERE | Collège Molière | exact | oui |
| LUCIE FAURE | LUCIE FAURE | Collège Lucie Faure | exact | oui |
| BORIS VIAN | BORIS VIAN | Collège Boris Vian | exact | oui |
| CHARLES PEGUY | CHARLES PEGUY | Collège Charles Péguy | exact | oui |
| MOZART | MOZART | Collège Mozart | exact | oui |
| JULES FERRY | JULES FERRY | Collège Jules Ferry | exact | — |
| FRANCOIS VILLON | FRANCOIS VILLON | Collège François Villon | exact | oui |
| HONORE DE BALZAC | HONORE DE BALZAC | Collège Honoré de Balzac | exact | oui |
| AUGUSTE RODIN | AUGUSTE RODIN | Collège Rodin | inclusion | oui |
| CLAUDE MONET | CLAUDE MONET | Collège Claude Monet | exact | oui |
| VICTOR DURUY | VICTOR DURUY | Collège Victor Duruy | exact | — |
| FRANCOISE SELIGMAN | FRANCOISE SELIGMAN | Collège Françoise Seligmann | approchant | ⚠️ non |
| VALMY | VALMY | Collège Valmy | exact | oui |
| LOUISE MICHEL | LOUISE MICHEL | Collège Louise Michel | exact | oui |
| CHARLEMAGNE | CHARLEMAGNE | Collège Charlemagne | exact | — |
| ALAIN FOURNIER | ALAIN FOURNIER | Collège Alain Fournier | exact | oui |
| PILATRE DE ROZIER | PILATRE DE ROZIER | Collège Pilâtre de Rozier | exact | oui |
| YVONNE LE TAC | YVONNE LE TAC | Collège Yvonne le Tac | exact | oui |
| OCTAVE GREARD | OCTAVE GREARD | Collège Octave Gréard | exact | — |
| CONDORCET | CONDORCET | Collège Condorcet | exact | — |
| THOMAS MANN | THOMAS MANN | Collège Thomas Mann | exact | oui |
| CESAR FRANCK | CESAR FRANCK | Collège César Franck | exact | — |

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

## 12. Carte scolaire nationale (plages d’adresses)

78124 lignes après normalisation des voies, 281 doublons retirés, 0 lignes écartées (sans UAI ou commune hors des départements). 1281 communes, 908 collèges. Une ligne sans voie (« secteur unique ») couvre toute la commune, ou le reste de la commune quand d'autres lignes listent des voies. Publié : un fichier par département hors Paris.

| Département | Communes | Lignes | Lignes sans voie | Communes à secteur unique | Tronçons partagés | Collèges publics absents (commune présente) |
|---|---|---|---|---|---|---|
| 75 | 20 | 12729 | 0 | 0 | 399 | 1 |
| 77 | 507 | 9565 | 473 | 472 | 1 | 0 |
| 78 | 261 | 9586 | 226 | 225 | 2 | 3 |
| 91 | 196 | 8754 | 166 | 160 | 115 | 0 |
| 92 | 36 | 8775 | 1 | 1 | 4 | 1 |
| 93 | 29 | 10409 | 0 | 0 | 50 | 0 |
| 94 | 47 | 8741 | 15 | 15 | 128 | 1 |
| 95 | 185 | 9565 | 154 | 153 | 2 | 0 |

Collèges publics absents de la carte alors que leur commune y figure (6) : Collège Rognoni – École des enfants du spectacle (0750407K), Maison de la Légion d'Honneur (0783122V), Collège franco-allemand (0783546F), Collège international (0783547G), Ecole de danse de l'Opéra de Paris (0922579D), Collège Ovide Decroly (0940024R).
Communes du périmètre absentes de la carte (9) : Le Bourget (93013, déduit : Collège Didier Daurat), Dugny (93030, déduit : Collège Jean-Baptiste Clément), Gournay-sur-Marne (93033, déduit : Collège Eugène Carrière), L'Ile-Saint-Denis (93039, déduit : Collège Alfred Sisley), Les Lilas (93045, déduit : Collège Marie Curie), Neuilly-Plaisance (93049, déduit : Collège Jean Moulin), Le Pré-Saint-Gervais (93061, déduit : Collège Jean-Jacques Rousseau), Le Raincy (93062, déduit : Collège Jean-Baptiste Corot), Vaujours (93074, déduit : Collège Henri IV). Une commune sans aucun collège et absente de la carte (Coubron) n'apparaît pas ici : son secteur est inconnu.
UAI de la carte hors périmètre (2) : 0280001Z, 0510026B.
Lignes rattachées à un collège d'une autre commune : 5370.
Plages « toute la voie » (1–9999) : 64269/78124 ; `debut`/`fin` sont publiés tels quels (9999 = jusqu'au bout de la voie).

Contrôle croisé à Paris (polygones de la Ville / carte nationale) : UAI des polygones absents de la carte : aucun ; UAI de la carte parisienne sans polygone : aucun.

## 13. Normalisation des voies (contrôle Géoplateforme)

Échantillon de 40 libellés de la carte scolaire géocodés « <libellé> <commune> » : **32/40** identiques après `normalizeVoie` (et même code commune).
Écarts imputables à la normalisation : 2/40.

| INSEE | Carte scolaire | Géocodeur (rue) | normalizeVoie(géocodeur) | Code commune | Diagnostic |
|---|---|---|---|---|---|
| 77067 | RUE DE LA BUTTE DU LUET | Rue de la Butte du Luet | RUE DE LA BUTTE DU LUET | 77495 | autre commune renvoyée |
| 77243 | SQUARE PAUL LEVEQUE |  |  |  | aucun résultat du géocodeur |
| 77294 | PONT AUX POULAINS | Rue Paul Vaillant Couturier | RUE PAUL VAILLANT COUTURIER | 77294 | autre voie renvoyée (voie inconnue du géocodeur ?) |
| 77445 | RUE DU TITANE | Rue du Rhône | RUE DU RHONE | 77445 | écart de normalisation |
| 78138 | PASSAGE DES PETITS PAS | Passage des Violettes | PASSAGE DES VIOLETTES | 77085 | autre commune renvoyée |
| 91223 | IMPASSE SAINT JEAN | Rue Saint-jean | RUE SAINT JEAN | 91223 | écart de normalisation |
| 92026 | BOULEVARD CIRCULAIRE | Boulevard Circulaire | BOULEVARD CIRCULAIRE | 93078 | autre commune renvoyée |
| 93007 | PLACE DES QUATRE TOURS | Cité Quatre Tours | CITE QUATRE TOURS | 93007 | autre voie renvoyée (voie inconnue du géocodeur ?) |

## 14. Événements

56 événements lus, 56 publiés, 0 rejetés, 0 hors périmètre. Statuts d'inscription : 20.

## 15. À vérifier à la main

- Collège privé L'École alsacienne (0752874S) : Le domaine ecole-alsacienne.org ne répondait plus le 2026-10-07 (site conservé dans la fiche).
- Collège privé Saint-Louis (0754008Z) : Le domaine college-st-louis.org indiqué par l'annuaire est parqué ; la page du collège est hébergée par lyceesaintnicolas.com/college-saint-louis/.
- Collège privé Notre-Dame de Sion (0754757N) : robots.txt de sion-paris.fr bloque ClaudeBot : passage au lycée et inscriptions à vérifier à la main.
- Passage au lycée « inconnu » : Collège privé Notre-Dame de Sion (0754757N), Collège privé Georges Gusdorf (0755496S), Ecole générale et technologique privée Cours Progress (0755757A), Collège Kingsworth International School (0755773T), Collège privé Cours du Pont de Pierre (0755799W), Collège privé ICS Paris (0755848Z), Collège privé Ecole Démocratique de Paris (0755879H), Ecole Canadienne Internationale de Paris (0755897C), Collège privé La classe du phare (0756051V), Collège privé Montessori (0756191X), Collège privé Ellipse Montessori (0756197D), Collège privé École Diagonale (0756203K), Collège privé Cours Molière (0756204L), Ecole Secondaire Privée Maigret (0756273L), Ecole Secondaire Privée International School of Paris (0756274M), Collège privé Cours Montaigne (0756278S), Collège privé BETH SEFER YAD MORDEKHAI (0756282W), Collège privé Ecole A (0756489W), Collège Privé Ipecom (0756786U), Collège privé ABI SCHOOL 12 rue Charles Pouillet (0756898R), Collège privé Beth Myriam (0771668V), Collège privé Oneschool Global Paris Campus (0772740K), Ecole secondaire privée International Montessori Athéna (0783682D), Ecole secondaire privée La Jonchère (0783727C), Ecole secondaire privée sports Académy le Mesnil (0783764T), Ecole secondaire privée Pilcalli (0783772B), Ecole secondaire privée La Jonchère EIB Campus (0783810T), Ecole secondaire privée Station phoenix (0783846G), Ecole secondaire privée Cité Educative du Paris-Saint-Germain (0783870H), Ecole secondaire privée Groupe Scolaire Excellence (0912353N), Ecole secondaire privée La Lumière du Savoir (0912378R), Ecole secondaire privée  international scolaire - Open Sky International (0922798S), Ecole secondaire privée internationale Deutsche Schule Paris (0922943Z), Ecole secondaire privée Cours Singulier (0922964X), Ecole secondaire privée Ecole Diagonale (0922967A), Collège privé Beth Sepher Yad Mordekai (0923042G), Collège du Groupe scolaire privé Bellevue Muhammed Hamidullah (0932642S), Collège privé La Fraternité (0932646W), Collège privé La plume de l'éducation (0932717Y), Collège - Groupe Scolaire Privé APCS (0932728K), Collège Groupe Scolaire Privé Bougainville (0932797K), Collège privé Lab School Montreuil (0932890L), Collège privé ISE Emeth Leyaacov - Filles (0942143U), Collège privé ISE Emeth Leyaacov - Garçons (0942185P), Collège du groupe scolaire privé Education et Savoir (0942223F), Collège privé l'Ecole Heureuse - LEH (0942336D), Collège privé Sports études de Paris (SEDP) (0942366L), Ecole secondaire privée Beth Yaacov (0952133C), Ecole secondaire privée Torah Or (0952222Z).
- Privés sous contrat avec lycée sans formulation sur le passage (« poursuite habituelle, non garantie par écrit ») : 160 — Collège privé Fénelon Sainte-Marie, Collège privé Blomet, Collège privé Saint-Jean de Passy, Collège privé Paul Claudel d'Hulst, Collège privé Sainte-Jeanne-Élisabeth, Collège privé Charles Péguy, Collège privé Notre-Dame de France, Collège privé de la Tour, Collège privé Sainte-Ursule Louise de Bettignies, Collège privé La Rochefoucauld, Collège privé Stanislas, Collège privé Sainte-Élisabeth, Collège privé des Francs Bourgeois, Collège privé Yabné, Collège privé Eugène Napoléon Saint-Pierre Fourier, Collège privé de l'Alma, Collège privé Saint-Louis de Gonzague, Collège privé Notre-Dame des Oiseaux, Collège privé Pascal, Collège privé Massillon, Collège privé Rocroy Saint-Vincent de Paul, Collège privé Saint-Sulpice, Collège privé Sainte-Geneviève, Collège privé Gerson, Collège privé Saint-Michel des Batignolles, Collège privé Saint-Michel de Picpus, Collège privé École active bilingue Jeannine Manuel, Collège privé de l'Assomption, Collège privé France Quéré - Association Votre école chez vous, Collège privé Sinaï, Collège privé Beth Hanna, Collège privé Saint-Vincent, Collège privé Thérèse Chappuis, Collège privé Sœur Rosalie, Collège privé Lucien de Hirsch, Collège privé Sainte-Louise, Collège privé Saint-Louis, Collège privé Ozar Hatorah, Collège privé Georges Leven, Collège privé Heikhal Menahem Sinaï, Collège privé N'R Hatorah, Collège privé Gaston Tenoudji, Collège privé Beth Aaron, Collège Sainte-Croix, Collège Sainte-Thérèse, Collège Sainte-Marie - La Roche aux Coqs, Collège privé Sainte-Céline, Collège Saint-Laurent-La Paix Notre-Dame, Collège Sainte-Marie, Collège Jeanne d'Arc-Saint-Aspais, Collège Guy Gasnier - Sainte-Bathilde, Collège privé Maurice Rondeau, Collège privé Père Jacques, Collège privé Saint-Colomban, Collège Notre-Dame - Les Oiseaux, Collège Blanche de Castille, Collège l'Ermitage, École internationale de France, Collège Saint-Érembert, Collège Notre-Dame, Collège Le Bon Sauveur, Collège Saint-Jean - Hulst, Collège Perceval, Collège Notre-Dame, Collège Saint-François d'Assise, Collège Saint-Exupéry, Collège Saint-Augustin, Collège Sainte-Thérèse, Collège Mercier Saint-Paul, Collège privé Samarcande, Collège privé Saint-Thomas de Villeneuve, Collège Les Châtaigniers, Collège Sainte-Jeanne d'Arc, Collège Jeanne d'Arc, Collège Saint-Spire, Collège du Sacré-Coeur, Collège Rudolf Steiner, Collège Saint-Charles, Collège Saint-Pierre, Collège Jeanne d'Arc, Collège privé du cours secondaire d'Orsay, Collège Institution Saint Vincent de Paul, Collège Sacré-Coeur, Collège Saint-Louis - Saint-Clément, Collège Saint-Nicolas, Collège Beth Rivkah, Collège Saint-Spire Sénart, Collège La Salle - Saint-Nicolas, Collège Saint-Pierre Saint-Jean, Collège Sainte-Marie la Croix, Collège Sainte-Geneviève, Collège Saint-Gabriel, Collège Maïmonide Rambam, Collège Notre-Dame, Collège Sophie Barat, Collège Saint-Thomas de Villeneuve, Collège Jeanne d'Arc, Collège La Source, Collège Jeanne d'Arc, Collège Sainte-Marie, Collège Notre-Dame de Sainte-Croix, Collège Saint-Dominique, Collège Passy Saint-Nicolas Buzenval, Collège Madeleine Daniélou, Collège Suger, Collège Saint-Philippe, Collège Notre-Dame, Collège Hautefeuille, Collège Bienheureux Charles de Foucauld, Collège privé Beth Hilel, Collège privé Assomption, Collège Saint-Germain, Collège Sainte-Marie, Collège Fénelon, Collège La Salle Saint-Denis, Collège Alliance, Collège Saint-Louis Sainte-Clotilde, Collège privé Saint-Benoist de l'Europe, Collège Saint-Joseph, Collège Françoise Cabrini, Collège privé l'Espérance, Collège privé Charles Péguy, Collège Henri Matisse, Collège Merkaz Hatorah Garçons, Collège privé Chne Ohr, Collège Merkaz Hatorah Filles, Collège Saint-Vincent-de-Paul, Collège privé Protectorat Saint-Joseph, Collège Sainte-Louise de Marillac, Collège privé La Salle - Le Landy, Collège privé réussite éducative valeurs et épanouissement, Collège Saint-Joseph, Collège Notre-Dame des Missions, Collège privé Epin, Collège Ozar Hatorah Filles, Collège Saint-André, Collège Montalembert, Collège Albert de Mun, Collège Saint-Michel, Collège Petit Val, Collège Notre-Dame de la Providence, Collège Poullart des Places, Collège Ozar Hatorah Garçons, Collège Cours du Hameau, Collège Saint-Stanislas, Collège Le Rosaire, Collège Saint-Joseph, Collège Sainte-Jeanne d'Arc, Collège Saint-Pie X (Fondation d'Auteuil), Collège Notre Dame de la Providence, Collège Notre-Dame de Bury - Annexe du collège Le Rosaire de Saint-Leu-la-Forêt, Collège Notre-Dame de la Compassion, Collège Saint-Martin de France, Collège Notre-Dame, Collège La Salle - Saint-Rosaire, Collège Torat Emet, Collège ORT, Collège Ozar Hatorah, Collège Vauban, Collège Saint-Jean, Institut Paul Ricoeur.

## 16. Fichiers produits

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

Contours : chaque commune présente a le sien (contours-<dép>.geojson).
