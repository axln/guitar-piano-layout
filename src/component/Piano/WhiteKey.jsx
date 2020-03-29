import { h } from 'preact';
import { PianoKey } from './PianoKey';
import { getPitchColor, pitchToNote, getWhiteInterval } from '../../lib/Helper';
import { WHITE_HEIGHT, WHITE_WIDTH, altNoteNames } from './PianoKeyboard';

export class WhiteKey extends PianoKey {
    getNoteNumber(keyIndex) {
        return getWhiteInterval(keyIndex);
    }

    getXPos() {
        let offset = (this.props.keyOffset ? this.props.keyOffset * WHITE_WIDTH : 0);
        return this.props.baseKey * WHITE_WIDTH  + this.props.index * WHITE_WIDTH + offset;
    }

    getAltName() {
        let note = pitchToNote(this.props.pitch);
        return altNoteNames[note[0]];
    }

    render() {
        const { pushed, pitch, index } = this.props;
        /*let style = {
            'strokeDasharray': `${width},${this.props.height},${this.props.height + width}`
        };*/


        let style = {
            ...(pushed ? {fill: getPitchColor(pitch) + 'A0'} : {} )
        };

        let xPos = this.getXPos();

        return (
            <g
                className = 'WhiteKey'
                onMouseLeave = {this.handleMouseUp}
                onMouseDown = {this.handleMouseDown}
                onMouseUp = {this.handleMouseUp}
            >
                <rect
                    x = {xPos + 0.5}
                    y = {0.5}
                    style = {style}
                    width = {WHITE_WIDTH}
                    height = {WHITE_HEIGHT}
                />
                <text
                    x = {Math.round(xPos + WHITE_WIDTH / 2)}
                    y = {WHITE_HEIGHT - 50}
                >
                    {this.getNoteNumber(index)}
                </text>
                <text
                    x = {Math.round(xPos + WHITE_WIDTH / 2)}
                    y = {WHITE_HEIGHT - 30}
                >
                    {pitchToNote(pitch)}
                </text>
                <text
                    x = {Math.round(xPos + WHITE_WIDTH / 2)}
                    y = {WHITE_HEIGHT - 10}
                >
                    {this.getAltName()}
                </text>
            </g>
        );
    }
}
