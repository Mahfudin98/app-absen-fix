import $axios from '../api'
const state = () =>({
    absents: [],

    absent: {
        note: ''
    },

    page: 1,
    start: '',
    end: ''
})

const mutations = {
    ASSIGN_DATA(state, payload){
        state.absents = payload
    },

    SET_PAGE(state, payload){
        state.page = payload
    },
    ASSIGN_FORM(state, payload){
        state.absent = {
            note: payload.note
        }
    },
    CLEAR_FORM(state){
        state.absent = {
            note: ''
        }
    }
}

const actions = {
    getAbsents({ commit, state }, payload){
        let start = typeof payload != 'undefined' ? payload:''

        return new Promise((resolve, reject) => {
            $axios.get(`/absen-index?page=${state.page}&date=${start}+${start}`)
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
    submitAbsent({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            $axios.post(`/post-report-cs`, payload)
            .then((response) => {
                dispatch('getAbsents').then(() => {
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
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
}
