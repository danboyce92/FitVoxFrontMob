import { WorkoutPlan } from "./types/types";

export const workoutPlans: WorkoutPlan[] = [
  {
    id: "1",
    name: "Push Day",
    exercises: [
      { id: "1", name: "Bench Press", category: "" },
      { id: "2", name: "Push-ups", category: "" },
    ],
  },
  {
    id: "2",
    name: "Leg Day",
    exercises: [
      { id: "1", name: "Squats", category: "" },
      { id: "2", name: "Lunges", category: "" },
    ],
  },
  {
    id: "3",
    name: "Pull Day",
    exercises: [
      { id: "1", name: "Pull-ups", category: "" },
      { id: "2", name: "Barbell Row", category: "" },
    ],
  },
];
