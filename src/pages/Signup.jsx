import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            return setError('Les mots de passe ne correspondent pas');
        }

        setError('');
        setLoading(true);

        try {
            await signup(name, email, password);
            navigate('/');
        } catch (err) {
            setError('Échec de l\'inscription. Veuillez réessayer.');
        }

        setLoading(false);
    };

    return (
        <div className="auth-page">
            <div className="auth-card glass animate-fade">
                <header className="auth-header">
                    <h2 className="serif">Inscription</h2>
                    <p>Rejoignez la communauté Elikia</p>
                </header>

                {error && <div className="error-message">{error}</div>}

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Nom complet"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
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
                        <input
                            type="password"
                            placeholder="Confirmer le mot de passe"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary btn-block"
                        disabled={loading}
                    >
                        {loading ? 'Inscription...' : 'Créer mon compte'}
                    </button>
                </form>

                <div className="auth-footer">
                    Déjà un compte ?
                    <Link to="/login">Se connecter</Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
