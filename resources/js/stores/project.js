import $axios from '../api.js'
import user from './user'

const state = () => ({
    projects: [],
    page: 1,
    id: '',
})

const mutations = {
    ASSIGN_DATA(state, payload) {
        state.projects = payload
    },
    SET_PAGE(state, payload) {
        state.page = payload
    },
    SET_ID_UPDATE(state, payload) {
        state.id = payload
    }
}

const actions = {
    getProjects({ commit, state }, payload) {
        let search = typeof payload != 'undefined' ? payload:''
        return new Promise((resolve, reject) => {
            $axios.get(`/projects?page=${state.page}&q=${search}`)
            .then((response) => {
                commit('ASSIGN_DATA', response.data)
                resolve(response.data)
            })
        })
    },
    submitProject({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            $axios.post(`/projects`, payload, {

            })
            .then((response) => {
                dispatch('getProjects').then(() => {
                    resolve(response.data)
                })
            })
            .catch((error) => {
                if (error.response.status == 422) {
                    commit('SET_ERRORS', error.response.data.errors, { root: true })
                }
            })
        })
    },
    editEmploye({ commit }, payload) {
        return new Promise((resolve, reject) => {
            $axios.get(`/employes/${payload}/edit`)
            .then((response) => {
                resolve(response.data)
            })
        })
    },
    updateEmploye({ state }, payload) {
        return new Promise((resolve, reject) => {
            $axios.post(`/employes/${state.id}`, payload, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((response) => {
                resolve(response.data)
            })
        })
    },
    removeEmploye({ dispatch }, payload) {
        return new Promise((resolve, reject) => {
            $axios.delete(`/employes/${payload}`)
            .then((response) => {
                dispatch('getEmployes').then(() => resolve(response.data))
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
