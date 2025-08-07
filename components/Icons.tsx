
import React from 'react';
import { Resource, ProteinLootType } from '../types';

interface IconProps {
  className?: string;
}

// Simple, line-art style icons for better performance.

export const StardustIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345h5.356a.563.563 0 01.329.958l-4.34 3.14a.563.563 0 00-.182.635l1.618 4.83a.563.563 0 01-.844.622l-4.42-3.232a.563.563 0 00-.664 0l-4.42 3.232a.563.563 0 01-.844-.622l1.618-4.83a.563.563 0 00-.182-.635l-4.34-3.14a.563.563 0 01.329-.958h5.356a.563.563 0 00.475-.345l2.125-5.111z" />
  </svg>
);

export const HydrogenIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12m-8 0a8 8 0 1016 0 8 8 0 10-16 0" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12m-1 0a1 1 0 102 0 1 1 0 10-2 0" />
  </svg>
);

export const CarbonIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9.75L3 7.5" />
  </svg>
);

export const IronIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5v9a1.5 1.5 0 01-1.5 1.5H4.5A1.5 1.5 0 013 16.5v-9A1.5 1.5 0 014.5 6h15a1.5 1.5 0 011.5 1.5z" />
     <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5L12 3 3 7.5" />
     <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v15" />
  </svg>
);

export const RockIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
     <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3.75-3 3.75 3-2.25 4.5 3 3-3.75 3.75-3.75-3 2.25-4.5-3-3z" />
     <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 12l-3.75 3.75" />
  </svg>
);

export const WaterIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.32 0L12 2.69z" />
    </svg>
);

export const PrimordialSoupIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 21h8a2 2 0 002-2V9a2 2 0 00-2-2H8a2 2 0 00-2 2v10a2 2 0 002 2z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 7V5a2 2 0 012-2h0a2 2 0 012 2v2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h.01M12 15h.01M15 12h.01" />
  </svg>
);

export const AminoAcidIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 10a2 2 0 100-4 2 2 0 000 4z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14a2 2 0 100-4 2 2 0 000 4z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 10a2 2 0 100-4 2 2 0 000 4z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 8.5l1-1m2.5 4.5l1-1" />
  </svg>
);

export const NucleotideIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15M6.75 7.5h10.5M6.75 16.5h10.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 7.5s1.5 3 3 3 3-3 3-3M9 16.5s1.5-3 3-3 3 3 3 3" />
  </svg>
);

export const ATPIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>
);

export const XMarkIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const CogIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m18 0h-1.5m-15.036-6.464l-1.06-1.06M21.75 21.75l-1.06-1.06m-18 0l1.06-1.06M3.27 3.27l1.06 1.06m5.25 11.25a2.25 2.25 0 01-4.5 0m4.5 0a2.25 2.25 0 00-4.5 0m4.5 0h7.5a2.25 2.25 0 000-4.5h-7.5a2.25 2.25 0 000 4.5z" />
  </svg>
);


export const SpeedIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
);
export const EfficiencyIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
    </svg>
);
export const ResilienceIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" />
    </svg>
);

export const CheckCircleIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const XCircleIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const InfinityIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21M10.5 10.5H3M10.5 10.5C10.5 12.4853 8.98528 14 7.00001 14C5.01472 14 3.5 12.4853 3.5 10.5C3.5 8.51472 5.01472 7 7.00001 7C8.98528 7 10.5 8.51472 10.5 10.5ZM13.5 10.5C13.5 12.4853 15.0147 14 17 14C18.9853 14 20.5 12.4853 20.5 10.5C20.5 8.51472 18.9853 7 17 7C15.0147 7 13.5 8.51472 13.5 10.5Z" />
    </svg>
);

export const ChevronLeftIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

export const ChevronRightIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

export const ChevronUpIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
  </svg>
);

export const ChevronDownIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);

export const LightningBoltIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
);

export const BookOpenIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
);

