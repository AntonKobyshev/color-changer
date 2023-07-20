const parentContainer = document.querySelector("body");

if (parentContainer) {
  for (let i = 0; i < 5; i++) {
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
