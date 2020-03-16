import {TOGGLE_PITCH, SET_PLAY_SOUND, SET_GUITAR_TUNING, SET_BASS_TUNING} from './action';
import { pitchToNote } from '../lib/Helper';
import { pitchToFrequency } from '../lib/SoundGenerator';

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

export function baseGuitarTuning(state = 'E2 A2 D3 G3 B3 E4', action) {
    return state;
}

export function guitarTuning(state = 'E2 A2 D3 G3 B3 E4', action) {
    if (action.type === SET_GUITAR_TUNING) {
        return action.payload;
    } else {
        return state;
    }
}

export function baseBassTuning(state = 'E1 A1 D2 G2', action) {
    return state;
}


export function bassTuning(state = 'E1 A1 D2 G2', action) {
    if (action.type === SET_BASS_TUNING) {
        return action.payload;
    } else {
        return state;
    }
}
