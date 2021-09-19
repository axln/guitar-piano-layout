import { observer } from 'mobx-react-lite';
import { GuitarNeck } from '~/component/Guitar/GuitarNeck';
import { Tuner } from '~/component/Guitar/Tuner';
import { BASS_TUNING, BASS_TUNING_5_STRING } from '~/lib/const';
import { store } from '~/store/store';

export const BassGroup = observer(() => {
  return (
    <>
      <h2>
        Bass Guitar&nbsp;
        <select
          onChange={(e) => {
            store.setBaseBassTuning(e.target.value);
            store.setBassTuning(e.target.value);
          }}>
          <option value={BASS_TUNING}>4 strings</option>
          <option value={BASS_TUNING_5_STRING}>5 strings</option>
        </select>
      </h2>
      <div>
        Tuning:&nbsp;
        <Tuner
          setTuning={store.setBassTuning}
          baseTuning={store.baseBassTuning}
          tuning={store.bassTuning}
        />
      </div>
      <p>
        Your bass may have less than 24 frets but this doesn't affect the other notes. Click the nut
        to highlight a note of the corresponding open string.
      </p>
      <div>
        <GuitarNeck strings={store.bassTuning} neckWidth={130} fretCount={24} />
      </div>
    </>
  );
});
