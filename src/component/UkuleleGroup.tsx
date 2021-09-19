import React from 'react';
import { observer } from 'mobx-react-lite';
import { GuitarNeck } from '~/component/Guitar/GuitarNeck';
import { Tuner } from '~/component/Guitar/Tuner';
import { UKULELE_TUNING } from '~/lib/const';
import { store } from '~/store/store';

export const UkuleleGroup: React.FC = observer(() => (
  <>
    <h2>Ukulele</h2>
    <div>
      Tuning:&nbsp;
      <Tuner
        setTuning={store.setUkuleleTuning}
        baseTuning={UKULELE_TUNING}
        tuning={store.ukuleleTuning}
      />
    </div>
    <div>
      <GuitarNeck strings={store.ukuleleTuning} neckLength={1035} neckWidth={110} fretCount={18} />
    </div>
  </>
));
