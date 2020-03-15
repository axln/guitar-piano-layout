import React from 'react';
import Helper from "../Helper";
import { PianoKey } from './PianoKey';
import { WHITE_WIDTH, BLACK_WIDTH, BLACK_HEIGHT } from "./PianoKeyboard";

export class BlackKey extends PianoKey {
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

