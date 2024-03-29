import React from 'react';
import { observer } from 'mobx-react-lite';
import { OctaveInfo, octNoteToPitch, getWhiteInterval, getBlackInterval } from '~/lib/Helper';
import { WHITE_WIDTH, WHITE_NOTES, BLACK_NOTES } from '~/lib/const';
import { WhiteKey } from '~/component/Piano/WhiteKey';
import { BlackKey } from '~/component/Piano/BlackKey';
import { store } from '~/store/store';

function getKeyOffset(startFrom: string | undefined): number {
  let offset = 0;
  if (startFrom) {
    offset -= WHITE_NOTES.indexOf(startFrom);
  }
  return offset;
}

type WhiteKeysProps = {
  startFrom: string;
  baseKey: number;
  endAt: string;
  number: number;
};

const WhiteKeys: React.FC<WhiteKeysProps> = observer(({ startFrom, baseKey, endAt, number }) => {
  let startWhiteIndex = startFrom ? WHITE_NOTES.indexOf(startFrom) : 0;
  let stopWhiteIndex = endAt ? WHITE_NOTES.indexOf(endAt) : 6;

  return (
    <>
      {Array.from(WHITE_NOTES).map((note, index) => {
        if (index >= startWhiteIndex && index <= stopWhiteIndex) {
          let keyPitch = octNoteToPitch(number, getWhiteInterval(index));
          return (
            <WhiteKey
              key={'w' + index}
              index={index}
              pitch={keyPitch}
              pushed={store.pitches.includes(keyPitch)}
              baseKey={baseKey !== undefined ? baseKey : number * 7}
              keyOffset={getKeyOffset(startFrom)}
            />
          );
        } else {
          return null;
        }
      })}
    </>
  );
});

type BlackKeysProps = {
  startFrom?: string;
  endAt?: string;
  baseKey: number;
  number: number;
};

const BlackKeys: React.FC<BlackKeysProps> = observer(({ startFrom, endAt, baseKey, number }) => {
  let startBlackIndex = 0;
  if (startFrom) {
    switch (startFrom) {
      case 'D':
        startBlackIndex = 1;
        break;
      case 'E':
      case 'F':
        startBlackIndex = 2;
        break;
      case 'G':
        startBlackIndex = 3;
        break;
      case 'A':
        startBlackIndex = 4;
        break;
      case 'B':
        startBlackIndex = 5;
        break;
    }
  }

  let stopBlackIndex = 4;
  if (endAt) {
    switch (endAt) {
      case 'C':
        stopBlackIndex = -1;
        break;
      case 'D':
        stopBlackIndex = 0;
        break;
      case 'E':
      case 'F':
        stopBlackIndex = 1;
        break;
      case 'G':
        stopBlackIndex = 2;
        break;
      case 'A':
        stopBlackIndex = 3;
        break;
      case 'B':
        stopBlackIndex = 4;
        break;
    }
  }

  return (
    <>
      {Array.from(BLACK_NOTES).map((note, index) => {
        if (index >= startBlackIndex && index <= stopBlackIndex) {
          let keyPitch = octNoteToPitch(number, getBlackInterval(index));
          return (
            <BlackKey
              key={'b' + index}
              baseKey={baseKey !== undefined ? baseKey : number * 7}
              keyOffset={getKeyOffset(startFrom)}
              pitch={keyPitch}
              pushed={store.pitches.includes(keyPitch)}
              octave={number}
              index={index}
              /*note={note + '#'}*/
            />
          );
        } else {
          return null;
        }
      })}
    </>
  );
});

type OctaveProps = {
  baseKey?: number;
  number: number;
  startFrom?: string;
  endAt?: string;
};

export const Octave: React.FC<OctaveProps> = React.memo(({ baseKey, number, startFrom, endAt }) => {
  const textProps = {
    x: baseKey !== undefined ? baseKey * WHITE_WIDTH : number * 7 * WHITE_WIDTH,
    y: -8
  };

  return (
    <g className="octave" id={'oct' + number}>
      <WhiteKeys baseKey={baseKey} startFrom={startFrom} endAt={endAt} number={number} />
      <BlackKeys baseKey={baseKey} startFrom={startFrom} endAt={endAt} number={number} />
      <text {...textProps}>{number}</text>
    </g>
  );
});
