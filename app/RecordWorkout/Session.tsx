import { ScrollView, StyleSheet, Text, View } from "react-native";
import SessionCard from "./SessionCard";

import CustomButton from "@/components/CustomButton";
import useAppStore from "@/store/useAppStore";
import { useState, useEffect } from "react";
import { ExerciseRecord, WorkoutRecord } from "@/types/types";
import { getAllWorkoutRecords } from "../api";

export default function Session() {
  const [recordID, setRecordID] = useState(0);
  const { currentWorkoutPlan, setCurrentWorkoutRecord } = useAppStore();

  const handleSetUpWorkoutData = async () => {
    try {
      const records = await getAllWorkoutRecords();

      setRecordID(records.length)

    const newWorkoutData: WorkoutRecord = {
      id: recordID.toString(),
      name: currentWorkoutPlan.name,
      date: new Date(),
      duration: 0,
      exerciseRecords: []
    }

    setCurrentWorkoutRecord(newWorkoutData);

    } catch(error) {
        console.error("Error fetching workout records:", error);
        throw error;
    }
  }

  useEffect(() => {
    handleSetUpWorkoutData();
  }, [])

  return (
    <View style={styles.page}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{currentWorkoutPlan.name}</Text>
        {currentWorkoutPlan.exercises.map((_, index) => (
          <SessionCard key={index} exerciseName={currentWorkoutPlan.exercises[index].name} />
        ))

        }

      </ScrollView>
      <View style={styles.footer}>
        <CustomButton title="Finish Workout" onPress={() => {}} style={styles.finishBtn} />
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
