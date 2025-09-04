import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import AdditionalSet from "./AdditionalSet";
import useAppStore from "@/store/useAppStore";

import CustomButton from "@/components/CustomButton";
import { WorkoutRecord } from "@/types/types";


interface CardType {
  exerciseName: string;
  exerciseIndex: number;
  handleResisInputChange: (exerciseNo: number, setNo: number, property: 'reps' | 'weight', value: number) => void;
  addSet: (exerciseNo: number) => void;
}

export default function SessionCard({ exerciseName, exerciseIndex, handleResisInputChange, addSet }: CardType) {
  const [additionalSets, setAdditionalSets] = useState(0);
  const { currentWorkoutRecord, setCurrentWorkoutRecord } = useAppStore();

  const exType = currentWorkoutRecord?.exerciseRecords[exerciseIndex]?.type;

  const handleAddSet = () => {
    addSet(exerciseIndex);
  };

  const removeLastSet = () => {
    if (!currentWorkoutRecord) return;
    if (currentWorkoutRecord.exerciseRecords[exerciseIndex].type !== "resistance" ) console.log("ERROR:Not a resistance exercise");

    const updatedRecord: WorkoutRecord = {
      ...currentWorkoutRecord,
      exerciseRecords: currentWorkoutRecord.exerciseRecords.map((exercise, i) => {
        if (exercise.type === "resistance" && i === exerciseIndex) {
          return {
            ...exercise,
            sets: exercise.sets.slice(0, -1), // Remove the last set
          };
        }
        return exercise;
      }),
    };
    setAdditionalSets(additionalSets - 1);
    setCurrentWorkoutRecord(updatedRecord);
  }

  const updateSetsAmount = () => {
    setAdditionalSets(currentWorkoutRecord.exerciseRecords[exerciseIndex]?.type === 'resistance' ? currentWorkoutRecord.exerciseRecords[exerciseIndex].sets.length - 1 : 0);
  }

  useEffect(() => {
    updateSetsAmount();
  }, [currentWorkoutRecord]);

  if (exType === "cardio") {
    return (
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.cardTitle}>{exerciseName}</Text>
          <Text>Cardio</Text>
        </View>

        <View style={styles.durationBox}>
          <Text style={styles.durationText}>Duration:</Text>
          <View>
            <Text style={styles.durationKey}><i>Min</i></Text>
            <TextInput keyboardType="numeric" placeholder="0" style={styles.inputCar} />
          </View>
          <View>
            <Text style={styles.durationKey}><i>Sec</i></Text>
            <TextInput keyboardType="numeric" placeholder="0" style={styles.inputCar} />
          </View>
        </View>

        <View style={styles.addSetBtnWrapper}>
          <CustomButton title="Add metric" variant="secondary" onPress={() => {console.log("PLACEHOLDER")}} />
        </View>

      </View>
      );
  }
  

    if (exType === "resistance") {
    return (
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.cardTitle}>{exerciseName}</Text>
          <Text>Resistance</Text>
        </View>

        <View style={styles.set}>
          <Text>Reps:</Text>
          <TextInput keyboardType="numeric" placeholder="0" style={styles.input}  
          onChangeText={(text) => {handleResisInputChange(exerciseIndex, 0, 'reps', Number(text))}} 
          />
          <Text>Weight:</Text>
          <TextInput keyboardType="numeric" placeholder="0" style={styles.input}  
          onChangeText={(text) => {handleResisInputChange(exerciseIndex, 0, 'weight', Number(text))}}
            />
        </View>

        <View
          style={[
            styles.addSetBtnWrapper,
            additionalSets > 0 && styles.hidden, // hide if there are additional sets
          ]}
        >
          <CustomButton title="+ Add set +" variant="secondary" onPress={handleAddSet} />
        </View>

        {
          currentWorkoutRecord?.exerciseRecords[exerciseIndex]?.type === 'resistance' &&
          Array.from({ length: additionalSets }, (_, i) => i + 2).map((setNum, idx) => (
            <AdditionalSet
              key={idx}
              index={idx}
              exerciseIndex={exerciseIndex}
              setNumber={setNum}
              addSet={handleAddSet}
              removeSet={removeLastSet}
              // removeSet={handleRemoveSet}
              // setLength={additionalSets}
              handleResisInputChange={handleResisInputChange}
            />
          ))
        }
      </View>
      );
  }

  }

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 8,
    margin: "auto",
    minWidth: 280,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  set: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    maxWidth: 60,
    marginHorizontal: 4,
  },
  addSetBtnWrapper: {
    alignItems: "center",
    margin: "auto",
    marginVertical: 8,
  },
  hidden: {
    opacity: 0,
    pointerEvents: "none",
  },
  durationText:{
    alignContent: "center",
    transform: [{ translateY: 6 }],
  },
  durationKey:{
    textAlign: "center",
  },
  durationBox: {
    flexDirection: "row",
    margin: "auto",
  },
  inputCar: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginHorizontal: 4,
    maxWidth: 60,
  },
});
