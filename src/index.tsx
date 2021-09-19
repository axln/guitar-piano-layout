import React from 'react';
import { render } from 'react-dom';
import { App } from '~/component/App';

function reactMain() {
  render(<App />, document.getElementById('root'));
}

window.addEventListener('DOMContentLoaded', reactMain);
