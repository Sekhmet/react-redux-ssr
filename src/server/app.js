import express from 'express';
import fs from 'fs';
import path from 'path';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from '../client/App';
import reducer from '../client/reducer';

const app = express();

const rootDir = path.join(__dirname, '../..');

const indexHtml = fs.readFileSync(path.join(rootDir, '/templates/index.html'), 'utf-8');

const renderFullPage = (html, state = {}) =>
  indexHtml
    .replace('<!-- server:html -->', html)
    .replace(
      '<!-- server:scripts -->',
      `<script>window.__PRELOADED_STATE__ = ${JSON.stringify(state).replace(
        /</g,
        '\\u003c',
      )}</script>`,
    );

const handleRender = (req, res) => {
  const store = createStore(reducer);

  const reactApp = (
    <Provider store={store}>
      <App />
    </Provider>
  );

  store.dispatch({ type: 'INC' });

  const html = renderToString(reactApp);

  res.send(renderFullPage(html, store.getState()));
};

app.use('/public', express.static('dist'));
app.use(handleRender);

app.listen(3000);
