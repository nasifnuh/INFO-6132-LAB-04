import React from "react";
import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { useAuth } from "@hooks/useAuth";

import AuthNavigator from "@navigation/AuthNavigator";
import AppNavigator from "@navigation/AppNavigator";

const Navigation = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color="#000" size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default Navigation;
