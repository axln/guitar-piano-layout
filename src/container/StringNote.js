import { connect } from 'react-redux';
import { StringNote } from '../component/GuitarNeck/StringNote';
import { onPitch, setPitch, unsetPitch } from '../store/action';

const wrappedStringNote = connect(
    ({ pitches }) => ({ pitches }),
    { onPitch, setPitch, unsetPitch }
)(StringNote);

export { wrappedStringNote as StringNote };
