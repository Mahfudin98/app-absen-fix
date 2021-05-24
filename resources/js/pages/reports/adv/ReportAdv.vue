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
                    <router-link :to="{ name: 'adv.add.report' }">
                        <vs-button gradient warn
                            class="card-title mb-1"
                        >
                            <span>
                            <i class='fas fa-plus' ></i>
                                Add Report ADV
                            </span>
                        </vs-button>
                    </router-link>
                </div>
            </div>
            <div class="card-body">
                <b-table sticky-header :items="reportsAdv.data" :fields="fields" striped responsive show-empty>

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
                                <b-col cols="12">
                                    <h4 class="card-title mb-1">Order</h4>
                                    <blockquote class="blockquote">
                                        <table class="table">
                                            <thead>
                                                <th class="bg-dark text-light">#</th>
                                                <th>Nama CS</th>
                                                <th>Lead WA</th>
                                                <th>Jumlah Transaksi</th>
                                                <th class="bg-danger text-light">Jumlah Omset</th>
                                                <th>Tanggal</th>
                                            </thead>
                                            <tbody v-for="(order, index) in reports.data" :key="index">
                                                <tr v-show="moment(order.created_at).format('dddd') == moment(row.item.created_at).format('dddd')">
                                                    <td class="bg-dark text-light">
                                                        <vs-tooltip leaft>
                                                            <vs-button border>
                                                                Detail
                                                            </vs-button>
                                                            <template #tooltip>
                                                                <table class="table text-light">
                                                                    <thead>
                                                                        <th class="bg-warning text-light">Order</th>
                                                                        <th class="bg-info text-light">Nama produk</th>
                                                                    </thead>
                                                                    <tbody v-for="(info, index) in order.order" :key="index">
                                                                        <tr>
                                                                            <td class="bg-warning">{{ info.order }}</td>
                                                                            <td class="bg-info">{{ info.product_type.name }}</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </template>
                                                        </vs-tooltip>
                                                    </td>
                                                    <td>{{ order.user.name }}</td>
                                                    <td>{{ order.chat }}</td>
                                                    <td>{{ order.jml_transaksi }}</td>
                                                    <td class="bg-danger text-light">Rp. {{ order.omset | formatNumber }}.-</td>
                                                    <td> {{ moment(order.created_at).format('MMMM/DD/YYYY') }} </td>
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
                                <span class="text-muted mb-1">{{ moment(row.item.created_at).format('MMMM/DD/YYYY') }}</span>
                            </div>
                        </b-card>
                    </template>

                    <!-- cpr -->
                    <template #cell(cpr)="row">
                        <span class="text-light">Rp. {{row.item.cpr | formatNumber}}</span>
                    </template>
                    <template #head(cpr)="row">
                        <span class="text-light">{{ row.label }}</span>
                    </template>

                    <!-- cp_wa -->
                    <template #cell(cp_wa)="row">
                        <span class="text-light">Rp. {{row.item.cp_wa | formatNumber}}</span>
                    </template>
                    <template #head(cp_wa)="row">
                        <span class="text-light">{{ row.label }}</span>
                    </template>

                    <!-- biaya iklan -->
                    <template #cell(amount_spent)="row">
                        <span class="text-light">Rp. {{row.item.amount_spent | formatNumber}}</span>
                    </template>
                    <template #head(amount_spent)="row">
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
        this.getReportAdv();
        this.getFilter();
    },
    data() {
        return {
            moment: moment,
            dates: [moment().startOf('month').format('YYYY-MM-DD'),moment().endOf('month').format('YYYY-MM-DD')],
            fields: [
                { key: 'show_details', label: '#' },
                { key: 'result_dashboard', label: 'Result Dashboard' },
                { key: 'cpr', label: 'CPR', variant: 'warning'},
                { key: 'cp_wa', label: 'CP WA', variant: 'info' },
                { key: 'amount_spent', label: 'Biaya Iklan', variant: 'danger' },
                { key: 'created_at', label: 'Tanggal', variant: 'primary' }
            ],
        }
    },
    computed: {
        ...mapState('reportAdv', {
            reportsAdv: state => state.reportsAdv
        }),
        ...mapState('reportCs', {
            reports: state => state.reports
        }),
        dateRangeText () {
            return this.dates.join(' ~ ')
        },
        dateRangeValue (){
            return this.dates.join('+')
        },
        filter () {
            return this.reports.data.filter(report => report.created_at == '2021-05-20T02:07:28.000000Z')
        }
    },
    page: {
        get() {
            return this.$store.state.report.page
        },
        set(val) {
            this.$store.commit('report-adv/SET_PAGE', val)
        }
    },
    watch: {
        page() {
            this.getReportAdv()
        },
        dates() {
            this.getReportAdv(this.dateRangeValue)
        },
    },
    methods: {
        ...mapActions('reportAdv', ['getReportAdv']),
        ...mapActions('reportCs', ['getFilter']),
        submit() {
            this.active = false
            this.$refs.formReportCs.submit()
        },
    },
}
</script>
