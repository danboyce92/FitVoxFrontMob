export type Exercise = {
  id: string;
  name: string;
  sets: number;
  reps: number;
};

export type WorkoutPlan = {
  id: string;
  name: string;
  exercises: Exercise[];
};
