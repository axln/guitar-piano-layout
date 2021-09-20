import React, { ChangeEvent, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { PickMode, ScaleType, store } from '~/store/store';
import './SettingsGroup.less';

export const ControlGroup: React.FC = observer(() => {
  const pickModeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    store.setPickMode(e.target.value as PickMode);
  }, []);
  const scaleTypeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    store.setScale(e.target.value as ScaleType);
  }, []);

  return (
    <>
      <h2>Controls</h2>
      <div className="settings-group">
        <div className="settings-group__control">
          <div>Pick mode:</div>
          <div>
            <label>
              <input
                type="radio"
                checked={store.pickMode === PickMode.Random}
                onChange={pickModeHandler}
                name="pick-mode"
                value={PickMode.Random}
              />{' '}
              Random
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                checked={store.pickMode === PickMode.Scale}
                onChange={pickModeHandler}
                name="pick-mode"
                value={PickMode.Scale}
              />{' '}
              Scale
            </label>{' '}
            <label>
              <input
                type="checkbox"
                disabled={store.pickMode !== PickMode.Scale}
                checked={store.allOctaves}
                onChange={(e) => store.setAllOctaves(e.target.checked)}
              />{' '}
              All octaves
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                checked={store.pickMode === PickMode.Chord}
                onChange={pickModeHandler}
                name="pick-mode"
                value={PickMode.Chord}
              />{' '}
              Chord
            </label>{' '}
            <label>
              <input
                type="checkbox"
                disabled={store.pickMode !== PickMode.Chord}
                checked={store.onlyUp}
                onChange={(e) => store.setOnlyUp(e.target.checked)}
              />{' '}
              Only up from tonic
            </label>
          </div>
        </div>
        {/*<div className="settings-group__control">
          <label>
            Scale/chord:{' '}
            <ComboBox
              disabled={store.pickMode === PickMode.Random}
              values={{
                [ScaleType.Major]: ScaleType.Major,
                [ScaleType.Minor]: ScaleType.Minor
              }}
              value={store.scale}
              onChange={(value) => {
                store.setScale(value as ScaleType);
              }}
            />
          </label>
        </div>*/}
        <div className="settings-group__control">
          Scale/chord:{' '}
          <label>
            <input
              type="radio"
              name="scale"
              disabled={store.pickMode === PickMode.Random}
              value={ScaleType.Major}
              checked={store.scale == ScaleType.Major}
              onChange={scaleTypeHandler}
            />{' '}
            Major
          </label>
          <label>
            <input
              type="radio"
              name="scale"
              disabled={store.pickMode === PickMode.Random}
              value={ScaleType.Minor}
              checked={store.scale == ScaleType.Minor}
              onChange={scaleTypeHandler}
            />{' '}
            Minor
          </label>
        </div>
        <div className="settings-group__control">
          Current scale/chord: <strong>{store.currentHarmony}</strong>
        </div>
        <div className="settings-group__control">
          Current tonic: <strong>{store.tonic}</strong>
        </div>

        <div className="settings-group__control">
          <label>
            <input
              type="checkbox"
              checked={store.playSound}
              onChange={(e) => store.setPlaySound(e.target.checked)}
            />
            Play notes on click
          </label>
        </div>
      </div>
    </>
  );
});
