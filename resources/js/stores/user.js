import $axios from '../api.js'

const state = () => ({
    users: [],
    roles: [],
    permissions: [],
    role_permission: [],
    authenticated: [],
    position: [],

    role: {
        name: '',
    },
})

const mutations = {
    ASSIGN_USER(state, payload) {
        state.users = payload
    },
    ASSIGN_ROLES(state, payload) {
        state.roles = payload
    },
    ASSIGN_PERMISSION(state, payload) {
        state.permissions = payload
    },
    ASSIGN_ROLE_PERMISSION(state, payload) {
        state.role_permission = payload
    },
    CLEAR_ROLE_PERMISSION(state, payload) {
        state.role_permission = []
    },
    ASSIGN_USER_AUTH(state, payload) {
        state.authenticated = payload
    },

    // assign for add data role
    ASSIGN_FORM(state, payload){
        state.role = {
            name: payload.name
        }
    },
    CLEAR_FORM(state){
        state.role = {
            name: ''
        }
    }
}

const actions = {
    getUserLists({ commit }) {
        return new Promise((resolve, reject) => {
            $axios.get(`/user-lists`)
            .then((response) => {
                commit('ASSIGN_USER', response.data.data)
                resolve(response.data)
            })
        })
    },
    setRoleUser({commit}, payload) {
        return new Promise((resolve, reject) => {
            commit('CLEAR_ERRORS', '', {root: true})
            $axios.post(`/set-role-user`, payload)
            .then((response) => {
                resolve(response.data)
            })
            .catch((error) => {
                if (error.response.status == 422) {
                    commit('SET_ERRORS', error.response.data.errors, { root: true })
                }
            })
        })
    },
    getRoles({ commit }) {
        return new Promise((resolve, reject) => {
            $axios.get(`/roles`)
            .then((response) => {
                commit('ASSIGN_ROLES', response.data.data)
                resolve(response.data)
            })
        })
    },
    getAllPermission({ commit }) {
        return new Promise((resolve, reject) => {
            $axios.get(`/permissions`)
            .then((response) => {
                commit('ASSIGN_PERMISSION', response.data.data)
                resolve(response.data)
            })
        })
    },
    getRolePermission({ commit }, payload) {
        return new Promise((resolve, reject) => {
            commit('CLEAR_ERRORS', '', {root: true})
            $axios.post(`/role-permission`, {role_id: payload})
            .then((response) => {
                commit('ASSIGN_ROLE_PERMISSION', response.data.data)
                resolve(response.data)
            })
        })
    },
    setRolePermission({ commit }, payload) {
        return new Promise((resolve, reject) => {
            commit('CLEAR_ERRORS', '', {root: true})
            $axios.post(`/set-role-permission`, payload)
            .then((response) => {
                resolve(response.data)
            })
            .catch((error) => {
                if (error.response.status == 422) {
                    commit('SET_ERRORS', error.response.data.errors, { root: true })
                }
            })
        })
    },
    getUserLogin({ commit }) {
        return new Promise((resolve, reject) => {
            $axios.get(`user-authenticated`)
            .then((response) => {
                commit('ASSIGN_USER_AUTH', response.data.data)
                resolve(response.data)
            })
        })
    },
    // function add data
    submitRole({ dispatch, commit, state }){
        return new Promise((resolve, reject) => {
            $axios.post(`/role-create`, state.role)
            .then((response)=>{
                dispatch('getRoles').then(()=>{
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
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
