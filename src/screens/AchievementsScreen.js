import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";

import {
  GraduationCap,
  Trophy,
  Medal,
  Award,
  ClipboardCheck,
  Percent,
  FileCheck,
  Code2,
  Cpu,
  Database,
  LayoutGrid,
  BookOpen,
  UserRound,
  LockKeyhole,
  Check,
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

  gold: "#E8B600",
  goldBg: "#FFFBE5",
  goldBorder: "#F5E69B",

  silver: "#94A3B8",
  silverBg: "#F0F5F9",
  silverBorder: "#DCE4EB",

  bronze: "#D97706",
  bronzeBg: "#FFF3E7",
  bronzeBorder: "#F6D7B5",

  green: "#079D68",
  blue: "#0284C7",
};

const SUBJECTS = [
  {
    id: "programming",
    name: "Programming in C",
    icon: Code2,
    color: "#5B3FE4",
    background: "#EEEBFF",
    topics: [
      {
        id: 1,
        name: "Introduction to C & Data Types",
        score: 10,
        total: 12,
        medal: "silver",
      },
      {
        id: 2,
        name: "Control Statements & Loops",
        score: null,
        total: 12,
        medal: null,
      },
    ],
  },
  {
    id: "computer",
    name: "Computer Fundamentals",
    icon: Cpu,
    color: "#0284C7",
    background: "#EAF7FF",
    topics: [
      {
        id: 3,
        name: "Number Systems & Conversions",
        score: null,
        total: 12,
        medal: null,
      },
    ],
  },
  {
    id: "database",
    name: "Database Management Systems",
    icon: Database,
    color: "#059669",
    background: "#E7FAF3",
    topics: [
      {
        id: 4,
        name: "Introduction to DBMS",
        score: null,
        total: 12,
        medal: null,
      },
    ],
  },
];

const MEDAL_DETAILS = [
  {
    id: "gold",
    name: "Gold medals",
    requirement: "12 / 12 correct",
    color: COLORS.gold,
    background: COLORS.goldBg,
    border: COLORS.goldBorder,
    count: 0,
  },
  {
    id: "silver",
    name: "Silver medals",
    requirement: "8–11 correct",
    color: COLORS.silver,
    background: COLORS.silverBg,
    border: COLORS.silverBorder,
    count: 1,
  },
  {
    id: "bronze",
    name: "Bronze medals",
    requirement: "5–7 correct",
    color: COLORS.bronze,
    background: COLORS.bronzeBg,
    border: COLORS.bronzeBorder,
    count: 0,
  },
];

