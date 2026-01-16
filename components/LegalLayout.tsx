import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from './Navbar';

interface LegalLayoutProps {
    children: React.ReactNode;
}

const LegalLayout: React.FC<LegalLayoutProps> = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <div className="bg-[#050505] min-h-screen text-gray-400 font-sans selection:bg-[#FF4500] selection:text-white">
            <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

            <main className="pt-32 pb-20 px-4 md:px-12">
                <div className="max-w-3xl mx-auto">
                    {/* Back Button */}
                    <div className="mb-12">
                        <Link to="/" className="inline-flex items-center gap-2 text-sm font-mono uppercase text-gray-500 hover:text-[#FF4500] transition-colors group">
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            Back to Home
                        </Link>
                    </div>

                    {/* Content */}
                    <div className="space-y-8">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LegalLayout;
