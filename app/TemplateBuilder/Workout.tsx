import React, { useRef, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

import { updateWorkoutPlan } from "@/app/api";
import PencilIcon from "@/assets/pencil.svg";
import AddExerciseModal from "@/components/AddExerciseModal";
import DeleteModal from "@/components/DeleteModal";
import useAppStore from "@/store/useAppStore";
import { Exercise } from "@/types/types";

export default function Workout() {
  const router = useRouter();
  const { currentExercise, setExercise, currentWorkoutPlan } = useAppStore();
  const [visibleDel, setVisibleDel] = useState(false);
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [titleEdit, setTitleEdit] = useState(false);
  const [inputPlaceholder, setInputPlaceholder] = useState(currentWorkoutPlan?.name ?? "Unnamed");
  const [inputText, setInputText] = useState("");
  const inputRef = useRef<TextInput>(null);

  const exercises: Exercise[] = currentWorkoutPlan?.exercises ?? [];

  const handleEdit = () => {
    setInputPlaceholder("");
    setTitleEdit((prev) => {
      const next = !prev;

      if (!prev) {
        setTimeout(() => {
          inputRef.current?.focus();
        }, 0);
      }

      return next;
    });

    setInputPlaceholder(() => (titleEdit ? (currentWorkoutPlan?.name ?? "Unnamed") : ""));
  };

  const handleEditSave = (newName: string) => {
    const newPlan = { ...currentWorkoutPlan, name: newName };
    updateWorkoutPlan(Number(currentWorkoutPlan.id), newPlan);
    setInputPlaceholder(newName);
    setTitleEdit(!titleEdit);
  };

  if (!currentWorkoutPlan) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No workout plan selected.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          editable={titleEdit}
          placeholder={inputPlaceholder}
          selectTextOnFocus={titleEdit}
          ref={inputRef}
          value={inputText}
          onChangeText={setInputText}
          multiline={true}
          style={styles.title}
        />
        <Pressable
          onPress={() => {
            handleEdit();
          }}
        >
          {!titleEdit && <PencilIcon width={25} />}
          {titleEdit && (
            <Pressable style={styles.saveButton} onPress={() => handleEditSave(inputText)}>
              <Text style={styles.saveButtonText}>Save</Text>
            </Pressable>
          )}
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View>
          <Pressable
            onPress={() => setVisibleAdd(true)}
            style={({ hovered }) => [styles.exerciseItem, hovered && styles.itemHovered]}
          >
            <Text style={styles.exerciseName}>Add exercise +</Text>
          </Pressable>
        </View>

        {exercises.map((exercise) => (
          <View key={exercise.id} style={styles.exerciseItemRow}>
            <View style={styles.exerciseTextContainer}>
              <Text style={styles.exerciseName}>{exercise.name}</Text>
              <Text style={styles.exerciseDetails}>{exercise.category}</Text>
            </View>
            <Pressable
              onPress={() => {
                setExercise(exercise);
                setVisibleDel(true);
              }}
              style={({ hovered }) => [styles.deleteButton, hovered && styles.deleteButtonHovered]}
            >
              <Text style={styles.deleteButtonText}>X</Text>
            </Pressable>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <AddExerciseModal visibility={visibleAdd} setVisible={setVisibleAdd} currentPlan={currentWorkoutPlan} />
      <DeleteModal visibility={visibleDel} setVisible={setVisibleDel} item={currentExercise} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    padding: 4,
    alignItems: "center",
    flex: 1,
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
  itemHovered: {
    backgroundColor: "#b0e0a0", // lighter green or whatever hover color you want
  },
  exerciseItemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f2f2f2",
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
  },

  exerciseTextContainer: {
    flex: 1,
    paddingRight: 10,
  },

  deleteButton: {
    backgroundColor: "#ffdddd",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },

  deleteButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#b00000",
  },
  deleteButtonHovered: {
    backgroundColor: "#ffbbbb", // brighter red on hover
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 80,
    margin: "auto",
    width: "100%",
    alignSelf: "flex-start",
  },
  saveButton: {
    backgroundColor: "#b0e0a0",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginLeft: 6,
  },
  saveButtonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
