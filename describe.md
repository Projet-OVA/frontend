
***************** app début *****************

Présentation de l’organisation :
 OVA est une ONG engagée dans la mobilisation des jeunes autour de l’engagement citoyen, de l’éducation civique, et du volontariat. Avec SIRA, elle entend offrir une réponse numérique aux défis du désengagement des jeunes en Afrique de l’Ouest, en s’appuyant sur des formats culturels, accessibles et mobiles.Problème identifié
 La jeunesse ouest-africaine est massivement connectée, mais de plus en plus déconnectée des enjeux citoyens.
 Les causes :

    Manque de contenus adaptés à leur quotidien, leur langue, leur culture
    Disparition des repères traditionnels de participation civique
    Approches éducatives trop descendantes, institutionnelles, peu engageantes
    Absence de supports pédagogiques modernes pour les enseignants

Solution proposée : SIRA
 Une application mobile pensée comme un mentor numérique de quartier, qui reconnecte les jeunes à leur citoyenneté à travers :

    Des parcours éducatifs courts (audio, vidéo, lecture, quiz)
    Des défis communautaires à relever localement
    Un système de badges et progression ludique
    Un dashboard personnalisé pour suivre son engagement
    Un chat IA simple pour accompagner l’apprentissage
    Des récits inspirants co-construits avec des jeunes et mentors locaux
> « SIRA est une application conçue pour apprendre à agir, pas juste à écouter. »
Objectifs principaux :

    Obtenir un taux de complétion des parcours > 60 %
    Mobiliser 1 000 jeunes testeurs dans 2 pays pour la phase pilote
    Réduire de 50 % le désengagement face aux parcours citoyens classiques
    Produire 30 récits audio inspirants avec les jeunes
    Sceller 3 partenariats stratégiques (ONG, écoles, médias locaux)

Persona principal : Awa (19 ans, Conakry)

    Hyperconnectée, consommatrice de contenus TikTok / Instagram
    Déconnectée des enjeux civiques, ne vote pas, manque de repères
    Représente une jeunesse numérique mais politiquement désengagée

Personas secondaires :

    Mamadou (28 ans) : salarié débordé, informé mais passif
    Mme Sanogo (42 ans) : enseignante engagée, en quête d’outils modernes pour sensibiliser ses élèves

Fonctionnalités clés (MVP) :

    Parcours en formats courts (audio, vidéo, quiz)
    Défis citoyens locaux à relever en groupe ou seul
    Badges et progression gamifiée
    Podcasts, récits inspirants co-créés avec des jeunes
    Dashboard personnalisé
    Assistant IA pour guider les utilisateurs

Contraintes spécifiques :

    Budget limité, MVP à produire en 3 mois
    Accès réseau variable → priorité à un app léger et offline-ready
    Onboarding simple et multilingue
    Éviter les sujets politiques partisans, diplômes officiels, ou déploiement massif avant test

KPIs ciblés :

    Taux de complétion > 60 %
    Taux de rétention > 1 semaine
    Nombre de défis réalisés
    Feedback qualitatif testeurs
    3 mois : mesurer les utilisateurs actifs et la viralité communautaire

Contexte et marché

    200+ millions de jeunes < 30 ans en Afrique de l’Ouest
    50 % de pénétration smartphone en zone urbaine
    Boom de l’audio social, micro-formation et contenus mobiles
    Marché à fort effet de levier communautaire et institutionnel

Mission
> « SIRA serait ce mentor du quartier, jeune et engagé, qui parle toutes les langues et montre que la citoyenneté commence là où tu es. »
>  Rendre la citoyenneté active accessible, vivante et désirable pour la jeunesse ouest-africaine via une plateforme numérique éducative, inclusive et culturellement enracinée.
Vision future :

    Une application panafricaine de référence sur la citoyenneté numérique
    Des communautés de jeunes engagés par ville ou quartier
    Une plateforme ouverte aux ONG, écoles et institutions partenaires

Effet “wow” recherché :
> Faire de la citoyenneté une expérience émotionnelle, simple, valorisante et enracinée dans les cultures africaines.
>  « Tu apprends, tu agis, tu laisses une trace. »



