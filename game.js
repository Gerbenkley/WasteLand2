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

//BUTTONS
document.getElementById('dive-button').addEventListener('click', dive);
document.getElementById('floorMinus').addEventListener('click', floorMinus);
document.getElementById('floorPlus').addEventListener('click', floorPlus);
