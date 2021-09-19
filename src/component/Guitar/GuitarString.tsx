import React from 'react';
import { observer } from 'mobx-react-lite';
import { noteToPitch, noteToBasePitch, seq } from '~/lib/Helper';
import { StringNote } from '~/component/Guitar/StringNote';
import { SIDE_MARGIN } from './GuitarNeck';
import { store } from '~/store/store';

export function getStringPos(number: number, stringCount: number, neckWidth: number): number {
  const stringSpace = Math.round((neckWidth - SIDE_MARGIN * 2) / (stringCount - 1));
  return SIDE_MARGIN + stringSpace * (number - 1);
}

export function getBetweenStringPos(
  number1: number,
  number2: number,
  stringCount: number,
  neckWidth: number
): number {
  let str1pos = getStringPos(number1, stringCount, neckWidth);
  let str2pos = getStringPos(number2, stringCount, neckWidth);
  return (str1pos + str2pos) / 2;
}

function getStringThickness(pitch: number): number {
  // just tuned to get corresponding string thickness based on pitch
  return 0.5 + Math.round((3 - pitch / 20) * 4) / 2;
}

type GuitarStringProps = {
  openNote: string;
  stringCount: number;
  number: number;
  fretCount: number;
  neckLength: number;
  neckWidth: number;
};

export const GuitarString: React.FC<GuitarStringProps> = React.memo(
  ({ openNote, stringCount, number, fretCount, neckLength, neckWidth }) => {
    const thickness = getStringThickness(noteToBasePitch(openNote));
    const fix = 0.5;

    //console.log(`${number}: ${noteToBasePitch(openNote)} => ${thickness} ${fix}`);

    return (
      <g className="string">
        <line
          className="string"
          x1={-0.5}
          y1={Math.round(getStringPos(number, stringCount, neckWidth)) + fix}
          x2={neckLength + 1.5}
          y2={Math.round(getStringPos(number, stringCount, neckWidth)) + fix}
          strokeWidth={thickness}
        />
        <Notes
          openNote={openNote}
          stringCount={stringCount}
          number={number}
          fretCount={fretCount}
          neckLength={neckLength}
          neckWidth={neckWidth}
        />
      </g>
    );
  }
);

type NotesProps = {
  openNote: string;
  stringCount: number;
  number: number;
  fretCount: number;
  neckLength: number;
  neckWidth: number;
};

const Notes: React.FC<NotesProps> = observer(
  ({ openNote, stringCount, number, fretCount, neckLength, neckWidth }) => {
    let openPitch = noteToPitch(openNote);
    return (
      <>
        {seq(0, fretCount).map((fretNumber) => (
          <StringNote
            key={`s${number}f${fretNumber}`}
            number={number}
            stringCount={stringCount}
            fretCount={fretCount}
            neckLength={neckLength}
            neckWidth={neckWidth}
            pushed={store.pitches.includes(openPitch + fretNumber)}
            index={fretNumber}
            pitch={openPitch + fretNumber}
          />
        ))}
      </>
    );
  }
);
