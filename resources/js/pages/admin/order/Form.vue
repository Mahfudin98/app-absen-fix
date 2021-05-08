<template>
    <div>
        <form class="forms-sample">
            <div class="form-group" :class="{ 'has-error': errors.code }">
                <label for="name">Nama Kategori</label>
                <input type="text" name="name" class="form-control" id="name" placeholder="Nama Jabatan" v-model="type.name">
                <p class="text-danger" v-if="errors.code">{{ errors.code[0] }}</p>
            </div>
        </form>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
    name: 'FormCategory',
    computed: {
        ...mapState(['errors']),
        ...mapState('orderType', {
            type: state => state.type
        })
    },
    methods: {
        ...mapMutations('type', ['CLEAR_FORM']),
    },
    destroyed() {
        this.CLEAR_FORM()
    },
}
</script>
