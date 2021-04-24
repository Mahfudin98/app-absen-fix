<template>
    <div class="col-md-12 col-xl-8 grid-margin stretch-card">
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">To do list</h4>
                    <div class="add-items d-flex">
                        <input type="text" class="form-control" name="to_do" v-model="task.to_do" placeholder="enter task..">
                        <button class="add btn btn-primary" @click="add">Add</button>
                    </div>
                    <div class="list-wrapper" >
                        <ul class="d-flex flex-column-reverse text-white">
                            <li v-for="row in slug" :key="row.id">
                                <b-form-checkbox
                                    name="checkbox-1"
                                    value="accepted"
                                    unchecked-value="not_accepted"
                                >
                                {{ row.to_do }}
                                </b-form-checkbox>
                                <i class="remove mdi mdi-close-box" @click="deleteTaskdev(row.id)"></i>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
</template>


<script>
import { mapActions, mapState, mapMutations } from 'vuex'
export default {
    name: 'DataProjectDev',
    created() {
        this.viewDev(this.$route.params.slug);
        this.viewProjectDev(this.$route.params.slug);
    },
    data() {
        return {
            task: {
                to_do: '',
            }
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

            this.submitTaskProjectDev(form).then(() => {
                this.task = {
                    to_do: '',
                }
                this.$router.push({ name: 'dev.view' })
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
}
</script>
