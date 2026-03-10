import { Stack } from "expo-router";
import { PantryProvider } from "../context/PantryContext";

export default function RootLayout() {
  return (
    <PantryProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="add-item" options={{ title: "Add Item" }} />
      </Stack>
    </PantryProvider>
  );
}
