import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import AdditionalSet from "./AdditionalSet";

import CustomButton from "@/components/CustomButton";

interface CardType {
  exerciseName: string;
  exerciseIndex: number;
  handleResisInputChange: (exerciseNo: number, setNo: number, property: 'reps' | 'weight', value: number) => void;
  addSet: (exerciseNo: number) => void;
}

export default function SessionCard({ exerciseName, exerciseIndex, handleResisInputChange, addSet }: CardType) {
  const [additionalSets, setAdditionalSets] = useState<number[]>([]);
  const [hideButton, setHideButton] = useState(false);

  const addNewSet = () => {
    setAdditionalSets((prev) => [...prev, prev.length + 1]);
  };
  const handleAddSet = () => {
    addNewSet();
    addSet(exerciseIndex);
    setHideButton(true);
  };
  const handleRemoveSet = () => {
    setAdditionalSets((prev) => prev.slice(0, -1));
  };
  const handleMainAddSetButton = () => {
    if (additionalSets.length < 1) {
      setHideButton(false);
    }
  };

  useEffect(() => {
    handleMainAddSetButton();
  }, [additionalSets]);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.cardTitle}>{exerciseName}</Text>
        <Text>Set 1</Text>
      </View>

      <View style={styles.set}>
        <Text>Reps:</Text>
        <TextInput keyboardType="numeric" placeholder="0" style={styles.input}  onChangeText={(text) => {handleResisInputChange(exerciseIndex, 0, 'reps', Number(text))}} />
        <Text>Weight:</Text>
        <TextInput keyboardType="numeric" placeholder="0" style={styles.input}  onChangeText={(text) => {handleResisInputChange(exerciseIndex, 0, 'weight', Number(text))}} />
      </View>

      <View
        style={[
          styles.addSetBtnWrapper,
          hideButton && styles.hidden, // apply hidden style if toggled
        ]}
      >
        <CustomButton title="+ Add set +" variant="secondary" onPress={handleAddSet} />
      </View>

      {additionalSets.map((_, index) => (
        <AdditionalSet
          key={index}
          index={index}
          exerciseIndex={exerciseIndex}
          setNumber={index+1}
          addSet={addNewSet}
          removeSet={handleRemoveSet}
          setLength={additionalSets.length}
          handleResisInputChange={handleResisInputChange}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 8,
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
    minWidth: 60,
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
});
