import { describe, expect, it } from 'vitest';
import { collegeAParis, departementDuCode, estDepartement, inseeAParis } from './territoires';

describe('départements et Paris', () => {
  it('reconnaît les huit départements d’Île-de-France', () => {
    expect(estDepartement('94')).toBe(true);
    expect(estDepartement('094')).toBe(false);
    expect(estDepartement('69')).toBe(false);
  });

  it('lit le département d’un code INSEE, null hors Île-de-France', () => {
    expect(departementDuCode('94041')).toBe('94');
    expect(departementDuCode('75113')).toBe('75');
    expect(departementDuCode('69123')).toBeNull();
    expect(departementDuCode('2A004')).toBeNull();
  });

  it('situe à Paris un code INSEE de Paris ou d’un arrondissement', () => {
    expect(inseeAParis('75056')).toBe(true);
    expect(inseeAParis('75113')).toBe(true);
    expect(inseeAParis('94041')).toBe(false);
  });

  it('situe à Paris un collège du département 75', () => {
    expect(collegeAParis({ departement: '75' })).toBe(true);
    expect(collegeAParis({ departement: '94' })).toBe(false);
  });
});
