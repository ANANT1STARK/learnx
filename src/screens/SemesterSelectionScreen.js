import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Alert,
} from "react-native";

import {
  GraduationCap,
  Check,
  CalendarDays,
  ArrowLeft,
  ArrowRight,
} from "lucide-react-native";

import { useAuth } from "../context/AuthContext";

const COLORS = {
  background: "#F7F8FD",
  primary: "#5B3FE4",
  primaryLight: "#EEEBFF",
  text: "#171725",
  secondary: "#747582",
  border: "#E1E2EA",
  white: "#FFFFFF",
  green: "#079D68",
  disabled: "#B5A6F0",
};

const COURSE_SEMESTERS = {
  bca: 6,
  bba: 6,
  btech: 8,
  bcom: 6,
  ba: 6,
  bsc: 6,
  mca: 4,
  mba: 4,
};

const SEMESTER_DETAILS = [
  "Foundations",
  "Core concepts",
  "Intermediate",
  "Applied learning",
  "Specialisation",
  "Capstone & projects",
  "Advanced specialisation",
  "Final year projects",
];

export default function SemesterSelectionScreen({
  navigation,
  route,
}) {
  const { user, completeOnboarding } = useAuth();

  const [selectedSemester, setSelectedSemester] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const course = route?.params?.course;

  const courseName =
    typeof course === "string"
      ? course
      : course?.name || course?.title || course?.id || "BCA";

  const courseId = courseName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

  const totalSemesters = COURSE_SEMESTERS[courseId] || 6;

  const semesters = Array.from(
    { length: totalSemesters },
    (_, index) => {
      const semesterNumber = index + 1;

      return {
        id: semesterNumber,
        name: `Semester ${semesterNumber}`,
        description:
          SEMESTER_DETAILS[index] || "Academic learning",
        year: Math.ceil(semesterNumber / 2),
      };
    }
  );

  const handleBack = () => {
    navigation.goBack();
  };

  const handleContinue = async () => {
    if (!selectedSemester) {
      Alert.alert(
        "Select Semester",
        "Please select your current semester."
      );
      return;
    }

    try {
      setIsSaving(true);

      await completeOnboarding(
        courseName,
        selectedSemester
      );

      // AppNavigator should automatically show Dashboard
      // after onboarding is completed.
    } catch (error) {
      console.log("Semester selection error:", error);

      Alert.alert(
        "Something went wrong",
        "Your semester could not be saved. Please try again."
      );
    } finally {
      setIsSaving(false);
    }
  };

  const userName =
    user?.name?.split(" ")[0]?.toUpperCase() || "STUDENT";

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        backgroundColor={COLORS.white}
        barStyle="dark-content"
      />

      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.logoIcon}>
              <GraduationCap
                size={27}
                color={COLORS.white}
                strokeWidth={2}
              />
            </View>

            <Text style={styles.logoText}>LearnX</Text>
          </View>

          <View style={styles.headerRight}>
            <View style={styles.completedStep}>
              <Check
                size={25}
                color={COLORS.white}
                strokeWidth={2.5}
              />
            </View>

            <View style={styles.activeStep}>
              <Text style={styles.activeStepText}>2</Text>
            </View>
          </View>
        </View>

        {/* MAIN CONTENT */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* HEADING */}
          <View style={styles.headingContainer}>
            <Text style={styles.greeting}>
              HI {userName}, STEP 2 OF 2
            </Text>

            <Text style={styles.title}>
              Pick your{"\n"}current semester
            </Text>

            <Text style={styles.subtitle}>
              You can change your semester any time
              {"\n"}from your profile.
            </Text>
          </View>

          {/* SEMESTER CARDS */}
          <View style={styles.semesterGrid}>
            {semesters.map((semester) => {
              const isSelected =
                selectedSemester === semester.id;

              return (
                <TouchableOpacity
                  key={semester.id}
                  activeOpacity={0.85}
                  onPress={() =>
                    setSelectedSemester(semester.id)
                  }
                  style={[
                    styles.semesterCard,
                    isSelected && styles.selectedSemesterCard,
                  ]}
                >
                  {/* CARD TOP */}
                  <View style={styles.cardTop}>
                    <View
                      style={[
                        styles.semesterNumber,
                        isSelected &&
                          styles.selectedSemesterNumber,
                      ]}
                    >
                      <Text
                        style={[
                          styles.semesterNumberText,
                          isSelected &&
                            styles.selectedSemesterNumberText,
                        ]}
                      >
                        {semester.id}
                      </Text>
                    </View>

                    {isSelected && (
                      <View style={styles.selectedCheck}>
                        <Check
                          size={19}
                          color={COLORS.primary}
                          strokeWidth={2.8}
                        />
                      </View>
                    )}
                  </View>

                  {/* CARD TEXT */}
                  <Text
                    style={[
                      styles.semesterName,
                      isSelected &&
                        styles.selectedSemesterName,
                    ]}
                  >
                    {semester.name}
                  </Text>

                  <Text style={styles.semesterDescription}>
                    {semester.description}
                  </Text>

                  {/* YEAR */}
                  <View style={styles.yearContainer}>
                    <CalendarDays
                      size={21}
                      color={COLORS.secondary}
                      strokeWidth={1.8}
                    />

                    <Text style={styles.yearText}>
                      Year {semester.year}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        {/* FIXED BOTTOM BUTTONS */}
        <View style={styles.footer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleBack}
            style={styles.backButton}
          >
            <ArrowLeft
              size={23}
              color={COLORS.text}
              strokeWidth={2}
            />

            <Text style={styles.backButtonText}>
              Back
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            disabled={!selectedSemester || isSaving}
            onPress={handleContinue}
            style={[
              styles.continueButton,
              !selectedSemester && styles.disabledButton,
            ]}
          >
            <Text style={styles.continueButtonText}>
              {isSaving
                ? "Saving..."
                : "Go to dashboard"}
            </Text>

            {!isSaving && (
              <ArrowRight
                size={23}
                color={COLORS.white}
                strokeWidth={2}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

/* =========================
   STYLES
========================= */

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  /* HEADER */

  header: {
    height: 104,
    paddingHorizontal: 30,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  logoIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",

    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },

  logoText: {
    fontSize: 38,
    fontWeight: "800",
    color: COLORS.text,
    marginLeft: 18,
    letterSpacing: -1.5,
  },

  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },

  completedStep: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.green,
    alignItems: "center",
    justifyContent: "center",
  },

  activeStep: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  activeStepText: {
    fontSize: 25,
    fontWeight: "800",
    color: COLORS.white,
  },

  /* SCROLL CONTENT */

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 30,
    paddingBottom: 35,
  },

  /* HEADING */

  headingContainer: {
    alignItems: "center",
    paddingTop: 80,
    paddingBottom: 80,
  },

  greeting: {
    fontSize: 27,
    fontWeight: "800",
    color: COLORS.primary,
    letterSpacing: 1,
    textAlign: "center",
    marginBottom: 28,
  },

  title: {
    fontSize: 60,
    fontWeight: "800",
    color: COLORS.text,
    textAlign: "center",
    lineHeight: 70,
    letterSpacing: -2,
  },

  subtitle: {
    fontSize: 30,
    fontWeight: "400",
    color: COLORS.secondary,
    textAlign: "center",
    lineHeight: 46,
    marginTop: 28,
  },

  /* SEMESTER GRID */

  semesterGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  semesterCard: {
    width: "48.5%",
    minHeight: 355,
    backgroundColor: COLORS.white,
    borderRadius: 48,
    borderWidth: 2,
    borderColor: COLORS.border,
    paddingHorizontal: 42,
    paddingTop: 42,
    paddingBottom: 35,
    marginBottom: 28,

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },

  selectedSemesterCard: {
    borderColor: COLORS.primary,
    borderWidth: 3,
    backgroundColor: COLORS.white,

    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },

  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 34,
  },

  semesterNumber: {
    width: 94,
    height: 94,
    borderRadius: 47,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },

  selectedSemesterNumber: {
    backgroundColor: COLORS.primary,
  },

  semesterNumberText: {
    fontSize: 42,
    fontWeight: "800",
    color: "#43339C",
  },

  selectedSemesterNumberText: {
    color: COLORS.white,
  },

  selectedCheck: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 3,
    borderColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  semesterName: {
    fontSize: 35,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 10,
    letterSpacing: -0.8,
  },

  selectedSemesterName: {
    color: COLORS.text,
  },

  semesterDescription: {
    fontSize: 27,
    fontWeight: "400",
    color: COLORS.secondary,
    lineHeight: 36,
    marginBottom: 25,
  },

  yearContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: "auto",
  },

  yearText: {
    fontSize: 25,
    fontWeight: "500",
    color: COLORS.secondary,
  },

  /* FOOTER */

  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
    paddingHorizontal: 30,
    paddingTop: 18,
    paddingBottom: 20,
    backgroundColor: COLORS.background,
  },

  backButton: {
    flex: 1,
    height: 92,
    borderRadius: 38,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
  },

  backButtonText: {
    fontSize: 31,
    fontWeight: "600",
    color: COLORS.text,
  },

  continueButton: {
    flex: 2,
    height: 92,
    borderRadius: 38,
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 14,

    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 5,
  },

  disabledButton: {
    backgroundColor: COLORS.disabled,
    shadowOpacity: 0,
    elevation: 0,
  },

  continueButtonText: {
    fontSize: 30,
    fontWeight: "700",
    color: COLORS.white,
  },
});