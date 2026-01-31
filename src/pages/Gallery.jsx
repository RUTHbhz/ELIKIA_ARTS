import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Palette, GalleryVertical, Filter } from 'lucide-react';
import './Gallery.css';
import { artworks } from '../data/mockData';

const Gallery = () => {
    const [filter, setFilter] = useState('All');
    const themes = ['All', ...new Set(artworks.map(item => item.theme))];

    const filteredArtworks = filter === 'All'
        ? artworks
        : artworks.filter(item => item.theme === filter);

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.95, y: 20 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: 0.8, cubicBezier: [0.2, 1, 0.3, 1] }
        }
    };

    return (
        <main className="gallery-page container" id="gallery">
            <motion.header
                className="gallery-header"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <div className="header-badge">
                    <GalleryVertical size={14} />
                    <span>COLLECTION_PERMANENTE</span>
                </div>
                <h2 className="serif">La Galerie</h2>
                <p>Explorez la collection d'œuvres qui racontent la résilience et l'exploration.</p>

                <div className="filter-bar-wrap">
                    <div className="filter-icon">
                        <Filter size={16} />
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
            </motion.header>

            <motion.div
                className="artwork-grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                key={filter} // Re-animate on filter change
            >
                {filteredArtworks.map(art => (
                    <motion.div
                        key={art.id}
                        className="artwork-card"
                        variants={cardVariants}
                        whileHover={{ y: -10 }}
                    >
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
                    </motion.div>
                ))}
            </motion.div>

            <motion.div
                className="gallery-footer"
                style={{ textAlign: 'center', marginTop: '4rem' }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
            >
                <Link to="/gallery" className="btn btn-secondary">
                    Voir toutes les œuvres
                </Link>
            </motion.div>
        </main>
    );
};

export default Gallery;
