import { connect } from 'unistore';
import { Tuner } from '../../src/component/Guitar/Tuner';
import { setGuitarTuning } from '../store/action';

const wrappedTuner = connect(
  ({ baseGuitarTuning, guitarTuning }) => ({
    baseTuning: baseGuitarTuning,
    tuning: guitarTuning
  }),
  { setTuning: setGuitarTuning }
)(Tuner);

export { wrappedTuner as GuitarTuner };
