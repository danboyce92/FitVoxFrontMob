import { Pressable, StyleSheet, View, Text } from "react-native";
import { useRouter } from "expo-router";
import useAppStore from "@/store/useAppStore";
import { planPlaceholder } from "@/store/useAppStore";

export default function Home() {
  const router = useRouter();
    const { setWorkoutPlan } = useAppStore();

  return (
<View style={styles.buttonContainer}>
  <Pressable style={styles.navButton} onPress={() => router.push("/TemplateBuilder/TemplateBuilder")}>
    <Text style={styles.navButtonText}>Template Builder</Text>
  </Pressable>

  <Pressable style={styles.navButton} onPress={() => {
    setWorkoutPlan(planPlaceholder);
    router.push("/RecordWorkout/RecordWorkout")}
    }>
    <Text style={styles.navButtonText}>Record Workout</Text>
  </Pressable>

  <Pressable style={styles.navButton} onPress={() => router.push("/YourProgress")}>
    <Text style={styles.navButtonText}>Your Progress</Text>
  </Pressable>
</View>

  );
}

const styles = StyleSheet.create({
buttonContainer: {
  marginTop: 20,
  gap: 12,
},

navButton: {
  paddingVertical: 14,
  paddingHorizontal: 20,
  borderRadius: 12,
  alignItems: "center",
  elevation: 2, // shadow for Android
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  margin: "auto",
  minWidth: "50%",
  backgroundColor: "#A6D9F7",
},

navButtonText: {
  fontSize: 16,
  fontWeight: "bold",
},
});
