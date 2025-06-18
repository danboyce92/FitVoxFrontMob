import CustomButton from "@/components/CustomButton";
import { View, Text, TextInput, StyleSheet } from "react-native";

interface CardType {
  setNumber: number;
  exerciseName: string;
}

export default function AdditionalSet({ setNumber, exerciseName }: CardType) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.cardTitle}>{exerciseName}</Text>
        <Text>Set {setNumber + 2}</Text>
      </View>

      <View style={styles.set}>
        <Text>Reps:</Text>
        <TextInput keyboardType="numeric" placeholder="0" style={styles.input} />

        <Text>Weight:</Text>
        <TextInput keyboardType="numeric" placeholder="0" style={styles.input} />
      </View>

      <CustomButton
        title="+ Add set +"
        variant="secondary"
        onPress={() => {}}
        style={styles.addSetBtn}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginVertical: 12,
    backgroundColor: "#fff",
    width: "95%",
    alignSelf: "flex-end",
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    alignSelf: "center",
  },
});
