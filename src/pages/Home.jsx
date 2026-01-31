import { Link } from 'react-router-dom';
import Events from '../components/sections/Events';
import ContactSection from '../components/sections/ContactSection';
import { artworks, stories } from '../data/mockData';
import { motion } from 'framer-motion';
import { Palette, Share2, Compass, MoveDown, Plus } from 'lucide-react';
import './Home.css';

const Home = () => {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.3 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1.2, cubicBezier: [0.2, 1, 0.3, 1] }
        }
    };

    const heroArt = artworks[0];
    const previewArtworks = artworks.slice(0, 3);
    const previewStories = stories.slice(0, 2);

    return (
        <main className="home-page" id="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-image-wrap">
                    <img
                        src={heroArt.image}
                        alt={heroArt.title}
                        className="hero-image"
                    />
                    <div className="hero-overlay"></div>

                    {/* Decorative Artistic Elements */}
                    <div className="hero-decor-grid"></div>
                    <div className="hero-marker tm"></div>
                    <div className="hero-marker tr"></div>
                    <div className="hero-marker bl"></div>
                </div>

                <div className="hero-coordinates">
                    <span className="coord-point">2.5027° S</span>
                    <span className="coord-divider">/</span>
                    <span className="coord-point">29.1849° E</span>
                </div>

                <div className="container hero-editorial-grid">
                    <motion.div
                        className="hero-main-content"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div variants={itemVariants} className="hero-tag">
                            <Compass size={14} className="icon-vibrate" />
                            <span>COLLECTIF_ARTISTE_KIVU</span>
                        </motion.div>

                        <motion.h1 variants={itemVariants} className="hero-title serif">
                            Vibrations <span className="split-reveal">d'Espoir</span>
                        </motion.h1>

                        <motion.p variants={itemVariants} className="hero-subtitle">
                            Un collectif d'artistes peintres du Kivu explorant la liberté et la mémoire à travers le prisme de l'art plastique.
                        </motion.p>

                        <motion.div variants={itemVariants} className="hero-cta">
                            <Link to="/gallery" className="btn-luxury-primary">
                                <span>Explorer l'Exposition</span>
                                <div className="btn-glow"></div>
                            </Link>
                            <Link to="/artists" className="btn-luxury-secondary">
                                <span>Découvrir les Artistes</span>
                                <div className="btn-glow"></div>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>

                <motion.div
                    className="scroll-indicator-minimal"
                    initial={{ scaleY: 0, opacity: 0 }}
                    animate={{ scaleY: 1, opacity: 1 }}
                    transition={{ delay: 2, duration: 1.5 }}
                >
                    <div className="scroll-line"></div>
                </motion.div>
            </section>

            {/* History & Manifesto Section */}
            <section className="manifesto container">
                <div className="manifesto-grid">
                    <div className="manifesto-text">
                        <h2 className="serif">L'Esprit & L'Histoire d'Elikia</h2>
                        <p className="highlight">
                            Né de la volonté de transformer la douleur en couleur, le collectif Elikia Art est un cri de vie au cœur du Kivu.
                        </p>
                        <p>
                            Depuis sa création, notre collectif s'est donné pour mission de documenter la résilience d'un peuple. La peinture n'est pas qu'une esthétique; c'est un acte de résistance.
                        </p>

                        <div className="manifesto-stats">
                            <div className="stat-item">
                                <span className="serif">17+</span>
                                <p>Œuvres Uniques</p>
                            </div>
                            <div className="stat-item">
                                <span className="serif">2024</span>
                                <p>Année de Vibration</p>
                            </div>
                        </div>
                    </div>

                    <div className="manifesto-image-container">
                        <img src="/assets/images/art3.jpeg" alt="Atelier Elikia" />
                    </div>
                </div>
            </section>

            {/* Gallery Preview Section */}
            <section className="home-gallery-preview container">
                <header className="section-header">
                    <h2 className="serif light-text">Aperçu de la Collection</h2>
                    <p>Une sélection de nos vibrations les plus récentes.</p>
                </header>
                <div className="artwork-grid">
                    {previewArtworks.map(art => (
                        <div key={art.id} className="artwork-card glass animate-fade">
                            <div className="artwork-image-wrapper">
                                <img src={art.image} alt={art.title} />
                                <div className="artwork-overlay">
                                    <Link to={`/artwork/${art.id}`} className="btn-view">Contempler</Link>
                                </div>
                            </div>
                            <div className="artwork-info">
                                <p className="artist-name">{art.artist}</p>
                                <h3>{art.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="section-footer">
                    <Link to="/gallery" className="btn btn-secondary vibrate-glow">Voir toutes les œuvres</Link>
                </div>
            </section>

            {/* Latest News / Events */}
            <Events />

            {/* Journal / Stories Preview */}
            <section className="home-journal-preview container">
                <header className="section-header">
                    <h2 className="serif light-text">Dernières Histoires</h2>
                    <p>Le journal de bord de notre voyage artistique.</p>
                </header>
                <div className="stories-grid-mini">
                    {previewStories.map(story => (
                        <article key={story.id} className="story-card-mini glass animate-fade">
                            <div className="story-image">
                                <img src={story.image} alt={story.title} />
                            </div>
                            <div className="story-details">
                                <span className="story-date">{story.date}</span>
                                <h3 className="serif">{story.title}</h3>
                                <p>{story.excerpt}</p>
                                <Link to={`/journal/${story.id}`} className="btn-text">Lire la suite →</Link>
                            </div>
                        </article>
                    ))}
                </div>
                <div className="section-footer">
                    <Link to="/journal" className="btn btn-secondary">Explorer le Journal</Link>
                </div>
            </section>

            {/* Contact Section */}
            <ContactSection />
        </main>
    );
};

export default Home;
