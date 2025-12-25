
import React, { useState, useEffect, useCallback } from 'react';
import { Crystal, CrystalSearchResponse } from './types';
import { INITIAL_CRYSTALS } from './constants';
import CrystalCard from './components/CrystalCard';
import CrystalModal from './components/CrystalModal';
import { searchCrystalInfo, crawlSpecificSite } from './services/geminiService';
import { useI18n } from './i18n';
import { useTheme } from './theme';

const App: React.FC = () => {
  const { locale, setLocale, t } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const [crystals, setCrystals] = useState<Crystal[]>(INITIAL_CRYSTALS);
  const [selectedCrystal, setSelectedCrystal] = useState<Crystal | null>(null);
  const [aiData, setAiData] = useState<CrystalSearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [crawlingResult, setCrawlingResult] = useState<CrystalSearchResponse | null>(null);
  const [isCrawling, setIsCrawling] = useState(false);

  const toggleLocale = useCallback(() => {
    setLocale(locale === 'en' ? 'zh-CN' : 'en');
  }, [locale, setLocale]);

  const handleCrystalClick = async (crystal: Crystal) => {
    setSelectedCrystal(crystal);
    setLoading(true);
    try {
      const data = await searchCrystalInfo(crystal.name, locale);
      setAiData(data);
    } catch (err) {
      console.error(err);
      setAiData({ content: t('errors.fetchFailed'), sources: [] });
    } finally {
      setLoading(false);
    }
  };

  const handleSyncSite = async () => {
    setIsCrawling(true);
    try {
      const data = await crawlSpecificSite(locale);
      setCrawlingResult(data);
    } catch (err) {
      window.alert(t('errors.syncFailed'));
    } finally {
      setIsCrawling(false);
    }
  };

  const filteredCrystals = crystals.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.healingProperties.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[var(--app-bg)] text-[var(--app-fg)]">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 w-full glass border-b border-[color:var(--glass-border)] px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 crystal-gradient rounded-lg rotate-45 flex items-center justify-center">
             <div className="w-3 h-3 bg-white/30 rounded-full blur-[1px]" />
          </div>
          <h1 className="font-serif text-2xl font-bold tracking-tight">Crystalyze<span className="text-purple-500">Explorer</span></h1>
        </div>

        <div className="flex-1 max-w-xl w-full">
          <div className="relative">
            <input 
              type="text"
              placeholder={t('search.placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[color:var(--input-bg)] border border-[color:var(--input-border)] rounded-full py-2.5 pl-10 pr-4 focus:outline-none focus:border-purple-500 transition-all placeholder:text-[color:var(--text-subtle)]"
            />
            <svg className="absolute left-3.5 top-3 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={toggleTheme}
            className="flex items-center px-4 py-2 glass hover:bg-white/10 rounded-full transition-all text-sm font-bold"
          >
            {theme === 'dark' ? t('nav.themeLight') : t('nav.themeDark')}
          </button>
          <button
            onClick={toggleLocale}
            className="flex items-center px-4 py-2 glass hover:bg-white/10 rounded-full transition-all text-sm font-bold"
          >
            {locale === 'en' ? t('nav.toggleToZh') : t('nav.toggleToEn')}
          </button>
          <button 
            onClick={handleSyncSite}
            disabled={isCrawling}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-900/50 rounded-full transition-all text-sm font-bold"
          >
            {isCrawling ? (
              <>
                <div className="w-4 h-4 border-2 border-white/50 border-t-transparent animate-spin rounded-full" />
                <span>{t('nav.syncing')}</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>{t('nav.syncSource')}</span>
              </>
            )}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative py-24 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full" />
        </div>
        
        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          <h2 className="font-serif text-5xl md:text-7xl font-bold tracking-tight leading-tight">
            {t('hero.titleLine1')} <br />
            <span className="italic crystal-text-gradient">{t('hero.titleLine2')}</span>
          </h2>
          <p className="max-w-2xl mx-auto text-[color:var(--text-muted)] text-lg md:text-xl leading-relaxed">
            {t('hero.subtitle')}
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pb-24">
        {/* Sync Result Banner */}
        {crawlingResult && (
          <div className="mb-12 glass border-purple-500/30 p-8 rounded-3xl animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-2xl font-bold">{t('banner.latestDiscovery')}</h3>
              <button onClick={() => setCrawlingResult(null)} className="text-gray-500 hover:text-[var(--app-fg)]">{t('banner.close')}</button>
            </div>
            <div className="prose prose-invert prose-sm max-w-none text-[color:var(--text-muted)] whitespace-pre-line">
              {crawlingResult.content}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-bold flex items-center">
            <span className="w-2 h-2 bg-purple-500 rounded-full mr-3" />
            {t('section.featuredCrystals')}
          </h3>
          <p className="text-sm text-gray-500">{t('section.showingResults', { count: filteredCrystals.length })}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredCrystals.map(crystal => (
            <CrystalCard 
              key={crystal.id} 
              crystal={crystal} 
              onClick={handleCrystalClick} 
            />
          ))}
        </div>

        {filteredCrystals.length === 0 && (
          <div className="text-center py-24 glass rounded-3xl border-dashed border-[color:var(--glass-border)]">
            <div className="mb-4 inline-flex items-center justify-center w-16 h-16 bg-[color:var(--glass-bg)] rounded-full">
              <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="text-xl font-bold text-[color:var(--text-muted)]">{t('empty.noResults')}</h4>
            <button onClick={() => setSearchQuery('')} className="mt-4 text-purple-400 hover:underline">{t('empty.clearSearch')}</button>
          </div>
        )}
      </main>

      <footer className="border-t border-[color:var(--glass-border)] py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 crystal-gradient rounded-md rotate-45" />
            <span className="font-serif font-bold text-lg">Crystalyze</span>
          </div>
          <div className="text-gray-500 text-sm">
            {t('footer.dataFrom')} <a href="https://www.crystalyzeguide.com" className="hover:text-purple-400 underline">Crystalyze Guide</a> {t('footer.dataTail')}
          </div>
          <div className="flex space-x-6 text-gray-400">
            <a href="#" className="hover:text-[var(--app-fg)] transition-colors">{t('footer.explore')}</a>
            <a href="#" className="hover:text-[var(--app-fg)] transition-colors">{t('footer.healing')}</a>
            <a href="#" className="hover:text-[var(--app-fg)] transition-colors">{t('footer.about')}</a>
          </div>
        </div>
      </footer>

      <CrystalModal 
        crystal={selectedCrystal} 
        aiData={aiData}
        loading={loading}
        onClose={() => {
          setSelectedCrystal(null);
          setAiData(null);
        }}
      />
    </div>
  );
};

export default App;
