import { connect } from 'react-redux';
import { GuitarString } from '../component/GuitarNeck/GuitarString';

const wrappedGuitarString = connect(
    ({ pitches }) => ({ pitches })
)(GuitarString);

export { wrappedGuitarString as GuitarString };
