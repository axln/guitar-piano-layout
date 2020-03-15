import React  from 'react';
import { GuitarString } from './GuitarString';
import { Fret } from './Fret'
import { Dot } from './Dot';
import './GuitarNeck.less';

export const NECK_WIDTH  = 1400;
export const NECK_HEIGHT = 150;
export const SIDE_MARGIN = 10;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export class GuitarNeck extends React.Component {
    stringCount = this.props.strings.split(',').length;

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
        return [3,5,7,9,12,15,17,19,21,24].map(fret => (
            <Dot
                key = {`d${fret}`}
                fret = {fret}
                stringCount = {this.stringCount}
            />
        ));
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
        return (
            <svg
                className = 'guitar-neck'
                viewBox = {viewBox}
                width = {NECK_WIDTH}
                height = {NECK_HEIGHT}
            >
                <rect className='neck' x={0.5} y={0.5} width={NECK_WIDTH} height={NECK_HEIGHT} />
                <rect className='nut' x={0.5} y={0.5} width={SIDE_MARGIN} height={NECK_HEIGHT} />
                {this.renderFrets()}
                {this.renderDots()}
                {this.renderStrings()}
            </svg>
        );
    }
}
