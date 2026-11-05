export type ProjectCategory =
  | 'all'
  | 'gestion'
  | 'web'
  | 'securite'
  | 'mobile';

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: ProjectCategory[];
  technologies: string[];
  features: string[];
  image: string | null;
  liveUrl: string | null;
  repoUrl: string | null;
}

export const categories: { value: ProjectCategory; label: string }[] = [
  { value: 'all', label: 'Tous' },
  { value: 'gestion', label: 'Gestion' },
  { value: 'web', label: 'Web' },
  { value: 'securite', label: 'Securite' },
  { value: 'mobile', label: 'Mobile' },
];

export const projects: Project[] = [
  {
    id: 'ecole-bf',
    title: 'Gestion scolaire Burkina Faso',
    description:
      'Application complete de gestion scolaire pour les etablissements du Burkina Faso.',
    longDescription:
      'Gestion des eleves, emplois du temps, bulletins, absences, encaissements, suivi financier et espace parent. Interface adaptee au contexte burkinabe.',
    category: ['gestion', 'web'],
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'MySQL', 'Tailwind CSS'],
    features: [
      'Gestion des eleves et inscriptions',
      'Emplois du temps automatises',
      'Bulletins de notes',
      'Suivi des absences',
      'Encaissements et suivi financier',
      'Espace parent avec demandes en ligne',
    ],
    image: null, // Captures reelles disponibles dans presentation-gestion-scolaire-sources/captures/
    liveUrl: null,
    repoUrl: null, // Depot prive
  },
  {
    id: 'bamresto',
    title: 'BamResto, gestion de restaurants',
    description:
      'Logiciel multi-sites de gestion commerciale et caisse pour restaurants.',
    longDescription:
      'Systeme complet de gestion de restaurants : POS (sur place, comptoir, emporter, livraison), commandes en ligne, gestion de stocks, rapports financiers, planning du personnel, supervision multi-sites.',
    category: ['gestion', 'web'],
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'MariaDB', 'Tailwind CSS'],
    features: [
      'Point de vente (POS) multi-modes',
      'Commandes en ligne et livraison',
      'Gestion des stocks et recettes',
      'Rapports de ventes et food cost',
      'Planning du personnel',
      'Supervision multi-sites',
    ],
    image: null, // A remplacer par une capture reelle de l'interface
    liveUrl: null,
    repoUrl: null, // Depot prive
  },
  {
    id: 'faso-marketplace',
    title: 'Faso Marketplace',
    description: 'Plateforme e-commerce adaptee au marche burkinabe.',
    longDescription:
      'Marketplace en ligne connectant vendeurs et acheteurs au Burkina Faso. Catalogue de produits, panier, paiement mobile, gestion des commandes et livraison.',
    category: ['web', 'mobile'],
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    features: [
      'Catalogue de produits avec recherche',
      'Panier et paiement mobile',
      'Gestion des commandes',
      'Espace vendeur',
      'Suivi des livraisons',
    ],
    image: null, // A remplacer par une capture reelle
    liveUrl: null,
    repoUrl: null,
  },
  {
    id: 'livrago',
    title: 'Livrago, application de livraison',
    description: 'Application de gestion et suivi des livraisons en temps reel.',
    longDescription:
      'Plateforme de livraison permettant aux clients de passer commande, aux livreurs de gerer leurs tournees et aux gestionnaires de suivre l\'activite en temps reel.',
    category: ['mobile', 'web'],
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'WebSocket'],
    features: [
      'Suivi en temps reel des livraisons',
      'Interface client, livreur et gestionnaire',
      'Optimisation des tournees',
      'Historique et rapports',
    ],
    image: null, // A remplacer par une capture reelle
    liveUrl: null,
    repoUrl: null,
  },
  {
    id: 'shielddev',
    title: 'ShieldDev AI',
    description: 'Outil de cybersecurite assiste par intelligence artificielle.',
    longDescription:
      'Solution de securite pour developpeurs : analyse de vulnerabilites, audit de code, detection de failles, recommandations automatisees par IA.',
    category: ['securite', 'web'],
    technologies: ['Python', 'TypeScript', 'React', 'IA / LLM'],
    features: [
      'Analyse automatique de vulnerabilites',
      'Audit de code source',
      'Rapports de securite',
      'Recommandations par IA',
    ],
    image: null, // A remplacer par une capture reelle
    liveUrl: null,
    repoUrl: null,
  },
];
