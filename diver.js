import { STATE, DIVERS, BALANCE, NATURES, FIRST_NAMES, LAST_NAMES, NICKNAMES } from './data.js';
import {
    randInt, randBetween, addFloodLine, tripSeconds, lootValue, randomLocationOnFloor,
    spendSandDollars, updateSandRate, formatNumber
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
        this.log = [];              // this diver's own story, newest last
        this.nature = rollNature(); // a key of NATURES: careful, steady, bold or reckless
    }

    // Add a line to this diver's story; only the last few are kept
    addLog(text) {
        this.log.push(text);
        if (this.log.length > BALANCE.diverLogLength) {
            this.log.shift();
        }
    }

    // Go to a floor: pick a location there, and work out when you're back.
    // startsAt is when the trip begins: now for a new diver, or the moment
    // the last trip ended, so no time is lost while the tab is hidden.
    startDive(floor, startsAt = Date.now()) {
        this.floor = floor;
        this.location = randomLocationOnFloor(floor).name;

        const seconds = tripSeconds(floor) * randBetween(0.9, 1.1);   // plus or minus 10%
        this.returnsAt = startsAt + seconds * 1000;
    }

    // What this dive brought back: deeper floors pay more
    getLoot() {
        const dollars = Math.round(lootValue(this.floor) * randBetween(0.8, 1.2));   // plus or minus 20%
        this.dollarsEarned += dollars;
        return dollars;
    }

    returnFromTrip(dollars) {
        this.totalTrips++;
        this.addLog(`Floor [purple]${this.floor}[/purple], [blue]${this.location}[/blue]: [yellow]+${formatNumber(dollars)} sand dollars[/yellow].`);

        if (this.floor > this.deepestFloor) {
            this.deepestFloor = this.floor;
            this.addLog(`[green]New personal depth:[/green] floor [purple]${this.floor}[/purple].`);
        }
    }
}

// Which floor a diver goes to next: any charted floor, leaning by their nature.
// Math.random() gives 0 to 1. Raising it to the power 1/lean pushes it
// towards 1 (deep) when lean is above 1, and towards 0 (shallow) when below 1.
export function chooseDiverFloor(diver) {
    const lean = NATURES[diver.nature].lean;
    const depth = Math.random() ** (1 / lean);
    return Math.min(STATE.floorRecord, 1 + Math.floor(depth * STATE.floorRecord));
}

// Pick a nature, using each one's chance
function rollNature() {
    let roll = Math.random();
    for (const [key, nature] of Object.entries(NATURES)) {
        roll -= nature.chance;
        if (roll < 0) {
            return key;
        }
    }
    return "steady";   // only if the chances add up to less than 1
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
    newDiver.addLog("[green]Joined the expedition.[/green]");
    addFloodLine({ diver: newDiver, before: " [green]has joined your Diving team![/green]" });

    newDiver.startDive(chooseDiverFloor(newDiver));
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
    diver.addLog(`[red]Lost[/red] at [blue]${diver.location}[/blue] (floor [purple]${diver.floor}[/purple]).`);

    // Same field names as a living diver, so the card can show either
    STATE.fallen.push({
        id: diver.id,
        name: diver.name,
        floor: diver.floor,
        location: diver.location,
        totalTrips: diver.totalTrips,
        dollarsEarned: diver.dollarsEarned,
        deepestFloor: diver.deepestFloor,
        nature: diver.nature,
        log: diver.log,
    });
    if (STATE.fallen.length > BALANCE.fallenLimit) {
        STATE.fallen.shift();   // forget the oldest
    }

    addFloodLine({ diver: diver, before: ` was lost at ${diver.location} (floor ${diver.floor}).`, cls: "red" });
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