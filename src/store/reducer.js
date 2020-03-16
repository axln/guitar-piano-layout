import { TOGGLE_PITCH, SET_PLAY_SOUND } from './action';
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
