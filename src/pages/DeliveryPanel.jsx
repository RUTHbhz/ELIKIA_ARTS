import React, { useState, useEffect } from 'react';
import { useFirestoreConfig } from '../hooks/useFirestore';
import { db } from '../config/firebase';
import { collection, query, where, updateDoc, doc, onSnapshot } from 'firebase/firestore';
import { Truck, MapPin, Package, CheckCircle, Clock, Navigation, Phone } from 'lucide-react';
import './DeliveryPanel.css';

const DeliveryPanel = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Real-time listener for orders that need delivery
        const q = query(
            collection(db, 'orders'),
            where('status', 'in', ['paid', 'processing', 'shipped'])
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const ordersData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            // Sort by most recent
            ordersData.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds);
            setOrders(ordersData);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const updateStatus = async (orderId, newStatus) => {
        try {
            await updateDoc(doc(db, 'orders', orderId), {
                status: newStatus,
                updatedAt: new Date()
            });
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Erreur lors de la mise à jour du statut.");
        }
    };

    if (loading) {
        return (
            <div className="delivery-loading glass">
                <Truck className="animate-bounce" size={48} />
                <p>Chargement des livraisons...</p>
            </div>
        );
    }

    return (
        <div className="delivery-panel container animate-fade">
            <header className="delivery-header glass">
                <div className="header-info">
                    <h1 className="serif">Espace Livreur</h1>
                    <p>Gérez vos courses et validez les remises en main propre.</p>
                </div>
                <div className="delivery-stats">
                    <div className="stat-pill">
                        <Package size={18} />
                        <span>{orders.length} commandes en cours</span>
                    </div>
                </div>
            </header>

            <div className="delivery-grid">
                {orders.length === 0 ? (
                    <div className="empty-delivery glass">
                        <CheckCircle size={64} className="text-secondary" />
                        <h3>Toutes les livraisons sont terminées !</h3>
                        <p>Excellent travail. Revenez plus tard pour de nouvelles courses.</p>
                    </div>
                ) : (
                    orders.map(order => (
                        <div key={order.id} className="delivery-card glass animate-fade">
                            <div className="card-top">
                                <span className={`status-badge ${order.status}`}>
                                    {order.status === 'paid' ? 'À préparer' : (order.status === 'processing' ? 'En préparation' : 'En route')}
                                </span>
                                <span className="order-date">
                                    {order.createdAt?.toDate().toLocaleDateString('fr-FR')}
                                </span>
                            </div>

                            <div className="customer-info">
                                <h3 className="serif">{order.customerName}</h3>
                                <div className="info-row">
                                    <MapPin size={16} />
                                    <span>{order.address}, {order.city}</span>
                                </div>
                                <div className="info-row">
                                    <Phone size={16} />
                                    <span>{order.phoneNumber || 'N/A'}</span>
                                </div>
                            </div>

                            <div className="order-items">
                                <h4>Contenu du colis :</h4>
                                <ul>
                                    {order.items?.map((item, idx) => (
                                        <li key={idx}>
                                            <strong>{item.quantity}x</strong> {item.title}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="delivery-actions">
                                {order.status === 'paid' && (
                                    <button
                                        className="btn btn-primary btn-block"
                                        onClick={() => updateStatus(order.id, 'processing')}
                                    >
                                        <Package size={18} /> Prise en charge
                                    </button>
                                )}
                                {order.status === 'processing' && (
                                    <button
                                        className="btn btn-secondary btn-block"
                                        onClick={() => updateStatus(order.id, 'shipped')}
                                    >
                                        <Navigation size={18} /> Commencer la livraison
                                    </button>
                                )}
                                {order.status === 'shipped' && (
                                    <button
                                        className="btn btn-success btn-block"
                                        onClick={() => updateStatus(order.id, 'delivered')}
                                    >
                                        <CheckCircle size={18} /> Confirmer la remise
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default DeliveryPanel;
