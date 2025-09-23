#!/bin/bash

# Ne commit que s'il y a des changements
if ! git diff-index --quiet HEAD --; then
    git add .
    git commit -m "
        Nouveaux changements le $(date +"%Y-%m-%d %H:%M:%S")
        
                    "
fi

# Pousser sur gitea et origin séparément, sortie silencieuse
git push gitea main >/dev/null 2>&1
git push origin main >/dev/null 2>&1

echo "✅ Push terminé sur gitea et github."
