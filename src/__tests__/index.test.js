import { readFileSync } from 'fs';
import { join } from 'path';

import parse from '..';

const rxn = readFileSync(join(__dirname, 'test.rxn'), 'utf-8');

const jsme = readFileSync(join(__dirname, 'jsme.rxn'), 'utf-8');
describe('RXN Parser', function () {
  let result = parse(rxn);

  it('Check result', () => {
    expect(result).toBeInstanceOf(Object);
    expect(result).toHaveProperty('reagents');
    expect(result).toHaveProperty('products');
  });

  it('Check products', () => {
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

  let resultJsme = parse(jsme);
  it('Check result jsme', () => {
    expect(resultJsme).toBeInstanceOf(Object);
    expect(resultJsme).toHaveProperty('reagents');
    expect(resultJsme).toHaveProperty('products');
  });
  it('Check products jsme', function () {
    expect(resultJsme.reagents).toHaveLength(4);
    expect(resultJsme.products).toHaveLength(3);
  });
});
