# Collèges

Outil personnel pour choisir un collège en Île-de-France, à partir des données publiques et de quelques informations relevées à la main.

## Territoire

**Périmètre** :
L'ensemble des collèges couverts par l'outil : tous les collèges (publics, privés sous contrat, hors contrat) des huit départements d'Île-de-France.
_Éviter_ : zone, région couverte

**Département** :
L'un des huit départements d'Île-de-France (75, 77, 78, 91, 92, 93, 94, 95).

**Commune** :
La commune où se trouve un collège ; à Paris, l'arrondissement tient lieu de commune.
_Éviter_ : zone, ville, arrondissement (comme catégorie distincte)

**Académie** :
Circonscription du ministère : Paris (75), Créteil (77, 93, 94) ou Versailles (78, 91, 92, 95).

**Lieu** :
Une commune ou un département, tel qu'on le choisit dans le filtre « commune ou département » pour restreindre les collèges affichés.
_Éviter_ : zone, localisation, secteur (réservé à la sectorisation)

## Sectorisation

**Collège de secteur** :
Collège public auquel la carte scolaire rattache une adresse de domicile. Quand un secteur est partagé, une adresse peut en avoir plusieurs.
_Éviter_ : collège de rattachement, collège du quartier

**Méthode du collège de secteur** :
La façon dont le collège de secteur d'une adresse a été trouvé : par le polygone du secteur (Paris), par la plage d'adresses de la voie, par la commune entière (commune formant un seul secteur, ou reste de la commune hors des voies listées), ou déduit (seul collège public d'une commune absente de la carte scolaire).
_Éviter_ : source du secteur, mode de calcul

**Lycée de secteur** :
Lycée où un élève est prioritaire à l'affectation en 2nde générale et technologique. À Paris, il dépend du collège fréquenté ; ailleurs, de l'adresse du domicile.
_Éviter_ : lycée de rattachement

## Étiquettes

**Recrutement particulier** :
Collège public qui ne recrute pas par la carte scolaire (sur dossier, section spécialisée, établissement de réadaptation) : il n'est le collège de secteur d'aucune adresse.
_Éviter_ : collège sans secteur, collège à dossier, collège hors carte

**Accueil en 6e** :
Le fait qu'un collège accueille de nouveaux élèves en 6e à la rentrée. Ce n'est pas le cas d'un collège qui ferme, dont la 6e a été transférée ailleurs ou qui ne commence qu'à un niveau supérieur.
_Éviter_ : entrée en 6e, recrute en 6e

## Calendrier

**Date officielle** :
Échéance fixée par l'administration, commune à tous les collèges d'un territoire (dérogations, inscriptions, résultats d'affectation).
_Éviter_ : date académique

**Territoire** :
L'académie ou le département auquel s'applique une date officielle, selon qui la publie : le rectorat ou la direction départementale.

## Suivi

**Collège suivi** :
Collège pour lequel on relève à la main ce que les données publiques ne donnent pas : portes ouvertes, inscriptions, passage garanti au lycée, étiquettes. Les autres collèges du périmètre n'ont que les données publiques.
_Éviter_ : collège favori (le favori est un choix personnel, stocké dans le navigateur)

## Note maison

**Rang** :
Position d'un collège, selon sa note maison, parmi tous les collèges notés du périmètre.
_Éviter_ : rang dans la zone
