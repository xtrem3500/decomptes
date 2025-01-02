# Guide d'utilisation et documentation technique - Gestion des Décomptes

## 1. Guide Utilisateur

### 1.1 Introduction
L'application de Gestion des Décomptes permet de gérer efficacement les notes de frais avec signature électronique et génération automatique de PDF.

### 1.2 Fonctionnalités principales
- Création et gestion des décomptes
- Signature électronique multi-niveaux
- Génération automatique de PDF
- Tableau de bord analytique
- Gestion des templates de décomptes
- Support multi-devises

### 1.3 Guide pas à pas
#### Création d'un décompte
1. Connectez-vous à l'application
2. Cliquez sur "Nouveau Décompte"
3. Remplissez les informations requises
4. Soumettez le décompte pour signature

#### Processus de signature
1. Accédez au décompte à signer
2. Cliquez sur "Signer"
3. Choisissez le type de signature
4. Validez avec le code SMS si requis

## 2. Guide Développeur

### 2.1 Architecture du projet
L'application utilise une architecture moderne basée sur :
- Frontend : Nuxt.js 3 + Vue 3 + Tailwind CSS
- Backend : Node.js + MongoDB
- Authentication : JWT
- PDF : PDFKit
- Tests : Jest + Vitest

### 2.2 Structure des dossiers
```
├── components/            # Composants Vue réutilisables
│   ├── auth/             # Authentification
│   ├── dashboard/        # Tableau de bord
│   ├── decompte/         # Gestion des décomptes
│   └── layout/           # Mise en page
├── server/               # Backend
│   ├── api/             # Routes API
│   ├── services/        # Services métier
│   └── utils/           # Utilitaires
└── stores/              # État global (Pinia)
```

### 2.3 Configuration requise
- Node.js >= 16
- MongoDB >= 4.4
- Redis (pour les sessions)

### 2.4 Installation
\`\`\`bash
# Installation des dépendances
npm install

# Configuration
cp .env.example .env
npm run generate:secret

# Création compte admin
npm run create:admin

# Démarrage en développement
npm run dev
\`\`\`

### 2.5 Tests
\`\`\`bash
# Tests unitaires
npm run test

# Tests avec couverture
npm run test:coverage

# Tests en continu
npm run test:watch
\`\`\`

### 2.6 API Documentation

#### Authentication
\`\`\`typescript
POST /api/auth/login
POST /api/auth/register
\`\`\`

#### Décomptes
\`\`\`typescript
GET    /api/decomptes
POST   /api/decomptes
GET    /api/decomptes/:id
POST   /api/decomptes/:id/sign
POST   /api/decomptes/:id/submit
\`\`\`

### 2.7 Modèles de données

#### User
\`\`\`typescript
interface User {
  id: string;
  email: string;
  role: Role;
  password: string;
}
\`\`\`

#### Decompte
\`\`\`typescript
interface Decompte {
  id: string;
  numero: string;
  date: Date;
  montant: number;
  description: string;
  status: Status;
  userId: string;
  signatures: Signature[];
}
\`\`\`

### 2.8 Services

#### PDFService
Génère les PDF des décomptes avec signatures.
\`\`\`typescript
class PDFService {
  generatePDF(data: any, options: PDFOptions): Promise<string>;
}
\`\`\`

#### SignatureService
Gère les signatures électroniques et leur validation.
\`\`\`typescript
class SignatureService {
  initiateSignature(userId: string, decompteId: string): Promise<SignatureVerification>;
  verifySignature(verificationId: string, code: string, userId: string): Promise<boolean>;
}
\`\`\`

### 2.9 Bonnes pratiques

#### Structure des composants
- Un composant par fichier
- Nommage explicite
- Props typées
- Composition API

#### Tests
- Tests unitaires pour les services
- Tests d'intégration pour l'API
- Tests E2E pour les workflows critiques

#### Sécurité
- Validation des entrées
- Sanitization des données
- Protection CSRF
- Rate limiting

### 2.10 Déploiement

#### Prérequis
- Node.js en production
- MongoDB
- Redis
- Serveur SMTP

#### Étapes
1. Build de l'application
2. Configuration des variables d'environnement
3. Migration de la base de données
4. Démarrage du serveur

#### Commandes
\`\`\`bash
# Build
npm run build

# Preview
npm run preview

# Production
npm run start
\`\`\`

## 3. Maintenance

### 3.1 Logs
- Logs applicatifs dans `/logs`
- Logs d'erreurs
- Logs d'audit

### 3.2 Backup
- Backup quotidien de la base de données
- Backup des fichiers uploadés
- Rotation des logs

### 3.3 Monitoring
- Surveillance des performances
- Alertes
- Métriques clés

## 4. Roadmap

### 4.1 Priorité Haute
- [ ] Amélioration de la sécurité des signatures
- [ ] Optimisation des performances PDF
- [ ] Support multi-langues

### 4.2 Priorité Moyenne
- [ ] Export des données
- [ ] Templates personnalisables
- [ ] API publique

### 4.3 Priorité Basse
- [ ] Interface mobile native
- [ ] Intégration comptable
- [ ] Statistiques avancées