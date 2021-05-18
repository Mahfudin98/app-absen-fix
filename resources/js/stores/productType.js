import $axios from '../api'

const state = () =>({
    typeProducts: [],

    typeProduct: {
        name: '',
        product_category_id: ''
    },

    page: 1,
})

const mutations = {
    ASSIGN_DATA(state, payload){
        state.typeProducts = payload
    },

    SET_PAGE(state, payload){
        state.page = payload
    },
    ASSIGN_FORM(state, payload){
        state.typeProduct = {
            name: payload.name,
            product_category_id: payload.product_category_id
        }
    },
    CLEAR_FORM(state){
        state.typeProduct = {
            name: '',
            product_category_id: ''
        }
    }
}

const actions = {
    getTypesProduct({ commit, state }, payload){
        let search = typeof payload != 'undefined' ? payload:''
        return new Promise((resolve, reject) => {
            $axios.get(`/product-type?page=${state.page}&q=${search}`)
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
            $axios.post(`/product-type`, state.type)
            .then((response)=>{
                dispatch('getTypesProduct').then(()=>{
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
            $axios.get(`/product-type/${payload}/edit`)
            .then((response) => {
                commit('ASSIGN_FORM', response.data.data)
                resolve(response.data)
            })
        })
    },

    updateType({state, commit}, payload){
        return new Promise((resolve, reject) => {
            $axios.put(`/product-type/${payload}`, state.type)
            .then((response) => {
                commit('CLEAR_FORM')
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
