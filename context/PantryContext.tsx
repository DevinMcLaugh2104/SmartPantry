import { createContext, ReactNode, useContext, useState } from "react";
import { PantryItem } from "../types/PantryItem";

type PantryContextType = {
  pantryItems: PantryItem[];
  addPantryItem: (item: PantryItem) => void;
};

const PantryContext = createContext<PantryContextType | undefined>(undefined);

export function PantryProvider({ children }: { children: ReactNode }) {
  const [pantryItems, setPantryItems] = useState<PantryItem[]>([
    {
      id: "1",
      name: "Milk",
      expirationDate: "2026-03-10",
      quantity: 1,
      category: "Dairy",
    },
    {
      id: "2",
      name: "Eggs",
      expirationDate: "2026-03-15",
      quantity: 12,
      category: "Dairy",
    },
    {
      id: "3",
      name: "Bread",
      expirationDate: "2026-03-08",
      quantity: 1,
      category: "Bakery",
    },
  ]);

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

  if (context === undefined) {
    throw new Error("usePantry must be used inside a PantryProvider");
  }

  return context;
}
