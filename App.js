import React from "react";
import type { Node } from "react";
import { View } from "react-native";

import { Provider as ReduxProvider } from "react-redux";
import store from "./redux/store";

import { Navigation } from "./screens/Navigation";


const App = (): Node => {
  return (
    <ReduxProvider store={store}>
      <Navigation />
    </ReduxProvider>
  );
};

export default App;
