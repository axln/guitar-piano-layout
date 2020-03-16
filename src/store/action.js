export const ON_PITCH = 'ON_PITCH';
export const SET_PITCH = 'SET_PITCH';
export const UNSET_PITCH = 'UNSET_PITCH';
export const SET_PLAY_SOUND = 'SET_PLAY_SOUND';

export function onPitch(pitch, pushState) {
    //console.log('action: onPitch:', pitch, pushState);
    return {
        type: ON_PITCH,
        payload: {
            pitch,
            pushState
        }
    };
}
export function setPitch(pitch) {
    return {
        type: SET_PITCH,
        payload: pitch
    };
}

export function unsetPitch(pitch) {
    return {
        type: UNSET_PITCH,
        payload: pitch
    };
}

export function setPlaySound(enabled) {
    return {
        type: SET_PLAY_SOUND,
        payload: enabled
    };
}
