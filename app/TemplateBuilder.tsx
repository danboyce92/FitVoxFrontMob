import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { getAllWorkoutPlans, createWorkoutPlan } from "./api";
import DeleteModal from "@/components/DeleteModal";
import useAppStore from "@/store/useAppStore";
import { WorkoutPlan } from "@/types/types";


export default function TemplateBuilder() {
  const router = useRouter();
  const { setWorkoutPlans, workoutPlans, setWorkoutPlan } = useAppStore();

  const [visible, setVisible] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState<WorkoutPlan | null>(null);

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
  }, [workoutPlans]);

  const handlePress = (item: WorkoutPlan) => {
    setWorkoutPlan(item);
    router.push("/Workout");
  };

  const handleAddNew = () => {
    
    const newPlan: WorkoutPlan = {
      id: workoutPlans.length.toString(),
      name: "New Workout Plan",
      exercises: [],
    };

    createWorkoutPlan(newPlan);

    setWorkoutPlan(newPlan);
    router.push("/Workout");
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
            onPress={() => handlePress(item)}
            style={({ hovered }) => [
              styles.itemRow,
              hovered && styles.itemHovered,
            ]}
          >
            <View style={styles.itemTextContainer}>
              <Text style={styles.itemText}>{item.name}</Text>
            </View>

            <Pressable
              onPress={() => {
                setSelectedWorkout(item);
                setVisible(true);
              }}
              style={({ hovered }) => [styles.deleteButton, hovered && styles.deleteButtonHovered]}
            >
              <Text style={styles.deleteButtonText}>X</Text>
            </Pressable>
          </Pressable>
        ))}
      </ScrollView>
      <DeleteModal visibility={visible} setVisible={setVisible} item={selectedWorkout} />
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
    backgroundColor: "#d0f0d0",
  },
  deleteButton: {
    backgroundColor: "#ffdddd",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 10,
  },

  deleteButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#b00000",
  },
  deleteButtonHovered: {
    backgroundColor: "#ffbbbb",
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#f0f0f0",
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 10,
    overflow: "hidden",
  },

  itemContent: {
    flex: 1,
    padding: 20,
  },

  itemTextContainer: {
    flex: 1,
    padding: 20,
  },
});