export const SparklesIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.953 2.05a.75.75 0 01.094 1.056l-1.5 2.25a.75.75 0 00.655 1.144h2.502a.75.75 0 01.655 1.144l-1.5 2.25a.75.75 0 01-1.09 0l-1.5-2.25a.75.75 0 00-.655-1.144H4.5a.75.75 0 01-.655-1.144l1.5-2.25a.75.75 0 011.09 0l1.5 2.25a.75.75 0 00.655 1.144h2.502a.75.75 0 01.655-1.144l1.5-2.25a.75.75 0 011.09 0l1.5 2.25a.75.75 0 00.655 1.144h2.502a.75.75 0 01.655 1.144l-1.5 2.25a.75.75 0 01-1.09 0l-1.5-2.25a.75.75 0 00-.655-1.144H13.5a.75.75 0 01-.655-1.144l1.5-2.25a.75.75 0 011.09 0z" />
    </svg>
);


const StructuralFragmentsIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9.75l-9-5.25" />
  </svg>
);

const CatalyticEnzymesIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345h5.356a.563.563 0 01.329.958l-4.34 3.14a.563.563 0 00-.182.635l1.618 4.83a.563.563 0 01-.844.622l-4.42-3.232a.563.563 0 00-.664 0l-4.42 3.232a.563.563 0 01-.844-.622l1.618-4.83a.563.563 0 00-.182-.635l-4.34-3.14a.563.563 0 01.329-.958h5.356a.563.563 0 00.475-.345l2.125-5.111z" />
  </svg>
);

const GeneticMaterialIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75v16.5M15 3.75v16.5M3 9.75h18M3 14.25h18" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75c1.5 4.5 1.5 12 1.5 16.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75c-1.5 4.5-1.5 12-1.5 16.5" />
  </svg>
);

export const ResourceIcon: React.FC<{ resource: Resource; className?: string }> = ({ resource, className = 'w-6 h-6' }) => {
  switch (resource) {
    case Resource.Stardust: return <StardustIcon className={`${className} text-yellow-300`} />;
    case Resource.Hydrogen: return <HydrogenIcon className={`${className} text-sky-300`} />;
    case Resource.Carbon: return <CarbonIcon className={`${className} text-slate-400`} />;
    case Resource.Iron: return <IronIcon className={`${className} text-rose-400`} />;
    case Resource.Rock: return <RockIcon className={`${className} text-orange-400`} />;
    case Resource.Water: return <WaterIcon className={`${className} text-blue-400`} />;
    case Resource.PrimordialSoup: return <PrimordialSoupIcon className={`${className} text-purple-400`} />;
    case Resource.AminoAcids: return <AminoAcidIcon className={`${className} text-emerald-400`} />;
    case Resource.Nucleotides: return <NucleotideIcon className={`${className} text-cyan-400`} />;
    case Resource.ATP: return <ATPIcon className={`${className} text-yellow-400`} />;
    default: return null;
  }
};

export const ProteinLootIcon: React.FC<{ lootType: ProteinLootType; className?: string }> = ({ lootType, className = 'w-6 h-6' }) => {
  switch (lootType) {
    case ProteinLootType.StructuralFragments: return <StructuralFragmentsIcon className={`${className} text-orange-300`} />;
    case ProteinLootType.CatalyticEnzymes: return <CatalyticEnzymesIcon className={`${className} text-rose-300`} />;
    case ProteinLootType.GeneticMaterial: return <GeneticMaterialIcon className={`${className} text-purple-300`} />;
    default: return null;
  }
};


export const AttributeIcon: React.FC<{ iconId: 'speed' | 'efficiency' | 'resilience'; className?: string }> = ({ iconId, className }) => {
    switch (iconId) {
        case 'speed': return <SpeedIcon className={className} />;
        case 'efficiency': return <EfficiencyIcon className={className} />;
        case 'resilience': return <ResilienceIcon className={className} />;
        default: return null;
    }
};