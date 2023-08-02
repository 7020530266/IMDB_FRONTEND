import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import env from "../enviroinment";

// Action
export const fetchData = createAsyncThunk("fetchData", async () => {
  let res = await axios.get(`${env.apiurl}/movieAdmin/getMovieData1`);
  return res.data.data;
});

export const loadProducer = createAsyncThunk("loadProducer", async () => {
  let res = await axios.get(`${env.apiurl}/producer/movieProducers`);
  return res.data.data;
});

export const loadActors = createAsyncThunk("loadActors", async () => {
  let res = await axios.get(`${env.apiurl}/actor/movieActors`);
  return res.data.data;
});

export const handleSubmit = createAsyncThunk(
  "handleSubmit",
  async ({ name, yearOfRelease, actors, producer }) => {
    let Name = name;
    let YearOfRelease = yearOfRelease;
    let Actors = actors.join(",");
    let Producer = producer;
    await axios.post(`${env.apiurl}/movieAdmin/postDataForMovie`, {
      Name,
      YearOfRelease,
      Actors,
      Producer,
    });
  }
);

export const handleSubmit1 = createAsyncThunk(
  "handleSubmit1",
  async ({ actorName, gender, dob, bio }) => {
    let ActorName = actorName;
    let BIO = bio;
    let DOB = dob;
    let Gender = gender;
    await axios.post(`${env.apiurl}/actor/sendActorData`, {
      ActorName,
      BIO,
      DOB,
      Gender,
    });
    loadActors();
  }
);

export const handleSubmit2 = createAsyncThunk(
  "handleSubmit2",
  async ({ producerName, producerGender, producerDob, producerBio }) => {
    await axios.post(`${env.apiurl}/producer/sendProducerData`, {
      producerName,
      producerGender,
      producerDob,
      producerBio,
    });
    loadProducer();
  }
);

//       setData(res.data.data);
//       loadActors()
//     } else {
//       alert(res.data.message);
//     }
//    };

// let loadActors = async () => {
//     let res = await axios.get(`${env.apiurl}/actor/movieActors`);
//     if (res.data.statusCode === 200 || 304) {
//       setValue(res.data.data);
//     } else {
//       alert(res.data.message);
//     }
//    };

//    let loadProducer = async () => {
//     let res = await axios.get(`${env.apiurl}/producer/movieProducers`);
//     if (res.data.statusCode === 200 || 304) {
//       setValuePro(res.data.data);
//     } else {
//       alert(res.data.message);
//     }
//    };

const addMovieSlice = createSlice({
  name: "AddMovie",
  initialState: {
    data: [],
    actorData1: [],
    producerData1: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(loadActors.fulfilled, (state, action) => {
        state.actorData1 = action.payload;
      })
      .addCase(loadProducer.fulfilled, (state, action) => {
        state.producerData1 = action.payload;
      })
      .addCase(handleSubmit.fulfilled, (state, action) => {})
      .addCase(handleSubmit1.fulfilled, (state, action) => {})
      .addCase(handleSubmit2.fulfilled, (state, action) => {});
  },
});

export default addMovieSlice.reducer;
