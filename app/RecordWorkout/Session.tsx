import { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import SessionCard from "./SessionCard";

import { createWorkoutRecord, getAllWorkoutRecords } from "@/app/api";
import CustomButton from "@/components/CustomButton";
import useAppStore from "@/store/useAppStore";
import { ExerciseRecord, WorkoutRecord } from "@/types/types";
import { useRouter } from "expo-router";
import { exerciseTypeCheck } from "./exerciseTypeCheck";

export default function Session() {
  const router = useRouter();
  const { currentWorkoutPlan, currentWorkoutRecord, setCurrentWorkoutRecord } = useAppStore();

  const handleSetUpWorkoutData = async () => {
    try {
      const records = await getAllWorkoutRecords();
      const newRecordID = records.length;

      const initialRecords: ExerciseRecord[] = currentWorkoutPlan.exercises.map((exercise) => {
        return exerciseTypeCheck(exercise);
      });

      const newWorkoutData: WorkoutRecord = {
        id: newRecordID.toString(),
        name: `${currentWorkoutPlan.name} ${newRecordID}`,
        date: new Date(),
        duration: 0,
        exerciseRecords: initialRecords,
      };

      setCurrentWorkoutRecord(newWorkoutData);
    } catch (error) {
      console.error("Error fetching workout records:", error);
      throw error;
    }
  };

const handleResisInputChange = (exerciseNo: number, setNo: number, property: 'reps' | 'weight', value: number) => {
  if (!currentWorkoutRecord) return;

  const updatedRecord: WorkoutRecord = {
    ...currentWorkoutRecord,
    exerciseRecords: currentWorkoutRecord.exerciseRecords.map((exercise, i) => {
      if (exercise.type === "resistance" && i === exerciseNo) {
        return {
          ...exercise,
          sets: exercise.sets.map((set, j) => {
            if (j === setNo) {
              return { ...set, [property]: value }; // Dynamic update
            }
            return set;
          }),
        };
      }
      return exercise;    
    }),
  }
  setCurrentWorkoutRecord(updatedRecord);
}

const addSetToData = (exerciseNo: number) => {
  if (!currentWorkoutRecord) return;

  const updatedRecord: WorkoutRecord = {
    ...currentWorkoutRecord,
    exerciseRecords: currentWorkoutRecord.exerciseRecords.map((exercise, i) => {
      if (exercise.type === "resistance" && i === exerciseNo) {
        return {
          ...exercise,
          sets: [
            ...exercise.sets,
            { setNumber: exercise.sets.length + 1, weight: 0, reps: 0 },
          ],
        };
      }
      return exercise;
    }),
  };

  setCurrentWorkoutRecord(updatedRecord);
};

  useEffect(() => {
    handleSetUpWorkoutData();
  }, []);

  return (
    <View style={styles.page}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{currentWorkoutPlan.name}</Text>
        {currentWorkoutPlan.exercises.map((_, index) => (
          <SessionCard key={index} exerciseIndex={index} exerciseName={currentWorkoutPlan.exercises[index].name} 
          handleResisInputChange={handleResisInputChange} 
          addSet={addSetToData} 
          />
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <CustomButton
          title="Finish Workout"
          onPress={() => {
            if (currentWorkoutRecord) {
              createWorkoutRecord(currentWorkoutRecord);
              router.push("/")
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
