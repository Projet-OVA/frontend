| Domaine          | Méthode | Endpoint                     | Description brève                                           | ELIMANE        |
| ---------------- | ------- | ---------------------------- | ----------------------------------------------------------- |----------------|
| **Auth**         | POST    | `/auth/login`                | Authentifie un admin, retourne un token JWT                 |                |
|                  | POST    | `/auth/logout`               | Invalide le token actuel (optionnel)                        |                |
|                  | GET     | `/auth/me`                   | Récupère les infos de l’utilisateur connecté                |       x        |
| **Utilisateurs** | GET     | `/users`                     | Récupère la liste paginée de tous les utilisateurs          |       x        |
|                  | GET     | `/users/:id`                 | Récupère le détail d’un utilisateur                         |       x        |
|                  | POST    | `/users`                     | Crée un nouvel utilisateur                                  |       x        |
|                  | PUT     | `/users/:id`                 | Met à jour les informations d’un utilisateur                |       x        |
|                  | DELETE  | `/users/:id`                 | Supprime un utilisateur                                     |       x        |
| **Contenus**     | GET     | `/contents`                  | Récupère la liste de tous les parcours/contenus             |                |
|                  | GET     | `/contents/:id`              | Récupère le détail d’un contenu                             |                |
|                  | POST    | `/contents`                  | Crée un nouveau contenu                                     |                |
|                  | PUT     | `/contents/:id`              | Met à jour un contenu existant                              |                |
|                  | DELETE  | `/contents/:id`              | Supprime un contenu                                         |                |
| **Badges**       | GET     | `/badges`                    | Liste tous les badges existants                             |                |
|                  | GET     | `/badges/:id`                | Récupère le détail d’un badge                               |        x       |
| **Rapports**     | GET     | `/reports`                   | Récupère la liste des rapports disponibles                  |        x       |
|                  | GET     | `/reports/:id`               | Récupère un rapport précis                                  |        x       |
| **Paramètres**   | GET     | `/settings`                  | Récupère tous les paramètres globaux                        |        x       |
|                  | PUT     | `/settings`                  | Met à jour les paramètres globaux                           |        x       |
| **Dashboard**    | GET     | `/dashboard/stats`           | Récupère les KPI principaux (users, contenus, badges, etc.) |                |
|                  | GET     | `/dashboard/recent-activity` | Récupère les activités récentes des utilisateurs            |                |
|                  | GET     | `/dashboard/top-contents`    | Récupère les contenus les plus consultés                    |                |


- Paramétres:
    - liste des admins,
    - derniére connexion (date et heures)
- Dashboard:
    - tous les utilisateurs qui sont inscrits,
    - le nombre de parcours(défis) publié,
    - le nombre d'utilisateurs qui ont un badge,
    - les parcours les plus consultés,
    - les défis avec plus de participants
- Rapports:
    - le fait de pouvoir imprimer les rapports


- Auth              --> Complet

- Publications      --> Complet

- Cours             --> Complet

- Events            --> Complet (Supprimer à définir)

- Utilisateurs      --> 

- Paramètres        -->

- Dashboard         -->

- Communauté        -->