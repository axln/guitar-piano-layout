import { connect } from 'unistore';
import { BlackKey } from '../../src/component/Piano/BlackKey';
import { togglePitch } from '../store/action';

const wrappedBlackKey = connect(({}) => ({}), { togglePitch })(BlackKey);

export { wrappedBlackKey as BlackKey };
