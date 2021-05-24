import $axios from '../../api'
const state = () =>({
    reportsAdv: [],

    reportAdv: {
        result_dashboard : '' ,
        cpr              : '' ,
        cp_wa            : '' ,
        amount_spent     : '' ,
        keterangan       : ''
    },

    page: 1,
    start: '',
    end: ''
})

const mutations = {
    ASSIGN_DATA(state, payload){
        state.reportsAdv = payload
    },

    SET_PAGE(state, payload){
        state.page = payload
    },
    ASSIGN_FORM(state, payload){
        state.reportAdv = {
            result_dashboard : payload.result_dashboard ,
            cpr              : payload.cpr ,
            cp_wa            : payload.cp_wa ,
            amount_spent     : payload.amount_spent ,
            keterangan       : payload.keterangan
        }
    },
    CLEAR_FORM(state){
        state.reportAdv = {
            result_dashboard : '' ,
            cpr              : '' ,
            cp_wa            : '' ,
            amount_spent     : '' ,
            keterangan       : ''
        }
    }
}

const actions = {
    getReportAdv({ commit, state }, payload){
        let start = typeof payload != 'undefined' ? payload:''

        return new Promise((resolve, reject) => {
            $axios.get(`/report-adv?page=${state.page}&date=${start}+${start}`)
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
    submitReportAdv({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            $axios.post(`/post-report-adv`, payload)
            .then((response) => {
                dispatch('getReportAdv').then(() => {
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
