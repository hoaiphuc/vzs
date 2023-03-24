import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { getBuildings, createBuilding, deleteBuilding } from '../services/building.service';

const initialState = { 
  buildings: [],
  status: 'idle',
  error: null,
};

export const fetchBuildings = createAsyncThunk('buildings/fetchBuildings', async () => {
  const buildings = await getBuildings();
  console.log("first: ", buildings)
  return buildings;
});

const buildingsSlice = createSlice({
  name: 'buildings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBuildings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBuildings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.buildings = action.payload;
      })
      .addCase(fetchBuildings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  },
});

export default buildingsSlice.reducer;

export const selectAllBuilding = createSelector(
  (state) => state.building.buildings,
  (buildings) => {
    if (Array.isArray(buildings)) {
      return buildings;
    }
    return [];
  }
);

