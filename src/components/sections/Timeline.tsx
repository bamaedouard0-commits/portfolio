import { timeline } from '../../data/timeline';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { TextReveal } from '../motion/TextReveal';

export function Timeline() {
  const ref = useScrollAnimation<HTMLElement>();

  return (
    <section className="section" id="timeline" ref={ref}>
      <div className="container">
        <div className="section-title" data-animate>
          <span className="section-title__label">05. Parcours</span>
          <TextReveal as="h2" className="section-title__heading">Mon parcours</TextReveal>
        </div>
        <div className="timeline" data-animate>
          {timeline.map((entry) => (
            <div className="timeline__item" key={entry.id}>
              <div className="timeline__dot" />
              <span className="timeline__period">{entry.period}</span>
              <h3 className="timeline__title">{entry.title}</h3>
              <p className="timeline__org">{entry.organization}</p>
              <p className="timeline__desc">{entry.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
