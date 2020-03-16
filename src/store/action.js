export const TOGGLE_PITCH = 'TOGGLE_PITCH';
export const SET_PLAY_SOUND = 'SET_PLAY_SOUND';
export const SET_GUITAR_TUNING = 'SET_GUITAR_TUNING';
export const SET_BASS_TUNING = 'SET_BASS_TUNING';
export const SET_BASE_BASS_TUNING = 'SET_BASE_BASS_TUNING';

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

export function setBassTuning(tuning) {
    return {
        type: SET_BASS_TUNING,
        payload: tuning
    }
}

export function setBaseBassTuning(tuning) {
    return {
        type: SET_BASE_BASS_TUNING,
        payload: tuning
    }
}
