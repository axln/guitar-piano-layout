import React from 'react';
import { GuitarString } from '../../container/GuitarString';
import { Fret } from './Fret'
import { Dot } from './Dot';
import { seq } from '../../lib/Helper';
import './GuitarNeck.less';

export const NECK_WIDTH  = 1400;
export const NECK_HEIGHT = 150;
export const SIDE_MARGIN = 10;

function renderFrets() {
    return seq(1,24).map(fret => (
        <Fret key = {'f'+ (fret)} number = {fret}/>
    ));
}

function renderDots(stringCount) {
    return [3,5,7,9,12,15,17,19,21,24].map(fret => (
        <Dot
            key = {`d${fret}`}
            fret = {fret}
            stringCount = {stringCount}
        />
    ));
}

export function GuitarNeck({ strings }) {
    const stringCount = strings.split(',').length;
    const viewBox = `0 0 ${NECK_WIDTH} ${NECK_HEIGHT}`;

    function renderStrings() {
        return strings.split(',').map((note, index) => {
            let number = index + 1;
            return (<GuitarString
                key = {'s' + number}
                number = {number}
                openNote = {note.toUpperCase().trim()}
                stringCount = {stringCount}
            />)
        });
    }

    return (
        <svg
            className = 'guitar-neck'
            viewBox = {viewBox}
            width = {NECK_WIDTH}
            height = {NECK_HEIGHT}
        >
            <rect className='neck' x={0.5} y={0.5} width={NECK_WIDTH} height={NECK_HEIGHT} />
            <rect className='nut' x={0.5} y={0.5} width={SIDE_MARGIN} height={NECK_HEIGHT} />
            {renderFrets()}
            {renderDots(stringCount)}
            {renderStrings(strings)}
        </svg>
    );
}
