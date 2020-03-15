import React  from 'react';
import Helper from '../Helper';
import { WHITE_WIDTH } from './PianoKeyboard';
import { WhiteKey } from './WhiteKey'
import { BlackKey } from './BlackKey';

export class Octave extends React.Component {
    getKeyOffset() {
        let offset = 0;
        if (this.props.startFrom) {
            offset -= Helper.WHITE_NOTES.indexOf(this.props.startFrom);
        }
        return offset;
    }

    renderWhiteKeys() {
        let startWhiteIndex = this.props.startFrom ? Helper.WHITE_NOTES.indexOf(this.props.startFrom) : 0;
        let stopWhiteIndex = this.props.endAt ? Helper.WHITE_NOTES.indexOf(this.props.endAt) : 6;
        let whiteKeys = Helper.WHITE_NOTES.split('').map((note, index) => {
            if (index >= startWhiteIndex && index <= stopWhiteIndex) {
                let keyPitch = Helper.octNoteToPitch(this.props.number, Helper.getWhiteInterval(index));
                return (
                    <WhiteKey
                        key={'w' + index}
                        index={index}
                        pitch={keyPitch}
                        pushed={this.props.activePitches.indexOf(keyPitch) >= 0}
                        onPitch={this.props.onPitch}
                        baseKey={this.props.baseKey !== undefined  ? this.props.baseKey : this.props.number * 7}
                        keyOffset={this.getKeyOffset()}
                    />
                );
            } else {
                return null;
            }
        });
        return whiteKeys;
    }

    renderBlackKeys() {
        let startBlackIndex = 0;
        if (this.props.startFrom) {
            switch(this.props.startFrom) {
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
        if (this.props.endAt) {
            switch(this.props.endAt) {
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

        const blackKeys = Array.from(Helper.BLACK_NOTES).map((note, index) => {
            if (index >= startBlackIndex && index <= stopBlackIndex) {
                let keyPitch = Helper.octNoteToPitch(this.props.number, Helper.getBlackIterval(index));
                return (
                    <BlackKey
                        key = {'b' + index}
                        baseKey = {this.props.baseKey !== undefined  ? this.props.baseKey : this.props.number * 7}
                        keyOffset = {this.getKeyOffset()}
                        pushed = {this.props.activePitches.indexOf(keyPitch) >=0}
                        pitch = {keyPitch}
                        octave = {this.props.number}
                        index = {index}
                        note = {note + '#'}
                        onPitch = {this.props.onPitch}
                    />
                );
            } else {
                return null;
            }
        });
        return blackKeys;
    }

    render() {
        let textX = (
            this.props.baseKey !== undefined
                ? this.props.baseKey * WHITE_WIDTH
                : this.props.number * 7 * WHITE_WIDTH
        );
        return (
            <g className = 'octave' id={'oct' + this.props.number}>
                {this.renderWhiteKeys()}
                {this.renderBlackKeys()}
                <text x={textX} y={-8}>{this.props.number}</text>
            </g>
        );
    }
}
