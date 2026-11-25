import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { useAuth } from "../context/AuthContext";

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

const handleLogin = async () => {
  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }

  try {
    await login({
      name: "Student",
      email: email,
    });
  } catch (error) {
    console.log("Login error:", error);
    alert("Something went wrong");
  }
};

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logoIcon}>
            <Text style={styles.logoSymbol}>⌂</Text>
          </View>

          <Text style={styles.logoText}>
            Learn<Text style={styles.logoX}>X</Text>
          </Text>
        </View>

        {/* Heading */}
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>
            Welcome back
          </Text>

          <Text style={styles.subtitle}>
            Log in to continue your learning streak.
          </Text>
        </View>

        {/* Login / Signup tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => navigation.navigate("Signup")}
          >
            <Text style={styles.inactiveTabText}>
              Sign up
            </Text>
          </TouchableOpacity>

          <View style={styles.activeTab}>
            <Text style={styles.activeTabText}>
              Log in
            </Text>
          </View>
        </View>

        {/* Email */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            College email
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>✉</Text>

            <TextInput
              style={styles.input}
              placeholder="you@college.edu"
              placeholderTextColor="#777986"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        {/* Password */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            Password
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>⚿</Text>

            <TextInput
              style={styles.input}
              placeholder="At least 8 characters"
              placeholderTextColor="#777986"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />

            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
            >
              <Text style={styles.eyeIcon}>
                {showPassword ? "◉" : "◎"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Login button */}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleLogin}
          activeOpacity={0.85}
        >
          <Text style={styles.primaryButtonText}>
            Log in →
          </Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.divider} />
        </View>

        {/* Demo button */}
        <TouchableOpacity
          style={styles.demoButton}
          onPress={() =>
            login({
              name: "Vedant",
              email: "demo@learnx.app",
            })
          }
        >
          <Text style={styles.demoButtonText}>
            ✨ Explore with a demo student
          </Text>
        </TouchableOpacity>

        {/* Signup link */}
        <View style={styles.bottomTextContainer}>
          <Text style={styles.bottomText}>
            New to LearnX?{" "}
          </Text>

          <TouchableOpacity
            onPress={() => navigation.navigate("Signup")}
          >
            <Text style={styles.linkText}>
              Create an account
            </Text>
          </TouchableOpacity>
        </View>

        {/* Terms */}
        <Text style={styles.termsText}>
          By continuing you agree to LearnX's Terms and
          Privacy Policy.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FC",
  },

  scrollContent: {
    paddingHorizontal: 28,
    paddingTop: 60,
    paddingBottom: 40,
  },

  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 80,
  },

  logoIcon: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#5B3FE4",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  logoSymbol: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "bold",
  },

  logoText: {
    fontSize: 30,
    fontWeight: "800",
    color: "#171725",
  },

  logoX: {
    color: "#5B3FE4",
  },

  headingContainer: {
    marginBottom: 35,
  },

  heading: {
    fontSize: 36,
    fontWeight: "800",
    color: "#171725",
    marginBottom: 12,
  },

  subtitle: {
    fontSize: 19,
    lineHeight: 30,
    color: "#777986",
  },

  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#F0F0F8",
    borderRadius: 30,
    padding: 5,
    marginBottom: 35,
  },

  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
  },

  activeTab: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },

  activeTabText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#171725",
  },

  inactiveTabText: {
    fontSize: 17,
    color: "#777986",
  },

  inputGroup: {
    marginBottom: 25,
  },

  label: {
    fontSize: 17,
    fontWeight: "600",
    color: "#171725",
    marginBottom: 12,
  },

  inputContainer: {
    height: 68,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "#E0E1E8",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
  },

  inputIcon: {
    fontSize: 22,
    color: "#777986",
    marginRight: 15,
  },

  input: {
    flex: 1,
    fontSize: 17,
    color: "#171725",
  },

  eyeIcon: {
    fontSize: 22,
    color: "#777986",
    paddingLeft: 10,
  },

  primaryButton: {
    height: 68,
    backgroundColor: "#5B3FE4",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    elevation: 5,
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
  },

  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 30,
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#E0E1E8",
  },

  dividerText: {
    color: "#777986",
    fontSize: 16,
    marginHorizontal: 15,
  },

  demoButton: {
    height: 65,
    borderWidth: 1,
    borderColor: "#E0E1E8",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },

  demoButtonText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#171725",
  },

  bottomTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 35,
  },

  bottomText: {
    fontSize: 16,
    color: "#777986",
  },

  linkText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#5B3FE4",
  },

  termsText: {
    fontSize: 14,
    lineHeight: 22,
    color: "#777986",
    textAlign: "center",
    marginTop: 65,
  },
});