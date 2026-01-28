import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import ThemeToggle from '../ui/ThemeToggle';
import logo from '../../assets/images/logo.jpeg';
import './Navbar.css';

const Navbar = () => {
    const { cartCount } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="navbar glass">
            <div className="nav-container">
                <div className="nav-logo">
                    <img src={logo} alt="Elikia Art Logo" className="logo-img" />
                    <span className="serif">ELIKIA ART</span>
                </div>

                <div className={`nav-links ${isMenuOpen ? 'mobile-open' : ''}`}>
                    <Link to="/" onClick={() => setIsMenuOpen(false)}>Accueil</Link>
                    <Link to="/gallery" onClick={() => setIsMenuOpen(false)}>Galerie</Link>
                    <Link to="/artists" onClick={() => setIsMenuOpen(false)}>Artistes</Link>
                    <Link to="/journal" onClick={() => setIsMenuOpen(false)}>Histoires</Link>
                    <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
                </div>

                <div className="nav-actions">
                    <ThemeToggle />
                    <button className="cart-icon">
                        <ShoppingBag size={22} />
                        {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                    </button>
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
