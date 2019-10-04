import React  from "react";
import Helper from '../Helper';
import './GuitarNeck.less';


const CHROMATIC_SCALE = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];

const NECK_WIDTH  = 1400;
const NECK_HEIGHT = 150;
const SIDE_MARGIN = 10;
const A4_PITCH_OFFSET = 57;

function noteToPitch(fullNote) {
    let note, octave;
    if (fullNote.length == 2) {
        [note, octave] = fullNote;
    } else {
        let sharp;
        [note, sharp, octave] = fullNote;
        note = note + sharp;
    }
    octave = parseInt(octave);
    return octave * 12 + CHROMATIC_SCALE.indexOf(note) - A4_PITCH_OFFSET;
}

function pitchToNote(pitch) {
    let absolutePitch = pitch + A4_PITCH_OFFSET;
    let octave = Math.floor(absolutePitch / 12);
    let note = CHROMATIC_SCALE[absolutePitch % 12];
    return note + octave;
}

class StringNote extends React.Component {
    constructor(props) {
        super(props);

        this.pushed = false;

        this.handleMouseDown  = this.handleMouseDown.bind(this);
        this.handleMouseUp    = this.handleMouseUp.bind(this);
    }

    handleMouseDown() {
        this.props.onPitch(this.props.pitch, 'down');
        this.pushed = true;
    }

    handleMouseUp() {
        if (this.pushed) {
            this.props.onPitch(this.props.pitch, 'up')
            this.pushed = false;
        }
    }

    getPadCoord() {
        let fretPad = {};

        fretPad.x = Fret.getOffset(this.props.index - 1);
        fretPad.width = Fret.getOffset(this.props.index) - Fret.getOffset(this.props.index - 1);

        if (this.props.number == 1) {
            fretPad.y = 0;
            fretPad.height = (GuitarString.getStringPos(1, this.props.stringCount) + GuitarString.getStringPos(2, this.props.stringCount)) / 2;
        } else if (this.props.number == this.props.stringCount) {
            fretPad.y = GuitarString.getBetweenStringPos(this.props.number - 1, this.props.number, this.props.stringCount);
            fretPad.height = NECK_HEIGHT - fretPad.y;
        } else {
            fretPad.y = GuitarString.getBetweenStringPos(this.props.number - 1, this.props.number, this.props.stringCount);
            fretPad.height = GuitarString.getBetweenStringPos(this.props.number, this.props.number + 1, this.props.stringCount) - fretPad.y;
        }
        return fretPad;
    }

    render() {
        let note = pitchToNote(this.props.pitch);
        let className = note.length == 2 ? 'note' : 'note black'; 
        let style = {}
        if (this.props.activePitches.indexOf(this.props.pitch) >=0) {
            className += ' pushed';
            style.fill = Helper.getPitchColor(this.props.pitch) + 'B0';
        }
        2
        let fretX;
        if (this.props.index == 0) {
            fretX = 0; 
        } else  if (this.props.index <= 16) {
            fretX = Fret.getOffset(this.props.index) - 20; 
        } else {
            fretX = (Fret.getOffset(this.props.index) +  Fret.getOffset(this.props.index - 1)) / 2;
        }

        let noteHeight = 13;
        let noteWidth = 21;

        return(
            <g
                className={className}
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
                onMouseLeave={this.handleMouseUp}
            >
                <rect
                    style={style}
                    className='noteArea'
                    {...this.getPadCoord(this.props.index)}
                />
                <rect
                    className='bk'
                    x={Math.round(fretX - noteWidth / 2)}
                    y={Math.round(GuitarString.getStringPos(this.props.number, this.props.stringCount) - noteHeight / 2)}
                    width={noteWidth}
                    height={noteHeight}
                />
                <text
                    x={Math.round(fretX)}
                    y={Math.round(GuitarString.getStringPos(this.props.number, this.props.stringCount)) + 1}
                >{note}</text>
            </g>
        );
    }
}

class GuitarString extends React.Component {
    static getStringPos(number, stringCount) {
        const stringSpace = Math.round((NECK_HEIGHT - SIDE_MARGIN * 2) / (stringCount - 1));
        return SIDE_MARGIN + stringSpace * (number - 1);
    }
    static getBetweenStringPos(number1, number2, stringCount) {
        let str1pos = GuitarString.getStringPos(number1, stringCount);
        let str2pos = GuitarString.getStringPos(number2, stringCount);
        return (str1pos + str2pos) / 2;
    }

    getStringTickness(number) {
        let baseFix = this.props.stringCount == 4 ? 2 : 0;

        switch(number) {
            case 1:
                return [1 + baseFix, 0.5];
            case 2:
                return [1.5 + baseFix, 0.5];
            case 3:
                return [2 + baseFix, 0];
            case 4:
                return [2.5 + baseFix,0];
            case 5:
                return [3 + baseFix, 0.5];
            case 6:
                return [3.5 + baseFix, 0];
        }
    }

    renderNotes() {
        let notes = [];
        let openPitch = noteToPitch(this.props.openNote);
        for (let i = 0; i <= 24; ++i) {
            notes.push(
                <StringNote
                    number={this.props.number}
                    stringCount={this.props.stringCount}
                    index={i}
                    onPitch={this.props.onPitch}
                    activePitches={this.props.activePitches}
                    pitch={openPitch + i}
                    key ={'n' + this.props.number + 'f' + i}
                />
            );
        }
        return notes;
    }

