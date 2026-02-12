import React, { useState, useEffect } from 'react';
import { User, Package, Clock, ShieldCheck } from 'lucide-react';
import './Profile.css';

const Profile = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const savedOrders = localStorage.getItem('elikia_orders');
        if (savedOrders) {
            setOrders(JSON.parse(savedOrders));
        }
    }, []);

    return (
        <div className="profile-page container">
            <header className="profile-header">
                <div className="user-info">
                    <div className="avatar-placeholder">
                        <User size={40} />
                    </div>
                    <div>
                        <h2 className="serif">Mon Espace Elikia</h2>
                        <p>Membre de la communauté des collectionneurs</p>
                    </div>
                </div>
            </header>

            <div className="profile-grid">
                <section className="order-history glass">
                    <div className="section-title">
                        <Package size={20} />
                        <h3 className="serif">Historique des Commandes</h3>
                    </div>

                    {orders.length === 0 ? (
                        <div className="no-orders">
                            <Clock size={40} />
                            <p>Vous n'avez pas encore passé de commande.</p>
                        </div>
                    ) : (
                        <div className="orders-list">
                            {orders.map(order => (
                                <div key={order.id} className="order-card">
                                    <div className="order-top">
                                        <span className="order-id">#{order.id}</span>
                                        <span className="order-date">{order.date}</span>
                                    </div>
                                    <div className="order-items">
                                        {order.items.map(item => (
                                            <div key={item.id} className="order-item">
                                                <span>{item.title} x{item.quantity}</span>
                                                <span>{item.price * item.quantity} $</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="order-total">
                                        <span>Total</span>
                                        <span className="serif">{order.total} $</span>
                                    </div>
                                    <div className="order-status">
                                        <ShieldCheck size={16} />
                                        <span>Authenticité certifiée par Elikia Art</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                <section className="account-details glass">
                    <h3 className="serif">Mes Détails</h3>
                    <div className="detail-item">
                        <label>Email</label>
                        <p>utilisateur@exemple.com</p>
                    </div>
                    <div className="detail-item">
                        <label>Adresse par défaut</label>
                        <p>Non renseignée</p>
                    </div>
                    <button className="btn btn-secondary btn-block">Modifier le profil</button>
                    <button className="btn btn-text btn-block mt-md" style={{ color: '#ef4444' }}>Déconnexion</button>
                </section>
            </div>
        </div>
    );
};

export default Profile;
