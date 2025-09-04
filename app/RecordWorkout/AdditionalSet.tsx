import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

import CustomButton from "@/components/CustomButton";
import useAppStore from "@/store/useAppStore";

interface CardType {
  index: number;
  setNumber: number;
  exerciseIndex: number;
  addSet: () => void;
  removeSet: () => void;
  handleResisInputChange: (exerciseNo: number, setNo: number, property: "reps" | "weight", value: number) => void;
}

export default function AdditionalSet({
  setNumber,
  exerciseIndex,
  addSet,
  removeSet,
  handleResisInputChange,
}: CardType) {
  const { currentWorkoutRecord } = useAppStore();
  const [isLastSet, setIsLastSet] = useState(false);

  const handleAddSetButton = () => {
    addSet();
  };

  const handleRemoveSetButton = () => {
    removeSet();
  };

  const checkIfLastSet = () => {
    if (currentWorkoutRecord.exerciseRecords[exerciseIndex].type === "resistance") {
      setIsLastSet(setNumber === currentWorkoutRecord.exerciseRecords[exerciseIndex].sets.length);
    }
  };

  useEffect(() => {
    checkIfLastSet();
  }, [currentWorkoutRecord]);

  return (
    <View>
      <Text style={styles.cardTitle}>Set {setNumber}</Text>
      <View style={styles.set}>
        <Text>Reps:</Text>
        <TextInput
          keyboardType="numeric"
          placeholder="0"
          style={styles.input}
          onChangeText={(text) => {
            handleResisInputChange(exerciseIndex, setNumber - 1, "reps", Number(text));
          }}
        />

        <Text>Weight:</Text>
        <TextInput
          keyboardType="numeric"
          placeholder="0"
          style={styles.input}
          onChangeText={(text) => {
            handleResisInputChange(exerciseIndex, setNumber - 1, "weight", Number(text));
          }}
        />
      </View>

      {isLastSet && (
        <View style={styles.addSetBtnWrapper}>
          <CustomButton title="Remove Set" variant="tertiary" onPress={handleRemoveSetButton} />
          <CustomButton title="+ Add set +" variant="secondary" onPress={handleAddSetButton} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginVertical: 12,
    backgroundColor: "#fff",
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
    borderColor: "rgba(0, 0, 0, .2)",
    borderWidth: 1,
    borderRadius: 4,
    padding: 12,
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
    marginTop: 8,
    display: "flex",
    flexDirection: "row",
  },
  hidden: {
    opacity: 0,
    pointerEvents: "none",
    marginVertical: -8,
  },
});
