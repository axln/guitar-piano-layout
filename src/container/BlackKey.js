import { connect } from 'react-redux';
import { BlackKey } from '../component/PianoKeyboard/BlackKey';
import { onPitch } from '../store/action';

const wrappedBlackKey = connect(
    ({ pitches }) => ({ pitches }),
    { onPitch }
)(BlackKey);

export { wrappedBlackKey as BlackKey };
