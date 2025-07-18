import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import SessionCard from "./SessionCard";

import { createWorkoutRecord, getAllWorkoutRecords } from "@/app/api";
import CustomButton from "@/components/CustomButton";
import useAppStore from "@/store/useAppStore";
import { CardioExerciseRecord, Exercise, ExerciseRecord, ResistanceExerciseRecord, WorkoutRecord } from "@/types/types";

export default function Session() {
  const [recordID, setRecordID] = useState(0);
  const [workoutData, setWorkoutData] = useState<WorkoutRecord | null>(null);
  const [exerciseRecords, setExerciseRecords] = useState<ExerciseRecord[]>([]);
  const { currentWorkoutPlan, setCurrentWorkoutRecord } = useAppStore();

  const exerciseTypeCheck = (exercise: Exercise) => {
    if (exercise.type === "resistance") {
      return {
        id: exercise.id,
        name: exercise.name,
        type: "resistance",
        sets: [],
      } satisfies ResistanceExerciseRecord;
    } else {
      return {
        id: exercise.id,
        name: exercise.name,
        type: "cardio",
        specific: {
          customName: exercise.name,
          metrics: {},
        },
      } satisfies CardioExerciseRecord;
    }
  };

  const handleSetUpWorkoutData = async () => {
    try {
      const records = await getAllWorkoutRecords();
      const newRecordID = records.length;

      const initialRecords: ExerciseRecord[] = currentWorkoutPlan.exercises.map((exercise) => {
        return exerciseTypeCheck(exercise);
      });

      setExerciseRecords(initialRecords);

      const newWorkoutData: WorkoutRecord = {
        id: newRecordID.toString(),
        name: `${currentWorkoutPlan.name} ${newRecordID}`,
        date: new Date(),
        duration: 0,
        exerciseRecords: initialRecords,
      };

      setWorkoutData(newWorkoutData);
      setCurrentWorkoutRecord(newWorkoutData);
      setRecordID(newRecordID);
    } catch (error) {
      console.error("Error fetching workout records:", error);
      throw error;
    }
  };

  const updateExerciseSet = (exerciseId: string, setNumber: number, reps: number, weight: number) => {
    setExerciseRecords((prevRecords) =>
      prevRecords.map((record) => {
        if (record.id === exerciseId && record.type === "resistance") {
          const newSets = [...record.sets];
          newSets[setNumber - 1] = { setNumber, reps, weight };

          return { ...record, sets: newSets };
        }

        return record;
      })
    );
  };

  useEffect(() => {
    handleSetUpWorkoutData();
  }, []);

  return (
    <View style={styles.page}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{currentWorkoutPlan.name}</Text>
        {currentWorkoutPlan.exercises.map((_, index) => (
          <SessionCard key={index} exerciseName={currentWorkoutPlan.exercises[index].name} />
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <CustomButton
          title="Finish Workout"
          onPress={() => {
            if (workoutData) {
              createWorkoutRecord(workoutData);
            } else {
              console.warn("Workout data not initialized yet.");
            }
          }}
          style={styles.finishBtn}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1, // fill the entire screen
    backgroundColor: "#fff",
  },
  container: {
    padding: 16,
    paddingBottom: 100,
    flexGrow: 1,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f9f9f9",
  },
  finishBtn: {},
});
