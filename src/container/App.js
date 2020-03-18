import { connect } from 'react-redux';
import { App } from '../component/App';
import {
    setPlaySound,
    setBaseGuitarTuning,
    setGuitarTuning,
    setBaseBassTuning,
    setBassTuning,
    setKeyboardRange
} from '../store/action';

const wrappedApp = connect(
    ({
         playSound,
         guitarTuning,
         bassTuning,
         ukuleleTuning,
         keyboardRange
    }) => ({
        playSound,
        guitarTuning,
        bassTuning,
        ukuleleTuning,
        keyboardRange
    }),
    {
        setPlaySound,
        setBaseBassTuning,
        setBassTuning,
        setBaseGuitarTuning,
        setGuitarTuning,
        setKeyboardRange
    }
)(App);

export { wrappedApp as App };
