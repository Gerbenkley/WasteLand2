const STATE = {
    sandDollars: 0,
    sandRate: 0,
    floorSelected: 1,
    floorRecord: 1,
    floorSelectedName: "Twilight",
    survivalRate: 100,
}

function initialize() {
    STATE.floorSelectedName = getCurrentZone().name;

    document.querySelectorAll("[data-state]").forEach(element => {
        const property = element.dataset.state;
        element.textContent = STATE[property];
    });

    document.body.hidden = false;
}




function addLog(text) {
    const log = document.getElementById('logbox');
    const line = document.createElement('div');
    line.textContent = text;
    log.appendChild(line);
    log.scrollTop = log.scrollHeight;
}

function renderUI() {
    document.getElementById('sandDollars').textContent = STATE.sandDollars
}





function dive() {
    const currency = randInt(1, 10);
    STATE.sandDollars += currency;
    addLog("You found " + currency + " Sand Dollars.");
    renderUI();
}





initialize();
document.getElementById('dive-button').addEventListener('click', dive);
