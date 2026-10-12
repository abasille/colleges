import { describe, expect, it } from 'vitest';
import { telechargementsParCle } from './telechargements';

describe('téléchargements mémorisés par clé', () => {
  it('ne télécharge qu’une fois par clé, puis donne le contenu reçu sans attendre', async () => {
    const t = telechargementsParCle<string>();
    let appels = 0;
    const telecharger = () => {
      appels++;
      return Promise.resolve('contenu 94');
    };
    expect(t.recu('94')).toBeUndefined();
    await Promise.all([t.demander('94', telecharger), t.demander('94', telecharger)]);
    expect(await t.demander('94', telecharger)).toBe('contenu 94');
    expect(appels).toBe(1);
    expect(t.recu('94')).toBe('contenu 94');
  });

  it('oublie un échec : la demande suivante retente', async () => {
    const t = telechargementsParCle<string>();
    await expect(t.demander('75', () => Promise.reject(new Error('HTTP 503')))).rejects.toThrow('HTTP 503');
    expect(await t.demander('75', () => Promise.resolve('contenu 75'))).toBe('contenu 75');
  });

  it('retélécharge une clé oubliée', async () => {
    const t = telechargementsParCle<number>();
    await t.demander('77', () => Promise.resolve(1));
    t.oublier('77');
    expect(t.recu('77')).toBeUndefined();
    expect(await t.demander('77', () => Promise.resolve(2))).toBe(2);
  });
});
