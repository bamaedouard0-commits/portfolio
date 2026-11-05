import { useState, useMemo } from 'react';
import { ExternalLink } from 'lucide-react';
import { GithubIcon } from '../icons/SocialIcons';
import { projects, categories, type ProjectCategory } from '../../data/projects';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { TextReveal } from '../motion/TextReveal';

export function Projects() {
  const [filter, setFilter] = useState<ProjectCategory>('all');
  const ref = useScrollAnimation<HTMLElement>();

  const filtered = useMemo(
    () =>
      filter === 'all'
        ? projects
        : projects.filter((p) => p.category.includes(filter)),
    [filter]
  );

  return (
    <section className="section" id="projects" ref={ref}>
      <div className="container">
        <div className="section-title" data-animate>
          <span className="section-title__label">03. Projets</span>
          <TextReveal as="h2" className="section-title__heading">Mes realisations</TextReveal>
        </div>

        <div className="projects__filters" data-animate>
          {categories.map((cat) => (
            <button
              key={cat.value}
              className={`projects__filter-btn ${
                filter === cat.value ? 'projects__filter-btn--active' : ''
              }`}
              onClick={() => setFilter(cat.value)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="projects__grid">
          {filtered.map((project) => (
            <div className="card project-card" key={project.id} data-animate>
              <div className="project-card__image-wrapper">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-card__image"
                    loading="lazy"
                  />
                ) : (
                  <p className="project-card__placeholder">
                    Capture a ajouter
                  </p>
                )}
              </div>
              <h3 className="project-card__title">{project.title}</h3>
              <p className="project-card__desc">{project.description}</p>
              <div className="project-card__techs">
                {project.technologies.map((tech) => (
                  <span key={tech} className="project-card__tech">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="project-card__links">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-card__link"
                  >
                    <ExternalLink size={14} /> Voir le projet
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-card__link"
                  >
                    <GithubIcon size={14} /> Code source
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
