import { A4_PITCH_OFFSET, ALT_NOTE_NAMES, CHROMATIC_SCALE, WHITE_NOTES } from './const';
import { AlterType, ScaleType } from '~/store/store';

export function noteToPitch(fullNote: string): number {
  return noteToBasePitch(fullNote) - A4_PITCH_OFFSET;
}

export function noteToBasePitch(fullNote: string): number {
  let note, octave;
  if (fullNote.length === 2) {
    [note, octave] = fullNote;
  } else {
    let sharp;
    [note, sharp, octave] = fullNote;
    note = note + sharp;
  }
  octave = parseInt(octave);
  return octave * 12 + CHROMATIC_SCALE.indexOf(note);
}

export function octNoteToPitch(octaveNumber: number, interval: number) {
  return octaveNumber * 12 + interval - A4_PITCH_OFFSET;
}

export function getPitchColor(pitch: number): string {
  let absPitch = pitch + A4_PITCH_OFFSET;
  let [_, offset] = decodePitch(absPitch);

  const maxHue = 290;
  let hue = Math.round((offset / 12) * maxHue);
  hue %= maxHue;
  let l = Math.min(45 + absPitch / 2, 96);
  //console.log(`pitch: ${absPitch} octave: ${octave}, offset: ${offset}, hue: ${hue}, l: ${l}`);
  return HSLtoRGB(hue, 95, l);
}

function HSLtoRGB(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  // Having obtained RGB, convert channels to hex
  let rS = Math.round((r + m) * 255).toString(16);
  let gS = Math.round((g + m) * 255).toString(16);
  let bS = Math.round((b + m) * 255).toString(16);

  // Prepend 0s, if necessary
  if (rS.length === 1) rS = '0' + r;
  if (gS.length === 1) gS = '0' + g;
  if (bS.length === 1) bS = '0' + b;

  return `#${rS}${gS}${bS}`;
}

export function getWhiteInterval(keyIndex: number): number {
  if (keyIndex < 3) {
    return keyIndex * 2;
  } else {
    return keyIndex * 2 - 1;
  }
}

export function getBlackInterval(keyIndex: number): number {
  if (keyIndex < 2) {
    return (keyIndex + 1) * 2 - 1;
  } else {
    return (keyIndex + 1) * 2;
  }
}

export function pitchToNote(pitch: number, withOctave: boolean = true): string {
  let absolutePitch = pitch + A4_PITCH_OFFSET;
  let octave = Math.floor(absolutePitch / 12);
  let note = CHROMATIC_SCALE[absolutePitch % 12];
  return withOctave ? note + octave : note;
}

// console.log('A0:', noteToPitch('A0'));
// console.log('C8:', noteToPitch('C8'));

export type OctaveInfo = {
  startFrom?: string;
  endAt?: string;
  number: number;
};

export function parseRange(range: string): OctaveInfo[] {
  let [start, end] = range.split('-');
  let [startPitch, stopPitch] = [
    noteToPitch(start) + A4_PITCH_OFFSET,
    noteToPitch(end) + A4_PITCH_OFFSET
  ];
  let [startOctave, startNote] = decodePitch(startPitch);
  let [endOctave, endNote] = decodePitch(stopPitch);
  let octaves: Array<OctaveInfo> = [];
  for (let i = startOctave; i <= endOctave; ++i) {
    octaves.push({ number: i });
  }
  if (startNote !== 0) {
    octaves[0].startFrom = CHROMATIC_SCALE[startNote];
  }

  if (endNote !== 11) {
    octaves[octaves.length - 1].endAt = CHROMATIC_SCALE[endNote];
  }

  return octaves;
}

export function getOctSize(octInfo: OctaveInfo): number {
  let size = 7;
  if (octInfo.startFrom !== undefined) {
    size -= WHITE_NOTES.indexOf(octInfo.startFrom);
  }
  if (octInfo.endAt !== undefined) {
    size -= WHITE_NOTES.length - WHITE_NOTES.indexOf(octInfo.endAt) - 1;
  }
  return size;
}

function decodePitch(pitch: number): [number, number] {
  let octave = Math.floor(pitch / 12);
  let offset = pitch % 12;
  return [octave, offset];
}

function* segGenerator(from: number, to: number) {
  for (let i = from; to > from ? i <= to : i >= to; i += to > from ? 1 : -1) {
    yield i;
  }
}

