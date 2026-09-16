export function normalize(text) {
  if (typeof text !== 'string') {
    throw new TypeError('Expected a string');
  }

  return text.replace(/\s+/gu, ' ').trim();
}
