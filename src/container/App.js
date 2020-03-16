import { connect } from 'react-redux';
import { App } from '../component/App/App';
import { setPlaySound, setBaseBassTuning, setBassTuning } from '../store/action';

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
    { setPlaySound, setBaseBassTuning, setBassTuning }
)(App);

export { wrappedApp as App };
