import React, { useCallback } from 'react';
import { getPitchColor, pitchToNote, getWhiteNoteNumber, getAltName } from '~/lib/Helper';
import { WHITE_HEIGHT, WHITE_WIDTH } from '~/lib/const';
import { stopNote } from '~/lib/SoundGenerator';
import { playNote } from '~/lib/SoundGenerator';
import { store } from '~/store/store';

function getXPos(keyOffset: number, baseKey: number, index: number): number {
  let offset = keyOffset ? keyOffset * WHITE_WIDTH : 0;
  return baseKey * WHITE_WIDTH + index * WHITE_WIDTH + offset;
}

type WhiteKeyProps = {
  pushed: boolean;
  pitch: number;
  index: number;
  keyOffset: number;
  baseKey: number;
};

export const WhiteKey: React.FC<WhiteKeyProps> = React.memo(
  ({ pushed, pitch, index, keyOffset, baseKey }) => {
    let style = {
      ...(pushed ? { fill: getPitchColor(pitch) + 'A0' } : {})
    };

    let xPos = getXPos(keyOffset, baseKey, index);

    const handleMouseDown = useCallback(() => {
      store.togglePitch(pitch);
      playNote(pitch);
    }, [pitch]);

    const handleMouseUp = useCallback(() => {
      stopNote(pitch);
    }, [pitch]);

    return (
      <g
        className="WhiteKey"
        onMouseLeave={handleMouseUp}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}>
        <rect style={style} x={xPos + 0.5} y={0.5} width={WHITE_WIDTH} height={WHITE_HEIGHT} />
        <text x={Math.round(xPos + WHITE_WIDTH / 2)} y={WHITE_HEIGHT - 50}>
          {getWhiteNoteNumber(index)}
        </text>
        <text x={Math.round(xPos + WHITE_WIDTH / 2)} y={WHITE_HEIGHT - 30}>
          {pitchToNote(pitch)}
        </text>
        <text x={Math.round(xPos + WHITE_WIDTH / 2)} y={WHITE_HEIGHT - 10}>
          {getAltName(pitch)}
        </text>
      </g>
    );
  }
);
