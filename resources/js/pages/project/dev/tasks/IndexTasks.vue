<template>
<div class="col-md-12 grid-margin">
    <div class="row">
        <div class="col-md-6 col-xl-4 grid-margin stretch-card">
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">{{ data.project_name }}</h4>
                    <blockquote class="blockquote">
                      <p class="mb-0">{{ data.description }}</p>
                    </blockquote>
                    <p class="text-muted">Persentase projek <span class="badge badge-warning">{{ data.progress }}</span> </p>
                    <div class="progress progress-md portfolio-progress">
                        <div class="progress-bar bg-success" role="progressbar" :style="progressWidth" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-12 col-xl-8 grid-margin stretch-card">
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">To do list</h4>
                    <div class="add-items d-flex">
                        <input type="text" class="form-control todo-list-input" placeholder="enter task..">
                        <button class="add btn btn-primary todo-list-add-btn">Add</button>
                    </div>
                    <div class="list-wrapper" >
                        <ul class="d-flex flex-column-reverse text-white todo-list todo-list-custom">
                            <li v-for="task in slug" :key="task.id">
                                <div class="form-check form-check-primary">
                                    <label class="form-check-label">
                                        <input class="checkbox" type="checkbox">{{ task.to_do }}
                                    </label>
                                </div>
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
import { mapActions, mapState } from 'vuex'
export default {
    name: 'DataProjectDev',
    created() {
        this.viewDev(this.$route.params.slug);
        this.viewProjectDev(this.$route.params.slug);
    },
    computed: {
        ...mapState('project', {
            slug: state => state.slug,
            data: state => state.data
        }),
        progressWidth(){
            return{
                width: this.data.progress
            }
        }
    },
    methods: {
        ...mapActions('project', ['viewDev', 'viewProjectDev']),
    },
}
</script>
