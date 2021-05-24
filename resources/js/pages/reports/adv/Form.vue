<template>
    <div>
        <b-row>
            <b-col>
                <div class="form-group">
                    <label for="result_dashboard">Result Dashboard</label>
                    <input type="number" id="result_dashboard" class="form-control" name="result_dashboard" v-model="report.result_dashboard">
                </div>
            </b-col>
            <b-col>
                <div class="form-group">
                    <label for="amount_spent">Biaya Iklan</label>
                    <input type="number" id="amount_spent" class="form-control" name="amount_spent" v-model="report.amount_spent">
                </div>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <div class="form-group">
                    <label for="cpr">CPR</label>
                    <input type="number" id="cpr" class="form-control" name="cpr" :value="cpr.toFixed() || 0">
                    <p>Masukan Biaya CPR : Rp. {{ report.amount_spent | formatNumber }} / {{ report.result_dashboard }} = Rp. {{ cpr | formatNumber }}</p>
                </div>
            </b-col>
            <b-col>
                <div class="form-group">
                    <label for="cp_wa">CP WA</label>
                    <input type="number" id="cp_wa" class="form-control" name="cp_wa" :value="cp_wa.toFixed() || 0">
                    <p>Masukan Biaya CP WA : Rp. {{ report.amount_spent | formatNumber }} / {{ reports }} = Rp. {{ cp_wa | formatNumber }}</p>
                </div>
            </b-col>
        </b-row>
        <div class="form-group">
            <label for="keterangan">Keterangan</label>
            <textarea class="form-control" name="keterangan" id="keterangan" placeholder="Biarkan Kosong Jika Tidak Ingin Diisi." cols="30" rows="10" v-model="report.keterangan"></textarea>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
    name: 'FormADV',
    created() {
        this.getReportAdv();
        this.getMaxLead();
        if (this.$route.name == 'employes.edit') {
            this.editEmploye(this.$route.params.id).then((res) => {
                this.report = {
                    chat: res.data.chat,
                    jml_transaksi: res.data.jml_transaksi,
                    omset: res.data.omset,
                    keterangan: res.data.keterangan,
                }
            })
        }
    },
    data() {
        return {
            report: {
                result_dashboard : 0 ,
                amount_spent     : 0 ,
                keterangan       : ''
            }
        }
    },
    computed: {
        cp_wa: function() {
            return parseInt(this.report.amount_spent) / parseInt(this.reports)
        },
        cpr: function() {
            return parseInt(this.report.amount_spent) / parseInt(this.report.result_dashboard)
        },
        ...mapState('reportAdv', {
            reportsAdv: state => state.reportsAdv
        }),
        ...mapState('reportCs', {
            reports: state => state.reports
        }),
    },
    methods: {
        ...mapActions('reportAdv', ['getReportAdv', 'submitReportAdv']),
        ...mapActions('reportCs', ['getMaxLead']),
        submit() {

            let form = new FormData()

            form.append('result_dashboard', this.report.result_dashboard)
            form.append('cpr', this.cpr.toFixed())
            form.append('cp_wa', this.cp_wa.toFixed())
            form.append('amount_spent', this.report.amount_spent)
            form.append('keterangan', this.report.keterangan)

            this.submitReportAdv(form).then(() => {
                    this.report = {
                        result_dashboard : 0 ,
                        cpr              : 0 ,
                        cp_wa            : 0 ,
                        amount_spent     : 0 ,
                        keterangan       : ''
                    }
                    this.$swal({
                        background: '#3085d6',
                        title: 'Ditambah!',
                        text: 'Data Berhasil ditambah!',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 2000
                    })
                    this.$router.push({ name: 'adv.report.data' })
                    .catch(()=>{});
                })
            // if (this.$route.name == 'employes.add') {

            // } else if (this.$route.name == 'employes.edit') {
            //     this.SET_ID_UPDATE(this.$route.params.id)
            //     this.updateEmploye(form).then(() => {
            //         this.employe = {
            //             chat: '',
            //             lead_masuk: '',
            //             order: '',
            //             jml_transaksi: '',
            //             omset: '',
            //             detail_order: '',
            //             keterangan: '',
            //         }
            //         this.$swal({
            //             background: '#3085d6',
            //             title: 'Diupdate!',
            //             text: 'Data Berhasil diupdate!',
            //             icon: 'success',
            //             showConfirmButton: false,
            //             timer: 2000
            //         })
            //         this.$router.push({ name: 'employes.data' })
            //     })
            // }
        },
    }
}
</script>
