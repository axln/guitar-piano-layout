import { connect } from 'unistore/preact';
import { Tuner } from '../component/Guitar/Tuner';
import { setGuitarTuning } from '../store/action';

const wrappedTuner = connect(
    ({ baseGuitarTuning, guitarTuning }) => ({
        baseTuning: baseGuitarTuning,
        tuning: guitarTuning
    }),
    { setTuning: setGuitarTuning }
)(Tuner);

export { wrappedTuner as GuitarTuner };
