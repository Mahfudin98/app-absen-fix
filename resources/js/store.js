import Vue from 'vue'
import Vuex from 'vuex'

//IMPORT MODULE SECTION
import auth from './stores/auth.js'
import position from './stores/position.js'
import user from './stores/user'
import employe from './stores/employe'
import project from './stores/project'
import absent from './stores/absent'
import taskproject from './stores/taskproject'
// import for report
import reportCs from './stores/report/reportCs'
import reportAdv from './stores/report/reportAdv'
// import product category
import productCategory from './stores/productCategory'
// import product type
import productType from './stores/productType'
// import order type
import orderType from './stores/orderType'

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
        productCategory,
        productType,
        orderType,
        absent,
        // store report
        reportCs,
        reportAdv
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
