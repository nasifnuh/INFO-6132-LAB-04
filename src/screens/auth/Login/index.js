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
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = ({ navigation }) => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values) => {
    try {
      setLoading(true);
      await login(values.email, values.password);
    } catch (error) {
      setLoading(false);
      Alert.alert("Login Failed", error.message);
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
          <Text style={styles.subtitle}>Sign in to your account</Text>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
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

                <Button title="Sign In" onPress={handleSubmit} />
              </View>
            )}
          </Formik>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <Text style={styles.footerLink}>Sign Up</Text>
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

export default Login;
