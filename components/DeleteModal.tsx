import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import CustomButton from "./CustomButton";

import { deleteWorkoutPlan, updateWorkoutPlan } from "@/app/api";
import useAppStore from "@/store/useAppStore";
import { Exercise, WorkoutPlan } from "@/types/types";

interface DeleteModal {
  visibility: boolean;
  setVisible: (visible: boolean) => void;
  item: WorkoutPlan | Exercise | null;
}

const isWorkoutPlan = (w: WorkoutPlan | Exercise | null): w is WorkoutPlan => !!w && "exercises" in w;

export default function DeleteModal({ visibility, setVisible, item }: DeleteModal) {
  const { currentWorkoutPlan, setWorkoutPlan } = useAppStore();
  const handleDelete = async () => {
    if (!item) return;

    try {
      if (isWorkoutPlan(item)) {
        // It's a full workout plan – delete it
        await deleteWorkoutPlan(Number(item.id));
      } else if (currentWorkoutPlan) {
        const updatedExercises = currentWorkoutPlan.exercises.filter((exercise) => exercise.id !== item.id);

        const updatedPlan = {
          ...currentWorkoutPlan,
          exercises: updatedExercises,
        };

        const saved = await updateWorkoutPlan(Number(currentWorkoutPlan.id), updatedPlan);
        setWorkoutPlan(saved);
      }
    } catch (error) {
      console.error("Error handling delete:", error);
    }
    setVisible(false);
  };

  return (
    <Modal visible={visibility} transparent animationType="slide" onRequestClose={() => setVisible(false)}>
      <Pressable style={styles.modalOverlay} onPress={() => setVisible(false)}>
        <View style={styles.modalContent}>
          {item && (
            <>
              <Text style={styles.msg}>
                {isWorkoutPlan(item) ? `Delete entire workout plan “${item.name}”?` : `Delete exercise “${item.name}”?`}
              </Text>
              <CustomButton title="Delete" variant="danger" onPress={handleDelete} />
            </>
          )}
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
    minWidth: 250,
  },
  msg: {
    textAlign: "center",
    marginBottom: 4,
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
});
