import { connect } from 'react-redux';
import { Tuner } from '../component/Guitar/Tuner';
import { setUkuleleTuning } from '../store/action';

const wrappedTuner = connect(
    ({ baseUkuleleTuning, ukuleleTuning }) => ({
        baseTuning: baseUkuleleTuning,
        tuning: ukuleleTuning
    }),
    { setTuning: setUkuleleTuning }
)(Tuner);

export { wrappedTuner as UkuleleTuner };
