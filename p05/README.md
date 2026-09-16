# normalize-spaces

Utilitaire Node.js sans dépendance externe. Chaque suite de caractères
correspondant à `/\s+/u` devient un espace ASCII, puis les espaces aux extrémités
sont retirés. La casse est conservée.

## API

Depuis un module situé à la racine du dépôt :

```js
import { normalize } from './p05/normalize.mjs';

normalize('  BonJour\t Monde  '); // 'BonJour Monde'
normalize('\u00a0ÉTÉ\u2003Paris\u3000'); // 'ÉTÉ Paris'
normalize(''); // ''
normalize(null); // lève TypeError : seules les chaînes primitives sont acceptées
```

## CLI

Depuis la racine du dépôt :

```sh
node p05/cli.mjs "  BonJour   Monde  "
# BonJour Monde

node p05/cli.mjs ""
# une ligne vide
```

Passer exactement un argument ; les guillemets permettent de conserver les
espaces dans cet argument. La CLI écrit le résultat suivi d'un saut de ligne sur
stdout et termine avec le code 0. Zéro ou plusieurs arguments donnent un message
d'usage sur stderr, aucune sortie sur stdout et le code 1.

La CLI ne lit pas stdin et ne propose aucune option : `--help`, par exemple,
est traité comme du texte. Elle n'accède pas au réseau et n'écrit aucun fichier.

## Tests

Depuis la racine du dépôt :

```sh
node --test
```

Les tests utilisent `node:test` et `node:assert/strict`. Ils vérifient l'API et
la CLI dans des processus Node.js, notamment les erreurs, les chaînes vides et
les espaces Unicode.
