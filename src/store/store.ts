import { makeObservable, observable, action, reaction, computed } from 'mobx';
import {
  GUITAR_TUNING,
  BASS_TUNING,
  UKULELE_TUNING,
  BALALAIKA_TUNING,
  MAJOR_INTERVALS_HALFTONE,
  MINOR_INTERVALS_HALFTONE
} from '~/lib/const';
import { buildChord, buildScale, getAltName, pitchToNote } from '~/lib/Helper';

export enum ScaleType {
  Major = 'Major',
  Minor = 'Minor'
}

export enum PickMode {
  Random = 'Random',
  Scale = 'Scale',
  Chord = 'Chord'
}

class Store {
  pitches: Array<number> = [];
  lastPitch: number | null = null;

  pickMode: PickMode = PickMode.Random;
  scale: ScaleType = ScaleType.Major;
  allOctaves: boolean = false;
  onlyUp: boolean = true;

  playSound: boolean = false;

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
      lastPitch: observable,
      pickMode: observable,
      scale: observable,
      onlyUp: observable,
      allOctaves: observable,
      playSound: observable,

      intervals: computed.struct,
      currentHarmony: computed,
      tonic: computed,

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
      setScale: action,
      updateScalePitches: action,
      setPickMode: action,
      setOnlyUp: action,
      setAllOctaves: action
    });

    reaction(
      () => this.pitches,
      () => {
        /*console.log(
          'pitches:',
          this.pitches.map((pitch) => `${pitchToNote(pitch)}:${pitch}`)
        );*/
      }
    );
  }

  togglePitch(pitch: number): void {
    this.lastPitch = pitch;

    if (this.pickMode === PickMode.Random) {
      this.pitches = this.pitches.includes(pitch)
        ? this.pitches.filter((p) => p !== pitch)
        : [...this.pitches, pitch];
    } else {
      this.updateScalePitches(pitch);
    }

    // const sameNotePitches = getSameNotesPitches(pitch);
    // console.log(sameNotePitches.map((pitch) => pitchToNote(pitch)));

    // const note = pitchToNote(pitch);
    // const freq = pitchToFrequency(pitch);
    // console.log(`Note: ${note}, frequency: ${freq.toFixed(2)} Hz`);
  }

  get currentHarmony(): string | null {
    if (this.lastPitch === null || this.pickMode === PickMode.Random) {
      return null;
    } else {
      return `${pitchToNote(this.lastPitch, false)} (${getAltName(this.lastPitch)}) ${this.scale}`;
    }
  }

  get tonic(): string | null {
    if (this.lastPitch === null || this.pickMode === PickMode.Random) {
      return null;
    } else {
      return `${pitchToNote(this.lastPitch)} (${getAltName(this.lastPitch)})`;
    }
  }

  updateScalePitches(pitch: number): void {
    // console.log('updateScalePitches:', pitch);
    switch (this.pickMode) {
      case PickMode.Scale:
        this.pitches = buildScale(pitch, this.intervals, this.allOctaves);
        break;
      case PickMode.Chord:
        this.pitches = buildChord(pitch, this.scale, this.onlyUp);
        break;
      default:
      //this.pitches = [pitch];
    }
  }

  setOnlyUp(value: boolean): void {
    this.onlyUp = value;
    if (this.lastPitch !== null) {
      this.updateScalePitches(this.lastPitch);
    }
  }

  setAllOctaves(value: boolean): void {
    this.allOctaves = value;
    if (this.lastPitch !== null) {
      this.updateScalePitches(this.lastPitch);
    }
  }

  setPickMode(value: PickMode): void {
    this.pickMode = value;
    if (this.lastPitch !== null) {
      this.updateScalePitches(this.lastPitch);
    }
  }

  setPlaySound(value: boolean): void {
    this.playSound = value;
  }

  get intervals(): number[] {
    return this.scale === ScaleType.Major ? MAJOR_INTERVALS_HALFTONE : MINOR_INTERVALS_HALFTONE;
  }

  setScale(scale: ScaleType): void {
    this.scale = scale;
    if (this.lastPitch !== null) {
      this.updateScalePitches(this.lastPitch);
    }
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
