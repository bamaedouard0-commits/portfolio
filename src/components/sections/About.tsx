import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { TextReveal } from '../motion/TextReveal';
import { CountUp } from '../motion/CountUp';
import { Parallax } from '../motion/Parallax';

export function About() {
  const ref = useScrollAnimation<HTMLElement>();

  return (
    <section className="section" id="about" ref={ref}>
      <div className="container">
        <div className="section-title" data-animate>
          <span className="section-title__label">01. A propos</span>
          <TextReveal as="h2" className="section-title__heading">Qui suis-je</TextReveal>
        </div>
        <div className="about__inner">
          <div className="about__photo-wrapper" data-animate>
            <Parallax speed={-0.25}>
              <img
                src={import.meta.env.BASE_URL + 'images/photo.jpg'}
                alt="BAMA Edouard"
                className="about__photo"
                loading="lazy"
              />
              <div className="about__photo-accent" />
            </Parallax>
          </div>
          <div className="about__text" data-animate>
            <p>
              Je suis Yedoua (BAMA Edouard), etudiant entrepreneur base a
              Ouagadougou, au Burkina Faso. Mon entreprise, BAMA TECH SOLUTIONS,
              est mon activite principale, en parallele d'une formation en
              ingenierie informatique et telecommunications.
            </p>
            <p>
              Je concois et vends des applications web sur mesure, je fais de la
              maintenance d'appareils, je propose des services aux entreprises et
              je forme des personnes aux bases de l'informatique.
            </p>
            <p>
              Mon objectif : creer une entreprise structuree avec une equipe,
              decrocher un master et devenir un expert reconnu en informatique et
              telecommunications.
            </p>
            <div className="about__stats">
              <div className="about__stat">
                <div className="about__stat-number"><CountUp end={5} suffix="+" /></div>
                <div className="about__stat-label">Projets livres</div>
              </div>
              <div className="about__stat">
                <div className="about__stat-number"><CountUp end={3} suffix="+" /></div>
                <div className="about__stat-label">Clients actifs</div>
              </div>
              <div className="about__stat">
                <div className="about__stat-number"><CountUp end={2} suffix="+" /></div>
                <div className="about__stat-label">Annees d'experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
