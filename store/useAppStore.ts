import { create } from "zustand";

import { WorkoutPlan } from "@/types/types";

interface AppStore {
  loading: boolean;
  workoutPlan: WorkoutPlan;
  workoutPlans: WorkoutPlan[];
  setWorkoutPlans: (workoutPlans: WorkoutPlan[]) => void;
  setWorkoutPlan: (workoutPlan: WorkoutPlan) => void;
  setLoading: (loading: boolean) => void;
}

const useAppStore = create<AppStore>((set) => ({
  loading: false,
  workoutPlan: {
    id: "0",
    name: "unkown",
    exercises: [
      {
        id: "",
        name: "",
        category: "",
      },
    ],
  },
  workoutPlans: [],

  setWorkoutPlan: (workoutPlan: WorkoutPlan) => set({ workoutPlan }),
  setWorkoutPlans: (workoutPlans: WorkoutPlan[]) => set({ workoutPlans }),
  setLoading: (loading: boolean) => set({ loading }),
}));

export default useAppStore;
