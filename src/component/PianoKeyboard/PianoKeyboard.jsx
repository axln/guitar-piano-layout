import React  from 'react';
import Helper, { parseRange, getOctSize } from '../Helper';
import './PianoKeyboard.less';

const WHITE_WIDTH  = 30;
const WHITE_HEIGHT = Math.round(145 / 23 * WHITE_WIDTH);
const BLACK_WIDTH  = WHITE_WIDTH * 7 / 12;
const BLACK_HEIGHT = Math.round(WHITE_HEIGHT * 0.65);

const altNoteNames = {
    C: 'do',
    D: 're',
    E: 'mi',
    F: 'fa',
    G: 'sol',
    A: 'la',
    B: 'si'
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class PianoKey extends React.Component {
    pushed = false;

    shouldComponentUpdate(nextProps) {
        return this.props.pushed !== nextProps.pushed;
    }

    getNoteNumber() {}

    /*handleMouseLeave() {
        this.handleMouseUp();
    }*/

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

    render() {}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class WhiteKey extends PianoKey {
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
        if (this.props.pushed) {
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class BlackKey extends PianoKey {
    getKeyPos(number) {
        if (number < 2) {
            let whiteSpace = (WHITE_WIDTH * 3 - BLACK_WIDTH * 2) / 3;
            return Math.round(whiteSpace * (number + 1) + BLACK_WIDTH * number);
        } else {
            let whiteSpace = (WHITE_WIDTH * 4 - BLACK_WIDTH * 3) / 4;
            return WHITE_WIDTH * 3 + Math.round(whiteSpace * (number - 1) + BLACK_WIDTH * (number - 2));
        }
    }

    getNoteNumber(keyNumber) {
        return Helper.getBlackIterval(keyNumber);
    }

    getXPos() {
        let offset = (this.props.keyOffset ? this.props.keyOffset * WHITE_WIDTH : 0);
        return this.props.baseKey * WHITE_WIDTH + this.getKeyPos(this.props.index) + offset;
    }

    getAltName() {
        let note = Helper.pitchToNote(this.props.pitch);
        //return altNoteNames[note[0]] + '#';
        return Helper.BLACK_NOTES_FLAT[this.props.index] + '\u266D'
    }

    render() {
        let xPos = this.getXPos();

        let style = {};
        if (this.props.pushed) {
            style.fill = Helper.getPitchColor(this.props.pitch);
        }

        return (
            <g
                className='BlackKey'
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
                onMouseLeave={this.handleMouseUp}
            >
                <rect
                    style={style}
                    x={xPos + 0.5}
                    y={0.5}
                    width={Math.round(BLACK_WIDTH)}
                    height={BLACK_HEIGHT}
                />
                <text x={Math.round(xPos + BLACK_WIDTH / 2)} y={BLACK_HEIGHT - 50}>{this.getNoteNumber(this.props.index)}</text>
                <text x={Math.round(xPos + BLACK_WIDTH / 2)} y={BLACK_HEIGHT - 30}>{Helper.BLACK_NOTES[this.props.index] + '\u266F'}</text>
                <text x={Math.round(xPos + BLACK_WIDTH / 2)} y={BLACK_HEIGHT - 10}>{this.getAltName()}</text>
            </g>
        );
    }
}

class Octave extends React.Component {
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
            <g className="octave" id={'oct' + this.props.number}>
                {this.renderWhiteKeys()}
                {this.renderBlackKeys()}
                <text x={textX} y={-8}>{this.props.number}</text>
            </g>
        );
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
        //console.log('white keys:', whiteKeysCount);
        const keyboardWidth = WHITE_WIDTH * whiteKeysCount;
        const viewBox = `0 0 ${keyboardWidth} ${WHITE_HEIGHT}`;
        return (
            <svg
                className='piano-keyboard'
                width={keyboardWidth}
                height={WHITE_HEIGHT}
                viewBox={viewBox}
            >
                <defs>
                    <filter id="shadow">
                        <feGaussianBlur stdDeviation="2 2" result="shadow"/>
                        <feOffset dx="0" dy="0"/>
                    </filter>
                </defs>
                {this.renderOctaves(parsedOctaves)}
            </svg>
        );
    }
}
