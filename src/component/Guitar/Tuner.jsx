import { useCallback } from 'react';
import { noteToPitch, pitchToNote } from '~/lib/Helper';

export const Tuner = ({ baseTuning, setTuning, tuning }) => {
  const handleChange = useCallback(
    (index, note) => {
      const tuningItems = tuning.split(' ');
      tuningItems[index] = note;
      setTuning(tuningItems.join(' '));
    },
    [tuning]
  );

  const clickHandler = useCallback(() => {
    setTuning(baseTuning);
  }, [setTuning, baseTuning]);

  const baseStrings = baseTuning.split(' ');
  const tunedStrings = tuning.split(' ');

  return (
    <>
      {baseStrings.map((note, index) => {
        const stringNumber = baseStrings.length - index;
        return (
          <select
            key={`s${stringNumber}`}
            onChange={(e) => {
              handleChange(index, e.target.value);
            }}
            value={tunedStrings[index]}>
            {renderOptions(noteToPitch(note), stringNumber)}
          </select>
        );
      })}
      &nbsp;
      <button onClick={clickHandler}>Reset to Standard</button>
    </>
  );
};

function renderOptions(basePitch, stringNumber) {
  const options = [];
  const tuningRange = 4; // semitones
  for (let i = -tuningRange; i <= tuningRange; ++i) {
    const value = pitchToNote(basePitch + i);
    options.push(
      <option key={value} value={value}>
        {stringNumber}: {value}
      </option>
    );
  }
  return options;
}
