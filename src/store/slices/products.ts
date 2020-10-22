import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { IGetProductsThunk, IProduct } from "../../type";

const slice = createSlice({
  name: "products",
  initialState: {
    list: [] as IProduct[],
    loading: false,
    keyword: null as string | null,
    error: null as string | null,
  },
  reducers: {
    requestProducts: (products) => {
      products.loading = true;
    },
    requestProductsFailed: (products, action) => {
      products.loading = false;
      products.error = action.payload;
    },
    requestProductsSuccess: (products, action: PayloadAction<IProduct[]>) => {
      products.loading = false;
      products.list = action.payload;
      products.error = null;
    },
    resetKeyWord: (products) => {
      products.keyword = null;
    },
    getKeyWord: (products, action: PayloadAction<string>) => {
      products.keyword = action.payload;
    },
  },
});

export default slice.reducer;

const {
  requestProducts,
  requestProductsFailed,
  requestProductsSuccess,
} = slice.actions;

export const { getKeyWord, resetKeyWord } = slice.actions;

export const loadProducts = (): IGetProductsThunk => async (dispatch) => {
  dispatch(requestProducts());
  try {
    const { data } = await axios({
      url: "http://localhost:3000/api/products",
    });
    dispatch(requestProductsSuccess(data || []));
  } catch (error) {
    dispatch(requestProductsFailed(error.message));
  }
};