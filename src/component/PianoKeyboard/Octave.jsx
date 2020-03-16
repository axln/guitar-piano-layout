import React from 'react';
import Helper from '../Helper';
import { WHITE_WIDTH } from './PianoKeyboard';
import { WhiteKey } from '../../container/WhiteKey'
import { BlackKey } from '../../container/BlackKey';

function getKeyOffset(startFrom) {
    let offset = 0;
    if (startFrom) {
        offset -= Helper.WHITE_NOTES.indexOf(startFrom);
    }
    return offset;
}

export class Octave extends React.Component {
    renderWhiteKeys() {
        const { startFrom, endAt, number, baseKey } = this.props;

        let startWhiteIndex = startFrom ? Helper.WHITE_NOTES.indexOf(startFrom) : 0;
        let stopWhiteIndex = endAt ? Helper.WHITE_NOTES.indexOf(endAt) : 6;

        return Array.from(Helper.WHITE_NOTES).map((note, index) => {
            if (index >= startWhiteIndex && index <= stopWhiteIndex) {
                let keyPitch = Helper.octNoteToPitch(number, Helper.getWhiteInterval(index));
                return (
                    <WhiteKey
                        key = {'w' + index}
                        index = {index}
                        pitch = {keyPitch}
                        baseKey = {baseKey !== undefined  ? baseKey : number * 7}
                        keyOffset = {getKeyOffset(startFrom)}
                    />
                );
            } else {
                return null;
            }
        });
    }

    renderBlackKeys() {
        const { startFrom, endAt, number, baseKey } = this.props;
        let startBlackIndex = 0;
        if (startFrom) {
            switch(startFrom) {
                case 'D':
                    startBlackIndex = 1;
                    break;
                case 'E':
                case 'F':
                    startBlackIndex = 2;
                    break;
                case 'G':
                    startBlackIndex = 3;
                    break;
                case 'A':
                    startBlackIndex = 4;
                    break;
                case 'B':
                    startBlackIndex = 5;
                    break;
            }
        }

        let stopBlackIndex = 4;
        if (endAt) {
            switch(endAt) {
                case 'C':
                    stopBlackIndex = -1;
                    break;
                case 'D':
                    stopBlackIndex = 0;
                    break;
                case 'E':
                case 'F':
                    stopBlackIndex = 1;
                    break;
                case 'G':
                    stopBlackIndex = 2;
                    break;
                case 'A':
                    stopBlackIndex = 3;
                    break;
                case 'B':
                    stopBlackIndex = 4;
                    break;
            }
        }

        return Array.from(Helper.BLACK_NOTES).map((note, index) => {
            if (index >= startBlackIndex && index <= stopBlackIndex) {
                let keyPitch = Helper.octNoteToPitch(number, Helper.getBlackIterval(index));
                return (
                    <BlackKey
                        key = {'b' + index}
                        baseKey = {baseKey !== undefined  ? baseKey : number * 7}
                        keyOffset = {getKeyOffset(startFrom)}
                        pitch = {keyPitch}
                        octave = {number}
                        index = {index}
                        note = {note + '#'}
                    />
                );
            } else {
                return null;
            }
        });
    }

    render() {
        const { baseKey, number } = this.props;
        let textX = baseKey !== undefined
            ? baseKey * WHITE_WIDTH
            : number * 7 * WHITE_WIDTH;

        return (
            <g className = 'octave' id = {'oct' + number}>
                {this.renderWhiteKeys()}
                {this.renderBlackKeys()}
                <text x = {textX} y = {-8}>{number}</text>
            </g>
        );
    }
}
