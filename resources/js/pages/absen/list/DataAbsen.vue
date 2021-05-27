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
                            class="m-2 text-light"
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
                <b-table sticky-header :items="absents.data" :fields="fields" striped responsive show-empty>

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
                                    <h4 class="card-title mb-1">Catatan</h4>
                                    <blockquote class="blockquote">
                                        <p v-if="row.item.note == null" class="mb-0">Tidak ada catatan.</p>
                                        <p v-else class="mb-0">{{ row.item.note }}</p>
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

                    <template #cell(name)="row">
                        <span class="text-light">{{ row.item.user.name }}</span>
                    </template>
                    <template #head(name)="row">
                        <span class="text-light">{{ row.label }}</span>
                    </template>

                    <template #cell(time_in)="row">
                        <span class="text-light">{{ row.item.time_in }}</span>
                    </template>
                    <template #head(time_in)="row">
                        <span class="text-light">{{ row.label }}</span>
                    </template>

                    <template #cell(time_out)="row">
                        <span v-if="row.item.time_out == null" class="text-light">-</span>
                        <span v-else class="text-light">{{ row.item.time_out }}</span>
                    </template>
                    <template #head(time_out)="row">
                        <span class="text-light">{{ row.label }}</span>
                    </template>

                    <template #cell(keterangan)="row">
                        <div v-if="row.item.keterangan == 0">
                            <v-chip
                            class="ma-2 text-light"
                            color="#28a745"
                            label
                            text-color="white"
                            >
                            <v-icon left>
                                fas fa-check-circle
                            </v-icon>
                                Masuk
                            </v-chip>
                        </div>
                        <div v-if="row.item.keterangan == 1">
                            <v-chip
                            class="ma-2 text-light"
                            color="#ffc107"
                            label
                            text-color="white"
                            >
                            <v-icon left>
                                fas fa-exclamation-circle
                            </v-icon>
                                Terlambat
                            </v-chip>
                        </div>
                        <div v-if="row.item.keterangan == 2">
                            <v-chip
                            class="ma-2 text-light"
                            color="#dc3545"
                            label
                            text-color="white"
                            >
                            <v-icon left>
                                fas fa-times-circle
                            </v-icon>
                                Tidak Masuk
                            </v-chip>
                        </div>
                    </template>
                    <template #head(keterangan)="row">
                        <span class="text-light">{{ row.label }}</span>
                    </template>

                    <template #cell(date)="row">
                        <span class="text-light">{{ row.item.date | moment("MMMM/DD/YYYY") }}</span>
                    </template>
                    <template #head(date)="row">
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
        this.getAbsents();
    },
    data() {
        return {
            dates: [moment().startOf('month').format('YYYY-MM-DD'),moment().endOf('month').format('YYYY-MM-DD')],
            fields: [
                { key: 'show_details', label: '#', variant: 'info' },
                { key: 'name', label: 'Nama Karyawan' },
                { key: 'date', label: 'Tanggal' },
                { key: 'time_in', label: 'Absen Masuk', variant: 'primary' },
                { key: 'time_out', label: 'Absen Keluar', variant: 'success' },
                { key: 'keterangan', label: 'Keterangan'}
            ],
        }
    },
    computed: {
        ...mapState('absent', {
            absents: state => state.absents
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
            this.$store.commit('absen-index/SET_PAGE', val)
        }
    },
    watch: {
        page() {
            this.getAbsents()
        },
        dates() {
            this.getAbsents(this.dateRangeValue)
        },
    },
    methods: {
        ...mapActions('absent', ['getAbsents']),
        submit() {
            this.active = false
            this.$refs.formReportCs.submit()
        },
    },
}
</script>
