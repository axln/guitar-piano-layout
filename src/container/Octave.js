import { connect } from 'unistore/preact';
import { Octave } from '../component/Piano/Octave';

const wrappedOctave = connect(
    ({ pitches }) => ({ pitches })
)(Octave);

export { wrappedOctave as Octave };
