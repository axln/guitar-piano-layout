import React, { useCallback, ChangeEvent } from 'react';
import { noteToPitch, pitchToNote, seq } from '~/lib/Helper';

type TunerProps = {
  tuning: string;
  baseTuning: string;
  setTuning: (value: string) => void;
};

export const Tuner: React.FC<TunerProps> = React.memo(({ baseTuning, setTuning, tuning }) => {
  const tuningHandler = useCallback(
    (index, note) => {
      const tuningItems = tuning.split(' ');
      tuningItems[index] = note;
      setTuning(tuningItems.join(' '));
    },
    [tuning]
  );

  const resetHandler = useCallback(() => {
    setTuning(baseTuning);
  }, [setTuning, baseTuning]);

  const baseStrings = baseTuning.split(' ');
  const tunedStrings = tuning.split(' ');

  return (
    <>
      {baseStrings.map((note, index) => {
        const stringNumber = baseStrings.length - index;
        return (
          <StringTuner
            key={index}
            stringIndex={index}
            note={note}
            stringNumber={stringNumber}
            tunedStrings={tunedStrings}
            onChange={(index, note) => {
              tuningHandler(index, note);
            }}
          />
        );
      })}
      &nbsp;
      <button onClick={resetHandler}>Reset to Standard</button>
    </>
  );
});

type StringTunerProps = {
  stringNumber: number;
  tunedStrings: string[];
  stringIndex: number;
  note: string;
  onChange: (index: number, value: string) => void;
};

const StringTuner: React.FC<StringTunerProps> = React.memo(
  ({ stringNumber, tunedStrings, stringIndex, note, onChange }) => {
    const changeHandler = useCallback(
      (e: ChangeEvent<HTMLSelectElement>) => {
        if (onChange) {
          onChange(stringIndex, e.target.value);
        }
      },
      [stringIndex]
    );
    return (
      <select key={`s${stringNumber}`} value={tunedStrings[stringIndex]} onChange={changeHandler}>
        <TuneOptions basePitch={noteToPitch(note)} stringNumber={stringNumber} />
      </select>
    );
  }
);

type TuneOptionsProps = {
  basePitch: number;
  stringNumber: number;
};

const TuneOptions: React.FC<TuneOptionsProps> = React.memo(({ basePitch, stringNumber }) => (
  <>
    {seq(-4, 4).map((semitoneDiff) => {
      const value = pitchToNote(basePitch + semitoneDiff);
      return (
        <option key={value} value={value}>
          {stringNumber}: {value}
        </option>
      );
    })}
  </>
));
