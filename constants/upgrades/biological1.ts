import { Upgrade, Resource } from '../../types';

export const biologicalUpgrades1: Upgrade[] = [
  {
    id: 'abiogenesis',
    name: 'Abiogenesis',
    description: 'The first spark of life emerges from non-living matter in a primordial soup.',
    cost: [{ resource: Resource.Water, amount: 100 }, { resource: Resource.Carbon, amount: 100 }],
    position: { x: 40, y: 48 },
    effects: [{ type: 'UNLOCK_FEATURE', value: 'synthesis' }, { type: 'UNLOCK_KNOBS', value: ['soup_creation'] }, { type: 'INCREASE_MAX_HANDS', value: 5 }, { type: 'ADD_BASE_GENERATION', resource: Resource.PrimordialSoup, value: 2 }],
    icon: 'abiogenesis',
    dependencies: ['protoplanetary_disk'],
    previewDependencies: ['cosmic_origins'],
    panelContent: {
      facts: [
        { 
          text: "Abiogenesis is the natural process by which life arises from non-living matter, such as simple organic compounds. The exact mechanism is one of the great unsolved mysteries in science.",
          quiz: {
            question: "What is the definition of Abiogenesis?",
            options: ["Life arriving from another planet", "The evolution of complex animals", "Life arising from non-living matter", "The process of creating stars"],
            answerIndex: 2
          }
        },
        {
          text: "Hydrothermal vents on the ocean floor are a leading hypothesis for the location of abiogenesis. They provide energy, chemical gradients, and mineral catalysts necessary for forming complex organic molecules.",
          unlockedBySubUpgradeId: 'ab_vents_1',
          quiz: {
            question: "What is a leading candidate for the location where life first began?",
            options: ["Surface pools", "The atmosphere", "Deep space", "Hydrothermal vents"],
            answerIndex: 3
          }
        },
        { 
          text: "The Miller-Urey experiment in 1952 showed that amino acids could form spontaneously from inorganic precursors under conditions mimicking early Earth, supporting the idea of a 'primordial soup'.", 
          unlockedBySubUpgradeId: 'ab_soup_1',
          quiz: {
            question: "What did the famous Miller-Urey experiment demonstrate?",
            options: ["The existence of DNA", "That amino acids could form spontaneously on early Earth", "The first cells could photosynthesize", "That life came from Mars"],
            answerIndex: 1
          }
        },
        { 
          text: "Another hypothesis, 'metabolism-first', suggests that self-sustaining networks of chemical reactions emerged first, and were later enclosed in cells, rather than genetic molecules like RNA appearing first.", 
          unlockedBySubUpgradeId: 'ab_catalysis',
          quiz: {
            question: "What is the core idea of the 'metabolism-first' hypothesis for the origin of life?",
            options: ["Genetic code appeared before anything else", "Life was delivered to Earth by meteors", "Self-sustaining chemical reactions came before cells or genetics", "All life required oxygen from the start"],
            answerIndex: 2
          }
        },
        { 
          text: "Montmorillonite clay, a product of weathered volcanic ash, has been shown in experiments to dramatically accelerate the formation of RNA vesicles, simultaneously forming both a container and its genetic contents.", 
          unlockedBySubUpgradeId: 'ab_polymerization',
          quiz: {
            question: "What role can montmorillonite clay play in the origin of life?",
            options: ["It acts as a source of energy", "It can accelerate the formation of RNA vesicles", "It breaks down organic molecules", "It creates a protective shield from radiation"],
            answerIndex: 1
          }
        }
      ],
      subUpgrades: [
        { id: 'ab_soup_1', name: 'Rich Chemical Broth', description: 'Improve the passive generation of Primordial Soup.', cost: () => ({ resource: Resource.PrimordialSoup, amount: 50 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.PrimordialSoup, value: 1 }] },
        { id: 'ab_vents_1', name: 'Harness Vents', description: 'Utilize deep sea vents to passively generate Amino Acids.', cost: () => ({ resource: Resource.PrimordialSoup, amount: 200 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.AminoAcids, value: 0.5 }] },
        { id: 'ab_hands_1', name: 'Early Manipulation', description: 'The first stirrings of purpose grant additional max Hands.', cost: () => ({ resource: Resource.PrimordialSoup, amount: 500 }), effects: [{ type: 'INCREASE_MAX_HANDS', value: 5 }] },
        { id: 'ab_catalysis', name: 'Mineral Catalysis', description: 'Use mineral surfaces to catalyze reactions, improving Amino Acid generation.', cost: () => ({ resource: Resource.PrimordialSoup, amount: 350 }), effects: [{ type: 'INCREASE_GENERATION_MULTIPLIER', resource: Resource.AminoAcids, value: 0.1 }] },
        { id: 'ab_polymerization', name: 'Surface Polymerization', description: 'Use clay surfaces to drive the polymerization of nucleotides into the first RNA strands.', cost: () => ({ resource: Resource.PrimordialSoup, amount: 750 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Nucleotides, value: 0.2 }] }
      ]
    }
  },
  {
    id: 'aquaporins',
    name: 'Aquaporins',
    description: 'Develop protein channels to facilitate the rapid transport of water across cell membranes.',
    cost: [{ resource: Resource.AminoAcids, amount: 200 }],
    position: { x: 10, y: 38 },
    effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'efficiency', value: 3 }],
    icon: 'aquaporins',
    dependencies: ['abiogenesis'],
    panelContent: {
      facts: [
        { 
          text: "Aquaporins are channel proteins that form pores in the membrane of biological cells, mainly facilitating transport of water between cells. They are vital for maintaining osmotic balance.",
          quiz: {
            question: "What is the main function of aquaporins?",
            options: ["To produce energy", "To transport water across cell membranes", "To store genetic information", "To provide structural support"],
            answerIndex: 1
          }
        },
        { 
          text: "A single aquaporin channel can facilitate the transport of up to 3 billion water molecules per second, a rate far faster than simple diffusion across the membrane.", 
          unlockedBySubUpgradeId: 'aq_efficiency',
          quiz: {
            question: "How fast can an aquaporin channel transport water molecules?",
            options: ["A few hundred per second", "About a million per second", "Up to 3 billion per second", "It is slower than diffusion"],
            answerIndex: 2
          }
        }
      ],
      subUpgrades: [
        { id: 'aq_efficiency', name: 'Water Transport', description: 'Faster water transport improves protocell efficiency.', cost: () => ({ resource: Resource.ATP, amount: 100 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'efficiency', value: 5 }] },
        { id: 'aq_gating', name: 'Selective Gating', description: 'Prevent unwanted molecules from passing through the channel, improving resilience.', cost: () => ({ resource: Resource.AminoAcids, amount: 250 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 5 }] }
      ]
    }
  },
  {
    id: 'histone_gene_regulation',
    name: 'Histone Gene Regulation',
    description: 'Evolve histone proteins to package DNA into chromatin, regulating gene expression.',
    cost: [{ resource: Resource.AminoAcids, amount: 300 }],
    position: { x: 15, y: 43 },
    effects: [{ type: 'INCREASE_MAX_HANDS', value: 2 }],
    icon: 'histone_gene_regulation',
    dependencies: ['aquaporins'],
    panelContent: {
      facts: [
        { 
          text: "Histones are proteins that act as spools around which DNA winds. This compaction not only saves space but is also key to controlling which genes are turned on or off.",
          quiz: {
            question: "What is the primary function of histone proteins?",
            options: ["To repair damaged DNA", "To act as an energy source", "To package DNA and regulate gene expression", "To transport molecules across the membrane"],
            answerIndex: 2
          }
        },
        { 
          text: "Epigenetic modifications to histone 'tails' can alter how tightly DNA is wound, making genes more or less accessible for transcription.", 
          unlockedBySubUpgradeId: 'hgr_control',
          quiz: {
            question: "How do modifications to histone 'tails' affect genes?",
            options: ["They change the DNA sequence permanently", "They make genes more or less accessible for transcription", "They cause the cell to divide", "They destroy the DNA"],
            answerIndex: 1
          }
        }
      ],
      subUpgrades: [
        { id: 'hgr_control', name: 'Chromatin Control', description: 'Better gene regulation grants more Max Hands.', cost: () => ({ resource: Resource.Nucleotides, amount: 200 }), effects: [{ type: 'INCREASE_MAX_HANDS', value: 3 }] },
        { id: 'hgr_stability', name: 'DNA Stability', description: 'Properly packaged DNA is less prone to damage, improving resilience.', cost: () => ({ resource: Resource.Nucleotides, amount: 300 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 3 }] },
      ]
    }
  },
  {
    id: 'actin_cytoskeleton',
    name: 'Actin Cytoskeleton',
    description: 'Construct a dynamic network of actin filaments providing structural support and enabling cell motility.',
    cost: [{ resource: Resource.AminoAcids, amount: 500 }],
    position: { x: 12, y: 50 },
    effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'speed', value: 5 }],
    icon: 'actin_cytoskeleton',
    dependencies: ['histone_gene_regulation'],
    panelContent: {
      facts: [
        { 
          text: "The actin cytoskeleton is a network of protein filaments that extends throughout the cytoplasm of eukaryotic cells, providing shape, strength, and motility.",
          quiz: {
            question: "What are the main functions of the actin cytoskeleton?",
            options: ["Energy production and storage", "DNA replication and repair", "Providing shape, strength, and motility", "Digesting waste products"],
            answerIndex: 2
          }
        },
        { 
          text: "Actin filament dynamics (polymerization and depolymerization) at the leading edge of a cell are what drive crawling movements, a process called lamellipodia formation.", 
          unlockedBySubUpgradeId: 'ac_motility',
          quiz: {
            question: "What process involving actin filaments drives cellular crawling movements?",
            options: ["Lamellipodia formation", "Photosynthesis", "Apoptosis", "DNA methylation"],
            answerIndex: 0
          }
        }
      ],
      subUpgrades: [
        { id: 'ac_motility', name: 'Cellular Motility', description: 'A more dynamic cytoskeleton improves protocell speed.', cost: () => ({ resource: Resource.ATP, amount: 250 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'speed', value: 10 }] },
        { id: 'ac_support', name: 'Structural Support', description: 'A stronger cytoskeleton improves protocell resilience.', cost: () => ({ resource: Resource.ATP, amount: 300 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 5 }] },
      ]
    }
  },
  {
    id: 'myosin_motors',
    name: 'Myosin Motors',
    description: 'Evolve motor proteins that move along actin filaments, generating force for muscle contraction and transport.',
    cost: [{ resource: Resource.ATP, amount: 800 }],
    position: { x: 12, y: 58 },
    effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'speed', value: 5 }],
    icon: 'myosin_motors',
    dependencies: ['actin_cytoskeleton'],
    panelContent: {
      facts: [
        { 
          text: "Myosin proteins are molecular motors that 'walk' along actin filaments, converting chemical energy from ATP into mechanical force.",
          quiz: {
            question: "What is the function of myosin proteins?",
            options: ["They synthesize DNA", "They act as molecular motors on actin filaments", "They transport water", "They regulate the cell cycle"],
            answerIndex: 1
          }
        },
        { 
          text: "Besides muscle contraction, myosins are also involved in moving cargo, like vesicles and organelles, around the cell along actin highways.", 
          unlockedBySubUpgradeId: 'mm_contraction',
          quiz: {
            question: "Besides muscle contraction, what is another key role of myosin motors?",
            options: ["Generating light", "Transporting intracellular cargo", "Digesting food particles", "Storing genetic information"],
            answerIndex: 1
          }
        }
      ],
      subUpgrades: [
        { id: 'mm_contraction', name: 'Muscle Contraction', description: 'Developing muscle-like structures greatly improves protocell speed.', cost: () => ({ resource: Resource.ATP, amount: 1000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'speed', value: 15 }] },
        { id: 'mm_transport', name: 'Intracellular Transport', description: 'Efficient cargo transport within the cell improves protocell efficiency.', cost: () => ({ resource: Resource.ATP, amount: 1200 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'efficiency', value: 5 }] },
      ]
    }
  },
  {
    id: 'opsin_proteins',
    name: 'Opsin Proteins',
    description: 'Develop the first light-sensitive proteins, the foundation for all forms of vision.',
    cost: [{ resource: Resource.AminoAcids, amount: 1500 }],
    position: { x: 25, y: 65 },
    effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'speed', value: 2 }],
    icon: 'opsin_proteins',
    dependencies: ['p53_protein'],
    panelContent: {
      facts: [
        { 
          text: "Opsins are a group of light-sensitive proteins found in photoreceptor cells of the retina. They are the basis of vision.",
          quiz: {
            question: "What are opsins?",
            options: ["Structural proteins in bone", "Enzymes for digestion", "Light-sensitive proteins for vision", "Proteins for muscle contraction"],
            answerIndex: 2
          }
        },
        { 
          text: "When an opsin absorbs a photon of light, it changes its shape, triggering a biochemical cascade that results in a nerve impulse.", 
          unlockedBySubUpgradeId: 'op_light_sense',
          quiz: {
            question: "What happens immediately after an opsin protein absorbs a photon?",
            options: ["It releases heat", "It changes its shape", "It divides into two proteins", "It becomes magnetic"],
            answerIndex: 1
          }
        }
      ],
      subUpgrades: [
        { id: 'op_light_sense', name: 'Light Sensitivity', description: 'Being able to sense light improves protocell hunt speed.', cost: () => ({ resource: Resource.ATP, amount: 800 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'speed', value: 5 }] },
        { id: 'op_uv_defense', name: 'UV Detection', description: 'Detecting harmful UV light allows the cell to avoid damage, improving resilience.', cost: () => ({ resource: Resource.ATP, amount: 900 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 5 }] },
      ]
    }
  },
  {
    id: 'hemoglobin',
    name: 'Hemoglobin',
    description: 'Evolve a complex protein capable of binding and transporting oxygen through a circulatory system.',
    cost: [{ resource: Resource.Iron, amount: 2000 }, { resource: Resource.AminoAcids, amount: 2000 }],
    position: { x: 18, y: 70 },
    effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'efficiency', value: 5 }],
    icon: 'hemoglobin',
    dependencies: ['myosin_motors', 'p53_protein'],
    panelContent: {
      facts: [
        { 
          text: "Hemoglobin is the iron-containing protein in red blood cells that transports oxygen from the lungs to the rest of the body.",
          quiz: {
            question: "What is the primary function of hemoglobin?",
            options: ["To fight infections", "To transport oxygen in the blood", "To cause muscle contraction", "To store genetic data"],
            answerIndex: 1
          }
        },
        { 
          text: "The binding of one oxygen molecule to hemoglobin increases the affinity of the other binding sites for oxygen, a property called cooperative binding, which makes it highly efficient.", 
          unlockedBySubUpgradeId: 'hb_transport',
          quiz: {
            question: "What is the property called where binding one oxygen molecule makes it easier for others to bind to hemoglobin?",
            options: ["Allosteric inhibition", "Competitive binding", "Cooperative binding", "Covalent modification"],
            answerIndex: 2
          }
        }
      ],
      subUpgrades: [
        { id: 'hb_transport', name: 'Oxygen Transport', description: 'Efficient oxygen delivery improves protocell efficiency.', cost: () => ({ resource: Resource.ATP, amount: 1200 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'efficiency', value: 10 }] },
        { id: 'hb_co2_transport', name: 'Carbon Dioxide Transport', description: 'Hemoglobin also helps transport CO2 waste, improving protocell efficiency further.', cost: () => ({ resource: Resource.ATP, amount: 1500 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'efficiency', value: 5 }] },
      ]
    }
  },
  {
    id: 'collagen_synthesis',
    name: 'Collagen Synthesis',
    description: 'Synthesize the main structural protein of connective tissues, providing strength and elasticity.',
    cost: [{ resource: Resource.AminoAcids, amount: 3000 }],
    position: { x: 25, y: 78 },
    effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 5 }],
    icon: 'collagen_synthesis',
    dependencies: ['hemoglobin'],
    panelContent: {
      facts: [
        { 
          text: "Collagen is the most abundant protein in mammals, making up from 25% to 35% of the whole-body protein content. It forms the structural framework of skin, bones, and cartilage.",
          quiz: {
            question: "What is the most abundant protein in mammals?",
            options: ["Actin", "Myosin", "Hemoglobin", "Collagen"],
            answerIndex: 3
          }
        },
        { 
          text: "Collagen fibers have a unique triple helix structure, giving them incredible tensile strength—gram for gram, Type I collagen is stronger than steel.", 
          unlockedBySubUpgradeId: 'cs_strength',
          quiz: {
            question: "What gives collagen its incredible tensile strength?",
            options: ["Its high iron content", "Its unique triple helix structure", "Its ability to bind to water", "Its electrical charge"],
            answerIndex: 1
          }
        }
      ],
      subUpgrades: [
        { id: 'cs_strength', name: 'Structural Strength', description: 'A strong collagen framework improves protocell resilience.', cost: () => ({ resource: Resource.AminoAcids, amount: 4000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 10 }] },
        { id: 'cs_elasticity', name: 'Tissue Elasticity', description: 'Elastic tissues allow for faster movement, improving protocell speed.', cost: () => ({ resource: Resource.AminoAcids, amount: 4500 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'speed', value: 5 }] },
      ]
    }
  },
  {
    id: 'vibration_sensing',
    name: 'Vibration Sensing',
    description: 'Develop mechanoreceptors to detect vibrations in water or on surfaces, a precursor to hearing.',
    cost: [{ resource: Resource.ATP, amount: 1500 }],
    position: { x: 45, y: 88 },
    effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'speed', value: 3 }],
    icon: 'vibration_sensing',
    dependencies: ['exoskeleton'],
    panelContent: {
      facts: [
        { 
          text: "Many organisms, from insects to elephants, use vibration sensing for communication, navigation, and detecting predators or prey.",
          quiz: {
            question: "What is vibration sensing used for in the animal kingdom?",
            options: ["Generating heat", "Photosynthesis", "Communication, navigation, and detection", "Filtering water"],
            answerIndex: 2
          }
        },
        { 
          text: "The lateral line system in fish is a classic example, allowing them to detect water movement and pressure changes caused by other organisms.", 
          unlockedBySubUpgradeId: 'vs_detection',
          quiz: {
            question: "What is the name of the vibration-sensing system found in fish?",
            options: ["Echolocation", "The auditory canal", "The lateral line system", "The olfactory bulb"],
            answerIndex: 2
          }
        }
      ],
      subUpgrades: [
        { id: 'vs_detection', name: 'Predator Detection', description: 'Better detection of threats improves protocell resilience.', cost: () => ({ resource: Resource.ATP, amount: 2000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 5 }] },
        { id: 'vs_communication', name: 'Communication', description: 'Using vibrations to communicate improves hunting efficiency.', cost: () => ({ resource: Resource.ATP, amount: 2500 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'efficiency', value: 5 }] },
      ]
    }
  },
  {
    id: 'chemosensation',
    name: 'Chemosensation',
    description: 'Evolve receptors to detect specific chemicals, the basis for taste and smell.',
    cost: [{ resource: Resource.AminoAcids, amount: 2000 }],
    position: { x: 55, y: 95 },
    effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'efficiency', value: 3 }],
    icon: 'chemosensation',
    dependencies: ['nervous_system'],
    panelContent: {
      facts: [
        { 
          text: "Chemosensation is the oldest and most universal sense, present in organisms from bacteria to mammals. It's used to find food, avoid toxins, and communicate.",
          quiz: {
            question: "What is considered the oldest and most universal sense?",
            options: ["Vision", "Hearing", "Chemosensation (taste/smell)", "Touch"],
            answerIndex: 2
          }
        },
        { 
          text: "Insects have chemoreceptors on their antennae, feet, and mouthparts, allowing them to 'taste' by walking on a surface.", 
          unlockedBySubUpgradeId: 'cs_food_finding',
          quiz: {
            question: "How can some insects 'taste' something?",
            options: ["By hearing it", "By looking at it", "By walking on it", "By using magnetic fields"],
            answerIndex: 2
          }
        }
      ],
      subUpgrades: [
        { id: 'cs_food_finding', name: 'Food Finding', description: 'Improved ability to find nutrients improves protocell efficiency.', cost: () => ({ resource: Resource.ATP, amount: 2200 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'efficiency', value: 5 }] },
        { id: 'cs_toxin_avoidance', name: 'Toxin Avoidance', description: 'Better detection of harmful chemicals improves protocell resilience.', cost: () => ({ resource: Resource.ATP, amount: 2400 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 5 }] },
      ]
    }
  },
  {
    id: 'liposomes',
    name: 'Liposomes',
    description: 'Form spherical vesicles of a lipid bilayer, an essential step in creating a cell membrane.',
    cost: [{ resource: Resource.AminoAcids, amount: 500 }],
    position: { x: 70, y: 60 },
    effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 2 }],
    icon: 'liposomes',
    dependencies: ['lipid_metabolism'],
    panelContent: {
      facts: [
        { 
          text: "Liposomes can be filled with drugs and used to deliver medication for cancer and other diseases. They are a foundational technology in nanomedicine.",
          quiz: {
            question: "What is a major medical application of liposomes?",
            options: ["As a source of energy", "For drug delivery", "As a building material for bones", "To filter blood"],
            answerIndex: 1
          }
        },
        { 
          text: "The lipid bilayer of a liposome is amphipathic, meaning the 'head' of the lipid molecule is attracted to water while the 'tail' is repelled by it, causing them to self-assemble into a sphere in water.", 
          unlockedBySubUpgradeId: 'lipo_stability',
          quiz: {
            question: "Why do lipids self-assemble into a sphere (liposome) in water?",
            options: ["Because of magnetic attraction", "Because they are amphipathic (water-attracting head and water-repelling tail)", "Because of a specific enzyme", "Because of high pressure"],
            answerIndex: 1
          }
        }
      ],
      subUpgrades: [
        { id: 'lipo_stability', name: 'Membrane Stability', description: 'More stable membranes improve protocell resilience.', cost: () => ({ resource: Resource.ATP, amount: 300 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 3 }] },
        { id: 'lipo_permeability', name: 'Control Permeability', description: 'Better control over what crosses the membrane improves protocell efficiency.', cost: () => ({ resource: Resource.ATP, amount: 350 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'efficiency', value: 3 }] },
      ]
    }
  },
  {
    id: 'atp_coupling',
    name: 'ATP Coupling',
    description: 'Develop ATP as the universal energy currency, fueling cellular processes.',
    cost: [{ resource: Resource.AminoAcids, amount: 20 }],
    position: { x: 50, y: 50 },
    effects: [{ type: 'UNLOCK_KNOBS', value: ['atp_synthesis', 'amino_acid_synthesis'] }, { type: 'ADD_BASE_GENERATION', resource: Resource.AminoAcids, value: 2 }],
    icon: 'atp',
    dependencies: ['abiogenesis'],
     panelContent: {
      facts: [
        { 
          text: "Adenosine triphosphate (ATP) is often called the 'molecular unit of currency' for intracellular energy transfer. It provides the energy for most cellular functions.",
          quiz: {
            question: "What is ATP often called in a biological context?",
            options: ["The genetic blueprint", "The structural backbone", "The molecular unit of currency", "The waste product"],
            answerIndex: 2
          }
        },
        { 
          text: "The energy from ATP is released when a phosphate group is broken off, turning it into ADP (Adenosine diphosphate). This reaction is coupled with other reactions that require energy.", 
          unlockedBySubUpgradeId: 'ac_cycle_1',
          quiz: {
            question: "How does ATP release energy for cellular processes?",
            options: ["By burning like a fuel", "By breaking a phosphate bond", "By absorbing light", "By changing its shape"],
            answerIndex: 1
          }
        },
        { 
          text: "A typical cell in the human body may contain about one billion ATP molecules at any instant, and the entire supply is recycled about every 20-30 seconds.", 
          unlockedBySubUpgradeId: 'ac_efficiency_1',
          quiz: {
            question: "How quickly is the ATP supply in a typical human cell recycled?",
            options: ["Once a day", "Once an hour", "Every 20-30 seconds", "It is never recycled"],
            answerIndex: 2
          }
        },
        { 
          text: "The enzyme ATP synthase, which produces ATP, is a remarkable molecular motor. The flow of protons through it causes it to spin, generating ATP in a process similar to a hydroelectric dam.", 
          unlockedBySubUpgradeId: 'ac_storage',
          quiz: {
            question: "What is the enzyme ATP synthase analogous to in its function?",
            options: ["A solar panel", "A hydroelectric dam", "A steam engine", "A battery"],
            answerIndex: 1
          }
        },
        { 
          text: "Substrate-level phosphorylation is a direct phosphorylation of ADP with a phosphate group by using the energy obtained from a coupled reaction. It is a much simpler process than oxidative phosphorylation and likely evolved first.", 
          unlockedBySubUpgradeId: 'ac_substrate_level',
          quiz: {
            question: "What is substrate-level phosphorylation?",
            options: ["A way to destroy ATP", "A process that requires oxygen", "A direct method of producing ATP from a coupled reaction", "A type of photosynthesis"],
            answerIndex: 2
          }
        }
      ],
      subUpgrades: [
        { id: 'ac_efficiency_1', name: 'ATP Synthase', description: 'Develop efficient ATP synthase enzymes.', cost: () => ({ resource: Resource.ATP, amount: 50 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.ATP, value: 0.2 }] },
        { id: 'ac_cycle_1', name: 'ADP Recycling', description: 'Passively generate a small amount of ATP from ambient energy.', cost: () => ({ resource: Resource.ATP, amount: 250 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.ATP, value: 0.5 }] },
        { id: 'ac_storage', name: 'Phosphate Bonds', description: 'Reinforce high-energy phosphate bonds, increasing ATP storage capacity.', cost: () => ({ resource: Resource.ATP, amount: 150 }), effects: [{ type: 'INCREASE_CAPACITY', resource: Resource.ATP, value: 500 }] },
        { id: 'ac_hands', name: 'Energy Management', description: 'Better energy management allows for more complex tasks, increasing max Hands.', cost: () => ({ resource: Resource.ATP, amount: 500 }), effects: [{ type: 'INCREASE_MAX_HANDS', value: 5 }] },
        { id: 'ac_substrate_level', name: 'Substrate-Level Phosphorylation', description: 'Develop the first direct ATP synthesis pathway, a precursor to more complex metabolisms.', cost: () => ({ resource: Resource.AminoAcids, amount: 750 }), effects: [{ type: 'INCREASE_GENERATION_MULTIPLIER', resource: Resource.ATP, value: 0.05 }] }
      ]
    }
  },
  {
    id: 'protein_folding',
    name: 'Protein Folding',
    description: 'Chains of amino acids must fold into precise 3D shapes to become functional proteins.',
    cost: [{ resource: Resource.AminoAcids, amount: 100 }],
    position: { x: 30, y: 46 },
    effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.AminoAcids, value: 1 }],
    icon: 'protein_folding',
    dependencies: ['abiogenesis'],
    panelContent: {
        facts: [
            { 
              text: "A protein's function is dictated by its unique 3D structure. Misfolded proteins can lead to diseases like Alzheimer's and Parkinson's.",
              quiz: {
                question: "What determines a protein's function?",
                options: ["Its weight", "Its unique 3D structure", "Its color", "Its location in the cell"],
                answerIndex: 1
              }
            },
            { 
              text: "The hydrophobic effect is a major driving force in protein folding, causing nonpolar amino acids to bury themselves in the protein's core, away from water.", 
              unlockedBySubUpgradeId: 'pf_hydrophobic',
              quiz: {
                question: "What is a major driving force in protein folding?",
                options: ["The magnetic field", "Gravity", "The hydrophobic effect", "Sound waves"],
                answerIndex: 2
              }
            },
            { 
              text: "Anfinsen's dogma states that, for most proteins, the amino acid sequence alone contains all the information needed to specify its final 3D structure.", 
              unlockedBySubUpgradeId: 'pf_dogma',
              quiz: {
                question: "What does Anfinsen's dogma state about protein folding?",
                options: ["Proteins require a special enzyme to fold", "The amino acid sequence contains the information for folding", "Proteins can only fold in zero gravity", "All proteins fold into a sphere"],
                answerIndex: 1
              }
            }
        ],
        subUpgrades: [
            { id: 'pf_structure', name: 'Secondary Structures', description: 'Improve folding accuracy, boosting all biological generation.', cost: () => ({ resource: Resource.AminoAcids, amount: 150 }), effects: [{ type: 'INCREASE_GENERATION_MULTIPLIER', resource: Resource.AminoAcids, value: 0.05 }] },
            { id: 'pf_hydrophobic', name: 'Hydrophobic Effect', description: 'Harness the hydrophobic effect to speed up folding, improving protocell speed.', cost: () => ({ resource: Resource.AminoAcids, amount: 200 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'speed', value: 5 }] },
            { id: 'pf_dogma', name: 'Anfinsen\'s Dogma', description: 'A deeper understanding of folding improves protocell resilience.', cost: () => ({ resource: Resource.AminoAcids, amount: 250 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 5 }] }
        ]
    }
  },
  {
    id: 'ribosomes',
    name: 'Ribosome Assembly',
    description: 'Construct complex molecular machines responsible for translating RNA into proteins.',
    cost: [{ resource: Resource.AminoAcids, amount: 500 }, { resource: Resource.Nucleotides, amount: 500 }],
    position: { x: 42, y: 55 },
    effects: [{ type: 'INCREASE_GENERATION_MULTIPLIER', resource: Resource.AminoAcids, value: 0.1 }],
    icon: 'ribosomes',
    dependencies: ['rna_world', 'protein_folding'],
    panelContent: {
        facts: [
            { 
              text: "The ribosome is a complex machine made of both RNA (rRNA) and protein. The fact that RNA performs the key catalytic step of forming peptide bonds is strong evidence for the RNA World hypothesis.",
              quiz: {
                question: "The ribosome's catalytic activity being performed by RNA is strong evidence for what hypothesis?",
                options: ["The Primordial Soup Hypothesis", "The Theory of Evolution", "The RNA World Hypothesis", "The Cell Theory"],
                answerIndex: 2
              }
            },
            { 
              text: "Antibiotics like tetracycline and erythromycin work by targeting and inhibiting bacterial ribosomes, while leaving eukaryotic ribosomes unharmed.", 
              unlockedBySubUpgradeId: 'rib_efficiency',
              quiz: {
                question: "How do many common antibiotics work?",
                options: ["They destroy the cell wall", "They target and inhibit bacterial ribosomes", "They neutralize the bacteria's DNA", "They prevent the bacteria from moving"],
                answerIndex: 1
              }
            }
        ],
        subUpgrades: [
            { id: 'rib_efficiency', name: 'Increase Efficiency', description: 'Improve ribosomal efficiency, granting more max Hands.', cost: () => ({ resource: Resource.ATP, amount: 500 }), effects: [{ type: 'INCREASE_MAX_HANDS', value: 5 }] },
            { id: 'rib_polysomes', name: 'Polysomes', description: 'Allow multiple ribosomes to translate the same mRNA simultaneously, boosting production speed.', cost: () => ({ resource: Resource.ATP, amount: 600 }), effects: [{ type: 'INCREASE_GENERATION_MULTIPLIER', resource: Resource.AminoAcids, value: 0.1 }] }
        ]
    }
  },
  {
    id: 'heat_shock_proteins',
    name: 'Heat Shock Proteins',
    description: 'Develop molecular "chaperones" that help other proteins fold correctly and prevent aggregation.',
    cost: [{ resource: Resource.AminoAcids, amount: 350 }],
    position: { x: 22, y: 42 },
    effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 5 }],
    icon: 'heat_shock_proteins',
    dependencies: ['histone_gene_regulation'],
    panelContent: {
        facts: [
            { 
              text: "Heat shock proteins (HSPs) are produced by cells in response to stressful conditions like heat, cold, and UV light.",
              quiz: {
                question: "When are Heat Shock Proteins (HSPs) typically produced?",
                options: ["During cell division", "In response to stressful conditions", "When the cell is resting", "Only in plant cells"],
                answerIndex: 1
              }
            },
            { 
              text: "They act as 'chaperones', binding to unfolded or misfolded proteins to help them attain their proper functional shape and prevent them from clumping together.", 
              unlockedBySubUpgradeId: 'hsp_chaperone',
              quiz: {
                question: "What is the primary role of 'chaperone' proteins?",
                options: ["To transport proteins out of the cell", "To help other proteins fold correctly", "To break down old proteins", "To provide energy for reactions"],
                answerIndex: 1
              }
            },
            { 
              text: "Some HSPs are involved in presenting antigens to the immune system, playing a role in both innate and adaptive immunity.", 
              unlockedBySubUpgradeId: 'hsp_ubiquity',
              quiz: {
                question: "Besides protein folding, what is another role some HSPs play?",
                options: ["Muscle contraction", "Presenting antigens to the immune system", "Digesting fats", "Sensing light"],
                answerIndex: 1
              }
            }
        ],
        subUpgrades: [
            { id: 'hsp_chaperone', name: 'Molecular Chaperones', description: 'Improve protein quality control, boosting protocell resilience.', cost: () => ({ resource: Resource.AminoAcids, amount: 450 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 10 }] },
            { id: 'hsp_ubiquity', name: 'Stress Response', description: 'A better stress response improves all biological generation.', cost: () => ({ resource: Resource.AminoAcids, amount: 550 }), effects: [{ type: 'INCREASE_GENERATION_MULTIPLIER', resource: Resource.AminoAcids, value: 0.1 }] },
            { id: 'hsp_thermotolerance', name: 'Thermotolerance', description: 'Increased resistance to heat damage further improves resilience.', cost: () => ({ resource: Resource.AminoAcids, amount: 650 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 5 }] }
        ]
    }
  },
  {
    id: 'green_fluorescent_protein',
    name: 'Green Fluorescent Protein',
    description: 'Synthesize a protein that glows bright green under blue light, a revolutionary tool for observing biological processes.',
    cost: [{ resource: Resource.AminoAcids, amount: 500 }],
    position: { x: 35, y: 78 },
    effects: [{ type: 'INCREASE_MAX_HANDS', value: 2 }],
    icon: 'green_fluorescent_protein',
    dependencies: ['exoskeleton'],
    panelContent: {
        facts: [
            { 
              text: "GFP was first discovered in the jellyfish Aequorea victoria. Its discovery and development as a research tool earned a Nobel Prize.",
              quiz: {
                question: "From which organism was Green Fluorescent Protein (GFP) first isolated?",
                options: ["A firefly", "A deep-sea bacterium", "A jellyfish", "A type of glowing mushroom"],
                answerIndex: 2
              }
            },
            { 
              text: "Scientists can fuse the gene for GFP to the gene of another protein. This makes the target protein glow, allowing researchers to watch its movement and location in real-time within a living cell.", 
              unlockedBySubUpgradeId: 'gfp_tagging',
              quiz: {
                question: "What is a primary use of GFP in molecular biology research?",
                options: ["As a source of energy", "To kill cancer cells", "As a visual tag to track other proteins", "To strengthen cell walls"],
                answerIndex: 2
              }
            },
            { 
              text: "By mutating the original GFP, scientists have created a whole rainbow of fluorescent proteins (BFPs, CFPs, YFPs, RFPs) for multicolor imaging.", 
              unlockedBySubUpgradeId: 'gfp_chromophore',
              quiz: {
                question: "What has been created by mutating the original GFP?",
                options: ["More powerful enzymes", "A whole rainbow of fluorescent proteins", "Proteins that can survive in space", "A new type of antibiotic"],
                answerIndex: 1
              }
            }
        ],
        subUpgrades: [
            { id: 'gfp_tagging', name: 'Protein Tagging', description: 'Using GFP as a research tool grants more max Hands.', cost: () => ({ resource: Resource.AminoAcids, amount: 600 }), effects: [{ type: 'INCREASE_MAX_HANDS', value: 5 }] },
            { id: 'gfp_chromophore', name: 'Optimize Chromophore', description: 'A brighter protein improves all biological generation efficiency.', cost: () => ({ resource: Resource.AminoAcids, amount: 700 }), effects: [{ type: 'INCREASE_GENERATION_MULTIPLIER', resource: Resource.AminoAcids, value: 0.1 }] },
            { id: 'gfp_fret', name: 'FRET Analysis', description: 'Use fluorescent resonance energy transfer to study protein-protein interactions, boosting efficiency.', cost: () => ({ resource: Resource.AminoAcids, amount: 800 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'efficiency', value: 5 }] }
        ]
    }
  },
  {
    id: 'rna_world',
    name: 'RNA World',
    description: 'Utilize RNA as both a carrier of genetic information and a catalytic enzyme.',
    cost: [{ resource: Resource.ATP, amount: 10 }],
    position: { x: 52, y: 46 },
    effects: [{ type: 'UNLOCK_KNOBS', value: ['nucleotide_synthesis'] }, { type: 'ADD_BASE_GENERATION', resource: Resource.Nucleotides, value: 1 }],
    icon: 'rna',
    dependencies: ['atp_coupling', 'protein_folding'],
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
        { 
          text: "Ribozymes are RNA molecules that can catalyze specific biochemical reactions, similar to protein enzymes. Their discovery was crucial evidence supporting the RNA world hypothesis.", 
          unlockedBySubUpgradeId: 'rw_ribozymes_1',
          quiz: {
            question: "What is a ribozyme?",
            options: ["A type of cellular organelle", "A protein that synthesizes RNA", "An RNA molecule that can catalyze a reaction", "The building block of DNA"],
            answerIndex: 2
          }
        },
        { 
          text: "RNA is generally less stable than DNA, which is one reason why DNA likely evolved to become the primary molecule for long-term genetic storage.", 
          unlockedBySubUpgradeId: 'rw_stability',
          quiz: {
            question: "Why did DNA likely replace RNA as the primary genetic storage molecule?",
            options: ["It is smaller than RNA", "It is more chemically stable than RNA", "It can hold more information", "It can also act as an enzyme"],
            answerIndex: 1
          }
        },
        { 
          text: "Viruses like influenza and HIV use RNA as their genetic material, making them modern-day relics of the RNA world.", 
          unlockedBySubUpgradeId: 'rw_synthesis_1',
          quiz: {
            question: "What modern-day biological entities are considered 'relics' of the RNA world?",
            options: ["Bacteria", "RNA viruses", "Eukaryotic cells", "Simple plants"],
            answerIndex: 1
          }
        },
        { 
          text: "The discovery of self-splicing RNA (introns that can remove themselves from an mRNA transcript without aid from proteins) was a major piece of evidence for the RNA World hypothesis, proving RNA could perform complex catalytic tasks.", 
          unlockedBySubUpgradeId: 'rw_splicing',
          quiz: {
            question: "What is 'self-splicing RNA'?",
            options: ["RNA that automatically repairs itself", "RNA introns that can remove themselves without help from proteins", "RNA that can change its own genetic sequence", "RNA that creates its own energy"],
            answerIndex: 1
          }
        }
      ],
      subUpgrades: [
        { id: 'rw_synthesis_1', name: 'Nucleotide Assembly', description: 'Improve passive generation of Nucleotides.', cost: () => ({ resource: Resource.Nucleotides, amount: 100 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Nucleotides, value: 0.5 }] },
        { id: 'rw_ribozymes_1', name: 'Catalytic RNA', description: 'Use Ribozymes to improve Amino Acid passive generation.', cost: () => ({ resource: Resource.Nucleotides, amount: 500 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.AminoAcids, value: 1 }] },
        { id: 'rw_stability', name: 'Improve Stability', description: 'Develop more stable RNA structures, increasing Nucleotide capacity.', cost: () => ({ resource: Resource.Nucleotides, amount: 250 }), effects: [{ type: 'INCREASE_CAPACITY', resource: Resource.Nucleotides, value: 500 }] },
        { id: 'rw_replication', name: 'RNA Replication', description: 'Improve the fidelity of RNA replication, boosting Nucleotide generation efficiency.', cost: () => ({ resource: Resource.Nucleotides, amount: 400 }), effects: [{ type: 'INCREASE_GENERATION_MULTIPLIER', resource: Resource.Nucleotides, value: 0.1 }] },
        { id: 'rw_splicing', name: 'RNA Splicing', description: 'Develop primitive self-splicing introns, allowing a single RNA gene to code for multiple products.', cost: () => ({ resource: Resource.Nucleotides, amount: 600 }), effects: [{ type: 'INCREASE_MAX_HANDS', value: 2 }] }
      ]
    }
  },
  {
    id: 'protocell',
    name: 'Protocell',
    description: 'Encase biological machinery within a lipid membrane, creating the first primitive cell.',
    cost: [{ resource: Resource.Nucleotides, amount: 20 }, { resource: Resource.AminoAcids, amount: 40 }],
    position: { x: 50, y: 58 },
    effects: [{ type: 'UNLOCK_FEATURE', value: 'protocell' }, { type: 'ADD_BASE_GENERATION', resource: Resource.ATP, value: 1 }],
    icon: 'protocell',
    dependencies: ['ribosomes'],
    panelContent: {
      facts: [
        { 
          text: "A protocell is a self-organized, spherical collection of lipids proposed as a stepping-stone toward the origin of life.",
          quiz: {
            question: "What is a protocell?",
            options: ["A type of virus", "The smallest known bacteria", "A self-organized collection of lipids, a precursor to a cell", "A cell's nucleus"],
            answerIndex: 2
          }
        },
        { 
          text: "The lipid membrane provides a crucial function by separating the internal chemistry from the external environment, allowing for a stable, controlled internal state.",
          quiz: {
            question: "What is a crucial function of the protocell's lipid membrane?",
            options: ["To provide energy", "To separate the internal and external environments", "To move the cell", "To store genetic information"],
            answerIndex: 1
          }
        },
        { 
          text: "Experiments have shown that lipid vesicles can form spontaneously, grow by incorporating more lipids, and even 'divide' under certain physical conditions.",
          quiz: {
            question: "What have experiments shown about lipid vesicles?",
            options: ["They require a complex enzyme to form", "They can form spontaneously and even divide", "They cannot exist in water", "They are completely solid"],
            answerIndex: 1
          }
        },
        { 
          text: "By encapsulating RNA and other molecules, the protocell created the first distinct individual organisms, on which natural selection could now act more effectively.",
          quiz: {
            question: "Why was encapsulating molecules inside a protocell important for evolution?",
            options: ["It made the molecules heavier", "It created the first individual organisms for natural selection to act upon", "It stopped all chemical reactions", "It allowed them to see light"],
            answerIndex: 1
          }
        },
        { 
          text: "Early protocells likely grew by scavenging fatty acids and other amphiphilic molecules from the environment. This growth would increase surface tension, eventually causing the vesicle to spontaneously divide into smaller daughter cells.", 
          unlockedBySubUpgradeId: 'pc_lipid_scavenging',
          quiz: {
            question: "How did early protocells likely grow and divide?",
            options: ["Through photosynthesis", "By scavenging lipids, which increased tension and caused division", "By consuming other protocells", "Through a complex genetic program"],
            answerIndex: 1
          }
        }
      ],
      subUpgrades: [
        { id: 'pc_membrane', name: 'Membrane Stability', description: 'Improve the stability of the lipid membrane, boosting base protocell resilience.', cost: () => ({ resource: Resource.AminoAcids, amount: 100 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 2 }] },
        { id: 'pc_transport', name: 'Nutrient Transport', description: 'Develop primitive channels for nutrient transport, boosting base protocell efficiency.', cost: () => ({ resource: Resource.AminoAcids, amount: 100 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'efficiency', value: 2 }] },
        { id: 'pc_motility', name: 'Primitive Motility', description: 'Develop basic motility, boosting base protocell speed.', cost: () => ({ resource: Resource.ATP, amount: 100 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'speed', value: 2 }] },
        { id: 'pc_internalization', name: 'Internal Environment', description: 'Improve the control of the internal environment, increasing all biological resource capacities.', cost: () => ({ resource: Resource.PrimordialSoup, amount: 200 }), effects: [{ type: 'INCREASE_UNIVERSAL_STORAGE', value: 1 }] },
        { id: 'pc_lipid_scavenging', name: 'Lipid Scavenging', description: 'Incorporate lipids directly from the environment to grow and repair the cell membrane.', cost: () => ({ resource: Resource.PrimordialSoup, amount: 500 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 3 }] }
      ]
    }
  },
  {
    id: 'glycolysis',
    name: 'Glycolysis',
    description: 'Develop the first metabolic pathway to break down glucose and produce ATP.',
    cost: [{ resource: Resource.ATP, amount: 50 }],
    position: { x: 62, y: 52 },
    effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'efficiency', value: 10 }],
    icon: 'glycolysis',
    dependencies: ['rna_world'],
    panelContent: {
      facts: [
        { 
          text: "Glycolysis is a nearly universal metabolic pathway, found in almost all organisms, indicating it is one of the most ancient and fundamental ways of producing ATP.",
          quiz: {
            question: "What does the near-universal presence of glycolysis in organisms indicate?",
            options: ["It is a very new evolutionary invention", "It is an extremely ancient and fundamental metabolic pathway", "It only works in the presence of oxygen", "It is not very important for life"],
            answerIndex: 1
          }
        },
        { 
          text: "This process does not require oxygen, which was crucial for early life on an anaerobic Earth. It splits a glucose molecule into two pyruvate molecules.", 
          unlockedBySubUpgradeId: 'gly_efficiency',
          quiz: {
            question: "What is a key feature of glycolysis that made it crucial for early life?",
            options: ["It produces a lot of light", "It requires oxygen", "It does not require oxygen", "It only works at cold temperatures"],
            answerIndex: 2
          }
        },
        { 
          text: "While it produces a net gain of only 2 ATP per glucose molecule, it is a very fast process, allowing for quick bursts of energy.", 
          unlockedBySubUpgradeId: 'gly_speed',
          quiz: {
            question: "What is the primary advantage of glycolysis, despite its low ATP yield?",
            options: ["It is a very slow and controlled process", "It is a very fast process for quick energy", "It produces oxygen as a byproduct", "It can break down any type of molecule"],
            answerIndex: 1
          }
        },
        { 
          text: "The pyruvate generated by glycolysis can then be fed into more complex aerobic pathways like the Krebs cycle for much greater ATP yield, or be fermented.", 
          unlockedBySubUpgradeId: 'gly_fermentation',
          quiz: {
            question: "What is the fate of the pyruvate molecules produced during glycolysis?",
            options: ["They are immediately expelled as waste", "They can be used in more complex pathways like the Krebs cycle", "They are converted back into glucose", "They are used to build the cell wall"],
            answerIndex: 1
          }
        },
        { 
          text: "Hexokinase is the enzyme that performs the first step of glycolysis, phosphorylating glucose. This traps the glucose inside the cell and commits it to the metabolic pathway.", 
          unlockedBySubUpgradeId: 'gly_hexokinase',
          quiz: {
            question: "What is the role of the enzyme Hexokinase in glycolysis?",
            options: ["It performs the final step, producing ATP", "It performs the first step, trapping glucose in the cell", "It breaks pyruvate into smaller molecules", "It exports pyruvate from the cell"],
            answerIndex: 1
          }
        }
      ],
      subUpgrades: [
        { id: 'gly_efficiency', name: 'Enzyme Optimization', description: 'Optimize the enzymes of the glycolytic pathway to improve protocell efficiency.', cost: () => ({ resource: Resource.ATP, amount: 100 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'efficiency', value: 5 }] },
        { id: 'gly_speed', name: 'Rapid Breakdown', description: 'Increase the speed of glucose breakdown, improving protocell speed.', cost: () => ({ resource: Resource.ATP, amount: 120 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'speed', value: 5 }] },
        { id: 'gly_fermentation', name: 'Anaerobic Fermentation', description: 'Develop fermentation pathways to recycle key molecules, improving protocell resilience.', cost: () => ({ resource: Resource.ATP, amount: 150 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 5 }] },
        { id: 'gly_atp_boost', name: 'Substrate-Level Boost', description: 'Improve the direct production of ATP from glycolysis, passively generating more ATP.', cost: () => ({ resource: Resource.ATP, amount: 200 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.ATP, value: 1 }] },
        { id: 'gly_hexokinase', name: 'Improve Hexokinase', description: 'Improve the first enzyme of glycolysis, increasing ATP generation multiplier.', cost: () => ({ resource: Resource.ATP, amount: 250 }), effects: [{ type: 'INCREASE_GENERATION_MULTIPLIER', resource: Resource.ATP, value: 0.05 }] }
      ]
    }
  },
  {
    id: 'dna_replication',
    name: 'DNA Replication',
    description: 'Evolve a more stable DNA-based genetic system with reliable replication.',
    cost: [{ resource: Resource.Nucleotides, amount: 75 }],
    position: { x: 75, y: 48 },
    effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 10 }, { type: 'UNLOCK_FEATURE', value: 'chamber_upgrades' }],
    icon: 'dna',
    dependencies: ['rna_world'],
    panelContent: {
      facts: [
        { 
          text: "DNA (Deoxyribonucleic acid) is more chemically stable than RNA, making it a better molecule for storing vast amounts of genetic information for the long term.",
          quiz: {
            question: "Compared to RNA, what is a key advantage of DNA for genetic storage?",
            options: ["It is less stable", "It is more chemically stable", "It can act as an enzyme", "It is single-stranded"],
            answerIndex: 1
          }
        },
        { 
          text: "DNA replication is 'semi-conservative', meaning each new DNA molecule consists of one old strand and one newly synthesized strand. This was famously demonstrated by the Meselson-Stahl experiment.", 
          unlockedBySubUpgradeId: 'dna_semiconservative',
          quiz: {
            question: "What does 'semi-conservative' replication mean?",
            options: ["Only half the DNA is copied", "Each new DNA molecule has one old and one new strand", "The process has a 50% error rate", "The DNA is copied twice"],
            answerIndex: 1
          }
        },
        { 
          text: "The enzyme DNA polymerase has a proofreading function that checks for and corrects errors during replication, ensuring high fidelity of genetic inheritance.", 
          unlockedBySubUpgradeId: 'dna_proofreading',
          quiz: {
            question: "What important function does DNA polymerase have besides synthesizing DNA?",
            options: ["It unwinds the DNA helix", "A proofreading function to correct errors", "It provides energy for replication", "It adds a protective cap to the DNA"],
            answerIndex: 1
          }
        },
        { 
          text: "The discovery of the double helix structure of DNA by Watson and Crick in 1953, based on the work of Rosalind Franklin, was a landmark moment in the history of science.", 
          unlockedBySubUpgradeId: 'dna_doublehelix',
          quiz: {
            question: "Whose crucial X-ray diffraction work was used to determine the double helix structure of DNA?",
            options: ["Watson and Crick", "Linus Pauling", "Erwin Chargaff", "Rosalind Franklin"],
            answerIndex: 3
          }
        },
        { 
          text: "Replication doesn't start randomly. It begins at specific sites on the chromosome called 'origins of replication'. Bacteria have one, while eukaryotes have thousands to speed up the process.", 
          unlockedBySubUpgradeId: 'dna_origin_rep',
          quiz: {
            question: "Why do eukaryotes have thousands of 'origins of replication' while bacteria have only one?",
            options: ["To slow down the process", "To speed up the process of copying much larger genomes", "To introduce more mutations", "Bacterial DNA is circular"],
            answerIndex: 1
          }
        }
      ],
      subUpgrades: [
        { id: 'dna_proofreading', name: 'DNA Polymerase Proofreading', description: 'Improve proofreading to reduce mutations, significantly boosting protocell resilience.', cost: () => ({ resource: Resource.Nucleotides, amount: 150 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 10 }] },
        { id: 'dna_semiconservative', name: 'Semi-Conservative Replication', description: 'Perfect the replication process, improving Nucleotide generation.', cost: () => ({ resource: Resource.Nucleotides, amount: 200 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Nucleotides, value: 1 }] },
        { id: 'dna_doublehelix', name: 'Stabilize Double Helix', description: 'A more stable helix increases your Nucleotide storage capacity.', cost: () => ({ resource: Resource.Nucleotides, amount: 250 }), effects: [{ type: 'INCREASE_CAPACITY', resource: Resource.Nucleotides, value: 1000 }] },
        { id: 'dna_genetic_library', name: 'Genetic Library', description: 'A stable genetic library allows for more complex tasks, increasing max Hands.', cost: () => ({ resource: Resource.Nucleotides, amount: 300 }), effects: [{ type: 'INCREASE_MAX_HANDS', value: 10 }] },
        { id: 'dna_origin_rep', name: 'Optimize Replication Origins', description: 'Increase the number of replication origins to speed up DNA synthesis.', cost: () => ({ resource: Resource.Nucleotides, amount: 350 }), effects: [{ type: 'INCREASE_GENERATION_MULTIPLIER', resource: Resource.Nucleotides, value: 0.1 }] }
      ]
    }
  },
  {
    id: 'dna_repair',
    name: 'DNA Repair',
    description: 'Develop enzymatic pathways to find and correct damage to DNA molecules, safeguarding the genome.',
    cost: [{ resource: Resource.Nucleotides, amount: 1200 }, { resource: Resource.ATP, amount: 1000 }],
    position: { x: 78, y: 44 },
    effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 10 }],
    icon: 'dna_repair',
    dependencies: ['dna_replication'],
    panelContent: {
        facts: [
            { 
              text: "Cells have a sophisticated suite of DNA repair mechanisms, such as base excision repair and nucleotide excision repair, to fix different types of damage caused by mutagens or replication errors.",
              quiz: {
                question: "What is the general purpose of cellular DNA repair mechanisms?",
                options: ["To speed up mutations", "To find and correct damage to DNA", "To help the cell divide", "To create new genes"],
                answerIndex: 1
              }
            },
            { 
              text: "The importance of DNA repair is highlighted by diseases like xeroderma pigmentosum, where individuals have a deficient repair system and are extremely sensitive to UV light, leading to a high risk of skin cancer.", 
              unlockedBySubUpgradeId: 'dr_efficiency',
              quiz: {
                question: "Xeroderma pigmentosum is a disease caused by a deficiency in what cellular process?",
                options: ["Energy production", "DNA repair", "Protein folding", "Cellular respiration"],
                answerIndex: 1
              }
            }
        ],
        subUpgrades: [
            { id: 'dr_efficiency', name: 'Repair Efficiency', description: 'Improve the speed and accuracy of DNA repair, greatly boosting protocell resilience.', cost: () => ({ resource: Resource.ATP, amount: 2000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 15 }] },
            { id: 'dr_double_strand', name: 'Double-Strand Break Repair', description: 'Mastering the repair of the most dangerous DNA damage further boosts resilience.', cost: () => ({ resource: Resource.ATP, amount: 2500 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 5 }] },
        ]
    }
  },
  {
    id: 'transcription_factors',
    name: 'Transcription Factors',
    description: 'Evolve proteins that bind to specific DNA sequences to control which genes are turned on or off.',
    cost: [{ resource: Resource.AminoAcids, amount: 2500 }],
    position: { x: 88, y: 55 },
    effects: [{ type: 'INCREASE_MAX_HANDS', value: 10 }],
    icon: 'transcription_factors',
    dependencies: ['rna_interference'],
    panelContent: {
        facts: [
            { 
              text: "Transcription factors are essential for gene regulation and are fundamental to cellular differentiation and development, allowing different cell types to express different sets of genes.",
              quiz: {
                question: "What is the primary role of transcription factors?",
                options: ["To provide energy to the cell", "To form the cell's structure", "To control which genes are turned on or off", "To repair damaged DNA"],
                answerIndex: 2
              }
            },
            { 
              text: "They typically have a DNA-binding domain that recognizes a specific sequence and an activation/repression domain that interacts with other proteins to control transcription.", 
              unlockedBySubUpgradeId: 'tf_control',
              quiz: {
                question: "What are the two main domains of a typical transcription factor?",
                options: ["A water-soluble domain and a fat-soluble domain", "An acidic domain and a basic domain", "A DNA-binding domain and an activation/repression domain", "A catalytic domain and a structural domain"],
                answerIndex: 2
              }
            }
        ],
        subUpgrades: [
            { id: 'tf_control', name: 'Gene Expression Control', description: 'Mastery over gene expression allows for more complex biological manipulation.', cost: () => ({ resource: Resource.AminoAcids, amount: 3500 }), effects: [{ type: 'INCREASE_MAX_HANDS', value: 15 }] },
            { id: 'tf_combinatorial', name: 'Combinatorial Control', description: 'Use multiple transcription factors to achieve fine-tuned gene expression, improving efficiency.', cost: () => ({ resource: Resource.AminoAcids, amount: 4000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'efficiency', value: 5 }] },
        ]
    }
  },
  {
    id: 'p53_protein',
    name: 'p53 Tumor Suppressor',
    description: 'Evolve a tumor suppressor protein that regulates the cell cycle and prevents cancer.',
    cost: [{ resource: Resource.AminoAcids, amount: 8000 }],
    position: { x: 25, y: 58 },
    effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 10 }],
    icon: 'p53_protein',
    dependencies: ['actin_cytoskeleton'],
    panelContent: {
        facts: [
            { 
              text: "p53 is a transcription factor that can activate DNA repair, halt the cell cycle at the G1/S regulation point, or initiate apoptosis (programmed cell death) if DNA damage is irreparable.",
              quiz: {
                question: "Which of the following is NOT a function of the p53 protein?",
                options: ["Activating DNA repair", "Halting the cell cycle", "Initiating apoptosis", "Speeding up cell division"],
                answerIndex: 3
              }
            },
            { 
              text: "The gene that codes for p53, TP53, is the most frequently mutated gene in human cancers. Its inactivation is a key step in tumor development.", 
              unlockedBySubUpgradeId: 'p53_cancer',
              quiz: {
                question: "Mutations in the TP53 gene are commonly associated with what disease?",
                options: ["Diabetes", "Cancer", "Influenza", "Heart disease"],
                answerIndex: 1
              }
            },
            { 
              text: "Elephants have 20 copies of the p53 gene, which is thought to contribute to their remarkable resistance to cancer, a phenomenon known as Peto's Paradox.", 
              unlockedBySubUpgradeId: 'p53_apoptosis',
              quiz: {
                question: "Why are elephants thought to be highly resistant to cancer?",
                options: ["They have a very slow metabolism", "They have a simple cellular structure", "They have multiple copies of the p53 gene", "They do not get exposed to carcinogens"],
                answerIndex: 2
              }
            }
        ],
        subUpgrades: [
            { id: 'p53_cycle_arrest', name: 'Cell Cycle Arrest', description: 'Improve the ability to halt the cell cycle, boosting protocell resilience.', cost: () => ({ resource: Resource.AminoAcids, amount: 9000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 10 }] },
            { id: 'p53_cancer', name: 'Cancer Resistance', description: 'Resistance to uncontrolled growth improves efficiency.', cost: () => ({ resource: Resource.AminoAcids, amount: 10000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'efficiency', value: 5 }] },
            { id: 'p53_apoptosis', name: 'Apoptosis Induction', description: 'Perfect programmed cell death to eliminate damaged cells, greatly improving resilience.', cost: () => ({ resource: Resource.AminoAcids, amount: 11000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 10 }] }
        ]
    }
  },
  {
    id: 'eukaryotic_cell',
    name: 'Eukaryotic Cell',
    description: 'Develop a cell with a nucleus and other membrane-bound organelles.',
    cost: [{ resource: Resource.Nucleotides, amount: 2000 }, { resource: Resource.AminoAcids, amount: 2000 }],
    position: { x: 85, y: 65 },
    effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 20 }],
    icon: 'eukaryotic_cell',
    dependencies: ['antioxidant_defense', 'telomere_maintenance', 'transcription_factors'],
    panelContent: {
        facts: [
            { 
              text: "Eukaryotic cells are distinguished by having a membrane-bound nucleus, which houses the cell's genetic material, and other specialized organelles that perform specific functions.",
              quiz: {
                question: "What is the key distinguishing feature of a eukaryotic cell?",
                options: ["A cell wall", "A membrane-bound nucleus", "Ribosomes", "A flagellum for movement"],
                answerIndex: 1
              }
            },
            { 
              text: "Compartmentalization allows different chemical reactions to occur simultaneously in different parts of the cell without interfering with each other, a huge leap in efficiency.", 
              unlockedBySubUpgradeId: 'ec_compartmentalization',
              quiz: {
                question: "What is the main advantage of compartmentalization in eukaryotic cells?",
                options: ["It makes the cell larger", "It allows different, incompatible reactions to occur at the same time", "It helps the cell store more water", "It protects the cell from viruses"],
                answerIndex: 1
              }
            },
            { 
              text: "The Golgi apparatus acts like a post office, modifying, sorting, and packaging proteins and lipids for secretion or delivery to other organelles.", 
              unlockedBySubUpgradeId: 'ec_endomembrane',
              quiz: {
                question: "Which organelle acts like a 'post office' for the cell?",
                options: ["The nucleus", "The mitochondrion", "The Golgi apparatus", "The ribosome"],
                answerIndex: 2
              }
            }
        ],
        subUpgrades: [
            { id: 'ec_compartmentalization', name: 'Compartmentalization', description: 'Specialized organelles improve the efficiency of all synthesis tasks.', cost: () => ({ resource: Resource.AminoAcids, amount: 3000 }), effects: [{ type: 'INCREASE_MAX_HANDS', value: 5 }] },
            { id: 'ec_endomembrane', name: 'Endomembrane System', description: 'An efficient internal factory improves all biological resource generation.', cost: () => ({ resource: Resource.AminoAcids, amount: 4000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.AminoAcids, value: 1 }, { type: 'ADD_BASE_GENERATION', resource: Resource.Nucleotides, value: 1 }] },
            { id: 'ec_nucleus', name: 'Nuclear Envelope', description: 'Protecting the DNA within a nucleus improves protocell resilience.', cost: () => ({ resource: Resource.AminoAcids, amount: 5000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 10 }] }
        ]
    }
  },
  {
    id: 'endosymbiosis',
    name: 'Endosymbiosis',
    description: 'A prokaryotic cell is engulfed by another, evolving into a mitochondrion and revolutionizing energy production.',
    cost: [{ resource: Resource.ATP, amount: 5000 }],
    position: { x: 90, y: 80 },
    effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.ATP, value: 10 }],
    icon: 'endosymbiosis',
    dependencies: ['circadian_rhythm'],
    panelContent: {
        facts: [
            { 
              text: "The theory of endosymbiosis proposes that mitochondria and chloroplasts were once free-living prokaryotic organisms that were engulfed by an ancestral eukaryotic cell. This symbiotic relationship became permanent over time.",
              quiz: {
                question: "According to the theory of endosymbiosis, what were mitochondria originally?",
                options: ["Waste products", "Free-living prokaryotic organisms", "Part of the cell nucleus", "Specialized fat storage units"],
                answerIndex: 1
              }
            },
            { 
              text: "Strong evidence for this theory includes the fact that mitochondria have their own circular DNA, similar to bacteria, and they replicate independently of the host cell.", 
              unlockedBySubUpgradeId: 'es_mitochondria',
              quiz: {
                question: "Which of the following is strong evidence for the endosymbiotic theory?",
                options: ["Mitochondria produce energy", "Mitochondria are found in all cells", "Mitochondria have their own circular DNA, similar to bacteria", "Mitochondria are spherical"],
                answerIndex: 2
              }
            },
            { 
              text: "This event is believed to have happened only once for mitochondria in the entire history of life, meaning all eukaryotes (including us) descend from this single ancient event.", 
              unlockedBySubUpgradeId: 'es_energy',
              quiz: {
                question: "How many times is the endosymbiotic event for mitochondria believed to have occurred in the history of life?",
                options: ["Billions of times", "Many thousands of times", "Twice", "Only once"],
                answerIndex: 3
              }
            }
        ],
        subUpgrades: [
            { id: 'es_mitochondria', name: 'Mitochondrial Efficiency', description: 'Optimize the new "powerhouse" of the cell to greatly boost passive ATP generation.', cost: () => ({ resource: Resource.ATP, amount: 7500 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.ATP, value: 20 }] },
            { id: 'es_energy', name: 'Energy Surplus', description: 'The vast energy surplus improves protocell efficiency.', cost: () => ({ resource: Resource.ATP, amount: 10000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'efficiency', value: 15 }] },
            { id: 'es_integration', name: 'Genetic Integration', description: 'Transfer some mitochondrial genes to the host nucleus for better control, improving resilience.', cost: () => ({ resource: Resource.ATP, amount: 12000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 5 }] }
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
    dependencies: ['dna_repair'],
    panelContent: {
        facts: [
            { 
              text: "Photosynthesis is the process used by plants, algae, and some bacteria to convert light energy into chemical energy, through a process that converts carbon dioxide and water into sugars and oxygen.",
              quiz: {
                question: "What are the primary inputs for photosynthesis?",
                options: ["Oxygen and sugar", "Light energy, carbon dioxide, and water", "Nitrogen and carbon", "ATP and DNA"],
                answerIndex: 1
              }
            },
            { 
              text: "The oxygen we breathe is a waste product of photosynthesis. The 'Great Oxidation Event' 2.4 billion years ago, caused by early photosynthetic cyanobacteria, transformed Earth's atmosphere and paved the way for aerobic life.", 
              unlockedBySubUpgradeId: 'ps_chloroplasts',
              quiz: {
                question: "The oxygen in Earth's atmosphere is primarily a waste product of what process?",
                options: ["Volcanic activity", "Cellular respiration", "Photosynthesis", "Radioactive decay"],
                answerIndex: 2
              }
            },
            { 
              text: "The green color of most plants comes from the pigment chlorophyll, which is excellent at absorbing red and blue light, but reflects green light.", 
              unlockedBySubUpgradeId: 'ps_calvin',
              quiz: {
                question: "Why do most plants appear green?",
                options: ["They absorb green light", "They reflect green light", "They have copper in their leaves", "The sky's reflection makes them look green"],
                answerIndex: 1
              }
            }
        ],
        subUpgrades: [
            { id: 'ps_chloroplasts', name: 'Chloroplast Optimization', description: 'Improve the light-capturing ability of chloroplasts, boosting passive ATP generation.', cost: () => ({ resource: Resource.ATP, amount: 6000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.ATP, value: 25 }] },
            { id: 'ps_calvin', name: 'Calvin Cycle Efficiency', description: 'Improve the efficiency of carbon fixation, passively generating Carbon.', cost: () => ({ resource: Resource.ATP, amount: 8000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Carbon, value: 2 }] },
            { id: 'ps_antenna', name: 'Antenna Complexes', description: 'Develop antenna complexes to funnel light energy more effectively, improving protocell efficiency.', cost: () => ({ resource: Resource.ATP, amount: 10000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'efficiency', value: 10 }] },
        ]
    }
  },
  {
    id: 'multicellularity',
    name: 'Multicellularity',
    description: 'Cells begin to cooperate and specialize, forming complex, multicellular organisms.',
    cost: [{ resource: Resource.AminoAcids, amount: 10000 }],
    position: { x: 70, y: 88 },
    effects: [{ type: 'INCREASE_MAX_HANDS', value: 10 }],
    icon: 'multicellularity',
    dependencies: ['gas_bladder', 'homeostasis'],
    panelContent: {
        facts: [
            { 
              text: "Multicellularity has evolved independently multiple times in Earth's history. It allows organisms to grow larger and for cells to differentiate and perform specialized functions.",
              quiz: {
                question: "What is a major advantage of multicellularity?",
                options: ["It allows organisms to reproduce faster", "It allows for cell specialization", "It makes organisms simpler", "It requires less energy"],
                answerIndex: 1
              }
            },
            { 
              text: "Cell adhesion molecules are crucial for multicellularity, acting as the 'glue' that holds cells together to form tissues.", 
              unlockedBySubUpgradeId: 'mc_specialization',
              quiz: {
                question: "What type of molecule is crucial for holding cells together in a multicellular organism?",
                options: ["Water molecules", "Cell adhesion molecules", "ATP molecules", "DNA molecules"],
                answerIndex: 1
              }
            },
            { 
              text: "The transition to multicellularity also required the evolution of programmed cell death (apoptosis) to eliminate damaged or unneeded cells for the good of the whole organism.", 
              unlockedBySubUpgradeId: 'mc_communication',
              quiz: {
                question: "What process was essential for sculpting tissues and removing damaged cells in multicellular organisms?",
                options: ["Rapid cell division", "Programmed cell death (apoptosis)", "Constant mutation", "Cellular hibernation"],
                answerIndex: 1
              }
            }
        ],
        subUpgrades: [
            { id: 'mc_specialization', name: 'Cellular Specialization', description: 'Coordinated cells work more effectively, granting more Max Hands.', cost: () => ({ resource: Resource.AminoAcids, amount: 15000 }), effects: [{ type: 'INCREASE_MAX_HANDS', value: 10 }] },
            { id: 'mc_communication', name: 'Intercellular Signaling', description: 'Improve cell-to-cell communication, boosting all biological resource generation.', cost: () => ({ resource: Resource.AminoAcids, amount: 20000 }), effects: [{ type: 'INCREASE_GENERATION_MULTIPLIER', resource: Resource.AminoAcids, value: 0.1 }] },
            { id: 'mc_development', name: 'Developmental Programs', description: 'Develop genetic programs for building a complex body, increasing protocell resilience.', cost: () => ({ resource: Resource.AminoAcids, amount: 25000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 10 }] },
        ]
    }
  },
  {
    id: 'circulatory_system',
    name: 'Circulatory System',
    description: 'Evolve a system of vessels and a pump to transport nutrients and oxygen throughout a large body.',
    cost: [{ resource: Resource.ATP, amount: 18000 }, {resource: Resource.Iron, amount: 5000}],
    position: { x: 75, y: 82 },
    effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'efficiency', value: 15 }],
    icon: 'circulatory_system',
    dependencies: ['cambrian_explosion'],
    panelContent: {
        facts: [
            { 
              text: "Circulatory systems can be open, where blood flows freely in a body cavity (hemocoel), or closed, where blood is confined to vessels. Closed systems allow for higher pressure and more efficient transport, enabling larger and more active animals.",
              quiz: {
                question: "What is the main advantage of a closed circulatory system over an open one?",
                options: ["It uses less energy", "It is simpler to evolve", "It allows for higher pressure and more efficient transport", "It does not require a heart"],
                answerIndex: 2
              }
            },
            { 
              text: "The four-chambered heart of mammals and birds, which completely separates oxygenated and deoxygenated blood, is an example of convergent evolution.", 
              unlockedBySubUpgradeId: 'cs_efficiency',
              quiz: {
                question: "The evolution of a four-chambered heart in both birds and mammals is an example of what?",
                options: ["Genetic drift", "Vestigial structures", "Convergent evolution", "Punctuated equilibrium"],
                answerIndex: 2
              }
            }
        ],
        subUpgrades: [
            { id: 'cs_efficiency', name: 'Transport Efficiency', description: 'A more efficient circulatory system greatly improves protocell efficiency.', cost: () => ({ resource: Resource.ATP, amount: 25000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'efficiency', value: 20 }] },
            { id: 'cs_four_chamber', name: 'Four-Chambered Heart', description: 'Develop a highly efficient heart, boosting protocell speed.', cost: () => ({ resource: Resource.ATP, amount: 30000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'speed', value: 10 }] },
        ]
    }
  },
  {
    id: 'limitless_manipulation',
    name: 'Collective Consciousness',
    description: 'Develop a hive-mind link between biological units, allowing for unparalleled coordination. Unlocks repeatable upgrades.',
    cost: [{ resource: Resource.AminoAcids, amount: 20000 }],
    position: { x: 82, y: 95 },
    effects: [],
    icon: 'hive_mind',
    dependencies: ['sexual_reproduction'],
    panelContent: {
      facts: [
        { 
          text: "A collective consciousness allows for near-instantaneous communication and task delegation across trillions of individual cells, dramatically increasing manipulative capacity.",
          quiz: {
            question: "What is the primary advantage of a collective consciousness?",
            options: ["Increased individual intelligence", "Near-instantaneous communication and coordination", "Reduced energy consumption", "Enhanced physical strength"],
            answerIndex: 1
          }
        },
        { 
          text: "This level of integration transcends a simple nervous system, bordering on a single, unified organism with countless bodies.", 
          unlockedBySubUpgradeId: 'hands_inf_cap',
          quiz: {
            question: "How does a hive mind differ from a simple nervous system?",
            options: ["It is much slower", "It borders on being a single organism with many bodies", "It can only control one body", "It does not require a brain"],
            answerIndex: 1
          }
        },
        { 
          text: "The processing power of a hive mind allows for complex problem-solving and environmental manipulation on a scale impossible for individual units.", 
          unlockedBySubUpgradeId: 'hands_inf_efficiency',
          quiz: {
            question: "What capability does the processing power of a hive mind enable?",
            options: ["The ability to fly", "Perfect camouflage", "Complex problem-solving on a large scale", "The ability to breathe underwater"],
            answerIndex: 2
          }
        },
      ],
      subUpgrades: [
        {
          id: 'hands_inf_cap',
          name: 'Expand Hands Limit',
          description: 'Strengthen the psychic link, increasing your maximum Hands capacity.',
          cost: (level) => ({ resource: Resource.AminoAcids, amount: Math.floor(5000 * Math.pow(1.5, level)) }),
          effects: [{ type: 'INCREASE_MAX_HANDS', value: 10 }],
          repeatable: {}
        },
        {
          id: 'hands_inf_efficiency',
          name: 'Hive Mind Efficiency',
          description: 'Improve the efficiency of the collective, slightly boosting all biological resource generation.',
          cost: (level) => ({ resource: Resource.ATP, amount: Math.floor(10000 * Math.pow(1.8, level)) }),
          effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.AminoAcids, value: 1 }, { type: 'ADD_BASE_GENERATION', resource: Resource.Nucleotides, value: 1 }],
          repeatable: {}
        },
        {
          id: 'hands_inf_processing',
          name: 'Parallel Processing',
          description: 'Improve the hive mind\'s parallel processing, improving protocell efficiency.',
          cost: (level) => ({ resource: Resource.ATP, amount: Math.floor(15000 * Math.pow(2, level)) }),
          effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'efficiency', value: 1 }],
          repeatable: {}
        }
      ]
    }
  },
];