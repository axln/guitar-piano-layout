import { observer } from 'mobx-react-lite';
import { GuitarNeck } from '~/component/Guitar/GuitarNeck';
import { Tuner } from '~/component/Guitar/Tuner';
import { GUITAR_TUNING, GUITAR_TUNING_7_STRING, GUITAR_TUNING_8_STRING } from '~/lib/const';
import { ComboBox } from './ComboBox';
import { store } from '~/store/store';

export const GuitarGroup = observer(() => {
  const guitarTypes = {
    '6 strings': GUITAR_TUNING,
    '7 strings': GUITAR_TUNING_7_STRING,
    '8 strings': GUITAR_TUNING_8_STRING
  };
  return (
    <>
      <h2>
        Acoustic/Electric Guitar&nbsp;
        <ComboBox
          values={guitarTypes}
          onChange={(value) => {
            store.setBaseGuitarTuning(value);
            store.setGuitarTuning(value);
          }}
        />
      </h2>
      <div>
        Tuning:&nbsp;
        <Tuner
          setTuning={store.setGuitarTuning}
          baseTuning={store.baseGuitarTuning}
          tuning={store.guitarTuning}
        />
      </div>

      <p>
        Your guitar may have less than 24 frets but this doesn't affect the other notes. Click the
        nut to highlight a note of the corresponding open string.
      </p>

      <div>
        <GuitarNeck strings={store.guitarTuning} fretCount={24} />
      </div>
    </>
  );
});
