import { Button, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Button title="Template Builder" onPress={() => router.push("/TemplateBuilder")} />
      <Button title="Record Workout" onPress={() => router.push("/RecordWorkout")} />
      <Button title="Your Progress" onPress={() => router.push("/YourProgress")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    gap: 20,
    paddingHorizontal: 40,
  },
});
