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

    const handleSeedDatabase = async () => {
        if (window.confirm('Initialize with demo data?')) {
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
                artwork: { title: '', artist: '', price: '', image: '/assets/images/placeholder.jpg', theme: 'Resilience' },
                artist: { name: '', role: '', specialty: '', bio: '', portrait: '/assets/images/placeholder.jpg' },
                story: { title: '', author: '', date: new Date().toLocaleDateString(), excerpt: '', content: '', image: '/assets/images/placeholder.jpg' },
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
                await updateDoc(doc(db, collectionName, editingItem.id), formData);
            } else {
                if (modalType === 'user' && formData.uid) {
                    await setDoc(doc(db, 'users', formData.uid), formData);
                } else {
                    await addDoc(collection(db, collectionName), formData);
                }
            }
            closeModal();
        } catch (error) {
            alert("Erreur : " + error.message);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Render Stats
    const renderDashboard = () => (
        <div className="admin-dashboard-stats">
            <div className="stat-card glass">
                <Palette size={24} />
                <div className="stat-content">
                    <span className="stat-value">{artworks.length}</span>
                    <span className="stat-label">Œuvres</span>
                </div>
            </div>
            <div className="stat-card glass">
                <Users size={24} />
                <div className="stat-content">
                    <span className="stat-value">{artists.length}</span>
                    <span className="stat-label">Artistes</span>
                </div>
            </div>
            <div className="stat-card glass">
                <BookOpen size={24} />
                <div className="stat-content">
                    <span className="stat-value">{stories.length}</span>
                    <span className="stat-label">Articles</span>
                </div>
            </div>
            <div className="stat-card glass">
                <UserCheck size={24} />
                <div className="stat-content">
                    <span className="stat-value">{users.length}</span>
                    <span className="stat-label">Utilisateurs</span>
                </div>
            </div>
        </div>
    );

    // Render Tables
    const renderTable = (data, type, collectionName) => (
        <div className="admin-content-section animate-fade">
            <header className="section-header-admin">
                <h3>{type === 'artwork' ? 'Catalogue Œuvres' : (type === 'artist' ? 'Gestion Artistes' : (type === 'story' ? 'Journal de Bord' : 'Communauté'))}</h3>
                <button className="btn btn-primary add-btn" onClick={() => openModal(type)}>
                    <Plus size={16} /> Ajouter
                </button>
            </header>
            <div className="table-responsive">
                <table className="admin-table">
                    <thead>
                        <tr>
                            {type === 'artwork' && <><th>Image</th><th>Titre</th><th>Artiste</th><th>Prix</th></>}
                            {type === 'artist' && <><th>Photo</th><th>Nom</th><th>Spécialité</th></>}
                            {type === 'story' && <><th>Titre</th><th>Auteur</th><th>Date</th></>}
                            {type === 'user' && <><th>Nom</th><th>Email</th><th>Rôle</th></>}
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                {type === 'artwork' && (
                                    <>
                                        <td><img src={item.image} className="small-thumb" alt="" /></td>
                                        <td>{item.title}</td>
                                        <td>{item.artist}</td>
                                        <td>{item.price} $</td>
                                    </>
                                )}
                                {type === 'artist' && (
                                    <>
                                        <td><img src={item.portrait} className="small-thumb circle" alt="" /></td>
                                        <td>{item.name}</td>
                                        <td>{item.specialty}</td>
                                    </>
                                )}
                                {type === 'story' && (
                                    <>
                                        <td>{item.title}</td>
                                        <td>{item.author}</td>
                                        <td>{item.date}</td>
                                    </>
                                )}
                                {type === 'user' && (
                                    <>
                                        <td>{item.displayName || item.name || 'N/A'}</td>
                                        <td>{item.email}</td>
                                        <td>
                                            <span className={`badge-role ${item.role}`}>
                                                {item.role === 'admin' ? <ShieldAlert size={12} /> : (item.role === 'livreur' ? <Truck size={12} /> : <Users size={12} />)}
                                                {item.role}
                                            </span>
                                        </td>
                                    </>
                                )}
                                <td className="actions-cell">
                                    <button className="icon-btn edit" onClick={() => openModal(type, item)}><Edit2 size={14} /></button>
                                    <button onClick={() => handleDelete(collectionName, item.id)} className="icon-btn delete"><Trash2 size={14} /></button>
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
            <aside className="admin-sidebar-new glass">
                <div className="sidebar-brand serif">Elikia Admin</div>
                <nav className="sidebar-nav">
                    <button className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>
                        <LayoutDashboard size={20} /> Dashboard
                    </button>
                    <button className={activeTab === 'artworks' ? 'active' : ''} onClick={() => setActiveTab('artworks')}>
                        <Palette size={20} /> Tableaux
                    </button>
                    <button className={activeTab === 'artists' ? 'active' : ''} onClick={() => setActiveTab('artists')}>
                        <Users size={20} /> Artistes
                    </button>
                    <button className={activeTab === 'journal' ? 'active' : ''} onClick={() => setActiveTab('journal')}>
                        <BookOpen size={20} /> Journal
                    </button>
                    <button className={activeTab === 'users' ? 'active' : ''} onClick={() => setActiveTab('users')}>
                        <UserCheck size={20} /> Utilisateurs
                    </button>
                    <button className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>
                        <ShoppingBag size={20} /> Commandes
                    </button>
                </nav>
                <div className="sidebar-footer">
                    <button onClick={handleSeedDatabase} disabled={isSeeding} className="seed-btn-full">
                        <Database size={16} /> Reset Demo Data
                    </button>
                </div>
            </aside>

            <main className="admin-main-content">
                <header className="admin-top-bar glass">
                    <h2 className="serif">
                        {activeTab === 'dashboard' && 'Vue d\'ensemble'}
                        {activeTab === 'artworks' && 'Gestion Catalogue'}
                        {activeTab === 'artists' && 'Fiches Artistes'}
                        {activeTab === 'journal' && 'Rédaction Journal'}
                        {activeTab === 'users' && 'Administration Communauté'}
                        {activeTab === 'orders' && 'Suivi des Ventes'}
                    </h2>
                    <div className="user-indicator">Mode Administrateur</div>
                </header>

                <div className="admin-body">
                    {activeTab === 'dashboard' && renderDashboard()}
                    {activeTab === 'artworks' && renderTable(artworks, 'artwork', 'artworks')}
                    {activeTab === 'artists' && renderTable(artists, 'artist', 'artists')}
                    {activeTab === 'journal' && renderTable(stories, 'story', 'journal')}
                    {activeTab === 'users' && renderTable(users, 'user', 'users')}
                    {activeTab === 'orders' && (
                        <div className="placeholder-admin glass animate-fade">
                            <ShoppingBag size={48} opacity={0.2} />
                            <p>Historique des commandes à venir...</p>
                        </div>
                    )}
                </div>
            </main>

            {/* Modal for CRUD */}
            {showModal && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal glass animate-zoom">
                        <header className="modal-header">
                            <h3>{editingItem ? 'Modifier' : 'Nouveau'} : {modalType}</h3>
                            <button onClick={closeModal} className="close-btn"><X size={20} /></button>
                        </header>
                        <form onSubmit={handleFormSubmit} className="admin-form">
                            {modalType === 'artwork' && (
                                <>
                                    <input name="title" placeholder="Titre de l'œuvre" value={formData.title || ''} onChange={handleInputChange} required />
                                    <input name="artist" placeholder="Artiste" value={formData.artist || ''} onChange={handleInputChange} required />
                                    <input name="price" type="number" placeholder="Prix ($)" value={formData.price || ''} onChange={handleInputChange} required />
                                    <input name="image" placeholder="Lien image" value={formData.image || ''} onChange={handleInputChange} required />
                                    <select name="theme" value={formData.theme || ''} onChange={handleInputChange}>
                                        <option value="Resilience">Resilience</option>
                                        <option value="Liberté">Liberté</option>
                                        <option value="Identité">Identité</option>
                                        <option value="Exploration">Exploration</option>
                                    </select>
                                </>
                            )}
                            {modalType === 'artist' && (
                                <>
                                    <input name="name" placeholder="Nom complet" value={formData.name || ''} onChange={handleInputChange} required />
                                    <input name="role" placeholder="Rôle (ex: Peintre)" value={formData.role || ''} onChange={handleInputChange} required />
                                    <input name="specialty" placeholder="Spécialité" value={formData.specialty || ''} onChange={handleInputChange} required />
                                    <textarea name="bio" placeholder="Biographie" value={formData.bio || ''} onChange={handleInputChange} rows="4"></textarea>
                                    <input name="portrait" placeholder="Lien portrait" value={formData.portrait || ''} onChange={handleInputChange} required />
                                </>
                            )}
                            {modalType === 'story' && (
                                <>
                                    <input name="title" placeholder="Titre de l'article" value={formData.title || ''} onChange={handleInputChange} required />
                                    <input name="author" placeholder="Auteur" value={formData.author || ''} onChange={handleInputChange} required />
                                    <input name="excerpt" placeholder="Extrait court" value={formData.excerpt || ''} onChange={handleInputChange} required />
                                    <textarea name="content" placeholder="Contenu complet" value={formData.content || ''} onChange={handleInputChange} rows="6"></textarea>
                                    <input name="image" placeholder="Image de couverture" value={formData.image || ''} onChange={handleInputChange} required />
                                </>
                            )}
                            {modalType === 'user' && (
                                <>
                                    <input name="displayName" placeholder="Nom complet" value={formData.displayName || ''} onChange={handleInputChange} required />
                                    <input name="email" placeholder="Email" value={formData.email || ''} onChange={handleInputChange} required disabled={!!editingItem} />
                                    <select name="role" value={formData.role || ''} onChange={handleInputChange}>
                                        <option value="client">Client</option>
                                        <option value="livreur">Livreur</option>
                                        <option value="admin">Administrateur</option>
                                    </select>
                                </>
                            )}
                            <footer className="form-footer">
                                <button type="submit" className="btn btn-primary"><Save size={16} /> Enregistrer</button>
                            </footer>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin;
