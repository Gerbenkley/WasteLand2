// Our own hover box, instead of the browser's title tooltip.
// Anything with data-tip-name gets one. It can also have data-tip-text and data-tip-price.
// Like the click listener in game.js, one listener serves the whole page.

const tip = document.getElementById("tooltip");
let target = null;   // the element the mouse is over right now, or null

// Copy the element's data-tip-... values into the box
function fillTip() {
    tip.querySelector(".tipName").textContent = target.dataset.tipName;
    tip.querySelector(".tipText").textContent = target.dataset.tipText || "";
    tip.querySelector(".tipPrice").textContent = target.dataset.tipPrice || "";
}

// Show the box when the mouse moves onto something with a tip, hide it when it leaves
document.addEventListener("mouseover", event => {
    const element = event.target.closest("[data-tip-name]");
    if (element === target) {
        return;   // still over the same thing (for example moving onto a span inside it)
    }
    target = element;
    if (target === null) {
        tip.hidden = true;
        return;
    }
    fillTip();
    tip.hidden = false;
});

// Follow the mouse: just below and to the right, flipped if it would leave the window
document.addEventListener("mousemove", event => {
    if (target === null) {
        return;
    }
    let left = event.clientX + 14;
    let y0 = event.clientY + 18;
    if (left + tip.offsetWidth > window.innerWidth - 8) {
        left = event.clientX - tip.offsetWidth - 14;
    }
    if (y0 + tip.offsetHeight > window.innerHeight - 8) {
        y0 = event.clientY - tip.offsetHeight - 14;
    }
    tip.style.left = `${left}px`;
    tip.style.top = `${y0}px`;
});

// Leaving the window hides it too
document.documentElement.addEventListener("mouseleave", () => {
    target = null;
    tip.hidden = true;
});

// Prices change while you hover (renderUI updates the data-tip values), so refresh every frame
export function refreshTooltip() {
    if (target === null) {
        return;
    }
    // The element was removed from the page (like a location choice after you click it)
    if (!target.isConnected) {
        target = null;
        tip.hidden = true;
        return;
    }
    fillTip();
}