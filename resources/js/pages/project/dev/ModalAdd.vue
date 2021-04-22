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
            <b-col>
                <b-button class="mt-3" variant="outline-primary" block @click="submit"><i class="fas fa-save"></i> Save</b-button>
            </b-col>
            <b-col><b-button class="mt-3" variant="outline-danger" block @click="$emit('close')"><i class="fas fa-times-circle"></i> Cancle</b-button></b-col>
        </b-row>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
    name: 'FormProject',
    data() {
        return {
            project: {
                project_name: '',
                description: '',
            }
        }
    },
    computed: {
        ...mapState(['errors']),
        ...mapState('user', {
            authenticated: state => state.authenticated
        }),
    },
    methods: {
        ...mapActions('project', ['submitProjectDev', 'editProject', 'updateProject']),
        ...mapMutations('project', ['SET_ID_UPDATE']),
        submit() {
            let form = new FormData()
            form.append('project_name', this.project.project_name)
            form.append('description', this.project.description)
            form.append('user_id', this.authenticated.id)
            form.append('position_id', this.authenticated.position_id)

            this.submitProjectDev(form).then(() => {
                    this.project = {
                        project_name: '',
                        description: '',
                    }
                    this.$swal({
                        background: '#3085d6',
                        title: 'Ditambah!',
                        text: 'Data Berhasil ditambah!',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 2000
                    })
                    this.$emit('close')
                })
        },
    },
}
</script>
