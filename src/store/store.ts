import { makeObservable, observable, action, reaction } from 'mobx';
import {
  GUITAR_TUNING,
  BASS_TUNING,
  UKULELE_TUNING,
  BALALAIKA_TUNING,
  MAJOR_INTERVALS_HALFTONE,
  MINOR_INTERVALS_HALFTONE
} from '~/lib/const';
import { buildScale } from '~/lib/Helper';

export enum ScaleType {
  Major = 'Major',
  Minor = 'Minor'
}

class Store {
  pitches: Array<number> = [];
  playSound: boolean = false;
  showScales: boolean = true;
  scale: ScaleType = ScaleType.Major;

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
      showScales: observable,
      scale: observable,
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
      setBaseBassTuning: action,
      setShowScales: action,
      setScale: action,
      updatePitches: action
    });

    reaction(
      () => this.pitches,
      () => {
        // console.log('pitches:', this.pitches);
      }
    );
  }

  togglePitch(pitch: number): void {
    if (this.showScales) {
      this.updatePitches(pitch);
    } else {
      this.pitches = this.pitches.includes(pitch)
        ? this.pitches.filter((p) => p !== pitch)
        : [...this.pitches, pitch];
    }

    // const note = pitchToNote(pitch);
    // const freq = pitchToFrequency(pitch);
    // console.log(`Note: ${note}, frequency: ${freq.toFixed(2)} Hz`);
  }

  updatePitches(pitch: number): void {
    console.log('updatePitches:', pitch);
    if (this.showScales) {
      const intervals =
        this.scale === ScaleType.Major ? MAJOR_INTERVALS_HALFTONE : MINOR_INTERVALS_HALFTONE;
      this.pitches = buildScale(pitch, intervals);
    } else {
      this.pitches = [pitch];
    }
  }

  setPlaySound(value: boolean): void {
    this.playSound = value;
  }

  setShowScales(value: boolean): void {
    this.showScales = value;
    this.updatePitches(this.pitches[0]);
  }

  setScale(scale: ScaleType): void {
    this.scale = scale;
    this.updatePitches(this.pitches[0]);
  }

  setGuitarTuning(value: string) {
    this.guitarTuning = value;
  }

  setBaseGuitarTuning(value: string) {
    this.baseGuitarTuning = value;
  }

  setBassTuning(value: string) {
    this.bassTuning = value;
  }

  setBaseBassTuning(value: string) {
    this.baseBassTuning = value;
  }

  setKeyboardRange(value: string) {
    this.keyboardRange = value;
  }

  setUkuleleTuning(value: string) {
    this.ukuleleTuning = value;
  }

  setBalalaikaTuning(value: string) {
    this.balalaikaTuning = value;
  }
}

export const store = new Store();
