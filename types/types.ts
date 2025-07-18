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
  specific: SpecificCardio;
}

type SpecificCardio = CustomCardio | Treadmill | StationaryBike | RowingMachine | StairClimber | Elliptical;

interface CustomCardio {
  customName: string;
  metrics: Record<string, number | string>;
}

interface Treadmill {
  metrics: {
    durationMinutes: number;
    speedKmh?: number;
    inclinePercent?: number;
    distanceKm?: number;
    caloriesBurned?: number;
  };
}

interface StationaryBike {
  metrics: {
    durationMinutes: number;
    resistanceLevel?: number;
    rpm?: number;
    distanceKm?: number;
    caloriesBurned?: number;
  };
}

interface RowingMachine {
  metrics: {
    durationMinutes: number;
    strokesPerMinute?: number;
    distanceMeters?: number;
    averageSplitTime?: string; // e.g. "2:05/500m"
    caloriesBurned?: number;
  };
}

interface StairClimber {
  metrics: {
    durationMinutes: number;
    floorsClimbed?: number;
    stepRate?: number; // steps per minute
    resistanceLevel?: number;
    caloriesBurned?: number;
  };
}

interface Elliptical {
  metrics: {
    durationMinutes: number;
    resistanceLevel?: number;
    stridesPerMinute?: number;
    distanceKm?: number;
    caloriesBurned?: number;
  };
}
