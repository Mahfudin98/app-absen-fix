<template>
    <div class="col-md-12 grid-margin">
        <div class="card">
            <div class="card-header">
                <div class="row">
                    <div class="col-sm grid-margin">
                        <router-link :to="{ name: 'employes.add' }" class="btn btn-primary"><i class="fas fa-plus"></i> Tambah</router-link>
                    </div>
                    <div class="col-sm">
                        <div class="form-group">
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <button class="btn btn-primary text-white"><i class="mdi mdi-magnify mdi-md"></i></button>
                                </div>
                                <input type="text" class="form-control" placeholder="Cari Nama Karyawan..." v-model="search">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <b-table class="table" :items="employes.data" :fields="fields" show-empty>
                        <template v-slot:cell(image)="row">
                            <img :src="'/storage/employe/' + row.item.image" :width="80" :height="50" :alt="row.item.name">
                        </template>
                        <template v-slot:cell(position_id)="row">
                            {{ row.item.position.name }}
                        </template>
                        <template v-slot:cell(actions)="row">
                            <router-link :to="{ name: 'employes.edit', params: {id: row.item.id} }" class="btn btn-warning btn-md"><i class="mdi mdi-lead-pencil"></i></router-link>
                            <button class="btn btn-danger btn-md" @click="deleteEmploye(row.item.id)"><i class="fas fa-trash"></i></button>
                        </template>
                    </b-table>
                </div>

                <div class="row">
                    <div class="col-md-6">
                        <p v-if="employes.data"><i class="fa fa-bars"></i> {{ employes.data.length }} item dari {{ employes.meta.total }} total data</p>
                    </div>
                    <div class="col-md-6">
                        <div class="pull-right">
                            <b-pagination
                                v-model="page"
                                :total-rows="employes.meta.total"
                                :per-page="employes.meta.per_page"
                                aria-controls="employes"
                                v-if="employes.data && employes.data.length > 10"
                                ></b-pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
    name: 'DataEmploye',
    created() {
        this.getEmployes()
    },
    data() {
        return {
            fields: [
                { key: 'image', label: '#' },
                { key: 'name', label: 'Nama Lengkap' },
                { key: 'email', label: 'Email' },
                { key: 'position_id', label: 'Position' },
                { key: 'actions', label: 'Aksi' }
            ],
            search: ''
        }
    },
    computed: {
        ...mapState('employe', {
            employes: state => state.employes
        }),
        page: {
            get() {
                return this.$store.state.employe.page
            },
            set(val) {
                this.$store.commit('employe/SET_PAGE', val)
            }
        }
    },
    watch: {
        page() {
            this.getEmployes()
        },
        search() {
            this.getEmployes(this.search)
        }
    },
    methods: {
        ...mapActions('employe', ['getEmployes', 'removeEmploye']),
        deleteEmploye(id) {
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
    }
}
</script>
