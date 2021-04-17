import $axios from '../api'

const state = () =>({
    projects: [],

    project: {
        project_name: '',
        description: '',
    },

    page: 1,
})

const mutations = {
    ASSIGN_DATA(state, payload){
        state.projects = payload
    },

    SET_PAGE(state, payload){
        state.page = payload
    },
    ASSIGN_FORM(state, payload){
        state.project = {
            project_name: payload.project_name,
            description: payload.description
        }
    },
    CLEAR_FORM(state){
        state.project = {
            project_name: '',
            description: ''
        }
    }
}

const actions = {
    getProject({ commit, state }, payload){
        let search = typeof payload != 'undefined' ? payload:''
        return new Promise((resolve, reject) => {
            $axios.get(`/project?page=${state.page}&q=${search}`)
            .then((response)=>{
                commit('ASSIGN_DATA', response.data)
                resolve(response.data)
            })
        })
        .catch((error)=>{
            if (error.response.status == 422) {
                commit('SET_ERRORS', error.response.data.errors, {root:true})
            }
        })
    },

    submitProject({ dispatch, commit, state }){
        return new Promise((resolve, reject) => {
            $axios.post(`/project`, state.project)
            .then((response)=>{
                dispatch('getProjects').then(()=>{
                    commit('CLEAR_FORM')
                    resolve(response.data)
                })
            })
            .catch((error)=>{
                if (error.response.status = 422) {
                    commit('SET_ERRORS', error.response.data.errors, {root:true})
                }
            })
        })
    },

    // editPosition({commit}, payload){
    //     return new Promise((resolve, reject) => {
    //         $axios.get(`/positions/${payload}/edit`)
    //         .then((response) => {
    //             commit('ASSIGN_FORM', response.data.data)
    //             resolve(response.data)
    //         })
    //     })
    // },

    // updatePosition({state, commit}, payload){
    //     return new Promise((resolve, reject) => {
    //         $axios.put(`/positions/${payload}`, state.position)
    //         .then((response) => {
    //             commit('CLEAR_FORM')
    //             resolve(response.data)
    //         })
    //     })
    // },

    // removePosition({ dispatch }, payload){
    //     return new Promise((resolve, reject) => {
    //         $axios.delete(`/positions/${payload}`)
    //         .then((response) => {
    //             dispatch('getPositions').then(() => resolve())
    //         })
    //     })
    // }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
}
