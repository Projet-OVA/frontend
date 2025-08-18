#!/bin/bash

# Ne commit que s'il y a des changements
if ! git diff-index --quiet HEAD --; then
    git add .
    git commit -m "
                    user-list
                    user-profile
                    login
                    challenges
                    challenges/create
                    challenges/edit
                    participations
                    badges
                    badges/create
                    badges/edit
                    badges/id
                    podcasts
                    podcasts/validate
                    settings/languages
                    settings/translations
                    settings/notifications
                    settings/quotas
                    educational
                    educational/create
                    educational/edit
                    educational/id
                    dashboard
                    dashboard/usage
                    dashboard/challenges
                    dashboard/badges
                    dashboard/feedback
                    reports/export --> manquant
                    ...
                    "
fi

# Pousser sur gitea et origin séparément, sortie silencieuse
git push gitea main >/dev/null 2>&1
git push origin main >/dev/null 2>&1

echo "✅ Push terminé sur gitea et github."
