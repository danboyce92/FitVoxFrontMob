import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";

import { getAllWorkoutPlans, getWorkoutPlan } from "@/app/api";
import CustomButton from "@/components/CustomButton";
import useAppStore from "@/store/useAppStore";

export default function RecordWorkout() {
  const [startToggle, setStartToggle] = useState(true);
  const { workoutPlans, currentWorkoutPlan, setWorkoutPlan, setWorkoutPlans } = useAppStore();
  const router = useRouter();

  const handleGetPlan = async (id: number) => {
    try {
      const plan = await getWorkoutPlan(id);
      if (plan) {
        setWorkoutPlan(plan);
        setStartToggle(false);
      } else {
        console.warn("No plan returned");
      }
    } catch (error) {
      console.error("Failed to get workout plan:", error);
    }
  };

  useEffect(() => {
    const fetchWorkoutPlans = async () => {
      try {
        const plans = await getAllWorkoutPlans();
        setWorkoutPlans(plans.reverse());
      } catch (error) {
        console.error("Error fetching health record:", error);
      }
    };
    fetchWorkoutPlans();
  }, [workoutPlans, currentWorkoutPlan]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {workoutPlans.map((plan) => (
          <Pressable key={plan.id} onPress={() => handleGetPlan(Number(plan.id))} style={styles.planItem}>
            <Text style={styles.planName}>{plan.name}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.placeholderText}>
          {currentWorkoutPlan ? currentWorkoutPlan.name : "Please select your workout"}
        </Text>
        <CustomButton disabled={startToggle} title="Start" onPress={() => router.push("/RecordWorkout/Session")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100, // extra space for footer clearance
  },
  planItem: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: "#eee",
    borderRadius: 8,
  },
  planName: {
    fontSize: 16,
    color: "#333",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f9f9f9",
  },
  placeholderText: {
    fontSize: 16,
    color: "#555",
  },
});
