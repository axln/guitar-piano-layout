import React  from 'react';
import { GuitarString } from './GuitarString';
import { Fret } from './Fret'
import './GuitarNeck.less';

export const NECK_WIDTH  = 1400;
export const NECK_HEIGHT = 150;
export const SIDE_MARGIN = 10;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class Dot extends React.Component {
    render() {

    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export class GuitarNeck extends React.Component {
    constructor(props) {
        super(props);
        this.stringCount = this.props.strings.split(',').length;
    }
    renderFrets() {
        let frets = [];
        for (let i = 1; i <= 24; ++i) {
            frets.push(
                <Fret
                    key={'f'+ (i)}
                    number={i}
                />
            );
        }
        return frets;
    }

    renderDots() {
        let dots = [];
        let dotFrets = [3,5,7,9,12,15,17,19,21,24];
        for (let i = 0; i < 24; ++i) {
            let index = dotFrets.indexOf(i + 1);
            if (index < 0) {
                continue;
            }
            let fret = dotFrets[index];
            let dotX = Math.round((Fret.getOffset(i) + Fret.getOffset(i+1)) / 2 - 1);
            let dotRadius = 6;
            if (fret % 12 === 0) {
                let dot1Pos = Math.round((GuitarString.getStringPos(1, this.stringCount) + GuitarString.getStringPos(2, this.stringCount)) / 2);
                let dot2Pos = Math.round((GuitarString.getStringPos(this.stringCount - 1, this.stringCount) + GuitarString.getStringPos(this.stringCount, this.stringCount)) / 2);
                dots.push(
                    <circle
                        key={`d${i+1}-1`}
                        className='dot'
                        cx={dotX + 0.5}
                        cy={dot1Pos}
                        r={dotRadius}
                    />
                );
                dots.push(
                    <circle
                        key={`d${i+1}-2`}
                        className='dot'
                        cx={dotX + 0.5}
                        cy={dot2Pos}
                        r={dotRadius}
                    />
                );
            } else {
                dots.push(
                    <circle
                        key={`d${i + 1}`}
                        className='dot'
                        cx={dotX + 0.5}
                        cy={NECK_HEIGHT / 2}
                        r={dotRadius}
                    />
                );
            }
        }
        return dots;
    }
    renderStrings() {
        return this.props.strings.split(',').map((note, index, arr) => {
            let number = index + 1;
            return (<GuitarString
                key={'s' + number}
                activePitches={this.props.activePitches}
                number={number}
                openNote={note.toUpperCase().trim()}
                onPitch={this.props.onPitch}
                stringCount={arr.length}
            />)
        });
    }

    render() {
        const viewBox = `0 0 ${NECK_WIDTH} ${NECK_HEIGHT}`;
        /*

        */
       /*
                <GuitarString number={1} openNote='G2' />
                <GuitarString number={2} openNote='D2' />
                <GuitarString number={3} openNote='A1' />
                <GuitarString number={4} openNote='E1' />
       */

      /*<GuitarString number={1} openNote='E4' />
      <GuitarString number={2} openNote='B3' />
      <GuitarString number={3} openNote='G3' />
      <GuitarString number={4} openNote='D3' />
      <GuitarString number={5} openNote='A2' />
      <GuitarString number={6} openNote='E2' />*/

        return (
            <svg className='guitar-neck' viewBox={viewBox} width={NECK_WIDTH} height={NECK_HEIGHT}>
                <rect className='neck' x={0.5} y={0.5} width={NECK_WIDTH} height={NECK_HEIGHT} />
                <rect className='nut' x={0.5} y={0.5} width={SIDE_MARGIN} height={NECK_HEIGHT} />
                {this.renderFrets()}
                {this.renderDots()}
                {this.renderStrings()}
            </svg>
        );
    }
}
