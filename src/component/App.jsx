import { h, Fragment } from 'preact';
import { PianoKeyboard } from './Piano/PianoKeyboard';
import { GuitarNeck } from './Guitar/GuitarNeck';
import { GuitarTuner } from '../container/GuitarTuner';
import { BassTuner } from '../container/BassTuner';
import { UkuleleTuner } from '../container/UkuleleTuner';
import { BalalaikaTuner } from '../container/BalalaikaTuner';
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
} from '../lib/const';

export function App(props) {
    const {
        playSound,
        setPlaySound,
        guitarTuning,
        bassTuning,
        ukuleleTuning,
        balalaikaTuning,
        setBaseBassTuning,
        setBassTuning,
        setBaseGuitarTuning,
        setGuitarTuning,
        keyboardRange,
        setKeyboardRange
    } = props;

    return (
        <>
            <h2>Settings</h2>
            <p>
                <label>
                    <input
                        type='checkbox'
                        checked={playSound}
                        onChange={e => setPlaySound(e.target.checked)}
                    />
                    Play notes on click
                </label>
            </p>

            <h2>
                Piano/Synth&nbsp;
                <select onChange={e => {
                    setKeyboardRange(e.target.value);
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
                <PianoKeyboard range={keyboardRange}/>
            </div>

            <h2>
                Acoustic/Electric Guitar&nbsp;
                <select onChange={e => {
                    setBaseGuitarTuning(e.target.value);
                    setGuitarTuning(e.target.value);
                }}>
                    <option value={GUITAR_TUNING}>6 strings</option>
                    <option value={GUITAR_TUNING_7_STRING}>7 strings</option>
                    <option value={GUITAR_TUNING_8_STRING}>8 strings</option>
                </select>
            </h2>
            <div>
                Tuning:&nbsp;<GuitarTuner/>
            </div>

            <p>
                Your guitar may have less than 24 frets but this doesn't affect the other notes.
                Click the nut to highlight a note of the corresponding open string.
            </p>

            <div>
                <GuitarNeck strings={guitarTuning}/>
            </div>

            <h2>
                Bass Guitar&nbsp;
                <select onChange={e => {
                    setBaseBassTuning(e.target.value);
                    setBassTuning(e.target.value);
                }}>
                    <option value={BASS_TUNING}>4 strings</option>
                    <option value={BASS_TUNING_5_STRING}>5 strings</option>
                </select>
            </h2>
            <div>
                Tuning:&nbsp;<BassTuner/>
            </div>
            <p>
                Your bass may have less than 24 frets but this doesn't affect the other notes.
                Click the nut to highlight a note of the corresponding open string.
            </p>
            <div>
                <GuitarNeck strings={bassTuning}  neckWidth={130}/>
            </div>
            <h2>Ukulele</h2>
            <div>
                Tuning:&nbsp;<UkuleleTuner/>
            </div>
            <div>
                <GuitarNeck strings={ukuleleTuning} neckLength={1035} neckWidth={110} fretCount={18}/>
            </div>

            <h2>Russian Balalaika</h2>
            <div>
                Tuning:&nbsp;<BalalaikaTuner/>
            </div>
            <div>
                <GuitarNeck strings={balalaikaTuning} neckLength={1035} neckWidth={100}  fretCount={18}/>
            </div>
        </>
    );
}
