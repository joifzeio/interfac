import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Lock } from 'lucide-react';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const success = login(email, password);
        if (success) {
            navigate('/admin');
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="min-h-screen bg-transparent flex items-center justify-center p-4">
            <div className="bg-white/5 border border-white/10 p-8 rounded-sm w-full max-w-md">
                <div className="flex justify-center mb-6 text-action-orange">
                    <Lock size={48} />
                </div>
                <h1 className="text-3xl font-black uppercase text-center text-white mb-8">Admin Access</h1>

                {error && (
                    <div className="bg-red-500/20 border border-red-500 text-red-100 p-3 mb-6 font-mono text-sm text-center uppercase">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-white/50 text-xs font-mono uppercase mb-2">Email ID</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-black/50 border border-white/20 p-4 text-white focus:outline-none focus:border-action-orange transition-colors"
                            placeholder="lenexus.co@gmail.com"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-white/50 text-xs font-mono uppercase mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-black/50 border border-white/20 p-4 text-white focus:outline-none focus:border-action-orange transition-colors"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-white text-black font-bold uppercase py-4 hover:bg-action-orange hover:text-white transition-colors"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
