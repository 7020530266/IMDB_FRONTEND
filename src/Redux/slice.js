import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import env from "../enviroinment";

// Action
export const fetchTodos = createAsyncThunk("fetchTodos", async () => {
  let res = await axios.get(`${env.apiurl}/movieAdmin/getMovieData1`);
 return res.data.data;
});

export const handleDelete = createAsyncThunk("handleDelete", async (id) => {
  let res =  await axios.delete(`${env.apiurl}/movieAdmin/deleteMovie/${id}`);
  if (res.data.statusCode === 200) {
    // loadData();
   } else {
     alert(res.data.message);
   }
});




const sliceInfo = createSlice(
  {
  name: "slice",
  initialState: {
    data: [],
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    //  builder.addCase(fetchTodos.fulfilled, (state, action) => {
    //     state.data = action.payload;
    //   }),
  },
},
);



export default sliceInfo.reducer

