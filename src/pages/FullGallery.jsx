import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { artworks as localArtworks } from '../data/mockData';
import { useFirestoreConfig } from '../hooks/useFirestore';
import './Gallery.css'; // Reuse gallery styles

const FullGallery = () => {
    const { data: dbArtworks, loading } = useFirestoreConfig('artworks');
    const artworks = dbArtworks && dbArtworks.length > 0 ? dbArtworks : localArtworks;

    const [filter, setFilter] = useState('Tous');
    const [searchTerm, setSearchTerm] = useState('');
    const themes = ['Tous', 'Resilience', 'Liberté', 'Identité', 'Exploration'];

    const filteredArt = artworks.filter(art => {
        const matchesTheme = filter === 'Tous' || art.theme === filter;
        const matchesSearch = (art.title?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
            (art.artist?.toLowerCase() || "").includes(searchTerm.toLowerCase());
        return matchesTheme && matchesSearch;
    });

    return (
        <div className="gallery-page container animate-fade">
            <header className="gallery-header">
                <h1 className="serif light-text">Toute la Collection</h1>
                <p>Explorez l'étendue de la résilience à travers chaque coup de pinceau.</p>

                <div className="search-and-filter">
                    <div className="search-box glass">
                        <Search size={20} />
                        <input
                            type="text"
                            placeholder="Rechercher une œuvre ou un artiste..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

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
                </div>
            </header>

            {loading ? (
                <div className="container text-center py-5">
                    <p className="text-xl">Chargement de la galerie...</p>
                </div>
            ) : (
                <div className="artwork-grid">
                    {filteredArt.map(art => (
                        <div key={art.id} className="artwork-card">
                            <div className="artwork-image-wrapper">
                                <img src={art.image} alt={art.title} loading="lazy" />
                                <div className="artwork-overlay">
                                    <Link to={`/artwork/${art.id}`}>
                                        <button className="btn-view">Contempler</button>
                                    </Link>
                                </div>
                            </div>
                            <div className="artwork-info">
                                <p className="artist-name">{art.artist}</p>
                                <h3>{art.title}</h3>
                                <div className="artwork-meta">
                                    <span>{art.technique}</span>
                                    <span className="price">{art.price} $</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FullGallery;
