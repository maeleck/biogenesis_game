import { Upgrade, Resource } from '../../types';

export const biologicalUpgrades: Upgrade[] = [
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
        { text: "The Miller-Urey experiment in 1952 showed that amino acids could form spontaneously from inorganic precursors under conditions mimicking early Earth, supporting the idea of a 'primordial soup'.", unlockedBySubUpgradeId: 'ab_soup_1' },
        { text: "Another hypothesis, 'metabolism-first', suggests that self-sustaining networks of chemical reactions emerged first, and were later enclosed in cells, rather than genetic molecules like RNA appearing first.", unlockedBySubUpgradeId: 'ab_catalysis' },
        { text: "Montmorillonite clay, a product of weathered volcanic ash, has been shown in experiments to dramatically accelerate the formation of RNA vesicles, simultaneously forming both a container and its genetic contents.", unlockedBySubUpgradeId: 'ab_polymerization' }
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
        { text: "Aquaporins are channel proteins that form pores in the membrane of biological cells, mainly facilitating transport of water between cells. They are vital for maintaining osmotic balance." },
        { text: "A single aquaporin channel can facilitate the transport of up to 3 billion water molecules per second, a rate far faster than simple diffusion across the membrane.", unlockedBySubUpgradeId: 'aq_efficiency'}
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
        { text: "Histones are proteins that act as spools around which DNA winds. This compaction not only saves space but is also key to controlling which genes are turned on or off." },
        { text: "Epigenetic modifications to histone 'tails' can alter how tightly DNA is wound, making genes more or less accessible for transcription.", unlockedBySubUpgradeId: 'hgr_control' }
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
        { text: "The actin cytoskeleton is a network of protein filaments that extends throughout the cytoplasm of eukaryotic cells, providing shape, strength, and motility." },
        { text: "Actin filament dynamics (polymerization and depolymerization) at the leading edge of a cell are what drive crawling movements, a process called lamellipodia formation.", unlockedBySubUpgradeId: 'ac_motility' }
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
        { text: "Myosin proteins are molecular motors that 'walk' along actin filaments, converting chemical energy from ATP into mechanical force." },
        { text: "Besides muscle contraction, myosins are also involved in moving cargo, like vesicles and organelles, around the cell along actin highways.", unlockedBySubUpgradeId: 'mm_contraction' }
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
        { text: "Opsins are a group of light-sensitive proteins found in photoreceptor cells of the retina. They are the basis of vision." },
        { text: "When an opsin absorbs a photon of light, it changes its shape, triggering a biochemical cascade that results in a nerve impulse.", unlockedBySubUpgradeId: 'op_light_sense' }
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
        { text: "Hemoglobin is the iron-containing protein in red blood cells that transports oxygen from the lungs to the rest of the body." },
        { text: "The binding of one oxygen molecule to hemoglobin increases the affinity of the other binding sites for oxygen, a property called cooperative binding, which makes it highly efficient.", unlockedBySubUpgradeId: 'hb_transport' }
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
        { text: "Collagen is the most abundant protein in mammals, making up from 25% to 35% of the whole-body protein content. It forms the structural framework of skin, bones, and cartilage." },
        { text: "Collagen fibers have a unique triple helix structure, giving them incredible tensile strength—gram for gram, Type I collagen is stronger than steel.", unlockedBySubUpgradeId: 'cs_strength' }
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
        { text: "Many organisms, from insects to elephants, use vibration sensing for communication, navigation, and detecting predators or prey." },
        { text: "The lateral line system in fish is a classic example, allowing them to detect water movement and pressure changes caused by other organisms.", unlockedBySubUpgradeId: 'vs_detection' }
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
        { text: "Chemosensation is the oldest and most universal sense, present in organisms from bacteria to mammals. It's used to find food, avoid toxins, and communicate." },
        { text: "Insects have chemoreceptors on their antennae, feet, and mouthparts, allowing them to 'taste' by walking on a surface.", unlockedBySubUpgradeId: 'cs_food_finding' }
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
        { text: "Liposomes can be filled with drugs and used to deliver medication for cancer and other diseases. They are a foundational technology in nanomedicine." },
        { text: "The lipid bilayer of a liposome is amphipathic, meaning the 'head' of the lipid molecule is attracted to water while the 'tail' is repelled by it, causing them to self-assemble into a sphere in water.", unlockedBySubUpgradeId: 'lipo_stability' }
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
        { text: "Adenosine triphosphate (ATP) is often called the 'molecular unit of currency' for intracellular energy transfer. It provides the energy for most cellular functions." },
        { text: "The energy from ATP is released when a phosphate group is broken off, turning it into ADP (Adenosine diphosphate). This reaction is coupled with other reactions that require energy.", unlockedBySubUpgradeId: 'ac_cycle_1' },
        { text: "A typical cell in the human body may contain about one billion ATP molecules at any instant, and the entire supply is recycled about every 20-30 seconds.", unlockedBySubUpgradeId: 'ac_efficiency_1' },
        { text: "The enzyme ATP synthase, which produces ATP, is a remarkable molecular motor. The flow of protons through it causes it to spin, generating ATP in a process similar to a hydroelectric dam.", unlockedBySubUpgradeId: 'ac_storage' },
        { text: "Substrate-level phosphorylation is a direct phosphorylation of ADP with a phosphate group by using the energy obtained from a coupled reaction. It is a much simpler process than oxidative phosphorylation and likely evolved first.", unlockedBySubUpgradeId: 'ac_substrate_level' }
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
            { text: "A protein's function is dictated by its unique 3D structure. Misfolded proteins can lead to diseases like Alzheimer's and Parkinson's." },
            { text: "The hydrophobic effect is a major driving force in protein folding, causing nonpolar amino acids to bury themselves in the protein's core, away from water.", unlockedBySubUpgradeId: 'pf_hydrophobic' },
            { text: "Anfinsen's dogma states that, for most proteins, the amino acid sequence alone contains all the information needed to specify its final 3D structure.", unlockedBySubUpgradeId: 'pf_dogma' }
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
            { text: "The ribosome is a complex machine made of both RNA (rRNA) and protein. The fact that RNA performs the key catalytic step of forming peptide bonds is strong evidence for the RNA World hypothesis." },
            { text: "Antibiotics like tetracycline and erythromycin work by targeting and inhibiting bacterial ribosomes, while leaving eukaryotic ribosomes unharmed.", unlockedBySubUpgradeId: 'rib_efficiency'}
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
            { text: "Heat shock proteins (HSPs) are produced by cells in response to stressful conditions like heat, cold, and UV light." },
            { text: "They act as 'chaperones', binding to unfolded or misfolded proteins to help them attain their proper functional shape and prevent them from clumping together.", unlockedBySubUpgradeId: 'hsp_chaperone' },
            { text: "Some HSPs are involved in presenting antigens to the immune system, playing a role in both innate and adaptive immunity.", unlockedBySubUpgradeId: 'hsp_ubiquity' }
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
            { text: "GFP was first discovered in the jellyfish Aequorea victoria. Its discovery and development as a research tool earned a Nobel Prize." },
            { text: "Scientists can fuse the gene for GFP to the gene of another protein. This makes the target protein glow, allowing researchers to watch its movement and location in real-time within a living cell.", unlockedBySubUpgradeId: 'gfp_tagging' },
            { text: "By mutating the original GFP, scientists have created a whole rainbow of fluorescent proteins (BFPs, CFPs, YFPs, RFPs) for multicolor imaging.", unlockedBySubUpgradeId: 'gfp_chromophore' }
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
        { text: "Ribozymes are RNA molecules that can catalyze specific biochemical reactions, similar to protein enzymes. Their discovery was crucial evidence supporting the RNA world hypothesis.", unlockedBySubUpgradeId: 'rw_ribozymes_1' },
        { text: "RNA is generally less stable than DNA, which is one reason why DNA likely evolved to become the primary molecule for long-term genetic storage.", unlockedBySubUpgradeId: 'rw_stability' },
        { text: "Viruses like influenza and HIV use RNA as their genetic material, making them modern-day relics of the RNA world.", unlockedBySubUpgradeId: 'rw_synthesis_1' },
        { text: "The discovery of self-splicing RNA (introns that can remove themselves from an mRNA transcript without aid from proteins) was a major piece of evidence for the RNA World hypothesis, proving RNA could perform complex catalytic tasks.", unlockedBySubUpgradeId: 'rw_splicing' }
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
        { text: "A protocell is a self-organized, spherical collection of lipids proposed as a stepping-stone toward the origin of life." },
        { text: "The lipid membrane provides a crucial function by separating the internal chemistry from the external environment, allowing for a stable, controlled internal state." },
        { text: "Experiments have shown that lipid vesicles can form spontaneously, grow by incorporating more lipids, and even 'divide' under certain physical conditions." },
        { text: "By encapsulating RNA and other molecules, the protocell created the first distinct individual organisms, on which natural selection could now act more effectively." },
        { text: "Early protocells likely grew by scavenging fatty acids and other amphiphilic molecules from the environment. This growth would increase surface tension, eventually causing the vesicle to spontaneously divide into smaller daughter cells.", unlockedBySubUpgradeId: 'pc_lipid_scavenging' }
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
        { text: "Glycolysis is a nearly universal metabolic pathway, found in almost all organisms, indicating it is one of the most ancient and fundamental ways of producing ATP." },
        { text: "This process does not require oxygen, which was crucial for early life on an anaerobic Earth. It splits a glucose molecule into two pyruvate molecules.", unlockedBySubUpgradeId: 'gly_efficiency' },
        { text: "While it produces a net gain of only 2 ATP per glucose molecule, it is a very fast process, allowing for quick bursts of energy.", unlockedBySubUpgradeId: 'gly_speed' },
        { text: "The pyruvate generated by glycolysis can then be fed into more complex aerobic pathways like the Krebs cycle for much greater ATP yield, or be fermented.", unlockedBySubUpgradeId: 'gly_fermentation' },
        { text: "Hexokinase is the enzyme that performs the first step of glycolysis, phosphorylating glucose. This traps the glucose inside the cell and commits it to the metabolic pathway.", unlockedBySubUpgradeId: 'gly_hexokinase' }
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
        { text: "DNA (Deoxyribonucleic acid) is more chemically stable than RNA, making it a better molecule for storing vast amounts of genetic information for the long term." },
        { text: "DNA replication is 'semi-conservative', meaning each new DNA molecule consists of one old strand and one newly synthesized strand. This was famously demonstrated by the Meselson-Stahl experiment.", unlockedBySubUpgradeId: 'dna_semiconservative' },
        { text: "The enzyme DNA polymerase has a proofreading function that checks for and corrects errors during replication, ensuring high fidelity of genetic inheritance.", unlockedBySubUpgradeId: 'dna_proofreading' },
        { text: "The discovery of the double helix structure of DNA by Watson and Crick in 1953, based on the work of Rosalind Franklin, was a landmark moment in the history of science.", unlockedBySubUpgradeId: 'dna_doublehelix' },
        { text: "Replication doesn't start randomly. It begins at specific sites on the chromosome called 'origins of replication'. Bacteria have one, while eukaryotes have thousands to speed up the process.", unlockedBySubUpgradeId: 'dna_origin_rep' }
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
            { text: "Cells have a sophisticated suite of DNA repair mechanisms, such as base excision repair and nucleotide excision repair, to fix different types of damage caused by mutagens or replication errors." },
            { text: "The importance of DNA repair is highlighted by diseases like xeroderma pigmentosum, where individuals have a deficient repair system and are extremely sensitive to UV light, leading to a high risk of skin cancer.", unlockedBySubUpgradeId: 'dr_efficiency' }
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
            { text: "Transcription factors are essential for gene regulation and are fundamental to cellular differentiation and development, allowing different cell types to express different sets of genes." },
            { text: "They typically have a DNA-binding domain that recognizes a specific sequence and an activation/repression domain that interacts with other proteins to control transcription.", unlockedBySubUpgradeId: 'tf_control' }
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
            { text: "p53 is a transcription factor that can activate DNA repair, halt the cell cycle at the G1/S regulation point, or initiate apoptosis (programmed cell death) if DNA damage is irreparable." },
            { text: "The gene that codes for p53, TP53, is the most frequently mutated gene in human cancers. Its inactivation is a key step in tumor development.", unlockedBySubUpgradeId: 'p53_cancer' },
            { text: "Elephants have 20 copies of the p53 gene, which is thought to contribute to their remarkable resistance to cancer, a phenomenon known as Peto's Paradox.", unlockedBySubUpgradeId: 'p53_apoptosis' }
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
            { text: "Eukaryotic cells are distinguished by having a membrane-bound nucleus, which houses the cell's genetic material, and other specialized organelles that perform specific functions." },
            { text: "Compartmentalization allows different chemical reactions to occur simultaneously in different parts of the cell without interfering with each other, a huge leap in efficiency.", unlockedBySubUpgradeId: 'ec_compartmentalization' },
            { text: "The Golgi apparatus acts like a post office, modifying, sorting, and packaging proteins and lipids for secretion or delivery to other organelles.", unlockedBySubUpgradeId: 'ec_endomembrane' }
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
            { text: "The theory of endosymbiosis proposes that mitochondria and chloroplasts were once free-living prokaryotic organisms that were engulfed by an ancestral eukaryotic cell. This symbiotic relationship became permanent over time." },
            { text: "Strong evidence for this theory includes the fact that mitochondria have their own circular DNA, similar to bacteria, and they replicate independently of the host cell.", unlockedBySubUpgradeId: 'es_mitochondria' },
            { text: "This event is believed to have happened only once for mitochondria in the entire history of life, meaning all eukaryotes (including us) descend from this single ancient event.", unlockedBySubUpgradeId: 'es_energy' }
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
            { text: "Photosynthesis is the process used by plants, algae, and some bacteria to convert light energy into chemical energy, through a process that converts carbon dioxide and water into sugars and oxygen." },
            { text: "The oxygen we breathe is a waste product of photosynthesis. The 'Great Oxidation Event' 2.4 billion years ago, caused by early photosynthetic cyanobacteria, transformed Earth's atmosphere and paved the way for aerobic life.", unlockedBySubUpgradeId: 'ps_chloroplasts' },
            { text: "The green color of most plants comes from the pigment chlorophyll, which is excellent at absorbing red and blue light, but reflects green light.", unlockedBySubUpgradeId: 'ps_calvin'}
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
            { text: "Multicellularity has evolved independently multiple times in Earth's history. It allows organisms to grow larger and for cells to differentiate and perform specialized functions." },
            { text: "Cell adhesion molecules are crucial for multicellularity, acting as the 'glue' that holds cells together to form tissues.", unlockedBySubUpgradeId: 'mc_specialization' },
            { text: "The transition to multicellularity also required the evolution of programmed cell death (apoptosis) to eliminate damaged or unneeded cells for the good of the whole organism.", unlockedBySubUpgradeId: 'mc_communication'}
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
            { text: "Circulatory systems can be open, where blood flows freely in a body cavity (hemocoel), or closed, where blood is confined to vessels. Closed systems allow for higher pressure and more efficient transport, enabling larger and more active animals." },
            { text: "The four-chambered heart of mammals and birds, which completely separates oxygenated and deoxygenated blood, is an example of convergent evolution.", unlockedBySubUpgradeId: 'cs_efficiency'}
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
        { text: "A collective consciousness allows for near-instantaneous communication and task delegation across trillions of individual cells, dramatically increasing manipulative capacity." },
        { text: "This level of integration transcends a simple nervous system, bordering on a single, unified organism with countless bodies.", unlockedBySubUpgradeId: 'hands_inf_cap' },
        { text: "The processing power of a hive mind allows for complex problem-solving and environmental manipulation on a scale impossible for individual units.", unlockedBySubUpgradeId: 'hands_inf_efficiency' },
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
            { text: "The Cambrian explosion, about 541 million years ago, was a period of rapid diversification of life where most major animal phyla appeared in the fossil record. The cause is a subject of intense scientific debate." },
            { text: "Possible triggers include rising oxygen levels, the evolution of predation, and the development of key genetic toolkits like HOX genes.", unlockedBySubUpgradeId: 'ce_diversity' },
            { text: "Fossils from the Burgess Shale in Canada provide an incredible snapshot of this period, showing bizarre creatures like the five-eyed Opabinia and the formidable predator Anomalocaris.", unlockedBySubUpgradeId: 'ce_predation'}
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
            { text: "Exoskeletons provide excellent protection against predators and the environment, but must be periodically shed (molted) to allow for growth, leaving the animal vulnerable." },
            { text: "The success of arthropods (insects, crustaceans, arachnids), the most diverse animal phylum, is largely attributed to their versatile exoskeleton.", unlockedBySubUpgradeId: 'exo_protection'}
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
            { text: "Unlike an exoskeleton, an internal skeleton can grow along with the organism and provides a framework for muscles to attach to, enabling more efficient movement." },
            { text: "Bone is a living tissue that is constantly being remodeled by cells called osteoblasts (which build bone) and osteoclasts (which break it down).", unlockedBySubUpgradeId: 'endo_support'}
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
            { text: "The simplest nervous systems, or nerve nets, belong to creatures like jellyfish and sea anemones. More complex nervous systems with brains allow for advanced behaviors, learning, and consciousness." },
            { text: "Neurons transmit signals as electrical impulses called action potentials. They communicate with each other at junctions called synapses, using chemical neurotransmitters.", unlockedBySubUpgradeId: 'ns_centralization' },
            { text: "Glial cells, once thought to be just 'glue' for neurons, are now known to play active roles in signal transmission, nutrient supply, and immune defense in the nervous system.", unlockedBySubUpgradeId: 'ns_myelination'}
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
    effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.ATP, value: 100 }, { type: 'UNLOCK_FEATURE', value: 'manufacturing' }],
    icon: 'extinction_event',
    dependencies: ['endoskeleton'],
    panelContent: {
        facts: [
            { text: "There have been five major mass extinctions in Earth's history. While devastating, they also open up ecological niches, allowing for the evolution and diversification of new life forms." },
            { text: "The Permian-Triassic extinction, or 'The Great Dying', was the most severe, wiping out about 96% of all marine species and 70% of terrestrial vertebrate species.", unlockedBySubUpgradeId: 'ee_resilience' },
            { text: "The Cretaceous-Paleogene extinction, which wiped out the dinosaurs 66 million years ago, was most likely caused by a massive asteroid impact in the Yucatán Peninsula.", unlockedBySubUpgradeId: 'ee_adaptation' }
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
            { text: "Prokaryotes, such as bacteria and archaea, are the most widespread and abundant organisms on Earth, thriving in an incredible diversity of environments." },
            { text: "Unlike eukaryotes, prokaryotes lack a nucleus and other membrane-bound organelles. Their DNA floats freely in the cytoplasm in a region called the nucleoid.", unlockedBySubUpgradeId: 'pc_metabolism' },
            { text: "Biofilms are complex communities of one or more microorganism species, which secrete a protective matrix and adhere to surfaces. This is the preferred lifestyle for most prokaryotes.", unlockedBySubUpgradeId: 'pc_archaea'}
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
            { text: "Horizontal gene transfer is a primary reason for the rapid spread of antibiotic resistance among bacteria." },
            { text: "There are three main mechanisms: transformation (uptake of free DNA), transduction (transfer by viruses), and conjugation (transfer via direct contact using a pilus).", unlockedBySubUpgradeId: 'hgt_efficiency' },
            { text: "It is a major driver of evolution, allowing organisms to acquire new traits quickly instead of relying solely on gradual mutations passed down vertically.", unlockedBySubUpgradeId: 'hgt_adaptation'}
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
            { text: "Transposons, or 'jumping genes,' make up a large fraction of the genome of many eukaryotes and can be a major driver of genetic variation and evolution." },
            { text: "They were discovered by Barbara McClintock in maize (corn), for which she won the Nobel Prize. She noticed that some genes could 'jump' around the chromosome, changing the color of corn kernels.", unlockedBySubUpgradeId: 'transposon_activity' },
            { text: "While often viewed as 'selfish' DNA, transposons can create new genes or alter gene regulation, providing raw material for evolution.", unlockedBySubUpgradeId: 'transposon_copy'}
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
            { text: "Epigenetic modifications, such as DNA methylation and histone modification, can be influenced by the environment and are heritable in some cases." },
            { text: "DNA methylation typically acts as a 'switch' to turn genes off, while histone modifications can either activate or repress gene expression.", unlockedBySubUpgradeId: 'epi_control' },
            { text: "Epigenetics explains how identical twins can have different traits and risk for diseases, despite having the exact same DNA sequence.", unlockedBySubUpgradeId: 'epi_twins' }
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
            { text: "RNA interference (RNAi) is a powerful tool used by scientists to 'knock down' the expression of specific genes to study their function." },
            { text: "The mechanism involves small interfering RNAs (siRNAs) or microRNAs (miRNAs) that bind to messenger RNA (mRNA) and lead to its degradation, preventing it from being translated into a protein.", unlockedBySubUpgradeId: 'rnai_defense' },
            { text: "The discovery of RNAi in C. elegans by Andrew Fire and Craig Mello earned them the Nobel Prize in 2006.", unlockedBySubUpgradeId: 'rnai_efficiency' }
        ],
        subUpgrades: [
            { id: 'rnai_defense', name: 'Viral Defense', description: 'An improved genetic defense system improves protocell resilience.', cost: () => ({ resource: Resource.Nucleotides, amount: 5000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 10 }] },
            { id: 'rnai_efficiency', name: 'Targeting Efficiency', description: 'Improve the efficiency of gene silencing, improving protocell efficiency.', cost: () => ({ resource: Resource.Nucleotides, amount: 6000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'efficiency', value: 5 }] },
            { id: 'rnai_regulation', name: 'Fine-tune Regulation', description: 'Use RNAi for fine-tuned gene regulation, increasing Max Hands.', cost: () => ({ resource: Resource.Nucleotides, amount: 7000 }), effects: [{ type: 'INCREASE_MAX_HANDS', value: 5 }] },
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
            { text: "CRISPR (Clustered Regularly Interspaced Short Palindromic Repeats) is a natural defense mechanism in bacteria and archaea. It stores snippets of viral DNA to 'remember' past infections." },
            { text: "The Cas9 protein is an enzyme that acts like 'molecular scissors', guided by an RNA molecule to a specific target DNA sequence, which it then cuts.", unlockedBySubUpgradeId: 'crispr_cas9' },
            { text: "The simplicity and efficiency of the CRISPR-Cas9 system have revolutionized genetic engineering, earning its developers the 2020 Nobel Prize in Chemistry.", unlockedBySubUpgradeId: 'crispr_engineering'}
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
            { text: "The Krebs Cycle (or Citric Acid Cycle) is a central metabolic hub in the cell, and the complete oxidation of one glucose molecule yields about 30-32 ATP molecules." },
            { text: "It takes place in the matrix of the mitochondria in eukaryotes, and in the cytoplasm of prokaryotes.", unlockedBySubUpgradeId: 'kc_optimization' },
            { text: "The cycle doesn't just produce energy; its intermediates are used as precursors for synthesizing amino acids, nucleotides, and other vital molecules.", unlockedBySubUpgradeId: 'kc_precursors'}
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
            { text: "Homeostasis is a self-regulating process by which biological systems maintain stability while adjusting to conditions that are optimal for survival." },
            { text: "Negative feedback loops are the primary mechanism for maintaining homeostasis. For example, if your body temperature rises, you sweat to cool down, bringing the temperature back to the set point.", unlockedBySubUpgradeId: 'homeo_stability' },
            { text: "The endocrine system, which uses hormones, and the nervous system are the two main control systems for maintaining homeostasis in complex animals.", unlockedBySubUpgradeId: 'homeo_regulation' }
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
            { text: "The adaptive immune system is characterized by its specificity and memory. After an initial encounter with a pathogen, it 'remembers' it, allowing for a much faster and stronger response upon subsequent encounters. This is the principle behind vaccination." },
            { text: "V(D)J recombination is the unique genetic process that shuffles gene segments to create a vast diversity of antibodies and T-cell receptors, allowing the immune system to recognize almost any pathogen.", unlockedBySubUpgradeId: 'ai_memory'}
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
            { text: "The evolution of sexual reproduction is a major puzzle because it has significant costs (like finding a mate), but its benefit of creating genetic diversity is thought to outweigh them." },
            { text: "Meiosis is the special type of cell division that produces gametes (sperm and egg cells). It shuffles genes through processes like crossing over and independent assortment.", unlockedBySubUpgradeId: 'sr_recombination' },
            { text: "The Red Queen hypothesis suggests that sexual reproduction is beneficial because it allows host species to constantly evolve new defenses against co-evolving parasites.", unlockedBySubUpgradeId: 'sr_red_queen'}
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
            { text: "HOX genes are highly conserved across the animal kingdom, meaning a fly's body-plan gene can function in a mouse, highlighting a shared ancestry." },
            { text: "These genes are arranged on the chromosome in the same order as the body parts they control, a phenomenon known as colinearity.", unlockedBySubUpgradeId: 'hox_control' },
            { text: "Mutations in HOX genes can cause dramatic effects, such as growing legs where antennae should be on a fruit fly (a homeotic transformation).", unlockedBySubUpgradeId: 'hox_mutation'}
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
            { text: "The eye has evolved independently in many different lineages, a classic example of convergent evolution, starting from a simple patch of photoreceptor proteins." },
            { text: "Even a simple light-sensitive spot provides a significant evolutionary advantage, allowing an organism to distinguish light from dark and move accordingly.", unlockedBySubUpgradeId: 'eov_acuity' },
            { text: "The evolution from a simple light-sensitive spot to a complex camera-type eye can be modeled in a surprisingly small number of generations, with each step providing a selective advantage.", unlockedBySubUpgradeId: 'eov_camera' }
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
            { text: "Cephalization is strongly correlated with bilateral symmetry and an organism's ability to move forward and actively hunt or explore." },
            { text: "Having a 'head' means sensory organs like eyes, ears, and nose encounter the environment first, allowing for faster responses.", unlockedBySubUpgradeId: 'ceph_brain' },
            { text: "The development of a head is also linked to the development of a mouth and specialized feeding structures.", unlockedBySubUpgradeId: 'ceph_learning'}
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
            { text: "Telomeres are repetitive nucleotide sequences at the end of chromosomes that protect them from deterioration. With each cell division, they shorten, contributing to cellular aging." },
            { text: "The 'end replication problem' refers to the inability of DNA polymerase to fully replicate the very end of a linear chromosome, leading to this progressive shortening.", unlockedBySubUpgradeId: 'tm_end_problem' },
            { text: "The length of an organism's telomeres is correlated with its lifespan, though the relationship is complex and not the sole determinant of aging.", unlockedBySubUpgradeId: 'tm_telomerase'}
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
            { text: "Telomerase is a reverse transcriptase that carries its own RNA template to synthesize telomeric DNA." },
            { text: "High telomerase activity is a hallmark of over 90% of cancer cells, allowing them to bypass normal cellular aging and achieve replicative immortality.", unlockedBySubUpgradeId: 'te_cancer' },
            { text: "Most somatic (body) cells in adults have very low or undetectable levels of telomerase, which is a primary reason for cellular aging.", unlockedBySubUpgradeId: 'te_immortality' }
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
            { text: "Reactive oxygen species (ROS) are inevitable byproducts of aerobic respiration. Antioxidants are molecules that can safely interact with these free radicals, preventing them from causing damage to DNA, proteins, and lipids." },
            { text: "Superoxide dismutase (SOD) is a crucial antioxidant enzyme that converts the dangerous superoxide radical into oxygen and hydrogen peroxide.", unlockedBySubUpgradeId: 'ad_sod' },
            { text: "Catalase then takes the hydrogen peroxide produced by SOD and converts it into harmless water and oxygen, completing the detoxification process.", unlockedBySubUpgradeId: 'ad_catalase' }
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
            { text: "Fatty acids are a more energy-dense storage molecule than carbohydrates. The ability to metabolize lipids provided a significant advantage, allowing for longer survival between feeding." },
            { text: "Beta-oxidation is the spiral pathway that breaks down fatty acids in the mitochondria to produce acetyl-CoA, which can then enter the Krebs cycle.", unlockedBySubUpgradeId: 'lm_beta_oxidation' },
            { text: "In times of starvation, the liver can convert fatty acids into ketone bodies, which can be used as an alternative fuel source by the brain and other tissues.", unlockedBySubUpgradeId: 'lm_storage' }
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
            { text: "Glycogen is a large, branched polymer of glucose that can be quickly broken down to release glucose molecules when energy is needed, making it ideal for rapid metabolic response." },
            { text: "In humans, glycogen is mainly stored in the liver, where it maintains blood glucose levels, and in muscles, where it provides a local fuel source for contraction.", unlockedBySubUpgradeId: 'gs_muscles' },
            { text: "The highly branched structure of glycogen allows for many enzymes to work on it simultaneously, enabling much faster glucose release than from a linear polymer like starch.", unlockedBySubUpgradeId: 'gs_branching' }
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
            { text: "The lungs of terrestrial vertebrates and the gas bladders of fish are homologous structures, meaning they share a common evolutionary origin from an out-pocketing of the primitive gut." },
            { text: "In early bony fish, this structure likely served as a primitive lung, allowing them to gulp air in oxygen-poor water.", unlockedBySubUpgradeId: 'el_gulping' },
            { text: "The evolution of surfactants, substances that reduce surface tension, was a critical step in preventing the delicate air sacs (alveoli) from collapsing.", unlockedBySubUpgradeId: 'el_buoyancy' }
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
            { text: "Cellular homeostasis involves a multitude of processes, such as ion pumps and pH buffering, that keep the cell's internal state within a narrow, optimal range for life, even when the external environment changes dramatically." },
            { text: "The sodium-potassium pump is a vital enzyme found in the membrane of all animal cells. It actively transports sodium and potassium ions against their concentration gradients to maintain cellular excitability and volume.", unlockedBySubUpgradeId: 'ch_ion_pumps' }
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
            { text: "The circadian rhythm is an internal, 24-hour clock that regulates cycles of sleepiness and alertness. It is controlled by a 'master clock' in the brain's suprachiasmatic nucleus (SCN)." },
            { text: "At its core, the circadian clock is a transcription-translation feedback loop, where specific 'clock genes' and their protein products inhibit their own production over a 24-hour cycle.", unlockedBySubUpgradeId: 'cr_clock_genes'}
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
        { text: "Myelin allows for saltatory conduction, where nerve impulses 'jump' between gaps in the sheath (Nodes of Ranvier), greatly increasing speed." },
        { text: "Diseases like Multiple Sclerosis involve the destruction of the myelin sheath, leading to severe neurological problems.", unlockedBySubUpgradeId: 'myelin_insulation' }
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
        { text: "Neural crest cells are unique to vertebrates and give rise to a diverse array of cell types, including neurons, glial cells, pigment cells, and the bones of the face and skull." },
        { text: "Their migratory ability and multipotency are key to the complex head structures and sensory organs of vertebrates.", unlockedBySubUpgradeId: 'ncc_complexity' }
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
        { text: "The clotting cascade is an example of a biological amplification system, where the activation of one enzyme molecule triggers the activation of many more, leading to a rapid response." },
        { text: "Hemophilia is a genetic disorder that impairs the body's ability to make blood clots, a process needed to stop bleeding.", unlockedBySubUpgradeId: 'bc_rapid_response' }
      ],
      subUpgrades: [
        { id: 'bc_rapid_response', name: 'Rapid Response', description: 'Faster clotting greatly improves protocell resilience.', cost: () => ({ resource: Resource.AminoAcids, amount: 30000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 10 }] },
        { id: 'bc_platelets', name: 'Platelet Activation', description: 'Efficient platelet activation improves the reliability of the clot.', cost: () => ({ resource: Resource.AminoAcids, amount: 35000 }), effects: [{ type: 'IMPROVE_PROTOCELL_ATTRIBUTE', attribute: 'resilience', value: 5 }] }
      ]
    }
  }
];