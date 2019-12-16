import { getMovies } from '@/api/movies';

const SET_MOVIES = 'SET_MOVIES';
const SET_PAGES = 'SET_PAGES';

export const FETCH_MOVIES = 'FETCH_MOVIES';

const getters = {
  movies: state => Object.values(state.movies),
  pages: state => state.pages
};

const mutations = {
  [SET_MOVIES]: (state, movies) => {
    state.movies = movies;
  },
  [SET_PAGES]: (state, pages) => {
  	state.pages = pages;
  }
};

const actions = {
  [FETCH_MOVIES]: async ({ commit }, page) => {
    const response = await getMovies(page);
    commit(SET_MOVIES, response.results);
    commit(SET_PAGES, response.total_pages);
  },
};

const state = () => ({
  movies: [],
  pages: 1,
});

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
