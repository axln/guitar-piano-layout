import { connect } from 'react-redux';
import { StringNote } from '../component/Guitar/StringNote';
import { togglePitch } from '../store/action';

const wrappedStringNote = connect(
    ({}) => ({}),
    { togglePitch }
)(StringNote);

export { wrappedStringNote as StringNote };
