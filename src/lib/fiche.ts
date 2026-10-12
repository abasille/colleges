import type { College, CollegeDetail, CollegeResume } from '../types';

/** Recompose la fiche complète à partir du fichier léger et du détail du département. */
export function fusionner(resume: CollegeResume, detail: CollegeDetail): College {
  const { composantes, ...reste } = detail;
  const score = resume.score && { ...resume.score, composantes: composantes ?? { brevet: null, noteEcrit: null, va: null } };
  return { ...resume, ...reste, score };
}
