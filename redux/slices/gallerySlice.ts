import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Image {
  id: string;
  url: string;
  title: string;
}

interface GalleryState {
  images: Image[];
  loading: boolean;
  error: string | null;
}

const initialState: GalleryState = {
  images: [],
  loading: false,
  error: null,
};

export const fetchImages = createAsyncThunk("gallery/fetchImages", async () => {
  const response = await axios.get("https://rickandmortyapi.com/api/character");

  return response.data.results.slice(0, 10).map((character: any) => ({
    id: character.id.toString(),
    url: character.image, 
  }));

});


const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.loading = false;
        state.images = action.payload;
      })
      .addCase(fetchImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erro ao buscar imagens.";
      });
  },
});

export default gallerySlice.reducer;
