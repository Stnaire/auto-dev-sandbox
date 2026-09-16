import { normalize } from './normalize.mjs';

const args = process.argv.slice(2);

if (args.length !== 1) {
  process.stderr.write('Usage: node p05/cli.mjs "texte"\n');
  process.exitCode = 1;
} else {
  process.stdout.write(`${normalize(args[0])}\n`);
}
