import { connect } from 'react-redux';
import { BlackKey } from '../component/PianoKeyboard/BlackKey';
import { togglePitch } from '../store/action';

const wrappedBlackKey = connect(
    ({}) => ({}),
    { togglePitch }
)(BlackKey);

export { wrappedBlackKey as BlackKey };
