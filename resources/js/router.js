import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/Home'
import Login from './pages/Login.vue'
import store from './store.js'

// import page position
import IndexPosition from './pages/positions/Index'
import DataPosition from './pages/positions/Position'
import EditPosition from './pages/positions/Edit'

// import page for setting
import Setting from './pages/settings/Index.vue'
import SetPermission from './pages/settings/roles/SetPermission.vue'
import AddRole from './pages/settings/roles/IndexRole.vue'

// import page for employe
import IndexEmploye from './pages/employes/IndexEmploye'
import DataEmploye from './pages/employes/DataEmploye'
import AddEmploye from './pages/employes/AddEmploye'
import EditEmployes from './pages/employes/Edit'

// import page for project
import IndexProject from './pages/project/IndexProject.vue'
// import page for project dev
import IndexDev from './pages/project/dev/IndexDev.vue'
// import page for project creator
import IndexCreator from './pages/project/creator/IndexCreator.vue'

// import page for absen
import IndexAbsen from './pages/absen/IndexAbsen.vue'
import Absen from './pages/absen/Absen.vue'

// import page for salary
import IndexSalary from './pages/salary/IndexSalary.vue'
import Salary from './pages/salary/Salary.vue'

// import page for not found
import NotFound from './components/NotFound'

Vue.use(Router)

//DEFINE ROUTE
const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '*',
            component: NotFound
        },
        {
            path: '/',
            redirect: '/dashboard',
            meta: { requiresAuth: true }
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: Home,
            meta: { requiresAuth: true }
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        // path for page position
        {
            path: '/position',
            component: IndexPosition,
            meta: { requiresAuth: true },
            children: [
                {
                    path: '',
                    name: 'positions.data',
                    component: DataPosition,
                    meta: { title: 'Manage Position' }
                },
                {
                    path: 'edit/:id',
                    name: 'positions.edit',
                    component: EditPosition,
                    meta: { title: 'Edit Position' }
                }
            ]
        },
        // path for page employe
        {
            path: '/employes',
            component: IndexEmploye,
            meta: { requiresAuth: true },
            children: [
                {
                    path: '',
                    name: 'employes.data',
                    component: DataEmploye,
                    meta: { title: 'Manage Employes' }
                },

                {
                    path: 'add',
                    name: 'employes.add',
                    component: AddEmploye,
                    meta: { title: 'Add Employes'}
                },

                {
                    path: 'edit/:id',
                    name: 'employes.edit',
                    component: EditEmployes,
                    meta: { title: 'Edit Employe' }
                },
            ]
        },
        // path for page settings
        {
            path: '/setting',
            component: Setting,
            meta: { requiresAuth: true },
            children: [
                {
                    path: 'role-permission',
                    name: 'role.permissions',
                    component: SetPermission,
                    meta: { title: 'Set Permissions' }
                },
                {
                    path: 'role-add',
                    name: 'add.permission',
                    component: AddRole,
                    meta: { title: 'Add Permissions' }
                }
            ]
        },
        // path for page Project
        {
            path: '/project',
            component: IndexProject,
            meta: { requiresAuth: true },
            children: [
                {
                    path: 'dev-project',
                    name: 'dev.project',
                    component: IndexDev,
                    meta: { title: 'Depelover Project' }
                },
                {
                    path: 'creatror-project',
                    name: 'creatore.project',
                    component: IndexCreator,
                    meta: { title: 'Creator Project' }
                }
            ]
        },
        // path for page Absen
        {
            path: '/absen',
            component: IndexAbsen,
            meta: { requiresAuth: true },
            children: [
                {
                    path: '',
                    name: 'absen.index',
                    component: Absen,
                    meta: { title: 'Absen Index'}
                }
            ]
        },
        // path for page salary
        {
            path: '/salary',
            component: IndexSalary,
            meta: { requiresAuth: true },
            children: [
                {
                    path: '',
                    name: 'salary.index',
                    component: Salary,
                    meta: { title: 'Salary Index'}
                }
            ]
        }
    ]
});

//Navigation Guards
router.beforeEach((to, from, next) => {
    store.commit('CLEAR_ERRORS')
    if (to.matched.some(record => record.meta.requiresAuth)) {
        let auth = store.getters.isAuth
        if (!auth) {
            next({ name: 'login' })
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router
