import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useNavigation } from "@react-navigation/native";

import { Exercise } from "@/types/types";

export default function Workout() {
  const navigation = useNavigation();

  const { plan } = useLocalSearchParams();
  const parsedPlan = plan ? JSON.parse(Array.isArray(plan) ? plan[0] : plan) : { name: "Unnamed", exercises: [] };

  // Dummy exercise list
  const exercises: Exercise[] = parsedPlan.exercises ?? [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{parsedPlan.name}</Text>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {exercises.map((exercise) => (
          <View key={exercise.id} style={styles.exerciseItem}>
            <Text style={styles.exerciseName}>{exercise.name}</Text>
            <Text style={styles.exerciseDetails}>
              {exercise.sets} sets x {exercise.reps} reps
            </Text>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },
  scrollContent: {
    paddingBottom: 100,
  },
  exerciseItem: {
    backgroundColor: "#f2f2f2",
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: "600",
  },
  exerciseDetails: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  backButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    padding: 16,
    backgroundColor: "#d0d0f0",
    borderRadius: 12,
    alignItems: "center",
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
