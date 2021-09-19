import { useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { getPitchColor, pitchToNote, getWhiteInterval } from '~/lib/Helper';
import { WHITE_HEIGHT, WHITE_WIDTH, altNoteNames } from './PianoKeyboard';
import { stopNote } from '~/lib/SoundGenerator';
import { store } from '~/store/store';

function getNoteNumber(keyIndex) {
  return getWhiteInterval(keyIndex);
}

function getXPos(keyOffset, baseKey, index) {
  let offset = keyOffset ? keyOffset * WHITE_WIDTH : 0;
  return baseKey * WHITE_WIDTH + index * WHITE_WIDTH + offset;
}

function getAltName(pitch) {
  let note = pitchToNote(pitch);
  return altNoteNames[note[0]];
}

export const WhiteKey = observer(({ pushed, pitch, index, keyOffset, baseKey }) => {
  let style = {
    ...(pushed ? { fill: getPitchColor(pitch) + 'A0' } : {})
  };

  let xPos = getXPos(keyOffset, baseKey, index);

  const handleMouseDown = useCallback(() => {
    store.togglePitch(pitch);
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
      <rect x={xPos + 0.5} y={0.5} style={style} width={WHITE_WIDTH} height={WHITE_HEIGHT} />
      <text x={Math.round(xPos + WHITE_WIDTH / 2)} y={WHITE_HEIGHT - 50}>
        {getNoteNumber(index)}
      </text>
      <text x={Math.round(xPos + WHITE_WIDTH / 2)} y={WHITE_HEIGHT - 30}>
        {pitchToNote(pitch)}
      </text>
      <text x={Math.round(xPos + WHITE_WIDTH / 2)} y={WHITE_HEIGHT - 10}>
        {getAltName(pitch)}
      </text>
    </g>
  );
});
