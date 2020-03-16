import { connect } from 'react-redux';
import { StringNote } from '../component/GuitarNeck/StringNote';
import { togglePitch } from '../store/action';

const wrappedStringNote = connect(
    ({ }) => ({ }),
    { togglePitch }
)(StringNote);

export { wrappedStringNote as StringNote };
