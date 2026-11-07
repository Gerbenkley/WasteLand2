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
    hireBaseCost: 50,
    hireGrowth: 1.15,
    captainDeathLoss: 0.10,
    findChance: 0.10,
}


const ZONES = [
  { name: 'Sunlit',   from: 1,  to: 6,  finds: { 'Glass Float': 5, 'Tangled Net': 3, 'Pearl': 1 } },
  { name: 'Twilight', from: 7,  to: 15, finds: { 'Rusted Helmet': 4, 'Glowing Jar': 3, 'Pearl': 2 } },
  { name: 'Midnight', from: 16, to: 30, finds: { 'Sealed Bottle': 4, 'Brass Compass': 3, 'Pearl': 3 } }
];


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

    inventory: {
        banana: 0,
    }
}