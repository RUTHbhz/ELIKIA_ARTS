import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, UserCircle } from 'lucide-react';
import { artists } from '../data/mockData';
import './Artists.css';

const Artists = () => {
    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.8, cubicBezier: [0.2, 1, 0.3, 1] }
        }
    };

    return (
        <main className="artists-page container" id="artists">
            <motion.header
                className="artists-header"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <div className="header-badge">
                    <Users size={14} />
                    <span>ARTISTES_COLLECTIF</span>
                </div>
                <h2 className="serif">Les Artistes</h2>
                <p>Découvrez les voix et les mains derrière le collectif Elikia Art.</p>
            </motion.header>

            <motion.div
                className="artists-grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {artists.map((artist, index) => (
                    <motion.div
                        key={artist.id}
                        className="artist-identity-card"
                        variants={cardVariants}
                        whileHover={{ x: 10 }}
                    >
                        <div className="card-header">
                            <span className="cat-no">INV_{index + 101}</span>
                            <span className="cat-label">COLLECTION_ELIKIA // 2024</span>
                        </div>

                        <div className="card-visual">
                            <div className="portrait-frame">
                                <img src={artist.portrait} alt={artist.name} />
                                <div className="frame-glow"></div>
                            </div>
                            <div className="artist-meta">
                                <div className="meta-item">
                                    <label>Origine</label>
                                    <span>Goma, Kivu</span>
                                </div>
                                <div className="meta-item">
                                    <label>Médium</label>
                                    <span>{artist.specialty}</span>
                                </div>
                            </div>
                        </div>

                        <div className="card-body">
                            <h3 className="serif">{artist.name}</h3>
                            <div className="role-chip">{artist.role}</div>
                            <p className="artist-vision">{artist.bio.substring(0, 110)}...</p>

                            <div className="card-footer">
                                <Link to={`/artist/${artist.id}`} className="btn-museum-link">
                                    Archive Complète <span>→</span>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </main>
    );
};

export default Artists;
