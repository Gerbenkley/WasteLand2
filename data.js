const TERMS = {
    currency: "sand dollars",
    material: "salvage",
    worker: "diver",
    place: "floor",
    home: "the surface",
};


const BALANCE = {
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
}

//STATE
const STATE = {
    sandDollarsEarned: 0,
    sandDollars: 0,
    sandRate: 0,
    captainLevel: 1,
    totalXP: 0,
    floorSelected: 1,
    floorSelectedName: "Twilight",
    floorRecord: 1,
    floorBought: 8,
    survivalRate: 100,
    boughtDivers: 0,

    strength: 1,
    agility: 1,
    intelligence: 1,

    inventory: {
        banana: 0,
    }
}

const DIVERS = {

}