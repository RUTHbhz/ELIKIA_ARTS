import React, { useState } from 'react';
import { seedDatabase } from '../utils/seedDatabase';
import './Admin.css';

const Admin = () => {
    const [isSeeding, setIsSeeding] = useState(false);

    const handleSeedDatabase = async () => {
        if (window.confirm('Voulez-vous vraiment initialiser la base de données avec les données de test ?')) {
            setIsSeeding(true);
            const result = await seedDatabase();
            alert(result.message);
            setIsSeeding(false);
        }
    };

    return (
        <div className="admin-page container">
            <h2 className="serif">Tableau de Bord Admin</h2>

            <div className="admin-grid">
                <aside className="admin-sidebar glass">
                    <ul>
                        <li className="active">Gestion des Œuvres</li>
                        <li>Artistes</li>
                        <li>Histoires / Journal</li>
                        <li>Ventes & Commandes</li>
                    </ul>
                </aside>

                <main className="admin-main glass">
                    <header className="admin-content-header">
                        <div>
                            <h3>Catalogue des Œuvres</h3>
                            <p className="subtitle">Gérez vos collections et inventaire</p>
                        </div>
                        <div className="admin-actions">
                            <button
                                className="btn btn-secondary"
                                onClick={handleSeedDatabase}
                                disabled={isSeeding}
                            >
                                {isSeeding ? 'Initialisation...' : '🔄 Initialiser BDD'}
                            </button>
                            <button className="btn btn-primary">+ Ajouter une œuvre</button>
                        </div>
                    </header>

                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Titre</th>
                                <th>Artiste</th>
                                <th>Prix</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Résilience au Kivu</td>
                                <td>JP Kabangu</td>
                                <td>1200 $</td>
                                <td>En vente</td>
                                <td>Modifier | Supprimer</td>
                            </tr>
                        </tbody>
                    </table>
                </main>
            </div>
        </div>
    );
};

export default Admin;
