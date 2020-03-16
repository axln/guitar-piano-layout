export const TOGGLE_PITCH = 'TOGGLE_PITCH';
export const SET_PLAY_SOUND = 'SET_PLAY_SOUND';

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
