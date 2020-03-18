import { connect } from 'react-redux';
import { BlackKey } from '../component/Piano/BlackKey';
import { togglePitch } from '../store/action';

const wrappedBlackKey = connect(
    ({}) => ({}),
    { togglePitch }
)(BlackKey);

export { wrappedBlackKey as BlackKey };
