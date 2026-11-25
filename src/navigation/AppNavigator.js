import React from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import {
  NavigationContainer,
} from "@react-navigation/native";

import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import { useAuth } from "../context/AuthContext";

import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import CourseSelectionScreen from "../screens/CourseSelectionScreen";
import SemesterSelectionScreen from "../screens/SemesterSelectionScreen";
import DashboardScreen from "../screens/DashboardScreen";
import AchievementsScreen from "../screens/AchievementsScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#5B3FE4" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
            />

            <Stack.Screen
              name="Signup"
              component={SignupScreen}
            />
          </>
        ) : !user.onboardingCompleted ? (
          <>
            <Stack.Screen
              name="CourseSelection"
              component={CourseSelectionScreen}
            />

            <Stack.Screen
              name="SemesterSelection"
              component={SemesterSelectionScreen}
            />
          </>
        ) : 
       (
         <>
          <Stack.Screen
            name="Dashboard"
            component={DashboardScreen}
          />
          <Stack.Screen
            name="Achievements"
            component={AchievementsScreen}
            />
            </>
        )
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
});