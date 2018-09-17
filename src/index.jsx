// Application entrypoint.

// Load up the application styles
require("../styles/application.scss");

// Render the top-level React component
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

// render the App and tailing it to the specific id
ReactDOM.render(<App />, document.getElementById('react-root'));
