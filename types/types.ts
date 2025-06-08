export type Exercise = {
  id: string;
  name: string;
  category: string;
};

export type WorkoutPlan = {
  id: string;
  name: string;
  exercises: Exercise[];
};
