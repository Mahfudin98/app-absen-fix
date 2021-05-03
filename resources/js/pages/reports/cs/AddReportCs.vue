<template>
    <div class="center">
        <div class="con-content">
            <b-card bg-variant="dark" text-variant="white">
                <b-card-text>
                    <b-row>
                        <b-col>
                            <div class="form-group">
                                <label for="chat">Chat</label>
                                <input type="number" id="chat" class="form-control" name="chat" v-model="report.chat">
                            </div>
                            <div class="form-group">
                                <label for="lead">Lead Masuk</label>
                                <input type="number" id="lead" class="form-control" name="lead_masuk" v-model="report.lead_masuk">
                            </div>
                            <div class="form-group">
                                <label for="order">Order</label>
                                <input type="number" id="order" class="form-control" name="order" v-model="report.order">
                            </div>
                            <div class="form-group">
                                <label for="jml_transaksi">Jumlah Transaksi</label>
                                <input type="number" id="jml_transaksi" class="form-control" name="jml_transaksi" v-model="report.jml_transaksi">
                            </div>
                            <div class="form-group">
                                <label for="omset">Omset</label>
                                <input type="number" id="omset" class="form-control" name="omset" v-model="report.omset">
                            </div>
                        </b-col>
                        <b-col>
                            <div class="form-group">
                                <label for="detail">Detail Order</label>
                                <textarea class="form-control" name="detai_order" id="detail" cols="30" rows="10" v-model="report.detail_order"></textarea>
                            </div>
                            <div class="form-group">
                                <label for="keterangan">Keterangan</label>
                                <textarea class="form-control" name="keterangan" id="keterangan" cols="30" rows="10" v-model="report.keterangan"></textarea>
                            </div>
                        </b-col>
                    </b-row>
                </b-card-text>
            </b-card>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
    name: 'FormEmploye',
    created() {
        this.getReports();
        if (this.$route.name == 'employes.edit') {
            this.editEmploye(this.$route.params.id).then((res) => {
                this.report = {
                    chat: res.data.chat,
                    lead_masuk: res.data.lead_masuk,
                    order: res.data.order,
                    jml_transaksi: res.data.jml_transaksi,
                    omset: res.data.omset,
                    detail_order: res.data.detail_order,
                    keterangan: res.data.keterangan,
                }
            })
        }
    },
    data() {
        return {
            report: {
                chat: '',
                lead_masuk: '',
                order: '',
                jml_transaksi: '',
                omset: '',
                detail_order: '',
                keterangan: '',
            }
        }
    },
    computed: {
        ...mapState('reportCs', {
            reports: state => state.reports
        }),
    },
    methods: {
        ...mapActions('reportCs', ['getReports', 'submitReportCs']),
        submit() {
            let form = new FormData()
            form.append('chat', this.report.chat)
            form.append('lead_masuk', this.report.lead_masuk)
            form.append('order', this.report.order)
            form.append('jml_transaksi', this.report.jml_transaksi)
            form.append('omset', this.report.omset)
            form.append('detail_order', this.report.detail_order)
            form.append('keterangan', this.report.keterangan)
            this.submitReportCs(form).then(() => {
                    this.report = {
                        chat: '',
                        lead_masuk: '',
                        order: '',
                        jml_transaksi: '',
                        omset: '',
                        detail_order: '',
                        keterangan: '',
                    }
                    this.$swal({
                        background: '#3085d6',
                        title: 'Ditambah!',
                        text: 'Data Berhasil ditambah!',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 2000
                    })
                    this.$router.push({ name: 'cs.report.index' })
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
