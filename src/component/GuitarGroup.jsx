import { observer } from 'mobx-react-lite';
import { GuitarNeck } from '~/component/Guitar/GuitarNeck';
import { Tuner } from '~/component/Guitar/Tuner';
import { store } from '~/store/store';
import { GUITAR_TUNING, GUITAR_TUNING_7_STRING, GUITAR_TUNING_8_STRING } from '~/lib/const';

export const GuitarGroup = observer(() => {
  return (
    <>
      <h2>
        Acoustic/Electric Guitar&nbsp;
        <select
          onChange={(e) => {
            store.setBaseGuitarTuning(e.target.value);
            store.setGuitarTuning(e.target.value);
          }}>
          <option value={GUITAR_TUNING}>6 strings</option>
          <option value={GUITAR_TUNING_7_STRING}>7 strings</option>
          <option value={GUITAR_TUNING_8_STRING}>8 strings</option>
        </select>
      </h2>
      <div>
        Tuning:&nbsp;
        <Tuner
          setTuning={store.setGuitarTuning.bind(store)}
          baseTuning={store.baseGuitarTuning}
          tuning={store.guitarTuning}
        />
      </div>

      <p>
        Your guitar may have less than 24 frets but this doesn't affect the other notes. Click the
        nut to highlight a note of the corresponding open string.
      </p>

      <div>
        <GuitarNeck strings={store.guitarTuning} />
      </div>
    </>
  );
});
