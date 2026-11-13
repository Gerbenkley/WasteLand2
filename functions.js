import { STATE, DIVERS, BALANCE, UPGRADES } from './data.js';
import { LOCATIONS } from './locations.js';
import { hireCost } from './diver.js';

// The Expedition log, shared with dive.js and game.js
export const logbox = document.getElementById('logbox');

//INIT
export function initialize() {
    buildUpgradeTiles();
    STATE.floorSelectedName = getCurrentZone().name;
    updateSandRate();
    renderUI();
    document.body.hidden = false;
}

//CLEAR LOG
export function clearLog(log) {
    log.innerHTML = "";
}

//TYPEWRITER
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function parseMarkup(text) {
  const parts = [];
  const openStyles = [];     

  console.log(text)
  const pieces = text.split(/(\[\/?[a-z ]+\])/);
 
  for (const piece of pieces) {

    const tag = piece.match(/^\[(\/?)([a-z ]+)\]$/);
 
    if (tag === null) {
      if (piece !== '') {
        parts.push({ text: piece, cls: openStyles.join(' ') });
      }
    } else if (tag[1] === '/') {
      openStyles.pop();
    } else {
      openStyles.push(tag[2]);
    }
  }
  return parts;
}
async function typeLine(container, parts, delay) {
  const line = document.createElement('div');
  container.appendChild(line);
 
  for (const part of parts) {
    const span = document.createElement('span');
    if (part.cls !== '') span.className = part.cls;
    line.appendChild(span);
 
    if (delay === 0) {
      span.textContent = part.text;
    } else {
      for (const letter of part.text) {
        span.textContent += letter;
        container.scrollTop = container.scrollHeight;
        await sleep(delay);
      }
    }
  }
  container.scrollTop = container.scrollHeight;
}
const waitingLines = [];
let isTyping = false;
async function typeWaitingLines() {
  if (isTyping) return;
  isTyping = true;
 
  while (waitingLines.length > 0) {
    const next = waitingLines.shift();
    const delay = document.hidden ? 0 : next.delay;
    await typeLine(next.container, next.parts, delay);
  }
 
  isTyping = false;
}
export async function addTypedLine(container, text, delay = 3) {
    waitingLines.push({
        container: container,
        parts: parseMarkup(text),
        delay: delay
    });

    await typeWaitingLines();
}

//TAB BUTTONS
const tabButtons = document.querySelectorAll('.tab');
const tabPages = document.querySelectorAll('.tabpage');
function showTab(name) {
  for (const page of tabPages) {
    page.hidden = page.id !== 'tab-' + name;
  }
  for (const button of tabButtons) {
    button.classList.toggle('on', button.dataset.tab === name);
  }
}
for (const button of tabButtons) {
  button.addEventListener('click', () => showTab(button.dataset.tab));
}

//FLOOR + AND -
function checkFloorButtons() {
    if (STATE.floorSelected === 1) {
        document.getElementById('floorMinus').classList.add('invisible');
    } else {
        document.getElementById('floorMinus').classList.remove('invisible');
    }
    if (STATE.floorSelected === STATE.floorBought) {
        document.getElementById('floorPlus').classList.add('invisible');
    } else {
        document.getElementById('floorPlus').classList.remove('invisible');
    }
}
export function floorMinus() {
    setFloor(STATE.floorSelected - 1);
}
export function floorPlus() {
    setFloor(STATE.floorSelected + 1);
}

// The one place the selected floor changes, so its zone name is only looked up then
function setFloor(floor) {
    STATE.floorSelected = floor;
    STATE.floorSelectedName = getCurrentZone().name;
    renderUI();
}


//MONEY: the only places that change sand dollars
export function addSandDollars(amount) {
    STATE.sandDollars += amount;
    STATE.sandDollarsEarned += amount;   // everything ever earned, never goes down
}

// Takes the money and returns true, or returns false if you can't afford it
export function spendSandDollars(amount) {
    if (STATE.sandDollars < amount) {
        return false;
    }
    STATE.sandDollars -= amount;
    return true;
}

