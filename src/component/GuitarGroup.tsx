import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { GuitarNeck } from '~/component/Guitar/GuitarNeck';
import { Tuner } from '~/component/Guitar/Tuner';
import { ComboBox } from './ComboBox';
import { GUITAR_TUNING, GUITAR_TUNING_7_STRING, GUITAR_TUNING_8_STRING } from '~/lib/const';
import { store } from '~/store/store';

export const GuitarGroup: React.FC = observer(() => {
  const [visible, setVisible] = useState<boolean>(true);
  const guitarTypes = {
    '6 strings': GUITAR_TUNING,
    '7 strings': GUITAR_TUNING_7_STRING,
    '8 strings': GUITAR_TUNING_8_STRING
  };
  return (
    <>
      <h2>
        <label>
          <input type="checkbox" checked={visible} onChange={(e) => setVisible(e.target.checked)} />
          Acoustic/Electric Guitar
        </label>{' '}
        <ComboBox
          values={guitarTypes}
          onChange={(value) => {
            store.setBaseGuitarTuning(value);
            store.setGuitarTuning(value);
          }}
        />
      </h2>
      {visible && (
        <>
          <div>
            Tuning:&nbsp;
            <Tuner
              setTuning={store.setGuitarTuning}
              baseTuning={store.baseGuitarTuning}
              tuning={store.guitarTuning}
            />
          </div>

          <p>
            Your guitar may have less than 24 frets but this doesn't affect the other notes. Click
            the nut to highlight a note of the corresponding open string.
          </p>

          <div>
            <GuitarNeck strings={store.guitarTuning} fretCount={24} />
          </div>
        </>
      )}
    </>
  );
});
