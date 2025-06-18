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




/*
type ExerciseRecord =
  | ResistanceExerciseRecord
  | CardioExerciseRecord;

interface BaseExercise {
  id: string;
  name: string;
  category: string;
  type: "resistance" | "cardio";
}

interface ResistanceExerciseRecord extends BaseExercise {
  type: "resistance";
  sets: {
    setNumber: number;
    reps: number;
    weight: number;
  }[];
}

interface CardioExerciseRecord extends BaseExercise {
  type: "cardio";
  metrics: {
    durationMinutes: number;
    speedKmh?: number;
    inclinePercent?: number;
    distanceKm?: number;
    caloriesBurned?: number;
  };
}

*/