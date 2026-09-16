# PHASE-02 — preuves TDD

Source : [CDC, AC-P502 et AC-P503](../docs/phase05-cdc.md), phase CLI et
documentation du plan fourni. Parcours : normaliser un argument depuis le
terminal, comprendre les erreurs d'invocation et disposer d'exemples API/CLI.

Runner : `node:test` et `node:assert/strict`, sans package tiers. Le script npm
existant concerne les anciens contrôles synthétiques ; aucun détecteur de
package manager n'est présent dans le dépôt.

## Résultats observés

- RED : `node --test p05/cli.test.mjs` — 10 tests exécutés, 10 échecs avant
  implémentation. Le processus signale `MODULE_NOT_FOUND` pour `p05/cli.mjs` ;
  les assertions sur le succès ou le message d'usage échouent.
- GREEN : même commande — 10 tests réussis, 0 échec, 0 ignoré.
- Suite et couverture : `node --test --experimental-test-coverage` — 49 tests
  réussis, 0 échec, 0 ignoré. `cli.mjs` et `normalize.mjs` : lignes, branches et
  fonctions à 100 %.

| Garantie | Vérification | Type | Résultat |
| --- | --- | --- | --- |
| Un argument produit le texte normalisé et un seul saut de ligne, code 0 et stderr vide | Six cas de succès dans `cli.test.mjs` | Processus | PASS |
| Chaîne vide, espaces Unicode et retours à la ligne sont acceptés | Cas dédiés dans `cli.test.mjs` | Processus | PASS |
| Un texte ressemblant à une option reste du texte | Cas `--help` dans `cli.test.mjs` | Processus | PASS |
| Zéro, deux ou trois arguments produisent un usage sur stderr, stdout vide et un code non nul | Quatre cas de rejet dans `cli.test.mjs` | Processus | PASS |
| Le contenu fourni sur stdin ne devient pas la sortie | Entrée distincte fournie à chaque processus | Processus | PASS |
| La notice décrit API, CLI, erreurs et `node --test` | Lecture de `README.md` | Revue documentaire | Conforme |

La CLI délègue à l'API existante. Le code 1 est le choix minimal pour l'erreur
d'usage, le CDC imposant seulement un code non nul. Aucun refactoring ni
changement des fichiers existants n'a été nécessaire. Aucun parcours navigateur.
L'absence d'accès réseau et d'écriture de fichier est vérifiée par lecture du
code ; ces effets ne sont pas instrumentés par les tests.

Les preuves RED/GREEN sont conservées ici ; aucun checkpoint Git créé,
les métadonnées Git étant hors du périmètre accessible en écriture.
