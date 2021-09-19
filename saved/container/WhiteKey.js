import { connect } from 'unistore';
import { WhiteKey } from '../../src/component/Piano/WhiteKey';
import { togglePitch } from '../store/action';

const wrappedWhiteKey = connect(({}) => ({}), { togglePitch })(WhiteKey);

export { wrappedWhiteKey as WhiteKey };
