import $axios from '../api'

const state = () =>({
    types: [],

    type: {
        name: '',
    },

    page: 1,
})

const mutations = {
    ASSIGN_DATA(state, payload){
        state.types = payload
    },

    SET_PAGE(state, payload){
        state.page = payload
    },
    ASSIGN_FORM(state, payload){
        state.type = {
            name: payload.name,
        }
    },
    CLEAR_FORM(state){
        state.type = {
            name: '',
        }
    }
}

const actions = {
    getTypes({ commit, state }, payload){
        let search = typeof payload != 'undefined' ? payload:''
        return new Promise((resolve, reject) => {
            $axios.get(`/order-type?page=${state.page}&q=${search}`)
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

    submitType({ dispatch, commit, state }){
        return new Promise((resolve, reject) => {
            $axios.post(`/order-type`, state.type)
            .then((response)=>{
                dispatch('getTypes').then(()=>{
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

    editType({commit}, payload){
        return new Promise((resolve, reject) => {
            $axios.get(`/order-type/${payload}/edit`)
            .then((response) => {
                commit('ASSIGN_FORM', response.data.data)
                resolve(response.data)
            })
        })
    },

    updateType({state, commit}, payload){
        return new Promise((resolve, reject) => {
            $axios.put(`/order-type/${payload}`, state.type)
            .then((response) => {
                commit('CLEAR_FORM')
                resolve(response.data)
            })
        })
    },

    getListCategorys({ commit }){
        return new Promise((resolve, reject) => {
            $axios.get(`/order-type-list`)
            .then((response)=>{
                commit('ASSIGN_DATA', response.data)
                resolve(response.data)
            })
        })
    },
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
}