// What your living divers bring in per second, on average.
// Per trip: average loot (times the chance of coming back) over average trip time,
// across the floors divers can choose. Call it when divers or depth change.
export function updateSandRate() {
    let loot = 0;
    let seconds = 0;
    for (let floor = 1; floor <= STATE.floorRecord; floor++) {
        loot += survivalChance(BALANCE.diverPower, floor) * lootValue(floor);
        seconds += tripSeconds(floor);
    }
    STATE.sandRate = (loot / seconds) * Object.keys(DIVERS).length;
}


//RANDOM INT
export function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// A random number between min and max, with decimals (for "plus or minus 10%")
export function randBetween(min, max) {
  return min + Math.random() * (max - min);
}


//FORMULAS: how depth changes a dive. The numbers live in BALANCE (data.js).
export function tripSeconds(floor) {
    return BALANCE.tripSecondsBase + BALANCE.tripSecondsPerFloor * floor;
}

export function lootValue(floor) {
    return BALANCE.lootBase * BALANCE.lootGrowth ** (floor - 1);
}

export function danger(floor) {
    return BALANCE.dangerBase * BALANCE.dangerGrowth ** (floor - 1);
}

// Power against danger: equal power and danger = 50%, more power = closer to 100%
export function survivalChance(power, floor) {
    const k = BALANCE.survivalSharpness;
    return power ** k / (power ** k + danger(floor) ** k);
}

// Total XP needed to reach a level: 500 for level 2, 1,500 for level 3, 3,000 for level 4...
export function xpForLevel(level) {
    return BALANCE.xpStepPerLevel * (level - 1) * level / 2;
}

// The level that a total amount of XP gives
export function levelFromXP(totalXP) {
    let level = 1;
    while (totalXP >= xpForLevel(level + 1)) {
        level++;
    }
    return level;
}

// The captain's power: from level, plus Agility
export function captainPower() {
    return BALANCE.captainBasePower
        + BALANCE.captainPowerPerLevel * (STATE.captainLevel - 1)
        + BALANCE.powerPerAgility * (STATE.agility - 1);
}

// A random location on this floor, from the ones unlocked at this depth
export function randomLocationOnFloor(floor) {
    const zone = LOCATIONS[getZoneKey(floor)];
    const open = Object.values(zone.locations).filter(location => location.unlockFloor <= floor);
    return open.at(randInt(0, open.length - 1));
}

//NAME OF CURRENT ZONE
export function getCurrentZone() {
    return Object.values(LOCATIONS).find(zone =>
        STATE.floorSelected >= zone.floorRange[0] &&
        STATE.floorSelected <= zone.floorRange[1]
    );
}

export function getZoneKey(floor) {
    return Object.keys(LOCATIONS).find(zoneKey => {
        const [min, max] = LOCATIONS[zoneKey].floorRange;
        return floor >= min && floor <= max;
    });
}

//DISABLE/ENABLE BUTTONS
export function disableButtons() {
    document.getElementById('dive-button').disabled = true;
    document.getElementById('floorMinus').disabled = true;
    document.getElementById('floorPlus').disabled = true;
}
export function enableButtons() {
    document.getElementById('dive-button').disabled = false;
    document.getElementById('floorMinus').disabled = false;
    document.getElementById('floorPlus').disabled = false;
}

//NUMBER FORMATTING: every number that reaches the screen goes through here
const plainFormat = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 });
const compactFormat = new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 2 });
const BIG_SUFFIXES = ["Qa", "Qi", "Sx", "Sp", "Oc", "No", "Dc"];   // 10^15, 10^18 ... 10^33

