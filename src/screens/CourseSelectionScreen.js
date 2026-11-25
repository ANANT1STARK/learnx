import React, { useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';

import {
  GraduationCap,
  Code,
  BriefcaseBusiness,
  Cpu,
  Calculator,
  Feather,
  FlaskConical,
  UsersRound,
  ArrowRight,
} from 'lucide-react-native';

const COLORS = {
  background: '#F7F8FD',
  primary: '#5B3FE4',
  text: '#151525',
  secondary: '#747582',
  border: '#E1E2EA',
  white: '#FFFFFF',
  lightPurple: '#F0EDFF',
  disabled: '#B5A6F0',
};

const courses = [
  {
    id: 'bca',
    name: 'BCA',
    fullName: 'Bachelor of Computer Applications',
    description:
      'Programming, databases, networks and software development.',
    students: '12.4k',
    icon: Code,
    color: '#5B3FE4',
    background: '#EEF0FF',
  },
  {
    id: 'bba',
    name: 'BBA',
    fullName: 'Bachelor of Business Administration',
    description:
      'Management, marketing, economics and business strategy.',
    students: '9.8k',
    icon: BriefcaseBusiness,
    color: '#852DE8',
    background: '#F5EEFF',
  },
  {
    id: 'btech',
    name: 'B.Tech',
    fullName: 'Bachelor of Technology',
    description:
      'Engineering maths, physics, electrical and core engineering.',
    students: '18.2k',
    icon: Cpu,
    color: '#1689C9',
    background: '#EAF7FF',
  },
  {
    id: 'bcom',
    name: 'B.Com',
    fullName: 'Bachelor of Commerce',
    description:
      'Accounting, finance, taxation and business studies.',
    students: '15.1k',
    icon: Calculator,
    color: '#07966B',
    background: '#E8FBF4',
  },
  {
    id: 'ba',
    name: 'BA',
    fullName: 'Bachelor of Arts',
    description:
      'Political science, literature, history and social sciences.',
    students: '11.6k',
    icon: Feather,
    color: '#E91E63',
    background: '#FFF0F4',
  },
  {
    id: 'bsc',
    name: 'B.Sc',
    fullName: 'Bachelor of Science',
    description:
      'Physics, chemistry, biology and mathematical sciences.',
    students: '13.9k',
    icon: FlaskConical,
    color: '#D97706',
    background: '#FFF8E6',
  },
];

export default function CourseSelectionScreen({
  userName = 'Vedant',
  onContinue,
  navigation
}) {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleContinue = () => {
    if (!selectedCourse) {
      alert("Please select your course");
      return;
    }

    navigation.navigate("SemesterSelection", {
      course: selectedCourse,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        backgroundColor={COLORS.white}
        barStyle="dark-content"
      />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.brandContainer}>
          <View style={styles.logo}>
            <GraduationCap
              size={30}
              color={COLORS.white}
              strokeWidth={2}
            />
          </View>

          <Text style={styles.brandText}>
            Learn<Text style={styles.brandX}>X</Text>
          </Text>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.activeStep}>
            <Text style={styles.activeStepText}>1</Text>
          </View>

          <View style={styles.inactiveStep}>
            <Text style={styles.inactiveStepText}>2</Text>
          </View>
        </View>
      </View>

      {/* Main content */}
      <View style={styles.content}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Heading */}
          <View style={styles.headingContainer}>
            <Text style={styles.stepLabel}>
              HI {userName.toUpperCase()}, STEP 1 OF 2
            </Text>

            <Text style={styles.heading}>
              Which course are{'\n'}you studying?
            </Text>

            <Text style={styles.subtitle}>
              We'll tailor your subjects, notes and quizzes
              to your degree programme.
            </Text>
          </View>

          {/* Course cards */}
          <View style={styles.courseList}>
            {courses.map((course) => {
              const Icon = course.icon;

              const isSelected =
                selectedCourse?.id === course.id;

              return (
                <TouchableOpacity
                  key={course.id}
                  activeOpacity={0.85}
                  onPress={() => setSelectedCourse(course)}
                  style={[
                    styles.courseCard,
                    isSelected && styles.selectedCard,
                  ]}
                >
                  {/* Course icon */}
                  <View
                    style={[
                      styles.courseIcon,
                      {
                        backgroundColor: course.background,
                        borderColor: isSelected
                          ? course.color
                          : '#E8E8F0',
                      },
                    ]}
                  >
                    <Icon
                      size={34}
                      color={course.color}
                      strokeWidth={2.2}
                    />
                  </View>

                  {/* Course title */}
                  <Text style={styles.courseName}>
                    {course.name}
                  </Text>

                  <Text style={styles.courseFullName}>
                    {course.fullName}
                  </Text>

                  <Text style={styles.courseDescription}>
                    {course.description}
                  </Text>

                  {/* Student count */}
                  <View style={styles.studentBadge}>
                    <UsersRound
                      size={22}
                      color={COLORS.secondary}
                      strokeWidth={1.8}
                    />

                    <Text style={styles.studentText}>
                      {course.students} students
                    </Text>
                  </View>

                  {/* Selection indicator */}
                  {isSelected && (
                    <View
                      style={[
                        styles.selectionIndicator,
                        { backgroundColor: course.color },
                      ]}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        {/* Fixed Continue button */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleContinue}
            disabled={!selectedCourse}
            style={[
              styles.continueButton,
              !selectedCourse && styles.disabledButton,
            ]}
          >
            <Text style={styles.continueText}>
              Continue
            </Text>

            <ArrowRight
              size={25}
              color={COLORS.white}
              strokeWidth={2}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  // Header

  header: {
    height: 100,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logo: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },

  brandText: {
    fontSize: 29,
    fontWeight: '800',
    color: COLORS.text,
    marginLeft: 12,
    letterSpacing: -0.8,
  },

  brandX: {
    color: COLORS.primary,
  },

  // Progress

  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  activeStep: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  activeStepText: {
    color: COLORS.white,
    fontSize: 19,
    fontWeight: '700',
  },

  inactiveStep: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F1F1F7',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inactiveStepText: {
    color: COLORS.secondary,
    fontSize: 19,
    fontWeight: '600',
  },

  // Content

  content: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },

  headingContainer: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 42,
  },

  stepLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
    letterSpacing: 0.6,
    marginBottom: 24,
    textAlign: 'center',
  },

  heading: {
    fontSize: 34,
    lineHeight: 42,
    fontWeight: '800',
    color: COLORS.text,
    textAlign: 'center',
    letterSpacing: -1,
  },

  subtitle: {
    fontSize: 18,
    lineHeight: 28,
    color: COLORS.secondary,
    textAlign: 'center',
    marginTop: 24,
  },

  // Course cards

  courseList: {
    gap: 16,
  },

  courseCard: {
    backgroundColor: COLORS.white,
    borderWidth: 1.2,
    borderColor: COLORS.border,
    borderRadius: 30,
    padding: 24,
    minHeight: 275,
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 4,
  },

  selectedCard: {
    borderColor: COLORS.primary,
    borderWidth: 2,
    backgroundColor: '#FEFDFF',
  },

  courseIcon: {
    width: 58,
    height: 58,
    borderRadius: 29,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  courseName: {
    fontSize: 27,
    fontWeight: '800',
    color: COLORS.text,
    letterSpacing: -0.5,
  },

  courseFullName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#5F606D',
    marginTop: 4,
  },

  courseDescription: {
    fontSize: 17,
    lineHeight: 27,
    color: COLORS.secondary,
    marginTop: 20,
    marginBottom: 20,
  },

  studentBadge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F1F8',
    borderRadius: 25,
    paddingHorizontal: 14,
    paddingVertical: 8,
    gap: 8,
  },

  studentText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#555665',
  },

  selectionIndicator: {
    position: 'absolute',
    top: 24,
    right: 24,
    width: 12,
    height: 12,
    borderRadius: 6,
  },

  // Bottom button

  bottomContainer: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 20,
    alignItems: 'center',
  },

  continueButton: {
    height: 64,
    minWidth: 220,
    paddingHorizontal: 30,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    elevation: 5,
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },

  disabledButton: {
    backgroundColor: COLORS.disabled,
    elevation: 3,
  },

  continueText: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.white,
  },
});