---
description: Met à jour les portes ouvertes, réunions, inscriptions et dates officielles (data/overrides/events.json) à partir des pages surveillées
argument-hint: "[UAI ou nom de collège…] (facultatif : tous par défaut)"
---

# Mise à jour des portes ouvertes

Collèges : $ARGUMENTS (vide = tous les collèges suivis, ceux de `data/overrides/watch.json`).

## 1. Contexte

- Lire SPEC.md §12, `src/types.ts` (`CollegeEvent`, `EventsFile`, `Territoire`), `data/overrides/events.json`, `data/overrides/watch.json`, `data/config.json` (`saisonCourante`, `exclure`).
- Territoires des collèges suivis (ceux de `watch.json`) : leur `academie` et leur `departement` dans `public/data/colleges.json`.
- `gh issue list --label portes-ouvertes --state open`, puis `gh issue view <n> --comments` : les pages signalées par la surveillance hebdomadaire passent en premier.
- Lancer d'abord `npm run watch-pages` en local : depuis GitHub Actions, pia.ac-paris.fr et les sites Skolengo (moncollege.valdemarne.fr) coupent la connexion (ECONNRESET), donc seule une exécution locale couvre les collèges publics. Committer ensuite `data/watch-state.json` avec le reste.
- `npm run watch-pages -- --dry-run --only <UAI>` montre l'état d'une page sans rien écrire.

## 2. Collecte

- Pages de `watch.json`, puis les sources `discovery` : recherches plein texte de pia.ac-paris.fr (articles récents de tous les collèges parisiens : ne garder que ceux des collèges suivis et ouvrir l'article) et flux RSS Skolengo.
- Lire le robots.txt de chaque hôte avant d'y accéder et ne jamais demander un chemin interdit par le groupe `*` ou par le groupe de l'agent utilisé (WebFetch = `Claude-User`). En particulier, `https://pia.ac-paris.fr/serail/upload/` (affiches, PDF) est interdit : s'en tenir au texte de l'article. Un site qui exclut les agents d'Anthropic au-delà du robot d'indexation ClaudeBot (`Claude-User`, `Claude-Web`, `anthropic-ai` : cas de Notre-Dame de Sion, SPEC §15) n'est pas consulté. Un collège dont l'information n'est accessible que par un chemin interdit est noté « à vérifier à la main », avec ce qu'en dit le ticket de surveillance.
- Une requête à la fois par site, sans rafale (Skolengo : Crawl-delay 5 s). Avec curl, s'identifier par `-A "colleges-watch (+https://github.com/abasille/colleges)"` ; les règles applicables restent celles de `*` et de `Claude-User`. Pas d'extension de navigateur.
- ac-paris.fr répond 403 aux scripts : pour les dates officielles, recherche web puis copies officielles (cdn.paris.fr, dsden94.ac-creteil.fr, demarche.numerique.gouv.fr).

## 3. Extraction

- Saison courante = `saisonCourante` (« 2026-27 » = entrée en 6e en septembre 2027) : portes ouvertes, réunions d'information, immersions, inscriptions du privé (ouverture, clôture, tests, entretiens), dates limites (sections internationales, sections sportives, CHA, internat).
- Année absente : la déduire du jour de la semaine et de la date de publication, et mettre `confiance` à « moyenne » au plus. Date approximative (« mi-octobre », « à partir de novembre ») : « basse », et le dire dans le titre.
- Ignorer le lycée, l'orientation de 3e, les mini-stages et la vie des classes.
- Données personnelles : ne jamais recopier un nom d'élève, de parent ou de personnel (les agendas publics Skolengo contiennent des rendez-vous nominatifs), ni dans les fichiers ni dans le compte rendu.

## 4. Mise à jour de `data/overrides/events.json`

- Format `EventsFile` exact. `id` = `${uai}-${date}-${type}` (officiel : `${territoire}-${date}-officiel`, territoire en minuscules sans accent, ex. `paris-…`, `versailles-…`, `94-…`), suffixe court en cas de doublon. Ne jamais renommer l'`id` d'un événement existant : il sert d'identifiant dans l'export .ics (les dates du Val-de-Marne déjà saisies gardent leur `creteil-…`). Titre français court. `dateFin` pour une période, heures `HH:MM`, `inscriptionRequise` true / false / null, `source` = URL lue, `territoire` null sauf pour `officiel`.
- `verifieLe` = date du jour pour chaque événement revu. Corriger un événement existant plutôt que d'en créer un doublon. Garder les événements des saisons passées (affichés à titre indicatif). Ne supprimer qu'un événement annulé, et le signaler.
- `inscriptions` (privé) : `ouvertes` / `closes` / `a_venir` / `inconnu`, `constateLe` = date du jour, `detail` en une ou deux phrases, `source`.
- Dates officielles (`officiel`, `uai` null) : candidatures en cursus spécifiques (DAFNE), dérogations, résultats d'affectation, inscription au collège. Vérifier si le calendrier de la saison courante est publié (en général à partir de janvier).
- `territoire` d'une date officielle, selon qui la publie : l'académie (`"Paris"`, `"Créteil"`, `"Versailles"`) pour une date du rectorat, le département (`"77"`, `"78"`, `"91"`, `"92"`, `"93"`, `"94"`, `"95"`) pour une date de la direction départementale (DSDEN). À Paris, rectorat et direction départementale ne font qu'un : `"Paris"`. Les dates du Val-de-Marne (dsden94.ac-creteil.fr) portent `"94"`.
- On ne saisit des dates officielles que pour les territoires des collèges suivis : l'académie et le département d'au moins un collège de `watch.json`. Un territoire sans collège suivi n'a pas de dates ; signaler dans le compte rendu un territoire de collège suivi pour lequel aucune date de la saison courante n'est encore publiée.
- Page surveillée déplacée ou vide : corriger `watch.json` (1 à 3 pages par collège). Jamais d'UAI de `exclure`.

## 5. Vérification et restitution

- `npx tsx scripts/watch/validate-events.ts`, puis `npm run data` et `npm test`.
- Compte rendu concis par collège : événements ajoutés, modifiés, supprimés (date, titre, confiance, source), statuts d'inscription changés, pages « à vérifier à la main » ; puis `git diff --stat`.
- Ne pas commiter sans l'accord explicite de l'utilisateur. Une fois son commit fait, fermer le ticket : `gh issue close <n> --comment "events.json mis à jour (<sha>)"`.
