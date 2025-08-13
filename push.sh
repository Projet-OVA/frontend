#!/bin/bash

# Ajouter tous les fichiers modifiés
git add .

# Commit avec message multi-lignes
git commit -m "
dashboard
user-list
user-profile
...
"

# Pousser sur Gitea
git push gitea main

# Pousser sur GitHub
git push origin main
