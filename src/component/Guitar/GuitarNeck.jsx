import React from 'react';
import { GuitarString } from '../../container/GuitarString';
import { Fret } from './Fret'
import { Dot } from './Dot';
import { seq } from '../../lib/Helper';
import { DEFAULT_NECK_LENGTH, DEFAULT_NECK_WIDTH } from '../../lib/const';
import './GuitarNeck.less';

export const SIDE_MARGIN = 10;

function renderFrets(fretCount, neckLength, neckWidth) {
    return seq(1, fretCount).map(fret => (
        <Fret
            key={'f'+ (fret)}
            number={fret}
            neckLength={neckLength}
            neckWidth={neckWidth}
            fretCount={fretCount}
        />
    ));
}

function renderDots(stringCount, fretCount, neckLength, neckWidth) {
    return [3,5,7,9,12,15,17,19,21,24].filter(i => i <= fretCount).map(fret => (
        <Dot
            key={`d${fret}`}
            fret={fret}
            fretCount={fretCount}
            neckLength={neckLength}
            neckWidth={neckWidth}
            stringCount={stringCount}
        />
    ));
}

export function GuitarNeck({ strings, fretCount = 24, neckLength = DEFAULT_NECK_LENGTH, neckWidth = DEFAULT_NECK_WIDTH }) {
    const stringNotes = strings.split(' ').reverse();
    const stringCount = stringNotes.length;
    const viewBox = `0 0 ${neckLength} ${neckWidth}`;

    function renderStrings() {
        return stringNotes.map((note, index) => {
            let number = index + 1;
            return (<GuitarString
                key={'s' + number}
                number={number}
                openNote={note.toUpperCase().trim()}
                fretCount={fretCount}
                neckWidth={neckWidth}
                neckLength={neckLength}
                stringCount={stringCount}
            />)
        });
    }

    return (
        <svg
            className='guitar-neck'
            viewBox={viewBox}
            width={neckLength}
            height={neckWidth}
        >
            <rect className='neck' x={0.5} y={0.5} width={neckLength} height={neckWidth} />
            <rect className='nut' x={0.5} y={0.5} width={SIDE_MARGIN} height={neckWidth} />
            {renderFrets(fretCount, neckLength, neckWidth)}
            {renderDots(stringCount, fretCount, neckLength, neckWidth)}
            {renderStrings(strings)}
        </svg>
    );
}
