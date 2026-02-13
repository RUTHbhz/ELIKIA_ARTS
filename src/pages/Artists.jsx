import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Instagram, Globe } from 'lucide-react';
import { artists as localArtists } from '../data/mockData';
import { useFirestoreConfig } from '../hooks/useFirestore';
import './Artists.css';

const Artists = () => {
    const { data: dbArtists, loading } = useFirestoreConfig('artists');
    const artists = dbArtists && dbArtists.length > 0 ? dbArtists : localArtists;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    return (
        <main className="artists-page container">
            <header className="artists-header">
                <motion.h1
                    className="serif"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Les Créateurs de <span className="highlight-text">Vibrations</span>
                </motion.h1>
                <p>Rencontrez les voix singulières qui composent le collectif Elikia Art.</p>
            </header>

            <motion.div
                className="artists-grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {loading ? (
                    <div className="text-center w-full col-span-3">
                        <p>Chargement des artistes...</p>
                    </div>
                ) : (
                    artists.map((artist) => (
                        <motion.article
                            key={artist.id}
                            className="artist-card-pro glass"
                            variants={cardVariants}
                            whileHover={{ y: -10 }}
                        >
                            <div className="card-visual">
                                <div className="portrait-frame">
                                    <img src={artist.portrait} alt={artist.name} />
                                </div>
                                <div className="card-overlay"></div>
                            </div>

                            <div className="card-content">
                                <div className="artist-identity">
                                    <h2 className="serif">{artist.name}</h2>
                                    <span className="artist-role">{artist.role}</span>
                                </div>

                                <p className="artist-bio-short">
                                    {artist.bio ? artist.bio.substring(0, 100) : ''}...
                                </p>

                                <div className="artist-meta">
                                    <div className="meta-item">
                                        <span className="label">Spécialité</span>
                                        <span className="value">{artist.specialty}</span>
                                    </div>
                                </div>

                                <div className="card-actions">
                                    <Link to={`/artist/${artist.id}`} className="btn-discover">
                                        <span>Voir le Profil</span>
                                        <ArrowRight size={16} />
                                    </Link>
                                    <div className="social-links">
                                        <button className="social-btn"><Instagram size={18} /></button>
                                        <button className="social-btn"><Globe size={18} /></button>
                                    </div>
                                </div>
                            </div>
                        </motion.article>
                    ))
                )}
            </motion.div>
        </main>
    );
};

export default Artists;
