import { connect } from 'react-redux';
import { App } from '../component/App/App';
import { setPlaySound } from '../store/action';

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
    { setPlaySound }
)(App);

export { wrappedApp as App };
