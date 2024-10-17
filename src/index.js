import { ensureString } from 'ensure-string';

/**
 * Parse a rxn file and return an object with reagents and products
 * @param {import('cheminfo-types').TextData} rxn
 * @returns
 */

export default function parse(rxn) {
  rxn = ensureString(rxn);
  // we will find the delimiter in order to be much faster and not use regular expression
  let header = rxn.slice(0, 1000);
  let crlf = '\n';
  if (header.includes('\r\n')) {
    crlf = '\r\n';
  } else if (header.includes('\r')) {
    crlf = '\r';
  }

  let rxnParts = rxn.split(`${crlf}$MOL${crlf}`);

  let reagents = [];
  let products = [];

  let result = {};
  result.reagents = reagents;
  result.products = products;

  // the first part is expected to contain the number of reagents and products

  // First part should start with $RXN
  // and the fifth line should contain the number of reagents and products
  if (rxnParts.length === 0) throw new Error('file looks empty');

  header = rxnParts[0];
  if (header.indexOf('$RXN') !== 0) {
    throw new Error('file does not start with $RXN');
  }

  let lines = header.split(crlf);
  if (lines.length < 5) throw new Error('incorrect number of lines in header');

  let numberReagents = lines[4].slice(0, 3) >> 0;
  let numberProducts = lines[4].slice(3, 6) >> 0;

  // hack for JSME
  let thirdNumber = lines[4].slice(6, 9) >> 0; // for jsme

  if (thirdNumber && rxnParts[1]) {
    let lines = rxnParts[1].split(crlf);
    if (lines[0]) {
      numberReagents = lines[0]
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
  return result;
}
