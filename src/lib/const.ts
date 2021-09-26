export const PIANO_RANGE = 'A0-C8';
export const SYNTH_76_RANGE = 'E1-G7';
export const SYNTH_61_RANGE = 'C2-C7';
export const SYNTH_49_RANGE = 'C2-C6';
export const SYNTH_44_RANGE = 'F2-C6';
export const SYNTH_37_RANGE = 'C3-C6';

export const GUITAR_TUNING = 'E2 A2 D3 G3 B3 E4';
export const GUITAR_TUNING_7_STRING = 'B1 E2 A2 D3 G3 B3 E4';
export const GUITAR_TUNING_8_STRING = 'F#1 B1 E2 A2 D3 G3 B3 E4';

export const BASS_TUNING = 'E1 A1 D2 G2';
export const BASS_TUNING_5_STRING = 'B0 E1 A1 D2 G2';
export const UKULELE_TUNING = 'G4 C4 E4 A4';
export const BALALAIKA_TUNING = 'E4 E4 A4';

export const DEFAULT_NECK_LENGTH = 1400;
export const DEFAULT_NECK_WIDTH = 150;

export const DOT_FRETS = [3, 5, 7, 9, 12, 15, 17, 19, 21, 24];

export const WHITE_WIDTH = 30;
export const WHITE_HEIGHT = Math.round((145 / 23) * WHITE_WIDTH);
export const BLACK_WIDTH = (WHITE_WIDTH * 7) / 12;
export const BLACK_HEIGHT = Math.round(WHITE_HEIGHT * 0.65);

export const WHITE_NOTES = 'CDEFGAB';
export const BLACK_NOTES = 'CDFGA';
export const BLACK_NOTES_FLAT = 'DEGAB';

export const CHROMATIC_SCALE = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export const A4_PITCH_OFFSET = 57;

export const ALT_NOTE_NAMES: Record<string, string> = {
  C: 'do',
  D: 're',
  E: 'mi',
  F: 'fa',
  G: 'sol',
  A: 'la',
  B: 'si'
};

export const MAJOR_INTERVALS_HALFTONE = [2, 2, 1, 2, 2, 2, 1];
export const MINOR_INTERVALS_HALFTONE = [2, 1, 2, 2, 1, 2, 2];

//////////////////////////////// 2  3    4    5  6    7    8
export const MAJOR_PENTATONIC = [2, 2, /*1,*/ 3, 2, /*2,*/ 3];
////////////////////////////////   2    3  4  5    6    7  8
export const MINOR_PENTATONIC = [/*2,*/ 3, 2, 2, /*1,*/ 3, 2];
