import React from 'react';
import { SIDE_MARGIN } from './GuitarNeck';

export const getFretOffset = (number, neckLength, fretCount) => {
  if (number === 0) {
    return SIDE_MARGIN;
  } else if (number < 0) {
    return -10;
  } else {
    let stringLength;
    if (fretCount === 24) {
      stringLength = ((neckLength - SIDE_MARGIN) * 4) / 3;
    } else {
      const newNeckLength =
        ((neckLength - SIDE_MARGIN) / getFretOffset(fretCount, neckLength, 24)) * neckLength;
      stringLength = ((newNeckLength - SIDE_MARGIN) * 4) / 3;
    }
    return Math.round((1 - 1 / Math.pow(2, number / 12)) * stringLength);
  }
};

export const Fret = React.memo(({ number, fretCount, neckLength, neckWidth }) => {
  const fretX = getFretOffset(number, neckLength, fretCount);

  return (
    <g className="fret">
      <line x1={fretX} y1={0} strokeWidth={4} x2={fretX} y2={neckWidth + 1} />
      <text x={fretX - 15} y={neckWidth + 15}>
        {number}
      </text>
    </g>
  );
});
