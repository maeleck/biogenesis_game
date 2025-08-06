


import { Resource, type ResourceData, type Knob, type Upgrade, ProtocellState, HuntResult, ProteinLootType, ChamberUpgrade, ProteinLootState } from './types';

export const TICK_RATE_MS = 1000; // Game loop runs every second
export const INITIAL_STARDUST_CAPACITY = 300;
export const TEST_REWARD_STARDUST_CAP_PERCENTAGE = 0.03; // 3% of stardust capacity
export const TEST_REWARD_GENERATION_SECONDS = 3;


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

export const UPGRADES: Upgrade[] = [
  // --- COSMIC ERA (Top Tier) ---
  {
    id: 'cosmic_origins',
    name: 'Cosmic Origins',
    description: 'Begin to gather the dust of creation from the vacuum.',
    cost: [{ resource: Resource.Stardust, amount: 5 }],
    position: { x: 10, y: 10 },
    effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Stardust, value: 10 }],
    icon: 'spark',
    panelContent: {
      facts: [
        { 
          text: "The raw materials for life weren't created in the Big Bang. They were forged in the hearts of ancient stars and scattered across the cosmos, providing the carbon, oxygen, and other elements necessary for planets and organisms.",
          quiz: {
            question: "Where were the essential elements for life, like carbon, primarily created?",
            options: ["In the Big Bang", "In the hearts of stars", "On the surface of planets", "In black holes"],
            answerIndex: 1
          }
        },
        {
          text: "A protoplanetary disk is a vast, rotating disc of gas and dust surrounding a young star. It is within these disks that friction, gravity, and collisions eventually lead to the formation of planets.",
          quiz: {
            question: "What is the primary function of a protoplanetary disk?",
            options: ["To cool down a star", "To create black holes", "To form planets", "To generate light"],
            answerIndex: 2
          }
        },
        {
          text: "Abiogenesis is the scientific concept of life arising from non-living matter. This complex process is thought to have occurred in Earth's early history, possibly in nutrient-rich environments like hydrothermal vents or warm little ponds.",
          quiz: {
            question: "What does the term 'Abiogenesis' refer to?",
            options: ["The evolution of dinosaurs", "Life arising from non-living matter", "The formation of stars", "The process of photosynthesis"],
            answerIndex: 1
          }
        },
        { 
          text: "By gathering more stardust, you increase the probability of finding complex organic molecules, such as polycyclic aromatic hydrocarbons (PAHs), which are considered precursors to life.", 
          unlockedBySubUpgradeId: 'co_gen_1',
          quiz: {
            question: "What are Polycyclic Aromatic Hydrocarbons (PAHs) considered to be?",
            options: ["A source of stellar energy", "Precursors to life", "A type of cosmic radiation", "A material for planet cores"],
            answerIndex: 1
          }
        },
        { 
          text: "A larger containment field not only holds more matter but also creates a stable environment where simple molecules can begin to interact and form more complex structures over eons.", 
          unlockedBySubUpgradeId: 'co_cap_1',
          quiz: {
            question: "Besides holding more matter, what is a key benefit of a larger containment field?",
            options: ["It generates energy", "It creates a stable environment for molecular interaction", "It cools down stardust", "It attracts black holes"],
            answerIndex: 1
          }
        },
        { 
          text: "Advanced filtering allows you to sift through cosmic dust with greater efficiency, targeting regions rich in the specific heavy elements vital for planetary and biological formation.", 
          unlockedBySubUpgradeId: 'co_gen_2',
           quiz: {
            question: "What is the primary purpose of 'Advanced Filtering' of cosmic dust?",
            options: ["To create new elements", "To target regions rich in heavy elements", "To destroy unwanted matter", "To convert dust to energy"],
            answerIndex: 1
          }
        },
        { 
          text: "Magnetic containment creates a pocket of space-time where you can safely accumulate vast quantities of matter without it collapsing prematurely under its own gravity.", 
          unlockedBySubUpgradeId: 'co_cap_2',
           quiz: {
            question: "What main problem does 'Magnetic Containment' solve when accumulating vast quantities of matter?",
            options: ["Premature gravitational collapse", "Excessive heat generation", "Radioactive decay", "Unwanted chemical reactions"],
            answerIndex: 0
          }
        }
      ],
      subUpgrades: [
        { id: 'co_gen_1', name: 'Basic Collection', description: 'Improve passive stardust collection.', cost: () => ({ resource: Resource.Stardust, amount: 10 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Stardust, value: 10 }] },
        { id: 'co_cap_1', name: 'Initial Containment', description: 'Slightly increase your stardust storage.', cost: () => ({ resource: Resource.Stardust, amount: 15 }), effects: [{ type: 'INCREASE_CAPACITY', resource: Resource.Stardust, value: 200 }] },
        { id: 'co_gen_2', name: 'Advanced Filtering', description: 'Greatly improve stardust collection efficiency.', cost: () => ({ resource: Resource.Stardust, amount: 20 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Stardust, value: 20 }] },
        { id: 'co_cap_2', name: 'Magnetic Containment', description: 'Use magnetic fields to store much more stardust.', cost: () => ({ resource: Resource.Stardust, amount: 30 }), effects: [{ type: 'INCREASE_CAPACITY', resource: Resource.Stardust, value: 500 }] },
        { 
          id: 'co_inf_cap', 
          name: 'Cosmic Fabric Expansion', 
          description: 'Bend spacetime to increase your stardust containment field and passively attract more. Infinitely expandable.', 
          cost: (level) => ({ resource: Resource.Stardust, amount: Math.floor(50 * Math.pow(4, level)) }), 
          effects: [
              { type: 'INCREASE_CAPACITY', resource: Resource.Stardust, value: 0 }, // Handled by special logic in App.tsx
              { type: 'ADD_BASE_GENERATION', resource: Resource.Stardust, value: 0 } // Handled by special logic in App.tsx
          ], 
          repeatable: {}
        },
      ]
    }
  },
   {
    id: 'star_cluster_formation',
    name: 'Star Cluster',
    description: 'Form a dense cluster of stars, a stellar nursery that passively generates stardust.',
    cost: [{ resource: Resource.Stardust, amount: 1500 }],
    position: { x: 48, y: 18 },
    effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Stardust, value: 20 }],
    icon: 'star_cluster',
    dependencies: ['population_iii_stars'],
    panelContent: {
      facts: [
        { text: "Star clusters are large groups of stars. Open clusters are loosely bound and contain young, hot stars, while globular clusters are ancient, tightly bound spheres of hundreds of thousands of stars." },
        { text: "Studying star clusters helps astronomers understand stellar evolution, as all member stars formed at roughly the same time from the same material.", unlockedBySubUpgradeId: 'sc_evolution' }
      ],
      subUpgrades: [
        { id: 'sc_density', name: 'Increase Density', description: 'A denser cluster passively attracts more Stardust.', cost: () => ({ resource: Resource.Stardust, amount: 2000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Stardust, value: 30 }] },
        { id: 'sc_evolution', name: 'Study Stellar Evolution', description: 'Understanding star life cycles boosts Stardust collection efficiency.', cost: () => ({ resource: Resource.Stardust, amount: 4000 }), effects: [{ type: 'INCREASE_GENERATION_MULTIPLIER', resource: Resource.Stardust, value: 0.05 }] }
      ]
    }
  },
  {
    id: 'cosmic_microwave_background',
    name: 'CMB Analysis',
    description: 'Study the faint afterglow of the Big Bang to understand the initial conditions of the universe.',
    cost: [{ resource: Resource.Stardust, amount: 20 }],
    position: { x: 15, y: 18 },
    effects: [{ type: 'INCREASE_GENERATION_MULTIPLIER', resource: Resource.Stardust, value: 0.05 }],
    icon: 'cosmic_microwave_background',
    dependencies: ['cosmic_origins'],
    panelContent: {
      facts: [
        {
          text: "The Cosmic Microwave Background (CMB) is the oldest light in the universe, a snapshot from just 380,000 years after the Big Bang. It's a nearly uniform thermal radiation filling all of space.",
          quiz: {
            question: "The Cosmic Microwave Background is essentially a 'snapshot' of the universe at what age?",
            options: ["13.8 billion years", "1 million years", "380,000 years", "Instantly after the Big Bang"],
            answerIndex: 2
          }
        },
        {
          text: "Tiny temperature fluctuations (anisotropies) in the CMB are the seeds of all future structures, from stars to galaxies to galactic superclusters. They reveal the initial density variations in the early universe.",
          unlockedBySubUpgradeId: 'cmb_fluctuations'
        },
        {
          text: "Studying the polarization of the CMB light can help scientists detect primordial gravitational waves, which would be direct evidence of cosmic inflation in the first fraction of a second of the universe's existence.",
          unlockedBySubUpgradeId: 'cmb_polarization',
           quiz: {
            question: "What could studying the polarization of the CMB provide evidence for?",
            options: ["Dark Energy", "Cosmic Inflation", "The Multiverse", "Black Hole Evaporation"],
            answerIndex: 1
          }
        }
      ],
      subUpgrades: [
        { id: 'cmb_fluctuations', name: 'Analyze Anisotropies', description: 'Pinpoint denser regions of primordial matter to improve Stardust collection.', cost: () => ({ resource: Resource.Stardust, amount: 40 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Stardust, value: 30 }] },
        { id: 'cmb_polarization', name: 'Detect B-Modes', description: 'Refine analysis of CMB polarization to boost overall Stardust gain.', cost: () => ({ resource: Resource.Stardust, amount: 100 }), effects: [{ type: 'INCREASE_GENERATION_MULTIPLIER', resource: Resource.Stardust, value: 0.1 }] },
      ]
    }
  },
  {
    id: 'protostar_formation',
    name: 'Protostar Formation',
    description: 'A large mass of gas and dust collapses, forming a protostar, the precursor to a star.',
    cost: [{ resource: Resource.Stardust, amount: 20 }],
    position: { x: 45, y: 10 },
    effects: [{ type: 'UNLOCK_FEATURE', value: 'fusion' }, { type: 'UNLOCK_KNOBS', value: ['h_fusion'] }, { type: 'INCREASE_MAX_FORCE', value: 5 }, { type: 'ADD_BASE_GENERATION', resource: Resource.Hydrogen, value: 5 }],
    icon: 'protostar',
    dependencies: ['cosmic_origins'],
    panelContent: {
      facts: [
        { text: "A protostar forms from the gravitational collapse of a giant molecular cloud. As it contracts, its core heats up due to the conversion of gravitational potential energy to thermal energy." },
        { text: "Before a protostar begins nuclear fusion, it shines from the heat generated by its contraction. This phase can last for hundreds of thousands of years.", unlockedBySubUpgradeId: 'pf_accel_1' },
        { text: "Powerful stellar winds and jets of gas are often ejected from the poles of a protostar, clearing away surrounding material and influencing subsequent planet formation.", unlockedBySubUpgradeId: 'pf_force_1' }
      ],
      subUpgrades: [
        { id: 'pf_accel_1', name: 'Accelerated Collapse', description: 'Improve gravitational focusing to get more Hydrogen from Stardust.', cost: () => ({ resource: Resource.Hydrogen, amount: 10 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Hydrogen, value: 1 }] },
        { id: 'pf_force_1', name: 'Focused Force', description: 'Harness stellar winds to increase maximum available Force.', cost: () => ({ resource: Resource.Stardust, amount: 250 }), effects: [{ type: 'INCREASE_MAX_FORCE', value: 5 }] },
      ]
    }
  },
  {
    id: 'stellar_nucleosynthesis',
    name: 'Stellar Nucleosynthesis',
    description: 'Ignite the core of a star, fusing hydrogen into heavier elements like carbon.',
    cost: [{ resource: Resource.Hydrogen, amount: 20 }],
    position: { x: 60, y: 10 },
    effects: [{ type: 'UNLOCK_KNOBS', value: ['c_fusion'] }, { type: 'ADD_BASE_GENERATION', resource: Resource.Carbon, value: 2 }],
    icon: 'nucleosynthesis',
    dependencies: ['protostar_formation'],
    panelContent: {
      facts: [
        {
          text: "Stars are cosmic forges. Through nuclear fusion, they create most of the elements in the universe heavier than hydrogen and helium, a process called stellar nucleosynthesis.",
          quiz: {
            question: "What process creates most elements heavier than helium inside stars?",
            options: ["Gravitational Collapse", "Photosynthesis", "Radioactive Decay", "Stellar Nucleosynthesis"],
            answerIndex: 3
          }
        },
        { text: "The CNO cycle (Carbon-Nitrogen-Oxygen) is a catalytic cycle of fusion reactions that occurs in stars more massive than the Sun, converting hydrogen to helium more efficiently than the proton-proton chain.", unlockedBySubUpgradeId: 'sn_cno_1' }
      ],
      subUpgrades: [
        { id: 'sn_cno_1', name: 'CNO Cycle Mastery', description: 'Improve the efficiency of Carbon fusion.', cost: () => ({ resource: Resource.Carbon, amount: 25 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Carbon, value: 0.5 }] },
        { id: 'sn_capacity_1', name: 'Elemental Storage', description: 'Increase the storage capacity for Hydrogen and Carbon.', cost: () => ({ resource: Resource.Hydrogen, amount: 500 }), effects: [{ type: 'INCREASE_UNIVERSAL_STORAGE', value: 1 }] },
      ]
    }
  },
  {
    id: 'agb_star',
    name: 'AGB Star Phase',
    description: 'Medium-mass stars swell into giants, dredging up carbon from their core.',
    cost: [{ resource: Resource.Carbon, amount: 250 }],
    position: { x: 70, y: 8 },
    effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Carbon, value: 2 }],
    icon: 'agb_star',
    dependencies: ['stellar_nucleosynthesis'],
    panelContent: {
      facts: [
        { text: "Asymptotic Giant Branch (AGB) stars are evolved, cool, luminous stars. They are a major source of carbon and other elements in the galaxy, which they expel through powerful stellar winds." }
      ],
      subUpgrades: [
        { id: 'agb_dredge', name: 'Third Dredge-up', description: 'Enhance thermal pulses to improve passive Carbon generation.', cost: () => ({ resource: Resource.Carbon, amount: 400 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Carbon, value: 3 }] },
      ]
    }
  },
  {
    id: 'supernova_explosion',
    name: 'Supernova',
    description: 'A massive star ends its life in a cataclysmic explosion, creating the heaviest elements.',
    cost: [{ resource: Resource.Carbon, amount: 75 }],
    position: { x: 70, y: 12 },
    effects: [{ type: 'UNLOCK_KNOBS', value: ['fe_fusion'] }, { type: 'ADD_BASE_GENERATION', resource: Resource.Iron, value: 1 }],
    icon: 'supernova',
    dependencies: ['stellar_nucleosynthesis'],
    panelContent: {
      facts: [
        { text: "A Type II supernova occurs when a massive star runs out of nuclear fuel, and its core collapses under gravity. The resulting shockwave blasts the star's outer layers into space." },
        {
          text: "The incredible energy of a supernova is required to fuse elements heavier than iron, such as gold and uranium. All such elements on Earth were forged in these ancient explosions.",
          unlockedBySubUpgradeId: 'se_enrichment_1',
          quiz: {
            question: "Where are elements heavier than iron, like gold, primarily created?",
            options: ["In main sequence stars", "In supernova explosions", "In the Big Bang", "On planetary surfaces"],
            answerIndex: 1
          }
        },
      ],
      subUpgrades: [
        { id: 'se_enrichment_1', name: 'Heavy Element Enrichment', description: 'Improve the efficiency of Iron fusion from stellar remnants.', cost: () => ({ resource: Resource.Iron, amount: 15 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Iron, value: 0.2 }] },
        { id: 'se_force_2', name: 'Shockwave Harnessing', description: 'Utilize the power of cosmic shockwaves to increase max Force.', cost: () => ({ resource: Resource.Carbon, amount: 500 }), effects: [{ type: 'INCREASE_MAX_FORCE', value: 10 }] },
      ]
    }
  },
  {
    id: 'limitless_force',
    name: 'Gravitational Singularity',
    description: 'Harness a localized singularity to vastly increase your command over cosmic forces. Unlocks repeatable upgrades.',
    cost: [{ resource: Resource.Iron, amount: 2500 }],
    position: { x: 80, y: 15 },
    effects: [],
    icon: 'singularity',
    dependencies: ['supernova_explosion'],
    panelContent: {
      facts: [
        { text: "By manipulating spacetime on a small scale, you can create temporary wells of immense gravity, effectively multiplying your available Force." }
      ],
      subUpgrades: [
        {
          id: 'force_inf_cap',
          name: 'Expand Force Limit',
          description: 'Deepen the singularity, increasing your maximum Force capacity.',
          cost: (level) => ({ resource: Resource.Iron, amount: Math.floor(1000 * Math.pow(1.5, level)) }),
          effects: [{ type: 'INCREASE_MAX_FORCE', value: 10 }],
          repeatable: {}
        }
      ]
    }
  },
  {
    id: 'neutron_star_collision',
    name: 'Neutron Star Collision',
    description: 'Merge two ultra-dense stellar remnants, forging vast amounts of heavy elements.',
    cost: [{ resource: Resource.Iron, amount: 5000 }],
    position: { x: 80, y: 10 },
    effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Iron, value: 5 }],
    icon: 'neutron_star_collision',
    dependencies: ['supernova_explosion'],
    panelContent: {
      facts: [
        { text: "When two neutron stars in a binary system collide, they create a kilonova. This event is a primary source of r-process elements, like gold and platinum, in the universe." }
      ],
      subUpgrades: [
        { id: 'nsc_r_process', name: 'Optimize r-process', description: 'Focus the collision energy to significantly boost passive Iron generation.', cost: () => ({ resource: Resource.Iron, amount: 7500 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Iron, value: 10 }] }
      ]
    }
  },
  {
    id: 'dark_matter_studies',
    name: 'Dark Matter Studies',
    description: "Theorize the existence of an invisible substance that adds gravity to the cosmos.",
    cost: [{ resource: Resource.Stardust, amount: 2500 }],
    position: { x: 75, y: 18 },
    effects: [{ type: 'INCREASE_GENERATION_MULTIPLIER', resource: Resource.Stardust, value: 0.1 }],
    icon: 'dark_matter',
    dependencies: ['supernova_explosion'],
    panelContent: {
      facts: [
        { text: "Dark matter does not emit, absorb, or reflect light, making it invisible to electromagnetic observation. Its existence is inferred from its gravitational effects on visible matter." },
        { text: "Approximately 27% of the universe's mass-energy density is believed to be dark matter, far a-weighing the ~5% that constitutes ordinary, visible matter.", quiz: { question: "What percentage of the universe is estimated to be dark matter?", options: ["5%", "27%", "50%", "73%"], answerIndex: 1 } },
        { text: "Galaxies rotate much faster than they should based on their visible mass. This discrepancy is a key piece of evidence for dark matter providing extra gravitational pull.", unlockedBySubUpgradeId: 'dm_rotation_curve' }
      ],
      subUpgrades: [
        { id: 'dm_rotation_curve', name: 'Analyze Rotation Curves', description: "Observing dark matter's gravitational influence improves Stardust collection efficiency.", cost: () => ({ resource: Resource.Stardust, amount: 5000 }), effects: [{ type: 'INCREASE_GENERATION_MULTIPLIER', resource: Resource.Stardust, value: 0.15 }] }
      ]
    }
  },
  {
    id: 'galaxy_formation',
    name: 'Galaxy Formation',
    description: 'Dark matter halos allow vast structures of stars, gas, and dust to form.',
    cost: [{ resource: Resource.Stardust, amount: 50000 }],
    position: { x: 90, y: 18 },
    effects: [{ type: 'INCREASE_GENERATION_MULTIPLIER', resource: Resource.Stardust, value: 0.2 }],
    icon: 'galaxy_formation',
    dependencies: ['dark_matter_studies'],
    panelContent: {
      facts: [
        { text: "Galaxies are gravitationally bound systems of stars, stellar remnants, interstellar gas, dust, and dark matter. They range from dwarfs with a few hundred million stars to giants with one hundred trillion stars." }
      ],
      subUpgrades: [
        { id: 'gf_efficiency', name: 'Galactic Efficiency', description: 'Boost passive Hydrogen generation across the galaxy.', cost: () => ({ resource: Resource.Hydrogen, amount: 10000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Hydrogen, value: 10 }] }
      ]
    }
  },
  
  // --- NEW COSMIC ERA NODES ---
  {
    id: 'interstellar_medium',
    name: 'Interstellar Medium',
    description: 'Cultivate the diffuse gas and dust between stars, a reservoir for future star formation.',
    cost: [{ resource: Resource.Stardust, amount: 2000 }],
    position: { x: 55, y: 16 },
    effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Stardust, value: 5 }],
    icon: 'interstellar_medium',
    dependencies: ['star_cluster_formation'],
    panelContent: {
        facts: [{ text: "The Interstellar Medium (ISM) is incredibly tenuous; on average, its density is about one atom per cubic centimeter. It's the raw material for new stars." }],
        subUpgrades: [{ id: 'ism_enrichment', name: 'ISM Enrichment', description: 'Seed the medium with heavy elements, improving Stardust generation.', cost: () => ({ resource: Resource.Stardust, amount: 2500 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Stardust, value: 10 }] }]
    }
  },
  {
    id: 'planetary_nebula',
    name: 'Planetary Nebula',
    description: 'Capture the glowing, expanding shell of gas ejected from a dying low-mass star.',
    cost: [{ resource: Resource.Carbon, amount: 800 }],
    position: { x: 75, y: 10 },
    effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Carbon, value: 1 }],
    icon: 'planetary_nebula',
    dependencies: ['agb_star'],
    panelContent: {
        facts: [{ text: "'Planetary nebulae' are a misnomer; they have nothing to do with planets but were named so due to their round, planet-like appearance through early telescopes." }],
        subUpgrades: [{ id: 'pn_recycling', name: 'Nebula Recycling', description: 'Efficiently harvest the ejected shell for more passive Carbon.', cost: () => ({ resource: Resource.Carbon, amount: 1200 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Carbon, value: 2 }] }]
    }
  },
  {
    id: 'gravitational_lensing',
    name: 'Gravitational Lensing',
    description: 'Use gravity to bend light, acting as a natural telescope to find resource-rich regions.',
    cost: [{ resource: Resource.Stardust, amount: 7500 }],
    position: { x: 65, y: 22 },
    effects: [{ type: 'INCREASE_GENERATION_MULTIPLIER', resource: Resource.Stardust, value: 0.05 }],
    icon: 'gravitational_lensing',
    dependencies: ['dark_matter_studies'],
    panelContent: {
        facts: [{ text: "Gravitational lensing provides strong evidence for both General Relativity and the existence of dark matter by observing how mass warps spacetime." }],
        subUpgrades: [{ id: 'gl_focusing', name: 'Lensing Focus', description: 'Refine your observations to further boost Stardust generation efficiency.', cost: () => ({ resource: Resource.Stardust, amount: 10000 }), effects: [{ type: 'INCREASE_GENERATION_MULTIPLIER', resource: Resource.Stardust, value: 0.1 }] }]
    }
  },
  {
    id: 'reionization_epoch',
    name: 'Epoch of Reionization',
    description: 'The first stars produce enough radiation to re-ionize the neutral hydrogen filling the universe.',
    cost: [{ resource: Resource.Hydrogen, amount: 5000 }],
    position: { x: 25, y: 20 },
    effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Hydrogen, value: 5 }],
    icon: 'reionization',
    dependencies: ['cosmic_microwave_background'],
    panelContent: {
        facts: [{ text: "During this epoch, the 'cosmic dark ages' ended as the universe became transparent to ultraviolet light for the first time." }],
        subUpgrades: [{ id: 're_efficiency', name: 'Reionization Efficiency', description: 'Harness the energy of reionization to passively generate Hydrogen.', cost: () => ({ resource: Resource.Hydrogen, amount: 7500 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Hydrogen, value: 5 }] }]
    }
  },
  {
    id: 'supermassive_black_hole',
    name: 'Supermassive Black Hole',
    description: 'A gravitational singularity at the galactic core, profoundly influencing the galaxy\'s structure.',
    cost: [{ resource: Resource.Iron, amount: 50000 }],
    position: { x: 80, y: 15 },
    effects: [{ type: 'INCREASE_MAX_FORCE', value: 20 }],
    icon: 'black_hole',
    dependencies: ['galaxy_formation'],
    panelContent: {
        facts: [{ text: "Nearly every large galaxy, including our own Milky Way, is thought to have a supermassive black hole at its center, some with billions of times the Sun's mass." }],
        subUpgrades: [{ id: 'smbh_gravity_well', name: 'Deepen Gravity Well', description: 'The intense gravity provides a significant boost to max Force.', cost: () => ({ resource: Resource.Iron, amount: 75000 }), effects: [{ type: 'INCREASE_MAX_FORCE', value: 30 }] }]
    }
  },
  {
    id: 'quasar',
    name: 'Quasar Activation',
    description: 'Ignite the accretion disk of a supermassive black hole, creating one of the most luminous objects in the universe.',
    cost: [{ resource: Resource.Stardust, amount: 100000 }],
    position: { x: 85, y: 13 },
    effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Stardust, value: 100 }],
    icon: 'quasar',
    dependencies: ['supermassive_black_hole'],
    panelContent: {
        facts: [{ text: "Quasars are powered by matter falling into a supermassive black hole and can outshine their entire host galaxy." }],
        subUpgrades: [{ id: 'quasar_jets', name: 'Harness Relativistic Jets', description: 'Channel the quasar\'s immense energy output to boost Stardust generation.', cost: () => ({ resource: Resource.Stardust, amount: 150000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Stardust, value: 150 }] }]
    }
  },
  {
    id: 'dark_energy',
    name: 'Dark Energy',
    description: 'Acknowledge a mysterious repulsive force causing the universe\'s expansion to accelerate.',
    cost: [{ resource: Resource.Stardust, amount: 100000 }],
    position: { x: 85, y: 21 },
    effects: [{ type: 'INCREASE_GENERATION_MULTIPLIER', resource: Resource.Stardust, value: 0.1 }],
    icon: 'dark_energy',
    dependencies: ['galaxy_formation'],
    panelContent: {
        facts: [{ text: "Dark energy is believed to make up about 68% of the universe's total energy density, dominating over both dark and normal matter." }],
        subUpgrades: [{ id: 'de_understanding', name: 'Cosmological Constant', description: 'A deeper understanding of dark energy boosts all Stardust acquisition.', cost: () => ({ resource: Resource.Stardust, amount: 120000 }), effects: [{ type: 'INCREASE_GENERATION_MULTIPLIER', resource: Resource.Stardust, value: 0.1 }] }]
    }
  },
  {
    id: 'cosmic_web',
    name: 'Cosmic Web',
    description: 'Map the vast, filamentary structures of dark matter that form the scaffolding of the universe.',
    cost: [{ resource: Resource.Stardust, amount: 75000 }],
    position: { x: 80, y: 23 },
    effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Hydrogen, value: 10 }],
    icon: 'cosmic_web',
    dependencies: ['galaxy_formation'],
    panelContent: {
        facts: [{ text: "Galaxies form and cluster at the intersections of the cosmic web's filaments, like cities on a vast, invisible highway system." }],
        subUpgrades: [{ id: 'cw_filaments', name: 'Trace Filaments', description: 'Tracing the gas in cosmic filaments improves passive Hydrogen generation.', cost: () => ({ resource: Resource.Hydrogen, amount: 50000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Hydrogen, value: 20 }] }]
    }
  },
  {
    id: 'galactic_merger',
    name: 'Galactic Merger',
    description: 'Collide two galaxies to trigger a massive burst of star formation and elemental creation.',
    cost: [{ resource: Resource.Stardust, amount: 200000 }],
    position: { x: 90, y: 16 },
    effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Stardust, value: 50 }],
    icon: 'galactic_merger',
    dependencies: ['galaxy_formation'],
    panelContent: {
        facts: [{ text: "Galactic mergers often result in the formation of a much larger elliptical galaxy and can trigger the rapid growth of the central supermassive black hole." }],
        subUpgrades: [{ id: 'gm_starburst', name: 'Starburst Galaxy', description: 'The intense star formation significantly boosts Stardust generation.', cost: () => ({ resource: Resource.Stardust, amount: 250000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Stardust, value: 100 }] }]
    }
  },
  {
    id: 'population_iii_stars',
    name: 'Population III Stars',
    description: 'Form the very first generation of stars, composed almost purely of Hydrogen.',
    cost: [{ resource: Resource.Hydrogen, amount: 1000 }],
    position: { x: 40, y: 15 },
    effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Hydrogen, value: 2 }],
    icon: 'population_iii_stars',
    dependencies: ['protostar_formation'],
    panelContent: {
        facts: [{ text: "Population III stars were the first stars, theorized to be extremely massive and short-lived, and responsible for creating the first heavy elements." }],
        subUpgrades: [{ id: 'p3_enrichment', name: 'First Enrichment', description: 'The death of these first stars provides a small passive income of Carbon.', cost: () => ({ resource: Resource.Hydrogen, amount: 1500 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Carbon, value: 0.1 }] }]
    }
  },

   // --- PLANETARY ERA (Middle Tier) ---
  {
    id: 'protoplanetary_disk',
    name: 'Protoplanetary Disk',
    description: 'Form a swirling disk of dense gas and dust around a young star, the birthplace of planets.',
    cost: [{ resource: Resource.Stardust, amount: 300 }],
    position: { x: 20, y: 25 },
    effects: [{ type: 'UNLOCK_KNOBS', value: ['rock_formation'] }, { type: 'ADD_BASE_GENERATION', resource: Resource.Rock, value: 5 }],
    icon: 'protoplanetary_disk',
    dependencies: ['cosmic_origins'],
    panelContent: {
      facts: [
        { text: "A protoplanetary disk is a rotating circumstellar disk of dense gas and dust surrounding a young, newly formed star. It's the raw material from which planets, moons, and asteroids are born." },
        {
          text: "The 'frost line' or 'snow line' is the distance from the central protostar where it is cold enough for volatile compounds such as water, ammonia, and methane to condense into solid ice grains.",
          unlockedBySubUpgradeId: 'pd_frost_line_1',
          quiz: {
            question: "What is the 'frost line' in a protoplanetary disk?",
            options: ["The edge of the disk", "A region where only rock can exist", "The point where volatiles like water can freeze", "The hottest part of the disk"],
            answerIndex: 2
          }
        },
      ],
      subUpgrades: [
        { id: 'pd_accretion_1', name: 'Disk Accretion', description: 'Improve passive generation of Rock from the disk.', cost: () => ({ resource: Resource.Rock, amount: 25 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Rock, value: 2 }] },
        { id: 'pd_frost_line_1', name: 'Frost Line Analysis', description: 'Begin concentrating icy materials to passively generate Water.', cost: () => ({ resource: Resource.Rock, amount: 100 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Water, value: 1 }] },
        { id: 'pd_storage_1', name: 'Planetesimal Bins', description: 'Increase the storage capacity for planetary materials.', cost: () => ({ resource: Resource.Iron, amount: 500 }), effects: [{ type: 'INCREASE_UNIVERSAL_STORAGE', value: 2 }] },
      ]
    }
  },
  {
    id: 'kuiper_belt',
    name: 'Kuiper Belt Formation',
    description: 'Form a belt of icy planetesimals at the edge of the system.',
    cost: [{ resource: Resource.Rock, amount: 1000 }],
    position: { x: 10, y: 28 },
    effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Rock, value: 2 }, { type: 'ADD_BASE_GENERATION', resource: Resource.Water, value: 1 }],
    icon: 'kuiper_belt',
    dependencies: ['protoplanetary_disk'],
    panelContent: {
        facts: [
            { text: "The Kuiper Belt is a circumstellar disc in the outer Solar System, extending from the orbit of Neptune. It is similar to the asteroid belt, but is far larger and consists mainly of small bodies or remnants from the Solar System's formation composed of ices." }
        ],
        subUpgrades: [
            { id: 'kb_harvesting', name: 'Icy Body Harvesting', description: 'Improve passive generation of Water from the belt.', cost: () => ({ resource: Resource.Water, amount: 1500 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Water, value: 2 }] }
        ]
    }
  },
  {
    id: 'planetary_accretion',
    name: 'Planetary Accretion',
    description: 'Dust grains stick together, forming planetesimals which then collide and grow into planets.',
    cost: [{ resource: Resource.Rock, amount: 50 }],
    position: { x: 40, y: 25 },
    effects: [{ type: 'UNLOCK_KNOBS', value: ['water_formation'] }, { type: 'ADD_BASE_GENERATION', resource: Resource.Water, value: 5 }],
    icon: 'planetary_accretion',
    dependencies: ['protoplanetary_disk'],
    panelContent: {
      facts: [
        { text: "Accretion is the process by which matter gravitationally attracts more matter, growing larger over time. This is how planets form from tiny dust particles." },
        { text: "Runaway accretion occurs when a planetesimal grows large enough that its gravity rapidly pulls in all the material in its orbital path, quickly becoming a planetary embryo.", unlockedBySubUpgradeId: 'pa_runaway_1' }
      ],
      subUpgrades: [
        { id: 'pa_runaway_1', name: 'Runaway Accretion', description: 'Boost the passive generation of Rock.', cost: () => ({ resource: Resource.Rock, amount: 250 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Rock, value: 5 }] },
        { id: 'pa_force_3', name: 'Gravitational Tractor', description: 'Use planetary gravity fields to increase maximum Force.', cost: () => ({ resource: Resource.Rock, amount: 500 }), effects: [{ type: 'INCREASE_MAX_FORCE', value: 15 }] },
      ]
    }
  },
   {
    id: 'planetary_differentiation',
    name: 'Planetary Differentiation',
    description: 'The planet heats up, causing denser materials to sink to the core.',
    cost: [{ resource: Resource.Iron, amount: 1000 }],
    position: { x: 55, y: 22 },
    effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Iron, value: 1 }],
    icon: 'planetary_differentiation',
    dependencies: ['planetary_accretion'],
    panelContent: {
        facts: [
            { text: "Planetary differentiation is the process of separating out different constituents of a planetary body as a consequence of their physical or chemical behavior, where the body develops into compositionally distinct layers; the denser materials sink to the center while less dense materials rise to the surface." }
        ],
        subUpgrades: [
            { id: 'pd_core_formation', name: 'Core Formation', description: 'A stable iron core improves passive Iron generation.', cost: () => ({ resource: Resource.Iron, amount: 2000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Iron, value: 2 }] }
        ]
    }
  },
  {
    id: 'moon_formation',
    name: 'Moon Formation',
    description: 'A large impactor strikes the planet, creating a debris ring that coalesces into a moon.',
    cost: [{ resource: Resource.Rock, amount: 2000 }],
    position: { x: 58, y: 28 },
    effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Rock, value: 3 }],
    icon: 'moon_formation',
    dependencies: ['planetary_accretion'],
    panelContent: {
        facts: [
            { text: "The giant-impact hypothesis suggests that the Moon formed from the ejecta of a collision between the early Earth and a Mars-sized planet, nicknamed Theia." }
        ],
        subUpgrades: [
            { id: 'mf_tidal_forces', name: 'Tidal Forces', description: 'The moon\'s gravity stirs the planet, passively generating a small amount of all planetary resources.', cost: () => ({ resource: Resource.Rock, amount: 3000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Water, value: 1 }] }
        ]
    }
  },
  {
    id: 'cometary_delivery',
    name: 'Cometary Delivery',
    description: 'Harness comets and asteroids to deliver water and organic molecules to the young planet.',
    cost: [{ resource: Resource.Water, amount: 50 }, { resource: Resource.Rock, amount: 250 }],
    position: { x: 65, y: 25 },
    effects: [{ type: 'UNLOCK_KNOBS', value: ['asteroid_mining'] }, { type: 'ADD_BASE_GENERATION', resource: Resource.Water, value: 10 }, { type: 'ADD_BASE_GENERATION', resource: Resource.Carbon, value: 2 }],
    icon: 'cometary_impact',
    dependencies: ['planetary_accretion'],
    panelContent: {
      facts: [
        { text: "Much of Earth's water is thought to have been delivered by icy comets and asteroids that collided with our planet during its early history." },
        {
          text: "In addition to water, comets also carry complex organic molecules, such as amino acids. These impact events may have seeded the early Earth with the chemical building blocks of life.",
          unlockedBySubUpgradeId: 'cd_organics_1',
          quiz: {
            question: "Besides water, what important molecules did comets likely deliver to early Earth?",
            options: ["Heavy metals", "Radioactive isotopes", "Complex organic molecules", "Atmospheric gases"],
            answerIndex: 2
          }
        },
      ],
      subUpgrades: [
        { id: 'cd_water_1', name: 'Ice Harvesting', description: 'Improve passive generation of Water.', cost: () => ({ resource: Resource.Water, amount: 250 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Water, value: 3 }] },
        { id: 'cd_organics_1', name: 'Organic Seeding', description: 'Cometary impacts now also passively generate small amounts of Carbon.', cost: () => ({ resource: Resource.Water, amount: 500 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Carbon, value: 1 }] },
      ]
    }
  },
   {
    id: 'first_oceans',
    name: 'First Oceans',
    description: 'Water vapor condenses, forming vast oceans that cover the planet.',
    cost: [{ resource: Resource.Water, amount: 5000 }],
    position: { x: 88, y: 25 },
    effects: [{ type: 'INCREASE_CAPACITY', resource: Resource.Water, value: 10000 }],
    icon: 'first_oceans',
    dependencies: ['cometary_delivery'],
    panelContent: {
        facts: [
            { text: "The first oceans on Earth were likely hot and acidic. They played a crucial role in dissolving minerals from the crust, creating a nutrient-rich environment for potential life." }
        ],
        subUpgrades: [
            { id: 'fo_hydrological_cycle', name: 'Hydrological Cycle', description: 'A stable water cycle improves passive Water generation.', cost: () => ({ resource: Resource.Water, amount: 7500 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Water, value: 5 }] }
        ]
    }
  },
  {
    id: 'volcanic_activity',
    name: 'Volcanic Activity',
    description: 'Planetary volcanoes release trapped gases and chemicals, shaping the early atmosphere and oceans.',
    cost: [{ resource: Resource.Rock, amount: 800 }, { resource: Resource.Iron, amount: 200 }],
    position: { x: 48, y: 32 },
    effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Carbon, value: 2 }],
    icon: 'volcano',
    dependencies: ['planetary_accretion'],
    panelContent: {
      facts: [
        { text: "Volcanic outgassing was a major source of early Earth's atmosphere, releasing water vapor, carbon dioxide, nitrogen, and other gases from the planet's interior." },
        { text: "The heat and chemicals from volcanoes can create unique environments, such as hot springs and hydrothermal vents, which may have been crucial for the origin of life.", unlockedBySubUpgradeId: 'va_hot_springs' }
      ],
      subUpgrades: [
        { id: 'va_outgassing', name: 'Intensify Outgassing', description: 'Increase passive Carbon generation from volcanoes.', cost: () => ({ resource: Resource.Iron, amount: 400 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Carbon, value: 3 }] },
        { id: 'va_hot_springs', name: 'Cultivate Hot Springs', description: 'Utilize geothermal energy to passively create Primordial Soup.', cost: () => ({ resource: Resource.Water, amount: 800 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.PrimordialSoup, value: 0.5 }] }
      ]
    }
  },
  {
    id: 'plate_tectonics',
    name: 'Plate Tectonics',
    description: 'The planets crust breaks into moving plates, recycling materials and driving geological activity.',
    cost: [{ resource: Resource.Rock, amount: 5000 }],
    position: { x: 60, y: 32 },
    effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Rock, value: 3 }, { type: 'ADD_BASE_GENERATION', resource: Resource.Carbon, value: 1 }],
    icon: 'plate_tectonics',
    dependencies: ['volcanic_activity'],
    panelContent: {
        facts: [
            { text: "Plate tectonics is the theory that Earth's outer shell is divided into several plates that glide over the mantle. This process is responsible for earthquakes, volcanic activity, and the creation of mountain ranges." }
        ],
        subUpgrades: [
            { id: 'pt_subduction', name: 'Subduction Zones', description: 'Efficiently recycling crust boosts passive generation of Carbon and Rock.', cost: () => ({ resource: Resource.Rock, amount: 7500 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Rock, value: 2 }, { type: 'ADD_BASE_GENERATION', resource: Resource.Carbon, value: 2 }] }
        ]
    }
  },
    
  // --- NEW PLANETARY ERA NODES ---
  {
    id: 'late_heavy_bombardment',
    name: 'Late Heavy Bombardment',
    description: 'A period of intense comet and asteroid impacts that reshapes the planet\'s surface.',
    cost: [{ resource: Resource.Rock, amount: 2500 }],
    position: { x: 78, y: 30 },
    effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Rock, value: 5 }],
    icon: 'late_heavy_bombardment',
    dependencies: ['cometary_delivery'],
    panelContent: {
        facts: [{ text: "The Late Heavy Bombardment, which occurred roughly 4.1 to 3.8 billion years ago, may have delivered vast quantities of water and organic compounds to the early Earth." }],
        subUpgrades: [{ id: 'lhb_surface_cracking', name: 'Surface Cracking', description: 'The impacts expose new minerals, improving passive Rock generation.', cost: () => ({ resource: Resource.Rock, amount: 3000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Rock, value: 5 }] }]
    }
  },
  {
    id: 'magnetosphere',
    name: 'Magnetosphere',
    description: 'Generate a planetary magnetic field to shield against stellar wind and cosmic radiation.',
    cost: [{ resource: Resource.Iron, amount: 2500 }],
    position: { x: 55, y: 18 },
    effects: [{ type: 'INCREASE_MAX_FORCE', value: 5 }],
    icon: 'magnetosphere',
    dependencies: ['planetary_differentiation'],
    panelContent: {
        facts: [{ text: "A planet's magnetosphere is crucial for retaining an atmosphere, as it deflects high-energy particles from the star that would otherwise strip it away." }],
        subUpgrades: [{ id: 'mag_deflection', name: 'Strengthen Deflectors', description: 'A stronger field allows for better control, granting more max Force.', cost: () => ({ resource: Resource.Iron, amount: 3000 }), effects: [{ type: 'INCREASE_MAX_FORCE', value: 10 }] }]
    }
  },
  {
    id: 'tide_pools',
    name: 'Tidal Pools',
    description: 'The moon\'s gravity creates coastal pools with wet-dry cycles, ideal for concentrating chemicals.',
    cost: [{ resource: Resource.Water, amount: 3000 }],
    position: { x: 62, y: 35 },
    effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.PrimordialSoup, value: 0.2 }],
    icon: 'tide_pools',
    dependencies: ['moon_formation'],
    panelContent: {
        facts: [{ text: "Tidal pools are considered a strong candidate for the origin of life, as the cycles of wetting and drying could have driven the polymerization of molecules like RNA." }],
        subUpgrades: [{ id: 'tp_concentration', name: 'Chemical Concentration', description: 'Enhance wet-dry cycles to passively generate more Primordial Soup.', cost: () => ({ resource: Resource.Water, amount: 4000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.PrimordialSoup, value: 0.3 }] }]
    }
  },
  {
    id: 'banded_iron_formations',
    name: 'Banded Iron Formations',
    description: 'The first oxygen produced by life rusts the iron in the oceans, creating vast mineral deposits.',
    cost: [{ resource: Resource.Iron, amount: 5000 }],
    position: { x: 92, y: 22 },
    effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Iron, value: 1 }],
    icon: 'banded_iron_formations',
    dependencies: ['first_oceans', 'photosynthesis'],
    panelContent: {
        facts: [{ text: "Banded iron formations are a distinctive type of rock found in Precambrian sedimentary rocks, and their existence points to the Great Oxidation Event." }],
        subUpgrades: [{ id: 'bif_mining', name: 'Iron Sequestration', description: 'Harvesting these iron deposits provides a passive Iron income.', cost: () => ({ resource: Resource.Iron, amount: 6000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Iron, value: 2 }] }]
    }
  },
  {
    id: 'continental_crust',
    name: 'Continental Crust',
    description: 'Form lighter, buoyant continental crust that rises above the oceans.',
    cost: [{ resource: Resource.Rock, amount: 8000 }],
    position: { x: 65, y: 30 },
    effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Rock, value: 2 }],
    icon: 'continental_crust',
    dependencies: ['plate_tectonics'],
    panelContent: {
        facts: [{ text: "Continental crust is less dense than oceanic crust, which is why it 'floats' higher on the mantle, creating the landmasses we know today." }],
        subUpgrades: [{ id: 'cc_weathering', name: 'Crust Weathering', description: 'The erosion of continents provides a passive stream of Rock.', cost: () => ({ resource: Resource.Rock, amount: 10000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Rock, value: 3 }] }]
    }
  },
  {
    id: 'snowball_earth',
    name: 'Snowball Earth',
    description: 'A period of intense global glaciation, challenging early life to survive.',
    cost: [{ resource: Resource.Water, amount: 10000 }],
    position: { x: 90, y: 35 },
    effects: [{ type: 'INCREASE_GENERATION_MULTIPLIER', resource: Resource.Carbon, value: 0.05 }],
    icon: 'snowball_earth',
    dependencies: ['first_oceans'],
    panelContent: {
        facts: [{ text: "The end of 'Snowball Earth' events is thought to have been caused by the buildup of volcanic CO2 in the atmosphere, leading to extreme greenhouse warming." }],
        subUpgrades: [{ id: 'se_recovery', name: 'Volcanic Recovery', description: 'Understanding the recovery from this period boosts Carbon generation.', cost: () => ({ resource: Resource.Carbon, amount: 5000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Carbon, value: 2 }] }]
    }
  },
  {
    id: 'hadean_eon',
    name: 'Hadean Eon',
    description: 'Survive the chaotic first eon of the planet\'s history, characterized by intense heat and impacts.',
    cost: [{ resource: Resource.Rock, amount: 1000 }],
    position: { x: 48, y: 28 },
    effects: [{ type: 'INCREASE_MAX_FORCE', value: 2 }],
    icon: 'hadean_eon',
    dependencies: ['planetary_accretion'],
    panelContent: {
        facts: [{ text: "The Hadean Eon is named after Hades, the Greek god of the underworld, due to the hellish conditions on the early Earth." }],
        subUpgrades: [{ id: 'he_resilience', name: 'Chaotic Resilience', description: 'Mastering chaos grants more max Force.', cost: () => ({ resource: Resource.Rock, amount: 1500 }), effects: [{ type: 'INCREASE_MAX_FORCE', value: 3 }] }]
    }
  },
  {
    id: 'archean_eon',
    name: 'Archean Eon',
    description: 'A new eon dawns as the crust cools and the first life, prokaryotes, appears.',
    cost: [{ resource: Resource.Water, amount: 8000 }],
    position: { x: 92, y: 28 },
    effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.PrimordialSoup, value: 1 }],
    icon: 'archean_eon',
    dependencies: ['first_oceans', 'abiogenesis'],
    panelContent: {
        facts: [{ text: "During the Archean Eon, the atmosphere was still devoid of free oxygen and the sky would have appeared orange from methane haze." }],
        subUpgrades: [{ id: 'ae_prokaryotes', name: 'Prokaryotic Mats', description: 'The first microbial mats begin to enrich the oceans, generating Primordial Soup.', cost: () => ({ resource: Resource.Water, amount: 10000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.PrimordialSoup, value: 1 }] }]
    }
  },

    // --- BIOLOGICAL ERA (Bottom Tier) ---
  {
    id: 'abiogenesis',
    name: 'Abiogenesis',
    description: 'The first spark of life emerges from non-living matter in a primordial soup.',
    cost: [{ resource: Resource.Water, amount: 100 }, { resource: Resource.Carbon, amount: 100 }],
    position: { x: 25, y: 45 },
    effects: [{ type: 'UNLOCK_FEATURE', value: 'synthesis' }, { type: 'UNLOCK_KNOBS', value: ['soup_creation'] }, { type: 'INCREASE_MAX_HANDS', value: 5 }, { type: 'ADD_BASE_GENERATION', resource: Resource.PrimordialSoup, value: 2 }],
    icon: 'abiogenesis',
    dependencies: ['protoplanetary_disk'],
    previewDependencies: ['cosmic_origins'],
    panelContent: {
      facts: [
        { text: "Abiogenesis is the natural process by which life arises from non-living matter, such as simple organic compounds. The exact mechanism is one of the great unsolved mysteries in science." },
        {
          text: "Hydrothermal vents on the ocean floor are a leading hypothesis for the location of abiogenesis. They provide energy, chemical gradients, and mineral catalysts necessary for forming complex organic molecules.",
          unlockedBySubUpgradeId: 'ab_vents_1',
          quiz: {
            question: "What is a leading candidate for the location where life first began?",
            options: ["Surface pools", "The atmosphere", "Deep space", "Hydrothermal vents"],
            answerIndex: 3
          }
        },
      ],
      subUpgrades: [
        { id: 'ab_soup_1', name: 'Rich Chemical Broth', description: 'Improve the passive generation of Primordial Soup.', cost: () => ({ resource: Resource.PrimordialSoup, amount: 50 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.PrimordialSoup, value: 1 }] },
        { id: 'ab_vents_1', name: 'Harness Vents', description: 'Utilize deep sea vents to passively generate Amino Acids.', cost: () => ({ resource: Resource.PrimordialSoup, amount: 200 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.AminoAcids, value: 0.5 }] },
        { id: 'ab_hands_1', name: 'Early Manipulation', description: 'The first stirrings of purpose grant additional max Hands.', cost: () => ({ resource: Resource.PrimordialSoup, amount: 500 }), effects: [{ type: 'INCREASE_MAX_HANDS', value: 5 }] },
      ]
    }
  },
  {
    id: 'atp_coupling',
    name: 'ATP Coupling',
    description: 'Develop ATP as the universal energy currency, fueling cellular processes.',
    cost: [{ resource: Resource.AminoAcids, amount: 20 }],
    position: { x: 35, y: 50 },
    effects: [{ type: 'UNLOCK_KNOBS', value: ['atp_synthesis', 'amino_acid_synthesis'] }, { type: 'ADD_BASE_GENERATION', resource: Resource.AminoAcids, value: 2 }],
    icon: 'atp',
    dependencies: ['abiogenesis'],
     panelContent: {
      facts: [
        { text: "Adenosine triphosphate (ATP) is often called the 'molecular unit of currency' for intracellular energy transfer. It provides the energy for most cellular functions." },
        { text: "The energy from ATP is released when a phosphate group is broken off, turning it into ADP (Adenosine diphosphate). This reaction is coupled with other reactions that require energy.", unlockedBySubUpgradeId: 'ac_cycle_1' }
      ],
      subUpgrades: [
        { id: 'ac_efficiency_1', name: 'ATP Efficiency', description: 'Improve the efficiency of ATP synthesis.', cost: () => ({ resource: Resource.ATP, amount: 50 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.ATP, value: 0.2 }] },
        { id: 'ac_cycle_1', name: 'ADP Recycling', description: 'Passively generate a small amount of ATP from ambient energy.', cost: () => ({ resource: Resource.ATP, amount: 250 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.ATP, value: 0.5 }] },
      ]
    }
  },
  {
    id: 'rna_world',
    name: 'RNA World',
    description: 'Utilize RNA as both a carrier of genetic information and a catalytic enzyme.',
    cost: [{ resource: Resource.ATP, amount: 10 }],
    position: { x: 45, y: 55 },
    effects: [{ type: 'UNLOCK_KNOBS', value: ['nucleotide_synthesis'] }, { type: 'ADD_BASE_GENERATION', resource: Resource.Nucleotides, value: 1 }],
    icon: 'rna',
    dependencies: ['atp_coupling'],
    panelContent: {
      facts: [
        {
          text: "The 'RNA world' hypothesis suggests that life based on RNA predated the current DNA-based world. RNA can both store genetic information, like DNA, and catalyze chemical reactions, like proteins.",
          quiz: {
            question: "What is the central idea of the 'RNA world' hypothesis?",
            options: ["Life was made entirely of energy", "RNA was the first genetic material and catalyst", "All life originated from a single RNA virus", "DNA is a form of RNA"],
            answerIndex: 1
          }
        },
        { text: "Ribozymes are RNA molecules that can catalyze specific biochemical reactions, similar to protein enzymes. Their discovery was crucial evidence supporting the RNA world hypothesis.", unlockedBySubUpgradeId: 'rw_ribozymes_1' }
      ],
      subUpgrades: [
        { id: 'rw_synthesis_1', name: 'Nucleotide Assembly', description: 'Improve passive generation of Nucleotides.', cost: () => ({ resource: Resource.Nucleotides, amount: 100 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Nucleotides, value: 0.5 }] },
        { id: 'rw_ribozymes_1', name: 'Catalytic RNA', description: 'Use Ribozymes to improve Amino Acid passive generation.', cost: () => ({ resource: Resource.Nucleotides, amount: 500 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.AminoAcids, value: 1 }] },
      ]
    }
  },
  {
    id: 'protocell',
    name: 'Protocell',
    description: 'Encase biological machinery within a lipid membrane, creating the first primitive cell.',
    cost: [{ resource: Resource.Nucleotides, amount: 20 }, { resource: Resource.AminoAcids, amount: 40 }],
    position: { x: 55, y: 50 },
    effects: [{ type: 'UNLOCK_FEATURE', value: 'protocell' }, { type: 'ADD_BASE_GENERATION', resource: Resource.ATP, value: 1 }],
    icon: 'protocell',
    dependencies: ['rna_world'],
    // This node opens the protocell panel, so no sub-upgrades here
  },
   {
    id: 'glycolysis',
    name: 'Glycolysis',
    description: 'Develop the first metabolic pathway to break down glucose and produce ATP.',
    cost: [{ resource: Resource.ATP, amount: 50 }],
    position: { x: 65, y: 58 },
    effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'efficiency', value: 10 }],
    icon: 'glycolysis',
    dependencies: ['protocell'],
    // This node opens the protocell panel
  },
  {
    id: 'dna_replication',
    name: 'DNA Replication',
    description: 'Evolve a more stable DNA-based genetic system with reliable replication.',
    cost: [{ resource: Resource.Nucleotides, amount: 75 }],
    position: { x: 75, y: 52 },
    effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 10 }, { type: 'UNLOCK_FEATURE', value: 'chamber_upgrades' }],
    icon: 'dna',
    dependencies: ['glycolysis'],
    // This node opens the protocell panel
  },
   {
    id: 'eukaryotic_cell',
    name: 'Eukaryotic Cell',
    description: 'Develop a cell with a nucleus and other membrane-bound organelles.',
    cost: [{ resource: Resource.Nucleotides, amount: 2000 }, { resource: Resource.AminoAcids, amount: 2000 }],
    position: { x: 80, y: 65 },
    effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 20 }],
    icon: 'eukaryotic_cell',
    dependencies: ['dna_replication'],
    panelContent: {
        facts: [
            { text: "Eukaryotic cells are distinguished by having a membrane-bound nucleus, which houses the cell's genetic material, and other specialized organelles that perform specific functions." }
        ],
        subUpgrades: [
            { id: 'ec_compartmentalization', name: 'Compartmentalization', description: 'Specialized organelles improve the efficiency of all synthesis tasks.', cost: () => ({ resource: Resource.AminoAcids, amount: 3000 }), effects: [{ type: 'INCREASE_MAX_HANDS', value: 5 }] }
        ]
    }
  },
  {
    id: 'endosymbiosis',
    name: 'Endosymbiosis',
    description: 'A prokaryotic cell is engulfed by another, evolving into a mitochondrion and revolutionizing energy production.',
    cost: [{ resource: Resource.ATP, amount: 5000 }],
    position: { x: 85, y: 75 },
    effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.ATP, value: 10 }],
    icon: 'endosymbiosis',
    dependencies: ['eukaryotic_cell'],
    panelContent: {
        facts: [
            { text: "The theory of endosymbiosis proposes that mitochondria and chloroplasts were once free-living prokaryotic organisms that were engulfed by an ancestral eukaryotic cell. This symbiotic relationship became permanent over time." }
        ],
        subUpgrades: [
            { id: 'es_mitochondria', name: 'Mitochondrial Efficiency', description: 'Optimize the new "powerhouse" of the cell to greatly boost passive ATP generation.', cost: () => ({ resource: Resource.ATP, amount: 7500 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.ATP, value: 20 }] }
        ]
    }
  },
  {
    id: 'photosynthesis',
    name: 'Photosynthesis',
    description: 'Develop chloroplasts to harness light energy, producing vast amounts of ATP.',
    cost: [{ resource: Resource.Carbon, amount: 5000 }],
    position: { x: 80, y: 45 },
    effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.ATP, value: 15 }],
    icon: 'photosynthesis',
    dependencies: ['dna_replication'],
    panelContent: {
        facts: [
            { text: "Photosynthesis is the process used by plants, algae, and some bacteria to convert light energy into chemical energy, through a process that converts carbon dioxide and water into sugars and oxygen." }
        ],
        subUpgrades: [
            { id: 'ps_chloroplasts', name: 'Chloroplast Optimization', description: 'Improve the light-capturing ability of chloroplasts, boosting passive ATP generation.', cost: () => ({ resource: Resource.ATP, amount: 6000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.ATP, value: 25 }] }
        ]
    }
  },
  {
    id: 'multicellularity',
    name: 'Multicellularity',
    description: 'Cells begin to cooperate and specialize, forming complex, multicellular organisms.',
    cost: [{ resource: Resource.AminoAcids, amount: 10000 }],
    position: { x: 75, y: 85 },
    effects: [{ type: 'INCREASE_MAX_HANDS', value: 10 }],
    icon: 'multicellularity',
    dependencies: ['endosymbiosis'],
    panelContent: {
        facts: [
            { text: "Multicellularity has evolved independently multiple times in Earth's history. It allows organisms to grow larger and for cells to differentiate and perform specialized functions." }
        ],
        subUpgrades: [
            { id: 'mc_specialization', name: 'Cellular Specialization', description: 'Coordinated cells work more effectively, granting more Max Hands.', cost: () => ({ resource: Resource.AminoAcids, amount: 15000 }), effects: [{ type: 'INCREASE_MAX_HANDS', value: 10 }] }
        ]
    }
  },
    {
    id: 'limitless_manipulation',
    name: 'Collective Consciousness',
    description: 'Develop a hive-mind link between biological units, allowing for unparalleled coordination. Unlocks repeatable upgrades.',
    cost: [{ resource: Resource.AminoAcids, amount: 20000 }],
    position: { x: 75, y: 95 },
    effects: [],
    icon: 'hive_mind',
    dependencies: ['multicellularity'],
    panelContent: {
      facts: [
        { text: "A collective consciousness allows for near-instantaneous communication and task delegation across trillions of individual cells, dramatically increasing manipulative capacity." }
      ],
      subUpgrades: [
        {
          id: 'hands_inf_cap',
          name: 'Expand Hands Limit',
          description: 'Strengthen the psychic link, increasing your maximum Hands capacity.',
          cost: (level) => ({ resource: Resource.AminoAcids, amount: Math.floor(5000 * Math.pow(1.5, level)) }),
          effects: [{ type: 'INCREASE_MAX_HANDS', value: 10 }],
          repeatable: {}
        }
      ]
    }
  },
  {
    id: 'cambrian_explosion',
    name: 'Cambrian Explosion',
    description: 'A sudden burst of evolutionary innovation leads to a wide diversity of complex life forms.',
    cost: [{ resource: Resource.ATP, amount: 15000 }],
    position: { x: 65, y: 80 },
    effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.AminoAcids, value: 0.5 }, { type: 'ADD_BASE_GENERATION', resource: Resource.Nucleotides, value: 0.5 }],
    icon: 'cambrian_explosion',
    dependencies: ['multicellularity'],
    panelContent: {
        facts: [
            { text: "The Cambrian explosion, about 541 million years ago, was a period of rapid diversification of life where most major animal phyla appeared in the fossil record. The cause is a subject of intense scientific debate." }
        ],
        subUpgrades: [
            { id: 'ce_diversity', name: 'Genetic Diversity', description: 'A wider gene pool passively generates all biological resources.', cost: () => ({ resource: Resource.ATP, amount: 20000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.PrimordialSoup, value: 1 }, { type: 'ADD_BASE_GENERATION', resource: Resource.AminoAcids, value: 1 }, { type: 'ADD_BASE_GENERATION', resource: Resource.Nucleotides, value: 1 }] }
        ]
    }
  },
  {
    id: 'nervous_system',
    name: 'Nervous System',
    description: 'Develop a network of specialized cells for transmitting information and coordinating actions.',
    cost: [{ resource: Resource.ATP, amount: 25000 }],
    position: { x: 55, y: 90 },
    effects: [{ type: 'INCREASE_MAX_HANDS', value: 20 }],
    icon: 'nervous_system',
    dependencies: ['cambrian_explosion'],
    panelContent: {
        facts: [
            { text: "The simplest nervous systems, or nerve nets, belong to creatures like jellyfish and sea anemones. More complex nervous systems with brains allow for advanced behaviors, learning, and consciousness." }
        ],
        subUpgrades: [
            { id: 'ns_centralization', name: 'Centralization (Brain)', description: 'A centralized brain provides much finer control, increasing Max Hands.', cost: () => ({ resource: Resource.ATP, amount: 35000 }), effects: [{ type: 'INCREASE_MAX_HANDS', value: 25 }] }
        ]
    }
  },
  {
    id: 'extinction_event',
    name: 'Extinction Event',
    description: 'A catastrophic event wipes out a majority of life, but the survivors repopulate the world with greater resilience.',
    cost: [{ resource: Resource.ATP, amount: 50000 }, { resource: Resource.AminoAcids, amount: 50000 }, { resource: Resource.Nucleotides, amount: 50000 }],
    position: { x: 55, y: 75 },
    effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.ATP, value: 100 }],
    icon: 'extinction_event',
    dependencies: ['cambrian_explosion'],
    panelContent: {
        facts: [
            { text: "There have been five major mass extinctions in Earth's history. While devastating, they also open up ecological niches, allowing for the evolution and diversification of new life forms." }
        ],
        subUpgrades: [
            { id: 'ee_resilience', name: 'Evolutionary Resilience', description: 'Life that survived the cataclysm is stronger, boosting all passive biological generation permanently.', cost: () => ({ resource: Resource.ATP, amount: 100000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.PrimordialSoup, value: 5 }, { type: 'ADD_BASE_GENERATION', resource: Resource.AminoAcids, value: 5 }, { type: 'ADD_BASE_GENERATION', resource: Resource.Nucleotides, value: 5 }, { type: 'ADD_BASE_GENERATION', resource: Resource.ATP, value: 5 }] }
        ]
    }
  },

  // --- OLD "NEW" BIOLOGICAL ERA NODES ---
  {
    id: 'prokaryotic_cell',
    name: 'Prokaryotic Cell',
    description: 'Establish simple cells without a nucleus, which will dominate the planet for eons.',
    cost: [{ resource: Resource.ATP, amount: 100 }],
    position: { x: 60, y: 50 },
    effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.PrimordialSoup, value: 0.5 }],
    icon: 'prokaryotic_cell',
    dependencies: ['protocell'],
    panelContent: {
        facts: [{ text: "Prokaryotes, such as bacteria and archaea, are the most widespread and abundant organisms on Earth, thriving in an incredible diversity of environments." }],
        subUpgrades: [{ id: 'pc_metabolism', name: 'Metabolic Diversity', description: 'Unlock diverse metabolisms, improving Primordial Soup generation.', cost: () => ({ resource: Resource.PrimordialSoup, amount: 1000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.PrimordialSoup, value: 1 }] }]
    }
  },
  {
    id: 'horizontal_gene_transfer',
    name: 'Horizontal Gene Transfer',
    description: 'Allow prokaryotes to exchange genetic material, accelerating evolution.',
    cost: [{ resource: Resource.Nucleotides, amount: 1000 }],
    position: { x: 65, y: 48 },
    effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Nucleotides, value: 0.2 }],
    icon: 'horizontal_gene_transfer',
    dependencies: ['prokaryotic_cell'],
    panelContent: {
        facts: [{ text: "Horizontal gene transfer is a primary reason for the rapid spread of antibiotic resistance among bacteria." }],
        subUpgrades: [{ id: 'hgt_efficiency', name: 'Plasmid Exchange', description: 'Optimize gene sharing to passively generate Nucleotides.', cost: () => ({ resource: Resource.Nucleotides, amount: 1500 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Nucleotides, value: 0.3 }] }]
    }
  },
  {
    id: 'transposons',
    name: 'Transposons',
    description: 'Activate "jumping genes," sequences of DNA that can move and replicate within the genome.',
    cost: [{ resource: Resource.Nucleotides, amount: 3000 }],
    position: { x: 70, y: 60 },
    effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Nucleotides, value: 0.1 }],
    icon: 'transposons',
    dependencies: ['dna_replication'],
    panelContent: {
        facts: [{ text: "Transposons, or 'jumping genes,' make up a large fraction of the genome of many eukaryotes and can be a major driver of genetic variation and evolution." }],
        subUpgrades: [{ id: 'transposon_activity', name: 'Increase Transposition', description: 'Controlled genomic instability provides a small passive generation of Nucleotides.', cost: () => ({ resource: Resource.Nucleotides, amount: 4000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Nucleotides, value: 0.2 }] }]
    }
  },
  {
    id: 'epigenetics',
    name: 'Epigenetics',
    description: 'Develop systems to modify gene expression without changing the DNA sequence itself.',
    cost: [{ resource: Resource.AminoAcids, amount: 5000 }],
    position: { x: 88, y: 68 },
    effects: [{ type: 'INCREASE_MAX_HANDS', value: 5 }],
    icon: 'epigenetics',
    dependencies: ['eukaryotic_cell'],
    panelContent: {
        facts: [{ text: "Epigenetic modifications, such as DNA methylation and histone modification, can be influenced by the environment and are heritable in some cases." }],
        subUpgrades: [{ id: 'epi_control', name: 'Gene Regulation', description: 'Finer control over gene expression grants more Max Hands.', cost: () => ({ resource: Resource.AminoAcids, amount: 6000 }), effects: [{ type: 'INCREASE_MAX_HANDS', value: 10 }] }]
    }
  },
  {
    id: 'rna_interference',
    name: 'RNA Interference',
    description: 'Utilize small RNA molecules to silence specific genes, providing a defense against viruses and regulating the genome.',
    cost: [{ resource: Resource.Nucleotides, amount: 4000 }],
    position: { x: 85, y: 60 },
    effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 5 }],
    icon: 'rna_interference',
    dependencies: ['eukaryotic_cell'],
    panelContent: {
        facts: [{ text: "RNA interference (RNAi) is a powerful tool used by scientists to 'knock down' the expression of specific genes to study their function." }],
        subUpgrades: [{ id: 'rnai_defense', name: 'Viral Defense', description: 'An improved genetic defense system improves protocell resilience.', cost: () => ({ resource: Resource.Nucleotides, amount: 5000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 10 }] }]
    }
  },
  {
    id: 'krebs_cycle',
    name: 'Krebs Cycle',
    description: 'Evolve a more efficient aerobic respiration pathway, generating significantly more ATP.',
    cost: [{ resource: Resource.ATP, amount: 8000 }],
    position: { x: 90, y: 80 },
    effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.ATP, value: 20 }],
    icon: 'krebs_cycle',
    dependencies: ['endosymbiosis'],
    panelContent: {
        facts: [{ text: "The Krebs Cycle (or Citric Acid Cycle) is a central metabolic hub in the cell, and the complete oxidation of one glucose molecule yields about 30-32 ATP molecules." }],
        subUpgrades: [{ id: 'kc_optimization', name: 'Cycle Optimization', description: 'Fine-tuning the Krebs Cycle greatly boosts passive ATP generation.', cost: () => ({ resource: Resource.ATP, amount: 10000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.ATP, value: 30 }] }]
    }
  },
  {
    id: 'homeostasis',
    name: 'Homeostasis',
    description: 'Develop the ability for multicellular organisms to maintain a stable internal environment.',
    cost: [{ resource: Resource.ATP, amount: 12000 }],
    position: { x: 70, y: 90 },
    effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 10 }],
    icon: 'homeostasis',
    dependencies: ['multicellularity'],
    panelContent: {
        facts: [{ text: "Homeostasis is a self-regulating process by which biological systems maintain stability while adjusting to conditions that are optimal for survival." }],
        subUpgrades: [{ id: 'homeo_stability', name: 'Internal Stability', description: 'A stable internal state improves the resilience of all biological units.', cost: () => ({ resource: Resource.ATP, amount: 15000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 10 }] }]
    }
  },
  {
    id: 'sexual_reproduction',
    name: 'Sexual Reproduction',
    description: 'Combine genetic material from two parents to dramatically increase genetic variation.',
    cost: [{ resource: Resource.Nucleotides, amount: 15000 }],
    position: { x: 80, y: 92 },
    effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Nucleotides, value: 1 }],
    icon: 'sexual_reproduction',
    dependencies: ['multicellularity'],
    panelContent: {
        facts: [{ text: "The evolution of sexual reproduction is a major puzzle because it has significant costs (like finding a mate), but its benefit of creating genetic diversity is thought to outweigh them." }],
        subUpgrades: [{ id: 'sr_recombination', name: 'Genetic Recombination', description: 'The constant shuffling of genes provides a passive source of Nucleotides.', cost: () => ({ resource: Resource.Nucleotides, amount: 20000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Nucleotides, value: 2 }] }]
    }
  },
  {
    id: 'hox_genes',
    name: 'HOX Genes',
    description: 'Evolve a set of master control genes that specify the body plan of an embryo.',
    cost: [{ resource: Resource.Nucleotides, amount: 20000 }],
    position: { x: 60, y: 75 },
    effects: [{ type: 'INCREASE_MAX_HANDS', value: 10 }],
    icon: 'hox_genes',
    dependencies: ['cambrian_explosion'],
    panelContent: {
        facts: [{ text: "HOX genes are highly conserved across the animal kingdom, meaning a fly's body-plan gene can function in a mouse, highlighting a shared ancestry." }],
        subUpgrades: [{ id: 'hox_control', name: 'Body Plan Control', description: 'Mastery over body plans allows for more complex manipulation, granting Max Hands.', cost: () => ({ resource: Resource.Nucleotides, amount: 25000 }), effects: [{ type: 'INCREASE_MAX_HANDS', value: 15 }] }]
    }
  },
  {
    id: 'evolution_of_vision',
    name: 'Evolution of Vision',
    description: 'Develop light-sensitive cells, evolving from simple eye-spots to complex, image-forming eyes.',
    cost: [{ resource: Resource.ATP, amount: 30000 }],
    position: { x: 50, y: 85 },
    effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'speed', value: 10 }],
    icon: 'evolution_of_vision',
    dependencies: ['nervous_system'],
    panelContent: {
        facts: [{ text: "The eye has evolved independently in many different lineages, a classic example of convergent evolution, starting from a simple patch of photoreceptor proteins." }],
        subUpgrades: [{ id: 'eov_acuity', name: 'Visual Acuity', description: 'Better vision allows for more effective protocell hunts, improving its speed.', cost: () => ({ resource: Resource.ATP, amount: 40000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'speed', value: 15 }] }]
    }
  },
  {
    id: 'cephalization',
    name: 'Cephalization',
    description: 'Concentrate sensory organs and nerve cells at the anterior end, forming a distinct head and brain.',
    cost: [{ resource: Resource.AminoAcids, amount: 40000 }],
    position: { x: 50, y: 95 },
    effects: [{ type: 'INCREASE_MAX_HANDS', value: 30 }],
    icon: 'cephalization',
    dependencies: ['nervous_system'],
    panelContent: {
        facts: [{ text: "Cephalization is strongly correlated with bilateral symmetry and an organism's ability to move forward and actively hunt or explore." }],
        subUpgrades: [{ id: 'ceph_brain', name: 'Brain Development', description: 'The formation of a complex brain vastly increases your capacity for manipulation.', cost: () => ({ resource: Resource.AminoAcids, amount: 50000 }), effects: [{ type: 'INCREASE_MAX_HANDS', value: 40 }] }]
    }
  },
  // --- NEW MOLECULAR BIOLOGY NODES ---
  {
    id: 'telomere_maintenance',
    name: 'Telomere Maintenance',
    description: 'Develop primitive mechanisms to protect the ends of chromosomes during DNA replication, slightly extending cellular lifespan.',
    cost: [{ resource: Resource.Nucleotides, amount: 4500 }],
    position: { x: 78, y: 56 },
    effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 5 }],
    icon: 'telomere_maintenance',
    dependencies: ['dna_replication'],
    panelContent: { facts: [{ text: "Telomeres are repetitive nucleotide sequences at the end of chromosomes that protect them from deterioration. With each cell division, they shorten, contributing to cellular aging. Early life had to find ways to manage this." }], subUpgrades: [] }
  },
  {
    id: 'antioxidant_defense',
    name: 'Antioxidant Defense',
    description: 'Produce enzymes like catalase and superoxide dismutase to neutralize damaging reactive oxygen species from metabolism.',
    cost: [{ resource: Resource.AminoAcids, amount: 6000 }],
    position: { x: 70, y: 65 },
    effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 5 }],
    icon: 'antioxidant_defense',
    dependencies: ['glycolysis'],
    panelContent: { facts: [{ text: "Reactive oxygen species (ROS) are inevitable byproducts of aerobic respiration. Antioxidants are molecules that can safely interact with these free radicals, preventing them from causing damage to DNA, proteins, and lipids." }], subUpgrades: [] }
  },
  {
    id: 'lipid_metabolism',
    name: 'Lipid Metabolism',
    description: 'Evolve beta-oxidation pathways to break down fatty acids, unlocking a dense and efficient energy source.',
    cost: [{ resource: Resource.ATP, amount: 6500 }],
    position: { x: 72, y: 59 },
    effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'efficiency', value: 10 }],
    icon: 'lipid_metabolism',
    dependencies: ['glycolysis'],
    panelContent: { facts: [{ text: "Fatty acids are a more energy-dense storage molecule than carbohydrates. The ability to metabolize lipids provided a significant advantage, allowing for longer survival between feeding." }], subUpgrades: [] }
  },
  {
    id: 'glycogen_storage',
    name: 'Glycogen Storage',
    description: 'Polymerize glucose into glycogen, creating a readily accessible short-term energy reserve for bursts of activity.',
    cost: [{ resource: Resource.ATP, amount: 5500 }],
    position: { x: 68, y: 62 },
    effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'speed', value: 5 }],
    icon: 'glycogen_storage',
    dependencies: ['glycolysis'],
    panelContent: { facts: [{ text: "Glycogen is a large, branched polymer of glucose that can be quickly broken down to release glucose molecules when energy is needed, making it ideal for rapid metabolic response." }], subUpgrades: [] }
  },
  {
    id: 'evolution_of_lungs',
    name: 'Gas Bladder',
    description: 'Develop an internal bladder for buoyancy control, a precursor to terrestrial lungs for breathing air.',
    cost: [{ resource: Resource.AminoAcids, amount: 12000 }],
    position: { x: 70, y: 85 },
    effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.ATP, value: 5 }],
    icon: 'evolution_of_lungs',
    dependencies: ['multicellularity'],
    panelContent: { facts: [{ text: "The lungs of terrestrial vertebrates and the gas bladders of fish are homologous structures, meaning they share a common evolutionary origin from an out-pocketing of the primitive gut." }], subUpgrades: [] }
  },
  {
    id: 'cellular_homeostasis',
    name: 'Cellular Homeostasis',
    description: 'Develop internal feedback loops to maintain a stable intracellular environment, resisting external fluctuations.',
    cost: [{ resource: Resource.ATP, amount: 7500 }],
    position: { x: 88, y: 80 },
    effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 5 }],
    icon: 'cellular_homeostasis',
    dependencies: ['endosymbiosis'],
    panelContent: { facts: [{ text: "Cellular homeostasis involves a multitude of processes, such as ion pumps and pH buffering, that keep the cell's internal state within a narrow, optimal range for life, even when the external environment changes dramatically." }], subUpgrades: [] }
  },
  {
    id: 'circadian_rhythm',
    name: 'Circadian Rhythm',
    description: 'Evolve an internal molecular clock to anticipate daily environmental changes, like light and temperature cycles.',
    cost: [{ resource: Resource.Nucleotides, amount: 6000 }],
    position: { x: 90, y: 72 },
    effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'efficiency', value: 5 }],
    icon: 'circadian_rhythm',
    dependencies: ['epigenetics'],
    panelContent: { facts: [{ text: "The circadian rhythm is driven by a transcription-translation feedback loop of specific 'clock genes'. This internal pacemaker allows organisms to optimize their metabolism and behavior in sync with the 24-hour day-night cycle." }], subUpgrades: [] }
  },
  {
    id: 'evolution_of_hearing',
    name: 'Vibration Sensing',
    description: 'Develop mechanoreceptors to detect vibrations in the surrounding medium, the first step towards hearing.',
    cost: [{ resource: Resource.ATP, amount: 28000 }],
    position: { x: 48, y: 88 },
    effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'speed', value: 5 }],
    icon: 'evolution_of_hearing',
    dependencies: ['nervous_system'],
    panelContent: { facts: [{ text: "In mammals, the three tiny bones of the middle ear (the malleus, incus, and stapes) evolved from bones that once formed the jaw joint in their reptilian ancestors." }], subUpgrades: [] }
  },
  {
    id: 'chemosensation',
    name: 'Chemosensation',
    description: 'Evolve surface receptors that bind to specific molecules, allowing the organism to "taste" or "smell" its environment.',
    cost: [{ resource: Resource.ATP, amount: 26000 }],
    position: { x: 60, y: 92 },
    effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'efficiency', value: 5 }],
    icon: 'chemosensation',
    dependencies: ['nervous_system'],
    panelContent: { facts: [{ text: "The sense of smell is incredibly ancient and vital. It relies on a vast family of G-protein coupled receptors, one of the largest gene families in most animal genomes." }], subUpgrades: [] }
  },

  // --- NEW BIOCHEMISTRY & EVOLUTION NODES ---
  {
    id: 'protein_folding',
    name: 'Protein Folding',
    description: 'Master the complex process of folding amino acid chains into functional 3D protein structures.',
    dependencies: ['atp_coupling'],
    position: { x: 40, y: 60 },
    cost: [{ resource: Resource.AminoAcids, amount: 250 }, { resource: Resource.ATP, amount: 150 }],
    effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'efficiency', value: 5 }],
    icon: 'protein_folding',
    panelContent: {
        facts: [{ text: "The 'protein folding problem'—predicting a protein's 3D structure from its amino acid sequence—is one of the biggest challenges in biochemistry." }],
        subUpgrades: [{ id: 'pf_chaperones', name: 'Chaperone Proteins', description: 'Utilize specialized proteins to prevent misfolding and aggregation, improving overall cellular efficiency.', cost: () => ({ resource: Resource.AminoAcids, amount: 400 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'efficiency', value: 5 }] }]
    }
  },
  {
    id: 'ribosomes',
    name: 'Ribosome Assembly',
    description: 'Construct molecular machines that translate genetic code from RNA into proteins, the workhorses of the cell.',
    dependencies: ['rna_world'],
    position: { x: 48, y: 65 },
    cost: [{ resource: Resource.Nucleotides, amount: 250 }, { resource: Resource.AminoAcids, amount: 250 }],
    effects: [{ type: 'INCREASE_MAX_HANDS', value: 5 }],
    icon: 'ribosomes',
    panelContent: {
        facts: [{ text: "Ribosomes are found in all known life, from bacteria to humans, underscoring their ancient and fundamental role in biology." }],
        subUpgrades: [{ id: 'rib_polysomes', name: 'Polysome Formation', description: 'Allow multiple ribosomes to translate a single mRNA simultaneously, greatly increasing protein synthesis capacity.', cost: () => ({ resource: Resource.Nucleotides, amount: 500 }), effects: [{ type: 'INCREASE_MAX_HANDS', value: 10 }] }]
    }
  },
  {
    id: 'dna_repair',
    name: 'DNA Repair Mechanisms',
    description: 'Develop enzymatic pathways to correct errors and damage in DNA, ensuring genomic stability.',
    dependencies: ['dna_replication'],
    position: { x: 72, y: 48 },
    cost: [{ resource: Resource.Nucleotides, amount: 1500 }, { resource: Resource.ATP, amount: 1000 }],
    effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 10 }],
    icon: 'dna_repair',
    panelContent: {
        facts: [{ text: "Your cells' DNA repair mechanisms fix thousands of errors every single day, protecting you from mutations that can lead to disease." }],
        subUpgrades: [{ id: 'dr_mismatch', name: 'Mismatch Repair', description: 'Implement a system to correct mismatched base pairs that were missed by proofreading, further boosting resilience.', cost: () => ({ resource: Resource.Nucleotides, amount: 2000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 10 }] }]
    }
  },
  {
    id: 'transcription_factors',
    name: 'Transcription Factors',
    description: 'Evolve proteins that bind to specific DNA sequences to control the rate of transcription, allowing for complex gene regulation.',
    dependencies: ['eukaryotic_cell'],
    position: { x: 88, y: 62 },
    cost: [{ resource: Resource.AminoAcids, amount: 3000 }, { resource: Resource.ATP, amount: 2000 }],
    effects: [{ type: 'INCREASE_MAX_HANDS', value: 10 }],
    icon: 'transcription_factors',
    panelContent: {
        facts: [{ text: "Transcription factors are key to cellular differentiation; they are what makes a muscle cell different from a neuron, even though both have the same DNA." }],
        subUpgrades: [{ id: 'tf_enhancers', name: 'Enhancer Regions', description: 'Utilize distant DNA regions to boost transcription, providing much finer control over gene expression.', cost: () => ({ resource: Resource.Nucleotides, amount: 4000 }), effects: [{ type: 'INCREASE_MAX_HANDS', value: 15 }] }]
    }
  },
  {
    id: 'exoskeleton',
    name: 'Exoskeleton',
    description: 'Develop a hard, external skeleton for protection and support, a key innovation of the Cambrian.',
    dependencies: ['cambrian_explosion'],
    position: { x: 50, y: 80 },
    cost: [{ resource: Resource.Carbon, amount: 20000 }, { resource: Resource.ATP, amount: 10000 }],
    effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 20 }],
    icon: 'exoskeleton',
    panelContent: {
        facts: [{ text: "Arthropods, like insects and crustaceans, owe their incredible success to their versatile chitinous exoskeletons, but must shed them periodically to grow." }],
        subUpgrades: [{ id: 'exo_molting', name: 'Efficient Molting', description: 'Streamline the process of shedding and regrowing the exoskeleton, improving overall resilience.', cost: () => ({ resource: Resource.ATP, amount: 15000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 10 }] }]
    }
  },
  {
    id: 'endoskeleton',
    name: 'Endoskeleton',
    description: 'Develop an internal skeleton of bone and cartilage, allowing for larger body sizes and continuous growth.',
    dependencies: ['hox_genes'],
    position: { x: 65, y: 70 },
    cost: [{ resource: Resource.Rock, amount: 5000 }, { resource: Resource.ATP, amount: 25000 }],
    effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.AminoAcids, value: 5 }],
    icon: 'endoskeleton',
    panelContent: {
        facts: [{ text: "Your own bones are a living tissue constantly being remodeled. They also serve as a storage site for minerals like calcium and produce blood cells in the marrow." }],
        subUpgrades: [{ id: 'endo_marrow', name: 'Bone Marrow', description: 'Develop hematopoietic stem cells within the marrow, creating a steady passive supply of Amino Acids.', cost: () => ({ resource: Resource.ATP, amount: 30000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.AminoAcids, value: 10 }] }]
    }
  },
  {
    id: 'circulatory_system',
    name: 'Circulatory System',
    description: 'Evolve a system of vessels and a pump (a heart) to transport nutrients and oxygen to every cell in a large organism.',
    dependencies: ['multicellularity'],
    position: { x: 75, y: 78 },
    cost: [{ resource: Resource.AminoAcids, amount: 15000 }, { resource: Resource.ATP, amount: 15000 }],
    effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.ATP, value: 20 }],
    icon: 'circulatory_system',
    panelContent: {
        facts: [{ text: "An adult human's blood vessels, if laid end-to-end, would circle the Earth more than twice. This vast network ensures no cell is far from a supply line." }],
        subUpgrades: [{ id: 'cs_heart', name: 'Four-Chambered Heart', description: 'Develop a highly efficient, four-chambered heart that separates oxygenated and deoxygenated blood, boosting ATP generation.', cost: () => ({ resource: Resource.ATP, amount: 20000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.ATP, value: 30 }] }]
    }
  },
  {
    id: 'adaptive_immunity',
    name: 'Adaptive Immunity',
    description: 'Develop a sophisticated immune system with memory, capable of recognizing and targeting specific pathogens.',
    dependencies: ['homeostasis'],
    position: { x: 68, y: 95 },
    cost: [{ resource: Resource.Nucleotides, amount: 25000 }, { resource: Resource.AminoAcids, amount: 25000 }],
    effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 20 }],
    icon: 'adaptive_immunity',
    panelContent: {
        facts: [{ text: "Vaccines work by introducing a harmless part of a pathogen to your adaptive immune system, allowing it to build a 'memory' for a rapid response to future infections." }],
        subUpgrades: [{ id: 'ai_antibodies', name: 'Antibody Production', description: 'Optimize the production of highly specific antibodies, dramatically increasing resilience against environmental threats.', cost: () => ({ resource: Resource.AminoAcids, amount: 30000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 20 }] }]
    }
  },
  
  // --- NEW MOLECULAR BIOLOGY NODES (LEFT SIDE) ---
  {
    id: 'heat_shock_proteins',
    name: 'Heat Shock Proteins',
    description: 'Evolve chaperone proteins that refold other proteins denatured by stress, ensuring survival in harsh conditions.',
    cost: [{ resource: Resource.AminoAcids, amount: 800 }, { resource: Resource.ATP, amount: 500 }],
    position: { x: 30, y: 65 },
    effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 15 }],
    icon: 'heat_shock_proteins',
    dependencies: ['protein_folding'],
    panelContent: {
      facts: [{ text: "Heat shock proteins are named for being produced in response to heat, but they also respond to cold, UV light, and other stresses. They are some of the most highly conserved proteins across all life." }],
      subUpgrades: [{ id: 'hsp_resilience', name: 'Stress Response', description: 'Improve the stress response system, further boosting protocell resilience.', cost: () => ({ resource: Resource.ATP, amount: 1000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 10 }] }]
    }
  },
  {
    id: 'telomerase_enzyme',
    name: 'Telomerase',
    description: 'Evolve an enzyme to lengthen telomeres, counteracting cellular aging and enabling more complex organisms.',
    cost: [{ resource: Resource.Nucleotides, amount: 10000 }, { resource: Resource.ATP, amount: 12000 }],
    position: { x: 45, y: 70 },
    effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 10 }],
    icon: 'telomerase_enzyme',
    dependencies: ['eukaryotic_cell'],
    panelContent: {
      facts: [{ text: "Telomerase is often called the 'immortality enzyme' as it allows cells to divide beyond their normal limit. It's active in stem cells and, unfortunately, most cancer cells." }],
      subUpgrades: [{ id: 'te_extension', name: 'Telomere Extension', description: 'Enhance telomerase activity to further improve protocell resilience.', cost: () => ({ resource: Resource.Nucleotides, amount: 15000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 15 }] }]
    }
  },
  {
    id: 'green_fluorescent_protein',
    name: 'Green Fluorescent Protein',
    description: 'Discover a glowing protein from jellyfish, revolutionizing the ability to observe cellular processes in real time.',
    cost: [{ resource: Resource.AminoAcids, amount: 18000 }, { resource: Resource.ATP, amount: 15000 }],
    position: { x: 40, y: 85 },
    effects: [{ type: 'INCREASE_MAX_HANDS', value: 15 }],
    icon: 'green_fluorescent_protein',
    dependencies: ['multicellularity'],
    panelContent: {
      facts: [{ text: "The discovery of GFP was so significant that its discoverers won the Nobel Prize. It allows scientists to literally watch proteins move inside living cells." }],
      subUpgrades: [{ id: 'gfp_tagging', name: 'Fluorescent Tagging', description: 'Tagging key proteins improves hunting coordination, boosting protocell efficiency.', cost: () => ({ resource: Resource.AminoAcids, amount: 25000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'efficiency', value: 10 }] }]
    }
  },
  {
    id: 'crispr_cas9',
    name: 'CRISPR-Cas9 System',
    description: 'Harness a bacterial immune system for precise genome editing, unlocking unprecedented control over life.',
    cost: [{ resource: Resource.Nucleotides, amount: 40000 }, { resource: Resource.ATP, amount: 35000 }],
    position: { x: 40, y: 95 },
    effects: [{ type: 'INCREASE_MAX_HANDS', value: 50 }],
    icon: 'crispr_cas9',
    dependencies: ['adaptive_immunity'],
    panelContent: {
      facts: [{ text: "CRISPR-Cas9 is a gene-editing tool adapted from a defense mechanism bacteria use to chop up the DNA of invading viruses and store a memory of them." }],
      subUpgrades: [{ id: 'crispr_gRNA', name: 'Guide RNA Synthesis', description: 'Mass production of guide RNAs improves genetic manipulation, passively generating Nucleotides.', cost: () => ({ resource: Resource.ATP, amount: 50000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Nucleotides, value: 10 }] }]
    }
  },
    // --- LATEST BIOLOGY NODES (LEFT SIDE) ---
  {
    id: 'p53_protein',
    name: 'p53 Tumor Suppressor',
    description: 'Evolve a critical transcription factor that halts the cell cycle upon DNA damage, preventing mutations.',
    dependencies: ['dna_repair'],
    position: { x: 30, y: 75 },
    cost: [{ resource: Resource.Nucleotides, amount: 2500 }, { resource: Resource.ATP, amount: 1500 }],
    effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 15 }],
    icon: 'p53_protein',
    panelContent: {
      facts: [{ text: "p53 is called the 'guardian of the genome' for its role in conserving stability by preventing genome mutation. It is mutated and inactivated in over 50% of human cancers." }],
      subUpgrades: [{ id: 'p53_apoptosis', name: 'Trigger Apoptosis', description: 'Enable p53 to trigger programmed cell death in irreparably damaged cells, a vital anti-cancer mechanism.', cost: () => ({ resource: Resource.ATP, amount: 2500 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 15 }] }]
    }
  },
  {
    id: 'opsins',
    name: 'Opsin Proteins',
    description: 'Evolve the family of light-sensitive opsin proteins, the molecular basis for all animal vision.',
    dependencies: ['eukaryotic_cell'],
    position: { x: 30, y: 80 },
    cost: [{ resource: Resource.AminoAcids, amount: 3000 }, { resource: Resource.ATP, amount: 2000 }],
    effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'speed', value: 5 }],
    icon: 'opsins',
    panelContent: {
      facts: [{ text: 'Opsins bind to a chromophore molecule (like retinal, derived from Vitamin A) to become light-sensitive. The combination, called rhodopsin, is the fundamental building block of sight.' }],
      subUpgrades: [{ id: 'ops_color', name: 'Color Vision', description: 'Evolve different types of opsin proteins that are sensitive to different wavelengths of light, allowing for color vision.', cost: () => ({ resource: Resource.ATP, amount: 4000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'speed', value: 10 }] }]
    }
  },
  {
    id: 'hemoglobin',
    name: 'Hemoglobin',
    description: 'Develop a sophisticated protein to efficiently transport oxygen via a circulatory system, enabling higher metabolisms.',
    dependencies: ['circulatory_system'],
    position: { x: 25, y: 85 },
    cost: [{ resource: Resource.Iron, amount: 10000 }, { resource: Resource.ATP, amount: 20000 }],
    effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.ATP, value: 10 }],
    icon: 'hemoglobin',
    panelContent: {
      facts: [{ text: "Hemoglobin's four subunits exhibit cooperative binding: when one iron atom binds an oxygen molecule, the protein's shape changes, making it easier for the other three to bind oxygen." }],
      subUpgrades: [{ id: 'hemo_myo', name: 'Myoglobin', description: 'Develop myoglobin to store oxygen directly in muscle tissue, allowing for longer bursts of activity.', cost: () => ({ resource: Resource.ATP, amount: 25000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.ATP, value: 15 }] }]
    }
  },
  {
    id: 'collagen',
    name: 'Collagen Synthesis',
    description: 'Produce vast quantities of collagen, the main structural protein in the extracellular matrix, forming connective tissues.',
    dependencies: ['multicellularity'],
    position: { x: 35, y: 90 },
    cost: [{ resource: Resource.AminoAcids, amount: 15000 }, { resource: Resource.ATP, amount: 10000 }],
    effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 10 }],
    icon: 'collagen',
    panelContent: {
      facts: [{ text: 'Collagen is the most abundant protein in the animal kingdom, making up as much as 35% of the whole-body protein content. It provides strength and structure to everything from skin to bones.' }],
      subUpgrades: [{ id: 'col_cartilage', name: 'Form Cartilage', description: 'Use specialized collagen to form flexible cartilage, a key component of joints and early skeletons.', cost: () => ({ resource: Resource.AminoAcids, amount: 20000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 15 }] }]
    }
  },
  {
    id: 'aquaporins',
    name: 'Aquaporins',
    description: 'Evolve specialized channel proteins for the rapid and efficient transport of water across the cell membrane.',
    cost: [{ resource: Resource.AminoAcids, amount: 800 }, { resource: Resource.ATP, amount: 500 }],
    position: { x: 20, y: 55 },
    effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Water, value: 5 }],
    icon: 'aquaporins',
    dependencies: ['protocell'],
    panelContent: {
      facts: [{ text: "Aquaporins transport water molecules single-file at a rate of billions per second, while remarkably blocking the passage of even tiny ions like protons." }],
      subUpgrades: [{ id: 'aqp_efficiency', name: 'Gated Channels', description: 'Develop gated aquaporins for better osmosis control, improving Water generation.', cost: () => ({ resource: Resource.ATP, amount: 1000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Water, value: 10 }] }]
    }
  },
  {
    id: 'histone_regulation',
    name: 'Histone Gene Regulation',
    description: 'Use histone proteins to compact DNA into chromatin, enabling complex control over gene expression.',
    cost: [{ resource: Resource.AminoAcids, amount: 5000 }, { resource: Resource.Nucleotides, amount: 5000 }],
    position: { x: 25, y: 65 },
    effects: [{ type: 'INCREASE_MAX_HANDS', value: 10 }],
    icon: 'histone_regulation',
    dependencies: ['eukaryotic_cell'],
    panelContent: {
      facts: [{ text: "If the DNA in a single human cell were stretched out, it would be about 2 meters long. Histones compact it to fit into a nucleus that's only about 6 micrometers in diameter." }],
      subUpgrades: [{ id: 'histone_marks', name: 'Epigenetic Marks', description: 'Develop enzymes to add chemical tags to histones, allowing for finer control of gene silencing and activation.', cost: () => ({ resource: Resource.ATP, amount: 8000 }), effects: [{ type: 'INCREASE_MAX_HANDS', value: 15 }] }]
    }
  },
  {
    id: 'actin_cytoskeleton',
    name: 'Actin Cytoskeleton',
    description: 'Develop a dynamic internal scaffolding of actin filaments, providing structural integrity and enabling cell motility.',
    cost: [{ resource: Resource.AminoAcids, amount: 6000 }, { resource: Resource.ATP, amount: 4000 }],
    position: { x: 20, y: 70 },
    effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'speed', value: 10 }],
    icon: 'actin_cytoskeleton',
    dependencies: ['eukaryotic_cell'],
    panelContent: {
      facts: [{ text: "Actin filaments are in a constant state of flux, with subunits adding to one end and removing from the other, a process called 'treadmilling' that drives cell movement." }],
      subUpgrades: [{ id: 'actin_pseudopods', name: 'Develop Pseudopods', description: 'Use actin polymerization to form pseudopods ("false feet"), significantly improving protocell hunting speed.', cost: () => ({ resource: Resource.ATP, amount: 6000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'speed', value: 15 }] }]
    }
  },
  {
    id: 'myosin_motors',
    name: 'Myosin Motors',
    description: 'Evolve motor proteins that "walk" along actin filaments, powering muscle contraction and intracellular transport.',
    cost: [{ resource: Resource.AminoAcids, amount: 20000 }, { resource: Resource.ATP, amount: 18000 }],
    position: { x: 20, y: 78 },
    effects: [{ type: 'INCREASE_MAX_HANDS', value: 20 }],
    icon: 'myosin_motors',
    dependencies: ['actin_cytoskeleton', 'multicellularity'],
    panelContent: {
      facts: [{ text: "The movement of myosin heads along actin filaments, powered by ATP hydrolysis, is the fundamental molecular mechanism behind all muscle contraction in animals." }],
      subUpgrades: [{ id: 'myosin_transport', name: 'Intracellular Transport', description: 'Use myosin to actively transport vesicles and organelles, boosting max hands.', cost: () => ({ resource: Resource.ATP, amount: 25000 }), effects: [{ type: 'INCREASE_MAX_HANDS', value: 25 }] }]
    }
  }
];

