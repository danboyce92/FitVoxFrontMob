import { create } from "zustand";

import { BaseExercise, Exercise, ExerciseRecord, WorkoutPlan, WorkoutRecord } from "@/types/types";

interface AppStore {
  loading: boolean;
  currentWorkoutPlan: WorkoutPlan;
  workoutPlans: WorkoutPlan[];
  currentExercise: Exercise;
  exercises: Exercise[];
  currentWorkoutRecord: WorkoutRecord;
  setCurrentWorkoutRecord: (workoutRecord: WorkoutRecord) => void;
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
      type: "resistance",
    },
  ],
};

const useAppStore = create<AppStore>((set) => ({
  loading: false,
  currentWorkoutPlan: planPlaceholder,
  workoutPlans: [],
  currentExercise: {
    id: "0",
    name: "",
    category: "",
    type: "resistance",
  },
  exercises: [
    {
      id: "1",
      name: "",
      category: "",
      type: "resistance",
    },
  ],
  currentWorkoutRecord: {
    id: "1",
    name: "placeholder",
    date: new Date(),
    duration: 0,
    exerciseRecords: [],
  },
  setCurrentWorkoutRecord: (currentWorkoutRecord: WorkoutRecord) => set({ currentWorkoutRecord }),
  setWorkoutPlan: (currentWorkoutPlan: WorkoutPlan) => set({ currentWorkoutPlan }),
  setWorkoutPlans: (workoutPlans: WorkoutPlan[]) => set({ workoutPlans }),
  setExercise: (currentExercise: Exercise) => set({ currentExercise }),
  setExercises: (exercises: Exercise[]) => set({ exercises }),
  setLoading: (loading: boolean) => set({ loading }),
}));

export default useAppStore;
