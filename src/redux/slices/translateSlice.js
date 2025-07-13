import { createSlice } from "@reduxjs/toolkit";
import { translateText } from "../actions";

const initialState = {
  isLoading: false,
  sourceLang: { value: undefined, label: "Detect Language" },
  targetLang: { value: "en", label: "English" },
  textToTranslate: "",
  translatedText: "",
};

const translateSlice = createSlice({
  name: "translate",
  initialState,
  reducers: {
    setSource: (state, action) => {
      state.sourceLang = action.payload;
    },
    setTarget: (state, action) => {
      state.targetLang = action.payload;
    },
    setText: (state, action) => {
      state.textToTranslate = action.payload;
    },
    swap: (state) => {
      // statlarin suanki degerlerini degiskene aktarma
      const currentSource = state.sourceLang;
      const currentTarget = state.targetLang;
      const currentText = state.textToTranslate;
      const currentTranslated = state.translatedText;

      // statleri degistirme
      state.sourceLang = currentSource;
      state.targetLang = currentTarget;
      state.textToTranslate = currentTranslated;
      state.translatedText = currentText;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(translateText.pending, (state) => {
      state.isLoading = true;
      state.translatedText = "";
    });

    builder.addCase(translateText.rejected, (state) => {
      state.isLoading = false;
      alert("translate failed");
    });

    builder.addCase(translateText.fulfilled, (state, action) => {
      state.isLoading = false;
      state.translatedText = action.payload;
    });
  },
});

export const { setSource, setTarget, setText, swap } = translateSlice.actions;
export default translateSlice.reducer;
