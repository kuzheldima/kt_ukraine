import axios from '@/plugins/axios';

export const getMovies = (page) => axios.get(`/movie/popular?page=${page}`).then(({ data }) => data);
export const getSimilarMovies = (id) => axios.get(`/movie/${id}/similar`).then(({ data }) => data.results);
export const getMovie = (id) => axios.get(`/movie/${id}`).then(({ data }) => data);
export const getMovieImages = (id) => axios.get(`/movie/${id}/images`).then(({ data }) => data.posters);
