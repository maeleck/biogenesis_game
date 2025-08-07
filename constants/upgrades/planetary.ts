
import { Upgrade, Resource } from '../../types';

export const planetaryUpgrades: Upgrade[] = [
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
        { 
          text: "A protoplanetary disk is a rotating circumstellar disk of dense gas and dust surrounding a young, newly formed star. It's the raw material from which planets, moons, and asteroids are born.",
          quiz: {
            question: "What is a protoplanetary disk primarily composed of?",
            options: ["A swirling disk of gas and dust", "A type of ancient star", "A small galaxy cluster", "The outer shell of a large planet"],
            answerIndex: 0
          }
        },
        {
          text: "The 'frost line' or 'snow line' is the distance from the central protostar where it is cold enough for volatile compounds such as water, ammonia, and methane to condense into solid ice grains.",
          unlockedBySubUpgradeId: 'pd_frost_line_1',
          quiz: {
            question: "What is the 'frost line' in a protoplanetary disk?",
            options: ["The edge of the disk", "A region where only rock can exist", "The point where volatiles like water can freeze", "The hottest part of the disk"],
            answerIndex: 2
          }
        },
        { 
          text: "Gaps and rings seen in protoplanetary disks by telescopes like ALMA are considered strong evidence of newly formed planets clearing out their orbital paths.", 
          unlockedBySubUpgradeId: 'pd_eddy_currents',
          quiz: {
            question: "What are the gaps observed in protoplanetary disks considered strong evidence of?",
            options: ["Stellar flares", "Newly formed planets", "Magnetic field lines", "A dying star"],
            answerIndex: 1
          }
        },
        { 
          text: "The 'dead zone' is a region in a protoplanetary disk where gas is not turbulent enough to drive accretion, posing a puzzle for planet formation theories which require material to move inwards.", 
          unlockedBySubUpgradeId: 'pd_storage_1',
          quiz: {
            question: "What is the 'dead zone' in the context of a protoplanetary disk?",
            options: ["A region with no gravity", "A region where gas is not turbulent enough for accretion", "The hottest part of the disk", "An area with no dust"],
            answerIndex: 1
          }
        }
      ],
      subUpgrades: [
        { id: 'pd_accretion_1', name: 'Disk Accretion', description: 'Improve passive generation of Rock from the disk.', cost: () => ({ resource: Resource.Rock, amount: 25 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Rock, value: 2 }] },
        { id: 'pd_frost_line_1', name: 'Frost Line Analysis', description: 'Begin concentrating icy materials to passively generate Water.', cost: () => ({ resource: Resource.Rock, amount: 100 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Water, value: 1 }] },
        { id: 'pd_storage_1', name: 'Planetesimal Bins', description: 'Increase the storage capacity for planetary materials.', cost: () => ({ resource: Resource.Iron, amount: 500 }), effects: [{ type: 'INCREASE_UNIVERSAL_STORAGE', value: 2 }] },
        { id: 'pd_eddy_currents', name: 'Induce Eddy Currents', description: 'Create whirlpools in the disk to concentrate heavy materials, passively generating Iron.', cost: () => ({ resource: Resource.Rock, amount: 200 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Iron, value: 0.2 }] }
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
            { 
              text: "The Kuiper Belt is a circumstellar disc in the outer Solar System, extending from the orbit of Neptune. It is similar to the asteroid belt, but is far larger and consists mainly of small bodies or remnants from the Solar System's formation composed of ices.",
              quiz: {
                question: "What is the Kuiper Belt primarily composed of?",
                options: ["Hot gas", "Liquid water oceans", "Rocky asteroids", "Icy bodies"],
                answerIndex: 3
              }
            },
            { 
              text: "Pluto is the most famous resident of the Kuiper Belt and is now classified as a dwarf planet because it has not 'cleared its orbital neighborhood'.", 
              unlockedBySubUpgradeId: 'kb_harvesting',
              quiz: {
                question: "Why is Pluto classified as a dwarf planet?",
                options: ["It is too small to be a planet", "It has no atmosphere", "It has not cleared its orbital neighborhood of other objects", "It is made of ice, not rock"],
                answerIndex: 2
              }
            },
            { 
              text: "Many short-period comets, those with orbits less than 200 years, are thought to originate in the Kuiper Belt.", 
              unlockedBySubUpgradeId: 'kb_comets',
              quiz: {
                question: "Where do many short-period comets originate?",
                options: ["The Sun's corona", "The Asteroid Belt", "The Oort Cloud", "The Kuiper Belt"],
                answerIndex: 3
              }
            },
            { 
              text: "The 'scattered disk' is a dynamically active region overlapping the Kuiper Belt, whose objects have been 'scattered' into eccentric and inclined orbits by Neptune.", 
              unlockedBySubUpgradeId: 'kb_scattered',
              quiz: {
                question: "Which planet is primarily responsible for the 'scattered disk' region near the Kuiper Belt?",
                options: ["Earth", "Jupiter", "Neptune", "Saturn"],
                answerIndex: 2
              }
            }
        ],
        subUpgrades: [
            { id: 'kb_harvesting', name: 'Icy Body Harvesting', description: 'Improve passive generation of Water from the belt.', cost: () => ({ resource: Resource.Water, amount: 1500 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Water, value: 2 }] },
            { id: 'kb_comets', name: 'Comet Herding', description: "Learn to herd comets, boosting passive Water generation.", cost: () => ({ resource: Resource.Water, amount: 2000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Water, value: 3 }] },
            { id: 'kb_scattered', name: 'Scattered Disk Mining', description: 'Mine the chaotic scattered disk for extra Rock.', cost: () => ({ resource: Resource.Rock, amount: 2000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Rock, value: 3 }] },
            { id: 'kb_gravity_assist', name: 'Gravity Assist', description: "Use the gravity of Kuiper Belt objects to increase your max Force.", cost: () => ({ resource: Resource.Rock, amount: 2500 }), effects: [{ type: 'INCREASE_MAX_FORCE', value: 5 }] }
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
        { 
          text: "Accretion is the process by which matter gravitationally attracts more matter, growing larger over time. This is how planets form from tiny dust particles.",
          quiz: {
            question: "How do planets primarily form from dust particles?",
            options: ["Through chemical explosions", "By capturing light from their star", "Through gravitational accretion", "By spontaneously cooling down"],
            answerIndex: 2
          }
        },
        { 
          text: "Runaway accretion occurs when a planetesimal grows large enough that its gravity rapidly pulls in all the material in its orbital path, quickly becoming a planetary embryo.", 
          unlockedBySubUpgradeId: 'pa_runaway_1',
          quiz: {
            question: "What is 'runaway accretion'?",
            options: ["A planet spinning out of control", "A planetesimal rapidly pulling in all material in its path", "A star exploding and creating planets", "Two planets colliding at high speed"],
            answerIndex: 1
          }
        },
        { 
          text: "Oligarchic growth is the next phase, where a few large planetary embryos ('oligarchs') dominate their orbital zones and slowly sweep up the remaining smaller planetesimals.", 
          unlockedBySubUpgradeId: 'pa_oligarchs',
          quiz: {
            question: "What happens during the 'oligarchic growth' phase of planet formation?",
            options: ["Thousands of small planets form", "A few large embryos sweep up smaller planetesimals", "The star consumes all nearby planets", "The protoplanetary disk completely freezes"],
            answerIndex: 1
          }
        },
        { 
          text: "The final stage of terrestrial planet formation involves giant impacts between these embryos over tens of millions of years, a violent and chaotic process.", 
          unlockedBySubUpgradeId: 'pa_force_3',
          quiz: {
            question: "What is considered the final, violent stage of terrestrial planet formation?",
            options: ["A quiet cooling period", "The capture of a dense atmosphere", "Giant impacts between planetary embryos", "The formation of the first oceans"],
            answerIndex: 2
          }
        }
      ],
      subUpgrades: [
        { id: 'pa_runaway_1', name: 'Runaway Accretion', description: 'Boost the passive generation of Rock.', cost: () => ({ resource: Resource.Rock, amount: 250 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Rock, value: 5 }] },
        { id: 'pa_force_3', name: 'Gravitational Tractor', description: 'Use planetary gravity fields to increase maximum Force.', cost: () => ({ resource: Resource.Rock, amount: 500 }), effects: [{ type: 'INCREASE_MAX_FORCE', value: 15 }] },
        { id: 'pa_oligarchs', name: 'Oligarchic Growth', description: 'Dominate orbital zones to improve Rock generation efficiency.', cost: () => ({ resource: Resource.Rock, amount: 750 }), effects: [{ type: 'INCREASE_GENERATION_MULTIPLIER', resource: Resource.Rock, value: 0.1 }] },
        { id: 'pa_giant_impacts', name: 'Giant Impact Planning', description: 'Plan giant impacts to increase Iron generation.', cost: () => ({ resource: Resource.Rock, amount: 1000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Iron, value: 1 }] }
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
            { 
              text: "Planetary differentiation is the process of separating out different constituents of a planetary body as a consequence of their physical or chemical behavior, where the body develops into compositionally distinct layers; the denser materials sink to the center while less dense materials rise to the surface.",
              quiz: {
                question: "What is planetary differentiation?",
                options: ["Planets moving to different orbits", "The separation of a planet into layers by density", "The formation of different types of planets", "A planet developing an atmosphere"],
                answerIndex: 1
              }
            },
            { 
              text: "The heat source for differentiation comes from the decay of radioactive elements and the kinetic energy of impacting planetesimals being converted to thermal energy.", 
              unlockedBySubUpgradeId: 'pd_core_formation',
              quiz: {
                question: "What is a major heat source for planetary differentiation?",
                options: ["Sunlight", "Cosmic rays", "Radioactive decay and impacts", "The planet's magnetic field"],
                answerIndex: 2
              }
            },
            { 
              text: "This process creates the core, mantle, and crust structure of terrestrial planets. The composition of these layers determines a planet's geological activity and potential habitability.", 
              unlockedBySubUpgradeId: 'pd_mantle',
              quiz: {
                question: "What three main layers does differentiation create in a terrestrial planet?",
                options: ["Atmosphere, Ocean, Land", "Core, Mantle, Crust", "North Pole, South Pole, Equator", "Inner Core, Outer Core, Lithosphere"],
                answerIndex: 1
              }
            },
            { 
              text: "On Earth, the liquid outer core of iron and nickel flowing around a solid inner core is what generates our planet's protective magnetic field.", 
              unlockedBySubUpgradeId: 'pd_crust',
              quiz: {
                question: "What generates Earth's protective magnetic field?",
                options: ["The solid iron inner core", "The Moon's gravity", "The flow of the liquid outer core", "The solar wind interacting with the atmosphere"],
                answerIndex: 2
              }
            }
        ],
        subUpgrades: [
            { id: 'pd_core_formation', name: 'Core Formation', description: 'A stable iron core improves passive Iron generation.', cost: () => ({ resource: Resource.Iron, amount: 2000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Iron, value: 2 }] },
            { id: 'pd_mantle', name: 'Mantle Convection', description: 'A convecting mantle drives geology, improving passive Rock generation.', cost: () => ({ resource: Resource.Iron, amount: 2500 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Rock, value: 3 }] },
            { id: 'pd_crust', name: 'Crust Solidification', description: 'A solid crust increases your capacity for storing Rock and Iron.', cost: () => ({ resource: Resource.Iron, amount: 3000 }), effects: [{ type: 'INCREASE_CAPACITY', resource: Resource.Rock, value: 1000 }, { type: 'INCREASE_CAPACITY', resource: Resource.Iron, value: 500 }] },
            { id: 'pd_force', name: 'Density Control', description: 'Mastering density separation grants you more max Force.', cost: () => ({ resource: Resource.Iron, amount: 3500 }), effects: [{ type: 'INCREASE_MAX_FORCE', value: 10 }] }
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
            { 
              text: "The giant-impact hypothesis suggests that the Moon formed from the ejecta of a collision between the early Earth and a Mars-sized planet, nicknamed Theia.",
              quiz: {
                question: "What is the leading theory for how Earth's Moon was formed?",
                options: ["It was captured by Earth's gravity", "It formed alongside Earth from the same materials", "The giant-impact hypothesis", "It was ejected from a large volcano on Earth"],
                answerIndex: 2
              }
            },
            { 
              text: "The Moon's gravity stabilizes Earth's axial tilt, which prevents extreme climate fluctuations and is considered crucial for the long-term stability needed for complex life to evolve.", 
              unlockedBySubUpgradeId: 'mf_tidal_forces',
              quiz: {
                question: "What is a crucial effect of the Moon's gravity on Earth for long-term habitability?",
                options: ["It creates the ocean tides", "It provides light at night", "It stabilizes Earth's axial tilt", "It protects Earth from most asteroid impacts"],
                answerIndex: 2
              }
            },
            { 
              text: "Analysis of lunar rock samples brought back by the Apollo missions shows they are very similar in composition to Earth's mantle, which supports the giant-impact hypothesis.", 
              unlockedBySubUpgradeId: 'mf_composition',
              quiz: {
                question: "What key finding from Apollo moon rocks supports the giant-impact hypothesis?",
                options: ["They are much older than Earth rocks", "They have a composition similar to Earth's mantle", "They contain life-sustaining water", "They are completely different from any rock on Earth"],
                answerIndex: 1
              }
            },
            { 
              text: "The Moon is slowly moving away from the Earth at a rate of about 3.8 centimeters per year, a process that also causes the Earth's rotation to slow down (making days longer).", 
              unlockedBySubUpgradeId: 'mf_recession',
              quiz: {
                question: "What is the Moon currently doing in relation to its orbit around Earth?",
                options: ["Getting closer to Earth", "Staying at a perfectly fixed distance", "Slowly moving away from Earth", "Orbiting faster each year"],
                answerIndex: 2
              }
            }
        ],
        subUpgrades: [
            { id: 'mf_tidal_forces', name: 'Tidal Forces', description: 'The moon\'s gravity stirs the planet, passively generating a small amount of all planetary resources.', cost: () => ({ resource: Resource.Rock, amount: 3000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Water, value: 1 }] },
            { id: 'mf_composition', name: 'Analyze Lunar Rocks', description: 'Understanding the moon\'s composition improves Rock generation.', cost: () => ({ resource: Resource.Rock, amount: 4000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Rock, value: 3 }] },
            { id: 'mf_recession', name: 'Tidal Recession', description: "Harness the energy of the Moon's recession to generate more Water.", cost: () => ({ resource: Resource.Rock, amount: 5000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Water, value: 2 }] },
            { id: 'mf_force', name: 'Gravitational Anchor', description: 'The Moon acts as a gravitational anchor, increasing your max Force.', cost: () => ({ resource: Resource.Rock, amount: 6000 }), effects: [{ type: 'INCREASE_MAX_FORCE', value: 5 }] }
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
        { 
          text: "Much of Earth's water is thought to have been delivered by icy comets and asteroids that collided with our planet during its early history.",
          quiz: {
            question: "How is much of Earth's water thought to have arrived on the planet?",
            options: ["From volcanic outgassing alone", "By chemical reactions in the atmosphere", "Delivered by comets and asteroids", "It was always present in the planet's core"],
            answerIndex: 2
          }
        },
        {
          text: "In addition to water, comets also carry complex organic molecules, such as amino acids. These impact events may have seeded the early Earth with the chemical building blocks of life.",
          unlockedBySubUpgradeId: 'cd_organics_1',
          quiz: {
            question: "Besides water, what important molecules did comets likely deliver to early Earth?",
            options: ["Heavy metals like iron", "Radioactive isotopes", "Complex organic molecules", "Fully formed atmospheric gases"],
            answerIndex: 2
          }
        },
        { 
          text: "The Rosetta mission, which rendezvoused with comet 67P, discovered that the isotopic ratio of water on the comet was different from Earth's, suggesting asteroids may have been the primary water source.", 
          unlockedBySubUpgradeId: 'cd_isotopic_ratio',
          quiz: {
            question: "What did the Rosetta mission's findings about comet 67P's water suggest?",
            options: ["All of Earth's water came from comets", "Asteroids, rather than comets, may have been the primary water source", "Earth's water is entirely unique", "Comets do not contain any water"],
            answerIndex: 1
          }
        },
        { 
          text: "A comet's tail is composed of dust and gas pushed away from its nucleus by the Sun's radiation and solar wind. It always points away from the Sun, regardless of the comet's direction of travel.", 
          unlockedBySubUpgradeId: 'cd_tail_dynamics',
          quiz: {
            question: "Which direction does a comet's tail always point?",
            options: ["Towards the Sun", "Behind the comet's direction of travel", "Away from the Sun", "Towards the nearest large planet"],
            answerIndex: 2
          }
        }
      ],
      subUpgrades: [
        { id: 'cd_water_1', name: 'Ice Harvesting', description: 'Improve passive generation of Water.', cost: () => ({ resource: Resource.Water, amount: 250 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Water, value: 3 }] },
        { id: 'cd_organics_1', name: 'Organic Seeding', description: 'Cometary impacts now also passively generate small amounts of Carbon.', cost: () => ({ resource: Resource.Water, amount: 500 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Carbon, value: 1 }] },
        { id: 'cd_isotopic_ratio', name: 'Isotopic Analysis', description: 'Analyzing water isotopes improves the efficiency of Water collection.', cost: () => ({ resource: Resource.Water, amount: 750 }), effects: [{ type: 'INCREASE_GENERATION_MULTIPLIER', resource: Resource.Water, value: 0.1 }] },
        { id: 'cd_tail_dynamics', name: 'Comet Trajectory Control', description: "Mastering comet trajectories grants more max Force.", cost: () => ({ resource: Resource.Water, amount: 1000 }), effects: [{ type: 'INCREASE_MAX_FORCE', value: 10 }] }
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
            { 
              text: "The first oceans on Earth were likely hot and acidic. They played a crucial role in dissolving minerals from the crust, creating a nutrient-rich environment for potential life.",
              quiz: {
                question: "What were the likely conditions of Earth's first oceans?",
                options: ["Cold and extremely salty", "Hot and acidic", "Frozen solid from pole to pole", "Pure, fresh water"],
                answerIndex: 1
              }
            },
            { 
              text: "Evidence for the first oceans comes from ancient metamorphosed sedimentary rocks and 'pillow lavas'—unique formations that only occur when lava erupts underwater.", 
              unlockedBySubUpgradeId: 'fo_hydrological_cycle',
              quiz: {
                question: "What geological feature provides strong evidence of ancient underwater volcanic eruptions?",
                options: ["Cinder cones", "Geysers", "Pillow lavas", "Granite batholiths"],
                answerIndex: 2
              }
            },
            { 
              text: "The early oceans would have appeared green due to high concentrations of dissolved iron, rather than the blue we see today.", 
              unlockedBySubUpgradeId: 'fo_iron',
              quiz: {
                question: "What likely gave the early oceans a green color?",
                options: ["Widespread algae", "Dissolved copper", "High concentrations of dissolved iron", "Light reflecting off the atmosphere"],
                answerIndex: 2
              }
            },
            { 
              text: "The vast thermal mass of the oceans helps regulate a planet's climate by absorbing and redistributing heat around the globe.", 
              unlockedBySubUpgradeId: 'fo_capacity',
              quiz: {
                question: "What is a primary way oceans regulate a planet's climate?",
                options: ["By reflecting all sunlight", "By absorbing and redistributing heat", "By creating powerful winds", "By producing large amounts of oxygen"],
                answerIndex: 1
              }
            }
        ],
        subUpgrades: [
            { id: 'fo_hydrological_cycle', name: 'Hydrological Cycle', description: 'A stable water cycle improves passive Water generation.', cost: () => ({ resource: Resource.Water, amount: 7500 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Water, value: 5 }] },
            { id: 'fo_iron', name: 'Dissolved Iron', description: 'The iron-rich oceans provide a small passive generation of Iron.', cost: () => ({ resource: Resource.Water, amount: 10000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Iron, value: 1 }] },
            { id: 'fo_capacity', name: 'Oceanic Basin', description: 'Deepen the oceanic basins to vastly increase Water capacity.', cost: () => ({ resource: Resource.Water, amount: 12000 }), effects: [{ type: 'INCREASE_CAPACITY', resource: Resource.Water, value: 20000 }] },
            { id: 'fo_salinity', name: 'Salinity Control', description: 'Controlling the salinity of the oceans boosts Primordial Soup generation.', cost: () => ({ resource: Resource.Water, amount: 15000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.PrimordialSoup, value: 0.5 }] }
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
        { 
          text: "Volcanic outgassing was a major source of early Earth's atmosphere, releasing water vapor, carbon dioxide, nitrogen, and other gases from the planet's interior.",
          quiz: {
            question: "What was volcanic outgassing a major source of on early Earth?",
            options: ["The magnetic field", "The oceans", "The early atmosphere", "The continental crust"],
            answerIndex: 2
          }
        },
        { 
          text: "The heat and chemicals from volcanoes can create unique environments, such as hot springs and hydrothermal vents, which may have been crucial for the origin of life.", 
          unlockedBySubUpgradeId: 'va_hot_springs',
          quiz: {
            question: "What volcanic environment is a leading candidate for the origin of life?",
            options: ["Calderas", "Lava fields", "Hydrothermal vents", "Ash clouds"],
            answerIndex: 2
          }
        },
        { 
          text: "Large Igneous Provinces (LIPs) are massive outpourings of lava that have been linked to several mass extinction events in Earth's history by causing rapid climate change.", 
          unlockedBySubUpgradeId: 'va_geothermal',
          quiz: {
            question: "What have Large Igneous Provinces (LIPs) been linked to in Earth's history?",
            options: ["The formation of continents", "Periods of rapid global cooling", "Mass extinction events", "The creation of the Moon"],
            answerIndex: 2
          }
        },
        { 
          text: "Volcanic ash can be highly fertile, leading to rich soils. However, large eruptions can also block sunlight and cause a 'volcanic winter'.", 
          unlockedBySubUpgradeId: 'va_outgassing',
          quiz: {
            question: "What is a major negative effect of a large volcanic eruption on the global climate?",
            options: ["It creates fertile soil", "It can cause a 'volcanic winter' by blocking sunlight", "It releases oxygen into the atmosphere", "It strengthens the magnetic field"],
            answerIndex: 1
          }
        }
      ],
      subUpgrades: [
        { id: 'va_outgassing', name: 'Intensify Outgassing', description: 'Increase passive Carbon generation from volcanoes.', cost: () => ({ resource: Resource.Iron, amount: 400 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Carbon, value: 3 }] },
        { id: 'va_hot_springs', name: 'Cultivate Hot Springs', description: 'Utilize geothermal energy to passively create Primordial Soup.', cost: () => ({ resource: Resource.Water, amount: 800 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.PrimordialSoup, value: 0.5 }] },
        { id: 'va_geothermal', name: 'Geothermal Power', description: 'Harness geothermal energy to boost the generation of all planetary resources.', cost: () => ({ resource: Resource.Iron, amount: 600 }), effects: [{ type: 'INCREASE_GENERATION_MULTIPLIER', resource: Resource.Rock, value: 0.05 }, { type: 'INCREASE_GENERATION_MULTIPLIER', resource: Resource.Water, value: 0.05 }] },
        { id: 'va_pressure', name: 'Magma Pressure Control', description: "Controlling magma pressure gives you greater command over geology, increasing max Force.", cost: () => ({ resource: Resource.Rock, amount: 1200 }), effects: [{ type: 'INCREASE_MAX_FORCE', value: 10 }] }
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
            { 
              text: "Plate tectonics is the theory that Earth's outer shell is divided into several plates that glide over the mantle. This process is responsible for earthquakes, volcanic activity, and the creation of mountain ranges.",
              quiz: {
                question: "The theory of plate tectonics explains the cause of earthquakes and what other major geological feature?",
                options: ["River deltas", "Mountain ranges", "Desert dunes", "Glacial valleys"],
                answerIndex: 1
              }
            },
            { 
              text: "Subduction zones, where one tectonic plate slides beneath another, are key to recycling the planet's crust and regulating atmospheric CO2 over geological timescales.", 
              unlockedBySubUpgradeId: 'pt_subduction',
              quiz: {
                question: "What happens at a subduction zone?",
                options: ["New crust is formed from magma", "Two plates slide past each other horizontally", "One plate slides beneath another, recycling crust", "Continents break apart to form new oceans"],
                answerIndex: 2
              }
            },
            { 
              text: "The formation of supercontinents, like Pangaea, and their subsequent breakup is driven by the cycle of plate tectonics.", 
              unlockedBySubUpgradeId: 'pt_supercontinent',
              quiz: {
                question: "What geological process drives the formation and breakup of supercontinents like Pangaea?",
                options: ["Giant asteroid impacts", "Plate tectonics", "Changes in the Sun's energy output", "The Milankovitch cycles"],
                answerIndex: 1
              }
            },
            { text: "Earth is the only known planet to have active plate tectonics, and it may be a critical factor for long-term planetary habitability.", unlockedBySubUpgradeId: 'pt_efficiency', quiz: { question: "What is a key process for recycling a planet's crust and regulating its climate?", options: ["Asteroid impacts", "Solar flares", "Plate tectonics", "Erosion by wind"], answerIndex: 2 } }
        ],
        subUpgrades: [
            { id: 'pt_subduction', name: 'Subduction Zones', description: 'Efficiently recycling crust boosts passive generation of Carbon and Rock.', cost: () => ({ resource: Resource.Rock, amount: 7500 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Rock, value: 2 }, { type: 'ADD_BASE_GENERATION', resource: Resource.Carbon, value: 2 }] },
            { id: 'pt_supercontinent', name: 'Supercontinent Cycle', description: 'Understanding the supercontinent cycle improves Rock generation efficiency.', cost: () => ({ resource: Resource.Rock, amount: 10000 }), effects: [{ type: 'INCREASE_GENERATION_MULTIPLIER', resource: Resource.Rock, value: 0.1 }] },
            { id: 'pt_efficiency', name: 'Mantle Plume Control', description: 'Controlling mantle plumes improves Carbon generation efficiency.', cost: () => ({ resource: Resource.Rock, amount: 12000 }), effects: [{ type: 'INCREASE_GENERATION_MULTIPLIER', resource: Resource.Carbon, value: 0.1 }] },
            { id: 'pt_force', name: 'Continental Drift', description: 'Harness the immense force of moving continents to increase your max Force.', cost: () => ({ resource: Resource.Rock, amount: 15000 }), effects: [{ type: 'INCREASE_MAX_FORCE', value: 15 }] }
        ]
    }
  },
    
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
        facts: [
            { 
              text: "The Late Heavy Bombardment, which occurred roughly 4.1 to 3.8 billion years ago, may have delivered vast quantities of water and organic compounds to the early Earth.",
              quiz: {
                question: "What vital materials did the Late Heavy Bombardment potentially deliver to Earth?",
                options: ["Only rocks and iron", "Water and organic compounds", "A fully formed atmosphere", "A global magnetic field"],
                answerIndex: 1
              }
            },
            { 
              text: "The timing of this event is debated. It may have been a 'spike' in impacts caused by the migration of giant planets like Jupiter and Saturn, or simply the tail end of planetary accretion.", 
              unlockedBySubUpgradeId: 'lhb_surface_cracking',
              quiz: {
                question: "What celestial event is thought to have possibly caused the Late Heavy Bombardment?",
                options: ["A passing star disrupting orbits", "The explosion of a nearby supernova", "The migration of giant planets", "The formation of the Moon"],
                answerIndex: 2
              }
            },
            { 
              text: "While it delivered vital ingredients for life, the intense bombardment would have also sterilized the planet's surface, possibly forcing early life to survive in protected environments like deep-sea vents.", 
              unlockedBySubUpgradeId: 'lhb_water',
              quiz: {
                question: "What negative effect did the bombardment have on the potential for surface life?",
                options: ["It cooled the planet too much", "It removed all the water from the surface", "It sterilized the surface", "It blocked all sunlight for millions of years"],
                answerIndex: 2
              }
            },
            { 
              text: "The craters on the Moon are the most famous evidence for the Late Heavy Bombardment, as Earth's have been largely erased by tectonics and erosion.", 
              unlockedBySubUpgradeId: 'lhb_iron',
              quiz: {
                question: "Where in the solar system is the best-preserved evidence for the Late Heavy Bombardment?",
                options: ["On Mars", "On Venus's surface", "On Earth's ocean floor", "On the Moon"],
                answerIndex: 3
              }
            }
        ],
        subUpgrades: [
            { id: 'lhb_surface_cracking', name: 'Surface Cracking', description: 'The impacts expose new minerals, improving passive Rock generation.', cost: () => ({ resource: Resource.Rock, amount: 3000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Rock, value: 5 }] },
            { id: 'lhb_water', name: 'Volatile Delivery', description: 'The bombardment delivers a massive payload of water.', cost: () => ({ resource: Resource.Rock, amount: 3500 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Water, value: 5 }] },
            { id: 'lhb_iron', name: 'Core Delivery', description: 'Some impactors are rich in iron, boosting passive Iron generation.', cost: () => ({ resource: Resource.Rock, amount: 4000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Iron, value: 2 }] },
            { id: 'lhb_force', name: 'Impact Control', description: 'Controlling the trajectories of impactors grants you more max Force.', cost: () => ({ resource: Resource.Rock, amount: 4500 }), effects: [{ type: 'INCREASE_MAX_FORCE', value: 10 }] }
        ]
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
        facts: [
            { 
              text: "A planet's magnetosphere is crucial for retaining an atmosphere, as it deflects high-energy particles from the star that would otherwise strip it away.",
              quiz: {
                question: "What is the primary role of a magnetosphere for a planet's habitability?",
                options: ["To cause auroras", "To trap heat from the sun", "To protect the atmosphere from being stripped away by solar wind", "To aid in animal navigation"],
                answerIndex: 2
              }
            },
            { 
              text: "The aurora borealis and australis are caused by charged particles from the solar wind being funneled down the magnetosphere's field lines and exciting atoms in the upper atmosphere.", 
              unlockedBySubUpgradeId: 'mag_deflection',
              quiz: {
                question: "What causes the beautiful aurora lights?",
                options: ["Sunlight reflecting off polar ice crystals", "Volcanic gases high in the atmosphere", "Charged particles from the solar wind interacting with the magnetosphere", "Light pollution from cities"],
                answerIndex: 2
              }
            },
            { 
              text: "Mars lost its global magnetic field billions of years ago, which allowed the solar wind to strip away most of its atmosphere, leaving it cold and barren.", 
              unlockedBySubUpgradeId: 'mag_atmosphere',
              quiz: {
                question: "What was a major consequence of Mars losing its global magnetic field?",
                options: ["It got closer to the Sun", "It cooled down rapidly", "Its atmosphere was stripped away by the solar wind", "Its volcanoes all went dormant at once"],
                answerIndex: 2
              }
            },
            { 
              text: "The Earth's magnetic field periodically flips its polarity, with north becoming south and vice versa. This has happened hundreds of times over the planet's history.", 
              unlockedBySubUpgradeId: 'mag_flip',
              quiz: {
                question: "What does Earth's magnetic field do periodically over geological time?",
                options: ["It disappears completely for millions of years", "It becomes significantly stronger", "It flips its polarity (North becomes South)", "It perfectly aligns with the planet's rotational axis"],
                answerIndex: 2
              }
            }
        ],
        subUpgrades: [
            { id: 'mag_deflection', name: 'Strengthen Deflectors', description: 'A stronger field allows for better control, granting more max Force.', cost: () => ({ resource: Resource.Iron, amount: 3000 }), effects: [{ type: 'INCREASE_MAX_FORCE', value: 10 }] },
            { id: 'mag_atmosphere', name: 'Atmospheric Retention', description: "A stable atmosphere allows for better water retention, boosting passive Water generation.", cost: () => ({ resource: Resource.Iron, amount: 3500 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Water, value: 2 }] },
            { id: 'mag_flip', name: 'Polarity Control', description: "Learning to control magnetic flips grants more max Force.", cost: () => ({ resource: Resource.Iron, amount: 4000 }), effects: [{ type: 'INCREASE_MAX_FORCE', value: 5 }] },
            { id: 'mag_efficiency', name: 'Dynamo Efficiency', description: 'Improve the efficiency of the core dynamo, improving Iron generation.', cost: () => ({ resource: Resource.Iron, amount: 4500 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Iron, value: 2 }] }
        ]
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
        facts: [
            { 
              text: "Tidal pools are considered a strong candidate for the origin of life, as the cycles of wetting and drying could have driven the polymerization of molecules like RNA.",
              quiz: {
                question: "Why are tidal pools considered a strong candidate for the origin of life?",
                options: ["They are very deep and dark", "They have very constant conditions", "Their wet-dry cycles could drive chemical polymerization", "They are always full of fish"],
                answerIndex: 2
              }
            },
            { 
              text: "The evaporation of water in tide pools dramatically increases the concentration of solutes, forcing molecules to interact more frequently and form more complex structures.", 
              unlockedBySubUpgradeId: 'tp_concentration',
              quiz: {
                question: "What key effect does evaporation have on the chemistry within a tide pool?",
                options: ["It dilutes the chemicals", "It increases the concentration of solutes", "It rapidly cools the water", "It adds large amounts of oxygen"],
                answerIndex: 1
              }
            },
            { 
              text: "These pools offer protection from the harsh UV radiation that would have bombarded the early Earth's surface.", 
              unlockedBySubUpgradeId: 'tp_uv',
              quiz: {
                question: "What environmental hazard did early tide pools offer protection from?",
                options: ["Large predators", "Extreme cold", "Asteroid impacts", "Harsh UV radiation"],
                answerIndex: 3
              }
            },
            { 
              text: "The mineral-rich clays often found in these environments can act as catalysts, speeding up the chemical reactions needed to form the building blocks of life.", 
              unlockedBySubUpgradeId: 'tp_catalysis',
              quiz: {
                question: "What important role can clays in tide pools play in the origin of life?",
                options: ["They act as a food source", "They block all sunlight", "They can act as catalysts for chemical reactions", "They absorb all the excess water"],
                answerIndex: 2
              }
            }
        ],
        subUpgrades: [
            { id: 'tp_concentration', name: 'Chemical Concentration', description: 'Enhance wet-dry cycles to passively generate more Primordial Soup.', cost: () => ({ resource: Resource.Water, amount: 4000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.PrimordialSoup, value: 0.3 }] },
            { id: 'tp_catalysis', name: 'Clay Catalysis', description: 'Seed pools with catalytic clays to generate Amino Acids.', cost: () => ({ resource: Resource.Water, amount: 5000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.AminoAcids, value: 0.2 }] },
            { id: 'tp_uv', name: 'UV Protection', description: 'Optimize pool depth for UV protection, boosting Nucleotide formation.', cost: () => ({ resource: Resource.Water, amount: 6000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Nucleotides, value: 0.1 }] },
            { id: 'tp_interlink', name: 'Interlinked Pools', description: 'Create a network of tidal pools, increasing Primordial Soup capacity.', cost: () => ({ resource: Resource.Water, amount: 7000 }), effects: [{ type: 'INCREASE_CAPACITY', resource: Resource.PrimordialSoup, value: 1000 }] }
        ]
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
        facts: [
            { 
              text: "Banded iron formations are a distinctive type of rock found in Precambrian sedimentary rocks, and their existence points to the Great Oxidation Event.",
              quiz: {
                question: "The appearance of Banded Iron Formations in the geological record points to what major atmospheric event?",
                options: ["A massive asteroid impact", "The Great Oxidation Event", "A global flood", "The formation of the Moon"],
                answerIndex: 1
              }
            },
            { 
              text: "These formations consist of alternating layers of iron-rich minerals (like hematite and magnetite) and iron-poor shale and chert.", 
              unlockedBySubUpgradeId: 'bif_mining',
              quiz: {
                question: "What are banded iron formations composed of?",
                options: ["Layers of ice and volcanic rock", "Alternating layers of iron-rich and iron-poor rock", "Solid veins of pure iron", "A mix of limestone and sandstone"],
                answerIndex: 1
              }
            },
            { 
              text: "Their formation largely ceased about 1.8 billion years ago when the deep oceans became oxygenated, preventing large quantities of dissolved iron from accumulating.", 
              unlockedBySubUpgradeId: 'bif_efficiency',
              quiz: {
                question: "Why did the large-scale formation of banded iron formations eventually stop?",
                options: ["The planet ran out of iron", "The deep oceans became fully oxygenated", "All the world's volcanoes went extinct", "The planet completely froze over"],
                answerIndex: 1
              }
            },
            { 
              text: "Banded iron formations are the source of most of the iron ore mined today, forming the backbone of our industrial civilization.", 
              unlockedBySubUpgradeId: 'bif_storage',
              quiz: {
                question: "What is the modern economic importance of banded iron formations?",
                options: ["They are a major source of diamonds", "They are the main source of iron ore", "They are used for decorative building materials", "They contain large freshwater reserves"],
                answerIndex: 1
              }
            }
        ],
        subUpgrades: [
            { id: 'bif_mining', name: 'Iron Sequestration', description: 'Harvesting these iron deposits provides a passive Iron income.', cost: () => ({ resource: Resource.Iron, amount: 6000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Iron, value: 2 }] },
            { id: 'bif_efficiency', name: 'Oxygen Cycle', description: 'Understanding the oxygen cycle improves Iron generation efficiency.', cost: () => ({ resource: Resource.Iron, amount: 7000 }), effects: [{ type: 'INCREASE_GENERATION_MULTIPLIER', resource: Resource.Iron, value: 0.1 }] },
            { id: 'bif_storage', name: 'Vast Deposits', description: 'Exploiting these vast deposits increases your Iron capacity.', cost: () => ({ resource: Resource.Iron, amount: 8000 }), effects: [{ type: 'INCREASE_CAPACITY', resource: Resource.Iron, value: 2000 }] },
            { id: 'bif_force', name: 'Industrial Foundation', description: 'The foundation of industry grants you more max Force.', cost: () => ({ resource: Resource.Iron, amount: 9000 }), effects: [{ type: 'INCREASE_MAX_FORCE', value: 5 }] }
        ]
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
        facts: [
            { 
              text: "Continental crust is less dense than oceanic crust, which is why it 'floats' higher on the mantle, creating the landmasses we know today.",
              quiz: {
                question: "Why does continental crust form landmasses that rise above the oceans?",
                options: ["It is more magnetic", "It is less dense than oceanic crust", "It is pushed up by volcanoes", "It is significantly thicker"],
                answerIndex: 1
              }
            },
            { 
              text: "It is also much older. The oldest continental crustal rocks are about 4 billion years old, whereas the oldest oceanic crust is only about 200 million years old.", 
              unlockedBySubUpgradeId: 'cc_weathering',
              quiz: {
                question: "How does the age of continental crust generally compare to oceanic crust?",
                options: ["It is much younger", "It is about the same age", "It is significantly older", "Its age is highly variable and unpredictable"],
                answerIndex: 2
              }
            },
            { 
              text: "Granite is the signature rock of the continental crust. Its formation requires multi-stage geological processes, making it rare elsewhere in the solar system.", 
              unlockedBySubUpgradeId: 'cc_granite',
              quiz: {
                question: "What is considered the 'signature' rock of the continental crust?",
                options: ["Basalt", "Limestone", "Marble", "Granite"],
                answerIndex: 3
              }
            },
            { 
              text: "The weathering of continental crust plays a key role in the long-term carbon cycle, as it washes minerals into the ocean that eventually lock away CO2.", 
              unlockedBySubUpgradeId: 'cc_carbon_cycle',
              quiz: {
                question: "What important planetary cycle does the weathering of continental crust contribute to?",
                options: ["The water cycle", "The nitrogen cycle", "The long-term carbon cycle", "The daily rock cycle"],
                answerIndex: 2
              }
            }
        ],
        subUpgrades: [
            { id: 'cc_weathering', name: 'Crust Weathering', description: 'The erosion of continents provides a passive stream of Rock.', cost: () => ({ resource: Resource.Rock, amount: 10000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Rock, value: 3 }] },
            { id: 'cc_granite', name: 'Granite Formation', description: 'Forming granite boosts Rock generation efficiency.', cost: () => ({ resource: Resource.Rock, amount: 12000 }), effects: [{ type: 'INCREASE_GENERATION_MULTIPLIER', resource: Resource.Rock, value: 0.1 }] },
            { id: 'cc_carbon_cycle', name: 'Carbon Cycle Regulation', description: 'Regulating the carbon cycle improves passive Carbon generation.', cost: () => ({ resource: Resource.Rock, amount: 14000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Carbon, value: 2 }] },
            { id: 'cc_storage', name: 'Thicken Crust', description: 'Thickening the crust increases your Rock storage capacity.', cost: () => ({ resource: Resource.Rock, amount: 16000 }), effects: [{ type: 'INCREASE_CAPACITY', resource: Resource.Rock, value: 5000 }] }
        ]
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
        facts: [
            { 
              text: "The end of 'Snowball Earth' events is thought to have been caused by the buildup of volcanic CO2 in the atmosphere, leading to extreme greenhouse warming.",
              quiz: {
                question: "How are 'Snowball Earth' periods believed to have ended?",
                options: ["By giant asteroid impacts melting the ice", "By the Sun getting significantly hotter", "By a buildup of volcanic CO2 causing a greenhouse effect", "By the ice sublimating away into space"],
                answerIndex: 2
              }
            },
            { 
              text: "During these periods, the entire planet, or nearly all of it, was covered in ice, with average temperatures plunging to -50°C.", 
              unlockedBySubUpgradeId: 'se_recovery',
              quiz: {
                question: "What were the approximate average global temperatures during a 'Snowball Earth' event?",
                options: ["Slightly cooler than today", "Around 0°C (32°F)", "Around -50°C (-58°F)", "Colder than the surface of Mars"],
                answerIndex: 2
              }
            },
            { 
              text: "Life likely survived in small pockets of open water, or 'refugia', such as near volcanic vents or in sunlit cracks in the ice.", 
              unlockedBySubUpgradeId: 'se_resilience',
              quiz: {
                question: "Where did life likely survive during 'Snowball Earth' events?",
                options: ["In the high atmosphere", "In deep underground caves, away from the ice", "In pockets of open water called 'refugia'", "It went completely extinct and had to re-evolve"],
                answerIndex: 2
              }
            },
            { 
              text: "The subsequent melting of the ice sheets would have released huge amounts of nutrients into the oceans, possibly triggering the evolution of complex life, like in the Cambrian Explosion.", 
              unlockedBySubUpgradeId: 'se_nutrients',
              quiz: {
                question: "The end of a Snowball Earth event may have triggered what major evolutionary event by releasing nutrients into the oceans?",
                options: ["The origin of life itself", "The extinction of the dinosaurs", "The Cambrian Explosion", "The development of land plants"],
                answerIndex: 2
              }
            }
        ],
        subUpgrades: [
            { id: 'se_recovery', name: 'Volcanic Recovery', description: 'Understanding the recovery from this period boosts Carbon generation.', cost: () => ({ resource: Resource.Carbon, amount: 5000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Carbon, value: 2 }] },
            { id: 'se_resilience', name: 'Life\'s Resilience', description: "The resilience of life during this harsh time improves the efficiency of all biological resources.", cost: () => ({ resource: Resource.Water, amount: 15000 }), effects: [{ type: 'INCREASE_GENERATION_MULTIPLIER', resource: Resource.PrimordialSoup, value: 0.1 }] },
            { id: 'se_nutrients', name: 'Nutrient Runoff', description: 'Harness the post-glacial nutrient runoff to boost Primordial Soup generation.', cost: () => ({ resource: Resource.Water, amount: 20000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.PrimordialSoup, value: 1 }] },
            { id: 'se_albedo', name: 'Albedo Control', description: "Mastering the planet's reflectivity grants more max Force.", cost: () => ({ resource: Resource.Water, amount: 25000 }), effects: [{ type: 'INCREASE_MAX_FORCE', value: 5 }] }
        ]
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
        facts: [
            { 
              text: "The Hadean Eon is named after Hades, the Greek god of the underworld, due to the hellish conditions on the early Earth.",
              quiz: {
                question: "The name 'Hadean Eon' refers to the 'hellish' conditions of early Earth, named after what?",
                options: ["The Roman god of war, Mars", "The Greek underworld, Hades", "The Norse land of fire, Muspelheim", "The Egyptian sun god, Ra"],
                answerIndex: 1
              }
            },
            { 
              text: "This eon spans from the formation of the Earth about 4.5 billion years ago to about 4 billion years ago. There are almost no rocks preserved from this period.", 
              unlockedBySubUpgradeId: 'he_resilience',
              quiz: {
                question: "How abundant are rocks from the Hadean Eon on Earth today?",
                options: ["They are very common", "They make up most of the continental crust", "They are almost non-existent", "They can only be found on the Moon"],
                answerIndex: 2
              }
            },
            { 
              text: "During the Hadean, the Earth was constantly bombarded by asteroids and comets, and featured a magma ocean on its surface.", 
              unlockedBySubUpgradeId: 'he_magma_ocean',
              quiz: {
                question: "What likely covered the surface of the Earth during much of the Hadean Eon?",
                options: ["A global ice sheet", "A global magma ocean", "A thick, unbreathable atmosphere", "A single, barren supercontinent"],
                answerIndex: 1
              }
            },
            { 
              text: "Despite the name, recent evidence from ancient zircon crystals suggests that liquid water and possibly even oceans may have existed as early as 4.4 billion years ago.", 
              unlockedBySubUpgradeId: 'he_zircon',
              quiz: {
                question: "What do ancient zircon crystals suggest about the Hadean Eon?",
                options: ["There was absolutely no water on Earth", "There was already complex life", "Liquid water may have existed much earlier than once thought", "The planet was completely molten for its entire duration"],
                answerIndex: 2
              }
            }
        ],
        subUpgrades: [
            { id: 'he_resilience', name: 'Chaotic Resilience', description: 'Mastering chaos grants more max Force.', cost: () => ({ resource: Resource.Rock, amount: 1500 }), effects: [{ type: 'INCREASE_MAX_FORCE', value: 3 }] },
            { id: 'he_magma_ocean', name: 'Magma Ocean Control', description: 'Controlling the magma ocean improves Iron generation.', cost: () => ({ resource: Resource.Rock, amount: 2000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Iron, value: 1 }] },
            { id: 'he_zircon', name: 'Analyze Zircon Crystals', description: 'Analyzing ancient zircons improves Rock generation.', cost: () => ({ resource: Resource.Rock, amount: 2500 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Rock, value: 2 }] },
            { id: 'he_steam_atmosphere', name: 'Steam Atmosphere', description: 'Harness the early steam atmosphere to generate Water.', cost: () => ({ resource: Resource.Rock, amount: 3000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.Water, value: 1 }] }
        ]
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
        facts: [
            { 
              text: "During the Archean Eon, the atmosphere was still devoid of free oxygen and the sky would have appeared orange from methane haze.",
              quiz: {
                question: "What color would the sky have likely been during the Archean Eon due to methane haze?",
                options: ["Blue", "Orange", "Black", "Deep violet"],
                answerIndex: 1
              }
            },
            { 
              text: "The first continents began to form during the Archean, though they were likely much smaller than today's landmasses.", 
              unlockedBySubUpgradeId: 'ae_prokaryotes',
              quiz: {
                question: "During which eon did the first continents begin to form?",
                options: ["The Hadean Eon", "The Archean Eon", "The Proterozoic Eon", "The Phanerozoic Eon"],
                answerIndex: 1
              }
            },
            { text: "Fossilized microbial mats called stromatolites are some of the oldest direct evidence of life, dating back to the Archean Eon.", unlockedBySubUpgradeId: 'ae_stromatolites', quiz: { question: "What are the fossilized microbial mats that provide some of the earliest evidence of life called?", options: ["Trilobites", "Ammonites", "Stromatolites", "Anomalocaris"], answerIndex: 2 } },
            { 
              text: "The Sun was about 25% fainter during the Archean. The planet was likely kept warm by high concentrations of greenhouse gases like methane and CO2.", 
              unlockedBySubUpgradeId: 'ae_efficiency',
              quiz: {
                question: "How was the Earth kept warm during the Archean Eon, despite a fainter Sun?",
                options: ["Heat from constant impacts", "A much closer orbit to the Sun", "High concentrations of greenhouse gases", "A stronger planetary magnetic field"],
                answerIndex: 2
              }
            }
        ],
        subUpgrades: [
            { id: 'ae_prokaryotes', name: 'Prokaryotic Mats', description: 'The first microbial mats begin to enrich the oceans, generating Primordial Soup.', cost: () => ({ resource: Resource.Water, amount: 10000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.PrimordialSoup, value: 1 }] },
            { id: 'ae_stromatolites', name: 'Cultivate Stromatolites', description: 'Cultivating stromatolites passively generates Amino Acids.', cost: () => ({ resource: Resource.Water, amount: 12000 }), effects: [{ type: 'ADD_BASE_GENERATION', resource: Resource.AminoAcids, value: 0.5 }] },
            { id: 'ae_efficiency', name: 'Anaerobic Efficiency', description: 'Mastering the anaerobic environment improves Primordial Soup generation.', cost: () => ({ resource: Resource.Water, amount: 14000 }), effects: [{ type: 'INCREASE_GENERATION_MULTIPLIER', resource: Resource.PrimordialSoup, value: 0.1 }] },
            { id: 'ae_hands', name: 'First stirrings', description: 'The first life grants you more max Hands.', cost: () => ({ resource: Resource.Water, amount: 16000 }), effects: [{ type: 'INCREASE_MAX_HANDS', value: 5 }] }
        ]
    }
  },
];