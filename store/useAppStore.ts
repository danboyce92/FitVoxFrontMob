import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { Exercise, WorkoutPlan } from "@/types/types";

interface AppStore {
  loading: boolean;
  currentWorkoutPlan: WorkoutPlan;
  workoutPlans: WorkoutPlan[];
  currentExercise: Exercise;
  exercises: Exercise[];
  setWorkoutPlans: (workoutPlans: WorkoutPlan[]) => void;
  setWorkoutPlan: (workoutPlan: WorkoutPlan) => void;
  setExercise: (exercise: Exercise) => void;
  setExercises: (exercises: Exercise[]) => void;
  setLoading: (loading: boolean) => void;
}

export const planPlaceholder: WorkoutPlan = {
      id: "0",
    name: "Please select a workout",
    exercises: [
      {
        id: "",
        name: "",
        category: "",
      },
    ],
}

const useAppStore = create<AppStore>((set) => ({
  loading: false,
  currentWorkoutPlan: planPlaceholder,
  workoutPlans: [],
  currentExercise: {
    id: "0",
    name: "",
    category: "",
  },
  exercises: [
    {
      id: "1",
      name: "",
      category: "",
    },
  ],
  setWorkoutPlan: (currentWorkoutPlan: WorkoutPlan) => set({ currentWorkoutPlan }),
  setWorkoutPlans: (workoutPlans: WorkoutPlan[]) => set({ workoutPlans }),
  setExercise: (currentExercise: Exercise) => set({ currentExercise }),
  setExercises: (exercises: Exercise[]) => set({ exercises }),
  setLoading: (loading: boolean) => set({ loading }),
}));

export default useAppStore;
