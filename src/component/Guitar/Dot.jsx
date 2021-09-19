import React from 'react';
import { getFretOffset } from './Fret';
import { getStringPos } from './GuitarString';

export const Dot = React.memo(({ fret, stringCount, neckLength, fretCount, neckWidth }) => {
  let dotX = Math.round(
    (getFretOffset(fret - 1, neckLength, fretCount) + getFretOffset(fret, neckLength, fretCount)) /
      2 -
      1
  );
  const props = {
    className: 'dot',
    cx: dotX + 0.5,
    r: 6
  };

  if (fret % 12 === 0) {
    const dot1Pos = Math.round(
      (getStringPos(1, stringCount, neckWidth) + getStringPos(2, stringCount, neckWidth)) / 2
    );
    const dot2Pos = Math.round(
      (getStringPos(stringCount - 1, stringCount, neckWidth) +
        getStringPos(stringCount, stringCount, neckWidth)) /
        2
    );

    return (
      <>
        <circle {...props} cy={dot1Pos} />
        <circle {...props} cy={dot2Pos} />
      </>
    );
  } else {
    return <circle {...props} cy={neckWidth / 2} />;
  }
});
