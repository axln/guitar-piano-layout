export const TOGGLE_PITCH = 'TOGGLE_PITCH';
export const SET_PLAY_SOUND = 'SET_PLAY_SOUND';
export const SET_GUITAR_TUNING = 'SET_GUITAR_TUNING';
export const SET_BASE_GUITAR_TUNING = 'SET_BASE_GUITAR_TUNING';
export const SET_BASS_TUNING = 'SET_BASS_TUNING';
export const SET_UKULELE_TUNING = 'SET_UKULELE_TUNING';
export const SET_BASE_BASS_TUNING = 'SET_BASE_BASS_TUNING';
export const SET_KEYBOARD_RANGE = 'SET_KEYBOARD_RANGE';
export const SET_BALALAIKA_TUNING = 'SET_BALALAIKA_TUNING';


export function togglePitch(pitch) {
    return {
        type: TOGGLE_PITCH,
        payload: pitch
    };
}

export function setPlaySound(enabled) {
    return {
        type: SET_PLAY_SOUND,
        payload: enabled
    };
}

export function setGuitarTuning(tuning) {
    return {
        type: SET_GUITAR_TUNING,
        payload: tuning
    }
}

export function setBaseGuitarTuning(tuning) {
    return {
        type: SET_BASE_GUITAR_TUNING,
        payload: tuning
    };
}

export function setBassTuning(tuning) {
    return {
        type: SET_BASS_TUNING,
        payload: tuning
    };
}

export function setBaseBassTuning(tuning) {
    return {
        type: SET_BASE_BASS_TUNING,
        payload: tuning
    };
}

export function setKeyboardRange(range) {
    return {
        type: SET_KEYBOARD_RANGE,
        payload: range
    };
}

export function setUkuleleTuning(tuning) {
    return {
        type: SET_UKULELE_TUNING,
        payload: tuning
    };
}

export function setBalalaikaTuning(tuning) {
    return {
        type: SET_BALALAIKA_TUNING,
        payload: tuning
    };
}
