import React, { useState } from 'react';
import './Events.css';

const eventsData = [
    {
        id: 1,
        title: "Espoir Kivu en Couleur",
        date: "Avril 2024",
        location: "Goma, DRC",
        category: "Exposition",
        description: "Une célébration chromatique de la vie et de la force du peuple du Kivu à travers les yeux de nos artistes."
    },
    {
        id: 2,
        title: "Résilience Femme du Kivu",
        date: "Mars 2024",
        location: "C.C. Wallonie-Bruxelles, Kinshasa",
        category: "Exposition Page",
        description: "Une exposition poignante rendant hommage à la résilience et au courage des femmes du Kivu face aux défis."
    },
    {
        id: 3,
        title: "Atelier Vibration & Mémoire",
        date: "Juin 2024",
        location: "Goma Artist Lab",
        category: "Workshop",
        description: "Un laboratoire créatif explorant comment la mémoire collective peut être transformée en vibrations artistiques."
    }
];

const Events = () => {
    const [activeEvent, setActiveEvent] = useState(null);

    return (
        <section className="events-section container">
            <header className="section-header">
                <h2 className="serif light-text">Dernières Activités</h2>
                <p>Le collectif en mouvement, au-delà des toiles.</p>
            </header>

            <div className="events-grid">
                {eventsData.map(event => (
                    <div
                        key={event.id}
                        className={`event-card glass ${activeEvent === event.id ? 'active' : ''}`}
                        onClick={() => setActiveEvent(activeEvent === event.id ? null : event.id)}
                    >
                        <span className="event-category">{event.category}</span>
                        <h3 className="serif">{event.title}</h3>
                        <div className="event-meta">
                            <span>{event.date}</span>
                            <span>{event.location}</span>
                        </div>
                        {activeEvent === event.id && (
                            <div className="event-description animate-fade">
                                <p>{event.description}</p>
                                <button className="btn btn-primary mini-btn">En savoir plus</button>
                            </div>
                        )}
                        <div className="expand-hint">{activeEvent === event.id ? 'Réduire' : 'Voir détails'}</div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Events;
