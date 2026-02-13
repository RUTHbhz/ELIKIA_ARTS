import React from 'react';
import './Legal.css';

const Terms = () => {
    return (
        <div className="legal-page container animate-fade">
            <header className="legal-header">
                <h1 className="serif">Conditions Générales de Vente</h1>
                <p>Dernière mise à jour : 13 Février 2026</p>
            </header>

            <div className="legal-content glass">
                <section>
                    <h2>1. Objet</h2>
                    <p>Les présentes conditions régissent la vente d'œuvres d'art originales et de reproductions sur la plateforme ELIKIA ART.</p>
                </section>

                <section>
                    <h2>2. Prix et Paiement</h2>
                    <p>Les prix affichés sont en Dollars Américains ($). Le paiement peut être effectué par Carte Bancaire (Stripe) ou par Mobile Money (M-Pesa, Airtel Money). La commande est validée après confirmation du paiement.</p>
                </section>

                <section>
                    <h2>3. Livraison</h2>
                    <p>Les délais de livraison varient selon la destination et la nature de l'œuvre. Un numéro de suivi est fourni pour chaque commande.</p>
                </section>

                <section>
                    <h2>4. Retours et Remboursements</h2>
                    <p>Compte tenu de la nature unique des œuvres d'art, les retours ne sont acceptés que si l'œuvre arrive endommagée. Une preuve photographique doit être fournie dans les 48 heures suivant la réception.</p>
                </section>
            </div>
        </div>
    );
};

export default Terms;
