import { connect } from 'react-redux';
import { WhiteKey } from '../component/Piano/WhiteKey';
import { togglePitch } from '../store/action';

const wrappedWhiteKey = connect(
    ({}) => ({}),
    { togglePitch }
)(WhiteKey);

export { wrappedWhiteKey as WhiteKey };
