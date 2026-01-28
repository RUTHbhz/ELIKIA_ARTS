import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Gallery.css';
import { artworks } from '../data/mockData';

const Gallery = () => {
    const [filter, setFilter] = useState('All');
    const themes = ['All', ...new Set(artworks.map(item => item.theme))];

    const filteredArtworks = filter === 'All'
        ? artworks
        : artworks.filter(item => item.theme === filter);

    return (
        <div className="gallery-page container" id="gallery">
            <header className="gallery-header">
                <h2 className="serif">La Galerie</h2>
                <p>Explorez la collection d'œuvres qui racontent la résilience et l'exploration.</p>

                <div className="filter-bar">
                    {themes.map(theme => (
                        <button
                            key={theme}
                            className={`filter-btn ${filter === theme ? 'active' : ''}`}
                            onClick={() => setFilter(theme)}
                        >
                            {theme}
                        </button>
                    ))}
                </div>
            </header>

            <div className="artwork-grid">
                {filteredArtworks.map(art => (
                    <div key={art.id} className="artwork-card">
                        <div className="artwork-image-wrapper">
                            <img src={art.image} alt={art.title} loading="lazy" />
                            <div className="artwork-overlay">
                                <Link to={`/artwork/${art.id}`} className="btn-view">Contempler</Link>
                            </div>
                        </div>
                        <div className="artwork-info">
                            <h3 className="serif">{art.title}</h3>
                            <p className="artist-name">{art.artist}</p>
                            <div className="artwork-meta">
                                <span>{art.technique}</span>
                                <span className="price">{art.price} $</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="gallery-footer" style={{ textAlign: 'center', marginTop: '4rem' }}>
                <Link to="/gallery" className="btn btn-secondary vibrate-glow">
                    Voir toutes les œuvres
                </Link>
            </div>
        </div>
    );
};

export default Gallery;
