import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as WebFont from 'webfontloader';

import App from './containers/App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

WebFont.load({
  google: {
    families: ['Nova Square:400', 'sans-serif'],
  },
});

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
registerServiceWorker();
