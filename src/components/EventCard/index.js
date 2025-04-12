import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const EventCard = ({
  event,
  onPress,
  onFavoriteToggle,
  onEdit,
  onDelete,
  currentUserId,
}) => {
  const isOwner = event.userId === currentUserId;
  const isFavorite = event.isFavoriteByUser(currentUserId);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {event.imageUrl && (
        <Image
          source={{ uri: event.imageUrl }}
          style={styles.cardImage}
          resizeMode="cover"
        />
      )}

      <View style={styles.cardHeader}>
        <Text style={styles.title}>{event.title}</Text>
        <TouchableOpacity
          onPress={() => onFavoriteToggle(event.id)}
          style={styles.favoriteButton}
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={24}
            color={isFavorite ? "#ff3b30" : "#666"}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.cardContent}>
        <View style={styles.infoRow}>
          <Ionicons
            name="calendar-outline"
            size={16}
            color="#666"
            style={styles.icon}
          />
          <Text style={styles.infoText}>{formatDate(event.date)}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons
            name="location-outline"
            size={16}
            color="#666"
            style={styles.icon}
          />
          <Text style={styles.infoText}>{event.location}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons
            name="person-outline"
            size={16}
            color="#666"
            style={styles.icon}
          />
          <Text style={styles.creatorText}>{event.userName}</Text>
        </View>

        <Text style={styles.description} numberOfLines={2}>
          {event.description}
        </Text>
      </View>

      {isOwner && (
        <View style={styles.cardActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => onEdit(event)}
          >
            <Ionicons name="create-outline" size={20} color="#7F3DFF" />
            <Text style={styles.actionText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => onDelete(event.id)}
          >
            <Ionicons name="trash-outline" size={20} color="#ff3b30" />
            <Text style={[styles.actionText, styles.deleteText]}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 10,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  favoriteButton: {
    padding: 5,
  },
  cardContent: {
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 7,
  },
  icon: {
    marginRight: 5,
  },
  infoText: {
    color: "#666",
    fontSize: 14,
  },
  description: {
    color: "#333",
    fontSize: 14,
    marginTop: 5,
  },
  creatorText: {
    fontSize: 14,
    color: "#666",
  },
  cardActions: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 10,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  actionText: {
    marginLeft: 5,
    fontSize: 14,
    color: "#7F3DFF",
  },
  deleteText: {
    color: "#ff3b30",
  },
});

export default EventCard;
