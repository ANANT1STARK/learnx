import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Dimensions,
} from "react-native";

import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Svg, { Circle } from "react-native-svg";

const { width } = Dimensions.get("window");

const COLORS = {
  primary: "#5B3FE4",
  primaryLight: "#EEEAFE",
  background: "#F7F8FE",
  white: "#FFFFFF",
  text: "#171827",
  secondary: "#696B78",
  border: "#E3E4EB",
  green: "#059669",
  blue: "#0284C7",
  teal: "#059669",
  orange: "#D97706",
  red: "#E11D48",
};

const subjects = [
  {
    code: "BCA-101",
    name: "Programming in C",
    completed: 2,
    total: 2,
    progress: 75,
    icon: "code",
    color: COLORS.primary,
    bg: "#F0EEFF",
  },
  {
    code: "BCA-102",
    name: "Computer Fundamentals",
    completed: 0,
    total: 1,
    progress: 0,
    icon: "cpu",
    color: COLORS.blue,
    bg: "#EAF7FF",
  },
  {
    code: "BCA-103",
    name: "Database Management Systems",
    completed: 0,
    total: 1,
    progress: 0,
    icon: "database",
    color: COLORS.green,
    bg: "#E8FBF3",
  },
];

const stats = [
  {
    number: "3",
    title: "Subjects",
    description: "4 topics in total",
    icon: "book-open",
    color: COLORS.primary,
    bg: "#F0EEFF",
  },
  {
    number: "2",
    title: "Notes completed",
    description: "of 4 topics",
    icon: "file-check",
    color: COLORS.green,
    bg: "#E8FBF3",
  },
  {
    number: "1",
    title: "Quizzes attempted",
    description: "Avg. score 83%",
    icon: "clipboard",
    color: COLORS.blue,
    bg: "#EAF7FF",
  },
  {
    number: "1",
    title: "Medals earned",
    description: "0 gold · 1 silver · 0 bronze",
    icon: "award",
    color: COLORS.orange,
    bg: "#FFF8E6",
  },
];

function Header() {
  return (
    <View style={styles.header}>
      <View style={styles.brandContainer}>
        <View style={styles.logo}>
          <Ionicons name="school-outline" size={29} color="#FFFFFF" />
        </View>

        <Text style={styles.brandText}>
          Learn<Text style={styles.brandX}>X</Text>
        </Text>
      </View>

      <View style={styles.headerRight}>
        <TouchableOpacity style={styles.semesterBadge}>
          <Text style={styles.semesterText}>BCA · S1</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.avatar}>
          <Text style={styles.avatarText}>VP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function WelcomeCard({ onQuizPress }) {
  return (
    <View style={styles.welcomeCard}>
      <Text style={styles.welcomeCourse}>BCA · Semester 1</Text>

      <Text style={styles.welcomeTitle}>
        Good evening,{"\n"}Vedant!
      </Text>

      <Text style={styles.welcomeDescription}>
        You've completed 2 of 4 topic notes. Pick up where you left off and
        earn your next medal.
      </Text>

      <TouchableOpacity
        style={styles.quizRecommendation}
        activeOpacity={0.85}
        onPress={onQuizPress}
      >
        <View style={styles.quizIcon}>
          <Feather name="code" size={31} color={COLORS.primary} />
        </View>

        <View style={styles.quizTextContainer}>
          <Text style={styles.quizLabel}>TAKE THE QUIZ</Text>
          <Text style={styles.quizTitle} numberOfLines={1}>
            Control Statements
          </Text>
        </View>

        <Feather name="arrow-right" size={27} color={COLORS.secondary} />
      </TouchableOpacity>
    </View>
  );
}

function StatCard({ item }) {
  return (
    <View style={styles.statCard}>
      <View style={[styles.statIcon, { backgroundColor: item.bg }]}>
        <Feather name={item.icon} size={27} color={item.color} />
      </View>

      <Text style={styles.statNumber}>{item.number}</Text>

      <Text style={styles.statTitle}>{item.title}</Text>

      <Text style={styles.statDescription}>{item.description}</Text>
    </View>
  );
}

function ProgressRing({ progress }) {
  const size = 170;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress / 100);

  return (
    <View style={styles.progressRingContainer}>
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#F0F0F6"
          strokeWidth={strokeWidth}
          fill="none"
        />

        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={COLORS.primary}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>

      <View style={styles.progressRingCenter}>
        <Text style={styles.progressPercentage}>{progress}%</Text>
        <Text style={styles.progressOverall}>overall</Text>
      </View>
    </View>
  );
}

