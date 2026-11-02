// Tabs: show one section, hide the others.
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


function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function getCurrentZone() {
    return ZONES.find(zone =>
        STATE.floorSelected >= zone.from &&
        STATE.floorSelected <= zone.to
    );
}