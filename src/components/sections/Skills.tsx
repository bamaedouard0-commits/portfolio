import * as LucideIcons from 'lucide-react';
import { skillDomains } from '../../data/skills';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { TextReveal } from '../motion/TextReveal';
import { CardBackdrop } from '../motion/CardBackdrop';

type IconName = keyof typeof LucideIcons;

function getIcon(name: string, size = 20) {
  const Icon = LucideIcons[name as IconName] as React.ComponentType<{ size: number }> | undefined;
  if (!Icon || typeof Icon !== 'function') return null;
  return <Icon size={size} />;
}

export function Skills() {
  const ref = useScrollAnimation<HTMLElement>();

  return (
    <section className="section" id="skills" ref={ref}>
      <div className="container">
        <div className="section-title" data-animate>
          <span className="section-title__label">02. Competences</span>
          <TextReveal as="h2" className="section-title__heading">Mon expertise technique</TextReveal>
        </div>
        <div className="skills-grid">
          {skillDomains.map((domain) => (
            <div className="card skill-card" key={domain.id} data-animate>
              <CardBackdrop kind={domain.id} />
              <div className="skill-card__icon">
                {getIcon(domain.icon)}
              </div>
              <h3 className="skill-card__title">{domain.title}</h3>
              <ul className="skill-card__list">
                {domain.skills.map((skill) => (
                  <li key={skill} className="skill-card__tag">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
