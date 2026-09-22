const mainContainer = document.querySelector(".mainContainer");
const buttonsContainer = document.querySelector(".buttonsContainer");
const gridSizeSlider = document.getElementById("gridSizeSlider");
const gridSizeText = document.getElementById("gridSizeText");
const clearCanvasButton = document.getElementById("clearCanvasButton");
const WHITE = "rgb(255, 255, 252)";
const PALE_LAVENDER = "rgb(255, 198, 255)";
const parentClassIdentifier = "parentDiv";
const childClassIdentifier = "childDiv";

const colorPalette = [
  "#FFADAD",
  "#FFD6A5",
  "#FDFFB6",
  "#CAFFBF",
  "#9BF6FF",
  "#A0C4FF",
  "#BDB2FF",
  PALE_LAVENDER,
  WHITE,
];

let mouseIsDown = false;
let currentColor = "#FFC6FF";

for (let i = 0; i < 3; i++) {
  let newDiv = document.createElement("div");
  newDiv.classList.add(parentClassIdentifier);
  newDiv.style.gap = "10px";
  for (let j = 0; j < 3; j++) {
    let babyDiv = document.createElement("div");
    babyDiv.classList.add(childClassIdentifier);
    const button = document.createElement("button");
    button.style.backgroundColor = colorPalette.pop();
    if (button.style.backgroundColor === PALE_LAVENDER)
      button.classList.add("selected");
    babyDiv.appendChild(button);
    newDiv.appendChild(babyDiv);
  }
  buttonsContainer.appendChild(newDiv);
}

createGrid(gridSizeSlider.value);
gridSizeText.textContent = `${gridSizeSlider.value} x ${gridSizeSlider.value}`;

clearCanvasButton.addEventListener("click", (event) => {
  createGrid(gridSizeSlider.value);
});

gridSizeSlider.addEventListener("input", (event) => {
  createGrid(event.target.value);
  gridSizeText.textContent = `${gridSizeSlider.value} x ${gridSizeSlider.value}`;
});

mainContainer.addEventListener("mousedown", (event) => {
  mouseIsDown = true;
});

window.addEventListener("mouseup", (event) => {
  mouseIsDown = false;
});

buttonsContainer.addEventListener("click", (event) => {
  if (event.target.tagName !== "BUTTON") {
    return;
  }

  let target = event.target;
  currentColor = target.style.backgroundColor;
  buttonsContainer.querySelector(".selected")?.classList.remove("selected");
  target.classList.add("selected");
});

mainContainer.addEventListener("mouseover", (event) => {
  let target = event.target;
  if (!target.classList.contains(childClassIdentifier)) return;
  if (mouseIsDown) {
    target.style.setProperty("background-color", currentColor);
    if (currentColor === WHITE) {
      target.style.opacity = 0;
      return;
    }

    let currentOpacity = parseFloat(target.style.opacity) || 0;
    currentOpacity += 0.2;
    target.style.opacity = currentOpacity;
  }
});

function createGrid(gridSize) {
  mainContainer.replaceChildren();
  for (let i = 0; i < gridSize; i++) {
    let newDiv = document.createElement("div");
    newDiv.classList.add(parentClassIdentifier);
    for (let j = 0; j < gridSize; j++) {
      let babyDiv = document.createElement("div");
      babyDiv.classList.add(childClassIdentifier);
      newDiv.appendChild(babyDiv);
    }
    mainContainer.appendChild(newDiv);
  }
}
