import React from 'react';
import { useCallback } from 'react';
import { noteToPitch, pitchToNote, seq } from '~/lib/Helper';

export const Tuner = React.memo(({ baseTuning, setTuning, tuning }) => {
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

const StringTuner = React.memo(({ stringNumber, tunedStrings, stringIndex, note, onChange }) => {
  const changeHandler = (e) => {
    if (onChange) {
      onChange(stringIndex, e.target.value);
    }
  };
  return (
    <select key={`s${stringNumber}`} value={tunedStrings[stringIndex]} onChange={changeHandler}>
      <TuneOptions basePitch={noteToPitch(note)} stringNumber={stringNumber} />
    </select>
  );
});

const TuneOptions = React.memo(({ basePitch, stringNumber }) =>
  seq(-4, 4).map((semitoneDiff) => {
    const value = pitchToNote(basePitch + semitoneDiff);
    return (
      <option key={value} value={value}>
        {stringNumber}: {value}
      </option>
    );
  })
);
