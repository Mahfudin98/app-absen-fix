<template>
    <div class="container-scroller">
      <!-- partial:partials/_sidebar.html -->
      <app-sidebar v-if="isAuth" />
      <!-- partial -->
      <div class="container-fluid page-body-wrapper">
        <!-- partial:partials/_navbar.html -->
        <app-header v-if="isAuth" />
        <!-- partial -->
        <div class="main-panel">
          <router-view></router-view>
          <!-- content-wrapper ends -->
          <!-- partial:partials/_footer.html -->
          <app-footer v-if="isAuth" />
          <!-- partial -->
        </div>
        <!-- main-panel ends -->
      </div>
      <!-- page-body-wrapper ends -->
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Footer from './components/Footer';

export default {
        computed: {
            ...mapState(['token']),
            ...mapGetters(['isAuth'])
        },
        components: {
            'app-sidebar': Sidebar,
            'app-header': Header,
            'app-footer': Footer
        }
    }
</script>
