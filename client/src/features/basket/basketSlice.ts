import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { Basket } from "./../../app/models/basket";
interface BasketState {
  basket: Basket | null;
  status: string;
}

const initialState: BasketState = {
  basket: null,
  status: "idle",
};

// create actions we can use to do things inside store
export const addBasketItemAsync = createAsyncThunk<
  Basket,
  { productId: number; quantity: number }
>("basket/addBasketItemAsync", async ({ productId, quantity }) => {
  try {
    return await agent.Basket.addItem(productId, quantity);
  } catch (error) {
    console.log(error);
  }
});

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
        (i) => i.productId === productId
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
  extraReducers: (builder) => {
    builder.addCase(addBasketItemAsync.pending, (state, action) => {
      console.log(action);
      state.status = "pendingAddItem";
    });
    builder.addCase(addBasketItemAsync.fulfilled, (state, action) => {
      state.basket = action.payload;
      state.status = "idle";
    });
    builder.addCase(addBasketItemAsync.rejected, (state, action) => {
      state.status = "idle";
    });
  },
});
export const { setBasket, removeItem } = basketSlice.actions;
