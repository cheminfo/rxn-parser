import { ensureString } from 'ensure-string';

/**
 * Parse a rxn file and return an object with reagents and products.
 * @param {import('cheminfo-types').TextData} rxn - RXN file content.
 * @returns {{ reagents: string[], products: string[] }} Parsed reagents and products.
 */
export function parse(rxn) {
  rxn = ensureString(rxn);
  // we will find the delimiter in order to be much faster and not use regular expression
  const header = rxn.slice(0, 1000);
  let crlf = '\n';
  if (header.includes('\r\n')) {
    crlf = '\r\n';
  } else if (header.includes('\r')) {
    crlf = '\r';
  }

  const rxnParts = rxn.split(`${crlf}$MOL${crlf}`);

  const reagents = [];
  const products = [];

  // the first part is expected to contain the number of reagents and products

  // First part should start with $RXN
  // and the fifth line should contain the number of reagents and products
  if (rxnParts.length === 0) throw new Error('file looks empty');

  const headerPart = rxnParts[0];
  if (headerPart.indexOf('$RXN') !== 0) {
    throw new Error('file does not start with $RXN');
  }

  const lines = headerPart.split(crlf);
  if (lines.length < 5) throw new Error('incorrect number of lines in header');

  let numberReagents = lines[4].slice(0, 3) >> 0;
  const numberProducts = lines[4].slice(3, 6) >> 0;

  // hack for JSME
  const thirdNumber = lines[4].slice(6, 9) >> 0; // for jsme

  if (thirdNumber && rxnParts[1]) {
    const jsmeLines = rxnParts[1].split(crlf);
    if (jsmeLines[0]) {
      numberReagents = jsmeLines[0]
        .trim()
        .replace(/>[^>]*$/, '')
        .split(/[.>]/).length;
    }
  }

  if (numberReagents + numberProducts !== rxnParts.length - 1) {
    throw new Error('not the correct number of molecules');
  }

  for (let i = 1; i < rxnParts.length; i++) {
    if (i <= numberReagents) {
      reagents.push(rxnParts[i]);
    } else {
      products.push(rxnParts[i]);
    }
  }
  return { reagents, products };
}
