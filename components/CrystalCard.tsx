
import React from 'react';
import { Crystal } from '../types';

interface CrystalCardProps {
  crystal: Crystal;
  onClick: (crystal: Crystal) => void;
}

const CrystalCard: React.FC<CrystalCardProps> = ({ crystal, onClick }) => {
  return (
    <div 
      onClick={() => onClick(crystal)}
      className="group relative overflow-hidden rounded-2xl glass cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:border-purple-500/50"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img 
          src={crystal.imageUrl} 
          alt={crystal.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3 className="font-serif text-2xl font-bold text-white mb-1">{crystal.name}</h3>
        <div className="flex flex-wrap gap-2 mb-2">
          {crystal.healingProperties.slice(0, 2).map((prop, idx) => (
            <span key={idx} className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
              {prop}
            </span>
          ))}
        </div>
        <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
          {crystal.description}
        </p>
      </div>
    </div>
  );
};

export default CrystalCard;
