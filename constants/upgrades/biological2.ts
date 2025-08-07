
import { Upgrade, Resource } from '../../types';

export const biologicalUpgrades2: Upgrade[] = [
  {
    id: 'cambrian_explosion',
    name: 'Cambrian Explosion',
    description: 'A sudden burst of evolutionary innovation leads to a wide diversity of complex life forms.',
    cost: [{ resource: Resource.ATP, amount: 15000 }],
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
            { id: 'ce_diversity', name: 'Genetic Diversity', description: 'A wider gene pool passively generates all biological resources.', cost: () => ({ resource: Resource.ATP, amount: 20000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.PrimordialSoup, value: 1 }, { type: 'ADD_BASE_GENERATION', resource: Resource.AminoAcids, value: 1 }, { type: 'ADD_BASE_GENERATION', resource: Resource.Nucleotides, value: 1 }] },
            { id: 'ce_predation', name: 'Evolution of Predation', description: 'The new arms race between predator and prey improves protocell speed and resilience.', cost: () => ({ resource: Resource.ATP, amount: 25000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'speed', value: 10 }, { type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 10 }] },
            { id: 'ce_body_plans', name: 'Novel Body Plans', description: 'Experimentation with new body plans grants more max Hands.', cost: () => ({ resource: Resource.ATP, amount: 30000 }), effects: [{ type: 'INCREASE_MAX_HANDS', value: 5 }] },
        ]
    }
  },
  {
    id: 'exoskeleton',
    name: 'Exoskeleton',
    description: 'Develop a hard external skeleton made of chitin for protection and structural support.',
    cost: [{ resource: Resource.Carbon, amount: 20000 }, {resource: Resource.AminoAcids, amount: 15000}],
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
            { id: 'exo_protection', name: 'Enhanced Protection', description: 'A stronger exoskeleton greatly boosts protocell resilience.', cost: () => ({ resource: Resource.Carbon, amount: 30000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 20 }] },
            { id: 'exo_segmentation', name: 'Jointed Limbs', description: 'Develop jointed limbs for better movement, improving protocell speed.', cost: () => ({ resource: Resource.Carbon, amount: 35000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'speed', value: 5 }] },
        ]
    }
  },
  {
    id: 'endoskeleton',
    name: 'Endoskeleton',
    description: 'Develop an internal skeleton of mineralized tissue, allowing for larger body sizes and continuous growth.',
    cost: [{ resource: Resource.Rock, amount: 20000 }, { resource: Resource.Carbon, amount: 15000 }],
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
            { id: 'endo_support', name: 'Structural Support', description: 'A stronger internal frame allows for more complex tasks, increasing max Hands.', cost: () => ({ resource: Resource.Rock, amount: 30000 }), effects: [{ type: 'INCREASE_MAX_HANDS', value: 10 }] },
            { id: 'endo_calcium', name: 'Calcium Phosphate', description: 'Develop strong calcium phosphate bones, improving protocell resilience.', cost: () => ({ resource: Resource.Rock, amount: 35000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 10 }] },
        ]
    }
  },
  {
    id: 'nervous_system',
    name: 'Nervous System',
    description: 'Develop a network of specialized cells for transmitting information and coordinating actions.',
    cost: [{ resource: Resource.ATP, amount: 25000 }],
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
            { id: 'ns_centralization', name: 'Centralization (Brain)', description: 'A centralized brain provides much finer control, increasing Max Hands.', cost: () => ({ resource: Resource.ATP, amount: 35000 }), effects: [{ type: 'INCREASE_MAX_HANDS', value: 25 }] },
            { id: 'ns_myelination', name: 'Myelin Sheaths', description: 'Faster signal transmission improves protocell speed.', cost: () => ({ resource: Resource.ATP, amount: 40000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'speed', value: 10 }] },
            { id: 'ns_synaptic_plasticity', name: 'Synaptic Plasticity', description: 'The ability to strengthen or weaken synapses is the basis of learning and memory, improving efficiency.', cost: () => ({ resource: Resource.ATP, amount: 45000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'efficiency', value: 10 }] },
        ]
    }
  },
  {
    id: 'extinction_event',
    name: 'Extinction Event',
    description: 'A catastrophic event wipes out a majority of life, but the survivors repopulate the world with greater resilience.',
    cost: [{ resource: Resource.ATP, amount: 50000 }, { resource: Resource.AminoAcids, amount: 50000 }, { resource: Resource.Nucleotides, amount: 50000 }],
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
            { id: 'ee_resilience', name: 'Evolutionary Resilience', description: 'Life that survived the cataclysm is stronger, boosting all passive biological generation permanently.', cost: () => ({ resource: Resource.ATP, amount: 100000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.PrimordialSoup, value: 5 }, { type: 'ADD_BASE_GENERATION', resource: Resource.AminoAcids, value: 5 }, { type: 'ADD_BASE_GENERATION', resource: Resource.Nucleotides, value: 5 }, { type: 'ADD_BASE_GENERATION', resource: Resource.ATP, value: 5 }] },
            { id: 'ee_adaptation', name: 'Rapid Adaptation', description: 'The survivors adapt quickly, improving all protocell attributes.', cost: () => ({ resource: Resource.ATP, amount: 120000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'speed', value: 10 }, { type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'efficiency', value: 10 }, { type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 10 }] },
            { id: 'ee_niche_filling', name: 'Ecological Opportunity', description: 'Quickly fill empty niches, granting more max Hands.', cost: () => ({ resource: Resource.ATP, amount: 150000 }), effects: [{ type: 'INCREASE_MAX_HANDS', value: 10 }] },
        ]
    }
  },
  {
    id: 'prokaryotic_cell',
    name: 'Prokaryotic Cell',
    description: 'Establish simple cells without a nucleus, which will dominate the planet for eons.',
    cost: [{ resource: Resource.ATP, amount: 100 }],
    position: { x: 55, y: 52 },
    effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.PrimordialSoup, value: 0.5 }],
    icon: 'prokaryotic_cell',
    dependencies: ['protocell'],
    panelContent: {
        facts: [
            { 
              text: "Prokaryotes, such as bacteria and archaea, are the most widespread and abundant organisms on Earth, thriving in an incredible diversity of environments.",
              quiz: {
                question: "Which of the following are examples of prokaryotes?",
                options: ["Plants and animals", "Fungi and protists", "Bacteria and archaea", "Viruses and prions"],
                answerIndex: 2
              }
            },
            { 
              text: "Unlike eukaryotes, prokaryotes lack a nucleus and other membrane-bound organelles. Their DNA floats freely in the cytoplasm in a region called the nucleoid.", 
              unlockedBySubUpgradeId: 'pc_metabolism',
              quiz: {
                question: "Where is the DNA located in a prokaryotic cell?",
                options: ["Inside a nucleus", "In the mitochondria", "In a region called the nucleoid", "Attached to the cell wall"],
                answerIndex: 2
              }
            },
            { 
              text: "Biofilms are complex communities of one or more microorganism species, which secrete a protective matrix and adhere to surfaces. This is the preferred lifestyle for most prokaryotes.", 
              unlockedBySubUpgradeId: 'pc_archaea',
              quiz: {
                question: "What are the complex communities that most prokaryotes live in called?",
                options: ["Herds", "Swarms", "Colonies", "Biofilms"],
                answerIndex: 3
              }
            }
        ],
        subUpgrades: [
            { id: 'pc_metabolism', name: 'Metabolic Diversity', description: 'Unlock diverse metabolisms, improving Primordial Soup generation.', cost: () => ({ resource: Resource.PrimordialSoup, amount: 1000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.PrimordialSoup, value: 1 }] },
            { id: 'pc_archaea', name: 'Cultivate Archaea', description: 'Cultivating extremophilic archaea improves protocell resilience.', cost: () => ({ resource: Resource.PrimordialSoup, amount: 1200 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 5 }] },
            { id: 'pc_biofilm', name: 'Form Biofilms', description: 'Forming protective biofilms further enhances resilience.', cost: () => ({ resource: Resource.PrimordialSoup, amount: 1500 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 5 }] },
        ]
    }
  },
  {
    id: 'horizontal_gene_transfer',
    name: 'Horizontal Gene Transfer',
    description: 'Allow prokaryotes to exchange genetic material, accelerating evolution.',
    cost: [{ resource: Resource.Nucleotides, amount: 1000 }],
    position: { x: 60, y: 48 },
    effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Nucleotides, value: 0.2 }],
    icon: 'horizontal_gene_transfer',
    dependencies: ['prokaryotic_cell'],
    panelContent: {
        facts: [
            { 
              text: "Horizontal gene transfer is a primary reason for the rapid spread of antibiotic resistance among bacteria.",
              quiz: {
                question: "Horizontal gene transfer is a major reason for the spread of what medical problem?",
                options: ["Viral infections", "Genetic disorders", "Cancer", "Antibiotic resistance"],
                answerIndex: 3
              }
            },
            { 
              text: "There are three main mechanisms: transformation (uptake of free DNA), transduction (transfer by viruses), and conjugation (transfer via direct contact using a pilus).", 
              unlockedBySubUpgradeId: 'hgt_efficiency',
              quiz: {
                question: "Which of these is NOT a mechanism of horizontal gene transfer?",
                options: ["Transformation", "Transduction", "Respiration", "Conjugation"],
                answerIndex: 2
              }
            },
            { 
              text: "It is a major driver of evolution, allowing organisms to acquire new traits quickly instead of relying solely on gradual mutations passed down vertically.", 
              unlockedBySubUpgradeId: 'hgt_adaptation',
              quiz: {
                question: "What is the main evolutionary advantage of horizontal gene transfer?",
                options: ["It prevents mutations", "It ensures perfect copies of genes", "It allows organisms to acquire new traits quickly", "It slows down evolution"],
                answerIndex: 2
              }
            }
        ],
        subUpgrades: [
            { id: 'hgt_efficiency', name: 'Plasmid Exchange', description: 'Optimize gene sharing to passively generate Nucleotides.', cost: () => ({ resource: Resource.Nucleotides, amount: 1500 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Nucleotides, value: 0.3 }] },
            { id: 'hgt_adaptation', name: 'Rapid Adaptation', description: 'Accelerated evolution improves protocell efficiency.', cost: () => ({ resource: Resource.Nucleotides, amount: 2000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'efficiency', value: 5 }] },
            { id: 'hgt_conjugation', name: 'Develop Conjugation', description: 'Develop direct cell-to-cell transfer for more reliable gene sharing.', cost: () => ({ resource: Resource.Nucleotides, amount: 2500 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Nucleotides, value: 0.1 }] },
        ]
    }
  },
  {
    id: 'transposons',
    name: 'Transposons',
    description: 'Activate "jumping genes," sequences of DNA that can move and replicate within the genome.',
    cost: [{ resource: Resource.Nucleotides, amount: 3000 }],
    position: { x: 72, y: 59 },
    effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Nucleotides, value: 0.1 }],
    icon: 'transposons',
    dependencies: ['dna_replication'],
    panelContent: {
        facts: [
            { 
              text: "Transposons, or 'jumping genes,' make up a large fraction of the genome of many eukaryotes and can be a major driver of genetic variation and evolution.",
              quiz: {
                question: "What is the common name for transposons?",
                options: ["'Floating genes'", "'Jumping genes'", "'Sleeping genes'", "'Anchor genes'"],
                answerIndex: 1
              }
            },
            { 
              text: "They were discovered by Barbara McClintock in maize (corn), for which she won the Nobel Prize. She noticed that some genes could 'jump' around the chromosome, changing the color of corn kernels.", 
              unlockedBySubUpgradeId: 'transposon_activity',
              quiz: {
                question: "The discovery of transposons was made by Barbara McClintock while studying what organism?",
                options: ["Fruit flies", "E. coli bacteria", "Maize (corn)", "Jellyfish"],
                answerIndex: 2
              }
            },
            { 
              text: "While often viewed as 'selfish' DNA, transposons can create new genes or alter gene regulation, providing raw material for evolution.", 
              unlockedBySubUpgradeId: 'transposon_copy',
              quiz: {
                question: "Besides being 'selfish' DNA, how can transposons contribute to evolution?",
                options: ["They remove harmful mutations", "They provide energy for the cell", "They can create new genes or alter gene regulation", "They help DNA replication"],
                answerIndex: 2
              }
            }
        ],
        subUpgrades: [
            { id: 'transposon_activity', name: 'Increase Transposition', description: 'Controlled genomic instability provides a small passive generation of Nucleotides.', cost: () => ({ resource: Resource.Nucleotides, amount: 4000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Nucleotides, value: 0.2 }] },
            { id: 'transposon_copy', name: 'Copy-and-Paste', description: 'Optimize the copy-and-paste mechanism to improve Nucleotide generation.', cost: () => ({ resource: Resource.Nucleotides, amount: 5000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Nucleotides, value: 0.3 }] },
            { id: 'transposon_regulation', name: 'Regulate Transposition', description: 'Learn to control jumping genes to prevent harmful mutations, improving resilience.', cost: () => ({ resource: Resource.Nucleotides, amount: 6000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 5 }] },
        ]
    }
  },
  {
    id: 'epigenetics',
    name: 'Epigenetics',
    description: 'Develop systems to modify gene expression without changing the DNA sequence itself.',
    cost: [{ resource: Resource.AminoAcids, amount: 5000 }],
    position: { x: 92, y: 68 },
    effects: [{ type: 'INCREASE_MAX_HANDS', value: 5 }],
    icon: 'epigenetics',
    dependencies: ['eukaryotic_cell'],
    panelContent: {
        facts: [
            { 
              text: "Epigenetic modifications, such as DNA methylation and histone modification, can be influenced by the environment and are heritable in some cases.",
              quiz: {
                question: "What can influence epigenetic modifications?",
                options: ["The phase of the moon", "The environment", "The color of light", "The planet's gravity"],
                answerIndex: 1
              }
            },
            { 
              text: "DNA methylation typically acts as a 'switch' to turn genes off, while histone modifications can either activate or repress gene expression.", 
              unlockedBySubUpgradeId: 'epi_control',
              quiz: {
                question: "What does DNA methylation typically do to a gene?",
                options: ["Turns it on", "Removes it from the genome", "Turns it off", "Makes a copy of it"],
                answerIndex: 2
              }
            },
            { 
              text: "Epigenetics explains how identical twins can have different traits and risk for diseases, despite having the exact same DNA sequence.", 
              unlockedBySubUpgradeId: 'epi_twins',
              quiz: {
                question: "Epigenetics helps explain why which group of people can have different traits?",
                options: ["Fraternal twins", "Identical twins", "Parents and children", "Unrelated individuals"],
                answerIndex: 1
              }
            }
        ],
        subUpgrades: [
            { id: 'epi_control', name: 'Gene Regulation', description: 'Finer control over gene expression grants more Max Hands.', cost: () => ({ resource: Resource.AminoAcids, amount: 6000 }), effects: [{ type: 'INCREASE_MAX_HANDS', value: 10 }] },
            { id: 'epi_twins', name: 'Improve Heritability', description: 'Improve the inheritance of epigenetic tags, boosting protocell resilience.', cost: () => ({ resource: Resource.AminoAcids, amount: 7000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 5 }] },
            { id: 'epi_environmental', name: 'Environmental Response', description: 'Adapt to environmental changes faster through epigenetics, improving efficiency.', cost: () => ({ resource: Resource.AminoAcids, amount: 8000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'efficiency', value: 5 }] },
        ]
    }
  },
  {
    id: 'rna_interference',
    name: 'RNA Interference',
    description: 'Utilize small RNA molecules to silence specific genes, providing a defense against viruses and regulating the genome.',
    cost: [{ resource: Resource.Nucleotides, amount: 4000 }],
    position: { x: 82, y: 52 },
    effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 5 }],
    icon: 'rna_interference',
    dependencies: ['dna_replication'],
    panelContent: {
        facts: [
            { 
              text: "RNA interference (RNAi) is a powerful tool used by scientists to 'knock down' the expression of specific genes to study their function.",
              quiz: {
                question: "What is RNA interference (RNAi) commonly used for in scientific research?",
                options: ["To increase gene expression", "To 'knock down' the expression of specific genes", "To create new genes", "To measure energy levels"],
                answerIndex: 1
              }
            },
            { 
              text: "The mechanism involves small interfering RNAs (siRNAs) or microRNAs (miRNAs) that bind to messenger RNA (mRNA) and lead to its degradation, preventing it from being translated into a protein.", 
              unlockedBySubUpgradeId: 'rnai_defense',
              quiz: {
                question: "How does RNAi work?",
                options: ["Small RNAs bind to DNA to block transcription", "Small RNAs bind to mRNA and cause its degradation", "Small RNAs provide a template for new proteins", "Small RNAs repair damaged DNA"],
                answerIndex: 1
              }
            },
            { 
              text: "The discovery of RNAi in C. elegans by Andrew Fire and Craig Mello earned them the Nobel Prize in 2006.", 
              unlockedBySubUpgradeId: 'rnai_efficiency',
              quiz: {
                question: "The discovery of RNAi was made in which organism, leading to a Nobel Prize?",
                options: ["Mice", "Fruit flies", "E. coli bacteria", "C. elegans (a roundworm)"],
                answerIndex: 3
              }
            }
        ],
        subUpgrades: [
            { id: 'rnai_defense', name: 'Viral Defense', description: 'An improved genetic defense system improves protocell resilience.', cost: () => ({ resource: Resource.Nucleotides, amount: 5000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 10 }] },
            { id: 'rnai_efficiency', name: 'Targeting Efficiency', description: 'Improve the efficiency of gene silencing, improving protocell efficiency.', cost: () => ({ resource: Resource.Nucleotides, amount: 6000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'efficiency', value: 5 }] },
            { id: 'rnai_regulation', name: 'Fine-tune Regulation', description: 'Use RNAi for fine-tuned gene regulation, increasing max Hands.', cost: () => ({ resource: Resource.Nucleotides, amount: 7000 }), effects: [{ type: 'INCREASE_MAX_HANDS', value: 5 }] },
        ]
    }
  },
  {
    id: 'crispr_cas9',
    name: 'CRISPR-Cas9',
    description: 'Develop an adaptive immune system in prokaryotes that can be repurposed into a revolutionary gene-editing tool.',
    cost: [{ resource: Resource.Nucleotides, amount: 10000 }],
    position: { x: 90, y: 62 },
    effects: [{ type: 'INCREASE_MAX_HANDS', value: 15 }],
    icon: 'crispr_cas9',
    dependencies: ['epigenetics'],
    panelContent: {
        facts: [
            { 
              text: "CRISPR (Clustered Regularly Interspaced Short Palindromic Repeats) is a natural defense mechanism in bacteria and archaea. It stores snippets of viral DNA to 'remember' past infections.",
              quiz: {
                question: "What is the natural function of the CRISPR system in bacteria?",
                options: ["To produce energy", "An immune system to remember viral infections", "To help the cell move", "To communicate with other bacteria"],
                answerIndex: 1
              }
            },
            { 
              text: "The Cas9 protein is an enzyme that acts like 'molecular scissors', guided by an RNA molecule to a specific target DNA sequence, which it then cuts.", 
              unlockedBySubUpgradeId: 'crispr_cas9',
              quiz: {
                question: "What does the Cas9 protein do in the CRISPR-Cas9 system?",
                options: ["It finds the target DNA", "It acts like 'molecular scissors' to cut DNA", "It repairs the cut DNA", "It copies the DNA sequence"],
                answerIndex: 1
              }
            },
            { 
              text: "The simplicity and efficiency of the CRISPR-Cas9 system have revolutionized genetic engineering, earning its developers the 2020 Nobel Prize in Chemistry.", 
              unlockedBySubUpgradeId: 'crispr_engineering',
              quiz: {
                question: "The development of CRISPR-Cas9 as a gene-editing tool earned its developers what major award?",
                options: ["The Fields Medal in Mathematics", "The Pulitzer Prize", "The Nobel Prize in Chemistry", "An Academy Award"],
                answerIndex: 2
              }
            }
        ],
        subUpgrades: [
            { id: 'crispr_cas9', name: 'Develop Cas9 Nuclease', description: 'Develop the "molecular scissors" for gene editing.', cost: () => ({ resource: Resource.Nucleotides, amount: 12000 }), effects: [{ type: 'INCREASE_GENERATION_MULTIPLIER', resource: Resource.Nucleotides, value: 0.1 }] },
            { id: 'crispr_engineering', name: 'Genetic Engineering', description: 'Precise gene editing grants a massive boost to max Hands.', cost: () => ({ resource: Resource.Nucleotides, amount: 15000 }), effects: [{ type: 'INCREASE_MAX_HANDS', value: 20 }] },
            { id: 'crispr_therapeutics', name: 'Gene Therapy', description: 'Use CRISPR to correct genetic defects, improving protocell resilience.', cost: () => ({ resource: Resource.Nucleotides, amount: 18000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 10 }] },
        ]
    }
  },
  {
    id: 'krebs_cycle',
    name: 'Krebs Cycle',
    description: 'Evolve a more efficient aerobic respiration pathway, generating significantly more ATP.',
    cost: [{ resource: Resource.ATP, amount: 8000 }],
    position: { x: 88, y: 80 },
    effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.ATP, value: 20 }],
    icon: 'krebs_cycle',
    dependencies: ['endosymbiosis'],
    panelContent: {
        facts: [
            { 
              text: "The Krebs Cycle (or Citric Acid Cycle) is a central metabolic hub in the cell, and the complete oxidation of one glucose molecule yields about 30-32 ATP molecules.",
              quiz: {
                question: "What is the approximate yield of ATP from the complete oxidation of one glucose molecule using the Krebs cycle and associated processes?",
                options: ["2 ATP", "10-12 ATP", "30-32 ATP", "Over 100 ATP"],
                answerIndex: 2
              }
            },
            { 
              text: "It takes place in the matrix of the mitochondria in eukaryotes, and in the cytoplasm of prokaryotes.", 
              unlockedBySubUpgradeId: 'kc_optimization',
              quiz: {
                question: "Where does the Krebs Cycle take place in eukaryotes?",
                options: ["The cell nucleus", "The cytoplasm", "The matrix of the mitochondria", "The cell membrane"],
                answerIndex: 2
              }
            },
            { 
              text: "The cycle doesn't just produce energy; its intermediates are used as precursors for synthesizing amino acids, nucleotides, and other vital molecules.", 
              unlockedBySubUpgradeId: 'kc_precursors',
              quiz: {
                question: "Besides producing energy, what is another important function of the Krebs Cycle?",
                options: ["It produces oxygen", "Its intermediates are used to synthesize other vital molecules", "It helps the cell move", "It copies DNA"],
                answerIndex: 1
              }
            },
            {
              text: "The Krebs Cycle is also known as the Citric Acid Cycle because citrate is the first molecule produced when acetyl-CoA joins with oxaloacetate at the start of the cycle.",
              quiz: {
                  question: "The Krebs Cycle is also known by what other name?",
                  options: ["The Calvin Cycle", "The Citric Acid Cycle", "The Glycolysis Cycle", "The Urea Cycle"],
                  answerIndex: 1
              }
            }
        ],
        subUpgrades: [
            { id: 'kc_optimization', name: 'Cycle Optimization', description: 'Fine-tuning the Krebs Cycle greatly boosts passive ATP generation.', cost: () => ({ resource: Resource.ATP, amount: 10000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.ATP, value: 30 }] },
            { id: 'kc_precursors', name: 'Metabolic Hub', description: 'Use the cycle to produce biological precursors, boosting Amino Acid and Nucleotide generation.', cost: () => ({ resource: Resource.ATP, amount: 12000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.AminoAcids, value: 1 }, { type: 'ADD_BASE_GENERATION', resource: Resource.Nucleotides, value: 1 }] },
            { id: 'kc_regulation', name: 'Allosteric Regulation', description: 'Develop allosteric regulation of the cycle for better energy management, improving efficiency.', cost: () => ({ resource: Resource.ATP, amount: 14000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'efficiency', value: 5 }] },
        ]
    }
  },
  {
    id: 'homeostasis',
    name: 'Homeostasis',
    description: 'Develop the ability for multicellular organisms to maintain a stable internal environment.',
    cost: [{ resource: Resource.ATP, amount: 12000 }],
    position: { x: 65, y: 92 },
    effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 10 }],
    icon: 'homeostasis',
    dependencies: ['chemosensation', 'cambrian_explosion'],
    panelContent: {
        facts: [
            { 
              text: "Homeostasis is a self-regulating process by which biological systems maintain stability while adjusting to conditions that are optimal for survival.",
              quiz: {
                question: "What is homeostasis?",
                options: ["A state of hibernation", "A process of rapid evolution", "A self-regulating process to maintain internal stability", "The process of cell division"],
                answerIndex: 2
              }
            },
            { 
              text: "Negative feedback loops are the primary mechanism for maintaining homeostasis. For example, if your body temperature rises, you sweat to cool down, bringing the temperature back to the set point.", 
              unlockedBySubUpgradeId: 'homeo_stability',
              quiz: {
                question: "What is the primary mechanism for maintaining homeostasis?",
                options: ["Positive feedback loops", "Genetic mutation", "Negative feedback loops", "Cellular competition"],
                answerIndex: 2
              }
            },
            { 
              text: "The endocrine system, which uses hormones, and the nervous system are the two main control systems for maintaining homeostasis in complex animals.", 
              unlockedBySubUpgradeId: 'homeo_regulation',
              quiz: {
                question: "What are the two main control systems for homeostasis in complex animals?",
                options: ["The digestive and respiratory systems", "The skeletal and muscular systems", "The endocrine and nervous systems", "The circulatory and immune systems"],
                answerIndex: 2
              }
            },
            {
              text: "The hypothalamus, a small region in the brain, acts as the body's primary thermostat, regulating body temperature through mechanisms like sweating and shivering.",
              quiz: {
                  question: "What part of the brain acts as the body's 'thermostat' to regulate temperature?",
                  options: ["Cerebellum", "Cerebral Cortex", "Hypothalamus", "Medulla Oblongata"],
                  answerIndex: 2
              }
            }
        ],
        subUpgrades: [
            { id: 'homeo_stability', name: 'Internal Stability', description: 'A stable internal state improves the resilience of all biological units.', cost: () => ({ resource: Resource.ATP, amount: 15000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 10 }] },
            { id: 'homeo_regulation', name: 'Physiological Regulation', description: 'Better regulation improves protocell efficiency.', cost: () => ({ resource: Resource.ATP, amount: 18000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'efficiency', value: 10 }] },
            { id: 'homeo_endocrine', name: 'Endocrine System', description: 'Develop hormonal control for long-term regulation, increasing max Hands.', cost: () => ({ resource: Resource.ATP, amount: 20000 }), effects: [{ type: 'INCREASE_MAX_HANDS', value: 5 }] },
        ]
    }
  },
  {
    id: 'adaptive_immunity',
    name: 'Adaptive Immunity',
    description: 'Develop a highly specific immune system with memory to recognize and destroy pathogens.',
    cost: [{ resource: Resource.AminoAcids, amount: 30000 }, { resource: Resource.ATP, amount: 20000 }],
    position: { x: 58, y: 98 },
    effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 25 }],
    icon: 'adaptive_immunity',
    dependencies: ['homeostasis', 'myelination'],
    panelContent: {
        facts: [
            { 
              text: "The adaptive immune system is characterized by its specificity and memory. After an initial encounter with a pathogen, it 'remembers' it, allowing for a much faster and stronger response upon subsequent encounters. This is the principle behind vaccination.",
              quiz: {
                question: "The principle behind vaccination is based on what feature of the adaptive immune system?",
                options: ["Its ability to cause inflammation", "Its memory of past pathogens", "Its speed in the first encounter", "Its ability to attack any cell"],
                answerIndex: 1
              }
            },
            { 
              text: "V(D)J recombination is the unique genetic process that shuffles gene segments to create a vast diversity of antibodies and T-cell receptors, allowing the immune system to recognize almost any pathogen.", 
              unlockedBySubUpgradeId: 'ai_memory',
              quiz: {
                question: "What process creates the vast diversity of antibodies and T-cell receptors?",
                options: ["Meiosis", "Mitosis", "V(D)J recombination", "Horizontal gene transfer"],
                answerIndex: 2
              }
            },
            {
              text: "B cells, a type of lymphocyte, are responsible for producing antibodies. Each B cell produces a unique antibody that can recognize a specific antigen.",
              quiz: {
                  question: "Which type of immune cell is responsible for producing antibodies?",
                  options: ["T cells", "B cells", "Macrophages", "Neutrophils"],
                  answerIndex: 1
              }
            }
        ],
        subUpgrades: [
            { id: 'ai_memory', name: 'Immunological Memory', description: 'A strong immune memory provides a massive boost to protocell resilience.', cost: () => ({ resource: Resource.AminoAcids, amount: 40000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 30 }] },
            { id: 'ai_vdj_recombination', name: 'V(D)J Recombination', description: 'Generate a huge repertoire of antibodies, improving resilience.', cost: () => ({ resource: Resource.AminoAcids, amount: 50000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 15 }] },
        ]
    }
  },
  {
    id: 'sexual_reproduction',
    name: 'Sexual Reproduction',
    description: 'Combine genetic material from two parents to dramatically increase genetic variation.',
    cost: [{ resource: Resource.Nucleotides, amount: 15000 }],
    position: { x: 75, y: 92 },
    effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Nucleotides, value: 1 }],
    icon: 'sexual_reproduction',
    dependencies: ['multicellularity'],
    panelContent: {
        facts: [
            { 
              text: "The evolution of sexual reproduction is a major puzzle because it has significant costs (like finding a mate), but its benefit of creating genetic diversity is thought to outweigh them.",
              quiz: {
                question: "What is thought to be the main evolutionary benefit of sexual reproduction?",
                options: ["It is faster than asexual reproduction", "It requires less energy", "It creates genetic diversity", "It guarantees offspring will be identical"],
                answerIndex: 2
              }
            },
            { 
              text: "Meiosis is the special type of cell division that produces gametes (sperm and egg cells). It shuffles genes through processes like crossing over and independent assortment.", 
              unlockedBySubUpgradeId: 'sr_recombination',
              quiz: {
                question: "What is the name of the special cell division that produces gametes (sperm and egg cells)?",
                options: ["Mitosis", "Meiosis", "Binary Fission", "Budding"],
                answerIndex: 1
              }
            },
            { 
              text: "The Red Queen hypothesis suggests that sexual reproduction is beneficial because it allows host species to constantly evolve new defenses against co-evolving parasites.", 
              unlockedBySubUpgradeId: 'sr_red_queen',
              quiz: {
                question: "What does the Red Queen hypothesis suggest about sexual reproduction?",
                options: ["It helps hosts evolve defenses against co-evolving parasites", "It allows species to run faster", "It makes organisms red", "It is only useful for royalty"],
                answerIndex: 0
              }
            },
            {
              text: "Parthenogenesis is a natural form of asexual reproduction in which growth and development of embryos occur without fertilization by a male. It occurs in some insects, reptiles, and fish.",
              quiz: {
                  question: "What is the term for asexual reproduction where an embryo develops without fertilization?",
                  options: ["Budding", "Binary Fission", "Parthenogenesis", "Spore Formation"],
                  answerIndex: 2
              }
            }
        ],
        subUpgrades: [
            { id: 'sr_recombination', name: 'Genetic Recombination', description: 'The constant shuffling of genes provides a passive source of Nucleotides.', cost: () => ({ resource: Resource.Nucleotides, amount: 20000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Nucleotides, value: 2 }] },
            { id: 'sr_red_queen', name: 'Red Queen\'s Race', description: 'Staying ahead in the evolutionary arms race improves protocell resilience.', cost: () => ({ resource: Resource.Nucleotides, amount: 25000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 10 }] },
            { id: 'sr_diversity', name: 'Increase Diversity', description: 'A more diverse gene pool improves protocell efficiency.', cost: () => ({ resource: Resource.Nucleotides, amount: 30000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'efficiency', value: 5 }] },
        ]
    }
  },
  {
    id: 'hox_genes',
    name: 'HOX Genes',
    description: 'Evolve a set of master control genes that specify the body plan of an embryo.',
    cost: [{ resource: Resource.Nucleotides, amount: 20000 }],
    position: { x: 55, y: 75 },
    effects: [{ type: 'INCREASE_MAX_HANDS', value: 10 }],
    icon: 'hox_genes',
    dependencies: ['endoskeleton'],
    panelContent: {
        facts: [
            { 
              text: "HOX genes are highly conserved across the animal kingdom, meaning a fly's body-plan gene can function in a mouse, highlighting a shared ancestry.",
              quiz: {
                question: "What does it mean that HOX genes are 'highly conserved'?",
                options: ["They are stored in a protected part of the cell", "They are very similar across a wide range of different animals", "They cannot be mutated", "They are a recent evolutionary invention"],
                answerIndex: 1
              }
            },
            { 
              text: "These genes are arranged on the chromosome in the same order as the body parts they control, a phenomenon known as colinearity.", 
              unlockedBySubUpgradeId: 'hox_control',
              quiz: {
                question: "The phenomenon where HOX genes are arranged on the chromosome in the same order as the body parts they control is called what?",
                options: ["Linearity", "Colinearity", "Sequentiality", "Genetic Mapping"],
                answerIndex: 1
              }
            },
            { 
              text: "Mutations in HOX genes can cause dramatic effects, such as growing legs where antennae should be on a fruit fly (a homeotic transformation).", 
              unlockedBySubUpgradeId: 'hox_mutation',
              quiz: {
                question: "A mutation in a HOX gene can cause what kind of dramatic effect in a fruit fly?",
                options: ["Changing its color", "Making it glow in the dark", "Growing legs where antennae should be", "Making it twice as large"],
                answerIndex: 2
              }
            },
            {
              text: "Small changes in the expression patterns of HOX genes during embryonic development can lead to major changes in the adult body plan, a key mechanism in animal evolution.",
              quiz: {
                  question: "Small changes in the expression of which genes can lead to major changes in an animal's body plan?",
                  options: ["Metabolic genes", "HOX genes", "Immune system genes", "Hemoglobin genes"],
                  answerIndex: 1
              }
            }
        ],
        subUpgrades: [
            { id: 'hox_control', name: 'Body Plan Control', description: 'Mastery over body plans allows for more complex manipulation, granting Max Hands.', cost: () => ({ resource: Resource.Nucleotides, amount: 25000 }), effects: [{ type: 'INCREASE_MAX_HANDS', value: 15 }] },
            { id: 'hox_mutation', name: 'Controlled Mutations', description: 'Experiment with HOX mutations to improve protocell efficiency.', cost: () => ({ resource: Resource.Nucleotides, amount: 30000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'efficiency', value: 10 }] },
            { id: 'hox_duplication', name: 'Gene Duplication', description: 'Duplicate HOX gene clusters to allow for more complex body plans.', cost: () => ({ resource: Resource.Nucleotides, amount: 35000 }), effects: [{ type: 'INCREASE_MAX_HANDS', value: 5 }] },
        ]
    }
  },
  {
    id: 'evolution_of_vision',
    name: 'Evolution of Vision',
    description: 'Develop light-sensitive cells, evolving from simple eye-spots to complex, image-forming eyes.',
    cost: [{ resource: Resource.ATP, amount: 30000 }],
    position: { x: 38, y: 85 },
    effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'speed', value: 10 }],
    icon: 'evolution_of_vision',
    dependencies: ['opsin_proteins'],
    panelContent: {
        facts: [
            { 
              text: "The eye has evolved independently in many different lineages, a classic example of convergent evolution, starting from a simple patch of photoreceptor proteins.",
              quiz: {
                question: "The independent evolution of the eye in many different lineages is a classic example of what?",
                options: ["Genetic drift", "Convergent evolution", "Punctuated equilibrium", "Vestigiality"],
                answerIndex: 1
              }
            },
            { 
              text: "Even a simple light-sensitive spot provides a significant evolutionary advantage, allowing an organism to distinguish light from dark and move accordingly.", 
              unlockedBySubUpgradeId: 'eov_acuity',
              quiz: {
                question: "What is the most basic advantage provided by a simple light-sensitive spot?",
                options: ["The ability to see in color", "The ability to distinguish light from dark", "The ability to focus on objects", "The ability to see in 3D"],
                answerIndex: 1
              }
            },
            { 
              text: "The evolution from a simple light-sensitive spot to a complex camera-type eye can be modeled in a surprisingly small number of generations, with each step providing a selective advantage.", 
              unlockedBySubUpgradeId: 'eov_camera',
              quiz: {
                question: "According to models, how quickly could a complex camera-type eye evolve?",
                options: ["It would take billions of years", "It can't evolve, it must be created", "In a surprisingly small number of generations", "It only evolved once in Earth's history"],
                answerIndex: 2
              }
            },
            {
              text: "The compound eye of insects is made up of thousands of tiny independent visual units called ommatidia, each with its own lens and photoreceptor cells. This gives them a wide field of view and excellent motion detection.",
              quiz: {
                  question: "The compound eyes of insects are composed of thousands of individual units called what?",
                  options: ["Retinas", "Pupils", "Ommatidia", "Cones"],
                  answerIndex: 2
              }
            }
        ],
        subUpgrades: [
            { id: 'eov_acuity', name: 'Visual Acuity', description: 'Better vision allows for more effective protocell hunts, improving its speed.', cost: () => ({ resource: Resource.ATP, amount: 40000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'speed', value: 15 }] },
            { id: 'eov_camera', name: 'Camera-Type Eye', description: 'Develop a camera-type eye for superior focusing, improving protocell efficiency.', cost: () => ({ resource: Resource.ATP, amount: 45000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'efficiency', value: 10 }] },
            { id: 'eov_color', name: 'Color Vision', description: 'Evolve multiple types of cone cells to see in color, further improving hunt efficiency.', cost: () => ({ resource: Resource.ATP, amount: 50000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'efficiency', value: 5 }] },
        ]
    }
  },
  {
    id: 'cephalization',
    name: 'Cephalization',
    description: 'Concentrate sensory organs and nerve cells at the anterior end, forming a distinct head and brain.',
    cost: [{ resource: Resource.AminoAcids, amount: 40000 }],
    position: { x: 42, y: 95 },
    effects: [{ type: 'INCREASE_MAX_HANDS', value: 30 }],
    icon: 'cephalization',
    dependencies: ['nervous_system'],
    panelContent: {
        facts: [
            { 
              text: "Cephalization is strongly correlated with bilateral symmetry and an organism's ability to move forward and actively hunt or explore.",
              quiz: {
                question: "Cephalization (the development of a head) is strongly correlated with what body plan?",
                options: ["Radial symmetry", "Asymmetry", "Spherical symmetry", "Bilateral symmetry"],
                answerIndex: 3
              }
            },
            { 
              text: "Having a 'head' means sensory organs like eyes, ears, and nose encounter the environment first, allowing for faster responses.", 
              unlockedBySubUpgradeId: 'ceph_brain',
              quiz: {
                question: "What is a major advantage of having a 'head' with sensory organs?",
                options: ["It improves balance", "It allows for faster responses to the environment", "It makes the organism heavier", "It provides better camouflage"],
                answerIndex: 1
              }
            },
            { 
              text: "The development of a head is also linked to the development of a mouth and specialized feeding structures.", 
              unlockedBySubUpgradeId: 'ceph_learning',
              quiz: {
                question: "The development of a head is also linked to the development of what other structure?",
                options: ["A tail", "A mouth", "A protective shell", "Wings"],
                answerIndex: 1
              }
            },
            {
              text: "The human brain, the ultimate result of cephalization, is incredibly energy-intensive, consuming about 20% of the body's total oxygen and calories despite making up only about 2% of the body's weight.",
              quiz: {
                  question: "About what percentage of the body's total energy does the human brain consume?",
                  options: ["2%", "5%", "10%", "20%"],
                  answerIndex: 3
              }
            }
        ],
        subUpgrades: [
            { id: 'ceph_brain', name: 'Brain Development', description: 'The formation of a complex brain vastly increases your capacity for manipulation.', cost: () => ({ resource: Resource.AminoAcids, amount: 50000 }), effects: [{ type: 'INCREASE_MAX_HANDS', value: 40 }] },
            { id: 'ceph_learning', name: 'Advanced Learning', description: 'The ability to learn improves protocell efficiency.', cost: () => ({ resource: Resource.AminoAcids, amount: 60000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'efficiency', value: 15 }] },
            { id: 'ceph_sensory', name: 'Sensory Integration', description: 'Integrate multiple senses for a more complete picture of the world, improving protocell speed.', cost: () => ({ resource: Resource.AminoAcids, amount: 70000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'speed', value: 10 }] },
        ]
    }
  },
  {
    id: 'telomere_maintenance',
    name: 'Telomere Maintenance',
    description: 'Develop primitive mechanisms to protect the ends of chromosomes during DNA replication, slightly extending cellular lifespan.',
    cost: [{ resource: Resource.Nucleotides, amount: 4500 }],
    position: { x: 78, y: 52 },
    effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 5 }],
    icon: 'telomere_maintenance',
    dependencies: ['dna_replication'],
    panelContent: { 
        facts: [
            { 
              text: "Telomeres are repetitive nucleotide sequences at the end of chromosomes that protect them from deterioration. With each cell division, they shorten, contributing to cellular aging.",
              quiz: {
                question: "What are telomeres?",
                options: ["The center of a chromosome", "A type of gene", "Protective caps at the ends of chromosomes", "The enzymes that copy DNA"],
                answerIndex: 2
              }
            },
            { 
              text: "The 'end replication problem' refers to the inability of DNA polymerase to fully replicate the very end of a linear chromosome, leading to this progressive shortening.", 
              unlockedBySubUpgradeId: 'tm_end_problem',
              quiz: {
                question: "What is the 'end replication problem'?",
                options: ["When DNA replication is too slow", "When DNA has too many mutations", "The inability of DNA polymerase to fully copy the end of a chromosome", "When DNA cannot be unwound"],
                answerIndex: 2
              }
            },
            { 
              text: "The length of an organism's telomeres is correlated with its lifespan, though the relationship is complex and not the sole determinant of aging.", 
              unlockedBySubUpgradeId: 'tm_telomerase',
              quiz: {
                question: "The length of an organism's telomeres is correlated with what?",
                options: ["Its intelligence", "Its speed", "Its lifespan", "Its size"],
                answerIndex: 2
              }
            }
        ], 
        subUpgrades: [
            { id: 'tm_end_problem', name: 'Solve End-Replication', description: 'Develop a solution to the end-replication problem, improving protocell resilience.', cost: () => ({ resource: Resource.Nucleotides, amount: 5000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 5 }] },
            { id: 'tm_telomerase', name: 'Activate Telomerase', description: 'Activate telomerase to extend cellular lifespans, greatly boosting protocell resilience.', cost: () => ({ resource: Resource.Nucleotides, amount: 6000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 10 }] },
            { id: 'tm_shelterin', name: 'Shelterin Complex', description: 'Develop the Shelterin protein complex to protect telomeres from being recognized as DNA damage.', cost: () => ({ resource: Resource.Nucleotides, amount: 7000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 5 }] },
        ] 
    }
  },
  {
    id: 'telomerase_enzyme',
    name: 'Telomerase',
    description: 'Perfect the "immortality enzyme" telomerase, granting near-perfect chromosomal end replication.',
    cost: [{ resource: Resource.Nucleotides, amount: 10000 }],
    position: { x: 45, y: 65 },
    effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 20 }],
    icon: 'telomerase_enzyme',
    dependencies: ['ribosomes'],
    panelContent: {
        facts: [
            { 
              text: "Telomerase is a reverse transcriptase that carries its own RNA template to synthesize telomeric DNA.",
              quiz: {
                question: "What type of enzyme is telomerase?",
                options: ["A DNA polymerase", "A protease", "A reverse transcriptase", "A helicase"],
                answerIndex: 2
              }
            },
            { 
              text: "High telomerase activity is a hallmark of over 90% of cancer cells, allowing them to bypass normal cellular aging and achieve replicative immortality.", 
              unlockedBySubUpgradeId: 'te_cancer',
              quiz: {
                question: "High telomerase activity is a hallmark of what?",
                options: ["Muscle cells", "Nerve cells", "Cancer cells", "Skin cells"],
                answerIndex: 2
              }
            },
            { 
              text: "Most somatic (body) cells in adults have very low or undetectable levels of telomerase, which is a primary reason for cellular aging.", 
              unlockedBySubUpgradeId: 'te_immortality',
              quiz: {
                question: "Why do most normal body cells age?",
                options: ["They accumulate too much waste", "They have very low levels of telomerase", "They are damaged by sunlight", "They run out of energy"],
                answerIndex: 1
              }
            }
        ],
        subUpgrades: [
            { id: 'te_immortality', name: 'Replicative Immortality', description: 'Achieve perfect replication, greatly improving resilience.', cost: () => ({ resource: Resource.Nucleotides, amount: 12000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 25 }] },
            { id: 'te_cancer', name: 'Controlled Immortality', description: 'Learn to control telomerase to prevent unwanted growth, improving efficiency.', cost: () => ({ resource: Resource.Nucleotides, amount: 15000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'efficiency', value: 10 }] },
            { id: 'te_germline', name: 'Germline Activation', description: 'Ensure telomerase is active in germ cells to pass on full-length chromosomes to the next generation.', cost: () => ({ resource: Resource.Nucleotides, amount: 18000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Nucleotides, value: 0.5 }] },
        ]
    }
  },
  {
    id: 'antioxidant_defense',
    name: 'Antioxidant Defense',
    description: 'Produce enzymes like catalase and superoxide dismutase to neutralize damaging reactive oxygen species from metabolism.',
    cost: [{ resource: Resource.AminoAcids, amount: 6000 }],
    position: { x: 75, y: 62 },
    effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 5 }],
    icon: 'antioxidant_defense',
    dependencies: ['glycogen_storage'],
    panelContent: { 
        facts: [
            { 
              text: "Reactive oxygen species (ROS) are inevitable byproducts of aerobic respiration. Antioxidants are molecules that can safely interact with these free radicals, preventing them from causing damage to DNA, proteins, and lipids.",
              quiz: {
                question: "What are reactive oxygen species (ROS)?",
                options: ["A type of nutrient", "A source of cellular energy", "Inevitable byproducts of aerobic respiration", "Molecules that help build DNA"],
                answerIndex: 2
              }
            },
            { 
              text: "Superoxide dismutase (SOD) is a crucial antioxidant enzyme that converts the dangerous superoxide radical into oxygen and hydrogen peroxide.", 
              unlockedBySubUpgradeId: 'ad_sod',
              quiz: {
                question: "What does the enzyme superoxide dismutase (SOD) do?",
                options: ["Creates superoxide radicals", "Converts superoxide into oxygen and hydrogen peroxide", "Uses oxygen to create energy", "Repairs damaged proteins"],
                answerIndex: 1
              }
            },
            { 
              text: "Catalase then takes the hydrogen peroxide produced by SOD and converts it into harmless water and oxygen, completing the detoxification process.", 
              unlockedBySubUpgradeId: 'ad_catalase',
              quiz: {
                question: "What does the enzyme catalase do?",
                options: ["Converts water into hydrogen peroxide", "Converts hydrogen peroxide into water and oxygen", "Creates superoxide radicals", "Breaks down fats"],
                answerIndex: 1
              }
            },
            {
              text: "Vitamin C (ascorbic acid) is a well-known water-soluble antioxidant that can neutralize free radicals and help regenerate other antioxidants like Vitamin E.",
              quiz: {
                  question: "Which of these is a well-known water-soluble antioxidant vitamin?",
                  options: ["Vitamin D", "Vitamin K", "Vitamin A", "Vitamin C"],
                  answerIndex: 3
              }
            }
        ], 
        subUpgrades: [
            { id: 'ad_sod', name: 'Superoxide Dismutase', description: 'Produce SOD to improve protocell resilience.', cost: () => ({ resource: Resource.AminoAcids, amount: 7000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 5 }] },
            { id: 'ad_catalase', name: 'Catalase Production', description: 'Produce catalase for a two-pronged defense, further improving resilience.', cost: () => ({ resource: Resource.AminoAcids, amount: 8000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 5 }] },
            { id: 'ad_glutathione', name: 'Glutathione System', description: 'Develop the glutathione system, a master antioxidant, for ultimate protection.', cost: () => ({ resource: Resource.AminoAcids, amount: 9000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 10 }] },
        ] 
    }
  },
  {
    id: 'lipid_metabolism',
    name: 'Lipid Metabolism',
    description: 'Evolve beta-oxidation pathways to break down fatty acids, unlocking a dense and efficient energy source.',
    cost: [{ resource: Resource.ATP, amount: 6500 }],
    position: { x: 70, y: 55 },
    effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'efficiency', value: 10 }],
    icon: 'lipid_metabolism',
    dependencies: ['glycolysis'],
    panelContent: { 
        facts: [
            { 
              text: "Fatty acids are a more energy-dense storage molecule than carbohydrates. The ability to metabolize lipids provided a significant advantage, allowing for longer survival between feeding.",
              quiz: {
                question: "What is the main advantage of fat as an energy storage molecule compared to carbohydrates?",
                options: ["It dissolves in water", "It is more energy-dense", "It can be converted to light", "It is easier to break down"],
                answerIndex: 1
              }
            },
            { 
              text: "Beta-oxidation is the spiral pathway that breaks down fatty acids in the mitochondria to produce acetyl-CoA, which can then enter the Krebs cycle.", 
              unlockedBySubUpgradeId: 'lm_beta_oxidation',
              quiz: {
                question: "What is the name of the process that breaks down fatty acids in the mitochondria?",
                options: ["Glycolysis", "Beta-oxidation", "Photosynthesis", "Fermentation"],
                answerIndex: 1
              }
            },
            { 
              text: "In times of starvation, the liver can convert fatty acids into ketone bodies, which can be used as an alternative fuel source by the brain and other tissues.", 
              unlockedBySubUpgradeId: 'lm_storage',
              quiz: {
                question: "What alternative fuel source can the liver produce from fatty acids during starvation?",
                options: ["Glucose", "Amino acids", "Lactic acid", "Ketone bodies"],
                answerIndex: 3
              }
            }
        ], 
        subUpgrades: [
            { id: 'lm_beta_oxidation', name: 'Beta-Oxidation', description: 'Develop beta-oxidation to improve protocell efficiency.', cost: () => ({ resource: Resource.ATP, amount: 7000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'efficiency', value: 10 }] },
            { id: 'lm_storage', name: 'Fat Storage', description: 'Develop fat storage for long-term energy reserves, improving protocell resilience.', cost: () => ({ resource: Resource.ATP, amount: 8000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 5 }] },
            { id: 'lm_synthesis', name: 'Lipid Synthesis', description: 'Develop the ability to synthesize lipids, increasing storage capacity for all biological resources.', cost: () => ({ resource: Resource.ATP, amount: 9000 }), effects: [{ type: 'INCREASE_UNIVERSAL_STORAGE', value: 1 }] },
        ] 
    }
  },
  {
    id: 'glycogen_storage',
    name: 'Glycogen Storage',
    description: 'Polymerize glucose into glycogen, creating a readily accessible short-term energy reserve for bursts of activity.',
    cost: [{ resource: Resource.ATP, amount: 5500 }],
    position: { x: 68, y: 58 },
    effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'speed', value: 5 }],
    icon: 'glycogen_storage',
    dependencies: ['lipid_metabolism'],
    panelContent: { 
        facts: [
            { 
              text: "Glycogen is a large, branched polymer of glucose that can be quickly broken down to release glucose molecules when energy is needed, making it ideal for rapid metabolic response.",
              quiz: {
                question: "Why is glycogen ideal for a rapid metabolic response?",
                options: ["It is a long-term energy store", "It can be quickly broken down to release glucose", "It provides structural support", "It is indigestible"],
                answerIndex: 1
              }
            },
            { 
              text: "In humans, glycogen is mainly stored in the liver, where it maintains blood glucose levels, and in muscles, where it provides a local fuel source for contraction.", 
              unlockedBySubUpgradeId: 'gs_muscles',
              quiz: {
                question: "Where is glycogen mainly stored in humans?",
                options: ["In the brain and heart", "In fat cells", "In the liver and muscles", "In the stomach"],
                answerIndex: 2
              }
            },
            { 
              text: "The highly branched structure of glycogen allows for many enzymes to work on it simultaneously, enabling much faster glucose release than from a linear polymer like starch.", 
              unlockedBySubUpgradeId: 'gs_branching',
              quiz: {
                question: "What feature of glycogen's structure allows for rapid glucose release?",
                options: ["Its linear structure", "Its circular structure", "Its highly branched structure", "Its small size"],
                answerIndex: 2
              }
            }
        ], 
        subUpgrades: [
            { id: 'gs_branching', name: 'Improve Branching', description: 'A more branched structure allows for faster energy release, improving protocell speed.', cost: () => ({ resource: Resource.ATP, amount: 6000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'speed', value: 5 }] },
            { id: 'gs_muscles', name: 'Muscle Storage', description: 'Store glycogen in muscles for longer hunts, improving protocell efficiency.', cost: () => ({ resource: Resource.ATP, amount: 7000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'efficiency', value: 5 }] },
            { id: 'gs_liver', name: 'Liver Glycogen', description: 'Use liver glycogen to regulate energy for the whole organism, improving protocell resilience.', cost: () => ({ resource: Resource.ATP, amount: 8000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 5 }] },
        ] 
    }
  },
  {
    id: 'evolution_of_lungs',
    name: 'Gas Bladder',
    description: 'Develop an internal bladder for buoyancy control, a precursor to terrestrial lungs for breathing air.',
    cost: [{ resource: Resource.AminoAcids, amount: 12000 }],
    position: { x: 72, y: 88 },
    effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.ATP, value: 5 }],
    icon: 'evolution_of_lungs',
    dependencies: ['cambrian_explosion'],
    panelContent: { 
        facts: [
            { 
              text: "The lungs of terrestrial vertebrates and the gas bladders of fish are homologous structures, meaning they share a common evolutionary origin from an out-pocketing of the primitive gut.",
              quiz: {
                question: "The lungs of terrestrial vertebrates are homologous to what structure in fish?",
                options: ["The gills", "The stomach", "The fins", "The gas bladder"],
                answerIndex: 3
              }
            },
            { 
              text: "In early bony fish, this structure likely served as a primitive lung, allowing them to gulp air in oxygen-poor water.", 
              unlockedBySubUpgradeId: 'el_gulping',
              quiz: {
                question: "What was the likely original function of the gas bladder/primitive lung in early bony fish?",
                options: ["To store food", "To filter water", "To gulp air in oxygen-poor water", "To aid in digestion"],
                answerIndex: 2
              }
            },
            { 
              text: "The evolution of surfactants, substances that reduce surface tension, was a critical step in preventing the delicate air sacs (alveoli) from collapsing.", 
              unlockedBySubUpgradeId: 'el_buoyancy',
              quiz: {
                question: "What is the function of surfactants in the lungs?",
                options: ["To kill bacteria", "To absorb oxygen", "To reduce surface tension and prevent collapse of air sacs", "To add moisture to the air"],
                answerIndex: 2
              }
            }
        ], 
        subUpgrades: [
            { id: 'el_gulping', name: 'Air Gulping', description: 'Gulping air provides a small boost to passive ATP generation.', cost: () => ({ resource: Resource.AminoAcids, amount: 15000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.ATP, value: 5 }] },
            { id: 'el_buoyancy', name: 'Buoyancy Control', description: 'Better buoyancy control improves protocell speed.', cost: () => ({ resource: Resource.AminoAcids, amount: 18000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'speed', value: 5 }] },
            { id: 'el_surfactants', name: 'Develop Surfactants', description: 'Preventing lung collapse improves protocell resilience.', cost: () => ({ resource: Resource.AminoAcids, amount: 20000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 5 }] },
        ] 
    }
  },
  {
    id: 'cellular_homeostasis',
    name: 'Cellular Homeostasis',
    description: 'Develop internal feedback loops to maintain a stable intracellular environment, resisting external fluctuations.',
    cost: [{ resource: Resource.ATP, amount: 7500 }],
    position: { x: 95, y: 85 },
    effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 5 }],
    icon: 'cellular_homeostasis',
    dependencies: ['endosymbiosis'],
    panelContent: { 
        facts: [
            { 
              text: "Cellular homeostasis involves a multitude of processes, such as ion pumps and pH buffering, that keep the cell's internal state within a narrow, optimal range for life, even when the external environment changes dramatically.",
              quiz: {
                question: "What is the main goal of cellular homeostasis?",
                options: ["To make the cell grow larger", "To speed up chemical reactions", "To keep the cell's internal state within an optimal range", "To stop all chemical reactions"],
                answerIndex: 2
              }
            },
            { 
              text: "The sodium-potassium pump is a vital enzyme found in the membrane of all animal cells. It actively transports sodium and potassium ions against their concentration gradients to maintain cellular excitability and volume.", 
              unlockedBySubUpgradeId: 'ch_ion_pumps',
              quiz: {
                question: "What is the function of the sodium-potassium pump?",
                options: ["To produce energy", "To maintain cellular excitability and volume", "To break down proteins", "To copy DNA"],
                answerIndex: 1
              }
            }
        ],
        subUpgrades: [
           { id: 'ch_ion_pumps', name: 'Develop Ion Pumps', description: 'Develop ion pumps to maintain membrane potential, improving protocell resilience.', cost: () => ({ resource: Resource.ATP, amount: 8000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 5 }] },
           { id: 'ch_ph_buffering', name: 'pH Buffering', description: 'Develop systems to buffer intracellular pH, further improving resilience.', cost: () => ({ resource: Resource.ATP, amount: 9000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 5 }] },
        ]
    }
  },
  {
    id: 'circadian_rhythm',
    name: 'Circadian Rhythm',
    description: 'Establish an internal biological clock that synchronizes with the daily light-dark cycle.',
    cost: [{ resource: Resource.ATP, amount: 11000 }],
    position: { x: 92, y: 75 },
    effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'efficiency', value: 5 }],
    icon: 'circadian_rhythm',
    dependencies: ['epigenetics'],
    panelContent: { 
        facts: [
            { 
              text: "The circadian rhythm is an internal, 24-hour clock that regulates cycles of sleepiness and alertness. It is controlled by a 'master clock' in the brain's suprachiasmatic nucleus (SCN).",
              quiz: {
                question: "What part of the brain contains the 'master clock' for the circadian rhythm?",
                options: ["The cerebellum", "The hippocampus", "The suprachiasmatic nucleus (SCN)", "The prefrontal cortex"],
                answerIndex: 2
              }
            },
            { 
              text: "At its core, the circadian clock is a transcription-translation feedback loop, where specific 'clock genes' and their protein products inhibit their own production over a 24-hour cycle.", 
              unlockedBySubUpgradeId: 'cr_clock_genes',
              quiz: {
                question: "At its core, the circadian clock is what kind of biological mechanism?",
                options: ["A metabolic pathway", "A type of cell division", "A transcription-translation feedback loop", "A system for protein digestion"],
                answerIndex: 2
              }
            }
        ], 
        subUpgrades: [
            { id: 'cr_clock_genes', name: 'Clock Genes', description: 'Perfect the genetic feedback loop of the clock, improving efficiency.', cost: () => ({ resource: Resource.ATP, amount: 13000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'efficiency', value: 5 }] },
            { id: 'cr_synchronization', name: 'Light Synchronization', description: 'Synchronize the clock with light cues to better anticipate environmental changes.', cost: () => ({ resource: Resource.ATP, amount: 15000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'efficiency', value: 5 }] },
        ] 
    }
  },
  {
    id: 'myelination',
    name: 'Myelination',
    description: 'Wrap nerve axons in a fatty myelin sheath to dramatically increase the speed of electrical signal transmission.',
    cost: [{ resource: Resource.ATP, amount: 50000 }],
    position: { x: 50, y: 98 },
    effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'speed', value: 15 }],
    icon: 'myelination',
    dependencies: ['nervous_system'],
    panelContent: {
      facts: [
        { 
          text: "Myelin allows for saltatory conduction, where nerve impulses 'jump' between gaps in the sheath (Nodes of Ranvier), greatly increasing speed.",
          quiz: {
            question: "How does myelin increase the speed of nerve impulses?",
            options: ["By making the nerve thicker", "It allows the impulse to 'jump' between gaps in the sheath", "By increasing the electrical charge", "By cooling the nerve"],
            answerIndex: 1
          }
        },
        { 
          text: "Diseases like Multiple Sclerosis involve the destruction of the myelin sheath, leading to severe neurological problems.", 
          unlockedBySubUpgradeId: 'myelin_insulation',
          quiz: {
            question: "Which disease is associated with the destruction of the myelin sheath?",
            options: ["Alzheimer's Disease", "Parkinson's Disease", "Multiple Sclerosis", "Huntington's Disease"],
            answerIndex: 2
          }
        },
        {
          text: "The cells that produce the myelin sheath are called Schwann cells in the peripheral nervous system (nerves outside the brain and spinal cord) and oligodendrocytes in the central nervous system.",
          quiz: {
              question: "What are the myelin-producing cells in the central nervous system called?",
              options: ["Astrocytes", "Neurons", "Schwann Cells", "Oligodendrocytes"],
              answerIndex: 3
          }
        }
      ],
      subUpgrades: [
        { id: 'myelin_transmission', name: 'Accelerated Transmission', description: 'Faster signal speed improves protocell speed.', cost: () => ({ resource: Resource.ATP, amount: 60000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'speed', value: 10 }] },
        { id: 'myelin_insulation', name: 'Electrical Insulation', description: 'Better insulation prevents signal loss, improving protocell efficiency.', cost: () => ({ resource: Resource.ATP, amount: 65000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'efficiency', value: 5 }] }
      ]
    }
  },
  {
    id: 'neural_crest_cells',
    name: 'Neural Crest Cells',
    description: 'Evolve a multipotent population of embryonic cells, "the fourth germ layer," crucial for vertebrate development.',
    cost: [{ resource: Resource.AminoAcids, amount: 30000 }],
    position: { x: 52, y: 82 },
    effects: [{ type: 'INCREASE_MAX_HANDS', value: 10 }],
    icon: 'neural_crest_cells',
    dependencies: ['hox_genes'],
    panelContent: {
      facts: [
        { 
          text: "Neural crest cells are unique to vertebrates and give rise to a diverse array of cell types, including neurons, glial cells, pigment cells, and the bones of the face and skull.",
          quiz: {
            question: "Neural crest cells are unique to which group of animals?",
            options: ["Insects", "Vertebrates", "Molluscs", "All animals"],
            answerIndex: 1
          }
        },
        { 
          text: "Their migratory ability and multipotency are key to the complex head structures and sensory organs of vertebrates.", 
          unlockedBySubUpgradeId: 'ncc_complexity',
          quiz: {
            question: "The migratory ability of neural crest cells is key to the development of what structures?",
            options: ["The digestive system", "The circulatory system", "The complex head and sensory organs", "The reproductive organs"],
            answerIndex: 2
          }
        }
      ],
      subUpgrades: [
        { id: 'ncc_complexity', name: 'Vertebrate Complexity', description: 'The ability to form complex structures grants more Max Hands.', cost: () => ({ resource: Resource.AminoAcids, amount: 40000 }), effects: [{ type: 'INCREASE_MAX_HANDS', value: 10 }] },
        { id: 'ncc_cranial', name: 'Cranial Development', description: 'Developing a complex head improves protocell efficiency and resilience.', cost: () => ({ resource: Resource.AminoAcids, amount: 45000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'efficiency', value: 5 }, { type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 5 }] }
      ]
    }
  },
  {
    id: 'blood_clotting',
    name: 'Blood Clotting Cascade',
    description: 'Develop a complex cascade of protein reactions to form clots and prevent blood loss from injuries.',
    cost: [{ resource: Resource.AminoAcids, amount: 25000 }],
    position: { x: 80, y: 85 },
    effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 10 }],
    icon: 'blood_clotting',
    dependencies: ['circulatory_system'],
    panelContent: {
      facts: [
        { 
          text: "The clotting cascade is an example of a biological amplification system, where the activation of one enzyme molecule triggers the activation of many more, leading to a rapid response.",
          quiz: {
            question: "What type of biological system is the clotting cascade an example of?",
            options: ["A feedback inhibition system", "An amplification system", "A transport system", "A sensory system"],
            answerIndex: 1
          }
        },
        { 
          text: "Hemophilia is a genetic disorder that impairs the body's ability to make blood clots, a process needed to stop bleeding.", 
          unlockedBySubUpgradeId: 'bc_rapid_response',
          quiz: {
            question: "What genetic disorder impairs the ability to form blood clots?",
            options: ["Sickle Cell Anemia", "Cystic Fibrosis", "Hemophilia", "Down Syndrome"],
            answerIndex: 2
          }
        },
        {
          text: "The final step of the clotting cascade is the conversion of fibrinogen, a soluble protein, into insoluble fibrin fibers. These fibers form a mesh that traps platelets and red blood cells to form a stable clot.",
          quiz: {
              question: "What protein forms the meshwork that creates a stable blood clot?",
              options: ["Hemoglobin", "Collagen", "Fibrin", "Keratin"],
              answerIndex: 2
          }
        }
      ],
      subUpgrades: [
        { id: 'bc_rapid_response', name: 'Rapid Response', description: 'Faster clotting greatly improves protocell resilience.', cost: () => ({ resource: Resource.AminoAcids, amount: 30000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 10 }] },
        { id: 'bc_platelets', name: 'Platelet Activation', description: 'Efficient platelet activation improves the reliability of the clot.', cost: () => ({ resource: Resource.AminoAcids, amount: 35000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 5 }] }
      ]
    }
  }
];