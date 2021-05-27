<template>
  <div>
    <b-row>
        <b-col cols="12">
            <b-card header-tag="header" footer-tag="footer">
                <template #header>
                    <h6 class="mb-0">
                        <!-- <div class="field is-grouped">
                            <div class="control">
                                <label class="checkbox">
                                <input type="checkbox" :value="2018" v-model="selectedYears">
                                2018 Sales
                                </label>
                            </div>
                            <div class="control">
                                <label class="checkbox">
                                <input type="checkbox" :value="2017" v-model="selectedYears">
                                2017 Sales
                                </label>
                            </div>
                        </div> -->
                        Chart Report CS
                    </h6>
                </template>
                <b-card-text>
                    <line-chart
                        :width="500"
                        :height="300"
                        :labels="['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des']"
                        :datasets="displayedDatasets"
                        :options="$options.options"
                    ></line-chart>
                </b-card-text>
                <b-button href="#" variant="primary">Go somewhere</b-button>
                <template #footer>
                    <em>Footer Slot</em>
                </template>
            </b-card>
        </b-col>
        <b-col cols="12">
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
                    <b-table sticky-header :items="reports" :fields="fields" striped responsive show-empty>

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
                                                        <td>{{ order.product_type.name }}</td>
                                                        <td>{{ order.order_type.name }}</td>
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
        </b-col>
    </b-row>
  </div>
</template>

<script>
import numeral from 'numeral';
import LineChart from './LineChart';
import { mapActions, mapState } from 'vuex';
import moment from 'moment';
const datasets = {
  2018: {
    label: '2018 Sales',
    borderColor: 'rgba(50, 115, 220, 0.5)',
    backgroundColor: 'rgba(50, 115, 220, 0.1)',
    data: [300, 700, 450, 750, 450]
  },
  2017: {
    label: '2017 Sales',
    borderColor: 'rgba(255, 56, 96, 0.5)',
    backgroundColor: 'rgba(255, 56, 96, 0.1)',
    data: [600, 550, 750, 250, 700]
  }
};
const options = {
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true,
        callback: value => numeral(value).format('$0,0')
      }
    }]
  },
  tooltips: {
    mode: 'index',
    callbacks: {
      label(tooltipItem, data) {
        const label = data.datasets[tooltipItem.datasetIndex].label;
        const value = numeral(tooltipItem.yLabel).format('$0,0');
        return `${label}: ${value}`;
      }
    }
  }
};
export default {
    name: 'ChartsReportsCS',
    created() {
        this.getChartCS();
    },
    datasets,
    options,
    components: {
        LineChart
    },
    data() {
        return {
            selectedYears: [2018, 2017],
            dates: [moment().startOf('month').format('YYYY-MM-DD'),moment().endOf('month').format('YYYY-MM-DD')],
            fields: [
                { key: 'show_details', label: '#', variant: 'info' },
                { key: 'chat', label: 'Chat' },
                { key: 'jml_transaksi', label: 'Transaksi' },
                { key: 'omset', label: 'Omset', variant: 'success' },
                { key: 'created_at', label: 'Tanggal', variant: 'primary' }
            ],
        };
    },
    computed: {
        displayedDatasets() {
            return this.selectedYears.map(year => datasets[year]);
        },
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
            this.getChartCS()
        },
        dates() {
            this.getChartCS(this.dateRangeValue)
        },
    },
    methods: {
        ...mapActions('reportCs', ['getChartCS']),
        submit() {
            this.active = false
            this.$refs.formReportCs.submit()
        },
    },
}
</script>
