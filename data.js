export const TERMS = {
    currency: "sand dollars",
    material: "salvage",
    worker: "diver",
    place: "floor",
    home: "the surface",
};


export const BALANCE = {
    dangerBase: 1,
    dangerGrowth: 1.26,
    lootBase: 5,
    lootGrowth: 1.2,
    survivalSharpness: 2,
    tripSecondsBase: 8,
    tripSecondsPerFloor: 0.5,
    hireBaseCost: 20,
    hireGrowth: 1.15,
    captainDeathLoss: 0.10,
    findChance: 0.10,
    statBaseCost: 5,      // pearls for the first + on a stat
    statGrowth: 1.5,      // each next point costs 50% more

    // The captain's power, weighed against a floor's danger (placeholders)
    captainBasePower: 30,
    captainPowerPerLevel: 8,
    powerPerAgility: 5,   // each Agility point above 1 adds this much
    lootPerStrength: 0.10,    // each Strength point above 1: +10% sand dollars per captain dive
    xpPerIntelligence: 0.10,  // each Intelligence point above 1: +10% XP per captain dive

    diverPower: 20,             // a diver's power, weighed against a floor's danger
    nicknameChance: 0.05,       // about 1 in 20 divers gets a nickname
    diverLogLength: 10,         // how many story lines each diver remembers
    fallenLimit: 200,           // how many lost divers the fallen list remembers

    captainLootMultiplier: 2,   // the captain brings back this many times a diver's loot
    xpStepPerLevel: 500,        // each level needs 500 more XP than the step before (the Python formula)
}

// A diver's nature: rolled once at hiring, never changes.
// chance: how common it is (all together add up to 1).
// lean:   where they like to dive. 1 = any charted floor equally,
//         below 1 = leans shallow, above 1 = leans deep.
export const NATURES = {
    careful:  { label: "Careful",  chance: 0.25, lean: 0.5 },
    steady:   { label: "Steady",   chance: 0.45, lean: 1 },
    bold:     { label: "Bold",     chance: 0.22, lean: 2 },
    reckless: { label: "Reckless", chance: 0.08, lean: 4 },
};

// Every upgrade tile is built from this list.
// Adding an upgrade = adding one line here. Each tile can be bought once.
// addsFloor: buying it lets the captain dive one floor deeper (floorBought + 1).
export const UPGRADES = [
    { key: "floor2", name: "Floor", cost: 25,   unlockFloor: 1, addsFloor: true, description: "Dive one floor deeper" },
    { key: "floor3", name: "Floor", cost: 60,   unlockFloor: 1, addsFloor: true, description: "Dive one floor deeper" },
    { key: "floor4", name: "Floor", cost: 150,  unlockFloor: 1, addsFloor: true, description: "Dive one floor deeper" },
    { key: "floor5", name: "Floor", cost: 400,  unlockFloor: 1, addsFloor: true, description: "Dive one floor deeper" },
    { key: "floor6", name: "Floor", cost: 1000, unlockFloor: 1, addsFloor: true, description: "Dive one floor deeper" },

    { key: "suit", name: "Suit", cost: 100,  unlockFloor: 1, description: "Dive suit (effect to come)" },
    { key: "lamp", name: "Lamp", cost: 400,  unlockFloor: 3, description: "Lamp: see more finds (effect to come)" },
    { key: "tank", name: "Tank", cost: 1000, unlockFloor: 6, description: "Bigger tank (effect to come)" },
];

// Diver names: a random first and last name, sometimes with a nickname.
// Mixed origins, so the crew feels like an international expedition. Add as many as you like.
export const FIRST_NAMES = [
    "Lisanne", "Mathijs", "Gedion", "Cas", "Toon", "Aram", "Egbert", "Wieke", "Robert", "Jan",
    "Ole", "Hidde", "Menno", "Bas", "Lorenzo", "Mert", "Gijs", "Lotte",
    "Mira", "Tomas", "Ines", "Kenji", "Amara", "Lars", "Priya", "Mateo", "Aiko", "Kwame",
    "Sofia", "Ruben", "Leila", "Oskar", "Yara", "Dev", "Noor", "Emil", "Zara", "Tariq",
    "Lena", "Rafael", "Hana", "Jonas", "Ama", "Bram", "Mei", "Diego", "Freya", "Kofi",
    "Ingrid", "Ravi", "Lucia", "Sami", "Elif", "Joost", "Nia", "Felipe", "Saoirse", "Arjun",
    "Maren", "Chidi", "Yuki", "Pablo", "Astrid", "Omar", "Femke", "Tao", "Imani", "Nils",
];

export const LAST_NAMES = [
    "Okafor", "Reyes", "Tanaka", "Bell", "de Vries", "Marsh", "Kowal", "Voss", "Haddad", "Lindqvist",
    "Mensah", "Costa", "Nakamura", "Brennan", "Patel", "Jansen", "Abebe", "Moreau", "Sato", "Quinn",
    "Ferreira", "Okoye", "Nilsen", "Castillo", "Bakker", "Ito", "Adeyemi", "Novak", "Silva", "Hart",
    "Kaur", "Visser", "Mbeki", "Larsen", "Romero", "Yilmaz", "Osei", "Dubois", "Kim", "Hendriks",
    "Alvarez", "Nwosu", "Berg", "Rossi", "Mwangi", "Fischer", "Chen", "Smit", "Torres", "Okonjo",
];

export const NICKNAMES = [
    "Gills", "Bubbles", "Anchor", "Squid", "Barnacle", "Kelp", "Moray", "Ballast", "Sonar", "Salty",
    "Driftwood", "Tide", "Fathom", "Harpoon", "Undertow", "Lungs", "Wreck", "Coral", "Pearl", "Eel",
];

//STATE
export const STATE = {
    sandDollarsEarned: 0,     // everything ever earned (only addSandDollars changes it)
    sandDollars: 0,
    sandRate: 0,              // expected sand dollars per second from divers (updateSandRate)
    captainLevel: 1,
    totalXP: 0,
    floorSelected: 1,
    floorSelectedName: "Sunlit Zone",   // updated by setFloor when the floor changes
    floorRecord: 1,    // deepest floor the captain has charted: divers can go this deep
    floorBought: 1,    // deepest floor the captain's gear allows
    boughtDivers: 0,
    upgradesOwned: [],        // keys of UPGRADES you bought
    fallen: [],               // lost divers, newest last (see fallenLimit)

    strength: 1,
    agility: 1,
    intelligence: 1,

    inventory: {
        banana: 0,
    }
}

export const DIVERS = {

}