<template>
    <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
            <div class="card-header">
                <div class="d-flex flex-row justify-content-between">
                    <div class="text-muted mb-1">
                        <b-form inline>
                            <span class="text-light">Filter Tanggal</span>
                            <b-dropdown split
                            split-variant="outline-warning"
                            variant="warning"
                            :text="dateRangeText"
                            class="m-2"
                            no-caret>
                                <b-dropdown-form>
                                    <v-date-picker
                                        v-model="dates"
                                        range
                                        color="#26303b"
                                    ></v-date-picker>
                                </b-dropdown-form>
                            </b-dropdown>
                        </b-form>
                    </div>
                    <router-link :to="{ name: 'cs.add.report' }">
                        <vs-button gradient warn
                            class="card-title mb-1"
                        >
                            <span>
                            <i class='fas fa-plus' ></i>
                                Add Report CS
                            </span>
                        </vs-button>
                    </router-link>
                </div>
            </div>
            <div class="card-body">
                <b-table sticky-header :items="reports.data" :fields="fields" striped responsive show-empty>

                    <template #cell(show_details)="row">
                        <vs-button
                            color="#7d33ff"
                            relief
                            @click="row.toggleDetails"
                        >
                            {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
                        </vs-button>
                    </template>
                    <template #head(show_details)="row">
                        <span class="text-light">{{ row.label }}</span>
                    </template>
                    <template #row-details="row">
                        <b-card>
                            <b-row>
                                <b-col>
                                    <h4 class="card-title mb-1">Order</h4>
                                    <blockquote class="blockquote">
                                        <table>
                                            <thead>
                                                <th>Nama Produk</th>
                                                <th>Tipe Order</th>
                                                <th>Jumlah Order</th>
                                            </thead>
                                            <tbody v-for="(order, index) in row.item.order" :key="index">
                                                <tr>
                                                    <td>{{ order.product_type_id.name }}</td>
                                                    <td>{{ order.order_type_id.name }}</td>
                                                    <td>{{ order.order }}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </blockquote>
                                </b-col>

                                <b-col>
                                    <h4 class="card-title mb-1">Keterangan</h4>
                                    <blockquote class="blockquote">
                                        <p class="mb-0">{{ row.item.keterangan }}</p>
                                    </blockquote>
                                </b-col>
                            </b-row>
                            <div class="d-flex flex-row justify-content-between">
                                <vs-button
                                    class="card-title mb-1"
                                    color="#7d33ff"
                                    relief
                                    @click="row.toggleDetails"
                                >
                                    Hide Details
                                </vs-button>
                                <span class="text-muted mb-1">{{ row.item.created_at | moment("dddd, MMMM Do YYYY") }}</span>
                            </div>
                        </b-card>
                    </template>

                    <template #cell(omset)="row">
                        <span class="text-light">Rp. {{row.item.omset | formatNumber}}</span>
                    </template>
                    <template #head(omset)="row">
                        <span class="text-light">{{ row.label }}</span>
                    </template>

                    <template #cell(created_at)="row">
                        <span class="text-light">{{ row.item.created_at | moment("MMMM/DD/YYYY") }}</span>
                    </template>
                    <!-- A custom formatted header cell for field 'name' -->
                    <template #head(created_at)="row">
                        <span class="text-light">{{ row.label }}</span>
                    </template>
                </b-table>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import moment from 'moment'
export default {
    name: 'DataReportCS',
    created() {
        this.getReports();
    },
    data() {
        return {
            dates: [moment().startOf('month').format('YYYY-MM-DD'),moment().endOf('month').format('YYYY-MM-DD')],
            fields: [
                { key: 'show_details', label: '#', variant: 'info' },
                { key: 'chat', label: 'Chat' },
                { key: 'jml_transaksi', label: 'Transaksi' },
                { key: 'omset', label: 'Omset', variant: 'success' },
                { key: 'created_at', label: 'Tanggal', variant: 'primary' }
            ],
        }
    },
    computed: {
        ...mapState('reportCs', {
            reports: state => state.reports
        }),
        dateRangeText () {
            return this.dates.join(' ~ ')
        },
        dateRangeValue (){
            return this.dates.join('+')
        }
    },
    page: {
        get() {
            return this.$store.state.report.page
        },
        set(val) {
            this.$store.commit('report-cs/SET_PAGE', val)
        }
    },
    watch: {
        page() {
            this.getReports()
        },
        dates() {
            this.getReports(this.dateRangeValue)
        },
    },
    methods: {
        ...mapActions('reportCs', ['getReports']),
        submit() {
            this.active = false
            this.$refs.formReportCs.submit()
        },
    },
}
</script>
