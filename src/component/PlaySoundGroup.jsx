import { observer } from 'mobx-react-lite';
import { store } from '~/store/store';

export const PlaySoundGroup = observer(() => (
  <>
    <h2>Settings</h2>
    <p>
      <label>
        <input
          type="checkbox"
          checked={store.playSound}
          onChange={(e) => store.setPlaySound(e.target.checked)}
        />
        Play notes on click
      </label>
    </p>
  </>
));
