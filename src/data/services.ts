export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const services: Service[] = [
  {
    id: 'web-apps',
    title: 'Applications web et mobiles',
    description:
      'Conception et developpement d\'applications web et mobiles sur mesure, adaptees a vos besoins metier.',
    icon: 'Smartphone',
  },
  {
    id: 'management-software',
    title: 'Logiciels de gestion',
    description:
      'Logiciels de gestion scolaire, commerciale, de restaurants, de stocks et de livraison.',
    icon: 'BarChart3',
  },
  {
    id: 'network',
    title: 'Reseaux et telecommunications',
    description:
      'Installation, configuration et maintenance de reseaux informatiques et de systemes de telecommunication.',
    icon: 'Network',
  },
  {
    id: 'security',
    title: 'Cybersecurite',
    description:
      'Audit de securite, tests de penetration, securisation d\'applications et formation a la securite informatique.',
    icon: 'ShieldCheck',
  },
  {
    id: 'database',
    title: 'Administration de bases de donnees',
    description:
      'Conception, optimisation et administration de bases de donnees relationnelles.',
    icon: 'Database',
  },
  {
    id: 'maintenance',
    title: 'Maintenance informatique',
    description:
      'Depannage, maintenance preventive et curative d\'equipements informatiques.',
    icon: 'Wrench',
  },
  {
    id: 'training',
    title: 'Formation et accompagnement',
    description:
      'Formation aux bases de l\'informatique, a la programmation et aux outils numeriques.',
    icon: 'GraduationCap',
  },
];
