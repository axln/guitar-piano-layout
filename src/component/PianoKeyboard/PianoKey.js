import React from 'react';

export class PianoKey extends React.Component {
    pushed = false;

    /*shouldComponentUpdate(nextProps) {
        return this.props.pushed !== nextProps.pushed;
    }*/

    /*handleMouseLeave() {
        this.handleMouseUp();
    }*/

    handleMouseDown = () => {
        this.props.onPitch(this.props.pitch, 'down');
        this.pushed = true;
    };

    handleMouseUp = () => {
        if (this.pushed) {
            this.props.onPitch(this.props.pitch, 'up');
            this.pushed = false;
        }
    };
}
