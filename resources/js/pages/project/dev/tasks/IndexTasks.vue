<template>
<div class="col-md-12 grid-margin">
    <div class="row">
        <edit-project></edit-project>
        <div class="col-md-12 col-xl-8 grid-margin stretch-card">
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">To do list</h4>
                    <div class="add-items d-flex">
                        <input type="text" class="form-control todo-list-input" name="to_do" v-model="task.to_do" placeholder="enter task..">
                        <button class="add btn btn-primary todo-list-add-btn" @click="submit">Add</button>
                    </div>
                    <div class="list-wrapper" >
                        <ul class="d-flex flex-column-reverse text-white todo-list todo-list-custom">
                            <li v-for="task in slug" :key="task.id">
                                <b-form-checkbox
                                    name="checkbox-1"
                                    value="accepted"
                                    unchecked-value="not_accepted"
                                >
                                {{ task.to_do }}
                                </b-form-checkbox>
                                <i class="remove mdi mdi-close-box"></i>
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
import EditProject from './EditProject'
export default {
    name: 'DataProjectDev',
    created() {
        this.viewDev(this.$route.params.slug);
    },
    data() {
        return {
            task: {
                tod_do: '',
            }
        }
    },
    computed: {
        ...mapState('taskproject', {
            slug: state => state.slug,
        })
    },
    methods: {
        ...mapActions('taskproject', ['viewDev', 'submitTaskProjectDev']),
        submit() {
            let form = new FormData()
            form.append('project_id', this.data.id)
            form.append('to_do', this.task.to_do)

            this.submitTaskProjectDev(form).then(() => {
                    this.task = {
                        tod_do: '',
                    }
                    this.$router.push({ name: 'dev.view' })
                })
        },
    },
    components:{
        'edit-project': EditProject
    }
}
</script>
