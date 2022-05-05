import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { server } from "../../config";
import axios from "axios";

const LOCATIONS_URL = `${server}/api/locations`;

const initialState = {
  locations: [],
  status: "idle", //"idle | "loading" | "succeeded" | "failed"
  error: null,
};

export const fetchLocations = createAsyncThunk(
  "location/fetchLocation",
  async () => {
    try {
      const res = await axios.get(LOCATIONS_URL);
      return res.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    loadLocations: (state, action) => {
      state = action.payload;
    },
    locationAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(name, description) {
        return {
          payload: {
            id: nanoid,
            name,
            description,
          },
        };
      },
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchLocations.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.locations.push(...action.payload);
      })
      .addCase(fetchLocations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { locationAdded, loadLocations } = locationSlice.actions;

export const selectAllLocations = (state) => state.location.locations;
export const getLocationsStatus = (state) => state.location.status;
export const getLocationsError = (state) => state.location.error;

export default locationSlice.reducer;
