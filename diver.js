class Diver {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.returnsAt = null;
        this.dollarsEarned = 0;
        this.totalTrips = 0;
    }

    startDive(duration) {
        const randTimer = randInt(-750, 750);
        this.returnsAt = Date.now() + duration + randTimer;
    }

    getLoot(dollars) {
        console.log(`${this.name} returned with ${dollars} sand dollars.`);
        this.dollarsEarned += dollars;
        return dollars;
    }

    addTrip() {
        this.totalTrips++;
    }
}

function hireDiver(name) {
    const cost = hireCost();

    if (STATE.sandDollars < cost) {
        console.log("DONT HAVE MONEEHHEHEHEHE");
        return
    }

    STATE.sandDollars -= cost;
    STATE.boughtDivers++;

    const id = STATE.boughtDivers;
    const newDiver = new Diver(id, name);
    DIVERS[id] = newDiver;
    console.log(`${newDiver.name} has joined your Diving team!`)

    newDiver.startDive(1500);
}

function hireCost() {
    return Math.floor(BALANCE.hireBaseCost * BALANCE.hireGrowth ** STATE.boughtDivers);
}