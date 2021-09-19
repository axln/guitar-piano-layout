import { useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { BLACK_NOTES, BLACK_NOTES_FLAT, getPitchColor, getBlackInterval } from '~/lib/Helper';
import { WHITE_WIDTH, BLACK_WIDTH, BLACK_HEIGHT } from '~/component/Piano/PianoKeyboard';
import { playNote, stopNote } from '~/lib/SoundGenerator';
import { store } from '~/store/store';

function getKeyPos(number) {
  if (number < 2) {
    let whiteSpace = (WHITE_WIDTH * 3 - BLACK_WIDTH * 2) / 3;
    return Math.round(whiteSpace * (number + 1) + BLACK_WIDTH * number);
  } else {
    let whiteSpace = (WHITE_WIDTH * 4 - BLACK_WIDTH * 3) / 4;
    return WHITE_WIDTH * 3 + Math.round(whiteSpace * (number - 1) + BLACK_WIDTH * (number - 2));
  }
}

function getNoteNumber(keyNumber) {
  return getBlackInterval(keyNumber);
}

function getXPos(keyOffset, index, baseKey) {
  let offset = keyOffset ? keyOffset * WHITE_WIDTH : 0;
  return baseKey * WHITE_WIDTH + getKeyPos(index) + offset;
}

function getAltName(index) {
  return BLACK_NOTES_FLAT[index] + '\u266D';
}

export const BlackKey = observer(({ pitch, keyOffset, pushed, index, baseKey }) => {
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
        {getNoteNumber(index)}
      </text>
      <text x={Math.round(xPos + BLACK_WIDTH / 2)} y={BLACK_HEIGHT - 30}>
        {BLACK_NOTES[index] + '\u266F'}
      </text>
      <text x={Math.round(xPos + BLACK_WIDTH / 2)} y={BLACK_HEIGHT - 10}>
        {getAltName(index)}
      </text>
    </g>
  );
});