export function seq(from: number, to: number): Array<number> {
  return Array.from(segGenerator(from, to));
}

export function getAltName(pitch: number): string {
  let note = pitchToNote(pitch);
  return ALT_NOTE_NAMES[note[0]];
}

export function getWhiteNoteNumber(keyIndex: number) {
  return getWhiteInterval(keyIndex);
}

export function getBlackNoteNumber(keyNumber: number) {
  return getBlackInterval(keyNumber);
}

export function buildScale(
  tonicPitch: number,
  intervals: number[],
  allOctaves: boolean = true
): number[] {
  let currentPitch = tonicPitch;
  const octavePitches = [tonicPitch];
  let intervalsPassed = 0;
  while (currentPitch < tonicPitch + 12) {
    currentPitch += intervals[intervalsPassed++ % 7];
    octavePitches.push(currentPitch);
  }

  if (allOctaves) {
    const allPitches: number[] = [];
    for (const pitch of octavePitches) {
      const allNotePitches = getSameNotesPitches(pitch);
      allPitches.push(...allNotePitches);
    }
    return allPitches;
  } else {
    return octavePitches;
  }
}

export function buildChord(
  pitch: number,
  scale: ScaleType,
  onlyUp: boolean = true,
  alterType: AlterType | null = null
): number[] {
  const pitches: number[] = [];

  pitches.push(...getSameNotesPitches(pitch, onlyUp));
  if (alterType === AlterType.sus2) {
    pitches.push(...getSameNotesPitches(pitch + 2, onlyUp));
  } else if (alterType === AlterType.sus4) {
    pitches.push(...getSameNotesPitches(pitch + 5, onlyUp));
  } else {
    if (scale === ScaleType.Major) {
      pitches.push(...getSameNotesPitches(pitch + 4, onlyUp));
    } else {
      pitches.push(...getSameNotesPitches(pitch + 3, onlyUp));
    }
  }
  /*if (scale === ScaleType.Major) {
    if (alterType === AlterType.sus2) {
      pitches.push(...getSameNotesPitches(pitch + 2, onlyUp));
    } else if (alterType === AlterType.sus4) {
      pitches.push(...getSameNotesPitches(pitch + 5, onlyUp));
    } else {
      pitches.push(...getSameNotesPitches(pitch + 4, onlyUp));
    }
  } else if (scale === ScaleType.Minor) {
    if (alterType === AlterType.sus2) {
      pitches.push(...getSameNotesPitches(pitch + 2, onlyUp));
    } else if (alterType === AlterType.sus4) {
      pitches.push(...getSameNotesPitches(pitch + 5, onlyUp));
    } else {
      pitches.push(...getSameNotesPitches(pitch + 3, onlyUp));
    }
  }*/

  pitches.push(...getSameNotesPitches(pitch + 7, onlyUp));

  return pitches;
}

export function getMajorChordPitches(pitch: number, sept = false): number[] {
  const pitches: number[] = [];
  pitches.push(...getSameNotesPitches(pitch));
  pitches.push(...getSameNotesPitches(pitch + 4));
  pitches.push(...getSameNotesPitches(pitch + 7));
  if (sept) {
    pitches.push(...getSameNotesPitches(pitch + 11));
  }

  return pitches;
}

export function getMinorChordPitches(pitch: number, onlyUp = false, sept = false): number[] {
  const pitches: number[] = [];

  pitches.push(...getSameNotesPitches(pitch, onlyUp));
  pitches.push(...getSameNotesPitches(pitch + 3, onlyUp));
  pitches.push(...getSameNotesPitches(pitch + 7, onlyUp));
  if (sept) {
    pitches.push(...getSameNotesPitches(pitch + 10));
  }

  return pitches;
}

export function getSameNotesPitches(pitch: number, onlyUp = false): number[] {
  const pitches: number[] = [];
  let currentPitch = pitch;

  if (!onlyUp) {
    while (currentPitch >= -48) {
      pitches.push(currentPitch);
      currentPitch -= 12;
    }
  }

  currentPitch = onlyUp ? pitch : pitch + 12;
  while (currentPitch <= 39) {
    pitches.push(currentPitch);
    currentPitch += 12;
  }

  return pitches.sort((a, b) => a - b);
}
