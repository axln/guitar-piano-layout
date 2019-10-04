const Helper = {
    oscillators: [],
    context    : null    
};

Helper.CHROMATIC_SCALE = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
Helper.A4_PITCH_OFFSET = 57;
Helper.WHITE_NOTES = 'CDEFGAB';
Helper.BLACK_NOTES = 'CDFGA';
Helper.BLACK_NOTES_FLAT = 'DEGAB';

Helper.noteToPitch = function (fullNote) {
    let note, octave;
    if (fullNote.length == 2) {
        [note, octave] = fullNote;
    } else {
        let sharp;
        [note, sharp, octave] = fullNote;
        note = note + sharp;
    }
    octave = parseInt(octave);
    return octave * 12 + Helper.CHROMATIC_SCALE.indexOf(note) - Helper.A4_PITCH_OFFSET;
};

Helper.octNoteToPitch = function (octave, interval) {
    return octave * 12 + interval - Helper.A4_PITCH_OFFSET;
};

Helper.getPitchColor = pitch => {
    let absPitch = pitch + Helper.A4_PITCH_OFFSET;
    let [octave, offset] = Helper.decodePitch(absPitch);

    //absPitch %= 88;
    const maxHue = 290;
    let hue = Math.round(offset / 12 * maxHue);
    hue %=maxHue;
    let l = Math.min(45 + absPitch / 2, 96);
    //console.log(`pitch: ${absPitch} octave: ${octave}, offset: ${offset}, hue: ${hue}, l: ${l}`);
    return Helper.HSLtoRGB(hue,95, l);
}

Helper.HSLtoRGB = (h,s,l) => {
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
    if (r.length == 1)
      r = "0" + r;
    if (g.length == 1)
      g = "0" + g;
    if (b.length == 1)
      b = "0" + b;
  
    return "#" + r + g + b;
}

Helper.getWhiteInterval = function (keyIndex) {
    if (keyIndex < 3) {
        return (keyIndex * 2);
    } else {
        return (keyIndex * 2) - 1;
    }
};

Helper.getBlackIterval = function (keyIndex) {
    if (keyIndex < 2) {
        return (keyIndex + 1) * 2 - 1;
    } else {
        return (keyIndex + 1) * 2;
    }
};

Helper.pitchToNote = function (pitch) {
    let absolutePitch = pitch + Helper.A4_PITCH_OFFSET;
    let octave = Math.floor(absolutePitch / 12);
    let note = Helper.CHROMATIC_SCALE[absolutePitch % 12];
    return note + octave;
};

Helper.parseRange = function (range) {
    let [start, end] = range.split('-');
    let [startPitch, stopPitch] = [Helper.noteToPitch(start) + Helper.A4_PITCH_OFFSET, Helper.noteToPitch(end) + Helper.A4_PITCH_OFFSET];
    let [startOctave, startNote] = Helper.decodePitch(startPitch);
    let [endOctave, endNote] = Helper.decodePitch(stopPitch);
    let octaves = [];
    for (let i = startOctave; i <= endOctave; ++i) {
        octaves.push({number: i});
    }
    if (startNote !== 0) {
        let note = Helper.CHROMATIC_SCALE[startNote];
        octaves[0].startFrom = note;
        octaves[0].whiteSize = Helper.WHITE_NOTES.length - Helper.WHITE_NOTES.indexOf(note);
    }

    if (endNote !== 11) {
        octaves[octaves.length - 1].endAt = Helper.CHROMATIC_SCALE[endNote];
    }

    return octaves;
}

Helper.getOctSize = function (octInfo) {
    let size = 7;
    if (octInfo.startFrom !== undefined) {
        size -= Helper.WHITE_NOTES.indexOf(octInfo.startFrom);
    }
    if (octInfo.endAt !== undefined) {
        size -= Helper.WHITE_NOTES.length - Helper.WHITE_NOTES.indexOf(octInfo.endAt) - 1;
    }
    return size;
}

Helper.playNote = function (freq) {
    //console.log('start note:', freq);
    if (this.context === null) {
        this.context = new AudioContext();
    }

    this.oscillators[freq] = this.context.createOscillator(); 
    this.oscillators[freq].frequency.value = freq;
    this.oscillators[freq].connect(this.context.destination);
    this.oscillators[freq].start(this.context.currentTime);
}
 
Helper.stopNote = function (freq) {
    //console.log('stop note:', freq);
    this.oscillators[freq].stop(this.context.currentTime);
    this.oscillators[freq].disconnect();
}

Helper.midiNoteToFrequency = note => {
    return Math.pow(2, ((note - 69) / 12)) * 440;
}

Helper.noteToFrequency = note => {
    return 440 * Math.pow(2, note / 12);
}

Helper.decodePitch = pitch => {
    let octave = Math.floor(pitch / 12);
    let offset = pitch % 12;
    return [octave, offset];
}

export default Helper;