export const INITIAL_RESOURCES: Record<Resource, number> = {
    [Resource.Stardust]: 10,
    [Resource.Hydrogen]: 0,
    [Resource.Carbon]: 0,
    [Resource.Iron]: 0,
    [Resource.Rock]: 0,
    [Resource.Water]: 0,
    [Resource.PrimordialSoup]: 0,
    [Resource.AminoAcids]: 0,
    [Resource.Nucleotides]: 0,
    [Resource.ATP]: 0,
};

export const INITIAL_PROTEIN_LOOT: ProteinLootState = {
  [ProteinLootType.StructuralFragments]: 0,
  [ProteinLootType.CatalyticEnzymes]: 0,
  [ProteinLootType.GeneticMaterial]: 0,
};

export const BASE_STARDUST_GENERATION = 0; // The very first upgrade gives 1/s

export const INITIAL_MAX_FORCE = 0;
export const INITIAL_MAX_HANDS = 0;

export const INITIAL_WORKERS: Record<string, number> = {};
KNOBS.forEach(knob => {
  INITIAL_WORKERS[knob.id] = 0;
});

export const MAP_SCENERY = [
  // Cosmic Era (Top third)
  { x: 15, y: 8, size: 60, rotation: 20, color: 'bg-indigo-500' },
  { x: 80, y: 15, size: 90, rotation: -30, color: 'bg-purple-500' },
  { x: 5, y: 20, size: 150, rotation: 15, color: 'bg-blue-600' },
  { x: 30, y: 10, size: 40, rotation: 50, color: 'bg-indigo-400' },
  { x: 60, y: 5, size: 200, rotation: -10, color: 'bg-purple-600' },
  { x: 95, y: 25, size: 120, rotation: 30, color: 'bg-blue-500' },
  { x: 45, y: 28, size: 70, rotation: -45, color: 'bg-indigo-500' },
  
  // Planetary Era (Middle third)
  { x: 50, y: 50, size: 250, rotation: 10, color: 'bg-blue-500' },
  { x: 10, y: 40, size: 80, rotation: 60, color: 'bg-yellow-500' },
  { x: 85, y: 45, size: 180, rotation: -25, color: 'bg-orange-600' },
  { x: 30, y: 60, size: 50, rotation: 35, color: 'bg-yellow-400' },
  { x: 65, y: 55, size: 110, rotation: 5, color: 'bg-orange-500' },
  { x: 5, y: 58, size: 220, rotation: 20, color: 'bg-blue-600' },
  { x: 90, y: 65, size: 75, rotation: -15, color: 'bg-yellow-500' },
  
  // Biological Era (Bottom third)
  { x: 20, y: 85, size: 100, rotation: 45, color: 'bg-green-500' },
  { x: 90, y: 90, size: 70, rotation: -10, color: 'bg-teal-500' },
  { x: 5, y: 75, size: 60, rotation: -20, color: 'bg-emerald-500' },
  { x: 40, y: 95, size: 160, rotation: 25, color: 'bg-green-600' },
  { x: 70, y: 80, size: 210, rotation: -5, color: 'bg-teal-600' },
  { x: 95, y: 72, size: 45, rotation: 55, color: 'bg-emerald-400' },
  { x: 25, y: 70, size: 130, rotation: -35, color: 'bg-green-500' }
];

