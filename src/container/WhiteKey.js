import { connect } from 'react-redux';
import { WhiteKey } from '../component/PianoKeyboard/WhiteKey';
import { togglePitch } from '../store/action';

const wrappedWhiteKey = connect(
    ({}) => ({}),
    { togglePitch }
)(WhiteKey);

export { wrappedWhiteKey as WhiteKey };
