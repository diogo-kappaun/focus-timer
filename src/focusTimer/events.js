import * as actions from "./actions.js";
import * as el from "./elements.js";
import * as timer from "./timer.js";
import state from "./state.js";
import * as sounds from "./sound.js";

let oldCurrentActiveElementId;

export function registerControls() {
  el.controls.addEventListener("click", (event) => {
    const action = event.target.dataset.action;

    if (typeof actions[action] != "function") {
      return;
    }

    actions[action]();
  });
}

export function registerSounds() {
  el.soundsOptions.childNodes.forEach(element => {
    element.addEventListener("click", (event) => {
      const sound = event.target.dataset.action;
      actions.activeSounds(sound);
    });
  });
}

export function changeBackgroundButton() {
  el.soundsOptions.addEventListener("click", (event) => {
    const activeElementId = event.target.dataset.action;
    const currentActiveElement = document.querySelector(".selected");

    if (currentActiveElement != null) {
      currentActiveElement.classList.remove("selected");
    }

    if (oldCurrentActiveElementId == activeElementId) {
      event.target.classList.remove("selected");
      el.volumeRange.parentElement.classList.add('animate')

      setTimeout(() => {
        el.volumeRange.parentElement.classList.remove('control-on')
        el.volumeRange.parentElement.classList.remove('animate')
      }, 500)

      oldCurrentActiveElementId = null;
      return;
    }

    if (activeElementId != oldCurrentActiveElementId) {
      el.volumeRange.parentElement.classList.add('control-on')
      event.target.classList.add("selected");
      oldCurrentActiveElementId = activeElementId;
      return;
    }
  });
}

export function countdown() {
  clearTimeout(state.countdownId);

  if (!state.isRunning) {
    return;
  }

  let minutes = el.minutes.textContent;
  let seconds = el.seconds.textContent;

  seconds--;

  if (seconds < 0) {
    seconds = 59;
    minutes--;
  }

  if (minutes < 0) {
    sounds.timer.play();
    actions.reset();
    return;
  }

  timer.updateDisplay(minutes, seconds);

  state.countdownId = setTimeout(() => countdown(), 1000);
}