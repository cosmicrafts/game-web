import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { AnvilProvider } from "./nft-anvil/src/";
import AppProvider from "./context";

ReactDOM.render(
    <AnvilProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </AnvilProvider>,
  document.getElementById("root")
);
