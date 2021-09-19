import { PianoGroup } from './PianoGroup';
import { GuitarGroup } from './GuitarGroup';
import { BassGroup } from './BassGroup';
import { UkuleleGroup } from './UkuleleGroup';
import { BalalaikaGroup } from './BalalaikaGroup';
import { PlaySoundGroup } from './PlaySoundGroup';

export const App = () => (
  <>
    <PlaySoundGroup />
    <PianoGroup />
    <GuitarGroup />
    <BassGroup />
    <UkuleleGroup />
    <BalalaikaGroup />
  </>
);
