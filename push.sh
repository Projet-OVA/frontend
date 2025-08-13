#!/bin/bash

# Ajouter tous les changements et commit
git add .
git commit -m "dashboard user-list user-profile ..." 2>/dev/null

# Pousser sur gitea
git push gitea main

# Pousser sur origin
git push origin main
