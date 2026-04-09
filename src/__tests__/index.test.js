import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { expect, test } from 'vitest';

import { parse } from '../index.js';

const rxn = readFileSync(join(import.meta.dirname, 'test.rxn'));

const jsme = readFileSync(join(import.meta.dirname, 'jsme.rxn'));

test('Check result', () => {
  let result = parse(rxn);

  expect(result).toBeInstanceOf(Object);
  expect(result).toHaveProperty('reagents');
  expect(result).toHaveProperty('products');
  expect(result.reagents).toHaveLength(2);
  expect(result.products).toHaveLength(3);
});

test('should throw with non-string argument', () => {
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

test('Check result jsme', () => {
  const resultJsme = parse(jsme);

  expect(resultJsme).toBeInstanceOf(Object);
  expect(resultJsme).toHaveProperty('reagents');
  expect(resultJsme).toHaveProperty('products');
  expect(resultJsme.reagents).toHaveLength(4);
  expect(resultJsme.products).toHaveLength(3);
});
