import { makeObservable, observable, action } from 'mobx';
import { GUITAR_TUNING, BASS_TUNING, UKULELE_TUNING, BALALAIKA_TUNING } from '~/lib/const';

class Store {
  pitches = [];
  playSound = false;

  keyboardRange = 'A0-C8';

  guitarTuning = GUITAR_TUNING;
  baseGuitarTuning = GUITAR_TUNING;

  bassTuning = BASS_TUNING;
  baseBassTuning = BASS_TUNING;

  ukuleleTuning = UKULELE_TUNING;
  balalaikaTuning = BALALAIKA_TUNING;

  constructor() {
    makeObservable(this, {
      pitches: observable.struct,
      playSound: observable,
      keyboardRange: observable,

      guitarTuning: observable.struct,
      bassTuning: observable.struct,
      ukuleleTuning: observable.struct,
      balalaikaTuning: observable.struct,

      baseGuitarTuning: observable.struct,
      baseBassTuning: observable.struct,

      setPlaySound: action,
      setKeyboardRange: action,
      togglePitch: action,

      setGuitarTuning: action.bound,
      setBassTuning: action.bound,
      setUkuleleTuning: action.bound,
      setBalalaikaTuning: action.bound,

      setBaseGuitarTuning: action,
      setBaseBassTuning: action
    });
  }

  togglePitch(pitch) {
    this.pitches = this.pitches.includes(pitch)
      ? this.pitches.filter((p) => p !== pitch)
      : [...this.pitches, pitch];
    /*
    // doesn't work, we need to reassign property to trigger mobx
    const index = this.pitches.indexOf(pitch);
    if (index >= 0) {
      this.pitches.splice(index, 1);
    } else {
      this.pitches.push(pitch);
    }
    */

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
