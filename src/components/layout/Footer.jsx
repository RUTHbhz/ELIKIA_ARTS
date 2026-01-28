import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';
import logo from '../../assets/images/logo.jpeg';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-enhanced glass">
            <div className="footer-container container">
                <div className="footer-brand">
                    <div className="footer-logo">
                        <img src={logo} alt="Elikia Art" className="footer-logo-img" />
                        <h2 className="serif light-text">ELIKIA ART</h2>
                    </div>
                    <p className="footer-motto">Peindre la résilience, raconter le monde.</p>
                    <div className="social-links">
                        <a href="https://instagram.com" aria-label="Instagram"><Instagram size={20} /></a>
                        <a href="https://facebook.com" aria-label="Facebook"><Facebook size={20} /></a>
                        <a href="https://twitter.com" aria-label="Twitter"><Twitter size={20} /></a>
                    </div>
                </div>

                <div className="footer-links-grid">
                    <div className="links-column">
                        <h4 className="serif">Exploration</h4>
                        <Link to="/gallery">Galerie Complète</Link>
                        <Link to="/artists">Nos Artistes</Link>
                        <Link to="/journal">Le Journal</Link>
                    </div>
                    <div className="links-column">
                        <h4 className="serif">Collection</h4>
                        <Link to="/commissions">Commandes</Link>
                        <Link to="/exhibitions">Expositions</Link>
                        <Link to="/shipping">Livraison</Link>
                    </div>
                    <div className="links-column">
                        <h4 className="serif">Contact</h4>
                        <Link to="/contact">Contactez-nous</Link>
                        <p>Goma, Nord-Kivu, RDC</p>
                        <p>contact@elikia-art.com</p>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 Elikia Art - DRC. Vibrations Artistiques de Résilience.</p>
            </div>
        </footer>
    );
};

export default Footer;
