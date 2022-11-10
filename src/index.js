import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { AnvilProvider } from "./nft-anvil/src/";
import AppProvider from "./context";
import ChatICAppProvider from "./chatSDK/chatAppContext";

ReactDOM.render(
  <ChatICAppProvider>
    <AnvilProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </AnvilProvider>
  </ChatICAppProvider>,
  document.getElementById("root")
);
