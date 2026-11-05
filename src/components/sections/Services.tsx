import * as LucideIcons from 'lucide-react';
import { services } from '../../data/services';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

type IconName = keyof typeof LucideIcons;

function getIcon(name: string, size = 22) {
  const Icon = LucideIcons[name as IconName] as React.ComponentType<{ size: number }> | undefined;
  if (!Icon || typeof Icon !== 'function') return null;
  return <Icon size={size} />;
}

export function Services() {
  const ref = useScrollAnimation<HTMLElement>();

  return (
    <section className="section" id="services" ref={ref}>
      <div className="container">
        <div className="section-title" data-animate>
          <span className="section-title__label">04. Services</span>
          <h2 className="section-title__heading">Ce que je propose</h2>
        </div>
        <div className="services-grid">
          {services.map((service) => (
            <div className="card" key={service.id} data-animate>
              <div className="service-card__icon">
                {getIcon(service.icon)}
              </div>
              <h3 className="service-card__title">{service.title}</h3>
              <p className="service-card__desc">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
