const BASE_URL = "https://api.themoviedb.org/3";
const BASE_IMG_URL = "https://image.tmdb.org/t/p/w500";

const API_KEY = process.env.NEXT_PUBLIC_API_URL


const TMDB_API = {
  BASE_URL,
  BASE_IMG_URL,
  API_KEY
}

export default TMDB_API

function setupAnalyticsService(NEXT_PUBLIC_API_URL: string | undefined) {
  throw new Error("Function not implemented.");
}
