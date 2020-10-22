import { ThunkAction } from "@reduxjs/toolkit";
import reducer from "./store/rootReducer";

export interface IProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

export type RootState = ReturnType<typeof reducer>;

export interface IGetProductsAction {
  type: string;
  payload?: IProduct[] | string;
}

export type IGetProductsThunk = ThunkAction<
  void,
  RootState,
  null,
  IGetProductsAction
>;