export const PROTOCELL_TRAINING_CONFIG: Record<keyof ProtocellState['attributes'], { name: string, description: string, icon: string, cost: (level: number) => { resource: Resource, amount: number } }> = {
    speed: {
        name: 'Speed Training',
        description: 'Improves the protocell\'s ciliary motion, reducing hunt duration.',
        icon: 'speed',
        cost: (level) => ({ resource: Resource.ATP, amount: 20 * Math.pow(1.2, level) })
    },
    efficiency: {
        name: 'Efficiency Training',
        description: 'Optimizes metabolic pathways, increasing resource yield from hunts.',
        icon: 'efficiency',
        cost: (level) => ({ resource: Resource.AminoAcids, amount: 20 * Math.pow(1.25, level) })
    },
    resilience: {
        name: 'Resilience Training',
        description: 'Strengthens the lipid membrane, increasing the chance of surviving harsh environments and findin_g better loot.',
        icon: 'resilience',
        cost: (level) => ({ resource: Resource.Nucleotides, amount: 15 * Math.pow(1.3, level) })
    }
};

export const INITIAL_PROTOCELL_TRAINING_LEVELS: ProtocellState['attributes'] = {
    speed: 1,
    efficiency: 1,
    resilience: 1,
};

export const HUNT_RESULTS: HuntResult[] = [
  { adventure: "The protocell navigated through a dense thicket of polymer chains and found a pocket of catalytic enzymes.", rewards: { [ProteinLootType.CatalyticEnzymes]: 10 } },
  { adventure: "It narrowly avoided being consumed by a larger aggregate, finding some structural fragments in its wake.", rewards: { [ProteinLootType.StructuralFragments]: 15 } },
  { adventure: "A hydrothermal vent provided a surge of energy, revealing a strand of simple genetic material.", rewards: { [ProteinLootType.GeneticMaterial]: 5 } },
  { adventure: "The protocell spent its time in a nutrient-poor region and returned with nothing.", rewards: {} },
  { adventure: "It absorbed a smaller, less complex protocell, harvesting its parts.", rewards: { [ProteinLootType.StructuralFragments]: 8, [ProteinLootType.CatalyticEnzymes]: 3 } },
  { adventure: "The protocell stumbled upon a protected alcove rich in nucleotides, which it wove into genetic material.", rewards: { [ProteinLootType.GeneticMaterial]: 8 } },
  { adventure: "A lucky break! It found a treasure trove of various components left over from a disintegrated lipid vesicle.", rewards: { [ProteinLootType.StructuralFragments]: 5, [ProteinLootType.CatalyticEnzymes]: 5, [ProteinLootType.GeneticMaterial]: 2 } },
  { adventure: "The environment was too harsh. The protocell barely made it back, its membrane damaged.", rewards: {} },
];

