// Calculs de la liste virtualisée : seules les lignes visibles (plus une marge) sont dans le DOM,
// des espaces vides réservent la place des autres pour garder la barre de défilement juste.

/** Haut de chaque ligne ; la dernière valeur (une de plus que de lignes) est la hauteur totale. */
export function positions(hauteurs: readonly number[]): number[] {
  const pos = new Array<number>(hauteurs.length + 1);
  pos[0] = 0;
  for (let i = 0; i < hauteurs.length; i++) pos[i + 1] = pos[i] + hauteurs[i];
  return pos;
}

/** Lignes [debut, fin[ à rendre, et place à réserver avant et après elles. */
export interface Fenetre {
  debut: number;
  fin: number;
  avant: number;
  apres: number;
}

/** Première ligne dont le bas dépasse `y`. */
function ligneA(pos: readonly number[], y: number): number {
  let bas = 0;
  let haut = pos.length - 2;
  while (bas < haut) {
    const milieu = (bas + haut) >> 1;
    if (pos[milieu + 1] <= y) bas = milieu + 1;
    else haut = milieu;
  }
  return bas;
}

/** `marge` lignes sont rendues en plus de chaque côté de la vue. */
export function fenetre(pos: readonly number[], defilement: number, hauteurVue: number, marge: number): Fenetre {
  const n = pos.length - 1;
  if (n <= 0) return { debut: 0, fin: 0, avant: 0, apres: 0 };
  const debut = Math.max(0, ligneA(pos, defilement) - marge);
  const fin = Math.min(n, ligneA(pos, defilement + hauteurVue - 1) + 1 + marge);
  return { debut, fin, avant: pos[debut], apres: pos[n] - pos[fin] };
}

/**
 * Défilement qui amène la ligne `index` entièrement à l'écran en bougeant le moins possible
 * (comme `scrollIntoView({ block: 'nearest' })`), ou null si elle y est déjà.
 */
export function defilementPour(pos: readonly number[], index: number, defilement: number, hauteurVue: number): number | null {
  const haut = pos[index];
  const bas = pos[index + 1];
  let cible = defilement;
  if (haut < defilement || bas - haut > hauteurVue) cible = haut;
  else if (bas > defilement + hauteurVue) cible = bas - hauteurVue;
  return cible === defilement ? null : cible;
}
