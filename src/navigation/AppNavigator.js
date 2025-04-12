import React from "react";
import { TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { useAuth } from "@hooks/useAuth";

import Events from "@screens/event/Events";
import EventDetail from "@screens/event/EventDetail";
import CreateEvent from "@screens/event/CreateEvent";
import EditEvent from "@screens/event/EditEvent";
import Favorites from "@screens/event/Favorites";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const EventsStack = () => {
  const { logout } = useAuth();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Events"
        component={Events}
        options={({ navigation }) => ({
          title: "Events",
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 15 }}
              onPress={() => navigation.navigate("CreateEvent")}
            >
              <Ionicons name="add" size={24} color="#7F3DFF" />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity style={{ marginLeft: 15 }} onPress={logout}>
              <Ionicons name="log-out-outline" size={24} color="#7F3DFF" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="EventDetail"
        component={EventDetail}
        options={{ title: "Details" }}
      />
      <Stack.Screen
        name="CreateEvent"
        component={CreateEvent}
        options={{ title: "Create Event" }}
      />
      <Stack.Screen
        name="EditEvent"
        component={EditEvent}
        options={{ title: "Edit Event" }}
      />
    </Stack.Navigator>
  );
};

const FavoritesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Favorites"
        component={Favorites}
        options={{ title: "Favorites" }}
      />
      <Stack.Screen
        name="EventDetail"
        component={EventDetail}
        options={{ title: "Details" }}
      />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "EventsTab") {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (route.name === "FavoritesTab") {
            iconName = focused ? "heart" : "heart-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#7F3DFF",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="EventsTab"
        component={EventsStack}
        options={{
          headerShown: false,
          title: "Events",
        }}
      />
      <Tab.Screen
        name="FavoritesTab"
        component={FavoritesStack}
        options={{
          headerShown: false,
          title: "Favorites",
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
