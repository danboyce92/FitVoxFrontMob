import React, { useEffect } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { getExercises, updateWorkoutPlan } from "@/app/api";
import useAppStore from "@/store/useAppStore";
import { Exercise, WorkoutPlan } from "@/types/types";
import CustomButton from "./CustomButton";

interface CustomModalProps {
  visibility: boolean;
  setVisible: (visible: boolean) => void;
  currentPlan: WorkoutPlan;
}

export default function AddExerciseModal({ visibility, setVisible, currentPlan }: CustomModalProps) {
  const { setExercises, exercises, setExercise, setWorkoutPlan } = useAppStore();

  const handleUpdatePlan = async (exercise: Exercise) => {
    try {
      const updatedPlan: WorkoutPlan = {
        ...currentPlan,
        exercises: [...currentPlan.exercises, exercise],
      };

      const saved = await updateWorkoutPlan(Number(currentPlan.id), updatedPlan);

      setWorkoutPlan(saved);

      setVisible(false);
    } catch (error) {
      console.error("Failed to update workout plan:", error);
    }
  };

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const exercisesResponse = await getExercises();
        setExercises(exercisesResponse);
      } catch (error) {
        console.error("Failed to retrieve exercises:", error);
      }
    };
    fetchExercises();
  }, []);

  return (
    <Modal visible={visibility} transparent={true} animationType="slide" onRequestClose={() => setVisible(false)}>
      <Pressable style={styles.modalOverlay} onPress={() => setVisible(false)}>
        <View style={styles.modalContent}>
          <ScrollView contentContainerStyle={styles.cardContainer}>
            {exercises.map((exercise) => (
              <Pressable
                onPress={() => {
                  setExercise(exercise);
                  handleUpdatePlan(exercise);
                }}
                key={exercise.id}
                style={styles.card}
              >
                <Text style={styles.cardTitle}>{exercise.name}</Text>
                <Text style={styles.cardCategory}>{exercise.category}</Text>
              </Pressable>
            ))}
          </ScrollView>

          <CustomButton title="Close" onPress={() => setVisible(false)} />
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    minWidth: 300,
    maxHeight: "80%", // prevent full screen
  },
  deleteButton: {
    backgroundColor: "rgb(245, 11, 11)",
    color: "rgb(255, 255, 255)",
    paddingVertical: 6,

    alignItems: "center",
    marginVertical: 6,
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },

  card: {
    backgroundColor: "#f5f5f5",
    width: "48%", // 2 cards per row
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },

  cardCategory: {
    fontSize: 14,
    color: "#777",
  },

  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
