import React  from 'react';
import { noteToPitch, seq } from '../../lib/Helper';
import { StringNote } from '../../container/StringNote'
import { NECK_WIDTH, NECK_HEIGHT, SIDE_MARGIN } from './GuitarNeck';

export function getStringPos(number, stringCount) {
    const stringSpace = Math.round((NECK_HEIGHT - SIDE_MARGIN * 2) / (stringCount - 1));
    return SIDE_MARGIN + stringSpace * (number - 1);
}

export function getBetweenStringPos(number1, number2, stringCount) {
    let str1pos = getStringPos(number1, stringCount);
    let str2pos = getStringPos(number2, stringCount);
    return (str1pos + str2pos) / 2;
}

export class GuitarString extends React.Component {
    getStringThickness(number) {
        const { stringCount } = this.props;
        let baseFix = stringCount === 4 ? 2 : 0;

        switch(number) {
            case 1:
                return [1 + baseFix, 0.5];
            case 2:
                return [1.5 + baseFix, 0.5];
            case 3:
                return [2 + baseFix, 0];
            case 4:
                return [2.5 + baseFix,0];
            case 5:
                return [3 + baseFix, 0.5];
            case 6:
                return [3.5 + baseFix, 0];
        }
    }

    renderNotes() {
        const { openNote, stringCount, number, pitches } = this.props;
        let openPitch = noteToPitch(openNote);
        return seq(0, 24).map(fretNumber => (
            <StringNote
                key = {`s${number}f${fretNumber}`}
                number = {number}
                stringCount = { stringCount }
                pushed = {pitches.includes(openPitch + fretNumber)}
                index = {fretNumber}
                pitch = {openPitch + fretNumber}
            />
        ));
    }

    render() {
        const { number, stringCount } = this.props;
        const [thickness, fix] = this.getStringThickness(number);
        return (
            <g className='string'>
                <line
                    className = 'string'
                    x1 = {-0.5}
                    y1 = {Math.round(getStringPos(number, stringCount)) + fix}
                    x2 = {NECK_WIDTH + 1.5}
                    y2 = {Math.round(getStringPos(number, stringCount)) + fix}
                    strokeWidth = {thickness}
                />
                {this.renderNotes()}
            </g>
        );
    }
}
