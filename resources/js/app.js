/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

// require('./bootstrap');

window.Vue = require('vue').default;

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
import Vue from 'vue'
import router from './router.js'
import store from './store.js'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import VueSweetalert2 from 'vue-sweetalert2';
import VueClock from '@dangvanthanh/vue-clock';
import 'sweetalert2/dist/sweetalert2.min.css';
import '@mdi/font/css/materialdesignicons.css'
import Permissions from './mixins/permission.js'
Vue.mixin(Permissions)
Vue.use(VueClock);
import { mapActions, mapGetters } from 'vuex'

Vue.use(VueSweetalert2);
Vue.use(BootstrapVue)

// import 'bootstrap-vue/dist/bootstrap-vue.css'
// vuesax css style
import Vuesax from 'vuesax'

import 'vuesax/dist/vuesax.css' //Vuesax styles
Vue.use(Vuesax, {
    colors: {
        primary:'#5b3cc4',
        success:'rgb(23, 201, 100)',
        danger:'rgb(242, 19, 93)',
        warning:'rgb(255, 130, 0)',
        dark:'rgb(36, 33, 69)'
    }
})

var numeral = require("numeral");

Vue.filter("formatNumber", function (value) {
    return numeral(value).format("0,0");
});
Vue.use(require('vue-moment'));

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

new Vue({
    el: '#app-absen',
    router,
    store,
    vuetify: new Vuetify(),
    iconfont: 'mdi',
    components: {
        App
    },
    computed: {
        ...mapGetters(['isAuth'])
    },
    methods: {
        ...mapActions('user', ['getUserLogin'])
    },
    created() {
        if (this.isAuth) {
            this.getUserLogin()
        }
    }
});
