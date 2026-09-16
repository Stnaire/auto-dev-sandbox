import test from 'node:test';
import assert from 'node:assert/strict';

test('AC-P501: normalize spaces', async (t) => {
  const { normalize } = await import('./normalize.mjs');

  const cases = [
    ['empty string', '', ''],
    ['unchanged text and case', 'BonJour ÉTÉ!', 'BonJour ÉTÉ!'],
    ['repeated ASCII spaces', 'hello   world', 'hello world'],
    ['leading and trailing spaces', '  Hello World  ', 'Hello World'],
    ['mixed whitespace', '\t Hello\r\n\tWorld \v\f', 'Hello World'],
    ['only whitespace', ' \t\n\r\v\f\u00a0\u2003\u2028\u2029\ufeff ', ''],
    ['non-whitespace Unicode preserved', '\u200bÉté\u200b 🚀\u0085', '\u200bÉté\u200b 🚀\u0085'],
  ];

  for (const [name, input, expected] of cases) {
    await t.test(name, () => assert.equal(normalize(input), expected));
  }

  const unicodeWhitespace = [
    '\u00a0', '\u1680', '\u2000', '\u2001', '\u2002', '\u2003',
    '\u2004', '\u2005', '\u2006', '\u2007', '\u2008', '\u2009',
    '\u200a', '\u2028', '\u2029', '\u202f', '\u205f', '\u3000', '\ufeff',
  ];

  for (const whitespace of unicodeWhitespace) {
    await t.test(`Unicode whitespace U+${whitespace.codePointAt(0).toString(16)}`, () => {
      assert.equal(normalize(`${whitespace}A${whitespace}${whitespace}B${whitespace}C${whitespace}`), 'A B C');
    });
  }

  const nonStrings = [undefined, null, false, true, 0, NaN, 1n, Symbol('text'), {}, [], () => {}, new String('text')];

  for (const [index, value] of nonStrings.entries()) {
    await t.test(`reject non-string input ${index}`, () => {
      assert.throws(() => normalize(value), TypeError);
    });
  }
});
