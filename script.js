const columns = document.querySelectorAll(".column");

document.addEventListener("keydown", (event) => {
  event.preventDefault();
  if (event.code.toLowerCase() === "space") {
    setRandomColours();
  }
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
  }
});

// function generateRandomColor() {
//     const hexCodes = "01234567890ABCD";
//     let color = "";
//     for (let i = 0; i < 6; i++) {
//         color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
//     }
//     return "#" + color;
// }

function copyToClickboard(text) {
  return navigator.clipboard, writeText(text);
}

function setRandomColours() {
  columns.forEach((column) => {
    const isLocked = column.querySelector("i").classList.contains("fa-lock");
    const name = column.querySelector("h2");
    const button = column.querySelector("button");
    const color = chroma.random();

    if (isLocked) {
      return;
    }
    name.textContent = color;
    column.style.background = color;

    setNameColor(name, color);
    setNameColor(button, color);
  });
}

function setNameColor(name, color) {
  const luminance = chroma(color).luminance();
  name.style.color = luminance > 0.5 ? "black" : "white";
}

setRandomColours();
