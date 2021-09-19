import React from 'react';
import { useCallback } from 'react';
import { pitchToNote, getPitchColor } from '~/lib/Helper';
import { getFretOffset } from './Fret';
import { getStringPos, getBetweenStringPos } from './GuitarString';
import { stopNote } from '~/lib/SoundGenerator';
import { store } from '~/store/store';

type StringNoteProps = {
  pitch: number;
  pushed: boolean;
  index: number;
  stringCount: number;
  number: number;
  fretCount: number;
  neckLength: number;
  neckWidth: number;
};

export const StringNote: React.FC<StringNoteProps> = React.memo(
  ({ pitch, pushed, index, stringCount, number, fretCount, neckLength, neckWidth }) => {
    function getPadRect() {
      let fretPad: Partial<{
        x: number;
        width: number;
        y: number;
        height: number;
      }> = {};

      fretPad.x = getFretOffset(index - 1, neckLength, fretCount);
      fretPad.width =
        getFretOffset(index, neckLength, fretCount) -
        getFretOffset(index - 1, neckLength, fretCount);

      if (number === 1) {
        fretPad.y = 0;
        fretPad.height =
          (getStringPos(1, stringCount, neckWidth) + getStringPos(2, stringCount, neckWidth)) / 2;
      } else if (number === stringCount) {
        fretPad.y = getBetweenStringPos(number - 1, number, stringCount, neckWidth);
        fretPad.height = neckWidth - fretPad.y;
      } else {
        fretPad.y = getBetweenStringPos(number - 1, number, stringCount, neckWidth);
        fretPad.height =
          getBetweenStringPos(number, number + 1, stringCount, neckWidth) - fretPad.y;
      }
      return fretPad;
    }

    const handleMouseDown = useCallback(() => {
      store.togglePitch(pitch);
    }, [pitch]);

    const handleMouseUp = useCallback(() => {
      stopNote(pitch);
    }, [pitch]);

    let note = pitchToNote(pitch);
    let className = note.length === 2 ? 'note' : 'note black';
    let style: Partial<{ fill: string }> = {};
    if (pushed) {
      className += ' pushed';
      style.fill = getPitchColor(pitch) + 'B0';
    }

    let fretX;
    if (index === 0) {
      fretX = 0;
    } else if (index <= 16) {
      fretX = getFretOffset(index, neckLength, fretCount) - 20;
    } else {
      fretX =
        (getFretOffset(index, neckLength, fretCount) +
          getFretOffset(index - 1, neckLength, fretCount)) /
        2;
    }

    let noteHeight = 13;
    let noteWidth = 21;

    return (
      <g
        className={className}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}>
        <rect style={style} className="noteArea" {...getPadRect()} />
        <rect
          className="bk"
          x={Math.round(fretX - noteWidth / 2)}
          y={Math.round(getStringPos(number, stringCount, neckWidth) - noteHeight / 2)}
          width={noteWidth}
          height={noteHeight}
        />
        <text
          x={Math.round(fretX)}
          y={Math.round(getStringPos(number, stringCount, neckWidth)) + 1}>
          {note}
        </text>
      </g>
    );
  }
);
