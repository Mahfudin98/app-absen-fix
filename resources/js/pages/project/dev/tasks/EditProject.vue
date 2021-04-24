<template>
    <div class="col-md-6 col-xl-4 grid-margin">
            <div class="card">
                <div class="card-body">
                    <div class="d-flex flex-row justify-content-between">
                        <h4 class="card-title mb-1" v-show="edit == false">{{ project.project_name }}</h4>
                        <h4 class="card-title mb-1" v-show="edit != false"><b-form-input v-model="project.project_name"></b-form-input></h4>
                        <p class="text-muted mb-1">
                            <b-button variant="secondary" class="mt-1" @click="edit = !edit">
                                {{ edit ? 'Open' : '' }} <i class="fas fa-edit"></i>
                            </b-button>
                        </p>
                    </div>
                    <blockquote class="blockquote">
                      <p class="mb-0" v-show="edit == false">{{ project.description }}</p>
                       <b-form-textarea v-show="edit != false" class="text-white" id="textarea-plaintext" plaintext v-model="project.description"></b-form-textarea>
                    </blockquote>
                    <div class="d-flex flex-row justify-content-between">
                        <h4 class="card-title mb-1"><p class="text-muted">Persentase projek</p></h4>
                        <p class="text-muted mb-1">
                            <b-form-spinbutton id="sb-inline" v-model="project.progress" inline></b-form-spinbutton>
                        </p>
                    </div>
                    <b-progress :value="project.progress" :max="100" show-progress variant="info" striped :animated="animate" class="mt-2"></b-progress>
                </div>
                <div class="card-footer">
                    <b-button block pill variant="outline-warning" @click="update"><i class="fas fa-save"></i> Save</b-button>
                </div>
            </div>
        </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
export default {
    name: 'DataProjectDev',
    created() {
        this.viewProjectDev(this.$route.params.slug).then((res) => {
            this.project = {
                progress: res.data.progress,
                description: res.data.description,
                project_name: res.data.project_name
            }
        });
    },
    data() {
        return {
            edit: false,
            animate: true,
            project: {
                progress: '',
                description: '',
                project_name: ''
            },
        }
    },
    computed: {
        ...mapState('project', {
            data: state => state.data
        }),
    },
    methods: {
        ...mapActions('project', ['viewProjectDev', 'updateProjectDev']),
        ...mapMutations('project', ['SET_SLUG_UPDATE']),
        update() {
            let form = new FormData()
            form.append('project_name', this.project.project_name)
            form.append('description', this.project.description)
            form.append('progress', this.project.progress)
            this.SET_SLUG_UPDATE(this.$route.params.slug)
                this.updateProjectDev(form).then(() => {
                    this.$swal({
                        background: '#3085d6',
                        title: 'Diupdate!',
                        text: 'Data Berhasil diupdate!',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 2000
                    })
                    this.edit =  false
                })
        },
    },
}
</script>
