import { connect } from 'react-redux';
import { App } from '../component/App/App';
import { setPlaySound } from '../store/action';

const wrappedApp = connect(
    ({ playSound, pitches }) => ({ playSound, pitches }),
    { setPlaySound }
)(App);

export { wrappedApp as App };