export default function AchievementsScreen({ navigation }) {
  const { user } = useAuth();

  const userName = user?.name || "Vedant";

  const initials = userName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const courseName = user?.course || "BCA";
  const semester = user?.semester || 1;

  const totalMedals = MEDAL_DETAILS.reduce(
    (total, medal) => total + medal.count,
    0
  );

  const quizzesAttempted = 1;
  const averageScore = 83;
  const notesCompleted = "2/4";

  const handleNavigation = (screen) => {
    if (screen === "Achievements") return;

    navigation.navigate(screen);
  };

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
            <View style={styles.courseBadge}>
              <Text style={styles.courseBadgeText}>
                {courseName} · S{semester}
              </Text>
            </View>

            <View style={styles.profileAvatar}>
              <Text style={styles.profileAvatarText}>
                {initials}
              </Text>
            </View>
          </View>
        </View>

        {/* MAIN CONTENT */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* PAGE TITLE */}
          <View style={styles.pageHeading}>
            <Text style={styles.pageTitle}>
              Achievements
            </Text>

            <Text style={styles.pageSubtitle}>
              Every quiz you ace adds a medal to
              {"\n"}your collection.
            </Text>
          </View>

          {/* MEDAL SUMMARY */}
          <View style={styles.medalSummary}>
            {MEDAL_DETAILS.map((medal) => (
              <View
                key={medal.id}
                style={[
                  styles.medalSummaryCard,
                  {
                    backgroundColor: medal.background,
                    borderColor: medal.border,
                  },
                ]}
              >
                <View style={styles.medalSummaryIcon}>
                  <Medal
                    size={54}
                    color={medal.id === "silver"
                      ? "#26374D"
                      : "#858593"}
                    strokeWidth={2.2}
                  />
                </View>

                <View style={styles.medalSummaryInfo}>
                  <Text style={styles.medalCount}>
                    {medal.count}
                  </Text>

                  <Text style={styles.medalSummaryName}>
                    {medal.name}
                  </Text>

                  <Text style={styles.medalRequirement}>
                    {medal.requirement}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {/* STATISTICS */}
          <View style={styles.statsGrid}>
            <StatCard
              icon={Award}
              iconColor="#D97706"
              iconBackground="#FFFBE5"
              value={totalMedals}
              label="Total medals"
            />

            <StatCard
              icon={ClipboardCheck}
              iconColor="#0284C7"
              iconBackground="#EAF7FF"
              value={quizzesAttempted}
              label="Quizzes attempted"
            />

            <StatCard
              icon={Percent}
              iconColor={COLORS.primary}
              iconBackground="#F1EDFF"
              value={`${averageScore}%`}
              label="Average score"
            />

            <StatCard
              icon={FileCheck}
              iconColor="#059669"
              iconBackground="#E7FAF3"
              value={notesCompleted}
              label="Notes completed"
            />
          </View>

          {/* MEDAL COLLECTION */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>
              Medal collection
            </Text>

            <Text style={styles.sectionSubtitle}>
              One medal slot for every topic in your
              course.
            </Text>

            {SUBJECTS.map((subject) => {
              const SubjectIcon = subject.icon;

              return (
                <View
                  key={subject.id}
                  style={styles.subjectSection}
                >
                  {/* SUBJECT HEADER */}
                  <View style={styles.subjectHeader}>
                    <View
                      style={[
                        styles.subjectIcon,
                        {
                          backgroundColor: subject.background,
                        },
                      ]}
                    >
                      <SubjectIcon
                        size={25}
                        color={subject.color}
                        strokeWidth={2}
                      />
                    </View>

                    <Text style={styles.subjectName}>
                      {subject.name}
                    </Text>
                  </View>

                  {/* TOPIC CARDS */}
                  <View style={styles.topicGrid}>
                    {subject.topics.map((topic) => {
                      const isUnlocked = topic.score !== null;

                      return (
                        <TouchableOpacity
                          key={topic.id}
                          activeOpacity={0.8}
                          style={[
                            styles.topicCard,
                            !isUnlocked &&
                              styles.lockedTopicCard,
                          ]}
                        >
                          <View
                            style={[
                              styles.topicMedal,
                              isUnlocked &&
                                styles.earnedTopicMedal,
                            ]}
                          >
                            <Medal
                              size={34}
                              color={
                                isUnlocked
                                  ? "#26374D"
                                  : "#A0A0AD"
                              }
                              strokeWidth={2}
                            />
                          </View>

                          <Text style={styles.topicName}>
                            {topic.name}
                          </Text>

                          <Text style={styles.topicStatus}>
                            {isUnlocked
                              ? `${topic.score}/${topic.total} · ${topic.medal}`
                              : "Locked"}
                          </Text>

                          {!isUnlocked && (
                            <LockKeyhole
                              size={16}
                              color="#A0A0AD"
                              style={styles.lockIcon}
                            />
                          )}
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              );
            })}
          </View>

          {/* HOW MEDALS WORK */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>
              How medals work
            </Text>

            <View style={styles.medalRules}>
              <MedalRule
                name="Gold"
                requirement="12/12 correct"
                color="#F4B900"
                background="#FFF1A8"
              />

              <MedalRule
                name="Silver"
                requirement="8–11 correct"
                color="#64748B"
                background="#DCE5F0"
              />

              <MedalRule
                name="Bronze"
                requirement="5–7 correct"
                color="#D97706"
                background="#FED7AA"
              />

              <MedalRule
                name="No medal"
                requirement="Below 5 correct"
                color="#A0A0AD"
                background="#F0F0F5"
              />
            </View>
          </View>
        </ScrollView>

        {/* BOTTOM NAVIGATION */}
        <View style={styles.bottomNavigation}>
          <BottomNavItem
            icon={LayoutGrid}
            label="Dashboard"
            active={false}
            onPress={() => handleNavigation("Dashboard")}
          />

          <BottomNavItem
            icon={BookOpen}
            label="Subjects"
            active={false}
            onPress={() => handleNavigation("Subjects")}
          />

          <BottomNavItem
            icon={Trophy}
            label="Achievements"
            active={true}
            onPress={() => handleNavigation("Achievements")}
          />

          <BottomNavItem
            icon={UserRound}
            label="Profile"
            active={false}
            onPress={() => handleNavigation("Profile")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

/* =========================
   STAT CARD
========================= */

function StatCard({
  icon: Icon,
  iconColor,
  iconBackground,
  value,
  label,
}) {
  return (
    <View style={styles.statCard}>
      <View
        style={[
          styles.statIcon,
          { backgroundColor: iconBackground },
        ]}
      >
        <Icon
          size={30}
          color={iconColor}
          strokeWidth={2}
        />
      </View>

      <Text style={styles.statValue}>
        {value}
      </Text>

      <Text style={styles.statLabel}>
        {label}
      </Text>
    </View>
  );
}

/* =========================
   MEDAL RULE
========================= */

function MedalRule({
  name,
  requirement,
  color,
  background,
}) {
  return (
    <View style={styles.medalRule}>
      <View
        style={[
          styles.medalRuleIcon,
          { backgroundColor: background },
        ]}
      >
        <Medal
          size={30}
          color={color}
          strokeWidth={2}
        />
      </View>

      <View style={styles.medalRuleInfo}>
        <Text style={styles.medalRuleName}>
          {name}
        </Text>

        <Text style={styles.medalRuleRequirement}>
          {requirement}
        </Text>
      </View>
    </View>
  );
}

/* =========================
   BOTTOM NAV ITEM
========================= */

function BottomNavItem({
  icon: Icon,
  label,
  active,
  onPress,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.bottomNavItem}
    >
      <View
        style={[
          styles.bottomNavIconContainer,
          active && styles.activeBottomNavIcon,
        ]}
      >
        <Icon
          size={28}
          color={active ? COLORS.primary : COLORS.secondary}
          strokeWidth={active ? 2.5 : 1.8}
        />
      </View>

      <Text
        style={[
          styles.bottomNavLabel,
          active && styles.activeBottomNavLabel,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
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

  courseBadge: {
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 25,
    backgroundColor: COLORS.primaryLight,
  },

  courseBadgeText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#43339C",
  },

  profileAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  profileAvatarText: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.white,
  },

  /* SCROLL */

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 30,
    paddingBottom: 40,
  },

  /* PAGE HEADING */

  pageHeading: {
    paddingTop: 50,
    marginBottom: 80,
  },

  pageTitle: {
    fontSize: 48,
    fontWeight: "800",
    color: COLORS.text,
    letterSpacing: -1.5,
  },

  pageSubtitle: {
    fontSize: 30,
    lineHeight: 46,
    color: COLORS.secondary,
    marginTop: 12,
  },

  /* MEDAL SUMMARY */

  medalSummary: {
    gap: 28,
    marginBottom: 40,
  },

  medalSummaryCard: {
    minHeight: 255,
    borderWidth: 2,
    borderRadius: 48,
    padding: 35,
    flexDirection: "row",
    alignItems: "center",
  },

  medalSummaryIcon: {
    width: 175,
    height: 175,
    borderRadius: 88,
    backgroundColor: "#F1F0FA",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 30,
  },

  medalSummaryInfo: {
    flex: 1,
  },

  medalCount: {
    fontSize: 76,
    fontWeight: "800",
    color: COLORS.text,
    lineHeight: 85,
  },

  medalSummaryName: {
    fontSize: 30,
    fontWeight: "800",
    color: COLORS.text,
    marginTop: 2,
  },

  medalRequirement: {
    fontSize: 22,
    color: COLORS.secondary,
    marginTop: 8,
  },

  /* STATISTICS */

  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 40,
  },

  statCard: {
    width: "48.5%",
    minHeight: 300,
    backgroundColor: COLORS.white,
    borderRadius: 42,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    padding: 38,
    marginBottom: 28,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  statIcon: {
    width: 86,
    height: 86,
    borderRadius: 43,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
  },

  statValue: {
    fontSize: 48,
    fontWeight: "800",
    color: COLORS.text,
  },

  statLabel: {
    fontSize: 27,
    lineHeight: 38,
    color: COLORS.secondary,
    marginTop: 8,
  },

  /* SECTION CARD */

  sectionCard: {
    backgroundColor: COLORS.white,
    borderRadius: 48,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    padding: 40,
    marginBottom: 40,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  sectionTitle: {
    fontSize: 34,
    fontWeight: "800",
    color: COLORS.text,
  },

  sectionSubtitle: {
    fontSize: 27,
    lineHeight: 40,
    color: COLORS.secondary,
    marginTop: 10,
    marginBottom: 40,
  },

  /* SUBJECTS */

  subjectSection: {
    marginBottom: 50,
  },

  subjectHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 28,
  },

  subjectIcon: {
    width: 74,
    height: 74,
    borderRadius: 37,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 24,
  },

  subjectName: {
    flex: 1,
    fontSize: 29,
    fontWeight: "800",
    color: COLORS.text,
  },

  topicGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  topicCard: {
    width: "48.5%",
    minHeight: 330,
    borderRadius: 40,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    padding: 25,
    alignItems: "center",
    marginBottom: 25,
  },

  lockedTopicCard: {
    backgroundColor: "#FAFAFC",
    borderStyle: "dashed",
    borderColor: "#E2E2E9",
  },

  topicMedal: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#F1F0FA",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 28,
  },

  earnedTopicMedal: {
    backgroundColor: "#DCE5F0",
    borderWidth: 5,
    borderColor: "#EDF2F8",
  },

  topicName: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.text,
    textAlign: "center",
    lineHeight: 32,
    marginBottom: 22,
  },

  topicStatus: {
    fontSize: 22,
    color: COLORS.secondary,
    textAlign: "center",
    textTransform: "capitalize",
  },

  lockIcon: {
    marginTop: 12,
  },

  /* MEDAL RULES */

  medalRules: {
    marginTop: 35,
    gap: 25,
  },

  medalRule: {
    minHeight: 140,
    borderRadius: 35,
    backgroundColor: "#F7F7FA",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingVertical: 20,
  },

  medalRuleIcon: {
    width: 85,
    height: 85,
    borderRadius: 43,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 25,
  },

  medalRuleInfo: {
    flex: 1,
  },

  medalRuleName: {
    fontSize: 30,
    fontWeight: "800",
    color: COLORS.text,
  },

  medalRuleRequirement: {
    fontSize: 22,
    color: COLORS.secondary,
    marginTop: 6,
  },

  /* BOTTOM NAVIGATION */

  bottomNavigation: {
    height: 140,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 10,
  },

  bottomNavItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  bottomNavIconContainer: {
    width: 100,
    height: 58,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  activeBottomNavIcon: {
    backgroundColor: COLORS.primaryLight,
  },

  bottomNavLabel: {
    fontSize: 20,
    color: COLORS.secondary,
    marginTop: 8,
    textAlign: "center",
  },

  activeBottomNavLabel: {
    color: COLORS.primary,
    fontWeight: "700",
  },
});