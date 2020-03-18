import { pitchToNote } from '../lib/Helper';
import { pitchToFrequency } from '../lib/SoundGenerator';

export function togglePitch({ pitches }, pitch) {
    const idx = pitches.indexOf(pitch);
    const newPitches = [...pitches];
    if (idx >= 0) {
        newPitches.splice(idx, 1);
    } else {
        newPitches.push(pitch);

        // let note = pitchToNote(pitch);
        // let freq = pitchToFrequency(pitch);
        // console.log(`Note: ${note}, frequency: ${freq.toFixed(2)} Hz`);
    }
    return { pitches: newPitches };
}

export function setPlaySound(_, playSound) {
    return { playSound };
}

export function setGuitarTuning(_, guitarTuning) {
    return { guitarTuning };
}
export function setBaseGuitarTuning(_, baseGuitarTuning) {
    return { baseGuitarTuning };
}

export function setBassTuning(_, bassTuning) {
    return { bassTuning };
}

export function setBaseBassTuning(_, baseBassTuning) {
    return { baseBassTuning };
}

export function setKeyboardRange(_, keyboardRange) {
    return { keyboardRange };
}

export function setUkuleleTuning(_, ukuleleTuning) {
    return { ukuleleTuning };
}

export function setBalalaikaTuning(_, balalaikaTuning) {
    return { balalaikaTuning };
}