export const BASE_RESOURCE_CAPACITIES: Partial<Record<Resource, number>> = {
    [Resource.Hydrogen]: 1000,
    [Resource.Carbon]: 1000,
    [Resource.Iron]: 500,
    [Resource.Rock]: 1000,
    [Resource.Water]: 1000,
    [Resource.PrimordialSoup]: 500,
    [Resource.AminoAcids]: 500,
    [Resource.Nucleotides]: 500,
    [Resource.ATP]: 500,
};

export const CHAMBER_UPGRADES: ChamberUpgrade[] = [
  {
    id: 'structural_reinforcement',
    name: 'Structural Reinforcement',
    description: 'Use fragments to reinforce the chamber walls, improving the base resilience of the protocell.',
    lootType: ProteinLootType.StructuralFragments,
    maxLevel: 10,
    cost: level => 25 * Math.pow(1.5, level),
    effect: level => ({ type: 'ADD_BASE_ATTRIBUTE', attribute: 'resilience', value: level * 2 }),
  },
  {
    id: 'catalytic_infusion',
    name: 'Catalytic Infusion',
    description: 'Infuse the chamber with enzymes, boosting the base efficiency of the protocell.',
    lootType: ProteinLootType.CatalyticEnzymes,
    maxLevel: 10,
    cost: level => 20 * Math.pow(1.6, level),
    effect: level => ({ type: 'ADD_BASE_ATTRIBUTE', attribute: 'efficiency', value: level * 2 }),
  },
  {
    id: 'genetic_sequencing',
    name: 'Genetic Sequencing',
    description: 'Install basic sequencers to better analyze genetic material, improving the base speed of the protocell.',
    lootType: ProteinLootType.GeneticMaterial,
    maxLevel: 10,
    cost: level => 15 * Math.pow(1.7, level),
    effect: level => ({ type: 'ADD_BASE_ATTRIBUTE', attribute: 'speed', value: level * 2 }),
  },
  {
    id: 'loot_scanner_fragments',
    name: 'Fragment Scanner',
    description: 'Tune scanners to find more Structural Fragments during hunts.',
    lootType: ProteinLootType.StructuralFragments,
    maxLevel: 5,
    cost: level => 100 * Math.pow(2, level),
    effect: level => ({ type: 'INCREASE_LOOT_MULTIPLIER', value: 1 + (level * 0.2) }), // Not a real effect type, just for example.
  },
  {
    id: 'loot_scanner_enzymes',
    name: 'Enzyme Scanner',
    description: 'Tune scanners to find more Catalytic Enzymes during hunts.',
    lootType: ProteinLootType.CatalyticEnzymes,
    maxLevel: 5,
    cost: level => 100 * Math.pow(2.2, level),
    effect: level => ({ type: 'INCREASE_LOOT_MULTIPLIER', value: 1 + (level * 0.2) }),
  },
];