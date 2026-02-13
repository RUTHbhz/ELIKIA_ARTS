import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { db } from '../config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { CreditCard, Smartphone, CheckCircle2, AlertCircle } from 'lucide-react';
import { NotificationService } from '../services/notificationService';
import './Checkout.css';

const Checkout = () => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const { currentUser } = useAuth();
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [phone, setPhone] = useState('');
    const [cardData, setCardData] = useState({ number: '', expiry: '', cvc: '' });
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    const TEST_NUMBERS = {
        MOBILE_SUCCESS: '0810000000',
        MOBILE_FAILURE: '0819999999',
        CARD_SUCCESS: '4242424242424242', // Standard Stripe Success
        CARD_FAILURE: '4000000000000002'  // Card Declined
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        setError('');
        setIsProcessing(true);

        // Mobile Money Validation
        if (paymentMethod === 'mobile') {
            if (!phone.match(/^[0-9]{10}$/)) {
                setError('Veuillez entrer un numéro valide (10 chiffres).');
                setIsProcessing(false);
                return;
            }
            if (phone === TEST_NUMBERS.MOBILE_FAILURE) {
                setTimeout(() => {
                    setError('Paiement Mobile refusé : Solde insuffisant.');
                    setIsProcessing(false);
                }, 2000);
                return;
            }
        }

        // Credit Card Validation
        if (paymentMethod === 'card') {
            if (cardData.number.replace(/\s/g, '') === TEST_NUMBERS.CARD_FAILURE) {
                setTimeout(() => {
                    setError('Paiement par carte refusé : Carte déclinée par la banque.');
                    setIsProcessing(false);
                }, 2000);
                return;
            }
            if (cardData.number.length < 16 || cardData.cvc.length < 3) {
                setError('Veuillez remplir correctement les informations de votre carte Visa/Mastercard.');
                setIsProcessing(false);
                return;
            }
        }

        try {
            await new Promise(resolve => setTimeout(resolve, 3000));

            const orderData = {
                userId: currentUser?.uid || 'anonymous',
                customerEmail: currentUser?.email || e.target.email.value,
                customerName: e.target.name.value,
                address: e.target.address.value,
                city: e.target.city.value,
                items: cartItems,
                total: cartTotal,
                paymentMethod: paymentMethod,
                phoneNumber: paymentMethod === 'mobile' ? phone : null,
                cardLast4: paymentMethod === 'card' ? cardData.number.slice(-4) : null,
                status: 'pending',
                createdAt: serverTimestamp()
            };

            const docRef = await addDoc(collection(db, 'orders'), orderData);
            const finalOrderData = { id: docRef.id, ...orderData };

            // Trigger Real Notifications (Directly in frontend for EmailJS)
            if (paymentMethod === 'card') {
                await NotificationService.sendOrderEmail(finalOrderData);
            } else if (paymentMethod === 'mobile') {
                await NotificationService.sendOrderSMS(finalOrderData);
            }

            setIsSuccess(true);
            clearCart();
        } catch (err) {
            setError('Erreur technique. Veuillez réessayer.');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleCardChange = (e) => {
        const { name, value } = e.target;
        setCardData(prev => ({ ...prev, [name]: value }));
    };

    if (isSuccess) {
        return (
            <div className="checkout-page container animate-fade">
                <div className="success-message glass">
                    <CheckCircle2 size={64} className="text-primary mb-md" />
                    <h2 className="serif">Merci pour votre commande !</h2>
                    <div className="notification-status mb-md">
                        {paymentMethod === 'card' ? (
                            <p className="flex-center gap-sm">
                                📩 <strong>Email de confirmation envoyé</strong> à {currentUser?.email || 'votre adresse'}.
                            </p>
                        ) : (
                            <p className="flex-center gap-sm">
                                📱 <strong>SMS de confirmation envoyé</strong> au {phone}.
                            </p>
                        )}
                    </div>
                    <p>Votre commande est en cours de préparation par nos artistes.</p>
                    <div className="order-actions mt-lg">
                        <Link to="/gallery" className="btn btn-outline">Continuer l'exploration</Link>
                        <Link to="/tracking" className="btn btn-primary">Suivre ma commande</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-page container">
            <h2 className="serif">Finaliser la Commande</h2>

            <div className="checkout-grid">
                <form className="checkout-form glass" onSubmit={handlePayment}>
                    {error && (
                        <div className="error-alert animate-shake">
                            <AlertCircle size={18} /> {error}
                        </div>
                    )}

                    <section className="form-section">
                        <h3>1. Informations de Livraison</h3>
                        <div className="input-group">
                            <input name="name" type="text" placeholder="Nom complet" required />
                            <input name="email" type="email" placeholder="Email" defaultValue={currentUser?.email || ''} required />
                            <input name="address" type="text" placeholder="Adresse complète" required />
                            <div className="row">
                                <input name="city" type="text" placeholder="Ville" required />
                                <input name="country" type="text" placeholder="Pays" defaultValue="RD Congo" required />
                            </div>
                        </div>
                    </section>

                    <section className="form-section">
                        <h3>2. Mode de Paiement</h3>
                        <div className="payment-options">
                            <label className={`payment-pill ${paymentMethod === 'card' ? 'active' : ''}`}>
                                <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                                <CreditCard size={20} />
                                <span>Stripe / Carte</span>
                            </label>
                            <label className={`payment-pill ${paymentMethod === 'mobile' ? 'active' : ''}`}>
                                <input type="radio" name="payment" value="mobile" checked={paymentMethod === 'mobile'} onChange={() => setPaymentMethod('mobile')} />
                                <Smartphone size={20} />
                                <span>Mobile Money</span>
                            </label>
                        </div>

                        {paymentMethod === 'mobile' && (
                            <div className="mobile-money-info animate-fade">
                                <p>Saisissez votre numéro pour initier la demande de paiement.</p>
                                <div className="test-hint">💡 Test : <strong>0810000000</strong> pour succès</div>
                                <input
                                    type="tel"
                                    placeholder="081 234 5678"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                />
                            </div>
                        )}
                        {paymentMethod === 'card' && (
                            <div className="card-info animate-fade">
                                <p>Paiement sécurisé via Stripe (Visa, Mastercard).</p>
                                <div className="test-hint">💡 Test Visa : <strong>4242 4242 4242 4242</strong></div>
                                <div className="card-fields">
                                    <input
                                        name="number"
                                        placeholder="Numéro de carte"
                                        value={cardData.number}
                                        onChange={handleCardChange}
                                        maxLength="16"
                                        required
                                    />
                                    <div className="row">
                                        <input
                                            name="expiry"
                                            placeholder="MM/YY"
                                            value={cardData.expiry}
                                            onChange={handleCardChange}
                                            maxLength="5"
                                            required
                                        />
                                        <input
                                            name="cvc"
                                            type="password"
                                            placeholder="CVC"
                                            value={cardData.cvc}
                                            onChange={handleCardChange}
                                            maxLength="3"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </section>

                    <button
                        type="submit"
                        className="btn btn-primary btn-block mt-lg"
                        disabled={isProcessing || cartItems.length === 0}
                    >
                        {isProcessing ? 'Traitement en cours...' : `Confirmer et Payer ${cartTotal} $`}
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
