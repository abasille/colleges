export function ScoreHelp() {
  return (
    <div className="space-y-3">
      <p>
        La <strong>note maison</strong> reprend la démarche des classements de presse (L’Etudiant…), qui s’appuient tous sur les mêmes données publiques du
        ministère, mais avec une formule transparente.
      </p>
      <ol className="list-decimal space-y-1 pl-5">
        <li>
          <strong>Réussite au brevet</strong> : taux de réussite moyen sur les 3 dernières sessions.
        </li>
        <li>
          <strong>Note à l’écrit</strong> : note moyenne aux épreuves écrites du brevet sur 3 sessions.
        </li>
        <li>
          <strong>Valeur ajoutée</strong> : ce que le collège apporte par rapport au résultat attendu compte tenu du profil de ses élèves (moyenne de la valeur
          ajoutée du taux de réussite et de celle de la note).
        </li>
      </ol>
      <p>
        Chaque composante est convertie en <strong>centile national</strong> : un collège à 15/20 fait mieux que 75 % des collèges de France. La note est la
        moyenne des composantes disponibles (« partielle » s’il en manque une, non calculée s’il en manque deux).
      </p>
      <p>Lettres : A ≥ 16 · B ≥ 12 · C ≥ 8 · D ≥ 4 · E &lt; 4. Le rang est calculé parmi les collèges de la zone qui ont une note.</p>
      <p className="text-zinc-600">
        L’<strong>IPS</strong> (milieu social des élèves) n’entre pas dans la note : un IPS élevé n’est ni un mérite ni un défaut du collège. Il est affiché et
        filtrable à part. Les collèges hors contrat ne publient pas ces indicateurs.
      </p>
    </div>
  );
}
