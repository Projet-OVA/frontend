#!/bin/bash

# Ne commit que s'il y a des changements
if ! git diff-index --quiet HEAD --; then
    git add .
    git commit -m "
                    dashboard
                    user-list
                    user-profile
                    login
                    educational
                    educational/create
                    educational/edit
                    challenges
                    challenges/create
                    challenges/edit
                    participations
                    badges
                    badges/create
                    badges/edit
                    podcasts
                    podcasts/validate
                    ...
                    "
fi

# Pousser sur gitea et origin séparément, sortie silencieuse
git push gitea main >/dev/null 2>&1
git push origin main >/dev/null 2>&1

echo "✅ Push terminé sur gitea et github."
