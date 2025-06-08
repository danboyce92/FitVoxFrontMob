import React from "react";
import { Button, Modal, Pressable, StyleSheet, Text, View } from "react-native";

import { WorkoutPlan } from "@/types/types";
import { deleteWorkoutPlan } from "@/app/api";

interface CustomModalProps {
  visibility: boolean;
  setVisible: (visible: boolean) => void;
  workout: WorkoutPlan | null;
}

export default function DeleteModal({ visibility, setVisible, workout }: CustomModalProps) {
  return (
    <Modal visible={visibility} transparent={true} animationType="slide" onRequestClose={() => setVisible(false)}>
      <Pressable style={styles.modalOverlay} onPress={() => setVisible(false)}>
        <View style={styles.modalContent}>

          {workout && (
            <>
              <Text>Are you sure you want to delete { workout.name } ?</Text>
              <Pressable style={styles.deleteButton} onPress={() => deleteWorkoutPlan(Number(workout.id))}>
                <Text style={styles.deleteButtonText}>Delete</Text>
              </Pressable>
            </>
          )}
          <Button title="Close" onPress={() => setVisible(false)} />
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
