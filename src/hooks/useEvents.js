import { useState, useEffect, useCallback } from "react";

import { useAuth } from "@hooks/useAuth";
import {
  getAllEvents,
  getFavoriteEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  toggleFavorite,
} from "@services/eventService";

export const useEvents = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [favoriteEvents, setFavoriteEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvents = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      const allEvents = await getAllEvents();
      setEvents(allEvents);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const fetchFavoriteEvents = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      const favorites = await getFavoriteEvents(user.uid);
      setFavoriteEvents(favorites);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const addEvent = async (eventData) => {
    if (!user) return;

    try {
      setLoading(true);
      await createEvent(eventData, user.uid, user.displayName);
      await fetchEvents();
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const editEvent = async (eventId, eventData) => {
    try {
      setLoading(true);
      await updateEvent(eventId, eventData);
      await fetchEvents();
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const removeEvent = async (eventId) => {
    try {
      setLoading(true);
      await deleteEvent(eventId);
      await fetchEvents();
      await fetchFavoriteEvents();
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const toggleEventFavorite = async (eventId) => {
    try {
      setLoading(true);
      await toggleFavorite(eventId, user.uid);
      await Promise.all([fetchEvents(), fetchFavoriteEvents()]);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
    fetchFavoriteEvents();
  }, [fetchEvents, fetchFavoriteEvents]);

  return {
    events,
    favoriteEvents,
    loading,
    error,
    fetchEvents,
    fetchFavoriteEvents,
    addEvent,
    editEvent,
    removeEvent,
    toggleEventFavorite,
  };
};
