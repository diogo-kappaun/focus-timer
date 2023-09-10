import { volumeRange } from "./elements.js";

export const timer = new Audio("./assets/kichen-timer.mp3");
export const buttonPress = new Audio("./assets/button-press.wav");
const forest = new Audio("./assets/floresta.wav");
const rain = new Audio("./assets/chuva.wav");
const coffeShop = new Audio("./assets/cafeteria.wav");
const firePlace = new Audio("./assets/lareira.wav");

buttonPress.volume = 0.3;
timer.volume = 0.1;

forest.loop = true;
rain.loop = true;
coffeShop.loop = true;
firePlace.loop = true;

export const soundsList = [forest, rain, coffeShop, firePlace];

volumeRange.addEventListener('change', () => {
  const valueVolumeRange = volumeRange.value / 100;
  soundsList.forEach(element => {
    element.volume = valueVolumeRange
  });
})
