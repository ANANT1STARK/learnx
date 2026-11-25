import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

const STORAGE_KEY = "learnx_user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const savedUser = await AsyncStorage.getItem(STORAGE_KEY);

        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.log("Error loading user:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const signup = async (userData) => {
    const newUser = {
      ...userData,
      onboardingCompleted: false,
      course: null,
      semester: null,
    };

    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(newUser)
    );

    setUser(newUser);
  };

  const login = async (userData) => {
    const savedUser = await AsyncStorage.getItem(STORAGE_KEY);

    if (savedUser) {
      const existingUser = JSON.parse(savedUser);

      if (
        existingUser.email?.toLowerCase() ===
        userData.email?.toLowerCase()
      ) {
        setUser(existingUser);
        return;
      }
    }

    // Demo login: a new user needs to complete onboarding.
    const newUser = {
      ...userData,
      onboardingCompleted: false,
      course: null,
      semester: null,
    };

    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(newUser)
    );

    setUser(newUser);
  };

  const completeOnboarding = async (course, semester) => {
    const updatedUser = {
      ...user,
      course,
      semester,
      onboardingCompleted: true,
    };

    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedUser)
    );

    setUser(updatedUser);
  };

  const logout = async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signup,
        login,
        completeOnboarding,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}