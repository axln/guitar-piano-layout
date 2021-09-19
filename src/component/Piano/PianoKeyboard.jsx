import React from 'react';
import { observer } from 'mobx-react-lite';
import { Octave } from '~/component/Piano/Octave';
import { parseRange, getOctSize } from '~/lib/Helper';
import './PianoKeyboard.less';

export const WHITE_WIDTH = 30;
export const WHITE_HEIGHT = Math.round((145 / 23) * WHITE_WIDTH);
export const BLACK_WIDTH = (WHITE_WIDTH * 7) / 12;
export const BLACK_HEIGHT = Math.round(WHITE_HEIGHT * 0.65);

export const altNoteNames = {
  C: 'do',
  D: 're',
  E: 'mi',
  F: 'fa',
  G: 'sol',
  A: 'la',
  B: 'si'
};

const Octaves = React.memo(({ octaves }) => {
  let nextOffset = 0;
  return octaves.map((octInfo) => {
    const octSize = getOctSize(octInfo);
    nextOffset += octSize;
    return <Octave key={'oct' + octInfo.number} {...octInfo} baseKey={nextOffset - octSize} />;
  });
});

export const PianoKeyboard = observer(({ range }) => {
  let parsedOctaves = parseRange(range);
  let whiteKeysCount = parsedOctaves.reduce((acc, value) => acc + getOctSize(value), 0);
  const keyboardWidth = WHITE_WIDTH * whiteKeysCount;

  const svgProps = {
    width: keyboardWidth,
    height: WHITE_HEIGHT,
    viewBox: `0 0 ${keyboardWidth} ${WHITE_HEIGHT}`
  };

  return (
    <svg className="piano-keyboard" {...svgProps}>
      <defs>
        <filter id="shadow">
          <feGaussianBlur stdDeviation="2 2" result="shadow" />
          <feOffset dx="0" dy="0" />
        </filter>
      </defs>
      <Octaves octaves={parsedOctaves} />
    </svg>
  );
});
