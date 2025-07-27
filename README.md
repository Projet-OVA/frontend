# 🌐 SIRA — Frontend Administrateur (Angular)

> Branche : `frontend`  
> Responsable : Mouhamed Diouf

## 🎯 Objectif

Créer l’interface web d’administration permettant aux ONG, mentors et partenaires de :
- Gérer les contenus (parcours, récits, défis, quiz)
- Suivre les statistiques d’engagement
- Publier du contenu multilingue et localisé

---

## 🚀 Stack technique

- Angular 17+
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
git checkout frontend
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
