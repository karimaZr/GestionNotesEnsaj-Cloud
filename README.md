# GestionNotesEnsaj-Cloud

Application web cloud de gestion des notes et des évaluations des étudiants, avec accès sécurisé par rôle (enseignant / étudiant) et disponibilité des données en temps réel.

## Démonstration

Les vidéos de démonstration sont disponibles ci-dessous.

https://github.com/user-attachments/assets/c5a5036d-65ee-48a6-acda-a21bf0d870a0


https://github.com/user-attachments/assets/a9a2cfd1-de0f-4f5d-9461-4745c762ac4e

## Fonctionnalités

L'application propose trois rôles, chacun avec un tableau de bord personnalisé et un accès sécurisé par authentification.

**Administrateur**
- Création et gestion des comptes enseignants et étudiants
- Gestion des filières, des modules et des éléments
- Import de fichiers Excel de notes et lancement du traitement automatisé : extraction des notes, barèmes et identifiants des étudiants (via Google Apps Script)
- Ajout des notes dans la base et envoi automatique d'un e-mail de notification aux étudiants une fois les notes publiées
- Tableau de bord personnalisé
**Enseignant**
- Consultation des notes des éléments dont il est responsable
- Affectation de tâches aux étudiants
- Tableau de bord personnalisé

**Étudiant**
- Consultation de ses notes et de sa moyenne générale
- Consultation des tâches qui lui sont assignées
- Tableau de bord personnalisé

## Technologies

| Domaine | Outils |
|---|---|
| Frontend | React.js |
| Base de données et authentification | Firebase (Firestore, Authentication) |
| Automatisation | Google Apps Script, Google Sheets |
| Notifications | E-mails envoyés via Google Apps Script |

## Architecture

```
Google Sheets ──(Apps Script)──> Firebase (Firestore) <──> Application React
                     │
                     └──> E-mails de notification aux étudiants
```

Structure du dépôt :
- `gestionNoteE/` : application frontend (React)
- `backend1/` : backend du projet <!-- précise son rôle : API, scripts, etc. -->

## Installation

```bash
# 1. Cloner le dépôt
git clone https://github.com/karimaZr/GestionNotesEnsaj-Cloud.git
cd GestionNotesEnsaj-Cloud/gestionNoteE

# 2. Installer les dépendances
npm install

# 3. Lancer l'application
npm start
```

<!-- Vérifie la commande de lancement (npm start ou npm run dev) -->

### Configuration Firebase

1. Créer un projet sur la [console Firebase](https://console.firebase.google.com/).
2. Activer **Authentication** et **Firestore**.
3. Renseigner les clés de configuration Firebase du projet dans l'application (ne pas publier les clés privées).
4. Déployer le script Google Apps Script lié à votre Google Sheet pour l'import des notes et l'envoi des e-mails.

## Auteure

**Karima Zrayouil** — [LinkedIn](https://www.linkedin.com/in/karima-zrayouil-7a37b9265) | [GitHub](https://github.com/karimaZr)
