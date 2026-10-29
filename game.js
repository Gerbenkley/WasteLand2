const state = { caps: 0, scrap: 0 };

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function addLog(text, kind) {
    const log = document.getElementById('log');
    const line = document.createElement('div');
    line.textContent = text;
    if (kind) line.className = kind;
    log.appendChild(line);
    log.scrollTop = log.scrollHeight;
}
function render() {
    document.getElementById('caps').textContent = state.caps;
    document.getElementById('scrap').textContent = state.scrap;
}

function scavenge() {
    const caps = randInt(1, 10);
    const scrap = randInt(0, 3);
    state.caps += caps;
    state.scrap += scrap;
    addLog('You found ' + caps + ' caps and ' + scrap + ' scrap.', 'good');
    render();
}

document.getElementById('scavenge-button').addEventListener('click', scavenge);
render();
