/login
/dashboard
    / (vue générale KPIs, graphiques)
/contents
    /educational
        - list (tableau parcours)
        - create
        - edit/:id
    /challenges
        - list (tableau défis)
        - create
        - edit/:id
        - participations/:challengeId (modération participations)
/users
    - list (tableau utilisateurs)
    - profile/:userId (détail, gestion compte)
/badges
    - list (tableau badges)
    - create
    - edit/:id
/podcasts
    - list (récits audio)
    - validate/:podcastId
/settings
    /general
        - languages
        - translations
    /notifications
    /quotas
