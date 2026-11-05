import { useState, type FormEvent } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { social } from '../../data/social';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export function Contact() {
  const ref = useScrollAnimation<HTMLElement>();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Fallback mailto : pas de pretention de backend
    const mailtoBody = `Nom: ${form.name}%0D%0AEmail: ${form.email}%0D%0A%0D%0A${form.message}`;
    const mailtoUrl = `mailto:${social.email}?subject=${encodeURIComponent(form.subject)}&body=${mailtoBody}`;
    window.open(mailtoUrl, '_blank');
  };

  return (
    <section className="section" id="contact" ref={ref}>
      <div className="container">
        <div className="section-title" data-animate>
          <span className="section-title__label">06. Contact</span>
          <h2 className="section-title__heading">Travaillons ensemble</h2>
        </div>
        <div className="contact__inner">
          <form className="contact__form" onSubmit={handleSubmit} data-animate>
            <div className="contact__field">
              <label className="contact__label" htmlFor="name">Nom complet</label>
              <input
                id="name"
                className="contact__input"
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              />
            </div>
            <div className="contact__field">
              <label className="contact__label" htmlFor="email">Email</label>
              <input
                id="email"
                className="contact__input"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              />
            </div>
            <div className="contact__field">
              <label className="contact__label" htmlFor="subject">Objet</label>
              <input
                id="subject"
                className="contact__input"
                type="text"
                required
                value={form.subject}
                onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
              />
            </div>
            <div className="contact__field">
              <label className="contact__label" htmlFor="message">Message</label>
              <textarea
                id="message"
                className="contact__textarea"
                required
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              />
            </div>
            <p className="contact__notice">
              Ce formulaire ouvre votre application de messagerie. Pour un envoi
              automatique, un service comme EmailJS ou Formspree peut etre
              configure ulterieurement.
            </p>
            <button type="submit" className="btn btn--primary">
              <Send size={16} /> Envoyer le message
            </button>
          </form>

          <div className="contact__info" data-animate>
            <div className="contact__info-item">
              <div className="contact__info-icon">
                <Mail size={20} />
              </div>
              <div>
                <p className="contact__info-label">Email</p>
                <p className="contact__info-value">
                  <a href={`mailto:${social.email}`}>{social.email}</a>
                </p>
              </div>
            </div>
            <div className="contact__info-item">
              <div className="contact__info-icon">
                <Phone size={20} />
              </div>
              <div>
                <p className="contact__info-label">Telephone</p>
                <p className="contact__info-value">{social.phone}</p>
              </div>
            </div>
            <div className="contact__info-item">
              <div className="contact__info-icon">
                <MapPin size={20} />
              </div>
              <div>
                <p className="contact__info-label">Localisation</p>
                <p className="contact__info-value">Ouagadougou, Burkina Faso</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
