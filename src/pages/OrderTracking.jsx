import React, { useState, useEffect } from 'react';
import { Search, Package, Truck, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { db } from '../config/firebase';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import './OrderTracking.css';

const OrderTracking = () => {
    const [orderId, setOrderId] = useState('');
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { currentUser } = useAuth();

    const handleTrack = async (e) => {
        if (e) e.preventDefault();
        if (!orderId.trim()) return;

        setLoading(true);
        setError('');
        setOrder(null);

        try {
            const docRef = doc(db, 'orders', orderId.trim());
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setOrder({ id: docSnap.id, ...docSnap.data() });
            } else {
                setError("Oups ! Nous n'avons pas trouvé de commande avec cet ID. Vérifiez votre numéro de suivi.");
            }
        } catch (err) {
            console.error("Tracking error:", err);
            setError("Une erreur est survenue lors de la recherche. Veuillez réessayer.");
        } finally {
            setLoading(false);
        }
    };

    const getStatusStep = (status) => {
        const steps = ['pending', 'processing', 'shipped', 'delivered'];
        return steps.indexOf(status?.toLowerCase()) || 0;
    };

    const StatusIcon = ({ status, active }) => {
        switch (status) {
            case 'pending': return <Clock className={active ? 'active' : ''} />;
            case 'processing': return <Package className={active ? 'active' : ''} />;
            case 'shipped': return <Truck className={active ? 'active' : ''} />;
            case 'delivered': return <CheckCircle className={active ? 'active' : ''} />;
            default: return <Clock className={active ? 'active' : ''} />;
        }
    };

    return (
        <div className="tracking-page container animate-fade">
            <header className="tracking-header">
                <h1 className="serif">Suivi de Commande</h1>
                <p>Suivez le voyage de votre œuvre d'art, de l'atelier à votre porte.</p>
            </header>

            <div className="tracking-search-box glass">
                <form onSubmit={handleTrack}>
                    <input
                        type="text"
                        placeholder="Entrez votre numéro de commande (ex: 2v8h...)"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                    />
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Recherche...' : 'Suivre'}
                    </button>
                </form>
            </div>

            {error && (
                <div className="error-msg glass animate-shake">
                    <AlertCircle size={20} />
                    <p>{error}</p>
                </div>
            )}

            {order && (
                <div className="order-details animate-fade">
                    <div className="order-status-visual glass">
                        <div className="status-progress-bar">
                            {['pending', 'processing', 'shipped', 'delivered'].map((step, index) => (
                                <div key={step} className={`status-step ${getStatusStep(order.status) >= index ? 'active' : ''}`}>
                                    <div className="icon-wrap">
                                        <StatusIcon status={step} active={getStatusStep(order.status) >= index} />
                                    </div>
                                    <span>
                                        {step === 'pending' && 'Reçue'}
                                        {step === 'processing' && 'Préparation'}
                                        {step === 'shipped' && 'En route'}
                                        {step === 'delivered' && 'Livrée'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="order-info-grid">
                        <div className="info-card glass">
                            <h3>Détails de Livraison</h3>
                            <p><strong>Destinataire :</strong> {order.customerName}</p>
                            <p><strong>Adresse :</strong> {order.address}, {order.city}</p>
                            <p><strong>Mode de paiement :</strong> {order.paymentMethod === 'card' ? 'Carte Bancaire' : 'Mobile Money'}</p>
                        </div>
                        <div className="info-card glass">
                            <h3>Résumé des Œuvres</h3>
                            <div className="order-items-list">
                                {order.items.map(item => (
                                    <div key={item.id} className="mini-item">
                                        <img src={item.image} alt={item.title} />
                                        <div>
                                            <p>{item.title}</p>
                                            <span>{item.price} $</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="total-row">
                                <span>Total</span>
                                <strong>{order.total} $</strong>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="tracking-help glass">
                <h3>Besoin d'aide ?</h3>
                <p>Vous n'avez pas votre numéro de commande ? Vérifiez votre email de confirmation ou contactez notre support.</p>
                <button className="btn btn-outline">Contacter le support</button>
            </div>
        </div>
    );
};

export default OrderTracking;
