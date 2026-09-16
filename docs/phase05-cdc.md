# Utilitaire synthétique P05 : normalize-spaces

Petit projet de test public, sans données ni dépendances externes.

- AC-P501 : `p05/normalize.mjs` exporte `normalize(text)`. Pour une chaîne, remplacer chaque suite de caractères correspondant à `/\s+/u` par un espace ASCII puis retirer les espaces en début et fin. Préserver la casse. Pour toute valeur non string, lever TypeError. La chaîne vide retourne la chaîne vide.
- AC-P502 : `node p05/cli.mjs "texte"` accepte exactement un argument, écrit normalize(argument) suivi d'un saut de ligne et termine avec code 0. Zéro ou plusieurs arguments produisent un message d'usage sur stderr, rien sur stdout et un code non nul. Aucun stdin, option, réseau ou écriture de fichier.
- AC-P503 : ajouter une notice `p05/README.md` avec l'utilisation API/CLI et la commande `node --test`. Tests automatisés via node:test et node:assert/strict, incluant erreurs, chaîne vide et espaces Unicode. Aucun package tiers.

Périmètre des agents : uniquement le nouveau dossier p05. Conserver les anciens fichiers synthétiques et leur CI. Ne pas modifier ce CDC ni la roadmap. Chaque phase peut être vérifiée par `node --test`. Le test CLI n'est demandé qu'en phase 2.
