export interface TimelineEntry {
  id: string;
  /** Modifiable : remplacez par vos vraies dates */
  period: string;
  title: string;
  organization: string;
  description: string;
  type: 'education' | 'work' | 'project';
}

/**
 * Parcours et experiences.
 * Les dates et details ci-dessous sont des emplacements modifiables.
 * Ne contient que ce que Yedoua a confirme ou ce qui est verifiable.
 */
export const timeline: TimelineEntry[] = [
  {
    id: 'licence',
    period: 'En cours',
    title: 'Licence en ingenierie informatique et telecommunications',
    organization: 'A completer (nom de l\'universite)',
    description: 'Formation en informatique, reseaux et telecommunications.',
    type: 'education',
  },
  {
    id: 'bama-tech',
    period: 'En cours',
    title: 'Fondateur et developpeur full stack',
    organization: 'BAMA TECH SOLUTIONS',
    description:
      'Creation et vente d\'applications web, maintenance informatique, services aux entreprises et formation.',
    type: 'work',
  },
  {
    id: 'bamresto-project',
    period: '2024 - present',
    title: 'Developpement de BamResto',
    organization: 'Logiciel de gestion multi-sites pour restaurants',
    description:
      'Systeme complet : POS, commandes en ligne, stocks, rapports, planning. Deploye en production.',
    type: 'project',
  },
  {
    id: 'ecole-bf-project',
    period: '2024 - present',
    title: 'Developpement d\'ECOLE-BF',
    organization: 'Application de gestion scolaire pour le Burkina Faso',
    description:
      'Gestion des eleves, bulletins, finances, emplois du temps et espace parent.',
    type: 'project',
  },
];
