import $axios from '../../api'
const state = () =>({
    reports: [],

    report: {
        chat: '',
        lead_masuk: '',
        order: '',
        jml_transaksi: '',
        omset: '',
        detail_order: '',
        keterangan: ''
    },

    page: 1,
    start: '',
    end: ''
})

const mutations = {
    ASSIGN_DATA(state, payload){
        state.reports = payload
    },

    SET_PAGE(state, payload){
        state.page = payload
    },
    ASSIGN_FORM(state, payload){
        state.report = {
            chat: payload.chat,
            lead_masuk: payload.lead_masuk,
            order: payload.order,
            jml_transaksi: payload.jml_transaksi,
            omset: payload.omset,
            detail_order: payload.detail_order,
            keterangan: payload.keterangan
        }
    },
    CLEAR_FORM(state){
        state.report = {
            chat: '',
            lead_masuk: '',
            order: '',
            jml_transaksi: '',
            omset: '',
            detail_order: '',
            keterangan: ''
        }
    }
}

const actions = {
    getReports({ commit, state }, payload){
        let start = typeof payload != 'undefined' ? payload:''

        return new Promise((resolve, reject) => {
            $axios.get(`/report-cs?page=${state.page}&date=${start}+${start}`)
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
    submitReportCs({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            $axios.post(`/post-report-cs`, payload)
            .then((response) => {
                dispatch('getReports').then(() => {
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
