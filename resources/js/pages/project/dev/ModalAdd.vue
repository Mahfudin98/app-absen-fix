<template>
    <div>
        <div class="form-group" :class="{ 'has-error': errors.code }">
            <label for="name">Nama Project</label>
            <input type="text" class="form-control bg-light text-dark" name="nama_project" v-model="project.project_name">
            <p class="text-danger" v-if="errors.code">{{ errors.code[0] }}</p>
        </div>
        <div class="form-group" :class="{ 'has-error': errors.code }">
            <label for="desc">Deskripsi</label>
            <textarea name="description" class="form-control bg-light text-dark" id="desc" cols="30" rows="10" v-model="project.description"></textarea>
            <p class="text-danger" v-if="errors.code">{{ errors.code[0] }}</p>
        </div>
        <b-row>
            <b-col><b-button class="mt-3" variant="outline-primary" block><i class="fas fa-save"></i> Save</b-button></b-col>
            <b-col><b-button class="mt-3" variant="outline-danger" block @click="$emit('close')"><i class="fas fa-times-circle"></i> Cancle</b-button></b-col>
        </b-row>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
    name: 'FormProject',
    computed: {
        ...mapState(['errors']),
        ...mapState('project', {
            project: state => state.project
        })
    },
    methods: {
        ...mapMutations('project', ['CLEAR_FORM']),
    },
    destroyed() {
        this.CLEAR_FORM()
    },
}
</script>
