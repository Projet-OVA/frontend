## Authentification

| Méthode | Endpoint            | Description            | Paramètres / Payload     |
| ------- | ------------------- | ---------------------- | ------------------------ |
| POST    | /auth/login         | Connexion admin        | { email, password }      |
| POST    | /auth/logout        | Déconnexion            | Token d’authentification |
| GET     | /auth/me            | Récupérer profil admin | Token                    |
| POST    | /auth/refresh-token | Rafraîchir token JWT   | Refresh token            |


---

## Gestion contenus éducatifs

| Méthode | Endpoint                     | Description                           | Payload / Params                                             |
| ------- | ---------------------------- | ------------------------------------- | ------------------------------------------------------------ |
| GET     | /educational-contents        | Liste parcours (filtrage, pagination) | query: {theme, langue, niveau, page}                         |
| GET     | /educational-contents/\:id   | Détail parcours                       | id parcours                                                  |
| POST    | /educational-contents        | Création parcours                     | titre, description, thème, niveau, langue(s), media, quiz... |
| PUT     | /educational-contents/\:id   | Modification parcours                 | idem POST + id                                               |
| DELETE  | /educational-contents/\:id   | Suppression parcours                  | id                                                           |
| POST    | /educational-contents/upload | Upload fichier média                  | fichier (audio, vidéo)                                       |


---

## Gestion défis communautaires

| Méthode | Endpoint         | Description                        | Payload / Params                                                |
| ------- | ---------------- | ---------------------------------- | --------------------------------------------------------------- |
| GET     | /challenges      | Liste défis (filtrage, pagination) | query: {region, statut, page}                                   |
| GET     | /challenges/\:id | Détail défi                        | id défi                                                         |
| POST    | /challenges      | Création défi                      | titre, description, région, date début/fin, règles, récompenses |
| PUT     | /challenges/\:id | Modification défi                  | idem POST + id                                                  |
| DELETE  | /challenges/\:id | Suppression défi                   | id                                                              |


---

## Participations

| Méthode | Endpoint                                          | Description                    | Payload / Params                                 |
| ------- | ------------------------------------------------- | ------------------------------ | ------------------------------------------------ |
| GET     | /challenges/\:id/participations                   | Liste participations pour défi | id défi, filtres                                 |
| PUT     | /challenges/\:id/participations/\:partId/validate | Valider participation          | id défi, id participation, validité, commentaire |
| PUT     | /challenges/\:id/participations/\:partId/reject   | Rejeter participation          | idem                                             |


---

## Gestion utilisateurs

| Méthode | Endpoint                   | Description                   | Payload / Params            |
| ------- | -------------------------- | ----------------------------- | --------------------------- |
| GET     | /users                     | Liste utilisateurs            | query: {role, statut, page} |
| GET     | /users/\:id                | Profil utilisateur            | id utilisateur              |
| PUT     | /users/\:id                | Mise à jour profil            | données à modifier          |
| DELETE  | /users/\:id                | Suppression ou suspension     | id utilisateur              |
| POST    | /users/\:id/reset-password | Réinitialisation mot de passe | id utilisateur              |


---

## Gestion badges

| Méthode | Endpoint     | Description        | Payload / Params                  |
| ------- | ------------ | ------------------ | --------------------------------- |
| GET     | /badges      | Liste badges       | pagination, filtres               |
| GET     | /badges/\:id | Détail badge       | id badge                          |
| POST    | /badges      | Création badge     | nom, description, icône, critères |
| PUT     | /badges/\:id | Modification badge | idem POST + id                    |
| DELETE  | /badges/\:id | Suppression badge  | id badge                          |


---

## Gestion podcasts / récits audio

| Méthode | Endpoint                | Description        | Payload / Params                |
| ------- | ----------------------- | ------------------ | ------------------------------- |
| GET     | /podcasts               | Liste récits audio | filtres, pagination             |
| GET     | /podcasts/\:id          | Détail récit       | id podcast                      |
| PUT     | /podcasts/\:id/validate | Valider récit      | statut validation, commentaires |
| PUT     | /podcasts/\:id/reject   | Rejeter récit      | idem                            |


---

## Dashboard & rapports

| Méthode | Endpoint              | Description                    | Payload / Params       |
| ------- | --------------------- | ------------------------------ | ---------------------- |
| GET     | /dashboard/summary    | KPIs globaux                   | filtres (date, région) |
| GET     | /dashboard/usage      | Stats détaillées utilisateurs  | filtres                |
| GET     | /dashboard/challenges | Statistiques défis             | filtres                |
| GET     | /dashboard/badges     | Statistiques badges            | filtres                |
| GET     | /dashboard/feedback   | Synthèse retours utilisateurs  | filtres                |
| GET     | /reports/export       | Export des rapports (CSV, PDF) | type, période          |


---

## Paramètres généraux

| Méthode | Endpoint                   | Description                 | Payload / Params   |
| ------- | -------------------------- | --------------------------- | ------------------ |
| GET     | /settings/languages        | Liste langues activées      |                    |
| POST    | /settings/languages        | Ajouter langue              | code langue, nom   |
| DELETE  | /settings/languages/\:code | Supprimer langue            | code langue        |
| PUT     | /settings/translations     | Mise à jour des traductions | clé, texte traduit |


---

## Notifications

| Méthode | Endpoint                | Description            | Payload / Params       |
| ------- | ----------------------- | ---------------------- | ---------------------- |
| GET     | /settings/notifications | Liste paramètres notif |                        |
| PUT     | /settings/notifications | Mise à jour            | type, fréquence, actif |


---

## Quotas

| Méthode | Endpoint         | Description         | Payload / Params |
| ------- | ---------------- | ------------------- | ---------------- |
| GET     | /settings/quotas | Consultation quotas |                  |
| PUT     | /settings/quotas | Mise à jour quotas  | limites, seuils  |
