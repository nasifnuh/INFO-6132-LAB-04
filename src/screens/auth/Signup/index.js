import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

import { useAuth } from "@hooks/useAuth";

import Input from "@components/Input";
import Button from "@components/Button";
import Loading from "@components/Loading";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const Signup = ({ navigation }) => {
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSignup = async (values) => {
    try {
      setLoading(true);
      await register(values.email, values.password, values.name);
    } catch (error) {
      setLoading(false);
      Alert.alert("Registration Failed", error.message);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Eventa</Text>
          <Text style={styles.subtitle}>Create a new account</Text>

          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSignup}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View style={styles.form}>
                <Input
                  placeholder="Full Name"
                  value={values.name}
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  error={touched.name && errors.name}
                />

                <Input
                  placeholder="Email"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  error={touched.email && errors.email}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />

                <Input
                  placeholder="Password"
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  error={touched.password && errors.password}
                  secureTextEntry
                />

                <Input
                  placeholder="Confirm Password"
                  value={values.confirmPassword}
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  error={touched.confirmPassword && errors.confirmPassword}
                  secureTextEntry
                />

                <Button title="Sign Up" onPress={handleSubmit} />
              </View>
            )}
          </Formik>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.footerLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  formContainer: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
  },
  form: {
    marginBottom: 20,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  footerText: {
    color: "#666",
  },
  footerLink: {
    color: "#7F3DFF",
    fontWeight: "bold",
  },
});

export default Signup;
