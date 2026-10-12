---
description: Fait d'un collège du périmètre un collège suivi (suivis.json) avec ses pages surveillées, son passage au lycée, ses étiquettes et, pour le privé, ses inscriptions ; diff à relire avant tout enregistrement
argument-hint: "<nom ou UAI du collège>"
---

# Suivre un collège

Collège demandé : $ARGUMENTS

Un collège suivi est un collège pour lequel on relève à la main ce que les données publiques ne donnent pas : portes ouvertes, inscriptions du privé, passage garanti au lycée, étiquettes (SPEC §3, ADR 0001). Cette commande prépare son relevé initial et le présente sous forme de diff. **Aucun fichier du dépôt n'est modifié avant la validation explicite de l'utilisateur.**

## 1. Trouver le collège

- `npm run suivre -- trouver <nom ou UAI>` : cherche dans `public/data/colleges.json` (le périmètre) par UAI, ou par mots du nom et de la commune (accents et tirets indifférents, débuts de mots acceptés).
- Aucun résultat : le dire et proposer une autre formulation (commune, nom sans « privé »). Un établissement absent du périmètre (hors Île-de-France, fermé, ou dans `exclure` de `data/config.json`) ne peut pas être suivi.
- Plusieurs résultats : présenter la liste (UAI, nom, commune, statut) et demander lequel suivre. Ne jamais choisir à la place de l'utilisateur.
- Collège déjà suivi : le dire et proposer `/college-maj-portes-ouvertes <UAI>` ; ne continuer que si l'utilisateur veut compléter un relevé (par exemple un suivi sans page surveillée).
- Avec un seul collège, la sortie donne aussi :
  - le site de l'annuaire et la fiche ONISEP ;
  - les étiquettes et la continuité publiées : lycée détecté et texte par défaut du passage ;
  - ce qui est déjà relevé dans `data/overrides/` ;
  - l'état des dates officielles de ses territoires.

## 2. Contexte

