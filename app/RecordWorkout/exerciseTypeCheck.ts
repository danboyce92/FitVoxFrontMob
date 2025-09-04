import { CardioExerciseRecord, Exercise, ResistanceExerciseRecord } from "@/types/types";

export const exerciseTypeCheck = (exercise: Exercise) => {
  if (exercise.type === "resistance") {
    return {
      id: exercise.id,
      name: exercise.name,
      type: "resistance",
      sets: [{ setNumber: 1, reps: 0, weight: 0 }],
    } satisfies ResistanceExerciseRecord;
  } else {
    return {
      id: exercise.id,
      name: exercise.name,
      type: "cardio",
      specific: {
        metrics: {
          durationMinutes: 0,
        },
      },
    } satisfies CardioExerciseRecord;
  }
};

//Resistance Logic

//Cardio Logic
