import React from 'react';
import { observer } from 'mobx-react-lite';
import { Octave } from '~/component/Piano/Octave';
import { parseRange, getOctSize } from '~/lib/Helper';
import { WHITE_WIDTH, WHITE_HEIGHT } from '~/lib/const';
import './PianoKeyboard.less';

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
