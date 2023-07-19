const parentContainer = document.querySelector("body");

if (parentContainer) {
  for (let i = 0; i < 7; i++) {
    const div = document.createElement("div");
    div.classList.add("column");

    const h2 = document.createElement("h2");
    h2.setAttribute("data-type", "copy");
    h2.textContent = "Text";

    const button = document.createElement("button");
    const icon = document.createElement("i");
    icon.classList.add("fa-solid", "fa-lock-open");
    icon.setAttribute("data-type", "lock");
    button.appendChild(icon);
    button.setAttribute("data-type", "lock");

    div.appendChild(h2);
    div.appendChild(button);

    parentContainer.appendChild(div);
  }
}

const columns = document.querySelectorAll(".column");

document.addEventListener("keydown", (event) => {
  if (event.code.toLowerCase() === "space") {
    setRandomColours();
  }
});

const generateColorBtn = document.querySelector(".generate-color");

generateColorBtn.addEventListener("click", () => {
  setRandomColours();
});

document.addEventListener("click", (event) => {
  const type = event.target.dataset.type;

  if (type === "lock") {
    const node =
      event.target.tagName.toLowerCase() === "i"
        ? event.target
        : event.target.children[0];

    node.classList.toggle("fa-lock-open");
    node.classList.toggle("fa-lock");
  } else if (type === "copy") {
    copyToClickboard(event.target.textContent);
  }
});


function copyToClickboard(text) {
  return navigator.clipboard.writeText(text);
}

function setRandomColours(isInitial) {
  const colors = isInitial ? getColorsFromHash() : [];
  columns.forEach((column, index) => {
    const isLocked = column.querySelector("i").classList.contains("fa-lock");
    const name = column.querySelector("h2");
    const button = column.querySelector("button");

    if (isLocked) {
      colors.push(name.textContent);
      return;
    }

    const color = isInitial
      ? colors[index]
        ? colors[index]
        : chroma.random()
      : chroma.random();

    if (!isInitial) {
      colors.push(color);
    }

    name.textContent = color;
    column.style.background = color;

    setNameColor(name, color);
    setNameColor(button, color);
  });
  updateColorsHash(colors);
}

function setNameColor(name, color) {
  const luminance = chroma(color).luminance();
  name.style.color = luminance > 0.5 ? "black" : "white";
}

function updateColorsHash(colors = []) {
  document.location.hash = colors
    .map((column) => column.toString().substring(1))
    .join("-");
}

function getColorsFromHash() {
  if (document.location.hash.length > 1) {
    return document.location.hash
      .substring(1)
      .split("-")
      .map((color) => "#" + color);
  }
  return [];
}

setRandomColours(true);
