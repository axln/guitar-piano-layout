import React  from 'react';
import { parseRange, getOctSize } from '../Helper';
import { Octave } from './Octave';
import './PianoKeyboard.less';

export const WHITE_WIDTH  = 30;
export const WHITE_HEIGHT = Math.round(145 / 23 * WHITE_WIDTH);
export const BLACK_WIDTH  = WHITE_WIDTH * 7 / 12;
export const BLACK_HEIGHT = Math.round(WHITE_HEIGHT * 0.65);

export const altNoteNames = {
    C: 'do',
    D: 're',
    E: 'mi',
    F: 'fa',
    G: 'sol',
    A: 'la',
    B: 'si'
};

export class PianoKeyboard extends React.Component {
    renderOctaves(parsedRange) {
        let nextOffset = 0;
        let octaves = [];

        for (let octInfo of parsedRange) {
            octaves.push(
                <Octave
                    {...octInfo}
                    key = {'oct' + octInfo.number}
                    activePitches = {this.props.activePitches}
                    onPitch = {this.props.onPitch}
                    baseKey = {nextOffset}
                />
            );
            nextOffset += getOctSize(octInfo);
        }
        return octaves;
    };

    render() {
        let parsedOctaves = parseRange(this.props.range);
        let whiteKeysCount = parsedOctaves.reduce((acc, value) => {return acc + getOctSize(value)}, 0);
        const keyboardWidth = WHITE_WIDTH * whiteKeysCount;
        const viewBox = `0 0 ${keyboardWidth} ${WHITE_HEIGHT}`;
        return (
            <svg
                className = 'piano-keyboard'
                width = {keyboardWidth}
                height = {WHITE_HEIGHT}
                viewBox = {viewBox}
            >
                <defs>
                    <filter id='shadow'>
                        <feGaussianBlur stdDeviation='2 2" result="shadow'/>
                        <feOffset dx='0' dy='0'/>
                    </filter>
                </defs>
                {this.renderOctaves(parsedOctaves)}
            </svg>
        );
    }
}
