import React, { useState } from 'react';
import './Checkout.css';
import { useCart } from '../context/CartContext';

const Checkout = () => {
    const { cartCount } = useCart();
    const [paymentMethod, setPaymentMethod] = useState('card');

    return (
        <div className="checkout-page container">
            <h2 className="serif">Finaliser la Commande</h2>

            <div className="checkout-grid">
                <div className="checkout-form glass">
                    <section className="form-section">
                        <h3>1. Informations de Livraison</h3>
                        <div className="input-group">
                            <input type="text" placeholder="Nom complet" />
                            <input type="email" placeholder="Email" />
                            <input type="text" placeholder="Adresse" />
                            <div className="row">
                                <input type="text" placeholder="Ville" />
                                <input type="text" placeholder="Pays" />
                            </div>
                        </div>
                    </section>

                    <section className="form-section">
                        <h3>2. Mode de Paiement</h3>
                        <div className="payment-options">
                            <label className={`payment-pill ${paymentMethod === 'card' ? 'active' : ''}`}>
                                <input type="radio" name="payment" value="card" onChange={() => setPaymentMethod('card')} />
                                Carte Bancaire (Visa/Mastercard)
                            </label>
                            <label className={`payment-pill ${paymentMethod === 'mobile' ? 'active' : ''}`}>
                                <input type="radio" name="payment" value="mobile" onChange={() => setPaymentMethod('mobile')} />
                                Mobile Money (M-Pesa/Airtel)
                            </label>
                            <label className={`payment-pill ${paymentMethod === 'paypal' ? 'active' : ''}`}>
                                <input type="radio" name="payment" value="paypal" onChange={() => setPaymentMethod('paypal')} />
                                PayPal
                            </label>
                        </div>

                        {paymentMethod === 'mobile' && (
                            <div className="mobile-money-info animate-fade">
                                <p>Veuillez entrer votre numéro de téléphone pour recevoir la demande de paiement.</p>
                                <input type="tel" placeholder="+243 ..." />
                            </div>
                        )}
                    </section>

                    <button className="btn btn-primary btn-block mt-lg">Confirmer le paiement</button>
                </div>

                <div className="order-summary glass">
                    <h3 className="serif">Résumé</h3>
                    <div className="summary-item">
                        <span>Articles ({cartCount})</span>
                        <span>Calculé au panier</span>
                    </div>
                    <div className="summary-item">
                        <span>Livraison</span>
                        <span>Gratuite (Promotion)</span>
                    </div>
                    <div className="summary-total">
                        <span>Total</span>
                        <span className="serif">À confirmer</span>
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
