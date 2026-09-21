const mainContainer = document.querySelector(".mainContainer");
const gridSizeSlider = document.getElementById("gridSizeSlider");
const gridSizeText = document.getElementById("gridSizeText");

let mouseIsDown = false;
createGrid(gridSizeSlider.value);
gridSizeText.textContent = `${gridSizeSlider.value} x ${gridSizeSlider.value}`;
gridSizeSlider.addEventListener("input", (event) => {
  createGrid(event.target.value);
  gridSizeText.textContent = `${gridSizeSlider.value} x ${gridSizeSlider.value}`;
});
function createGrid(gridSize) {
  mainContainer.replaceChildren();
  for (let i = 0; i < gridSize; i++) {
    let newDiv = document.createElement("div");
    newDiv.classList.add("parentDiv");
    for (let j = 0; j < gridSize; j++) {
      let babyDiv = document.createElement("div");
      babyDiv.dataset.hovered = "false";
      babyDiv.classList.add("childDiv");
      newDiv.appendChild(babyDiv);
    }
    mainContainer.appendChild(newDiv);
  }
}

mainContainer.addEventListener("mouseover", (event) => {
  let target = event.target;
  if (!target.classList.contains("childDiv")) return;
  if (target.dataset.hovered === "true") return;
  if (mouseIsDown) {
    target.style.setProperty("background-color", "black");
    let currentOpacity = parseFloat(target.style.opacity) || 0;

    if (currentOpacity < 1) {
      currentOpacity += 0.1;
      target.style.opacity = currentOpacity;
    }

    if (currentOpacity >= 1) {
      target.dataset.hovered = "true";
    }
  }
});

mainContainer.addEventListener("mousedown", (event) => {
  mouseIsDown = true;
});

window.addEventListener("mouseup", (event) => {
  mouseIsDown = false;
});
