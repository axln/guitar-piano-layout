import React from 'react';
import { stopNote, playNote } from '../../lib/SoundGenerator';

export class PianoKey extends React.Component {
    shouldComponentUpdate(nextProps) {
        return this.props.pushed !== nextProps.pushed;
    }

    handleMouseDown = () => {
        const { togglePitch, pitch } = this.props;
        togglePitch(pitch);
        playNote(pitch);
    };

    handleMouseUp = () => {
        const { pitch } = this.props;
        stopNote(pitch);
    };
}
