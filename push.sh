#!/bin/bash

# Ne commit que s'il y a des changements
if ! git diff-index --quiet HEAD --; then
    git add .
    git commit -m "
        Login réussi
        publications:
            - Nouvelle publication: ça marche !
            - Éditer: ça marche pas !
            - Supprimer: ça marche pas !
            - Publier: ça marche pas !
                    "
fi

# Pousser sur gitea et origin séparément, sortie silencieuse
git push gitea main >/dev/null 2>&1
git push origin main >/dev/null 2>&1

echo "✅ Push terminé sur gitea et github."
