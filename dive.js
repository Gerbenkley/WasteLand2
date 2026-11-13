import { STATE, BALANCE } from './data.js';
import {
    addTypedLine, clearLog, getCurrentZone, logbox, formatNumber,
    survivalChance, captainPower, lootValue, randBetween, levelFromXP,
    addSandDollars, spendSandDollars, updateSandRate, strengthBonus, intelligenceBonus
} from './functions.js';

//ADD CHOICE TO BOX
function addChoice(container, text, callback) {
    const choice = document.createElement('a');

    choice.textContent = "> " + text;
    choice.className = "choice";
    choice.href = "#";

    choice.addEventListener('click', function(event) {
        event.preventDefault();
        callback();
    });

    container.appendChild(choice);
    return choice;   // so the caller can add more to it, like a hover box
}

//CHOOSE AMOUNT OF RANDOM LOCATIONS
function pickRandomLocations(amount) {
    const zone = getCurrentZone();

    const locations = Object.keys(zone.locations).filter(locationKey => {
        return STATE.floorSelected >= zone.locations[locationKey].unlockFloor;
    });

    const shuffled = [...locations];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled.slice(0, amount);
}

//SHOW 3 RANDOM LOCATIONS
export async function pickLocation() {
    const zone = getCurrentZone();
    const locations = pickRandomLocations(3);

    await addTypedLine(logbox, "[bold]Which path do you want to take?[/bold]", 15);

    return new Promise(resolve => {
        locations.forEach(locationKey => {
            const location = zone.locations[locationKey];
            const choice = addChoice(logbox, location.name, () => {
                resolve(locationKey);
            });

            // The hover box: scavenge time and loot, one per line
            const lootLines = Object.entries(location.loot).map(([loot, amount]) => `${loot} x${amount}`);
            choice.dataset.tipName = location.name;
            choice.dataset.tipText = `Scavenge time: ${STATE.floorSelected} seconds\n\nLoot:\n${lootLines.join("\n")}`;
        });
    });
}

//DESCRIPTION OF CHOSEN LOCATION (time and loot are in the hover box)
async function showLocation(location) {
    await addTypedLine(logbox, location.description, 20);
}

//SELECT CHOSEN LOCATION
export async function selectLocation(locationKey) {
    clearLog(logbox);
    const zone = getCurrentZone();
    const location = zone.locations[locationKey];

    await showLocation(location);

    const confirmed = await confirmEntry();

    if (confirmed) {
        await enterLocation(locationKey);
    } else {
        clearLog(logbox);
        await addTypedLine(logbox, "You [red]dismantle[/red] your gear, readying yourself for the next adventure.", 10);
    }
}

//DO YOU WANT TO GO IN?
async function confirmEntry() {
    await addTypedLine(logbox, "\n[bold]Do you want to go in?[/bold]", 20);

    return new Promise(resolve => {
        addChoice(logbox, "Yes", () => {
            resolve(true);
        });

        addChoice(logbox, "Not really...", () => {
            resolve(false);
        });
    });
}

//ENTER LOCATION
async function enterLocation(locationKey) {
    clearLog(logbox);
    const zone = getCurrentZone();
    const location = zone.locations[locationKey];

    const floor = STATE.floorSelected;

    await addTypedLine(logbox, "You go inside...", 20);
    await addTypedLine(logbox, `Scavenging [blue]${location.name}[/blue]...`, 20);
    await scavenge(floor);   // floor 3 = 3 seconds, like the hover box says
    await addTypedLine(logbox, "[bold red]. . .[/bold red]", 100);

    // Roll the survival chance shown under the Dive button
    if (Math.random() >= survivalChance(captainPower(), floor)) {
        await captainLost();
        return;
    }

    await collectLoot(location.loot, 5);

    const dollars = Math.round(lootValue(floor) * BALANCE.captainLootMultiplier * strengthBonus() * randBetween(0.8, 1.2));
    const xp = Math.round(floor ** 2 * intelligenceBonus());
    await collectRewards(dollars, xp);
    await chartFloor();
}

