import {connect} from 'react-redux';
import {App} from '../component/App';
import {
    setPlaySound,
    setBaseGuitarTuning,
    setGuitarTuning,
    setBaseBassTuning,
    setBassTuning,
    setKeyboardRange,
} from '../store/action';

const wrappedApp = connect(
    ({
         playSound,
         guitarTuning,
         bassTuning,
         ukuleleTuning,
         keyboardRange,
         balalaikaTuning
     }) => ({
        playSound,
        guitarTuning,
        bassTuning,
        ukuleleTuning,
        keyboardRange,
        balalaikaTuning
    }),
    {
        setPlaySound,
        setBaseBassTuning,
        setBassTuning,
        setBaseGuitarTuning,
        setGuitarTuning,
        setKeyboardRange,
    }
)(App);

export {wrappedApp as App};
