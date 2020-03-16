import React from 'react';
import { PianoKeyboard } from '../PianoKeyboard/PianoKeyboard';
import { GuitarNeck } from '../GuitarNeck/GuitarNeck';
import './App.less';

export function App({playSound, setPlaySound}) {
    // <div><GuitarNeck strings='G2,D2,A1,E1' /></div> bass guitar
    //<div><PianoKeyboard range='C2-B5' /></div>
    // <div><PianoKeyboard range='A0-C8' /></div> piano 88
    // <div><PianoKeyboard range='C2-C7' /></div> 61 key synth
    // <div><PianoKeyboard range='E2-E6' /></div> guitar range
    // <div><PianoKeyboard range='C2-B6' /></div>
    return (
        <>
            <h2>Settings</h2>
            <p>
                <label>
                    <input
                        type = 'checkbox'
                        checked = {playSound}
                        onChange = {e => setPlaySound(e.target.checked)}
                    />
                    Play notes on click
                </label>
            </p>

            <h2>Piano</h2>
            <p>This 88-keys layout is used in piano and grand piano. Numbers at the top are octaves' numbers.</p>
            <div>
                <PianoKeyboard range = 'A0-C8'/>
            </div>

            <h2>Acoustic/Electric Guitar (standard tuning)</h2>
            <p>
                Your guitar may have less than 24 frets but this doesn't affect the other notes.
                Click the nut to highlight a note of the corresponding open string.
            </p>
            <div>
                <GuitarNeck strings='E4,B3,G3,D3,A2,E2'/>
            </div>

            <h2>Bass Guitar (standard tuning)</h2>
            <p>
                Your bass may have less than 24 frets but this doesn't affect the other notes.
                Click the nut to highlight a note of the corresponding open string.
            </p>
            <div>
                <GuitarNeck strings='G2,D2,A1,E1'/>
            </div>
        </>
    );
}
