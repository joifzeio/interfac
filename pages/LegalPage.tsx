import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const LegalPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    // Map slug to title
    const getTitle = () => {
        switch (slug) {
            case 'mentions': return 'Mentions Légales';
            case 'cgv': return 'Conditions Générales de Vente';
            case 'privacy': return 'Politique de Confidentialité';
            default: return 'Legal';
        }
    };

    return (
        <div className="bg-[#050505] min-h-screen text-gray-400 font-sans selection:bg-[#FF4500] selection:text-white">
            <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

            <main className="pt-32 pb-20 px-4 md:px-12">
                <div className="max-w-2xl mx-auto">
                    {/* Header */}
                    <div className="mb-12 border-b border-gray-800 pb-8">
                        <Link to="/" className="text-xs font-mono uppercase text-[#FF4500] hover:text-white transition-colors mb-4 block">
                            ← Retour à l'accueil
                        </Link>
                        <h1 className="text-3xl md:text-5xl font-display font-black text-white uppercase tracking-tight">
                            {getTitle()}
                        </h1>
                    </div>

                    {/* Content - Placeholder for Stripe Compliance */}
                    <div className="space-y-8 text-sm md:text-base leading-relaxed">
                        <section>
                            <h2 className="text-white font-bold uppercase mb-2">1. Introduction</h2>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-white font-bold uppercase mb-2">2. Données Personnelles</h2>
                            <p>
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-white font-bold uppercase mb-2">3. Propriété Intellectuelle</h2>
                            <p>
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                                totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-white font-bold uppercase mb-2">4. Responsabilité</h2>
                            <p>
                                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
                                eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.
                            </p>
                        </section>

                        <div className="p-4 bg-white/5 border border-white/10 mt-8 font-mono text-xs">
                            <p className="mb-2 text-white">INTERFAC</p>
                            <p>Société par Actions Simplifiée (SAS)</p>
                            <p>Capital social : 1000€</p>
                            <p>RCS : Paris B 123 456 789</p>
                            <p>Siège social : 123 Avenue de la Techno, 75011 Paris</p>
                            <p>Email : contact@soireeinterfac.fr</p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default LegalPage;
