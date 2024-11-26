import { createSlice, createAction } from "@reduxjs/toolkit";

const createCartItem = createAction("cart/createCartItem");
const deleteFromCart = createAction("cart/deleteFromCart");

const initialState = {
  items: undefined,
};

export const products = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProducts: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCartItem, (state, action) => {
        state.items.find((el) => el.id === action.payload.id).picked = true;
      })
      .addCase(deleteFromCart, (state, action) => {
        state.items.find((el) => el.id === action.payload).picked = false;
      });
  },
});

export function getProductsList() {
  return async function (dispatch, getState) {
    const baseUrl = import.meta.env.BASE_URL;
    const response = await fetch(
      window.location.host.includes(baseUrl)
        ? "/data/inventory.json"
        : `${baseUrl}/data/inventory.json`
    );
    const data = await response.json();
    dispatch(addProducts(data.products));
  };
}

export const { addProducts } = products.actions;
export default products.reducer;