//SCAVENGE: a text progress bar in the log that fills up over `seconds`
// It checks the clock (Date.now) instead of counting ticks, so it ends on time
// even when the browser slows down a hidden tab.
async function scavenge(seconds) {
    const line = document.createElement('div');
    logbox.appendChild(line);

    const width = 20;   // how many blocks the bar has
    const endsAt = Date.now() + seconds * 1000;

    while (true) {
        const msLeft = Math.max(0, endsAt - Date.now());
        const done = 1 - msLeft / (seconds * 1000);   // 0 at the start, 1 at the end
        const filled = Math.round(done * width);

        const bar = "█".repeat(filled) + "░".repeat(width - filled);
        const timeLeft = msLeft > 0 ? `  ${Math.ceil(msLeft / 1000)}s left` : "";
        line.textContent = `[${bar}] ${Math.round(done * 100)}%${timeLeft}`;

        if (msLeft === 0) {
            return;
        }
        // Wait for the next screen frame (about 60 times a second), then redraw
        await new Promise(resolve => requestAnimationFrame(resolve));
    }
}

//LOST: no loot, no XP, no charting, and 10% of your sand dollars gone
async function captainLost() {
    const lost = Math.floor(STATE.sandDollars * BALANCE.captainDeathLoss);
    spendSandDollars(lost);

    await addTypedLine(logbox, "[bold red]You were lost in the dark.[/bold red]", 30);
    await addTypedLine(logbox, `A rescue team brought you back, but it cost [red]${formatNumber(lost)} sand dollars[/red].`, 15);
}

//CHART A NEW FLOOR: surviving a dive deeper than ever lets divers follow
async function chartFloor() {
    if (STATE.floorSelected <= STATE.floorRecord) {
        return;
    }
    STATE.floorRecord = STATE.floorSelected;
    updateSandRate();   // divers can now go deeper, so they earn more per trip
    await addTypedLine(logbox, `[green]New depth charted.[/green] Your divers can now follow you down to floor [purple]${STATE.floorRecord}[/purple].`, 15);
}

//GET LOOT
async function collectLoot(lootTable, lootAmount) {
    const found = [];

    const items = Object.keys(lootTable);
    const weights = Object.values(lootTable);

    // Pick random items based on their weights
    for (let i = 0; i < lootAmount; i++) {
        const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
        let random = Math.random() * totalWeight;

        for (let j = 0; j < items.length; j++) {
            random -= weights[j];

            if (random < 0) {
                found.push(items[j]);
                break;
            }
        }
    }

    // Count how often each item was found
    const summary = {};

    for (const item of found) {
        summary[item] = (summary[item] || 0) + 1;
    }

    // Add loot to inventory and display results
    for (const [item, amount] of Object.entries(summary)) {
        STATE.inventory[item] = (STATE.inventory[item] || 0) + amount;
        await addTypedLine(logbox, `You gained: [blue]${item}[/blue] x[green]${amount}[/green]`, 15);
    }
}

//GET DOLLARS AND XP
async function collectRewards(sandDollars, xp) {
    addSandDollars(sandDollars);
    STATE.totalXP += xp;

    await addTypedLine(logbox, `You also gained [bold yellow]${formatNumber(sandDollars)} Sand Dollars[/bold yellow]!`, 20);
    await addTypedLine(logbox, `You also gained [bold yellow]${formatNumber(xp)} XP[/bold yellow].`, 20);

    // Enough XP for a new level? (Several at once is possible after a deep dive.)
    const newLevel = levelFromXP(STATE.totalXP);
    if (newLevel > STATE.captainLevel) {
        STATE.captainLevel = newLevel;
        await addTypedLine(logbox, `[bold green]Level up![/bold green] You are now level ${newLevel}.`, 20);
    }
}