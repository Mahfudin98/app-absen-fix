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
    SET_SLUG(state, payload) {
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
    submitTaskProjectDev({ dispatch, commit, state }, payload){
        return new Promise((resolve, reject) => {
            $axios.post(`/dev-post`, payload)
            .then((response) => {
                dispatch('viewDev', state.slug).then(() => {
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
    deleteTaskDev({ dispatch, state }, payload){
        return new Promise((resolve, reject) => {
            $axios.delete(`/dev-delete/${payload}`)
            .then((response) => {
                dispatch('viewDev', state.slug).then(() => resolve())
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
