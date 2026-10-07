import { useEffect, useRef, type ReactNode } from 'react';
import type { College, Statut } from '../types';
import { STATUT_COLORS } from '../lib/colors';
import { STATUT_COURT, STATUT_LABELS } from '../lib/indicateurs';
import { useStore } from '../store';

export function cx(...c: (string | false | null | undefined)[]): string {
  return c.filter(Boolean).join(' ');
}

export function Badge({ children, color, title, className }: { children: ReactNode; color?: string; title?: string; className?: string }) {
  return (
    <span
      title={title}
      className={cx('inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-medium', className)}
      style={color ? { backgroundColor: `${color}1a`, color } : undefined}
    >
      {children}
    </span>
  );
}

export function StatutBadge({ statut, long = false }: { statut: Statut; long?: boolean }) {
  return (
    <Badge color={STATUT_COLORS[statut]} title={STATUT_LABELS[statut]}>
      {long ? STATUT_LABELS[statut] : STATUT_COURT[statut]}
    </Badge>
  );
}

/** Étiquettes secondaires d'un collège (REP, recrutement particulier, pas de 6e…). */
export function CollegeTags({ c, secteur }: { c: College; secteur?: boolean }) {
  return (
    <>
      {secteur && <Badge color="#16a34a" title="Collège de secteur de votre adresse">✓ Secteur</Badge>}
      {c.rep && <Badge color="#0f766e" title="Éducation prioritaire">{c.rep}</Badge>}
      {c.recrutementParticulier && (
        <Badge color="#be185d" title={c.recrutementParticulier}>
          Recrutement particulier
        </Badge>
      )}
      {!c.accueilSixieme && <Badge color="#52525b" title={`Classes : ${c.niveaux.join(', ')}`}>Pas d’entrée en 6e</Badge>}
    </>
  );
}

export function StarButton({ uai, className }: { uai: string; className?: string }) {
  const on = useStore((s) => s.favoris.includes(uai));
  const toggle = useStore((s) => s.toggleFavori);
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        toggle(uai);
      }}
      aria-pressed={on}
      aria-label={on ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      title={on ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      className={cx(
        'rounded p-1 text-lg leading-none transition-colors',
        on ? 'text-yellow-500 hover:text-yellow-600' : 'text-zinc-300 hover:text-yellow-500',
        className,
      )}
    >
      {on ? '★' : '☆'}
    </button>
  );
}

export function InfoTip({ text }: { text: string }) {
  return (
    <span title={text} aria-label={text} className="ml-1 inline-block cursor-help text-xs text-zinc-400 hover:text-zinc-600">
      ⓘ
    </span>
  );
}

export function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);
  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      className="m-auto max-h-[85vh] w-[min(640px,calc(100vw-32px))] rounded-xl p-0 shadow-2xl backdrop:bg-black/40"
    >
      <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-3">
        <h2 className="text-base font-semibold">{title}</h2>
        <button type="button" onClick={onClose} className="rounded p-1 text-zinc-500 hover:bg-zinc-100" aria-label="Fermer">
          ✕
        </button>
      </div>
      <div className="max-h-[calc(85vh-56px)] overflow-y-auto px-5 py-4 text-sm leading-relaxed">{children}</div>
    </dialog>
  );
}

export function ExternalLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cx('text-blue-700 underline-offset-2 hover:underline', className)}>
      {children}
    </a>
  );
}
