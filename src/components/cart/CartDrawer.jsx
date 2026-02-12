import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './CartDrawer.css';

const CartDrawer = () => {
    const {
        isCartOpen,
        setIsCartOpen,
        cartItems,
        cartTotal,
        removeFromCart,
        updateQuantity
    } = useCart();

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    <motion.div
                        className="cart-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                    />
                    <motion.div
                        className="cart-drawer"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    >
                        <div className="cart-header">
                            <div className="title-section">
                                <ShoppingBag size={20} />
                                <h2 className="serif">Votre Panier</h2>
                            </div>
                            <button className="close-btn" onClick={() => setIsCartOpen(false)}>
                                <X size={24} />
                            </button>
                        </div>

                        <div className="cart-content">
                            {cartItems.length === 0 ? (
                                <div className="empty-cart">
                                    <p>Votre panier est vide.</p>
                                    <Link
                                        to="/gallery"
                                        className="btn btn-secondary"
                                        onClick={() => setIsCartOpen(false)}
                                    >
                                        Explorer la Galerie
                                    </Link>
                                </div>
                            ) : (
                                <ul className="cart-items">
                                    {cartItems.map(item => (
                                        <li key={item.id} className="cart-item">
                                            <div className="item-img">
                                                <img src={item.image} alt={item.title} />
                                            </div>
                                            <div className="item-details">
                                                <h3 className="serif">{item.title}</h3>
                                                <p className="item-artist">{item.artist}</p>
                                                <p className="item-price">{item.price} $</p>
                                                <div className="item-controls">
                                                    <div className="qty-selector">
                                                        <button onClick={() => updateQuantity(item.id, -1)}><Minus size={14} /></button>
                                                        <span>{item.quantity}</span>
                                                        <button onClick={() => updateQuantity(item.id, 1)}><Plus size={14} /></button>
                                                    </div>
                                                    <button
                                                        className="remove-btn"
                                                        onClick={() => removeFromCart(item.id)}
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {cartItems.length > 0 && (
                            <div className="cart-footer">
                                <div className="cart-total">
                                    <span>Total</span>
                                    <span className="serif">{cartTotal} $</span>
                                </div>
                                <Link
                                    to="/checkout"
                                    className="btn btn-primary btn-block"
                                    onClick={() => setIsCartOpen(false)}
                                >
                                    Passer la commande
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
