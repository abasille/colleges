export interface SharePayload {
  favoris: string[];
  notes: Record<string, string>;
}

const UAI = /^\d{7}[A-Z]$/;

function toBase64Url(s: string): string {
  const bytes = new TextEncoder().encode(s);
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64Url(s: string): string {
  const b64 = s.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((s.length + 3) % 4);
  const bin = atob(b64);
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export function encodeShare(p: SharePayload): string {
  const notes = Object.fromEntries(Object.entries(p.notes).filter(([, v]) => v.trim()));
  return toBase64Url(JSON.stringify({ f: p.favoris, n: notes }));
}

/** Décode un lien de partage ; renvoie null si le contenu est invalide. */
export function decodeShare(s: string): SharePayload | null {
  try {
    const raw = JSON.parse(fromBase64Url(s)) as { f?: unknown; n?: unknown };
    const favoris = Array.isArray(raw.f) ? raw.f.filter((u): u is string => typeof u === 'string' && UAI.test(u)) : [];
    const notes: Record<string, string> = {};
    if (raw.n && typeof raw.n === 'object') {
      for (const [k, v] of Object.entries(raw.n as Record<string, unknown>)) {
        if (UAI.test(k) && typeof v === 'string') notes[k] = v.slice(0, 5000);
      }
    }
    return { favoris, notes };
  } catch {
    return null;
  }
}

/** Fusionne sans rien perdre : union des favoris ; pour les notes, garde les deux textes s'ils diffèrent. */
export function mergeShare(local: SharePayload, incoming: SharePayload): SharePayload {
  const favoris = [...new Set([...local.favoris, ...incoming.favoris])];
  const notes = { ...local.notes };
  for (const [uai, txt] of Object.entries(incoming.notes)) {
    const mine = notes[uai]?.trim();
    if (!mine) notes[uai] = txt;
    else if (mine !== txt.trim() && !mine.includes(txt.trim())) notes[uai] = `${mine}\n\n— importé —\n${txt}`;
  }
  return { favoris, notes };
}
