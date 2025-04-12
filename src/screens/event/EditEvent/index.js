import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";

import { useEvents } from "@hooks/useEvents";

import EventForm from "@components/EventForm";
import Loading from "@components/Loading";

const EditEvent = ({ route, navigation }) => {
  const { event } = route.params;
  const { editEvent } = useEvents();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const success = await editEvent(event.id, values);

      if (success) {
        Alert.alert("Success", "Event updated successfully");
        navigation.navigate("Events");
      } else {
        Alert.alert("Error", "Failed to update event");
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
      <EventForm
        initialValues={event}
        onSubmit={handleSubmit}
        submitButtonText="Update Event"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
});

export default EditEvent;
