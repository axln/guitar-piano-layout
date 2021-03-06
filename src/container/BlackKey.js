import { connect } from 'unistore/preact';
import { BlackKey } from '../component/Piano/BlackKey';
import { togglePitch } from '../store/action';

const wrappedBlackKey = connect(
    ({}) => ({}),
    { togglePitch }
)(BlackKey);

export { wrappedBlackKey as BlackKey };
