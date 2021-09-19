import React from 'react';
import { useCallback } from 'react';
import { getPitchColor, getBlackNoteNumber } from '~/lib/Helper';
import { WHITE_WIDTH, BLACK_WIDTH, BLACK_HEIGHT, BLACK_NOTES, BLACK_NOTES_FLAT } from '~/lib/const';
import { playNote, stopNote } from '~/lib/SoundGenerator';
import { store } from '~/store/store';

function getKeyPos(number: number): number {
  if (number < 2) {
    let whiteSpace = (WHITE_WIDTH * 3 - BLACK_WIDTH * 2) / 3;
    return Math.round(whiteSpace * (number + 1) + BLACK_WIDTH * number);
  } else {
    let whiteSpace = (WHITE_WIDTH * 4 - BLACK_WIDTH * 3) / 4;
    return WHITE_WIDTH * 3 + Math.round(whiteSpace * (number - 1) + BLACK_WIDTH * (number - 2));
  }
}

function getXPos(keyOffset: number, index: number, baseKey: number) {
  let offset = keyOffset ? keyOffset * WHITE_WIDTH : 0;
  return baseKey * WHITE_WIDTH + getKeyPos(index) + offset;
}

function getAltName(index: number): string {
  return BLACK_NOTES_FLAT[index] + '\u266D';
}

type BlackKeyProps = {
  pitch: number;
  keyOffset: number;
  pushed: boolean;
  index: number;
  octave: number;
  baseKey: number;
};

export const BlackKey: React.FC<BlackKeyProps> = React.memo(
  ({ pitch, keyOffset, pushed, index, baseKey }) => {
    const handleMouseDown = useCallback(() => {
      store.togglePitch(pitch);
      playNote(pitch);
    }, [pitch]);

    const handleMouseUp = useCallback(() => {
      stopNote(pitch);
    }, [pitch]);

    let style = {
      ...(pushed ? { fill: getPitchColor(pitch) } : {})
    };

    let xPos = getXPos(keyOffset, index, baseKey);

    return (
      <g
        className="BlackKey"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}>
        <rect
          style={style}
          x={xPos + 0.5}
          y={0.5}
          width={Math.round(BLACK_WIDTH)}
          height={BLACK_HEIGHT}
        />
        <text x={Math.round(xPos + BLACK_WIDTH / 2)} y={BLACK_HEIGHT - 50}>
          {getBlackNoteNumber(index)}
        </text>
        <text x={Math.round(xPos + BLACK_WIDTH / 2)} y={BLACK_HEIGHT - 30}>
          {BLACK_NOTES[index] + '\u266F'}
        </text>
        <text x={Math.round(xPos + BLACK_WIDTH / 2)} y={BLACK_HEIGHT - 10}>
          {getAltName(index)}
        </text>
      </g>
    );
  }
);
