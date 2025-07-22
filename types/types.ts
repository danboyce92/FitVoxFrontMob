//For Template Building

export type Exercise = {
  id: string;
  name: string;
  category: string;
  type: "resistance" | "cardio";
};

export type WorkoutPlan = {
  id: string;
  name: string;
  exercises: Exercise[];
};

// For Record Taking

export type WorkoutRecord = {
  id: string;
  name: string;
  date: Date;
  duration: number;
  exerciseRecords: ExerciseRecord[];
};

export type ExerciseRecord = ResistanceExerciseRecord | CardioExerciseRecord;

export interface BaseExercise {
  id: string;
  name: string;
  type: "resistance" | "cardio" | "placeholder";
}

export interface ResistanceExerciseRecord extends BaseExercise {
  type: "resistance";
  sets: {
    setNumber: number;
    reps: number;
    weight?: number;
  }[];
}

export interface CardioExerciseRecord extends BaseExercise {
  type: "cardio";
  specific: {
    metrics: CardioMetrics;
  };
}

export interface CardioMetrics {
  durationMinutes: number;
  distanceKm?: number;
  caloriesBurned?: number;
  speedKmh?: number;
  inclinePercent?: number;
  resistanceLevel?: number;
  rpm?: number;
  strokesPerMinute?: number;
  averageSplitTime?: string; // e.g. "2:05/500m"
  floorsClimbed?: number;
  stepRate?: number; // steps per minute
  stridesPerMinute?: number;
}