import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  serverTimestamp,
  Timestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "@config/firebase";
import Event from "@models/Event";
import * as FileSystem from "expo-file-system";

const EVENTS_COLLECTION = "events";

const convertImageToBase64 = async (uri) => {
  if (!uri) return null;
  try {
    const base64Data = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    return `data:image/jpeg;base64,${base64Data}`;
  } catch (error) {
    console.error("Error converting image:", error);
    throw error;
  }
};

export const getUserEvents = async (userId) => {
  try {
    const eventsRef = collection(db, EVENTS_COLLECTION);
    const q = query(eventsRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => Event.fromFirestore(doc));
  } catch (error) {
    console.error("Error getting user events:", error);
    throw error;
  }
};

export const getAllEvents = async () => {
  try {
    const eventsRef = collection(db, EVENTS_COLLECTION);
    const querySnapshot = await getDocs(eventsRef);
    return querySnapshot.docs.map((doc) => Event.fromFirestore(doc));
  } catch (error) {
    console.error("Error getting all events:", error);
    throw error;
  }
};

export const getFavoriteEvents = async (userId) => {
  try {
    const eventsRef = collection(db, EVENTS_COLLECTION);
    const q = query(eventsRef, where("favoriteBy", "array-contains", userId));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => Event.fromFirestore(doc));
  } catch (error) {
    console.error("Error getting favorite events:", error);
    throw error;
  }
};

export const createEvent = async (eventData, userId, userName) => {
  try {
    const imageBase64 = await convertImageToBase64(eventData.imageUrl);
    const eventsRef = collection(db, EVENTS_COLLECTION);

    const dateTimestamp = Timestamp.fromDate(new Date(eventData.date));

    const docRef = await addDoc(eventsRef, {
      ...eventData,
      imageUrl: imageBase64,
      date: dateTimestamp,
      userId,
      userName,
      favoriteBy: [],
      createdAt: serverTimestamp(),
    });

    return docRef.id;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};

export const updateEvent = async (eventId, eventData) => {
  try {
    const eventRef = doc(db, EVENTS_COLLECTION, eventId);

    const updatedData = { ...eventData };
    if (updatedData.date) {
      updatedData.date = Timestamp.fromDate(new Date(updatedData.date));
    }

    if (updatedData.imageUrl && updatedData.imageUrl.startsWith("file://")) {
      updatedData.imageUrl = await convertImageToBase64(updatedData.imageUrl);
    }

    await updateDoc(eventRef, {
      ...updatedData,
      updatedAt: serverTimestamp(),
    });

    return true;
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
};

export const deleteEvent = async (eventId) => {
  try {
    const eventRef = doc(db, EVENTS_COLLECTION, eventId);
    await deleteDoc(eventRef);
    return true;
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error;
  }
};

export const toggleFavorite = async (eventId, userId) => {
  try {
    const eventRef = doc(db, EVENTS_COLLECTION, eventId);
    const eventDoc = await getDoc(eventRef);
    const eventData = eventDoc.data();
    const favoriteBy = eventData.favoriteBy || [];

    const isCurrentlyFavorite = favoriteBy.includes(userId);
    const updatedFavoriteBy = isCurrentlyFavorite
      ? favoriteBy.filter((id) => id !== userId)
      : [...favoriteBy, userId];

    await updateDoc(eventRef, {
      favoriteBy: updatedFavoriteBy,
      updatedAt: serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.error("Error toggling favorite status:", error);
    throw error;
  }
};
