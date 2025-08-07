import { Upgrade, Resource } from '../../types';

export const cosmicUpgrades: Upgrade[] = [
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
];
