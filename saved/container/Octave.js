import { connect } from 'unistore';
import { Octave } from '../../src/component/Piano/Octave';

const wrappedOctave = connect(({ pitches }) => ({ pitches }))(Octave);

export { wrappedOctave as Octave };
