<template>
    <nav class="sidebar sidebar-offcanvas" id="sidebar">
        <div class="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
            <router-link class="sidebar-brand brand-logo" to="/"><img :src="'/assets/images/logo.svg'" alt="logo" /></router-link>
            <router-link class="sidebar-brand brand-logo-mini" to="/"><img :src="'/assets/images/logo-mini.svg'" alt="logo" /></router-link>
        </div>
        <ul class="nav">
          <li class="nav-item profile">
            <div class="profile-desc">
              <div class="profile-pic">
                <div class="count-indicator">
                  <img class="img-xs rounded-circle " :src="'/storage/employe/' + authenticated.image" :alt="authenticated.name">
                  <span class="count bg-success"></span>
                </div>
                <div class="profile-name">
                  <h5 class="mb-0 font-weight-normal">{{ authenticated.name }}</h5>
                  <span>{{ authenticated.position}}</span>
                </div>
              </div>
              <a href="#" id="profile-dropdown" data-toggle="dropdown"><i class="mdi mdi-dots-vertical"></i></a>
              <div class="dropdown-menu dropdown-menu-right sidebar-dropdown preview-list" aria-labelledby="profile-dropdown">
                <a href="#" class="dropdown-item preview-item">
                  <div class="preview-thumbnail">
                    <div class="preview-icon bg-dark rounded-circle">
                      <i class="mdi mdi-settings text-primary"></i>
                    </div>
                  </div>
                  <div class="preview-item-content">
                    <p class="preview-subject ellipsis mb-1 text-small">Account settings</p>
                  </div>
                </a>
                <div class="dropdown-divider"></div>
                <a href="#" class="dropdown-item preview-item">
                  <div class="preview-thumbnail">
                    <div class="preview-icon bg-dark rounded-circle">
                      <i class="mdi mdi-onepassword  text-info"></i>
                    </div>
                  </div>
                  <div class="preview-item-content">
                    <p class="preview-subject ellipsis mb-1 text-small">Change Password</p>
                  </div>
                </a>
                <div class="dropdown-divider"></div>
                <a href="#" class="dropdown-item preview-item">
                  <div class="preview-thumbnail">
                    <div class="preview-icon bg-dark rounded-circle">
                      <i class="mdi mdi-calendar-today text-success"></i>
                    </div>
                  </div>
                  <div class="preview-item-content">
                    <p class="preview-subject ellipsis mb-1 text-small">To-do list</p>
                  </div>
                </a>
              </div>
            </div>
          </li>
          <li class="nav-item nav-category">
            <span class="nav-link">Menu</span>
          </li>
          <!-- route link for dashboard -->
          <li class="nav-item menu-items">
            <router-link class="nav-link" :to="{ name: 'dashboard' }">
                <span class="menu-icon">
                    <i class="mdi mdi-speedometer"></i>
                </span>
                <span class="menu-title">Dashboard</span>
            </router-link>
          </li>
          <!-- route link for position -->
          <li class="nav-item menu-items" v-if="$can('read positions')">
            <router-link class="nav-link" :to="{ name: 'positions.data' }">
              <span class="menu-icon">
                <i class="mdi mdi-human"></i>
              </span>
              <span class="menu-title">Position</span>
            </router-link>
          </li>
          <!-- route link for setting role -->
          <li class="nav-item menu-items">
            <a class="nav-link" data-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
              <span class="menu-icon">
                <i class="mdi mdi-folder-account"></i>
              </span>
              <span class="menu-title">Setting Role</span>
              <i class="menu-arrow"></i>
            </a>
            <div class="collapse" id="ui-basic">
              <ul class="nav flex-column sub-menu">
                <li class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'role.permissions' }">
                    Role Permission
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'add.permission' }">
                    Add Permission
                    </router-link>
                </li>
              </ul>
            </div>
          </li>
          <!-- route link for karyawan -->
          <li class="nav-item menu-items" v-if="$can('read employes')">
            <router-link class="nav-link" :to="{ name: 'employes.data' }">
              <span class="menu-icon">
                <i class="mdi mdi-account-circle"></i>
              </span>
              <span class="menu-title">Karyawan</span>
            </router-link>
          </li>
          <!-- route link for project -->
          <li class="nav-item menu-items">
            <a class="nav-link" data-toggle="collapse" href="#project" aria-expanded="false" aria-controls="project">
              <span class="menu-icon">
                <i class="mdi mdi-library-books"></i>
              </span>
              <span class="menu-title">Project</span>
              <i class="menu-arrow"></i>
            </a>
            <div class="collapse" id="project">
              <ul class="nav flex-column sub-menu">
                <li class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'dev.project' }">
                        Depelovers Project
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'creatore.project' }">
                        Creator Project
                    </router-link>
                </li>
              </ul>
            </div>
          </li>
          <!-- route link for absen -->
          <li class="nav-item menu-items" v-if="$can('read employes')">
            <router-link class="nav-link" :to="{ name: 'absen.index' }">
              <span class="menu-icon">
                <i class="mdi mdi-human-greeting"></i>
              </span>
              <span class="menu-title">Absen</span>
            </router-link>
          </li>
          <!-- route link for salary -->
          <li class="nav-item menu-items" v-if="$can('read employes')">
            <router-link class="nav-link" :to="{ name: 'salary.index' }">
              <span class="menu-icon">
                <i class="mdi mdi-grid"></i>
              </span>
              <span class="menu-title">Salary</span>
            </router-link>
          </li>
        </ul>
    </nav>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
    name: 'Sidebar',
    computed: {
        ...mapState('user', {
            authenticated: state => state.authenticated
        }),
    },
}
</script>