    render() {
        let [thickness, fix] = this.getStringTickness(this.props.number);
        return (
            <g className='string'>
                <line
                    className='string'
                    x1={-0.5}
                    y1={Math.round(GuitarString.getStringPos(this.props.number, this.props.stringCount)) + fix}
                    x2={NECK_WIDTH + 1.5}
                    y2={Math.round(GuitarString.getStringPos(this.props.number, this.props.stringCount)) + fix}
                    strokeWidth={thickness}
                />
                {this.renderNotes()}
            </g>
        );
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class Dot extends React.Component {
    render() {

    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class Fret extends React.Component {
    static getOffset(number) {
        if (number == 0) {
            return SIDE_MARGIN;
        } else if (number < 0) {
            return -10;
        } else {
            let stringLength = (NECK_WIDTH - SIDE_MARGIN) * 4 / 3;
            return  (1 - 1 / Math.pow(2, number / 12)) * stringLength;
        }

    }

    render() {
        let fretX = Math.round(Fret.getOffset(this.props.number));
        let labelX = Math.round((Fret.getOffset(this.props.number - 1) + Fret.getOffset(this.props.number)) / 2);

        return (
            <g className='fret'>
                <line
                    x1={fretX}
                    y1={0}
                    strokeWidth={4}
                    x2={fretX}
                    y2={NECK_HEIGHT + 1}
                />
                <text x={fretX - 15} y={NECK_HEIGHT + 15}>{this.props.number}</text>
            </g>
        );
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class GuitarNeck extends React.Component {
    constructor(props) {
        super(props);
        this.stringCount = this.props.strings.split(',').length;
    }
    renderFrets() {
        let frets = [];
        for (let i = 1; i <= 24; ++i) {
            frets.push(
                <Fret
                    key={'f'+ (i)}
                    number={i}
                />
            );
        }
        return frets;
    }

    renderDots() {
        let dots = [];
        let dotFrets = [3,5,7,9,12,15,17,19,21,24];
        for (let i = 0; i < 24; ++i) {
            let index = dotFrets.indexOf(i + 1);
            if (index < 0) {
                continue;
            }
            let fret = dotFrets[index];
            let dotX = Math.round((Fret.getOffset(i) + Fret.getOffset(i+1)) / 2 - 1);
            let dotRadius = 6;
            if (fret % 12 == 0) {
                let dot1Pos = Math.round((GuitarString.getStringPos(1, this.stringCount) + GuitarString.getStringPos(2, this.stringCount)) / 2);
                let dot2Pos = Math.round((GuitarString.getStringPos(this.stringCount - 1, this.stringCount) + GuitarString.getStringPos(this.stringCount, this.stringCount)) / 2);
                dots.push(
                    <circle
                        key={`d${i+1}-1`}
                        className='dot'
                        cx={dotX + 0.5}
                        cy={dot1Pos}
                        r={dotRadius}
                    />
                );
                dots.push(
                    <circle
                        key={`d${i+1}-2`}
                        className='dot'
                        cx={dotX + 0.5}
                        cy={dot2Pos}
                        r={dotRadius}
                    />
                );
            } else {
                dots.push(
                    <circle
                        key={`d${i + 1}`}
                        className='dot'
                        cx={dotX + 0.5}
                        cy={NECK_HEIGHT / 2}
                        r={dotRadius}
                    />
                );
            }
        }
        return dots;
    }
    renderStrings() {
        return this.props.strings.split(',').map((note, index, arr) => {
            let number = index + 1;
            return (<GuitarString
                key={'s' + number}
                activePitches={this.props.activePitches}
                number={number}
                openNote={note.toUpperCase().trim()}
                onPitch={this.props.onPitch}
                stringCount={arr.length}
            />)
        });
    }

    render() {
        const viewBox = `0 0 ${NECK_WIDTH} ${NECK_HEIGHT}`;
        /*
                
        */
       /*
                <GuitarString number={1} openNote='G2' />
                <GuitarString number={2} openNote='D2' />
                <GuitarString number={3} openNote='A1' />
                <GuitarString number={4} openNote='E1' />
       */

      /*<GuitarString number={1} openNote='E4' />
      <GuitarString number={2} openNote='B3' />
      <GuitarString number={3} openNote='G3' />
      <GuitarString number={4} openNote='D3' />
      <GuitarString number={5} openNote='A2' />
      <GuitarString number={6} openNote='E2' />*/

        return (
            <svg className='guitar-neck' viewBox={viewBox} width={NECK_WIDTH} height={NECK_HEIGHT}>
                <rect className='neck' x={0.5} y={0.5} width={NECK_WIDTH} height={NECK_HEIGHT} />
                <rect className='nut' x={0.5} y={0.5} width={SIDE_MARGIN} height={NECK_HEIGHT} />
                {this.renderFrets()}
                {this.renderDots()}
                {this.renderStrings()}
            </svg>
        );
    }
}

export {GuitarNeck, GuitarString};