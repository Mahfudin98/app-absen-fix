import $axios from '../api.js'

const state = () => ({
    projects: [],
    page: 1,
    id: '',
    slug: '',
    data: ''
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
    },
    ASSIGN_SLUG_DATA(state, payload){
        state.slug = payload
    },
    ASSIGN_DATA_SLUG(state,payload){
        state.data = payload
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
    // submit project dev
    submitProjectDev({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            $axios.post(`/projects-dev`, payload, {

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
    viewDev({ commit }, payload){
        return new Promise((resolve, reject)=>{
            $axios.get(`/dev-view/${payload}`)
            .then((response)=> {
                commit('ASSIGN_SLUG_DATA', response.data.data)
                resolve(response.data)
            })
        })
    },
    viewProjectDev({ commit }, payload){
        return new Promise((resolve, reject)=>{
            $axios.get(`/dev-project/${payload}`)
            .then((response)=> {
                commit('ASSIGN_DATA_SLUG', response.data.data)
                resolve(response.data)
            })
        })
    },
    editProjectDev({ commit }, payload) {
        return new Promise((resolve, reject) => {
            $axios.get(`/projects/${payload}/edit`)
            .then((response) => {
                resolve(response.data)
            })
        })
    },
    updateProjectDev({ state }, payload) {
        return new Promise((resolve, reject) => {
            $axios.post(`/projects/${state.id}`, payload, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((response) => {
                resolve(response.data)
            })
        })
    },
    removeProjectDev({ dispatch }, payload) {
        return new Promise((resolve, reject) => {
            $axios.delete(`/projects/${payload}`)
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