function SubjectProgress({ subject }) {
  return (
    <View style={styles.subjectProgressRow}>
      <View style={[styles.subjectSmallIcon, { backgroundColor: subject.bg }]}>
        <Feather name={subject.icon} size={21} color={subject.color} />
      </View>

      <View style={styles.subjectProgressContent}>
        <View style={styles.subjectProgressHeader}>
          <Text style={styles.subjectProgressName} numberOfLines={1}>
            {subject.name}
          </Text>

          <Text style={styles.subjectProgressPercent}>
            {subject.progress}%
          </Text>
        </View>

        <View style={styles.progressBarBackground}>
          <View
            style={[
              styles.progressBarFill,
              {
                width: `${subject.progress}%`,
                backgroundColor: COLORS.primary,
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
}

function LearningProgress() {
  return (
    <View style={styles.progressCard}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Learning progress</Text>

        <TouchableOpacity>
          <Text style={styles.sectionAction}>View subjects</Text>
        </TouchableOpacity>
      </View>

      <ProgressRing progress={38} />

      <View style={styles.subjectProgressList}>
        {subjects.map((subject) => (
          <SubjectProgress key={subject.code} subject={subject} />
        ))}
      </View>
    </View>
  );
}

function RecentQuizzes() {
  return (
    <View style={styles.sectionCard}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent quizzes</Text>

        <TouchableOpacity>
          <Text style={styles.sectionAction}>Medals</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.recentQuizRow} activeOpacity={0.8}>
        <View style={styles.quizSubjectIcon}>
          <Feather name="code" size={23} color={COLORS.primary} />
        </View>

        <View style={styles.recentQuizInfo}>
          <Text style={styles.recentQuizName}>
            Introduction to C & Data Types
          </Text>
          <Text style={styles.recentQuizSubject}>Programming in C</Text>
        </View>

        <View style={styles.quizScore}>
          <View style={styles.silverMedal}>
            <MaterialCommunityIcons
              name="medal-outline"
              size={23}
              color="#64748B"
            />
          </View>

          <Text style={styles.quizScoreText}>10/12</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.medalSummary}>
        <MedalItem count="0" title="Gold" color="#D4A017" />
        <MedalItem count="1" title="Silver" color="#64748B" />
        <MedalItem count="0" title="Bronze" color="#B77945" />
      </View>
    </View>
  );
}

function MedalItem({ count, title, color }) {
  return (
    <View style={styles.medalItem}>
      <View style={styles.medalIconContainer}>
        <MaterialCommunityIcons
          name="medal-outline"
          size={24}
          color={color}
        />
      </View>

      <Text style={styles.medalCount}>{count}</Text>
      <Text style={styles.medalTitle}>{title}</Text>
    </View>
  );
}

function SubjectCard({ subject }) {
  return (
    <TouchableOpacity style={styles.subjectCard} activeOpacity={0.8}>
      <View style={[styles.subjectIcon, { backgroundColor: subject.bg }]}>
        <Feather name={subject.icon} size={28} color={subject.color} />
      </View>

      <Text style={styles.subjectCode}>{subject.code}</Text>

      <Text style={styles.subjectName}>{subject.name}</Text>

      <Text style={styles.subjectCompletion}>
        {subject.completed}/{subject.total} notes completed
      </Text>
    </TouchableOpacity>
  );
}

function YourSubjects() {
  return (
    <View style={styles.yourSubjectsSection}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Your subjects</Text>

        <TouchableOpacity>
          <Text style={styles.sectionAction}>
            See all <Feather name="arrow-right" size={16} />
          </Text>
        </TouchableOpacity>
      </View>

      {subjects.map((subject) => (
        <SubjectCard key={subject.code} subject={subject} />
      ))}
    </View>
  );
}

function BottomNavigation({ activeTab, navigation }) {
  const tabs = [
    { label: "Dashboard", icon: "grid" },
    { label: "Subjects", icon: "book-open" },
    { label: "Achievements", icon: "award" },
    { label: "Profile", icon: "user" },
  ];

  const screenNames = {
    Dashboard: "Dashboard",
    Subjects: "Subjects",
    Achievements: "Achievements",
    Profile: "Profile",
  };

  return (
    <View style={styles.bottomNavigation}>
      {tabs.map((tab) => {
        const active = activeTab === tab.label;

        return (
          <TouchableOpacity
            key={tab.label}
            style={styles.bottomTab}
            onPress={() =>
              navigation.navigate(screenNames[tab.label])
            }
            activeOpacity={0.75}
          >
            <View
              style={[
                styles.bottomTabIcon,
                active && styles.bottomTabIconActive,
              ]}
            >
              <Feather
                name={tab.icon}
                size={25}
                color={
                  active
                    ? COLORS.primary
                    : COLORS.secondary
                }
              />
            </View>

            <Text
              style={[
                styles.bottomTabLabel,
                active && styles.bottomTabLabelActive,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
export default function DashboardScreen({navigation}) {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const handleQuizPress = () => {
    console.log("Quiz pressed");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.white}
      />

      <Header />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <WelcomeCard onQuizPress={handleQuizPress} />

        <View style={styles.statsGrid}>
          {stats.map((item, index) => (
            <StatCard key={index} item={item} />
          ))}
        </View>

        <LearningProgress />

        <RecentQuizzes />

        <YourSubjects />
      </ScrollView>

    <BottomNavigation
    activeTab="Dashboard"
    navigation={navigation}
    />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  header: {
    height: 76,
    backgroundColor: COLORS.white,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  brandContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  logo: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
    elevation: 3,
  },

  brandText: {
    fontSize: 28,
    fontWeight: "800",
    color: COLORS.text,
    letterSpacing: -1,
  },

  brandX: {
    color: COLORS.primary,
  },

  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  semesterBadge: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 25,
  },

  semesterText: {
    color: "#43339B",
    fontSize: 15,
    fontWeight: "700",
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "700",
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 35,
  },

  welcomeCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 34,
    padding: 25,
    marginBottom: 26,
    elevation: 8,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 14,
  },

  welcomeCourse: {
    fontSize: 16,
    color: "#E7E1FF",
    marginBottom: 13,
  },

  welcomeTitle: {
    fontSize: 36,
    lineHeight: 43,
    fontWeight: "800",
    color: COLORS.white,
    letterSpacing: -1.2,
    marginBottom: 18,
  },

  welcomeDescription: {
    fontSize: 17,
    lineHeight: 27,
    color: "#E8E4FF",
    marginBottom: 25,
  },

  quizRecommendation: {
    backgroundColor: COLORS.white,
    borderRadius: 27,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    minHeight: 112,
  },

  quizIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },

  quizTextContainer: {
    flex: 1,
  },

  quizLabel: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: "800",
    marginBottom: 5,
  },

  quizTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: COLORS.text,
  },

  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 26,
  },

  statCard: {
    width: "48%",
    backgroundColor: COLORS.white,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 22,
    marginBottom: 18,
    minHeight: 210,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
  },

  statIcon: {
    width: 62,
    height: 62,
    borderRadius: 31,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },

  statNumber: {
    fontSize: 31,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 4,
  },

  statTitle: {
    fontSize: 17,
    color: COLORS.secondary,
    lineHeight: 24,
    marginBottom: 5,
  },

  statDescription: {
    fontSize: 14,
    lineHeight: 21,
    color: COLORS.secondary,
  },

  progressCard: {
    backgroundColor: COLORS.white,
    borderRadius: 32,
    padding: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 26,
    elevation: 2,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 21,
    fontWeight: "800",
    color: COLORS.text,
    letterSpacing: -0.4,
  },

  sectionAction: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.primary,
  },

  progressRingContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 14,
  },

  progressRingCenter: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },

  progressPercentage: {
    fontSize: 42,
    fontWeight: "800",
    color: COLORS.text,
  },

  progressOverall: {
    fontSize: 14,
    color: COLORS.secondary,
    fontWeight: "500",
  },

  subjectProgressList: {
    marginTop: 22,
  },

  subjectProgressRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  subjectSmallIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  subjectProgressContent: {
    flex: 1,
  },

  subjectProgressHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  subjectProgressName: {
    flex: 1,
    fontSize: 15,
    color: COLORS.text,
    fontWeight: "500",
    marginRight: 8,
  },

  subjectProgressPercent: {
    fontSize: 15,
    color: COLORS.secondary,
    fontWeight: "600",
  },

  progressBarBackground: {
    height: 9,
    backgroundColor: "#F0F0F6",
    borderRadius: 10,
    overflow: "hidden",
  },

  progressBarFill: {
    height: "100%",
    borderRadius: 10,
  },

  sectionCard: {
    backgroundColor: COLORS.white,
    borderRadius: 32,
    padding: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 30,
    elevation: 2,
  },

  recentQuizRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 26,
  },

  quizSubjectIcon: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
  },

  recentQuizInfo: {
    flex: 1,
  },

  recentQuizName: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 5,
  },

  recentQuizSubject: {
    fontSize: 14,
    color: COLORS.secondary,
  },

  quizScore: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  silverMedal: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#EAF0F7",
    alignItems: "center",
    justifyContent: "center",
  },

  quizScoreText: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.text,
  },

  medalSummary: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#F8F8FB",
    borderRadius: 27,
    paddingVertical: 20,
  },

  medalItem: {
    alignItems: "center",
    flex: 1,
  },

  medalIconContainer: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#F1F1F7",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  medalCount: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 7,
  },

  medalTitle: {
    fontSize: 14,
    color: COLORS.secondary,
  },

  yourSubjectsSection: {
    marginBottom: 10,
  },

  subjectCard: {
    backgroundColor: COLORS.white,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 24,
    marginBottom: 20,
    minHeight: 240,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
  },

  subjectIcon: {
    width: 65,
    height: 65,
    borderRadius: 33,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
  },

  subjectCode: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.secondary,
    marginBottom: 4,
  },

  subjectName: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 22,
  },

  subjectCompletion: {
    fontSize: 16,
    color: COLORS.secondary,
  },

  bottomNavigation: {
    height: 82,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 8,
  },

  bottomTab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  bottomTabIcon: {
    width: 56,
    height: 35,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
  },

  bottomTabIconActive: {
    backgroundColor: COLORS.primaryLight,
  },

  bottomTabLabel: {
    fontSize: 12,
    color: COLORS.secondary,
    fontWeight: "500",
  },

  bottomTabLabelActive: {
    color: COLORS.primary,
    fontWeight: "700",
  },
});