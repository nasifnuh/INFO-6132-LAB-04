import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";

import { useEvents } from "@hooks/useEvents";

import EventForm from "@components/EventForm";
import Loading from "@components/Loading";

const CreateEvent = ({ navigation }) => {
  const { addEvent } = useEvents();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const success = await addEvent(values);

      if (success) {
        Alert.alert("Success", "Event created successfully");
        navigation.goBack();
      } else {
        Alert.alert("Error", "Failed to create event");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <EventForm onSubmit={handleSubmit} submitButtonText="Create Event" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
});

export default CreateEvent;
