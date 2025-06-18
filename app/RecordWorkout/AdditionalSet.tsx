import CustomButton from "@/components/CustomButton";
import { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

interface CardType {
  setNumber: number;
  exerciseName: string;
  addSet: () => void;
}

export default function AdditionalSet({ setNumber, exerciseName, addSet }: CardType) {
  const [hideButton, setHideButton] = useState(false);

    const handleAddSetButton = () => {
        addSet();
        setHideButton(true);
    }

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
          hideButton && styles.hidden, // apply hidden style if toggled
        ]}
      >
        <CustomButton
          title="+ Add set +"
          variant="secondary"
          onPress={handleAddSetButton}
        />
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
    width: '90%',
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
  addSetBtn: {
    margin: 'auto',
    alignSelf: "flex-end",
  },
    addSetBtnWrapper: {
    alignItems: "center",
    margin: 'auto',
    marginVertical: 8,
  },
  hidden: {
    opacity: 0,
    pointerEvents: "none",
  },
});
