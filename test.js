const baseFrequency = 440;
const altBaseFreq = 587.3295358348151; // pitch 5

function pitchToFrequency(pitch, base = baseFrequency) {
  return base * Math.pow(2, pitch / 12);
}

const pitches = {};

for (let pitch = -24; pitch < 24; pitch++) {
  const freq = pitchToFrequency(pitch);

  console.log(`Freq for ${pitch} = ${freq} Hz`);
  // pitches.push({ base: freq });
}

for (let pitch = -24 + 5; pitch < 24 - 5; pitch++) {
  const freq = pitchToFrequency(pitch, altBaseFreq);
  console.log(`Alt freq for alt ${pitch} = ${freq} Hz`);
}
