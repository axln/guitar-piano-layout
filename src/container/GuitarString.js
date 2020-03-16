import { connect } from 'react-redux';
import { GuitarString } from '../component/Guitar/GuitarString';

const wrappedGuitarString = connect(
    ({ pitches }) => ({ pitches })
)(GuitarString);

export { wrappedGuitarString as GuitarString };
