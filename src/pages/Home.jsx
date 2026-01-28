import { Link } from 'react-router-dom';
import Events from '../components/sections/Events';
import ContactSection from '../components/sections/ContactSection';
import { artworks, stories } from '../data/mockData';
import './Home.css';

const Home = () => {
    const heroArt = artworks[0];
    const previewArtworks = artworks.slice(0, 3);
    const previewStories = stories.slice(0, 2);

    return (
        <div className="home-page" id="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-bg">
                    <img src={heroArt.image} alt="Featured Artwork" className="hero-image" />
                    <div className="hero-overlay"></div>
                </div>

                <div className="hero-content">
                    <h1 className="hero-title serif light-text">
                        Elikia Art — <br />
                        <span>Peindre la résilience, raconter le monde.</span>
                    </h1>
                    <p className="hero-subtitle">
                        Un collectif d'artistes peintres du Kivu explorant la liberté et la mémoire à travers le prisme de l'art plastique.
                    </p>
                    <div className="hero-cta">
                        <Link to="/gallery" className="btn btn-primary">Explorer les œuvres</Link>
                        <Link to="/artists" className="btn btn-secondary">Découvrir les artistes</Link>
                    </div>
                </div>

                <div className="scroll-indicator">
                    <span>Défiler</span>
                    <div className="line"></div>
                </div>
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
                            Depuis sa création, notre collectif s'est donné pour mission de documenter la résilience d'un peuple. La peinture n'est pas qu'une esthétique; c'est un acte de résistance, un témoignage de dignité et une exploration profonde de notre mémoire collective.
                        </p>
                        <p>
                            Originaire de Goma, Elikia (Espoir en Lingala) transcende les crises pour offrir une vision vibrante et résolument tournée vers l'avenir. Chaque œuvre est une archive vivante, chaque vibration un pont vers la paix.
                        </p>
                    </div>
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
        </div>
    );
};

export default Home;
