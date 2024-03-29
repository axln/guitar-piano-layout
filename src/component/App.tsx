import React from 'react';
import { PianoGroup } from './PianoGroup';
import { GuitarGroup } from './GuitarGroup';
import { BassGroup } from './BassGroup';
import { UkuleleGroup } from './UkuleleGroup';
import { BalalaikaGroup } from './BalalaikaGroup';
import { ControlGroup } from './ControlGroup';

export const App: React.FC = () => (
  <>
    <ControlGroup />
    <PianoGroup />
    <GuitarGroup />
    <BassGroup />
    <UkuleleGroup />
    <BalalaikaGroup />
  </>
);
