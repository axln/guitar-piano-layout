import { observer } from 'mobx-react-lite';
import { GuitarNeck } from '~/component/Guitar/GuitarNeck';
import { Tuner } from '~/component/Guitar/Tuner';
import { store } from '~/store/store';

export const BalalaikaGroup = observer(() => {
  return (
    <>
      <h2>Russian Balalaika</h2>
      <div>
        Tuning:&nbsp;
        <Tuner
          setTuning={store.setBalalaikaTuning.bind(store)}
          baseTuning={store.baseBalalaikaTuning}
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
