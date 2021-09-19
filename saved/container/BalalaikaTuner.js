import { connect } from 'unistore';
import { Tuner } from '../../src/component/Guitar/Tuner';
import { setBalalaikaTuning } from '../store/action';

const wrappedTuner = connect(
  ({ baseBalalaikaTuning, balalaikaTuning }) => ({
    baseTuning: baseBalalaikaTuning,
    tuning: balalaikaTuning
  }),
  { setTuning: setBalalaikaTuning }
)(Tuner);

export { wrappedTuner as BalalaikaTuner };