export function formatNumber(n) {
    if (!Number.isFinite(n)) return "∞";

    // Up to 99,999: the whole number, with commas
    if (Math.abs(n) < 100000) return plainFormat.format(n);

    // 100K up to the trillions: the browser shortens it (1.5M, 3.2B, 4.75T).
    // 999.995T would round to "1000T", so from there on we take over.
    if (Math.abs(n) < 999.995e12) return compactFormat.format(n);

    // Beyond trillions: our own suffixes, one step per factor 1,000.
    // We compare the ROUNDED value, so 999.999 becomes 1 of the next suffix, not 1000.
    let value = n / 1e15;
    let step = 0;
    while (Math.abs(Number(value.toFixed(2))) >= 1000 && step < BIG_SUFFIXES.length - 1) {
        value /= 1000;
        step++;
    }
    if (Math.abs(Number(value.toFixed(2))) >= 1000) return n.toExponential(2);   // past 10^36

    return `${Number(value.toFixed(2))}${BIG_SUFFIXES.at(step)}`;
}


//RENDER ALL VARIABLES TO SCREEN
export function renderUI() {

    // Values that are calculated, not stored, can be shown with data-state too
    const shown = {
        ...STATE,
        diverCount: Object.keys(DIVERS).length,
        survivalRate: Math.round(survivalChance(captainPower(), STATE.floorSelected) * 1000) / 10,
        nextLevelXP: xpForLevel(STATE.captainLevel + 1),
    };
    document.querySelectorAll("[data-state]").forEach(element => {
        const value = shown[element.dataset.state];
        element.textContent = typeof value === "number" ? formatNumber(value) : value;
    });
    checkFloorButtons();

    document.title = `Abyss - ${formatNumber(STATE.sandDollars)}`;
    document.getElementById("hireCost").textContent = formatNumber(hireCost());
    // Risk dial: the button for the current setting is lit
    for (const button of document.querySelectorAll('[data-action="setRisk"]')) {
        button.classList.toggle('on', button.dataset.risk === STATE.riskSetting);
    }

    // Stat buttons: hover shows the price
    for (const button of document.querySelectorAll('[data-action="buyStat"]')) {
        button.title = `Costs ${formatNumber(statCost(button.dataset.stat))} pearls`;
    }

    updateUpgradeTiles();
}


//UPGRADE TILES: built once from UPGRADES (data.js), updated on every render
function buildUpgradeTiles() {
    const tiles = document.getElementById('tiles');
    const template = document.getElementById('tileTemplate');

    for (const upgrade of UPGRADES) {
        const tile = template.content.firstElementChild.cloneNode(true);
        tile.dataset.upgrade = upgrade.key;
        tiles.appendChild(tile);
    }
}

function updateUpgradeTiles() {
    for (const tile of document.querySelectorAll('#tiles .tile')) {
        const upgrade = UPGRADES.find(u => u.key === tile.dataset.upgrade);
        const owned = STATE.upgradesOwned.includes(upgrade.key);
        const locked = STATE.floorRecord < upgrade.unlockFloor;

        tile.hidden = owned;      // bought upgrades leave the grid
        tile.disabled = locked;
        tile.querySelector('.tileName').textContent = locked ? '?' : upgrade.name;
        tile.querySelector('.tileCost').textContent = locked ? 'locked' : formatNumber(upgrade.cost);
        tile.title = locked
            ? `Reach floor ${upgrade.unlockFloor} to unlock`
            : `${upgrade.description}. Costs ${formatNumber(upgrade.cost)} sand dollars.`;
    }
}

export function buyUpgrade(button) {
    const upgrade = UPGRADES.find(u => u.key === button.dataset.upgrade);
    if (!spendSandDollars(upgrade.cost)) {
        console.log(`Not enough sand dollars for the ${upgrade.name}.`);
        return;
    }
    STATE.upgradesOwned.push(upgrade.key);

    if (upgrade.addsFloor) {
        STATE.floorBought++;
    }
    renderUI();
}


//STATS: bought with pearls
export function statCost(stat) {
    return Math.floor(BALANCE.statBaseCost * BALANCE.statGrowth ** (STATE[stat] - 1));
}

