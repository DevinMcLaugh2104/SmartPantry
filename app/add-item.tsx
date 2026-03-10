import { router } from "expo-router";
import { useState } from "react";
import {
    Alert,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { usePantry } from "../context/PantryContext";

export default function AddItemScreen() {
  const [name, setName] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [quantity, setQuantity] = useState("");

  const { addPantryItem } = usePantry();

  const handleSave = () => {
    if (!name.trim() || !expirationDate.trim() || !quantity.trim()) {
      Alert.alert("Missing info", "Please fill in all fields.");
      return;
    }

    addPantryItem({
      id: Date.now().toString(),
      name: name.trim(),
      expirationDate: expirationDate.trim(),
      quantity: Number(quantity),
      category: "Uncategorized",
    });

    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Pantry Item</Text>

      <TextInput
        style={styles.input}
        placeholder="Item name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Expiration date (YYYY-MM-DD)"
        value={expirationDate}
        onChangeText={setExpirationDate}
      />

      <TextInput
        style={styles.input}
        placeholder="Quantity"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
      />

      <Pressable style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Item</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 14,
  },
  button: {
    backgroundColor: "#222",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
