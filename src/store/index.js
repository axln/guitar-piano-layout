import createStore from 'unistore';
import { BALALAIKA_TUNING,
    BASS_TUNING,
    GUITAR_TUNING,
    PIANO_RANGE,
    UKULELE_TUNING
} from '../lib/const';

const initialState = {
    pitches: [],
    playSound: false,
    baseGuitarTuning: GUITAR_TUNING,
    guitarTuning: GUITAR_TUNING,
    baseUkuleleTuning: UKULELE_TUNING,
    ukuleleTuning: UKULELE_TUNING,
    baseBalalaikaTuning: BALALAIKA_TUNING,
    balalaikaTuning: BALALAIKA_TUNING,
    baseBassTuning: BASS_TUNING,
    bassTuning: BASS_TUNING,
    keyboardRange: PIANO_RANGE
};

export const store = createStore(initialState);
