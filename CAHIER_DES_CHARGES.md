# Backoffice SIRA — Détails complets des fonctionnalités

---

### 1. Gestion des contenus éducatifs

**Objectif :** Permettre aux administrateurs de gérer l’ensemble des parcours éducatifs (modules audio, vidéo, quiz), leur organisation, et les fichiers associés.

* **Liste des parcours :**

  * Vue paginée, filtrable (par thème, langue, niveau, statut actif/inactif)
  * Recherche par titre, auteur, date de création/modification

* **Création/édition d’un parcours :**

  * Titre, description courte et longue
  * Thème (ex : citoyenneté, volontariat, engagement, etc.)
  * Niveau de difficulté ou tranche d’âge cible (ex : 15-18, 19-25 ans)
  * Langue(s) disponible(s) avec possibilité de traductions multi-langues (français, langues locales, anglais, etc.)
  * Choix du format (audio, vidéo, quiz)
  * Upload des médias (audio MP3, vidéo MP4) avec contrôle taille/fichier
  * Pour quiz : créer questions à choix multiple, vrai/faux, réponses libres, nombre de points par question
  * Durée estimée du module
  * Tags / mots-clés pour faciliter la recherche

* **Organisation :**

  * Possibilité de structurer les parcours en chapitres ou étapes
  * Ordonnancement manuel (drag & drop) des modules
  * Activation/désactivation des parcours

* **Gestion des fichiers médias :**

  * Upload sécurisé avec progress bar
  * Visualisation et écoute/lecture directe dans le backoffice
  * Suppression / remplacement des fichiers

* **Historique et logs :**

  * Traçabilité des modifications (qui, quand, quoi)

---

### 2. Gestion des défis communautaires

**Objectif :** Gérer les challenges que les jeunes doivent relever localement, avec suivi des participations et modération.

* **Liste des défis :**

  * Tableau avec titre, description, zone géographique ciblée, statut (actif, en pause, terminé)
  * Filtrage par région, date, niveau de difficulté
  * Recherche par mots-clés

* **Création/édition d’un défi :**

  * Titre et description détaillée
  * Règles du défi (conditions à remplir)
  * Zone géographique (ville, quartier) ou cible (groupes spécifiques)
  * Date de début et de fin
  * Récompenses/badges associés
  * Liens vers contenus éducatifs associés

* **Participation et modération :**

  * Visualisation des participations utilisateurs avec preuves soumises (photos, vidéos, textes)
  * Outils de validation ou rejet (avec commentaires)
  * Notification automatique aux participants sur statut de leur participation
  * Statistiques en temps réel par défi, région, utilisateur

* **Statistiques globales :**

  * Nombre total de défis lancés
  * Taux de participation par zone
  * Taux de réussite des défis

---

### 3. Gestion des utilisateurs

**Objectif :** Contrôler les comptes des jeunes testeurs, mentors, enseignants, et gérer leur accès au système.

* **Liste utilisateurs :**

  * Affichage paginé avec filtres (par rôle, statut, date inscription, progression)
  * Recherche par nom, email, pseudo, ID utilisateur
  * Affichage des détails (profil complet)

* **Profil utilisateur détaillé :**

  * Informations personnelles (nom, âge, sexe, localisation)
  * Statut du compte (actif, suspendu, banni)
  * Historique des connexions
  * Parcours complétés, badges obtenus, défis réalisés
  * Feedback et notes laissées par l’utilisateur
  * Interaction possible : envoi de message via backoffice, alertes, notifications

* **Actions sur les comptes :**

  * Activer / désactiver / suspendre / supprimer un compte
  * Reset mot de passe
  * Attribution/révocation de rôles (ici, exclusivement admins, mais prévoir évolutivité)

* **Gestion des rôles et permissions :**

  * Interface de configuration des permissions d’administration (CRUD contenus, validation défis, gestion utilisateurs)
  * Audit des actions administratives (logs)

---

