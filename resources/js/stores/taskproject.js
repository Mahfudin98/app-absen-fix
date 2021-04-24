import $axios from '../api'

const state = () => ({
    taskproject: [],
    id: '',
    slug: ''
})

const mutations = {
    ASSIGN_DATA(state, payload){
        state.taskproject = payload
    },
    ASSIGN_SLUG_DATA(state, payload){
        state.slug = payload
    },
}

const actions = {
    viewDev({ commit }, payload){
        return new Promise((resolve, reject)=>{
            $axios.get(`/dev-view/${payload}`)
            .then((response)=> {
                commit('ASSIGN_SLUG_DATA', response.data.data)
                resolve(response.data)
            })
        })
    },
    submitTaskProjectDev({ dispatch, commit }, payload){
        return new Promise((resolve, reject) => {
            $axios.post(`/dev-post`, payload)
            .then((response) => {
                dispatch('viewDev').then(() => {
                    resolve(response.data)
                })
            })
            .catch((error) => {
                if (error.response.status == 422) {
                    commit('ST_ERRORS', error.response.data.errors, { root: true })
                }
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
