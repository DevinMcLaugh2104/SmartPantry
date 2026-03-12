import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { PantryItem } from "../types/PantryItem";

type PantryContextType = {
  pantryItems: PantryItem[];
  addPantryItem: (item: PantryItem) => void;
};

const PantryContext = createContext<PantryContextType | undefined>(undefined);

const STORAGE_KEY = "PANTRY_ITEMS";

export function PantryProvider({ children }: { children: ReactNode }) {
  const [pantryItems, setPantryItems] = useState<PantryItem[]>([]);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setPantryItems(JSON.parse(stored));
        }
      } catch (error) {
        console.log("Failed to load pantry items", error);
      }
    };

    loadItems();
  }, []);

  useEffect(() => {
    const saveItems = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(pantryItems));
      } catch (error) {
        console.log("Failed to save pantry items", error);
      }
    };

    saveItems();
  }, [pantryItems]);

  const addPantryItem = (item: PantryItem) => {
    setPantryItems((prev) => [...prev, item]);
  };

  return (
    <PantryContext.Provider value={{ pantryItems, addPantryItem }}>
      {children}
    </PantryContext.Provider>
  );
}

export function usePantry() {
  const context = useContext(PantryContext);

  if (!context) {
    throw new Error("usePantry must be used inside a PantryProvider");
  }

  return context;
}
