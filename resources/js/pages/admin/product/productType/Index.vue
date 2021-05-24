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
                        <b-table class="table" :items="typeProducts.data" :fields="fields" show-empty>
                            <template v-slot:cell(kategory)="row">
                                {{ row.item.product_category.name }}
                            </template>
                            <template v-slot:cell(actions)="row">
                                <router-link :to="{ name: 'product.category.edit', params: {id: row.item.id} }" class="btn btn-warning btn-sm"><i class="mdi mdi-lead-pencil"></i> Edit</router-link>
                            </template>
                        </b-table>
                    </div>
                    <div class="row">
                        <div class="col-md-8">
                            <p v-if="typeProducts.data"><i class="fa fa-bars"></i> {{ typeProducts.data.length }} item dari {{ typeProducts.meta.total }} total data</p>
                        </div>
                        <div class="col-md-4">
                            <div class="pull-right">
                                <b-pagination
                                    v-model="page"
                                    :total-rows="typeProducts.meta.total"
                                    :per-page="typeProducts.meta.per_page"
                                    aria-controls="typeProducts"
                                    v-if="typeProducts.data && typeProducts.data.length > 10"
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
    name: 'DataProductType',
    created() {
        this.getTypesProduct();
    },
    data() {
        return {
            fields: [
                { key: 'name', label: 'Nama Type' },
                { key: 'kategory', label: 'Kategory' },
                { key: 'actions', label: 'Aksi' }
            ],
            search: '',
        }
    },
    computed: {
        ...mapState('productType', {
            typeProducts: state => state.typeProducts
        }),
        page: {
            get() {
                return this.$store.state.productType.page
            },
            set(val) {
                this.$store.commit('productType/SET_PAGE', val)
            }
        }
    },
    watch: {
        page() {
            this.getTypesProduct()
        },
        search() {
            this.getTypesProduct(this.search)
        }
    },
    methods: {
        ...mapActions('productType', ['getTypesProduct']),
    },
    components: {
        'btn-add': AddData
    }
}
</script>
