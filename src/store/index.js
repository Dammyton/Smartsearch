import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    countries: [],
    states:[],
    cities: []
  },
  getters: {
    // Get All Countries
    getCountries: (state) => {
      state.states = ""
      return state.countries
    },
    getStates: (state) => {
      state.cities = ""
      return state.states
    },
    getCities: (state) => {
      return state.cities
    }
  },
  mutations: {
    ADD_COUNTRIES(state, countrieslist) {
      state.countries = countrieslist
    },
    SET_COUNTRIES(state, country) {
      state.states = country.states
    },
    SET_STATES(state, state_) {
      state.cities = state_.cities
    }
  },
  actions: {
    // Load All Countries
    loadCountries({ commit }) {
      axios
        .get('https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries%2Bstates%2Bcities.json ')
        .then(response => response.data)
        // console.log(response.data, "countries")
        .then(countrieslist => {
          commit('ADD_COUNTRIES', countrieslist)

        })
    },
    selectCountry({ commit, state }, selected) {
      if (selected) {
        var str = selected.selected.toString()
        str = str.replace(/\s/g, '/')

        var country = state.countries.find((e) => e.name == str)
        commit('SET_COUNTRIES', country)
      }
    },
    selectState({ commit, state }, selected) {
      if (selected) {
        var str_ = selected.selected.toString()
        str_ = str_.replace(/\s/g, '/')

        var state_ = state.states.find((e) => e.name == str_)
        console.log(state_,str_, state.states,"st")
        commit('SET_STATES', state_)
      }
    },

  },
  modules: {
  }
})
