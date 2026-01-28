import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { artworks } from '../data/mockData';
import './ArtworkDetail.css';

const ArtworkDetail = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const art = artworks.find(item => item.id === parseInt(id));

    if (!art) return <div className="container">Œuvre non trouvée</div>;

    return (
        <div className="artwork-detail container">
            <Link to="/" className="back-link">← Retour à la galerie</Link>

            <div className="detail-grid">
                <div className="detail-image-section">
                    <div className="image-container glass">
                        <img src={art.image} alt={art.title} />
                    </div>
                    <div className="image-zoom-hint">Survolez pour explorer les détails</div>
                </div>

                <div className="detail-info-section">
                    <header className="info-header">
                        <p className="artist-tag">{art.artist}</p>
                        <h1 className="serif">{art.title}</h1>
                        <div className="price-tag serif">{art.price} $</div>
                    </header>

                    <div className="info-body">
                        <div className="story-section">
                            <h3 className="serif">L'Histoire</h3>
                            <p>{art.description}</p>
                        </div>

                        <div className="specs-section">
                            <div className="spec-item">
                                <span>Technique</span>
                                <p>{art.technique}</p>
                            </div>
                            <div className="spec-item">
                                <span>Dimensions</span>
                                <p>{art.dimensions}</p>
                            </div>
                            <div className="spec-item">
                                <span>Année</span>
                                <p>{art.year}</p>
                            </div>
                        </div>

                        <div className="order-actions">
                            <button
                                className="btn btn-primary btn-block"
                                onClick={() => addToCart(art)}
                            >
                                Ajouter au panier
                            </button>
                            <button className="btn btn-secondary btn-block">Faire une offre</button>
                        </div>

                        <div className="trust-badges">
                            <p>✓ Certificat d'authenticité inclus</p>
                            <p>✓ Livraison internationale sécurisée</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArtworkDetail;
