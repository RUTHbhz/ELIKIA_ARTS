import React from 'react';
import { Link } from 'react-router-dom';
import { artists } from '../data/mockData';
import './Artists.css';

const Artists = () => {
    return (
        <div className="artists-page container" id="artists">
            <header className="artists-header">
                <h2 className="serif">Les Artistes</h2>
                <p>Découvrez les voix et les mains derrière le collectif Elikia Art.</p>
            </header>

            <div className="artists-grid">
                {artists.map((artist, index) => (
                    <div key={artist.id} className="artist-card glass animate-fade">
                        <div className="artist-index">0{index + 1}</div>
                        <span className="explorer-tag">ELIKIA UNIVERSE</span>
                        <div className="artist-portrait-outer-frame">
                            <div className="artist-portrait-wrapper vibrate-glow">
                                <img src={artist.portrait} alt={artist.name} />
                            </div>
                        </div>
                        <div className="artist-info">
                            <span className="artist-role">{artist.role}</span>
                            <h3 className="serif">{artist.name}</h3>
                            <p className="artist-bio-preview">{artist.bio}</p>
                            <Link to={`/artist/${artist.id}`} className="btn-link">
                                Explorer son univers <span>→</span>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Artists;
