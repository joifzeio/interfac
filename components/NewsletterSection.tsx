import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '../lib/supabase';

const CITIES = ['PARIS', 'RENNES', 'NANCY', 'NICE', 'LYON', 'AUTRE'];

const NewsletterSection: React.FC = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !city) {
      toast.error("Choisis ta ville et ton email !");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.from('subscribers').insert({
        email,
        city
      });

      if (error) throw error;

      setIsSuccess(true);
      setEmail('');
      setCity('');
    } catch (error) {
      console.error('Subscription error:', error);
      toast.error("Une erreur est survenue.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full bg-black text-white py-24 px-4 md:px-12 border-t border-white/10">
      <div className="max-w-[1000px] mx-auto text-center">
        <h2 className="text-5xl md:text-8xl font-black uppercase leading-none tracking-tighter mb-8">
          {t('newsletter.title')}
        </h2>
        <p className="font-bold text-lg md:text-2xl text-white mb-16 max-w-3xl mx-auto leading-tight">
          {t('newsletter.desc')}
        </p>

        <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row gap-4 w-full max-w-2xl mx-auto items-stretch">
          <div className="flex-1 flex gap-4">
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              disabled={isLoading || isSuccess}
              className="bg-black border border-white text-white px-4 py-3 font-mono text-sm focus:outline-none focus:border-[#FF4500] uppercase appearance-none min-w-[140px] h-[46px]"
              required
            >
              <option value="" disabled>TA VILLE...</option>
              {CITIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('newsletter.placeholder')}
              disabled={isLoading || isSuccess}
              className="flex-1 w-full bg-black border-b border-white px-4 py-3 font-mono text-sm focus:outline-none focus:border-gray-500 uppercase placeholder-white/70 disabled:opacity-50 disabled:cursor-not-allowed h-[46px]"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || isSuccess}
            className={`px-8 py-3 font-mono text-sm uppercase transition-colors flex items-center justify-center min-w-[240px] h-[46px]
              ${isSuccess
                ? 'bg-green-600 text-white cursor-default hover:bg-green-600'
                : 'bg-[#FF4500] text-white hover:bg-[#FF4500]/80'
              } disabled:opacity-80`}
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : isSuccess ? (
              "INSCRIPTION VALIDÉE ✅"
            ) : (
              t('newsletter.btn')
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsletterSection;