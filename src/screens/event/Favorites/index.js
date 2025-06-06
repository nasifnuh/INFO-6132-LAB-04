import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Alert, Text } from "react-native";

import { useEvents } from "@hooks/useEvents";
import { useAuth } from "@hooks/useAuth";

import EventCard from "@components/EventCard";
import Loading from "@components/Loading";

const FavoritesScreen = ({ navigation }) => {
  const { user } = useAuth();
  const {
    favoriteEvents,
    loading,
    error,
    fetchFavoriteEvents,
    removeEvent,
    toggleEventFavorite,
  } = useEvents();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchFavoriteEvents();
    });

    return unsubscribe;
  }, [navigation, fetchFavoriteEvents]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchFavoriteEvents();
    setRefreshing(false);
  };

  const handleEventPress = (event) => {
    navigation.navigate("EventDetail", { event });
  };

  const handleEditEvent = (event) => {
    navigation.navigate("EditEvent", { event });
  };

  const handleDeleteEvent = (eventId) => {
    Alert.alert("Delete Event", "Are you sure you want to delete this event?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await removeEvent(eventId);
        },
      },
    ]);
  };

  const handleFavoriteToggle = async (eventId) => {
    try {
      await toggleEventFavorite(eventId);
      await fetchFavoriteEvents();
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  if (loading && !refreshing) {
    return <Loading />;
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  if (favoriteEvents.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>No favorite events found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EventCard
            event={item}
            onPress={() => handleEventPress(item)}
            onFavoriteToggle={handleFavoriteToggle}
            onEdit={handleEditEvent}
            onDelete={handleDeleteEvent}
            currentUserId={user.uid}
          />
        )}
        contentContainerStyle={styles.listContent}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  listContent: {
    padding: 15,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
  },
  errorText: {
    fontSize: 16,
    color: "#ff3b30",
  },
});

export default FavoritesScreen;
