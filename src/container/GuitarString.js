import { connect } from 'unistore/preact';
import { GuitarString } from '../component/Guitar/GuitarString';

const wrappedGuitarString = connect(
    ({ pitches }) => ({ pitches })
)(GuitarString);

export { wrappedGuitarString as GuitarString };
