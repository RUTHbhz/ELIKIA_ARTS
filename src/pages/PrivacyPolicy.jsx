import React from 'react';
import './Legal.css';

const PrivacyPolicy = () => {
    return (
        <div className="legal-page container animate-fade">
            <header className="legal-header">
                <h1 className="serif">Politique de Confidentialité</h1>
                <p>Dernière mise à jour : 13 Février 2026</p>
            </header>

            <div className="legal-content glass">
                <section>
                    <h2>1. Collecte des Données</h2>
                    <p>Chez ELIKIA ART, nous collectons uniquement les informations nécessaires au traitement de vos commandes et à l'amélioration de votre expérience : nom, adresse email, adresse de livraison et numéro de téléphone.</p>
                </section>

                <section>
                    <h2>2. Utilisation des Informations</h2>
                    <p>Vos données sont utilisées pour :</p>
                    <ul>
                        <li>Gérer vos commandes et la livraison.</li>
                        <li>Vous envoyer des notifications de suivi de commande.</li>
                        <li>Assurer la sécurité de vos transactions via Stripe.</li>
                    </ul>
                </section>

                <section>
                    <h2>3. Protection et Sécurité</h2>
                    <p>Nous utilisons Firebase (Google Cloud) pour stocker vos données de manière sécurisée. Vos informations de paiement (carte bancaire) sont traitées directement par Stripe et ne sont jamais stockées sur nos serveurs.</p>
                </section>

                <section>
                    <h2>4. Vos Droits</h2>
                    <p>Conformément aux lois sur la protection des données, vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles. Contactez notre support pour toute demande.</p>
                </section>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
