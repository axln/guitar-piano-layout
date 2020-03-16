import React from 'react';
import { pitchToNote, getPitchColor} from '../../lib/Helper';
import { NECK_HEIGHT } from './GuitarNeck';
import { getFretOffset } from './Fret';
import { getStringPos, getBetweenStringPos } from './GuitarString';
import { stopNote } from '../../lib/SoundGenerator';

export class StringNote extends React.Component {
    /*shouldComponentUpdate(nextProps) {
        return this.props.pushed !== nextProps.pushed;
    }*/

    handleMouseDown = () => {
        const { togglePitch, pitch } = this.props;
        togglePitch(pitch);
    };

    handleMouseUp = () => {
        stopNote(this.props.pitch);
    };

    getPadRect() {
        let fretPad = {};

        const { index, stringCount, number } = this.props;

        fretPad.x = getFretOffset(index - 1);
        fretPad.width = getFretOffset(index) - getFretOffset(index - 1);

        if (number === 1) {
            fretPad.y = 0;
            fretPad.height = (getStringPos(1, stringCount) + getStringPos(2, stringCount)) / 2;
        } else if (number === stringCount) {
            fretPad.y = getBetweenStringPos(number - 1, number, stringCount);
            fretPad.height = NECK_HEIGHT - fretPad.y;
        } else {
            fretPad.y = getBetweenStringPos(number - 1, number, stringCount);
            fretPad.height = getBetweenStringPos(number, number + 1, stringCount) - fretPad.y;
        }
        return fretPad;
    }

    render() {
        const { pitch, pushed, index, stringCount, number } = this.props;
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
            fretX = getFretOffset(index) - 20;
        } else {
            fretX = (getFretOffset(index) +  getFretOffset(index - 1)) / 2;
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
                    {...this.getPadRect(index)}
                />
                <rect
                    className = 'bk'
                    x = {Math.round(fretX - noteWidth / 2)}
                    y = {Math.round(getStringPos(number, stringCount) - noteHeight / 2)}
                    width = {noteWidth}
                    height = {noteHeight}
                />
                <text
                    x={Math.round(fretX)}
                    y={Math.round(getStringPos(number, stringCount)) + 1}
                >{note}</text>
            </g>
        );
    }
}
