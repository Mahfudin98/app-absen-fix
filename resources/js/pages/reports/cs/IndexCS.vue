<template>
    <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
            <div class="card-header">
                <div class="d-flex flex-row justify-content-between">
                    <vs-button gradient warn @click="active=!active"
                        class="card-title mb-1"
                    >
                        <span>
                        <i class='fas fa-plus' ></i>
                            Add Report CS
                        </span>
                    </vs-button>
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
                                    <h4 class="card-title mb-1">Detail</h4>
                                    <blockquote class="blockquote">
                                        <p class="mb-0">{{ row.item.detail_order }}</p>
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
        <vs-dialog overflow-hidden full-screen v-model="active" blur dark color="#191c24">
            <template #header>
                <h4>
                    Form Input <b>Report CS</b>
                </h4>
            </template>
            <add-report-cs ref="formReportCs"></add-report-cs>
            <vs-button
                relief
                @click.prevent="submit"
            >
                <span>
                <i class='fas fa-save' ></i>
                    Save
                </span>
            </vs-button>
        </vs-dialog>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import AddReportCs from '../cs/AddReportCs.vue'
import moment from 'moment'
export default {
    name: 'DataReportCS',
    created() {
        this.getReports();
    },
    data() {
        return {
            dates: [moment().startOf('month').format('YYYY-MM-DD'),moment().endOf('month').format('YYYY-MM-DD')],
            active: false,
            fields: [
                { key: 'show_details', label: '#', variant: 'info' },
                { key: 'chat', label: 'Chat' },
                { key: 'lead_masuk', label: 'Lead'},
                { key: 'order', label: 'Order' },
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
    components: {
        'add-report-cs': AddReportCs
    },
}
</script>
