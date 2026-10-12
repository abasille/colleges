# Le lycée de secteur n'est pas repris hors de Paris

Le lycée de secteur n'est donné qu'à Paris, où l'Affelnet de l'académie (service ArcGIS) relie chaque collège public à ses lycées de secteur 1. Hors de Paris, la fiche indique « non disponible », avec un texte propre à l'académie et un lien vers l'outil officiel qui donne le lycée de secteur selon l'adresse (recherche du rectorat de Versailles, page de sectorisation de la direction départementale pour Créteil). Aucune donnée ouverte ne couvre ces académies. Les seuls documents trouvés sont des PDF du rectorat de Versailles et un XLS de la DSDEN du Val-de-Marne, publiés sans licence. Le dépôt est public : republier leur contenu reviendrait à diffuser des données sans droit de le faire.

## Considered Options

- **Extraire les PDF de Versailles et le XLS du Val-de-Marne** : écarté, faute de licence. Ce serait aussi un travail d'extraction fragile, à refaire chaque année, et il ne couvrirait toujours pas la Seine-et-Marne ni la Seine-Saint-Denis.

## Consequences

- Hors de Paris, le parent est envoyé vers l'outil officiel. Il n'y a pas de comparaison des lycées de secteur entre collèges.
- La logique diffère aussi par nature : à Paris, le lycée de secteur dépend du collège fréquenté ; ailleurs, de l'adresse du domicile. Si une source ouverte apparaît un jour, elle se brancherait sur l'adresse, comme le collège de secteur, et non sur la fiche du collège.
- Ne pas « corriger » cette absence en extrayant ces documents tant qu'ils n'ont pas de licence ouverte.
