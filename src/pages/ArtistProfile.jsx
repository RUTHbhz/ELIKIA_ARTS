import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { artists, artworks } from '../data/mockData';
import './ArtistProfile.css';

const ArtistProfile = () => {
    const { id } = useParams();
    const artist = artists.find(a => a.id === id);

    const artistWorks = useMemo(() =>
        artworks.filter(art => art.artistId === id),
        [id]
    );

    if (!artist) return <div className="container">Artiste non trouvé.</div>;

    return (
        <div className="artist-profile-page">
            <header className="profile-header container">
                <div className="header-visual">
                    <div className="profile-portrait-container">
                        <img src={artist.portrait} alt={artist.name} />
                        <div className="portrait-plate">
                            <span className="plate-id">{artist.id}</span>
                            <span className="plate-tag">ARTISTE_COLLECTION_2024</span>
                        </div>
                    </div>
                </div>
                <div className="header-info">
                    <div className="header-meta">
                        <span className="artist-role-tag">{artist.role}</span>
                        <div className="origin-label">GOMA_KIVU_DRC</div>
                    </div>
                    <h1 className="serif">{artist.name}</h1>
                    <div className="header-quote">
                        <blockquote className="serif">
                            "{artist.vision || "L'art est la pulsation de notre résilience au Kivu."}"
                        </blockquote>
                    </div>
                    <div className="header-badges">
                        {artist.achievements.map((a, i) => (
                            <span key={i} className="achievement-badge">{a}</span>
                        ))}
                    </div>
                </div>
            </header>

            <section className="profile-narrative container">
                <div className="narrative-grid">
                    <div className="bio-column">
                        <h2 className="serif">Le Parcours</h2>
                        <div className="bio-text-rich">
                            <p className="dropcap-bio">{artist.bio}</p>
                        </div>
                    </div>
                    <div className="milestones-column glass">
                        <h3 className="serif">Distinctions</h3>
                        <ul className="milestone-list">
                            {artist.achievements.map((a, i) => (
                                <li key={i} className="milestone-item">
                                    <span className="milestone-dot"></span>
                                    {a}
                                </li>
                            ))}
                        </ul>
                        <div className="specialty-box">
                            <label>Spécialité</label>
                            <p>{artist.specialty}</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="artist-universe">
                <header className="section-header-mini">
                    <h2 className="serif">Son Univers</h2>
                    <p>Une immersion dans les œuvres de {artist.name}</p>
                </header>

                <div className="artwork-grid">
                    {artistWorks.map(art => (
                        <Link to={`/artwork/${art.id}`} key={art.id} className="artwork-card-mini glass">
                            <img src={art.image} alt={art.title} />
                            <div className="mini-info">
                                <h4>{art.title}</h4>
                                <p>{art.technique}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            <section className="latest-realizations glass">
                <h3 className="serif">Dernières Réalisations</h3>
                <p>Projets récents et explorations en cours dans l'atelier.</p>
                <div className="realizations-placeholder">
                    <p>Le travail continue... La résilience ne s'arrête jamais.</p>
                </div>
            </section>
        </div>
    );
};

export default ArtistProfile;
