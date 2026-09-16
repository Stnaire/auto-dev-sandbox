import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const cli = fileURLToPath(new URL('./cli.mjs', import.meta.url));

function run(args) {
  const result = spawnSync(process.execPath, [cli, ...args], {
    encoding: 'utf8',
    input: 'stdin must not become output',
    timeout: 5000,
  });
  assert.equal(result.error, undefined);
  assert.equal(result.signal, null);
  return result;
}

for (const [name, input, expected] of [
  ['spaces and case', '  BonJour   Monde  ', 'BonJour Monde\n'],
  ['empty string', '', '\n'],
  ['only whitespace', ' \t\r\n\u00a0\u2003 ', '\n'],
  ['Unicode whitespace', '\u00a0ÉTÉ\u2003\u202f🚀\u3000', 'ÉTÉ 🚀\n'],
  ['embedded newlines', '\tA\n\rB\tC\n', 'A B C\n'],
  ['option-like text is an argument', '--help', '--help\n'],
]) {
  test(`AC-P502: CLI normalizes ${name}`, () => {
    const result = run([input]);
    assert.equal(result.status, 0);
    assert.equal(result.stdout, expected);
    assert.equal(result.stderr, '');
  });
}

for (const args of [[], ['one', 'two'], ['', ''], ['one', 'two', 'three']]) {
  test(`AC-P502: CLI rejects ${JSON.stringify(args)}`, () => {
    const result = run(args);
    assert.notEqual(result.status, 0);
    assert.equal(result.stdout, '');
    assert.match(result.stderr, /usage:/i);
  });
}
