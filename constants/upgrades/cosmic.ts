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
            { type: 'INCREASE_CAPACITY', resource: Resource.Stardust, value: 0 },
            { type: 'ADD_BASE_GENERATION', resource: Resource.Stardust, value: 0 }
          ],
          repeatable: {}
        }
      ]
    }
  }
];
