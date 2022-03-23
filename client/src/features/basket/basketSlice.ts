import { createSlice } from "@reduxjs/toolkit";
import { Basket } from "./../../app/models/basket";
interface BasketState {
  basket: Basket | null;
}

const initialState: BasketState = {
  basket: null,
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setBasket: (state, action) => {
      state.basket = action.payload;
    },
    removeItem: (state, action) => {
      const { productId, quantity } = action.payload;
      // find item index
      const itemIndex = state.basket?.items.findIndex(
        (i) => productId === productId
      );
      // if item not in basket return
      if (itemIndex === -1 || itemIndex === undefined) {
        return;
      }
      // overwrite typescript safety because we know basket will exist
      state.basket!.items[itemIndex].quantity -= quantity;
      // if item updated quantity is 0 remove from basket items array
      if (state.basket?.items[itemIndex].quantity === 0) {
        state.basket.items.splice(itemIndex, 1);
      }
    },
  },
});
export const { setBasket, removeItem } = basketSlice.actions;
