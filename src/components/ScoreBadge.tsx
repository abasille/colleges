import type { ScoreMaison } from '../types';
import { formatNombre } from '../lib/format';
import { cx } from './ui';

export const LETTRE_COLORS: Record<ScoreMaison['lettre'], string> = {
  A: '#15803d',
  B: '#65a30d',
  C: '#ca8a04',
  D: '#ea580c',
  E: '#dc2626',
};

export function ScoreBadge({ score, small = false }: { score: ScoreMaison | null; small?: boolean }) {
  if (!score) {
    return (
      <span
        title="Note maison non calculée (données insuffisantes)"
        className={cx('flex items-center justify-center rounded-md bg-zinc-100 font-bold text-zinc-400', small ? 'h-6 w-6 text-xs' : 'h-12 w-12 text-xl')}
      >
        –
      </span>
    );
  }
  return (
    <span
      title={`Note maison ${formatNombre(score.note, 1)}/20${score.partielle ? ' (partielle)' : ''} – rang ${score.rang}/${score.sur}`}
      className={cx('flex items-center justify-center rounded-md font-bold text-white', small ? 'h-6 w-6 text-xs' : 'h-12 w-12 text-2xl')}
      style={{ backgroundColor: LETTRE_COLORS[score.lettre] }}
    >
      {score.lettre}
    </span>
  );
}
