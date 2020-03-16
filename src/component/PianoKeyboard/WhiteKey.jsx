import React from 'react';
import { PianoKey } from './PianoKey';
import Helper from '../Helper';
import { WHITE_HEIGHT, WHITE_WIDTH, altNoteNames } from './PianoKeyboard';

export class WhiteKey extends PianoKey {
    getNoteNumber(keyIndex) {
        return Helper.getWhiteInterval(keyIndex);
    }

    getXPos() {
        let offset = (this.props.keyOffset ? this.props.keyOffset * WHITE_WIDTH : 0);
        return this.props.baseKey * WHITE_WIDTH  + this.props.index * WHITE_WIDTH + offset;
    }

    getAltName() {
        let note = Helper.pitchToNote(this.props.pitch);
        return altNoteNames[note[0]];
    }

    render() {
        /*let style = {
            'strokeDasharray': `${width},${this.props.height},${this.props.height + width}`
        };*/

        let xPos = this.getXPos();
        let style = {};
        const pushed = this.props.pitches.includes(this.props.pitch);
        if (pushed) {
            style.fill = Helper.getPitchColor(this.props.pitch) + 'A0';
        }

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
                    {this.getNoteNumber(this.props.index)}
                </text>
                <text
                    x = {Math.round(xPos + WHITE_WIDTH / 2)}
                    y = {WHITE_HEIGHT - 30}
                >
                    {Helper.pitchToNote(this.props.pitch)}
                </text>
                <text
                    style = {{backgroundColor: 'white'}}
                    x = {Math.round(xPos + WHITE_WIDTH / 2)}
                    y = {WHITE_HEIGHT - 10}
                >
                    {this.getAltName()}
                </text>
            </g>
        );
    }
}
