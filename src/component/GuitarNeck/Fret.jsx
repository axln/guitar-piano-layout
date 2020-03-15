import React  from 'react';
import { NECK_HEIGHT, NECK_WIDTH, SIDE_MARGIN } from "./GuitarNeck";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export class Fret extends React.Component {
    static getOffset(number) {
        if (number === 0) {
            return SIDE_MARGIN;
        } else if (number < 0) {
            return -10;
        } else {
            let stringLength = (NECK_WIDTH - SIDE_MARGIN) * 4 / 3;
            return  (1 - 1 / Math.pow(2, number / 12)) * stringLength;
        }

    }

    render() {
        const fretX = Math.round(Fret.getOffset(this.props.number));
        //let labelX = Math.round((Fret.getOffset(this.props.number - 1) + Fret.getOffset(this.props.number)) / 2);

        return (
            <g className='fret'>
                <line
                    x1={fretX}
                    y1={0}
                    strokeWidth={4}
                    x2={fretX}
                    y2={NECK_HEIGHT + 1}
                />
                <text x={fretX - 15} y={NECK_HEIGHT + 15}>{this.props.number}</text>
            </g>
        );
    }
}
