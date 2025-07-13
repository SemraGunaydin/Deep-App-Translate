import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const getLanguages = createAsyncThunk("language/getLanguages", async () => {
  return [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    // ...
  ];
});

export const translateText = createAsyncThunk(
  "translate/translateText",
  async (_, { getState }) => {
    const { translate } = getState();

    const res = await api.post("", {
      q: translate.textToTranslate,
      source: translate.sourceLang.value,
      target: translate.targetLang.value,
    });

    return res.data.data.translations[0].translatedText;
  }
);