import React from 'react';
import ReactDOM from 'react-dom';
import Dupes from './Dupes';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Dupes />, div);
  ReactDOM.unmountComponentAtNode(div);
});
