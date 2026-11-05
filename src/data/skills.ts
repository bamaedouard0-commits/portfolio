export interface SkillDomain {
  id: string;
  title: string;
  skills: string[];
  icon: string; // nom d'icone Lucide
}

export const skillDomains: SkillDomain[] = [
  {
    id: 'web',
    title: 'Developpement web',
    skills: ['HTML / CSS', 'JavaScript / TypeScript', 'React', 'Node.js / Express', 'Tailwind CSS', 'Vite'],
    icon: 'Globe',
  },
  {
    id: 'software',
    title: 'Logiciel et architecture',
    skills: ['Architecture logicielle', 'API REST', 'WebSocket', 'Git / GitHub', 'Tests automatises'],
    icon: 'Layers',
  },
  {
    id: 'database',
    title: 'Bases de donnees',
    skills: ['MySQL / MariaDB', 'PostgreSQL', 'SQLite', 'Modelisation', 'Migrations'],
    icon: 'Database',
  },
  {
    id: 'network',
    title: 'Reseaux et telecoms',
    skills: ['TCP/IP', 'Configuration reseau', 'Maintenance', 'Fibre optique', 'VoIP'],
    icon: 'Wifi',
  },
  {
    id: 'system',
    title: 'Systemes',
    skills: ['Linux (Ubuntu, Debian)', 'Windows Server', 'Administration systeme', 'Virtualisation'],
    icon: 'Monitor',
  },
  {
    id: 'security',
    title: 'Cybersecurite',
    skills: ['Audit de securite', 'Tests de penetration', 'Securisation d\'applications', 'Analyse de vulnerabilites'],
    icon: 'Shield',
  },
  {
    id: 'ai',
    title: 'IA et outils',
    skills: ['Integration d\'IA', 'Claude / GPT', 'Automatisation', 'Prompt engineering'],
    icon: 'Brain',
  },
  {
    id: '3d',
    title: '3D et motion design',
    skills: ['Three.js / R3F', 'GSAP', 'Animations CSS', 'Motion'],
    icon: 'Box',
  },
];
