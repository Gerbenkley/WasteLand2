import { STATE, DIVERS, NATURES } from './data.js';
import { formatNumber, markup } from './functions.js';

// Which diver's card is open. This is about the screen, not the game,
// so it isn't in STATE and doesn't need saving.
let openId = null;

// Clicking a name: data-diver on the button holds the diver's ID
export function showDiver(button) {
    openId = Number(button.dataset.diver);
    document.getElementById("diverCard").hidden = false;
    updateDiverCard();

    // A freshly opened card starts at the newest line
    const log = document.getElementById("cardLog");
    log.scrollTop = log.scrollHeight;
}

export function closeCard() {
    openId = null;
    document.getElementById("diverCard").hidden = true;
}

// Fill the card. Called once per frame while it's open, so it stays live.
export function updateDiverCard() {
    if (openId === null) {
        return;
    }

    // A living diver, or a lost one from the fallen list
    const living = DIVERS[openId];
    const diver = living || STATE.fallen.find(f => f.id === openId);

    const name = document.getElementById("cardName");
    const status = document.getElementById("cardStatus");
    const stats = document.getElementById("cardStats");
    const log = document.getElementById("cardLog");

    if (!diver) {
        name.textContent = "Unknown diver";
        status.textContent = "This diver is no longer in the records.";
        status.className = "muted";
        stats.replaceChildren();
        log.replaceChildren();
        return;
    }

    name.textContent = diver.name;

    if (living) {
        const seconds = Math.max(0, Math.ceil((living.returnsAt - Date.now()) / 1000));
        status.replaceChildren(...markup(`Diving at [blue]${living.location}[/blue] (floor [purple]${living.floor}[/purple]), back in ${seconds}s.`));
        status.className = "muted";
    } else {
        status.replaceChildren(...markup(`[red]Lost[/red] at [blue]${diver.location}[/blue] (floor [purple]${diver.floor}[/purple]).`));
        status.className = "muted";
    }

    // Two columns: label, value
    stats.replaceChildren(
        ...statRow("Diver", `#${diver.id}`),
        ...statRow("Nature", NATURES[diver.nature].label),
        ...statRow("Trips", formatNumber(diver.totalTrips)),
        ...statRow("Earned", `[yellow]${formatNumber(diver.dollarsEarned)} sand dollars[/yellow]`),
        ...statRow("Deepest", diver.deepestFloor > 0 ? `floor [purple]${diver.deepestFloor}[/purple]` : "none yet"),
    );

    // Newest line at the bottom, like the Flood.
    // Stay at the bottom if the reader was there; leave the scroll alone if they scrolled up.
    const atBottom = log.scrollHeight - log.scrollTop - log.clientHeight < 10;

    log.replaceChildren(...diver.log.map(text => {
        const line = document.createElement("div");
        line.append(...markup(text));
        return line;
    }));

    if (atBottom) {
        log.scrollTop = log.scrollHeight;
    }
}

// One label and one value, as two grid cells
function statRow(label, value) {
    const left = document.createElement("span");
    left.className = "muted";
    left.textContent = label;
    const right = document.createElement("span");
    right.append(...markup(value));
    return [left, right];
}