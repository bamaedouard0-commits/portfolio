import { Mail, MessageCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon, FacebookIcon } from '../icons/SocialIcons';
import { social, isPlaceholder } from '../../data/social';
import { HeroScene } from '../three/HeroScene';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { TextReveal } from '../motion/TextReveal';
import { MagneticButton } from '../motion/MagneticButton';

export function Hero() {
  const ref = useScrollAnimation<HTMLElement>({ y: 30, duration: 0.9 });

  return (
    <section className="hero" id="hero" ref={ref}>
      <div className="container hero__inner">
        <div className="hero__content" data-animate>
          <p className="hero__greeting">Bonjour, je suis</p>
          <TextReveal as="h1" className="hero__name" splitBy="chars" stagger={0.05} y={80} triggerStart="top 100%">BAMA Edouard</TextReveal>
          <p className="hero__title">
            Ingenieur en informatique et telecommunications
          </p>
          <p className="hero__description">
            Developpeur full stack et fondateur de BAMA TECH SOLUTIONS. Je
            concois des applications web, des logiciels de gestion et des
            solutions reseau adaptees aux entreprises africaines.
          </p>
          <div className="hero__actions">
            <MagneticButton as="a" href="#projects" className="btn btn--primary">
              Decouvrir mes projets
            </MagneticButton>
            <MagneticButton as="a" href="#contact" className="btn btn--secondary">
              Me contacter
            </MagneticButton>
          </div>
          <ul className="hero__socials">
            {!isPlaceholder(social.github) && (
              <li>
                <a href={social.github} target="_blank" rel="noopener noreferrer" className="hero__social-link" aria-label="GitHub">
                  <GithubIcon />
                </a>
              </li>
            )}
            {!isPlaceholder(social.linkedin) && (
              <li>
                <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="hero__social-link" aria-label="LinkedIn">
                  <LinkedinIcon />
                </a>
              </li>
            )}
            {!isPlaceholder(social.facebook) && (
              <li>
                <a href={social.facebook} target="_blank" rel="noopener noreferrer" className="hero__social-link" aria-label="Facebook">
                  <FacebookIcon />
                </a>
              </li>
            )}
            <li>
              <a href={`https://wa.me/${social.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="hero__social-link" aria-label="WhatsApp">
                <MessageCircle size={18} />
              </a>
            </li>
            <li>
              <a href={`mailto:${social.email}`} className="hero__social-link" aria-label="Email">
                <Mail size={18} />
              </a>
            </li>
          </ul>
        </div>
        <div className="hero__scene" data-animate>
          <HeroScene />
        </div>
      </div>
    </section>
  );
}
