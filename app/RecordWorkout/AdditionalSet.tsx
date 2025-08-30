import { StyleSheet, Text, TextInput, View } from "react-native";
import { useEffect, useState } from "react";
import useAppStore from "@/store/useAppStore";
import CustomButton from "@/components/CustomButton";

interface CardType {
  index: number;
  setNumber: number;
  exerciseIndex: number;
  addSet: () => void;
  removeSet: () => void;
  handleResisInputChange: (exerciseNo: number, setNo: number, property: 'reps' | 'weight', value: number) => void;
}

export default function AdditionalSet({ setNumber, exerciseIndex, addSet, removeSet, handleResisInputChange }: CardType) {
  const { currentWorkoutRecord } = useAppStore();
  const [isLastSet, setIsLastSet] = useState(false);

  const handleAddSetButton = () => {
    addSet();
  };

  const handleRemoveSetButton = () => {
    removeSet();
  };

  const checkIfLastSet = () => {
    if (currentWorkoutRecord.exerciseRecords[exerciseIndex].type === 'resistance') {
      setIsLastSet(setNumber === currentWorkoutRecord.exerciseRecords[exerciseIndex].sets.length);
    }
  }

  useEffect(() => {
    checkIfLastSet();
  }, [currentWorkoutRecord]);

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Set {setNumber}</Text>
      <View style={styles.set}>
        <Text>Reps:</Text>
        <TextInput keyboardType="numeric" placeholder="0" style={styles.input} 
        onChangeText={(text) => {handleResisInputChange(exerciseIndex, setNumber-1, 'reps', Number(text))}} 
        />

        <Text>Weight:</Text>
        <TextInput keyboardType="numeric" placeholder="0" style={styles.input} 
        onChangeText={(text) => {handleResisInputChange(exerciseIndex, setNumber-1, 'weight', Number(text))}} 
        />
      </View>

      <View
        style={[
          styles.addSetBtnWrapper,
          !isLastSet && styles.hidden, // hide if NOT the last set
        ]}
      >
        <CustomButton title="Remove Set" variant="tertiary" onPress={handleRemoveSetButton} />
        <CustomButton title="+ Add set +" variant="secondary" onPress={handleAddSetButton} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginVertical: 12,
    backgroundColor: "#fff",
    alignSelf: "flex-end",
    width: "90%",
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
    minWidth: 60,
    marginHorizontal: 4,
  },
  addSetBtnWrapper: {
    alignItems: "center",
    margin: "auto",
    marginVertical: 8,
    display: "flex",
    flexDirection: "row",
  },
  hidden: {
    opacity: 0,
    pointerEvents: "none",
    marginVertical: -8,
  },
});
