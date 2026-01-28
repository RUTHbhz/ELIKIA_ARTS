import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { stories } from '../data/mockData';
import './JournalDetail.css';

const JournalDetail = () => {
    const { id } = useParams();
    const story = stories.find(s => s.id === parseInt(id));

    if (!story) return <div className="container">Histoire non trouvée.</div>;

    return (
        <article className="journal-detail-page animate-fade">
            <header className="story-hero">
                <div className="story-hero-bg">
                    <img src={story.image} alt={story.title} />
                    <div className="story-hero-overlay"></div>
                </div>
                <div className="story-hero-content container">
                    <Link to="/journal" className="back-to-journal">← Retour au Journal</Link>
                    <div className="story-meta-top">
                        <span className="story-category">Récit Collectif</span>
                        <span className="story-date">{story.date}</span>
                    </div>
                    <h1 className="serif light-text">{story.title}</h1>
                    <p className="story-author">Par {story.author}</p>
                </div>
            </header>

            <div className="story-body container">
                <div className="story-main-content">
                    <p className="drop-cap">{story.content.split('.')[0]}.</p>
                    <p>{story.content.split('.').slice(1).join('.')}</p>

                    <blockquote className="vibrate-glow glass">
                        "Chaque toile est un pont jeté vers l’avenir, une vibration qui refuse le silence."
                    </blockquote>

                    <p>
                        L'atelier Elikia n'est pas seulement un lieu de travail, c'est un sanctuaire.
                        Ici, la lumière du Nord-Kivu est capturée non pas comme un décor,
                        mais comme une force vitale.
                    </p>
                </div>

                <aside className="story-sidebar">
                    <div className="sidebar-box glass">
                        <h4 className="serif">À propos de l'auteur</h4>
                        <p>{story.author} explore les thèmes de la mémoire et de l'espoir à travers les arts plastiques depuis plus de 10 ans.</p>
                    </div>
                </aside>
            </div>

            <footer className="story-footer container">
                <div className="footer-gradient-line"></div>
                <h3 className="serif">Continuer la lecture</h3>
                {/* Simplified related story link */}
                <Link to="/journal" className="btn btn-secondary">Découvrir d'autres récits</Link>
            </footer>
        </article>
    );
};

export default JournalDetail;
