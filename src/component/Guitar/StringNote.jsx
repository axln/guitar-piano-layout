import { h, Component } from 'preact';
import { pitchToNote, getPitchColor} from '../../lib/Helper';
import { getFretOffset } from './Fret';
import { getStringPos, getBetweenStringPos } from './GuitarString';
import { stopNote } from '../../lib/SoundGenerator';

export class StringNote extends Component {
    shouldComponentUpdate(nextProps) {
        const { pushed, pitch, stringCount } = this.props;
        return pushed !== nextProps.pushed ||
            pitch !== nextProps.pitch ||
            stringCount !== nextProps.stringCount;
    }

    handleMouseDown = () => {
        const { togglePitch, pitch } = this.props;
        togglePitch(pitch);
    };

    handleMouseUp = () => {
        stopNote(this.props.pitch);
    };

    getPadRect() {
        let fretPad = {};

        const { index, stringCount, number, fretCount, neckLength, neckWidth } = this.props;

        fretPad.x = getFretOffset(index - 1, neckLength, fretCount);
        fretPad.width = getFretOffset(index, neckLength, fretCount) - getFretOffset(index - 1, neckLength, fretCount);

        if (number === 1) {
            fretPad.y = 0;
            fretPad.height = (getStringPos(1, stringCount, neckWidth) + getStringPos(2, stringCount, neckWidth)) / 2;
        } else if (number === stringCount) {
            fretPad.y = getBetweenStringPos(number - 1, number, stringCount, neckWidth);
            fretPad.height = neckWidth - fretPad.y;
        } else {
            fretPad.y = getBetweenStringPos(number - 1, number, stringCount, neckWidth);
            fretPad.height = getBetweenStringPos(number, number + 1, stringCount, neckWidth) - fretPad.y;
        }
        return fretPad;
    }

    render() {
        const { pitch, pushed, index, stringCount, number, fretCount, neckLength, neckWidth } = this.props;
        let note = pitchToNote(pitch);
        let className = note.length === 2 ? 'note' : 'note black';
        let style = {};
        if (pushed) {
            className += ' pushed';
            style.fill = getPitchColor(pitch) + 'B0';
        }

        let fretX;
        if (index === 0) {
            fretX = 0;
        } else  if (index <= 16) {
            fretX = getFretOffset(index, neckLength, fretCount) - 20;
        } else {
            fretX = (getFretOffset(index, neckLength, fretCount) +  getFretOffset(index - 1, neckLength, fretCount)) / 2;
        }

        let noteHeight = 13;
        let noteWidth = 21;

        return (
            <g
                className = {className}
                onMouseDown = {this.handleMouseDown}
                onMouseUp = {this.handleMouseUp}
                onMouseLeave = {this.handleMouseUp}
            >
                <rect
                    style = {style}
                    className = 'noteArea'
                    {...this.getPadRect()}
                />
                <rect
                    className = 'bk'
                    x = {Math.round(fretX - noteWidth / 2)}
                    y = {Math.round(getStringPos(number, stringCount, neckWidth) - noteHeight / 2)}
                    width = {noteWidth}
                    height = {noteHeight}
                />
                <text
                    x={Math.round(fretX)}
                    y={Math.round(getStringPos(number, stringCount, neckWidth)) + 1}
                >{note}</text>
            </g>
        );
    }
}
