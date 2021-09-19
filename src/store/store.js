import { makeAutoObservable } from 'mobx';

class Store {
  pitches = [];
  playSound = false;

  keyboardRange = 'A0-C8';

  guitarTuning;
  bassTuning;
  ukuleleTuning;
  balalaikaTuning;

  baseGuitarTuning = 'E2 A2 D3 G3 B3 E4';
  baseBassTuning = 'E1 A1 D2 G2';
  baseUkuleleTuning = 'G4 C4 E4 A4';
  baseBalalaikaTuning = 'E4 E4 A4';

  constructor() {
    this.guitarTuning = this.baseGuitarTuning;
    this.bassTuning = this.baseBassTuning;
    this.ukuleleTuning = this.baseUkuleleTuning;
    this.balalaikaTuning = this.baseBalalaikaTuning;

    makeAutoObservable(this);
  }

  togglePitch(pitch) {
    this.pitches = this.pitches.includes(pitch)
      ? this.pitches.filter((p) => p !== pitch)
      : [...this.pitches, pitch];

    // const note = pitchToNote(pitch);
    // const freq = pitchToFrequency(pitch);
    // console.log(`Note: ${note}, frequency: ${freq.toFixed(2)} Hz`);
  }

  setPlaySound(value) {
    this.playSound = value;
  }

  setGuitarTuning(value) {
    this.guitarTuning = value;
  }

  setBaseGuitarTuning(value) {
    this.baseGuitarTuning = value;
  }

  setBassTuning(value) {
    this.bassTuning = value;
  }

  setBaseBassTuning(value) {
    this.baseBassTuning = value;
  }

  setKeyboardRange(value) {
    this.keyboardRange = value;
  }

  setUkuleleTuning(value) {
    this.ukuleleTuning = value;
  }

  setBalalaikaTuning(value) {
    this.balalaikaTuning = value;
  }
}

export const store = new Store();
