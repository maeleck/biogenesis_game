
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
        { text: "Studying star clusters helps astronomers understand stellar evolution, as all member stars formed at roughly the same time from the same material.", unlockedBySubUpgradeId: 'sc_evolution' },
        { text: "The intense radiation and stellar winds from massive stars within a young cluster can trigger the formation of new, smaller stars in nearby molecular clouds, a process called sequential star formation.", unlockedBySubUpgradeId: 'sc_gravity_well' },
        { text: "Globular clusters are so old they contain some of the first stars ever formed in a galaxy. Their chemical composition provides a 'fossil record' of the early galactic environment.", unlockedBySubUpgradeId: 'sc_nursery', quiz: { question: "What do globular clusters represent in a galaxy?", options: ["The youngest star populations", "A fossil record of the early galaxy", "The source of dark matter", "Sites of active planet formation"], answerIndex: 1 } }
      ],
      subUpgrades: [
        { id: 'sc_density', name: 'Increase Density', description: 'A denser cluster passively attracts more Stardust.', cost: () => ({ resource: Resource.Stardust, amount: 2000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Stardust, value: 30 }] },
        { id: 'sc_evolution', name: 'Study Stellar Evolution', description: 'Understanding star life cycles boosts Stardust collection efficiency.', cost: () => ({ resource: Resource.Stardust, amount: 4000 }), effects: [{ type: 'INCREASE_GENERATION_MULTIPLIER', resource: Resource.Stardust, value: 0.05 }] },
        { id: 'sc_gravity_well', name: 'Focused Gravity Well', description: "The cluster's collective gravity aids in collecting interstellar gas, boosting Hydrogen generation.", cost: () => ({ resource: Resource.Stardust, amount: 5000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Hydrogen, value: 5 }] },
        { id: 'sc_nursery', name: 'Nursery Expansion', description: 'The vast stellar nursery increases your capacity for storing cosmic elements.', cost: () => ({ resource: Resource.Stardust, amount: 6000 }), effects: [{ type: 'INCREASE_UNIVERSAL_STORAGE', value: 1 }] }
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
        },
        { text: "The CMB was discovered accidentally in 1965 by Arno Penzias and Robert Wilson, who were trying to eliminate 'noise' from a radio antenna. That noise turned out to be the echo of creation.", unlockedBySubUpgradeId: 'cmb_precision' }
      ],
      subUpgrades: [
        { id: 'cmb_fluctuations', name: 'Analyze Anisotropies', description: 'Pinpoint denser regions of primordial matter to improve Stardust collection.', cost: () => ({ resource: Resource.Stardust, amount: 40 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Stardust, value: 30 }] },
        { id: 'cmb_polarization', name: 'Detect B-Modes', description: 'Refine analysis of CMB polarization to boost overall Stardust gain.', cost: () => ({ resource: Resource.Stardust, amount: 100 }), effects: [{ type: 'INCREASE_GENERATION_MULTIPLIER', resource: Resource.Stardust, value: 0.1 }] },
        { id: 'cmb_precision', name: 'Precision Cosmology', description: 'Further precision in CMB mapping allows you to find more primordial Hydrogen.', cost: () => ({ resource: Resource.Stardust, amount: 250 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Hydrogen, value: 1 }] },
        { id: 'cmb_acoustic_peaks', name: 'Analyze Acoustic Peaks', description: 'Studying the peaks in the CMB power spectrum expands your universal storage.', cost: () => ({ resource: Resource.Stardust, amount: 500 }), effects: [{ type: 'INCREASE_UNIVERSAL_STORAGE', value: 1 }] },
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
        { text: "Powerful stellar winds and jets of gas are often ejected from the poles of a protostar, clearing away surrounding material and influencing subsequent planet formation.", unlockedBySubUpgradeId: 'pf_force_1' },
        { text: "T Tauri stars are a class of variable stars that represent a late stage of protostellar evolution, just before they become stable, main-sequence stars like our Sun.", unlockedBySubUpgradeId: 'pf_magnetic_braking' }
      ],
      subUpgrades: [
        { id: 'pf_accel_1', name: 'Accelerated Collapse', description: 'Improve gravitational focusing to get more Hydrogen from Stardust.', cost: () => ({ resource: Resource.Hydrogen, amount: 10 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Hydrogen, value: 1 }] },
        { id: 'pf_force_1', name: 'Focused Force', description: 'Harness stellar winds to increase maximum available Force.', cost: () => ({ resource: Resource.Stardust, amount: 250 }), effects: [{ type: 'INCREASE_MAX_FORCE', value: 5 }] },
        { id: 'pf_magnetic_braking', name: 'Magnetic Braking', description: "Control the protostar's rotation via magnetic fields, increasing Hydrogen capacity.", cost: () => ({ resource: Resource.Hydrogen, amount: 100 }), effects: [{ type: 'INCREASE_CAPACITY', resource: Resource.Hydrogen, value: 500 }] },
        { id: 'pf_heat_efficiency', name: 'Kelvin-Helmholtz Heating', description: "Improve capture of thermal energy from contraction, slightly boosting passive Hydrogen generation.", cost: () => ({ resource: Resource.Hydrogen, amount: 200 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Hydrogen, value: 2 }] }
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
        { text: "The CNO cycle (Carbon-Nitrogen-Oxygen) is a catalytic cycle of fusion reactions that occurs in stars more massive than the Sun, converting hydrogen to helium more efficiently than the proton-proton chain.", unlockedBySubUpgradeId: 'sn_cno_1' },
        { text: "The triple-alpha process is how stars convert helium into carbon. Towards the end of a star's life, three helium nuclei (alpha particles) fuse together in the extreme heat of the core.", unlockedBySubUpgradeId: 'sn_triple_alpha' },
        { text: "A star's 'metallicity' refers to the fraction of its mass that is not hydrogen or helium. It's a key factor in determining if a star can form rocky planets.", unlockedBySubUpgradeId: 'sn_capacity_1' }
      ],
      subUpgrades: [
        { id: 'sn_cno_1', name: 'CNO Cycle Mastery', description: 'Improve the efficiency of Carbon fusion.', cost: () => ({ resource: Resource.Carbon, amount: 25 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Carbon, value: 0.5 }] },
        { id: 'sn_capacity_1', name: 'Elemental Storage', description: 'Increase the storage capacity for Hydrogen and Carbon.', cost: () => ({ resource: Resource.Hydrogen, amount: 500 }), effects: [{ type: 'INCREASE_UNIVERSAL_STORAGE', value: 1 }] },
        { id: 'sn_triple_alpha', name: 'Triple-Alpha Process', description: 'Enhance helium-to-carbon fusion, boosting passive Carbon generation.', cost: () => ({ resource: Resource.Carbon, amount: 100 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Carbon, value: 1 }] },
        { id: 'sn_efficiency', name: 'Fusion Efficiency', description: 'A better understanding of fusion boosts overall Carbon generation.', cost: () => ({ resource: Resource.Carbon, amount: 200 }), effects: [{ type: 'INCREASE_GENERATION_MULTIPLIER', resource: Resource.Carbon, value: 0.1 }] }
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
        { text: "Asymptotic Giant Branch (AGB) stars are evolved, cool, luminous stars. They are a major source of carbon and other elements in the galaxy, which they expel through powerful stellar winds." },
        { text: "The 's-process' (slow neutron capture) occurs in AGB stars, creating about half of the elements heavier than iron, such as strontium and barium.", unlockedBySubUpgradeId: 'agb_s_process' },
        { text: "Thermal pulses are violent helium shell flashes deep inside an AGB star, which drive the 'dredge-up' events that bring newly synthesized elements to the surface.", unlockedBySubUpgradeId: 'agb_dredge' },
        { text: "The carbon-rich dust expelled by AGB stars is a key ingredient in the formation of new stars, planets, and potentially, life.", unlockedBySubUpgradeId: 'agb_dust_cloud' }
      ],
      subUpgrades: [
        { id: 'agb_dredge', name: 'Third Dredge-up', description: 'Enhance thermal pulses to improve passive Carbon generation.', cost: () => ({ resource: Resource.Carbon, amount: 400 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Carbon, value: 3 }] },
        { id: 'agb_s_process', name: 's-process Nucleosynthesis', description: 'Harness slow neutron capture to passively generate small amounts of Iron.', cost: () => ({ resource: Resource.Carbon, amount: 600 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Iron, value: 0.1 }] },
        { id: 'agb_dust_cloud', name: 'Enriched Dust Cloud', description: 'The expelled carbon dust cloud also provides a small passive Stardust income.', cost: () => ({ resource: Resource.Carbon, amount: 800 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Stardust, value: 10 }] },
        { id: 'agb_wind', name: 'Harness Stellar Wind', description: 'Utilize the powerful stellar winds from the AGB star to increase your max Force.', cost: () => ({ resource: Resource.Carbon, amount: 1000 }), effects: [{ type: 'INCREASE_MAX_FORCE', value: 5 }] }
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
        { text: "For a few weeks, a supernova can outshine its entire host galaxy, releasing more energy than our Sun will in its entire 10-billion-year lifetime.", unlockedBySubUpgradeId: 'se_luminosity' },
        { text: "The expanding shell of a supernova, known as a supernova remnant, sweeps up interstellar material and triggers the collapse of molecular clouds, seeding the next generation of stars.", unlockedBySubUpgradeId: 'se_force_2' }
      ],
      subUpgrades: [
        { id: 'se_enrichment_1', name: 'Heavy Element Enrichment', description: 'Improve the efficiency of Iron fusion from stellar remnants.', cost: () => ({ resource: Resource.Iron, amount: 15 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Iron, value: 0.2 }] },
        { id: 'se_force_2', name: 'Shockwave Harnessing', description: 'Utilize the power of cosmic shockwaves to increase max Force.', cost: () => ({ resource: Resource.Carbon, amount: 500 }), effects: [{ type: 'INCREASE_MAX_FORCE', value: 10 }] },
        { id: 'se_luminosity', name: 'Capture Radiance', description: 'Harness the immense light output to boost Stardust collection efficiency.', cost: () => ({ resource: Resource.Iron, amount: 50 }), effects: [{ type: 'INCREASE_GENERATION_MULTIPLIER', resource: Resource.Stardust, value: 0.1 }] },
        { id: 'se_remnant_mining', name: 'Remnant Mining', description: 'Extract valuable elements directly from the supernova remnant, boosting Iron generation.', cost: () => ({ resource: Resource.Iron, amount: 100 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Iron, value: 0.5 }] }
      ]
    }
  },
  {
    id: 'limitless_force',
    name: 'Gravitational Singularity',
    description: 'Harness a localized singularity to vastly increase your command over cosmic forces. Unlocks repeatable upgrades.',
    cost: [{ resource: Resource.Iron, amount: 2500 }],
    position: { x: 72, y: 15 },
    effects: [],
    icon: 'singularity',
    dependencies: ['supernova_explosion'],
    panelContent: {
      facts: [
        { text: "By manipulating spacetime on a small scale, you can create temporary wells of immense gravity, effectively multiplying your available Force." },
        { text: "A true gravitational singularity is a point of infinite density, where the known laws of physics break down. Your control is a pale, yet powerful, imitation.", unlockedBySubUpgradeId: 'force_inf_cap' },
        { text: "The singularity is contained by exotic matter, preventing it from consuming the universe. Its stability is a constant, delicate balance of power.", unlockedBySubUpgradeId: 'force_inf_cap' },
        { text: "Each expansion of the singularity's limit increases its gravitational influence, allowing for more ambitious acts of cosmic engineering.", unlockedBySubUpgradeId: 'force_inf_cap' }
      ],
      subUpgrades: [
        {
          id: 'force_inf_cap',
          name: 'Expand Force Limit',
          description: 'Deepen the singularity, increasing your maximum Force capacity.',
          cost: (level) => ({ resource: Resource.Iron, amount: Math.floor(1000 * Math.pow(1.5, level)) }),
          effects: [{ type: 'INCREASE_MAX_FORCE', value: 10 }],
          repeatable: {}
        },
        {
          id: 'force_inf_efficiency',
          name: 'Singularity Efficiency',
          description: 'Improve your control over the singularity, slightly boosting Iron generation.',
          cost: (level) => ({ resource: Resource.Iron, amount: Math.floor(2000 * Math.pow(1.8, level)) }),
          effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Iron, value: 1 }],
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
        { text: "When two neutron stars in a binary system collide, they create a kilonova. This event is a primary source of r-process elements, like gold and platinum, in the universe." },
        { text: "The 2017 detection of gravitational waves from a neutron star merger (GW170817), followed by observations of its light across the spectrum, heralded the era of multi-messenger astronomy.", unlockedBySubUpgradeId: 'nsc_grav_waves' },
        { text: "A neutron star is so dense that a sugar-cube-sized amount of its material would weigh about 100 million tons on Earth.", unlockedBySubUpgradeId: 'nsc_r_process' },
        { text: "The outcome of a neutron star merger can be a more massive neutron star or, if the combined mass is great enough, a new black hole.", unlockedBySubUpgradeId: 'nsc_force_boost' }
      ],
      subUpgrades: [
        { id: 'nsc_r_process', name: 'Optimize r-process', description: 'Focus the collision energy to significantly boost passive Iron generation.', cost: () => ({ resource: Resource.Iron, amount: 7500 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Iron, value: 10 }] },
        { id: 'nsc_grav_waves', name: 'Harness Gravity Waves', description: "The powerful ripples in spacetime boost the efficiency of Stardust collection.", cost: () => ({ resource: Resource.Iron, amount: 10000 }), effects: [{ type: 'INCREASE_GENERATION_MULTIPLIER', resource: Resource.Stardust, value: 0.1 }] },
        { id: 'nsc_force_boost', name: 'Post-Merger Control', description: "Controlling the chaotic aftermath of the collision grants a massive boost to your maximum Force.", cost: () => ({ resource: Resource.Iron, amount: 12000 }), effects: [{ type: 'INCREASE_MAX_FORCE', value: 20 }] },
        { id: 'nsc_element_spray', name: 'Focused Element Spray', description: "Direct the spray of newly forged elements to also enrich Carbon generation.", cost: () => ({ resource: Resource.Iron, amount: 15000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Carbon, value: 5 }] }
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
        { text: "Galaxies rotate much faster than they should based on their visible mass. This discrepancy is a key piece of evidence for dark matter providing extra gravitational pull.", unlockedBySubUpgradeId: 'dm_rotation_curve' },
        { text: "Leading candidates for dark matter particles are 'WIMPs' (Weakly Interacting Massive Particles), hypothetical particles that interact only through gravity and the weak nuclear force.", unlockedBySubUpgradeId: 'dm_gravity' }
      ],
      subUpgrades: [
        { id: 'dm_rotation_curve', name: 'Analyze Rotation Curves', description: "Observing dark matter's gravitational influence improves Stardust collection efficiency.", cost: () => ({ resource: Resource.Stardust, amount: 5000 }), effects: [{ type: 'INCREASE_GENERATION_MULTIPLIER', resource: Resource.Stardust, value: 0.15 }] },
        { id: 'dm_gravity', name: 'Harness Extra Gravity', description: "Leverage dark matter's gravitational pull to increase your max Force.", cost: () => ({ resource: Resource.Stardust, amount: 7500 }), effects: [{ type: 'INCREASE_MAX_FORCE', value: 10 }] },
        { id: 'dm_clumping', name: 'Observe Gas Clumping', description: "Dark matter's gravity helps clump gas together, passively generating Hydrogen.", cost: () => ({ resource: Resource.Stardust, amount: 10000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Hydrogen, value: 5 }] },
        { id: 'dm_halos', name: 'Map Halos', description: 'Mapping dark matter halos improves the efficiency of all cosmic resource generation.', cost: () => ({ resource: Resource.Stardust, amount: 15000 }), effects: [{ type: 'INCREASE_GENERATION_MULTIPLIER', resource: Resource.Hydrogen, value: 0.05 }, { type: 'INCREASE_GENERATION_MULTIPLIER', resource: Resource.Carbon, value: 0.05 }, { type: 'INCREASE_GENERATION_MULTIPLIER', resource: Resource.Iron, value: 0.05 }] }
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
        { text: "Galaxies are gravitationally bound systems of stars, stellar remnants, interstellar gas, dust, and dark matter. They range from dwarfs with a few hundred million stars to giants with one hundred trillion stars." },
        { text: "There are three main types of galaxies: elliptical, spiral (like our Milky Way), and irregular. Their shape is determined by their formation history, including past collisions.", unlockedBySubUpgradeId: 'gf_efficiency' },
        { text: "Galactic cannibalism is a common process where a large galaxy merges with a smaller companion galaxy through tidal gravitational forces.", unlockedBySubUpgradeId: 'gf_force' },
        { text: "The light from the most distant observable galaxies has traveled for over 13 billion years to reach us, giving us a view of the universe in its infancy.", unlockedBySubUpgradeId: 'gf_storage' }
      ],
      subUpgrades: [
        { id: 'gf_efficiency', name: 'Galactic Efficiency', description: 'Boost passive Hydrogen generation across the galaxy.', cost: () => ({ resource: Resource.Hydrogen, amount: 10000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Hydrogen, value: 10 }] },
        { id: 'gf_force', name: 'Galactic Gravity', description: 'The immense gravity of the entire galaxy provides a large boost to max Force.', cost: () => ({ resource: Resource.Stardust, amount: 75000 }), effects: [{ type: 'INCREASE_MAX_FORCE', value: 25 }] },
        { id: 'gf_storage', name: 'Galactic Volume', description: 'The sheer scale of a galaxy vastly increases your universal storage capacity.', cost: () => ({ resource: Resource.Stardust, amount: 100000 }), effects: [{ type: 'INCREASE_UNIVERSAL_STORAGE', value: 5 }] },
        { id: 'gf_star_formation', name: 'Trigger Starburst', description: 'Trigger a galaxy-wide starburst event, permanently increasing the Stardust generation multiplier.', cost: () => ({ resource: Resource.Stardust, amount: 125000 }), effects: [{ type: 'INCREASE_GENERATION_MULTIPLIER', resource: Resource.Stardust, value: 0.2 }] }
      ]
    }
  },
  
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
        facts: [
          { text: "The Interstellar Medium (ISM) is incredibly tenuous; on average, its density is about one atom per cubic centimeter. It's the raw material for new stars." },
          { text: "The ISM consists of multiple phases: cold, dense molecular clouds where stars are born; warm neutral medium; and a hot, ionized medium heated by supernovae.", unlockedBySubUpgradeId: 'ism_enrichment' },
          { text: "Interstellar dust grains, though only 1% of the ISM's mass, are crucial. They shield molecules from starlight and provide surfaces for chemical reactions to occur.", unlockedBySubUpgradeId: 'ism_dust' },
          { text: "The red color of many nebulae comes from hydrogen gas in the ISM being ionized by nearby hot stars and then emitting light at a specific wavelength (H-alpha).", unlockedBySubUpgradeId: 'ism_hydrogen' }
        ],
        subUpgrades: [
          { id: 'ism_enrichment', name: 'ISM Enrichment', description: 'Seed the medium with heavy elements, improving Stardust generation.', cost: () => ({ resource: Resource.Stardust, amount: 2500 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Stardust, value: 10 }] },
          { id: 'ism_dust', name: 'Cultivate Dust Grains', description: 'Promote dust grain formation to improve Stardust collection efficiency.', cost: () => ({ resource: Resource.Stardust, amount: 3000 }), effects: [{ type: 'INCREASE_GENERATION_MULTIPLIER', resource: Resource.Stardust, value: 0.05 }] },
          { id: 'ism_hydrogen', name: 'Ionize Hydrogen', description: 'Harness ionized gas clouds to passively generate more Hydrogen.', cost: () => ({ resource: Resource.Stardust, amount: 3500 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Hydrogen, value: 3 }] },
          { id: 'ism_molecular_cloud', name: 'Nurture Molecular Clouds', description: 'Develop dense molecular clouds, increasing Hydrogen capacity.', cost: () => ({ resource: Resource.Stardust, amount: 4000 }), effects: [{ type: 'INCREASE_CAPACITY', resource: Resource.Hydrogen, value: 1000 }] }
        ]
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
        facts: [
          { text: "'Planetary nebulae' are a misnomer; they have nothing to do with planets but were named so due to their round, planet-like appearance through early telescopes." },
          { text: "They have very short lives on a cosmic scale, lasting only a few tens of thousands of years before the gas dissipates into the interstellar medium.", unlockedBySubUpgradeId: 'pn_recycling' },
          { text: "The complex and beautiful shapes of planetary nebulae are thought to be caused by stellar winds interacting with the magnetic fields of the central star and any companion stars.", unlockedBySubUpgradeId: 'pn_shaping' },
          { text: "The central star of a planetary nebula is a white dwarf, an extremely hot and dense stellar remnant that ionizes the surrounding gas, causing it to glow.", unlockedBySubUpgradeId: 'pn_white_dwarf', quiz: { question: "What type of star is typically found at the center of a planetary nebula?", options: ["Neutron Star", "Red Giant", "White Dwarf", "Main Sequence Star"], answerIndex: 2 } }
        ],
        subUpgrades: [
          { id: 'pn_recycling', name: 'Nebula Recycling', description: 'Efficiently harvest the ejected shell for more passive Carbon.', cost: () => ({ resource: Resource.Carbon, amount: 1200 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Carbon, value: 2 }] },
          { id: 'pn_shaping', name: 'Magnetic Shaping', description: "Using magnetic fields to shape the nebula increases your control, granting more max Force.", cost: () => ({ resource: Resource.Carbon, amount: 1500 }), effects: [{ type: 'INCREASE_MAX_FORCE', value: 5 }] },
          { id: 'pn_white_dwarf', name: 'Harness Dwarf Radiation', description: "The central white dwarf's intense radiation improves Stardust generation.", cost: () => ({ resource: Resource.Carbon, amount: 1800 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Stardust, value: 15 }] },
          { id: 'pn_expansion', name: 'Capture Expanding Gas', description: "Capturing the expanding gas shell increases your Carbon storage.", cost: () => ({ resource: Resource.Carbon, amount: 2000 }), effects: [{ type: 'INCREASE_CAPACITY', resource: Resource.Carbon, value: 1000 }] }
        ]
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
        facts: [
          { text: "Gravitational lensing provides strong evidence for both General Relativity and the existence of dark matter by observing how mass warps spacetime." },
          { text: "When a foreground star perfectly aligns with a background star, it can create a beautiful 'Einstein Ring', a circular image of the background star.", unlockedBySubUpgradeId: 'gl_focusing' },
          { text: "Microlensing is a technique that uses this effect to detect exoplanets. A planet passing in front of a background star causes a brief, detectable brightening of its light.", unlockedBySubUpgradeId: 'gl_microlensing' },
          { text: "Strong lensing can create multiple, distorted images of the same distant galaxy, allowing astronomers to see objects that would otherwise be too faint.", unlockedBySubUpgradeId: 'gl_force' }
        ],
        subUpgrades: [
          { id: 'gl_focusing', name: 'Lensing Focus', description: 'Refine your observations to further boost Stardust generation efficiency.', cost: () => ({ resource: Resource.Stardust, amount: 10000 }), effects: [{ type: 'INCREASE_GENERATION_MULTIPLIER', resource: Resource.Stardust, value: 0.1 }] },
          { id: 'gl_microlensing', name: 'Microlensing Surveys', description: 'Conducting surveys for small lensing events helps locate planetary materials, boosting Rock generation.', cost: () => ({ resource: Resource.Stardust, amount: 12000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Rock, value: 2 }] },
          { id: 'gl_force', name: 'Spacetime Mastery', description: "A deeper understanding of gravity's effect on light enhances your max Force.", cost: () => ({ resource: Resource.Stardust, amount: 15000 }), effects: [{ type: 'INCREASE_MAX_FORCE', value: 10 }] },
          { id: 'gl_mapping', name: 'Dark Matter Mapping', description: 'Use lensing to map dark matter, improving passive Hydrogen collection.', cost: () => ({ resource: Resource.Stardust, amount: 18000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Hydrogen, value: 5 }] }
        ]
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
        facts: [
          { text: "During this epoch, the 'cosmic dark ages' ended as the universe became transparent to ultraviolet light for the first time." },
          { text: "This process was not instantaneous but happened in 'bubbles' of ionized hydrogen that grew around the first stars and quasars until they overlapped and filled the entire universe.", unlockedBySubUpgradeId: 're_efficiency' },
          { text: "Astronomers study reionization by looking for the 'Gunn-Peterson trough' in the spectra of distant quasars, an absorption feature caused by the neutral hydrogen that existed before this epoch.", unlockedBySubUpgradeId: 're_multiplier' },
          { text: "The James Webb Space Telescope is a key instrument for studying this era, as it is powerful enough to see the very first galaxies that drove reionization.", unlockedBySubUpgradeId: 're_capacity' }
        ],
        subUpgrades: [
          { id: 're_efficiency', name: 'Reionization Efficiency', description: 'Harness the energy of reionization to passively generate Hydrogen.', cost: () => ({ resource: Resource.Hydrogen, amount: 7500 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Hydrogen, value: 5 }] },
          { id: 're_multiplier', name: 'First Light Analysis', description: 'Studying the first light boosts overall Stardust generation.', cost: () => ({ resource: Resource.Hydrogen, amount: 10000 }), effects: [{ type: 'INCREASE_GENERATION_MULTIPLIER', resource: Resource.Stardust, value: 0.1 }] },
          { id: 're_capacity', name: 'Cosmic Clarity', description: 'The now-transparent universe allows for better containment, increasing Hydrogen capacity.', cost: () => ({ resource: Resource.Hydrogen, amount: 12000 }), effects: [{ type: 'INCREASE_CAPACITY', resource: Resource.Hydrogen, value: 2000 }] },
          { id: 're_force', name: 'Harness Photon Pressure', description: 'Use the immense photon pressure from the first stars to increase max Force.', cost: () => ({ resource: Resource.Hydrogen, amount: 15000 }), effects: [{ type: 'INCREASE_MAX_FORCE', value: 10 }] }
        ]
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
        facts: [
          { text: "Nearly every large galaxy, including our own Milky Way, is thought to have a supermassive black hole at its center, some with billions of times the Sun's mass." },
          { text: "Sagittarius A* (pronounced 'A-star') is the name of the supermassive black hole at the center of the Milky Way. Its image was first captured by the Event Horizon Telescope collaboration in 2022.", unlockedBySubUpgradeId: 'smbh_gravity_well' },
          { text: "AGN (Active Galactic Nucleus) feedback is a process where energy from a supermassive black hole's accretion disk heats and expels gas from a galaxy, regulating or even stopping star formation.", unlockedBySubUpgradeId: 'smbh_accretion' },
          { text: "The origin of supermassive black holes is still a topic of debate, with theories ranging from the collapse of the first massive stars to direct collapse of primordial gas clouds.", unlockedBySubUpgradeId: 'smbh_multiplier' }
        ],
        subUpgrades: [
          { id: 'smbh_gravity_well', name: 'Deepen Gravity Well', description: 'The intense gravity provides a significant boost to max Force.', cost: () => ({ resource: Resource.Iron, amount: 75000 }), effects: [{ type: 'INCREASE_MAX_FORCE', value: 30 }] },
          { id: 'smbh_accretion', name: 'Harness Accretion Disk', description: 'The matter swirling into the black hole generates intense radiation, which can be harnessed for Stardust.', cost: () => ({ resource: Resource.Iron, amount: 100000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Stardust, value: 50 }] },
          { id: 'smbh_multiplier', name: 'Gravitational Dominance', description: "The SMBH's dominance improves the collection efficiency of all cosmic elements.", cost: () => ({ resource: Resource.Iron, amount: 125000 }), effects: [{ type: 'INCREASE_GENERATION_MULTIPLIER', resource: Resource.Iron, value: 0.1 }] },
          { id: 'smbh_storage', name: 'Spacetime Warping', description: "Warping spacetime around the black hole increases your universal storage capacity.", cost: () => ({ resource: Resource.Iron, amount: 150000 }), effects: [{ type: 'INCREASE_UNIVERSAL_STORAGE', value: 5 }] }
        ]
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
        facts: [
          { text: "Quasars are powered by matter falling into a supermassive black hole and can outshine their entire host galaxy." },
          { text: "Because of their immense distance, the light from quasars we see today left them when the universe was very young. They are a window into the ancient cosmos.", unlockedBySubUpgradeId: 'quasar_jets' },
          { text: "The term 'quasar' is short for 'quasi-stellar radio source' because they were first detected as powerful radio sources that appeared star-like in optical telescopes.", unlockedBySubUpgradeId: 'quasar_multiplier' },
          { text: "Quasars are so bright they can be used as 'standard candles' to measure the expansion of the universe and probe the composition of intergalactic space.", unlockedBySubUpgradeId: 'quasar_force' }
        ],
        subUpgrades: [
          { id: 'quasar_jets', name: 'Harness Relativistic Jets', description: 'Channel the quasar\'s immense energy output to boost Stardust generation.', cost: () => ({ resource: Resource.Stardust, amount: 150000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Stardust, value: 150 }] },
          { id: 'quasar_multiplier', name: 'Universal Beacon', description: "The quasar's light illuminates the cosmos, improving the generation efficiency of all resources.", cost: () => ({ resource: Resource.Stardust, amount: 200000 }), effects: [{ type: 'INCREASE_GENERATION_MULTIPLIER', resource: Resource.Stardust, value: 0.2 }] },
          { id: 'quasar_force', name: 'Jet Pressure', description: "The immense pressure from the quasar's jets provides a massive boost to max Force.", cost: () => ({ resource: Resource.Stardust, amount: 250000 }), effects: [{ type: 'INCREASE_MAX_FORCE', value: 50 }] },
          { id: 'quasar_enrichment', name: 'Galactic Enrichment', description: 'The quasar enriches the entire galaxy, boosting Hydrogen and Iron generation.', cost: () => ({ resource: Resource.Stardust, amount: 300000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Hydrogen, value: 20 }, { type: 'ADD_BASE_GENERATION', resource: Resource.Iron, value: 10 }] }
        ]
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
        facts: [
          { text: "Dark energy is believed to make up about 68% of the universe's total energy density, dominating over both dark and normal matter." },
          { text: "Unlike gravity, dark energy is a repulsive force that pushes spacetime apart. Its discovery, which won the 2011 Nobel Prize in Physics, was a complete shock to the scientific community.", unlockedBySubUpgradeId: 'de_understanding' },
          { text: "The leading model for dark energy is the 'cosmological constant,' a constant energy density that fills space homogeneously, first proposed and then discarded by Einstein.", unlockedBySubUpgradeId: 'de_expansion' },
          { text: "The existence of dark energy points towards a 'Big Freeze' or 'Heat Death' as the ultimate fate of the universe, where it expands forever until it becomes too cold to sustain life.", unlockedBySubUpgradeId: 'de_force' }
        ],
        subUpgrades: [
          { id: 'de_understanding', name: 'Cosmological Constant', description: 'A deeper understanding of dark energy boosts all Stardust acquisition.', cost: () => ({ resource: Resource.Stardust, amount: 120000 }), effects: [{ type: 'INCREASE_GENERATION_MULTIPLIER', resource: Resource.Stardust, value: 0.1 }] },
          { id: 'de_expansion', name: 'Harness Expansion', description: "Harness the universe's expansion to passively generate more Stardust.", cost: () => ({ resource: Resource.Stardust, amount: 150000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Stardust, value: 50 }] },
          { id: 'de_force', name: 'Repulsive Force', description: "Manipulate the repulsive force of dark energy to grant a bonus to max Force.", cost: () => ({ resource: Resource.Stardust, amount: 200000 }), effects: [{ type: 'INCREASE_MAX_FORCE', value: 20 }] },
          { 
            id: 'de_inf_storage', 
            name: 'Spacetime Pockets', 
            description: 'Use dark energy to create small pockets of expanded spacetime, increasing the base capacity of all non-Stardust resources by 10%.', 
            cost: (level) => ({ resource: Resource.Stardust, amount: Math.floor(100000 * Math.pow(1.5, level)) }), 
            effects: [{ type: 'INCREASE_UNIVERSAL_STORAGE', value: 0.1 }],
            repeatable: {}
          }
        ]
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
        facts: [
          { text: "Galaxies form and cluster at the intersections of the cosmic web's filaments, like cities on a vast, invisible highway system." },
          { text: "The vast, empty regions between the filaments are known as cosmic voids. They are incredibly under-dense and contain very few galaxies.", unlockedBySubUpgradeId: 'cw_filaments' },
          { text: "The structure of the cosmic web is a direct result of the tiny quantum fluctuations in the very early universe, which were stretched to cosmic scales by inflation.", unlockedBySubUpgradeId: 'cw_mapping' },
          { text: "Large-scale computer simulations, such as the Millennium Simulation, have been crucial in visualizing the cosmic web and understanding how it formed under the influence of gravity and dark matter.", unlockedBySubUpgradeId: 'cw_storage' }
        ],
        subUpgrades: [
          { id: 'cw_filaments', name: 'Trace Filaments', description: 'Tracing the gas in cosmic filaments improves passive Hydrogen generation.', cost: () => ({ resource: Resource.Hydrogen, amount: 50000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Hydrogen, value: 20 }] },
          { id: 'cw_mapping', name: 'Web Mapping', description: 'Mapping the entire web improves the collection efficiency of all cosmic resources.', cost: () => ({ resource: Resource.Stardust, amount: 100000 }), effects: [{ type: 'INCREASE_GENERATION_MULTIPLIER', resource: Resource.Stardust, value: 0.15 }] },
          { id: 'cw_storage', name: 'Exploit Voids', description: 'Understanding the vast voids of space expands your universal storage capacity.', cost: () => ({ resource: Resource.Stardust, amount: 125000 }), effects: [{ type: 'INCREASE_UNIVERSAL_STORAGE', value: 10 }] },
          { id: 'cw_highways', name: 'Galactic Highways', description: 'Use the filaments as highways to funnel Stardust to your location.', cost: () => ({ resource: Resource.Stardust, amount: 150000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Stardust, value: 75 }] }
        ]
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
        facts: [
          { text: "Galactic mergers often result in the formation of a much larger elliptical galaxy and can trigger the rapid growth of the central supermassive black hole." },
          { text: "Our own Milky Way is on a collision course with the Andromeda galaxy, and they are expected to merge in about 4.5 billion years to form a new galaxy dubbed 'Milkomeda'.", unlockedBySubUpgradeId: 'gm_starburst' },
          { text: "During a merger, individual stars rarely collide because the distances between them are so vast. Instead, they are pulled into new orbits by the combined gravitational fields.", unlockedBySubUpgradeId: 'gm_force' },
          { text: "The collision compresses huge clouds of interstellar gas, triggering a 'starburst'—a period of intense star formation at a rate hundreds of times higher than normal.", unlockedBySubUpgradeId: 'gm_bonus', quiz: { question: "What is the primary result of gas cloud compression during a galactic merger?", options: ["A starburst event", "The formation of a quasar", "The destruction of all stars", "A decrease in gravity"], answerIndex: 0 } }
        ],
        subUpgrades: [
          { id: 'gm_starburst', name: 'Starburst Galaxy', description: 'The intense star formation significantly boosts Stardust generation.', cost: () => ({ resource: Resource.Stardust, amount: 250000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Stardust, value: 100 }] },
          { id: 'gm_force', name: 'Tidal Force Control', description: "Harnessing the immense tidal forces of the merger grants a huge boost to max Force.", cost: () => ({ resource: Resource.Stardust, amount: 300000 }), effects: [{ type: 'INCREASE_MAX_FORCE', value: 50 }] },
          { id: 'gm_bonus', name: 'Elemental Infusion', description: "The merger creates a massive infusion of all elements.", cost: () => ({ resource: Resource.Stardust, amount: 350000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Hydrogen, value: 20 }, { type: 'ADD_BASE_GENERATION', resource: Resource.Carbon, value: 10 }, { type: 'ADD_BASE_GENERATION', resource: Resource.Iron, value: 5 }] },
          { id: 'gm_efficiency', name: 'Merger Efficiency', description: 'Studying the merger process boosts the generation efficiency of all cosmic resources.', cost: () => ({ resource: Resource.Stardust, amount: 400000 }), effects: [{ type: 'INCREASE_GENERATION_MULTIPLIER', resource: Resource.Stardust, value: 0.1 }, { type: 'INCREASE_GENERATION_MULTIPLIER', resource: Resource.Hydrogen, value: 0.1 }, { type: 'INCREASE_GENERATION_MULTIPLIER', resource: Resource.Carbon, value: 0.1 }] }
        ]
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
        facts: [
          { text: "Population III stars were the first stars, theorized to be extremely massive and short-lived, and responsible for creating the first heavy elements." },
          { text: "These stars were 'metal-free', composed only of the light elements created in the Big Bang (hydrogen, helium, and a tiny amount of lithium).", unlockedBySubUpgradeId: 'p3_enrichment' },
          { text: "Because of their immense mass, they burned through their fuel in only a few million years before exploding as powerful supernovae, seeding the universe with the first 'metals'.", unlockedBySubUpgradeId: 'p3_supernova' },
          { text: "No Population III stars have ever been directly observed, as they are too distant and ancient, but their effects can be seen in the chemical composition of later generations of stars.", unlockedBySubUpgradeId: 'p3_efficiency' }
        ],
        subUpgrades: [
          { id: 'p3_enrichment', name: 'First Enrichment', description: 'The death of these first stars provides a small passive income of Carbon.', cost: () => ({ resource: Resource.Hydrogen, amount: 1500 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Carbon, value: 0.1 }] },
          { id: 'p3_supernova', name: 'First Supernovae', description: 'The supernovae of these first stars provide a passive income of Iron.', cost: () => ({ resource: Resource.Hydrogen, amount: 2000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Iron, value: 0.05 }] },
          { id: 'p3_efficiency', name: 'Pristine Fusion', description: 'The pure hydrogen fuel of these stars burns very efficiently, boosting Hydrogen generation.', cost: () => ({ resource: Resource.Hydrogen, amount: 2500 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Hydrogen, value: 5 }] },
          { id: 'p3_force', name: 'Primal Force', description: 'Harness the raw power of the first stars to increase max Force.', cost: () => ({ resource: Resource.Hydrogen, amount: 3000 }), effects: [{ type: 'INCREASE_MAX_FORCE', value: 10 }] }
        ]
    }
  },
];
