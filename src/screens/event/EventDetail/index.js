import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useAuth } from "@hooks/useAuth";
import { useEvents } from "@hooks/useEvents";

import Button from "@components/Button";

const EventDetail = ({ route, navigation }) => {
  const { event } = route.params;
  const { user } = useAuth();
  const { removeEvent, toggleEventFavorite, fetchEvents, fetchFavoriteEvents } =
    useEvents();
  const isOwner = event.userId === user.uid;
  const isFavorite = event.isFavoriteByUser(user.uid);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleEdit = () => {
    navigation.navigate("EditEvent", { event });
  };

  const handleDelete = () => {
    Alert.alert("Delete Event", "Are you sure you want to delete this event?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await removeEvent(event.id);
          navigation.goBack();
        },
      },
    ]);
  };

  const handleFavoriteToggle = async () => {
    try {
      await toggleEventFavorite(event.id);
      await fetchEvents();
      await fetchFavoriteEvents();
      navigation.goBack();
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{event.title}</Text>
          <TouchableOpacity onPress={handleFavoriteToggle}>
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={24}
              color={isFavorite ? "#ff3b30" : "#666"}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.imageContainer}>
          <Image source={{ uri: event.imageUrl }} style={styles.imagePreview} />
        </View>
      </View>

      <View style={styles.infoSection}>
        <View style={styles.infoRow}>
          <Ionicons
            name="calendar"
            size={20}
            color="#7F3DFF"
            style={styles.icon}
          />
          <Text style={styles.infoText}>{formatDate(event.date)}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons
            name="location"
            size={20}
            color="#7F3DFF"
            style={styles.icon}
          />
          <Text style={styles.infoText}>{event.location}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons
            name="person"
            size={20}
            color="#7F3DFF"
            style={styles.icon}
          />
          <Text style={styles.infoText}>{event.userName}</Text>
        </View>
      </View>

      <View style={styles.descriptionSection}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{event.description}</Text>
      </View>

      {isOwner && (
        <View style={styles.actionButtons}>
          <Button title="Edit Event" onPress={handleEdit} type="primary" />
          <Button
            title="Delete Event"
            onPress={handleDelete}
            type="secondary"
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  imageContainer: {
    width: "100%",
    height: 200,
    marginBottom: 20,
    marginTop: 20,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
  },
  imagePreview: {
    width: "100%",
    height: "100%",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  infoText: {
    fontSize: 16,
    color: "#333",
  },
  descriptionSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
  },
  actionButtons: {
    padding: 20,
    marginTop: 10,
  },
});

export default EventDetail;
