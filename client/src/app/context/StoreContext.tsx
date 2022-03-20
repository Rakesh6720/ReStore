/* create component to wrap around application.
Then make properties/methods from inside context
available to the rest of the application*/
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Basket } from "../models/basket";

interface StoreContextValue {
  // specify properties and methods of store context
  basket: Basket | null;
  setBasket: (basket: Basket) => void;
  removeItem: (productId: number, quantity: number) => void;
}

export const StoreContext = createContext<StoreContextValue | undefined>(
  undefined
);

// create custom hook
export default function useStoreContext() {
  const context = useContext(StoreContext);

  if (context === undefined) {
    throw Error("Oops - we do not seem to be inside the provider.");
  }

  return context;
}

export function StoreProvider({ children }: PropsWithChildren<any>) {
  const [basket, setBasket] = useState<Basket | null>(null);

  function removeItem(productId: number, quantity: number) {
    if (!basket) return;
    // create a new copy of array and store in variable
    const items = [...basket.items];
    const itemIndex = items.findIndex((i) => i.productId === productId);
    if (itemIndex >= 0) {
      items[itemIndex].quantity -= quantity;
      // remove item if quantity is zero
      if (items[itemIndex].quantity === 0) items.splice(itemIndex, 1);
      setBasket((prevState) => {
        return { ...prevState!, items };
      });
    }
  }
  return (
    <StoreContext.Provider value={{ basket, setBasket, removeItem }}>
      {children}
    </StoreContext.Provider>
  );
}
