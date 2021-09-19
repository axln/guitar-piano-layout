import { observer } from 'mobx-react-lite';
import { GuitarNeck } from '~/component/Guitar/GuitarNeck';
import { Tuner } from '~/component/Guitar/Tuner';
import { store } from '~/store/store';

export const UkuleleGroup = observer(() => {
  return (
    <>
      <h2>Ukulele</h2>
      <div>
        Tuning:&nbsp;
        <Tuner
          setTuning={store.setUkuleleTuning.bind(store)}
          baseTuning={store.baseUkuleleTuning}
          tuning={store.ukuleleTuning}
        />
      </div>
      <div>
        <GuitarNeck
          strings={store.ukuleleTuning}
          neckLength={1035}
          neckWidth={110}
          fretCount={18}
        />
      </div>
    </>
  );
});
