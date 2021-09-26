import { makeObservable, observable, action, reaction, computed } from 'mobx';
import {
  GUITAR_TUNING,
  BASS_TUNING,
  UKULELE_TUNING,
  BALALAIKA_TUNING,
  MAJOR_INTERVALS,
  MINOR_INTERVALS,
  MAJOR_PENTATONIC,
  MINOR_PENTATONIC
} from '~/lib/const';
import { buildChord, buildScale, getAltName, pitchToNote } from '~/lib/Helper';

export enum ScaleType {
  Major = 'Major',
  Minor = 'Minor'
}

export enum AlterType {
  sus2 = 'sus2',
  sus4 = 'sus4'
}

export enum SeventhType {
  MinorSeventh = 'Minor Seventh',
  MajorSeventh = 'Major Seventh'
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
  seventh: boolean = false;
  pentatonic: boolean = false;
  onlyUp: boolean = true;
  alter: boolean = false;
  alterType: AlterType = AlterType.sus2;

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
      pentatonic: observable,
      allOctaves: observable,
      seventh: observable,
      playSound: observable,
      alter: observable,
      alterType: observable,

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
      setAllOctaves: action,
      setPentatonic: action,
      setSeventh: action,
      setAlter: action,
      setAlterType: action
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

  setPentatonic(value: boolean): void {
    this.pentatonic = value;
    if (this.lastPitch !== null) {
      this.updateScalePitches(this.lastPitch);
    }
  }

  setAlter(value: boolean): void {
    this.alter = value;
    if (this.lastPitch !== null) {
      this.updateScalePitches(this.lastPitch);
    }
  }

  setAlterType(value: AlterType): void {
    this.alterType = value;
    if (this.lastPitch !== null) {
      this.updateScalePitches(this.lastPitch);
    }
  }

  updateScalePitches(pitch: number): void {
    // console.log('updateScalePitches:', pitch);
    switch (this.pickMode) {
      case PickMode.Scale:
        this.pitches = buildScale(pitch, this.intervals, this.allOctaves);
        break;
      case PickMode.Chord:
        this.pitches = buildChord(pitch, this.scale, this.onlyUp, this.alter && this.alterType);
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

  setSeventh(value: boolean): void {
    this.seventh = value;
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
    if (this.pentatonic) {
      return this.scale === ScaleType.Major ? MAJOR_PENTATONIC : MINOR_PENTATONIC;
    } else {
      if (this.pickMode === PickMode.Chord && this.alter) {
      } else {
        return this.scale === ScaleType.Major ? MAJOR_INTERVALS : MINOR_INTERVALS;
      }
    }
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
