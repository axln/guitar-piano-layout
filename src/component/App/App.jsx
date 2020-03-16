import React from 'react';
import { PianoKeyboard } from '../PianoKeyboard/PianoKeyboard';
import { GuitarNeck } from '../GuitarNeck/GuitarNeck';
import Helper  from '../Helper';
import './App.less';

export class App extends React.Component {
    state = {
        playSound: false,
    };

    onPitch = (pitch, pushState) => {
        console.log('onpitch:', pitch, pushState);
        let freq = Helper.noteToFrequency(pitch);

        if (pushState === 'down') {
            const idx = this.state.pitches.indexOf(pitch);
            const pitches = this.state.pitches.slice();
            if (idx >= 0) {
                pitches.splice(idx, 1);
            } else {
                pitches.push(pitch);
            }
            this.setState({pitches: pitches});
        }

        let note = Helper.pitchToNote(pitch);
        if (pushState === 'down') {
            //console.log(`note ${note}: ${freq.toFixed(2)} Hz (pitch: ${pitch}), ${state}`);
            console.log(`Note: ${note}, frequency: ${freq.toFixed(2)} Hz`);
        }
        if (pushState === 'down' && this.state.playSound) {
            Helper.playNote(freq);
        } else if (pushState === 'up'  && this.state.playSound) {
            Helper.stopNote(freq);
        }
    };

    toggleSound = (e) => {
        const { setPlaySound } = this.props;
        setPlaySound(e.target.checked);
    };

    render() {
        const { playSound } = this.props;
        // <div><GuitarNeck strings='G2,D2,A1,E1' /></div> bass guitar
        //<div><PianoKeyboard range='C2-B5' /></div>
        // <div><PianoKeyboard range='A0-C8' /></div> piano 88
        // <div><PianoKeyboard range='C2-C7' /></div> 61 key synth
        // <div><PianoKeyboard range='E2-E6' /></div> guitar range
        // <div><PianoKeyboard range='C2-B6' /></div>
        return (
            <>
                <h1>Piano and Guitar Layout</h1>
                <p>
                    This simple app helps you learn the layout of the piano keyboard and guitar/bass
                    fretboard and how they relate to each other.
                    Press any piano key or tap a guitar string on any fret and you will see the
                    corresponding key/fret on another instrument.
                </p>
                <p>For guitar/bass it also shows where the same note on other strings is located.</p>
                <p>
                    Click/tap once to highlight the note and click/tap it again to turn off.
                    The same notes have the same color but notes in higher octaves have higher lightness.
                </p>

                <h2>Settings</h2>
                <p>
                    <label>
                        <input
                            type = 'checkbox'
                            checked = {playSound}
                            onChange = {this.toggleSound}
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
                    <GuitarNeck strings = 'E4,B3,G3,D3,A2,E2'/>
                </div>

                <h2>Bass Guitar (standard tuning)</h2>
                <p>
                    Your bass may have less than 24 frets but this doesn't affect the other notes.
                    Click the nut to highlight a note of the corresponding open string.
                </p>
                <div>
                    <GuitarNeck strings = 'G2,D2,A1,E1'/>
                </div>

                <h2>About</h2>
                <p>
                    This app is open-source, made by axln. For more info, please visit
                    <a href='https://github.com/axln/guitar-piano-layout' target='_blank'>the app's page at GitHub</a>.
                </p>
            </>
        );
    }
}
