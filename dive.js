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
async function pickLocation() {
    const zone = getCurrentZone();
    const locations = pickRandomLocations(3);

    await addTypedLine(logbox, "Which path do you want to take?", 15);

    return new Promise(resolve => {
        locations.forEach(locationKey => {
            addChoice(logbox, zone.locations[locationKey].name, () => {
                resolve(locationKey);
            });
        });
    });
}

//DESCRIPTION OF CHOSEN LOCATION
async function showLocation(location) {
    await addTypedLine(logbox, location.description, 20);
    await addTypedLine(logbox, `It takes [purple]${STATE.floorSelected} seconds[/purple] to scavenge.`, 20);

    await addTypedLine(logbox, "\nLoot contains:", 20);

    for (const [loot, amount] of Object.entries(location.loot)) {
        await addTypedLine(logbox, `[blue]${loot}[/blue] x[green]${amount}[/green]`, 10);
    }
}

//SELECT CHOSEN LOCATION
async function selectLocation(locationKey) {
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
    await addTypedLine(logbox, "\nDo you want to go in?", 20);

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

    await addTypedLine(logbox, "You go inside...", 20);
    await addTypedLine(logbox, "[bold red]. . .[/bold red]", 100);

    await collectLoot(location.loot, 5);
    await collectRewards(10, 10);
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
    STATE.sandDollars += sandDollars;
    STATE.totalXP += xp;

    await addTypedLine(logbox, `You also gained [bold yellow]${sandDollars} Sand Dollars[/bold yellow]!`, 20);
    await addTypedLine(logbox, `You also gained [bold yellow]${xp} XP[/bold yellow].`, 20);
}