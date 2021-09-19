import React from 'react';
import { GuitarString } from '~/component/Guitar/GuitarString';
import { Fret } from './Fret';
import { Dot } from './Dot';
import { seq } from '~/lib/Helper';
import { DEFAULT_NECK_LENGTH, DEFAULT_NECK_WIDTH, DOT_FRETS } from '~/lib/const';
import './GuitarNeck.less';

export const SIDE_MARGIN = 10;

export const GuitarNeck = React.memo(
  ({
    strings,
    fretCount = 24,
    neckLength = DEFAULT_NECK_LENGTH,
    neckWidth = DEFAULT_NECK_WIDTH
  }) => {
    const stringNotes = strings.split(' ').reverse();
    const stringCount = stringNotes.length;
    const viewBox = `0 0 ${neckLength} ${neckWidth}`;

    return (
      <svg className="guitar-neck" viewBox={viewBox} width={neckLength} height={neckWidth}>
        <rect className="neck" x={0.5} y={0.5} width={neckLength} height={neckWidth} />
        <rect className="nut" x={0.5} y={0.5} width={SIDE_MARGIN} height={neckWidth} />
        <Frets fretCount={fretCount} neckLength={neckLength} neckWidth={neckWidth} />
        <NeckDots
          stringCount={stringCount}
          fretCount={fretCount}
          neckLength={neckLength}
          neckWidth={neckWidth}
        />
        <Strings
          stringNotes={stringNotes}
          fretCount={fretCount}
          neckWidth={neckWidth}
          neckLength={neckLength}
        />
      </svg>
    );
  }
);

const Frets = React.memo(({ fretCount, neckLength, neckWidth }) =>
  seq(1, fretCount).map((fret) => (
    <Fret
      key={'f' + fret}
      number={fret}
      neckLength={neckLength}
      neckWidth={neckWidth}
      fretCount={fretCount}
    />
  ))
);

const Strings = React.memo(({ stringNotes, fretCount, neckWidth, neckLength }) =>
  stringNotes.map((note, index) => (
    <GuitarString
      key={'s' + index + 1}
      number={index + 1}
      openNote={note.toUpperCase().trim()}
      fretCount={fretCount}
      neckWidth={neckWidth}
      neckLength={neckLength}
      stringCount={stringNotes.length}
    />
  ))
);

const NeckDots = React.memo(({ stringCount, fretCount, neckLength, neckWidth }) => (
  <>
    {DOT_FRETS.filter((i) => i <= fretCount).map((fretNumber) => (
      <Dot
        key={`d${fretNumber}`}
        fret={fretNumber}
        fretCount={fretCount}
        neckLength={neckLength}
        neckWidth={neckWidth}
        stringCount={stringCount}
      />
    ))}
  </>
));
