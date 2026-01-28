import React from 'react';
import './ContactSection.css';

const ContactSection = () => {
    return (
        <section className="contact-section container animate-fade" id="contact-home">
            <div className="section-header">
                <h2 className="serif light-text">Entrez dans la Vibration</h2>
                <p>Une question, un projet ou simplement envie d'échanger sur l'art et la résilience ?</p>
            </div>

            <div className="contact-section-grid">
                <div className="contact-info-blocks">
                    <div className="info-block glass vibrate-glow">
                        <h4 className="serif">Atelier Principal</h4>
                        <p>Avenue des Artistes, Goma</p>
                        <p>Nord-Kivu, RDC</p>
                    </div>
                    <div className="info-block glass">
                        <h4 className="serif">Direct</h4>
                        <p>Email: contact@elikia-art.com</p>
                        <p>WhatsApp: +243 000 000 000</p>
                    </div>
                </div>

                <form className="contact-section-form glass" onSubmit={(e) => e.preventDefault()}>
                    <div className="input-group">
                        <label>Votre Nom</label>
                        <input type="text" placeholder="Nom complet" />
                    </div>
                    <div className="input-group">
                        <label>Votre Email</label>
                        <input type="email" placeholder="email@exemple.com" />
                    </div>
                    <div className="input-group">
                        <label>Message</label>
                        <textarea placeholder="Partagez votre pensée..." rows="4"></textarea>
                    </div>
                    <button className="btn btn-primary btn-block">Envoyer l'éclat</button>
                </form>
            </div>
        </section>
    );
};

export default ContactSection;
