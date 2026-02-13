import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const userCredential = await login(email, password);
            console.log("Login successful, checking role...");

            // We need to wait a tiny bit for AuthContext to update current user with doc data
            // Or we check manually here to be faster for redirection
            const { doc, getDoc } = await import('firebase/firestore');
            const { db } = await import('../config/firebase');
            const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));

            if (userDoc.exists() && userDoc.data().role === 'admin') {
                navigate('/admin', { replace: true });
            } else if (userDoc.exists() && userDoc.data().role === 'livreur') {
                navigate('/delivery', { replace: true });
            } else {
                navigate(from, { replace: true });
            }
        } catch (err) {
            console.error("Login error:", err);
            setError('Échec de la connexion. Vérifiez vos identifiants.');
        }

        setLoading(false);
    };

    return (
        <div className="auth-page">
            <div className="auth-card glass animate-fade">
                <header className="auth-header">
                    <h2 className="serif">Connexion</h2>
                    <p>Bon retour parmi nous</p>
                </header>

                {error && <div className="error-message">{error}</div>}

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary btn-block"
                        disabled={loading}
                    >
                        {loading ? 'Connexion...' : 'Se connecter'}
                    </button>
                </form>

                <div className="auth-footer">
                    Pas encore de compte ?
                    <Link to="/signup">S'inscrire</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