### 4. Gestion des badges et récompenses

**Objectif :** Configurer les règles et contenus des badges distribués aux utilisateurs, et suivre leur attribution.

* **Liste des badges :**

  * Visualisation des badges existants (nom, icône, description, critères d’attribution)
  * Filtrage et recherche

* **Création/édition d’un badge :**

  * Nom et description claire
  * Icône ou image associée (upload)
  * Critères d’attribution (ex : compléter un parcours, réussir un quiz, valider un défi)
  * Valeur ou poids (ex : points)

* **Gestion des règles d’attribution :**

  * Paramétrage des conditions (ex : nombre minimal de points, étapes franchies)
  * Règles combinées (ex : badge A + badge B = badge C)

* **Suivi des badges distribués :**

  * Statistiques sur nombre de badges attribués par utilisateur, par badge, par période
  * Export des données

---

### 5. Gestion des récits audio et podcasts

**Objectif :** Valider, publier et organiser les récits et podcasts créés en collaboration avec les jeunes.

* **Liste des récits :**

  * Titres, auteurs, durée, date de publication, statut (brouillon, en validation, publié)
  * Recherche et filtrage

* **Validation/modération :**

  * Écoute des fichiers audio depuis le backoffice
  * Validation ou rejet avec commentaire
  * Possibilité d’éditer métadonnées (titre, description, tags)

* **Gestion des publications :**

  * Planification de la publication (date/heure)
  * Classement par thèmes, langues

---

### 6. Dashboard et rapports

**Objectif :** Offrir une vue synthétique des indicateurs clés pour piloter la plateforme.

* **KPIs principaux :**

  * Taux de complétion des parcours (>60%)
  * Taux de rétention (utilisateurs actifs > 1 semaine)
  * Nombre total d’utilisateurs actifs
  * Nombre de défis réalisés et réussis
  * Progression moyenne par utilisateur

* **Visualisations graphiques :**

  * Courbes d’évolution dans le temps
  * Répartition géographique des utilisateurs actifs et participations
  * Histogrammes et diagrammes sur les badges attribués

* **Rapports :**

  * Export PDF/CSV des données sur demande
  * Rapports périodiques automatisés (hebdomadaires, mensuels) envoyés par email aux admins

* **Feedback utilisateurs :**

  * Synthèse des retours qualitatifs (commentaires, notes)
  * Analyse de tendance (sentiment positif/négatif)

---

### 7. Paramètres généraux et configuration

**Objectif :** Gérer les paramètres globaux, techniques et de sécurité du backoffice et de l’app.

* **Multilingue :**

  * Liste des langues activées
  * Interface de gestion des traductions (texte, boutons, messages)
  * Ajout / suppression de langues

* **Notifications :**

  * Paramétrage des notifications push dans l’app (types, fréquence)
  * Gestion des emails automatiques (ex : validation compte, rappel défi)

* **Limites et quotas :**

  * Paramétrage des quotas utilisateurs (nombre max de parcours par période, défis simultanés)
  * Limitation d’accès (par IP, horaires)

* **Sécurité backoffice :**

  * Gestion des sessions actives
  * Politique mot de passe (complexité, expiration)
  * Authentification forte (2FA, OAuth si besoin)
  * Logs de connexion et tentatives échouées
  * Gestion des accès par rôle / permission

* **Maintenance et logs système :**

  * Interface pour consulter les erreurs applicatives et logs serveur
  * Outils de diagnostic simples

---

# Notes techniques complémentaires

* **Technos front :** Angular (idéalement version récente), responsive, performant
* **Communication API :** Consommation des API REST ou GraphQL NestJS (authentification JWT)
* **UX/UI :** Simple, claire, avec onboarding pour les administrateurs non techniques
* **Sécurité :** CSRF, XSS, protections front-end, HTTPS obligatoire
* **Gestion des erreurs :** Notifications claires, logs centralisés
* **Tests :** Unitaires et end-to-end (E2E) recommandés

---
