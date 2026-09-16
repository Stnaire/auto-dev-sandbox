# PHASE-01 — preuves TDD

Source : [CDC, AC-P501](../docs/phase05-cdc.md). Parcours : appeler
`normalize(text)` pour réduire les espaces sans modifier la casse et rejeter
les valeurs qui ne sont pas des chaînes primitives.

Runner : `node:test` et `node:assert/strict`, sans dépendance externe.
Le script npm existant concerne les anciens contrôles synthétiques ; aucun
détecteur de package manager n'est présent dans ce dépôt.

## Résultats observés

- RED : `node --test p05/normalize.test.mjs` — 1 test exécuté, 1 échec,
  `ERR_MODULE_NOT_FOUND` pour `p05/normalize.mjs`, avant son implémentation.
- GREEN : même commande — 39 tests réussis, 0 échec, 0 ignoré.
- Couverture : `node --test --experimental-test-coverage` — 39 tests réussis ;
  `normalize.mjs` : lignes 100 %, branches 100 %, fonctions 100 %.

| Garantie | Tests unitaires dans `normalize.test.mjs` | Résultat |
| --- | --- | --- |
| Chaîne vide, casse et caractères hors espaces conservés | Cas nommés de la table `cases` | PASS |
| Suites d'espaces remplacées partout et extrémités nettoyées | Espaces ASCII, mixtes et 19 espaces Unicode | PASS |
| Toute catégorie de valeur non string lève TypeError | 12 entrées de `nonStrings`, dont objet String | PASS |

Implémentation minimale : garde de type puis remplacement global `/\s+/gu`
et `trim()`. Aucun refactoring nécessaire. La CLI relève de PHASE-02.
Les preuves RED/GREEN sont conservées ici ; aucun checkpoint Git créé,
les métadonnées Git étant hors du périmètre accessible en écriture.
