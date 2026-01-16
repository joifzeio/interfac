import React from 'react';
import LegalLayout from '../components/LegalLayout';
import Footer from '../components/Footer';

const MentionsLegales: React.FC = () => {
    return (
        <>
            <LegalLayout>
                <h1 className="text-3xl md:text-5xl font-display font-black text-white uppercase mb-12 tracking-tight">
                    MENTIONS LÉGALES
                </h1>

                <div className="space-y-12 text-base leading-relaxed">
                    <section>
                        <h2 className="text-white font-bold uppercase mb-4 text-xl tracking-wide">1. ÉDITEUR DU SITE</h2>
                        <div className="space-y-2">
                            <p>Le site soireeinterfac.fr est édité par : [NOM DE L'ASSOCIATION OU DU CLIENT]</p>
                            <p>Statut : [Association Loi 1901 / Société]</p>
                            <p>SIRET : [NUMÉRO SIRET]</p>
                            <p>Siège social : [ADRESSE COMPLÈTE]</p>
                            <p>Contact : <a href="mailto:contact@soireeinterfac.fr" className="text-[#FF4500] hover:underline">contact@soireeinterfac.fr</a></p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-white font-bold uppercase mb-4 text-xl tracking-wide">2. HÉBERGEMENT</h2>
                        <div className="space-y-2">
                            <p>Le site est hébergé par : Elestio / Hetzner Cloud</p>
                            <p>Localisation du serveur : Allemagne (Falkenstein)</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-white font-bold uppercase mb-4 text-xl tracking-wide">3. PROPRIÉTÉ INTELLECTUELLE</h2>
                        <p>
                            L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Toute reproduction est interdite sans autorisation.
                        </p>
                    </section>
                </div>
            </LegalLayout>
            <Footer />
        </>
    );
};

export default MentionsLegales;
