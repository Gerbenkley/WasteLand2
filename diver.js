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
        this.dollarsEarned += dollars;
        return dollars;
    }

    returnFromTrip() {
        this.totalTrips++;
    }
}

function hireDiver() {
    const cost = hireCost();
    if (STATE.sandDollars < cost) {
        console.log("DONT HAVE MONEEHHEHEHEHE");
        return
    }

    const newName = makeRandomName();

    STATE.sandDollars -= cost;
    STATE.boughtDivers++;

    const id = STATE.boughtDivers;
    const newDiver = new Diver(id, newName);
    DIVERS[id] = newDiver;
    addFloodLine(`${newDiver.name} has joined your Diving team!`)

    newDiver.startDive(1500);
}

function hireCost() {
    return Math.floor(BALANCE.hireBaseCost * BALANCE.hireGrowth ** STATE.boughtDivers);
}

function makeRandomName() {
    return randInt(0, 61601061).toString();
}