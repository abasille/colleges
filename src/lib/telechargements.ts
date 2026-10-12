// Fichiers de public/data chargés à la demande (détail d'un département, sectorisation, contours) :
// un seul téléchargement par fichier, réutilisé ensuite ; un échec n'est pas mémorisé.

/** JSON d'un fichier de public/data (chemin relatif, avec sa requête éventuelle). */
export async function getJson<T>(chemin: string): Promise<T> {
  const res = await fetch(`${import.meta.env.BASE_URL}data/${chemin}`);
  if (!res.ok) throw new Error(`${chemin.replace(/\?.*$/, '')} : HTTP ${res.status}`);
  return (await res.json()) as T;
}

export interface TelechargementsParCle<T> {
  /** Contenu déjà reçu pour cette clé, sinon undefined. */
  recu(cle: string): T | undefined;
  /** Lance le téléchargement de la clé s'il n'est ni en cours ni terminé ; un échec est oublié, la demande suivante retente. */
  demander(cle: string, telecharger: () => Promise<T>): Promise<T>;
  /** Oublie la clé : la prochaine demande retélécharge (bouton « Réessayer »). */
  oublier(cle: string): void;
}

export function telechargementsParCle<T>(): TelechargementsParCle<T> {
  const demandes = new Map<string, Promise<T>>();
  const recus = new Map<string, T>();
  return {
    recu: (cle) => recus.get(cle),
    demander(cle, telecharger) {
      let p = demandes.get(cle);
      if (!p) {
        p = telecharger().then((contenu) => {
          recus.set(cle, contenu);
          return contenu;
        });
        p.catch(() => demandes.delete(cle));
        demandes.set(cle, p);
      }
      return p;
    },
    oublier(cle) {
      demandes.delete(cle);
      recus.delete(cle);
    },
  };
}
