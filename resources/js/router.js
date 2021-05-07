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
import IndexTaskDev from './pages/project/dev/tasks/IndexTasks'
// import page for project creator
import IndexCreator from './pages/project/creator/IndexCreator.vue'

// import page for absen
import IndexAbsen from './pages/absen/IndexAbsen.vue'
import Absen from './pages/absen/Absen.vue'

// import page for salary
import IndexSalary from './pages/salary/IndexSalary.vue'
import Salary from './pages/salary/Salary.vue'

// import page for report
import IndexReport from './pages/reports/IndexReport.vue'
// import page for report adv
import ADVReport from './pages/reports/adv/IndexAdv.vue'
// import page for report cs
import CSReport from './pages/reports/cs/IndexCS.vue'
// import page for report manager
import ManagerReport from './pages/reports/manager/IndexManager.vue'
// import page for report sdm
import SDMReport from './pages/reports/sdm/IndexSDM.vue'
// import page for report shed
import ShedReport from './pages/reports/shed/IndexShed.vue'

// import page for not found
import NotFound from './components/NotFound'

// import page for product
import IndexProduct from './pages/admin/product/Index.vue'
import IndexProductCategory from './pages/admin/product/productCategory/Index.vue'
import EditProductCategory from './pages/admin/product/productCategory/Edit.vue'
import IndexProductType from './pages/admin/product/productType/Index.vue'

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
                // path for tasks project dev
                {
                    path: 'view/:slug',
                    name: 'dev.view',
                    component: IndexTaskDev,
                    meta: { title: 'View Tasks Dev'}
                },
                // end path for tasks project dev
                {
                    path: 'creatror-project',
                    name: 'creator.project',
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
        },
        // path for page report
        {
            path: '/report',
            component: IndexReport,
            meta: { requiresAuth: true },
            children: [
                {
                    path: 'adv-report-index',
                    name: 'adv.report.index',
                    component: ADVReport,
                    meta: { title: 'Report ADV' }
                },
                {
                    path: 'cs-report-index',
                    name: 'cs.report.index',
                    component: CSReport,
                    meta: { title: 'Report CS' }
                },
                {
                    path: 'manager-report-index',
                    name: 'manager.report.index',
                    component: ManagerReport,
                    meta: { title: 'Report Manager' }
                },
                {
                    path: 'sdm-report-index',
                    name: 'sdm.report.index',
                    component: SDMReport,
                    meta: { title: 'Report SDM' }
                },
                {
                    path: 'shed-report-index',
                    name: 'shed.report.index',
                    component: ShedReport,
                    meta: { title: 'Report Shed' }
                },
            ]
        },
        // path for product category & type
        {
            path: '/product',
            component: IndexProduct,
            meta: { requiresAuth: true },
            children: [
                {
                    path: 'category',
                    name: 'product.category',
                    component: IndexProductCategory,
                    meta: { title: 'Kategori Produk' }
                },
                // path for tasks project dev
                {
                    path: 'edit-product-category/:id',
                    name: 'product.category.edit',
                    component: EditProductCategory,
                    meta: { title: 'Edit Product Category' }
                },
                // end path for tasks project dev
                {
                    path: 'type',
                    name: 'product.type',
                    component: IndexProductType,
                    meta: { title: 'Tipe Peroduk' }
                }
            ]
        },
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
