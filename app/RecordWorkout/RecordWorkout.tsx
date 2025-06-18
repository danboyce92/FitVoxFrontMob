import CustomButton from "@/components/CustomButton";
import { StyleSheet, Text, View } from "react-native";

export default function RecordWorkout() {
  return (
    <View style={styles.container}>
      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.placeholderText}>placeholder text</Text>
        <CustomButton title="Start" onPress={() => {}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end", // footer goes to the bottom
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f9f9f9",
  },
  placeholderText: {
    fontSize: 16,
    color: "#555",
  },
});
