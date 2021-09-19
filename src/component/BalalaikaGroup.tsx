import React from 'react';
import { observer } from 'mobx-react-lite';
import { GuitarNeck } from '~/component/Guitar/GuitarNeck';
import { Tuner } from '~/component/Guitar/Tuner';
import { BALALAIKA_TUNING } from '~/lib/const';
import { store } from '~/store/store';

export const BalalaikaGroup: React.FC = observer(() => {
  return (
    <>
      <h2>Russian Balalaika</h2>
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
  );
});
