import { store } from '~/store/store';
const oscillators = {};
let context = null;

export function pitchToFrequency(pitch) {
  return 440 * Math.pow(2, pitch / 12);
}

export function playNote(pitch) {
  const freq = pitchToFrequency(pitch);

  if (!store.playSound) {
    return;
  }

  //console.log('play note:', freq);

  if (!context) {
    context = new AudioContext();
  }

  const oscillator = context.createOscillator();
  oscillator.frequency.value = freq;
  oscillator.connect(context.destination);
  oscillator.start(context.currentTime);
  oscillators[freq] = oscillator;
}

export function stopNote(pitch) {
  const freq = pitchToFrequency(pitch);
  if (oscillators[freq]) {
    oscillators[freq].stop(context.currentTime);
    oscillators[freq].disconnect();
    delete oscillators[freq];
  }
}

function midiNoteToFrequency(note) {
  return Math.pow(2, (note - 69) / 12) * 440;
}
