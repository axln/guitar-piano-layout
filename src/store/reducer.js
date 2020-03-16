import {ON_PITCH, SET_PITCH, SET_PLAY_SOUND, UNSET_PITCH} from './action';

export function pitches(state = [], action) {
    switch (action.type) {
        case ON_PITCH:
            if (action.payload.pushState === 'down') {
                const idx = state.indexOf(action.payload.pitch);
                const newPitches = [...state];
                if (idx >= 0) {
                    newPitches.splice(idx, 1);
                } else {
                    newPitches.push(action.payload.pitch);
                }
                return newPitches;
            } else {
                return state;
            }
        case SET_PITCH:
            const indexSet = state.indexOf(action.payload.pitch);
            if (indexSet < 0) {
                return [...state, action.payload];
            } else {
                return state;
            }

        case UNSET_PITCH:
            const indexUnset = state.indexOf(action.payload);
            if (indexUnset >= 0) {
                const newPitches = [...state];
                newPitches.splice(indexUnset, 1);
                return newPitches;
            } else {
                return state;
            }
        default:
            return state;
    }
}

export function playSound(state = false, action) {
    if (action.type === SET_PLAY_SOUND) {
        return action.payload;
    } else {
        return state;
    }
}
