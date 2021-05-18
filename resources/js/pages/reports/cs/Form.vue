<template>
    <div>
        <div class="form-group">
                    <label for="chat">Chat</label>
                    <input type="number" id="chat" class="form-control" name="chat" v-model="report.chat">
                </div>
                <v-divider></v-divider>
                <!-- <v-expansion-panels>
                    <v-expansion-panel v-for="(row, index) in categorys.data" :key="index">
                        <v-expansion-panel-header>{{ row.name }}</v-expansion-panel-header>
                        <v-expansion-panel-content v-for="(prod, product) in row.product_type" :key="product">
                            <b-row>
                                <b-col>
                                    <div class="form-group">
                                        <label for="lead">{{ prod.name }}</label>
                                        <input type="number" id="lead" class="form-control" name="product_type_id[]" v-model="report.product_type_id[product]">
                                    </div>
                                </b-col>
                                <b-col>
                                    <div class="form-group">
                                        <label for="lead">{{ prod.name }}</label>
                                        <input type="number" id="lead" class="form-control" name="order[]" v-model="report.order[product]">
                                    </div>
                                </b-col>
                                <b-col>
                                    <div class="form-group">
                                        <label for="">Tipe Order</label>
                                        <select name="order_type_id[]" class="form-control" v-model="report.order_type_id[product]">
                                            <option value="">Pilih</option>
                                            <option v-for="(row, index) in types.data" :value="row.id" :key="index">
                                                {{ row.name }}
                                            </option>
                                        </select>
                                    </div>
                                </b-col>
                            </b-row>

                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels> -->
                <b-row v-for="(find, index) in finds" :key="index">
                    <b-col>
                        <div class="form-group">
                            <label for="">Product</label>
                            <select name="order_type_id[]" class="form-control text-light" v-model="report.product_type_id[index]">
                                <option value="">Pilih</option>
                                <option v-for="(row, index) in typeProducts.data" :value="row.id" :key="index">
                                    {{ row.name }}
                                </option>
                            </select>
                        </div>
                    </b-col>
                    <b-col>
                        <div class="form-group">
                            <label for="lead">Order</label>
                            <input type="number" id="lead" class="form-control" name="order[]" v-model="report.order[index]">
                        </div>
                    </b-col>
                    <b-col>
                        <div class="form-group">
                            <label for="">Tipe Order</label>
                            <select name="order_type_id[]" class="form-control text-light" v-model="report.order_type_id[index]">
                                <option value="">Pilih</option>
                                <option v-for="(row, index) in types.data" :value="row.id" :key="index">
                                    {{ row.name }}
                                </option>
                            </select>
                        </div>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <b-button
                            @click="addFind"
                            variant="primary"
                        >
                        Add Field
                        </b-button>
                    </b-col>
                </b-row>
                <v-divider></v-divider>
                <div class="form-group">
                    <label for="jml_transaksi">Jumlah Transaksi</label>
                    <input type="number" id="jml_transaksi" class="form-control" name="jml_transaksi" v-model="report.jml_transaksi">
                </div>
                <div class="form-group">
                    <label for="omset">Omset</label>
                    <input type="number" id="omset" class="form-control" name="omset" v-model="report.omset">
                </div>
                <div class="form-group">
                    <label for="keterangan">Keterangan</label>
                        <textarea class="form-control" name="keterangan" id="keterangan" cols="30" rows="10" v-model="report.keterangan"></textarea>
                </div>
    </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
    name: 'FormEmploye',
    created() {
        this.getReports();
        this.getListCategoryTypes();
        this.getTypes();
        this.getTypesProduct();
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
            finds: [],
            report: {
                product_type_id: [''],
                chat: '',
                order: [''],
                jml_transaksi: '',
                omset: '',
                keterangan: '',
                order_type_id: [''],
            }
        }
    },
    computed: {
        ...mapState('reportCs', {
            reports: state => state.reports
        }),
        ...mapState('productCategory', {
            categorys: state => state.categorys
        }),
        ...mapState('orderType', {
            types: state => state.types
        }),
        ...mapState('productType', {
            typeProducts: state => state.typeProducts
        })
    },
    methods: {
        addFind: function () {
            this.finds.push({ value: '' });
        },
        ...mapActions('reportCs', ['getReports', 'submitReportCs']),
        ...mapActions('productCategory', ['getListCategoryTypes']),
        ...mapActions('orderType', ['getTypes']),
        ...mapActions('productType', ['getTypesProduct']),
        submit() {

            let form = new FormData()

            form.append('chat', this.report.chat)
            form.append('jml_transaksi', this.report.jml_transaksi)
            form.append('omset', this.report.omset)
            form.append('keterangan', this.report.keterangan)
            // array
            for (var i = 0; i < this.report.order.length; i++) {
                let order = this.report.order[i];
                let order_type_id = this.report.order_type_id[i];
                let product_type_id = this.report.product_type_id[i];

                form.append('order_type_id['+ i +']', order_type_id)
                form.append('order['+ i +']', order)
                form.append('product_type_id['+ i +']', product_type_id)
            }

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
                    this.$router.push({ name: 'cs.report.data' })
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
