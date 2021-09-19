import { Component } from 'react';
import { stopNote, playNote } from '~/lib/SoundGenerator';

export class PianoKey extends Component {
  shouldComponentUpdate(nextProps) {
    const { pushed, baseKey, keyOffset, index } = this.props;
    return (
      pushed !== nextProps.pushed ||
      baseKey !== nextProps.baseKey ||
      index !== nextProps.index ||
      keyOffset !== nextProps.keyOffset
    );
  }
}
