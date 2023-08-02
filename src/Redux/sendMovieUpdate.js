import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import env from "../enviroinment";

// Action

export const handleSubmit = createAsyncThunk("handleSubmit", async ({ name, yearOfRelease,actors,producer}) => {
 await axios.put(`${env.apiurl}/movieAdmin/getDataForPutUpdate`,{
         name,
          yearOfRelease,
          actors,
          producer
       });
  console.log(name,"1");
});

const sendMovieUpdateInfo = createSlice({
  name: "sendMovieUpdate",
  initialState: {
    data: [],
  },
  extraReducers: (builder) => {
    builder.addCase(handleSubmit.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
  
  
});

export default sendMovieUpdateInfo.reducer;
