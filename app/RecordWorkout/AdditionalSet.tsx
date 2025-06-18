import { StyleSheet, Text, TextInput, View } from "react-native";

import CustomButton from "@/components/CustomButton";

interface CardType {
  index: number;
  setNumber: number;
  addSet: () => void;
  removeSet: () => void;
  setLength: number;
}

export default function AdditionalSet({ index, setNumber, addSet, removeSet, setLength }: CardType) {
  const isLastSet = index === setLength - 1;

  const handleAddSetButton = () => {
    addSet();
  };

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Set {setNumber}</Text>
      <View style={styles.set}>
        <Text>Reps:</Text>
        <TextInput keyboardType="numeric" placeholder="0" style={styles.input} />

        <Text>Weight:</Text>
        <TextInput keyboardType="numeric" placeholder="0" style={styles.input} />
      </View>

      <View
        style={[
          styles.addSetBtnWrapper,
          !isLastSet && styles.hidden, // hide if NOT the last set
        ]}
      >
        <CustomButton title="Remove Set" variant="tertiary" onPress={removeSet} />
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
