import axios from "axios";

const api = axios.create({
  url: 'https://deep-translate1.p.rapidapi.com/language/translate/v2/languages',
  headers: {
    "x-rapidapi-key": import.meta.env.VITE_API_KEY,
    "x-rapidapi-host": import.meta.env.VITE_API_HOST,
  },
});

export default api;
