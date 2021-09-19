import React from 'react';
import { PianoGroup } from './PianoGroup';
import { GuitarGroup } from './GuitarGroup';
import { BassGroup } from './BassGroup';
import { UkuleleGroup } from './UkuleleGroup';
import { BalalaikaGroup } from './BalalaikaGroup';
import { SettingsGroup } from './SettingsGroup';

export const App: React.FC = () => (
  <>
    <SettingsGroup />
    <PianoGroup />
    <GuitarGroup />
    <BassGroup />
    <UkuleleGroup />
    <BalalaikaGroup />
  </>
);
