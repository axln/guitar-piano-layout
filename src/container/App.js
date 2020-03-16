import { connect } from 'react-redux';
import { App } from '../component/App/App';
import {
    setPlaySound,
    setBaseGuitarTuning,
    setGuitarTuning,
    setBaseBassTuning,
    setBassTuning
} from '../store/action';

const wrappedApp = connect(
    ({
         playSound,
         guitarTuning,
         bassTuning
    }) => ({
        playSound,
        guitarTuning,
        bassTuning
    }),
    {
        setPlaySound,
        setBaseBassTuning,
        setBassTuning,
        setBaseGuitarTuning,
        setGuitarTuning
    }
)(App);

export { wrappedApp as App };
