import React from 'react';
import { PianoKeyboard } from '../Piano/PianoKeyboard';
import { GuitarNeck } from '../Guitar/GuitarNeck';
import { GuitarTuner } from '../../container/GuitarTuner';
import { BassTuner } from '../../container/BassTuner';
import './App.less';

export function App({playSound, setPlaySound, guitarTuning, bassTuning}) {
    // <div><Piano range='C2-B5' /></div>
    // <div><Piano range='C2-C7'/></div> 61 key synth
    // <div><Piano range='E2-E6'/></div> guitar range
    // <div><Piano range='C2-B6'/></div>
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

            <h2>Piano</h2>
            <p>This 88-keys layout is used in piano and grand piano. Numbers at the top are octaves' numbers.</p>
            <div>
                <PianoKeyboard range='A0-C8'/>
            </div>

            <h2>Acoustic/Electric Guitar</h2>
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

            <h2>Bass Guitar</h2>
            <div>
                Tuning:&nbsp;<BassTuner/>
            </div>
            <p>
                Your bass may have less than 24 frets but this doesn't affect the other notes.
                Click the nut to highlight a note of the corresponding open string.
            </p>
            <div>
                <GuitarNeck strings={bassTuning}/>
            </div>
        </>
    );
}
