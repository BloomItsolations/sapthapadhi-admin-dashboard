import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import React, { Suspense } from "react";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// theme
import Loading from "./layouts/Loading";
import ThemeCustomization from "./theme";
import { HelmetProvider } from 'react-helmet-async';

//store
import { Provider } from "react-redux";
import store from "./store/redux";

//***************************************************************//
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeCustomization>
        <Suspense fallback={<Loading />}>
          <Provider store={store}>
            <HelmetProvider>
              <App />
            </HelmetProvider>
          </Provider>
        </Suspense>
      </ThemeCustomization>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
