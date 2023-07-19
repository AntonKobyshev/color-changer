const parentContainer = document.querySelector('body');

if (parentContainer) {
  for (let i = 0; i < 7; i++) {
    const div = document.createElement('div');
    div.classList.add('column');

    const h2 = document.createElement('h2');
    h2.textContent = 'Text';

    const button = document.createElement('button');
    const icon = document.createElement('i');
    icon.classList.add('fa-solid', 'fa-lock');
    button.appendChild(icon);

    div.appendChild(h2);
    div.appendChild(button);

    parentContainer.appendChild(div);
  }
}


const columns = document.querySelectorAll(".column");

document.addEventListener('keydown', event => {
    if (event.code.toLowerCase() === 'space') {
        setRandomColours()
    }
})
// function generateRandomColor() {
//     const hexCodes = "01234567890ABCD";
//     let color = "";
//     for (let i = 0; i < 6; i++) {
//         color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
//     }
//     return "#" + color;
// }

function setRandomColours() {
    columns.forEach(column => {
        const name = column.querySelector("h2")
        const button = column.querySelector("button")
        const color = chroma.random()
        name.textContent = color
        column.style.background = color

        setNameColor(name, color)
        setNameColor(button, color)
    })
}

function setNameColor(name, color) {
    const luminance = chroma(color).luminance()
    name.style.color = luminance > 0.5 ? "black" : "white"
}

setRandomColours();