# 🌐 SIRA — Frontend Administrateur (Angular)

> Branche : `frontend`  
> Responsable : Mouhamed Diouf

## 🎯 Objectif

La partie backoffice est l’outil interne pour l’équipe OVA afin de:
- Gérer les contenus (parcours éducatifs, défis, récits audio, quiz).
- Gérer les utilisateurs (employés, jeunes participants, mentors).
- Analyser les statistiques (complétion, rétention, badges obtenus…).
- Produire des rapports et visualisations (diagrammes, graphiques, cartes).
- Contrôler la qualité et valider les contenus avant publication.

---

## 🚀 Stack technique

- Angular 20+
- TypeScript
- Angular Material
- NGXS ou RxJS pour la gestion d’état
- Auth via Firebase / Token JWT
- API REST NestJS (backend)

---

## ⚙️ Prérequis

- Node.js v18+
- Angular CLI (`npm install -g @angular/cli`)
- Navigateur moderne

---

## 🧪 Installation locale

```bash
npm install
ng serve
```

---

## Structure
```
/src
 ├─ app/
 │   ├─ pages/        # Pages principales (dashboard, parcours, etc.)
 │   ├─ components/   # Composants réutilisables
 │   ├─ services/     # Appels API
 │   └─ guards/       # Authentification
 ├─ assets/           # Logos, images, traductions
 └─ environments/     # Variables (dev, prod)
```

---

## 📌 Fonctionnalités cibles
- Connexion sécurisée (auth + rôles)
- Tableau de bord administrateur
- Création/édition de parcours & récits
- Statistiques d’usage
- Multilingue (ngx-translate)
- Publication et modération de contenus