export function buyStat(button) {
    const stat = button.dataset.stat;      // "strength", "agility" or "intelligence"
    const cost = statCost(stat);
    const pearls = STATE.inventory.Pearls || 0;

    if (pearls < cost) {
        console.log(`You need ${cost} pearls for ${stat}.`);
        return;
    }
    STATE.inventory.Pearls = pearls - cost;
    STATE[stat]++;
    renderUI();
}


//RISK DIAL
export function setRisk(button) {
    STATE.riskSetting = button.dataset.risk;
    renderUI();
}






//THE FLOOD
let floodFrozen = false;
let floodWaiting = [];

// Groups of divers that returned in the same frame, by group number.
// A group is forgotten when its line leaves the Flood.
const returnGroups = new Map();
let nextGroupId = 1;

// A Flood line is either plain text, or an object:
// { before: "Mira Vance returned", group: [...], after: " with 1,208 sand dollars." }
export function addFloodLine(entry) {
    if (typeof entry === "string") {
        entry = { before: entry };
    }
    if (floodFrozen) {
        floodWaiting.push(entry);
        if (floodWaiting.length > 100) {
            floodWaiting.shift();
        }
        return;
    }
    writeFloodLine(entry);
}

// All divers that came back in one frame become one line
export function addReturnLine(returned) {
    const first = returned[0];

    if (returned.length === 1) {
        addFloodLine(`${first.name} returned from ${first.location} (floor ${first.floor}) with ${formatNumber(first.loot)} sand dollars.`);
        return;
    }

    const total = returned.reduce((sum, r) => sum + r.loot, 0);
    addFloodLine({
        before: `${first.name} returned `,
        group: returned,
        after: ` with ${formatNumber(total)} sand dollars.`,
    });
}

function writeFloodLine(entry) {
    const box = document.getElementById("floodbox");

    // Is the reader at the bottom? (A few pixels of slack.)
    const atBottom = box.scrollHeight - box.scrollTop - box.clientHeight < 10;

    const line = document.createElement("div");
    if (entry.cls) {
        line.className = entry.cls;   // for example "red" for a lost diver
    }
    line.append(entry.before);

    if (entry.group) {
        const id = String(nextGroupId++);
        returnGroups.set(id, entry.group);
        line.dataset.group = id;

        const button = document.createElement("button");
        button.className = "name";
        button.dataset.action = "showReturnGroup";
        const others = entry.group.length - 1;
        button.textContent = `(+${others} ${others === 1 ? "diver" : "divers"})`;
        line.append(button, entry.after);
    }

    box.appendChild(line);

    if (box.children.length > 100) {
        const before = box.scrollHeight;
        const oldest = box.firstElementChild;
        returnGroups.delete(oldest.dataset.group);
        oldest.remove();
        const removed = before - box.scrollHeight;

        if (!atBottom) {
            box.scrollTop -= removed;
        }
    }

    if (atBottom) {
        box.scrollTop = box.scrollHeight;
    }
}

const floodbox = document.getElementById("floodbox");

floodbox.addEventListener("mouseenter", () => {
    floodFrozen = true;
});

floodbox.addEventListener("mouseleave", () => {
    floodFrozen = false;
    for (const entry of floodWaiting) {
        writeFloodLine(entry);
    }
    floodWaiting = [];
});

// Clicking "(+316 divers)" opens the list of who came back; clicking again closes it
export function showReturnGroup(button) {
    const line = button.parentElement;
    const open = line.querySelector(".groupList");
    if (open) {
        open.remove();
        return;
    }

    const list = document.createElement("div");
    list.className = "groupList";
    for (const r of returnGroups.get(line.dataset.group)) {
        const row = document.createElement("div");
        row.textContent = `${r.name}, floor ${r.floor}, ${r.location}: +${formatNumber(r.loot)}`;
        list.appendChild(row);
    }
    line.appendChild(list);
    list.scrollIntoView({ block: "nearest" });   // make sure the opened list is visible
}