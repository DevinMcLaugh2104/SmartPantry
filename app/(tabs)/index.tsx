import { router } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { usePantry } from "../../context/PantryContext";

export default function PantryScreen() {
  const { pantryItems } = usePantry();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Smart Pantry</Text>

      <Pressable style={styles.button} onPress={() => router.push("/add-item")}>
        <Text style={styles.buttonText}>Add Item</Text>
      </Pressable>

      <FlatList
        data={pantryItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.item}>{item.name}</Text>
            <Text>Expires: {item.expirationDate}</Text>
            <Text>Quantity: {item.quantity}</Text>
            <Text>Category: {item.category}</Text>
          </View>
        )}
      />
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
  button: {
    backgroundColor: "#222",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 20,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  card: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginBottom: 12,
  },
  item: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
});
