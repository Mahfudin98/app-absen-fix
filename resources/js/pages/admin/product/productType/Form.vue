<template>
    <div>
        <form class="forms-sample">
            <div class="form-group" :class="{ 'has-error': errors.code }">
                <label for="name">Nama Kategori</label>
                <input type="text" name="name" class="form-control" id="name" v-model="typeProduct.name">
                <p class="text-danger" v-if="errors.code">{{ errors.code[0] }}</p>
            </div>
            <div class="form-group" :class="{ 'has-error': errors.product_category_id }">
            <label for="">Product Category</label>
            <select name="product_category_id" class="form-control" v-model="typeProduct.product_category_id">
                <option value="">Pilih</option>
                <option v-for="(row, index) in categorys.data" :value="row.id" :key="index">
                    {{ row.name }}
                </option>
            </select>
            <p class="text-danger" v-if="errors.product_category_id">{{ errors.product_category_id[0] }}</p>
        </div>
        </form>
    </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
    name: 'FormType',
    created() {
        this.getListCategorys();
    },
    computed: {

        ...mapState('productCategory', {
            categorys: state => state.categorys
        }),
        ...mapState(['errors']),
        ...mapState('productType', {
           typeProduct: state => state.typeProduct
        })
    },
    methods: {
        ...mapMutations('typeProduct', ['CLEAR_FORM']),
        ...mapActions('productCategory', ['getListCategorys']),
    },
    destroyed() {
        this.CLEAR_FORM()
    },
}
</script>
