import { connect } from 'react-redux';
import { WhiteKey } from '../component/PianoKeyboard/WhiteKey';
import { onPitch } from '../store/action';

const wrappedWhiteKey = connect(
    ({ pitches }) => ({ pitches }),
    { onPitch}
)(WhiteKey);

export { wrappedWhiteKey as WhiteKey };
