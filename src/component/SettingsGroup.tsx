import React from 'react';
import { observer } from 'mobx-react-lite';
import { store, ScaleType } from '~/store/store';
import { ComboBox } from '~/component/ComboBox';

export const SettingsGroup: React.FC = observer(() => (
  <>
    <h2>Settings</h2>
    <div>
      <label>
        <input
          type="checkbox"
          checked={store.showScales}
          onChange={(e) => store.setShowScales(e.target.checked)}
        />
        Scale mode
      </label>
      :{' '}
      <ComboBox
        disabled={!store.showScales}
        values={{
          [ScaleType.Major]: ScaleType.Major,
          [ScaleType.Minor]: ScaleType.Minor
        }}
        onChange={(value) => {
          console.log('value:', value);
          store.setScale(value as ScaleType);
        }}
      />
    </div>
    <div>
      <label>
        <input
          type="checkbox"
          checked={store.playSound}
          onChange={(e) => store.setPlaySound(e.target.checked)}
        />
        Play notes on click
      </label>
    </div>
  </>
));
