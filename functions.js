//INIT
function initialize() {
    renderUI();
    document.body.hidden = false;
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
function floorMinus() {
    STATE.floorSelected--
    renderUI();
}
function floorPlus() {
    STATE.floorSelected++
    renderUI();
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

//RANDOM INT
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//NAME OF CURRENT ZONE
function getCurrentZone() {
    return ZONES.find(zone =>
        STATE.floorSelected >= zone.from &&
        STATE.floorSelected <= zone.to
    );
}

//CLEAR LOG
function clearLog(log) {
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
async function addTypedLine(container, text, delay = 3) {
    waitingLines.push({
        container: container,
        parts: parseMarkup(text),
        delay: delay
    });

    await typeWaitingLines();
}

//DISABLE/ENABLE BUTTONS
function disableButtons() {
    document.getElementById('dive-button').disabled = true;
    document.getElementById('floorMinus').disabled = true;
    document.getElementById('floorPlus').disabled = true;
}
function enableButtons() {
    document.getElementById('dive-button').disabled = false;
    document.getElementById('floorMinus').disabled = false;
    document.getElementById('floorPlus').disabled = false;
}

//RENDER ALL VARIABLES TO SCREEN
function renderUI() {
    STATE.floorSelectedName = getCurrentZone().name;
    document.querySelectorAll("[data-state]").forEach(element => {
        const property = element.dataset.state;
        element.textContent = STATE[property];
    });
    checkFloorButtons();
}