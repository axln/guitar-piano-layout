import { connect } from 'unistore';
import { GuitarString } from '../../src/component/Guitar/GuitarString';

const wrappedGuitarString = connect(({ pitches }) => ({ pitches }))(GuitarString);

export { wrappedGuitarString as GuitarString };
