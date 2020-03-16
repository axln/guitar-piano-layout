import React  from 'react';
import { getFretOffset } from './Fret';
import { getStringPos } from './GuitarString';
import { NECK_HEIGHT } from './GuitarNeck';

export function Dot({ fret, stringCount }) {
    let dotX = Math.round((getFretOffset(fret - 1) + getFretOffset(fret)) / 2 - 1);
    const props = {
        className: 'dot',
        cx: dotX + 0.5,
        r: 6
    };

    if (fret % 12 === 0) {
        const dot1Pos = Math.round((getStringPos(1, stringCount) + getStringPos(2, stringCount)) / 2);
        const dot2Pos = Math.round((getStringPos(stringCount - 1, stringCount) + getStringPos(stringCount, stringCount)) / 2);

        return (
            <>
                <circle {...props} cy = {dot1Pos}/>
                <circle {...props} cy = {dot2Pos}/>
            </>
        );
    } else {
        return (
            <circle {...props} cy = {NECK_HEIGHT / 2}/>
        );
    }
}
