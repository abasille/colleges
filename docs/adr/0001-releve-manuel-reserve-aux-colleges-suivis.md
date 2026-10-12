# Le relevé manuel est réservé aux collèges suivis

En passant de 60 collèges à 1 292, on calcule les données ouvertes pour tout le périmètre, mais le relevé manuel (portes ouvertes, inscriptions du privé, passage garanti au lycée, étiquettes) reste réservé à une liste explicite de **collèges suivis**, au départ les 60 de la première version. Relever les quelque 1 230 autres à la main est hors de portée : il faudrait chercher, puis surveiller chaque année, les sites de 1 230 établissements, dont les ENT diffèrent d'un département à l'autre.

## Considered Options

- **Tout relever** : écarté, pour la charge de travail décrite plus haut.
- **Ne garder que les 60 collèges** : écarté, car l'outil doit servir partout en Île-de-France et permettre de comparer des communes avant un déménagement.
- **Déduire le suivi des pages surveillées** (`watch.json`) : écarté, car 4 des 60 collèges n'ont aucune page surveillée. La liste des collèges suivis est donc une correction manuelle à part.

## Consequences

- L'interface distingue toujours un collège suivi d'un collège non suivi : badge « suivi », case de filtre, textes propres aux non suivis (« Portes ouvertes non relevées : voir le site du collège », « Passage au lycée : non renseigné »). Une absence de date ne doit jamais faire croire qu'un collège n'organise pas de portes ouvertes.
- Le calendrier ne couvre que les collèges suivis, et le dit. Les dates officielles ne sont saisies que pour les territoires des collèges suivis.
- Ce qui peut être détecté depuis les données ouvertes l'est pour tous (accueil en 6e, recrutement particulier, lycée sur place). Une correction manuelle l'emporte toujours.
- La surveillance hebdomadaire et le détail du rapport de données restent limités aux collèges suivis.
- Un collège devient suivi par la commande `/college-suivre`, qui propose un diff à relire.
