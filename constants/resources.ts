
import { Resource, type ResourceData, type Knob } from '../types';

export const RESOURCES: Record<Resource, ResourceData> = {
  [Resource.Stardust]: { name: Resource.Stardust, description: "The raw material of the cosmos, remnants of ancient stars." },
  [Resource.Hydrogen]: { name: Resource.Hydrogen, description: "The simplest and most abundant element, the primary fuel for stars." },
  [Resource.Carbon]: { name: Resource.Carbon, description: "A key element for life, forged in the heart of dying stars." },
  [Resource.Iron]: { name: Resource.Iron, description: "A heavy element created in supernovae, crucial for planetary cores." },
  [Resource.Rock]: { name: Resource.Rock, description: "A composite material forming the crust of terrestrial planets." },
  [Resource.Water]: { name: Resource.Water, description: "A vital solvent for life, delivered to young planets by comets." },
  [Resource.PrimordialSoup]: { name: Resource.PrimordialSoup, description: "A rich chemical broth in early oceans, from which life may emerge." },
  [Resource.AminoAcids]: { name: Resource.AminoAcids, description: "The building blocks of proteins, formed in the primordial soup." },
  [Resource.Nucleotides]: { name: Resource.Nucleotides, description: "The building blocks of RNA and DNA, the basis of genetic code." },
  [Resource.ATP]: { name: Resource.ATP, description: "Adenosine triphosphate, the primary energy currency of the cell." }
};

export const KNOBS: Knob[] = [
  // Cosmic Era
  { id: 'h_fusion', name: 'Fuse Hydrogen', description: 'Compress stardust into the lightest element.', inputs: [{ resource: Resource.Stardust, amount: 1 }], outputs: [{ resource: Resource.Hydrogen, amount: 1 }], workerType: 'Force' },
  { id: 'c_fusion', name: 'Fuse Carbon', description: 'Forge carbon in a stellar furnace.', inputs: [{ resource: Resource.Hydrogen, amount: 2 }], outputs: [{ resource: Resource.Carbon, amount: 1 }], workerType: 'Force' },
  { id: 'fe_fusion', name: 'Fuse Iron', description: 'Create heavy iron in a supernova.', inputs: [{ resource: Resource.Hydrogen, amount: 10 }, {resource: Resource.Carbon, amount: 2}], outputs: [{ resource: Resource.Iron, amount: 1 }], workerType: 'Force' },
  // Planetary Era
  { id: 'rock_formation', name: 'Form Rock', description: 'Accrete stardust into solid rock.', inputs: [{ resource: Resource.Stardust, amount: 50 }], outputs: [{ resource: Resource.Rock, amount: 10 }], workerType: 'Force' },
  { id: 'water_formation', name: 'Form Water', description: 'Combine hydrogen with captured oxygen to form water.', inputs: [{ resource: Resource.Hydrogen, amount: 10 }], outputs: [{ resource: Resource.Water, amount: 5 }], workerType: 'Force' },
  { id: 'asteroid_mining', name: 'Mine Asteroids', description: 'Use Force to capture and process asteroids for raw materials.', inputs: [{ resource: Resource.Stardust, amount: 10 }], outputs: [{ resource: Resource.Rock, amount: 2 }, { resource: Resource.Iron, amount: 1 }], workerType: 'Force', costIncreasePerHand: 0.02 },
  // Biological Era
  { id: 'soup_creation', name: 'Create Primordial Soup', description: 'Dissolve carbon in water, creating a rich chemical broth.', inputs: [{ resource: Resource.Water, amount: 2 }, { resource: Resource.Carbon, amount: 2 }], outputs: [{ resource: Resource.PrimordialSoup, amount: 1 }], workerType: 'Hands', costIncreasePerHand: 0.05 },
  { id: 'amino_acid_synthesis', name: 'Synthesize Amino Acids', description: 'Use energy to form amino acids from the soup. More hands are less efficient.', inputs: [{ resource: Resource.PrimordialSoup, amount: 2 }], outputs: [{ resource: Resource.AminoAcids, amount: 1 }], workerType: 'Hands', costIncreasePerHand: 0.1 },
  { id: 'nucleotide_synthesis', name: 'Synthesize Nucleotides', description: 'Form the precursors to genetic material. More hands are less efficient.', inputs: [{ resource: Resource.PrimordialSoup, amount: 15 }], outputs: [{ resource: Resource.Nucleotides, amount: 1 }], workerType: 'Hands', costIncreasePerHand: 0.1 },
  { id: 'atp_synthesis', name: 'Synthesize ATP', description: 'Convert amino acids into a more efficient energy packet. More hands are less efficient.', inputs: [{ resource: Resource.AminoAcids, amount: 5 }], outputs: [{ resource: Resource.ATP, amount: 1 }], workerType: 'Hands', costIncreasePerHand: 0.1 }
];

export const INITIAL_WORKERS: Record<string, number> = {};
export const INITIAL_MAX_FORCE = 0;
export const INITIAL_MAX_HANDS = 0;