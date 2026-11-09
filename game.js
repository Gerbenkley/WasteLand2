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

function gameLoop() {
    const timeNow = Date.now();

    for (const diver of Object.values(DIVERS)) {
        if (diver.returnsAt == null) {
            continue;
        }
        if (diver.returnsAt > timeNow) {
            continue;
        }
        
        STATE.sandDollars += diver.getLoot(1);
        diver.addTrip();

        diver.startDive(1500);
    }

    renderUI();
}

const loop = setInterval(gameLoop, 100);

//BUTTONS
document.getElementById('dive-button').addEventListener('click', dive);
document.getElementById('floorMinus').addEventListener('click', floorMinus);
document.getElementById('floorPlus').addEventListener('click', floorPlus);
document.getElementById('testTile').addEventListener('click', () => hireDiver("Randomname"));
