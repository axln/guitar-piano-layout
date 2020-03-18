import { connect } from 'react-redux';
import { Tuner } from '../component/Guitar/Tuner';
import {setBalalaikaTuning } from '../store/action';

const wrappedTuner = connect(
    ({ baseBalalaikaTuning, balalaikaTuning }) => ({
        baseTuning: baseBalalaikaTuning,
        tuning: balalaikaTuning
    }),
    { setTuning: setBalalaikaTuning }
)(Tuner);

export { wrappedTuner as BalalaikaTuner };
