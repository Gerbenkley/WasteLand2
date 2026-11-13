import { STATE, DIVERS, BALANCE } from './data.js';
import {
    initialize, renderUI, clearLog, addTypedLine, disableButtons, enableButtons,
    floorMinus, floorPlus, addReturnLine, showReturnGroup, buyUpgrade, buyStat, setRisk, survivalChance, addSandDollars, logbox
} from './functions.js';
import { hireDiver, chooseDiverFloor, loseDiver } from './diver.js';
import { pickLocation, selectLocation } from './dive.js';

// For testing in the browser console: modules hide their variables,
// so these lines put a few back on window, where the console can see them.
window.STATE = STATE;
window.DIVERS = DIVERS;
window.hireDiver = hireDiver;

initialize();


async function dive() {
    clearLog(logbox);
    disableButtons();
    await addTypedLine(logbox, "You prepare for your dive...", 35);

    const locationKey = await pickLocation();
    await selectLocation(locationKey);

    enableButtons();
    renderUI();
}

//ONE ROUND OF THE GAME, once per screen frame
function gameLoop() {
    const timeNow = Date.now();
    const returned = [];   // everyone who came back this frame

    for (const diver of Object.values(DIVERS)) {
        if (diver.returnsAt == null) {
            continue;
        }
        if (diver.returnsAt > timeNow) {
            continue;
        }

        // Roll this trip's survival: a lost diver brings nothing back
        if (Math.random() >= survivalChance(BALANCE.diverPower, diver.floor)) {
            loseDiver(diver);
            continue;
        }

        const lootDollars = diver.getLoot();
        addSandDollars(lootDollars);
        diver.returnFromTrip();
        returned.push({
            id: diver.id,
            name: diver.name,
            loot: lootDollars,
            floor: diver.floor,
            location: diver.location,
        });

        diver.startDive(chooseDiverFloor());
    }

    if (returned.length > 0) {
        addReturnLine(returned);
    }

    renderUI();
}

//THE LOOP: requestAnimationFrame runs frame() right before the screen draws.
// frame() does one round, then asks for the next frame.
let loopId = null;

function frame() {
    gameLoop();
    loopId = requestAnimationFrame(frame);
}

function startLoop() {
    if (loopId === null) {
        loopId = requestAnimationFrame(frame);
    }
}

function stopLoop() {
    cancelAnimationFrame(loopId);
    loopId = null;
}

startLoop();
window.startLoop = startLoop;   // type stopLoop() or startLoop() in the console
window.stopLoop = stopLoop;

//BUTTONS
// A lookup table: the data-action name of a button -> the function it runs.
// A new button only needs a data-action in the HTML and one line here.
const ACTIONS = {
    dive: dive,
    floorMinus: floorMinus,
    floorPlus: floorPlus,
    hire: hireDiver,
    buyStat: buyStat,
    setRisk: setRisk,
    buyUpgrade: buyUpgrade,
    showReturnGroup: showReturnGroup,
};

// One listener for the whole page (event delegation).
// closest() finds the button even when you click a <span> inside it.
document.addEventListener('click', event => {
    const button = event.target.closest('[data-action]');
    if (button === null) return;

    const action = ACTIONS[button.dataset.action];
    if (action === undefined) {
        console.log(`No function for data-action="${button.dataset.action}"`);
        return;
    }
    action(button);
});