import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingBag, User } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import ThemeToggle from '../ui/ThemeToggle';
import logo from '../../assets/images/logo.jpeg';
import './Navbar.css';

const Navbar = () => {
    const { cartCount, setIsCartOpen } = useCart();
    const { currentUser, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="navbar glass">
            <div className="nav-container">
                <div className="nav-logo">
                    <img src={logo} alt="Elikia Art Logo" className="logo-img" />
                    <span className="serif">ELIKIA ART</span>
                </div>

                <div className={`nav-links ${isMenuOpen ? 'mobile-open' : ''}`}>
                    {currentUser?.role === 'admin' ? (
                        <>
                            <Link to="/admin" onClick={() => setIsMenuOpen(false)}>Dashboard Admin</Link>
                            <Link to="/admin" onClick={() => setIsMenuOpen(false)}>Gestion BDD</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/" onClick={() => setIsMenuOpen(false)}>Accueil</Link>
                            <Link to="/gallery" onClick={() => setIsMenuOpen(false)}>Galerie</Link>
                            <Link to="/artists" onClick={() => setIsMenuOpen(false)}>Artistes</Link>
                            <Link to="/journal" onClick={() => setIsMenuOpen(false)}>Histoires</Link>
                            <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
                        </>
                    )}
                </div>

                <div className="nav-actions">
                    <ThemeToggle />

                    {currentUser ? (
                        currentUser.role === 'admin' ? (
                            <button onClick={() => { logout(); setIsMenuOpen(false); }} className="btn-logout-nav">
                                Déconnexion
                            </button>
                        ) : (
                            <Link to="/profile" className="user-icon" aria-label="Mon Profil">
                                <User size={22} />
                            </Link>
                        )
                    ) : (
                        <Link to="/login" className="btn-login-nav">
                            Connexion
                        </Link>
                    )}

                    {currentUser?.role !== 'admin' && (
                        <button className="cart-icon" onClick={() => setIsCartOpen(true)}>
                            <ShoppingBag size={22} />
                            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                        </button>
                    )}
                    <button
                        className="mobile-toggle"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle Menu"
                    >
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
