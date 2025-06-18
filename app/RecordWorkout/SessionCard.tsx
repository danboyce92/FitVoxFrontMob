import CustomButton from "@/components/CustomButton";
import { View, Text, TextInput, StyleSheet } from "react-native";

interface CardType {
  exerciseName: string;
}

export default function SessionCard({ exerciseName }: CardType) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{exerciseName}</Text>
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
    marginBottom: 12,
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
