import React, { useState } from 'react';
import './Checkout.css';
import { useCart } from '../context/CartContext';

const Checkout = () => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handlePayment = (e) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate payment delay
        setTimeout(() => {
            // Create new order
            const newOrder = {
                id: Math.floor(Math.random() * 100000).toString(),
                date: new Date().toLocaleDateString('fr-FR'),
                items: cartItems,
                total: cartTotal,
                status: 'Confirmée'
            };

            // Save to localStorage
            const existingOrders = JSON.parse(localStorage.getItem('elikia_orders') || '[]');
            localStorage.setItem('elikia_orders', JSON.stringify([newOrder, ...existingOrders]));

            setIsProcessing(false);
            setIsSuccess(true);
            clearCart();
        }, 2500);
    };

    if (isSuccess) {
        return (
            <div className="checkout-page container animate-fade">
                <div className="success-message glass">
                    <h2 className="serif">Merci pour votre commande !</h2>
                    <p>Un email de confirmation a été envoyé à votre adresse.</p>
                    <p>Votre commande est en cours de préparation par nos artistes.</p>
                    <Link to="/gallery" className="btn btn-primary mt-lg">Continuer l'exploration</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-page container">
            <h2 className="serif">Finaliser la Commande</h2>

            <div className="checkout-grid">
                <form className="checkout-form glass" onSubmit={handlePayment}>
                    <section className="form-section">
                        <h3>1. Informations de Livraison</h3>
                        <div className="input-group">
                            <input type="text" placeholder="Nom complet" required />
                            <input type="email" placeholder="Email" required />
                            <input type="text" placeholder="Adresse" required />
                            <div className="row">
                                <input type="text" placeholder="Ville" required />
                                <input type="text" placeholder="Pays" required />
                            </div>
                        </div>
                    </section>

                    <section className="form-section">
                        <h3>2. Mode de Paiement</h3>
                        <div className="payment-options">
                            <label className={`payment-pill ${paymentMethod === 'card' ? 'active' : ''}`}>
                                <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                                Carte Bancaire (Stripe)
                            </label>
                            <label className={`payment-pill ${paymentMethod === 'mobile' ? 'active' : ''}`}>
                                <input type="radio" name="payment" value="mobile" checked={paymentMethod === 'mobile'} onChange={() => setPaymentMethod('mobile')} />
                                Mobile Money (M-Pesa/Airtel)
                            </label>
                        </div>

                        {paymentMethod === 'mobile' && (
                            <div className="mobile-money-info animate-fade">
                                <p>Veuillez entrer votre numéro de téléphone pour recevoir la demande de paiement.</p>
                                <input type="tel" placeholder="+243 ..." required />
                            </div>
                        )}
                        {paymentMethod === 'card' && (
                            <div className="card-info animate-fade">
                                <p>Paiement sécurisé via Stripe.</p>
                                <div className="stripe-mock-input">•••• •••• •••• ••••</div>
                            </div>
                        )}
                    </section>

                    <button
                        type="submit"
                        className="btn btn-primary btn-block mt-lg"
                        disabled={isProcessing || cartItems.length === 0}
                    >
                        {isProcessing ? 'Traitement en cours...' : `Payer ${cartTotal} $`}
                    </button>
                </form>

                <div className="order-summary glass">
                    <h3 className="serif">Résumé</h3>
                    <div className="summary-items">
                        {cartItems.map(item => (
                            <div key={item.id} className="summary-item">
                                <span>{item.title} (x{item.quantity})</span>
                                <span>{item.price * item.quantity} $</span>
                            </div>
                        ))}
                    </div>
                    <div className="summary-item divider">
                        <span>Livraison</span>
                        <span>Gratuite</span>
                    </div>
                    <div className="summary-total">
                        <span>Total</span>
                        <span className="serif">{cartTotal} $</span>
                    </div>

                    <div className="trust-info">
                        <p>🔒 Paiement sécurisé SSL</p>
                        <p>📜 Certificat d'authenticité Elikia Art inclus</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
