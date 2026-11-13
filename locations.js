export const LOCATIONS = {
    // FLOOR 1–6
    sunlit: {
        name: "Sunlit Zone",
        depth: "0–200 m",
        floorRange: [1, 6],

        locations: {
            sunken_ferry: {
                name: "Sunken Ferry",
                description: "An old passenger ferry rests on the sandy seabed. Its cabins are filled with debris and forgotten belongings.",
                unlockFloor: 1,
                loot: { Scrap: 10, Pearls: 3, ResearchData: 1, Artifacts: 0.5 }
            },
            coral_garden: {
                name: "Coral Garden",
                description: "A colourful coral reef stretches across the seabed. Small creatures hide between the coral formations.",
                unlockFloor: 1,
                loot: { Scrap: 2, Pearls: 10, ResearchData: 1, Artifacts: 0.5 }
            },
            fishing_trawler: {
                name: "Fishing Trawler",
                description: "A fishing vessel lies on its side. Its nets, equipment and storage compartments are still scattered around the wreck.",
                unlockFloor: 1,
                loot: { Scrap: 12, Pearls: 2, ResearchData: 0.5, Artifacts: 1 }
            },
            sea_caves: {
                name: "Sea Caves",
                description: "A network of shallow caves cuts through the rocky seabed. Something glimmers in the darkness inside.",
                unlockFloor: 2,
                loot: { Scrap: 3, Pearls: 8, ResearchData: 1, Artifacts: 2 }
            },
            diving_platform: {
                name: "Abandoned Diving Platform",
                description: "An old diving platform has been left to rust. Equipment and supply crates remain scattered across its structure.",
                unlockFloor: 2,
                loot: { Scrap: 10, Pearls: 1, ResearchData: 3, Artifacts: 1 }
            },
            kelp_forest: {
                name: "Kelp Forest",
                description: "Tall strands of kelp sway in the current, creating a dense underwater forest filled with marine life.",
                unlockFloor: 3,
                loot: { Scrap: 3, Pearls: 7, ResearchData: 1.5, Artifacts: 1 }
            },
            speedboat_wreck: {
                name: "Sunken Speedboat",
                description: "A small speedboat rests beneath the waves. Its hull is damaged, but some valuable equipment remains intact.",
                unlockFloor: 3,
                loot: { Scrap: 9, Pearls: 2, ResearchData: 1, Artifacts: 2 }
            },
            coastal_lighthouse: {
                name: "Coastal Lighthouse",
                description: "The base of an old lighthouse has collapsed into the sea. Its foundations are surrounded by broken masonry and metal.",
                unlockFloor: 4,
                loot: { Scrap: 7, Pearls: 2, ResearchData: 3, Artifacts: 3 }
            },
            cargo_container: {
                name: "Lost Cargo Container",
                description: "A shipping container lies half-buried in the sand. Its doors have been forced open, revealing the remains of its cargo.",
                unlockFloor: 4,
                loot: { Scrap: 14, Pearls: 1, ResearchData: 1, Artifacts: 2 }
            },
            research_buoy: {
                name: "Research Buoy",
                description: "An oceanographic research buoy has broken loose from its anchor. Its sensors and data storage may still be functional.",
                unlockFloor: 5,
                loot: { Scrap: 3, Pearls: 1, ResearchData: 10, Artifacts: 1 }
            },
            submerged_village: {
                name: "Submerged Village",
                description: "The remains of a coastal village lie beneath the water. Houses, streets and old possessions have been swallowed by the sea.",
                unlockFloor: 5,
                loot: { Scrap: 8, Pearls: 4, ResearchData: 2, Artifacts: 4 }
            },
            blue_hole: {
                name: "Blue Hole",
                description: "A deep circular sinkhole cuts into the seabed. Its walls descend sharply into the blue darkness below.",
                unlockFloor: 6,
                loot: { Scrap: 1, Pearls: 9, ResearchData: 2, Artifacts: 3 }
            }
        }
    },

    // FLOOR 7–12
    twilight: {
        name: "Twilight Zone",
        depth: "200–1,000 m",
        floorRange: [7, 12],

        locations: {
            research_station: {
                name: "Abandoned Research Station",
                description: "A deep-sea research station hangs above the seabed. Its windows are cracked and its equipment has been left running.",
                unlockFloor: 7,
                loot: { Scrap: 8, Pearls: 2, ResearchData: 8, Artifacts: 2 }
            },
            ship_graveyard: {
                name: "Ship Graveyard",
                description: "The remains of several ships are scattered across the ocean floor. Their rusted hulls form a maze of wreckage.",
                unlockFloor: 7,
                loot: { Scrap: 12, Pearls: 3, ResearchData: 3, Artifacts: 4 }
            },
            ghost_nets: {
                name: "Ghost Net Field",
                description: "Abandoned fishing nets drift through the water, tangled around rocks and the remains of old equipment.",
                unlockFloor: 7,
                loot: { Scrap: 9, Pearls: 2, ResearchData: 2, Artifacts: 1 }
            },
            submarine_wreck: {
                name: "Submarine Wreck",
                description: "A military submarine rests on the slope of an underwater canyon. Its outer hull has been torn open.",
                unlockFloor: 8,
                loot: { Scrap: 10, Pearls: 1, ResearchData: 6, Artifacts: 4 }
            },
            whale_fall: {
                name: "Whale Fall",
                description: "The enormous skeleton of a whale lies on the seabed, attracting scavengers and strange deep-sea creatures.",
                unlockFloor: 8,
                loot: { Scrap: 1, Pearls: 8, ResearchData: 4, Artifacts: 3 }
            },
            canyon_relay: {
                name: "Canyon Relay Station",
                description: "An automated communications station stands on the edge of a canyon. Its signal continues to pulse through the water.",
                unlockFloor: 9,
                loot: { Scrap: 3, Pearls: 1, ResearchData: 10, Artifacts: 3 }
            },
            oil_rig_remains: {
                name: "Oil Rig Remains",
                description: "The collapsed structure of an offshore oil rig lies deep beneath the surface. Heavy machinery is scattered across the seabed.",
                unlockFloor: 9,
                loot: { Scrap: 11, Pearls: 1, ResearchData: 6, Artifacts: 3 }
            },
            bioluminescent_grove: {
                name: "Bioluminescent Grove",
                description: "Strange organisms illuminate the darkness with a faint blue glow. Their light reveals a forest of unusual deep-sea growth.",
                unlockFloor: 10,
                loot: { Scrap: 2, Pearls: 6, ResearchData: 4, Artifacts: 3 }
            },
            lost_expedition: {
                name: "Lost Expedition",
                description: "A research team's abandoned camp lies on a rocky ledge. Their equipment and personal logs remain scattered around.",
                unlockFloor: 10,
                loot: { Scrap: 4, Pearls: 3, ResearchData: 8, Artifacts: 5 }
            },
            underwater_archive: {
                name: "Underwater Museum",
                description: "A collection of historical objects has been preserved inside a sealed underwater exhibition hall.",
                unlockFloor: 11,
                loot: { Scrap: 5, Pearls: 2, ResearchData: 10, Artifacts: 7 }
            },
            volcanic_ridge: {
                name: "Volcanic Ridge",
                description: "A long volcanic ridge cuts through the seabed. Small cracks release clouds of warm mineral-rich water.",
                unlockFloor: 11,
                loot: { Scrap: 5, Pearls: 3, ResearchData: 6, Artifacts: 4 }
            },
            the_dropoff: {
                name: "The Drop-off",
                description: "The seabed suddenly ends at a massive underwater cliff. Beyond its edge, the ocean disappears into darkness.",
                unlockFloor: 12,
                loot: { Scrap: 1, Pearls: 2, ResearchData: 8, Artifacts: 5 }
            }
        }
    },

    // FLOOR 13–18
    midnight: {
        name: "Midnight Zone",
        depth: "1,000–4,000 m",
        floorRange: [13, 18],

        locations: {
            blackwater_lab: {
                name: "Blackwater Laboratory",
                description: "A sealed laboratory floats in complete darkness. Its research equipment appears to have been abandoned in a hurry.",
                unlockFloor: 13,
                loot: { Scrap: 4, Pearls: 1, ResearchData: 10, Artifacts: 5 }
            },
            ghost_fleet: {
                name: "Ghost Fleet",
                description: "Several enormous shipwrecks lie motionless in the darkness. Their cargo holds may still contain valuable remains.",
                unlockFloor: 13,
                loot: { Scrap: 10, Pearls: 2, ResearchData: 5, Artifacts: 6 }
            },
            glass_sponge_forest: {
                name: "Glass Sponge Forest",
                description: "Delicate glass sponges cover the seabed, forming an intricate forest of transparent structures.",
                unlockFloor: 13,
                loot: { Scrap: 2, Pearls: 6, ResearchData: 5, Artifacts: 4 }
            },
            deep_submersible: {
                name: "Crashed Submersible",
                description: "A research submersible has crashed against a rocky outcrop. Its reinforced cabin is partly buried in sediment.",
                unlockFloor: 14,
                loot: { Scrap: 6, Pearls: 1, ResearchData: 7, Artifacts: 5 }
            },
            pressure_dome: {
                name: "Pressure Dome",
                description: "A strange spherical structure stands alone on the seabed. Its thick glass windows have somehow survived the pressure.",
                unlockFloor: 14,
                loot: { Scrap: 8, Pearls: 1, ResearchData: 9, Artifacts: 6 }
            },
            bone_garden: {
                name: "Bone Garden",
                description: "An unusual field of enormous bones stretches across the seabed. Some appear far too large to belong to any known animal.",
                unlockFloor: 15,
                loot: { Scrap: 1, Pearls: 4, ResearchData: 6, Artifacts: 7 }
            },
            signal_beacon: {
                name: "Signal Beacon",
                description: "A mysterious beacon emits a repeating signal from the ocean floor. Its origin and purpose are unknown.",
                unlockFloor: 15,
                loot: { Scrap: 3, Pearls: 1, ResearchData: 10, Artifacts: 5 }
            },
            abyssal_canyon: {
                name: "Abyssal Canyon",
                description: "A narrow canyon winds between towering rock walls. Strange lights can occasionally be seen far below.",
                unlockFloor: 16,
                loot: { Scrap: 2, Pearls: 2, ResearchData: 7, Artifacts: 6 }
            },
            frozen_seamount: {
                name: "Frozen Seamount",
                description: "A submerged mountain rises from the dark seabed. Its peaks are covered in unusual mineral deposits.",
                unlockFloor: 16,
                loot: { Scrap: 3, Pearls: 3, ResearchData: 6, Artifacts: 5 }
            },
            leviathan_skeleton: {
                name: "Leviathan Skeleton",
                description: "The enormous remains of an unknown sea creature lie across the ocean floor. Its skull alone is larger than a submarine.",
                unlockFloor: 17,
                loot: { Scrap: 1, Pearls: 5, ResearchData: 4, Artifacts: 10 }
            },
            buried_research_ark: {
                name: "Buried Research Ark",
                description: "A massive research vessel has partially disappeared beneath layers of sediment. Its central archive may still be intact.",
                unlockFloor: 17,
                loot: { Scrap: 5, Pearls: 1, ResearchData: 10, Artifacts: 8 }
            },
            silent_station: {
                name: "The Silent Station",
                description: "A large underwater facility stands completely dark. No signals or signs of activity have been detected.",
                unlockFloor: 18,
                loot: { Scrap: 4, Pearls: 2, ResearchData: 8, Artifacts: 9 }
            }
        }
    },

    // FLOOR 19–24
    abyssal: {
        name: "Abyssal Zone",
        depth: "4,000–6,000 m",
        floorRange: [19, 24],

        locations: {
            endless_plain: {
                name: "The Endless Plain",
                description: "A seemingly endless stretch of flat seabed is covered in fine sediment. Scattered objects hint at things long forgotten.",
                unlockFloor: 19,
                loot: { Scrap: 3, Pearls: 2, ResearchData: 6, Artifacts: 5 }
            },
            vent_field: {
                name: "Hydrothermal Vent Field",
                description: "Mineral-rich water rises from cracks in the seabed. Strange organisms gather around the warm vents.",
                unlockFloor: 19,
                loot: { Scrap: 2, Pearls: 3, ResearchData: 8, Artifacts: 6 }
            },
            nodule_fields: {
                name: "Manganese Nodule Fields",
                description: "Thousands of dark mineral nodules cover the ocean floor. Some contain unusual metallic deposits.",
                unlockFloor: 19,
                loot: { Scrap: 8, Pearls: 1, ResearchData: 5, Artifacts: 5 }
            },
            collapsed_habitat: {
                name: "Collapsed Habitat",
                description: "The remains of an underwater settlement lie crushed beneath the pressure. Its reinforced walls are barely recognizable.",
                unlockFloor: 20,
                loot: { Scrap: 9, Pearls: 1, ResearchData: 7, Artifacts: 7 }
            },
            basalt_cathedral: {
                name: "Basalt Cathedral",
                description: "Tall volcanic rock formations rise like pillars around a vast cavern. Their shapes resemble the ruins of a cathedral.",
                unlockFloor: 20,
                loot: { Scrap: 1, Pearls: 3, ResearchData: 5, Artifacts: 8 }
            },
            drowned_archive: {
                name: "Drowned Archive",
                description: "An ancient archive lies sealed inside a reinforced structure. Strange symbols cover its walls and surviving data terminals.",
                unlockFloor: 21,
                loot: { Scrap: 3, Pearls: 1, ResearchData: 10, Artifacts: 10 }
            },
            chimney_colony: {
                name: "Chimney Colony",
                description: "A field of towering hydrothermal chimneys rises from the seabed. Their dark mineral structures are covered in unusual life.",
                unlockFloor: 21,
                loot: { Scrap: 2, Pearls: 2, ResearchData: 8, Artifacts: 7 }
            },
            clam_graveyard: {
                name: "Giant Clam Graveyard",
                description: "Enormous empty shells are scattered across the seabed. Their interiors contain traces of rare mineral formations.",
                unlockFloor: 22,
                loot: { Scrap: 1, Pearls: 9, ResearchData: 4, Artifacts: 6 }
            },
            crushed_carrier: {
                name: "Crushed Carrier",
                description: "A huge cargo ship has been flattened against the ocean floor. Its containers have burst open under the immense pressure.",
                unlockFloor: 22,
                loot: { Scrap: 12, Pearls: 1, ResearchData: 4, Artifacts: 7 }
            },
            mineral_spires: {
                name: "Mineral Spires",
                description: "Sharp mineral formations grow from the seabed in towering clusters. Their surfaces shimmer under your lights.",
                unlockFloor: 23,
                loot: { Scrap: 2, Pearls: 4, ResearchData: 7, Artifacts: 8 }
            },
            ancient_machine: {
                name: "Ancient Machine",
                description: "A gigantic mechanical structure lies embedded in the seabed. Its purpose is impossible to determine.",
                unlockFloor: 23,
                loot: { Scrap: 6, Pearls: 1, ResearchData: 10, Artifacts: 12 }
            },
            silent_crater: {
                name: "The Silent Crater",
                description: "A circular crater descends deep into the ocean floor. Its centre is covered by an unfamiliar black material.",
                unlockFloor: 24,
                loot: { Scrap: 2, Pearls: 2, ResearchData: 9, Artifacts: 10 }
            }
        }
    },

    // FLOOR 25–30
    hadal: {
        name: "Hadal Zone",
        depth: "6,000–11,000 m",
        floorRange: [25, 30],

        locations: {
            trench_entrance: {
                name: "Trench Entrance",
                description: "A colossal trench opens beneath you. Its steep walls descend into a darkness that your lights cannot penetrate.",
                unlockFloor: 25,
                loot: { Scrap: 2, Pearls: 2, ResearchData: 7, Artifacts: 8 }
            },
            slumped_wall: {
                name: "The Slumped Wall",
                description: "A section of the trench wall has collapsed, exposing layers of ancient rock and objects buried deep within.",
                unlockFloor: 25,
                loot: { Scrap: 5, Pearls: 2, ResearchData: 6, Artifacts: 9 }
            },
            expedition_pod: {
                name: "Hadal Expedition Pod",
                description: "An unmanned expedition pod rests on the trench floor. Its outer shell is heavily damaged, but its data recorder remains intact.",
                unlockFloor: 25,
                loot: { Scrap: 5, Pearls: 1, ResearchData: 11, Artifacts: 8 }
            },
            brine_lake: {
                name: "Brine Lake",
                description: "A pool of extremely dense, salty water lies in a depression on the seabed. Its surface looks almost like a separate ocean.",
                unlockFloor: 26,
                loot: { Scrap: 1, Pearls: 5, ResearchData: 8, Artifacts: 8 }
            },
            bone_trench: {
                name: "Bone Trench",
                description: "An enormous collection of bones fills a narrow section of the trench. Some remains show signs of unknown markings.",
                unlockFloor: 26,
                loot: { Scrap: 1, Pearls: 4, ResearchData: 7, Artifacts: 12 }
            },
            pressure_vault: {
                name: "Pressure-Locked Vault",
                description: "A reinforced vault is embedded in the trench wall. Its sealed entrance appears designed to withstand unimaginable pressure.",
                unlockFloor: 27,
                loot: { Scrap: 4, Pearls: 2, ResearchData: 10, Artifacts: 12 }
            },
            hadal_nest: {
                name: "Primordial Nest",
                description: "A strange nest-like structure lies hidden between enormous rocks. Its contents suggest that something still lives here.",
                unlockFloor: 27,
                loot: { Scrap: 1, Pearls: 5, ResearchData: 8, Artifacts: 12 }
            },
            buried_temple: {
                name: "The Buried Temple",
                description: "An ancient structure emerges from the sediment. Its walls are covered in symbols that do not match any known civilization.",
                unlockFloor: 28,
                loot: { Scrap: 2, Pearls: 3, ResearchData: 10, Artifacts: 15 }
            },
            black_chimney: {
                name: "The Black Chimney",
                description: "A massive black chimney rises from the trench floor. Its surface pulses with an unexplained faint glow.",
                unlockFloor: 28,
                loot: { Scrap: 1, Pearls: 3, ResearchData: 9, Artifacts: 12 }
            },
            submerged_observatory: {
                name: "Submerged Observatory",
                description: "A sealed observatory is buried deep within the trench. Its instruments appear to have been monitoring something below.",
                unlockFloor: 29,
                loot: { Scrap: 3, Pearls: 1, ResearchData: 14, Artifacts: 12 }
            },
            last_camp: {
                name: "The Last Camp",
                description: "The remains of an expedition camp mark the deepest known human landing site. A final log entry is still waiting to be recovered.",
                unlockFloor: 29,
                loot: { Scrap: 3, Pearls: 2, ResearchData: 12, Artifacts: 14 }
            },
            abyssal_core: {
                name: "The Abyssal Core",
                description: "At the bottom of the trench lies a vast, unidentified structure. A faint signal emanates from somewhere inside.",
                unlockFloor: 30,
                loot: { Scrap: 2, Pearls: 3, ResearchData: 15, Artifacts: 20 }
            }
        }
    }
};