import {
    TOGGLE_PITCH,
    SET_PLAY_SOUND,
    SET_GUITAR_TUNING,
    SET_BASS_TUNING,
    SET_BASE_BASS_TUNING,
    SET_BASE_GUITAR_TUNING
} from './action';
import { pitchToNote } from '../lib/Helper';
import { pitchToFrequency } from '../lib/SoundGenerator';

export const GUITAR_TUNING = 'E2 A2 D3 G3 B3 E4';
export const GUITAR_TUNING_7_STRING = 'B1 E2 A2 D3 G3 B3 E4';
export const GUITAR_TUNING_8_STRING = 'F#1 B1 E2 A2 D3 G3 B3 E4';

export const BASS_TUNING = 'E1 A1 D2 G2';
export const BASS_TUNING_5_STRING = 'B0 E1 A1 D2 G2';

export function pitches(pitches = [], action) {
    if (action.type === TOGGLE_PITCH) {
        const { payload: pitch } = action;
        const idx = pitches.indexOf(pitch);

        const newPitches = [...pitches];
        if (idx >= 0) {
            newPitches.splice(idx, 1);
        } else {
            newPitches.push(pitch);

            let note = pitchToNote(pitch);
            let freq = pitchToFrequency(pitch);
            //console.log(`Note: ${note}, frequency: ${freq.toFixed(2)} Hz`);
        }
        return newPitches;
    } else {
        return pitches;
    }
}

export function playSound(enabled = false, action) {
    if (action.type === SET_PLAY_SOUND) {
        return action.payload;
    } else {
        return enabled;
    }
}

export function baseGuitarTuning(state = GUITAR_TUNING, action) {
    if (action.type === SET_BASE_GUITAR_TUNING) {
        return action.payload;
    } else {
        return state;
    }
}

export function guitarTuning(state = GUITAR_TUNING, action) {
    if (action.type === SET_GUITAR_TUNING) {
        return action.payload;
    } else {
        return state;
    }
}

export function baseBassTuning(state = BASS_TUNING, action) {
    if (action.type === SET_BASE_BASS_TUNING) {
        return action.payload;
    } else {
        return state;
    }
}

export function bassTuning(state = BASS_TUNING, action) {
    if (action.type === SET_BASS_TUNING) {
        return action.payload;
    } else {
        return state;
    }
}
