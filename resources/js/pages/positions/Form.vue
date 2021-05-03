<template>
    <div>
        <form class="forms-sample">
            <div class="form-group" :class="{ 'has-error': errors.code }">
                <label for="name">Nama Jabatan</label>
                <input type="text" name="name" class="form-control" id="name" placeholder="Nama Jabatan" v-model="position.name">
                <p class="text-danger" v-if="errors.code">{{ errors.code[0] }}</p>
            </div>
            <div class="form-group">
                <label for="status">Status</label>
                <select class="form-control" id="status" name="status" v-model="position.status">
                    <option disabled value="">Silahkan Pilih</option>
                    <option v-bind:value="1" selected>Active</option>
                    <option v-bind:value="0">Inactive</option>
                </select>
            </div>
        </form>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
    name: 'Formpositions',
    computed: {
        ...mapState(['errors']),
        ...mapState('position', {
            position: state => state.position
        })
    },
    methods: {
        ...mapMutations('position', ['CLEAR_FORM']),
    },
    destroyed() {
        this.CLEAR_FORM()
    },
}
</script>
