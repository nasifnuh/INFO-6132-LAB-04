import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Platform,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { Formik } from "formik";
import * as Yup from "yup";
import { Ionicons } from "@expo/vector-icons";

import Input from "@components/Input";
import Button from "@components/Button";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  location: Yup.string().required("Location is required"),
  date: Yup.date().required("Date is required"),
  imageUrl: Yup.string(),
});

const EventForm = ({ initialValues, onSubmit, submitButtonText = "Save" }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const defaultValues = {
    title: "",
    description: "",
    location: "",
    date: new Date(),
    imageUrl: "",
    ...initialValues,
  };

  const pickImage = async (setFieldValue) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    if (!result.canceled && result.assets[0]) {
      setFieldValue("imageUrl", result.assets[0].uri);
    }
  };

  const handleDateChange = (setFieldValue) => (event, selectedDate) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setFieldValue("date", selectedDate);
    }
    setShowDatePicker(false);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Formik
        initialValues={defaultValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <View style={styles.form}>
            <TouchableOpacity
              style={styles.imageContainer}
              onPress={() => pickImage(setFieldValue)}
            >
              {values.imageUrl ? (
                <Image
                  source={{ uri: values.imageUrl }}
                  style={styles.imagePreview}
                />
              ) : (
                <View style={styles.imagePlaceholder}>
                  <Text style={styles.imagePlaceholderText}>Select Image</Text>
                </View>
              )}
            </TouchableOpacity>

            <Input
              placeholder="Event Title"
              value={values.title}
              onChangeText={handleChange("title")}
              onBlur={handleBlur("title")}
              error={touched.title && errors.title}
            />

            <Input
              placeholder="Event Description"
              value={values.description}
              onChangeText={handleChange("description")}
              onBlur={handleBlur("description")}
              error={touched.description && errors.description}
              multiline
              numberOfLines={4}
            />

            <Input
              placeholder="Event Location"
              value={values.location}
              onChangeText={handleChange("location")}
              onBlur={handleBlur("location")}
              error={touched.location && errors.location}
            />

            <View style={styles.dateContainer}>
              <View style={{ width: "85%" }}>
                <Input
                  placeholder="Event Date"
                  value={formatDate(values.date)}
                  error={touched.date && errors.date}
                  editable={false}
                />
              </View>
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setShowDatePicker(!showDatePicker)}
              >
                <Ionicons name="calendar-outline" size={20} color="black" />
              </TouchableOpacity>
            </View>
            {showDatePicker && (
              <DateTimePicker
                style={{ marginHorizontal: "auto" }}
                value={new Date(values.date)}
                mode="date"
                display="default"
                onChange={handleDateChange(setFieldValue)}
              />
            )}

            <Button title={submitButtonText} onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  form: {
    padding: 20,
  },
  dateContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
  },
  dateButton: {
    backgroundColor: "#FFFFFF",
    height: 45,
    width: 45,
    borderRadius: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: "100%",
    height: 200,
    marginBottom: 20,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
  },
  imagePreview: {
    width: "100%",
    height: "100%",
  },
  imagePlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ddd",
    borderStyle: "dashed",
    borderRadius: 8,
  },
  imagePlaceholderText: {
    color: "#666",
    fontSize: 16,
  },
});

export default EventForm;
