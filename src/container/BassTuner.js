import { connect } from 'react-redux';
import { Tuner } from '../component/Guitar/Tuner';
import { setBassTuning } from '../store/action';

const wrappedTuner = connect(
    ({ baseBassTuning, bassTuning }) => ({
        baseTuning: baseBassTuning,
        tuning: bassTuning
    }),
    { setTuning: setBassTuning }
)(Tuner);

export { wrappedTuner as BassTuner };
