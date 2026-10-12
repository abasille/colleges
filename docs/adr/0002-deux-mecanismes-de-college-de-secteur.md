# Deux mécanismes de collège de secteur : polygones à Paris, carte nationale ailleurs

Le collège de secteur est trouvé de deux façons selon le département de l'adresse. À Paris, on garde les polygones de secteurs de la Ville (opendata.paris.fr, ODbL) : le point géocodé est cherché dans un polygone, et le polygone s'affiche sur la carte. Ailleurs, on utilise la carte scolaire nationale des collèges publics (`fr-en-carte-scolaire-colleges-publics`, Licence Ouverte 2.0), qui donne des plages d'adresses (commune, voie, bornes, parité) reliées à un UAI. Le mécanisme parisien fonctionne déjà, et ses polygones permettent de dessiner le secteur. La carte nationale, elle, couvre les huit départements avec une seule source sous licence ouverte.

## Considered Options

- **Carte nationale partout, Paris compris** : écartée. On perdrait le polygone affiché et la tolérance de 60 m autour d'un point géocodé, et il faudrait remplacer un mécanisme éprouvé. La carte nationale sert à la place de contrôle croisé à Paris : les UAI présents d'un côté et absents de l'autre sont signalés dans le rapport.
- **Sources propres à chaque département** (polygones des Hauts-de-Seine, service ArcGIS des Yvelines) : écartées. Elles font autant de formats à maintenir, et certaines n'ont pas de licence. La carte nationale suffit.

## Consequences

- Les deux mécanismes ont des formes de données différentes : polygones pour Paris, carte compacte par département ailleurs. Chacune n'est chargée qu'après la saisie d'une adresse, et seulement pour le département de cette adresse.
- `findSecteur` indique sa méthode (`polygone`, `adresse`, `commune_entiere`, `deduit`). Une commune qui forme un seul secteur donne son collège même si la rue n'est pas reconnue.
- Une commune peut avoir à la fois des voies listées et une ligne « secteur unique » (sans voie) : cette ligne vaut pour le reste de la commune. Une adresse dont la voie et le numéro ne correspondent à aucune ligne reçoit donc le collège du reste de la commune (`commune_entiere`, avec la mention « adresse absente des voies listées »), plutôt qu'un message d'échec. Sans numéro, tous les collèges de la voie sont renvoyés, avec « précisez le numéro » s'il y en a plusieurs.
- La carte nationale a des trous : dix communes de Seine-Saint-Denis sont absentes. Pour les neuf qui n'ont qu'un collège public, ce collège est renvoyé avec la mention « déduit ». Pour Coubron, qui n'en a aucun, le secteur est déclaré inconnu. On ne cherche pas d'autre source pour ces communes.
- Les tronçons qui renvoient à plusieurs collèges sont traités comme des secteurs partagés : tous les collèges sont renvoyés, sans avoir vérifié s'il s'agit de chevauchements.
- Un collège public absent de la carte alors que sa commune y figure est étiqueté « recrutement particulier ».
