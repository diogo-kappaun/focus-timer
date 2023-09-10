import * as sounds from "./focusTimer/sound.js";

const toggleModeBtn = document.getElementById("toggle-mode");
let darkMode = true;

toggleModeBtn.addEventListener("click", (event) => {
  sounds.buttonPress.play();
  document.documentElement.classList.toggle("light");

  const mode = darkMode ? "claro" : "escuro";
  event.currentTarget.querySelector(
    "span"
  ).textContent = `Modo ${mode} está ativado`;

  darkMode = !darkMode;
});
