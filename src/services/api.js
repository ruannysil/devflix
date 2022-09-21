import axios from "axios";
// base da url: https://api.themoviedb.org/3/
// URL DA API: /movie/now_playing?api_key=75eddc206ffda5dd327101183d4e6b2f&language=pt-BR

// https://api.themoviedb.org/3/movie/now_playing?api_key=75eddc206ffda5dd327101183d4e6b2f&language=pt-BR


const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;