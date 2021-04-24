<template>
<div class="col-md-12 grid-margin">
    <div class="row">
        <edit-project></edit-project>
        <div class="col-md-12 col-xl-8 grid-margin stretch-card">
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">To do list</h4>
                    <div class="add-items d-flex">
                        <input type="text" class="form-control" name="to_do" v-model="task.to_do" placeholder="enter task..">
                        <button class="add btn btn-primary" @click="add">Add</button>
                    </div>
                    <div class="d-flex justify-content-center" v-show="loading === true">
                        <half-circle-spinner
                            v-show="loading === true"
                            :animation-duration="2000"
                            :size="70"
                            color="#ff1d5e"
                        />
                    </div>
                    <div class="list-wrapper" v-show="loading == false">
                        <ul class="d-flex flex-column-reverse text-white">
                            <li v-for="(row, index) in slug" :value="row.id" :key="index">
                                <div class="form-group form-check">
                                    <input type="checkbox" class="form-check-input" name="status" :id="row.to_do" v-model="row.status">
                                    <label class="form-check-label" :for="row.to_do">
                                        <p v-if="row.status == 0">{{ row.to_do }}</p>
                                        <s v-else>{{ row.to_do }}</s>
                                    </label>
                                </div>
                                <i class="remove mdi mdi-close-box" @click="deleteTaskdev(row.id)"></i>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import {AtomSpinner} from 'epic-spinners'
import { HalfCircleSpinner } from 'epic-spinners'
import EditProject from './EditProject'
export default {
    name: 'DataProjectDev',
    created() {
        this.viewDev(this.$route.params.slug).then((res) => {
            this.task = {
                 status: res.data.status
            }
        });
        this.viewProjectDev(this.$route.params.slug);
    },
    data() {
        return {
            loading: false,
            checkbox: [],
            task: {
                to_do: '',
                status: ''
            },
        }
    },
    computed: {
        ...mapState('taskproject', {
            slug: state => state.slug,
        }),
        ...mapState('project', {
            data: state => state.data
        }),
    },
    methods: {
        ...mapActions('taskproject', ['viewDev', 'submitTaskProjectDev', 'deleteTaskDev']),
        ...mapActions('project', ['viewProjectDev']),
        ...mapMutations('taskproject', ['SET_SLUG']),
        add() {
            let form = new FormData()
            form.append('project_id', this.data.id)
            form.append('to_do', this.task.to_do)
            this.SET_SLUG(this.$route.params.slug)
            this.loading = true
            this.submitTaskProjectDev(form).then(() => {
                this.task = {
                    to_do: '',
                }

                this.loading = false
                this.$router.push({ name: 'dev.view' })
                .catch(()=>{});
            })
        },
        deleteTaskdev(id) {
            this.$swal({
                title: 'Kamu Yakin?',
                text: "Tindakan ini akan menghapus secara permanent!",
                icon: 'warning',
                background: '#12151e',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Iya, Lanjutkan!'
            }).then((result) => {
                if (result.value) {
                    this.SET_SLUG(this.$route.params.slug)
                    this.deleteTaskDev(id)
                    this.$swal({
                        background: '#3085d6',
                        title: 'Terhapus!',
                        text: 'Posisi sudah berhasil dihapus!',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
        }
    },
    components:{
        'edit-project': EditProject,
        AtomSpinner,
        HalfCircleSpinner
    }
}
</script>