- Lire SPEC §3 (collèges suivis), §4 (étiquettes), §8 (continuité jusqu'au bac), §12 (calendrier) et §15 (à vérifier à la main) ; `GLOSSARY.md`.
- Formats :
  - `src/types.ts` : `Continuite`, `Passage`, `EventsFile` ;
  - `scripts/data/sources/continuite.ts` : `ContinuiteOverride`, `TEXTES` et `continuiteParDefaut`, les textes par défaut.
- Fichiers à compléter, avec leurs entrées existantes comme modèles :
  - `data/overrides/suivis.json` ;
  - `data/overrides/watch.json` ;
  - `data/overrides/continuite.json` ;
  - `data/overrides/colleges.json` ;
  - `data/overrides/events.json` (`inscriptions`).
- `data/config.json` : `saisonCourante` (« 2026-27 » = entrée en 6e en septembre 2027) et `exclure`.

## 3. Règles d'accès aux sites (les mêmes que `/college-maj-portes-ouvertes`)

- Avant toute requête vers un hôte, `npm run suivre -- robots <url>…` avec toutes les URL qu'on compte ouvrir sur cet hôte. Le script lit le robots.txt une fois par hôte et rend un verdict pour chaque URL. Pour une URL autorisée, et seulement pour elle, il donne aussi la réponse que recevra la surveillance (agent `colleges-watch`) : code HTTP, type de contenu, redirection.
- Ne demander une URL que si elle est « autorisé », par WebFetch comme par curl. Une URL est interdite dans trois cas :
  - un chemin interdit par le groupe `*` ;
  - un chemin interdit par le groupe de l'agent utilisé : WebFetch = `Claude-User`, la surveillance = `colleges-watch` ;
  - un site qui exclut les agents d'Anthropic au-delà du robot d'indexation ClaudeBot (`Claude-User`, `Claude-Web`, `anthropic-ai`). C'est le cas de Notre-Dame de Sion (SPEC §15) : un tel site n'est pas consulté du tout.
- Un lien découvert sur une page (inscriptions, agenda, PDF) n'est ouvert qu'après son propre verdict. Il en va de même pour toute URL dont l'hôte n'a pas encore été vérifié. Une redirection vers un autre chemin ou un autre hôte se vérifie aussi. `https://pia.ac-paris.fr/serail/upload/` (affiches, PDF) est interdit : s'en tenir au texte de l'article.
- Si la seule source d'une information est interdite, la noter « à vérifier à la main ». Elle va dans le compte rendu, et dans `aVerifier` de `colleges.json` si elle doit rester visible dans `data/report.md`.
- Une requête à la fois par site, sans rafale, en respectant le Crawl-delay qu'affiche le script (Skolengo : 5 s). Avec curl, s'identifier par `-A "colleges-watch (+https://github.com/abasille/colleges)"`. Pas d'extension de navigateur.
- La recherche web (WebSearch) sert à trouver les pages. Ses résultats ne dispensent pas de vérifier robots.txt avant d'ouvrir une page.
- ac-paris.fr répond 403 aux scripts. Pour ses pages (règles d'affectation), passer par une recherche web et des copies officielles.

## 4. Recherche

Partir du site de l'annuaire, de la fiche ONISEP et d'une recherche web. Les plateformes diffèrent d'un département à l'autre, et hors de Paris et du Val-de-Marne la recherche se fait au cas par cas. Repères tirés de l'annuaire pour les collèges publics :

| Département | Plateforme habituelle |
| --- | --- |
| 75 | pia.ac-paris.fr |
| 94 | Skolengo `*.moncollege.valdemarne.fr` |
| 78, 91, 92, 95 | `*.ac-versailles.fr` |
| 93 | `*.webcollege.seinesaintdenis.fr` |
| 77 | site souvent absent de l'annuaire, parfois `*.ent77.fr` |

Le privé a en général son propre site, souvent commun avec l'école ou le lycée de l'ensemble scolaire.

### Pages à surveiller (1 à 3)

- Choisir les pages qui annoncent les portes ouvertes, les réunions pour les futurs 6e et les inscriptions. Pour le privé : la page des inscriptions ou admissions, la page des portes ouvertes ou l'agenda, l'accueil s'il porte le bandeau des événements. Pour le public : l'accueil du site ou la rubrique des actualités.
- Chaque page doit :
  - être « autorisé » par le script robots ;
  - y répondre HTTP 200 en `text/html` ou en flux RSS, sans redirection (sinon prendre l'URL de destination, après son propre verdict) ;
  - porter du texte : pas un PDF, pas une page vide générée en JavaScript ;
  - ne pas être une URL `/serail/upload/`.
- Un site qui répond 403 à la surveillance (protection contre les robots) ne peut pas être surveillé : pas d'entrée dans `watch.json` pour lui, et le dire. La recherche par WebFetch reste possible si robots.txt l'autorise.
- Format `watch.json` : `{ "url": "…", "label": "<nom court> — <rôle>" }`, sur le modèle `"Saint-Vincent-de-Paul — inscriptions"`.
- Un collège public du Val-de-Marne peut avoir un flux RSS Skolengo. Il s'ajoute à `discovery` sur le modèle des entrées existantes (même `note`, label `Flux RSS des actualités : <nom> (<commune>)`), après vérification que le flux n'est pas vide.
- Aucune page exploitable : pas d'entrée dans `watch.json` (le collège peut être suivi sans page, SPEC §3), et le dire dans le compte rendu.

### Passage au lycée

- Seulement s'il y a un lycée dans l'établissement ou dans l'ensemble scolaire : lien `cite_scolaire`, `meme_etablissement_prive` ou `groupe_scolaire_autre_site`, ou un lycée trouvé à la main que la détection a manqué.
- Chercher la formulation de l'établissement sur le passage de la 3e en 2nde : page du lycée, des inscriptions ou de l'orientation, règlement, contrat de scolarisation. La citer entre « » avec sa source. Un PDF autorisé mais dont le texte ne peut pas être extrait se note « à vérifier à la main ».
- Valeur de `passage` :
  - `garanti` : l'établissement s'engage par écrit. Texte sur le modèle « Si le passage en 2nde est accordé : « … » ».
  - `sous_reserve` : réinscription soumise à l'avis de passage ou à des conditions.
  - `non_garanti` : cité scolaire publique (Affelnet, sans priorité) ou privé sans engagement écrit.
  - `inconnu` : hors contrat, ou rien de lisible.
- Entrée de `continuite.json` :
  - `passage`, `passageTexte` (une phrase, citation comprise) ;
  - `sources` (URL lues, la plus probante d'abord) ;
  - `note` : une note de recherche, non publiée, qui dit ce qui est déduit et ce qui est cité.
- Corriger aussi `lien`, `lyceeUai` ou `lycee` si la détection s'est trompée, et le dire.
- Aucune formulation trouvée : ne pas inventer de `passage`. Le texte par défaut reste affiché. Ajouter seulement `sources` (pages consultées) et une `note` `aucune formulation trouvée le <date>`, sur le modèle des entrées qui n'ont que ces deux champs.
- Cité scolaire publique : le texte par défaut (Affelnet, sans priorité) suffit en général. Pour Paris, ajouter la source des règles Affelnet comme dans les entrées existantes.

### Étiquettes (`colleges.json`)

- Seulement ce que les données publiques ne donnent pas, ou donnent mal. Elles l'emportent sur la détection automatique.
  - `recrutementParticulier` : libellé précis (« recrutement sur dossier », « collège spécialisé… »). Pour un public sans secteur, la détection donne déjà le libellé générique.
  - `niveaux` : quand le collège n'accueille pas tous les niveaux, par exemple `["4e", "3e"]`, ce qui retire l'entrée en 6e.
  - `remarques` : fusion, déménagement, changement notable à venir, avec la date.
  - `nom` : seulement si le nom de l'annuaire est faux ou illisible.
  - `web` : seulement si le site de l'annuaire est mort ou parqué.
  - `aVerifier` : note pour le mainteneur.
- Rien à corriger : pas d'entrée.

### Inscriptions (privé sous contrat et hors contrat seulement)

- `events.json` → `inscriptions["<UAI>"]` = `{ "statut", "constateLe", "detail", "source" }`, sur le modèle des entrées existantes :
  - `statut` : `ouvertes`, `closes`, `a_venir` ou `inconnu` ;
  - `constateLe` : la date du jour ;
  - `detail` : une ou deux phrases pour la rentrée de la saison courante ;
  - `source` : la page lue.
- Les dates lues en chemin (portes ouvertes, réunions, ouverture ou clôture des inscriptions de la saison courante) peuvent être ajoutées à `events` en suivant exactement les §3 et §4 de `/college-maj-portes-ouvertes`. Sinon, proposer de lancer cette commande ensuite.
- Données personnelles : ne jamais recopier un nom d'élève, de parent ou de personnel.

### Dates officielles du territoire

- D'après `npm run suivre -- trouver`, le collège a pour territoires son académie et son département ; à Paris, `Paris` seul. Signaler en clair chaque territoire dont les dates de la saison courante manquent (« MANQUANTES »), avec la dernière saison renseignée.
- Signaler aussi qu'un territoire sans aucun collège suivi jusque-là devient un territoire pour lequel on saisit des dates.
- Ne pas saisir ces dates ici : proposer `/college-maj-portes-ouvertes` pour les chercher. En général, le calendrier de la saison est publié à partir de janvier.

## 5. Diff à relire

Présenter, sans rien écrire dans le dépôt :

1. Une fiche courte : UAI, nom, commune, statut, territoires, pages consultées et leurs verdicts robots, ce qui reste « à vérifier à la main ».
2. Le diff proposé, fichier par fichier, au format unifié et dans l'ordre des clés du fichier :
   - `data/overrides/suivis.json` : `"<UAI>": "<nom>"` inséré à sa place dans l'ordre des UAI ;
   - `data/overrides/watch.json` : la clé `"<UAI>"` à sa place dans l'ordre des UAI, avec 1 à 3 pages, et une entrée `discovery` s'il y a lieu ;
   - `data/overrides/continuite.json` : entrée ajoutée en fin de `colleges` ;
   - `data/overrides/colleges.json` : entrée à sa place dans l'ordre des UAI, s'il y a lieu ;
   - `data/overrides/events.json` : `inscriptions` à sa place dans l'ordre des UAI (privé), et événements s'il y a lieu.

   Le JSON garde le style de chaque fichier : indentation et typographie des entrées voisines (guillemets « », apostrophes), saut de ligne final.
3. Les dates officielles manquantes du territoire.

Puis demander la validation. L'utilisateur peut corriger une page, un texte ou un statut : refaire le diff tant qu'il n'a pas validé.

## 6. Après validation

- Appliquer le diff validé, rien de plus.
- `npx tsx scripts/watch/validate-events.ts` si `events.json` a changé.
- `npm run watch-pages -- --only <UAI>` (en local) : relève l'empreinte de départ des nouvelles pages dans `data/watch-state.json`. Ainsi, la prochaine surveillance hebdomadaire ne les signale pas comme modifiées. Une page signalée « robots » ou en erreur se retire ou se remplace.
- `npm run data -- --offline`, puis `npm test`. `npm run suivre -- trouver <UAI>` doit afficher « déjà suivi ». Dans l'application, le collège porte le badge « suivi ».
- Compte rendu : fichiers modifiés, pages surveillées, passage retenu et sa source, inscriptions, points « à vérifier à la main », dates officielles manquantes ; puis `git diff --stat`.
- Ne pas commiter sans l'accord explicite de l'utilisateur. Le commit comprend :
  - `data/overrides/` ;
  - `data/watch-state.json` ;
  - les `public/data/*` régénérés ;
  - `data/report.md`.
