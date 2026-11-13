import { STATE, DIVERS, BALANCE, FIRST_NAMES, LAST_NAMES, NICKNAMES } from './data.js';
import {
    randInt, randBetween, addFloodLine, tripSeconds, lootValue, randomLocationOnFloor,
    spendSandDollars, updateSandRate
} from './functions.js';

export class Diver {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.returnsAt = null;
        this.floor = null;          // the floor of the current dive
        this.location = null;       // the location name of the current dive
        this.deepestFloor = 0;
        this.dollarsEarned = 0;
        this.totalTrips = 0;
    }

    // Go to a floor: pick a location there, and work out when you're back
    startDive(floor) {
        this.floor = floor;
        this.location = randomLocationOnFloor(floor).name;

        const seconds = tripSeconds(floor) * randBetween(0.9, 1.1);   // plus or minus 10%
        this.returnsAt = Date.now() + seconds * 1000;
    }

    // What this dive brought back: deeper floors pay more
    getLoot() {
        const dollars = Math.round(lootValue(this.floor) * randBetween(0.8, 1.2));   // plus or minus 20%
        this.dollarsEarned += dollars;
        return dollars;
    }

    returnFromTrip() {
        this.totalTrips++;
        this.deepestFloor = Math.max(this.deepestFloor, this.floor);
    }
}

// Which floor a diver goes to next. For now: any floor the captain has reached.
// In step 7, the risk dial takes over this choice.
export function chooseDiverFloor() {
    return randInt(1, STATE.floorRecord);
}

export function hireDiver() {
    if (!spendSandDollars(hireCost())) {
        console.log("Not enough sand dollars to hire a diver.");
        return;
    }

    const newName = makeRandomName();
    STATE.boughtDivers++;

    const id = STATE.boughtDivers;
    const newDiver = new Diver(id, newName);
    DIVERS[id] = newDiver;
    addFloodLine(`${newDiver.name} has joined your Diving team!`);

    newDiver.startDive(chooseDiverFloor());
    updateSandRate();
}

// The price follows how many divers are alive, so losing divers makes hiring cheaper again
export function hireCost() {
    const alive = Object.keys(DIVERS).length;
    return Math.floor(BALANCE.hireBaseCost * BALANCE.hireGrowth ** alive);
}

// A lost diver leaves the team, and goes on the fallen list
export function loseDiver(diver) {
    delete DIVERS[diver.id];

    STATE.fallen.push({
        id: diver.id,
        name: diver.name,
        floor: diver.floor,
        location: diver.location,
        trips: diver.totalTrips,
        earned: diver.dollarsEarned,
    });
    if (STATE.fallen.length > BALANCE.fallenLimit) {
        STATE.fallen.shift();   // forget the oldest
    }

    addFloodLine({ before: `${diver.name} was lost at ${diver.location} (floor ${diver.floor}).`, cls: "red" });
    updateSandRate();
}

// A random first and last name; about 1 in 20 also gets a nickname: Mira "Gills" Okafor
function makeRandomName() {
    const first = pick(FIRST_NAMES);
    const last = pick(LAST_NAMES);

    if (Math.random() < BALANCE.nicknameChance) {
        return `${first} "${pick(NICKNAMES)}" ${last}`;
    }
    return `${first} ${last}`;
}

// One random item from a list
function pick(list) {
    return list.at(randInt(0, list.length - 1));
}