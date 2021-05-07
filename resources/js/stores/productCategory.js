import $axios from '../api'

const state = () =>({
    categorys: [],

    category: {
        name: '',
    },

    page: 1,
})

const mutations = {
    ASSIGN_DATA(state, payload){
        state.categorys = payload
    },

    SET_PAGE(state, payload){
        state.page = payload
    },
    ASSIGN_FORM(state, payload){
        state.category = {
            name: payload.name,
        }
    },
    CLEAR_FORM(state){
        state.category = {
            name: '',
        }
    }
}

const actions = {
    getCategorys({ commit, state }, payload){
        let search = typeof payload != 'undefined' ? payload:''
        return new Promise((resolve, reject) => {
            $axios.get(`/product-category?page=${state.page}&q=${search}`)
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

    submitCategory({ dispatch, commit, state }){
        return new Promise((resolve, reject) => {
            $axios.post(`/product-category`, state.category)
            .then((response)=>{
                dispatch('getCategorys').then(()=>{
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

    editCategory({commit}, payload){
        return new Promise((resolve, reject) => {
            $axios.get(`/product-category/${payload}/edit`)
            .then((response) => {
                commit('ASSIGN_FORM', response.data.data)
                resolve(response.data)
            })
        })
    },

    updateCategory({state, commit}, payload){
        return new Promise((resolve, reject) => {
            $axios.put(`/product-category/${payload}`, state.category)
            .then((response) => {
                commit('CLEAR_FORM')
                resolve(response.data)
            })
        })
    },

    getListCategorys({ commit }){
        return new Promise((resolve, reject) => {
            $axios.get(`/product-category-list`)
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
