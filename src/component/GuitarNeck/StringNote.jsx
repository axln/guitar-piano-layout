import React  from 'react';
import Helper from "../Helper";
import { NECK_HEIGHT } from './GuitarNeck';
import { getFretOffset } from './Fret';
import { getStringPos, getBetweenStringPos } from './GuitarString';

export class StringNote extends React.Component {
    pushed = false;

    shouldComponentUpdate(nextProps) {
        return this.props.pushed !== nextProps.pushed;
    }

    handleMouseDown = () => {
        this.props.onPitch(this.props.pitch, 'down');
        this.pushed = true;
    };

    handleMouseUp = () => {
        if (this.pushed) {
            this.props.onPitch(this.props.pitch, 'up');
            this.pushed = false;
        }
    };

    getPadRect() {
        let fretPad = {};

        fretPad.x = getFretOffset(this.props.index - 1);
        fretPad.width = getFretOffset(this.props.index) - getFretOffset(this.props.index - 1);

        if (this.props.number === 1) {
            fretPad.y = 0;
            fretPad.height = (getStringPos(1, this.props.stringCount) + getStringPos(2, this.props.stringCount)) / 2;
        } else if (this.props.number === this.props.stringCount) {
            fretPad.y = getBetweenStringPos(this.props.number - 1, this.props.number, this.props.stringCount);
            fretPad.height = NECK_HEIGHT - fretPad.y;
        } else {
            fretPad.y = getBetweenStringPos(this.props.number - 1, this.props.number, this.props.stringCount);
            fretPad.height = getBetweenStringPos(this.props.number, this.props.number + 1, this.props.stringCount) - fretPad.y;
        }
        return fretPad;
    }

    render() {
        let note = Helper.pitchToNote(this.props.pitch);
        let className = note.length === 2 ? 'note' : 'note black';
        let style = {};
        if (this.props.pushed) {
            className += ' pushed';
            style.fill = Helper.getPitchColor(this.props.pitch) + 'B0';
        }

        let fretX;
        if (this.props.index === 0) {
            fretX = 0;
        } else  if (this.props.index <= 16) {
            fretX = getFretOffset(this.props.index) - 20;
        } else {
            fretX = (getFretOffset(this.props.index) +  getFretOffset(this.props.index - 1)) / 2;
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
                    {...this.getPadRect(this.props.index)}
                />
                <rect
                    className = 'bk'
                    x = {Math.round(fretX - noteWidth / 2)}
                    y = {Math.round(getStringPos(this.props.number, this.props.stringCount) - noteHeight / 2)}
                    width = {noteWidth}
                    height = {noteHeight}
                />
                <text
                    x={Math.round(fretX)}
                    y={Math.round(getStringPos(this.props.number, this.props.stringCount)) + 1}
                >{note}</text>
            </g>
        );
    }
}
