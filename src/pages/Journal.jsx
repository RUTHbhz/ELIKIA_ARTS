import React from 'react';
import './Journal.css';
import { Link } from 'react-router-dom';
import { stories } from '../data/mockData';

const Journal = () => {
    return (
        <div className="journal-page container" id="journal">
            <header className="journal-header">
                <h2 className="serif">Histoires & Journal</h2>
                <p>Plongez dans les récits de création, de résilience et de vie d'atelier.</p>
            </header>

            <div className="stories-grid">
                {stories.map(story => (
                    <article key={story.id} className="story-card">
                        <div className="story-image-wrapper">
                            <img src={story.image} alt={story.title} />
                            <div className="story-date">{story.date}</div>
                        </div>
                        <div className="story-content">
                            <h3 className="serif light-text">{story.title}</h3>
                            <p className="story-excerpt">{story.excerpt}</p>
                            <Link to={`/journal/${story.id}`} className="btn-text">
                                Lire l'histoire →
                            </Link>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
};

export default Journal;
