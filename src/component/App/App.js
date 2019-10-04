import React           from "react";
import {PianoKeyboard} from '../PianoKeyboard/PianoKeyboard';
import {GuitarNeck}    from '../GuitarNeck/GuitarNeck';
import Helper          from '../Helper';
import './App.less';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pitches: [],
            guitarTuning: 'E4,B3,G3,D3,A2,E2',
            bassTuning: 'G2,D2,A1,E1'
        };
        this.onPitch = this.onPitch.bind(this);
    }

    onPitch(pitch, state) {
        let freq = Helper.noteToFrequency(pitch);
        /*if (state == 'down') {
            if (this.state.pitches.indexOf(pitch) < 0) {
                const pitches = this.state.pitches.slice();
                pitches.push(pitch);
                this.setState({pitches: pitches});
            }
        } else if (state == 'up') {
            const idx = this.state.pitches.indexOf(pitch);
            const pitches = this.state.pitches.slice();
            if (idx >= 0) {
                pitches.splice(idx, 1);
            }
            this.setState({pitches: pitches});
        }*/

        if (state == 'down') {
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
        if (state == 'down') {
            //console.log(`note ${note}: ${freq.toFixed(2)} Hz (pitch: ${pitch}), ${state}`);
            console.log(`Note: ${note}, frequency: ${freq.toFixed(2)} Hz`);
        }
        if (state == 'down') {
            Helper.playNote(freq);
        } else if (state == 'up') {
            Helper.stopNote(freq);
        }
    }

    render() {
        // <div><GuitarNeck strings='G2,D2,A1,E1' /></div> bass guitar
        //<div><PianoKeyboard range='C2-B5' /></div>
        // <div><PianoKeyboard range='A0-C8' /></div> piano 88
        // <div><PianoKeyboard range='C2-C7' /></div> 61 key synth
        // <div><PianoKeyboard range='E2-E6' /></div> guitar range
        // <div><PianoKeyboard range='C2-B6' onPitch={this.onPitch} activePitches={this.state.pitches} /></div>
        return (
            <>
                <h1>Piano and Guitar Layout</h1>
                <p>
                    This simple app helps you learn layout of the piano keyboard and guitar/bass fretboard and how they relate to each other.
                    Press any piano key or tap a guitar string on any fret and you will see the corresponding key/fret on another instrument.
                </p>
                <p>For guitar/bass it also shows where the same note on other strings is located.</p>
                <p>Click/tap once to hightlight the note and click/tap it again to turn off. The same notes have the same color but notes in lower ocataves have higher saturation.</p>

                <h2>Piano</h2>
                <p>This 88-keys layout is used in piano and grand piano. Numbers at the top are octaves' numbers.</p>
                <div>
                    <PianoKeyboard range='A0-C8' onPitch={this.onPitch} activePitches={this.state.pitches} />
                </div>
                <h2>Acoustic/Electric Guitar</h2>
                <p>Your guitar may have less than 24 frets but this doesn't affect the other notes. Click the nut to hightlight a note of the corresponding open string.</p>
                <div>
                    <GuitarNeck strings={this.state.guitarTuning} onPitch={this.onPitch} activePitches={this.state.pitches} />
                </div>
                <h2>Bass Guitar (standard tuning)</h2>
                <p>Your bass may have less than 24 frets but this doesn't affect the other notes. Click the nut to hightlight a note of the corresponding open string.</p>
                <div>
                    <GuitarNeck strings={this.state.bassTuning} onPitch={this.onPitch} activePitches={this.state.pitches} />
                </div>
                <h2>About</h2>
                <p>This app is open-source, made by axln. For more info, please visit <a href="https://github.com/axln/guitar-piano-layout" target="_blank">the app's page at GitHub</a>.</p>
            </>
        );
    }
}

export default App;