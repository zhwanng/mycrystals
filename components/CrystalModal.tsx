
import React from 'react';
import { Crystal, CrystalSearchResponse } from '../types';

interface CrystalModalProps {
  crystal: Crystal | null;
  aiData: CrystalSearchResponse | null;
  loading: boolean;
  onClose: () => void;
}

const CrystalModal: React.FC<CrystalModalProps> = ({ crystal, aiData, loading, onClose }) => {
  if (!crystal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-opacity">
      <div className="relative w-full max-w-4xl glass rounded-3xl overflow-hidden max-h-[90vh] flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="w-full md:w-2/5 h-64 md:h-auto overflow-hidden">
          <img 
            src={crystal.imageUrl} 
            alt={crystal.name} 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full md:w-3/5 p-8 overflow-y-auto bg-neutral-900/50">
          <h2 className="font-serif text-4xl font-bold text-white mb-4">{crystal.name}</h2>
          
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase text-gray-500 font-bold tracking-widest">Hardness</span>
              <span className="text-white font-medium">{crystal.hardness || '7'}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase text-gray-500 font-bold tracking-widest">Chakra</span>
              <span className="text-white font-medium">{crystal.chakra?.join(', ') || 'N/A'}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase text-gray-500 font-bold tracking-widest">Element</span>
              <span className="text-white font-medium">{crystal.element?.join(', ') || 'Earth'}</span>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-purple-400 font-bold text-sm uppercase tracking-wider mb-2">Deep Insights (Powered by AI)</h4>
              {loading ? (
                <div className="flex items-center space-x-3 text-gray-400 animate-pulse">
                  <div className="w-4 h-4 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
                  <span>Consulting the cosmic database...</span>
                </div>
              ) : aiData ? (
                <div className="prose prose-invert prose-sm max-w-none text-gray-300 leading-relaxed whitespace-pre-line">
                  {aiData.content}
                  
                  {aiData.sources.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-white/10">
                      <h5 className="text-[10px] uppercase text-gray-500 font-bold tracking-widest mb-2">Sources Found</h5>
                      <div className="flex flex-col gap-1">
                        {aiData.sources.slice(0, 3).map((source, i) => (
                          <a 
                            key={i} 
                            href={source.uri} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs text-purple-400 hover:underline flex items-center truncate"
                          >
                            <svg className="w-3 h-3 mr-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            {source.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-400 italic">Select a crystal to view its spiritual secrets.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrystalModal;
