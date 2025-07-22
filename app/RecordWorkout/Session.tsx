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
        sets: [{ setNumber: 1, reps: 0, weight: 0 }],
      } satisfies ResistanceExerciseRecord;
    } else {
      return {
        id: exercise.id,
        name: exercise.name,
        type: "cardio",
        specific: {
          metrics: {
            durationMinutes: 0,
          },
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

const handleResisInputChange = (exerciseNo: number, setNo: number, property: 'reps' | 'weight', value: number) => {
  setWorkoutData((prevWorkoutData) => {
    if (!prevWorkoutData) return prevWorkoutData;

    return {
      ...prevWorkoutData,
      exerciseRecords: prevWorkoutData.exerciseRecords.map((exercise, i) => {
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
    };
  });
};

//Create a method that adds a set object to the set array in the workoutData,
//This should get triggered when the addSet button is hit in the card component.
//Also create a method that removes the last set from the workoutData,
//This should get triggered by the removeSet button

const addSetToData = (exerciseNo: number) => {
setWorkoutData((prevWorkoutData) => {
  if (!prevWorkoutData) return prevWorkoutData;

  return {
    ...prevWorkoutData,
    exerciseRecords: prevWorkoutData.exerciseRecords.map((exercise, i) => {
      if (exercise.type === "resistance" && i === exerciseNo) {
        return {
          ...exercise,
          sets: [
            ...exercise.sets,
            { setNumber: exercise.sets.length + 1, weight: 0, reps: 0 }
          ],
        };
      }
      return exercise;
    }),
  };
});
}

const removeSetFromData = (exerciseNo: number) => {
  setWorkoutData((prevWorkoutData) => {
    if (!prevWorkoutData) return prevWorkoutData;

    return {
      ...prevWorkoutData,
      exerciseRecords: prevWorkoutData.exerciseRecords.map((exercise, i) => {
        if (exercise.type === "resistance" && i === exerciseNo) {
          return {
            ...exercise,
            sets: exercise.sets.slice(0, -1), // Remove last set
          };
        }
        return exercise;
      }),
    };
  });
};



  useEffect(() => {
    handleSetUpWorkoutData();
  }, []);

  return (
    <View style={styles.page}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{currentWorkoutPlan.name}</Text>
        {currentWorkoutPlan.exercises.map((_, index) => (
          <SessionCard key={index} exerciseIndex={index} exerciseName={currentWorkoutPlan.exercises[index].name} handleResisInputChange={handleResisInputChange} addSet={addSetToData} removeSet={removeSetFromData} />
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
