import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import env from "../enviroinment";

// Action

export const showDetail = createAsyncThunk("showDetail", async (id) => {
  let res = await axios.get(`${env.apiurl}/movieAdmin/getDataForPut/${id}`);

  return res.data;
});

const showDetailInfo = createSlice({
  name: "showDetail",
  initialState: {
    data: [],
  },
  extraReducers: (builder) => {
    builder.addCase(showDetail.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
  
  
});

export default showDetailInfo.reducer;
