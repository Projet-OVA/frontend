### 1. **Configuration globale / environnement**

* `app.config.ts`
  → Paramètres généraux de l’app côté client (API URLs, constantes, options diverses).
* `app.config.server.ts`
  → Config spécifique côté serveur (SSR), éventuellement variables d’environnement.

---

### 2. **Routes**

* `app.routes.ts`
  → Définir les routes Angular côté client (paths, composants, guards éventuels).
* `app.routes.server.ts`
  → Configurer le rendu SSR par route (renderMode, etc).

---

### 3. **Composants principaux / pages**

Remplis les dossiers de composants qui correspondent à tes routes :

* `login/login.ts` + `login.html` + `login.scss`
* `dashboard/dashboard.ts` + `dashboard.html` + `dashboard.scss`
* `badges/badges-list/badges-list.ts` + `.html` + `.scss`
* `badges/badges-create` / `badges/badges-edit`
* `contents/challenges/...` (list, create, edit, participations)
* `contents/educational/...` (list, create, edit)
* `podcasts/podcasts-list` + `podcast-validate`
* `settings/general/languages`, `settings/general/translations`
* `settings/notifications`, `settings/quotas`
* `users/users-list` + `users/user-profile`

Le remplissage suit la logique fonctionnelle de ton application.

---

### 4. **App root files**

* `app.ts`
  → Point d’entrée Angular pour déclarer le module principal, bootstrap, providers.
* `app.html`
  → Template racine (généralement `<router-outlet></router-outlet>` + layout commun).
* `app.scss`
  → Styles globaux.

---

### 5. **Tests**

* `*.spec.ts` dans chaque dossier/component
  → Tests unitaires, à faire au fur et à mesure ou après implémentation des composants.

---

### 6. **SSR & serveur**

* `main.ts` (client bootstrap)
* `main.server.ts` (serveur bootstrap)
* `server.ts` (serveur Node pour SSR)
