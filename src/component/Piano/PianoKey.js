import { h, Component } from 'preact';
import { stopNote, playNote } from '../../lib/SoundGenerator';

export class PianoKey extends Component {
    shouldComponentUpdate(nextProps) {
        const { pushed, baseKey, keyOffset, index } = this.props;
        return pushed !== nextProps.pushed ||
            baseKey !== nextProps.baseKey ||
            index !== nextProps.index ||
            keyOffset !== nextProps.keyOffset;
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
