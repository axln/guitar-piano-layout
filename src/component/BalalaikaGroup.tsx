import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { GuitarNeck } from '~/component/Guitar/GuitarNeck';
import { Tuner } from '~/component/Guitar/Tuner';
import { BALALAIKA_TUNING } from '~/lib/const';
import { store } from '~/store/store';

export const BalalaikaGroup: React.FC = observer(() => {
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <>
      <h2>
        <label>
          <input type="checkbox" checked={visible} onChange={(e) => setVisible(e.target.checked)} />
          Russian Balalaika
        </label>
      </h2>
      {visible && (
        <>
          <div>
            Tuning:&nbsp;
            <Tuner
              setTuning={store.setBalalaikaTuning}
              baseTuning={BALALAIKA_TUNING}
              tuning={store.balalaikaTuning}
            />
          </div>
          <div>
            <GuitarNeck
              strings={store.balalaikaTuning}
              neckLength={1035}
              neckWidth={100}
              fretCount={18}
            />
          </div>
        </>
      )}
    </>
  );
});
