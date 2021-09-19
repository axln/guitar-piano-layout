import React from 'react';
import { render } from 'react-dom';
import { App } from '~/component/App';

window.addEventListener('DOMContentLoaded', () => {
  render(<App />, document.getElementById('root'));
});
