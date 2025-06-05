import { en, enGB, registerTranslation } from "react-native-paper-dates";
import { Stack } from "expo-router";

// Register translations for date picker to prevent warnings about missing translations
registerTranslation("en-US", en);
registerTranslation("en-GB", enGB);
registerTranslation("en-IE", enGB);

const RootLayout = () => {
  return (
    <Stack>

    </Stack>
  );
};

export default RootLayout;