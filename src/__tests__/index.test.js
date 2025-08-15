// @ts-nocheck
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

import parse from '..';

const rxn = readFileSync(join(__dirname, 'test.rxn'), 'utf8');

const jsme = readFileSync(join(__dirname, 'jsme.rxn'), 'utf8');

describe('RXN Parser', () => {
  it('Check result', () => {
    let result = parse(rxn);

    expect(result).toBeInstanceOf(Object);
    expect(result).toHaveProperty('reagents');
    expect(result).toHaveProperty('products');
    expect(result.reagents).toHaveLength(2);
    expect(result.products).toHaveLength(3);
  });

  it('should throw with non-string argument', () => {
    expect(() => {
      parse();
    }).toThrow(TypeError);
    expect(() => {
      parse(42);
    }).toThrow(TypeError);
    expect(() => {
      parse({});
    }).toThrow(TypeError);
  });

  it('Check result jsme', () => {
    const resultJsme = parse(jsme);

    expect(resultJsme).toBeInstanceOf(Object);
    expect(resultJsme).toHaveProperty('reagents');
    expect(resultJsme).toHaveProperty('products');
    expect(resultJsme.reagents).toHaveLength(4);
    expect(resultJsme.products).toHaveLength(3);
  });
});
