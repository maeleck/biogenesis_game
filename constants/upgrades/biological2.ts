

import { Upgrade, Resource } from '../../types';

export const biologicalUpgrades2: Upgrade[] = [
  {
    id: 'cambrian_explosion',
    name: 'Cambrian Explosion',
    description: 'A sudden burst of evolutionary innovation leads to a wide diversity of complex life forms.',
    cost: [{ resource: Resource.ATP, amount: 1500 }],
    position: { x: 62, y: 78 },
    effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.AminoAcids, value: 0.5 }, { type: 'ADD_BASE_GENERATION', resource: Resource.Nucleotides, value: 0.5 }],
    icon: 'cambrian_explosion',
    dependencies: ['endoskeleton', 'extinction_event', 'hox_genes'],
    panelContent: {
        facts: [
            { 
              text: "The Cambrian explosion, about 541 million years ago, was a period of rapid diversification of life where most major animal phyla appeared in the fossil record. The cause is a subject of intense scientific debate.",
              quiz: {
                question: "What was the Cambrian explosion?",
                options: ["A massive volcanic eruption", "A period of rapid diversification of life", "The impact that killed the dinosaurs", "The formation of the first stars"],
                answerIndex: 1
              }
            },
            { 
              text: "Possible triggers include rising oxygen levels, the evolution of predation, and the development of key genetic toolkits like HOX genes.", 
              unlockedBySubUpgradeId: 'ce_diversity',
              quiz: {
                question: "Which of these is NOT considered a possible trigger for the Cambrian explosion?",
                options: ["Rising oxygen levels", "The evolution of predation", "The development of HOX genes", "The formation of the Moon"],
                answerIndex: 3
              }
            },
            { 
              text: "Fossils from the Burgess Shale in Canada provide an incredible snapshot of this period, showing bizarre creatures like the five-eyed Opabinia and the formidable predator Anomalocaris.", 
              unlockedBySubUpgradeId: 'ce_predation',
              quiz: {
                question: "Fossils from which location provide a famous 'snapshot' of the Cambrian explosion?",
                options: ["The La Brea Tar Pits", "The Burgess Shale", "The Green River Formation", "The Messel Pit"],
                answerIndex: 1
              }
            },
            {
              text: "Trilobites were one of the most successful early animal groups, dominating the oceans for over 270 million years before going extinct. They were arthropods, related to modern insects and crustaceans.",
              quiz: {
                  question: "Trilobites, one of the most successful early animal groups, were a type of what?",
                  options: ["Mollusc", "Arthropod", "Annelid worm", "Echinoderm"],
                  answerIndex: 1
              }
            }
        ],
        subUpgrades: [
            { id: 'ce_diversity', name: 'Genetic Diversity', description: 'A wider gene pool passively generates all biological resources.', cost: () => ({ resource: Resource.ATP, amount: 2000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.PrimordialSoup, value: 1 }, { type: 'ADD_BASE_GENERATION', resource: Resource.AminoAcids, value: 1 }, { type: 'ADD_BASE_GENERATION', resource: Resource.Nucleotides, value: 1 }] },
            { id: 'ce_predation', name: 'Evolution of Predation', description: 'The new arms race between predator and prey improves protocell speed and resilience.', cost: () => ({ resource: Resource.ATP, amount: 2500 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'speed', value: 10 }, { type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 10 }] },
            { id: 'ce_body_plans', name: 'Novel Body Plans', description: 'Experimentation with new body plans grants more max Hands.', cost: () => ({ resource: Resource.ATP, amount: 3000 }), effects: [{ type: 'INCREASE_MAX_HANDS', value: 5 }] },
        ]
    }
  },
  {
    id: 'exoskeleton',
    name: 'Exoskeleton',
    description: 'Develop a hard external skeleton made of chitin for protection and structural support.',
    cost: [{ resource: Resource.Carbon, amount: 2000 }, {resource: Resource.AminoAcids, amount: 1500}],
    position: { x: 40, y: 72 },
    effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 15 }],
    icon: 'exoskeleton',
    dependencies: ['telomerase_enzyme'],
    panelContent: {
        facts: [
            { 
              text: "Exoskeletons provide excellent protection against predators and the environment, but must be periodically shed (molted) to allow for growth, leaving the animal vulnerable.",
              quiz: {
                question: "What is a major disadvantage of an exoskeleton?",
                options: ["It is very heavy", "It cannot be repaired", "It must be shed for the animal to grow", "It dissolves in water"],
                answerIndex: 2
              }
            },
            { 
              text: "The success of arthropods (insects, crustaceans, arachnids), the most diverse animal phylum, is largely attributed to their versatile exoskeleton.", 
              unlockedBySubUpgradeId: 'exo_protection',
              quiz: {
                question: "The success of which animal phylum is largely attributed to the exoskeleton?",
                options: ["Molluscs", "Chordates", "Arthropods", "Cnidarians"],
                answerIndex: 2
              }
            },
            {
              text: "The primary structural component of an arthropod's exoskeleton is chitin, a long-chain polymer of N-acetylglucosamine. It is the second most abundant natural biopolymer in the world, after cellulose.",
              quiz: {
                  question: "What is the primary structural component of an arthropod's exoskeleton?",
                  options: ["Cellulose", "Keratin", "Collagen", "Chitin"],
                  answerIndex: 3
              }
            }
        ],
        subUpgrades: [
            { id: 'exo_protection', name: 'Enhanced Protection', description: 'A stronger exoskeleton greatly boosts protocell resilience.', cost: () => ({ resource: Resource.Carbon, amount: 3000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 20 }] },
            { id: 'exo_segmentation', name: 'Jointed Limbs', description: 'Develop jointed limbs for better movement, improving protocell speed.', cost: () => ({ resource: Resource.Carbon, amount: 3500 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'speed', value: 5 }] },
        ]
    }
  },
  {
    id: 'endoskeleton',
    name: 'Endoskeleton',
    description: 'Develop an internal skeleton of mineralized tissue, allowing for larger body sizes and continuous growth.',
    cost: [{ resource: Resource.Rock, amount: 2000 }, { resource: Resource.Carbon, amount: 1500 }],
    position: { x: 55, y: 70 },
    effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 10 }, { type: 'INCREASE_MAX_HANDS', value: 5 }],
    icon: 'endoskeleton',
    dependencies: ['ribosomes'],
    panelContent: {
        facts: [
            { 
              text: "Unlike an exoskeleton, an internal skeleton can grow along with the organism and provides a framework for muscles to attach to, enabling more efficient movement.",
              quiz: {
                question: "What is a major advantage of an endoskeleton compared to an exoskeleton?",
                options: ["It is more protective", "It can grow along with the organism", "It is lighter", "It does not require minerals"],
                answerIndex: 1
              }
            },
            { 
              text: "Bone is a living tissue that is constantly being remodeled by cells called osteoblasts (which build bone) and osteoclasts (which break it down).", 
              unlockedBySubUpgradeId: 'endo_support',
              quiz: {
                question: "What are the cells that build bone called?",
                options: ["Osteoclasts", "Chondrocytes", "Osteocytes", "Osteoblasts"],
                answerIndex: 3
              }
            },
            {
              text: "In addition to providing support, the endoskeleton serves as a site for hematopoiesis, the production of new blood cells, which occurs in the bone marrow.",
              quiz: {
                  question: "What vital process, besides providing support, occurs in the bone marrow of an endoskeleton?",
                  options: ["Digestion", "Nerve signal transmission", "Hormone production", "Blood cell production"],
                  answerIndex: 3
              }
            }
        ],
        subUpgrades: [
            { id: 'endo_support', name: 'Structural Support', description: 'A stronger internal frame allows for more complex tasks, increasing max Hands.', cost: () => ({ resource: Resource.Rock, amount: 3000 }), effects: [{ type: 'INCREASE_MAX_HANDS', value: 10 }] },
            { id: 'endo_calcium', name: 'Calcium Phosphate', description: 'Develop strong calcium phosphate bones, improving protocell resilience.', cost: () => ({ resource: Resource.Rock, amount: 3500 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 10 }] },
        ]
    }
  },
  {
    id: 'nervous_system',
    name: 'Nervous System',
    description: 'Develop a network of specialized cells for transmitting information and coordinating actions.',
    cost: [{ resource: Resource.ATP, amount: 2500 }],
    position: { x: 50, y: 90 },
    effects: [{ type: 'INCREASE_MAX_HANDS', value: 20 }],
    icon: 'nervous_system',
    dependencies: ['evolution_of_vision', 'vibration_sensing'],
    panelContent: {
        facts: [
            { 
              text: "The simplest nervous systems, or nerve nets, belong to creatures like jellyfish and sea anemones. More complex nervous systems with brains allow for advanced behaviors, learning, and consciousness.",
              quiz: {
                question: "Which creatures have some of the simplest nervous systems, known as nerve nets?",
                options: ["Insects", "Fish", "Jellyfish", "Mammals"],
                answerIndex: 2
              }
            },
            { 
              text: "Neurons transmit signals as electrical impulses called action potentials. They communicate with each other at junctions called synapses, using chemical neurotransmitters.", 
              unlockedBySubUpgradeId: 'ns_centralization',
              quiz: {
                question: "How do neurons communicate with each other at junctions called synapses?",
                options: ["Using direct electrical contact", "Using magnetic pulses", "Using chemical neurotransmitters", "Using sound waves"],
                answerIndex: 2
              }
            },
            { 
              text: "Glial cells, once thought to be just 'glue' for neurons, are now known to play active roles in signal transmission, nutrient supply, and immune defense in the nervous system.", 
              unlockedBySubUpgradeId: 'ns_myelination',
              quiz: {
                question: "Besides providing support, what is a newly discovered role of glial cells?",
                options: ["Digesting waste products", "Storing memories", "Active roles in signal transmission", "Producing adrenaline"],
                answerIndex: 2
              }
            },
            {
              text: "The longest axon in the human body belongs to the sciatic nerve, which runs from the base of the spine to the big toe of each foot.",
              quiz: {
                  question: "The longest axon in the human body runs from the base of the spine to where?",
                  options: ["The fingertips", "The big toe", "The top of the head", "The heart"],
                  answerIndex: 1
              }
            }
        ],
        subUpgrades: [
            { id: 'ns_centralization', name: 'Centralization (Brain)', description: 'A centralized brain provides much finer control, increasing Max Hands.', cost: () => ({ resource: Resource.ATP, amount: 3500 }), effects: [{ type: 'INCREASE_MAX_HANDS', value: 25 }] },
            { id: 'ns_myelination', name: 'Myelin Sheaths', description: 'Faster signal transmission improves protocell speed.', cost: () => ({ resource: Resource.ATP, amount: 4000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'speed', value: 10 }] },
            { id: 'ns_synaptic_plasticity', name: 'Synaptic Plasticity', description: 'The ability to strengthen or weaken synapses is the basis of learning and memory, improving efficiency.', cost: () => ({ resource: Resource.ATP, amount: 4500 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'efficiency', value: 10 }] },
        ]
    }
  },
  {
    id: 'extinction_event',
    name: 'Extinction Event',
    description: 'A catastrophic event wipes out a majority of life, but the survivors repopulate the world with greater resilience.',
    cost: [{ resource: Resource.ATP, amount: 5000 }, { resource: Resource.AminoAcids, amount: 5000 }, { resource: Resource.Nucleotides, amount: 5000 }],
    position: { x: 50, y: 75 },
    effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.ATP, value: 100 }, { type: 'UNLOCK_FEATURE', value: 'manufacturing' }, { type: 'UNLOCK_FEATURE', value: 'rush' }],
    icon: 'extinction_event',
    dependencies: ['endoskeleton'],
    panelContent: {
        facts: [
            { 
              text: "There have been five major mass extinctions in Earth's history. While devastating, they also open up ecological niches, allowing for the evolution and diversification of new life forms.",
              quiz: {
                question: "What is a major evolutionary consequence of mass extinctions?",
                options: ["Life becomes less complex", "They open up niches for new life to diversify", "Evolution stops completely", "The planet becomes uninhabitable"],
                answerIndex: 1
              }
            },
            { 
              text: "The Permian-Triassic extinction, or 'The Great Dying', was the most severe, wiping out about 96% of all marine species and 70% of terrestrial vertebrate species.", 
              unlockedBySubUpgradeId: 'ee_resilience',
              quiz: {
                question: "What is the nickname for the most severe mass extinction, the Permian-Triassic event?",
                options: ["'The Big Chill'", "'The Great Dying'", "'The Final Flash'", "'The Watery Grave'"],
                answerIndex: 1
              }
            },
            { 
              text: "The Cretaceous-Paleogene extinction, which wiped out the dinosaurs 66 million years ago, was most likely caused by a massive asteroid impact in the Yucatán Peninsula.", 
              unlockedBySubUpgradeId: 'ee_adaptation',
              quiz: {
                question: "What is the leading theory for the cause of the extinction that wiped out the dinosaurs?",
                options: ["A massive volcanic eruption", "A sudden ice age", "A massive asteroid impact", "A deadly global pandemic"],
                answerIndex: 2
              }
            },
            {
              text: "The Cretaceous-Paleogene (K-Pg) extinction event is marked by a thin layer of sediment found all over the world that is rich in iridium, an element that is rare in Earth's crust but abundant in asteroids.",
              quiz: {
                  question: "What element, abundant in asteroids, marks the boundary of the K-Pg extinction event in the geological record?",
                  options: ["Carbon", "Oxygen", "Iridium", "Gold"],
                  answerIndex: 2
              }
            }
        ],
        subUpgrades: [
            { id: 'ee_resilience', name: 'Evolutionary Resilience', description: 'Life that survived the cataclysm is stronger, boosting all passive biological generation permanently.', cost: () => ({ resource: Resource.ATP, amount: 10000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.PrimordialSoup, value: 5 }, { type: 'ADD_BASE_GENERATION', resource: Resource.AminoAcids, value: 5 }, { type: 'ADD_BASE_GENERATION', resource: Resource.Nucleotides, value: 5 }, { type: 'ADD_BASE_GENERATION', resource: Resource.ATP, value: 5 }] },
            { 
              id: 'ee_adaptation', 
              name: 'Rapid Adaptation', 
              description: 'Life quickly radiates into newly opened ecological niches, improving overall efficiency and speed.', 
              cost: () => ({ resource: Resource.Nucleotides, amount: 10000 }), 
              effects: [
                { type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'speed', value: 10 },
                { type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'efficiency', value: 10 }
              ] 
            }
        ]
    }
  },
  {
    id: 'lipid_metabolism',
    name: 'Lipid Metabolism',
    description: 'Develop pathways to synthesize and break down lipids for energy storage and membrane construction.',
    cost: [{ resource: Resource.AminoAcids, amount: 20 }, { resource: Resource.ATP, amount: 15 }],
    position: { x: 70, y: 55 },
    effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 3 }],
    icon: 'lipid_metabolism',
    dependencies: ['glycolysis'],
    panelContent: {
        facts: [
            { 
              text: "Lipids (fats) are a more efficient form of long-term energy storage than carbohydrates because they are more reduced and stored without water.",
              quiz: {
                question: "Why are lipids a more efficient form of long-term energy storage than carbohydrates?",
                options: ["They are water-soluble", "They are more reduced and stored without water", "They are easier to break down", "They contain nitrogen"],
                answerIndex: 1
              }
            },
            { 
              text: "Beta-oxidation is the metabolic process involving multiple steps by which fatty acid molecules are broken down to produce energy.", 
              unlockedBySubUpgradeId: 'lm_beta_oxidation',
              quiz: {
                question: "What is the name of the process that breaks down fatty acids to produce energy?",
                options: ["Glycolysis", "Gluconeogenesis", "Beta-oxidation", "The Krebs Cycle"],
                answerIndex: 2
              }
            }
        ],
        subUpgrades: [
            { id: 'lm_storage', name: 'Energy Storage', description: 'Efficient fat storage improves protocell resilience.', cost: () => ({ resource: Resource.ATP, amount: 40 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 5 }] },
            { id: 'lm_beta_oxidation', name: 'Beta-Oxidation', description: 'Efficiently breaking down fats for energy improves protocell efficiency.', cost: () => ({ resource: Resource.ATP, amount: 50 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'efficiency', value: 5 }] },
        ]
    }
  },
  {
    id: 'glycogen_storage',
    name: 'Glycogen Storage',
    description: 'Polymerize glucose into glycogen for efficient, short-term energy storage.',
    cost: [{ resource: Resource.ATP, amount: 50 }],
    position: { x: 65, y: 48 },
    effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'efficiency', value: 2 }],
    icon: 'glycogen_storage',
    dependencies: ['glycolysis'],
    panelContent: {
        facts: [
            { 
              text: "Glycogen is the main form of glucose storage in animals and fungi. In humans, it is made and stored primarily in the cells of the liver and skeletal muscle.",
              quiz: {
                question: "Where is glycogen primarily stored in humans?",
                options: ["In the brain and heart", "In the stomach and intestines", "In the liver and skeletal muscle", "In the skin and bones"],
                answerIndex: 2
              }
            },
            { 
              text: "When the body needs a quick boost of energy or when the blood glucose level drops, the liver rapidly breaks down glycogen into glucose and releases it into the bloodstream.", 
              unlockedBySubUpgradeId: 'gs_efficiency',
              quiz: {
                question: "What is the primary purpose of glycogen stored in the liver?",
                options: ["To provide structural support", "To serve as long-term energy storage", "To provide a quick boost of glucose to the blood", "To aid in digestion"],
                answerIndex: 2
              }
            }
        ],
        subUpgrades: [
            { id: 'gs_efficiency', name: 'Rapid Mobilization', description: 'The ability to quickly access stored energy improves protocell speed.', cost: () => ({ resource: Resource.ATP, amount: 75 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'speed', value: 5 }] },
            { id: 'gs_capacity', name: 'Increase Capacity', description: 'Larger glycogen reserves improve protocell resilience.', cost: () => ({ resource: Resource.ATP, amount: 100 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 5 }] },
        ]
    }
  },
  {
    id: 'evolution_of_lungs',
    name: 'Evolution of Lungs',
    description: 'Develop internal gas-exchange organs, allowing for life on land and more active lifestyles.',
    cost: [{ resource: Resource.ATP, amount: 800 }],
    position: { x: 50, y: 85 },
    effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'efficiency', value: 10 }],
    icon: 'evolution_of_lungs',
    dependencies: ['nervous_system'],
    panelContent: {
        facts: [
            { 
              text: "Lungs are thought to have evolved from simple air sacs in the throats of ancient fish that allowed them to gulp air in low-oxygen water. These sacs later became the swim bladders in most modern fish.",
              quiz: {
                question: "Lungs in terrestrial vertebrates are thought to have evolved from what structure in ancient fish?",
                options: ["Gills", "Fins", "Air sacs in the throat", "The stomach"],
                answerIndex: 2
              }
            },
            { 
              text: "The invention of the amniotic egg, which prevents drying out, was a key adaptation that allowed the first reptiles to fully transition to life on land and break their dependence on water for reproduction.", 
              unlockedBySubUpgradeId: 'el_amniotic_egg',
              quiz: {
                question: "What key invention allowed the first reptiles to fully colonize the land?",
                options: ["The evolution of legs", "The development of scales", "The amniotic egg", "The ability to regulate body temperature"],
                answerIndex: 2
              }
            },
            { 
              text: "The diaphragm, a unique muscle in mammals, dramatically increases the efficiency of breathing compared to the rib-based breathing of reptiles and birds.", 
              unlockedBySubUpgradeId: 'el_diaphragm',
              quiz: {
                question: "What unique muscle in mammals makes their breathing particularly efficient?",
                options: ["The intercostal muscles", "The diaphragm", "The abdominal muscles", "The pectoral muscles"],
                answerIndex: 1
              }
            }
        ],
        subUpgrades: [
            { id: 'el_efficiency', name: 'Gas Exchange Efficiency', description: 'More efficient oxygen intake improves protocell efficiency.', cost: () => ({ resource: Resource.ATP, amount: 1000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'efficiency', value: 10 }] },
            { id: 'el_amniotic_egg', name: 'Amniotic Egg', description: 'The ability to reproduce on land improves protocell resilience.', cost: () => ({ resource: Resource.AminoAcids, amount: 800 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 10 }] },
            { id: 'el_diaphragm', name: 'Diaphragmatic Breathing', description: 'Superior breathing techniques improve protocell speed.', cost: () => ({ resource: Resource.ATP, amount: 1200 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'speed', value: 5 }] }
        ]
    }
  },
  {
    id: 'cellular_homeostasis',
    name: 'Cellular Homeostasis',
    description: 'Develop mechanisms to maintain a stable internal cellular environment despite external changes.',
    cost: [{ resource: Resource.ATP, amount: 150 }],
    position: { x: 75, y: 70 },
    effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 5 }],
    icon: 'cellular_homeostasis',
    dependencies: ['eukaryotic_cell'],
    panelContent: {
        facts: [
            { 
              text: "Homeostasis involves a dynamic equilibrium. It's a constant process of monitoring and adjusting internal conditions, like temperature and pH, to keep them within a narrow, optimal range.",
              quiz: {
                question: "What is the primary goal of homeostasis?",
                options: ["To grow as large as possible", "To reproduce as quickly as possible", "To maintain a stable internal environment", "To absorb energy from the sun"],
                answerIndex: 2
              }
            },
            { 
              text: "Negative feedback loops are the primary mechanism for maintaining homeostasis. For example, if your body temperature rises, mechanisms are triggered to cool it down, and vice versa.", 
              unlockedBySubUpgradeId: 'ch_feedback_loops',
              quiz: {
                question: "What is the primary mechanism for maintaining homeostasis?",
                options: ["Positive feedback loops", "Negative feedback loops", "Random chance", "Genetic mutation"],
                answerIndex: 1
              }
            }
        ],
        subUpgrades: [
            { id: 'ch_feedback_loops', name: 'Negative Feedback Loops', description: 'Better regulation of the internal environment improves protocell resilience.', cost: () => ({ resource: Resource.ATP, amount: 200 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 10 }] },
            { id: 'ch_osmoregulation', name: 'Osmoregulation', description: 'Control of water balance improves protocell efficiency.', cost: () => ({ resource: Resource.ATP, amount: 250 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'efficiency', value: 5 }] },
        ]
    }
  },
  {
    id: 'circadian_rhythm',
    name: 'Circadian Rhythm',
    description: 'Evolve an internal biological clock that synchronizes with the daily light-dark cycle.',
    cost: [{ resource: Resource.ATP, amount: 300 }],
    position: { x: 80, y: 75 },
    effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'efficiency', value: 5 }],
    icon: 'circadian_rhythm',
    dependencies: ['cellular_homeostasis'],
    panelContent: {
        facts: [
            { 
              text: "The circadian rhythm is controlled by a 'master clock' in the brain (the suprachiasmatic nucleus) and peripheral clocks in other tissues. It regulates sleep-wake cycles, hormone release, and metabolism.",
              quiz: {
                question: "What part of the brain acts as the 'master clock' for the circadian rhythm?",
                options: ["The cerebellum", "The hippocampus", "The suprachiasmatic nucleus", "The prefrontal cortex"],
                answerIndex: 2
              }
            },
            { 
              text: "The clock is based on a complex feedback loop of 'clock genes' and their protein products, which cycle over a roughly 24-hour period.", 
              unlockedBySubUpgradeId: 'cr_efficiency',
              quiz: {
                question: "What is the molecular basis of the circadian clock?",
                options: ["The buildup of sleep-inducing chemicals", "The rhythm of the heart beating", "A feedback loop of 'clock genes' and their proteins", "The regular intake of food"],
                answerIndex: 2
              }
            }
        ],
        subUpgrades: [
            { id: 'cr_efficiency', name: 'Metabolic Synchronization', description: 'Anticipating daily changes improves metabolic efficiency.', cost: () => ({ resource: Resource.ATP, amount: 400 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'efficiency', value: 10 }] },
            { id: 'cr_resilience', name: 'Predictable Cycles', description: 'A stable internal clock improves protocell resilience against environmental stress.', cost: () => ({ resource: Resource.ATP, amount: 450 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 5 }] },
        ]
    }
  },
  {
    id: 'antioxidant_defense',
    name: 'Antioxidant Defense',
    description: 'Develop enzymes like superoxide dismutase to neutralize harmful reactive oxygen species.',
    cost: [{ resource: Resource.AminoAcids, amount: 300 }],
    position: { x: 85, y: 60 },
    effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 5 }],
    icon: 'antioxidant_defense',
    dependencies: ['liposomes'],
    panelContent: {
        facts: [
            { 
              text: "Reactive oxygen species (ROS), or 'free radicals', are chemically reactive molecules containing oxygen. They are a natural byproduct of oxygen metabolism and can cause significant damage to cells.",
              quiz: {
                question: "What are 'free radicals'?",
                options: ["A type of nutrient", "Chemically reactive molecules containing oxygen that can damage cells", "A source of cellular energy", "A type of beneficial bacteria"],
                answerIndex: 1
              }
            },
            { 
              text: "Antioxidants, like Vitamin C and E, and enzymes like catalase, neutralize free radicals, preventing cellular damage. This defense system was essential for life to thrive in an oxygen-rich atmosphere.", 
              unlockedBySubUpgradeId: 'ad_catalase',
              quiz: {
                question: "What is the function of antioxidants?",
                options: ["To produce energy", "To build cell walls", "To neutralize free radicals", "To store genetic information"],
                answerIndex: 2
              }
            }
        ],
        subUpgrades: [
            { id: 'ad_sod', name: 'Superoxide Dismutase', description: 'The first line of defense against ROS improves protocell resilience.', cost: () => ({ resource: Resource.AminoAcids, amount: 400 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 5 }] },
            { id: 'ad_catalase', name: 'Catalase', description: 'Efficiently convert hydrogen peroxide to water and oxygen, greatly improving resilience.', cost: () => ({ resource: Resource.AminoAcids, amount: 450 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 10 }] },
        ]
    }
  },
  {
    id: 'telomere_maintenance',
    name: 'Telomere Maintenance',
    description: 'Develop mechanisms to protect the ends of chromosomes from degradation during replication.',
    cost: [{ resource: Resource.Nucleotides, amount: 250 }],
    position: { x: 40, y: 68 },
    effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 5 }],
    icon: 'telomere_maintenance',
    dependencies: ['ribosomes'],
    panelContent: {
        facts: [
            { 
              text: "Telomeres are repetitive nucleotide sequences at each end of a chromosome, which protect the end of the chromosome from deterioration or from fusion with neighboring chromosomes.",
              quiz: {
                question: "What are telomeres?",
                options: ["The center of a chromosome", "A type of gene", "Repetitive sequences at the ends of chromosomes", "The proteins that package DNA"],
                answerIndex: 2
              }
            },
            { 
              text: "With each cell division, the telomeres get slightly shorter. This acts as a 'cellular clock' and is linked to aging. When they become too short, the cell can no longer divide.", 
              unlockedBySubUpgradeId: 'tm_longevity',
              quiz: {
                question: "What is the shortening of telomeres linked to?",
                options: ["Cellular energy production", "The process of aging", "The cell's ability to move", "The color of the cell"],
                answerIndex: 1
              }
            }
        ],
        subUpgrades: [
            { id: 'tm_longevity', name: 'Cellular Longevity', description: 'Longer-lasting cells improve protocell resilience.', cost: () => ({ resource: Resource.Nucleotides, amount: 300 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 10 }] },
            { id: 'tm_stability', name: 'Chromosome Stability', description: 'Protecting chromosome ends improves the efficiency of all biological tasks.', cost: () => ({ resource: Resource.Nucleotides, amount: 350 }), effects: [{ type: 'INCREASE_GENERATION_MULTIPLIER', resource: Resource.Nucleotides, value: 0.1 }] },
        ]
    }
  },
  {
    id: 'telomerase_enzyme',
    name: 'Telomerase Enzyme',
    description: 'Evolve the enzyme telomerase to actively lengthen telomeres, allowing for cellular immortality.',
    cost: [{ resource: Resource.AminoAcids, amount: 500 }, { resource: Resource.Nucleotides, amount: 500 }],
    position: { x: 40, y: 65 },
    effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 10 }],
    icon: 'telomerase_enzyme',
    dependencies: ['telomere_maintenance'],
    panelContent: {
        facts: [
            { 
              text: "Telomerase is a reverse transcriptase enzyme that carries its own RNA molecule, which it uses as a template to add the telomere repeat sequence to the 3' end of telomeres.",
              quiz: {
                question: "What type of enzyme is telomerase?",
                options: ["A protease", "A lipase", "A reverse transcriptase", "A kinase"],
                answerIndex: 2
              }
            },
            { 
              text: "While most somatic cells have very low levels of telomerase, it is highly active in stem cells and, notably, in about 90% of cancer cells, granting them their ability to divide indefinitely.", 
              unlockedBySubUpgradeId: 'te_immortality',
              quiz: {
                question: "In which of these cell types is telomerase typically highly active?",
                options: ["Normal muscle cells", "Red blood cells", "Cancer cells", "Nerve cells"],
                answerIndex: 2
              }
            }
        ],
        subUpgrades: [
            { id: 'te_immortality', name: 'Cellular Immortality', description: 'The ability to divide indefinitely vastly improves protocell resilience.', cost: () => ({ resource: Resource.ATP, amount: 500 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 15 }] },
            { id: 'te_regeneration', name: 'Tissue Regeneration', description: 'Controlled telomerase activity allows for tissue regeneration, improving efficiency.', cost: () => ({ resource: Resource.ATP, amount: 600 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'efficiency', value: 5 }] },
        ]
    }
  },
  {
    id: 'rna_interference',
    name: 'RNA Interference',
    description: 'Develop a system to silence gene expression by using small RNA molecules to target and destroy specific mRNA.',
    cost: [{ resource: Resource.Nucleotides, amount: 400 }],
    position: { x: 88, y: 50 },
    effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 5 }],
    icon: 'rna_interference',
    dependencies: ['dna_repair'],
    panelContent: {
        facts: [
            { 
              text: "RNA interference (RNAi) is a natural cellular process that regulates gene expression. It is also a powerful defense mechanism against viruses, particularly those that use double-stranded RNA.",
              quiz: {
                question: "Besides regulating gene expression, what is another key function of RNAi?",
                options: ["Energy production", "Defense against viruses", "Building the cell membrane", "Digesting food"],
                answerIndex: 1
              }
            },
            { 
              text: "Scientists can harness RNAi as a research tool to intentionally 'knock down' the expression of a specific gene to study its function.", 
              unlockedBySubUpgradeId: 'rnai_control',
              quiz: {
                question: "How do scientists use RNAi as a research tool?",
                options: ["To create new genes", "To 'knock down' a gene to study its function", "To make proteins glow", "To measure a cell's age"],
                answerIndex: 1
              }
            }
        ],
        subUpgrades: [
            { id: 'rnai_viral_defense', name: 'Viral Defense', description: 'A strong defense against RNA viruses improves protocell resilience.', cost: () => ({ resource: Resource.Nucleotides, amount: 500 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 10 }] },
            { id: 'rnai_control', name: 'Fine-Tuned Control', description: 'Precise gene silencing allows for more complex tasks, increasing max Hands.', cost: () => ({ resource: Resource.Nucleotides, amount: 600 }), effects: [{ type: 'INCREASE_MAX_HANDS', value: 5 }] },
        ]
    }
  },
  {
    id: 'crispr_cas9',
    name: 'CRISPR-Cas9',
    description: 'Adapt a bacterial immune system into a revolutionary gene-editing tool.',
    cost: [{ resource: Resource.Nucleotides, amount: 1000 }, { resource: Resource.AminoAcids, amount: 1000 }],
    position: { x: 92, y: 45 },
    effects: [{ type: 'INCREASE_MAX_HANDS', value: 10 }],
    icon: 'crispr_cas9',
    dependencies: ['rna_interference'],
    panelContent: {
        facts: [
            { 
              text: "CRISPR-Cas9 is a system found in bacteria that they use to defend against invading viruses. The Cas9 protein is an enzyme that cuts DNA, and CRISPR is a collection of DNA sequences that tell Cas9 where to cut.",
              quiz: {
                question: "What is the natural function of the CRISPR-Cas9 system in bacteria?",
                options: ["To digest food", "To repair their own DNA", "To defend against invading viruses", "To help them move"],
                answerIndex: 2
              }
            },
            { 
              text: "Scientists have adapted this system into a powerful tool for editing genomes. By providing the Cas9 protein with a custom 'guide RNA', they can direct it to cut any DNA sequence they choose.", 
              unlockedBySubUpgradeId: 'crispr_editing',
              quiz: {
                question: "How do scientists use CRISPR-Cas9 to edit genes?",
                options: ["By using a powerful magnet", "By providing a custom guide RNA to direct the Cas9 enzyme", "By heating up the DNA", "By using a microscopic laser"],
                answerIndex: 1
              }
            }
        ],
        subUpgrades: [
            { id: 'crispr_editing', name: 'Precise Gene Editing', description: 'The ability to precisely edit the genome allows for unparalleled biological control.', cost: () => ({ resource: Resource.Nucleotides, amount: 1500 }), effects: [{ type: 'INCREASE_MAX_HANDS', value: 15 }] },
            { id: 'crispr_defense', name: 'Adaptive Immunity', description: 'A programmable immune system provides a major boost to protocell resilience.', cost: () => ({ resource: Resource.Nucleotides, amount: 2000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 10 }] },
        ]
    }
  },
  {
    id: 'krebs_cycle',
    name: 'Krebs Cycle',
    description: 'Develop a central metabolic pathway that generates energy through the oxidation of acetate.',
    cost: [{ resource: Resource.ATP, amount: 200 }],
    position: { x: 80, y: 85 },
    effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.ATP, value: 5 }],
    icon: 'krebs_cycle',
    dependencies: ['endosymbiosis'],
    panelContent: {
        facts: [
            { 
              text: "The Krebs Cycle (or Citric Acid Cycle) is the central hub of cellular metabolism. It takes the two-carbon acetyl-CoA molecule and breaks it down, generating energy-carrying molecules like NADH, FADH2, and ATP.",
              quiz: {
                question: "What is the main purpose of the Krebs Cycle?",
                options: ["To build proteins", "To generate energy-carrying molecules from acetate", "To replicate DNA", "To break down water"],
                answerIndex: 1
              }
            },
            { 
              text: "The cycle is 'amphibolic', meaning it participates in both catabolism (breaking down molecules) and anabolism (building up molecules). Its intermediates are used as precursors for synthesizing amino acids and other biomolecules.", 
              unlockedBySubUpgradeId: 'kc_efficiency',
              quiz: {
                question: "What does it mean that the Krebs Cycle is 'amphibolic'?",
                options: ["It only works in water", "It can run forwards and backwards", "It participates in both breaking down and building up molecules", "It requires two different enzymes to function"],
                answerIndex: 2
              }
            }
        ],
        subUpgrades: [
            { id: 'kc_efficiency', name: 'Cycle Efficiency', description: 'Optimize the Krebs Cycle to produce more passive ATP.', cost: () => ({ resource: Resource.ATP, amount: 300 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.ATP, value: 5 }] },
            { id: 'kc_anabolism', name: 'Anabolic Precursors', description: 'Use cycle intermediates to boost passive Amino Acid generation.', cost: () => ({ resource: Resource.ATP, amount: 400 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.AminoAcids, value: 1 }] },
        ]
    }
  },
  {
    id: 'homeostasis',
    name: 'Homeostasis',
    description: 'The ability of a complex organism to maintain a stable internal environment despite external changes.',
    cost: [{ resource: Resource.ATP, amount: 3000 }],
    position: { x: 68, y: 83 },
    effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 10 }],
    icon: 'homeostasis',
    dependencies: ['circulatory_system'],
    panelContent: {
        facts: [
            { 
              text: "Homeostasis is the tendency to resist change in order to maintain a stable, relatively constant internal environment. It involves constant adjustments as conditions change inside and outside the cell.",
              quiz: {
                question: "What is homeostasis?",
                options: ["A state of cellular hibernation", "The process of cell division", "The tendency to maintain a stable internal environment", "A type of chemical reaction"],
                answerIndex: 2
              }
            },
            { 
              text: "Thermoregulation (maintaining body temperature), osmoregulation (balancing water and salts), and glucoregulation (maintaining blood sugar levels) are all key examples of homeostasis.", 
              unlockedBySubUpgradeId: 'homeo_thermo',
              quiz: {
                question: "Which of the following is NOT an example of homeostasis?",
                options: ["Thermoregulation", "Glucoregulation", "Osmoregulation", "Genetic mutation"],
                answerIndex: 3
              }
            }
        ],
        subUpgrades: [
            { id: 'homeo_thermo', name: 'Thermoregulation', description: 'The ability to maintain a constant internal temperature improves protocell resilience.', cost: () => ({ resource: Resource.ATP, amount: 4000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 10 }] },
            { id: 'homeo_gluco', name: 'Glucoregulation', description: 'Stable energy levels improve protocell efficiency.', cost: () => ({ resource: Resource.ATP, amount: 4500 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'efficiency', value: 10 }] },
        ]
    }
  },
  {
    id: 'adaptive_immunity',
    name: 'Adaptive Immunity',
    description: 'Develop a highly specific immune system that "remembers" past infections to provide long-term protection.',
    cost: [{ resource: Resource.AminoAcids, amount: 5000 }],
    position: { x: 80, y: 90 },
    effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 20 }],
    icon: 'adaptive_immunity',
    dependencies: ['krebs_cycle'],
    panelContent: {
        facts: [
            { 
              text: "The adaptive immune system, found in jawed vertebrates, is characterized by its specificity and memory. B cells and T cells are its key players.",
              quiz: {
                question: "What are the two key characteristics of the adaptive immune system?",
                options: ["Speed and strength", "Specificity and memory", "Simplicity and efficiency", "Size and color"],
                answerIndex: 1
              }
            },
            { 
              text: "Upon first encountering a pathogen, the adaptive immune system mounts a primary response. If the same pathogen is encountered again, a much faster and stronger secondary response is mounted, which is the basis of vaccination.", 
              unlockedBySubUpgradeId: 'ai_memory',
              quiz: {
                question: "What is the basis of how vaccines work?",
                options: ["They kill all bacteria in the body", "They introduce a weakened pathogen to create an immune memory", "They boost the innate immune system temporarily", "They provide the body with ready-made antibodies"],
                answerIndex: 1
              }
            },
            { 
              text: "The immense diversity of antibodies and T-cell receptors is generated through a process of random genetic rearrangement called V(D)J recombination, allowing the immune system to recognize almost any pathogen imaginable.", 
              unlockedBySubUpgradeId: 'ai_diversity',
              quiz: {
                question: "How does the adaptive immune system generate its incredible diversity of receptors?",
                options: ["By having a gene for every possible pathogen", "Through a process of random genetic rearrangement", "By learning from the innate immune system", "By absorbing genetic material from pathogens"],
                answerIndex: 1
              }
            }
        ],
        subUpgrades: [
            { id: 'ai_memory', name: 'Immunological Memory', description: 'The ability to remember and fight off past infections greatly improves protocell resilience.', cost: () => ({ resource: Resource.AminoAcids, amount: 6000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 25 }] },
            { id: 'ai_diversity', name: 'V(D)J Recombination', description: 'A vast repertoire of antibodies improves the chance of fighting any threat, boosting resilience.', cost: () => ({ resource: Resource.AminoAcids, amount: 7000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 10 }] },
        ]
    }
  },
  {
    id: 'sexual_reproduction',
    name: 'Sexual Reproduction',
    description: 'Combine genetic material from two parents to create genetically diverse offspring.',
    cost: [{ resource: Resource.Nucleotides, amount: 5000 }],
    position: { x: 75, y: 93 },
    effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 5 }],
    icon: 'sexual_reproduction',
    dependencies: ['adaptive_immunity'],
    panelContent: {
        facts: [
            { 
              text: "The main evolutionary advantage of sexual reproduction is the creation of genetic variation in offspring. This diversity helps populations adapt to changing environments, a concept known as the Red Queen hypothesis.",
              quiz: {
                question: "What is the primary evolutionary advantage of sexual reproduction?",
                options: ["It is faster than asexual reproduction", "It requires less energy", "It creates genetic variation in offspring", "It guarantees the offspring will be identical to the parent"],
                answerIndex: 2
              }
            },
            { 
              text: "Meiosis is a special type of cell division that reduces the number of chromosomes by half, creating four haploid cells (gametes) from one diploid cell.", 
              unlockedBySubUpgradeId: 'sr_meiosis',
              quiz: {
                question: "What is the purpose of meiosis?",
                options: ["To create identical daughter cells for growth", "To create gametes with half the number of chromosomes", "To repair damaged tissue", "To produce energy for the cell"],
                answerIndex: 1
              }
            }
        ],
        subUpgrades: [
            { id: 'sr_meiosis', name: 'Meiosis', description: 'Perfect the process of creating gametes, improving genetic diversity.', cost: () => ({ resource: Resource.Nucleotides, amount: 6000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 5 }] },
            { id: 'sr_recombination', name: 'Genetic Recombination', description: 'Shuffling genes during meiosis creates novel combinations, improving protocell resilience.', cost: () => ({ resource: Resource.Nucleotides, amount: 7000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 10 }] },
        ]
    }
  },
  {
    id: 'hox_genes',
    name: 'HOX Genes',
    description: 'Develop a set of master regulator genes that control the body plan of an embryo.',
    cost: [{ resource: Resource.Nucleotides, amount: 2000 }],
    position: { x: 58, y: 73 },
    effects: [{ type: 'INCREASE_MAX_HANDS', value: 5 }],
    icon: 'hox_genes',
    dependencies: ['endoskeleton'],
    panelContent: {
        facts: [
            { 
              text: "Hox genes are a group of related genes that specify regions of the body plan of an embryo along the head-tail axis. They ensure that the correct structures, like limbs or antennae, form in the correct places.",
              quiz: {
                question: "What is the primary function of Hox genes?",
                options: ["To digest food", "To control the embryonic body plan", "To produce energy", "To fight off viruses"],
                answerIndex: 1
              }
            },
            { 
              text: "Hox genes are remarkably conserved across the animal kingdom, from fruit flies to humans. The same basic set of genes that patterns a fly's body also patterns ours, just with more complexity.", 
              unlockedBySubUpgradeId: 'hox_body_plan',
              quiz: {
                question: "What is remarkable about Hox genes across the animal kingdom?",
                options: ["They are completely different in every species", "They are remarkably conserved (similar)", "Only mammals have them", "They are only active in adults"],
                answerIndex: 1
              }
            }
        ],
        subUpgrades: [
            { id: 'hox_body_plan', name: 'Body Plan Control', description: 'Mastery over the body plan allows for more complex tasks, increasing max Hands.', cost: () => ({ resource: Resource.Nucleotides, amount: 3000 }), effects: [{ type: 'INCREASE_MAX_HANDS', value: 10 }] },
            { id: 'hox_duplication', name: 'Gene Duplication', description: 'Duplicating Hox genes allows for greater complexity and resilience.', cost: () => ({ resource: Resource.Nucleotides, amount: 4000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 5 }] },
        ]
    }
  },
  {
    id: 'evolution_of_vision',
    name: 'Evolution of Vision',
    description: 'Develop complex, image-forming eyes to navigate the world in unprecedented detail.',
    cost: [{ resource: Resource.AminoAcids, amount: 1500 }],
    position: { x: 45, y: 80 },
    effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'speed', value: 10 }],
    icon: 'evolution_of_vision',
    dependencies: ['exoskeleton', 'hox_genes'],
    panelContent: {
        facts: [
            { 
              text: "The eye has evolved independently in many different lineages. The vertebrate eye and the cephalopod (octopus, squid) eye are remarkably similar, a striking example of convergent evolution.",
              quiz: {
                question: "The similarity between the vertebrate eye and the cephalopod eye is a classic example of what?",
                options: ["Divergent evolution", "Vestigial structures", "Convergent evolution", "Genetic drift"],
                answerIndex: 2
              }
            },
            { 
              text: "All forms of vision are based on a family of proteins called opsins, suggesting a common ancestor for all eyes, which may have been a simple light-sensitive spot.", 
              unlockedBySubUpgradeId: 'eov_acuity',
              quiz: {
                question: "What family of proteins is the basis for all forms of vision?",
                options: ["Actins", "Myosins", "Keratins", "Opsins"],
                answerIndex: 3
              }
            }
        ],
        subUpgrades: [
            { id: 'eov_acuity', name: 'Visual Acuity', description: 'Sharper vision allows for better targeting, improving protocell speed.', cost: () => ({ resource: Resource.ATP, amount: 2000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'speed', value: 10 }] },
            { id: 'eov_color', name: 'Color Vision', description: 'The ability to distinguish colors provides more information about the environment, improving efficiency.', cost: () => ({ resource: Resource.ATP, amount: 2500 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'efficiency', value: 5 }] },
        ]
    }
  },
  {
    id: 'cephalization',
    name: 'Cephalization',
    description: 'The evolutionary trend of concentrating nervous tissue and sensory organs at the anterior end of an organism, forming a head.',
    cost: [{ resource: Resource.ATP, amount: 5000 }],
    position: { x: 48, y: 95 },
    effects: [{ type: 'INCREASE_MAX_HANDS', value: 5 }],
    icon: 'cephalization',
    dependencies: ['nervous_system'],
    panelContent: {
        facts: [
            { 
              text: "Cephalization is strongly associated with bilateral symmetry and forward movement, as it allows an organism to process information from the direction it is heading.",
              quiz: {
                question: "Cephalization (the formation of a head) is strongly associated with what two things?",
                options: ["Radial symmetry and floating", "Bilateral symmetry and forward movement", "Asymmetry and burrowing", "Spherical symmetry and rolling"],
                answerIndex: 1
              }
            },
            { 
              text: "This trend led to the development of the brain, the most complex organ, which acts as a central processing unit for the entire nervous system.", 
              unlockedBySubUpgradeId: 'ceph_brain',
              quiz: {
                question: "The evolutionary trend of cephalization ultimately led to the development of what organ?",
                options: ["The heart", "The liver", "The brain", "The lungs"],
                answerIndex: 2
              }
            }
        ],
        subUpgrades: [
            { id: 'ceph_brain', name: 'Brain Development', description: 'A more complex brain allows for more sophisticated control, greatly increasing max Hands.', cost: () => ({ resource: Resource.ATP, amount: 6000 }), effects: [{ type: 'INCREASE_MAX_HANDS', value: 20 }] },
            { id: 'ceph_sensory', name: 'Sensory Integration', description: 'Integrating multiple senses into one control center improves protocell efficiency.', cost: () => ({ resource: Resource.ATP, amount: 7000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'efficiency', value: 10 }] },
        ]
    }
  },
   {
    id: 'gas_bladder',
    name: 'Gas Bladder',
    description: 'Evolve a gas-filled sac to control buoyancy in water.',
    cost: [{ resource: Resource.Carbon, amount: 1200 }],
    position: { x: 70, y: 75 },
    effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'speed', value: 5 }],
    icon: 'evolution_of_lungs',
    dependencies: ['cellular_homeostasis'],
    panelContent: {
      facts: [
        {
          text: "The swim bladder in most modern bony fish evolved from the primitive lungs of their ancestors. It allows them to maintain neutral buoyancy at different depths without expending energy.",
          quiz: {
            question: "What is the primary function of a swim bladder in fish?",
            options: ["To breathe air", "To store food", "To control buoyancy", "To produce sound"],
            answerIndex: 2
          }
        },
      ],
      subUpgrades: [
        { id: 'gb_buoyancy', name: 'Buoyancy Control', description: 'Precise buoyancy control improves protocell speed in aquatic environments.', cost: () => ({ resource: Resource.ATP, amount: 1500 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'speed', value: 10 }] },
      ]
    }
  }
];