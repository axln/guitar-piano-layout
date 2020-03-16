import React from 'react';
import { noteToPitch, pitchToNote } from '../../lib/Helper';

export class Tuner extends React.Component {
    handleChange = (index, note) => {
        const tuning = this.props.tuning.split(' ');
        tuning[index] = note;
        const newTuning = tuning.join(' ');
        //console.log('New tuning:', newTuning);
        this.props.setTuning(newTuning);
    };

    renderOptions(basePitch, stringNumber) {
        const options = [];
        const tuningRange = 4; // semitones
        for (let i = -tuningRange; i <=tuningRange; ++i) {
            const value = pitchToNote(basePitch + i);
            options.push(<option key={value} value={value}>{stringNumber}: {value}</option>);
        }
        return options;
    }
    renderComboBoxes() {
        const { baseTuning, tuning } = this.props;
        const baseStrings = baseTuning.split(' ');
        const tunedStrings = tuning.split(' ');
        return baseStrings.map((note, index) => {
            const stringNumber = baseStrings.length - index;
            return (
                <select
                    key={`s${stringNumber}`}
                    onChange={e => {this.handleChange(index, e.target.value)}}
                    value={tunedStrings[index]}
                >
                    {this.renderOptions(noteToPitch(note), stringNumber)}
                </select>
            );
        });
    }
    render() {
        const { baseTuning, setTuning } = this.props;
        return (
            <>
                {this.renderComboBoxes()}
                &nbsp;
                <button onClick={() => {setTuning(baseTuning)}}>Reset to Standard</button>
            </>
        )
    }
}
