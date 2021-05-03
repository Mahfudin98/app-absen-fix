import Vue from 'vue'
import Vuex from 'vuex'

//IMPORT MODULE SECTION
import auth from './stores/auth.js'
import position from './stores/position.js'
import user from './stores/user'
import employe from './stores/employe'
import project from './stores/project'
import taskproject from './stores/taskproject'
// import for report
import reportCs from './stores/report/reportCs'

Vue.use(Vuex)

//DEFINE ROOT STORE VUEX
const store = new Vuex.Store({
    modules: {
        auth,
        position,
        user,
        employe,
        project,
        taskproject,
        reportCs
    },
    state: {
        token: localStorage.getItem('token'),
        errors: []
    },
    getters: {
        isAuth: state => {
            return state.token != "null" && state.token != null
        }
    },
    mutations: {
        SET_TOKEN(state, payload) {
            state.token = payload
        },
        SET_ERRORS(state, payload) {
            state.errors = payload
        },
        CLEAR_ERRORS(state) {
            state.errors = []
        }
    }
})

export default store
