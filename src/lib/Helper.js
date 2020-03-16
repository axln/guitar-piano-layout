export const WHITE_NOTES = 'CDEFGAB';
export const BLACK_NOTES = 'CDFGA';
export const BLACK_NOTES_FLAT = 'DEGAB';

const CHROMATIC_SCALE = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
const A4_PITCH_OFFSET = 57;

export function noteToPitch(fullNote) {
    let note, octave;
    if (fullNote.length === 2) {
        [note, octave] = fullNote;
    } else {
        let sharp;
        [note, sharp, octave] = fullNote;
        note = note + sharp;
    }
    octave = parseInt(octave);
    return octave * 12 + CHROMATIC_SCALE.indexOf(note) - A4_PITCH_OFFSET;
}

export function octNoteToPitch(octave, interval) {
    return octave * 12 + interval - A4_PITCH_OFFSET;
}

export function getPitchColor(pitch) {
    let absPitch = pitch + A4_PITCH_OFFSET;
    let [_, offset] = decodePitch(absPitch);

    //absPitch %= 88;
    const maxHue = 290;
    let hue = Math.round(offset / 12 * maxHue);
    hue %= maxHue;
    let l = Math.min(45 + absPitch / 2, 96);
    //console.log(`pitch: ${absPitch} octave: ${octave}, offset: ${offset}, hue: ${hue}, l: ${l}`);
    return HSLtoRGB(hue,95, l);
}

function HSLtoRGB(h, s, l) {
    s /= 100;
    l /= 100;

    let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs((h / 60) % 2 - 1)),
        m = l - c/2,
        r = 0,
        g = 0,
        b = 0;

    if (0 <= h && h < 60) {
      r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
      r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
      r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
      r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
      r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
      r = c; g = 0; b = x;
    }
    // Having obtained RGB, convert channels to hex
    r = Math.round((r + m) * 255).toString(16);
    g = Math.round((g + m) * 255).toString(16);
    b = Math.round((b + m) * 255).toString(16);

    // Prepend 0s, if necessary
    if (r.length === 1)
      r = '0' + r;
    if (g.length === 1)
      g = '0' + g;
    if (b.length === 1)
      b = '0' + b;

    return `#${r}${g}${b}`;
}

export function getWhiteInterval(keyIndex) {
    if (keyIndex < 3) {
        return (keyIndex * 2);
    } else {
        return (keyIndex * 2) - 1;
    }
}

export function getBlackInterval(keyIndex) {
    if (keyIndex < 2) {
        return (keyIndex + 1) * 2 - 1;
    } else {
        return (keyIndex + 1) * 2;
    }
}

export function pitchToNote(pitch) {
    let absolutePitch = pitch + A4_PITCH_OFFSET;
    let octave = Math.floor(absolutePitch / 12);
    let note = CHROMATIC_SCALE[absolutePitch % 12];
    return note + octave;
}

export function parseRange(range) {
    let [start, end] = range.split('-');
    let [startPitch, stopPitch] = [noteToPitch(start) + A4_PITCH_OFFSET, noteToPitch(end) + A4_PITCH_OFFSET];
    let [startOctave, startNote] = decodePitch(startPitch);
    let [endOctave, endNote] = decodePitch(stopPitch);
    let octaves = [];
    for (let i = startOctave; i <= endOctave; ++i) {
        octaves.push({number: i});
    }
    if (startNote !== 0) {
        let note = CHROMATIC_SCALE[startNote];
        octaves[0].startFrom = note;
        octaves[0].whiteSize = WHITE_NOTES.length - WHITE_NOTES.indexOf(note);
    }

    if (endNote !== 11) {
        octaves[octaves.length - 1].endAt = CHROMATIC_SCALE[endNote];
    }

    return octaves;
}

 export function getOctSize(octInfo) {
    let size = 7;
    if (octInfo.startFrom !== undefined) {
        size -= WHITE_NOTES.indexOf(octInfo.startFrom);
    }
    if (octInfo.endAt !== undefined) {
        size -= WHITE_NOTES.length - WHITE_NOTES.indexOf(octInfo.endAt) - 1;
    }
    return size;
}

function decodePitch(pitch) {
    let octave = Math.floor(pitch / 12);
    let offset = pitch % 12;
    return [octave, offset];
}

function* segGenerator(from, to) {
    for (let i = from; i <= to; ++i) {
        yield i;
    }
}

export function seq(from, to) {
    return Array.from(segGenerator(from, to))
}
