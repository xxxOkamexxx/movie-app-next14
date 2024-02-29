import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const BASE_IMG_URL = "https://image.tmdb.org/t/p/w500";

const API_KEY = process.env.NEXT_PUBLIC_API_URL


const TMDB_API = {
  BASE_URL,
  BASE_IMG_URL,
  API_KEY
}

export default TMDB_API