import { connect } from 'unistore';
import { Tuner } from '../../src/component/Guitar/Tuner';
import { setUkuleleTuning } from '../store/action';

const wrappedTuner = connect(
  ({ baseUkuleleTuning, ukuleleTuning }) => ({
    baseTuning: baseUkuleleTuning,
    tuning: ukuleleTuning
  }),
  { setTuning: setUkuleleTuning }
)(Tuner);

export { wrappedTuner as UkuleleTuner };
