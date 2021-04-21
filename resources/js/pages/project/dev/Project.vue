<template>
    <div class="card">
        <b-modal
            ref="my-modal"
            centered
            hide-footer
            title="Create New Project"
            :header-bg-variant="headerBgVariant"
            :header-text-variant="headerTextVariant"
            :body-bg-variant="bodyBgVariant"
            :body-text-variant="bodyTextVariant"
        >
            <modal-add @close="hideModal"></modal-add>
        </b-modal>
        <div class="card-header">
            <div class="d-flex flex-row justify-content-between">
                <h4 class="card-title mb-1">Project</h4>
                <p class="text-muted mb-1">
                    <button id="show-btn" @click="showModal" class="btn btn-primary"><i class="fas fa-plus"></i> Create New Project</button>
                </p>
            </div>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <b-table class="table" :items="projects.data" :fields="fields" show-empty>
                    <template v-slot:cell(project_name)="row">
                        <router-link :to="{ name:'dev.view', params: { slug: row.item.slug }}">{{ row.item.project_name }}</router-link>
                    </template>
                    <template v-slot:cell(position_id)="row">
                        {{ row.item.position.name }}
                    </template>
                    <template v-slot:cell(status)="row">
                        <label class="badge badge-primary" v-if="row.item.status == 0">Progress</label>
                        <label class="badge badge-warning" v-if="row.item.status == 1">Revision</label>
                        <label class="badge badge-success" v-if="row.item.status == 2">Done</label>
                    </template>
                </b-table>
            </div>
        </div>
        <div class="card-footer">

        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import ModalAdd from './ModalAdd'
export default {
    name: 'DataProjectDev',
    created() {
        this.getProjects();
    },
    data() {
        return {
            fields: [
                { key: 'project_name', label: 'Nama Project' },
                { key: 'position_id', label: 'Posisi'},
                { key: 'description', label: 'Deskripsi'},
                { key: 'status', label: 'Status' },
            ],
            search: '',
            headerBgVariant: 'info',
            headerTextVariant: 'light',
            bodyBgVariant: 'light',
            bodyTextVariant: 'info',
        }
    },
    computed: {
        ...mapState('project', {
            projects: state => state.projects
        }),
        page: {
            get() {
                return this.$store.state.project.page
            },
            set(val) {
                this.$store.commit('project/SET_PAGE', val)
            }
        }
    },
    watch: {
        page() {
            this.getProjects()
        },
        search() {
            this.getProjects(this.search)
        }
    },
    methods: {
        ...mapActions('project', ['getProjects', 'removeProject']),
        showModal() {
            this.$refs['my-modal'].show()
        },
        hideModal() {
            this.$refs['my-modal'].hide()
        },
        toggleModal() {
            this.$refs['my-modal'].toggle('#toggle-btn')
        },
        deleteProject(id) {
            this.$swal({
                title: 'Kamu Yakin?',
                text: "Tindakan ini akan menghapus secara permanent!",
                icon: 'warning',
                background: '#12151e',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Iya, Lanjutkan!'
            }).then((result) => {
                if (result.value) {
                    this.removeEmploye(id)
                    this.$swal({
                        background: '#3085d6',
                        title: 'Terhapus!',
                        text: 'Posisi sudah berhasil dihapus!',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
        }
    },
    components: {
        'modal-add': ModalAdd
    }
}
</script>
