<template>
    <div class="row">
        <div class="col-md-4 grid-margin">
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">Add Data Posisi/Jabatan</h4>
                    <btn-add></btn-add>
                </div>
            </div>
        </div>
        <div class="col-lg-8 grid-margin stretch-card">
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">Data Posisi/Jabatan</h4>
                    <div class="form-group">
                      <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text bg-primary text-white"><i class="mdi mdi-magnify"></i></span>
                        </div>
                        <input type="text" class="form-control" placeholder="Cari Nama Posisi/Jabatan..." v-model="search">
                        <div class="input-group-append">
                          <button class="btn btn-sm btn-primary" type="button">Search</button>
                        </div>
                      </div>
                    </div>
                    <div class="table-responsive">
                        <b-table class="table" :items="positions.data" :fields="fields" show-empty>
                            <template v-slot:cell(status)="row">
                                <label class="badge badge-success" v-if="row.item.status == 1">Active</label>
                                <label class="badge badge-danger" v-else>Inactive</label>
                            </template>
                            <template v-slot:cell(actions)="row">
                                <router-link :to="{ name: 'positions.edit', params: {id: row.item.id} }" class="btn btn-warning btn-sm"><i class="mdi mdi-lead-pencil"></i> Edit</router-link>
                                <button class="btn btn-danger btn-sm" @click="deletePosition(row.item.id)"><i class="mdi mdi-delete"></i> Hapus</button>
                            </template>
                        </b-table>
                    </div>
                    <div class="row">
                        <div class="col-md-8">
                            <p v-if="positions.data"><i class="fa fa-bars"></i> {{ positions.data.length }} item dari {{ positions.meta.total }} total data</p>
                        </div>
                        <div class="col-md-4">
                            <div class="pull-right">
                                <b-pagination
                                    v-model="page"
                                    :total-rows="positions.meta.total"
                                    :per-page="positions.meta.per_page"
                                    aria-controls="positions"
                                    v-if="positions.data && positions.data.length > 10"
                                ></b-pagination>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import AddData from './Add'
export default {
    name: 'DataPosition',
    created() {
        this.getPositions();
    },
    data() {
        return {
            fields: [
                { key: 'name', label: 'Nama Posisi/Jabatan' },
                { key: 'status', label: 'Status' },
                { key: 'actions', label: 'Aksi' }
            ],
            search: '',
        }
    },
    computed: {
        ...mapState('position', {
            positions: state => state.positions
        }),
        page: {
            get() {
                return this.$store.state.position.page
            },
            set(val) {
                this.$store.commit('position/SET_PAGE', val)
            }
        }
    },
    watch: {
        page() {
            this.getPositions()
        },
        search() {
            this.getPositions(this.search)
        }
    },
    methods: {
        ...mapActions('position', ['getPositions', 'removePosition']),
        deletePosition(id) {
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
                    this.removePosition(id)
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
        'btn-add': AddData
    }
}
</script>
