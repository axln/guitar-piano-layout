import createStore from 'unistore';
import {
  PIANO_RANGE,
  GUITAR_TUNING,
  BASS_TUNING,
  UKULELE_TUNING,
  BALALAIKA_TUNING
} from '../../src/lib/const';

const initialState = {
  pitches: [],
  playSound: false,

  keyboardRange: PIANO_RANGE,

  guitarTuning: GUITAR_TUNING,
  baseGuitarTuning: GUITAR_TUNING,

  bassTuning: BASS_TUNING,
  baseBassTuning: BASS_TUNING,

  ukuleleTuning: UKULELE_TUNING,
  baseUkuleleTuning: UKULELE_TUNING,

  balalaikaTuning: BALALAIKA_TUNING,
  baseBalalaikaTuning: BALALAIKA_TUNING
};

export const store = createStore(initialState);
