import { connect } from 'react-redux';
import { Octave } from '../component/Piano/Octave';

const wrappedOctave = connect(
    ({ pitches }) => ({ pitches })
)(Octave);

export { wrappedOctave as Octave };
