import {
    TOGGLE_PITCH,
    SET_PLAY_SOUND,
    SET_GUITAR_TUNING,
    SET_BASS_TUNING,
    SET_BASE_BASS_TUNING,
    SET_BASE_GUITAR_TUNING, SET_KEYBOARD_RANGE, SET_UKULELE_TUNING
} from './action';
import { pitchToNote } from '../lib/Helper';
import { pitchToFrequency } from '../lib/SoundGenerator';
import {
    GUITAR_TUNING,
    BASS_TUNING,
    PIANO_RANGE, UKULELE_TUNING
} from '../lib/const';

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

export function baseUkuleleTuning(state = UKULELE_TUNING, action) {
    return state;
}

export function ukuleleTuning(state = UKULELE_TUNING, action) {
    if (action.type === SET_UKULELE_TUNING) {
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

export function keyboardRange(state = PIANO_RANGE, action) {
    if (action.type === SET_KEYBOARD_RANGE) {
        return action.payload;
    } else {
        return state;
    }
}
