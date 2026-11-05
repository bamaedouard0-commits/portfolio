export type ProjectCategory = 'all' | 'gestion' | 'web';

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
];
