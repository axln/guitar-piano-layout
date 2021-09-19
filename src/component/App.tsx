import React from 'react';
import { PianoGroup } from './PianoGroup';
import { GuitarGroup } from './GuitarGroup';
import { BassGroup } from './BassGroup';
import { UkuleleGroup } from './UkuleleGroup';
import { BalalaikaGroup } from './BalalaikaGroup';
import { PlaySoundGroup } from './PlaySoundGroup';

export const App: React.FC = () => (
  <>
    <PlaySoundGroup />
    <PianoGroup />
    <GuitarGroup />
    <BassGroup />
    <UkuleleGroup />
    <BalalaikaGroup />
  </>
);
