import { ScrollView, StyleSheet, Text, View } from "react-native";
import useAppStore from "@/store/useAppStore";
import CustomButton from "@/components/CustomButton";
import SessionCard from "./SessionCard";

export default function Session() {
  const { workoutPlans, currentWorkoutPlan } = useAppStore();

  return (
    <View style={styles.page}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{currentWorkoutPlan.name}</Text>
        <SessionCard exerciseName={currentWorkoutPlan.exercises[0].name} />
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
  finishBtn: {

  },
});
