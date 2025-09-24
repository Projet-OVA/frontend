#!/bin/bash

# Ne commit que s'il y a des changements
if ! git diff-index --quiet HEAD --; then
    git add .
    git commit -m "
        Reste:
            - Super Admin doit modifier créer des Admins
            - Super Admin doit créer des cours
            - Admin doit GET api/progress
                    "
fi

# Pousser sur gitea et origin séparément, sortie silencieuse
git push gitea main >/dev/null 2>&1
git push origin main >/dev/null 2>&1

echo "✅ Push terminé sur gitea et github."
