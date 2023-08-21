import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import App from "./App.jsx";
import store from "./store/store.js";
import { persistedStore } from "./store/store.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MantineProvider
      theme={{ colorScheme: "dark" }}
      withCSSVariables
      withGlobalStyles
      withNormalizeCSS
    >
      <BrowserRouter>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistedStore}>
            <App />
          </PersistGate>
        </Provider>
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>
);
