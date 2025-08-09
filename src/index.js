import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "./Components/ui/provider";
import { Provider as ReduxStore } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./Redux/Store/index";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    <BrowserRouter>
      <ReduxStore store={store}>
        <Provider>
          <App />
        </Provider>
      </ReduxStore>
    </BrowserRouter>
  // </React.StrictMode>
);
reportWebVitals();
