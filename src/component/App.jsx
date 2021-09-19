import React from 'react';
import { observer } from 'mobx-react-lite';
import { PianoKeyboard } from '~/component/Piano/PianoKeyboard';
import { GuitarNeck } from '~/component/Guitar/GuitarNeck';
import { Tuner } from '~/component/Guitar/Tuner';
import { store } from '~/store/mstore';

import {
  GUITAR_TUNING,
  GUITAR_TUNING_7_STRING,
  GUITAR_TUNING_8_STRING,
  BASS_TUNING,
  BASS_TUNING_5_STRING,
  PIANO_RANGE,
  SYNTH_61_RANGE,
  SYNTH_49_RANGE,
  SYNTH_76_RANGE,
  SYNTH_44_RANGE,
  SYNTH_37_RANGE
} from '~/lib/const';

export const App = observer(() => {
  const { playSound, guitarTuning, bassTuning, ukuleleTuning, balalaikaTuning, keyboardRange } =
    store;

  return (
    <>
      <h2>Settings</h2>
      <p>
        <label>
          <input
            type="checkbox"
            checked={playSound}
            onChange={(e) => store.setPlaySound(e.target.checked)}
          />
          Play notes on click
        </label>
      </p>

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
        <PianoKeyboard range={keyboardRange} />
      </div>

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
        <GuitarNeck strings={guitarTuning} />
      </div>

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
          setTuning={store.setBassTuning.bind(store)}
          baseTuning={store.baseBassTuning}
          tuning={store.bassTuning}
        />
      </div>
      <p>
        Your bass may have less than 24 frets but this doesn't affect the other notes. Click the nut
        to highlight a note of the corresponding open string.
      </p>
      <div>
        <GuitarNeck strings={bassTuning} neckWidth={130} />
      </div>
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
        <GuitarNeck strings={ukuleleTuning} neckLength={1035} neckWidth={110} fretCount={18} />
      </div>

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
        <GuitarNeck strings={balalaikaTuning} neckLength={1035} neckWidth={100} fretCount={18} />
      </div>
    </>
  );
});
