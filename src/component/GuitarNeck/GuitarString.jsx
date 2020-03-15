import React  from 'react';
import { noteToPitch } from '../Helper';
import { StringNote } from './StringNote';
import { NECK_WIDTH, NECK_HEIGHT, SIDE_MARGIN } from "./GuitarNeck";

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
        let baseFix = this.props.stringCount === 4 ? 2 : 0;

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
        let notes = [];
        let openPitch = noteToPitch(this.props.openNote);
        for (let i = 0; i <= 24; ++i) {
            let pitch = openPitch + i;
            notes.push(
                <StringNote
                    number={this.props.number}
                    stringCount={this.props.stringCount}
                    index={i}
                    onPitch={this.props.onPitch}
                    pushed={this.props.activePitches.indexOf(pitch) >= 0}
                    pitch = {pitch}
                    key = {'n' + this.props.number + 'f' + i}
                />
            );
        }
        return notes;
    }

    render() {
        const [thickness, fix] = this.getStringThickness(this.props.number);
        return (
            <g className='string'>
                <line
                    className='string'
                    x1 = {-0.5}
                    y1 = {Math.round(getStringPos(this.props.number, this.props.stringCount)) + fix}
                    x2 = {NECK_WIDTH + 1.5}
                    y2 = {Math.round(getStringPos(this.props.number, this.props.stringCount)) + fix}
                    strokeWidth = {thickness}
                />
                {this.renderNotes()}
            </g>
        );
    }
}
