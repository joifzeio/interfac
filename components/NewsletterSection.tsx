import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const CITIES = [
  'PARIS', 'TOURS', 'RENNES', 'LILLE', 'DIJON', 'ANGERS', 'NANTES',
  'ROUEN', 'LIMOGES', 'BESANCON', 'POITIERS', 'ORLEANS', 'CAEN',
  'LYON', 'MARSEILLE', 'TOULOUSE', 'MONTPELLIER', 'BORDEAUX', 'CLERMONT-FERRAND'
];

const NewsletterSection: React.FC = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle'); // 'idle', 'loading', 'success'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !selectedCity) {
      toast.error(t('newsletter.error_missing'));
      return;
    }

    setStatus('loading');

    try {
      const formData = new FormData();
      formData.append('entry.1045781291', email); // Email
      formData.append('entry.1065046570', selectedCity); // City
      formData.append('entry.1166974658', ''); // Phone (empty)

      await fetch(
        'https://docs.google.com/forms/d/e/1FAIpQLScSuAjZzJDktRBuEXFAEjvlNmPsHdYmyed-Ihn56wstnxcCDQ/formResponse',
        {
          method: 'POST',
          body: formData,
          mode: 'no-cors'
        }
      );

      setStatus('success');
      toast.success(t('newsletter.success'));
      setEmail('');
      setSelectedCity('');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(t('newsletter.error'));
      setStatus('idle');
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

        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 w-full max-w-2xl mx-auto items-stretch">
          <div className="flex-1 flex gap-4">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              disabled={status === 'loading' || status === 'success'}
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
              disabled={status === 'loading' || status === 'success'}
              className="flex-1 w-full bg-black border-b border-white px-4 py-3 font-mono text-sm focus:outline-none focus:border-gray-500 uppercase placeholder-white/70 disabled:opacity-50 disabled:cursor-not-allowed h-[46px]"
              required
            />
          </div>
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className={`px-8 py-3 font-mono text-sm uppercase transition-colors flex items-center justify-center min-w-[240px] h-[46px]
              ${status === 'success'
                ? 'bg-green-600 text-white cursor-default hover:bg-green-600'
                : 'bg-[#FF4500] text-white hover:bg-[#FF4500]/80'
              } disabled:opacity-80`}
          >
            {status === 'loading' ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : status === 'success' ? (
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