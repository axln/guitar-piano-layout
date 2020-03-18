import { h } from 'preact';
import { noteToPitch, noteToBasePitch, seq } from '../../lib/Helper';
import { StringNote } from '../../container/StringNote'
import { SIDE_MARGIN } from './GuitarNeck';

export function getStringPos(number, stringCount, neckWidth) {
    const stringSpace = Math.round((neckWidth - SIDE_MARGIN * 2) / (stringCount - 1));
    return SIDE_MARGIN + stringSpace * (number - 1);
}

export function getBetweenStringPos(number1, number2, stringCount, neckWidth) {
    let str1pos = getStringPos(number1, stringCount, neckWidth);
    let str2pos = getStringPos(number2, stringCount, neckWidth);
    return (str1pos + str2pos) / 2;
}

function getStringThickness(pitch) {
    // just tuned to get corresponding string thickness based on pitch
    return 0.5 + Math.round((3 - pitch / 20) * 4) / 2;
}

export function GuitarString({ openNote, stringCount, number, pitches, fretCount, neckLength, neckWidth }) {
    function renderNotes() {
        let openPitch = noteToPitch(openNote);
        return seq(0, fretCount).map(fretNumber => (
            <StringNote
                key = {`s${number}f${fretNumber}`}
                number = {number}
                stringCount={ stringCount }
                fretCount={fretCount}
                neckLength={neckLength}
                neckWidth={neckWidth}
                pushed = {pitches.includes(openPitch + fretNumber)}
                index = {fretNumber}
                pitch = {openPitch + fretNumber}
            />
        ));
    }

    const thickness = getStringThickness(noteToBasePitch(openNote));
    const fix = 0.5;

    //console.log(`${number}: ${noteToBasePitch(openNote)} => ${thickness}, ${thick2}`);

    return (
        <g className='string'>
            <line
                className = 'string'
                x1 = {-0.5}
                y1 = {Math.round(getStringPos(number, stringCount, neckWidth)) + fix}
                x2 = {neckLength + 1.5}
                y2 = {Math.round(getStringPos(number, stringCount, neckWidth)) + fix}
                strokeWidth = {thickness}
            />
            {renderNotes()}
        </g>
    );
}
