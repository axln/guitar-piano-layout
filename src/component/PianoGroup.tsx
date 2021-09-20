import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { PianoKeyboard } from '~/component/Piano/PianoKeyboard';
import { ComboBox } from './ComboBox';
import {
  PIANO_RANGE,
  SYNTH_61_RANGE,
  SYNTH_49_RANGE,
  SYNTH_76_RANGE,
  SYNTH_44_RANGE,
  SYNTH_37_RANGE
} from '~/lib/const';
import { store } from '~/store/store';

export const PianoGroup: React.FC = observer(() => {
  const [visible, setVisible] = useState<boolean>(true);
  const keyboardTypes = {
    '88 key piano/grand piano': PIANO_RANGE,
    '76 key synth': SYNTH_76_RANGE,
    '61 key synth': SYNTH_61_RANGE,
    '49 key synth': SYNTH_49_RANGE,
    '44 key synth': SYNTH_44_RANGE,
    '37 key synth': SYNTH_37_RANGE
  };
  return (
    <>
      <h2>
        <label>
          <input type="checkbox" checked={visible} onChange={(e) => setVisible(e.target.checked)} />
          Piano/Synth
        </label>{' '}
        <ComboBox values={keyboardTypes} onChange={(value) => store.setKeyboardRange(value)} />
      </h2>
      {visible && (
        <>
          <p>Numbers at the top are octaves' numbers.</p>
          <div>
            <PianoKeyboard range={store.keyboardRange} />
          </div>
        </>
      )}
    </>
  );
});
