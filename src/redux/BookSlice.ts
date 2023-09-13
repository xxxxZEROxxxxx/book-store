import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Book } from "../types/Books";

type BookState = {
  books: Book[];
};
const initialValue: BookState = {
  books: [],
};


export const BookSlice = createSlice({
  name: "books",
  initialState: initialValue,
  reducers: {
    Data:(state, action: PayloadAction<Book[]>) => {
      state.books=action.payload;
      
    },
   
    remove: (state, action: PayloadAction<number>) => {
      const List = state.books.filter((el) => el.id !== action.payload);
      state.books = List;
     
    },
   
  },
});
export default BookSlice.reducer;
export const {  remove,Data } = BookSlice.actions;
