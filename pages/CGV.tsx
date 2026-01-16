import React from 'react';
import LegalLayout from '../components/LegalLayout';
import Footer from '../components/Footer';

const CGV: React.FC = () => {
    return (
        <>
            <LegalLayout>
                <h1 className="text-3xl md:text-5xl font-display font-black text-white uppercase mb-12 tracking-tight">
                    CONDITIONS GÉNÉRALES DE VENTE
                </h1>

                <div className="space-y-12 text-base leading-relaxed">
                    <section>
                        <h2 className="text-white font-bold uppercase mb-4 text-xl tracking-wide">1. OBJET</h2>
                        <p>
                            Les présentes CGV régissent la vente de billetterie pour les événements organisés par Soirée Interfac.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-white font-bold uppercase mb-4 text-xl tracking-wide">2. PRIX ET PAIEMENT</h2>
                        <p>
                            Les prix sont indiqués en euros TTC. Le paiement est exigible immédiatement à la commande via carte bancaire (Stripe).
                        </p>
                    </section>

                    <section>
                        <h2 className="text-white font-bold uppercase mb-4 text-xl tracking-wide">3. ABSENCE DE DROIT DE RÉTRACTATION</h2>
                        <p>
                            Conformément à l'article L221-28 du Code de la consommation, la vente de billets de spectacles/événements datés n'est pas soumise au droit de rétractation. <strong className="text-white">Les billets sont non échangeables et non remboursables</strong>, sauf en cas d'annulation de l'événement par l'organisateur.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-white font-bold uppercase mb-4 text-xl tracking-wide">4. ACCÈS ET SÉCURITÉ</h2>
                        <p>
                            L'organisateur se réserve le droit de refuser l'accès à toute personne en état d'ébriété manifeste ou au comportement agressif, sans remboursement possible. Une pièce d'identité physique peut être exigée à l'entrée.
                        </p>
                    </section>
                </div>
            </LegalLayout>
            <Footer />
        </>
    );
};

export default CGV;
