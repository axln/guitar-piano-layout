import { connect } from 'unistore';
import { StringNote } from '../../src/component/Guitar/StringNote';
import { togglePitch } from '../store/action';

const wrappedStringNote = connect(({}) => ({}), { togglePitch })(StringNote);

export { wrappedStringNote as StringNote };
