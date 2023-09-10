import state from "./state.js";
import * as timer from "./timer.js";
import * as events from "./events.js";
import * as sounds from "./sound.js"

let oldState;

export function toggleRunning() {
  sounds.buttonPress.play()
  state.isRunning = document.documentElement.classList.toggle("running");
  events.countdown();
}

export function reset() {
  sounds.buttonPress.play()
  state.isRunning = false;
  document.documentElement.classList.remove("running");
  timer.updateDisplay();
}

export function addMinutes() {
  sounds.buttonPress.play()
  if (state.isRunning) {
    return;
  }

  state.minutes = state.minutes + 5;

  if (state.minutes > 60) {
    state.minutes = 60;
  }

  timer.updateDisplay();
}

export function removeMinutes() {
  sounds.buttonPress.play()
  if (state.isRunning) {
    return;
  }

  state.minutes = state.minutes - 5;

  if (state.minutes < 0) {
    state.minutes = 0;
  }

  timer.updateDisplay();
}

export function activeSounds(sound) {
  sounds.buttonPress.play()
  state.soundId = sound;

  sounds.soundsList.forEach((element) => {
    element.pause();
  });

  if (state.soundId != oldState) {
    sounds.soundsList[sound].play();
    oldState = state.soundId;
    return;
  }

  if (state.soundId == oldState) {
    oldState = null;
    return;
  }
}