***************** app fin *****************




***************** backoffice début *****************

I) Objectif de l’Admin SIRA
- La partie Admin est destinée aux responsables de l’OVA et aux partenaires pour :
    - Gérer les utilisateurs et suivre leur progression.
    - Gérer les contenus (parcours, quiz, défis, témoignages).
    - Suivre les badges (progression et communautaires).
    - Produire des rapports simples basés sur des KPIs.

II) Gestion des rôles
- Il y aura 2 niveaux d’administration :
1) Super Admin
- Crée/supprime des comptes Admin.
- Définit les règles globales (badges, progression, seuils).
- Supervise tous les KPIs et rapports consolidés.

2) Admin standard
- Suit les utilisateurs.
- Valide les contenus et défis.
- Consulte les KPIs, mais ne peut pas changer les règles globales.

III) Badges & Catégories
- Deux familles de badges :
1. Badges parcours éducatifs
    - Ndorte (Premier pas) → profil complété.
    - Djed (Stabilité) → progression ≥ 50 %.
    - Ankh (Accomplissement total) → parcours terminé à 100 %.

2. Badge communautaire
    - Lamaan (Communauté) → Lancement d’un défi (invitations, et preuve d'accomplissement).


IV) 📊 KPIs pour l’attribution automatique
1. Ndorte (Premier pas)
- % Profils complétés (Nb profils complétés ÷ Nb inscrits).
- Taux de conversion inscription → profil complété.
- Délai moyen de complétion du profil (en jours).

2. Djed (Stabilité/persévérance)
- Progression moyenne du parcours (% modules validés).
- % Utilisateurs ayant atteint 50 %.
- Taux d’abandon avant 50 %.
- Temps moyen pour atteindre 50 %.

3. Ankh (Accomplissement total)
- % Parcours terminés (100 %).
- Taux de complétion global (terminés ÷ inscrits).
- Durée moyenne pour terminer un parcours.
- Nombre de tentatives avant réussite.

4. Lamaan (Communauté/leadership)
- Nombre d’invitations envoyées par utilisateur.
- % Utilisateurs ayant invité ≥ 3 amis.
- Taux de participation aux activités collectives.
- Nombre moyen de contributions communautaires.

V) 📈 KPIs transversaux (Dashboard Admin)
- Nombre total de badges distribués (par type).
- % Utilisateurs ayant au moins 1 badge.
- Score moyen de badges par utilisateur (gamification globale).
- Taux de rétention entre étapes clés : Ndorte → Djed → Ankh.

VI) 📌 Écrans Admin obligatoires
1. Login Admin
- Email + mot de passe.
- Authentification sécurisée basique.

2. Dashboard (Accueil Admin)
- Indicateurs clés : inscriptions, actifs, complétion, défis, badges.
- Graphiques simples (librairie type Chart.js).

3. Utilisateurs
- Liste utilisateurs (nom, âge, email, statut).
- Profil utilisateur (parcours complétés, badges obtenus, défis réalisés).
- Actions : suspendre / réactiver / modifier.

4. Contenus
- Parcours éducatifs : ajouter / modifier / supprimer.
- Défis communautaires : ajouter / valider / refuser.
- Témoignages : upload audio/vidéo, associer catégorie.

5. Badges & Progression
- Tableau avec badges (Ndorte, Djed, Ankh, Lamaan).
- Règles d’attribution (déjà définies ci-dessus).
- Statistiques : nb attribués par type.

6. Rapports & Export
- Rapport utilisateurs (progression, engagement).
- Rapport contenus (popularité parcours/défis).
- Export CSV/Excel.

7. Paramètres
- Multilingue (FR + langues locales).
- Gestion des accès admins.
- Logs de sécurité.

VII) Autres :
- Prévoir intégration avec le backend (@elimane GNING @samba NGOM ) pour :
    - API inscription/login.
    - API progression + badges.
    - API défis.
    - Merci de preciser les autres API @Mouhamed Diouf

***************** backoffice fin *****************
