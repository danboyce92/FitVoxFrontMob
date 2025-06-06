import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

import { WorkoutPlan } from "@/types/types";

export default function TemplateBuilder() {
  const router = useRouter();

  const workoutPlans: WorkoutPlan[] = [
    {
      id: "1",
      name: "Push Day",
      exercises: [
        { id: "1", name: "Bench Press", sets: 4, reps: 10 },
        { id: "2", name: "Push-ups", sets: 3, reps: 15 },
      ],
    },
    {
      id: "2",
      name: "Leg Day",
      exercises: [
        { id: "1", name: "Squats", sets: 4, reps: 12 },
        { id: "2", name: "Lunges", sets: 3, reps: 10 },
      ],
    },
    {
      id: "3",
      name: "Pull Day",
      exercises: [
        { id: "1", name: "Pull-ups", sets: 4, reps: 8 },
        { id: "2", name: "Barbell Row", sets: 3, reps: 10 },
      ],
    },
  ];

  const handlePress = (item: WorkoutPlan) => {
    router.push({
      pathname: "/Workout", // Adjust path if your file is named differently
      params: { plan: JSON.stringify(item) }, // Serialize the object
    });
  };

  const handleAddNew = () => {
    const placeholderPlan = {
      id: "new",
      name: "New Workout Plan",
      exercises: [],
    };

    router.push({
      pathname: "/Workout",
      params: { plan: JSON.stringify(placeholderPlan) },
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Pressable style={({ hovered }) => [styles.item, hovered && styles.itemHovered]} onPress={handleAddNew}>
          <Text style={styles.itemText}>➕ Add New Workout Plan</Text>
        </Pressable>

        {workoutPlans.map((item) => (
          <Pressable
            key={item.id}
            style={({ hovered }) => [styles.item, hovered && styles.itemHovered]}
            onPress={() => handlePress(item)}
          >
            <Text style={styles.itemText}>{item.name}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContent: { paddingVertical: 20 },
  item: {
    backgroundColor: "#f0f0f0",
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 10,
  },
  itemText: { fontSize: 16, fontWeight: "600" },
  addButton: { backgroundColor: "#d0f0d0" },
  itemHovered: {
    backgroundColor: "#b0e0a0", // lighter green or whatever hover color you want
  },
});
