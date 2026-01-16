import React from 'react';
import LegalLayout from '../components/LegalLayout';
import Footer from '../components/Footer';

const Confidentialite: React.FC = () => {
    return (
        <>
            <LegalLayout>
                <h1 className="text-3xl md:text-5xl font-display font-black text-white uppercase mb-12 tracking-tight">
                    POLITIQUE DE CONFIDENTIALITÉ
                </h1>

                <div className="space-y-12 text-base leading-relaxed">
                    <section>
                        <h2 className="text-white font-bold uppercase mb-4 text-xl tracking-wide">1. COLLECTE DES DONNÉES</h2>
                        <p>
                            Nous collectons votre email, votre ville et vos données de commande pour : la gestion de la billetterie (envoi des PDF), la sécurité de l'événement, et l'information sur les prochaines éditions.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-white font-bold uppercase mb-4 text-xl tracking-wide">2. PARTAGE DES DONNÉES</h2>
                        <p>
                            Vos données sont transmises à nos prestataires techniques : Pretix (Billetterie), Stripe (Paiement) et Google (Stockage sécurisé). Elles ne sont jamais revendues à des tiers publicitaires.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-white font-bold uppercase mb-4 text-xl tracking-wide">3. VOS DROITS</h2>
                        <p>
                            Vous disposez d'un droit d'accès, de modification et de suppression de vos données. Pour l'exercer, contactez : <a href="mailto:contact@soireeinterfac.fr" className="text-[#FF4500] hover:underline">contact@soireeinterfac.fr</a>.
                        </p>
                    </section>
                </div>
            </LegalLayout>
            <Footer />
        </>
    );
};

export default Confidentialite;
