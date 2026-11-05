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
    // Capture reelle du tableau de bord, base de demonstration fictive (etablissement et eleves fictifs)
    image: import.meta.env.BASE_URL + 'images/projects/ecole-bf.jpg',
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
    // Capture reelle de l'interface, base de demonstration locale (organisation fictive "BamResto Demo")
    image: import.meta.env.BASE_URL + 'images/projects/bamresto.jpg',
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
    description: 'Marketplace multi-boutiques avec livraison geolocalisee.',
    longDescription:
      'Plateforme ou les clients commandent aupres de plusieurs boutiques, les livreurs gerent leurs courses avec suivi GPS en temps reel, et un super admin supervise boutiques, livreurs, finances et litiges. Quatre espaces : client, boutique, livreur, administration.',
    category: ['mobile', 'web'],
    technologies: ['React', 'TypeScript', 'NestJS', 'MySQL', 'Socket.IO', 'Tailwind CSS'],
    features: [
      'Suivi GPS en temps reel des livraisons',
      'Espaces client, boutique, livreur et administration',
      'Portefeuilles et repartition financiere automatique',
      'Messagerie client et livreur, avis et pourboires',
    ],
    // Capture reelle de l'espace admin, base de demonstration locale (boutiques, livreurs et commandes fictifs)
    image: import.meta.env.BASE_URL + 'images/projects/livrago.jpg',
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
