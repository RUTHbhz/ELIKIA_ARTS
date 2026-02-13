import React, { useState } from 'react';
import { useFirestoreConfig } from '../hooks/useFirestore';
import { db } from '../config/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { seedDatabase } from '../utils/seedDatabase';
import {
    Plus, Edit2, Trash2, LayoutDashboard, Palette, Users,
    BookOpen, Calendar, ShoppingBag, Database, X, Save, UserCheck, Truck, ShieldAlert
} from 'lucide-react';
import './Admin.css';

const Admin = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isSeeding, setIsSeeding] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(null); // 'artwork', 'artist', 'story', 'user'
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({});

    // Fetch collections
    const { data: artworks } = useFirestoreConfig('artworks');
    const { data: artists } = useFirestoreConfig('artists');
    const { data: stories } = useFirestoreConfig('journal');
    const { data: users } = useFirestoreConfig('users');
    const { data: orders } = useFirestoreConfig('orders');

    const handleSeedDatabase = async () => {
        if (window.confirm('Initialize with demo data? This will add many items.')) {
            setIsSeeding(true);
            const result = await seedDatabase();
            alert(result.message);
            setIsSeeding(false);
        }
    };

    const handleDelete = async (coll, id) => {
        if (window.confirm('Voulez-vous vraiment supprimer cet élément ?')) {
            try {
                await deleteDoc(doc(db, coll, id));
            } catch (e) {
                alert("Erreur lors de la suppression : " + e.message);
            }
        }
    };

    const openModal = (type, item = null) => {
        setModalType(type);
        setEditingItem(item);
        if (item) {
            setFormData(item);
        } else {
            // Default empty schemas
            const defaults = {
                artwork: { title: '', artist: '', price: '', image: '', theme: 'Resilience', description: '' },
                artist: { name: '', role: '', specialty: '', bio: '', portrait: '' },
                story: { title: '', author: '', date: new Date().toLocaleDateString(), excerpt: '', content: '', image: '' },
                user: { displayName: '', email: '', role: 'client' }
            };
            setFormData(defaults[type] || {});
        }
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingItem(null);
        setFormData({});
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const collectionName = modalType === 'story' ? 'journal' : (modalType === 'artwork' ? 'artworks' : (modalType === 'artist' ? 'artists' : 'users'));

        try {
            if (editingItem) {
                // Remove ID from data before sending to Firestore
                const { id, ...updateData } = formData;
                await updateDoc(doc(db, collectionName, editingItem.id), updateData);
            } else {
                if (modalType === 'user' && formData.uid) {
                    await setDoc(doc(db, 'users', formData.uid), formData);
                } else {
                    await addDoc(collection(db, collectionName), formData);
                }
            }
            closeModal();
        } catch (error) {
            console.error("Form error:", error);
            alert("Erreur : " + error.message);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Render Stats
    const renderDashboard = () => {
        const totalRevenue = orders.reduce((sum, order) => sum + (parseFloat(order.total) || 0), 0);
        const pendingOrders = orders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled');

        return (
            <div className="admin-dashboard-stats animate-fade">
                <div className="stat-card">
                    <ShoppingBag size={24} className="text-primary" />
                    <div className="stat-content">
                        <span className="stat-value">{totalRevenue.toLocaleString()} $</span>
                        <span className="stat-label">Chiffre d'Affaires</span>
                    </div>
                </div>
                <div className="stat-card">
                    <Truck size={24} className="text-secondary" />
                    <div className="stat-content">
                        <span className="stat-value">{pendingOrders.length}</span>
                        <span className="stat-label">À Livrer</span>
                    </div>
                </div>
                <div className="stat-card">
                    <Palette size={24} />
                    <div className="stat-content">
                        <span className="stat-value">{artworks.length}</span>
                        <span className="stat-label">Œuvres</span>
                    </div>
                </div>
                <div className="stat-card">
                    <Users size={24} />
                    <div className="stat-content">
                        <span className="stat-value">{users.length}</span>
                        <span className="stat-label">Clients</span>
                    </div>
                </div>
            </div>
        );
    };

    // Render Tables
    const renderTable = (data, type, collectionName) => (
        <div className="admin-content-section animate-fade">
            <header className="section-header-admin">
                <h3>
                    {type === 'artwork' && 'Galerie d\'art'}
                    {type === 'artist' && 'Annuaire Artistes'}
                    {type === 'story' && 'Journal Elikia'}
                    {type === 'user' && 'Communauté Elikia'}
                    {type === 'order' && 'Gestion des Commandes'}
                </h3>
                {type !== 'order' && (
                    <button className="btn btn-primary add-btn" onClick={() => openModal(type)}>
                        <Plus size={16} /> Nouveau
                    </button>
                )}
            </header>
            <div className="table-responsive">
                <table className="admin-table">
                    <thead>
                        <tr>
                            {type === 'artwork' && <><th>Aperçu</th><th>Titre</th><th>Artiste</th><th>Prix</th></>}
                            {type === 'artist' && <><th>Portrait</th><th>Nom</th><th>Spécialité</th></>}
                            {type === 'story' && <><th>Miniature</th><th>Titre</th><th>Auteur</th></>}
                            {type === 'user' && <><th>Profil</th><th>Email</th><th>Rôle</th></>}
                            {type === 'order' && <><th>Client</th><th>Total</th><th>Statut</th><th>Date</th></>}
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                {type === 'artwork' && (
                                    <>
                                        <td><img src={item.image} className="small-thumb" alt="" /></td>
                                        <td><strong>{item.title}</strong></td>
                                        <td>{item.artist}</td>
                                        <td>{item.price} $</td>
                                    </>
                                )}
                                {type === 'artist' && (
                                    <>
                                        <td><img src={item.portrait} className="small-thumb circle" alt="" /></td>
                                        <td><strong>{item.name}</strong></td>
                                        <td>{item.specialty}</td>
                                    </>
                                )}
                                {type === 'story' && (
                                    <>
                                        <td><img src={item.image} className="small-thumb" alt="" /></td>
                                        <td><strong>{item.title}</strong></td>
                                        <td>{item.author}</td>
                                    </>
                                )}
                                {type === 'user' && (
                                    <>
                                        <td>{item.displayName || item.name || 'Sans nom'}</td>
                                        <td>{item.email}</td>
                                        <td>
                                            <span className={`badge-role ${item.role}`}>
                                                {item.role === 'admin' ? <ShieldAlert size={12} /> : (item.role === 'livreur' ? <Truck size={12} /> : <Users size={12} />)}
                                                {item.role}
                                            </span>
                                        </td>
                                    </>
                                )}
                                {type === 'order' && (
                                    <>
                                        <td>{item.customerName}</td>
                                        <td><strong>{item.total} $</strong></td>
                                        <td><span className={`status-badge ${item.status}`}>{item.status}</span></td>
                                        <td>{item.createdAt?.toDate().toLocaleDateString()}</td>
                                    </>
                                )}
                                <td className="actions-cell">
                                    <button className="icon-btn edit" title="Modifier" onClick={() => openModal(type, item)}><Edit2 size={16} /></button>
                                    <button className="icon-btn delete" title="Supprimer" onClick={() => handleDelete(collectionName, item.id)}><Trash2 size={16} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <div className="admin-workspace">
            <aside className="admin-sidebar-new">
                <div>
                    <div className="sidebar-brand serif">ELIKIA ADMIN</div>
                    <nav className="sidebar-nav">
                        <button className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>
                            <LayoutDashboard size={20} /> <span>Tableau de bord</span>
                        </button>
                        <button className={activeTab === 'artworks' ? 'active' : ''} onClick={() => setActiveTab('artworks')}>
                            <Palette size={20} /> <span>Galerie</span>
                        </button>
                        <button className={activeTab === 'artists' ? 'active' : ''} onClick={() => setActiveTab('artists')}>
                            <Users size={20} /> <span>Artistes</span>
                        </button>
                        <button className={activeTab === 'journal' ? 'active' : ''} onClick={() => setActiveTab('journal')}>
                            <BookOpen size={20} /> <span>Journal</span>
                        </button>
                        <button className={activeTab === 'users' ? 'active' : ''} onClick={() => setActiveTab('users')}>
                            <UserCheck size={20} /> <span>Communauté</span>
                        </button>
                        <button className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>
                            <ShoppingBag size={20} /> <span>Commandes</span>
                        </button>
                    </nav>
                </div>
                <div className="sidebar-footer">
                    <button onClick={handleSeedDatabase} disabled={isSeeding} className="seed-btn-full">
                        <Database size={16} /> <span>Réinitialiser les données demo</span>
                    </button>
                </div>
            </aside>

            <main className="admin-main-content">
                <header className="admin-top-bar">
                    <h2 className="serif">
                        {activeTab === 'dashboard' && 'Vue d\'ensemble'}
                        {activeTab === 'artworks' && 'Gestion de la Galerie'}
                        {activeTab === 'artists' && 'Profils des Artistes'}
                        {activeTab === 'journal' && 'Rédaction du Journal'}
                        {activeTab === 'users' && 'Administration des Utilisateurs'}
                        {activeTab === 'orders' && 'Commandes & Ventes'}
                    </h2>
                    <div className="user-indicator">Espace Sécurisé Admin</div>
                </header>

                <div className="admin-body">
                    {activeTab === 'dashboard' && renderDashboard()}
                    {activeTab === 'artworks' && renderTable(artworks, 'artwork', 'artworks')}
                    {activeTab === 'artists' && renderTable(artists, 'artist', 'artists')}
                    {activeTab === 'journal' && renderTable(stories, 'story', 'journal')}
                    {activeTab === 'users' && renderTable(users, 'user', 'users')}
                    {activeTab === 'orders' && renderTable(orders, 'order', 'orders')}
                </div>
            </main>

            {showModal && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal animate-zoom">
                        <header className="modal-header">
                            <h3>{editingItem ? 'Modifier' : 'Ajouter'} {modalType === 'artwork' ? 'une œuvre' : (modalType === 'artist' ? 'un artiste' : (modalType === 'story' ? 'un article' : 'un utilisateur'))}</h3>
                            <button onClick={closeModal} className="close-btn"><X size={24} /></button>
                        </header>
                        <form onSubmit={handleFormSubmit} className="admin-form">
                            {modalType === 'artwork' && (
                                <>
                                    <div className="form-group">
                                        <label>Titre de l'œuvre</label>
                                        <input name="title" placeholder="Ex: Rêves d'Afrique" value={formData.title || ''} onChange={handleInputChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Nom de l'artiste</label>
                                        <input name="artist" placeholder="Ex: Jean Mukendi" value={formData.artist || ''} onChange={handleInputChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Prix ($)</label>
                                        <input name="price" type="number" placeholder="Ex: 1200" value={formData.price || ''} onChange={handleInputChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>URL de l'image (Firebase Storage ou externe)</label>
                                        <input name="image" placeholder="https://..." value={formData.image || ''} onChange={handleInputChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Thème artistique</label>
                                        <select name="theme" value={formData.theme || ''} onChange={handleInputChange}>
                                            <option value="Resilience">Resilience</option>
                                            <option value="Liberté">Liberté</option>
                                            <option value="Identité">Identité</option>
                                            <option value="Exploration">Exploration</option>
                                        </select>
                                    </div>
                                </>
                            )}
                            {modalType === 'artist' && (
                                <>
                                    <div className="form-group">
                                        <label>Nom complet</label>
                                        <input name="name" placeholder="Ex: Sarah Mavungu" value={formData.name || ''} onChange={handleInputChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Rôle principal</label>
                                        <input name="role" placeholder="Ex: Peintre Contemporaine" value={formData.role || ''} onChange={handleInputChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Spécialités (séparées par des virgules)</label>
                                        <input name="specialty" placeholder="Ex: Abrait, Huile, Sculpture" value={formData.specialty || ''} onChange={handleInputChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Biographie</label>
                                        <textarea name="bio" placeholder="Racontez le parcours de l'artiste..." value={formData.bio || ''} onChange={handleInputChange} rows="4"></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label>URL du Portrait</label>
                                        <input name="portrait" placeholder="https://..." value={formData.portrait || ''} onChange={handleInputChange} required />
                                    </div>
                                </>
                            )}
                            {modalType === 'story' && (
                                <>
                                    <div className="form-group">
                                        <label>Titre de l'article</label>
                                        <input name="title" placeholder="Ex: L'art comme vecteur de paix" value={formData.title || ''} onChange={handleInputChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Auteur</label>
                                        <input name="author" placeholder="Ex: Rédaction Elikia" value={formData.author || ''} onChange={handleInputChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Résumé / Extrait</label>
                                        <input name="excerpt" placeholder="Bref aperçu de l'article..." value={formData.excerpt || ''} onChange={handleInputChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Contenu complet</label>
                                        <textarea name="content" placeholder="Rédigez votre histoire ici..." value={formData.content || ''} onChange={handleInputChange} rows="6"></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label>URL Image de couverture</label>
                                        <input name="image" placeholder="https://..." value={formData.image || ''} onChange={handleInputChange} required />
                                    </div>
                                </>
                            )}
                            {modalType === 'user' && (
                                <>
                                    <div className="form-group">
                                        <label>Nom d'affichage</label>
                                        <input name="displayName" value={formData.displayName || ''} onChange={handleInputChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Adresse Email</label>
                                        <input name="email" value={formData.email || ''} disabled={true} />
                                    </div>
                                    <div className="form-group">
                                        <label>Rôle utilisateur</label>
                                        <select name="role" value={formData.role || ''} onChange={handleInputChange}>
                                            <option value="client">Client (Par défaut)</option>
                                            <option value="livreur">Livreur (Accès livraisons)</option>
                                            <option value="admin">Administrateur (Accès complet)</option>
                                        </select>
                                    </div>
                                </>
                            )}
                        </form>
                        <footer className="form-footer">
                            <button onClick={closeModal} className="btn-luxury-back icon-btn">Annuler</button>
                            <button onClick={handleFormSubmit} className="btn-primary btn">
                                <Save size={18} /> <span>Enregistrer les modifications</span>
                            </button>
                        </footer>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin;
