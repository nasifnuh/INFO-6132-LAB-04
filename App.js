import React from "react";
import { StatusBar } from "expo-status-bar";

import { AuthProvider } from "@context/AuthContext";
import Navigation from "@navigation/RootNavigator";

export default function App() {
  return (
    <AuthProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Navigation />
    </AuthProvider>
  );
}
