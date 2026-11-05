import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon, FacebookIcon } from '../icons/SocialIcons';
import { social, isPlaceholder } from '../../data/social';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__copy">
          &copy; {new Date().getFullYear()} BAMA Edouard. Tous droits reserves.
        </p>
        <ul className="footer__links">
          {!isPlaceholder(social.github) && (
            <li>
              <a href={social.github} target="_blank" rel="noopener noreferrer" className="footer__link" aria-label="GitHub">
                <GithubIcon size={18} />
              </a>
            </li>
          )}
          {!isPlaceholder(social.linkedin) && (
            <li>
              <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="footer__link" aria-label="LinkedIn">
                <LinkedinIcon size={18} />
              </a>
            </li>
          )}
          {!isPlaceholder(social.facebook) && (
            <li>
              <a href={social.facebook} target="_blank" rel="noopener noreferrer" className="footer__link" aria-label="Facebook">
                <FacebookIcon size={18} />
              </a>
            </li>
          )}
          <li>
            <a href={`mailto:${social.email}`} className="footer__link" aria-label="Email">
              <Mail size={18} />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
