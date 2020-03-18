import { h } from 'preact';
import { parseRange, getOctSize } from '../../lib/Helper';
import { Octave } from '../../container/Octave';
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

function renderOctaves(parsedRange) {
    return parsedRange.reduce((acc, octInfo) => {
        acc.octaves.push(
            <Octave
                {...octInfo}
                key = {'oct' + octInfo.number}
                baseKey = {acc.nextOffset}
            />
        );
        acc.nextOffset += getOctSize(octInfo);
        return acc;
    }, {
        octaves: [],
        nextOffset: 0
    }).octaves;
}

export function PianoKeyboard({ range }) {
    let parsedOctaves = parseRange(range);
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
                    <feGaussianBlur stdDeviation='2 2' result='shadow'/>
                    <feOffset dx='0' dy='0'/>
                </filter>
            </defs>
            {renderOctaves(parsedOctaves)}
        </svg>
    );
}
