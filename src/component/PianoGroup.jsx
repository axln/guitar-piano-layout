import { observer } from 'mobx-react-lite';
import { PianoKeyboard } from '~/component/Piano/PianoKeyboard';
import { store } from '~/store/store';
import {
  PIANO_RANGE,
  SYNTH_61_RANGE,
  SYNTH_49_RANGE,
  SYNTH_76_RANGE,
  SYNTH_44_RANGE,
  SYNTH_37_RANGE
} from '~/lib/const';

export const PianoGroup = observer(() => {
  return (
    <>
      <h2>
        Piano/Synth&nbsp;
        <select
          onChange={(e) => {
            store.setKeyboardRange(e.target.value);
          }}>
          <option value={PIANO_RANGE}>88 key piano/grand piano</option>
          <option value={SYNTH_76_RANGE}>76 key synth</option>
          <option value={SYNTH_61_RANGE}>61 key synth</option>
          <option value={SYNTH_49_RANGE}>49 key synth</option>
          <option value={SYNTH_44_RANGE}>44 key synth</option>
          <option value={SYNTH_37_RANGE}>37 key synth</option>
        </select>
      </h2>
      <p>Numbers at the top are octaves' numbers.</p>
      <div>
        <PianoKeyboard range={store.keyboardRange} />
      </div>
    </>
  );
});
