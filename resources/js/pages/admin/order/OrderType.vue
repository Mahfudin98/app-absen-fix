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
                        <b-table class="table" :items="types.data" :fields="fields" show-empty>
                            <template v-slot:cell(actions)="row">
                                <router-link :to="{ name: 'order.type.edit', params: {id: row.item.id} }" class="btn btn-warning btn-sm"><i class="mdi mdi-lead-pencil"></i> Edit</router-link>
                            </template>
                        </b-table>
                    </div>
                    <div class="row">
                        <div class="col-md-8">
                            <p v-if="types.data"><i class="fa fa-bars"></i> {{ types.data.length }} item dari {{ types.meta.total }} total data</p>
                        </div>
                        <div class="col-md-4">
                            <div class="pull-right">
                                <b-pagination
                                    v-model="page"
                                    :total-rows="types.meta.total"
                                    :per-page="types.meta.per_page"
                                    aria-controls="types"
                                    v-if="types.data && types.data.length > 10"
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
        this.getTypes();
    },
    data() {
        return {
            fields: [
                { key: 'name', label: 'Nama Type' },
                { key: 'actions', label: 'Aksi' }
            ],
            search: '',
        }
    },
    computed: {
        ...mapState('orderType', {
            types: state => state.types
        }),
        page: {
            get() {
                return this.$store.state.orderType.page
            },
            set(val) {
                this.$store.commit('orderType/SET_PAGE', val)
            }
        }
    },
    watch: {
        page() {
            this.getTypes()
        },
        search() {
            this.getTypes(this.search)
        }
    },
    methods: {
        ...mapActions('orderType', ['getTypes']),
    },
    components: {
        'btn-add': AddData
    }
}
</script>
