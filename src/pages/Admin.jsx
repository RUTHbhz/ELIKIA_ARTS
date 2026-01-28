import React from 'react';
import './Admin.css';

const Admin = () => {
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
                        <h3>Catalogue des Œuvres</h3>
                        <button className="btn btn-primary">+ Ajouter une œuvre</button>
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
